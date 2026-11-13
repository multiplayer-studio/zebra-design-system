---
name: Status Label
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # neutral
  status-label-neutral-container-background: '{colors.color-status-neutral-faint}'
  status-label-neutral-container-border-color: '{colors.color-line-default}'
  status-label-neutral-leading-foreground: '{colors.color-ink-high}'
  status-label-neutral-label-foreground: '{colors.color-ink-high}'
  # info
  status-label-info-container-background: '{colors.color-status-info-faint}'
  status-label-info-container-border-color: '{colors.color-status-info-default}'
  status-label-info-leading-foreground: '{colors.color-status-info-default}'
  status-label-info-label-foreground: '{colors.color-ink-high}'
  # positive
  status-label-positive-container-background: '{colors.color-status-success-faint}'
  status-label-positive-container-border-color: '{colors.color-status-success-default}'
  status-label-positive-leading-foreground: '{colors.color-status-success-default}'
  status-label-positive-label-foreground: '{colors.color-ink-high}'
  # warning
  status-label-warning-container-background: '{colors.color-status-warning-faint}'
  status-label-warning-container-border-color: '{colors.color-status-warning-default}'
  status-label-warning-leading-foreground: '{colors.color-status-warning-default}'
  status-label-warning-label-foreground: '{colors.color-ink-high}'
  # negative
  status-label-negative-container-background: '{colors.color-status-error-faint}'
  status-label-negative-container-border-color: '{colors.color-status-error-default}'
  status-label-negative-leading-foreground: '{colors.color-status-error-default}'
  status-label-negative-label-foreground: '{colors.color-ink-high}'
  # discard
  status-label-discard-foreground: '{colors.color-ink-high}'
  status-label-discard-focus-ring-width: '{stroke.stroke-thick}'
  status-label-discard-focus-ring-color: '{colors.color-line-focus}'
  # shape and border
  status-label-container-radius-rounded: '{radius.radius-pill}'
  status-label-container-radius-sharp: '{radius.radius-none}'
  status-label-container-border-width: '{stroke.stroke-thin}'
  # sizes
  status-label-container-height: '{primitives.scale-10}'
  status-label-container-padding-y: '{space.space-3xs}'
  status-label-container-padding-x: '{space.space-2xs}'
  status-label-container-gap: '{space.space-none}'
  status-label-leading-size: '{control.control-icon-sm}'
  status-label-dot-size: '{control.control-icon-xxs}'
  status-label-icon-size: '{icon.icon-size-small}'
  status-label-label-padding-x: '{space.space-2xs}'
  status-label-label-font: '{typography.type-body-small}'
  status-label-discard-size: '{icon.icon-size-small}'
---

# Status Label

> Reports a read-only state on an item, such as Active or Overdue, with an optional dot or icon and an optional dismiss.

## Anatomy
1. Container — a `--status-label-container-height` row with a `--status-label-container-border-width` border, padded `--status-label-container-padding-y` / `--status-label-container-padding-x`, with no gap (`--status-label-container-gap`). Fill and border follow Status.
2. Leading (optional) — a `--status-label-leading-size` box holding either a `--status-label-dot-size` dot or an [Icon](../atoms/icon.md) at `--status-label-icon-size`, both in the status's leading colour. The component draws it from Status; the glyph is fixed per status (`info` for neutral and info, `check_circle`, `warning`, `error`), so it is not a slot. This is a context override: the icon takes the status colour instead of inheriting the text colour.
3. Label — the state, in `--status-label-label-font`, inside a wrapper padded `--status-label-label-padding-x` either side; that padding is what separates it from the leading element and the discard control. The text hugs, so it decides the width.
4. Discard (optional) — a `close` [Icon](../atoms/icon.md) at `--status-label-discard-size` after the label, drawn in `--status-label-discard-foreground`. In code it is a button. It is the only thing in the badge family a person can press.

## Variants
| Status | Fill | Border | Leading (dot / icon) | Text | Glyph |
|---|---|---|---|---|---|
| neutral (default) | `--status-label-neutral-container-background` | `--status-label-neutral-container-border-color` | `--status-label-neutral-leading-foreground` | `--status-label-neutral-label-foreground` | `info` |
| info | `--status-label-info-container-background` | `--status-label-info-container-border-color` | `--status-label-info-leading-foreground` | `--status-label-info-label-foreground` | `info` |
| positive | `--status-label-positive-container-background` | `--status-label-positive-container-border-color` | `--status-label-positive-leading-foreground` | `--status-label-positive-label-foreground` | `check_circle` |
| warning | `--status-label-warning-container-background` | `--status-label-warning-container-border-color` | `--status-label-warning-leading-foreground` | `--status-label-warning-label-foreground` | `warning` |
| negative | `--status-label-negative-container-background` | `--status-label-negative-container-border-color` | `--status-label-negative-leading-foreground` | `--status-label-negative-label-foreground` | `error` |

The four status tints sit at one strength rather than escalating with severity; the border is what keeps them apart at a glance. The text colour is the same at every status.

| Leading | Shows | When |
|---|---|---|
| indicator (default) | the dot | the label already names the state |
| icon | the per-status glyph | the status must survive greyscale |
| none | nothing; the label starts at the container padding | fill and border carry the status alone |

Shape: rounded (default) → `--status-label-container-radius-rounded` (pill); sharp → `--status-label-container-radius-sharp`, for dense square-cornered surfaces such as table cells. Nothing else changes. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| static | the label has no interaction states |
| discard: hover, pressed | pointer cursor only; no colour change is specified |
| discard: focused | `--status-label-discard-focus-ring-width` `--status-label-discard-focus-ring-color` ring around the close glyph |

No transition is defined: a status change swaps fill, border and the leading element together, and the text stays put. Pressing the discard control removes the label; it dismisses rather than selects.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height | `--status-label-container-height`, at every status |
| Padding (V / H) | `--status-label-container-padding-y` / `--status-label-container-padding-x` |
| Gap | `--status-label-container-gap` |
| Leading box | `--status-label-leading-size` (dot `--status-label-dot-size`, icon `--status-label-icon-size`) |
| Label padding (H) | `--status-label-label-padding-x` |
| Font | `--status-label-label-font` |
| Discard | `--status-label-discard-size` square, after the label |
| Border | `--status-label-container-border-width` |

Width hugs: the label, plus the leading box when Leading is not none, plus the discard square when Discardable is on.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, the state in two words at most | — |
| Status | neutral, info, positive, warning, negative | neutral |
| Leading | indicator, icon, none | indicator |
| Shape | rounded, sharp | rounded |
| Discardable | on / off | off |

## Usage
- Keep the label to the state itself (Active, Overdue). It hugs its text, so a sentence turns into a wide block in a narrow column.
- Use Leading=icon where the status has to survive greyscale; the dot and the fill are colour alone, the glyph differs in shape too.
- Use positive on completion, not on progress; warning when something needs attention but nothing has failed; negative only for failed or blocking states.
- Don't use neutral to mean "normal". It is the absence of a status.
- Don't use a status label where a person chooses or filters by the value; that is a chip. The only action offered is the dismiss.
- For a category rather than a state, use [Label](../atoms/label.md).

## Accessibility
- The text is the accessible name; it must name the state, not a colour word or an internal code. Neutral and info share a glyph, so in one view the text is all that separates them.
- Colour alone separates the statuses unless Leading=icon or the text names the state.
- The discard control is a real button with no text of its own: give it a name that says what it removes ("Remove Overdue") and keep it reachable by keyboard. It shows `--status-label-discard-focus-ring-width` `--status-label-discard-focus-ring-color` when focused.
- Nothing else is focusable and nothing announces itself. Where a status changes while a person is on the page, the surrounding structure must announce it.

## Stitch Prompt
Draw a Zebra status label: a `--status-label-container-height`-tall pill (`--status-label-container-radius-rounded`) with a thin `--status-label-container-border-width` coloured outline and a very pale tint, holding a small leading dot (`--status-label-dot-size`) or `--status-label-icon-size` icon in the status colour, then the state in near-black `--status-label-label-font` text. Positive is a green outline (`--status-label-positive-container-border-color`) on pale green (`--status-label-positive-container-background`) with a green check-circle icon; warning amber on pale amber; negative red on pale pink; info blue on pale blue; neutral a light grey outline (`--status-label-neutral-container-border-color`) on near-white (`--status-label-neutral-container-background`) with a dark dot. A dismissible label ends with a small close icon. Sharp versions have square corners (`--status-label-container-radius-sharp`).
