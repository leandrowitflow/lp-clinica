"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { trackLandingEvent } from "@/lib/analytics-client";

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const locale = useLocale();
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const fired = firedRef.current;
    const doc = document.documentElement;

    const onScroll = () => {
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        if (!fired.has(100)) {
          fired.add(100);
          trackLandingEvent("scroll_depth", { milestone: 100, locale });
        }
        return;
      }
      const pct = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100),
      );
      for (const m of MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          trackLandingEvent("scroll_depth", { milestone: m, locale });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return null;
}
