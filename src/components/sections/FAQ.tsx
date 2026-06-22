"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, HelpCircle, CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ({ dict }: { dict: Dictionary }) {
  const t = dict.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-y border-line bg-surface/50 py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.eyebrow}
              title={t.title}
              subtitle={t.subtitle}
              align="left"
            />
            <Reveal className="mt-8" delay={0.1}>
              <div className="rounded-3xl border border-line bg-bg p-6">
                <HelpCircle
                  className="h-7 w-7 text-brand-ink"
                  strokeWidth={1.75}
                />
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {dict.contact.subtitle}
                </p>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand mt-4 !px-5 !py-2.5"
                >
                  <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                  {dict.common.bookCallShort}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-bg">
              {t.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-semibold text-ink">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-brand bg-brand text-[#08140d]"
                            : "border-line bg-surface text-muted",
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
