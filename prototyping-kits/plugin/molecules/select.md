---
name: Select
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ./dropdown-menu.md, ../atoms/icon.md]
tokens:
  # field: default flavour
  select-field-background-enabled: '{colors.color-fill-default}'
  select-field-background-disabled: '{colors.color-fill-disabled}'
  select-field-border-color-enabled: '{colors.color-line-default}'
  select-field-border-color-hover: '{colors.color-line-strong}'
  select-field-border-color-focused: '{colors.color-line-focus}'
  select-field-border-color-open: '{colors.color-line-focus}'
  select-field-border-color-invalid: '{colors.color-status-error-default}'
  select-field-border-color-read-only: '{colors.color-line-subtle}'
  select-field-border-color-disabled: '{colors.color-line-subtle}'
  # gradient
  select-gradient-field-border-color-start: '{colors.color-gradient-strong-start}'
  select-gradient-field-border-color-end: '{colors.color-gradient-strong-end}'
  select-gradient-field-border-color-hover: '{colors.color-gradient-strong-end}'
  select-gradient-field-border-color-open: '{colors.color-gradient-strong-start}'
  # ghost
  select-ghost-field-background-enabled: '{colors.color-status-ghost-default}'
  select-ghost-field-background-disabled: '{colors.color-status-ghost-default}'
  select-ghost-field-border-color: '{colors.color-brand-primary-default}'
  select-ghost-field-border-width: '{stroke.stroke-base}'
  # text and icons
  select-placeholder-foreground: '{colors.color-ink-disabled}'
  select-value-foreground: '{colors.color-ink-high}'
  select-value-foreground-disabled: '{colors.color-ink-disabled}'
  select-icon-foreground: '{colors.color-ink-high}'
  select-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # border
  select-field-border-width: '{stroke.stroke-thin}'
  select-field-border-width-focused: '{stroke.stroke-thick}'
  # shape
  select-field-radius-sharp: '{radius.radius-none}'
  select-field-radius-rounded: '{radius.radius-sm}'
  select-field-radius-full: '{radius.radius-pill}'
  # sizes
  select-field-height-small: '{control.control-sm}'
  select-field-height-medium: '{control.control-md}'
  select-field-height-large: '{control.control-lg}'
  select-field-padding-y: '{space.space-sm}'
  select-field-padding-x: '{space.space-md}'
  select-field-gap: '{space.space-2xs}'
  select-text-padding-x: '{space.space-2xs}'
  select-value-font-small: '{typography.type-body-small}'
  select-value-font-medium: '{typography.type-body-medium}'
  select-value-font-large: '{typography.type-body-medium}'
  select-icon-size-small: '{icon.icon-size-small}'
  select-icon-size-medium: '{icon.icon-size-medium}'
  select-icon-size-large: '{icon.icon-size-medium}'
  # assembly
  select-container-gap: '{space.space-xs}'
  select-menu-offset: '{space.space-2xs}'
---

# Select

> A form control for choosing one option from a list: a label, a field that opens a dropdown menu, and a hint.

## Anatomy
1. Label (optional) — an [Input Label](../atoms/input-label.md) above the field. It names the field and carries the required or optional marker and the information icon.
2. Field — the control (Figma's Select Field). Fills the assembly's width and carries the background, border and radius:
   - Leading icon (optional) — an [Icon](../atoms/icon.md) at `--select-icon-size-medium`, off by default.
   - Display text — the placeholder until a value is chosen, then the value, in a wrapper with `--select-text-padding-x` each side. It fills whatever width the icons leave.
   - Chevron — an [Icon](../atoms/icon.md), always present: `expand_more` while closed, `expand_less` while open.
3. Hint (optional) — an [Input Hint](../atoms/input-hint.md) below the field: guidance at rest, the validation reason when its type is error.
4. Menu (open only) — a [Dropdown Menu](./dropdown-menu.md), Rounded on, positioned absolutely `--select-menu-offset` below the field and as wide as it. It overlaps the hint and whatever is below; the assembly doesn't grow. Its rows are [Menu Items](./menu-item.md), one per option.

The field is used on its own wherever no label or hint is needed, e.g. a table footer's rows-per-page control.

## Variants
Flavour (light mode shown by the tokens; dark and AAA follow automatically):

| Flavour | Background | Border | Use |
|---|---|---|---|
| default | `--select-field-background-enabled` | `--select-field-border-width` `--select-field-border-color-enabled` | inside a form |
| gradient | `--select-field-background-enabled` | `--select-field-border-width` 90° gradient `--select-gradient-field-border-color-start` → `--select-gradient-field-border-color-end`; hover `--select-gradient-field-border-color-hover`; open `--select-gradient-field-border-color-open` | an AI field, such as an AI companion (DESIGN.md §3) |
| ghost | `--select-ghost-field-background-enabled` | `--select-ghost-field-border-width` `--select-ghost-field-border-color` (a theming hook that draws nothing in the standard modes) | a surface that already bounds the field |

Gradient's focus, invalid, read-only and disabled borders are the default flavour's.

Shape: sharp → `--select-field-radius-sharp`; rounded (default) → `--select-field-radius-rounded`; full → `--select-field-radius-full` (pill). In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Border | Text | Chevron |
|---|---|---|---|---|
| enabled | `--select-field-background-enabled` | `--select-field-border-width` `--select-field-border-color-enabled` | placeholder `--select-placeholder-foreground` | down, `--select-icon-foreground` |
| hover | unchanged | `--select-field-border-color-hover` | unchanged | unchanged |
| focus | unchanged | `--select-field-border-width-focused` `--select-field-border-color-focused` | placeholder | down |
| open | unchanged | `--select-field-border-width-focused` `--select-field-border-color-open` | value or placeholder | up; the menu shows |
| filled | unchanged | `--select-field-border-color-enabled` | value `--select-value-foreground` | down |
| invalid | unchanged | `--select-field-border-color-invalid` | value `--select-value-foreground` | down; the hint switches to error |
| read-only | unchanged | `--select-field-border-color-read-only` | value `--select-value-foreground` | down; still focusable and selectable, the menu doesn't open |
| disabled | `--select-field-background-disabled` (ghost `--select-ghost-field-background-disabled`) | `--select-field-border-color-disabled` | `--select-value-foreground-disabled` | `--select-icon-foreground-disabled`, as every icon; out of the tab order |

No transition is defined: each state swaps border colour and weight, text colour and, at open, the chevron's direction. The border sits inside the field, so focus's heavier border adds no size. Invalid changes the border only; the hint's error type carries the reason, and neither implies the other. On the assembly, invalid and disabled are set once and passed down, as on [Input](./input.md): invalid sets the field to invalid and the hint to error; disabled sets the field to disabled, the label to Disabled and the hint to disabled. Read-only, hover, focus and open belong to the field alone; the label stays at full strength.

## Spacing & Sizing
| Size | Height | Padding (V / H) | Font | Icons |
|---|---|---|---|---|
| small | `--select-field-height-small` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-small` | `--select-icon-size-small` |
| medium (default) | `--select-field-height-medium` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-medium` | `--select-icon-size-medium` |
| large | `--select-field-height-large` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-large` | `--select-icon-size-large` |

Padding is the same at every size, so height alone carries the density; small is the only size that also reduces the text. Icons, text and chevron sit `--select-field-gap` apart. The label, field and hint stack `--select-container-gap` apart; turning the label or hint off removes its height and everything below moves up. The field fills the assembly's width (Figma draws it 280 wide); the label and hint hug their content. The open menu sits `--select-menu-offset` below the field, matches its width and doesn't count toward the assembly's height, so reserve z-order and room for it.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| Flavour | default, gradient, ghost | default |
| State | enabled, hover, focus, open, filled, invalid, read-only, disabled | enabled |
| Leading icon | on / off, any icon | off |
| Open | on / off | off |
| Compact (menu) | on / off | off |
| Show Label | on / off | on |
| Label type | default, optional, required | default |
| Label information icon | on / off | off |
| Show Hint | on / off | on |
| Hint type | default, error, disabled | default |
| Hint icon | on / off | on |
| Placeholder, value, options | text | Select an option |

Hover, focus and open are driven by interaction (open also by the Open property), never set on a static layout. The label and hint types are set on the [Input Label](../atoms/input-label.md) and [Input Hint](../atoms/input-hint.md) themselves; Compact is set on the nested [Dropdown Menu](./dropdown-menu.md) and tightens its inset (`--dropdown-menu-panel-padding-compact`). Option labels, the value and the hint text come from the implementation.

## Usage
- Use Select to choose one option from a known list; there is no typing or multi-select. For a list of actions use [Dropdown Menu](./dropdown-menu.md).
- Keep Show Label on. The placeholder disappears once a value is chosen, leaving nothing to name the field.
- Keep Show Hint on for any field that can fail validation, so the space is reserved and an error message doesn't shift the layout.
- Set the field to invalid and the hint to error together: the border carries the signal and the hint the reason.
- Use read-only where a person still needs to read or copy the value, and disabled where they don't.
- Use gradient only for a field to do with AI; on an ordinary field it spends the signal for nothing. Use ghost only on a surface that already bounds the field.
- Inside scrolling or clipped containers (dialogs, tables) the menu must float above the container rather than be cut off.
- Write labels noun-first in sentence case, and keep the hint to one line at the field's width.

## Accessibility
- The label is the accessible name. A select with Show Label off still needs one through `aria-label` or `aria-labelledby`; the placeholder is never the name.
- Keyboard: Space, Enter or Alt+Down opens the menu, arrow keys move between options, Enter commits and Escape closes it and returns focus to the field.
- Associate the menu with the field through `aria-haspopup="listbox"`, `aria-expanded` and `aria-controls`; each row is `role="option"` and the chosen one `aria-selected="true"`.
- The required marker is an asterisk and a colour; set `aria-required="true"` too.
- Tie the hint to the field with `aria-describedby` (or a live region for errors), otherwise the reason is announced as loose text.
- Read-only and disabled look alike but behave differently: read-only stays reachable and selectable, disabled leaves the tab order.
- The leading icon and the chevron carry no text; the chevron's name says it opens the options. At small, check the field still offers a large enough target.
- Disabled dims the label and hint with the field, so a disabled field never sits under a full-strength label.

## Claude Prompt
Draw a form field: a near-black "Field name" label, then `--select-container-gap` below it a white box (`--select-field-background-enabled`) `--select-field-height-medium` tall with a `--select-field-border-width` light grey (`--select-field-border-color-enabled`) border, `--select-field-radius-rounded` corners and `--select-field-padding-x` side padding, holding grey placeholder text "Select an option" (`--select-placeholder-foreground`) in `--select-value-font-medium` and a near-black `--select-icon-size-medium` chevron pointing down at the far right. Below, a small grey hint line with an info icon. Show a second copy opened: the border thickens to `--select-field-border-width-focused` soft blue (`--select-field-border-color-open`), the chevron points up, the value reads "Dock 3" in near-black (`--select-value-foreground`), and `--select-menu-offset` below the field a white floating menu of the same width with `--dropdown-menu-panel-radius-rounded` corners and a soft shadow (`--dropdown-menu-panel-shadow`) lists the options as plain rows, the chosen one tinted pale blue.
