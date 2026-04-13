import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ClinicDiagnosticWizard } from "@/components/diagnostic/ClinicDiagnosticWizard";
import { DiagnosticStartLink } from "@/components/DiagnosticStartLink";
import { getFlowAgentUrl } from "@/lib/flow-agent-url";
import {
  contentMax,
  copyMeasure,
  typeBody,
  typeBodySemibold,
  typeCardTitle,
  typeCapIndex,
  typeCheckBadge,
  typeCta,
  typeEyebrow,
  typeEyebrowOnDark,
  typeFinePrint,
  typeH2,
  typeH2Closing,
  typeH3,
  typeIntroMedium,
  typeLabelCaps,
  typeLead,
  typeOnDark,
  typeOnDarkList,
  typePullQuote,
  typeStat,
  typeStepIndex,
} from "@/lib/layout-classes";

const FLOW_WEBSITE = "https://flowproductions.pt";

const sectionShell = "border-b border-flow-border py-16 sm:py-24";
const sectionAlt = `${sectionShell} bg-white`;
const sectionMuted = `${sectionShell} bg-flow-bg`;

/** Matches hero closing highlight: yellow accent bar + soft purple wash + lift shadow */
const highlightCardShell =
  "rounded-2xl border border-flow-border border-l-4 border-l-flow-yellow bg-gradient-to-br from-flow-purple/[0.07] via-white to-flow-bg/60 shadow-[0_12px_40px_-16px_rgba(92,84,160,0.25)]";

function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${typeEyebrow} text-flow-purple ${className}`}
    >
      {children}
    </p>
  );
}

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section
      className="border-b border-flow-border bg-white pt-0"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed 16:9: same aspect as a 16:9 asset → image fills edge-to-edge, no side bars. */}
      <div className="relative hidden aspect-video w-full md:block">
        {/* Unoptimized: `/_next/image` re-encodes (WebP/AVIF + resize); that can look worse than the JPEG you see in Preview. */}
        <Image
          src="/banner.jpeg"
          alt={t("bannerAlt")}
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[32%] min-h-[8rem] bg-[linear-gradient(to_top,#fff_0%,#fff_3%,rgba(255,255,255,0.92)_14%,rgba(255,255,255,0.55)_30%,rgba(255,255,255,0.18)_52%,rgba(255,255,255,0.04)_74%,transparent_100%)] sm:min-h-[10rem] lg:min-h-[11.5rem]"
          aria-hidden
        />
      </div>

      <div
        className={`${contentMax} pb-12 pt-10 sm:pb-16 sm:pt-12 md:pt-10`}
      >
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1
          id="hero-heading"
          className={`mt-2 text-balance text-4xl font-bold leading-[1.12] tracking-[-0.015em] text-flow-text min-[420px]:text-5xl min-[420px]:leading-[1.08] sm:mt-3 sm:text-6xl sm:leading-snug sm:tracking-tight lg:text-[3.1rem] lg:leading-[1.08] ${copyMeasure}`}
        >
          {t("h1")}
        </h1>
        <p
          className={`mt-6 text-flow-text ${typeLead} ${copyMeasure}`}
        >
          {t("lead")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <DiagnosticStartLink href="#diagnostico">
            {t("ctaPrimary")}
          </DiagnosticStartLink>
          <a
            href={FLOW_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[3.25rem] items-center justify-center rounded-lg border-2 border-flow-purple bg-transparent px-8 py-3 text-center ${typeCta} text-flow-purple transition-colors hover:bg-flow-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple`}
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
          <div
            className={`space-y-5 text-left text-flow-text min-[420px]:space-y-6 sm:space-y-7 lg:col-span-7 ${typeBody} ${copyMeasure}`}
          >
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
          <aside className="mt-8 lg:col-span-5 lg:mt-0">
            <p
              className={`${highlightCardShell} p-6 text-balance text-flow-purple sm:p-8 ${typePullQuote} ${copyMeasure}`}
            >
              {t("p5")}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export async function BodySection() {
  const t = await getTranslations("Body");

  return (
    <section className={sectionMuted} aria-labelledby="body-heading">
      <div className={contentMax}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2
              id="body-heading"
              className={`mt-4 text-flow-text ${typeH2} ${copyMeasure}`}
            >
              {t("title")}
            </h2>
            <div
              className={`mt-10 space-y-5 text-flow-text ${typeBody} ${copyMeasure}`}
            >
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p className="font-medium">{t("p4")}</p>
            </div>

            <p
              className={`mt-12 text-flow-text ${typeBody} ${copyMeasure}`}
            >
              {t("handover")}
            </p>
            <p
              className={`mt-6 text-flow-text ${typeBody} ${copyMeasure}`}
            >
              {t("crm")}
            </p>
            <p
              className={`mt-10 border-l-4 border-flow-yellow bg-white/60 py-4 pl-5 text-flow-text ${typeBodySemibold} ${copyMeasure}`}
            >
              {t("result")}
            </p>
          </div>

          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none">
              <Image
                src="/clinica.png"
                alt={t("bodyImageAlt")}
                width={720}
                height={1080}
                className="h-auto w-full rounded-2xl border border-flow-border shadow-[0_20px_50px_-12px_rgba(92,84,160,0.22)]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function ValueStripSection() {
  const t = await getTranslations("ValueStrip");
  const items = ["b1", "b2", "b3", "b4"] as const;

  return (
    <section
      className="border-b border-flow-purple/20 bg-gradient-to-br from-flow-purple via-[#524a8f] to-[#433c73] py-16 text-white sm:py-24"
      aria-labelledby="value-strip-heading"
    >
      <div className={contentMax}>
        <p className={`${typeEyebrowOnDark} text-flow-yellow`}>
          {t("eyebrow")}
        </p>
        <h2
          id="value-strip-heading"
          className={`mt-4 text-white ${typeH2} ${copyMeasure}`}
        >
          {t("title")}
        </h2>
        <p
          className={`mt-6 ${typeOnDark} ${copyMeasure}`}
        >
          {t("subtitle")}
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((key) => (
            <li key={key} className={`flex gap-4 ${typeOnDarkList}`}>
              <span
                className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-flow-yellow text-flow-text ${typeCheckBadge}`}
                aria-hidden
              >
                ✓
              </span>
              <span className={`min-w-0 text-white/95 ${copyMeasure}`}>
                {t(key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const tBody = await getTranslations("Body");
  const steps = [
    { n: "01", title: "s1Title", body: "s1Body" },
    { n: "02", title: "s2Title", body: "s2Body" },
    { n: "03", title: "s3Title", body: "s3Body" },
  ] as const;
  const capabilityKeys = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;
  const capabilityNums = ["01", "02", "03", "04"] as const;

  return (
    <section
      className={sectionAlt}
      aria-labelledby="how-heading capabilities-heading"
    >
      <div className={contentMax}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2
          id="how-heading"
          className={`mt-4 text-flow-text ${typeH2} ${copyMeasure}`}
        >
          {t("title")}
        </h2>
        <ol className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n}>
              <article
                className={`h-full ${highlightCardShell} p-6 transition-shadow hover:shadow-[0_16px_48px_-14px_rgba(92,84,160,0.28)] sm:p-8`}
              >
                <span
                  className={`${typeStepIndex} text-flow-purple`}
                  aria-hidden
                >
                  {step.n}
                </span>
                <h3
                  className={`mt-5 text-flow-purple ${typeCardTitle} ${copyMeasure}`}
                >
                  {t(step.title)}
                </h3>
                <p
                  className={`mt-3 text-flow-muted ${typeBody} ${copyMeasure}`}
                >
                  {t(step.body)}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div
          className="mt-14 border-t border-flow-border pt-12 sm:mt-16 sm:pt-16"
          aria-labelledby="capabilities-heading"
        >
          <p
            className={`text-flow-text ${typeIntroMedium} ${copyMeasure}`}
          >
            {tBody("introBullets")}
          </p>
          <h3
            id="capabilities-heading"
            className={`mt-8 text-flow-text sm:mt-10 ${typeH3} ${copyMeasure}`}
          >
            {tBody("capabilitiesTitle")}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
            {[0, 1].map((i) => (
              <article
                key={capabilityKeys[i]}
                className={`min-w-0 ${
                  i === 0
                    ? "lg:col-start-1 lg:row-start-1"
                    : "lg:col-start-3 lg:row-start-1"
                }`}
              >
                <p className={`${typeCapIndex} text-flow-purple/90`}>
                  {capabilityNums[i]}
                </p>
                <p
                  className={`mt-3 font-semibold text-flow-text ${typeBody} ${copyMeasure}`}
                >
                  {tBody(capabilityKeys[i])}
                </p>
              </article>
            ))}
            <figure className="flex justify-center py-2 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1 lg:items-center lg:justify-center lg:py-0">
              {/* Unoptimized: avoid WebP/AVIF + default q=75 on line art / flat illustration. */}
              <Image
                src="/ai.png"
                alt={tBody("capabilitiesImageAlt")}
                width={480}
                height={640}
                unoptimized
                className="h-auto w-full max-w-[200px] object-contain sm:max-w-[240px] lg:max-w-[min(100%,280px)]"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
              />
            </figure>
            {[2, 3].map((i) => (
              <article
                key={capabilityKeys[i]}
                className={`min-w-0 ${
                  i === 2
                    ? "lg:col-start-1 lg:row-start-2"
                    : "lg:col-start-3 lg:row-start-2"
                }`}
              >
                <p className={`${typeCapIndex} text-flow-purple/90`}>
                  {capabilityNums[i]}
                </p>
                <p
                  className={`mt-3 font-semibold text-flow-text ${typeBody} ${copyMeasure}`}
                >
                  {tBody(capabilityKeys[i])}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function ClosingDiagnosticSection() {
  const t = await getTranslations("Closing");
  const flowAgentUrl = getFlowAgentUrl();

  return (
    <section
      id="diagnostico"
      className="scroll-mt-28 bg-gradient-to-b from-white via-flow-bg to-[#eceaf5] py-16 sm:py-20 lg:py-24"
      aria-labelledby="closing-heading"
    >
      <div className={contentMax}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
          <div className="lg:col-span-5 lg:pt-1">
            <Eyebrow>Flow Productions</Eyebrow>
            <h2
              id="closing-heading"
              className={`mt-4 text-flow-text ${typeH2Closing} ${copyMeasure}`}
            >
              {t("title")}
            </h2>
            <p
              className={`mt-6 text-flow-text ${typeBody} ${copyMeasure}`}
            >
              {t("line1")}
            </p>
            <p
              className={`mt-4 text-flow-text ${typeBody} ${copyMeasure}`}
            >
              {t("line2")}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-flow-border/90 bg-white shadow-[0_24px_60px_-12px_rgba(92,84,160,0.2)]">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flow-purple/[0.09] blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-flow-yellow/30 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div
                  className="h-1 bg-gradient-to-r from-flow-yellow via-amber-300 to-flow-yellow"
                  aria-hidden
                />
                <div className="flex flex-col items-center p-6 text-center sm:p-8 lg:p-10">
                  <div className="grid w-full max-w-md gap-4 sm:max-w-none sm:grid-cols-2 sm:gap-5">
                    <div className="rounded-2xl border border-flow-border/80 bg-gradient-to-br from-white to-flow-bg/90 p-6 sm:p-7">
                      <p className={`${typeLabelCaps} text-flow-muted`}>
                        {t("statTimeLabel")}
                      </p>
                      <p className={`mt-3 text-flow-purple ${typeStat}`}>
                        {t("statTimeValue")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-flow-border/80 bg-gradient-to-br from-white to-flow-bg/90 p-6 sm:p-7">
                      <p className={`${typeLabelCaps} text-flow-muted`}>
                        {t("statQuestionsLabel")}
                      </p>
                      <p className={`mt-3 text-flow-purple ${typeStat}`}>
                        {t("statQuestionsValue")}
                      </p>
                    </div>
                  </div>
                  <ClinicDiagnosticWizard flowAgentUrl={flowAgentUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center lg:mt-16">
          <p
            className={`mx-auto text-flow-text ${typeBody} ${copyMeasure}`}
          >
            {t("websiteLead")}{" "}
            <a
              href={FLOW_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-flow-purple underline decoration-flow-yellow decoration-2 underline-offset-2 hover:text-flow-purple-hover"
            >
              {t("websiteLinkLabel")}
            </a>
            .
          </p>
          <p
            className={`mx-auto mt-5 text-flow-muted ${typeFinePrint} ${copyMeasure}`}
          >
            {t("flowReference")}
          </p>
        </div>
      </div>
    </section>
  );
}
