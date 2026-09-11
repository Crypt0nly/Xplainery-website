/** Slim strip shown on archived design concepts (h-9 keeps their top offsets valid). */
export function ArchiveBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[90] flex h-9 items-center justify-center gap-4 border-b border-white/10 bg-[#04120a] px-3 text-[11px] font-semibold text-[#E8F5E4]/70">
      <span className="hidden sm:inline uppercase tracking-[0.18em] text-[#E8F5E4]/45">Archived design concept</span>
      <a href="/" className="rounded-full bg-[#66F745] px-2.5 py-0.5 font-bold text-black">← Back to the website</a>
      <a href="/archive" className="hover:text-white">All concepts</a>
    </div>
  );
}
