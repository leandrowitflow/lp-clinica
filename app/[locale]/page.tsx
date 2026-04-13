import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {
  BodySection,
  ClosingDiagnosticSection,
  HeroSection,
  HowItWorksSection,
  ValueStripSection,
} from "@/components/landing/LandingSections";
import { ScrollDepthTracker } from "@/components/ScrollDepthTracker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/i18n/routing";
import { getSiteUrl, localizedLandingPath } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });
  const base = getSiteUrl();
  const canonicalPath = localizedLandingPath[locale as Locale];

  return {
    metadataBase: new URL(base),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: t("ogLocale"),
      type: "website",
      url: `${base}${canonicalPath}`,
    },
    alternates: {
      canonical: `${base}${canonicalPath}`,
      languages: {
        "pt-PT": `${base}${localizedLandingPath.pt}`,
        "en-GB": `${base}${localizedLandingPath.en}`,
        "fr-FR": `${base}${localizedLandingPath.fr}`,
        "x-default": `${base}${localizedLandingPath.pt}`,
      },
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale as Locale} />
      <ScrollDepthTracker />
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <BodySection />
        <ValueStripSection />
        <HowItWorksSection />
        <ClosingDiagnosticSection />
      </main>
      <SiteFooter />
    </>
  );
}
