import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

export function StructuredData({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    description: dict.meta.description,
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    sameAs: [site.social.linkedin, site.social.twitter, site.social.youtube],
    areaServed: "Europe",
    knowsLanguage: ["en", "de", "es"],
  };

  const services = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI training and coaching",
    provider: { "@type": "Organization", name: site.name },
    areaServed: "Europe",
    availableLanguage: ["English", "German", "Spanish"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.title,
      itemListElement: dict.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.body },
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
