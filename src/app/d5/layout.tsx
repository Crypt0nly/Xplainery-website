import type { Metadata, Viewport } from "next";
import { Syne, Manrope } from "next/font/google";
import "../globals.css";
import { DesignBar } from "@/components/DesignBar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050D08",
};

export const metadata: Metadata = {
  title: "Xplainery — Design 5 · Odyssey",
  description: "Design concept 5 for Xplainery.",
  // Concept preview — keep out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function D5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <body
        className="font-sans antialiased"
        style={{ backgroundColor: "#050D08", color: "#E8F5E4" }}
      >
        <DesignBar active={5} />
        {children}
      </body>
    </html>
  );
}
