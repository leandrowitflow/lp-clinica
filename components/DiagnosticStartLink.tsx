"use client";

import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { trackLandingEvent } from "@/lib/analytics-client";
import { diagnosticCtaPrimaryMotion } from "@/lib/diagnostic-cta-classes";
import { typeCta } from "@/lib/layout-classes";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function DiagnosticStartLink({ href, children, className }: Props) {
  const locale = useLocale();
  const isInPage = href.startsWith("#");
  const base =
    `inline-flex min-h-[3.25rem] items-center justify-center rounded-lg bg-flow-purple px-8 py-3 text-center ${typeCta} text-white shadow-sm hover:bg-flow-purple-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple ${diagnosticCtaPrimaryMotion}`;
  return (
    <a
      href={href}
      {...(isInPage
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className={className ? `${base} ${className}` : base}
      onClick={() => {
        trackLandingEvent("diagnostic_start_click", { locale });
      }}
    >
      {children}
    </a>
  );
}
