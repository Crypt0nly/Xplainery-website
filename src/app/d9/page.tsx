import { ArrowUpRight, CalendarCheck, Check, Mail, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { D9Nav, HeroTitle, PathFinder, ServiceCards, D9ContactForm, Faq, EVERGREEN, LIME } from "@/components/designs/d9/client";
import { hero, articleFour, why, process, faq, contact, footer } from "@/components/designs/d9/content";

/**
 * Design 9 — "NEWEST WEBSITE". Lean and conversion-focused: the four
 * services, the Article 4 add-on and package, and an easy path to contact.
 */
export default function D9Page() {
  return (
    <div id="top">
      <D9Nav />
      <main className="pt-9">
        {/* ===== Hero: evergreen split ===== */}
        <section className="relative overflow-hidden" style={{ backgroundColor: EVERGREEN }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full blur-[140px]" style={{ backgroundColor: `${LIME}26` }} />
            <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          </div>
          <div className="container-x relative grid items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-44">
            <div className="max-w-xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                  {hero.eyebrow}
                </span>
              </Reveal>
              <div className="mt-6">
                <HeroTitle />
              </div>
              <Reveal delay={0.35}>
                <p className="mt-6 text-lg leading-relaxed text-white/75">{hero.body}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brand !px-6 !py-3.5 text-base">
                    <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                    {hero.primary}
                  </a>
                  <a href="#finder" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 lg:hidden">
                    {hero.secondary}
                  </a>
                </div>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">{hero.trust}</p>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="w-full max-w-md lg:max-w-none">
              <div id="finder" className="scroll-mt-28">
                <PathFinder />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="scroll-mt-28 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow="Services" title="Four ways to work together." subtitle="Each one is scoped, priced up front, and ends with something you keep." />
            <div className="mt-14">
              <ServiceCards />
            </div>
          </div>
        </section>

        {/* ===== Article 4 ===== */}
        <section id="article-4" className="scroll-mt-28 py-24 text-white lg:py-32" style={{ backgroundColor: "#050D08" }}>
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: `${LIME}4D`, backgroundColor: `${LIME}1A`, color: LIME }}>
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
                {articleFour.eyebrow}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-[2.6rem]">{articleFour.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">{articleFour.body}</p>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <Reveal className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">{articleFour.addon.label}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold">{articleFour.addon.name}</h3>
                  <p className="mt-2 text-sm text-white/65">{articleFour.addon.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {articleFour.addon.items.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-white/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: LIME }}>
                          <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-xs text-white/45">{articleFour.addon.footnote}</p>
                </article>
              </Reveal>
              <Reveal delay={0.08} className="h-full">
                <article className="relative flex h-full flex-col rounded-3xl border p-7 sm:p-8" style={{ borderColor: `${LIME}66`, backgroundColor: `${LIME}12` }}>
                  <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#08140d]" style={{ backgroundColor: LIME }}>
                    Most popular
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: LIME }}>{articleFour.pkg.label}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold">{articleFour.pkg.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{articleFour.pkg.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {articleFour.pkg.items.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm text-white/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: LIME }}>
                          <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-7 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-3.5 text-sm font-bold text-[#08140d] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: LIME }}>
                    {articleFour.pkg.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                </article>
              </Reveal>
            </div>
            <p className="mt-8 text-sm text-white/45">{articleFour.note}</p>
          </div>
        </section>

        {/* ===== Why + process ===== */}
        <section id="why" className="scroll-mt-28 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={why.eyebrow} title={why.title} />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {why.items.map((w, i) => (
                <Reveal key={w.title} delay={0.06 * i}>
                  <div className="border-t-2 pt-6" style={{ borderColor: LIME }}>
                    <h3 className="font-display text-xl font-bold text-ink">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ===== Process ===== */}
        <section className="border-y border-line bg-surface/60 py-20">
          <div className="container-x">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-subtle">{process.eyebrow}</p>
            <ol className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
              {process.steps.map((s, i) => (
                <Reveal key={s.title} delay={0.08 * i}>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-[#08140d]" style={{ backgroundColor: LIME }}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-24 lg:py-28">
          <div className="container-x mx-auto max-w-3xl">
            <SectionHeading eyebrow="Questions" title="Short answers." />
            <Reveal className="mt-10">
              <Faq items={faq} />
            </Reveal>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-28 border-t border-line bg-surface/60 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.body} />
            <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <D9ContactForm />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-4xl p-8 text-white" style={{ backgroundColor: EVERGREEN }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${LIME}33`, color: LIME }}>
                    <CalendarCheck className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{contact.aside.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{contact.aside.body}</p>
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#08140d] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: LIME }}>
                    {contact.aside.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                  <a href={`mailto:${site.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-[#66F745] decoration-2 underline-offset-4 hover:text-white">
                    <Mail className="h-4 w-4" strokeWidth={2} />
                    {site.email}
                  </a>
                  <p className="mt-6 text-sm text-white/60">{site.founder.name} · {site.founder.role}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="container-x flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
          <p className="font-display font-bold text-ink">{site.name} <span className="font-normal text-muted">— {footer.tagline}</span></p>
          <p className="text-xs text-subtle">© {new Date().getFullYear()} {site.name}. {footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
