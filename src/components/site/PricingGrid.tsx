import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function PricingGrid({ dict }: { dict: Dictionary }) {
  const t = dict.pricingGrid;
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-line bg-surface/50 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* decorative node between the four cards */}
          <span aria-hidden className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-8 ring-bg sm:block" />
          <div className="grid gap-5 sm:grid-cols-2">
            {t.groups.map((g, i) => (
              <Reveal key={g.name} delay={0.05 * i} className="h-full">
                <article className="card h-full p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold text-ink">{g.name}</h3>
                  <dl className="mt-4 divide-y divide-line">
                    {g.rows.map(([label, price]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-sm text-muted">{label}</dt>
                        <dd className="whitespace-nowrap font-display text-base font-bold text-ink">{price}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-subtle">{t.note}</p>
      </div>
    </section>
  );
}
