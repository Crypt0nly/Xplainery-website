import type { Metadata, Viewport } from "next";
import { Exo_2, Manrope } from "next/font/google";
import "../globals.css";
import { DesignBar } from "@/components/DesignBar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6faf4",
};

export const metadata: Metadata = {
  title: "Xplainery — Design 7 · Classic II",
  description: "Design concept 7 for Xplainery.",
  // Concept preview — keep out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function D7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${exo2.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <DesignBar active={7} />
        {children}
      </body>
    </html>
  );
}
