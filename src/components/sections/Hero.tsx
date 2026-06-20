"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, ArrowRight, Sparkles, Check } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";

export function Hero({ dict }: { dict: Dictionary }) {
  const reduce = useReducedMotion();
  const t = dict.hero;

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern mask-fade-b opacity-60" />
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-10 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              {t.badge}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            {t.titleLead}{" "}
            <span className="text-gradient">{t.titleHighlight}</span>{" "}
            {t.titleTrail}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg leading-relaxed text-muted"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand !px-6 !py-3.5 text-base"
            >
              <CalendarCheck className="h-5 w-5" strokeWidth={2} />
              {t.ctaPrimary}
            </a>
            <a href="#services" className="btn-ghost !px-6 !py-3.5 text-base">
              {t.ctaSecondary}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" strokeWidth={2.5} />
              {dict.common.free}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" strokeWidth={2.5} />
              {dict.common.minutes}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" strokeWidth={2.5} />
              {dict.common.noObligation}
            </span>
          </motion.div>

          <motion.dl
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {t.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-subtle">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual */}
        <HeroVisual dict={dict} reduce={!!reduce} />
      </div>
    </section>
  );
}

function HeroVisual({
  dict,
  reduce,
}: {
  dict: Dictionary;
  reduce: boolean;
}) {
  const t = dict.hero;
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* Main app window */}
      <div className="card overflow-hidden shadow-lift">
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
            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-white">
              {t.floatingCards.one}
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-[10px] font-bold text-white">
              AI
            </div>
            <div className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-sm border border-line bg-bg px-4 py-3">
              <div className="h-2.5 w-44 rounded-full bg-line" />
              <div className="h-2.5 w-52 rounded-full bg-line" />
              <div className="h-2.5 w-36 rounded-full bg-line" />
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg bg-brand-soft px-2 py-1 text-[11px] font-medium text-brand">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-24 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-left-8"
      >
        <p className="text-xs font-medium text-subtle">AI Readiness</p>
        <p className="font-display text-xl font-bold text-ink">
          {t.floatingCards.two.split(":")[1] ?? "82 / 100"}
        </p>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-10 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-right-8"
      >
        <p className="text-xs font-medium text-subtle">
          {t.floatingCards.three.split(":")[0]}
        </p>
        <p className="font-display text-xl font-bold text-brand">
          {t.floatingCards.three.split(":")[1] ?? "6.5 hrs"}
        </p>
      </motion.div>
    </motion.div>
  );
}
