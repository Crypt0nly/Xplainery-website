/**
 * Floating A/B design switcher — lets the team flip between the two
 * design concepts while reviewing. Remove once a direction is chosen.
 * Uses explicit brand colors so it looks identical on both sites.
 */
export function DesignSwitcher({ active }: { active: "A" | "B" }) {
  const seg =
    "rounded-full px-4 py-1.5 text-sm font-extrabold transition-colors";
  return (
    <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border-2 border-[#09140d] bg-[#09140d] p-1 shadow-[3px_3px_0_0_rgba(9,20,13,0.35)]">
        <span className="px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b3c2b2]">
          Design
        </span>
        <a
          href="/en"
          aria-current={active === "A" ? "page" : undefined}
          className={seg}
          style={
            active === "A"
              ? { background: "#66f745", color: "#09140d" }
              : { background: "transparent", color: "#f4f1e6" }
          }
        >
          A
        </a>
        <a
          href="/v2"
          aria-current={active === "B" ? "page" : undefined}
          className={seg}
          style={
            active === "B"
              ? { background: "#66f745", color: "#09140d" }
              : { background: "transparent", color: "#f4f1e6" }
          }
        >
          B
        </a>
      </div>
    </div>
  );
}
