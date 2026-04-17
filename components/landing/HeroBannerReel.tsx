"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function reelSrc(): string {
  const fromEnv = process.env.NEXT_PUBLIC_HERO_REEL_SRC;
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/Reel_Clinica.mp4";
}

type Props = {
  ariaLabel: string;
};

const VISIBILITY_SOUND_THRESHOLD = 0.45;

export function HeroBannerReel({ ariaLabel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ratioRef = useRef(0);
  /** Browsers block unmuted autoplay — start muted, then unmute only after playback has begun. */
  const [playbackStarted, setPlaybackStarted] = useState(false);
  const [allowSound, setAllowSound] = useState(false);

  const syncSound = useCallback(() => {
    const ok =
      document.visibilityState === "visible" &&
      ratioRef.current >= VISIBILITY_SOUND_THRESHOLD;
    setAllowSound(ok);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        ratioRef.current = entry?.intersectionRatio ?? 0;
        syncSound();
      },
      { threshold: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1] },
    );

    observer.observe(root);
    const onVisibility = () => syncSound();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [syncSound]);

  /** Muted autoplay is reliable; call play() when the element can play. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* ignored — browser may still block until gesture */
      });
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onPlaying = () => setPlaybackStarted(true);
    video.addEventListener("playing", onPlaying, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  /** After playback begins, unmute can pause some browsers — nudge play when muted/allowSound changes. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackStarted) return;
    void video.play().catch(() => {});
  }, [allowSound, playbackStarted]);

  const src = reelSrc();

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden min-[1000px]:aspect-[1.9/1] min-[1000px]:min-h-0"
    >
      {/* Desktop: wide banner art (headline baked into PNG, clear zone right) */}
      <div className="pointer-events-none absolute inset-0 hidden min-[1000px]:block">
        <Image
          src="/BannerClinicas.png"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-left"
          aria-hidden
        />
      </div>

      {/* Narrow viewports: gradient only (no PNG) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-flow-purple via-[#524a8f] to-[#433c73] min-[1000px]:hidden"
        aria-hidden
      />

      {/* Bottom fade — keep lower stops soft so PNG torn-paper edge stays visible; hand off to white section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] min-h-[7rem] bg-[linear-gradient(to_top,#fff_0%,rgba(255,255,255,0.98)_12%,rgba(255,255,255,0.75)_28%,rgba(255,255,255,0.28)_52%,rgba(255,255,255,0.06)_72%,transparent_100%)] sm:min-h-[8.5rem] lg:h-[26%] lg:min-h-[9rem]"
        aria-hidden
      />

      {/* Phone + reel: centered on small screens, bottom-right on large (height-capped so it never exceeds the strip) */}
      <div className="relative z-20 flex min-h-[min(72vw,420px)] items-center justify-center px-4 pb-14 pt-10 min-[1000px]:absolute min-[1000px]:inset-0 min-[1000px]:min-h-0 min-[1000px]:items-end min-[1000px]:justify-end min-[1000px]:p-0 min-[1000px]:pb-[5%] min-[1000px]:pr-[max(1rem,4vw)]">
        <div
          className="relative w-[min(72vw,260px)] max-w-[280px] shrink-0 min-[1000px]:h-[min(78%,680px)] min-[1000px]:w-auto min-[1000px]:max-w-[min(54vw,560px)] min-[1000px]:self-end"
          style={{ aspectRatio: "9 / 16" }}
        >
          {/* Modern handset: dark titanium-style frame, thin bezel, island + gesture bar on OLED */}
          <div className="relative flex h-full w-full flex-col rounded-[2.75rem] bg-[linear-gradient(155deg,#4a4a52_0%,#2e2e33_38%,#17171a_100%)] p-[10px] shadow-[0_36px_72px_-22px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/[0.1] sm:rounded-[2.95rem] sm:p-[11px] min-[1000px]:rounded-[3.1rem] min-[1000px]:p-[11px]">
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_2px_0_14px_-4px_rgba(255,255,255,0.07),inset_-3px_0_16px_-6px_rgba(0,0,0,0.45)]"
              aria-hidden
            />
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[2.2rem] bg-black ring-1 ring-white/[0.07] sm:rounded-[2.35rem] min-[1000px]:rounded-[2.45rem]">
              {/* Dynamic Island – floats over content like current iPhone */}
              <div
                className="pointer-events-none absolute left-1/2 top-[10px] z-20 h-[11px] w-[min(34%,8rem)] min-w-[5.25rem] -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.4)] sm:top-3 sm:h-3"
                aria-hidden
              />
              <video
                ref={videoRef}
                className="min-h-0 w-full flex-1 object-contain"
                src={src}
                autoPlay
                loop
                playsInline
                muted={!playbackStarted || !allowSound}
                preload="auto"
                aria-label={ariaLabel}
              />
              {/* Gesture / home indicator */}
              <div
                className="pointer-events-none absolute bottom-[9px] left-1/2 z-20 h-1 w-[min(30%,7.5rem)] max-w-[7.5rem] -translate-x-1/2 rounded-full bg-white/[0.38] sm:bottom-2.5"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
