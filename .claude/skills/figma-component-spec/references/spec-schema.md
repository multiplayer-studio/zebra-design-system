# Spec format

Contents: 1. `<slug>.spec.json` · 2. Filled example (Avatar) · 3. `<slug>.spec.md` template · 4. `<slug>.tokens.json`

## 1. `<slug>.spec.json`

Top-level keys, in this order. Omit a key only if the page truly has nothing for it, and say so in `issues`.

| Key | Holds |
|---|---|
| `component` | `name`, `slug`, `source` (`fileKey`, `setId`, `key`, `page`, `extractedAt`) |
| `summary` | The metadata's "What this component does" text, verbatim |
| `api` | Props, keyed by neutral name: `type` (`enum` \| `boolean` \| `string` \| `slot`), `values` (ordered), `default`, `figmaName`, `controls` (part ids), `intent` (per-value rows from the Property Breakdown, verbatim) |
| `internalVariations` | Variation reachable only by swapping a nested instance: `part`, `via` (subcomponent), `options`, `intent` |
| `contentInputs` | Sample-content sets turned into inputs: `part`, `input` (`src`, `label`…), `sampleCount` |
| `anatomy` | Ordered parts: `id`, `role` (from the metadata's Anatomy text, verbatim), `kind` (`container` \| `shape` \| `text` \| `instance`), `ref` (subcomponent), `layout`, `sizing`, `position`, `paint` (fill/stroke/effects as token names), `text`, `visibleWhen` |
| `variants` | `axis` (the VARIANT prop), `base` (option), `table`: one row per option holding only what changes, as `part.property: <token name>`. A measured observation (a rendered width) is allowed but must be named as one |
| `subcomponents` | Per on-page subcomponent: `name`, `private`, `api`, `anatomy`, `variants` (same shape, recursively). Remote ones: `name`, `key`, `remote: true` |
| `tokens` | Token names used, grouped by role (`color`, `dimension`, `typography`, `effect`), plus `source` (the token export this spec resolves against) and `themeAxes` taken from its manifest (e.g. `palette: [Light, Dark]`). Names only — no values |
| `states` | States & Triggers rows, verbatim |
| `behavior` | Behavior & Motion Intent rows, verbatim |
| `content` | Content & Slot rows, verbatim |
| `usage` | How to use: `do[]`, `dont[]`, verbatim |
| `accessibility` | Accessibility & Content Guidelines, verbatim, one entry per line |
| `layoutTheming` | Layout & Theming Intents rows, verbatim |
| `visualReference` | Screenshot file per variant, or node ids |
| `issues` | `{ severity, source, detail }` from the step 7 cross-check |

## 2. Filled example (Avatar)

Values below come from a real extraction of The Zebra Design System's Avatar page. Arrays are trimmed with `…`.

```json
{
  "component": {
    "name": "Avatar", "slug": "avatar",
    "source": { "fileKey": "hvRmnZZOZrmTW0wf8hbrt5", "setId": "2699:17793", "page": "Avatar" }
  },
  "summary": "A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator. …",
  "api": {
    "size": {
      "type": "enum", "figmaName": "Size", "default": "xxxsmall", "controls": ["variant"],
      "values": ["xxxsmall", "xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"],
      "intent": { "xxxsmall": "24×24px, the smallest size, for dense inline contexts like compact tables or comment threads.", "…": "…" }
    },
    "showClose":  { "type": "boolean", "figmaName": "Show Close#2701:0", "default": true, "controls": ["close"], "intent": { "true": "Shows a dismiss badge pinned to the top-right corner. …", "false": "Hides the dismiss badge. …" } },
    "showStatus": { "type": "boolean", "figmaName": "Show Status#2701:8", "default": true, "controls": ["status"] },
    "showRing":   { "type": "boolean", "figmaName": "Show Ring#2701:16", "default": true, "controls": ["ring"] }
  },
  "internalVariations": [
    { "part": "content", "via": "_Avatar Type", "options": ["initials", "photo", "Icon"], "intent": "Initials, photo, or icon. Not an exposed property, swap the nested Avatar Type instance directly to change it." },
    { "part": "status", "via": "_Status Indicator", "options": ["Available", "Away", "Busy", "DND", "On Shift", "Offline"] }
  ],
  "contentInputs": [ { "part": "content", "input": "src", "sampleCount": 40, "from": "_Avatar Photos" } ],
  "anatomy": [
    { "id": "root", "kind": "container", "layout": { "direction": "vertical", "gap": "space/none" }, "sizing": "fixed" },
    { "id": "content", "kind": "instance", "ref": "_Avatar Type", "sizing": { "h": "fill", "v": "fixed" },
      "role": "Fills the frame, auto-positioned. Holds initials with a colored swatch, a photo, or an icon with a colored swatch. …" },
    { "id": "ring", "kind": "shape", "shape": "ellipse", "visibleWhen": "showRing",
      "position": { "mode": "absolute", "anchor": "fill" },
      "paint": { "stroke": { "color": "border/default", "width": "stroke/thick", "align": "inside" } } },
    { "id": "close", "kind": "instance", "ref": "_Status Indicator", "refVariant": "Status=Close", "visibleWhen": "showClose",
      "position": { "mode": "absolute", "anchor": "top-right" } },
    { "id": "status", "kind": "instance", "ref": "_Status Indicator", "refVariant": "Status=Available", "visibleWhen": "showStatus",
      "position": { "mode": "absolute", "anchor": "bottom-right" } }
  ],
  "variants": {
    "axis": "size", "base": "xxxsmall",
    "_note": "root.size and badge.size are measured rendered sizes, not tokens — Avatar's size axis is not token-bound.",
    "table": [
      { "size": "xxxsmall", "root.size": 24,  "badge.size": 8,  "ring.width": "stroke/thick" },
      { "size": "large",    "root.size": 64,  "badge.size": 18, "ring.width": "stroke/heavy" },
      { "size": "xxlarge",  "root.size": 120, "badge.size": 36, "ring.width": "6px", "root.clips": true },
      { "size": "xxxlarge", "root.size": 200, "badge.size": 56, "ring.width": "8px", "root.clips": true },
      "…"
    ]
  },
  "tokens": {
    "source": "tokens/ (see tokens/manifest.json)",
    "color": ["border/default"], "dimension": ["space/none", "stroke/thick", "stroke/heavy", "radius/none", "control/lg"],
    "themeAxes": { "palette": ["Light", "Dark"], "size": ["Desktop", "Mobile", "Tablet", "Desktop Compact"] }
  },
  "issues": [
    { "severity": "warn", "source": "gaps", "detail": "Ring stroke width is raw 6px at xxlarge and 8px at xxxlarge, no token." },
    { "severity": "warn", "source": "bindingDrift", "detail": "root width is bound to control/lg only in medium; other sizes are raw." },
    { "severity": "warn", "source": "descriptionDrift", "detail": "space/none description says '= 32px' but resolves to 0px; control/lg says 56px, resolves to 48px." },
    { "severity": "note", "source": "internalVariations", "detail": "Content type and status are swap-only in Figma. Decide in code whether they become props." }
  ]
}
```

## 3. `<slug>.spec.md` template

The same content, for reading. Keep this order. Use tables for the API and variants; use prose elsewhere.

```markdown
# <Component>

<summary, verbatim>

Source: <figma link to page> · extracted <date>

## API
| Prop | Type | Values | Default | Controls |
Then, for each prop, its per-value intent rows verbatim.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside `gaps`.

## Internal variations & content inputs
One short paragraph each: what varies, via which subcomponent, the options.

## Anatomy
Numbered parts matching the metadata's anatomy numbering: role (verbatim), layout, position/anchor, paint as token names, and visibility condition.

## Variants
| <axis> | root size | … | (only the columns that change)

## Subcomponents
One subsection each: API, anatomy, variants (same format, shorter). Remote dependencies are listed by name.

## Tokens & theming
Tokens used, grouped by role; theme axes, with the modes of each.

## States, behavior & motion
## Content & slots
## Usage (do / don't)
## Accessibility
## Layout & theming intents
All verbatim from the metadata.

## Issues
Blockers first, then warns, then notes.
```

## 4. `<slug>.tokens.json` — only without a project token export

**If the project has `tokens/` (from the figma-token-export skill), do not write this file.** The spec names tokens; `tokens/` defines them. Two copies drift.

Write it only when there is no export, as a local stand-in, and say so in `issues`. Save the `tokens` object from `export-tokens.js` as-is. It follows the DTCG draft shape (`$type`, `$value`, `{dotted.alias}` references), which Style Dictionary and Tokens Studio read directly. Figma-specific data (modes, resolved values per theme context, scopes, codeSyntax) lives under `$extensions["com.figma"]`, so tools that don't know about it simply ignore it. If `collisions` is non-empty, the colliding leaf was moved to `$root` under its group; mention this in `issues`.
