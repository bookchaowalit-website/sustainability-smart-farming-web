# Smart Farming — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `smart-farming`, evidence Prototype:
> "copy is accurate") on 2026-10-23.

## What it is

A client-only fieldbook over three hard-coded crops. A synthetic knowledge demo, not a connected farm system.

## Who it is for

A small grower, or a portfolio visitor, who wants one crop's window and one next field action at a time.

## What works today

1. Choose one of three crops; the reading shows its bed, growing window, water and soil notes and a field note.
2. A six-week visit plan (Prepare to Close): select a week or "Mark the next visit" to read that week's task. Each
   crop has four sample task notes; the Harvest and Close weeks say there is no task note yet.
3. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No weather feed, soil sensor, marketplace, crop calendar per region or agronomic advice. "Warm / after rain" and
  "08.25 / 2026" are fixed copy.
- No account, storage or sync; nothing survives a reload. No API route. No product analytics.

## Live URL and deploy state

- Live: https://farming.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-smart-farming-frontend` is linked to this repository (`bookchaowalit-website/sustainability-smart-farming-web`, branch `main`), so every
  push to `main` deploys to production. Last production deploy: the Next 16.4.2 security patch (12a0720), by Git on
  2026-10-23.
- The L2 commits (lib/tests/Sentry/CI/docs) pushed on 2026-10-23 did not deploy: Vercel answered "Deployment rate
  limited — retry in 24 hours" (free-plan limit of 100 deployments per day). The live site shows the patch build
  until the next deploy of `main` after the quota resets.
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `sustainability-smart-farming-web`, org `personal-yu0`); it takes effect
  with that next deploy.

## Boundaries

- Browser-only. Crop timings, water notes and tasks are illustrative examples.
