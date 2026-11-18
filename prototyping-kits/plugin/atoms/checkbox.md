---
name: Checkbox
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # box, unchecked
  checkbox-box-background: '{colors.color-fill-transparent}'
  checkbox-box-border-color-enabled: '{colors.color-line-strong}'
  checkbox-box-border-color-hover: '{colors.color-line-stronger}'
  checkbox-box-border-color-disabled: '{colors.color-line-subtle}'
  # box, checked / indeterminate
  checkbox-box-background-selected: '{colors.color-brand-primary-default}'
  checkbox-box-background-selected-hover: '{colors.color-brand-primary-strong}'
  checkbox-box-background-selected-disabled: '{colors.color-fill-disabled}'
  checkbox-box-border-color-selected: '{colors.color-brand-primary-default}'
  checkbox-box-border-color-selected-hover: '{colors.color-line-stronger}'
  checkbox-box-border-color-selected-disabled: '{colors.color-line-subtle}'
  checkbox-mark-foreground: '{colors.color-ink-always-white}'
  # label
  checkbox-label-foreground: '{colors.color-ink-high}'
  checkbox-label-foreground-disabled: '{colors.color-ink-disabled}'
  checkbox-label-font: '{typography.type-label-medium}'
  # focus
  checkbox-focus-ring-width: '{stroke.stroke-thick}'
  checkbox-focus-ring-color: '{colors.color-line-focus}'
  checkbox-transition: '{motion.motion-feedback}'
  # sizes
  checkbox-target-size: '{control.control-target-min}'
  checkbox-container-gap: '{space.space-none}'
  checkbox-box-border-width: '{stroke.stroke-thick}'
  checkbox-box-size-large: '{control.control-xs}'
  checkbox-box-size-medium: '{control.control-icon-sm}'
  checkbox-box-radius-large: '{radius.radius-element-sm}'
  checkbox-box-radius-medium: '{radius.radius-xs}'
  checkbox-mark-size-large: '{icon.icon-size-medium}'
  checkbox-mark-size-medium: '{icon.icon-size-xsmall}'
---

# Checkbox

> A square control that turns a single option on or off, with an optional label; a parent that summarises others can also show indeterminate.

## Anatomy
1. Touch target — a fixed `--checkbox-target-size` square holding the box, centred. It is the pressable area, and it supplies the space between the box and the label on its own.
2. Box — the square itself, with a `--checkbox-box-border-width` border at every state and the fill once checked. The mark sits inside it rather than replacing it.
3. Mark — an [Icon](../atoms/icon.md) in `--checkbox-mark-foreground`: a check mark when checked, a dash when indeterminate, absent when unchecked. The checkbox chooses the glyph and its size; it is not a slot. The mark is **perfectly centred** on the box: centre it on the box itself (absolute position with a centring transform, or the platform's equivalent), never with flow layout, which pushes an oversized mark down and to the right.
4. Label (optional) — the option's name in `--checkbox-label-font`, directly beside the target with no gap (`--checkbox-container-gap`). It extends the area a person can aim at.

## Variants
| Size | Box | Box radius | Mark | Target |
|---|---|---|---|---|
| large (default) | `--checkbox-box-size-large` square | `--checkbox-box-radius-large` | `--checkbox-mark-size-large` | `--checkbox-target-size` |
| medium | `--checkbox-box-size-medium` square | `--checkbox-box-radius-medium` | `--checkbox-mark-size-medium` | `--checkbox-target-size` |

The size follows the product's density: large in a standard-density product, medium in a dense one, the same on every page ([patterns 5.45](../patterns/05-sizes-devices.md)). The target doesn't shrink with the box, so medium is no harder to hit. The corner radius softens in proportion to the box.

Checked has three values on one axis: off, on and indeterminate. A control can never be two of them at once.

## States
| State | Box background | Box border | Mark | Label |
|---|---|---|---|---|
| unchecked | `--checkbox-box-background` | `--checkbox-box-border-color-enabled` | none | `--checkbox-label-foreground` |
| unchecked hover | `--checkbox-box-background` | `--checkbox-box-border-color-hover` | none | unchanged |
| checked / indeterminate | `--checkbox-box-background-selected` | `--checkbox-box-border-color-selected` | check / dash, `--checkbox-mark-foreground` | `--checkbox-label-foreground` |
| checked / indeterminate hover | `--checkbox-box-background-selected-hover` | `--checkbox-box-border-color-selected-hover` | unchanged | unchanged |
| focused | unchanged | unchanged, with a `--checkbox-focus-ring-width` `--checkbox-focus-ring-color` ring drawn over it at the box's own size | unchanged | unchanged |
| disabled, unchecked | `--checkbox-box-background` | `--checkbox-box-border-color-disabled` | none | `--checkbox-label-foreground-disabled` |
| disabled, checked / indeterminate | `--checkbox-box-background-selected-disabled` | `--checkbox-box-border-color-selected-disabled` | stays visible, `--checkbox-mark-foreground` | `--checkbox-label-foreground-disabled` |

Every state is a change of border, fill and mark over `--checkbox-transition` (the check feedback timing). The focus ring sits on the box rather than outside it, so gaining focus doesn't change the footprint or shift anything beside it. Disabled keeps the mark, so a disabled checkbox still reports its value.

## Spacing & Sizing
| Size | Target | Box | Border | Mark | Label font | Gap |
|---|---|---|---|---|---|---|
| large (default) | `--checkbox-target-size` square | `--checkbox-box-size-large` | `--checkbox-box-border-width` | `--checkbox-mark-size-large` | `--checkbox-label-font` | `--checkbox-container-gap` |
| medium | `--checkbox-target-size` square | `--checkbox-box-size-medium` | `--checkbox-box-border-width` | `--checkbox-mark-size-medium` | `--checkbox-label-font` | `--checkbox-container-gap` |

The target is the same at both sizes and the box is centred inside it, so a column of mixed sizes still aligns. Size moves the box and the mark, never the label. With the label off the control collapses to the target alone; with it on, the width hugs the label up to the available width, and a longer option name wraps, with the target aligned to its first line.

Icon size is a context override: the mark uses the icon atom's `--icon-size-medium` (large box) and `--icon-size-xsmall` (medium box) steps.

## Properties
| Property | Options | Default |
|---|---|---|
| Checked | false, true, indeterminate | false |
| Size | large, medium | large |
| Label | on / off, text | on |
| Disabled | on / off | off |

Hover and focus are driven by interaction, never set on a static layout. Indeterminate is set from the state of the children, never chosen by the user: nothing cycles into it.

## Usage
- Use where options are independent of each other: multi-select from a list, or a single on/off option submitted with a form (use a [Switch](../atoms/switch.md) for an immediate toggle) ([patterns 3.15](../patterns/03-controls-interaction.md)).
- Use [Radio Button](../atoms/radio-button.md) where exactly one option may win; a row of checkboxes gives no way to see that constraint before breaking it.
- Use indeterminate on a parent that summarises a mixed set of children, indented under it. Choosing a mixed parent selects all of them ([patterns 3.24](../patterns/03-controls-interaction.md)). Don't offer it as a third value someone can select.
- A "None" option sits last, after a [Divider](../atoms/divider.md). Choosing it clears the others, and choosing any other clears it ([patterns 3.25](../patterns/03-controls-interaction.md)).
- An opt-in checkbox starts unchecked ([patterns 3.26](../patterns/03-controls-interaction.md)).
- Keep the label on. Turn it off only where something else already names the option, such as a column header in a table.
- Checked is shown by fill and mark, not by colour alone ([patterns 6.11](../patterns/06-accessibility.md)).

## Accessibility
- The label is the control's name. With the label off, the name has to come from the surrounding structure (e.g. `aria-labelledby` pointing at the column header).
- Indeterminate is a third value, not a styling of checked: expose it as mixed (`indeterminate` / `aria-checked="mixed"`), or a mixed parent is announced as simply on or off.
- The `--checkbox-target-size` target is larger than the box at both sizes. Keep the whole square pressable, not only the box, and let the label extend it ([patterns 3.29](../patterns/03-controls-interaction.md)); in a list the whole row is the target.
- Say why an unavailable option is unavailable in nearby text ([patterns 6.6](../patterns/06-accessibility.md)).
- Disabled keeps the mark visible so the value stays readable. The mark keeps `--checkbox-mark-foreground` while the fill dims to `--checkbox-box-background-selected-disabled`, so check the mark still holds contrast there.
- Focus is a ring at the box's own size rather than an outset halo; check it reads against the state border beneath it, particularly on a busy surface.
- Where several checkboxes belong together, express the group and its name in the surrounding structure (`fieldset` and `legend`), because nothing in the control carries it.

## Claude Prompt
Draw a Zebra checkbox: a `--checkbox-box-size-large` square with a `--checkbox-box-border-width` mid-grey border (`--checkbox-box-border-color-enabled`), `--checkbox-box-radius-large` corners and no fill, centred in an invisible `--checkbox-target-size` target, with a `--checkbox-label-font` IBM Plex Sans label in near-black `--checkbox-label-foreground` directly beside the target. When checked the square fills solid Zebra blue `--checkbox-box-background-selected` with a white `--checkbox-mark-size-large` check mark (`--checkbox-mark-foreground`); indeterminate shows a white dash on the same blue. Hover darkens the border to `--checkbox-box-border-color-hover`, or the checked fill to `--checkbox-box-background-selected-hover`. Disabled boxes have a light grey border (`--checkbox-box-border-color-disabled`), a light grey fill when checked (`--checkbox-box-background-selected-disabled`) and grey label text (`--checkbox-label-foreground-disabled`). The medium size is a smaller `--checkbox-box-size-medium` box with `--checkbox-box-radius-medium` corners in the same target.
