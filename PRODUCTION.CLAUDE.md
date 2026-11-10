# CLAUDE.md

## Design system (always applies)

All UI work uses the Zebra Design System defined in this folder. Don't use any other source for how things look.

- `DESIGN.md` is the foundation. Its frontmatter holds every raw value (colours, spacing, radius, typography, motion, layout and dimensions) for light, dark and high contrast. Its body holds the rules, starting with §2 Token Architecture.
- `atoms/`, `molecules/` and `organisms/` hold one file per component, each with a `tokens:` block, anatomy, variants, states, sizes, properties and usage. Read a component's file, and the files it `composes`, before building it.
- `icons.json` lists the only valid icon names. Each key is the ligature name used in the markup. It is generated from the `@zebra-fed/zeta-icons` package.
- `tokens.css` holds every token as a CSS custom property, generated from `DESIGN.md` and the component files.
- `scripts/` holds the two generators for those files (`tokens-css.py`, `icons-json.py`). They are for design-system maintainers. Never hand-edit `tokens.css` or `icons.json`; after changing the docs or the icons version, rerun the matching script.

Rules:
- Use tokens, never raw values. A value that isn't in the `DESIGN.md` frontmatter doesn't exist in the system.
- Use existing components before inventing new ones. If nothing fits, ask the questions in `DESIGN.md` §9 Governance.
- If the docs don't answer a question, ask. Don't guess.

This project builds and maintains a real component library from the design system.

@PRODUCTION.AGENTS.md
