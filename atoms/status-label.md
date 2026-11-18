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
  # success
  status-label-success-container-background: '{colors.color-status-success-faint}'
  status-label-success-container-border-color: '{colors.color-status-success-default}'
  status-label-success-leading-foreground: '{colors.color-status-success-default}'
  status-label-success-label-foreground: '{colors.color-ink-high}'
  # warning
  status-label-warning-container-background: '{colors.color-status-warning-faint}'
  status-label-warning-container-border-color: '{colors.color-status-warning-default}'
  status-label-warning-leading-foreground: '{colors.color-status-warning-default}'
  status-label-warning-label-foreground: '{colors.color-ink-high}'
  # error
  status-label-error-container-background: '{colors.color-status-error-faint}'
  status-label-error-container-border-color: '{colors.color-status-error-default}'
  status-label-error-leading-foreground: '{colors.color-status-error-default}'
  status-label-error-label-foreground: '{colors.color-ink-high}'
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

> Reports a read-only state on an item, such as Active or Overdue, with a status icon (or a dot) and an optional dismiss.

## Anatomy
1. Container — a row at least `--status-label-container-height` tall with a `--status-label-container-border-width` border, padded `--status-label-container-padding-y` / `--status-label-container-padding-x`, with no gap (`--status-label-container-gap`). Fill and border follow Status.
2. Leading — a `--status-label-leading-size` box holding an [Icon](../atoms/icon.md) at `--status-label-icon-size` (default) or a `--status-label-dot-size` dot, both in the status's leading colour. The component draws it from Status; the glyph is fixed per status, one glyph per severity across the system (`lightbulb` neutral, `info` info, `check_circle` success, `warning` warning, `error` error), so it is not a slot. This is a context override: the icon takes the status colour instead of inheriting the text colour.
3. Label — the state, in `--status-label-label-font`, inside a wrapper padded `--status-label-label-padding-x` either side; that padding is what separates it from the leading element and the discard control. The text hugs, so it decides the width; where space runs out it wraps and the label grows taller.
4. Discard (optional) — a `close` [Icon](../atoms/icon.md) at `--status-label-discard-size` after the label, drawn in `--status-label-discard-foreground`. In code it is a button. It is the only thing in the badge family a person can press.

## Variants
| Status | Fill | Border | Leading (dot / icon) | Text | Glyph |
|---|---|---|---|---|---|
| neutral (default) | `--status-label-neutral-container-background` | `--status-label-neutral-container-border-color` | `--status-label-neutral-leading-foreground` | `--status-label-neutral-label-foreground` | `lightbulb` |
| info | `--status-label-info-container-background` | `--status-label-info-container-border-color` | `--status-label-info-leading-foreground` | `--status-label-info-label-foreground` | `info` |
| success | `--status-label-success-container-background` | `--status-label-success-container-border-color` | `--status-label-success-leading-foreground` | `--status-label-success-label-foreground` | `check_circle` |
| warning | `--status-label-warning-container-background` | `--status-label-warning-container-border-color` | `--status-label-warning-leading-foreground` | `--status-label-warning-label-foreground` | `warning` |
| error | `--status-label-error-container-background` | `--status-label-error-container-border-color` | `--status-label-error-leading-foreground` | `--status-label-error-label-foreground` | `error` |

The four status tints sit at one strength rather than escalating with severity; the border is what keeps them apart at a glance. The text colour is the same at every status.

| Leading | Shows | When |
|---|---|---|
| icon (default) | the per-status glyph | always, unless space rules it out |
| indicator | the dot | dense rows where the label already names the state; the dot is colour alone, so the text must carry the status ([patterns 6.11](../patterns/06-accessibility.md)) |

There is no leading-free option: a status always shows its icon (or dot) and a word ([DESIGN.md §3 Status](../DESIGN.md)).

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
| Height | `--status-label-container-height` minimum, at every status |
| Padding (V / H) | `--status-label-container-padding-y` / `--status-label-container-padding-x` |
| Gap | `--status-label-container-gap` |
| Leading box | `--status-label-leading-size` (dot `--status-label-dot-size`, icon `--status-label-icon-size`) |
| Label padding (H) | `--status-label-label-padding-x` |
| Font | `--status-label-label-font` |
| Discard | `--status-label-discard-size` square, after the label |
| Border | `--status-label-container-border-width` |

Width hugs: the leading box, the label, plus the discard square when Discardable is on.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, the state in two words at most | — |
| Status | neutral, info, success, warning, error | neutral |
| Leading | icon, indicator | icon |
| Shape | rounded, sharp | rounded |
| Discardable | on / off | off |

## Usage
- Keep the label to the state itself (Active, Overdue). It hugs its text, so a sentence turns into a wide block in a narrow column.
- Keep Leading=icon; the dot and the fill are colour alone, the glyph differs in shape too ([patterns 6.11](../patterns/06-accessibility.md)).
- Use success on completion, not on progress; warning when something needs attention but nothing has failed; error only for failed or blocking states ([patterns 4.79](../patterns/04-states-feedback.md)).
- A group of statuses shows its most severe member ([DESIGN.md §3 Status](../DESIGN.md)).
- Device states map to these severities by one fixed set: connecting, busy and updating are info; needs attention is warning; offline is neutral ([patterns 4.70](../patterns/04-states-feedback.md)).
- Don't use neutral to mean "normal". It is the absence of a status.
- Don't use a status label where a person chooses or filters by the value; that is a chip. The only action offered is the dismiss.
- For a category rather than a state, use [Label](../atoms/label.md). Priority is not a status: use [Priority Pill](../atoms/priority-pill.md).

## Accessibility
- The text is the accessible name; it must name the state, not a colour word or an internal code. Each status has its own glyph, and the icon is decorative beside the text.
- The discard control is a real button with no text of its own: give it a name that says what it removes ("Remove Overdue") and keep it reachable by keyboard. It shows `--status-label-discard-focus-ring-width` `--status-label-discard-focus-ring-color` when focused.
- Nothing else is focusable and nothing announces itself. Where a status changes while a person is on the page, the surrounding structure announces it without moving focus ([patterns 6.53](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra status label: a `--status-label-container-height`-tall (at least) pill (`--status-label-container-radius-rounded`) with a thin `--status-label-container-border-width` coloured outline and a very pale tint, holding a small leading `--status-label-icon-size` icon in the status colour (or, in dense rows, a `--status-label-dot-size` dot), then the state in near-black `--status-label-label-font` text. Success is a green outline (`--status-label-success-container-border-color`) on pale green (`--status-label-success-container-background`) with a green check-circle icon; warning amber on pale amber with a warning icon; error red on pale pink with an error icon; info blue on pale blue with an info icon; neutral a light grey outline (`--status-label-neutral-container-border-color`) on near-white (`--status-label-neutral-container-background`) with a dark lightbulb icon. A dismissible label ends with a small close icon. Sharp versions have square corners (`--status-label-container-radius-sharp`).
