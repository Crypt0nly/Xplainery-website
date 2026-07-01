import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
  User,
  Users,
  MapPin,
  Mic,
  Mail,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  NoirNav,
  Spotlight,
  NoirUseCases,
  NoirFaq,
} from "@/components/designs/d2/client";

const WHY_ICONS: Record<string, LucideIcon> = {
  Target,
  MessageSquareOff,
  MousePointerClick,
  Briefcase,
  Languages,
  ShieldCheck,
};

const SVC_ICONS: Record<string, LucideIcon> = {
  User,
  Users,
  MapPin,
  Mic,
};

const btnLime =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#66F745] px-6 py-3.5 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_-8px_rgba(102,247,69,0.75)]";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-[#E8F5E4] backdrop-blur transition-colors hover:bg-white/10";

function Heading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#66F745]/30 bg-[#66F745]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#66F745]">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#E8F5E4]/55 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export default async function D2Page() {
  const t = await getDictionary("en");

  return (
    <div id="top" className="overflow-x-hidden pt-9">
      <NoirNav />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#66F745]/[0.13] blur-[140px]" />
        <div className="absolute -left-40 top-[38%] h-[420px] w-[420px] rounded-full bg-[#223528]/70 blur-[120px]" />
        <div className="absolute -right-40 top-[62%] h-[460px] w-[460px] rounded-full bg-[#66F745]/[0.06] blur-[130px]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
      </div>

      {/* ============ HERO ============ */}
      <Spotlight>
        <section className="relative px-5 pb-24 pt-40 sm:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-[#E8F5E4]/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#66F745] shadow-[0_0_12px_2px_rgba(102,247,69,0.8)]" />
                {t.hero.badge}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[2.9rem] font-bold leading-[1.02] tracking-tight text-white sm:text-7xl">
                {t.hero.titleLead}{" "}
                <span className="bg-gradient-to-r from-[#66F745] via-[#a8ff8f] to-[#66F745] bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>{" "}
                {t.hero.titleTrail}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#E8F5E4]/60">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnLime} !px-8 !py-4 !text-base`}
                >
                  {t.hero.ctaPrimary}
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                </a>
                <a href="#services" className={`${btnGhost} !px-8 !py-4 !text-base`}>
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
                {t.hero.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur"
                  >
                    <dt className="font-display text-2xl font-bold text-[#66F745] sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-[11px] leading-snug text-[#E8F5E4]/50 sm:text-xs">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </Spotlight>

      {/* ============ INDUSTRY MARQUEE ============ */}
      <section className="border-y border-white/10 bg-white/[0.02] py-5">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
            {[...t.logos.items, ...t.logos.items].map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="font-display text-lg font-semibold tracking-wide text-[#E8F5E4]/35">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#66F745]/60" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY (bento) ============ */}
      <section id="why" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow={t.why.eyebrow}
            title={t.why.title}
            subtitle={t.why.subtitle}
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.items.map((item, i) => {
              const Icon = WHY_ICONS[item.icon] ?? Target;
              return (
                <Reveal key={item.title} delay={0.05 * i}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-[#66F745]/40 hover:bg-white/[0.05] hover:shadow-[0_0_60px_-18px_rgba(102,247,69,0.45)]">
                    <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#66F745]/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#66F745]/25 bg-[#66F745]/10 text-[#66F745]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#E8F5E4]/55">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {t.services.items.map((s, i) => {
              const Icon = SVC_ICONS[s.icon] ?? User;
              return (
                <Reveal key={s.name} delay={0.06 * i}>
                  <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-300 hover:border-[#66F745]/35 sm:p-8">
                    <span className="pointer-events-none absolute right-6 top-5 font-display text-6xl font-bold text-white/[0.05]">
                      0{i + 1}
                    </span>
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#66F745] text-black shadow-[0_0_36px_-10px_rgba(102,247,69,0.9)]">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-bold text-white">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#66F745]/80">
                      {s.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#E8F5E4]/60">
                      {s.body}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-[#E8F5E4]/80"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#66F745]"
                            strokeWidth={2.5}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#E8F5E4]/70">
                      {t.services.bestForLabel}: {s.bestFor}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ USE CASES (interactive) ============ */}
      <section id="usecases" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow={t.useCases.eyebrow}
            title={t.useCases.title}
            subtitle={t.useCases.subtitle}
          />
          <Reveal className="mt-14">
            <NoirUseCases dict={t} />
          </Reveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            subtitle={t.pricing.subtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {t.pricing.plans.map((p, i) => (
              <Reveal key={p.name} delay={0.06 * i} className="h-full">
                <article
                  className={
                    p.featured
                      ? "relative flex h-full flex-col rounded-3xl border border-[#66F745]/50 bg-gradient-to-b from-[#66F745]/[0.12] to-transparent p-7 shadow-[0_0_70px_-20px_rgba(102,247,69,0.5)]"
                      : "relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                  }
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#66F745] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-black">
                      <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                      {t.pricing.popularLabel}
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-white">
                    {p.name}
                  </h3>
                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="font-display text-4xl font-bold text-white">
                      {p.price}
                    </span>
                    {p.unit && (
                      <span className="pb-1 text-sm text-[#E8F5E4]/50">
                        {p.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#E8F5E4]/55">
                    {p.description}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-[#E8F5E4]/80"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#66F745]"
                          strokeWidth={2.5}
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
                        ? `${btnLime} mt-7 w-full`
                        : `${btnGhost} mt-7 w-full`
                    }
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[#E8F5E4]/40">
            {t.pricing.vatNote}
          </p>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section id="founder" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[#66F745]/15 blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.founder.photo}
                alt={t.founder.name}
                className="w-full rounded-[2rem] border border-white/15 object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#66F745]/30 bg-[#66F745]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#66F745]">
              {t.founder.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.founder.title}
            </h2>
            <blockquote className="mt-6 border-l-2 border-[#66F745] pl-5 font-display text-xl font-medium leading-snug text-[#E8F5E4]/90">
              “{t.founder.quote}”
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed text-[#E8F5E4]/60">
              {t.founder.paragraphs[0]}
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {t.founder.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <p className="font-display text-sm font-bold text-[#66F745]">
                    {h.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-[#E8F5E4]/50">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-28 px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Heading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <Reveal className="mt-12">
            <NoirFaq items={t.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 py-24 sm:py-32">
        <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-[#66F745]/25 bg-gradient-to-b from-[#66F745]/[0.14] to-transparent px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[560px] -translate-x-1/2 rounded-full bg-[#66F745]/25 blur-[90px]" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {t.cta.title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#E8F5E4]/60 sm:text-lg">
            {t.cta.subtitle}
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnLime} !px-8 !py-4 !text-base`}
            >
              {t.cta.primary}
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
            <a href="#pricing" className={btnGhost}>
              {t.cta.secondary}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer id="contact" className="border-t border-white/10 px-5 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark-dark.png" alt="Xplainery" className="h-8 w-auto" />
              <span className="font-display text-lg font-bold text-white">
                Xplainery
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#E8F5E4]/50">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#66F745] hover:underline"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              {site.email}
            </a>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <div className="flex items-center gap-2">
              {[
                { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: site.social.twitter, icon: Twitter, label: "X / Twitter" },
                { href: site.social.youtube, icon: Youtube, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#E8F5E4]/60 transition-colors hover:border-[#66F745]/50 hover:text-[#66F745]"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
            <p className="text-xs text-[#E8F5E4]/40">
              © {new Date().getFullYear()} {site.name}. {t.footer.legal.rights}
            </p>
            <p className="text-xs text-[#E8F5E4]/40">{t.footer.madeIn}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
