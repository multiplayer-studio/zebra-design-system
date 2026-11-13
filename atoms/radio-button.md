---
name: Radio Button
level: atom
status: stable
composes: []
tokens:
  # ring
  radio-button-ring-border-color-enabled: '{colors.color-line-strong}'
  radio-button-ring-border-color-hover: '{colors.color-line-stronger}'
  radio-button-ring-border-color-selected: '{colors.color-brand-primary-default}'
  radio-button-ring-border-color-selected-hover: '{colors.color-line-stronger}'
  radio-button-ring-border-color-disabled: '{colors.color-line-subtle}'
  # dot (inner fill)
  radio-button-dot-background-selected: '{colors.color-brand-primary-default}'
  radio-button-dot-background-disabled: '{colors.color-fill-disabled}'
  # label
  radio-button-label-foreground: '{colors.color-ink-high}'
  radio-button-label-foreground-disabled: '{colors.color-ink-disabled}'
  radio-button-label-font: '{typography.type-label-medium}'
  # focus
  radio-button-focus-ring-width: '{stroke.stroke-thick}'
  radio-button-focus-ring-color: '{colors.color-line-focus}'
  # shape and sizes
  radio-button-ring-radius: '{radius.radius-pill}'
  radio-button-ring-border-width: '{stroke.stroke-thick}'
  radio-button-target-size: '{control.control-target-min}'
  radio-button-container-gap: '{space.space-none}'
  radio-button-ring-size-large: '{control.control-xs}'
  radio-button-ring-size-medium: '{control.control-icon-sm}'
  radio-button-ring-padding-large: '{space.space-2xs}'
  radio-button-ring-padding-medium: '{space.space-3xs}'
  radio-button-dot-size-large: '{control.control-icon-xs}'
  radio-button-dot-size-medium: '{control.control-icon-xxs}'
---

# Radio Button

> A circular control for choosing exactly one option from a set, with an optional label; choosing one deselects the others in its group.

## Anatomy
1. Touch target — a fixed `--radio-button-target-size` square holding the ring, centred. It is the pressable area and supplies the space between the ring and the label on its own.
2. Ring — a circle (`--radio-button-ring-radius`) with a `--radio-button-ring-border-width` border and no fill, coloured by Checked and State together.
3. Dot — a separate filled circle centred inside the ring, `--radio-button-ring-padding-large` in from the border; shown only when checked.
4. Label (optional) — the option's name in `--radio-button-label-font`, directly beside the target with no gap (`--radio-button-container-gap`).

## Variants
| Size | Ring | Ring padding | Dot | Target |
|---|---|---|---|---|
| large (default) | `--radio-button-ring-size-large` | `--radio-button-ring-padding-large` | `--radio-button-dot-size-large` | `--radio-button-target-size` |
| medium | `--radio-button-ring-size-medium` | `--radio-button-ring-padding-medium` | `--radio-button-dot-size-medium` | `--radio-button-target-size` |

Always circular; the radio button has no sharp variant. Only the ring and dot change with size: the target and the label stay the same.

## States
| State | Ring border | Dot | Label |
|---|---|---|---|
| unchecked | `--radio-button-ring-border-color-enabled` | hidden | `--radio-button-label-foreground` |
| unchecked hover | `--radio-button-ring-border-color-hover` | hidden | unchanged |
| checked | `--radio-button-ring-border-color-selected` | `--radio-button-dot-background-selected` | `--radio-button-label-foreground` |
| checked hover | `--radio-button-ring-border-color-selected-hover` | unchanged | unchanged |
| focused | unchanged, with a second `--radio-button-focus-ring-width` `--radio-button-focus-ring-color` ring drawn around it | follows Checked | unchanged |
| disabled | `--radio-button-ring-border-color-disabled` | `--radio-button-dot-background-disabled` when checked, otherwise hidden | `--radio-button-label-foreground-disabled` |

No transition is defined: every state is a colour and visibility swap, except focus, which adds a second ring rather than altering the existing one. Hover changes the ring colour only; the dot stays tied to Checked. The design file ships only an unchecked disabled variant (with its dot drawn in the disabled tone); in code show the disabled dot only when the option is checked, so a disabled radio still reports its value.

## Spacing & Sizing
| Size | Target | Ring | Border | Ring padding | Dot | Label font | Gap |
|---|---|---|---|---|---|---|---|
| large (default) | `--radio-button-target-size` square | `--radio-button-ring-size-large` | `--radio-button-ring-border-width` | `--radio-button-ring-padding-large` | `--radio-button-dot-size-large` | `--radio-button-label-font` | `--radio-button-container-gap` |
| medium | `--radio-button-target-size` square | `--radio-button-ring-size-medium` | `--radio-button-ring-border-width` | `--radio-button-ring-padding-medium` | `--radio-button-dot-size-medium` | `--radio-button-label-font` | `--radio-button-container-gap` |

Both ring sizes sit centred in the same target, so a column of mixed sizes still aligns. The dot fills the space inside the border and padding exactly. Removing the label collapses the control to its target; nothing else shifts.

## Properties
| Property | Options | Default |
|---|---|---|
| Checked | false, true | false |
| Size | large, medium | large |
| Label | on / off, text | on |
| Disabled | on / off | off |

Hover and focus are driven by interaction, never set on a static layout.

## Usage
- Use for a single choice from a short, fixed list of mutually exclusive options, presented as one group. A long or growing list is better served by a [Dropdown Menu](../molecules/dropdown-menu.md) or [Select](../molecules/select.md).
- Give every option its own radio button in the same group, with exactly one checked at a time; pre-select a sensible default where possible.
- Don't use a lone radio button for a yes/no choice; use a [Checkbox](../atoms/checkbox.md) or [Switch](../atoms/switch.md).
- Pair each radio with a label that states the option in full; the control alone doesn't say what is being chosen.
- Selection is shown by the dot, not colour alone.

## Accessibility
- Grouping is what makes exactly one option selectable, and nothing in the control carries it: group the radios in code (a shared `name` inside a `fieldset` with a `legend`, or `role="radiogroup"` with a name) so arrow keys move the choice and the group is announced.
- The label is the option's name. With the label off, the name has to come from nearby structure (`aria-label` or `aria-labelledby`).
- The `--radio-button-target-size` target is larger than the ring at both sizes. Keep the whole square pressable, and let the label extend it.
- Focus is the only visual record of keyboard interaction: a `--radio-button-focus-ring-width` `--radio-button-focus-ring-color` ring around the control.
- Disabled is visual only; say why the option is unavailable in nearby text.

## Claude Prompt
Draw a Zebra radio button: a `--radio-button-ring-size-large` circle with a `--radio-button-ring-border-width` mid-grey border (`--radio-button-ring-border-color-enabled`) and no fill, centred in an invisible `--radio-button-target-size` target, with a `--radio-button-label-font` IBM Plex Sans label in near-black `--radio-button-label-foreground` directly beside the target. When checked the ring turns Zebra blue (`--radio-button-ring-border-color-selected`) and a solid blue `--radio-button-dot-size-large` dot (`--radio-button-dot-background-selected`) sits in its centre. Hover darkens the ring to `--radio-button-ring-border-color-hover`, or to `--radio-button-ring-border-color-selected-hover` when checked. Disabled radios have a light grey ring (`--radio-button-ring-border-color-disabled`) and grey label text (`--radio-button-label-foreground-disabled`). The medium size is a smaller `--radio-button-ring-size-medium` ring with a `--radio-button-dot-size-medium` dot. Stack options vertically under a shared group label.
