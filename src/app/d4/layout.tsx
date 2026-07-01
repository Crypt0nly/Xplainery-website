import type { Metadata, Viewport } from "next";
import { Outfit, Manrope } from "next/font/google";
import "../globals.css";
import { DesignBar } from "@/components/DesignBar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Xplainery — Design 4 · Pulse",
  description: "Design concept 4 for Xplainery.",
  // Concept preview — keep out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function D4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="bg-white font-sans text-[#0B1A10] antialiased">
        <DesignBar active={4} />
        {children}
      </body>
    </html>
  );
}
