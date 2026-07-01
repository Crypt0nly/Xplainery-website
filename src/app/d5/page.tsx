import { getDictionary } from "@/i18n";
import { Odyssey } from "@/components/designs/d5/Odyssey";

export default async function D5Page() {
  const dict = await getDictionary("en");
  return <Odyssey dict={dict} />;
}
