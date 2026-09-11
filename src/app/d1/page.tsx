import { getDictionary } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Why } from "@/components/sections/Why";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Tools } from "@/components/sections/Tools";
import { Pricing } from "@/components/sections/Pricing";
import { Founder } from "@/components/sections/Founder";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

/** Archived snapshot of the previous Classic production design. */
export default async function D1Page() {
  const dict = await getDictionary("en");
  return (
    <>
      <Header dict={dict} locale="en" />
      <main className="pt-9">
        <Hero dict={dict} />
        <Logos dict={dict} />
        <Why dict={dict} />
        <Services dict={dict} />
        <Solutions dict={dict} />
        <Tools dict={dict} locale="en" />
        <Pricing dict={dict} />
        <Founder dict={dict} />
        <CTASection dict={dict} />
        <FAQ dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} locale="en" />
    </>
  );
}
