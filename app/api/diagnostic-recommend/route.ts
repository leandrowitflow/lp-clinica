import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import {
  diagnosticRecommendRequestSchema,
  diagnosticRecommendResponseSchema,
} from "@/lib/diagnostic-recommend-schema";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Default: Gemini 3.1 Flash-Lite (preview). Override with DIAGNOSTIC_AI_MODEL if needed. */
const MODEL = process.env.DIAGNOSTIC_AI_MODEL ?? "gemini-3.1-flash-lite-preview";

function localeInstruction(locale: string): string {
  switch (locale) {
    case "pt":
      return "Write every user-facing field in European Portuguese.";
    case "fr":
      return "Write every user-facing field in French.";
    default:
      return "Write every user-facing field in English.";
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return Response.json(
      {
        error: "missing_api_key",
        message: "GEMINI_API_KEY is not configured.",
      },
      { status: 503 },
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = diagnosticRecommendRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "validation_error" }, { status: 400 });
  }

  const { locale, items } = parsed.data;

  const qaBlock = items
    .map((item, i) => `${i + 1}. ${item.question}\n   → ${item.answer}`)
    .join("\n\n");

  const system = `You help clinics choose an AI agent profile from Flow Productions' offering (voice, messaging, triage, FAQ, qualification, CRM handover — always with human oversight and clinic-defined rules).
You must output a single best-fit agent profile name and practical guidance. Do not claim medical diagnosis or regulatory compliance. Be concrete and actionable.
${localeInstruction(locale)}`;

  const prompt = `Clinic diagnostic (locale ${locale}):

${qaBlock}

Based only on these answers, choose the single best-matching AI agent archetype (e.g. inbound phone agent, WhatsApp triage agent, omnichannel reception agent, after-hours coverage agent). Explain why in plain language. List 2–5 priority capabilities to implement first. End with one short suggested next step (e.g. book a scoping call, share CRM details).`;

  try {
    const { output } = await generateText({
      model: google(MODEL),
      output: Output.object({
        schema: diagnosticRecommendResponseSchema,
        name: "ClinicAgentRecommendation",
        description: "Structured AI agent recommendation for a clinic",
      }),
      system,
      prompt,
      temperature: 0.4,
    });

    if (!output) {
      return Response.json({ error: "no_output" }, { status: 502 });
    }

    return Response.json(output);
  } catch (e) {
    console.error("[diagnostic-recommend]", e);
    return Response.json({ error: "model_error" }, { status: 502 });
  }
}
