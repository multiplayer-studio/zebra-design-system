---
name: Label
level: atom
status: stable
composes: []
tokens:
  # neutral
  label-neutral-bold-container-background: '{colors.color-ink-medium}'
  label-neutral-bold-container-border-color: '{colors.color-ink-medium}'
  label-neutral-bold-text-foreground: '{colors.color-ink-inverse}'
  label-neutral-tint-container-background: '{colors.color-fill-faint}'
  label-neutral-tint-container-border-color: '{colors.color-line-strong}'
  label-neutral-tint-text-foreground: '{colors.color-ink-high}'
  # shape
  label-container-radius-rounded: '{radius.radius-element-sm}'
  label-container-radius-sharp: '{radius.radius-none}'
  # border (per emphasis)
  label-bold-container-border-width: '{stroke.stroke-thin}'
  label-outlined-container-border-width: '{stroke.stroke-thin}'
  label-plain-container-border-width: '{stroke.stroke-thin}'
  label-plain-container-border-color: '{colors.color-line-contrast}'
  # sizes
  label-container-padding: '{space.space-2xs}'
  label-container-gap: '{space.space-3xs}'
  label-text-font: '{typography.type-body-xsmall}'
---

# Label

> Names a category on an item in a word or two, from a solid block down to a quiet tint. It reports and never responds, and never shows a status.

## Anatomy
1. Container — hugs the text, padded `--label-container-padding` on all sides, with a `--label-container-gap` gap held for anything placed beside the text. Carries the fill, the border and the radius.
2. Text — the category name in `--label-text-font`. Its length decides the width of the whole label; where space runs out it wraps rather than truncating.
3. Border — visible on the outlined form only. The plain form draws its border at `--label-plain-container-border-width` in `--label-plain-container-border-color`, in a colour that is transparent by default and visible in the AAA modes (DESIGN.md §3 Theme modes), so every label has an edge in high contrast.

## Variants
Labels are for categories only, so they're neutral: a label never takes a status colour, because colour on a tag would read as a status ([DESIGN.md §3 Status](../DESIGN.md)). For a state, use [Status Label](../atoms/status-label.md); a status, a tag and a badge never look alike ([patterns 10.44](../patterns/10-data-display.md)). Bold and Outlined choose how much of the neutral shows. They make three forms, not four: Bold and Outlined together is not built.

| Form | Fill / border | Text |
|---|---|---|
| bold | `--label-neutral-bold-container-background` / `--label-neutral-bold-container-border-color` | `--label-neutral-bold-text-foreground` |
| outlined, plain | `--label-neutral-tint-container-background` / `--label-neutral-tint-container-border-color` (outlined only) | `--label-neutral-tint-text-foreground` |

| Form | Bold | Outlined | Look | Border |
|---|---|---|---|---|
| bold (default) | on | off | solid fill, light text; spotted at a glance | `--label-bold-container-border-width` in the fill colour, drawn outside the box |
| outlined | off | on | tint with a visible edge; findable without dominating | `--label-outlined-container-border-width`, drawn inside the box |
| plain | off | off | tint with no edge; the quietest form | `--label-plain-container-border-width` |

Shape: rounded (default) → `--label-container-radius-rounded`; sharp → `--label-container-radius-sharp`, for square-cornered surfaces such as table cells. In the AAA modes the component is always sharp (DESIGN.md §5).

The plain neutral label replaces the former Status Chip: a quiet grey tag for a read-only category such as "Dock B" or "Cold chain".

## States
| State | What changes |
|---|---|
| static | the only state; nothing answers hover, focus or press |

No transition is defined: an emphasis change swaps fill, border and text colour together. There is nothing to press and no selected form; that is the line between Label and a chip.

## Spacing & Sizing
| Property | Token | Notes |
|---|---|---|
| Padding | `--label-container-padding` | all four sides |
| Gap | `--label-container-gap` | between the text and anything placed beside it |
| Font | `--label-text-font` | every form |
| Height | `--label-text-font` line height + twice `--label-container-padding` | the outlined and plain borders sit inside this; bold's border sits outside, so bold is twice `--label-bold-container-border-width` taller |
| Width | — | hugs the text in every form |

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, one or two words | — |
| Shape | rounded, sharp | rounded |
| Bold | on / off | on |
| Outlined | on / off (only with Bold off) | off |

## Usage
- Keep it to one or two words. The label hugs small text, so a phrase becomes a wide bar in a narrow column.
- Pick one emphasis and hold it down a column. Mixing solid and tinted labels in one list reads as two kinds of thing.
- Use for a category with no standing (a type, a topic, a location). Where a category carries a severity, it's a status: use [Status Label](../atoms/status-label.md).
- Don't use a label where a person can choose, remove or filter by the category; that is a chip.
- Don't mix rounded and sharp in one view.
- For a state with a dot or icon (Active, Overdue), use [Status Label](../atoms/status-label.md).

## Accessibility
- The text is the accessible name and the only thing that names the category ([patterns 6.11](../patterns/06-accessibility.md)).
- Not focusable and not a control; nothing about it should suggest otherwise.
- Bold knocks small text out of a strong fill; the pairing meets the text floor ([patterns 6.1](../patterns/06-accessibility.md)).
- The plain form has no visible edge, so on a tinted surface it can lose its boundary. Its border (`--label-plain-container-border-color`) is transparent by default and shows in the AAA modes.

## Claude Prompt
Draw a Zebra label: a small rectangular tag with `--label-container-radius-rounded` corners and `--label-container-padding` padding, holding one or two words in `--label-text-font`. The default bold label is solid dark grey (`--label-neutral-bold-container-background`) with white text (`--label-neutral-bold-text-foreground`). Quieter labels use a pale grey tint (`--label-neutral-tint-container-background`) with near-black text (`--label-neutral-tint-text-foreground`), optionally with a thin `--label-outlined-container-border-width` grey outline (`--label-neutral-tint-container-border-color`). A plain neutral label is a very light grey (`--label-neutral-tint-container-background`) block with dark text and no border. Sharp labels have square corners (`--label-container-radius-sharp`).
