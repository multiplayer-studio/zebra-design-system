---
name: zebra-prototype
description: Build a shareable prototype as a Claude artifact using the Zebra Design System web components — one self-contained HTML page composed from zds-* elements and semantic tokens, published to a private claude.ai link anyone can open. Use when someone wants a prototype, concept, demo or clickable mock to share or review, rather than code in the application itself.
---

# Prototype with the Zebra Design System

You are making a throwaway-but-shareable prototype, not application code: a
single HTML page built from the installed `@zebra-design-system/web-components`
elements, published as a Claude artifact so the link can be shared for review.
No framework, no build step for the consumer — the system's tokens and
components do the design work.

## Before anything — the project's context

Look for `zebra-context/PROJECT.md` in the folder the request comes from.

- **It exists:** read it, and the files in `zebra-context/` this prototype
  touches (`ARCHITECTURE.md` for anything with navigation, `PATTERNS.md`
  always, `COMPONENTS.md` before choosing a component). Say in one line
  what the context holds, then build to it.
- **It doesn't:** run the `zebra-onboard-project` skill first. It walks the
  designer through a short setup and saves the context, whether they start
  from nothing, a Figma design or a codebase. Then come back here.

The context decides how this prototype is built. If its `level` is
`off-system`, follow `references/OFF-SYSTEM.md` in the
`zebra-onboard-project` skill instead of the component and token rules
below. Everything else here still applies.

## Then — load the contract into context

Do not make any design decision or write any code until you have **read, in
full**, all of these:

1. **`DESIGN.md`** — resolve it in this order and read the first that exists:
   1. `node_modules/@zebra-design-system/web-components/DESIGN.md`
   2. `node_modules/@zebra-design-system/react-baseui/DESIGN.md`
   3. the `docs/DESIGN.md` shipped with this skill's plugin — a pinned
      fallback; say that it may be older than the installed packages.
2. **`AGENTS.md`** beside `web-components` in node_modules — the usage
   contract and the component index; the element you are about to hand-build
   almost certainly exists.
3. **The UX patterns** — how screens are composed and behave. Read
   `README.md` in `node_modules/@zebra-design-system/patterns/dist/` (it
   installs with the library; fall back to the `patterns/` folder shipped
   with this skill's plugin), then `zebra.md` and the pattern files the
   README names for this task. A fresh
   prototype takes every pattern file as its baseline.

Prototyping needs the real packages: the page bundles its assets from
`node_modules/@zebra-design-system/{tokens,icons,web-components}`. If
`web-components` is not installed, stop and run the setup (or `/zebra-setup`)
before prototyping anything. Until the packages are on npmjs they install
straight from the repo's distribution branches, no registry needed:
`npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/web-components" "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/tokens"`
(icons arrives automatically as a git-tagged dep; pin with `#<pkg>-v<version>`).

## Bundle the system into the page's assets

The artifact is served on claude.ai, so the page cannot reach node_modules at
view time and the packages are not on a public CDN yet. Bundle the installed
versions into three files (a scratch folder is fine; they ship with the page):

```bash
# the components, with their bare `lit` imports resolved into one ESM file
npx esbuild node_modules/@zebra-design-system/web-components/dist/index.js \
  --bundle --format=esm --minify --outfile=<out>/zds.js
# every token layer flattened into one stylesheet (esbuild follows @import)
npx esbuild node_modules/@zebra-design-system/tokens/dist/css/index.css \
  --bundle --outfile=<out>/zds.css
```

Icons are a font: copy `node_modules/@zebra-design-system/icons/icons.css`
and `icons/fonts/*.woff2` beside the page, keeping the `fonts/` path that
`icons.css` references.

The page then needs exactly:

```html
<link rel="stylesheet" href="zds.css" />
<link rel="stylesheet" href="icons.css" />
<script type="module" src="zds.js"></script>
```

A project with its own theme (`level: themed`) adds one file. Generate it
from the context, then load it after `zds.css` and put its class on the
page root:

```bash
npx zebra-theme zebra-context/<project>.theme.json zebra-context/theme.css
```

```html
<html class="ext-<project> mode-light">
  …
  <link rel="stylesheet" href="zds.css" />
  <link rel="stylesheet" href="theme.css" />
```

Never write theme values into the page. A project that starts from a shipped
extension puts that extension's class on the root instead.

Publish the HTML with the Artifact tool, mapping `zds.css`, `zds.js`,
`icons.css`, `theme.css` when there is one, and each `fonts/*.woff2` as
supporting files. Republish to the
same artifact URL on every iteration so the shared link stays current.

## Designing the prototype

The rules are `zebra-build-ui`'s. DESIGN.md is the authority on how things
look, and the UX patterns on how screens are composed and behave:

- **Library first.** Compose from `zds-*` elements; custom markup only for
  layout and genuinely novel content. A hand-made button, chip, input or menu
  is a bug.
- **Semantic tokens for every value** — never hex, never raw px for things
  the scale covers, never `--palette-*`/`--primitives-*`.
- **Follow the project's context.** Its shape, density, surfaces and special
  treatments come from `PROJECT.md`, its shell and destinations from
  `ARCHITECTURE.md`, and its own ways of doing things from `PATTERNS.md`,
  which win over the pattern defaults. A special treatment, such as AI
  interactions, appears only if the context lists it.
- **Shape once at the page root,** the context's shape, inherited.
- **Theme with classes.** Build only the modes the context lists, starting in
  its default mode. With light and dark, wire `mode-dark` on the root to
  `prefers-color-scheme`, and give the page a visible toggle that overrides
  it — reviewers will check both. A single-mode project sets its mode once and
  has no toggle.
- **Build for the context's surfaces.** Each one is a size mode on the root
  (the patterns' `zebra.md` says which class). Check the prototype in each.
- **Fake the data, not the system.** Placeholder content is fine; off-system
  styling is not. Undesigned paths stay inert.
- **Light interactivity is welcome** — tab switches, dialogs opening, state
  toggles — as plain inline script against the elements' documented
  properties and events. A prototype that responds reads better in review.

## Verify, then hand over the link

Open the published page (not just the local file): light and dark, phone
width and desktop, focus order on anything interactive, no console errors —
a blank page usually means a bundle or font path didn't ship. Then give the
user the artifact link, with one line on what it shows, the components used,
and any component or token gaps you hit — those gaps are feedback for the
design system team.

## Keep the context current

Before you finish, update `zebra-context/`:

- a decision made while building goes in `PROJECT.md`'s Decisions, with the
  date and who made it;
- a new departure from a pattern goes in `PATTERNS.md`, with its reason;
- a component the project didn't have before goes in `COMPONENTS.md`, and a
  gap goes under Requests in `PROJECT.md`.

Tell the user what you added, and anything in the prototype that departs from
the context.
