"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/designs/d5/effects";
import { selectInterest } from "./events";

// Alternating accent treatment for the info grid (Classic card language).
const ACCENTS = [
  "bg-brand-soft text-ink",
  "bg-ink text-white",
  "bg-brand text-[#08140d]",
  "border border-line bg-surface text-ink",
];

export function ServicesExplorer({ dict }: { dict: Dictionary }) {
  const t = dict.tiers;
  const [activeId, setActiveId] = useState<string>(t.items[0].id);
  const [addon, setAddon] = useState<Record<string, boolean>>({});
  const tier = t.items.find((i) => i.id === activeId);
  const teaser = activeId === "article4";
  const on = tier ? Boolean(addon[tier.id]) : false;

  const listItems = [
    ...t.items.map((i) => ({ id: i.id, n: i.n, name: i.name, category: i.category, icon: i.icon })),
    { id: "article4", n: t.article4Teaser.n, name: t.article4Teaser.name, category: t.article4Teaser.category, icon: t.article4Teaser.icon },
  ];

  const interestFor = (id: string, withAddon: boolean) =>
    id === "training" && withAddon ? dict.contact.form.interestOptions[1] : dict.pathFinder.results[id as keyof typeof dict.pathFinder.results]?.interest ?? dict.contact.form.interestOptions[5];

  return (
    <section id="services" className="scroll-mt-24 border-t border-line bg-surface/50 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ul className="grid content-start gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {listItems.map((item) => {
              const selected = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={selected}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all",
                      selected ? "border-brand bg-brand-soft shadow-soft" : "border-line bg-surface hover:border-brand-ink/40 hover:bg-brand-soft/50",
                    )}
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors", selected ? "bg-brand text-[#08140d]" : "bg-brand-soft text-brand-ink group-hover:bg-brand group-hover:text-[#08140d]")}>
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-base font-bold text-ink">{item.name}</span>
                      <span className="block text-xs text-subtle">{t.labels.tier} {item.n} · {item.category}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="card relative overflow-hidden p-6 sm:p-8">
            <span aria-hidden className="pointer-events-none absolute right-6 top-4 font-display text-8xl font-bold text-ink/[0.05]">
              {teaser ? t.article4Teaser.n : tier?.n}
            </span>
            <AnimatePresence mode="wait">
              {teaser ? (
                <motion.div key="article4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brand">
                    <Icon name={t.article4Teaser.icon} className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-ink">{t.labels.tier} {t.article4Teaser.n} · {t.article4Teaser.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{t.article4Teaser.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{t.article4Teaser.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {t.article4Teaser.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand"><Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#article-4" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5">
                    {t.labels.seeBreakdown}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </motion.div>
              ) : tier ? (
                <motion.div key={tier.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-[#08140d]">
                    <Icon name={tier.icon} className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-ink">{t.labels.tier} {tier.n} · {tier.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{tier.name}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{tier.description}</p>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      [t.labels.format, tier.format],
                      [t.labels.duration, tier.duration],
                      [t.labels.youGet, on && tier.youGetAddon ? tier.youGetAddon : tier.youGet],
                      [t.labels.bestFor, tier.bestFor],
                    ].map(([k, v], i) => (
                      <div key={k} className={cn("rounded-2xl p-4", ACCENTS[i])}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{k}</dt>
                        <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-subtle">{t.labels.includes}</p>
                  <ul className="mt-2.5 space-y-2">
                    {tier.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand"><Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} /></span>
                        {x}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-subtle">{t.labels.howItRuns}</p>
                  <ol className="mt-2.5 flex flex-wrap items-center gap-2">
                    {tier.steps.map((s, i) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-ink">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-[#08140d]">{i + 1}</span>
                          {s}
                        </span>
                        {i < tier.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-subtle" strokeWidth={2} />}
                      </li>
                    ))}
                  </ol>

                  {tier.hasAddon && (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() => setAddon((a) => ({ ...a, [tier.id]: !a[tier.id] }))}
                      className={cn("mt-6 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors", on ? "border-brand bg-brand-soft text-ink" : "border-line bg-bg text-muted hover:border-brand-ink/40")}
                    >
                      <span>{on ? t.labels.addonOn : `+ ${t.labels.addon}`}</span>
                      <span className={cn("relative h-6 w-11 rounded-full transition-colors", on ? "bg-brand" : "bg-line")}>
                        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", on ? "translate-x-[22px]" : "translate-x-0.5")} />
                      </span>
                    </button>
                  )}

                  <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-subtle">{t.labels.price}</p>
                      <p className="font-display text-lg font-bold text-ink">{on && tier.priceAddon ? tier.priceAddon : tier.price}</p>
                    </div>
                    <Magnetic strength={0.2}>
                      <a href="#contact" onClick={() => selectInterest(interestFor(tier.id, on))} className="btn-brand">
                        {t.labels.cta} {tier.name}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
