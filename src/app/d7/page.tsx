import { getDictionary } from "@/i18n";
import { Why } from "@/components/sections/Why";
import { Services } from "@/components/sections/Services";
import { Solutions } from "@/components/sections/Solutions";
import { Tools } from "@/components/sections/Tools";
import { Pricing } from "@/components/sections/Pricing";
import { Founder } from "@/components/sections/Founder";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import {
  D7Ambience,
  D7Nav,
  D7Hero,
  D7Marquee,
} from "@/components/designs/d7/client";

/**
 * Design 7 "Classic II" — the production Classic design (same sections,
 * same tokens, full toolset) elevated with a premium motion layer:
 * light preloader, custom cursor, scroll progress, word-by-word reveals,
 * magnetic CTAs, 3D-tilt hero mockup, parallax orbs, animated counters
 * and a velocity-reactive industry marquee.
 */
export default async function D7Page() {
  const dict = await getDictionary("en");

  return (
    <div id="top">
      <D7Ambience />
      <D7Nav />
      <main className="pt-9">
        <D7Hero dict={dict} />
        <D7Marquee dict={dict} />
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
    </div>
  );
}
