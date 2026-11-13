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
  # info
  label-info-bold-container-background: '{colors.color-status-info-default}'
  label-info-bold-container-border-color: '{colors.color-status-info-default}'
  label-info-bold-text-foreground: '{colors.color-brand-primary-on}'
  label-info-tint-container-background: '{colors.color-status-info-faint}'
  label-info-tint-container-border-color: '{colors.color-status-info-default}'
  label-info-tint-text-foreground: '{colors.color-ink-high}'
  # positive
  label-positive-bold-container-background: '{colors.color-status-success-default}'
  label-positive-bold-container-border-color: '{colors.color-status-success-default}'
  label-positive-bold-text-foreground: '{colors.color-brand-primary-on}'
  label-positive-tint-container-background: '{colors.color-status-success-faint}'
  label-positive-tint-container-border-color: '{colors.color-status-success-default}'
  label-positive-tint-text-foreground: '{colors.color-ink-high}'
  # warning
  label-warning-bold-container-background: '{colors.color-status-warning-default}'
  label-warning-bold-container-border-color: '{colors.color-status-warning-default}'
  label-warning-bold-text-foreground: '{colors.color-ink-inverse}'
  label-warning-tint-container-background: '{colors.color-status-warning-faint}'
  label-warning-tint-container-border-color: '{colors.color-status-warning-default}'
  label-warning-tint-text-foreground: '{colors.color-ink-high}'
  # negative
  label-negative-bold-container-background: '{colors.color-status-error-default}'
  label-negative-bold-container-border-color: '{colors.color-status-error-default}'
  label-negative-bold-text-foreground: '{colors.color-brand-primary-on}'
  label-negative-tint-container-background: '{colors.color-status-error-faint}'
  label-negative-tint-container-border-color: '{colors.color-status-error-default}'
  label-negative-tint-text-foreground: '{colors.color-ink-high}'
  # shape
  label-container-radius-rounded: '{radius.radius-element-sm}'
  label-container-radius-sharp: '{radius.radius-none}'
  # border (per emphasis)
  label-bold-container-border-width: '{stroke.stroke-thin}'
  label-outlined-container-border-width: '{stroke.stroke-thin}'
  label-plain-container-border-width: '{stroke.stroke-base}'
  # sizes
  label-container-padding: '{space.space-2xs}'
  label-container-gap: '{space.space-3xs}'
  label-text-font: '{typography.type-body-xsmall}'
---

# Label

> Names a category on an item in a word or two, from a solid block down to a quiet tint. It reports and never responds.

## Anatomy
1. Container — hugs the text, padded `--label-container-padding` on all sides, with a `--label-container-gap` gap held for anything placed beside the text. Carries the fill, the border and the radius.
2. Text — the category name in `--label-text-font`. It never wraps, so its length decides the width of the whole label.
3. Border — visible on the outlined form only. The plain form carries the same stroke at `--label-plain-container-border-width` (zero), a theming hook so a high-contrast theme can give every label an edge.

## Variants
Variant chooses the colour family; Bold and Outlined choose how much of it shows. They make three forms, not four: Bold and Outlined together is not built.

| Variant | Bold: fill / border | Bold: text | Outlined & plain: fill | Outlined: border | Outlined & plain: text |
|---|---|---|---|---|---|
| neutral (default) | `--label-neutral-bold-container-background` / `--label-neutral-bold-container-border-color` | `--label-neutral-bold-text-foreground` | `--label-neutral-tint-container-background` | `--label-neutral-tint-container-border-color` | `--label-neutral-tint-text-foreground` |
| info | `--label-info-bold-container-background` / `--label-info-bold-container-border-color` | `--label-info-bold-text-foreground` | `--label-info-tint-container-background` | `--label-info-tint-container-border-color` | `--label-info-tint-text-foreground` |
| positive | `--label-positive-bold-container-background` / `--label-positive-bold-container-border-color` | `--label-positive-bold-text-foreground` | `--label-positive-tint-container-background` | `--label-positive-tint-container-border-color` | `--label-positive-tint-text-foreground` |
| warning | `--label-warning-bold-container-background` / `--label-warning-bold-container-border-color` | `--label-warning-bold-text-foreground` | `--label-warning-tint-container-background` | `--label-warning-tint-container-border-color` | `--label-warning-tint-text-foreground` |
| negative | `--label-negative-bold-container-background` / `--label-negative-bold-container-border-color` | `--label-negative-bold-text-foreground` | `--label-negative-tint-container-background` | `--label-negative-tint-container-border-color` | `--label-negative-tint-text-foreground` |

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

No transition is defined: a variant or emphasis change swaps fill, border and text colour together. There is nothing to press and no selected form; that is the line between Label and a chip.

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
| Variant | neutral, info, positive, warning, negative | neutral |
| Shape | rounded, sharp | rounded |
| Bold | on / off | on |
| Outlined | on / off (only with Bold off) | off |

## Usage
- Keep it to one or two words. The label hugs small text, so a phrase becomes a wide bar in a narrow column.
- Pick one emphasis and hold it down a column. Mixing solid and tinted labels in one list reads as two kinds of thing.
- Use neutral for a category with no standing (a type, a topic, a location); info, positive, warning and negative only when the category carries that meaning.
- Don't use a label where a person can choose, remove or filter by the category; that is a chip.
- Don't mix rounded and sharp in one view.
- For a state with a dot or icon (Active, Overdue), use [Status Label](../atoms/status-label.md).

## Accessibility
- The text is the accessible name and the only thing that names the category. Colour reinforces it and never replaces it; neutral and the four status variants are told apart by colour alone.
- Not focusable and not a control; nothing about it should suggest otherwise.
- Bold knocks small text out of a strong fill. Check contrast per variant, because the pairing differs between them.
- The plain form has no visible edge, so on a tinted surface it can lose its boundary. `--label-plain-container-border-width` is the hook a high-contrast theme raises to give it one.

## Stitch Prompt
Draw a Zebra label: a small rectangular tag with `--label-container-radius-rounded` corners and `--label-container-padding` padding, holding one or two words in `--label-text-font`. The default bold neutral label is solid dark grey (`--label-neutral-bold-container-background`) with white text (`--label-neutral-bold-text-foreground`); bold status labels are solid blue (`--label-info-bold-container-background`), green (`--label-positive-bold-container-background`), amber (`--label-warning-bold-container-background`) or red (`--label-negative-bold-container-background`) with light text. Quieter labels use a pale tint (e.g. `--label-positive-tint-container-background`) with near-black text (`--label-positive-tint-text-foreground`), optionally with a thin `--label-outlined-container-border-width` outline in the status colour (`--label-positive-tint-container-border-color`). A plain neutral label is a very light grey (`--label-neutral-tint-container-background`) block with dark text and no border. Sharp labels have square corners (`--label-container-radius-sharp`).
