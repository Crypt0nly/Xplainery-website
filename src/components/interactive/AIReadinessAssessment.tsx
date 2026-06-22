"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gauge,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Stage = "intro" | "quiz" | "result";

export function AIReadinessAssessment({ dict }: { dict: Dictionary }) {
  const t = dict.tools.assessment;
  const questions = t.questions;
  const maxScore = questions.length * 3;

  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );

  const total = useMemo(
    () => answers.reduce((sum, a) => (a >= 0 ? sum + a : sum), 0),
    [answers],
  );
  const percentage = Math.round((total / maxScore) * 100);

  const tier = useMemo(() => {
    return (
      t.tiers.find((tr) => total >= tr.min && total <= tr.max) ??
      t.tiers[t.tiers.length - 1]
    );
  }, [total, t.tiers]);

  function choose(score: number) {
    const next = [...answers];
    next[current] = score;
    setAnswers(next);
  }

  function goNext() {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else setStage("result");
  }

  function reset() {
    setAnswers(Array(questions.length).fill(-1));
    setCurrent(0);
    setStage("intro");
  }

  const progress =
    stage === "result" ? 100 : ((current + (answers[current] >= 0 ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-bg shadow-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-brand-soft to-transparent px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-[#08140d]">
          <Gauge className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{t.title}</h3>
          <p className="text-sm text-muted">{t.subtitle}</p>
        </div>
      </div>

      {/* Progress */}
      {stage !== "intro" && (
        <div className="h-1.5 w-full bg-line">
          <motion.div
            className="h-full bg-gradient-to-r from-brand to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col items-start justify-center"
            >
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                {dict.common.free}
              </span>
              <p className="mt-4 text-2xl font-semibold leading-snug text-ink">
                {t.subtitle}
              </p>
              <button
                type="button"
                onClick={() => setStage("quiz")}
                className="btn-brand mt-6 !px-6 !py-3.5 text-base"
              >
                {t.start}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </motion.div>
          )}

          {stage === "quiz" && (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink">
                {t.questionLabel} {current + 1} {t.ofLabel} {questions.length}
              </p>
              <h4 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
                {questions[current].q}
              </h4>

              <div className="mt-6 grid flex-1 content-start gap-3">
                {questions[current].options.map((opt) => {
                  const selected = answers[current] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => choose(opt.score)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
                        selected
                          ? "border-brand bg-brand-soft text-ink shadow-soft"
                          : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink",
                      )}
                    >
                      <span>{opt.label}</span>
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                          selected
                            ? "border-brand bg-brand"
                            : "border-line bg-bg",
                        )}
                      >
                        {selected && (
                          <span className="h-2 w-2 rounded-full bg-[#08140d]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    current === 0
                      ? setStage("intro")
                      : setCurrent((c) => c - 1)
                  }
                  className="btn-ghost !px-4 !py-2.5"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={answers[current] < 0}
                  className="btn-brand !px-5 !py-2.5"
                >
                  {current === questions.length - 1 ? t.seeResult : t.next}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col"
            >
              <div className="flex items-center gap-5">
                <ScoreRing percentage={percentage} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                    {t.yourScore}
                  </p>
                  <p className="font-display text-2xl font-bold text-ink">
                    {tier.name}
                  </p>
                  <p className="text-sm text-muted">
                    {total} / {maxScore}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {tier.summary}
              </p>

              <div className="mt-5 rounded-2xl border border-brand/20 bg-brand-soft/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink">
                  {t.recommendationLabel}
                </p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {tier.recommendation}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand flex-1 !py-3"
                >
                  <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                  {t.ctaAfter}
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="btn-ghost !py-3"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={2} />
                  {t.restart}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScoreRing({ percentage }: { percentage: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (percentage / 100) * c;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="rgb(var(--line))"
          strokeWidth="7"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="80" y2="80">
            <stop stopColor="rgb(var(--brand))" />
            <stop offset="1" stopColor="rgb(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xl font-bold text-ink">
          {percentage}
        </span>
      </div>
    </div>
  );
}
