# Ireland 2026 — the printed book

Everything for the "Ryans Go to Ireland" hardcover keepsake
(7 copies: the three kids + the four houses). See `outline.md` for
the concept, page-by-page outline and production plan.

## Layout

- `src/book.html` + `src/book.css` — the 32-page interior. Pages are
  8.75×8.75in (8.5in trim + 0.125in bleed, Blurb Standard Square).
- `src/cover.html` — wraparound hardcover (ImageWrap) cover;
  geometry injected by the build script.
- `src/fonts/` — Fredoka / Nunito / Space Mono (OFL), embedded so
  the PDF is self-contained.
- `photos/` — curated photos (git-ignored: **this repo is public,
  never commit family photos or rendered books**).
- `out/` — rendered PDFs (git-ignored).

## Build

Requires Chromium (path via `--chromium` or `$CHROMIUM`; defaults to
the Claude remote environment's `/opt/pw-browsers/chromium`).

    node build.mjs            # proof: trim/safe guides + slot tags
    node build.mjs --final    # print-ready: guides stripped

Photo slots are `.slot` placeholders; placing a photo is dropping an
`<img src="../photos/...">` inside one — the CSS swaps the dashed
placeholder look for a full-crop image automatically.

Before ordering: get the exact spine width for the final page count
and paper from Blurb's cover calculator and update `SPINE_IN` in
`build.mjs`, then rebuild with `--final`.
