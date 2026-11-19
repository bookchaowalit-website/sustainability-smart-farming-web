# Smart Farming — Field / Book

Since 2026-11-19 the fieldbook uses the shared **Reader shell** (`app/reader-shell.css`,
`components/reader-shell.tsx`, rules in `READER.md`): Geist via next/font, the `--rs-*` light/dark tokens,
one top bar and a footer that links back to bookchaowalit.com.

- Home: page head, a count line and one row per crop (window, water, note, bed).
- Crop page (`/crops/[id]`): back link, bed tag, the crop's facts in the meta line, and the six-week visit plan
  as an ordered list with one task for every stage (Prepare → Close), then previous/next crop.
- No toggles to keep in sync: every stage is visible at once, so there is no pressed state to announce and no
  "tap" wording. The old synthetic weather slip and the fixed "08.25 / 2026" date are gone.
- Floor: text ≥ 12px, targets ≥ 44px, 4.5:1 text in light and dark, forced colors.

Crop notes are illustrative, not agronomic advice; no sensor or weather feed is connected.
