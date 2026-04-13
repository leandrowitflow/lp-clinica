import { z } from "zod";

export const diagnosticRecommendRequestSchema = z.object({
  locale: z.enum(["en", "pt", "fr"]),
  items: z
    .array(
      z.object({
        question: z.string().min(1).max(600),
        answer: z.string().min(1).max(600),
      }),
    )
    .length(6),
});

export type DiagnosticRecommendRequest = z.infer<
  typeof diagnosticRecommendRequestSchema
>;

export const diagnosticRecommendResponseSchema = z.object({
  agentProfileTitle: z.string().max(140),
  agentProfileSubtitle: z.string().max(220),
  rationale: z.string().max(2000),
  priorityCapabilities: z.array(z.string().max(240)).min(2).max(5),
  suggestedNextStep: z.string().max(500),
});

export type DiagnosticRecommendResponse = z.infer<
  typeof diagnosticRecommendResponseSchema
>;
