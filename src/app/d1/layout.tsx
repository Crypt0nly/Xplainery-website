import type { Metadata } from "next";
import { Exo_2, Manrope } from "next/font/google";
import "../globals.css";
import { ArchiveBar } from "@/components/ArchiveBar";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const exo2 = Exo_2({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  title: "Xplainery — Design 1 · Classic",
  robots: { index: false, follow: false },
};

export default function D1Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${exo2.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <ArchiveBar />
        {children}
      </body>
    </html>
  );
}
