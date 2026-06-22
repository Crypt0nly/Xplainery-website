"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const LINKS = [
  { href: "#why", label: "Why" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#founder", label: "Founder" },
  { href: "#faq", label: "FAQ" },
];

export function V2Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b-2 border-[#09140d] transition-colors"
      style={{ background: scrolled ? "#f4f1e6" : "transparent" }}
    >
      <nav className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="Xplainery" className="h-8 w-auto" />
          <span className="font-display text-lg font-extrabold tracking-tight text-[#09140d]">
            Xplainery
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold uppercase tracking-wide text-[#09140d] transition-opacity hover:opacity-50"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 border-2 border-[#09140d] bg-[#66f745] px-4 py-2 text-sm font-extrabold text-[#09140d] shadow-[3px_3px_0_0_#09140d] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#09140d] sm:inline-flex"
          >
            Book a Free Call
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center border-2 border-[#09140d] bg-white text-[#09140d] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-2 border-[#09140d] bg-[#f4f1e6] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#09140d]/15 py-3 text-base font-bold uppercase tracking-wide text-[#09140d]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1.5 border-2 border-[#09140d] bg-[#66f745] px-4 py-3 text-base font-extrabold text-[#09140d]"
            >
              Book a Free Call
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
