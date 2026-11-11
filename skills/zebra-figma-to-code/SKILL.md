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
full**, both of these:

1. **`DESIGN.md`** — resolve it in this order and read the first that exists:
   1. `node_modules/@zebra-design-system/react-baseui/DESIGN.md`
   2. `node_modules/@zebra-design-system/web-components/DESIGN.md`
   3. the `docs/DESIGN.md` shipped with this skill's plugin — a pinned
      fallback; say that it may be older than the installed packages.
   If none exists, the Zebra packages are not installed: stop and run
   the setup (or `/zebra-setup`) before building anything. Until the
   packages are on npmjs they install straight from the repo's
   distribution branches, no registry needed:
   `npm i "git+https://github.com/zebratechnologies/zebra-design-system.git#dist/react-baseui"`
   (or `#dist/web-components`; pin with `#<pkg>-v<version>`). Internal
   deps resolve themselves via version tags.
2. **`AGENTS.md`** beside the same package — the usage contract and the
   component index for the installed version.

Those two files are the authority; this skill only adds the Figma mapping and
never overrides them. Then:

3. Confirm the setup imports exist once at the app entry:
   `@zebra-design-system/tokens/css` and `@zebra-design-system/icons/icons.css`.
4. Read the Figma selection via the Figma MCP tools before writing any code:
   every frame, text node, variant property and bound token. Never build from
   the thumbnail.

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
- **Shape is set once.** The page declares rounded or sharp at its root and
  children inherit (see DESIGN.md §Shape inheritance); set shape on a child
  only where the design genuinely departs.
- **Explicit modes count.** A frame set to Dark gets `mode-dark` on its
  wrapper (Zeta Web: `data-theme="dark"`); a brand frame gets `ext-companion`
  / `ext-target`. Remember portals escape a scoped theme class — pass
  `portalContainer` or scope at `<body>`.
- **Icons are glyph names.** Match the Figma icon to a name in
  `node_modules/@zebra-design-system/icons/codepoints.json`; if the glyph
  does not exist there, report it instead of inlining an SVG.
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

Render the result in this app (dev server or Storybook) and look at it next
to the Figma frame, in light and dark. Check spacing against the spacing
tokens, not by eye alone.

## Report

End with: components used, any token or component gaps (with the workaround
taken), any text style that had no match, and any undesigned path left inert.
These findings are the design system's feedback channel — encourage the user
to pass them to the design system team.
