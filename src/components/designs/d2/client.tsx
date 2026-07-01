"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Plus,
  Sparkles,
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#why", label: "Why" },
  { href: "#services", label: "Services" },
  { href: "#usecases", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/* ---------- Floating glass nav ---------- */
export function NoirNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-9 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/50 py-2 pl-5 pr-2 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark-dark.png" alt="Xplainery" className="h-7 w-auto" />
          <span className="font-display text-base font-bold tracking-tight text-white">
            Xplainery
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[#E8F5E4]/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#66F745] px-4 py-2.5 text-sm font-bold text-black transition-all hover:shadow-[0_0_32px_-6px_rgba(102,247,69,0.8)] sm:inline-flex"
          >
            Book a free call
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-4xl rounded-3xl border border-white/10 bg-black/85 p-3 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#E8F5E4]/75 hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#66F745] px-4 py-3 text-sm font-bold text-black"
            >
              Book a free call
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Cursor spotlight wrapper ---------- */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      el!.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el!.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    }
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:opacity-100"
        style={{
          background:
            "radial-gradient(560px circle at var(--spot-x, 50%) var(--spot-y, 30%), rgba(102,247,69,0.09), transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ---------- Use-case explorer (dark) ---------- */
const UC_ICONS: Record<string, LucideIcon> = {
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
};

export function NoirUseCases({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="grid grid-cols-2 content-start gap-2.5 lg:grid-cols-1">
        {t.areas.map((area) => {
          const Icon = UC_ICONS[area.icon] ?? Mail;
          const selected = area.id === activeId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveId(area.id)}
              aria-pressed={selected}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                selected
                  ? "border-[#66F745]/50 bg-[#66F745]/10 shadow-[0_0_40px_-12px_rgba(102,247,69,0.45)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                  selected
                    ? "bg-[#66F745] text-black"
                    : "bg-white/10 text-[#66F745]",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-white" : "text-[#E8F5E4]/75",
                )}
              >
                {area.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#66F745]/15 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              {active.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#E8F5E4]/60">
              {active.pain}
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-[#66F745]" strokeWidth={2.25} />
              {t.withAi}:
            </p>
            <ul className="mt-3 space-y-2.5">
              {active.solutions.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[#E8F5E4]/85"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#66F745]">
                    <Check className="h-3 w-3 text-black" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8F5E4]/40">
                  {t.promptLabel}
                </span>
                <p className="mt-1.5 rounded-xl rounded-tl-sm border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm text-[#E8F5E4]/90">
                  {active.examplePrompt}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#66F745]">
                  {t.resultLabel}
                </span>
                <p className="mt-1.5 rounded-xl rounded-tl-sm border border-[#66F745]/25 bg-[#66F745]/10 px-3.5 py-2.5 text-sm font-medium text-white">
                  {active.exampleResult}
                </p>
              </div>
            </div>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#66F745] px-6 py-3.5 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(102,247,69,0.7)]"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={2.25} />
              {t.cta}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- FAQ accordion (glass) ---------- */
export function NoirFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "rounded-2xl border transition-colors",
              isOpen
                ? "border-[#66F745]/40 bg-white/[0.04]"
                : "border-white/10 bg-white/[0.02] hover:border-white/25",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-display text-base font-semibold text-white sm:text-lg">
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-[#66F745] bg-[#66F745] text-black"
                    : "border-white/20 text-[#E8F5E4]/70",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
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
                <p className="max-w-3xl px-5 pb-5 text-sm leading-relaxed text-[#E8F5E4]/65 sm:px-6">
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
