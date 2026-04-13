/**
 * Flowi site agent on flowproductions.pt (new tab).
 * Override if the agent lives on a specific path or locale URL.
 */
export function getFlowAgentUrl(): string {
  return (
    process.env.NEXT_PUBLIC_FLOW_AGENT_URL ?? "https://flowproductions.pt"
  );
}
