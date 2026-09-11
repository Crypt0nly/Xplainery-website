import type { Dictionary } from "@/i18n";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

// light green / white-bordered / black / bright green / white-bordered / light green
const TILES = [
  { card: "bg-brand-soft text-ink", chip: "bg-ink text-brand" },
  { card: "border border-line bg-surface text-ink", chip: "bg-brand-soft text-brand-ink" },
  { card: "bg-ink text-white", chip: "bg-brand text-[#08140d]" },
  { card: "bg-brand text-[#08140d]", chip: "bg-ink text-brand" },
  { card: "border border-line bg-surface text-ink", chip: "bg-brand-soft text-brand-ink" },
  { card: "bg-brand-soft text-ink", chip: "bg-ink text-brand" },
];

export function WhyGrid({ dict }: { dict: Dictionary }) {
  const t = dict.why;
  return (
    <section id="why" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const tile = TILES[i % TILES.length];
            return (
              <RevealItem key={item.title} className={`flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${tile.card}`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tile.chip}`}>
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{item.body}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
