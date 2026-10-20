# @zebra-design-system/web-components

Web components for the Zebra Design System, and the CSS-variable token layer
they theme from.

```bash
pnpm install
pnpm run storybook     # http://localhost:6007
pnpm run check         # tokens + typecheck + theming assertions
```

## Theming

A class, at any level, cascading to everything inside it:

```html
<button class="ext-companion mode-dark">Label</button>
```

`ext-*` selects a brand extension, `mode-*` selects light/dark, `bp-*` selects
a size/typography mode. They compose, they nest, and they work on plain HTML as
well as on components — the tokens are just CSS custom properties. See
**Theming/How it works** in Storybook for the full contract.

## Layout

```
scripts/build-tokens-css.mjs   tokens/ -> src/tokens/*.css (generated, don't edit)
scripts/check-theming.mjs      resolves the CSS like a browser and asserts the contract
src/tokens/*.css               primitives -> palette -> semantics -> size/typography -> extensions
src/components/<name>/         one folder per component: <name>.ts + <name>.styles.ts
stories/                       Storybook
```

## Components

| Element | Spec | Status |
|---|---|---|
| `<zds-button>` | [specs/button](../../specs/button/button.spec.md) | Built from the full spec: 9 flavours × 3 sizes × 3 shapes × states |
| `<zds-icon-button>` | [specs/icon-button](../../specs/icon-button/icon-button.spec.md) | A square (control/sm, -md, -lg) around one glyph; Button's nine flavours, three shapes and states, from Button's own styles. `label` is the required accessible name |
| `<zds-snackbar>` | [specs/snackbar](../../specs/snackbar/snackbar.spec.md) | Experimental. contextual (8 flavours) and standard × rounded/sharp; Button and Icon Button for its controls; dark bars carry their own colour mode. Floats in the top layer, slides in 300ms and out 200ms |
| `<zds-icon>` | — | Renders a glyph from `@zebra-design-system/icons` (715 names, rounded + sharp) |
| `<zds-avatar>` | [specs/avatar](../../specs/avatar/avatar.spec.md) | Built from the full spec: 9 sizes, 3 content types, 7 swatch colours, 6 presence states + custom icon |
| `<zds-avatar-rail>` | [specs/avatar-rail](../../specs/avatar-rail/avatar-rail.spec.md) | Slotted `<zds-avatar>`s, `max` (2–4) shown, overlapping by a quarter diameter with a border/inverse cutout; 9 sizes × start/end stacking; "+N" counter generated from the avatars past `max`. Rings, dismiss and presence turned off (parent owned) |
| `<zds-card>` | [specs/card](../../specs/card/card.spec.md) | The "Card base" family member: header/body/footer slots, 2 shapes |
| `<zds-collapsible-card>` | [specs/card](../../specs/card/card.spec.md) | The "Collapsible Card" family member: 2 shapes × 2 flavours, expand/collapse is this package's own addition (spec issue — Figma doesn't wire the chevron to state) |
| `<zds-card-heading>` / `<zds-card-body>` / `<zds-card-image>` / `<zds-card-footer>` | [specs/card](../../specs/card/card.spec.md) | Slot-filling helpers matching the spec's `_Card Heading` / `_Card Body` / `_Card Image` / `_Card Footer` subcomponents |
| `<zds-divider>` | [specs/divider](../../specs/divider/divider.spec.md) | Built from the full spec: 2 orientations |
| `<zds-notification-indicator>` | [specs/notification-indicator](../../specs/notification-indicator/notification-indicator.spec.md) | Built from the spec: 3 sizes, count at large and medium only. Count colour is an open spec warn (metadata says interactive/destructive/foreground/default, Figma draws foreground/on-strong) |
| `<zds-menu-item>` | [specs/dropdown](../../specs/dropdown/dropdown.spec.md) | The "Menu Item" subcomponent: 4 types × rounded × disabled × selected. `type` sets a real ARIA role (`menuitem`/`menuitemradio`/`menuitemcheckbox`) even though Figma draws no distinct control for radio/checkbox (spec issue — glyph-only) |
| `<zds-dropdown-menu>` | [specs/dropdown](../../specs/dropdown/dropdown.spec.md) | The "Dropdown Menu" subcomponent: a floating panel, `rounded`, one default slot for rows — no built-in/more-items split (spec issue — a Figma-authoring artifact, not reproduced here) |
| `<zds-dropdown>` | [specs/dropdown](../../specs/dropdown/dropdown.spec.md) | The "Template/Dropdown" pattern: `open` / `position` / `align`, a named `trigger` slot, and a hand-rolled `getBoundingClientRect` + `position: fixed` anchoring (no floating-ui/popper in this package) — no collision detection, by design; see the class doc in `dropdown.ts` |
| `<zds-switch>` | [specs/switch](../../specs/switch/switch.spec.md) | Built from the full spec: on/off × enabled/focus/disabled, optional icon pair. Form-associated with `role="switch"` on the host. Focus ring drawn inside the footprint per the metadata (Figma draws it outside — spec warn); thumb stretch is an interpretation of an underspecified motion line (spec warn) |
| `<zds-slider>` | [specs/slider](../../specs/slider/slider.spec.md) | Built on native `<input type="range">` (one, or two in range mode): 2 shapes × default/hover/selected/disabled, optional `stepped` dots and range. Value/min/max/step follow the native input (spec blocker — Figma models none); dots derive from step and range is a true span (both built to the metadata's intent, not the structure); keyboard focus ring added (spec has no focus state) |
| `<zds-search>` | [specs/search](../../specs/search/search.spec.md) | Built on a native `<input type="search">`: 3 sizes × 3 shapes × 3 flavours. State follows the field (focus / selected / typing / filled from keyboard focus, pointer focus and value), with the clear control while typing. Leading and trailing icons are `leading-icon` / `trailing-icon`; trailing is unset by default, since it needs a function. Built to the spec's intent where Figma drifts: space/sm padding, radius/sm, 16 icons at small, ~36 control targets, transparent ghost. `Show Cancel` not built (wired to nothing in Figma) |
| `<zds-radio>` / `<zds-radio-group>` | [specs/radio-button](../../specs/radio-button/radio-button.spec.md) | Built from the spec: 2 sizes × checked × enabled/hover/focus/disabled, optional label (default slot). The group owns value, form name and keyboard (one tab stop, arrows move and select). Built to the spec's intent: disabled shows checked vs unchecked (spec blocker), one focus outline (spec warn), ring bound to control/xs / control/icon-sm with the dot derived from it |
| `<zds-checkbox>` | [specs/checkbox](../../specs/checkbox/checkbox.spec.md) | 2 sizes × checked / indeterminate / unchecked × enabled, hover, focus, disabled; optional label (default slot). The spec's single Checked axis is `checked` + `indeterminate` (never both shown; aria-checked="mixed"). Form-associated, `required` supported. Mark is a font glyph (check-mark / remove) in foreground/on-strong; disabled shows its value; one focus outline at offset 0. Medium mark is the box less its stroke (spec warn: no 12 icon token) |
| `<zds-status-label>` | [specs/badges](../../specs/badges/status-label.spec.md) | 5 statuses × leading (indicator / icon / none) × shape (rounded / sharp). Subtle fill and border per status (neutral: feedback/neutral/background/subtle), label body/small in foreground/primary throughout; glyph fixed per status |
| `<zds-badge-label>` | [specs/badges](../../specs/badges/label.spec.md) | Figma's "Label": 5 variants × shape. Strong fill with its border on the same token, indicator/medium text paired per variant. Built from the tokens (24 tall); the spec's stated 18 is an open warn |
| `<zds-priority-pill>` | [specs/badges](../../specs/badges/priority-pill.spec.md) | 4 levels × lozenge / badge × large / small × icon / number (`priority-number`). Knockout circle; glyph, rank and colour fixed per level. Badge keeps the name visually hidden for assistive technology |
| `<zds-icon-indicator>` | [specs/badges](../../specs/badges/icon-indicator.spec.md) | 3 sizes, Clock on foreground/secondary by default. Host can set `icon`, `fill`, `foreground` (owner decision beyond the spec); glyph defaults to foreground/inverse (spec warn: Figma's on-strong fails dark mode) |
| `<zds-input-field>` | [specs/input](../../specs/input/input.spec.md) | The field alone, one element for the spec's five type sets (text, number, password, date, time): 3 sizes × 3 shapes × 3 flavours, default medium/sharp. State follows the field (focus / selected / typing / filled from keyboard focus, pointer focus and value; invalid, read-only, disabled from properties); clear while typing replaces the trailing icon (text, number) or joins the type control with a divider (password, date, time). Icons and value share foreground/primary, foreground/disabled when disabled. Ghost borders are stroke/base outside focus and invalid, as designed (spec warn) |
| `<zds-input>` | [specs/input](../../specs/input/input.spec.md) | The assembly: label (required / optional marker, information icon), field, hint. Surfaces the field's properties itself and one `state` (default / invalid / disabled) across all three parts (spec decision); defaults medium/rounded. Form-associated |

Adding a component: spec it with the **zebra-figma-component-spec** skill, then
mirror the spec's anatomy and variant tables into `<name>.styles.ts`, using
only unprefixed semantic tokens.

## Notes

- Elements are prefixed `zds-`, so this package can be loaded alongside the
  older `zeta-` elements without clashing.
- `<zds-icon>` renders a font glyph as a character, not an SVG. `@font-face` is
  document-scoped and reaches shadow roots, but the `.zds-icon-*` class rules do
  not — so the component looks the character up from `codepoints.ts` and only
  sets the family. **Load `@zebra-design-system/icons/icons.css` once in the
  host page.**
- The glyph takes `currentColor`, so it follows the Button spec's documented
  intent (icon follows the label) rather than Figma's literal
  `foreground/primary` binding — see that spec's blocker issue.
- Button pins the icon family from its own `shape`: only `shape="sharp"` uses
  the sharp family.
- The ghost-scrim hover/pressed opacities (5% / 10%) are expressed with
  `color-mix`; they are the one part of Button that has no token behind it.

## Fonts

Two font families load automatically with the token CSS:

- **IBM Plex Sans** (weights 300/400/500/700) from Google Fonts — the family
  every typography token names. `src/tokens/fonts.css` is generated from the
  font-family and font-weight tokens, so it cannot drift from them.
- **The Zebra icon font**, from `@zebra-design-system/icons`.

`Zebra Sans` is also named by a token but is not on Google Fonts; add its
`@font-face` blocks to `fonts.css` to use it, otherwise tokens naming it fall
back down the stack.

For production, prefer self-hosting or `<link rel="preconnect">` in the document
head — the generated file uses `@import`, which is render-blocking.
