# zebra-design-system-tokens

Zebra Design tokens exported to multiple platforms, generated from Figma.

## Platform support

| Platform | Format | Status |
|---|---|---|
| Web (CSS) | CSS custom properties | ✅ Available (this package) |
| Web (JS) | JS/TS token objects | 🚧 Planned, not yet implemented |
| Android | Kotlin/XML resources | 🚧 Planned, not yet implemented |
| Flutter | Dart constants | 🚧 Planned, not yet implemented |

## Install

```bash
npm install zebra-design-system-tokens
```

## Quick start: default theme

For the common case — one resolved theme, light/dark handled automatically — import two files:

```ts
import 'zebra-design-system-tokens/css/colors';
import 'zebra-design-system-tokens/css/sizes';
```

or via `<link>` tags:

```html
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/colors.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/sizes.css">
```

Then use the variables in your CSS:

```css
.card {
  background: var(--surface-card);
  padding: var(--space-card);
}
```

- `colors.css` — semantic color variables (`--surface-page`, `--interactive-primary-background-default`, etc.), fully resolved to hex values. Dark values apply automatically via `@media (prefers-color-scheme: dark)`, or force it with a `.dark-mode` class anywhere up the tree.
- `sizes.css` — spacing/radius/control-size variables (`--space-md`, `--control-sm`, etc.), fully resolved to px values. Values are mobile-first, with tablet/desktop/desktop-compact breakpoints layered in via `@media (min-width: ...)`.

Every variable name is stable regardless of theme or viewport — you never need to branch your CSS/component code on breakpoint or color scheme.

### Using a different theme

`default` isn't the only resolved theme — any theme with its own primitives/palette/size override (e.g. `target`, `companion`) ships its own resolved pair, named `{theme}-colors.css` / `{theme}-sizes.css`. Swap the import:

```ts
import 'zebra-design-system-tokens/css/target-colors';
import 'zebra-design-system-tokens/css/target-sizes';
```

Same variable names (`--surface-page`, `--space-md`, etc.) either way — only the import path changes. Check `dist/css/` for which `{theme}-colors.css` / `{theme}-sizes.css` pairs actually exist; a theme only gets one if it overrides that layer.

## Mixing themes: building-block files

The default theme above bundles one primitives set + one palette. To mix a different primitives/palette pairing (e.g. a different brand's palette on top of the same primitive scale), import the layers separately instead:

```html
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/primitives/default.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/palette/default.css">
<link rel="stylesheet" href="node_modules/zebra-design-system-tokens/dist/css/semantics.css">
```

or the equivalent package imports (`zebra-design-system-tokens/css/primitives/default`, `.../css/palette/default`, `.../css/semantics`). Swap `default` for another theme name (e.g. `target`, `companion`) in `primitives/*` or `palette/*` independently — `semantics.css` is always the same single file. Use `size/*.css` the same way if you need to mix a size override too.

Rules:
- Load **exactly one** `primitives/*.css` and **exactly one** `palette/*.css` per page — these are `:root`-scoped, so loading two of the same layer silently collides (last one in source order wins).
- Reference tokens the same way either path — `var(--surface-page)`, `var(--space-md)` — your component code doesn't change based on which layer files you loaded.

