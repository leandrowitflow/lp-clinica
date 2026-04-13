"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import type { DiagnosticRecommendResponse } from "@/lib/diagnostic-recommend-schema";
import { trackLandingEvent } from "@/lib/analytics-client";
import {
  copyMeasure,
  typeFinePrint,
  typeLabelCaps,
  typeQuizLegend,
  typeWizardBody,
  typeWizardMuted,
} from "@/lib/layout-classes";

const QUESTION_COUNT = 6;
const OPTION_KEYS = ["a", "b", "c", "d"] as const;
type OptionIndex = 0 | 1 | 2 | 3;

type Props = {
  flowAgentUrl: string;
};

export function ClinicDiagnosticWizard({ flowAgentUrl }: Props) {
  const t = useTranslations("DiagnosticWizard");
  const locale = useLocale();
  const [view, setView] = useState<"start" | "quiz" | "analyzing" | "done">(
    "start",
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(OptionIndex | null)[]>(() =>
    Array.from({ length: QUESTION_COUNT }, () => null),
  );
  const [result, setResult] = useState<DiagnosticRecommendResponse | null>(
    null,
  );
  const [errorKey, setErrorKey] = useState<"generic" | "config" | null>(null);

  const questionIndices = useMemo(
    () => Array.from({ length: QUESTION_COUNT }, (_, i) => i),
    [],
  );

  const buildItems = useCallback(() => {
    return questionIndices.map((i) => ({
      question: t(`q${i + 1}_prompt`),
      answer: t(
        `q${i + 1}_${OPTION_KEYS[answers[i] as OptionIndex]}` as Parameters<
          typeof t
        >[0],
      ),
    }));
  }, [answers, questionIndices, t]);

  const submit = useCallback(async () => {
    if (answers.some((a) => a === null)) return;
    setErrorKey(null);
    setView("analyzing");
    try {
      const res = await fetch("/api/diagnostic-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          items: buildItems(),
        }),
      });
      if (res.status === 503) {
        setErrorKey("config");
        setView("quiz");
        return;
      }
      if (!res.ok) {
        setErrorKey("generic");
        setView("quiz");
        return;
      }
      const data = (await res.json()) as DiagnosticRecommendResponse;
      setResult(data);
      setView("done");
      trackLandingEvent("diagnostic_ai_recommendation_complete", { locale });
    } catch {
      setErrorKey("generic");
      setView("quiz");
    }
  }, [answers, buildItems, locale]);

  const reset = () => {
    setView("start");
    setStep(0);
    setAnswers(Array.from({ length: QUESTION_COUNT }, () => null));
    setResult(null);
    setErrorKey(null);
  };

  const startQuiz = () => {
    setView("quiz");
    setStep(0);
    trackLandingEvent("diagnostic_quiz_start", { locale });
  };

  const selectOption = (option: OptionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = option;
      return next;
    });
  };

  const goNext = () => {
    if (answers[step] === null) return;
    if (step < QUESTION_COUNT - 1) {
      setStep((s) => s + 1);
    } else {
      void submit();
    }
  };

  const goBack = () => {
    setErrorKey(null);
    if (step > 0) setStep((s) => s - 1);
    else setView("start");
  };

  if (view === "start") {
    return (
      <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 sm:mt-10 sm:max-w-lg">
        <p
          className={`text-center text-flow-text ${typeWizardBody} ${copyMeasure}`}
        >
          {t("startIntro")}
        </p>
        <button
          type="button"
          onClick={startQuiz}
          className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-xl bg-flow-purple px-8 py-3 text-center text-base font-semibold text-white shadow-md shadow-flow-purple/25 transition-colors hover:bg-flow-purple-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple min-[420px]:text-lg sm:w-auto"
        >
          {t("startCta")}
        </button>
        <p
          className={`text-center text-flow-muted ${typeWizardMuted} leading-snug ${copyMeasure}`}
        >
          {t("cardNote")}
        </p>
      </div>
    );
  }

  if (view === "analyzing") {
    return (
      <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10">
        <p
          className="text-sm text-flow-purple min-[420px]:text-base"
          role="status"
          aria-live="polite"
        >
          {t("analyzing")}
        </p>
        <span className="inline-block size-10 animate-spin rounded-full border-2 border-flow-border border-t-flow-purple" />
      </div>
    );
  }

  if (view === "done" && result) {
    return (
      <div className="mt-8 w-full max-w-xl text-left sm:mt-10">
        <p className={`${typeLabelCaps} text-flow-muted`}>
          {t("resultKicker")}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight text-flow-purple min-[420px]:text-2xl sm:text-3xl">
          {result.agentProfileTitle}
        </h3>
        <p className="mt-2 text-base font-medium text-flow-text min-[420px]:text-lg">
          {result.agentProfileSubtitle}
        </p>
        <p className={`mt-4 text-flow-text ${typeWizardBody}`}>
          {result.rationale}
        </p>
        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-flow-muted min-[420px]:text-sm">
          {t("focusLabel")}
        </p>
        <ul className={`mt-2 list-inside list-disc space-y-1 text-flow-text ${typeWizardBody}`}>
          {result.priorityCapabilities.map((cap) => (
            <li key={cap}>{cap}</li>
          ))}
        </ul>
        <p
          className={`mt-6 rounded-xl border border-flow-border bg-flow-bg/60 p-4 font-medium text-flow-text ${typeWizardBody}`}
        >
          {result.suggestedNextStep}
        </p>
        <p className={`mt-4 text-flow-muted ${typeFinePrint}`}>
          {t("resultDisclaimer")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-flow-purple px-6 py-2.5 text-sm font-semibold text-flow-purple transition-colors hover:bg-flow-purple/5"
          >
            {t("reset")}
          </button>
          <a
            href={flowAgentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-flow-purple px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-flow-purple-hover"
            onClick={() => {
              trackLandingEvent("flowi_agent_click", { locale });
            }}
          >
            {t("externalFlowCta")}
          </a>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[step];

  return (
    <div className="mt-8 w-full max-w-xl sm:mt-10">
      <p className={`text-center text-flow-muted ${typeWizardMuted}`}>
        {t("progress", { current: step + 1, total: QUESTION_COUNT })}
      </p>
      <fieldset className="mt-6 text-left">
        <legend className={`text-flow-text ${typeQuizLegend}`}>
          {t(`q${step + 1}_prompt`)}
        </legend>
        <div className="mt-4 flex flex-col gap-3">
          {OPTION_KEYS.map((key, idx) => {
            const option = idx as OptionIndex;
            const id = `dq-${step}-${key}`;
            const selected = currentAnswer === option;
            return (
              <label
                key={key}
                htmlFor={id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  selected
                    ? "border-flow-purple bg-flow-purple/[0.06]"
                    : "border-flow-border bg-white/80 hover:border-flow-purple/40"
                }`}
              >
                <input
                  id={id}
                  type="radio"
                  name={`question-${step}`}
                  checked={selected}
                  onChange={() => selectOption(option)}
                  className="mt-1 size-4 shrink-0 accent-flow-purple"
                />
                <span className={`text-flow-text ${typeWizardBody}`}>
                  {t(`q${step + 1}_${key}` as Parameters<typeof t>[0])}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {errorKey ? (
        <p className="mt-4 text-sm font-medium text-red-700" role="alert">
          {errorKey === "config" ? t("errorConfig") : t("errorGeneric")}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-flow-border px-6 py-2.5 text-sm font-semibold text-flow-text transition-colors hover:bg-flow-bg"
        >
          {t("back")}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={currentAnswer === null}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-flow-purple px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-flow-purple-hover disabled:pointer-events-none disabled:opacity-40"
        >
          {step < QUESTION_COUNT - 1 ? t("next") : t("getRecommendation")}
        </button>
      </div>
    </div>
  );
}
