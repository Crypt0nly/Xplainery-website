import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { DesignBar } from "@/components/DesignBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Xplainery — Design 2 · Noir",
  description: "Design concept 2 for Xplainery.",
  // Concept preview — keep out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function D2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="bg-black font-sans text-[#E8F5E4] antialiased">
        <DesignBar active={2} />
        {children}
      </body>
    </html>
  );
}
