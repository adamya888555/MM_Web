"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-bold tracking-tighter text-black dark:text-white group-hover:opacity-80 transition-opacity">
            MOHALI MART
            <span className="text-xs font-normal block tracking-widest text-zinc-500 uppercase">
              Business Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${pathname === "/" ? "text-black dark:text-white" : "text-zinc-500"
              }`}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${pathname === "/about" ? "text-black dark:text-white" : "text-zinc-500"
              }`}
          >
            ABOUT
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${isMegaMenuOpen ? "text-black dark:text-white" : "text-zinc-500"
                }`}
            >
              ESSENTIALS <ChevronDown className="w-4 h-4" />
            </button>

            {/* Mega Menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] mt-4 p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-xl border border-zinc-100 dark:border-zinc-800 transition-all duration-300 origin-top ${isMegaMenuOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
                }`}
            >
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    Art Gallery
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/gallery"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Browse Collection
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/commissions"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Commission Work
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/artists"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Artist Profiles
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    Tattoo Studio
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/tattoo/portfolio"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Artist Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tattoo/booking"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tattoo/aftercare"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Aftercare Guide
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    Connect
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/contact"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faq"
                        className="block text-sm text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors"
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${pathname === "/contact"
                ? "text-black dark:text-white"
                : "text-zinc-500"
              }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth"
            className="text-sm font-medium text-white bg-black dark:bg-white dark:text-black px-5 py-2.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Login / Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] bg-white dark:bg-black z-40 p-6 md:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-2xl font-medium text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-2xl font-medium text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/gallery"
              className="text-2xl font-medium text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Art Gallery
            </Link>
            <Link
              href="/tattoo"
              className="text-2xl font-medium text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tattoo Studio
            </Link>
            <Link
              href="/contact"
              className="text-2xl font-medium text-black dark:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <Link
                href="/auth"
                className="block w-full text-center text-lg font-medium text-white bg-black dark:bg-white dark:text-black px-6 py-3 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
