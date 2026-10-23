# Smart Farming Fieldbook

A client-only seasonal fieldbook over three hard-coded crops (okra, Thai basil, morning glory). Pick a crop to read
its bed, growing window, water and soil notes, then step through a six-week visit plan; each crop has four sample
task notes, and a stage without one says so.

Live: https://farming.bookchaowalit.com (Vercel builds every push to `main`, see `PRODUCT.md`).

## What it does not do

- No weather feed, soil sensor, marketplace or regional agronomy data; the "field conditions" slip and the date are
  fixed sample copy. Not agronomic advice. No account or storage.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: crop data and visit-plan helpers, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/farming.ts`: the sample crops plus `WEEK_STAGES`, `findCrop`, `taskForWeek` and `nextWeek` (used by the page).
- `app/page.tsx`: the fieldbook page (client component).
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
