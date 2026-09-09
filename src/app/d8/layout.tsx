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
  title: "Xplainery — AI, explained.",
  description:
    "Practical AI training, strategy and implementation for small and mid-sized businesses — including AI literacy workshops with documented records that support EU AI Act Article 4 compliance.",
  // Concept preview — keep out of search until it replaces the live site.
  robots: { index: false, follow: false },
};

export default function D8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${exo2.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        <DesignBar active={8} />
        {children}
      </body>
    </html>
  );
}
