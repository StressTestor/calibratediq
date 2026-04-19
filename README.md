# calibratediq.org

a free online IQ test that generates Raven's Progressive Matrices-style puzzles, scores them against a real normal distribution, and gives you a shareable results page.

i built this because every "free IQ test" online is either a scam, requires an email to see your score, or uses trivia questions that have nothing to do with actual intelligence testing. this one uses the same methodology (progressive matrices) used in standardized testing. no signup, no paywall, no email harvesting.

## what it does

- 6 test types: matrix, spatial, numerical, logical, verbal, memory — 30 questions each
- deterministic generation via seeded PRNG — same seed = same test, so scores are verifiable
- IQ scoring on a real normal distribution (mean 100, SD 15, range 55-145)
- results page with bell curve visualization, percentile rank, and share buttons
- composite score: take 3+ tests and get a weighted IQ with a per-domain radar chart
- results stored locally in the browser — no account, no database, survives page reload
- result URLs are HMAC-signed server-side. tampering with the query string shows "invalid or has been modified" instead of a fake IQ
- dark mode, mobile responsive, cookie consent, Monetag ad slots

## stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Vercel
- no database, no backend — all scoring is client-side

## running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # vitest (PRNG, scoring, transforms, puzzle validation, signing, rate limit, results store)
pnpm build      # production build
```

## how scoring works

raw score (correct out of 30) maps to IQ via the inverse normal CDF:

| raw score | IQ | percentile | classification |
|-----------|-----|------------|----------------|
| 0 | 55 | <1 | Below 70 |
| 10 | ~85 | ~16 | Below Average |
| 15 | 100 | 50 | Average |
| 20 | ~115 | ~84 | Above Average |
| 25 | ~130 | ~98 | Highly Gifted |
| 30 | 145 | >99 | Profoundly Gifted |

## puzzle generation

each puzzle selects 1-3 transforms based on difficulty, applies them across a grid (2x2 for easy, 3x3 for medium/hard), removes one cell as the answer, and generates 5 distractors that each violate exactly one rule. transforms operate on orthogonal dimensions so composition order doesn't matter.

the test validation harness (in the test suite) checks all 30 puzzles across multiple seeds to verify every distractor differs from the answer in exactly one dimension.

## env vars

| var | scope | purpose |
|-----|-------|---------|
| `RESULT_SIGNING_SECRET` | server | HMAC-SHA256 key for signing result URLs. required in production. 32+ bytes, hex preferred |
| `NEXT_PUBLIC_MONETAG_SITE_ID` | client | enables Monetag ad script loading |
| `NEXT_PUBLIC_MONETAG_NATIVE_ZONE` | client | native ad zone ID |
| `NEXT_PUBLIC_MONETAG_BANNER_ZONE` | client | banner ad zone ID |
| `NEXT_PUBLIC_MONETAG_INTERSTITIAL_ZONE` | client | interstitial ad zone ID |

without `RESULT_SIGNING_SECRET`, `/api/sign` returns 500 and every result renders as invalid. without the Monetag vars, ad placements render as placeholder divs in dev mode.

## disclaimer

this is not a clinical diagnostic tool. not affiliated with Mensa International. for entertainment and educational purposes. the methodology (progressive matrices) is public domain (J.C. Raven, 1936).
