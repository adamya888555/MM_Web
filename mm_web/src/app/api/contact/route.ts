import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// ─── MongoDB Connection ──────────────────────────────────────────────────────
// Uses your existing MONGODB_URI from .env.local
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file");
}

// Cached connection to avoid re-connecting on every request (Next.js hot reload friendly)
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnection: Promise<typeof mongoose> | undefined;
}

async function connectDB() {
  if (global._mongooseConnection) {
    return global._mongooseConnection;
  }
  global._mongooseConnection = mongoose.connect(MONGODB_URI);
  return global._mongooseConnection;
}

// ─── Contact Schema / Model ──────────────────────────────────────────────────
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Prevent model recompilation in Next.js dev mode
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic server-side validation (zod is on the client, this is a safety net)
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const contact = await Contact.create({ name, email, subject, message });

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully.",
        id: contact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// ─── GET Handler (for admin dashboard later) ─────────────────────────────────
// Fetch all contact submissions — protect this with auth middleware when building the admin panel
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find({})
      .sort({ createdAt: -1 }) // newest first
      .lean();

    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    console.error("[Contact GET Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}