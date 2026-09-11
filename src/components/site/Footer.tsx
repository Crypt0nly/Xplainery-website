import { ArrowUpRight, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";

const LIME = "#66F745";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative overflow-hidden text-[#E8F5E4]" style={{ backgroundColor: "#050D08" }}>
      <div className="container-x relative pb-8 pt-20">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: LIME }}>{dict.contact.eyebrow}</p>
            <p className="mt-4 max-w-md font-display text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">{dict.contact.title}</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-flex items-center gap-2 text-base font-bold underline decoration-[#66F745] decoration-2 underline-offset-8 transition-colors hover:text-white">
              <Mail className="h-4 w-4" strokeWidth={2.25} style={{ color: LIME }} />
              {site.email}
            </a>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold text-[#08140d] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: LIME }}>
              {dict.contact.bookCta}
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
            <div className="mt-2 flex items-center gap-2">
              {[
                { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: site.social.twitter, icon: Twitter, label: "X / Twitter" },
                { href: site.social.youtube, icon: Youtube, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#E8F5E4]/60 transition-colors hover:border-[#66F745] hover:text-[#66F745]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p aria-hidden className="mt-16 select-none whitespace-nowrap text-center font-display text-[12.5vw] font-bold uppercase leading-[0.8] tracking-tight" style={{ color: "#E8F5E40D" }}>
          Xplainery
        </p>
        <div className="mt-4 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-5 text-[11px] font-semibold text-[#E8F5E4]/60 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.name}. {dict.footer.legal.rights}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{dict.footer.madeIn}</span>
            <a href="/archive" className="underline decoration-[#66F745]/60 underline-offset-4 transition-colors hover:text-white">{dict.footer.archive}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
