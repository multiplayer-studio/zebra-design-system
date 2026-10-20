---
name: zebra-figma-icon-font
description: Turn a Figma icon page into icon fonts — discovers every icon component set and its style variants, exports each as SVG, assigns stable Private-Use-Area codepoints, and builds woff2/woff/ttf plus the CSS, codepoint map and TypeScript name union. Use whenever the user wants icons as a font or glyphs, wants to import/refresh/regenerate the icon set from Figma, asks for an icon font, ligatures, codepoints or a glyph sheet, or shares a Figma icons page with any of those goals. Read-only against Figma.
---

# Figma Icon Font

Build an icon font from a Figma icon page: every icon component set becomes a
glyph, in each style variant the page offers, with a codepoint that never moves.

The whole pipeline is one script. The skill exists to tell you how to point it
at a page, what it will find, and which failure modes need a human eye.

## Principles

- **Codepoints are forever.** A glyph's codepoint is written to `codepoints.json`
  and reused on every later run. Adding, renaming or deleting an icon must never
  shift an existing one — a consumer's compiled CSS, cached font and any content
  already published all reference the old number. The script only ever appends.
- **Read-only against Figma.** Nothing is written back to the file.
- **One font family per style variant.** If the page offers `Style=rounded` and
  `Style=sharp`, that is two families with the *same* codepoints, so switching
  style is a font-family swap and never a content change.
- **Names are derived, then frozen.** A Figma name becomes a kebab-case glyph
  name once; the mapping lives in `codepoints.json` and is not recomputed.
- **Fonts cannot express strokes or colour.** A glyph is a filled outline. An
  icon drawn with strokes, or with more than one colour, will not survive —
  the script flags those rather than shipping them silently wrong.

## Before you start

- Needs `FIGMA_PERSONAL_ACCESS_TOKEN` and `FIGMA_FILE_KEY` in the repo-root
  `.env`. The token needs **`file_content:read`** — the ordinary file scope, not
  the `file_variables:read` one the token export needs. They are separate; a
  token can have one and not the other.
- From the URL `figma.com/design/<fileKey>/<name>?node-id=<a>-<b>`, take
  `fileKey` and `nodeId` = `<a>:<b>`. The node should be the page or frame that
  contains the icons.
- Font building needs `svgicons2svgfont`, `svg2ttf`, `ttf2woff2` and `svgpath`.
  The script names them in its own `package.json`; install once.

## Running it

```bash
node .claude/skills/zebra-figma-icon-font/scripts/build-icon-font.mjs \
  --node 2046:6754 \
  --out packages/icons \
  [--limit 20]          # a small subset, for a first pass
  [--styles rounded,sharp]
  [--dry-run]           # inventory only, no download or build
```

Always do a `--dry-run` first on a page you have not built before, and read the
inventory it prints before spending the download.

## What the script does

1. **Discover.** Walks the node via the REST `nodes` endpoint and collects every
   `COMPONENT_SET`, treating each as one icon and each child `COMPONENT` as a
   style variant (`Style=rounded` → style `rounded`). A bare `COMPONENT` with no
   set is treated as a single-style icon.
2. **Name.** Kebab-cases the set name. Two sets can share a name in different
   category frames — the script disambiguates with the category and records the
   result, so the choice is made once and then frozen.
3. **Assign codepoints.** Reads any existing `codepoints.json`, keeps every
   assignment, and appends new glyphs from the next free Private Use Area slot
   (U+E000 upward). Deleted icons keep their codepoint reserved with
   `"retired": true` so the number is never handed out again.
4. **Export.** Calls the REST `images` endpoint in batches of 80 ids, then
   downloads the SVGs concurrently. Both are network-bound, not context-bound —
   nothing passes through the conversation.
5. **Normalise.** Confirms a square viewBox, scales to a 1000-unit em, drops
   fills and any `width`/`height`, and rejects anything with a `stroke`, more
   than one colour, or an image fill.
6. **Build.** `svgicons2svgfont` → `svg2ttf` → woff/woff2, one family per style.
7. **Emit.** Fonts, `icons.css`, `codepoints.json`, `icon-names.ts`, and
   `inventory.json` with the per-icon provenance (Figma node id and category).

## After a run, check these

The script reports each of them; none is fatal on its own, and all of them are
things only a person can judge:

- **`rejected`** — icons that could not become glyphs (strokes, multi-colour,
  embedded images). They need outlining in Figma, or an SVG-based fallback.
- **`renamed`** — a Figma icon whose name changed since the last run. The glyph
  keeps its old codepoint and its old name; decide whether to add an alias.
- **`missing`** — an icon in `codepoints.json` that is no longer on the page.
  It is retired, not deleted. Confirm the removal was intended.
- **`collisions`** — names that needed disambiguating.
- Open `preview.html` and look at the glyphs. A path that fills where it should
  have a hole is the classic failure and no automated check catches it, because
  the font is technically valid — it is a fill-rule problem, and `evenodd`
  geometry from Figma is where it comes from.

## Consuming the output

```html
<link rel="stylesheet" href="@zebra-design-system/icons/icons.css">

<i class="zds-icon zds-icon-alarm"></i>             <!-- by class -->
<i class="zds-icon">alarm</i>                        <!-- by ligature -->
<i class="zds-icon zds-icon--sharp zds-icon-alarm"></i>  <!-- sharp family -->
```

The font inherits `color` and `font-size`, so an icon in a button picks up the
button's colour with no extra rule — which is the reason to use a font here
rather than inline SVG.

See `references/font-pipeline.md` for the codepoint contract, the CSS shape and
the known conversion pitfalls.
