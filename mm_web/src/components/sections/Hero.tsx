"use client";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import Image from "next/image";
import Letter3DSwap from "@/components/ui/letter-3d-swap";

export default function Hero() {
    return (
        <section className="relative w-full h-[calc(100vh-88px)] overflow-hidden bg-black text-white">
            <Floating sensitivity={-0.5} className="h-full w-full">
                {/* Central Typography */}
                <FloatingElement depth={0.2} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter text-center select-none mix-blend-difference">
                        <Letter3DSwap rotateDirection="top" staggerFrom="center">
                            MOHALI
                        </Letter3DSwap>
                        <br />
                        <span className="flex items-center justify-center">
                            <Letter3DSwap rotateDirection="bottom" staggerFrom="center">
                                MART
                            </Letter3DSwap>
                            <span className="text-purple-500">.</span>
                        </span>
                    </h1>
                </FloatingElement>

                {/* Floating Elements - Z Index & Depth Variation */}

                {/* Top Left - Art Detail */}
                <FloatingElement depth={1} className="top-[10%] left-[12%] z-10 w-48 md:w-64 aspect-[3/4]">
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=687&auto=format&fit=crop"
                            alt="Abstract Art"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 150px, 250px"
                        />
                    </div>
                </FloatingElement>

                {/* Top Right - Tattoo/Video Vibes */}
                <FloatingElement depth={2} className="top-[12%] right-[10%] z-0 w-56 md:w-80 aspect-video">
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl skew-y-3">
                        <Image
                            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=987&auto=format&fit=crop"
                            alt="Tattoo Process"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 200px, 320px"
                        />
                    </div>
                </FloatingElement>

                {/* Bottom Left - Small Detail */}
                <FloatingElement depth={0.5} className="bottom-[12%] left-[25%] z-30 w-32 md:w-40 aspect-square">
                    <div className="relative w-full h-full overflow-hidden rounded-full shadow-2xl border-2 border-white/10 hover:border-purple-500/50 transition-colors">
                        <Image
                            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1074&auto=format&fit=crop"
                            alt="Paint Texture"
                            fill
                            className="object-cover scale-125"
                            sizes="160px"
                        />
                    </div>
                </FloatingElement>

                {/* Bottom Right - Commission/Portrait */}
                <FloatingElement depth={1.5} className="bottom-[5%] right-[18%] z-10 w-40 md:w-56 aspect-[4/5]">
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl -rotate-6 brightness-75 hover:brightness-100 transition-all">
                        <Image
                            src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1466&auto=format&fit=crop"
                            alt="Portrait Art"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 150px, 250px"
                        />
                    </div>
                </FloatingElement>

                {/* Deep Background Element - blurred */}
                <FloatingElement depth={0.1} className="top-[40%] right-[40%] z-0">
                    <div className="w-[500px] h-[500px] bg-purple-900/20 blur-[100px] rounded-full mix-blend-screen animate-pulse" />
                </FloatingElement>

                {/* New Element 1: Top Center - Ink Texture */}
                <FloatingElement depth={0.8} className="top-[5%] left-[40%] z-0 w-32 md:w-48 aspect-square">
                    <div className="relative w-full h-full overflow-hidden rounded-lg opacity-40 hover:opacity-80 transition-opacity duration-500 rotate-12">
                        <Image
                            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop"
                            alt="Ink texture"
                            fill
                            className="object-cover"
                            sizes="200px"
                        />
                    </div>
                </FloatingElement>

                {/* New Element 2: Middle Far Right - Vertical Strip */}
                <FloatingElement depth={1.2} className="top-[40%] right-[2%] z-10 w-24 md:w-32 aspect-[1/2]">
                    <div className="relative w-full h-full overflow-hidden rounded-lg border border-white/20 shadow-xl opacity-70 hover:opacity-100 transition-all hover:scale-105">
                        <Image
                            src="https://images.unsplash.com/photo-1515405295579-ba7b454989ab?q=80&w=880&auto=format&fit=crop"
                            alt="Vertical Art"
                            fill
                            className="object-cover"
                            sizes="150px"
                        />
                    </div>
                </FloatingElement>

                {/* New Element 3: Bottom Left-Center - Geometric */}
                <FloatingElement depth={0.6} className="bottom-[25%] left-[5%] z-0 w-40 md:w-52 aspect-video">
                    <div className="relative w-full h-full overflow-hidden rounded-lg opacity-30 blur-[1px] hover:blur-none hover:opacity-60 transition-all duration-700 -rotate-3">
                        <Image
                            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1470&auto=format&fit=crop"
                            alt="Geometric Pattern"
                            fill
                            className="object-cover"
                            sizes="250px"
                        />
                    </div>
                </FloatingElement>

                {/* Action Button - Centered below text */}
                <FloatingElement depth={0.2} className="top-[47%] left-1/2 -translate-x-1/2 z-30">
                    <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-110 active:scale-95 transition-transform duration-300">
                        Explore The Hub
                    </button>
                </FloatingElement>

            </Floating>
        </section>
    );
}
