// src/middleware.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js Edge Middleware — runs before EVERY matched request.
// Protects:
//   • POST /api/contact        (submit contact form)
//   • /tattoo/booking          (booking page)
//   • /art/booking             (booking page)
//
// HOW IT WORKS:
//   1. Reads the JWT from the Authorization header ("Bearer <token>")
//      OR from the "token" cookie (whichever your frontend sends).
//   2. Verifies the token using JWT_SECRET.
//   3. If invalid/missing → 401 for API routes, redirect to /auth for pages.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // ← jose works in Edge runtime; jsonwebtoken does NOT

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key' // must match your lib/auth.ts secret
);

// ── Routes to protect ────────────────────────────────────────────────────────
// API routes that need auth
const PROTECTED_API_ROUTES = ['/api/contact'];

// Page routes that need auth
const PROTECTED_PAGE_ROUTES = ['/tattoo/booking', '/art/booking'];

// ── Token extractor ───────────────────────────────────────────────────────────
function extractToken(req: NextRequest): string | null {
  // 1. Try Authorization header: "Bearer <token>"
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // 2. Try "token" cookie (if your frontend stores it there)
  const cookieToken = req.cookies.get('token')?.value;
  if (cookieToken) return cookieToken;

  return null;
}

// ── Middleware function ───────────────────────────────────────────────────────
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedAPI  = PROTECTED_API_ROUTES.some(r => pathname.startsWith(r));
  const isProtectedPage = PROTECTED_PAGE_ROUTES.some(r => pathname.startsWith(r));

  // Not a protected route — let it through
  if (!isProtectedAPI && !isProtectedPage) {
    return NextResponse.next();
  }

  const token = extractToken(req);

  // No token at all
  if (!token) {
    if (isProtectedAPI) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please log in.' },
        { status: 401 }
      );
    }
    // Redirect page routes to login, with a return URL
    const loginUrl = new URL('/auth', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify the token
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Token is valid — attach user info to request headers for API routes to read
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id',    payload.userId as string);
    requestHeaders.set('x-user-email', payload.email  as string);
    requestHeaders.set('x-user-role',  payload.role   as string);

    return NextResponse.next({ request: { headers: requestHeaders } });

  } catch (err) {
    // Token is expired or tampered
    console.warn('[Middleware] Invalid JWT:', err);

    if (isProtectedAPI) {
      return NextResponse.json(
        { success: false, error: 'Session expired. Please log in again.' },
        { status: 401 }
      );
    }

    // Clear bad cookie and redirect
    const loginUrl = new URL('/auth', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token'); // clean up bad cookie
    return response;
  }
}

// ── Matcher — tells Next.js which paths to run middleware on ─────────────────
export const config = {
  matcher: [
    '/api/contact',
    '/tattoo/booking/:path*',
    '/art/booking/:path*',
  ],
};