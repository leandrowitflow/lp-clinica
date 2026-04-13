import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { GoogleTagManagerNoScript, GoogleTags } from "@/components/GoogleTags";
import { routing } from "@/i18n/routing";

/** Fallback when Visby CF .woff2 files are not yet in /public/fonts/visby/ */
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} h-full`}>
      <body className="min-h-full bg-flow-bg text-flow-text antialiased">
        <GoogleTags />
        <GoogleTagManagerNoScript />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
