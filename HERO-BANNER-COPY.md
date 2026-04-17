# Replicate the hero banner (copy project)

Use this checklist to apply the **same hero behaviour** on another copy of this repo: wide **PNG banner** + **phone mockup with MP4**, responsive rules, and Git-safe video handling.

---

## 1. Files to bring over (from the reference project)

| Action | Path |
|--------|------|
| **Copy as-is** | `components/landing/HeroBannerReel.tsx` |
| **Merge** | `components/landing/LandingSections.tsx` — ensure `HeroSection` imports and renders `HeroBannerReel` (see §3). |
| **Merge** | `.gitignore` — add the reel ignore (see §4). |
| **Merge** | `.env.example` — add `NEXT_PUBLIC_HERO_REEL_SRC` (see §5). |
| **Optional merge** | `next.config.ts` — dev `Cache-Control: no-store` headers for `/BannerClinicas.png` and `/Reel_Clinica.mp4` so local edits refresh (see §6). |

---

## 2. Static assets in `public/`

| File | Role |
|------|------|
| `BannerClinicas.png` | Wide hero artwork (baked-in copy on the left; empty zone on the right). **Commit this** (keep under repo size limits). |
| `Reel_Clinica.mp4` | Video inside the phone mockup. **Do not commit** if it is over **100 MB** (GitHub hard limit). Keep it locally and/or host it elsewhere (§8). |

After copying, your tree should have at least:

- `public/BannerClinicas.png` (tracked)
- `public/Reel_Clinica.mp4` (local only if gitignored)

---

## 3. Wire the landing hero

In `components/landing/LandingSections.tsx`:

1. Import:

   ```ts
   import { HeroBannerReel } from "@/components/landing/HeroBannerReel";
   ```

2. In `HeroSection`, **first child** of the outer `<section>` (before the `contentMax` text block):

   ```tsx
   <HeroBannerReel ariaLabel={t("bannerAlt")} />
   ```

3. Keep the section shell used here:

   ```tsx
   <section
     className="border-b border-flow-border bg-white pt-0"
     aria-labelledby="hero-heading"
   >
   ```

---

## 4. `.gitignore` (large MP4)

Add:

```gitignore
# Hero reel — over GitHub 100 MB limit; keep locally or set NEXT_PUBLIC_HERO_REEL_SRC
public/Reel_Clinica.mp4
```

If the file was ever committed, remove it from Git **without** deleting your local file:

```bash
git rm --cached public/Reel_Clinica.mp4
```

---

## 5. Environment variables

In **`.env.example`**, add:

```env
# Optional absolute URL for hero reel video (required in production if Reel_Clinica.mp4 is not in the repo)
NEXT_PUBLIC_HERO_REEL_SRC=
```

- **Local dev:** leave empty; the hero uses `/Reel_Clinica.mp4` from `public/` when the file exists.
- **Production (Vercel, etc.):** set `NEXT_PUBLIC_HERO_REEL_SRC` to the full URL of the hosted MP4 (e.g. Vercel Blob public URL).

---

## 6. Optional: dev cache headers (`next.config.ts`)

So replacing `public/BannerClinicas.png` or `public/Reel_Clinica.mp4` during development does not stick in the browser cache, add under `headers()` when `NODE_ENV === "development"`:

```ts
{ source: "/Reel_Clinica.mp4", headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }] },
{ source: "/BannerClinicas.png", headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }] },
```

(Match the structure already used for other `public/` assets in this project.)

---

## 7. i18n label for the video

Under the `Hero` namespace in each locale file (`messages/en.json`, `messages/pt.json`, `messages/fr.json`, …), ensure:

```json
"bannerAlt": "…accessible description of the reel for screen readers…"
```

The `HeroBannerReel` passes this string as `aria-label` on the `<video>`.

---

## 8. Behaviour summary (what you are replicating)

- **Viewport width &lt; 1000px:** No PNG banner. Purple gradient background (`from-flow-purple via-[#524a8f] to-[#433c73]`). Phone **centered**.
- **Viewport width ≥ 1000px:** Full-bleed `BannerClinicas.png` with `object-cover`, **horizontal anchor `left`** so baked-in headline is not cropped off-screen. Phone **bottom/right** aligned (not centered).
- **Bottom:** White gradient fade into the section below.
- **Video:** Autoplay, loop, `playsInline`; sound only when a large enough portion of the hero is visible (and tab visible); otherwise muted.
- **Reel URL:** `NEXT_PUBLIC_HERO_REEL_SRC` overrides the default `/Reel_Clinica.mp4` path.

Breakpoint is implemented with Tailwind **`min-[1000px]:`** — keep those classes in sync if you fork the component.

---

## 9. Deploying the MP4 without Git

1. Create a **public** Vercel Blob store (or another CDN).
2. Upload `Reel_Clinica.mp4`.
3. Set **`NEXT_PUBLIC_HERO_REEL_SRC`** in the project’s environment variables to the blob URL.
4. Redeploy.

Do **not** push files **&gt; 100 MB** to GitHub; the push will be rejected (`GH001`).

---

## 10. Verify locally

```bash
npm run build
```

Open the landing page, resize across **&lt; 1000px** and **≥ 1000px**, and confirm: gradient + centered phone vs banner + right-aligned phone, and video plays.

---

## Quick file list (reference)

- `components/landing/HeroBannerReel.tsx` — all hero UI + audio logic  
- `components/landing/LandingSections.tsx` — `HeroSection` integration  
- `messages/*.json` — `Hero.bannerAlt`  
- `.gitignore` — `public/Reel_Clinica.mp4`  
- `.env.example` — `NEXT_PUBLIC_HERO_REEL_SRC`  
- `public/BannerClinicas.png` — committed  
- `public/Reel_Clinica.mp4` — local / CDN only  
