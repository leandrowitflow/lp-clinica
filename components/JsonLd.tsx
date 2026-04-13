import { getTranslations } from "next-intl/server";
import { getSiteUrl, localizedLandingPath } from "@/lib/site-url";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
};

export async function JsonLd({ locale }: Props) {
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tOrg = await getTranslations({ locale, namespace: "JsonLd" });
  const base = getSiteUrl();
  const path = localizedLandingPath[locale];
  const url = `${base}${path}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flow Productions",
    description: tOrg("orgDescription"),
    url: base,
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tMeta("title"),
    description: tMeta("description"),
    url,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "Flow Productions",
      url: base,
    },
  };

  const payload = [organization, webPage];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
