# family

Ryan family projects.

## Ryans Go to Ireland · 2026

`ireland/index.html` — the trip page for the August 2026 visit to
Nana's farm in Co. Galway: a live countdown to landing day, a daily
surprise card that unlocks each remaining sleep (Irish words and trip
facts), a live "meanwhile at the farm" clock and Galway weather
widget, an illustrated map of the week's destinations, the day-by-day
plan, the cousin roster, and a spotter's checklist that remembers
ticks on each device. Single self-contained file, no build step
(weather comes from the free Open-Meteo API at page load).

With GitHub Pages enabled it lives at
`https://paddythesaint.github.io/family/ireland/`.

## Treasure Tree Bank

`index.html` — the kids' savings page: one treasure tree per kid that
grows with their balance, an interest ("magic money") explainer, a
growth chart, and a passbook ledger. It is a single self-contained
file with no build step.

The numbers come from the "Kids Bank Statement" Google Sheet (one tab
per kid). To update the page, edit the `DATA` block near the top of
the `<script>` in `index.html` — add one row per new spreadsheet
entry, deposits positive, withdrawals negative. Balances, interest
totals, the tree, and the chart are all computed from those rows.

To host it with GitHub Pages: repo Settings → Pages → deploy from the
`main` branch root. (On a free GitHub plan, Pages requires the repo to
be public.)
