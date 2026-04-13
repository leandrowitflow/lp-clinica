import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "fr"],
  defaultLocale: "pt",
  pathnames: {
    "/": {
      pt: "/clinicas-ai-agents",
      en: "/ai-agents-for-clinics",
      fr: "/agents-ia-pour-cliniques",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
