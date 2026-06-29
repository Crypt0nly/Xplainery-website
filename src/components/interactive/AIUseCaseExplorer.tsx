"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
  Check,
  ArrowRight,
  CornerDownRight,
  Sparkles,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Mail,
  Megaphone,
  Briefcase,
  Headphones,
  Search,
  ClipboardList,
};

export function AIUseCaseExplorer({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      {/* Area selector */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-subtle">
          {t.selectHint}
        </p>
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
          {t.areas.map((area) => {
            const Icon = ICONS[area.icon] ?? Mail;
            const selected = area.id === activeId;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveId(area.id)}
                aria-pressed={selected}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                  selected
                    ? "border-brand bg-brand-soft shadow-soft"
                    : "border-line bg-surface hover:border-brand-ink/40 hover:bg-brand-soft/50",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                    selected
                      ? "bg-brand text-[#08140d]"
                      : "bg-brand-soft text-brand-ink group-hover:bg-brand group-hover:text-[#08140d]",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-ink">
                  {area.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
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
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {active.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {active.pain}
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
              <Sparkles className="h-4 w-4 text-brand-ink" strokeWidth={2.25} />
              {t.withAi}:
            </p>
            <ul className="mt-3 space-y-2.5">
              {active.solutions.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand">
                    <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            {/* In-practice mock */}
            <div className="mt-6 space-y-3 rounded-2xl border border-line bg-bg p-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-subtle">
                  {t.promptLabel}
                </span>
                <p className="flex-1 rounded-xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm text-ink shadow-soft">
                  {active.examplePrompt}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
                  {t.resultLabel}
                </span>
                <p className="flex flex-1 items-start gap-2 rounded-xl rounded-tl-sm bg-brand-soft px-3.5 py-2.5 text-sm font-medium text-ink">
                  <CornerDownRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink"
                    strokeWidth={2}
                  />
                  {active.exampleResult}
                </p>
              </div>
            </div>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand mt-6 w-full sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={2} />
              {t.cta}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
