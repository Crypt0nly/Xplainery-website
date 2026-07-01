/**
 * Slim design-concept switcher pinned to the very top of every design.
 * №1 is the current production design; 2–4 are exploratory concepts.
 * Temporary review aid — remove once a direction is chosen.
 */
const DESIGNS = [
  { n: 1, label: "Classic", href: "/" },
  { n: 2, label: "Noir", href: "/d2" },
  { n: 3, label: "Atelier", href: "/d3" },
  { n: 4, label: "Pulse", href: "/d4" },
  { n: 5, label: "Odyssey", href: "/d5" },
  { n: 6, label: "Odyssey II", href: "/d6" },
] as const;

export function DesignBar({ active }: { active: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[90] flex h-9 items-center justify-center gap-1.5 border-b border-white/10 bg-[#04120a] px-3">
      <span className="mr-1 hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8F5E4]/45 sm:block">
        Design
      </span>
      {DESIGNS.map((d) => {
        const isActive = d.n === active;
        return (
          <a
            key={d.n}
            href={d.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "inline-flex items-center gap-1 rounded-full bg-[#66F745] px-2.5 py-0.5 text-[11px] font-extrabold text-black"
                : "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-[#E8F5E4]/65 transition-colors hover:bg-white/10 hover:text-[#E8F5E4]"
            }
          >
            {d.n}
            <span className="hidden md:inline">· {d.label}</span>
          </a>
        );
      })}
    </div>
  );
}
