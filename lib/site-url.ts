export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const localizedLandingPath: Record<string, string> = {
  pt: "/pt/clinicas-ai-agents",
  en: "/en/ai-agents-for-clinics",
  fr: "/fr/agents-ia-pour-cliniques",
};
