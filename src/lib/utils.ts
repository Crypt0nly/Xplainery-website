type ClassValue = string | number | null | false | undefined;

/** Minimal classnames joiner (no dependency). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Localised in-page or route href helper. */
export function localePath(locale: string, path = ""): string {
  if (path.startsWith("#")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Format a number as EUR with no decimals, European grouping. */
export function formatEUR(value: number, locale = "en"): string {
  const intl =
    locale === "de" ? "de-DE" : locale === "es" ? "es-ES" : "en-IE";
  return new Intl.NumberFormat(intl, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatNumber(value: number, locale = "en"): string {
  const intl =
    locale === "de" ? "de-DE" : locale === "es" ? "es-ES" : "en-IE";
  return new Intl.NumberFormat(intl, { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
}
