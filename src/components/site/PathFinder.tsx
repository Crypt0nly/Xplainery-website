"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/designs/d5/effects";
import { Reveal } from "@/components/ui/Reveal";
import { selectInterest } from "./events";

type Step = "q1" | "q2a" | "q2b" | "q3a" | "q3b" | "result";
type ResultKey = keyof Dictionary["pathFinder"]["results"];

export function PathFinder({ dict }: { dict: Dictionary }) {
  const t = dict.pathFinder;
  const [step, setStep] = useState<Step>("q1");
  const [who, setWho] = useState<"team" | "me">("team");
  const [second, setSecond] = useState<number>(0);
  const [result, setResult] = useState<ResultKey | null>(null);

  const progress = step === "q1" ? 0 : step === "q2a" || step === "q2b" ? 1 : step === "result" ? 3 : 2;

  function reset() {
    setStep("q1");
    setResult(null);
  }

  const res = result ? t.results[result] : null;
  const read = who === "team" ? t.maturity[second] : t.roleReads[second];

  const options: { label: string; onPick: () => void }[] =
    step === "q1"
      ? [
          { label: t.q1.team, onPick: () => { setWho("team"); setStep("q2a"); } },
          { label: t.q1.me, onPick: () => { setWho("me"); setStep("q2b"); } },
        ]
      : step === "q2a"
        ? t.q2a.options.map((label, i) => ({ label, onPick: () => { setSecond(i); setStep("q3a"); } }))
        : step === "q2b"
          ? t.q2b.options.map((label, i) => ({ label, onPick: () => { setSecond(i); setStep("q3b"); } }))
          : step === "q3a"
            ? t.q3a.options.map((o) => ({ label: o.label, onPick: () => { setResult(o.result as ResultKey); setStep("result"); } }))
            : t.q3b.options.map((o) => ({ label: o.label, onPick: () => { setResult(o.result as ResultKey); setStep("result"); } }));

  const question =
    step === "q1" ? t.q1.question : step === "q2a" ? t.q2a.question : step === "q2b" ? t.q2b.question : step === "q3a" ? t.q3a.question : t.q3b.question;

  return (
    <section id="path" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28" style={{ backgroundColor: "#223528" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-brand/15 blur-[140px]" />
      </div>
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl">
          <div className="card overflow-hidden rounded-4xl shadow-lift">
            <div className="flex items-center justify-between border-b border-line bg-elevated px-6 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">{t.eyebrow}</p>
                <p className="mt-0.5 font-display text-lg font-bold text-ink">{t.title}</p>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className={cn("h-1.5 w-6 rounded-full transition-colors", i < progress ? "bg-brand" : "bg-line")} />
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step === "result" && res ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{t.resultLabel}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{res.name}</h3>
                    <p className="mt-2 text-base text-muted">{res.pitch}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-brand-soft p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-ink">{t.whyLabel}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink">{res.why}</p>
                      </div>
                      <div className="rounded-2xl border border-line bg-bg p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-subtle">{t.maturityLabel}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{read}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Magnetic strength={0.2}>
                        <a href="#contact" onClick={() => selectInterest(res.interest)} className="btn-brand">
                          {t.ctaPrefix} {res.name}
                          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                        </a>
                      </Magnetic>
                      <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle hover:text-ink">
                        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                        {t.restart}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{question}</h3>
                    <div className="mt-5 grid gap-2.5">
                      {options.map((o) => (
                        <button
                          key={o.label}
                          type="button"
                          onClick={o.onPick}
                          className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5 text-left text-sm font-medium text-ink transition-all hover:border-brand-ink/40 hover:bg-brand-soft"
                        >
                          {o.label}
                          <ArrowRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-brand-ink" strokeWidth={2} />
                        </button>
                      ))}
                    </div>
                    {step !== "q1" && (
                      <button type="button" onClick={reset} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-subtle hover:text-ink">
                        <RotateCcw className="h-3 w-3" strokeWidth={2} />
                        {t.restart}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
