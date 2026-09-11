import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SiteHero } from "@/components/site/Hero";
import { PathFinder } from "@/components/site/PathFinder";
import { Industries } from "@/components/site/Industries";
import { QuickWins } from "@/components/site/QuickWins";
import { ServicesExplorer } from "@/components/site/ServicesExplorer";
import { ArticleFour } from "@/components/site/ArticleFour";
import { PricingGrid } from "@/components/site/PricingGrid";
import { ROISection } from "@/components/site/ROISection";
import { WhyGrid } from "@/components/site/WhyGrid";
import { SiteFounder } from "@/components/site/Founder";
import { SiteFaq } from "@/components/site/Faq";
import { ContactSection } from "@/components/site/ContactSection";

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <SiteHero dict={dict} />
      <PathFinder dict={dict} />
      <Industries dict={dict} />
      <QuickWins dict={dict} />
      <ServicesExplorer dict={dict} />
      <ArticleFour dict={dict} />
      <PricingGrid dict={dict} />
      <ROISection dict={dict} locale={locale} />
      <WhyGrid dict={dict} />
      <SiteFounder dict={dict} />
      <SiteFaq dict={dict} />
      <ContactSection dict={dict} />
    </>
  );
}
