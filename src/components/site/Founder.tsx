import { CalendarCheck } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function SiteFounder({ dict }: { dict: Dictionary }) {
  const t = dict.founder;
  return (
    <section id="founder" className="scroll-mt-24 border-t border-line bg-surface/50 py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-4xl bg-brand/20 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.founder.photo} alt={t.name} className="w-full rounded-4xl border border-line object-cover shadow-lift" />
            <div className="absolute bottom-4 left-4 rounded-2xl border border-line bg-elevated px-4 py-2.5 shadow-card">
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-subtle">{t.role}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.title}</h2>
          <blockquote className="mt-6 border-l-4 border-brand pl-5 font-display text-xl font-semibold leading-snug text-ink">
            “{t.quote}”
          </blockquote>
          <div className="mt-6 space-y-4">
            {t.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted">{p}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {t.highlights.map((h) => (
              <span key={h.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm">
                <strong className="font-display font-bold text-ink">{h.value}</strong>
                <span className="text-xs text-muted">{h.label}</span>
              </span>
            ))}
          </div>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brand mt-8">
            <CalendarCheck className="h-4 w-4" strokeWidth={2} />
            {t.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
