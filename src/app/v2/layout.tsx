import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f1e6",
};

export const metadata: Metadata = {
  title: "Xplainery — Design Option B (Editorial)",
  description: "Alternate design concept for Xplainery.",
  // Preview concept — keep it out of search until a direction is chosen.
  robots: { index: false, follow: false },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased" style={{ background: "#f4f1e6", color: "#09140d" }}>
        {children}
      </body>
    </html>
  );
}
