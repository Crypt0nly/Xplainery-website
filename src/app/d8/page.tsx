import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Check,
  Linkedin,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import {
  D8Ambience,
  D8Nav,
  D8Hero,
  IndustryMarquee,
  TierExplorer,
  Journey,
  D8ContactForm,
} from "@/components/designs/d8/client";
import {
  audience,
  articleFour,
  process,
  pricing,
  founder,
  contact,
  footer,
} from "@/components/designs/d8/content";

const DEEP = "#050D08";
const LIME = "#66F745";

/**
 * Design 8 — "NEWEST WEBSITE".
 * A one-page site built from the business-plan board: positioning, the
 * four tiers, the EU AI Act Article 4 offer, the customer journey, pricing
 * and a low-friction contact path — on the Classic II motion layer.
 */
export default function D8Page() {
  return (
    <div id="top">
      <D8Ambience />
      <D8Nav />
      <main className="pt-9">
        <D8Hero />
        <IndustryMarquee />

        {/* ===== Who it's for ===== */}
        <section id="audience" className="scroll-mt-28 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={audience.eyebrow} title={audience.title} />
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {[
                { ...audience.business, icon: Building2 },
                { ...audience.individual, icon: User },
              ].map((a, i) => (
                <Reveal key={a.title} delay={0.08 * i} className="h-full">
                  <article className="card h-full p-8 transition-transform duration-300 hover:-translate-y-1">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink">
                      <a.icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-bold text-ink">{a.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{a.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {a.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand">
                            <Check className="h-3 w-3 text-[#08140d]" strokeWidth={3} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== The four tiers ===== */}
        <section id="services" className="scroll-mt-28 border-t border-line bg-surface/50 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading
              eyebrow="Services"
              title="Four tiers. One clear next step."
              subtitle="Start with a workshop, get a roadmap, build the automation — or book a seat for yourself. Each tier is scoped, priced flat and ends with something you keep."
            />
            <Reveal className="mt-14">
              <TierExplorer />
            </Reveal>
          </div>
        </section>

        {/* ===== EU AI Act Article 4 ===== */}
        <section
          id="article-4"
          className="scroll-mt-28 py-24 text-[#E8F5E4] lg:py-32"
          style={{ backgroundColor: DEEP }}
        >
          <div className="container-x grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ borderColor: `${LIME}4D`, backgroundColor: `${LIME}1A`, color: LIME }}
              >
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
                {articleFour.eyebrow}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-[2.6rem]">
                {articleFour.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#E8F5E4]/70 sm:text-lg">
                {articleFour.body}
              </p>
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#E8F5E4]/60">
                {articleFour.disclaimer}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#08140d] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-8px_rgba(102,247,69,0.7)]"
                  style={{ backgroundColor: LIME }}
                >
                  {articleFour.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
                <span className="text-sm font-semibold text-[#E8F5E4]/70">{articleFour.price}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8F5E4]/50">
                  {articleFour.listTitle}
                </p>
                <RevealStagger className="mt-5 space-y-3">
                  {articleFour.items.map((item) => (
                    <RevealItem key={item} className="flex items-start gap-3 text-base text-[#E8F5E4]/90">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                        style={{ backgroundColor: LIME }}
                      >
                        <Check className="h-3.5 w-3.5 text-[#08140d]" strokeWidth={3} />
                      </span>
                      {item}
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== How it works ===== */}
        <section id="process" className="scroll-mt-28 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={process.eyebrow} title={process.title} />
            <div className="mt-14">
              <Journey />
            </div>
          </div>
        </section>

        {/* ===== Pricing ===== */}
        <section id="pricing" className="scroll-mt-28 border-t border-line bg-surface/50 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.body} />
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {pricing.groups.map((g, i) => (
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
            <p className="mt-8 text-center text-xs text-subtle">{pricing.note}</p>
          </div>
        </section>

        {/* ===== Founder ===== */}
        <section id="founder" className="scroll-mt-28 py-24 lg:py-32">
          <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 -z-10 rounded-4xl bg-brand/20 blur-2xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.founder.photo}
                  alt={site.founder.name}
                  className="w-full rounded-4xl border border-line object-cover shadow-lift"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">{founder.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {founder.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{founder.body}</p>
              <p className="mt-4 text-sm font-semibold text-ink">
                {site.founder.name} · <span className="font-normal text-subtle">{site.founder.role}</span>
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-3">
                {founder.highlights.map((h) => (
                  <div key={h.label} className="rounded-2xl border border-line bg-surface p-4">
                    <dt className="font-display text-sm font-bold text-brand-ink sm:text-base">{h.value}</dt>
                    <dd className="mt-1 text-[11px] leading-snug text-subtle">{h.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-28 border-t border-line bg-surface/50 py-24 lg:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.body} />
            <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Reveal>
                <D8ContactForm />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-4xl border p-8 text-white shadow-glow" style={{ backgroundColor: "#223528", borderColor: "#2c4233" }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${LIME}33`, color: LIME }}>
                    <CalendarCheck className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{contact.aside.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{contact.aside.body}</p>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-[#08140d] transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: LIME }}
                  >
                    {contact.aside.cta}
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-[#66F745] decoration-2 underline-offset-4 hover:text-white"
                  >
                    <Mail className="h-4 w-4" strokeWidth={2} />
                    {site.email}
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-2 text-sm text-white/60 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={2} />
                    Follow on LinkedIn
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold text-ink">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{footer.tagline}</p>
          </div>
          <div className="text-xs text-subtle">
            <p>© {new Date().getFullYear()} {site.name}. {footer.rights}</p>
            <p className="mt-1">{footer.madeIn}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
