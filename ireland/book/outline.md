# Ryans Go to Ireland · Summer 2026 — the book

**Concept + page-by-page outline** · working draft v1

## Concept

A 32–40 page hardcover keepsake of the August 2026 week at Nana
Brigid's farm — **photos carry the memories, illustration carries the
storybook feel**. The design language is an homage to Fuchsia
MacAree's illustrations for *The Great Irish Weather Book* (Joanna
Donnelly, Gill Books): flat borderless shapes, warm cream paper, a
teal / coral / mustard / blush / sage palette, petal-ray suns and
blobby clouds, and chunky multi-coloured display caps (Baloo 2, with
Nunito for body text). Style homage only — no artwork is copied.

- **Format:** Blurb Standard Square, 8.5×8.5 in hardcover (ImageWrap)
- **Copies:** 7 — one each for Evelyn, Michael and Catherine, and one
  each for Cahertinna House (Nana), Martin & Leona, Francis & Kate,
  and Michael & Aisling
- **Voice:** warm, plain, a little playful; written to be read aloud.
  Third-person "the Ryans", present tense for day chapters.
- **Illustrated elements:** a hand-drawn-style map of the week, a day
  badge + weather chip on each chapter opener, and small recurring
  motifs (Galway hooker with red sails, shamrock, sheep, tractor,
  swallow). Illustration frames the photos; it never replaces them.

## Page-by-page

Pages are single sides (Blurb counts sides); designed in spreads.
Photo slots are labeled in the storyboard proof — the list under each
spread is the **shot list** to pull from Google Photos when curating.

| Pages | Spread | Photos needed |
|---|---|---|
| 1 | **Title page** — title lockup, hooker sail motif, "1–8 August 2026" | none (or 1 tiny inset) |
| 2–3 | **The map** — illustrated Co. Galway map of the whole week: farm at centre, routes to Dublin, Ballybrit, Birr, Wildlands, Shannon, Traught/Kinvara | none |
| 4–5 | **The crew** — portrait chips: Evelyn, Michael, Catherine; cousins Alice, Ruth, Tiernan, Eolann, Caimin, Senán, Alannah; the grown-ups; Nana Brigid | 12–15 small portraits |
| 6–7 | **Day 1 · Getting there** — Dulles, the night flight (EI 118), landing at 8:55, the drive west, arriving at the farm; Martin's birthday cake that evening | 4–6: airport/plane, sleepy arrivals, first farm moment, birthday cake |
| 8–9 | **The farm** — Cahertinna House life: Nana's kitchen, the yard, wellies, animals, everyday magic | 5–7 candids |
| 10–11 | **Day 2 · Galway Races** — Grandad's anniversary mass in the morning (small, gentle note), then dress-up and the family day at Ballybrit | 4–6: dressed up, parade ring, grandstand, kids' activities |
| 12–13 | **Day 3 · Birr Castle** — bank-holiday outing: gardens, science centre, the Great Telescope | 4–6: telescope hero shot, gardens, picnic/café |
| 14–15 | **Day 4 · Wildlands** — ziplines, mini land rovers, diggers, fairy walk | 4–6 action shots |
| 16–17 | **Day 5 · Mam's home + Traught beach** — Shannon arrivals hug, then picnic, shells and rockpools | 4–6: airport hug, beach wide shot, rockpool close-ups |
| 18–19 | **Day 6 · The in-between day** — Velorail if it happened, otherwise farm downtime; brothers' pints that evening | 3–5 |
| 20–21 | **Day 7 · Boats and a send-off** — Cruinniú na mBád hookers at Kinvara (if visited), packing, the BBQ + movie night at Nana's | 4–6: red sails, BBQ, cousins in pyjamas |
| 22–23 | **The annual cousins photo** — full-bleed hero spread, one line of caption | 1 (the big one) + optional past-years strip |
| 24–25 | **Little moments** — candid grid from the unstructured hours (the real point of the week) | 8–12 candids |
| 26–27 | **Things we spotted** — illustrated spotter's checklist (echoes the trip page): sheep, tractors, rainbows, swallows, hookers… with photo proof where it exists | 4–8 small |
| 28–29 | **In their own words** — one panel per kid: favourite memory quote + a framed slot for a drawing or scan | 3 portraits + optional drawing scans |
| 30–31 | **Home again** — the 6:15am start, Dublin, landing at Dulles; "Until next summer, Ireland." | 2–4: goodbye at the farm, plane window |
| 32 | **Colophon** — sailboat motif, "Made with love · August 2026" | none |

**Flex points** (if curation turns up more keepers, grow toward 40
pages): a second farm spread after 8–9, per-day overflow grids after
16–17 or 20–21, and a babies spread (Ruth + Caimin) after 24–25.
Blurb needs an even page count; minimum 20.

## Caption style

Short, specific, read-aloud-able. Date chips in Space Mono. Example:
> *Sunday 2 August · Ballybrit* — First race at two o'clock. Catherine
> backed the grey because "he looked friendliest." He came fourth.

Placeholder captions in the storyboard are drafts from the itinerary —
they get rewritten against the real photos, and a few blanks are left
for stories only ye know.

## Production plan

1. **Photos in** — shared album is blocked by this environment's
   network policy; either allow the Google Photos domains or drop
   picks into a Drive folder. (~25% of photos still to be added.)
2. **Curate** — pick ~60–80 keepers against the shot lists above.
3. **Place + caption** — photos into slots, captions rewritten.
4. **Digital proof** — full PDF for family review; iterate.
5. **Physical proof** — order **1 copy** from Blurb first. Check
   color, gutter, spine. Fix, then…
6. **The run of 7** — 3 to the US house, 4 shipped within
   Ireland/EU (Blurb prints in the EU — no transatlantic shipping).

## Print specs (Blurb PDF-to-Book, Standard Square)

- Trim 8.5×8.5 in; bleed 0.125 in → **pages render at 8.75×8.75 in**
- Safe zone: keep text/faces ≥0.5 in inside trim (0.625 in from page
  edge); nothing important in the gutter on crossing images
- Interior: single sequential PDF, page 1 is a right-hand page
- Cover: separate wraparound PDF (back–spine–front); spine width
  depends on final page count + paper — set in `build.mjs` from
  Blurb's calculator at order time
- Images: 300 DPI at placed size, sRGB; Blurb's uploader validates
  dimensions and flags low-res images on upload

## Privacy

This repo is public. **Never commit photos or rendered PDFs** —
`ireland/book/.gitignore` covers `photos/` and `out/`. Only
templates, tooling and this outline live in git.
