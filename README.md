# family

Ryan family projects.

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
