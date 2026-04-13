import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-flow-bg px-6 text-flow-text">
        <h1 className="text-2xl font-bold text-flow-purple">404</h1>
        <p className="text-center text-sm text-flow-muted">This page could not be found.</p>
        <Link
          href="/pt/clinicas-ai-agents"
          className="text-sm font-medium text-flow-purple underline decoration-flow-purple/40 underline-offset-4 hover:decoration-flow-purple"
        >
          Flow Productions — AI Agents for clinics (PT)
        </Link>
      </body>
    </html>
  );
}
