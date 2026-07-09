# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Personal repo for Ryan family projects. There is no application framework, package manager, build system, linter, or test suite — and no commands to run for any of those. Content is static files served directly (intended host: GitHub Pages, deploying from the `main` branch root).

## Treasure Tree Bank (the main project)

The README describes `index.html`: a kids' savings page showing one "treasure tree" per kid that grows with their balance, an interest ("magic money") explainer, a growth chart, and a passbook ledger.

Key conventions for that page:

- It is a **single self-contained HTML file with no build step**. Keep it that way — inline all CSS/JS; don't introduce bundlers, dependencies, or separate asset files.
- All figures come from the "Kids Bank Statement" Google Sheet (one tab per kid). The page is updated by editing the `DATA` block near the top of the `<script>` in `index.html`: one row per spreadsheet entry, **deposits positive, withdrawals negative**. Balances, interest totals, the tree, and the chart are all computed from those rows — never hand-edit derived numbers.

## Important: `index.html` is currently missing from the repo

As of the last commit, `index.html` was never actually committed. Instead the repo contains `htmlindex.html32.5 KB.url`, a Windows internet-shortcut file pointing to a claude.ai file download (an artifact of dragging a browser shortcut into GitHub's upload UI instead of the real file). That URL requires the owner's claude.ai session and is not fetchable from here.

If asked to work on the savings page, check whether a real `index.html` exists first. If it doesn't, tell the user the file was never uploaded and ask them to provide it (or offer to rebuild it from the README's description). The `.url` file can be deleted once the real file is in place.
