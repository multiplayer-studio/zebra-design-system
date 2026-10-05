# Zebra Design System — Agent Entry Point

## System Identity

A declarative, code-free visual design standard based on Zeta design principles. It exists only as markdown rules and JSON contracts. It contains no framework code and is not tied to any technology.

## Prototype Mode

All output is a prototype for communicating design concepts, to be rebuilt as production code later. Prototypes are always React + Vite apps. Always follow `PROTOTYPE.md`.

## Authority Hierarchy

When sources conflict, the higher one wins.

1. `tokens.json` — sole source of truth for **values**: colors, dimensions, spacing, fonts, radii, strokes, shadows. Never hardcode a value. Always reference a token key.
2. `icons.json` — sole source of truth for **icon names, categories and glyph lookups**. Never invent an icon name.
3. `components/*.md` — component visual anatomy, token bindings and interactive states.
4. `DESIGN.md` — global layout rules, responsive scaling tiers and accessibility baselines.

If a needed value or icon is missing from the JSON contracts, stop and report the gap. Do not substitute a literal.

## Token Key Notation

Component files cite keys without the theme or tier segment. The consumer resolves the missing segment from context (see `DESIGN.md`).

| Written in `components/*.md` | Resolves in `tokens.json` to |
|---|---|
| `color.surface.card` | `color.light.surface.card` or `color.dark.surface.card` |
| `size.space.md` | `size.{mobile\|tablet\|desktop\|desktop compact}.space.md` |
| `typography.label.large` | `typography.{tier}.label.large` |

## Execution Guardrails for AI Generation

- When asked to produce output for ANY framework (React, Angular, Flutter, Jetpack Compose, etc.), map the token keys from `tokens.json` into that framework's idiomatic styling system (theme objects, style props, resource files). Keep key names traceable to the source.
- Strictly meet WCAG 2.2 AA:
  - Text contrast of at least 4.5:1.
  - A visible focus ring on every interactive element.
  - Touch targets of 40px or more.
- Never reference web components or proprietary framework wrappers in specs. The markdown rules are universal UI abstractions.
- Never encode meaning in color alone. Pair color with an icon and text (see `DESIGN.md`).
- Do not add component variants, states or anatomy that are not in the component file. Propose the change to the spec first.
