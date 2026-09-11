import { ArrowLeft, ArrowUpRight } from "lucide-react";

const CONCEPTS = [
  { n: 1, name: "Classic", href: "/d1", blurb: "The original production design — light, clean SaaS layout." },
  { n: 2, name: "Noir", href: "/d2", blurb: "Premium dark tech-luxe with aurora glow and glass cards." },
  { n: 3, name: "Atelier", href: "/d3", blurb: "Editorial serif luxury — warm paper, hairlines, chapters." },
  { n: 4, name: "Pulse", href: "/d4", blurb: "Soft kinetic app-feel with chunky tiles and spring motion." },
  { n: 5, name: "Odyssey", href: "/d5", blurb: "Cinematic scroll experience — preloader, pinned gallery, curtain footer." },
  { n: 6, name: "Odyssey II", href: "/d6", blurb: "Odyssey in Exo 2 with a zone-aware navigation." },
  { n: 7, name: "Classic II", href: "/d7", blurb: "Classic elevated with the premium motion layer." },
  { n: 8, name: "Draft", href: "/d8", blurb: "First one-page draft built from the business plan." },
  { n: 9, name: "Lean", href: "/d9", blurb: "Lean, contact-focused one-pager with a path finder." },
];

export default function ArchivePage() {
  return (
    <main className="container-x py-20">
      <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink hover:underline">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
        Back to the website
      </a>
      <span className="eyebrow mt-8">Archive</span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">Previous design concepts</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Design directions explored for xplainery.com before the current site. They are kept for reference and are not indexed.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTS.map((c) => (
          <li key={c.n}>
            <a href={c.href} className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="font-display text-sm font-bold text-brand-ink">0{c.n}</span>
              <span className="mt-2 flex items-center justify-between font-display text-xl font-bold text-ink">
                {c.name}
                <ArrowUpRight className="h-5 w-5 text-subtle transition-colors group-hover:text-brand-ink" strokeWidth={2.25} />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
