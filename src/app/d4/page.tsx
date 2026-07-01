import {
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
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  PulseNav,
  SavingsSlider,
  PulseUseCases,
  PulseFaq,
  SpringCard,
  BounceCta,
} from "@/components/designs/d4/client";

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

// Tile background rotation for the "why" grid — full literal classes so
// Tailwind picks them up.
const WHY_TILES = [
  "bg-[#E8F5E4] text-[#0B1A10]",
  "bg-white text-[#0B1A10] ring-1 ring-[#0B1A10]/10",
  "bg-[#0B1A10] text-[#E8F5E4]",
  "bg-[#66F745] text-[#0B1A10]",
  "bg-white text-[#0B1A10] ring-1 ring-[#0B1A10]/10",
  "bg-[#E8F5E4] text-[#0B1A10]",
];

const SVC_TILES = [
  "bg-[#E8F5E4] text-[#0B1A10]",
  "bg-[#0B1A10] text-[#E8F5E4]",
  "bg-[#66F745] text-[#0B1A10]",
  "bg-white text-[#0B1A10] ring-1 ring-[#0B1A10]/10",
];

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
      <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1d5c12]">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[#0B1A10] sm:text-[2.7rem] sm:leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#0B1A10]/60 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

export default async function D4Page() {
  const t = await getDictionary("en");

  return (
    <div id="top" className="overflow-x-hidden pt-12">
      <PulseNav />

      {/* ============ HERO ============ */}
      <section className="relative px-5 pb-20 pt-14 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#E8F5E4] blur-3xl" />
          <div className="absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#66F745]/25 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1A10] px-4 py-2 text-xs font-bold text-[#E8F5E4]">
                <span className="h-2 w-2 rounded-full bg-[#66F745]" />
                {t.hero.badge}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[2.8rem] font-extrabold leading-[1.02] tracking-tight text-[#0B1A10] sm:text-6xl lg:text-[4.2rem]">
                {t.hero.titleLead}{" "}
                <span className="relative inline-block -rotate-1 rounded-2xl bg-[#66F745] px-3 py-0.5">
                  {t.hero.titleHighlight}
                </span>{" "}
                {t.hero.titleTrail}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#0B1A10]/65">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BounceCta href={site.bookingUrl}>{t.hero.ctaPrimary}</BounceCta>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8F5E4] px-8 py-4 text-base font-bold text-[#0B1A10] transition-colors hover:bg-[#d9efd2]"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {t.hero.stats.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-[#0B1A10]/10"
                  >
                    <strong className="font-display font-extrabold text-[#0B1A10]">
                      {s.value}
                    </strong>
                    <span className="text-xs text-[#0B1A10]/55">{s.label}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <SavingsSlider />
          </Reveal>
        </div>
      </section>

      {/* ============ INDUSTRY CHIPS MARQUEE ============ */}
      <section className="py-6">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-3 whitespace-nowrap">
            {[...t.logos.items, ...t.logos.items, ...t.logos.items].map(
              (item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E4] px-5 py-2.5 text-sm font-bold text-[#0B1A10]/75"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#66F745]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ============ WHY (tiles) ============ */}
      <section id="why" className="scroll-mt-32 px-5 py-20 sm:py-24">
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
                <Reveal key={item.title} delay={0.05 * i} className="h-full">
                  <SpringCard>
                    <article
                      className={`flex h-full flex-col rounded-[2rem] p-7 ${WHY_TILES[i % WHY_TILES.length]}`}
                    >
                      <span
                        className={
                          i % WHY_TILES.length === 2
                            ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#66F745] text-[#0B1A10]"
                            : "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1A10] text-[#66F745]"
                        }
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-extrabold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed opacity-75">
                        {item.body}
                      </p>
                    </article>
                  </SpringCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SERVICES (chunky tiles) ============ */}
      <section id="services" className="scroll-mt-32 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {t.services.items.map((s, i) => {
              const Icon = SVC_ICONS[s.icon] ?? User;
              const tile = SVC_TILES[i % SVC_TILES.length];
              const isDark = i % SVC_TILES.length === 1;
              return (
                <Reveal key={s.name} delay={0.06 * i} className="h-full">
                  <SpringCard>
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-8 ${tile}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            isDark
                              ? "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#66F745] text-[#0B1A10]"
                              : "flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1A10] text-[#66F745]"
                          }
                        >
                          <Icon className="h-7 w-7" strokeWidth={2} />
                        </span>
                        <span className="font-display text-5xl font-extrabold opacity-10">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight">
                        {s.name}
                      </h3>
                      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] opacity-60">
                        {s.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed opacity-75">
                        {s.body}
                      </p>
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm font-medium"
                          >
                            <span
                              className={
                                isDark
                                  ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#66F745] text-[#0B1A10]"
                                  : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B1A10] text-[#66F745]"
                              }
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="rounded-full bg-white/60 px-3.5 py-1.5 text-xs font-bold text-[#0B1A10] backdrop-blur-sm">
                          {t.services.bestForLabel}: {s.bestFor}
                        </span>
                        <a
                          href={site.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.services.bookCta} — ${s.name}`}
                          className={
                            isDark
                              ? "flex h-11 w-11 items-center justify-center rounded-full bg-[#66F745] text-[#0B1A10] transition-transform group-hover:translate-x-1"
                              : "flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1A10] text-[#66F745] transition-transform group-hover:translate-x-1"
                          }
                        >
                          <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                        </a>
                      </div>
                    </article>
                  </SpringCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ USE CASES (pills) ============ */}
      <section id="usecases" className="scroll-mt-32 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow={t.useCases.eyebrow}
            title={t.useCases.title}
            subtitle={t.useCases.subtitle}
          />
          <Reveal className="mt-12">
            <PulseUseCases dict={t} />
          </Reveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="scroll-mt-32 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            subtitle={t.pricing.subtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {t.pricing.plans.map((p, i) => (
              <Reveal key={p.name} delay={0.06 * i} className="h-full">
                <SpringCard>
                  <article
                    className={
                      p.featured
                        ? "relative flex h-full flex-col rounded-[2.5rem] bg-[#0B1A10] p-8 text-[#E8F5E4] shadow-[0_32px_72px_-24px_rgba(11,26,16,0.55)]"
                        : "relative flex h-full flex-col rounded-[2.5rem] bg-[#F4F9F2] p-8 text-[#0B1A10]"
                    }
                  >
                    {p.featured && (
                      <span className="absolute -top-3.5 left-8 rounded-full bg-[#66F745] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0B1A10]">
                        {t.pricing.popularLabel}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-extrabold">
                      {p.name}
                    </h3>
                    <p className="mt-3">
                      <span
                        className={
                          p.featured
                            ? "font-display text-4xl font-extrabold text-[#66F745]"
                            : "font-display text-4xl font-extrabold"
                        }
                      >
                        {p.price}
                      </span>
                      {p.unit && (
                        <span className="ml-1 text-sm opacity-60">{p.unit}</span>
                      )}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed opacity-70">
                      {p.description}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm font-medium"
                        >
                          <span
                            className={
                              p.featured
                                ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#66F745] text-[#0B1A10]"
                                : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B1A10] text-[#66F745]"
                            }
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
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
                          ? "mt-7 flex items-center justify-center gap-2 rounded-full bg-[#66F745] px-6 py-3.5 text-sm font-extrabold text-[#0B1A10] transition-transform hover:scale-[1.03]"
                          : "mt-7 flex items-center justify-center gap-2 rounded-full bg-[#0B1A10] px-6 py-3.5 text-sm font-extrabold text-[#66F745] transition-transform hover:scale-[1.03]"
                      }
                    >
                      {p.cta}
                    </a>
                  </article>
                </SpringCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-[#E8F5E4] p-6 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1d5c12]">
              {t.pricing.includedTitle}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
              {t.pricing.included.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B1A10]/80"
                >
                  <Check className="h-3.5 w-3.5 text-[#1d5c12]" strokeWidth={3} />
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-[#0B1A10]/50">
              {t.pricing.vatNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section id="founder" className="scroll-mt-32 px-5 py-20 sm:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.founder.photo}
                alt={t.founder.name}
                className="w-full rounded-[3rem] object-cover"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0B1A10] px-5 py-2.5 text-sm font-bold text-[#E8F5E4]">
                {t.founder.name} · {t.founder.role.split(" & ")[0]}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1d5c12]">
              {t.founder.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[#0B1A10] sm:text-4xl">
              {t.founder.title}
            </h2>
            <div className="mt-6 rounded-[2rem] rounded-bl-md bg-[#E8F5E4] p-6">
              <p className="font-display text-lg font-bold leading-snug text-[#0B1A10]">
                “{t.founder.quote}”
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#0B1A10]/65 sm:text-base">
              {t.founder.paragraphs[1]}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {t.founder.highlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-[#0B1A10]/10"
                >
                  <strong className="font-display font-extrabold text-[#0B1A10]">
                    {h.value}
                  </strong>
                  <span className="text-xs text-[#0B1A10]/55">{h.label}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-32 px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />
          <Reveal className="mt-12">
            <PulseFaq items={t.faq.items} />
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 pb-24 pt-8 sm:pb-28">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[#66F745] px-6 py-16 text-center sm:px-12 sm:py-24">
          <Sparkles
            className="absolute left-10 top-10 h-8 w-8 animate-float text-[#0B1A10]/25"
            strokeWidth={2}
          />
          <Sparkles
            className="absolute bottom-12 right-12 h-10 w-10 animate-float text-[#0B1A10]/20 [animation-delay:1.2s]"
            strokeWidth={2}
          />
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-[#0B1A10] sm:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-[#0B1A10]/70">
            {t.cta.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BounceCta href={site.bookingUrl} dark>
              {t.cta.primary}
            </BounceCta>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-8 py-4 text-base font-extrabold text-[#0B1A10] backdrop-blur transition-colors hover:bg-white"
            >
              {t.cta.secondary}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="rounded-t-[3rem] bg-[#0B1A10] px-5 py-14 text-[#E8F5E4]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark-dark.png" alt="Xplainery" className="h-8 w-auto" />
              <span className="font-display text-lg font-extrabold text-white">
                Xplainery
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#E8F5E4]/55">
              {t.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#66F745] px-5 py-2.5 text-sm font-extrabold text-[#0B1A10] transition-transform hover:scale-[1.04]"
            >
              <Mail className="h-4 w-4" strokeWidth={2.25} />
              {site.email}
            </a>
            <p className="text-xs text-[#E8F5E4]/45">
              © {new Date().getFullYear()} {site.name}. {t.footer.legal.rights}
            </p>
            <p className="text-xs text-[#E8F5E4]/45">{t.footer.madeIn}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
