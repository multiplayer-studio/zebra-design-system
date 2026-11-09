---
name: zebra-build-ui
description: Design and build UI from a brief or description using the installed Zebra Design System packages — composing library components with semantic tokens so the result is themed, accessible and on-system. Use when someone asks for a screen, page, form, dashboard or component composition and a @zebra-design-system package is installed, with no Figma design to copy.
---

# Build UI with the Zebra Design System

You are in a consumer codebase with Zebra packages installed and no Figma
design to translate: you are making the design decisions, so make them the
way the system would.

## Before anything

1. Read `node_modules/@zebra-design-system/react-baseui/AGENTS.md` (or
   `web-components/AGENTS.md`) and the `DESIGN.md` beside it — principles,
   shape inheritance and theming live there, and they override anything here.
2. Confirm the setup imports exist once at the app entry:
   `@zebra-design-system/tokens/css` and `@zebra-design-system/icons/icons.css`.
3. Skim the component index at the bottom of AGENTS.md before designing —
   the control you are about to hand-build almost certainly exists.

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

End with what you composed from the library, anything you had to hand-build
(and why no component fit), and any token gaps — that list is what the design
system team needs to hear.
