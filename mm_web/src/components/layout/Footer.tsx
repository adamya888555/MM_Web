import Link from "next/link";
import { Instagram, Mail, MapPin, Twitter, Linkedin, Github, Youtube, Slack, Send, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black dark:bg-black border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter text-white dark:text-white">
                            MOHALI MART
                        </h2>
                        <p className="text-zinc-500 max-w-xs leading-relaxed">
                            A hybrid creative space blending fine art with professional tattoo artistry.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white dark:text-white mb-6">
                            Platform
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/gallery" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Art Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/tattoo" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Tattoo Studio
                                </Link>
                            </li>
                            <li>
                                <Link href="/artists" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Our Artists
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Shop Prints
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white dark:text-white mb-6">
                            Support
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/contact" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white dark:text-white mb-6">
                            Visit Us
                        </h3>
                        <div className="space-y-4 text-zinc-500">
                            <p className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                                <span>
                                    Sector 82, JLPL Industrial Area<br />
                                    Mohali, Punjab 140308
                                </span>
                            </p>
                            <p>
                                Open Daily: 10:00 AM - 8:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col xl:flex-row items-center justify-between gap-6">
                    {/* Left side: Copyright and Legal */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-sm text-zinc-500 font-medium">
                            Copyright &copy; {new Date().getFullYear()} Mohali Mart. All rights reserved.
                        </p>
                        <div className="hidden md:block w-px h-4 bg-zinc-800"></div>
                        <div className="flex items-center gap-6">
                            <Link href="/terms" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Right side: Socials and Signature */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Slack className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                                <Send className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="hidden md:block w-px h-4 bg-zinc-800"></div>

                        {/* Signature */}
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-sm font-medium text-zinc-400">Made with passion in Mohali</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
