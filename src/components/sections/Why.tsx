import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

export function Why({ dict }: { dict: Dictionary }) {
  const t = dict.why;
  return (
    <section id="why" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <RevealStagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item) => (
            <RevealItem key={item.title}>
              <article className="group h-full rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
