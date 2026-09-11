"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Magnetic, SplitWords, useReducedMotionSafe } from "@/components/designs/d5/effects";
import { PathFinder } from "./PathFinder";

export function SiteHero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
  const reduce = useReducedMotionSafe();
  const show = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: 0.1 * i + 0.1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern mask-fade-b opacity-60" />
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute right-[-10%] top-10 h-[380px] w-[380px] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
        <div className="max-w-xl">
          <motion.div {...show(0)}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-brand" />
              {t.badge}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[2.7rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            <SplitWords text={t.titleLead} delay={0.15} stagger={0.07} />{" "}
            <span className="relative inline-block -rotate-1 rounded-2xl bg-brand px-3 py-0.5">
              <SplitWords text={t.titleHighlight} delay={0.3} stagger={0.07} />
            </span>{" "}
            <SplitWords text={t.titleTrail} delay={0.45} stagger={0.07} />
          </h1>

          <motion.p {...show(3)} className="mt-6 text-lg leading-relaxed text-muted">
            {t.subtitle}
          </motion.p>

          <motion.div {...show(4)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic strength={0.25}>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brand !px-6 !py-3.5 text-base">
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
            </Magnetic>
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-soft px-6 py-3.5 text-base font-semibold text-brand-ink transition-colors hover:bg-[#d9efd2]">
              {t.ctaSecondary}
            </a>
          </motion.div>

          <motion.div {...show(5)} className="mt-8 flex flex-wrap gap-2.5">
            {t.stats.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm">
                <strong className="font-display font-bold text-ink">{s.value}</strong>
                <span className="text-xs text-muted">{s.label}</span>
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <PathFinder dict={dict} />
        </motion.div>
      </div>
    </section>
  );
}
