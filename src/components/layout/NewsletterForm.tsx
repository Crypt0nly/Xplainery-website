"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dictionary } from "@/i18n";

export function NewsletterForm({ dict }: { dict: Dictionary["footer"]["newsletter"] }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // No backend wired yet — this is a front-end demo of the capture flow.
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-ink">
        <Check className="h-4 w-4 text-brand-ink" strokeWidth={2.5} />
        {dict.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dict.placeholder}
        aria-label={dict.placeholder}
        className="input !py-2.5"
      />
      <button
        type="submit"
        aria-label={dict.cta}
        className="btn-brand shrink-0 !px-4 !py-2.5"
      >
        <span className="hidden sm:inline">{dict.cta}</span>
        <ArrowRight className="h-4 w-4 sm:hidden" strokeWidth={2} />
      </button>
    </form>
  );
}
