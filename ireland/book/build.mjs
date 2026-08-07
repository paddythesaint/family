#!/usr/bin/env node
// Render the book to print-ready PDFs with headless Chromium.
//
//   node build.mjs [--final] [--chromium /path/to/chromium]
//
// Outputs to out/: interior.pdf (8.75×8.75in pages, bleed included)
// and cover.pdf (wraparound hardcover). --final strips the proof
// guides (trim/safe overlays and page tags); default is proof mode.
//
// Cover geometry: panel = 8.5in trim + WRAP wrap allowance on the
// three outer edges; spine from SPINE_IN. Confirm both against
// Blurb's cover size calculator for the final page count and paper
// before ordering, and update the constants below.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'out');
const tmp = join(out, '.tmp');
mkdirSync(tmp, { recursive: true });

const args = process.argv.slice(2);
const FINAL = args.includes('--final');
const chromiumArg = args.indexOf('--chromium');
const CHROMIUM = chromiumArg !== -1 ? args[chromiumArg + 1]
  : process.env.CHROMIUM || '/opt/pw-browsers/chromium';

// ---- cover geometry (inches) — verify with Blurb before ordering ----
const TRIM = 8.5;
const WRAP = 0.375;   // ImageWrap wrap allowance per outer edge
const SPINE_IN = 0.375; // 32–40pp hardcover ballpark; get exact from Blurb
const coverW = 2 * (TRIM + WRAP) + SPINE_IN;
const coverH = TRIM + 2 * WRAP;

function render(srcName, pdfName, mutate) {
  let html = readFileSync(join(here, 'src', srcName), 'utf8');
  if (FINAL) html = html.replace('<body class="guides">', '<body>');
  if (mutate) html = mutate(html);
  // keep relative asset paths working
  const tmpHtml = join(here, 'src', `.build-${srcName}`);
  writeFileSync(tmpHtml, html);
  const pdf = join(out, pdfName);
  execFileSync(CHROMIUM, [
    '--headless=new', '--no-sandbox', '--disable-gpu',
    `--print-to-pdf=${pdf}`, '--no-pdf-header-footer',
    '--virtual-time-budget=10000',
    `file://${tmpHtml}`,
  ], { stdio: 'pipe' });
  rmSync(tmpHtml);
  console.log(`wrote ${pdf}`);
}

render('book.html', FINAL ? 'interior.pdf' : 'interior-proof.pdf');
render('cover.html', FINAL ? 'cover.pdf' : 'cover-proof.pdf', html =>
  html.replace(':root{ --coverW:18.25in; --coverH:9.25in; --spine:0.375in; --wrap:0.375in; }',
    `:root{ --coverW:${coverW}in; --coverH:${coverH}in; --spine:${SPINE_IN}in; --wrap:${WRAP}in; }`));

console.log(FINAL
  ? 'FINAL mode: guides stripped. Verify spine width against Blurb before upload.'
  : 'Proof mode: red dashed = trim, blue dotted = safe zone, tags = page ids.');
