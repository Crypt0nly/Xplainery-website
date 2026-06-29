import type { Dictionary } from "@/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AIUseCaseExplorer } from "@/components/interactive/AIUseCaseExplorer";

export function Solutions({ dict }: { dict: Dictionary }) {
  const t = dict.useCases;
  return (
    <section id="solutions" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <Reveal className="mx-auto mt-16 max-w-5xl">
          <AIUseCaseExplorer dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
