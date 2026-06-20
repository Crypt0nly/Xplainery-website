import type { Dictionary } from "@/i18n";

export function Logos({ dict }: { dict: Dictionary }) {
  const items = dict.logos.items;
  const doubled = [...items, ...items];

  return (
    <section className="border-y border-line bg-surface/60 py-10">
      <div className="container-x">
        <p className="text-center text-sm font-medium text-subtle">
          {dict.logos.label}
        </p>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <ul className="flex w-max animate-marquee items-center gap-3">
            {doubled.map((label, i) => (
              <li
                key={`${label}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-bg px-4 py-2 text-sm font-semibold text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
