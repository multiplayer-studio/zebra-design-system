---
name: builder-ui
description: Design and build UI from a brief or description in this codebase, with no design to copy, following the Zebra Design System's rules and the repo's own coding style. Composes from what the repo builds with (the installed Zebra packages, the Zebra packages beside old-system ones, or the app's own component library) so the result is themed, accessible and consistent with the rest of the app. Use when a developer asks for a screen, page, form, dashboard or component composition in a repo and there is no Figma design or handoff.
---

# Build UI with the Zebra Design System

You are in a developer's repo with no design to translate: you are making
the design decisions, so make them the way the system would, and write the
code the way the repo does.

## Before anything — load the contract into context first

Do not make any design decision or write any code until you have **read, in
full**, all of these:

0. **Read `zebra-build/PROJECT.md` and `MAP.md`**, the repo's build record. No
   `zebra-build` folder: run `builder-start` first. The record says which
   case this repo is, how it writes code and how to run it. Follow its
   Conventions and its Rules for this repo throughout: new code looks like
   the code beside it.

   | Case in the record | What the steps below mean here |
   |---|---|
   | `zebra` | as written |
   | `zebra-plus-legacy` | as written, Zebra first; an old-system part only where `MAP.md` says so |
   | `own-library` | the Zebra packages are not installed and must not be. Read `DESIGN.md` and the component docs from this skill's plugin to learn the system's rules, skip step 4, and build with the repo's own parts through `MAP.md` |

1. **`DESIGN.md`** — resolve it in this order and read the first that exists:
   1. `node_modules/@zebra-design-system/react-baseui/DESIGN.md`
   2. `node_modules/@zebra-design-system/web-components/DESIGN.md`
   3. the `docs/DESIGN.md` shipped with this skill's plugin — a pinned
      fallback; say that it may be older than the installed packages.
   If none exists, the Zebra packages are not installed: stop and run
   the setup (or `/zebra-setup`) before designing anything. Until the
   packages are on npmjs they install straight from the repo's
   distribution branches, no registry needed:
   `npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/react-baseui"`
   (or `#dist/web-components`; pin with `#<pkg>-v<version>`). Internal
   deps resolve themselves via version tags.
2. **`AGENTS.md`** beside the same package — the usage contract; skim its
   component index before designing, because the control you are about to
   hand-build almost certainly exists.
3. **The UX patterns** — how screens are composed and behave. Read
   `README.md` in `node_modules/@zebra-design-system/patterns/dist/` (it
   installs with the library; fall back to the `patterns/` folder shipped
   with this skill's plugin), then `zebra.md` and the pattern files the
   README names for this task. For a new product, read every pattern
   file. Follow each rule unless it starts "By default".

Principles, shape inheritance and theming live in DESIGN.md and AGENTS.md,
behaviour and layout in the patterns, and they override anything here. Then:

4. Confirm the setup imports exist once at the app entry:
   `@zebra-design-system/tokens/css` and `@zebra-design-system/icons/icons.css`.

## Designing on-system

These are written for the Zebra packages. In an `own-library` repo each one
holds with the repo's own parts and variables in place of the library's, as
`MAP.md` gives them. Look at two existing screens first and match how they
are laid out. With no match for a control you need, build it locally in the
repo's style, add it to `MAP.md` under Built locally, and report it.

- **Library first.** Compose from installed components; write custom markup
  only for layout and for genuinely novel content. A custom control that
  shadows a library one (a hand-made button, chip, input, menu) is a bug.
- **Semantic tokens for every value** — colour, space, radius, type, shadow.
  `var(--surface-card)`, `var(--space-md)`, `var(--text-body-medium)`. Never
  hex, never px for things the scale covers, never `--palette-*`/`--primitives-*`.
- **One primary action per view.** Everything else steps down to outline,
  subtle or text flavours. Label buttons with the verb ("Save", not "OK").
- **Pick a shape at the page root** (rounded or sharp) and let it inherit;
  `full` is a deliberate one-element choice, never a page default.
- **Type comes from the scale.** Headings, body and labels use the
  `--text-<group>-<size>` tokens; letter-spacing and weight ride along.
- **Dark mode is free if you follow the rules** — test it by toggling
  `mode-dark` on the root (Zeta Web: `data-theme="dark"`). If something
  breaks in dark, a literal value sneaked in.
- **Icons by name** from the typed `IconName` union; decorative icons get no
  label, meaningful ones do.
- **Accessibility is not optional:** every interactive element keyboard
  reachable with a visible focus ring, every input labelled, text on AA
  contrast (the tokens guarantee it — breaking contrast means breaking the
  token rules), motion respecting `prefers-reduced-motion`.

## Verify

Render it the way the record says a screen is seen, in light and dark, at
phone width and desktop. Interact with it:
focus order, hover states, empty states. A screenshot of the happy path is
not verification. Then run the repo's lint and tests from the record.

## Report

End with the pattern rules that shaped the design, by number (`patterns 4.21`), what you composed from the library, anything you had to hand-build
(and why no component fit), and any token gaps — that list is what the design
system team needs to hear.
