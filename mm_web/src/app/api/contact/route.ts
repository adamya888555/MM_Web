import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Server-side validation (zod handles client-side, this is a safety net)
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
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
// Protect this with auth middleware when building the admin panel
export async function GET() {
    try {
        await connectDB();

        const contacts = await Contact.find({})
            .sort({ createdAt: -1 })
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
