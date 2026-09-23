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
| `<zds-icon>` | — | Renders a glyph from `@zebra-design-system/icons` (715 names, rounded + sharp) |

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
