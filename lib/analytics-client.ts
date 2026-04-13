"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export function trackLandingEvent(
  name: string,
  params: EventParams = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: name,
    ...params,
  });
}
