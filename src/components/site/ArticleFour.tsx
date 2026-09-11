"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { selectInterest } from "./events";

const LIME = "#66F745";

export function ArticleFour({ dict }: { dict: Dictionary }) {
  const t = dict.article4;
  const [mode, setMode] = useState<"team" | "individual">("team");
  const addon = t.addon[mode];
  const pkg = t.pkg[mode];
  const pkgInterest = mode === "team" ? dict.contact.form.interestOptions[1] : dict.contact.form.interestOptions[4];

  return (
    <section id="article-4" className="scroll-mt-24 py-24 text-white lg:py-32" style={{ backgroundColor: "#050D08" }}>
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: `${LIME}4D`, backgroundColor: `${LIME}1A`, color: LIME }}>
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
            {t.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-[2.6rem]">{t.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">{t.body}</p>
        </Reveal>

        {/* team / individual toggle */}
        <Reveal className="mt-10">
          <div className="inline-flex rounded-full border border-white/15 bg-white/[0.04] p-1" role="tablist">
            {(["team", "individual"] as const).map((m) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={cn("rounded-full px-5 py-2 text-sm font-semibold transition-colors", mode === m ? "bg-brand text-[#08140d]" : "text-white/70 hover:text-white")}>
                {t.toggle[m]}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">{t.addon.label}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{addon.name}</h3>
              <p className="mt-2 text-sm text-white/65">{addon.body}</p>
              <ul className="mt-5 space-y-2.5">
                {addon.items.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: LIME }}><Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} /></span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-xs text-white/45">{t.addon.footnote}</p>
            </article>
            <article className="relative flex h-full flex-col rounded-3xl border p-7 sm:p-8" style={{ borderColor: `${LIME}66`, backgroundColor: `${LIME}12` }}>
              <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#08140d]" style={{ backgroundColor: LIME }}>{t.pkg.badge}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: LIME }}>{t.pkg.label}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{pkg.name}</h3>
              <p className="mt-2 text-sm text-white/70">{pkg.body}</p>
              <ul className="mt-5 space-y-2.5">
                {pkg.items.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-sm text-white/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: LIME }}><Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} /></span>
                    {x}
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={() => selectInterest(pkgInterest)} className="mt-7 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-3.5 text-sm font-bold text-[#08140d] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: LIME }}>
                {t.pkg.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </article>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-sm text-white/45">{t.disclaimer}</p>

        {/* certification comparison */}
        <Reveal className="mt-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: LIME }}>{t.certs.eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{t.certs.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">{t.certs.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.certs.options.map((o) => (
              <div key={o.name} className={cn("rounded-3xl border p-6", o.highlight ? "border-brand/60" : "border-white/10 bg-white/[0.03]")} style={o.highlight ? { backgroundColor: `${LIME}12` } : undefined}>
                <p className={cn("font-display text-base font-bold", o.highlight ? "text-brand" : "text-white")}>{o.name}</p>
                <dl className="mt-4 space-y-3">
                  {t.certs.rows.map((r, i) => (
                    <div key={r}>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{r}</dt>
                      <dd className="mt-0.5 text-sm leading-snug text-white/85">{o.values[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/40">{t.certs.note}</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex gap-4 rounded-3xl border border-amber-400/30 bg-amber-400/[0.06] p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" strokeWidth={2} />
            <div>
              <p className="font-display text-base font-bold text-white">{t.redFlag.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{t.redFlag.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
