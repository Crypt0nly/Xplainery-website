import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ROICalculator } from "@/components/interactive/ROICalculator";

export function ROISection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="tools" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />
      </div>
      <div className="container-x">
        <SectionHeading eyebrow={dict.tools.eyebrow} title={dict.tools.roi.title} subtitle={dict.tools.roi.subtitle} />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <ROICalculator dict={dict} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
