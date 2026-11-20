# Using @zebra-design-system/tokens

- `import "@zebra-design-system/tokens/css"` gives every token as a CSS
  custom property with class-scoped themes (`.mode-dark`, `.ext-companion`,
  `.bp-*`). `/css-attributes` is the same layer scoped by
  `[data-theme]`/`[data-brand]`/`[data-breakpoint]` for Zeta-style stacks.
- Build UI against the unprefixed semantic names (`--surface-default`,
  `--foreground-primary`, `--interactive-primary-background-default`,
  `--space-md`, `--radius-element-md`). The prefixed `--palette-*` and
  `--primitives-*` layers are internal: reading them opts out of theming.
- Non-CSS stacks read the DTCG JSON: `manifest.json` for collections, modes
  and the extension graph; `base/*` per collection mode; `extensions/*`
  hold only what each brand overrides.
- A project's own theme is generated, never hand-written: `npx zebra-theme
  <name>.theme.json` builds `.ext-<name>` from a small file of overrides,
  the way the shipped extensions are built, so it holds in every mode and on
  any container. `npx zebra-theme --list` shows the tokens a theme can
  change, and `--init <name>` writes a starter file. A theme changes values,
  never names; load its CSS after the token CSS. Read the command's header in
  `bin/zebra-theme.mjs` for the file format.
- Versioning: a new token is a minor, a removed or renamed token is a major,
  a value change is a patch — themes are allowed to move.
