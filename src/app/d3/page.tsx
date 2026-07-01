import { Asterisk, ArrowRight, ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  AtelierNav,
  WordRotator,
  ServiceRows,
  AtelierUseCases,
  AtelierFaq,
} from "@/components/designs/d3/client";

function Chapter({
  no,
  label,
  title,
  subtitle,
}: {
  no: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm italic text-[#223528]/45">
          N°{no}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#223528]/45">
          {label}
        </span>
        <span className="h-px flex-1 bg-[#223528]/15" />
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.12] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#223528]/65 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

const linkCta =
  "inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-[#223528]";

export default async function D3Page() {
  const t = await getDictionary("en");

  return (
    <div id="top" className="overflow-x-hidden pt-9">
      <AtelierNav />

      {/* ============ HERO ============ */}
      <section className="px-5 pb-20 pt-36 sm:pt-44">
        <div className="mx-auto max-w-[1150px]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#223528]/55">
              <Asterisk className="h-4 w-4 text-[#3f9629]" strokeWidth={2.5} />
              {t.hero.badge}
              <Asterisk className="h-4 w-4 text-[#3f9629]" strokeWidth={2.5} />
            </p>

            <h1 className="mt-8 font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-7xl lg:text-[5.2rem]">
              {t.hero.titleLead}{" "}
              <em className="italic [text-decoration:underline] [text-decoration-color:#66F745] [text-decoration-thickness:4px] [text-underline-offset:8px]">
                {t.hero.titleHighlight}
              </em>{" "}
              {t.hero.titleTrail}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#223528]/70">
              {t.hero.subtitle}
            </p>

            <p className="mt-6 font-display text-xl text-[#223528]/75 sm:text-2xl">
              for <WordRotator words={t.logos.items} />
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#223528] px-8 py-4 text-base font-semibold text-[#F6FAF1] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_rgba(34,53,40,0.55)]"
              >
                {t.hero.ctaPrimary}
                <ArrowUpRight className="h-5 w-5 text-[#66F745]" strokeWidth={2.25} />
              </a>
              <a href="#services" className={linkCta}>
                {t.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-3 divide-x divide-[#223528]/15 border-y border-[#223528]/15">
              {t.hero.stats.map((s) => (
                <div key={s.label} className="px-4 py-7 text-center sm:px-8">
                  <dt className="font-display text-2xl font-medium sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#223528]/50 sm:text-[11px]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============ INDUSTRIES LINE ============ */}
      <section className="px-5 pb-24">
        <Reveal className="mx-auto max-w-[1150px] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#223528]/40">
            {t.logos.label}
          </p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {t.logos.items.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                <span className="font-display text-xl italic text-[#223528]/60 sm:text-2xl">
                  {item}
                </span>
                {i < t.logos.items.length - 1 && (
                  <Asterisk className="h-4 w-4 text-[#66F745]" strokeWidth={2.5} />
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      {/* ============ WHY ============ */}
      <section id="why" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter
            no="01"
            label={t.why.eyebrow}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((item, i) => (
              <Reveal key={item.title} delay={0.04 * i}>
                <article className="border-t border-[#223528]/20 pt-6">
                  <div className="flex items-baseline justify-between">
                    <Asterisk className="h-5 w-5 text-[#3f9629]" strokeWidth={2.5} />
                    <span className="font-display text-xs italic text-[#223528]/35">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#223528]/65">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES (expanding rows) ============ */}
      <section id="services" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter
            no="02"
            label={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />
          <Reveal className="mt-14">
            <ServiceRows dict={t} />
          </Reveal>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section id="usecases" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter
            no="03"
            label={t.useCases.eyebrow}
            title={t.useCases.title}
            subtitle={t.useCases.subtitle}
          />
          <Reveal className="mt-14">
            <AtelierUseCases dict={t} />
          </Reveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter
            no="04"
            label={t.pricing.eyebrow}
            title={t.pricing.title}
            subtitle={t.pricing.subtitle}
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#223528]/15">
            {t.pricing.plans.map((p) => (
              <Reveal key={p.name} className="h-full">
                <article
                  className={
                    p.featured
                      ? "flex h-full flex-col rounded-3xl bg-[#223528] p-8 text-[#F6FAF1] lg:mx-6 lg:-my-4 lg:py-12"
                      : "flex h-full flex-col p-8 lg:px-10"
                  }
                >
                  <p
                    className={
                      p.featured
                        ? "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#66F745]"
                        : "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#223528]/50"
                    }
                  >
                    {p.featured && (
                      <Asterisk className="h-3.5 w-3.5" strokeWidth={2.5} />
                    )}
                    {p.featured ? t.pricing.popularLabel : p.name}
                  </p>
                  {p.featured && (
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F6FAF1]/60">
                      {p.name}
                    </p>
                  )}
                  <p className="mt-5 font-display text-5xl font-medium">
                    {p.price}
                    {p.unit && (
                      <span
                        className={
                          p.featured
                            ? "ml-1 font-sans text-sm text-[#F6FAF1]/55"
                            : "ml-1 font-sans text-sm text-[#223528]/50"
                        }
                      >
                        {p.unit}
                      </span>
                    )}
                  </p>
                  <p
                    className={
                      p.featured
                        ? "mt-4 text-sm leading-relaxed text-[#F6FAF1]/70"
                        : "mt-4 text-sm leading-relaxed text-[#223528]/65"
                    }
                  >
                    {p.description}
                  </p>
                  <ul
                    className={
                      p.featured
                        ? "mt-6 flex-1 space-y-3 border-t border-[#F6FAF1]/15 pt-6"
                        : "mt-6 flex-1 space-y-3 border-t border-[#223528]/15 pt-6"
                    }
                  >
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={
                          p.featured
                            ? "flex items-start gap-2.5 text-sm leading-relaxed text-[#F6FAF1]/85"
                            : "flex items-start gap-2.5 text-sm leading-relaxed text-[#223528]/75"
                        }
                      >
                        <span
                          className={
                            p.featured
                              ? "mt-[9px] h-px w-4 shrink-0 bg-[#66F745]"
                              : "mt-[9px] h-px w-4 shrink-0 bg-[#3f9629]"
                          }
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      p.featured
                        ? "mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#66F745] px-6 py-3.5 text-sm font-bold text-[#0b1a10] transition-transform hover:-translate-y-0.5"
                        : "mt-8 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#66F745] decoration-[3px] underline-offset-[6px] transition-colors hover:decoration-[#223528]"
                    }
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-[#223528]/45">
            {t.pricing.vatNote}
          </p>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section id="founder" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter no="05" label={t.founder.eyebrow} title={t.founder.title} />

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Reveal>
              <figure className="relative mx-auto max-w-xs lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.founder.photo}
                  alt={t.founder.name}
                  className="w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-[#223528]/20 pt-3">
                  <span className="font-display text-lg italic">
                    {t.founder.name}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#223528]/50">
                    {t.founder.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="font-display text-2xl font-medium italic leading-[1.35] sm:text-[2.1rem]">
                “{t.founder.quote}”
              </blockquote>
              <div className="mt-8 max-w-xl space-y-4">
                {t.founder.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-[#223528]/70 sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-[#223528]/15 border-y border-[#223528]/15">
                {t.founder.highlights.map((h) => (
                  <div key={h.label} className="px-3 py-5 text-center sm:px-5">
                    <dt className="font-display text-base font-medium sm:text-lg">
                      {h.value}
                    </dt>
                    <dd className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#223528]/50 sm:text-[10px]">
                      {h.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-28 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-[1150px]">
          <Chapter
            no="06"
            label={t.faq.eyebrow}
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <AtelierFaq items={t.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Asterisk
            className="mx-auto h-8 w-8 text-[#3f9629]"
            strokeWidth={2.5}
          />
          <h2 className="mt-6 font-display text-4xl font-medium italic leading-[1.1] tracking-tight sm:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#223528]/65 sm:text-lg">
            {t.cta.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#223528] px-8 py-4 text-base font-semibold text-[#F6FAF1] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_rgba(34,53,40,0.55)]"
            >
              {t.cta.primary}
              <ArrowUpRight className="h-5 w-5 text-[#66F745]" strokeWidth={2.25} />
            </a>
            <a href="#pricing" className={linkCta}>
              {t.cta.secondary}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#223528]/15 px-5 py-12">
        <div className="mx-auto flex max-w-[1150px] flex-col items-center gap-6 text-center">
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.png" alt="Xplainery" className="h-7 w-auto" />
            <span className="font-display text-xl font-semibold tracking-tight">
              Xplainery
            </span>
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-[#223528]/60">
            {t.footer.tagline}
          </p>
          <a href={`mailto:${site.email}`} className={linkCta}>
            {site.email}
          </a>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#223528]/40">
            © {new Date().getFullYear()} {site.name} · {t.footer.madeIn}
          </p>
        </div>
      </footer>
    </div>
  );
}
