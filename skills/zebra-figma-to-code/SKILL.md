---
name: zebra-figma-to-code
description: Build a Figma design (frame, flow or screen) in this codebase using the installed Zebra Design System packages — mapping Figma components, tokens and text styles to the real library, exactly as designed. Use whenever someone shares a Figma link and asks to build, implement or convert it, and a @zebra-design-system package is installed.
---

# Figma → code with the Zebra Design System

You are in a consumer codebase with Zebra packages installed. The design in
Figma was built from the same library, so almost every node maps to an
installed component and every value to a token. Your job is translation, not
invention.

## Before anything — load the contract into context first

Do not read the Figma design or write any code until you have **read, in
full**, all of these:

1. **`DESIGN.md`** — resolve it in this order and read the first that exists:
   1. `node_modules/@zebra-design-system/react-baseui/DESIGN.md`
   2. `node_modules/@zebra-design-system/web-components/DESIGN.md`
   3. the `docs/DESIGN.md` shipped with this skill's plugin — a pinned
      fallback; say that it may be older than the installed packages.
   If none exists, the Zebra packages are not installed: stop and run
   the setup (or `/zebra-setup`) before building anything. Until the
   packages are on npmjs they install straight from the repo's
   distribution branches, no registry needed:
   `npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/react-baseui"`
   (or `#dist/web-components`; pin with `#<pkg>-v<version>`). Internal
   deps resolve themselves via version tags.
2. **`AGENTS.md`** beside the same package — the usage contract and the
   component index for the installed version.
3. **The UX patterns** — how screens are composed and behave. Read
   `README.md` in `node_modules/@zebra-design-system/patterns/dist/` (it
   installs with the library; fall back to the `patterns/` folder shipped
   with this skill's plugin), then `zebra.md` and the pattern files the
   README names for this task. They
   cover what Figma does not draw: states, focus, back and close, motion.
   Where the design breaks a rule, build it as designed and report it.

DESIGN.md and AGENTS.md are the authority; this skill only adds the Figma
mapping and never overrides them. Then:

4. Confirm the setup imports exist once at the app entry:
   `@zebra-design-system/tokens/css` and `@zebra-design-system/icons/icons.css`.
5. Read the Figma selection via the Figma MCP tools before writing any code:
   every frame, text node, variant property and bound token. Never build from
   the thumbnail.
6. Follow `references/FIDELITY.md` in this skill's folder: write the
   inventory of each frame before any code, bring over its photos, logos
   and illustrations, raise the obvious deviations
   with the designer, and compare the result by measurement.

The design wins on what it draws: the variant of each component, spacing,
and the text style of each piece of text. The patterns and any project
context fill in only what it doesn't draw.

## Mapping rules

- **Library components only.** A Figma instance of a library component becomes
  the installed component with the same variants (flavour, size, shape,
  disabled) exactly as set in Figma. Local Figma parts ("Wizard Footer",
  "Option Row") are composed from library components and tokens — never
  re-drawn, never copied from elsewhere.
- **Semantic tokens only**, by CSS name: `interactive/primary/background/default`
  → `var(--interactive-primary-background-default)`. A binding to `palette/*`
  or `primitives/*` maps to the semantic token that resolves to it — look it
  up in `node_modules/@zebra-design-system/tokens/dist/base/semantics/base.json`.
  A value with no token is a gap: keep Figma's value, mark it with a comment,
  and report it.
- **Text styles exactly as Figma.** Read each text node's actual style and
  size/line-height/weight; use the matching `--text-<group>-<size>` token.
  Never snap to a nearby style; if none matches, keep Figma's values and say so.
- **Spacing exactly as Figma.** Read each container's padding, gap and
  sizing, and use the spacing token with that exact value. Never round to a
  nearby step; a value with no token is kept and reported.
- **Ask about obvious deviations.** Where the design and the system can't
  both be followed and a reviewer would see it, show the designer both with
  the question prompt and let them choose. Never substitute silently.
- **Shape is set once.** The page declares rounded or sharp at its root and
  children inherit (see DESIGN.md §Shape inheritance); set shape on a child
  only where the design genuinely departs.
- **Explicit modes count.** A frame set to Dark gets `mode-dark` on its
  wrapper (Zeta Web: `data-theme="dark"`); a brand frame gets `ext-companion`.
  Remember portals escape a scoped theme class — pass
  `portalContainer` or scope at `<body>`.
- **Pictures come from the design.** A photo, logo or illustration in the
  frame is fetched and used as `references/FIDELITY.md` step 3 says: photos
  as their original files, logos and illustrations as inline SVG. Never
  replace one with an icon or a placeholder.
- **Icons are glyph names.** Match the Figma icon to a name in
  `node_modules/@zebra-design-system/icons/codepoints.json`. Never import an
  icon from Figma. If the exact glyph isn't there, use the closest one by
  meaning and report the replacement.
- **Every divider drawn in Figma is drawn in code** — header bottoms, panel
  splits, list separators — via the Divider component or a scoped border.
- **Don't change library components** to make a design fit. Work around with
  page-scoped CSS (a unique class prefix), comment why, and report it as a
  component gap.
- **Don't invent screens.** Undesigned paths stay inert and get reported.
- **Animate appearances** even where Figma shows only end states: sheets
  slide from their edge, scrims fade, dialogs and menus ease in, everything
  reverses on close — and all of it is disabled under
  `prefers-reduced-motion`.

## Verify

Render the result in this app (dev server or Storybook) at the frame's width
and compare it with the Figma frame as `references/FIDELITY.md` step 5 says:
side by side, then by measuring sizes, padding, gaps and text styles in the
browser. Fix what differs and compare again. Then check light and dark.

## Report

End with: the deviations asked and what the designer chose, components used, any token or component gaps (with the workaround
taken), any text style that had no match, any undesigned path left inert, and any
pattern rule the design breaks, by number (`patterns 4.21`).
These findings are the design system's feedback channel — encourage the user
to pass them to the design system team.
