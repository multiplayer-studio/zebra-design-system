---
name: zeta-web-components
description: Build or refine a component in packages/zeta-web — the legacy Zeta Web library (Lit, zeta-* elements, @zebra-fed/zeta-web) — from a Zebra spec in specs/, the tokens/ export and the icon set, while keeping Zeta Web's own code standard (mixins, .styles.js, TSDoc tags, stories, test groups). Use whenever the work touches packages/zeta-web, a zeta-* element, refining a legacy Zeta component to match a spec, porting a spec to Zeta Web, or wiring the Zebra tokens into it.
---

# Zeta Web components from spec

`packages/zeta-web` is the legacy **Zeta Web** library (`@zebra-fed/zeta-web`):
Lit custom elements named `zeta-*`, its own Storybook, its own test runner,
its own lint rules. We refine it with the Zebra **specs**, **tokens** and
**icons**, but the code stays in **Zeta Web's style**, not ours. A component
built here must look like it was always part of Zeta Web.

Read [references/code-style.md](references/code-style.md) before writing a
component, and [references/tokens.md](references/tokens.md) before binding a
single colour.

## Where everything lives

| What | Where |
|---|---|
| **Spec** (the contract) | `specs/<component>/<component>.spec.json` + `.spec.md` — written by `zebra-figma-component-spec` |
| **Tokens (source)** | `tokens/` at the repo root — written by `zebra-figma-token-export` |
| **Tokens (Zeta format)** | `packages/zeta-web/src/generated/zebra-tokens/*.css` — `yarn tokens`, **never edit by hand** |
| **Legacy tokens** | `src/generated/tokens/*.css` — the old vocabulary every unmigrated component still uses; never edit |
| **Icons** | `<zeta-icon>` with the `@zebra-fed/zeta-icons` ligature font — see Icons below |
| **Components** | `src/components/<dir>/<name>.ts` + `<name>.styles.js` |
| **Mixins** | `src/mixins/` — shape, flavour, size, interaction, form field, navigation, popup |
| **Stories** | `src/stories/components/<Name>/`: one `<name>.stories.ts` per element, titled `Components/<Name>`, plus a `Docs.mdx` |
| **Tests** | `src/test/<dir>/<name>.test.ts`, grouped (see code-style.md) |
| **React wrappers** | `@lit/react` `createComponent`, exported from `src/react/index.ts` |
| **Public exports** | `src/index.ts` — the main class only |
| **Reference implementation** | `packages/web-components/src/components/<name>/` — the same spec built as `zds-*`; use it for behaviour and parity, never copy its style |

## Commands

```bash
cd packages/zeta-web
yarn tokens            # tokens/ -> src/generated/zebra-tokens (zeta profile)
yarn icons             # packages/icons -> src/generated/zebra-icons (glyphs Zeta's font lacks)
yarn lint              # eslint, unix formatter
yarn lint:lit-analyzer # template/type checks across components, stories, tests
yarn test              # web-test-runner over src/test/**/*.test.ts
yarn storybook         # cem analyze + storybook on http://localhost:6006
yarn create <name> [dir]   # scaffold from scripts/assets/*.template (fix its paths, see code-style.md)
```

Yarn is the Berry release in `.yarn/`; Node comes from nvm
(`export PATH="$HOME/.nvm/versions/node/v24.13.1/bin:$PATH"`).

## Workflow

1. **Read the spec, both files** — `api`, `anatomy`, `variants`, `tokens`,
   and especially `issues`. Implement what the issues say is intended, and
   leave a comment naming the issue wherever you depart from Figma.
2. **Find the legacy component first.** Most specs already have a `zeta-*`
   counterpart (`src/components/system-banner/` for System Banner). Refining
   is the default: keep the tag name and class name, keep public properties
   that still make sense, and record every removed or renamed property as a
   breaking change. Only scaffold a new element when none exists.
3. **Map the spec API onto Zeta's vocabulary** — spec `shape` →
   `ContourableThree` (`shape`), spec `size` → `Size`, spec flavours →
   `Flavored` where it fits, booleans and enums → reflected `@property`s.
   The mapping table is in code-style.md. **Every property of every part
   counts**: the top-level `api` and each `subcomponents[]` / `family[]`
   entry's `api` (Dropdown's `compact` lives on its Dropdown Menu part). When
   a wrapper element configures a child (a dropdown button and its menu),
   expose the child's spec properties on the wrapper and pass them through.
   Record each part's element in `references/api-map.json`, and map any
   property whose name differs or that has no property, with the reason.
4. **Bind tokens from the spec** by their CSS names from
   `src/generated/zebra-tokens/` — `interactive/primary/background/default`
   becomes `var(--interactive-primary-background-default)`. Never a legacy
   name for something the spec specifies. For the nine names both sets
   define, bind the `--zebra-` alias (`var(--zebra-border-info)`), because
   the bare name resolves to the legacy value (tokens.md).
5. **Write the component and its `.styles.js`**, TSDoc first (description
   from the spec summary, `@slot`, `@cssproperty`, `@part`, `@event`,
   `@figma`, `@storybook`).
6. **Stories and docs page**, in the component's folder under
   `src/stories/components/`, matching the existing folders (`Tab Bar/`).
   Write one stories file per element with no autodocs. The main file's
   first story is a playground: one instance, driven by fully filled
   `args`/`argTypes`, with `parameters.design.url` and `parameters.status`.
   Give each main arrangement its own named story. Never put every variant
   in one canvas. Then add a `Docs.mdx` that builds the page: title,
   description, canvas and argument table for the main element, a section
   per named story, then a section per sub-element (code-style.md).
7. **Tests** — the seven groups, at least Accessibility and Content, plus
   Styling for every token the spec binds, and one test per passed-through
   property showing it reaches the child (the coverage check below proves a
   property exists, not that it is wired).
8. **Export** the main class from `src/index.ts` (and a React wrapper if the
   component has events or is used from React).
9. **Verify**: from the repo root,
   `node .claude/skills/zeta-web-components/scripts/api-coverage.mjs <slug>`
   must print "Every spec property is covered" (`--all` re-checks every
   mapped component). Then `yarn lint`, `yarn lint:lit-analyzer`, `yarn test`, then
   Storybook. **Open it and look**, in light and `data-theme="dark"`, and
   compare against the `zds-*` story for the same spec — the two should match
   wherever the spec does. A static screenshot never shows hover, so also run
   `node scripts/hover-shot.mjs <story-id> <x,y>...` (Storybook on 6010).
   It hovers each point in light and dark and saves a screenshot per point.
   Check the fill covers the whole surface the spec names.

## Icons

`<zeta-icon>` draws a glyph by **ligature name** from `@zebra-fed/zeta-icons`.
Spec glyph names come from our icon font (`packages/icons/codepoints.json`)
and are kebab-case; Zeta's are **snake_case**: `check-circle` →
`check_circle`, `more-horizontal` → `more_horizontal`. Check the converted
name against `ZetaIconNameList` before using it — a name that is not in the
list renders its own text. Colour comes from `--icon-color`, size from
`--icon-size`; the family (round / sharp) follows `ContourableThree`.

When Zeta's font lacks a spec glyph (the Avatar presence glyphs), use the
Zebra font. `yarn icons` copies it into `src/generated/zebra-icons/`. Import
`zebra-icons.css` from the styles file and draw the character from
`zebraIconGlyphs[name]` (kebab-case) with `font-family: "ZdsIcons-Rounded"`.

## Theming

Zeta Web themes with **attributes**, not classes:

- `data-theme="light" | "dark"` — and the OS dark preference when no
  `data-theme` is set.
- `data-brand="companion" | "target" | "condensed"` — the Zebra brand
  extensions.
- `data-breakpoint="mobile" | "tablet" | "desktop-compact"`.

A spec that locks a component to one mode (System Banner is locked to Dark)
sets the attribute on the host in `connectedCallback`
(`this.setAttribute("data-theme", "dark")`), so everything in its shadow root
resolves that mode. Tokens are re-declared per scope, so this works at any
depth.

## Committing

Conventional Commits, Zeta's format: `feat(system-banner): …`,
`fix(button): …`; a removed or renamed public property is a
`BREAKING CHANGE:` footer. Lines stay under 120 characters.
