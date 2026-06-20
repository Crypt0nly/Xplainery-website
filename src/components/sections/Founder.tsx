import { Quote, CalendarCheck, Linkedin } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Founder({ dict }: { dict: Dictionary }) {
  const t = dict.founder;
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <section id="founder" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          {/* Portrait card */}
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand/20 to-accent/20 blur-2xl" />
              <div className="overflow-hidden rounded-4xl border border-line bg-surface shadow-card">
                <div className="relative flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-brand via-brand to-accent">
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <span className="font-display text-7xl font-bold text-white/90">
                    {initials}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6">
                    <p className="font-display text-xl font-bold text-white">
                      {t.name}
                    </p>
                    <p className="text-sm text-white/80">{t.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-line">
                  {t.highlights.map((h) => (
                    <div key={h.label} className="px-3 py-4 text-center">
                      <p className="font-display text-base font-bold text-ink">
                        {h.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-subtle">
                        {h.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.1}>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.title}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {t.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <figure className="mt-7 rounded-3xl border-l-2 border-brand bg-surface p-6">
              <Quote className="h-6 w-6 text-brand/40" strokeWidth={1.5} />
              <blockquote className="mt-2 font-display text-lg font-medium italic leading-relaxed text-ink">
                {t.quote}
              </blockquote>
            </figure>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand !px-6 !py-3.5 text-base"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                {t.cta}
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-5 !py-3.5"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} />
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
