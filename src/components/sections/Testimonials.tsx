"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const AVATAR_GRADIENTS = [
  "from-brand-ink to-accent",
  "from-accent to-brand-ink",
  "from-emerald-700 to-accent",
  "from-brand-ink to-emerald-800",
  "from-accent to-emerald-700",
];

export function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;
  const items = t.items;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + items.length) % items.length);
    },
    [index, items.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const active = items[index];

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 py-24 lg:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div
          className="mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-4xl border border-line bg-surface p-8 shadow-card sm:p-12">
            <Quote
              className="absolute right-8 top-8 h-16 w-16 text-brand/10"
              strokeWidth={1}
            />

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                    “{active.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
                        AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
                      )}
                    >
                      {active.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{active.name}</p>
                      <p className="text-sm text-muted">
                        {active.role} · {active.company}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index
                      ? "w-7 bg-brand"
                      : "w-2 bg-line hover:bg-brand/40",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(index - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand/40 hover:text-ink"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(index + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand/40 hover:text-ink"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
