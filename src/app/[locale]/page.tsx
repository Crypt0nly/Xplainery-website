import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Why } from "@/components/sections/Why";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { Pricing } from "@/components/sections/Pricing";
import { Founder } from "@/components/sections/Founder";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <StructuredData dict={dict} locale={locale} />
      <Hero dict={dict} />
      <Logos dict={dict} />
      <Why dict={dict} />
      <Services dict={dict} />
      <Tools dict={dict} locale={locale} />
      <Pricing dict={dict} />
      <Founder dict={dict} />
      <CTASection dict={dict} />
      <FAQ dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
