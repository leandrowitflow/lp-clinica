import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl, localizedLandingPath } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return routing.locales.map((locale) => ({
    url: `${base}${localizedLandingPath[locale]}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        pt: `${base}${localizedLandingPath.pt}`,
        en: `${base}${localizedLandingPath.en}`,
        fr: `${base}${localizedLandingPath.fr}`,
      },
    },
  }));
}
