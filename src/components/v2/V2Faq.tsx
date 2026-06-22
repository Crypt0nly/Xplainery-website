"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function V2Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t-2 border-[#09140d]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b-2 border-[#09140d]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:bg-[#b3c2b2]/25"
            >
              <span className="font-display text-lg font-bold leading-snug text-[#09140d] sm:text-xl">
                {item.q}
              </span>
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#09140d] transition-all"
                style={{
                  background: isOpen ? "#66f745" : "transparent",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                <Plus className="h-5 w-5 text-[#09140d]" strokeWidth={2.5} />
              </span>
            </button>
            <div
              className="grid transition-all duration-300"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-base leading-relaxed text-[#09140d]/75">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
