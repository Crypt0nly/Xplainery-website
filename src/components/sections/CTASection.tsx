import { CalendarCheck, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({ dict }: { dict: Dictionary }) {
  const t = dict.cta;
  return (
    <section className="py-12 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink px-6 py-16 text-center sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/40 blur-[100px]" />
              <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/30 blur-[100px]" />
              <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {t.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">
                {t.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white !px-7 !py-4 text-base text-ink hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                  {t.primary}
                </a>
                <a
                  href="#pricing"
                  className="btn border border-white/20 bg-white/5 !px-7 !py-4 text-base text-white backdrop-blur hover:bg-white/10"
                >
                  {t.secondary}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
