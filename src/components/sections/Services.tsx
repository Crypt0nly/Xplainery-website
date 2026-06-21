import { Check, Target, CalendarCheck, Send } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

export function Services({ dict }: { dict: Dictionary }) {
  const t = dict.services;
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-line bg-surface/50 py-24 lg:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <RevealStagger className="mt-16 grid gap-6 lg:grid-cols-2">
          {t.items.map((service) => (
            <RevealItem key={service.name} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-bg p-8 transition-all duration-300 hover:border-brand/30 hover:shadow-card">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-glow">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-subtle">
                    {service.tagline}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-ink">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.body}
                </p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-ink"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        strokeWidth={2.5}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Recommended audience — a hint, not a limit */}
                <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    {t.bestForLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-ink">
                    <Target className="h-3.5 w-3.5 text-brand" strokeWidth={2.25} />
                    {service.bestFor}
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Shared inquiry CTA for all services */}
        <Reveal className="mt-8">
          <div className="relative overflow-hidden rounded-4xl border border-line bg-bg p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {t.ctaTitle}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {t.ctaBody}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand !px-6 !py-3.5"
                >
                  <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                  {t.bookCta}
                </a>
                <a href="#contact" className="btn-ghost !px-6 !py-3.5">
                  <Send className="h-4 w-4" strokeWidth={2} />
                  {t.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
