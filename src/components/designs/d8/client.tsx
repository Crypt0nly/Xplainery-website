"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Clock,
  FileCheck2,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import {
  Counter,
  Cursor,
  Grain,
  Magnetic,
  ScrollProgress,
  SplitWords,
  TiltCard,
  VelocityMarquee,
  useReducedMotionSafe,
  LIME,
} from "../d5/effects";
import { LightPreloader } from "../d7/client";
import { nav, hero, industries, tiers, process, contact } from "./content";

/* ================= Ambience ================= */
export function D8Ambience() {
  return (
    <>
      <Cursor />
      <Grain />
      <ScrollProgress />
    </>
  );
}

/* ================= Nav ================= */
export function D8Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label={site.name} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((l) => (
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
          <Magnetic strength={0.25} className="hidden md:inline-block">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand !px-4 !py-2.5"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={2} />
              Book a free call
            </a>
          </Magnetic>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x pb-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1 rounded-3xl border border-line bg-elevated p-3 shadow-lift">
              {nav.map((l) => (
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
                Book a free call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================= Hero ================= */
export function D8Hero() {
  const reduce = useReducedMotionSafe();
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) setLoaded(true);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 26 });
  const orbY1 = useTransform(smooth, [0, 1], ["0%", "40%"]);
  const orbY2 = useTransform(smooth, [0, 1], ["0%", "-32%"]);
  const contentY = useTransform(smooth, [0, 1], ["0%", "-6%"]);
  const contentOpacity = useTransform(smooth, [0, 0.9], [1, 0.35]);

  const show = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.65,
      delay: 0.12 * i + 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section ref={wrapRef} className="relative overflow-hidden pt-36 lg:pt-44">
      <AnimatePresence>
        {!loaded && !reduce && <LightPreloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern mask-fade-b opacity-60" />
        <motion.div
          className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]"
          style={reduce ? undefined : { y: orbY1 }}
        />
        <motion.div
          className="absolute right-[-10%] top-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[120px]"
          style={reduce ? undefined : { y: orbY2 }}
        />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28"
      >
        <div className="max-w-xl">
          <motion.div {...show(0)}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[3.4rem] font-bold leading-[0.98] tracking-tight text-ink sm:text-7xl">
            <SplitWords text={hero.title} active={loaded} delay={0.25} stagger={0.1} />
          </h1>
          <p className="mt-3 font-display text-2xl font-semibold text-brand-ink sm:text-3xl">
            <SplitWords text={hero.tagline} active={loaded} delay={0.5} stagger={0.06} />
          </p>

          <motion.p {...show(3)} className="mt-6 text-lg leading-relaxed text-muted">
            {hero.body}
          </motion.p>

          <motion.div {...show(4)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic strength={0.25}>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand !px-6 !py-3.5 text-base"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                {hero.primary}
              </a>
            </Magnetic>
            <a href="#services" className="btn-ghost !px-6 !py-3.5 text-base">
              {hero.secondary}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </motion.div>

          <motion.div {...show(5)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
            {hero.chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-brand-ink" strokeWidth={2.5} />
                {c}
              </span>
            ))}
          </motion.div>

          <motion.dl {...show(6)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  <Counter value={s.value} />
                </dt>
                <dd className="mt-1 text-xs leading-snug text-subtle">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual — the documented training record */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <TiltCard max={5} className="rounded-4xl">
            <div className="card overflow-hidden rounded-4xl shadow-lift">
              <div className="flex items-center justify-between border-b border-line bg-elevated px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-[#08140d]">
                    <FileCheck2 className="h-[18px] w-[18px]" strokeWidth={2.25} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{hero.record.title}</p>
                    <p className="text-[11px] text-subtle">{hero.record.subtitle}</p>
                  </div>
                </div>
                <span className="hidden items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-ink sm:inline-flex">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
                  {hero.record.badge}
                </span>
              </div>
              <ul className="divide-y divide-line px-5">
                {hero.record.rows.map((r, i) => (
                  <motion.li
                    key={r.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={loaded ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-muted">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand">
                        <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
                      </span>
                      {r.label}
                    </span>
                    <span className="text-sm font-semibold text-ink">{r.value}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-line bg-bg px-5 py-3.5 text-xs text-subtle">
                <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                Generated after every workshop — yours to keep.
              </div>
            </div>
          </TiltCard>

          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 -top-5 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-left-8"
          >
            <p className="text-xs font-semibold text-ink">{hero.floating[0]}</p>
          </motion.div>
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-right-6"
          >
            <p className="text-xs font-semibold text-brand-ink">{hero.floating[1]}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================= Industry marquee ================= */
export function IndustryMarquee() {
  return (
    <section className="border-y border-line bg-surface/60 py-8">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
        Built for established industries
      </p>
      <div className="mask-fade-x mt-5">
        <VelocityMarquee baseVelocity={1.1}>
          {industries.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-7 font-display text-2xl font-bold tracking-tight text-ink/25 sm:text-3xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LIME }} />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

/* ================= Tier explorer ================= */
export function TierExplorer() {
  const [activeId, setActiveId] = useState(tiers[0].id);
  const active = tiers.find((t) => t.id === activeId) ?? tiers[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="grid content-start gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
        {tiers.map((t) => {
          const selected = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              aria-pressed={selected}
              className={cn(
                "group flex items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all",
                selected
                  ? "border-brand bg-brand-soft shadow-soft"
                  : "border-line bg-surface hover:border-brand-ink/40 hover:bg-brand-soft/50",
              )}
            >
              <span
                className={cn(
                  "font-display text-sm font-bold",
                  selected ? "text-brand-ink" : "text-subtle",
                )}
              >
                {t.n}
              </span>
              <span>
                <span className="block font-display text-base font-bold text-ink">{t.name}</span>
                <span className="block text-xs text-subtle">{t.kicker}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="card relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand/10 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink">
              Tier {active.n} · {active.kicker}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{active.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{active.summary}</p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Format", active.format],
                ["Duration", active.duration],
                ["You get", active.deliverable],
                ["Best for", active.bestFor],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-bg p-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-subtle">{k}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-subtle">How it runs</p>
              <ol className="mt-3 flex flex-wrap items-center gap-2">
                {active.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-ink">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-[#08140d]">
                        {i + 1}
                      </span>
                      {s}
                    </span>
                    {i < active.steps.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-subtle" strokeWidth={2} />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-lg font-bold text-ink">{active.price}</p>
              <Magnetic strength={0.2}>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand"
                >
                  Talk about {active.name}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================= Journey — scroll-driven stepper ================= */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl">
      <span aria-hidden className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
      <motion.span
        aria-hidden
        className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px origin-top"
        style={{ scaleY, backgroundColor: LIME }}
      />
      {process.steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex gap-6 pb-10 pl-0 last:pb-0"
        >
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-display text-sm font-bold text-ink shadow-soft">
            {i + 1}
          </span>
          <div className="pt-1.5">
            <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/* ================= Contact form (front-end demo) ================= */
export function D8ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand-ink";

  if (sent) {
    return (
      <div className="card flex flex-col items-center justify-center p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-[#08140d]">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-ink">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Name</span>
          <input required name="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
          <input required type="email" name="email" className={field} placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Company (optional)</span>
          <input name="company" className={field} placeholder="Company" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Team size</span>
          <select name="size" className={field} defaultValue={contact.sizes[2]}>
            {contact.sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-muted">I'm interested in</span>
          <select name="interest" className={field} defaultValue={contact.interests[0]}>
            {contact.interests.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-muted">What are you trying to do?</span>
          <textarea
            name="message"
            rows={4}
            className={field}
            placeholder="A sentence or two is plenty."
          />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">No newsletter, no follow-up sequence — just a reply.</p>
        <Magnetic strength={0.2}>
          <button type="submit" className="btn-brand">
            {contact.submit}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
