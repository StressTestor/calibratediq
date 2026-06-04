# Architecture — CalibratedIQ

Free online IQ test suite. Six cognitive-domain tests, each scored on a real normal distribution (mean 100, SD 15), plus a weighted composite. No database, no accounts: scoring is client-side, results live in the browser, and shareable result links are HMAC-signed so scores cannot be forged by editing the URL.

Live: https://calibratediq.org

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.2.0 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS (CSS-first / `@theme`) | 4.x |
| Charts | Hand-rolled inline SVG (bell curve, radar) | — |
| Tests | Vitest | 4.x |
| Analytics | @vercel/analytics, @vercel/speed-insights | 2.x |
| Hosting | Vercel (auto-deploy on push to `main`) | — |
| Package manager | pnpm | — |

No database, no backend service, no auth provider.

## Directory structure

```
src/
  app/
    layout.tsx              # root chrome: header (BrandMark + nav), footer, Monetag scripts, metadata
    page.tsx                # homepage — bell-curve hero, domain grid, composite/learn CTAs
    globals.css             # Tailwind v4 @theme tokens + .cq-* component primitives
    opengraph-image.tsx     # static site-wide OG card (edge)
    sitemap.ts / robots.ts  # SEO
    tests/page.tsx          # test chooser grid
    test/[type]/page.tsx    # a single test (delegates to TestShell)
    results/[type]/page.tsx # single-test results (delegates to ResultsShell)
    composite/page.tsx      # weighted composite IQ + radar (client; verifies each test)
    about|privacy|terms/    # static content pages
    learn/                  # learn hub + 11 long-form articles (SEO)
    api/
      sign/route.ts         # POST: HMAC-sign a completed result (edge)
      verify/route.ts       # GET: verify a result signature (edge)
      og/route.tsx          # dynamic result OG card, gated on a valid signature (edge)
  components/
    brand-mark.tsx          # bell-curve-in-a-tile logo (header/footer)
    test-shell.tsx          # the interactive test runner (client): questions, timer, sign+redirect
    results-shell.tsx       # single-test results view (client): score hero, bell curve, share
    bell-curve.tsx          # normal-distribution SVG with a score marker
    radar-chart.tsx         # six-axis cognitive-profile SVG
    progress-bar.tsx / timer.tsx / answer-options.tsx / puzzle-renderer.tsx
    ad-placeholder.tsx      # Monetag slot; renders a labelled placeholder when env unset
    cookie-consent.tsx / clear-history-dialog.tsx
  lib/
    prng.ts                 # seeded PRNG (base36 seed encode/decode)
    scoring.ts              # raw-score → IQ via inverse normal CDF, percentile, classification
    transformations.ts      # matrix puzzle transforms
    puzzle-generator.ts     # deterministic puzzle generation
    signing.ts              # HMAC sign/verify (Web Crypto)
    rate-limit.ts           # in-memory rate limiter for the sign endpoint
    results-store.ts        # localStorage persistence (key: calibratediq:results)
    tests/                  # per-domain generators + registry + types
      domain-meta.ts        # single source of truth for domain name/icon/accent color
      composite.ts          # composite URL parse/build, weights, labels
    __tests__/              # vitest suites (prng, scoring, transforms, signing, rate-limit, store)
```

## Key patterns

- **No-backend scoring.** Tests are generated from a seed via a deterministic PRNG; the same seed reproduces the same test. Scoring runs client-side. Answers are encoded in the URL, not the score, so a result is recomputed from `seed + answers` rather than trusted from a `?iq=` param.
- **Signed results.** On completion, `TestShell` POSTs `{seed, answers, testType, completedAt}` to `/api/sign`, which returns an HMAC (`v1:<hex>`). The results page and the OG image both call `/api/verify` and **fail closed** — a missing/edited signature renders an "invalid link" state (results) or the generic branded card (OG). This stops fabricated score screenshots from propagating.
- **Composite.** Three or more verified single-test results combine into a weighted IQ; the radar shows per-domain scores. Composite URLs are not signed (no single signature covers the aggregate), so composite OG cards always render the generic fallback.
- **Local persistence.** Results are stored under `localStorage["calibratediq:results"]`. No server-side storage.
- **Design system.** Tailwind v4 is CSS-first: all colors/shadows are `@theme` tokens in `globals.css`, and shared surfaces use `.cq-card` / `.cq-card-link` / `.cq-tile` / `.cq-badge` / `.cq-grid` primitives. Per-domain accent colors live once in `lib/tests/domain-meta.ts` and mirror the `--color-domain-*` tokens, keeping the homepage tiles, tests grid, results, and radar in sync.

## "Schema" (no database)

| Store | Where | Shape |
|-------|-------|-------|
| Single-test result | URL params on `/results/[type]` | `s` seed, `a` answers, `t` elapsed, `ct` completedAt, `sig` HMAC |
| Result history | `localStorage["calibratediq:results"]` | array of `{testType, iq, percentile, rawScore, completedAt, seed, answers, signature}` |
| Composite share | URL params on `/composite` | `mx|sp|nm|lg|vb|mm` = `seed~answers~completedAt~signature` |

## Environment variables

| Var | Scope | Purpose |
|-----|-------|---------|
| `RESULT_SIGNING_SECRET` | server (runtime) | HMAC key for `/api/sign` and `/api/verify`. **Required at request time** — absent → endpoints return `server_misconfigured`. Not needed to build. |
| `NEXT_PUBLIC_MONETAG_SITE_ID` | public | enables Monetag ad loading |
| `NEXT_PUBLIC_MONETAG_BANNER_ZONE` | public | banner/sidebar ad zone |
| `NEXT_PUBLIC_MONETAG_INTERSTITIAL_ZONE` | public | interstitial ad zone |
| `NEXT_PUBLIC_MONETAG_NATIVE_ZONE` | public | native ad zone |
| `NEXT_PUBLIC_MONETAG_MULTITAG_ZONE` | public | multitag/anti-adblock zone |

Without the Monetag vars, ad slots render as labelled placeholders.

## Deployment & CI

- **Hosting:** Vercel, auto-deploys on push to `main`. PRs get preview deployments.
- **PR automation:** `.github/workflows/pr-steward.yml` runs a Codex review (reusable workflow in `StressTestor/StressTestor`) on pull-request events and can merge. Be aware: a merged PR auto-deploys to production.

## External services

| Service | Purpose | Auth |
|---------|---------|------|
| Vercel | hosting, analytics, speed insights | platform |
| Monetag | ads (popunder, in-page push, vignette, banner, native) | site ID + zone IDs via env |
| Google Search Console | SEO / sitemap | verified |

## Gotchas

- **Next.js 16 is not the Next you remember** (see `AGENTS.md`). Check `node_modules/next/dist/docs/` before reaching for training-data APIs.
- **Tailwind v4 is CSS-first.** Design tokens go in the `@theme {}` block in `globals.css`, *not* a `tailwind.config.js`. Tailwind v4 also silently drops unrecognized utility classes — a clean build does not prove a class produces styles; verify in the browser.
- **`next build` does not need `RESULT_SIGNING_SECRET`** (the sign/verify edge routes read it at request time), but production runtime does.
- **Browser Supabase client rule / OAuth:** N/A — this project has no auth or Supabase.

## Commands

```bash
pnpm install
pnpm dev        # local dev (set RESULT_SIGNING_SECRET to exercise sign/verify locally)
pnpm test       # vitest (78 tests: prng, scoring, transforms, puzzle, signing, rate-limit, store)
pnpm build      # production build
pnpm lint       # eslint
```

---
Last updated: 2026-06-04
