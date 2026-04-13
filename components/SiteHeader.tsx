import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { diagnosticCtaPrimaryMotion } from "@/lib/diagnostic-cta-classes";
import { contentMax, typeCta } from "@/lib/layout-classes";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-flow-border/80 bg-white/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-flow-purple"
      >
        {t("skipToContent")}
      </a>
      <div
        className={`${contentMax} flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4 sm:py-5`}
      >
        <Link
          href="/"
          className="min-w-0 shrink outline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-flow-purple"
        >
          <Image
            src="/LogoPreto-01.webp"
            alt={t("brand")}
            width={200}
            height={48}
            className="h-8 w-auto sm:h-9"
            priority
            sizes="(max-width: 640px) 160px, 200px"
          />
        </Link>
        <div className="flex min-w-0 flex-nowrap items-center justify-end gap-2 sm:gap-x-6">
          <LanguageSwitcher />
          <a
            href="#diagnostico"
            className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 border-flow-purple bg-flow-purple px-3 py-2 text-center text-white hover:bg-flow-purple-hover sm:px-5 ${typeCta} ${diagnosticCtaPrimaryMotion}`}
          >
            {t("ctaDiagnostic")}
          </a>
        </div>
      </div>
    </header>
  );
}
