# family

The Ryan family website — a collection of small, self-contained HTML
pages with no build step, published with GitHub Pages at
`https://paddythesaint.github.io/family/`.

Because this repository is public, every family page is committed in
**locked form**: each HTML file is a small unlock screen plus an
AES-encrypted vault, and the real page only decrypts in the browser
once the shared family password is typed. The password is remembered
per device (one unlock opens every page), capitals and spaces don't
matter, and the password itself is never written anywhere in this
repo.

## Pages

- **`index.html`** — the family hub. Cards linking to every section.
- **Treasure Tree Bank** — the kids' savings page lives as a Claude
  artifact (linked from the nav and hub card). If you ever want it
  self-hosted alongside the other pages, save that page's HTML here
  as `bank.html`, lock it, and point the nav links back to it.
- **`birds.html`** — the family bird life list. Each sighting is one
  line in the `SIGHTINGS` block (spotter optional — credit chips and
  the leaderboard appear only when filled in). A built-in
  `FIELD_GUIDE` adds how common each bird is locally, when it's here,
  and what it's doing in the current month, plus a "keep an eye out"
  watch list that automatically drops birds once they're sighted.
  Ships with clearly-marked sample sightings — replace them and set
  `SAMPLE_DATA = false`.
- **`sports.html`** — who's playing what. Per-kid season cards from
  the `KIDS` block, swim meets in the `SWIM_MEETS` block (charts,
  personal bests, and podium counts are computed automatically), and
  a games/camps log in the `LOG` block.
- **`ireland/index.html`** — Ryans Go to Ireland · 2026, the trip
  page for the August visit to Nana's farm in Co. Galway: countdown
  to landing day, a daily surprise card per remaining sleep, a live
  "meanwhile at the farm" clock and Galway weather widget, the week's
  adventure map, day-by-day plan, cousin roster, and a spotter's
  checklist that remembers ticks per device.

## Editing a locked page

Pages are edited by unlocking to a scratch file, editing, and
re-locking (requires Node, no dependencies):

    node tools/cryptpage.mjs unlock sports.html page.html <password>
    ... edit page.html — data blocks are near the top of its <script> ...
    node tools/cryptpage.mjs lock page.html sports.html <password> The Ryan Family

The trailing words are the title shown on that page's unlock screen
(the Ireland page uses "Ryans Go to Ireland"). Running `lock` with a
new password is how the password gets changed — do it for every page
so one unlock still opens the whole site. Never commit an unlocked
page, and never write the password anywhere in this repo.

## Conventions

Every page is one file: shared nav at the top, tokens for light/dark
themes, data blocks at the top of the script, content rendered with
vanilla JS. To add a new section, copy the structure of `birds.html`,
pick an accent color, add a card to `index.html`, and lock it before
committing.
