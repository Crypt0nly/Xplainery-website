"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Plus,
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
  User,
  Users,
  MapPin,
  Mic,
  Mail,
  Megaphone,
  Headphones,
  Search,
  ClipboardList,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  Counter,
  Magnetic,
  SplitWords,
  TiltCard,
  useReducedMotionSafe,
  DEEP,
  PANEL,
  PAPER,
  HONEY,
  LIME,
  INK,
  EVERGREEN,
} from "./effects";

const WHY_ICONS: Record<string, LucideIcon> = {
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
};

const SVC_ICONS: Record<string, LucideIcon> = { User, Users, MapPin, Mic };

const UC_ICONS: Record<string, LucideIcon> = {
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
};

/* ================= Nav (mix-blend inverts over any zone) ================= */
export function OdysseyNav() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-9 z-[85] mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10">
          <a href="#top" className="pointer-events-auto flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-dark.png" alt="Xplainery" className="h-7 w-auto" />
            <span className="font-display text-base font-extrabold uppercase tracking-widest text-white">
              Xplainery
            </span>
          </a>
          <div className="pointer-events-auto hidden items-center gap-7 lg:mr-44 lg:flex">
            {[
              ["#approach", "Approach"],
              ["#services", "Services"],
              ["#lab", "The Lab"],
              ["#pricing", "Pricing"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed right-5 top-[52px] z-[86] sm:right-10">
        <Magnetic strength={0.3}>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold sm:inline-flex"
            style={{ backgroundColor: LIME, color: INK }}
          >
            Book a call
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </Magnetic>
      </div>
    </>
  );
}

/* ================= Why — stacking deck ================= */
export function StackDeck({ dict }: { dict: Dictionary }) {
  const t = dict.why;
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const n = t.items.length;

  return (
    <div id="approach" className="scroll-mt-20 px-4 sm:px-8">
      <div className="mx-auto max-w-5xl pb-6 pt-24 sm:pt-32">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
          style={{ color: "#1d6f10" }}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl"
          style={{ color: INK }}
        >
          <SplitWords text={t.title} />
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: `${INK}99` }}>
          {t.subtitle}
        </p>
      </div>

      <div ref={container} className="relative mx-auto max-w-5xl pb-[12vh]">
        {t.items.map((item, i) => {
          const Icon = WHY_ICONS[item.icon] ?? Target;
          return (
            <DeckCard
              key={item.title}
              index={i}
              total={n}
              progress={scrollYProgress}
            >
              <div className="flex h-full flex-col justify-between gap-8 p-8 sm:p-12">
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={
                      i % 2 === 0
                        ? { backgroundColor: INK, color: LIME }
                        : { backgroundColor: LIME, color: INK }
                    }
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <span
                    className="font-display text-6xl font-extrabold sm:text-7xl"
                    style={{ color: `${INK}14` }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl"
                    style={{ color: INK }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
                    style={{ color: `${INK}A6` }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </DeckCard>
          );
        })}
      </div>
    </div>
  );
}

function DeckCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  children: React.ReactNode;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const bgs = [PAPER, HONEY, "#ffffff", HONEY, "#ffffff", PAPER];

  return (
    <div
      className="sticky mb-[6vh]"
      style={{ top: `calc(11vh + ${index * 16}px)` }}
    >
      <motion.div
        style={{ scale, backgroundColor: bgs[index % bgs.length] }}
        className="h-[58vh] min-h-[400px] origin-top overflow-hidden rounded-[2.5rem] border shadow-[0_24px_60px_-30px_rgba(11,26,16,0.25)] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ================= Services — pinned horizontal gallery ================= */
export function HorizontalServices({ dict }: { dict: Dictionary }) {
  const t = dict.services;
  const targetRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const reduce = useReducedMotionSafe();

  // Measure how far the strip must travel so the last panel lands in view
  // at every breakpoint (a % endpoint resolves against the wrong box).
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    function measure() {
      const el = stripRef.current;
      if (el) setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  if (reduce) {
    // Reduced motion: plain vertical list.
    return (
      <div id="services" className="scroll-mt-20 px-5 py-24 sm:px-10">
        <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-6xl">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {t.items.map((s, i) => (
            <ServicePanel key={s.name} s={s} i={i} bestForLabel={t.bestForLabel} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="services" ref={targetRef} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={stripRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 pl-[5vw] pr-[6vw] will-change-transform"
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center sm:w-[46vw] lg:w-[34vw]">
            <p
              className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
              style={{ color: LIME }}
            >
              {t.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-white sm:text-6xl">
              {t.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#E8F5E4]/60 sm:text-lg">
              {t.subtitle}
            </p>
            <p className="mt-10 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-[#E8F5E4]/60">
              Keep scrolling
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" style={{ color: LIME }} />
              </motion.span>
            </p>
          </div>

          {t.items.map((s, i) => (
            <ServicePanel key={s.name} s={s} i={i} bestForLabel={t.bestForLabel} />
          ))}
        </motion.div>

        {/* Progress track */}
        <div className="pointer-events-none absolute inset-x-[5vw] bottom-8">
          <div className="h-px w-full bg-white/15">
            <motion.div
              className="h-full origin-left"
              style={{ scaleX: scrollYProgress, backgroundColor: LIME }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePanel({
  s,
  i,
  bestForLabel,
}: {
  s: Dictionary["services"]["items"][number];
  i: number;
  bestForLabel: string;
}) {
  const Icon = SVC_ICONS[s.icon] ?? User;
  return (
    <article
      className="group relative flex w-[82vw] shrink-0 flex-col overflow-hidden rounded-[2.5rem] border border-white/10 p-8 transition-colors duration-300 hover:border-[#66F745]/40 sm:w-[54vw] sm:p-10 lg:w-[38vw]"
      style={{ backgroundColor: PANEL }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${LIME}22` }}
      />
      <div className="flex items-start justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: LIME, color: INK }}
        >
          <Icon className="h-7 w-7" strokeWidth={2} />
        </span>
        <span
          className="font-display text-7xl font-extrabold leading-none"
          style={{ color: "#E8F5E410" }}
        >
          0{i + 1}
        </span>
      </div>
      <h3 className="mt-8 font-display text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl">
        {s.name}
      </h3>
      <p
        className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.24em]"
        style={{ color: LIME }}
      >
        {s.tagline}
      </p>
      <p className="mt-5 text-sm leading-relaxed text-[#E8F5E4]/60 sm:text-base">
        {s.body}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {s.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#E8F5E4]/85">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: LIME }}
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>
      <p className="mt-7 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#E8F5E4]/45">
        {bestForLabel} — {s.bestFor}
      </p>
    </article>
  );
}

/* ================= Stats band ================= */
export function StatsBand({ dict }: { dict: Dictionary }) {
  return (
    <div className="px-5 pb-28 pt-4 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
        {dict.hero.stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-[2rem] border border-white/10 p-8 text-center sm:p-10"
            style={{ backgroundColor: i === 1 ? `${LIME}0F` : "transparent" }}
          >
            <Counter
              value={s.value}
              className="font-display text-6xl font-extrabold tabular-nums sm:text-7xl"
            />
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E8F5E4]/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Use-case lab (typing terminal) ================= */
export function UseCaseLab({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];
  const reduce = useReducedMotionSafe();

  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (reduce) {
      setTyped(active.examplePrompt);
      setShowResult(true);
      return;
    }
    setTyped("");
    setShowResult(false);
    let i = 0;
    let revealId: number | undefined;
    const prompt = active.examplePrompt;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(prompt.slice(0, i));
      if (i >= prompt.length) {
        window.clearInterval(id);
        revealId = window.setTimeout(() => setShowResult(true), 350);
      }
    }, 18);
    return () => {
      window.clearInterval(id);
      if (revealId !== undefined) window.clearTimeout(revealId);
    };
  }, [active.examplePrompt, reduce]);

  return (
    <div id="lab" className="scroll-mt-20 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
          style={{ color: "#1d6f10" }}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl"
          style={{ color: INK }}
        >
          <SplitWords text={t.title} />
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: `${INK}99` }}>
          {t.subtitle}
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Selector */}
          <div>
            <p
              className="text-[10px] font-extrabold uppercase tracking-[0.24em]"
              style={{ color: `${INK}99` }}
            >
              {t.selectHint}
            </p>
            <ul className="mt-4">
              {t.areas.map((area, i) => {
                const Icon = UC_ICONS[area.icon] ?? Mail;
                const selected = area.id === activeId;
                return (
                  <li key={area.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(area.id)}
                      aria-pressed={selected}
                      className="group flex w-full items-center gap-4 border-b py-4 text-left transition-all"
                      style={{ borderColor: `${INK}1A` }}
                    >
                      <span
                        className="font-display text-xs font-bold"
                        style={{ color: `${INK}55` }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                          selected ? "" : "group-hover:scale-110",
                        )}
                        style={
                          selected
                            ? { backgroundColor: LIME, color: INK }
                            : { backgroundColor: HONEY, color: "#1d6f10" }
                        }
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-lg font-extrabold uppercase tracking-tight transition-transform sm:text-2xl",
                          selected ? "" : "group-hover:translate-x-1.5",
                        )}
                        style={{ color: selected ? INK : `${INK}80` }}
                      >
                        {area.name}
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-all",
                          selected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                        )}
                        style={{ color: "#1d6f10" }}
                        strokeWidth={2.5}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Terminal panel */}
          <TiltCard max={4} className="rounded-[2rem]">
            <div
              className="flex h-full flex-col overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-40px_rgba(11,26,16,0.5)]"
              style={{ backgroundColor: DEEP }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: LIME }} />
                <span className="ml-3 text-xs font-semibold text-[#E8F5E4]/40">
                  xplainery — ai workspace
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-lg font-bold leading-snug text-white sm:text-xl"
                  >
                    {active.pain}
                  </motion.p>
                </AnimatePresence>

                <div className="mt-6">
                  <p
                    className="text-[10px] font-extrabold uppercase tracking-[0.24em]"
                    style={{ color: `#E8F5E4B3` }}
                  >
                    {t.promptLabel}
                  </p>
                  <p className="mt-2 min-h-[76px] rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 font-mono text-[13px] leading-relaxed text-[#E8F5E4]/90">
                    <span style={{ color: LIME }}>&gt;&nbsp;</span>
                    {typed}
                    <motion.span
                      aria-hidden
                      animate={reduce ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.9, repeat: Infinity }
                      }
                      className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px]"
                      style={{ backgroundColor: LIME }}
                    />
                  </p>
                </div>

                <div className="mt-4 min-h-[92px]">
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      >
                        <p
                          className="text-[10px] font-extrabold uppercase tracking-[0.24em]"
                          style={{ color: LIME }}
                        >
                          {t.resultLabel}
                        </p>
                        <p
                          className="mt-2 rounded-xl px-4 py-3 text-sm font-semibold leading-relaxed"
                          style={{ backgroundColor: `${LIME}1A`, color: "#ffffff" }}
                        >
                          {active.exampleResult}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {active.solutions.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 text-sm text-[#E8F5E4]/75"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: LIME }}
                        strokeWidth={2.5}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Magnetic strength={0.25}>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-shadow hover:shadow-[0_0_36px_-8px_rgba(102,247,69,0.8)]"
                      style={{ backgroundColor: LIME, color: INK }}
                    >
                      {t.cta}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}

/* ================= Pricing — tilt cards ================= */
export function PricingTilt({ dict }: { dict: Dictionary }) {
  const t = dict.pricing;
  return (
    <div id="pricing" className="scroll-mt-20 px-5 pb-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
          style={{ color: "#1d6f10" }}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl"
          style={{ color: INK }}
        >
          <SplitWords text={t.title} />
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: `${INK}99` }}>
          {t.subtitle}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.plans.map((p) => (
            <TiltCard key={p.name} className="rounded-[2rem]">
              <article
                className="relative flex h-full flex-col rounded-[2rem] p-8"
                style={
                  p.featured
                    ? { backgroundColor: EVERGREEN, color: HONEY }
                    : {
                        backgroundColor: "#ffffff",
                        color: INK,
                        boxShadow: "0 20px 50px -30px rgba(11,26,16,0.25)",
                      }
                }
              >
                {p.featured && (
                  <span
                    className="absolute -top-3.5 left-8 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide"
                    style={{ backgroundColor: LIME, color: INK }}
                  >
                    {t.popularLabel}
                  </span>
                )}
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-4">
                  <span
                    className="font-display text-5xl font-extrabold"
                    style={p.featured ? { color: LIME } : undefined}
                  >
                    {p.price}
                  </span>
                  {p.unit && (
                    <span className="ml-1.5 text-sm opacity-60">{p.unit}</span>
                  )}
                </p>
                <p className="mt-4 text-sm leading-relaxed opacity-70">
                  {p.description}
                </p>
                <ul
                  className="mt-6 flex-1 space-y-2.5 border-t pt-6"
                  style={{
                    borderColor: p.featured ? "#E8F5E426" : `${INK}14`,
                  }}
                >
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: p.featured ? LIME : "#1d6f10" }}
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2} className="mt-8 block">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold"
                    style={
                      p.featured
                        ? { backgroundColor: LIME, color: INK }
                        : { backgroundColor: INK, color: LIME }
                    }
                  >
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </Magnetic>
              </article>
            </TiltCard>
          ))}
        </div>
        <p className="mt-8 text-center text-xs" style={{ color: `${INK}99` }}>
          {t.vatNote}
        </p>
      </div>
    </div>
  );
}

/* ================= Founder — parallax portrait ================= */
export function FounderReveal({ dict }: { dict: Dictionary }) {
  const t = dict.founder;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="px-5 pb-28 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          {/* Scale lives in the motion style so it composes with the
              parallax translate (motion's inline transform would otherwise
              override the Tailwind scale and expose blank bands). */}
          <motion.img
            src={site.founder.photo}
            alt={t.name}
            style={{ y, scale: 1.22 }}
            className="w-full object-cover will-change-transform"
          />
          <div
            className="absolute bottom-4 left-4 rounded-full px-5 py-2.5 text-sm font-extrabold"
            style={{ backgroundColor: DEEP, color: HONEY }}
          >
            {t.name} — {t.role}
          </div>
        </div>

        <div>
          <p
            className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
            style={{ color: "#1d6f10" }}
          >
            {t.eyebrow}
          </p>
          <blockquote
            className="mt-6 font-display text-3xl font-extrabold uppercase leading-[1.04] tracking-tight sm:text-[2.6rem]"
            style={{ color: INK }}
          >
            <SplitWords text={`“${t.quote}”`} stagger={0.035} />
          </blockquote>
          <p
            className="mt-7 max-w-xl text-base leading-relaxed"
            style={{ color: `${INK}99` }}
          >
            {t.paragraphs[0]}
          </p>
          <dl
            className="mt-9 grid max-w-xl grid-cols-3 divide-x border-y"
            style={{ borderColor: `${INK}1A` }}
          >
            {t.highlights.map((h) => (
              <div
                key={h.label}
                className="px-3 py-5 text-center sm:px-4"
                style={{ borderColor: `${INK}1A` }}
              >
                <dt className="font-display text-sm font-extrabold sm:text-base" style={{ color: INK }}>
                  {h.value}
                </dt>
                <dd
                  className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px]"
                  style={{ color: `${INK}99` }}
                >
                  {h.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ================= FAQ ================= */
export function OdysseyFaq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="scroll-mt-20 px-5 pb-32 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
          style={{ color: "#1d6f10" }}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl"
          style={{ color: INK }}
        >
          <SplitWords text={t.title} />
        </h2>

        <div className="mt-12 border-t" style={{ borderColor: `${INK}1A` }}>
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b" style={{ borderColor: `${INK}1A` }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`d5-faq-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-lg font-extrabold tracking-tight transition-transform sm:text-xl",
                      isOpen ? "" : "group-hover:translate-x-1.5",
                    )}
                    style={{ color: INK }}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen ? "rotate-45" : "",
                    )}
                    style={
                      isOpen
                        ? { backgroundColor: INK, borderColor: INK, color: LIME }
                        : { borderColor: `${INK}33`, color: `${INK}99` }
                    }
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  id={`d5-faq-${i}`}
                  className="grid transition-all duration-300"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? "visible" : "hidden",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-2xl pb-6 text-sm leading-relaxed sm:text-base"
                      style={{ color: `${INK}99` }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= Final CTA — orbiting circle button ================= */
export function FinalCta({ dict }: { dict: Dictionary }) {
  const t = dict.cta;
  const reduce = useReducedMotionSafe();
  return (
    <div className="relative flex flex-col items-center px-5 py-28 text-center sm:py-40">
      <h2 className="max-w-5xl font-display text-[2.6rem] font-extrabold uppercase leading-[0.96] tracking-tight text-white sm:text-7xl">
        <SplitWords text={t.title} />
      </h2>
      <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#E8F5E4]/60">
        {t.subtitle}
      </p>

      <div className="relative mt-16">
        {/* Orbiting label */}
        <motion.svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -inset-10 h-[calc(100%+80px)] w-[calc(100%+80px)]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path
              id="orbit"
              d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
            />
          </defs>
          <text
            fill="#E8F5E4"
            opacity={0.45}
            fontSize="10.5"
            fontWeight={700}
            letterSpacing="2.5"
          >
            <textPath href="#orbit">
              FREE 30-MINUTE CALL • NO OBLIGATION • EN · DE · ES • PRACTICAL AI •
            </textPath>
          </text>
        </motion.svg>

        <Magnetic strength={0.45}>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-44 w-44 flex-col items-center justify-center gap-1.5 rounded-full text-center transition-shadow hover:shadow-[0_0_80px_-16px_rgba(102,247,69,0.9)] sm:h-52 sm:w-52"
            style={{ backgroundColor: LIME, color: INK }}
          >
            <span className="font-display text-lg font-extrabold uppercase leading-tight sm:text-xl">
              Book a<br />free call
            </span>
            <ArrowUpRight className="h-6 w-6" strokeWidth={2.5} />
          </a>
        </Magnetic>
      </div>

      <a
        href="#pricing"
        className="mt-14 text-xs font-extrabold uppercase tracking-[0.24em] text-[#E8F5E4]/70 underline decoration-[#66F745] decoration-2 underline-offset-8 transition-colors hover:text-white"
      >
        {t.secondary}
      </a>
    </div>
  );
}

/* ================= Footer (revealed behind the page) ================= */
export function OdysseyFooter({
  dict,
  revealed,
  measureRef,
}: {
  dict: Dictionary;
  /** Curtain state — hidden keeps the fixed footer out of the tab order
      and accessibility tree until the page has scrolled far enough to
      actually expose it. */
  revealed: boolean;
  measureRef: React.Ref<HTMLElement>;
}) {
  return (
    <footer
      ref={measureRef}
      className="fixed inset-x-0 bottom-0 z-0 flex min-h-[80vh] flex-col justify-between gap-10 overflow-hidden px-5 pb-8 pt-20 sm:px-10"
      style={{
        backgroundColor: DEEP,
        visibility: revealed ? "visible" : "hidden",
      }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p
            className="text-[11px] font-extrabold uppercase tracking-[0.3em]"
            style={{ color: LIME }}
          >
            {dict.contact.eyebrow}
          </p>
          <p className="mt-4 max-w-md font-display text-2xl font-extrabold uppercase leading-tight text-white sm:text-3xl">
            {dict.contact.title}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#E8F5E4] underline decoration-[#66F745] decoration-2 underline-offset-8 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" strokeWidth={2.25} style={{ color: LIME }} />
            {site.email}
          </a>
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <Magnetic strength={0.3}>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-extrabold"
              style={{ backgroundColor: LIME, color: INK }}
            >
              {dict.contact.bookCta}
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
          </Magnetic>
          <div className="mt-2 flex items-center gap-2">
            {[
              { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: site.social.twitter, icon: Twitter, label: "X / Twitter" },
              { href: site.social.youtube, icon: Youtube, label: "YouTube" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#E8F5E4]/60 transition-colors hover:border-[#66F745] hover:text-[#66F745]"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[12.5vw] font-extrabold uppercase leading-[0.8] tracking-tight"
          style={{ color: "#E8F5E40D" }}
        >
          Xplainery
        </p>
        <div className="mx-auto mt-4 flex w-full max-w-6xl flex-col items-start justify-between gap-2 border-t border-white/10 pt-5 text-[11px] font-semibold text-[#E8F5E4]/60 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.name}. {dict.footer.legal.rights}
          </span>
          <span>{dict.footer.madeIn}</span>
        </div>
      </div>
    </footer>
  );
}
