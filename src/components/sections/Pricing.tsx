import { Check, Star } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

export function Pricing({ dict }: { dict: Dictionary }) {
  const t = dict.pricing;
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-line bg-surface/50 py-24 lg:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <RevealStagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.plans.map((plan) => (
            <RevealItem key={plan.name} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-4xl border p-8 transition-all duration-300",
                  plan.featured
                    ? "border-brand/40 bg-bg shadow-glow lg:-translate-y-3"
                    : "border-line bg-bg hover:border-brand/30 hover:shadow-card",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">
                    <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    {t.popularLabel}
                  </span>
                )}

                <h3 className="font-display text-lg font-bold text-ink">
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-end gap-1">
                  {plan.price !== t.custom && (
                    <span className="text-sm font-medium text-subtle">
                      {t.fromLabel}
                    </span>
                  )}
                  <span className="font-display text-4xl font-bold text-ink">
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span className="pb-1 text-sm text-subtle">
                      {plan.unit}
                    </span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-brand text-white"
                            : "bg-brand-soft text-brand",
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-ink">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={
                    plan.price === t.custom ? "#contact" : site.bookingUrl
                  }
                  target={plan.price === t.custom ? undefined : "_blank"}
                  rel={
                    plan.price === t.custom
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={cn(
                    "mt-8 w-full",
                    plan.featured ? "btn-brand" : "btn-ghost",
                  )}
                >
                  {plan.cta}
                </a>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Included row */}
        <Reveal className="mt-12">
          <div className="rounded-4xl border border-line bg-bg p-7">
            <p className="text-sm font-semibold text-ink">{t.includedTitle}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.included.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-center text-sm text-subtle">{t.vatNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
