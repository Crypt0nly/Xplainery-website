"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Menu,
  RotateCcw,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Magnetic, SplitWords } from "../d5/effects";
import { nav, hero, services, finder, contact, type Service } from "./content";

const EVERGREEN = "#223528";
const LIME = "#66F745";
const INTEREST_EVENT = "d9:interest";

/* ================= Nav — white over the evergreen hero, dark after scroll ================= */
export function D9Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-9 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-bg" : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dark ? "/logo-mark-dark.png" : "/logo-mark.png"}
            alt="Xplainery"
            className="h-7 w-auto"
          />
          <span className={cn("font-display text-lg font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
            Xplainery
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                dark ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-surface hover:text-ink",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25} className="hidden md:inline-block">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brand !px-4 !py-2.5">
              <CalendarCheck className="h-4 w-4" strokeWidth={2} />
              {hero.primary}
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
              dark ? "border-white/20 text-white" : "border-line bg-surface text-ink",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x pb-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1 rounded-3xl border border-line bg-elevated p-3 shadow-lift">
              {nav.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-ink hover:bg-brand-soft">
                  {l.label}
                </a>
              ))}
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-brand mt-2 w-full">
                <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                {hero.primary}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================= Hero headline (word reveal) ================= */
export function HeroTitle() {
  return (
    <h1 className="font-display text-[3rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
      <SplitWords text={hero.titleA} stagger={0.1} />
      <br />
      <span style={{ color: LIME }}>
        <SplitWords text={hero.titleB} delay={0.25} stagger={0.1} />
      </span>
    </h1>
  );
}

/* ================= Path finder ================= */
type Q = { key: string; question: string; options: { label: string; next: string }[] };

const QUESTIONS: Record<string, Q> = {
  who: {
    key: "who",
    question: "Who is this for?",
    options: [
      { label: "My team or company", next: "need" },
      { label: "Just me", next: "result:mentoring" },
    ],
  },
  need: {
    key: "need",
    question: "What do you need first?",
    options: [
      { label: "Get the team using AI properly", next: "act" },
      { label: "A clear plan before we spend", next: "result:strategy" },
      { label: "Build one specific automation", next: "result:implementation" },
    ],
  },
  act: {
    key: "act",
    question: "Do you need documentation for the EU AI Act?",
    options: [
      { label: "Yes", next: "result:package" },
      { label: "Not sure", next: "result:package" },
      { label: "No", next: "result:training" },
    ],
  },
};

const RESULTS: Record<string, { title: string; body: string; interest: string }> = {
  training: {
    title: "AI Skills Training",
    body: "A hands-on workshop built around your team's real work.",
    interest: finder.interestFor.training,
  },
  package: {
    title: "Article 4 Training Package",
    body: "The workshop plus the complete documentation set for EU AI Act Article 4.",
    interest: finder.interestFor.package,
  },
  strategy: {
    title: "AI Strategy",
    body: "A short assessment that ends in a written, prioritised roadmap.",
    interest: finder.interestFor.strategy,
  },
  implementation: {
    title: "AI Implementation",
    body: "A scoped project that delivers one working, documented automation.",
    interest: finder.interestFor.implementation,
  },
  mentoring: {
    title: "AI Mentoring",
    body: "Small live groups or one-to-one coaching on your own work.",
    interest: finder.interestFor.mentoring,
  },
};

export function PathFinder() {
  const [step, setStep] = useState("who");
  const [trail, setTrail] = useState<string[]>([]);
  const result = step.startsWith("result:") ? RESULTS[step.slice(7)] : null;
  const q = QUESTIONS[step];
  const total = 3;
  const progress = result ? total : trail.length;

  function choose(label: string, next: string) {
    setTrail((t) => [...t, label]);
    setStep(next);
  }
  function reset() {
    setTrail([]);
    setStep("who");
  }
  function goContact() {
    if (result) window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: result.interest }));
  }

  return (
    <div className="card overflow-hidden rounded-4xl shadow-lift">
      <div className="flex items-center justify-between border-b border-line bg-elevated px-6 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">{finder.eyebrow}</p>
          <p className="mt-0.5 font-display text-base font-bold text-ink">{finder.title}</p>
        </div>
        <div className="flex items-center gap-1.5" aria-label={`Step ${Math.min(progress + 1, total)} of ${total}`}>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-6 rounded-full transition-colors"
              style={{ backgroundColor: i < progress ? LIME : "rgb(var(--line))" }}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Our suggestion</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">{result.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{result.body}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic strength={0.2}>
                  <a href="#contact" onClick={goContact} className="btn-brand">
                    {finder.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </a>
                </Magnetic>
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle hover:text-ink">
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
                  {finder.restart}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={q.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="font-display text-xl font-bold text-ink">{q.question}</h3>
              <div className="mt-4 grid gap-2.5">
                {q.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(o.label, o.next)}
                    className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5 text-left text-sm font-medium text-ink transition-all hover:border-brand-ink/40 hover:bg-brand-soft"
                  >
                    {o.label}
                    <ArrowRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-brand-ink" strokeWidth={2} />
                  </button>
                ))}
              </div>
              {trail.length > 0 && (
                <button type="button" onClick={reset} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-subtle hover:text-ink">
                  <RotateCcw className="h-3 w-3" strokeWidth={2} />
                  {finder.restart}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================= Services — expandable cards ================= */
export function ServiceCards() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {services.map((s, i) => (
        <ServiceCard key={s.id} s={s} i={i} open={open === s.id} onToggle={() => setOpen(open === s.id ? null : s.id)} />
      ))}
    </div>
  );
}

function ServiceCard({ s, i, open, onToggle }: { s: Service; i: number; open: boolean; onToggle: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
      className={cn("card flex flex-col p-7 transition-all duration-300 sm:p-8", open ? "border-brand shadow-lift" : "hover:-translate-y-1 hover:shadow-lift")}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-bold text-brand-ink">{s.n}</span>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold text-brand-ink">{s.audience}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{s.name}</h3>
      <p className="mt-1.5 font-display text-base font-semibold text-muted">{s.promise}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
      <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand">
          <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
        </span>
        {s.outcome}
      </p>

      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        <div className="overflow-hidden">
          <ul className="mt-4 space-y-2 border-t border-line pt-4">
            {s.includes.map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: LIME }} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">
        <button type="button" onClick={onToggle} aria-expanded={open} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:underline">
          {open ? "Less" : "What's included"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} strokeWidth={2.25} />
        </button>
        <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-brand-ink">
          Ask about this
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
        </a>
      </div>
    </motion.article>
  );
}

/* ================= Contact form (front-end demo, prefilled by the finder) ================= */
export function D9ContactForm() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(contact.interests[0]);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    function onInterest(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (contact.interests.includes(value)) setInterest(value);
    }
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field = "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand-ink";

  if (sent) {
    return (
      <div className="card flex flex-col items-center justify-center p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-[#08140d]">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <p className="mt-5 max-w-sm text-base text-ink">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Name</span>
          <input required name="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
          <input required type="email" name="email" className={field} placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">Company (optional)</span>
          <input name="company" className={field} placeholder="Company" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted">I'm interested in</span>
          <select ref={selectRef} name="interest" className={field} value={interest} onChange={(e) => setInterest(e.target.value)}>
            {contact.interests.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-muted">What are you trying to do?</span>
          <textarea name="message" rows={4} className={field} placeholder="A sentence or two is plenty." />
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <Magnetic strength={0.2}>
          <button type="submit" className="btn-brand">
            {contact.submit}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

/* ================= FAQ ================= */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className="font-display text-base font-bold text-ink sm:text-lg">{it.q}</span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-subtle transition-transform", isOpen && "rotate-180")} strokeWidth={2} />
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted sm:text-base">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { EVERGREEN, LIME };
