---
name: Input Chip
level: molecule
status: stable
composes: [../atoms/avatar.md, ../atoms/icon.md]
tokens:
  # colour
  input-chip-container-background-enabled: '{colors.color-status-ghost-default}'
  input-chip-container-background-hover: '{colors.color-status-ghost-faint}'
  input-chip-container-background-disabled: '{colors.color-fill-disabled}'
  input-chip-container-border-color: '{colors.color-line-default}'
  input-chip-label-foreground: '{colors.color-ink-high}'
  input-chip-label-foreground-disabled: '{colors.color-ink-disabled}'
  # shape
  input-chip-container-radius-rounded: '{radius.radius-pill}'
  input-chip-container-radius-sharp: '{radius.radius-none}'
  # border, focus
  input-chip-container-border-width: '{stroke.stroke-thin}'
  input-chip-focus-ring-width: '{stroke.stroke-thick}'
  input-chip-focus-ring-color: '{colors.color-line-focus}'
  # sizes
  input-chip-container-height: '{control.control-md}'
  input-chip-container-padding-y: '{space.space-2xs}'
  input-chip-container-padding-x: '{space.space-sm}'
  input-chip-container-gap: '{space.space-sm}'
  input-chip-label-font: '{typography.type-label-medium}'
  input-chip-icon-size: '{icon.icon-size-small}'
  input-chip-touch-target-size-minimum: '{control.control-target-min}'
---

# Input Chip

> Represents a person, entity or value someone has entered or picked, such as a message recipient, so it can be reviewed and removed without retyping.

## Anatomy
1. Container — horizontal row hugging its content, at least `--input-chip-container-height` tall. Carries the background, the border and the radius; parts sit `--input-chip-container-gap` apart.
2. Avatar (optional) — an [Avatar](../atoms/avatar.md) at its xxxsmall size, with status, ring and close all off, so only the face or initials shows. Its swatch stays changeable per chip.
3. Label — the value itself, usually a name or a term.
4. Remove control — a `close` [Icon](../atoms/icon.md) at `--input-chip-icon-size`, in the label colour. Always present; there is no property to hide it.

## Variants
| Avatar | Use for |
|---|---|
| on (default) | values that are people; makes a row of recipients scannable |
| off | values that aren't people, such as a tag or a typed term; the chip closes up around the label and remove control |

The border is `--input-chip-container-border-width` `--input-chip-container-border-color`, drawn inside the container so it adds no size.

Shape: rounded (default) → `--input-chip-container-radius-rounded` (pill) with zeta-icons-round; sharp → `--input-chip-container-radius-sharp` with zeta-icons-sharp. Match the field the chips sit in rather than deciding per chip. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Border | Foreground | Notes |
|---|---|---|---|---|
| enabled | `--input-chip-container-background-enabled` | `--input-chip-container-border-color` | `--input-chip-label-foreground` (label + remove) | resting state; the fill is transparent, so the field shows through |
| hover | `--input-chip-container-background-hover` | unchanged | unchanged | pointer devices only |
| focused | `--input-chip-container-background-enabled` | replaced by a `--input-chip-focus-ring-width` `--input-chip-focus-ring-color` ring drawn outside | unchanged | the only state with a visible outline; nothing reflows |
| disabled | `--input-chip-container-background-disabled` | none | `--input-chip-label-foreground-disabled` (label + remove) | the value is fixed; not interactive |

Every state change is an instant colour swap: no transition is authored. Removal is not a state; what activating the remove control does, and whether the value can be restored, belongs to the implementation.

## Spacing & Sizing
| Property | Token |
|---|---|
| Minimum height | `--input-chip-container-height` |
| Padding (V / H) | `--input-chip-container-padding-y` / `--input-chip-container-padding-x` |
| Gap | `--input-chip-container-gap` |
| Font | `--input-chip-label-font` |
| Remove control | `--input-chip-icon-size` |
| Avatar | the Avatar's xxxsmall size |

Width hugs the avatar, label and remove control, and the height grows with the text size ([patterns 5.37](../patterns/05-sizes-devices.md)). The label is a value someone entered, so a long one may truncate at the field's width: names at the end, identifiers in the middle, with the full value on hover and on focus ([patterns 5.30–5.31](../patterns/05-sizes-devices.md)). The remove glyph is small; give it a hit area of at least `--input-chip-touch-target-size-minimum`.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text | — |
| Avatar | on / off (swatch, photo or initials per Avatar) | on |
| Rounded | on (pill) / off (sharp) | on |
| Disabled | on / off | off |

Hover and focus are driven by interaction, never set on a static layout.

## Usage
- Use one chip per value, inside the field the value was entered in. A row of chips is how someone checks what they have picked.
- Turn the avatar off for values that aren't people; a placeholder face on a tag is worse than none. Leave it on only when every chip in the field can supply one, or the row reads as misaligned.
- Keep the label to the entity itself. A chip that needs explaining belongs in the field's hint.
- Don't use an input chip to filter a list; that is a [Filter Chip](../atoms/filter-chip.md), and the remove icon here promises deletion rather than toggling.
- In a [Combobox](./combobox.md) that takes several values, each chosen value is an input chip.
- Don't leave a chip disabled without saying why nearby: the remove control stays visible, so it reads as broken rather than locked.

## Accessibility
- The remove control is a button with no text. Its accessible name must include the value it removes (Remove Lena Braun, not Remove).
- Removing a chip changes what the field contains; announce it (a live region) and move focus to a neighbouring chip or the field, so a keyboard user doesn't lose their place.
- The focus ring (`--input-chip-focus-ring-width` `--input-chip-focus-ring-color`) is drawn outside the chip; check the field around it doesn't clip it.
- Disabled chips drop the border and rely on `--input-chip-container-background-disabled` and `--input-chip-label-foreground-disabled` alone; check both against the field background.
- The label (`--input-chip-label-font`) carries the actual value; don't set it smaller. A truncated label exposes the full value as the chip's accessible name.
- The avatar is decorative here (the label names the person); hide it from assistive tech.

## Claude Prompt
Draw a Zebra input chip: a `--input-chip-container-height`-tall transparent pill with a thin `--input-chip-container-border-width` light-grey (`--input-chip-container-border-color`) outline and `--input-chip-container-padding-x` side padding, holding a tiny circular avatar with initials on the left, a short near-black (`--input-chip-label-foreground`) name in `--input-chip-label-font`, and a `--input-chip-icon-size` close "×" icon on the right, each `--input-chip-container-gap` apart. Hover tints it faintly grey (`--input-chip-container-background-hover`); a disabled chip is flat light grey `--input-chip-container-background-disabled` with grey text and no outline. Show several chips wrapped inside a text field, as message recipients.
