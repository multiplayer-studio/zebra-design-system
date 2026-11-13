---
name: Filter Chip
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # inactive
  filter-chip-container-background-enabled: '{colors.color-fill-default}'
  filter-chip-container-background-hover: '{colors.color-fill-faint}'
  filter-chip-container-background-selected: '{colors.color-fill-selection}'
  filter-chip-container-background-dragged: '{colors.color-fill-sunken}'
  filter-chip-container-background-disabled: '{colors.color-fill-disabled}'
  filter-chip-container-border-color: '{colors.color-line-default}'
  filter-chip-label-foreground: '{colors.color-ink-high}'
  filter-chip-label-foreground-disabled: '{colors.color-ink-disabled}'
  # active
  filter-chip-active-container-background: '{colors.color-fill-inverse}'
  filter-chip-active-container-border-color: '{colors.color-fill-inverse}'
  filter-chip-active-label-foreground: '{colors.color-ink-inverse}'
  # shape
  filter-chip-container-radius-rounded: '{radius.radius-pill}'
  filter-chip-container-radius-sharp: '{radius.radius-none}'
  # border, focus
  filter-chip-container-border-width: '{stroke.stroke-thin}'
  filter-chip-focus-ring-width: '{stroke.stroke-thick}'
  filter-chip-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  filter-chip-container-height: '{primitives.scale-11}'
  filter-chip-container-padding-x: '{space.space-md}'
  filter-chip-container-padding-y: '{space.space-sm}'
  filter-chip-active-container-padding-y: '{space.space-2xs}'
  filter-chip-container-gap: '{space.space-2xs}'
  filter-chip-active-container-gap: '{space.space-sm}'
  filter-chip-label-font: '{typography.type-indicator-medium}'
  filter-chip-icon-size: '{icon.icon-size-small}'
  filter-chip-group-gap: '{space.space-sm}'
  filter-chip-touch-target-size-minimum: '{control.control-target-min}'
---

# Filter Chip

> Switches one filter criterion on and off, in a group where several can be on at once.

## Anatomy
1. Container — horizontal row hugging its content at a fixed height (`--filter-chip-container-height`). Carries the background, the border and the radius.
2. Check mark — a `check_mark` [Icon](../atoms/icon.md) at `--filter-chip-icon-size`, before the label, present only when active. It takes the label colour and is what makes the on state readable without colour.
3. Label — the criterion, and the only content the chip takes. There is no trailing slot: no count, no remove control.

## Variants
Active is the real switch: it recolours the chip to the inverse palette and adds the check mark.

| Active | Background | Border | Text / icon | Padding (V) | Gap |
|---|---|---|---|---|---|
| off (default) | per state | `--filter-chip-container-border-color` | `--filter-chip-label-foreground`, no icon | `--filter-chip-container-padding-y` | `--filter-chip-container-gap` |
| on | `--filter-chip-active-container-background` | `--filter-chip-active-container-border-color` | `--filter-chip-active-label-foreground`, check mark shown | `--filter-chip-active-container-padding-y` | `--filter-chip-active-container-gap` |

The border is `--filter-chip-container-border-width`, drawn inside the container so it adds no size. Active is near-black in light mode and near-white in dark.

Shape: rounded (default) → `--filter-chip-container-radius-rounded` (pill) with zeta-icons-round; sharp → `--filter-chip-container-radius-sharp` with zeta-icons-sharp. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Border | Foreground | Notes |
|---|---|---|---|---|
| enabled | `--filter-chip-container-background-enabled` | `--filter-chip-container-border-color` | `--filter-chip-label-foreground` | resting state |
| hover | `--filter-chip-container-background-hover` | unchanged | unchanged | pointer devices only; inactive chips only |
| focused | `--filter-chip-container-background-enabled` (active: unchanged) | replaced by a `--filter-chip-focus-ring-width` `--filter-chip-focus-ring-color` ring drawn outside | unchanged | the only state with a visible outline; also drawn on active chips |
| selected | `--filter-chip-container-background-selected` | unchanged | unchanged | colour only, no check mark; prefer active |
| dragged | `--filter-chip-container-background-dragged` | unchanged | unchanged | while the chip is being reordered; inactive chips only |
| disabled | `--filter-chip-container-background-disabled` | none | `--filter-chip-label-foreground-disabled` | inactive chips only; not interactive |

Every state change is an instant swap of fill, text colour and the check mark: no transition is authored. An active chip has no hover or dragged look.

## Spacing & Sizing
| Property | Inactive | Active |
|---|---|---|
| Height | `--filter-chip-container-height` | `--filter-chip-container-height` |
| Padding (V / H) | `--filter-chip-container-padding-y` / `--filter-chip-container-padding-x` | `--filter-chip-active-container-padding-y` / `--filter-chip-container-padding-x` |
| Gap | `--filter-chip-container-gap` | `--filter-chip-active-container-gap` |
| Font | `--filter-chip-label-font` | `--filter-chip-label-font` |
| Check mark | — | `--filter-chip-icon-size` |

Width hugs the label, plus the check mark when active, so turning a chip on widens it. Chips in a row sit `--filter-chip-group-gap` apart and wrap. The chip is shorter than `--filter-chip-touch-target-size-minimum`; extend its hit area on touch UIs.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Active | on / off | off |
| Selected | on / off | off |
| Rounded | on (pill) / off (sharp) | on |
| Disabled | on / off | off |

Hover, focus and dragged are driven by interaction, never set on a static layout.

## Usage
- Use active to turn a filter on; it is the only value that both recolours the chip and shows the check mark.
- Keep filter chips in a group where more than one can be on. A single chip that toggles is usually a [Switch](../atoms/switch.md) or a [Checkbox](../atoms/checkbox.md).
- Name the filter, not the result: In stock, not Show only items in stock.
- Don't mix Selected with active in one row; they are two different ways to look chosen and they don't match.
- Don't use a filter chip to trigger an action; that is an [Assist Chip](../atoms/assist-chip.md).
- Say why a disabled chip can't be switched nearby; the chip itself gives no other clue.
- Typically grouped in a [Filter Selection Bar](../molecules/filter-selection-bar.md).

## Accessibility
- Each chip is an on/off control: expose its state (`aria-pressed` or a checkbox role), not just a label.
- The active chip carries the check mark as well as the inverse palette, so the on state doesn't rely on colour. Don't remove it. Selected is colour only and fails that test.
- The focus ring (`--filter-chip-focus-ring-width` `--filter-chip-focus-ring-color`) is drawn outside the chip; make sure a scrolling filter row doesn't clip it.
- Disabled chips drop the border; check `--filter-chip-container-background-disabled` and `--filter-chip-label-foreground-disabled` against the surface.
- The label (`--filter-chip-label-font`) is small; check it against the active palette as well as the inactive one.

## Stitch Prompt
Draw a row of Zebra filter chips `--filter-chip-group-gap` apart: each a `--filter-chip-container-height`-tall white (`--filter-chip-container-background-enabled`) pill with a thin light-grey (`--filter-chip-container-border-color`) outline, `--filter-chip-container-padding-x` side padding and a short near-black label in `--filter-chip-label-font`. One or two chips are active: they invert to a near-black (`--filter-chip-active-container-background`) pill with white (`--filter-chip-active-label-foreground`) text and a `--filter-chip-icon-size` check-mark icon before the label. Hover is very light grey `--filter-chip-container-background-hover`; a disabled chip is flat light grey `--filter-chip-container-background-disabled` with grey text and no outline.
