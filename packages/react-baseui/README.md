# @zebra-design-system/react-baseui

React components built on [Base UI](https://base-ui.com) primitives, themed with
the shared token layer and the Zebra icon font.

```bash
pnpm install
pnpm run storybook   # http://localhost:6008
pnpm run check       # tokens + typecheck
```

This is a **separate library from `packages/web-components`**, which stays as
Lit custom elements. They share three things and nothing else:

| Shared | Where it comes from |
|---|---|
| Token CSS variables | generated from `tokens/` by the same script |
| Icon font | `@zebra-design-system/icons` |
| The component specs | `specs/<component>/` |

## What Base UI provides, and what we add

Base UI ships unstyled, accessible primitives. `Button` here wraps
`@base-ui-components/react/button`, which gives us focus handling, the disabled
semantics (including `focusableWhenDisabled`), the `render` prop for
polymorphism, and a `[data-disabled]` attribute to style against.

Everything visual is ours: `button.css` keys off `data-flavour` / `data-size` /
`data-shape` and reads only semantic tokens. Nothing in the component knows
about themes.

```tsx
import { Button } from "@zebra-design-system/react-baseui";

<Button flavour="primary" size="medium" shape="rounded" leadingIcon="add">
  Save
</Button>

// Base UI's render prop — same behaviour and styling, different element
<Button render={<a href="/docs" />} trailingIcon="arrow-forward">Docs</Button>
```

## Theming

Identical to the other package, because it is the same CSS:

```tsx
<div className="ext-companion mode-dark">
  <Button>Inherits companion dark</Button>
</div>
```

`ext-*`, `mode-*` and `bp-*` work on any ancestor and cascade to everything
inside. See **Theming/How it works** in the web-components Storybook for the
full contract.

## Icons

Glyphs from the icon font, so they inherit the button's `color` and
`font-size` with no per-flavour wiring:

```tsx
import { Icon } from "@zebra-design-system/react-baseui";
<Icon name="alarm" label="Alarm" />       // labelled, exposed to AT
<Icon name="add" />                        // decorative, aria-hidden
```

Load `@zebra-design-system/icons/icons.css` once for the `@font-face` blocks.

## Notes

- Base UI is pinned to `1.0.0-rc.0`; the stable 1.0 is not out yet, so expect
  API movement before it lands.
- `src/tokens/` is generated and gitignored. `pnpm run tokens` regenerates it by
  calling the generator in `../web-components/scripts/`. That cross-package
  reach is deliberate for now — one implementation, not two — and the script
  should move to `tooling/` when the workspace is reassembled.
- Only Button is built, from the one component with a verified spec. Base UI has
  41 other primitives ready for the next ones.

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
