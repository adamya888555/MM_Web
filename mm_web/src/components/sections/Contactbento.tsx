"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Instagram, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import RippleButton from "@/components/lightswind/ripple-button";
import { Card } from "@/components/lightswind/card";
import { Input } from "@/components/lightswind/input";
import { Label } from "@/components/lightswind/label";
import { Textarea } from "@/components/lightswind/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ─── Component ───────────────────────────────────────────────────────────────
export default function ContactBento() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Something went wrong");
            }

            setSubmitStatus({
                type: "success",
                message: "Message sent! We'll get back to you soon.",
            });
            form.reset();
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to send. Please try again or email us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            {/* ── HEADER ── */}
            <div className="mb-10">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Get In Touch
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                    Contact
                </h2>
            </div>

            {/* ── BENTO GRID ── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* ── CELL 1: Contact Form ── */}
                <Card className="md:col-span-7 bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                        Send a Message
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5">
                                        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Name
                                        </Label>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5">
                                        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Email
                                        </Label>
                                        <FormControl>
                                            <Input type="email" placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Subject */}
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5">
                                        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Subject
                                        </Label>
                                        <FormControl>
                                            <Input placeholder="What's this about?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Message */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1.5">
                                        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Message
                                        </Label>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us everything..."
                                                className="min-h-[120px] resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Send className="w-4 h-4" />
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>

                            {/* Status */}
                            {submitStatus && (
                                <p
                                    className={`text-sm font-medium ${submitStatus.type === "success"
                                            ? "text-green-500"
                                            : "text-destructive"
                                        }`}
                                >
                                    {submitStatus.message}
                                </p>
                            )}
                        </form>
                    </Form>
                </Card>

                {/* ── RIGHT COLUMN ── */}
                <div className="md:col-span-5 flex flex-col gap-4">
                    {/* ── CELL 2: Instagram ── */}
                    <a
                        href="https://instagram.com/mohalimart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <Card className="rounded-2xl p-6 flex flex-col gap-3 group-hover:border-pink-800/50 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Instagram className="w-4 h-4" />
                                    <p className="text-xs tracking-widest uppercase">Instagram</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                            <p className="text-foreground font-semibold text-sm leading-relaxed">
                                @mohalimart
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Follow our work &amp; updates
                            </p>
                        </Card>
                    </a>

                    {/* ── CELL 3: Email ── */}
                    <a href="mailto:hello@mohalimart.com" className="group block">
                        <Card className="rounded-2xl p-6 flex flex-col gap-3 group-hover:bg-accent transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <p className="text-xs tracking-widest uppercase">Email</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                            <p className="text-foreground font-semibold text-sm">
                                hello@mohalimart.com
                            </p>
                        </Card>
                    </a>

                    {/* ── CELL 4: Location ── */}
                    <Card className="rounded-2xl p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <p className="text-xs tracking-widest uppercase">Location</p>
                        </div>
                        <p className="text-foreground font-semibold text-sm">
                            Mohali, Punjab 140308
                        </p>
                        <div className="border-t border-border pt-4 flex items-start gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-foreground text-sm">Open 24/7</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── CTA ROW — full width ── */}
                <Card className="md:col-span-12 bg-primary border-0 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-primary-foreground font-black text-xl uppercase tracking-tight">
                            Ready to create something?
                        </p>
                        <p className="text-primary-foreground/60 text-sm mt-1">
                            Commission a painting, book a tattoo, or just say hello.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a href="/art/booking">
                            <RippleButton
                                text="Painting"
                                bgColor="#0a0a0a"
                                circleColor="white"
                                width="130px"
                                height="50px"
                            />
                        </a>
                        <a href="/tattoo/booking">
                            <RippleButton
                                text="Tattoo"
                                bgColor="#0a0a0a"
                                circleColor="white"
                                width="130px"
                                height="50px"
                            />
                        </a>
                    </div>
                </Card>
            </div>
        </section>
    );
}
