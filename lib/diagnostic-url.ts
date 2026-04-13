/**
 * Same flow as Flow Productions MarTech diagnostic (see https://flowproductions.pt/pt/martech).
 * Override with NEXT_PUBLIC_DIAGNOSTIC_URL when a dedicated clinics diagnostic exists.
 */
export function getDiagnosticUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DIAGNOSTIC_URL ?? "https://flowproductions.pt/pt/martech"
  );
}
