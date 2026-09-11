"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarCheck, Check, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/designs/d5/effects";
import { INTEREST_EVENT } from "./events";

export function ContactSection({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const f = t.form;
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(f.interestOptions[0]);

  useEffect(() => {
    function onInterest(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (f.interestOptions.includes(value)) setInterest(value);
    }
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, [f.interestOptions]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field = "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand-ink";

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-surface/50 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            {sent ? (
              <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-[#08140d]"><Check className="h-7 w-7" strokeWidth={2.5} /></span>
                <p className="mt-5 font-display text-xl font-bold text-ink">{f.successTitle}</p>
                <p className="mt-2 max-w-sm text-sm text-muted">{f.successBody}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">{f.name}</span>
                    <input required name="name" className={field} placeholder={f.namePlaceholder} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">{f.email}</span>
                    <input required type="email" name="email" className={field} placeholder={f.emailPlaceholder} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">{f.company}</span>
                    <input name="company" className={field} placeholder={f.companyPlaceholder} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">{f.interest}</span>
                    <select name="interest" className={field} value={interest} onChange={(e) => setInterest(e.target.value)}>
                      {f.interestOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">{f.message}</span>
                    <textarea name="message" rows={4} className={field} placeholder={f.messagePlaceholder} />
                  </label>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs text-subtle">{f.privacy}</p>
                  <Magnetic strength={0.2}>
                    <button type="submit" className="btn-brand">
                      {f.submit}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-4xl p-8 text-white shadow-glow" style={{ backgroundColor: "#223528" }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand"><CalendarCheck className="h-6 w-6" strokeWidth={2} /></span>
              <h3 className="mt-5 font-display text-2xl font-bold">{t.bookTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t.bookBody}</p>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-[#08140d] transition-transform hover:-translate-y-0.5">
                {t.bookCta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/50">{t.orEmail}</p>
              <a href={`mailto:${site.email}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline decoration-[#66F745] decoration-2 underline-offset-4 hover:text-white">
                <Mail className="h-4 w-4" strokeWidth={2} />
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
