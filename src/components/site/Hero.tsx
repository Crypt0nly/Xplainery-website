"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Magnetic, SplitWords, TiltCard, useReducedMotionSafe } from "@/components/designs/d5/effects";

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
          <TiltCard max={5} className="rounded-4xl">
            <div className="card overflow-hidden rounded-4xl shadow-lift">
              <div className="flex items-center gap-2 border-b border-line bg-elevated px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs font-medium text-subtle">Xplainery · AI Workspace</span>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-sm text-[#08140d]">{t.floatingCards.one}</div>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-ink to-accent text-[10px] font-bold text-white">AI</div>
                  <div className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-sm border border-line bg-bg px-4 py-3">
                    <div className="h-2.5 w-44 rounded-full bg-line" />
                    <div className="h-2.5 w-52 rounded-full bg-line" />
                    <div className="h-2.5 w-36 rounded-full bg-line" />
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-lg bg-brand-soft px-2 py-1 text-[11px] font-medium text-brand-ink">Draft ready</span>
                      <span className="rounded-lg bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent">On-brand</span>
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
          <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-4 -top-5 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-left-8">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink"><Check className="h-3.5 w-3.5 text-brand-ink" strokeWidth={2.5} />{t.floatingCards.two}</p>
          </motion.div>
          <motion.div animate={reduce ? undefined : { y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-card sm:block lg:-right-6">
            <p className="text-xs font-semibold text-brand-ink">{t.floatingCards.three}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
