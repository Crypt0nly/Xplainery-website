import { Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  void locale;
  const explore = [
    { href: "#why", label: dict.nav.why },
    { href: "#tools", label: dict.nav.tools },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#faq", label: dict.nav.faq },
  ];
  const services = dict.services.items.map((s) => ({
    href: "#services",
    label: s.name,
  }));
  const company = [
    { href: "#founder", label: dict.nav.about },
    { href: "#testimonials", label: dict.nav.testimonials },
    { href: "#contact", label: dict.nav.contact },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">
                {dict.footer.newsletter.title}
              </p>
              <p className="mb-3 mt-1 text-xs text-subtle">
                {dict.footer.newsletter.body}
              </p>
              <NewsletterForm dict={dict.footer.newsletter} />
            </div>

            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={site.social.twitter} label="X / Twitter">
                <Twitter className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <Youtube className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </SocialLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterCol title={dict.footer.columns.explore} links={explore} />
            <FooterCol title={dict.footer.columns.services} links={services} />
            <FooterCol title={dict.footer.columns.company} links={company} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. {dict.footer.legal.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{dict.footer.madeIn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l, i) => (
          <li key={`${l.href}-${i}`}>
            <a
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg text-muted transition-colors hover:border-brand/40 hover:text-brand"
    >
      {children}
    </a>
  );
}
