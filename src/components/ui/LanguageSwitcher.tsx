"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* ignore */
    }
    const segments = (pathname || `/${locale}`).split("/");
    segments[1] = next; // replace locale segment
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-brand/40 hover:text-ink"
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} />
        <span className="uppercase">{locale}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-elevated p-1.5 shadow-lift"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-brand-soft",
                  l === locale ? "text-ink" : "text-muted",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true">{localeMeta[l].flag}</span>
                  <span className="font-medium">{localeMeta[l].native}</span>
                </span>
                {l === locale && (
                  <Check className="h-4 w-4 text-brand-ink" strokeWidth={2.25} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
