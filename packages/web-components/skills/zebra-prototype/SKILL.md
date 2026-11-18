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

## Before anything — load the contract into context first

Do not make any design decision or write any code until you have **read, in
full**, both of these:

1. **`DESIGN.md`** — resolve it in this order and read the first that exists:
   1. `node_modules/@zebra-design-system/web-components/DESIGN.md`
   2. `node_modules/@zebra-design-system/react-baseui/DESIGN.md`
   3. the `docs/DESIGN.md` shipped with this skill's plugin — a pinned
      fallback; say that it may be older than the installed packages.
2. **`AGENTS.md`** beside `web-components` in node_modules — the usage
   contract and the component index; the element you are about to hand-build
   almost certainly exists.

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

Publish the HTML with the Artifact tool, mapping `zds.css`, `zds.js`,
`icons.css` and each `fonts/*.woff2` as supporting files. Republish to the
same artifact URL on every iteration so the shared link stays current.

## Designing the prototype

The rules are `zebra-build-ui`'s, and DESIGN.md is still the authority:

- **Library first.** Compose from `zds-*` elements; custom markup only for
  layout and genuinely novel content. A hand-made button, chip, input or menu
  is a bug.
- **Semantic tokens for every value** — never hex, never raw px for things
  the scale covers, never `--palette-*`/`--primitives-*`.
- **Shape once at the page root** (rounded or sharp), inherited.
- **Theme with classes.** Wire `mode-dark` on the root to
  `prefers-color-scheme`, and give the page a visible light/dark toggle that
  overrides it — reviewers will check both.
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
