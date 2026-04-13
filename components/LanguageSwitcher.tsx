"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { typeNavLink } from "@/lib/layout-classes";

const locales = routing.locales;

const LOCALE_SHORT: Record<(typeof locales)[number], string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
};

const linkBase = `${typeNavLink} text-flow-text underline decoration-flow-purple/40 underline-offset-4 transition-colors hover:text-flow-purple hover:decoration-flow-purple`;

export function LanguageSwitcher() {
  const t = useTranslations("Languages");
  const tNav = useTranslations("Nav");
  const current = useLocale();

  return (
    <nav aria-label={tNav("languageNav")} className="flex shrink-0 items-center">
      <ul
        className="flex flex-nowrap items-center gap-2 sm:gap-4"
        role="list"
      >
        {locales.map((locale) => (
          <li key={locale} className="shrink-0">
            {locale === current ? (
              <span
                className={`font-semibold text-flow-purple ${typeNavLink}`}
                aria-current="true"
              >
                <span className="sm:hidden">
                  <span aria-hidden="true">{LOCALE_SHORT[locale]}</span>
                  <span className="sr-only">{t(locale)}</span>
                </span>
                <span className="hidden sm:inline">{t(locale)}</span>
              </span>
            ) : (
              <Link href="/" locale={locale} className={linkBase}>
                <span className="sm:hidden">
                  <span aria-hidden="true">{LOCALE_SHORT[locale]}</span>
                  <span className="sr-only">{t(locale)}</span>
                </span>
                <span className="hidden sm:inline">{t(locale)}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
