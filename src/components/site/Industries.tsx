"use client";

import type { Dictionary } from "@/i18n";
import { QUICKWIN_EVENT } from "./events";

// Industry index → quick-win area id. Only direct matches; others just scroll.
const AREA_BY_INDEX: Record<number, string> = { 5: "content" };

export function Industries({ dict }: { dict: Dictionary }) {
  const items = dict.logos.items;

  function pick(index: number) {
    window.dispatchEvent(new CustomEvent(QUICKWIN_EVENT, { detail: AREA_BY_INDEX[index] ?? null }));
    document.querySelector("#quick-wins")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="border-y border-line bg-surface/70 py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">{dict.logos.label}</p>
      <div className="mask-fade-x mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-3 hover:[animation-play-state:paused]">
          {/* Many copies so the -50% marquee loop never runs dry on wide screens. */}
          {Array.from({ length: 10 }, () => items).flat().map((item, i) => (
            <button
              key={`${item}-${i}`}
              type="button"
              onClick={() => pick(i % items.length)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-elevated px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-ink/40 hover:bg-brand-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
