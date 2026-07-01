import { getDictionary } from "@/i18n";
import { Odyssey } from "@/components/designs/d5/Odyssey";

/**
 * Design 6 "Odyssey II" — same experience as /d5 with two changes:
 * Exo 2 as the display font (set in this route's layout) and a zone-aware
 * nav that swaps in the correct light/dark logo instead of blend-inverting.
 */
export default async function D6Page() {
  const dict = await getDictionary("en");
  return <Odyssey dict={dict} adaptiveNav />;
}
