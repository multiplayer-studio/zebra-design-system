# @zebra-design-system/tokens

The Zebra Design System's design tokens — the base of the package graph.
Everything in `dist/` is derived at build time from the repo's `tokens/`
export (which the managers refresh from Figma); nothing is hand-edited here.

## What you get

| Import | Contents |
|---|---|
| `@zebra-design-system/tokens/manifest.json` | Collections, modes, defaults, extension graph |
| `@zebra-design-system/tokens/base/*` | DTCG JSON, one file per collection mode |
| `@zebra-design-system/tokens/extensions/*` | Brand/theme extensions — overrides only |
| `@zebra-design-system/tokens/css` | CSS custom properties, class-scoped themes (`.mode-dark`, `.ext-companion`, `.bp-mobile`) |
| `@zebra-design-system/tokens/css-attributes` | The same layers scoped by attributes (`[data-theme="dark"]`, `[data-brand]`, `[data-breakpoint]`) |
| `@zebra-design-system/tokens/fonts.json` | Families and weights the tokens need |
| `@zebra-design-system/tokens/fonts/*` | Fetched woff2 + `fonts.css` for self-hosting |

## Theming in one line

```css
@import "@zebra-design-system/tokens/css";
```

then put `class="mode-dark"` (or `ext-companion`, `bp-mobile`) on any
ancestor. Components that read only unprefixed semantic tokens follow it
with no JavaScript. Use `/css-attributes` instead if your stack themes with
`data-*` attributes (as Zeta Web does).

## Versioning

An added token is a minor release; a removed or renamed token is a major.
The `_docs` audit trail and raw Figma dumps stay in the repo — they are
working data, not part of this package.
