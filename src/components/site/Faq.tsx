"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function SiteFaq({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x mx-auto max-w-3xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <Reveal className="mt-12 space-y-3">
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("rounded-3xl transition-colors", isOpen ? "bg-brand-soft" : "bg-brand-soft/40 hover:bg-brand-soft/70")}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
                  <span className="font-display text-base font-bold text-ink sm:text-lg">{item.q}</span>
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300", isOpen ? "rotate-180 bg-brand text-[#08140d]" : "bg-surface text-muted shadow-soft")}>
                    <ChevronDown className="h-[18px] w-[18px]" strokeWidth={2.5} />
                  </span>
                </button>
                <div id={`faq-${i}`} className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, visibility: isOpen ? "visible" : "hidden" }}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
