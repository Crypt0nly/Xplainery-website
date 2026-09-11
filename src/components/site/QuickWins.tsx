"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, Megaphone, Briefcase, Headphones, Search, ClipboardList, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { QUICKWIN_EVENT } from "./events";

const ICONS: Record<string, LucideIcon> = { Mail, Megaphone, Briefcase, Headphones, Search, ClipboardList };

export function QuickWins({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  const [activeId, setActiveId] = useState(t.areas[0].id);
  const active = t.areas.find((a) => a.id === activeId) ?? t.areas[0];

  useEffect(() => {
    function onPick(e: Event) {
      const id = (e as CustomEvent<string | null>).detail;
      setActiveId(id && t.areas.some((a) => a.id === id) ? id : t.areas[0].id);
    }
    window.addEventListener(QUICKWIN_EVENT, onPick);
    return () => window.removeEventListener(QUICKWIN_EVENT, onPick);
  }, [t.areas]);

  return (
    <section id="quick-wins" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <Reveal className="mx-auto mt-12 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label={t.selectHint}>
            {t.areas.map((area) => {
              const Icon = ICONS[area.icon] ?? Mail;
              const selected = area.id === activeId;
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(area.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
                    selected ? "bg-brand text-[#08140d] shadow-glow" : "border border-line bg-surface text-muted hover:border-brand-ink/40 hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                  {area.name}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-4xl bg-brand-soft/60 p-6 sm:p-10"
            >
              <p className="max-w-2xl font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{active.pain}</p>

              <p className="mt-7 text-sm font-semibold text-ink">{t.withAi}:</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {active.solutions.map((s) => (
                  <div key={s} className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink shadow-soft">
                    <span className="mb-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                      <Check className="h-3.5 w-3.5 text-[#08140d]" strokeWidth={3} />
                    </span>
                    {s}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-subtle">{t.promptLabel}</p>
                  <p className="mt-2 rounded-2xl rounded-bl-md bg-ink px-5 py-4 text-sm leading-relaxed text-white">{active.examplePrompt}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-ink">{t.resultLabel}</p>
                  <p className="mt-2 flex items-start gap-2.5 rounded-2xl bg-surface px-5 py-4 text-sm font-medium leading-relaxed text-ink shadow-soft">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    {active.exampleResult}
                  </p>
                </div>
              </div>

              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5">
                {t.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
