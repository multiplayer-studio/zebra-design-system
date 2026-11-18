---
name: Select
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ./dropdown-menu.md, ../atoms/icon.md, ../atoms/ai-mark.md]
tokens:
  # field: default flavour
  select-field-background-enabled: '{colors.color-fill-default}'
  select-field-background-disabled: '{colors.color-fill-disabled}'
  select-field-border-color-enabled: '{colors.color-line-strong}'
  select-field-border-color-hover: '{colors.color-line-stronger}'
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
  select-ghost-field-border-color: '{colors.color-line-contrast-brand}'
  select-ghost-field-border-width: '{stroke.stroke-thin}'
  # text and icons
  select-placeholder-foreground: '{colors.color-ink-medium}'
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

> A form control for choosing one option from a short list: a label, a hint, an error line and a field that opens a dropdown menu.

## Anatomy
The assembly reads label, hint, error, field, as [Input](./input.md) does ([patterns 1.124](../patterns/01-screen-composition.md)):

1. Label (optional) — an [Input Label](../atoms/input-label.md) above everything else. It names the field and carries the "(required)" or "(optional)" marker and the information icon.
2. Hint (optional) — an [Input Hint](../atoms/input-hint.md), Type default, under the label and above the field. It stays when an error shows.
3. Error (invalid only) — a second [Input Hint](../atoms/input-hint.md), Type error, on its own line between the hint and the field, saying how to fix the problem ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Field — the control (Figma's Select Field). Fills the assembly's width and carries the background, border and radius:
   - Leading icon (optional) — an [Icon](../atoms/icon.md) at `--select-icon-size-medium`, off by default.
   - Display text — the placeholder until a value is chosen, then the value, in a wrapper with `--select-text-padding-x` each side. It fills whatever width the icons leave, and wraps rather than truncating.
   - Chevron — an [Icon](../atoms/icon.md), always present: `expand_more` while closed, `expand_less` while open.
5. Menu (open only) — a [Dropdown Menu](./dropdown-menu.md), Rounded on, positioned absolutely `--select-menu-offset` below the field and at least as wide as it. It overlaps whatever is below; the assembly doesn't grow. Its rows are [Menu Items](./menu-item.md), one per option; the chosen one is selected and shows its check, not the tint alone ([patterns 6.11](../patterns/06-accessibility.md)).

The field is used on its own wherever no label or hint is needed, e.g. a table footer's rows-per-page control.

## Variants
Flavour (light mode shown by the tokens; dark and AAA follow automatically):

| Flavour | Background | Border | Use |
|---|---|---|---|
| default | `--select-field-background-enabled` | `--select-field-border-width` `--select-field-border-color-enabled` | inside a form |
| gradient | `--select-field-background-enabled` | `--select-field-border-width` 90° gradient `--select-gradient-field-border-color-start` → `--select-gradient-field-border-color-end`; hover `--select-gradient-field-border-color-hover`; open `--select-gradient-field-border-color-open` | a value the AI chose (DESIGN.md §3), always with an [AI Mark](../atoms/ai-mark.md) beside the label ([DESIGN.md §3 Data and gradient](../DESIGN.md)) |
| ghost | `--select-ghost-field-background-enabled` | `--select-ghost-field-border-width` `--select-ghost-field-border-color` (transparent except in the AAA modes, `--color-line-contrast-brand`) | a surface that already bounds the field |

Gradient's focus, invalid, read-only and disabled borders are the default flavour's. Once the person picks another value, the field returns to default ([DESIGN.md §3 Data and gradient](../DESIGN.md)).

Shape: sharp → `--select-field-radius-sharp`; rounded (default) → `--select-field-radius-rounded`; full → `--select-field-radius-full` (pill). In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Border | Text | Chevron |
|---|---|---|---|---|
| enabled | `--select-field-background-enabled` | `--select-field-border-width` `--select-field-border-color-enabled` | placeholder `--select-placeholder-foreground` | down, `--select-icon-foreground` |
| hover | unchanged | `--select-field-border-color-hover` | unchanged | unchanged |
| focus | unchanged | `--select-field-border-width-focused` `--select-field-border-color-focused` | placeholder | down |
| open | unchanged | `--select-field-border-width-focused` `--select-field-border-color-open` | value or placeholder | up; the menu shows |
| filled | unchanged | `--select-field-border-color-enabled` | value `--select-value-foreground` | down |
| invalid | unchanged | `--select-field-border-color-invalid` | value `--select-value-foreground` | down; the error line shows |
| read-only | unchanged | `--select-field-border-color-read-only` | value `--select-value-foreground` | down; still focusable and selectable, the menu doesn't open |
| disabled | `--select-field-background-disabled` (ghost `--select-ghost-field-background-disabled`) | `--select-field-border-color-disabled` | `--select-value-foreground-disabled` | `--select-icon-foreground-disabled`, as every icon |

No transition is defined: each state swaps border colour and weight, text colour and, at open, the chevron's direction. The border sits inside the field, so focus's heavier border adds no size. Invalid changes the border and adds the error line; the hint stays. On the assembly, invalid and disabled are set once and passed down, as on [Input](./input.md): invalid sets the field to invalid and shows the error line; disabled sets the field to disabled, the label to Disabled and the hint to disabled. Read-only, hover, focus and open belong to the field alone; the label stays at full strength. A disabled field follows [Input](./input.md)'s rule for staying focusable.

## Spacing & Sizing
| Size | Minimum height | Padding (V / H) | Font | Icons |
|---|---|---|---|---|
| small | `--select-field-height-small` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-small` | `--select-icon-size-small` |
| medium (default) | `--select-field-height-medium` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-medium` | `--select-icon-size-medium` |
| large | `--select-field-height-large` | `--select-field-padding-y` / `--select-field-padding-x` | `--select-value-font-large` | `--select-icon-size-large` |

Padding is the same at every size; small is the only size that also reduces the text. The heights are minimums: a value that wraps, or a larger text size, makes the field taller ([patterns 5.37](../patterns/05-sizes-devices.md)). Icons, text and chevron sit `--select-field-gap` apart. The label, hint, error and field stack `--select-container-gap` apart; turning the label or hint off removes its height, and the error line takes height only while invalid. The field fills the assembly's width (Figma draws it 280 wide); the label, hint and error wrap at that width. The open menu sits `--select-menu-offset` below the field and doesn't count toward the assembly's height, so reserve z-order and room for it.

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
| Hint icon | on / off | on |
| Error text | text (shown while invalid) | — |
| Placeholder, value, options | text | Select an option |

Hover, focus and open are driven by interaction (open also by the Open property), never set on a static layout. The label type is set on the [Input Label](../atoms/input-label.md); the hint and error lines are [Input Hints](../atoms/input-hint.md) at Type default and error. Compact is set on the nested [Dropdown Menu](./dropdown-menu.md) and tightens its inset (`--dropdown-menu-panel-padding-compact`); keep it for cramped placements such as a table footer. Option labels, the value and the hint text come from the implementation.

## Usage
- Use Select to choose one option from a known list of about six to ten, where there's no room to show them all. Five or fewer stay visible as radios or a [Segmented Control](./segmented-control.md), and two options are never collapsed into a Select ([patterns 3.16](../patterns/03-controls-interaction.md)). A longer list, or one people should type to filter, is a [Combobox](./combobox.md) ([patterns 3.33](../patterns/03-controls-interaction.md)). For a list of actions use [Dropdown Menu](./dropdown-menu.md).
- Order options the way people expect to find them: a natural order where one exists, otherwise alphabetical ([patterns 3.19](../patterns/03-controls-interaction.md)).
- A question the person must answer starts with no option chosen; a setting shows its current value ([patterns 3.27](../patterns/03-controls-interaction.md)).
- Keep Show Label on. The placeholder disappears once a value is chosen, leaving nothing to name the field.
- Never set invalid without an error line that says how to fix it; the hint stays ([patterns 1.64](../patterns/01-screen-composition.md)).
- Use read-only where a person still needs to read or copy the value, and disabled where they don't.
- Use gradient only for a value the AI chose, with an [AI Mark](../atoms/ai-mark.md). Use ghost only on a surface that already bounds the field.
- Inside scrolling or clipped containers (dialogs, tables) the menu must float above the container rather than be cut off ([patterns 3.77](../patterns/03-controls-interaction.md)).
- Write labels noun-first in sentence case; the hint follows [patterns 7.29](../patterns/07-content-copy.md).

## Accessibility
- The label is the accessible name. A select with Show Label off still needs one through `aria-label` or `aria-labelledby`; the placeholder is never the name ([patterns 6.47](../patterns/06-accessibility.md)).
- Keyboard: Space, Enter or Alt+Down opens the menu with focus on the chosen option, arrow keys move between options, Enter commits and Escape closes it and returns focus to the field. Typing a letter jumps to the next option that starts with it, open or closed ([patterns 3.37](../patterns/03-controls-interaction.md)).
- Associate the menu with the field through `aria-haspopup="listbox"`, `aria-expanded` and `aria-controls`; each row is `role="option"` and the chosen one `aria-selected="true"`.
- In the label, mark the minority in words: "(required)" where required fields are fewer, "(optional)" where most are required, never an asterisk alone ([patterns 7.31](../patterns/07-content-copy.md)); set `aria-required="true"` on required fields too.
- Tie the hint and the error line to the field with `aria-describedby` and set `aria-invalid` while invalid, otherwise the reason is announced as loose text.
- Read-only and disabled look alike but behave differently: read-only stays reachable and selectable.
- The leading icon and the chevron carry no text; the chevron's name says it opens the options. Small and medium are below the touch minimum; on touch products use large or extend the hit area ([patterns 6.16](../patterns/06-accessibility.md)).
- Disabled dims the label and hint with the field, so a disabled field never sits under a full-strength label.

## Claude Prompt
Draw a form field: a near-black "Field name" label, a small grey hint line with an info icon under it, then `--select-container-gap` below a white box (`--select-field-background-enabled`) `--select-field-height-medium` tall with a `--select-field-border-width` mid grey (`--select-field-border-color-enabled`) border, `--select-field-radius-rounded` corners and `--select-field-padding-x` side padding, holding grey placeholder text "Select an option" (`--select-placeholder-foreground`) in `--select-value-font-medium` and a near-black `--select-icon-size-medium` chevron pointing down at the far right. Show a second copy opened: the border thickens to `--select-field-border-width-focused` soft blue (`--select-field-border-color-open`), the chevron points up, the value reads "Dock 3" in near-black (`--select-value-foreground`), and `--select-menu-offset` below the field a white floating menu of the same width with `--dropdown-menu-panel-radius-rounded` corners and a soft shadow (`--dropdown-menu-panel-shadow`) lists the options as plain rows, the chosen one tinted pale blue with a check mark.
