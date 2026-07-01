"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Menu, X, ArrowRight, Asterisk } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#why", label: "Philosophy" },
  { href: "#services", label: "Services" },
  { href: "#usecases", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Questions" },
];

/* ---------- Editorial nav ---------- */
export function AtelierNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[#223528]/15 bg-[#F6FAF1]/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1150px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="Xplainery" className="h-7 w-auto" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Xplainery
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#223528]/60 transition-colors hover:text-[#223528]"
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
            className="hidden items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-[#223528] sm:inline-flex"
          >
            Book a free call
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#223528]/20 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#223528]/10 bg-[#F6FAF1] px-5 py-5 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#223528]/10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#223528]/70"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px]"
          >
            Book a free call
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- Rotating word ---------- */
export function WordRotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length, reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] items-baseline overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.em
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-[#223528] [text-decoration:underline] [text-decoration-color:#66F745] [text-decoration-thickness:3px] [text-underline-offset:6px]"
        >
          {words[index]}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

/* ---------- Expanding service rows ---------- */
export function ServiceRows({ dict }: { dict: Dictionary }) {
  const t = dict.services;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-[#223528]/15">
      {t.items.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.name} className="border-b border-[#223528]/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
            >
              <span className="font-display text-sm italic text-[#223528]/40">
                N°{i + 1}
              </span>
              <span
                className={cn(
                  "flex-1 font-display text-2xl font-medium leading-tight tracking-tight transition-all duration-300 sm:text-4xl",
                  isOpen
                    ? "italic text-[#223528]"
                    : "text-[#223528]/85 group-hover:translate-x-2 group-hover:italic",
                )}
              >
                {s.name}
              </span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-[#223528]/45 md:block">
                {s.tagline}
              </span>
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-[#223528] bg-[#223528] text-[#66F745]"
                    : "border-[#223528]/25 text-[#223528]/60 group-hover:border-[#223528]",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </button>

            <div
              className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-8 pb-9 pl-0 sm:pl-14 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                  <div>
                    <p className="max-w-xl text-base leading-relaxed text-[#223528]/75">
                      {s.body}
                    </p>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#223528]/45">
                      {t.bestForLabel} — {s.bestFor}
                    </p>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-[#223528]"
                    >
                      {t.bookCta}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                  <ul className="space-y-3 border-l border-[#223528]/15 pl-6">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[#223528]/75"
                      >
                        <Asterisk
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#3f9629]"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Use-case index ---------- */
export function AtelierUseCases({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#223528]/45">
          {t.selectHint}
        </p>
        <ul className="mt-5 space-y-1">
          {t.areas.map((area, i) => {
            const selected = area.id === activeId;
            return (
              <li key={area.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(area.id)}
                  aria-pressed={selected}
                  className={cn(
                    "group flex w-full items-baseline gap-3 border-b border-[#223528]/10 py-3.5 text-left transition-all",
                    selected ? "" : "hover:pl-1.5",
                  )}
                >
                  <span className="font-display text-xs italic text-[#223528]/35">
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl transition-colors sm:text-2xl",
                      selected
                        ? "italic text-[#223528] [text-decoration:underline] [text-decoration-color:#66F745] [text-decoration-thickness:3px] [text-underline-offset:5px]"
                        : "text-[#223528]/55 group-hover:text-[#223528]",
                    )}
                  >
                    {area.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-2xl italic leading-snug text-[#223528]/85 sm:text-3xl">
            “{active.pain}”
          </p>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#223528]/45">
            {t.withAi}
          </p>
          <ul className="mt-4 space-y-3">
            {active.solutions.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2.5 text-base leading-relaxed text-[#223528]/80"
              >
                <Asterisk
                  className="mt-1 h-4 w-4 shrink-0 text-[#3f9629]"
                  strokeWidth={2.5}
                />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#223528]/15 bg-[#223528]/15 sm:grid-cols-2">
            <div className="bg-[#F6FAF1] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#223528]/45">
                {t.promptLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#223528]/80">
                {active.examplePrompt}
              </p>
            </div>
            <div className="bg-[#E8F5E4] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3f9629]">
                {t.resultLabel}
              </p>
              <p className="mt-2 font-display text-sm italic leading-relaxed text-[#223528]">
                {active.exampleResult}
              </p>
            </div>
          </div>

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-[#223528]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Hairline FAQ ---------- */
export function AtelierFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-[#223528]/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-[#223528]/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "font-display text-lg transition-all sm:text-xl",
                  isOpen ? "italic" : "",
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-[#223528] bg-[#223528] text-[#66F745]"
                    : "border-[#223528]/25 text-[#223528]/60",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </button>
            <div
              className="grid transition-all duration-300"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[#223528]/70 sm:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
