"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  TrendingUp,
  CalendarCheck,
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#why", label: "Why us" },
  { href: "#services", label: "Services" },
  { href: "#usecases", label: "Use cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/* ---------- Rounded floating nav ---------- */
export function PulseNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-12 z-50 px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full bg-[#0B1A10] py-2.5 pl-6 pr-2.5 text-[#E8F5E4] shadow-[0_16px_44px_-16px_rgba(11,26,16,0.55)]">
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
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-[#E8F5E4]/70 transition-colors hover:bg-white/10 hover:text-white"
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
            className="hidden items-center gap-1.5 rounded-full bg-[#66F745] px-5 py-2.5 text-sm font-extrabold text-[#0B1A10] transition-transform hover:scale-[1.04] active:scale-[0.98] sm:inline-flex"
          >
            Book a free call
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="mx-auto mt-2 max-w-5xl rounded-[1.75rem] bg-[#0B1A10] p-3 text-[#E8F5E4] shadow-xl md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#E8F5E4]/80 hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center rounded-full bg-[#66F745] px-5 py-3 text-sm font-extrabold text-[#0B1A10]"
            >
              Book a free call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Animated number ---------- */
function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);

  return display;
}

/* ---------- Savings slider (hero widget) ---------- */
const HOURS_PER_WEEK = 4;
const WORKING_WEEKS = 46;
const HOURLY_RATE = 60;

export function SavingsSlider() {
  const [people, setPeople] = useState(10);

  const annualHours = people * HOURS_PER_WEEK * WORKING_WEEKS;
  const annualValue = annualHours * HOURLY_RATE;

  const hoursDisplay = useAnimatedNumber(annualHours);
  const valueDisplay = useAnimatedNumber(annualValue);

  return (
    <div className="relative rounded-[2.5rem] bg-[#0B1A10] p-7 text-[#E8F5E4] shadow-[0_32px_80px_-28px_rgba(11,26,16,0.6)] sm:p-9">
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#66F745]/25 blur-2xl" />

      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#66F745]">
        Try it — what could AI give back?
      </p>

      <div className="mt-6 flex items-end justify-between gap-4">
        <label
          htmlFor="pulse-people"
          className="text-sm font-semibold text-[#E8F5E4]/75"
        >
          People on your team
        </label>
        <motion.span
          key={people}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="font-display text-4xl font-extrabold text-[#66F745]"
        >
          {people}
        </motion.span>
      </div>

      <input
        id="pulse-people"
        type="range"
        min={1}
        max={100}
        step={1}
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}
        className="mt-4 h-3 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#66F745]"
        style={{ accentColor: "#66F745" }}
      />
      <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-[#E8F5E4]/40">
        <span>1</span>
        <span>100</span>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-[1.5rem] bg-white/[0.07] p-5">
          <Clock className="h-5 w-5 text-[#66F745]" strokeWidth={2} />
          <p className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
            {hoursDisplay.toLocaleString("en-US")} h
          </p>
          <p className="mt-1 text-xs leading-snug text-[#E8F5E4]/60">
            returned to your team / year
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-[#66F745] p-5 text-[#0B1A10]">
          <TrendingUp className="h-5 w-5" strokeWidth={2.25} />
          <p className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
            €{valueDisplay.toLocaleString("en-US")}
          </p>
          <p className="mt-1 text-xs font-semibold leading-snug text-[#0B1A10]/75">
            estimated value / year
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-[#E8F5E4]/45">
        Assumes ~{HOURS_PER_WEEK} hours saved per person weekly after training,
        {" "}{WORKING_WEEKS} working weeks and €{HOURLY_RATE}/h. We map your real
        numbers on the call.
      </p>

      <a
        href={site.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#0B1A10] transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        <CalendarCheck className="h-4 w-4" strokeWidth={2.25} />
        Make it real — book a free call
      </a>
    </div>
  );
}

/* ---------- Use-case pills ---------- */
const UC_ICONS: Record<string, LucideIcon> = {
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
};

export function PulseUseCases({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {t.areas.map((area) => {
          const Icon = UC_ICONS[area.icon] ?? Mail;
          const selected = area.id === activeId;
          return (
            <motion.button
              key={area.id}
              type="button"
              onClick={() => setActiveId(area.id)}
              aria-pressed={selected}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors",
                selected
                  ? "bg-[#66F745] text-[#0B1A10] shadow-[0_10px_28px_-10px_rgba(102,247,69,0.9)]"
                  : "bg-[#E8F5E4] text-[#0B1A10]/70 hover:bg-[#d9efd2] hover:text-[#0B1A10]",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.25} />
              {area.name}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.99 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="mx-auto mt-8 max-w-3xl rounded-[2.5rem] bg-[#E8F5E4] p-7 sm:p-10"
        >
          <p className="text-center font-display text-xl font-bold leading-snug text-[#0B1A10] sm:text-2xl">
            {active.pain}
          </p>

          <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
            {active.solutions.map((s) => (
              <div
                key={s}
                className="rounded-[1.5rem] bg-white p-4 text-sm font-medium leading-relaxed text-[#0B1A10]/85"
              >
                <span className="mb-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#66F745]">
                  <Check className="h-3.5 w-3.5 text-[#0B1A10]" strokeWidth={3} />
                </span>
                {s}
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-[1.5rem] rounded-br-md bg-[#0B1A10] px-5 py-3.5 text-sm text-[#E8F5E4]">
                {active.examplePrompt}
              </p>
            </div>
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-[1.5rem] rounded-bl-md bg-white px-5 py-3.5 text-sm font-semibold text-[#0B1A10]">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#66F745]" />
                {active.exampleResult}
              </p>
            </div>
          </div>

          <div className="mt-7 text-center">
            <motion.a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0B1A10] px-7 py-3.5 text-sm font-extrabold text-[#66F745]"
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Card FAQ ---------- */
export function PulseFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "rounded-[1.75rem] transition-colors",
              isOpen ? "bg-[#E8F5E4]" : "bg-[#F4F9F2] hover:bg-[#E8F5E4]/70",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
            >
              <span className="font-display text-base font-bold text-[#0B1A10] sm:text-lg">
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isOpen
                    ? "rotate-180 bg-[#66F745] text-[#0B1A10]"
                    : "bg-white text-[#0B1A10]/60",
                )}
              >
                <ChevronDown className="h-[18px] w-[18px]" strokeWidth={2.5} />
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
                <p className="max-w-3xl px-6 pb-6 text-sm leading-relaxed text-[#0B1A10]/70">
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

/* ---------- Springy hover card wrapper ---------- */
export function SpringCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn("h-full", className)}
    >
      {children}
    </motion.div>
  );
}

/* ---------- CTA arrow button ---------- */
export function BounceCta({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-extrabold",
        dark
          ? "bg-[#0B1A10] text-[#66F745]"
          : "bg-[#66F745] text-[#0B1A10] shadow-[0_18px_44px_-14px_rgba(102,247,69,0.8)]",
      )}
    >
      {children}
      <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
    </motion.a>
  );
}
