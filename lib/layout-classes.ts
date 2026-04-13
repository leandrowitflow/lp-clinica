/** Shared max width + horizontal padding for header, footer, and all main sections. */
export const contentMax =
  "mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 xl:px-20";

/** Body line length ≈ 11–13 words per line (Latin scripts). */
export const copyMeasure = "max-w-[72ch]";

/**
 * Mobile typography: one step smaller below 420px, then match previous `sm:` scale.
 * Pairs with hero `h1` (already uses min-[420px] steps).
 */

export const typeEyebrow =
  "text-xs font-bold uppercase tracking-[0.2em] min-[420px]:text-sm";

export const typeEyebrowOnDark =
  "text-xs font-bold uppercase tracking-[0.25em] min-[420px]:text-sm";

export const typeLead =
  "text-lg font-medium leading-relaxed min-[420px]:text-xl sm:text-2xl sm:leading-relaxed";

export const typeBody =
  "text-base leading-relaxed min-[420px]:text-lg sm:text-xl sm:leading-relaxed";

export const typeBodySemibold =
  "text-base font-semibold leading-relaxed min-[420px]:text-lg sm:text-xl sm:leading-relaxed";

export const typeH2 =
  "text-3xl font-bold leading-tight tracking-tight min-[420px]:text-4xl sm:text-5xl";

export const typeH2Closing =
  "text-3xl font-bold leading-[1.12] tracking-tight min-[420px]:text-4xl sm:text-5xl lg:text-[2.75rem]";

export const typePullQuote =
  "text-2xl font-bold leading-snug tracking-tight min-[420px]:text-3xl sm:text-[1.875rem] sm:leading-snug lg:text-4xl lg:leading-tight";

export const typeH3 =
  "text-xl font-bold min-[420px]:text-2xl sm:text-3xl";

export const typeCardTitle =
  "text-xl font-bold leading-snug tracking-tight min-[420px]:text-2xl";

export const typeStepIndex =
  "font-mono text-xl font-bold tabular-nums min-[420px]:text-2xl";

export const typeStat =
  "text-4xl font-bold tabular-nums min-[420px]:text-5xl sm:text-6xl";

export const typeCapIndex =
  "font-mono text-2xl font-bold tabular-nums min-[420px]:text-3xl";

export const typeIntroMedium =
  "text-base font-medium leading-relaxed min-[420px]:text-lg sm:text-xl";

export const typeOnDark =
  "text-base leading-relaxed text-white/85 min-[420px]:text-lg sm:text-xl";

export const typeOnDarkList =
  "text-base leading-relaxed min-[420px]:text-lg";

export const typeFooter = "text-sm min-[420px]:text-base";

export const typeCta = "text-sm font-semibold min-[420px]:text-base";

export const typeWizardBody =
  "text-sm leading-relaxed min-[420px]:text-base sm:leading-relaxed";

export const typeWizardMuted = "text-sm font-medium min-[420px]:text-base";

export const typeQuizLegend =
  "text-base font-semibold leading-snug min-[420px]:text-lg sm:text-xl";

export const typeLabelCaps =
  "text-xs font-bold uppercase tracking-[0.18em] min-[420px]:text-sm";

export const typeFinePrint =
  "text-xs leading-relaxed min-[420px]:text-sm";

export const typeCheckBadge =
  "text-sm font-bold min-[420px]:text-base";

/** Header language links */
export const typeNavLink =
  "text-sm min-[420px]:text-base sm:text-base";
