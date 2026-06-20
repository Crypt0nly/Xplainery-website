import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AIReadinessAssessment } from "@/components/interactive/AIReadinessAssessment";
import { ROICalculator } from "@/components/interactive/ROICalculator";

export function Tools({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.tools;
  return (
    <section
      id="tools"
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />
      </div>

      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <AIReadinessAssessment dict={dict} />
          </Reveal>
          <Reveal className="h-full" delay={0.1}>
            <ROICalculator dict={dict} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
