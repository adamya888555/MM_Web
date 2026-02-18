import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">
                            MOHALI MART
                        </h2>
                        <p className="text-zinc-500 max-w-xs leading-relaxed">
                            A hybrid creative space blending fine art with professional tattoo artistry.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <Instagram className="w-5 h-5 text-zinc-600 group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white" />
                            </a>
                            <a href="mailto:info@mohalimart.com" className="p-2 bg-zinc-50 dark:bg-zinc-900 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <Mail className="w-5 h-5 text-zinc-600 group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-6">
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
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-6">
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
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-6">
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
                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-400">
                        &copy; {new Date().getFullYear()} Mohali Mart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="text-sm text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-sm text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
