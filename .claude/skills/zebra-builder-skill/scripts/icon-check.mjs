#!/usr/bin/env node
// Checks glyph names against packages/icons/codepoints.json before the story
// is written, so a wrong icon name never survives to the browser check.
//
//   node .claude/skills/zebra-builder-skill/scripts/icon-check.mjs chevron-right sync not-a-glyph
//
// Prints ok per valid name (flagging retired glyphs) and, per miss, the
// closest real names by bigram similarity. Exits 1 on any miss. Run from the
// repo root. Figma names ("Chevron Right") are matched too and translated.
import { readFileSync } from "node:fs";

const names = process.argv.slice(2);
if (!names.length) { console.error("usage: icon-check.mjs <glyph> [<glyph> ...]"); process.exit(1); }

const glyphs = JSON.parse(readFileSync("packages/icons/codepoints.json", "utf8")).glyphs;
const byFigma = Object.fromEntries(Object.entries(glyphs).map(([k, g]) => [g.figmaName.toLowerCase(), k]));

const grams = (s) => { const g = new Set(); for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2)); return g; };
const close = (q) => {
  const qg = grams(q.toLowerCase());
  return Object.keys(glyphs)
    .map((n) => { const lg = grams(n); let hit = 0; for (const g of qg) if (lg.has(g)) hit++; return [(2 * hit) / (qg.size + lg.size), n]; })
    .filter(([s]) => s > 0.4).sort((a, b) => b[0] - a[0]).slice(0, 3).map(([, n]) => n);
};

let bad = 0;
for (const raw of names) {
  const name = glyphs[raw] ? raw : byFigma[raw.toLowerCase()];
  if (name) {
    const g = glyphs[name];
    console.log(`${raw}${name !== raw ? ` → ${name}` : ""}  ok${g.retired ? "  (RETIRED — pick a live glyph)" : ""}`);
    if (g.retired) bad++;
  } else {
    const s = close(raw);
    console.log(`${raw}  MISSING${s.length ? `  (close: ${s.join(", ")})` : ""}`);
    bad++;
  }
}
process.exit(bad ? 1 : 0);
