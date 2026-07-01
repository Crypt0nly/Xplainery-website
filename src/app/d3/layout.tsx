import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "../globals.css";
import { DesignBar } from "@/components/DesignBar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6FAF1",
};

export const metadata: Metadata = {
  title: "Xplainery — Design 3 · Atelier",
  description: "Design concept 3 for Xplainery.",
  // Concept preview — keep out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function D3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="bg-[#F6FAF1] font-sans text-[#223528] antialiased">
        <DesignBar active={3} />
        {children}
      </body>
    </html>
  );
}
