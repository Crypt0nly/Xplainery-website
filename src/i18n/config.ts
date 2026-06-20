export const locales = ["en", "de", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; native: string; flag: string; htmlLang: string }
> = {
  en: { label: "English", native: "English", flag: "🇬🇧", htmlLang: "en" },
  de: { label: "German", native: "Deutsch", flag: "🇩🇪", htmlLang: "de" },
  es: { label: "Spanish", native: "Español", flag: "🇪🇸", htmlLang: "es" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
