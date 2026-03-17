import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument"
});

export const metadata: Metadata = {
  title: "Mohali Mart | Art & Tattoo Business Hub",
  description: "A hybrid creative space blending fine art with professional tattoo artistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-[88px]">
            {/* pt-[88px] to offset fixed header height */}
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
