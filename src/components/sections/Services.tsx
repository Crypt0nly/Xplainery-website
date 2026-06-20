import { Check, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

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
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

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

                <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <span className="text-xs font-medium uppercase tracking-wide text-subtle">
                    {service.bestFor}
                  </span>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-ink"
                  >
                    {dict.common.bookCallShort}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </a>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
