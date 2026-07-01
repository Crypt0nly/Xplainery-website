"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
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

/* ================= Ambience (cursor / grain / progress) ================= */
export function D7Ambience() {
  return (
    <>
      <Cursor />
      <Grain />
      <ScrollProgress />
    </>
  );
}

/* ================= Light preloader ================= */
function LightPreloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.32, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => doneRef.current(), 260);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden rounded-b-[3rem] border-b border-line bg-bg px-6 py-10 sm:px-12"
      aria-hidden
    >
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.3em] text-subtle">
        <span>Xplainery</span>
        <span>Practical AI</span>
      </div>

      <div className="flex items-center justify-center">
        <motion.img
          src="/logo-mark.png"
          alt=""
          className="h-16 w-auto sm:h-20"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-end justify-between">
        <div className="h-px w-full max-w-[40vw] self-center overflow-hidden bg-line">
          <motion.div
            className="h-full origin-left"
            style={{ backgroundColor: LIME, scaleX: count / 100 }}
          />
        </div>
        <span className="font-display text-7xl font-bold tabular-nums leading-none text-ink sm:text-8xl">
          {count}
        </span>
      </div>
    </motion.div>
  );
}

/* ================= Nav ================= */
const LINKS = [
  { href: "#why", label: "Why" },
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Use cases" },
  { href: "#tools", label: "Free tools" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function D7Nav() {
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
          {LINKS.map((l) => (
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
              Book a Free Call
            </a>
          </Magnetic>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
            aria-label="Menu"
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
              {LINKS.map((l) => (
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
                Book a Free Call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================= Hero (classic layout, elevated) ================= */
export function D7Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
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

      {/* Background decoration with scroll parallax */}
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
        {/* Copy */}
        <div className="max-w-xl">
          <motion.div {...show(0)}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {t.badge}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            <SplitWords text={t.titleLead} active={loaded} delay={0.25} stagger={0.07} />{" "}
            {/* bg-clip-text must live on the animated word itself — a parent
                gradient doesn't survive the transformed children. */}
            <span className="text-gradient">
              <SplitWords
                text={t.titleHighlight}
                wordClassName="text-gradient"
                active={loaded}
                delay={0.4}
                stagger={0.07}
              />
            </span>{" "}
            <SplitWords text={t.titleTrail} active={loaded} delay={0.55} stagger={0.07} />
          </h1>

          <motion.p
            {...show(3)}
            className="mt-6 text-lg leading-relaxed text-muted"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            {...show(4)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.25}>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand !px-6 !py-3.5 text-base"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                {t.ctaPrimary}
              </a>
            </Magnetic>
            <a href="#services" className="btn-ghost !px-6 !py-3.5 text-base">
              {t.ctaSecondary}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </motion.div>

          <motion.div
            {...show(5)}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle"
          >
            {[dict.common.free, dict.common.minutes, dict.common.noObligation].map(
              (label) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-brand-ink" strokeWidth={2.5} />
                  {label}
                </span>
              ),
            )}
          </motion.div>

          <motion.dl
            {...show(6)}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {t.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  <Counter value={s.value} />
                </dt>
                <dd className="mt-1 text-xs leading-snug text-subtle">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual — 3D tilt + floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <TiltCard max={5} className="rounded-4xl">
            <div className="card overflow-hidden rounded-4xl shadow-lift">
              <div className="flex items-center gap-2 border-b border-line bg-elevated px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-medium text-subtle">
                  Xplainery · AI Workspace
                </span>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-[#08140d]">
                    {t.floatingCards.one}
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-ink to-accent text-[10px] font-bold text-white">
                    AI
                  </div>
                  <div className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-sm border border-line bg-bg px-4 py-3">
                    <div className="h-2.5 w-44 rounded-full bg-line" />
                    <div className="h-2.5 w-52 rounded-full bg-line" />
                    <div className="h-2.5 w-36 rounded-full bg-line" />
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-lg bg-brand-soft px-2 py-1 text-[11px] font-medium text-brand-ink">
                        Draft ready
                      </span>
                      <span className="rounded-lg bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent">
                        On-brand
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-line bg-bg px-4 py-3">
                  <div className="h-2.5 flex-1 rounded-full bg-line" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-[#08140d]">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Floating chips */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-20 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-left-8"
          >
            <p className="text-xs font-semibold text-ink">{t.floatingCards.two}</p>
          </motion.div>
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-right-6"
          >
            <p className="text-xs font-semibold text-brand-ink">
              {t.floatingCards.three}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================= Industry marquee (light, velocity-reactive) ================= */
export function D7Marquee({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-line bg-surface/60 py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
        {dict.logos.label}
      </p>
      <div className="mask-fade-x mt-6">
        <VelocityMarquee baseVelocity={1.1}>
          {dict.logos.items.map((item) => (
            <span key={item} className="flex items-center">
              <span className="px-7 font-display text-2xl font-bold tracking-tight text-ink/25 sm:text-3xl">
                {item}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: LIME }}
              />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
