"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Instagram, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import RippleButton from '@/components/lightswind/ripple-button';

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTSWIND UI components
// Run these CLI commands to install before using this file:
//
//   npx lightswind@latest add button
//   npx lightswind@latest add card
//   npx lightswind@latest add input
//   npx lightswind@latest add textarea
//   npx lightswind@latest add label
//   npx lightswind@latest add toast
//
// Optional (for enhanced visual effects on the info cards):
//   npx lightswind@latest add glowing-cards       ← hover glow on location card
//   npx lightswind@latest add interactive-gradient-card ← gradient on Instagram card
//   npx lightswind@latest add shiny-text          ← shiny heading in CTA strip
// ─────────────────────────────────────────────────────────────────────────────
import { Button } from "@/components/lightswind/button";
import { Card, CardContent, CardHeader } from "@/components/lightswind/card";
import { Input } from "@/components/lightswind/input";
import { Textarea } from "@/components/lightswind/textarea";
import { Label } from "@/components/lightswind/label";
import { useToast } from "@/hooks/use-toast";

// ─────────────────────────────────────────────────────────────────────────────
// SHADCN/UI Form — wires react-hook-form to Lightswind inputs cleanly
// Install with:  npx shadcn@latest add form
// ─────────────────────────────────────────────────────────────────────────────
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// ─── Zod validation schema ───────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Main component ──────────────────────────────────────────────────────────
export default function ContactBento() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");

      toast({
        title: "Message sent! ✓",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Get In Touch
        </p>
        {/*
          Optional: Replace below <h2> with Lightswind's ShinyText component:
          import { ShinyText } from "@/components/lightswind/shiny-text";
          <ShinyText text="Let's Work Together." className="text-4xl md:text-5xl font-black tracking-tighter uppercase" />
        */}
        <h2 className="text-4xl md:text-5xl  tracking-tighter text-foreground uppercase leading-none">
          
          <span className="text-muted-foreground"> Let&apos;s Work{" "} Together.</span>
        </h2>
      </div>

      {/* ── Bento grid ─────────────────────────────────────────────────────── */}
      {/*
        Lightswind has a BentoGrid component:  npx lightswind@latest add bento-grid
        It's a CSS grid wrapper. This grid below follows the same pattern and
        is a drop-in replacement — swap <div> → <BentoGrid> if you want the
        Lightswind version's built-in animation/reveal behavior.
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* ── CELL 1: Form — 8/12 cols ──────────────────────────────────────── */}
        {/*
          Lightswind Card: bg-card, rounded corners, border from CSS vars.
          GlowingCard effect available:  npx lightswind@latest add glowing-cards
          then wrap with <GlowingCard> for mouse-tracked glow on hover.
        */}
        <Card className="md:col-span-8 rounded-2xl">
          <CardHeader className="pb-2">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Connect With us
            </p>
          </CardHeader>

          <CardContent>
            {/* shadcn Form wraps Lightswind Input/Textarea for proper validation UX */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1.5">
                        {/* Lightswind Label */}
                        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                          Name
                        </Label>
                        <FormControl>
                          {/* Lightswind Input */}
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

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
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

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
                        <Input placeholder="Commission, booking, collaboration…" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
                        {/* Lightswind Textarea */}
                        <Textarea
                          rows={5}
                          placeholder="Tell us about your project, idea, or question…"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Lightswind Button — animated, accessible */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group gap-2 font-bold tracking-widest uppercase"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>

        {/* ── Right column: 4/12 cols ──────────────────────────────────────── */}
        <div className="md:col-span-4 flex flex-col gap-3">

          {/* ── CELL 2: Location & Hours ── */}
          {/*
            Optional: swap <Card> for Lightswind <GlowingCard> here for the
            mouse-tracked glow hover:
              import { GlowingCard } from "@/components/lightswind/glowing-cards";
              npx lightswind@latest add glowing-cards
          */}
          <Card className="rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-xs tracking-widest uppercase">Find Us</span>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm leading-relaxed">
                Mohali City Center, JLPL Industrial Area
              </p>
              <p className="text-muted-foreground text-sm">Mohali, Punjab 140308</p>
            </div>
            <div className="border-t border-border pt-4 flex items-start gap-2">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                  Hours
                </p>
                <p className="text-foreground text-sm">Open 24/7</p>
              </div>
            </div>
          </Card>

          {/* ── CELL 3: Email ── */}
          <a href="mailto:hello@mohalimart.com" className="group block">
            <Card className="rounded-2xl p-6 flex flex-col gap-3 group-hover:bg-accent transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs tracking-widest uppercase">Email</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-foreground font-medium text-sm break-all">
                personalmail@mohalimart.com
              </p>
              <p className="text-muted-foreground text-xs">We reply within 24 hours</p>
            </Card>
          </a>

          {/* ── CELL 4: Instagram ── */}
          {/*
            Optional: swap <Card> for Lightswind <InteractiveGradientCard> for
            the animated gradient-glow-on-hover effect:
              import { InteractiveGradientCard } from "@/components/lightswind/interactive-gradient-card";
              npx lightswind@latest add interactive-gradient-card
          */}
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
                  <span className="text-xs tracking-widest uppercase">Instagram</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-foreground font-medium text-sm">@mohalimart</p>
              <p className="text-muted-foreground text-xs">Follow our work &amp; updates</p>
            </Card>
          </a>

        </div>

        {/* ── CELL 5: CTA strip — full width ─────────────────────────────── */}
        <Card className="md:col-span-12 bg-primary border-0 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {/*
              Optional Lightswind ShinyText:
              import { ShinyText } from "@/components/lightswind/shiny-text";
              <ShinyText text="Ready to create something?" className="font-black text-xl uppercase tracking-tight text-primary-foreground" />
            */}
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
              bgColor = "#0a0a0a"
              circleColor="white"
              width="130px"
              height="50px"
            
              />
            </a>
            <a href="/tatto/booking">
              <RippleButton
              text="Tattoo"
              bgColor = "#0a0a0a"
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