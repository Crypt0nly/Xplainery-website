"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import {
  Cursor,
  Grain,
  Magnetic,
  Preloader,
  ScrollProgress,
  SplitWords,
  VelocityMarquee,
  useReducedMotionSafe,
  DEEP,
  PAPER,
  LIME,
  INK,
} from "./effects";
import {
  OdysseyNav,
  StackDeck,
  HorizontalServices,
  StatsBand,
  UseCaseLab,
  PricingTilt,
  FounderReveal,
  OdysseyFaq,
  FinalCta,
  OdysseyFooter,
} from "./sections";

export function Odyssey({ dict }: { dict: Dictionary }) {
  const reduce = useReducedMotionSafe();
  const [loaded, setLoaded] = useState(false);

  // Curtain-reveal footer: measure its real height for the reveal gap and
  // only expose it (visibility + tab order) once the end of the page nears.
  const footerRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState<number | null>(null);
  const [footerRevealed, setFooterRevealed] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setFooterH(el.offsetHeight));
    ro.observe(el);
    setFooterH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) =>
      setFooterRevealed(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Skip the preloader entirely for reduced motion.
  useEffect(() => {
    if (reduce) setLoaded(true);
  }, [reduce]);

  // Lock scroll during the preloader.
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div id="top">
      <AnimatePresence>
        {!loaded && !reduce && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Cursor />
      <Grain />
      <ScrollProgress />
      <OdysseyNav />

      {/* Main content sits above the fixed footer; the spacer after it
          exposes the footer as a curtain reveal. */}
      <main className="relative z-10">
        {/* ====== ZONE 0 — dark hero (pinned, scrolls out cinematically) ====== */}
        <Hero dict={dict} loaded={loaded} />

        {/* ====== ZONE A — light: manifesto + why deck + lab ====== */}
        <section
          className="relative z-20 -mt-[3rem] rounded-t-[3rem]"
          style={{ backgroundColor: PAPER }}
        >
          <Manifesto dict={dict} />
          <StackDeck dict={dict} />
        </section>

        {/* ====== ZONE B — dark: marquee + horizontal services + stats ======
            NOTE: no overflow-hidden here — an overflow-hidden ancestor
            disables position:sticky, killing the pinned gallery. The
            marquee clips itself. */}
        <section
          className="relative z-30 -mt-[3rem] rounded-t-[3rem]"
          style={{ backgroundColor: DEEP }}
        >
          <div className="py-16 sm:py-20">
            <VelocityMarquee baseVelocity={1.4}>
              {dict.logos.items.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-6 font-display text-5xl font-extrabold uppercase tracking-tight text-white sm:text-7xl">
                    {item}
                  </span>
                  <Asterisk
                    className="h-8 w-8 sm:h-12 sm:w-12"
                    style={{ color: LIME }}
                    strokeWidth={2}
                  />
                </span>
              ))}
            </VelocityMarquee>
            {/* Decorative duplicate of the row above — hidden from AT. */}
            <div aria-hidden>
              <VelocityMarquee baseVelocity={-1.4} className="mt-4">
                {dict.logos.items.map((item) => (
                  <span key={item} className="flex items-center">
                    <span
                      className="px-6 font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${LIME}66`,
                      }}
                    >
                      {item}
                    </span>
                    <Asterisk
                      className="h-8 w-8 sm:h-12 sm:w-12 text-white/25"
                      strokeWidth={2}
                    />
                  </span>
                ))}
              </VelocityMarquee>
            </div>
          </div>

          <HorizontalServices dict={dict} />
          <StatsBand dict={dict} />
        </section>

        {/* ====== ZONE C — light: use-case lab + pricing + founder + faq ====== */}
        <section
          className="relative z-40 -mt-[3rem] rounded-t-[3rem]"
          style={{ backgroundColor: PAPER }}
        >
          <UseCaseLab dict={dict} />
          <PricingTilt dict={dict} />
          <FounderReveal dict={dict} />
          <OdysseyFaq dict={dict} />
        </section>

        {/* ====== ZONE D — dark: final CTA ====== */}
        <section
          className="relative z-50 -mt-[3rem] rounded-t-[3rem] rounded-b-[3rem]"
          style={{ backgroundColor: DEEP }}
        >
          <FinalCta dict={dict} />
        </section>

        {/* Marks where the curtain reveal begins. */}
        <div ref={sentinelRef} aria-hidden className="h-px" />
      </main>

      {/* In-flow spacer that creates the reveal gap — a bottom margin on
          <main> would not extend the document's scrollable area. */}
      <div
        aria-hidden
        className="h-[80vh]"
        style={footerH ? { height: footerH } : undefined}
      />

      <OdysseyFooter
        dict={dict}
        revealed={footerRevealed}
        measureRef={footerRef}
      />
    </div>
  );
}

/* ================= Hero ================= */
function Hero({ dict, loaded }: { dict: Dictionary; loaded: boolean }) {
  const t = dict.hero;
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  const scale = useTransform(smooth, [0, 1], [1, 0.9]);
  const opacity = useTransform(smooth, [0, 0.75], [1, 0.15]);
  const yUp = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const filter = useTransform(smooth, (v) => `blur(${v * 8}px)`);
  const orbY1 = useTransform(smooth, [0, 1], ["0%", "36%"]);
  const orbY2 = useTransform(smooth, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={wrapRef} className="relative sm:h-[168vh]" style={{ backgroundColor: DEEP }}>
      {/* Pin + clip only from sm up: on small phones the hero sizes to its
          content and scrolls normally so nothing (like the CTA) gets clipped. */}
      <div className="relative flex min-h-screen flex-col overflow-hidden sm:sticky sm:top-0 sm:h-screen">
        {/* Ambient */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-30vh] h-[70vh] w-[120vw] -translate-x-1/2 rounded-full blur-[130px]"
          style={{ backgroundColor: `${LIME}17`, y: orbY1 }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-[-20vh] h-[55vh] w-[55vh] rounded-full blur-[120px]"
          style={{ backgroundColor: "#22352866", y: orbY2 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] grid-pattern"
        />

        <motion.div
          style={reduce ? undefined : { scale, opacity, y: yUp, filter }}
          className="relative flex flex-1 flex-col justify-between px-5 pb-10 pt-32 will-change-transform sm:px-10 sm:pt-36"
        >
          {/* Badge */}
          <div className="mx-auto w-full max-w-6xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E8F5E4]/70"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: LIME }}
                animate={
                  reduce ? undefined : { opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t.badge}
            </motion.span>
          </div>

          {/* Headline */}
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight">
              <span className="block text-[13.5vw] text-white sm:text-[min(6.6vw,7rem)]">
                <SplitWords text={t.titleLead} active={loaded} delay={0.25} stagger={0.09} />
              </span>
              <span
                className="block text-[13.5vw] sm:text-[min(6.6vw,7rem)]"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `2px ${LIME}`,
                }}
              >
                <SplitWords
                  text={t.titleHighlight}
                  active={loaded}
                  delay={0.42}
                  stagger={0.09}
                />
              </span>
              <span className="block text-[13.5vw] text-white sm:text-[min(6.6vw,7rem)]">
                <SplitWords text={t.titleTrail} active={loaded} delay={0.6} stagger={0.07} />
              </span>
            </h1>
          </div>

          {/* Sub + CTAs + scroll cue */}
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md"
            >
              <p className="text-base leading-relaxed text-[#E8F5E4]/65 sm:text-lg">
                {t.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-extrabold transition-shadow hover:shadow-[0_0_60px_-12px_rgba(102,247,69,0.9)]"
                    style={{ backgroundColor: LIME, color: INK }}
                  >
                    {t.ctaPrimary}
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                  </a>
                </Magnetic>
                <a
                  href="#approach"
                  className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#E8F5E4]/60 underline decoration-[#66F745] decoration-2 underline-offset-8 transition-colors hover:text-white"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center gap-3 self-start sm:flex-col sm:items-end sm:self-auto"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#E8F5E4]/60">
                Scroll
              </span>
              <span className="relative block h-14 w-px overflow-hidden bg-white/15 sm:h-20">
                <motion.span
                  className="absolute left-0 top-0 h-1/2 w-full"
                  style={{ backgroundColor: LIME }}
                  animate={reduce ? { y: "50%" } : { y: ["-100%", "220%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================= Manifesto strip (zone A opener) ================= */
function Manifesto({ dict }: { dict: Dictionary }) {
  return (
    <div className="px-5 pt-24 sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <p
          className="font-display text-3xl font-extrabold uppercase leading-[1.06] tracking-tight sm:text-5xl"
          style={{ color: INK }}
        >
          <SplitWords
            text="No jargon. No code. No hype."
            stagger={0.06}
          />{" "}
          <span style={{ color: "#1d6f10" }}>
            <SplitWords
              text="Just AI your team actually uses."
              stagger={0.06}
              delay={0.3}
            />
          </span>
        </p>
        <div className="mt-8 h-px w-full" style={{ backgroundColor: `${INK}1A` }} />
      </div>
    </div>
  );
}
