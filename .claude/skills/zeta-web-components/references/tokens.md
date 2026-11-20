# Tokens in Zeta Web

Two token sets load side by side in `src/index.css`:

1. **Zebra tokens** — `src/generated/zebra-tokens/`, generated from `tokens/` by
   `pnpm run tokens` (the shared `packages/web-components/scripts/build-tokens-css.mjs`
   with `--profile=zeta`). This is what spec-built components bind.
2. **Legacy tokens** — `src/generated/tokens/`, the old `--main-*`, `--state-*`,
   `--spacing-*` vocabulary every unmigrated component still uses.

The Zebra tokens are imported **first**, so on the names both sets define the
legacy value wins and unmigrated components render exactly as before.

## Naming

A spec token name becomes a custom property by replacing `/` and spaces with `-`:

| Spec | CSS |
|---|---|
| `interactive/primary/background/default` | `--interactive-primary-background-default` |
| `feedback/warning/background/strong` | `--feedback-warning-background-strong` |
| `space/sm`, `radius/element-sm`, `control/md` | `--space-sm`, `--radius-element-sm`, `--control-md` |
| `label/large` (text style) | `--label-large-font-family`, `-font-size`, `-font-weight`, `-line-height`, `-letter-spacing` |

`--primitives-*` and `--palette-*` are internal layers; never bind them in a
component.

## Text styles

Each Figma text style is one shorthand, `font: var(--text-label-large)`, with letter spacing beside it from
`var(--label-large-letter-spacing)`. Prefer it to five separate `--label-large-font-*` lines; it follows the
breakpoint and brand scopes the same way.

## The nine shared names

Both sets define these, and the **legacy value wins** until the components
using them migrate:

`--border-default`, `--border-disabled`, `--border-info`, `--border-subtle`,
`--border-warning`, `--radius-none`, `--radius-xl`, `--surface-info`,
`--surface-warning`

A spec-built component never binds these nine directly: the legacy value would win. `pnpm run tokens` also emits
each as `--zebra-<name>` (`--zebra-border-info`), declared in every scope the original is, so bind
`var(--zebra-border-info)`. Unrefined legacy components keep the bare names until the legacy set is retired.
The list lives in the `--shadowed=` flag of the `tokens` script in package.json; add a name there if the
legacy set and the Zebra set ever share another. (Legacy `--radius-xl` is also self-referencing in
`semantics.css` and resolves to nothing; don't rely on it.)

## Scopes

`pnpm run tokens` writes these scopes into `themes.css`:

| Scope | Selector |
|---|---|
| Dark from the OS | `@media (prefers-color-scheme: dark) { :root }` |
| Explicit theme | `[data-theme="light"]`, `[data-theme="dark"]` |
| Brand extension | `[data-brand="<name>"]`, combined with each theme three ways |
| Breakpoint | `[data-breakpoint="mobile" \| "tablet" \| "desktop-compact"]` |

Every scope re-declares every token whose value changes in it, dependents
included, so a nested `data-theme="light"` inside a dark area fully restores
light. A brand under the OS dark preference without an explicit `data-theme`
shows the brand's light values; set `data-theme` explicitly with a brand.

## In Storybook

The toolbar has the same menus as `packages/web-components`: **Extension** (Base, Companion), **Mode**
(Light, Dark) and **Breakpoint** (Desktop, Desktop Compact, Tablet, Mobile). A decorator in
`.storybook/preview.tsx` sets `data-brand`, `data-theme` and `data-breakpoint` on the preview's `<html>`, so check a
component under each before calling it done. In a URL: `&globals=mode:dark;extension:companion`.

## Regenerating

```bash
cd packages/zeta-web && pnpm run tokens
```

After a fresh `zebra-figma-token-export`, run it and check `git diff
src/generated/zebra-tokens` — the diff should be only the values that changed
in Figma.
