---
name: Assist Chip
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # container (every colour)
  assist-chip-container-background-enabled: '{colors.color-fill-default}'
  assist-chip-container-background-hover: '{colors.color-fill-faint}'
  assist-chip-container-background-selected: '{colors.color-fill-selection}'
  assist-chip-container-background-dragged: '{colors.color-fill-sunken}'
  assist-chip-container-background-disabled: '{colors.color-fill-disabled}'
  assist-chip-label-foreground-disabled: '{colors.color-ink-disabled}'
  # neutral
  assist-chip-neutral-container-border-color: '{colors.color-line-default}'
  assist-chip-neutral-label-foreground: '{colors.color-ink-high}'
  # green
  assist-chip-green-container-border-color: '{colors.color-status-success-default}'
  assist-chip-green-label-foreground: '{colors.color-status-success-default}'
  # orange
  assist-chip-orange-container-border-color: '{colors.color-status-warning-default}'
  assist-chip-orange-label-foreground: '{colors.color-status-warning-default}'
  # blue
  assist-chip-blue-container-border-color: '{colors.color-status-info-default}'
  assist-chip-blue-label-foreground: '{colors.color-status-info-default}'
  # red
  assist-chip-red-container-border-color: '{colors.color-status-error-default}'
  assist-chip-red-label-foreground: '{colors.color-status-error-default}'
  # shape
  assist-chip-container-radius-rounded: '{radius.radius-pill}'
  assist-chip-container-radius-sharp: '{radius.radius-none}'
  # border, focus
  assist-chip-container-border-width: '{stroke.stroke-thin}'
  assist-chip-focus-ring-width: '{stroke.stroke-thick}'
  assist-chip-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  assist-chip-container-height: '{component-sizes.size-assist-chip-height}'
  assist-chip-container-padding-y: '{space.space-xs}'
  assist-chip-container-padding-x: '{space.space-sm}'
  assist-chip-container-gap: '{space.space-3xs}'
  assist-chip-label-padding-x: '{space.space-2xs}'
  assist-chip-label-font: '{typography.type-indicator-medium}'
  assist-chip-icon-size: '{icon.icon-size-small}'
  assist-chip-touch-target-size-minimum: '{control.control-target-min}'
---

# Assist Chip

> Offers a contextual action, or stands for an item someone can discard such as an attached file, with an optional colour marking its kind.

## Anatomy
1. Container — horizontal row hugging its content at a fixed height (`--assist-chip-container-height`). Carries the background, the border and the radius; parts sit `--assist-chip-container-gap` apart.
2. Leading icon (optional) — [Icon](../atoms/icon.md) at `--assist-chip-icon-size`, naming the action's domain. Any glyph; it takes the label colour.
3. Label — the action, phrased as a verb, in a wrapper padded `--assist-chip-label-padding-x` each side. The only text the chip takes.
4. Remove control (Discardable, on by default) — a `close` [Icon](../atoms/icon.md) at `--assist-chip-icon-size` after the label, in the label colour. It is a separate target from the chip.

## Variants
Colour sets the border and the foreground (label, icon and remove control); the fill stays neutral and follows the state.

| Colour | Border | Text / icon | Use for |
|---|---|---|---|
| neutral (default) | `--assist-chip-neutral-container-border-color` | `--assist-chip-neutral-label-foreground` | no state or kind of item to mark |
| green | `--assist-chip-green-container-border-color` | `--assist-chip-green-label-foreground` | a positive state, or one kind of item (e.g. spreadsheets) |
| orange | `--assist-chip-orange-container-border-color` | `--assist-chip-orange-label-foreground` | a state that needs attention, or one kind of item |
| blue | `--assist-chip-blue-container-border-color` | `--assist-chip-blue-label-foreground` | an informative state, or one kind of item (e.g. documents) |
| red | `--assist-chip-red-container-border-color` | `--assist-chip-red-label-foreground` | a failed state, or one kind of item (e.g. PDFs) |

The border is `--assist-chip-container-border-width`, drawn inside the container so it adds no size.

Shape: rounded (default) → `--assist-chip-container-radius-rounded` (pill) with zeta-icons-round; sharp → `--assist-chip-container-radius-sharp` with zeta-icons-sharp. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Border | Foreground | Notes |
|---|---|---|---|---|
| enabled | `--assist-chip-container-background-enabled` | per colour | per colour | resting state |
| hover | `--assist-chip-container-background-hover` | unchanged | unchanged | pointer devices only |
| focused | `--assist-chip-container-background-enabled` | replaced by a `--assist-chip-focus-ring-width` `--assist-chip-focus-ring-color` ring drawn outside | unchanged | the only state with a visible outline |
| selected | `--assist-chip-container-background-selected` | unchanged | unchanged | a sticky look; see Usage |
| dragged | `--assist-chip-container-background-dragged` | unchanged | unchanged | while the chip is being reordered |
| disabled | `--assist-chip-container-background-disabled` | none | `--assist-chip-label-foreground-disabled` (label, icon, remove) | neutral colour only; not interactive |

Every state change is an instant colour swap: no transition is authored. What the chip does when activated, and what removing it does, belongs to the implementation.

## Spacing & Sizing
| Property | Token |
|---|---|
| Height | `--assist-chip-container-height` |
| Padding (V / H) | `--assist-chip-container-padding-y` / `--assist-chip-container-padding-x` |
| Gap | `--assist-chip-container-gap` |
| Label padding (H) | `--assist-chip-label-padding-x` |
| Font | `--assist-chip-label-font` |
| Icon and remove control | `--assist-chip-icon-size` |
| Border | `--assist-chip-container-border-width` |

Width hugs the icon, label and remove control. The height is the same in every state, so a mixed row sits level. The chip is shorter than `--assist-chip-touch-target-size-minimum`; extend its hit area (and the remove control's) to that size on touch UIs.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text (a verb phrase) | — |
| Leading icon | on / off, any icon | on |
| Discardable | on / off | on |
| Colour | neutral, green, orange, blue, red | neutral |
| Rounded | on (pill) / off (sharp) | on |
| Selected | on / off | off |
| Disabled | on / off (neutral only) | off |
| Foreground, Background, Border | any semantic colour (code only) | per colour / state |

Hover, focus and dragged are driven by interaction, never set on a static layout. In code the foreground, background and border each accept a colour override on top of Colour, so one kind of item can hold one colour across a view; keep foreground and border in the same family. Figma's `active` axis has a single value and is not a property.

## Usage
- Phrase the label as a verb: the chip is a thing to do, not a thing to pick. A noun label reads as a filter or a tag.
- Keep the leading icon consistent across a row; one chip without an icon among several with them looks misaligned. Prefer no icon to an invented one.
- Use Discardable for items someone can remove, such as attached files.
- Hold one colour for every chip of the same kind in a view (all PDFs red, all spreadsheets green).
- Don't use an assist chip for the main action on the screen; that is a [Button](../atoms/button.md). Don't use it to narrow content; that is a [Filter Chip](../atoms/filter-chip.md).
- Don't use Selected to mean an action has stuck. A chip that stays selected is usually a filter chip in disguise.
- Disabled is drawn for the neutral colour only. Say why the action is unavailable nearby.

## Accessibility
- The chip is a control: give it a button role and a name stating the action.
- The remove control is a separate target with its own accessible name that says what it removes (Remove Document.pdf, not Remove).
- The focus ring (`--assist-chip-focus-ring-width` `--assist-chip-focus-ring-color`) is drawn outside the chip; make sure a scrolling row doesn't clip it.
- The leading icon is decorative. Anything it means that the label doesn't must be in text.
- Colour marks the kind of item but never replaces the label. Check each colour (and any code override) for contrast against the surface.
- Disabled chips drop the border and rely on `--assist-chip-container-background-disabled` and `--assist-chip-label-foreground-disabled` alone; check both against the surface.
- The label (`--assist-chip-label-font`) is the action's only name; don't abbreviate it.

## Stitch Prompt
Draw a Zebra assist chip: a `--assist-chip-container-height`-tall white (`--assist-chip-container-background-enabled`) pill with a thin `--assist-chip-container-border-width` light-grey (`--assist-chip-neutral-container-border-color`) outline, `--assist-chip-container-padding-x` side padding, a `--assist-chip-icon-size` dark rounded icon, then a short verb label in `--assist-chip-label-font` near-black (`--assist-chip-neutral-label-foreground`). By default (Discardable on) the chip ends with a small close "×" icon; turn it off for a plain action chip. Coloured chips keep the white fill but draw the outline and text in one status colour: green (`--assist-chip-green-label-foreground`), orange, blue or red (`--assist-chip-red-label-foreground`). Hover fills very light grey `--assist-chip-container-background-hover`; selected fills pale blue `--assist-chip-container-background-selected`. Disabled is flat light grey `--assist-chip-container-background-disabled` with grey text and no outline. A sharp variant has square corners.
