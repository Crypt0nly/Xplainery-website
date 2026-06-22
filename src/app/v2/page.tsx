import {
  ArrowUpRight,
  ArrowRight,
  Check,
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
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import { V2Nav } from "@/components/v2/V2Nav";
import { V2Faq } from "@/components/v2/V2Faq";

const ICONS: Record<string, LucideIcon> = {
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
};

const LIME = "#66f745";
const FOREST = "#0a2810";
const INK = "#09140d";
const SAGE = "#b3c2b2";

export default async function V2Page() {
  const t = await getDictionary("en");

  return (
    <div id="top" className="overflow-x-hidden">
      <V2Nav />

      {/* ===================== HERO ===================== */}
      <section className="relative">
        {/* organic blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full opacity-70 blur-3xl"
          style={{ background: LIME }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-40 -z-10 h-80 w-80 rounded-[42%_58%_70%_30%/40%_50%_60%_50%] opacity-40 blur-2xl"
          style={{ background: SAGE }}
        />

        <div className="mx-auto grid w-full max-w-[1240px] items-end gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 border-2 border-[#09140d] bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#09140d]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
              {t.hero.badge}
            </span>

            <h1 className="mt-6 font-display text-[3.2rem] font-extrabold leading-[0.95] tracking-tight text-[#09140d] sm:text-[4.6rem] lg:text-[5.4rem]">
              {t.hero.titleLead}{" "}
              <span
                className="box-decoration-clone px-2"
                style={{ background: LIME, boxShadow: `0 0 0 2px ${INK}` }}
              >
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titleTrail}
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#09140d]/75">
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#09140d] bg-[#66f745] px-6 py-4 text-base font-extrabold text-[#09140d] shadow-[5px_5px_0_0_#09140d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#09140d]"
              >
                {t.hero.ctaPrimary}
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#09140d] bg-transparent px-6 py-4 text-base font-extrabold text-[#09140d] transition-colors hover:bg-[#09140d] hover:text-[#f4f1e6]"
              >
                {t.hero.ctaSecondary}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* sticker stack */}
          <div className="relative">
            <div className="border-2 border-[#09140d] bg-white p-5 shadow-[6px_6px_0_0_#09140d]">
              <div className="flex items-center gap-2 border-b-2 border-[#09140d] pb-3">
                <span className="h-3 w-3 rounded-full border border-[#09140d]" style={{ background: LIME }} />
                <span className="h-3 w-3 rounded-full border border-[#09140d] bg-white" />
                <span className="h-3 w-3 rounded-full border border-[#09140d]" style={{ background: SAGE }} />
                <span className="ml-2 text-xs font-bold uppercase tracking-wide text-[#09140d]/60">
                  AI Workspace
                </span>
              </div>
              <p className="mt-4 border-2 border-[#09140d] bg-[#f4f1e6] px-4 py-3 text-sm font-semibold text-[#09140d]">
                {t.hero.floatingCards.one}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="border-2 border-[#09140d] px-3 py-1.5 text-xs font-extrabold text-[#09140d]" style={{ background: LIME }}>
                  {t.hero.floatingCards.two}
                </span>
                <span className="border-2 border-[#09140d] bg-white px-3 py-1.5 text-xs font-extrabold text-[#09140d]">
                  {t.hero.floatingCards.three}
                </span>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 -z-10 h-full w-full border-2 border-[#09140d]"
              style={{ background: SAGE }}
              aria-hidden
            />
          </div>
        </div>

        {/* stats strip */}
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-0 border-y-2 border-[#09140d] px-0 sm:grid-cols-3">
          {t.hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 sm:px-8 ${i < 2 ? "border-b-2 border-[#09140d] sm:border-b-0 sm:border-r-2" : ""}`}
            >
              <div className="font-display text-4xl font-extrabold text-[#09140d]">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-[#09140d]/65">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section style={{ background: FOREST }} className="border-b-2 border-[#09140d] py-5">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {[...t.logos.items, ...t.logos.items, ...t.logos.items, ...t.logos.items].map(
            (item, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="font-display text-2xl font-extrabold tracking-tight" style={{ color: LIME }}>
                  {item}
                </span>
                <Sparkles className="h-4 w-4" style={{ color: SAGE }} strokeWidth={2} />
              </span>
            ),
          )}
        </div>
      </section>

      {/* ===================== WHY ===================== */}
      <section id="why" className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="01" eyebrow={t.why.eyebrow} title={t.why.title} subtitle={t.why.subtitle} />

        <div className="mt-14 grid gap-0 border-l-2 border-t-2 border-[#09140d] sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Target;
            return (
              <div
                key={item.title}
                className="group border-b-2 border-r-2 border-[#09140d] p-7 transition-colors hover:bg-[#66f745]"
              >
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[#09140d] bg-white text-[#09140d] group-hover:bg-[#0a2810] group-hover:text-[#66f745]">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-lg font-extrabold text-[#09140d]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#09140d]/75">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" style={{ background: FOREST }} className="border-y-2 border-[#09140d]">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            index="02"
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            subtitle={t.services.subtitle}
            dark
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {t.services.items.map((s, i) => {
              const Icon = ICONS[s.icon] ?? User;
              return (
                <div
                  key={s.name}
                  className="border-2 border-[#66f745] bg-[#f4f1e6] p-7 shadow-[6px_6px_0_0_#66f745] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border-2 border-[#09140d] bg-[#66f745] text-[#09140d]">
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <span className="font-display text-5xl font-extrabold text-[#09140d]/10">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight text-[#09140d]">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wide text-[#0a2810]/70">
                    {s.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#09140d]/75">
                    {s.body}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-medium text-[#09140d]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[#09140d] bg-[#66f745]">
                          <Check className="h-3 w-3 text-[#09140d]" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex border-2 border-[#09140d] bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#09140d]">
                    {t.services.bestForLabel}: {s.bestFor}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-2 border-[#66f745] p-7 sm:flex-row sm:p-8">
            <div>
              <h3 className="font-display text-xl font-extrabold" style={{ color: LIME }}>
                {t.services.ctaTitle}
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#f4f1e6]/80">
                {t.services.ctaBody}
              </p>
            </div>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border-2 border-[#09140d] bg-[#66f745] px-5 py-3 text-sm font-extrabold text-[#09140d] shadow-[4px_4px_0_0_#09140d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#09140d]"
            >
              {t.services.bookCta}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="03" eyebrow={t.pricing.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p) => {
            const featured = p.featured;
            return (
              <div
                key={p.name}
                className="flex flex-col border-2 border-[#09140d] p-7 shadow-[6px_6px_0_0_#09140d]"
                style={{ background: featured ? FOREST : "#ffffff" }}
              >
                {featured && (
                  <span className="mb-4 inline-flex w-max border-2 border-[#09140d] bg-[#66f745] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#09140d]">
                    {t.pricing.popularLabel}
                  </span>
                )}
                <h3
                  className="font-display text-xl font-extrabold"
                  style={{ color: featured ? LIME : INK }}
                >
                  {p.name}
                </h3>
                <div className="mt-3 flex items-end gap-1">
                  <span
                    className="font-display text-4xl font-extrabold"
                    style={{ color: featured ? "#f4f1e6" : INK }}
                  >
                    {p.price}
                  </span>
                  {p.unit && (
                    <span
                      className="pb-1 text-sm font-bold"
                      style={{ color: featured ? "#f4f1e6" : INK, opacity: 0.6 }}
                    >
                      {p.unit}
                    </span>
                  )}
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: featured ? "#f4f1e6" : INK, opacity: 0.8 }}
                >
                  {p.description}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm font-medium"
                      style={{ color: featured ? "#f4f1e6" : INK }}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[#09140d] bg-[#66f745]">
                        <Check className="h-3 w-3 text-[#09140d]" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 border-2 px-5 py-3 text-sm font-extrabold transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                  style={
                    featured
                      ? { borderColor: LIME, background: LIME, color: INK }
                      : { borderColor: INK, background: "transparent", color: INK }
                  }
                >
                  {p.cta}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-[#09140d]/55">
          {t.pricing.vatNote}
        </p>
      </section>

      {/* ===================== FOUNDER ===================== */}
      <section id="founder" style={{ background: SAGE }} className="border-y-2 border-[#09140d]">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.founder.photo}
              alt={t.founder.name}
              className="relative z-10 w-full border-2 border-[#09140d] object-cover shadow-[8px_8px_0_0_#09140d]"
            />
            <div
              className="absolute -right-4 -top-4 -z-0 h-24 w-24 border-2 border-[#09140d]"
              style={{ background: LIME }}
              aria-hidden
            />
          </div>

          <div>
            <span className="inline-flex border-2 border-[#09140d] bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#09140d]">
              {t.founder.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#09140d] sm:text-5xl">
              {t.founder.title}
            </h2>
            <blockquote className="mt-6 border-l-4 border-[#09140d] pl-5 font-display text-xl font-bold italic leading-snug text-[#0a2810]">
              “{t.founder.quote}”
            </blockquote>
            <div className="mt-6 space-y-3">
              {t.founder.paragraphs.slice(0, 2).map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#09140d]/80">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {t.founder.highlights.map((h) => (
                <div key={h.label} className="border-2 border-[#09140d] bg-[#f4f1e6] p-3">
                  <div className="font-display text-base font-extrabold text-[#09140d]">
                    {h.value}
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-[#09140d]/65">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section id="testimonials" className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead index="04" eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {t.testimonials.items.map((tm, i) => (
            <figure
              key={tm.name}
              className="break-inside-avoid border-2 border-[#09140d] p-6"
              style={{ background: i % 3 === 1 ? LIME : "#ffffff" }}
            >
              <blockquote className="font-display text-lg font-bold leading-snug text-[#09140d]">
                “{tm.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-[#09140d] pt-4">
                <span className="flex h-10 w-10 items-center justify-center border-2 border-[#09140d] bg-[#0a2810] font-display text-sm font-extrabold" style={{ color: LIME }}>
                  {tm.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <div className="text-sm font-extrabold text-[#09140d]">{tm.name}</div>
                  <div className="text-xs font-semibold text-[#09140d]/65">
                    {tm.role} · {tm.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" style={{ background: FOREST }} className="border-y-2 border-[#09140d]">
        <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="font-display text-6xl font-extrabold" style={{ color: LIME }}>
              05
            </span>
            <span className="mt-4 block text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: SAGE }}>
              {t.faq.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#f4f1e6] sm:text-5xl">
              {t.faq.title}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#f4f1e6]/70">
              {t.faq.subtitle}
            </p>
          </div>
          <div className="rounded-none bg-[#f4f1e6] px-6 sm:px-8">
            <V2Faq items={t.faq.items} />
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section style={{ background: LIME }} className="border-b-2 border-[#09140d]">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[#09140d] sm:text-6xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-[#0a2810]">
            {t.cta.subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#09140d] bg-[#09140d] px-7 py-4 text-base font-extrabold text-[#66f745] shadow-[5px_5px_0_0_#09140d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#09140d]"
            >
              {t.cta.primary}
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#09140d] bg-transparent px-7 py-4 text-base font-extrabold text-[#09140d] transition-colors hover:bg-white"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT / FOOTER ===================== */}
      <footer id="contact" style={{ background: FOREST }} className="text-[#f4f1e6]">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark-dark.png" alt="Xplainery" className="h-9 w-auto" />
                <span className="font-display text-xl font-extrabold tracking-tight text-[#f4f1e6]">
                  Xplainery
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4f1e6]/70">
                {t.footer.tagline}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-[#66f745] pb-0.5 font-display text-lg font-bold text-[#f4f1e6] transition-colors hover:text-[#66f745]"
              >
                <Mail className="h-5 w-5" strokeWidth={2} />
                {site.email}
              </a>
            </div>

            <div className="lg:justify-self-end">
              <h3 className="font-display text-2xl font-extrabold text-[#f4f1e6]">
                {t.contact.bookTitle}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[#f4f1e6]/70">
                {t.contact.bookBody}
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 border-2 border-[#09140d] bg-[#66f745] px-6 py-3.5 text-base font-extrabold text-[#09140d] shadow-[4px_4px_0_0_#09140d] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#09140d]"
              >
                {t.contact.bookCta}
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t-2 border-[#f4f1e6]/20 pt-6 text-xs font-semibold text-[#f4f1e6]/60 sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {site.name}. {t.footer.legal.rights}
            </span>
            <span>{t.footer.madeIn}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({
  index,
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  const titleColor = dark ? "#f4f1e6" : "#09140d";
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="font-display text-5xl font-extrabold" style={{ color: LIME }}>
          {index}
        </span>
        <span
          className="text-xs font-extrabold uppercase tracking-[0.14em]"
          style={{ color: dark ? SAGE : "#0a2810" }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className="mt-4 font-display text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
      <p
        className="mt-4 text-lg leading-relaxed"
        style={{ color: titleColor, opacity: 0.75 }}
      >
        {subtitle}
      </p>
    </div>
  );
}
