import { getTranslations } from "next-intl/server";
import { contentMax, copyMeasure, typeFooter } from "@/lib/layout-classes";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="bg-gradient-to-b from-[#eceaf5] via-flow-bg to-white py-12">
      <div className={contentMax}>
        <div className={`flex flex-col gap-1 ${copyMeasure}`}>
          <p className={`font-medium text-flow-text ${typeFooter}`}>
            {t("builtBy")}
          </p>
          <p className={`text-flow-muted ${typeFooter}`}>{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
