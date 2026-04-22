"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  ariaLabel: string;
};

const HERO_YOUTUBE_IFRAME_ID = "hero-youtube-embed";

/** Default: Flow reel Shorts — https://youtube.com/shorts/PHBbd0egBp8 */
function heroYoutubeVideoId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_HERO_YOUTUBE_ID;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return "PHBbd0egBp8";
}

function embedOrigin(): string | undefined {
  const u = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof u !== "string" || !/^https?:\/\//.test(u)) return undefined;
  return u.replace(/\/$/, "");
}

function heroYoutubeEmbedSrc(): string {
  const id = heroYoutubeVideoId();
  const params = new URLSearchParams({
    autoplay: "1",
    /** Required for autoplay in most browsers; we try to unmute via IFrame API right after ready. */
    mute: "1",
    loop: "1",
    playlist: id,
    playsinline: "1",
    controls: "1",
    modestbranding: "1",
    rel: "0",
    enablejsapi: "1",
  });
  const origin = embedOrigin();
  if (origin) params.set("origin", origin);
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

type YTPlayerInstance = {
  unMute: () => void;
  setVolume: (v: number) => void;
  destroy?: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        id: string,
        opts: {
          events?: { onReady?: (e: { target: YTPlayerInstance }) => void };
        },
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function HeroBannerReel({ ariaLabel }: Props) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    let disposed = false;
    let restoreYtCallback: (() => void) | undefined;

    const initPlayer = () => {
      if (disposed || !window.YT?.Player) return;
      const el = document.getElementById(HERO_YOUTUBE_IFRAME_ID);
      if (!el || playerRef.current) return;

      try {
        const player = new window.YT.Player(HERO_YOUTUBE_IFRAME_ID, {
          events: {
            onReady: (e) => {
              if (disposed) return;
              e.target.unMute();
              e.target.setVolume(100);
            },
          },
        });
        playerRef.current = player;
      } catch {
        /* iframe API unavailable or double-init */
      }
    };

    const onGlobalReady = () => {
      initPlayer();
    };

    if (window.YT?.Player) {
      queueMicrotask(initPlayer);
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        onGlobalReady();
      };
      restoreYtCallback = () => {
        window.onYouTubeIframeAPIReady = previous;
      };

      if (!scriptInjected.current) {
        scriptInjected.current = true;
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      disposed = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
      restoreYtCallback?.();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-[1000px]:aspect-[1.9/1] min-[1000px]:min-h-0">
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
          style={{ aspectRatio: "9 / 18.6" }}
        >
          {/* Body: titanium shell → black bezel → display (concentric radii read like OEM glass) */}
          <div className="relative flex h-full w-full flex-col rounded-[2.65rem] bg-gradient-to-b from-[#45454a] via-[#252528] to-[#0c0c0e] p-[11px] shadow-[0_32px_70px_-18px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.35)] ring-1 ring-white/[0.12] sm:rounded-[2.85rem] sm:p-3 min-[1000px]:rounded-[2.95rem] min-[1000px]:p-3">
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_3px_0_18px_-6px_rgba(255,255,255,0.08),inset_-4px_0_20px_-8px_rgba(0,0,0,0.5)]"
              aria-hidden
            />
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[2.05rem] bg-[#050505] p-[7px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-black/80 sm:rounded-[2.15rem] sm:p-2 min-[1000px]:rounded-[2.2rem]">
              {/* Top bezel: earpiece / sensor strip (not over the iframe) */}
              <div
                className="pointer-events-none flex shrink-0 flex-col items-center gap-1 pb-1.5 pt-0.5"
                aria-hidden
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-zinc-700 ring-1 ring-zinc-900/80" />
                  <div className="h-1.5 w-14 rounded-full bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.85)] ring-1 ring-zinc-800/90 sm:w-16" />
                  <span className="h-1 w-1 rounded-full bg-zinc-700 ring-1 ring-zinc-900/80" />
                </div>
              </div>
              {/* Tight bottom inset: just enough so rounded corners don’t clip YouTube’s bar */}
              <div className="relative z-0 min-h-0 flex-1 px-0.5 pb-3 pt-0 sm:px-1 sm:pb-3.5">
                <iframe
                  id={HERO_YOUTUBE_IFRAME_ID}
                  title={ariaLabel}
                  src={heroYoutubeEmbedSrc()}
                  className="h-full w-full rounded-[0.55rem] border-0 shadow-inner sm:rounded-md"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
