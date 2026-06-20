"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { localePath, cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#why", label: dict.nav.why },
    { href: "#services", label: dict.nav.services },
    { href: "#tools", label: dict.nav.tools },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#founder", label: dict.nav.about },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link
          href={localePath(locale)}
          aria-label={site.name}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-brand !px-4 !py-2.5 md:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2} />
            {dict.nav.cta}
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "container-x overflow-hidden transition-all duration-300",
            open ? "max-h-[560px] pb-6 pt-2 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-1 rounded-3xl border border-line bg-elevated p-3 shadow-lift">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-brand-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-brand mt-2 w-full"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={2} />
              {dict.common.bookCall}
            </a>
            <div className="mt-2 flex items-center justify-between px-1">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
