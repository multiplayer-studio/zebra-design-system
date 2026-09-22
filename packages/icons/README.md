# @zebra-design-system/icons

Icon fonts generated from Figma (`node-id=2046-6754`, the Assets › Icons page)
by the **figma-icon-font** skill.

| | |
|---|---|
| Icons on the page | 724 |
| Glyphs shipped | 715 per style, 1430 total |
| Styles | `rounded`, `sharp` — same codepoints, different family |
| Codepoints | U+E000 – U+E2D3 (Private Use Area) |
| Size | 66 KB + 59 KB woff2 |

## Use

```html
<link rel="stylesheet" href="@zebra-design-system/icons/icons.css">

<i class="zds-icon zds-icon-alarm"></i>                  <!-- by class -->
<i class="zds-icon">alarm</i>                             <!-- by ligature -->
<i class="zds-icon zds-icon--sharp zds-icon-alarm"></i>   <!-- sharp family -->
```

The font inherits `color` and `font-size`, so an icon inside a button picks up
that button's colour and scale with no extra rule.

```ts
import type { IconName } from "@zebra-design-system/icons/names";
```

## Regenerating

```bash
pnpm run generate:dry   # inventory only — always run this first
pnpm run generate
```

Needs `FIGMA_PERSONAL_ACCESS_TOKEN` (scope `file_content:read`) and
`FIGMA_FILE_KEY` in the repo-root `.env`.

**`codepoints.json` is checked in and must stay that way.** It is the record of
which glyph owns which codepoint. Regenerating reuses every existing assignment
and only appends; deleting the file would reshuffle every icon and silently
break any compiled CSS, cached font or published content referencing the old
numbers.

## Not shipped

Nine icons have no glyph, because a font cannot express what they are drawn
with. They need fixing in Figma, or an inline-SVG fallback:

| Icon | Why |
|---|---|
| `side-bar-toggle`, `incoming-video`, `missed-video`, `outgoing-video`, `to-do`, `to-do-outline` | drawn with strokes — needs outlining in Figma |
| `missed-call` | 25×24 viewBox, not square |
| `chat-sync`, `chat-sync-outline` | 24×25 viewBox, not square |

They still hold codepoints, so fixing them in Figma and re-running fills the
gap without moving anything else.

Three names collided across categories and were disambiguated once, then
frozen: `charts-table`, `general-to-do`, `general-credit-card`.

## Check before publishing

Open `preview.html`. A glyph whose counter (the hole in an `o`, the gap in a
`0`) is filled in solid is a fill-rule problem: the font is technically valid,
so nothing automated catches it. It is the one failure that needs eyes.
