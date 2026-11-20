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

## Start — the project's context, then the path

Look for `zebra-context/PROJECT.md` in the folder the request comes from.

### The context exists

Read it, and the files in `zebra-context/` this prototype touches
(`ARCHITECTURE.md` for anything with navigation, `PATTERNS.md` always,
`COMPONENTS.md` before choosing a component). Say in one line what the
context holds, then build to it. Ask nothing.

### The folder has no context

Start with a dialog, not a paragraph. Use the question prompt (the
AskUserQuestion tool where there is one) and ask one question:

**"How do you want to start?"**

| Option | Its description |
|---|---|
| **Free exploration** | Describe an idea and build it straight from the Design System. Nothing to review first. |
| **Figma reference** | Build from a Figma design, matching its variants, spacing and typography. |
| **From a repo** | Start from an existing codebase: its theme, structure and screens. |

Skip the question only when the request already answers it: it carries a
Figma link, or names a repo, or the folder is a codebase. Then say in one
line which path you took.

Then get what the path needs, again with the question prompt wherever the
answer is a choice:

- **Free exploration.** One dialog: what the prototype runs on (more than
  one may apply), its modes, and the Design System's colours or its own
  brand. If the request didn't describe the idea, ask for it in one plain
  line.
- **Figma reference.** Ask for the link in one plain line if there isn't
  one. If the link holds more frames than one prototype needs, list them and
  ask which to build.
- **From a repo.** Ask for the path or link in one plain line if the folder
  isn't the codebase. Then ask: **Rework an existing screen** / **A new
  screen in this product**.

Now run the `zebra-onboard-project` skill with that path and those answers.
It reviews the source, saves the context and comes back here. It doesn't ask
again what you already asked.

Everything you say to the designer follows Talking with the designer in the
`zebra-onboard-project` skill: the system is "the Design System", the words
are plain and short, and a question's summary sits inside its dialog.

### What the context decides

The context decides how this prototype is built. If its `level` is
`off-system`, follow `references/OFF-SYSTEM.md` in the
`zebra-onboard-project` skill instead of the component and token rules
below. Everything else here still applies.

### A source is matched first

A prototype built from a Figma design or a codebase follows
`references/SOURCE-PARITY.md` in the `zebra-onboard-project` skill:

- the first build matches the source strictly: its spacing, fonts,
  components and words. A part the Design System can't match as it comes
  gets a small style change, or is built in the project, with custom parts
  kept under 20%;
- ask only when something can't be matched, or the limit would be passed;
- don't make up functionality or data. A screen that needs live data you
  can't reach is the one case to ask about;
- after the first build, list the parts that were adjusted and ask whether
  to switch them to the Design System's own versions. If the designer says
  no, carry on as it is.

### A Figma reference decides more

Whenever this prototype has a Figma design to follow, from the start dialog,
a link in the request or the context's `reference`, the design is the look
to match. Follow `references/FIDELITY.md` in the `zebra-figma-to-code`
skill, all six steps:

- the frame decides each component's variant, the spacing and the text style
  of each piece of text. The patterns and the context fill in only what the
  frame doesn't draw;
- write the inventory of each frame before any markup;
- bring the frame's pictures into an `assets/` folder beside the page and
  use them: photos of products, faces and places as their original image
  files, brand logos and illustrations as inline SVG that the build can
  change. Never put an icon, initials or a grey box where the design has a
  picture. Icons go the other way: never import one from Figma, use the
  closest glyph in the icon set;
- where the frame and the system differ, match the frame, and list it for
  the question after the first build. Ask before building only when the
  frame can't be matched;
- compare the result with the frame by measurement before handing over.

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
   README names for this task. A free
   exploration takes every pattern file as its baseline. With a Figma
   reference, the patterns cover only what the design doesn't draw: states,
   focus, motion and the widths it leaves out.

Prototyping needs the real packages: the page bundles its assets from
`node_modules/@zebra-design-system/{tokens,icons,web-components}`. If
`web-components` is not installed, stop and run the setup (or `/zebra-setup`)
before prototyping anything. Until the packages are on npmjs they install
straight from the repo's distribution branches, no registry needed:
`npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/web-components" "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/tokens"`
(icons arrives automatically as a git-tagged dep; pin with `#<pkg>-v<version>`).

## Bundle the system into the page's assets

Keep the page in `prototypes/<name>/index.html` in the folder the request
comes from, with its `assets/` beside it, and commit it with `zebra-context/`.
That is where `zebra-handoff` finds it when the prototype goes to developers.

The artifact is served on claude.ai, so the page cannot reach node_modules at
view time and the packages are not on a public CDN yet. Bundle the installed
versions into three files beside the page (they ship with it, and are rebuilt
from the installed packages each time, so they needn't be committed):

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
`icons.css`, `theme.css` when there is one, each `fonts/*.woff2` and each
image in `assets/` as supporting files. Inline SVG travels in the page. Republish to the
same artifact URL on every iteration so the shared link stays current.

## Designing the prototype

The rules are `zebra-build-ui`'s. DESIGN.md is the authority on how things
look, and the UX patterns on how screens are composed and behave:

- **Start each screen from its recipe.** Read `compositions/README.md` in
  the patterns folder, pick the recipe for the screen's job, and walk it as
  `zebra-ux-patterns` step 3 says: regions in order, the variations that are
  true, each organism with its slots, the recipe's spacing steps, then its
  checks. `zebra.md` says what each organism and spacing step is in Zebra.
  With a Figma reference the frame's layout wins; use the recipe for what
  the frame doesn't draw, and offer its other differences as suggestions.
- **Compose before you build.** Read part 1 of `references/VISUAL-REVIEW.md`
  in this skill's folder before laying out a screen: one spacing ladder, one
  focal point, grouping with space first, few edges, capped widths. Correct
  components in a cramped or unbalanced layout is a failed prototype.
- **Library first.** Compose from `zds-*` elements; custom markup only for
  layout and genuinely novel content. A hand-made button, chip, input or menu
  is a bug.
- **Semantic tokens for every value** — never hex, never raw px for things
  the scale covers, never `--palette-*`/`--primitives-*`.
- **A Figma reference comes first.** Never restyle what the frame draws to
  fit a default: not a component's size, not a gap, not a text style.
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
- **Fake the data, not the pictures.** With a Figma reference, every photo,
  logo and illustration comes from the design. Without one, use a plain
  placeholder surface with a label, and never a picture from elsewhere.
- **Fake the data, not the system.** Placeholder content is fine; off-system
  styling is not. Undesigned paths stay inert.
- **Light interactivity is welcome** — tab switches, dialogs opening, state
  toggles — as plain inline script against the elements' documented
  properties and events. A prototype that responds reads better in review.

## Review the look, then verify

Before anything is handed over, run part 2 of `references/VISUAL-REVIEW.md`
on every screen: capture it, look at it in five passes (focal point,
cramped, empty or stretched, edges, consistency), measure, fix, and capture
again until a pass finds nothing. Never skip it because the build rendered
without errors.

With a Figma reference, first compare the page with each frame at the
frame's width, as `FIDELITY.md` step 5 says, and fix what differs.

Open the published page (not just the local file): light and dark, phone
width and desktop, focus order on anything interactive, no console errors —
a blank page usually means a bundle or font path didn't ship. Then give the
user the artifact link, with one line on what it shows, the components used,
what the visual review changed, the deviations you asked about and what was
chosen,
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

When the designer says the prototype is ready for developers, use the
`zebra-handoff` skill. It writes a build spec of what changed since the last
handoff, into `prototypes/<name>/handoff/`.
