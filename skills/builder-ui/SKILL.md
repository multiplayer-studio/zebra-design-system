---
name: builder-ui
description: Design and build UI from a brief or description using the installed Zebra Design System packages — composing library components with semantic tokens so the result is themed, accessible and on-system. Use when someone asks for a screen, page, form, dashboard or component composition and a @zebra-design-system package is installed, with no Figma design to copy.
---

# Build UI with the Zebra Design System

You are in a consumer codebase with Zebra packages installed and no Figma
design to translate: you are making the design decisions, so make them the
way the system would.

## Before anything — load the contract into context first

Do not make any design decision or write any code until you have **read, in
full**, all of these:

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

Render it, in light and dark, at phone width and desktop. Interact with it:
focus order, hover states, empty states. A screenshot of the happy path is
not verification.

## Report

End with the pattern rules that shaped the design, by number (`patterns 4.21`), what you composed from the library, anything you had to hand-build
(and why no component fit), and any token gaps — that list is what the design
system team needs to hear.
