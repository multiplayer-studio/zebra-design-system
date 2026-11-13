---
name: Input
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ../atoms/divider.md, ../atoms/icon.md]
tokens:
  # container (default flavour)
  input-container-background-enabled: '{colors.color-fill-default}'
  input-container-background-disabled: '{colors.color-fill-disabled}'
  input-container-border-color-enabled: '{colors.color-line-default}'
  input-container-border-color-hover: '{colors.color-line-strong}'
  input-container-border-color-focused: '{colors.color-line-focus}'
  input-container-border-color-selected: '{colors.color-line-focus}'
  input-container-border-color-typing: '{colors.color-line-focus}'
  input-container-border-color-filled: '{colors.color-line-default}'
  input-container-border-color-invalid: '{colors.color-status-error-default}'
  input-container-border-color-read-only: '{colors.color-line-subtle}'
  input-container-border-color-disabled: '{colors.color-line-subtle}'
  input-container-border-width: '{stroke.stroke-thin}'
  input-container-border-width-focused: '{stroke.stroke-thick}'
  # gradient flavour (other states as default)
  input-gradient-container-background-enabled: '{colors.color-fill-default}'
  input-gradient-container-border-color-start: '{colors.color-gradient-strong-start}'
  input-gradient-container-border-color-end: '{colors.color-gradient-strong-end}'
  input-gradient-container-border-color-hover: '{colors.color-gradient-strong-end}'
  input-gradient-container-border-color-selected: '{colors.color-gradient-strong-start}'
  input-gradient-container-border-color-typing: '{colors.color-gradient-strong-start}'
  # ghost flavour
  input-ghost-container-background-enabled: '{colors.color-status-ghost-default}'
  input-ghost-container-background-disabled: '{colors.color-status-ghost-default}'
  input-ghost-container-border-color: '{colors.color-brand-primary-default}'
  input-ghost-container-border-width: '{stroke.stroke-base}'
  # text
  input-value-foreground: '{colors.color-ink-high}'
  input-value-foreground-disabled: '{colors.color-ink-disabled}'
  input-placeholder-foreground: '{colors.color-ink-disabled}'
  input-cursor-foreground: '{colors.color-ink-brand}'
  input-value-font-small: '{typography.type-body-small}'
  input-value-font-medium: '{typography.type-body-medium}'
  input-value-font-large: '{typography.type-body-medium}'
  # icons and controls (leading, trailing, type control, clear)
  input-icon-foreground: '{colors.color-ink-high}'
  input-icon-foreground-disabled: '{colors.color-ink-disabled}'
  input-icon-size-small: '{icon.icon-size-small}'
  input-icon-size-medium: '{icon.icon-size-medium}'
  input-icon-size-large: '{icon.icon-size-medium}'
  input-control-focus-ring-width: '{stroke.stroke-thick}'
  input-control-focus-ring-color: '{colors.color-line-focus}'
  # trailing group (clear, divider, type control)
  input-trailing-gap: '{space.space-sm}'
  input-divider-height: '{control.control-icon-md}'
  # shape
  input-container-radius-sharp: '{radius.radius-none}'
  input-container-radius-rounded: '{radius.radius-sm}'
  input-container-radius-full: '{radius.radius-pill}'
  # sizes
  input-container-width: '{component-sizes.size-input-width}'
  input-container-height-small: '{control.control-sm}'
  input-container-height-medium: '{control.control-md}'
  input-container-height-large: '{control.control-lg}'
  input-container-padding-y: '{space.space-sm}'
  input-container-padding-x: '{space.space-md}'
  input-container-gap: '{space.space-2xs}'
  input-text-padding-x: '{space.space-2xs}'
  input-stack-gap: '{space.space-xs}'
  input-touch-target-size-minimum: '{control.control-target-min}'
---

# Input

> A single-line text field for text, numbers, passwords, dates and times, with an optional label above and hint below.

Input is the whole assembly (label, field, hint). The field on its own, with Show Label and Show Hint off, is what other components nest (Stepper Input, Date Picker).

## Anatomy
1. Label (optional) — [Input Label](../atoms/input-label.md), turned on by Show Label. Its marker, information icon and dimming are set on the label.
2. Field — the container: a horizontal row, `--input-container-height-medium` tall, carrying the background, border and radius. Its parts sit `--input-container-gap` apart.
   1. Leading icon (optional) — [Icon](../atoms/icon.md), `--input-icon-size-medium`, turned on by hasLeading. Text, number and password only.
   2. Input text — the placeholder, then the value, padded `--input-text-padding-x` each side. It fills whatever width the icons leave.
   3. Trailing position — empty on text until hasTrailing fills it; on the other types the control that defines the type (below). While typing, a clear control (`cancel`) joins it: the clear control, a vertical [Divider](../atoms/divider.md) `--input-divider-height` tall and the type control sit `--input-trailing-gap` apart.
3. Hint (optional) — [Input Hint](../atoms/input-hint.md), turned on by Show Hint: guidance at rest, the validation message when its Type is error.

The three parts stack `--input-stack-gap` apart. Turning the label or hint off removes its height, so the stack shortens.

Every icon and control in the field (leading, trailing, type control, clear) is an [Icon](../atoms/icon.md) drawn in `--input-icon-foreground`, the same as the value.

## Variants
**Type** chooses the placeholder and the trailing control:

| Type | Placeholder | Leading icon | Trailing control |
|---|---|---|---|
| text (default) | Placeholder | optional | none; hasTrailing adds any icon |
| number | 0 | optional | `dialpad`, toggled by hasTrailing |
| password | Password | optional | reveal: `visibility` (Figma's only glyph); swapping to `visibility_off` while revealed is code-only; always present |
| date | mm/dd/yyyy (the user's locale format) | none | calendar `calendar_3_day`, opens the [Date Picker](../organisms/date-picker.md); always present |
| time | --:-- -- (the user's locale format) | none | clock `clock_outline`, opens a time picker; always present |

**Flavour**

| Flavour | Background | Border |
|---|---|---|
| default | `--input-container-background-enabled` | `--input-container-border-width` `--input-container-border-color-enabled` |
| gradient | `--input-gradient-container-background-enabled` | `--input-container-border-width`, a 90° gradient `--input-gradient-container-border-color-start` → `--input-gradient-container-border-color-end` |
| ghost | `--input-ghost-container-background-enabled` (none) | `--input-ghost-container-border-width` `--input-ghost-container-border-color` (zero weight) |

Gradient marks a unique interaction such as an AI companion field. Ghost has no visible border, for a field on a surface that already bounds it. Its border is bound at zero weight as a theming hook, so a high-contrast theme can give it an outline.

**Shape**: sharp → `--input-container-radius-sharp`; rounded (default) → `--input-container-radius-rounded`; full → `--input-container-radius-full` (pill). Sharp fields use the zeta-icons-sharp glyphs. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Border | Text | Notes |
|---|---|---|---|
| enabled | `--input-container-border-width` `--input-container-border-color-enabled` | placeholder `--input-placeholder-foreground` | the resting empty field |
| hover | `--input-container-border-color-hover` (gradient `--input-gradient-container-border-color-hover`) | unchanged | pointer devices only; only the border answers |
| focus | `--input-container-border-width-focused` `--input-container-border-color-focused` | placeholder; cursor `--input-cursor-foreground` | keyboard focus; the heaviest border |
| selected | `--input-container-border-width` `--input-container-border-color-selected` (gradient `--input-gradient-container-border-color-selected`) | cursor `--input-cursor-foreground` | focus settled, cursor placed |
| typing | `--input-container-border-color-typing` (gradient `--input-gradient-container-border-color-typing`) | value `--input-value-foreground`, cursor | the clear control appears in the trailing position |
| filled | `--input-container-border-color-filled` (gradient: the resting gradient) | value `--input-value-foreground` | a committed value; the clear control goes |
| invalid | `--input-container-border-color-invalid` | value `--input-value-foreground` | set by the form; pair with the hint's error type |
| read-only | `--input-container-border-color-read-only` | value `--input-value-foreground` | value still legible and selectable; no clear control |
| disabled | `--input-container-border-color-disabled`, background `--input-container-background-disabled` (ghost `--input-ghost-container-background-disabled`) | value `--input-value-foreground-disabled`; every icon `--input-icon-foreground-disabled` | out of the tab order |

Focus, invalid, read-only and disabled look the same on every flavour except ghost, which keeps its zero-weight border in every state. The run through enabled, focus, selected, typing and filled is driven by interaction; invalid and read-only are set by the form. No transition is defined: each state swaps border colour, border weight, text colour and, at typing, the clear control.

On the assembly, invalid and disabled are set once and passed down: invalid sets the field to invalid and the hint to error; disabled sets the field to disabled, the label to Disabled and the hint to disabled. Read-only, hover, focus and typing belong to the field alone; the label stays at full strength.

## Spacing & Sizing
| Size | Height | Padding (V / H) | Value font | Icons |
|---|---|---|---|---|
| small | `--input-container-height-small` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-small` | `--input-icon-size-small` |
| medium (default) | `--input-container-height-medium` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-medium` | `--input-icon-size-medium` |
| large | `--input-container-height-large` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-large` | `--input-icon-size-large` |

The field and the assembly are `--input-container-width` wide by default; the field fills the width of the stack while the label and hint hug their content, so only the field tracks the container. Padding holds across all sizes, so height alone carries the density. Each icon shown takes its own size plus `--input-container-gap` from the text. The stack gap is `--input-stack-gap` between label, field and hint.

Icon size is a context override: fields use the Icon's `--icon-size-medium` step, and `--icon-size-small` at small.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | text, number, password, date, time | text |
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| Flavour | default, gradient, ghost | default |
| State | enabled, hover, focus, selected, typing, filled, invalid, read-only, disabled | enabled |
| hasLeading | on / off (text, number, password) | off |
| hasTrailing | on / off (text, number) | off |
| Show Label | on / off | on |
| Show Hint | on / off | on |
| Placeholder / value | text | per type |

Label Type, Disabled, Show Information and Show Sub Label are set on the [Input Label](../atoms/input-label.md); Hint Type and Show Icon on the [Input Hint](../atoms/input-hint.md). Hover, focus, selected and typing are driven by interaction, never set on a static layout.

## Usage
- Pick the type that matches the value; the placeholder and trailing control tell people what is expected before they type.
- Keep Show Label on. Use the field without a label only where something nearby already names it, and still give it an accessible name.
- Move the field to invalid and the hint to error together: the border is the signal, the hint is the reason.
- Don't turn Show Hint off on a field that can fail validation; adding the line later pushes everything below it down.
- Use read-only where people still need to read or copy the value, and disabled where they don't.
- Don't leave the parts on different states; a full-strength label over a disabled field reads as a mistake.
- Use default inside forms, ghost on a surface that already bounds the field, and gradient for one special interaction only.
- State 12- or 24-hour expectations in the hint of a time field.
- Use leading icons only where they say something the placeholder cannot.
- Show only one clear control: hide the platform's own clear and picker buttons.
- Touch target: small (`--input-container-height-small`) is below `--input-touch-target-size-minimum`; check the trailing controls still have a large enough target.

## Accessibility
- The field has no name of its own. The [Input Label](../atoms/input-label.md) supplies it; without a visible label, give the field an accessible name. A placeholder is not a label.
- Invalid changes only the border colour. Associate the [Input Hint](../atoms/input-hint.md) error message with the field so it is announced.
- Read-only keeps the value reachable and selectable; disabled takes the field out of the tab order. Use the right one.
- The leading icon, clear control and type control are glyphs with no text. Each control needs a name (the clear control says what it clears, e.g. "Clear order number"; the reveal toggle says "Show password" or "Hide password" and reports its pressed state). Each takes a focus ring of `--input-control-focus-ring-width` `--input-control-focus-ring-color`.
- The clear control appears only while typing; announce its arrival or keep it reachable by keyboard.
- The placeholder uses `--input-placeholder-foreground`, the lowest-contrast text in the field; never put anything there a person has to keep.
- At small the text drops to `--input-value-font-small` and the field to `--input-container-height-small`; check touch targets.

## Claude Prompt
Draw a Zebra form field: a small `--input-label-name-font` label above a `--input-container-width` wide, `--input-container-height-medium` tall white (`--input-container-background-enabled`) box with a `--input-container-border-width` light grey border (`--input-container-border-color-enabled`) and `--input-container-radius-rounded` corners, `--input-container-padding-x` horizontal padding, and grey placeholder text in `--input-value-font-medium` (`--input-placeholder-foreground`). Optional `--input-icon-size-medium` near-black icons sit at either end; a password field ends in an eye icon, a date field in a calendar and a time field in a clock. While typing, a circular clear (x) icon, a short vertical divider and the type icon sit together at the right. Below the box, `--input-stack-gap` down, a small grey hint line with an info icon. On focus the border thickens to `--input-container-border-width-focused` in blue (`--input-container-border-color-focused`); invalid fields have a red border (`--input-container-border-color-invalid`) and a red hint; disabled fields are light grey (`--input-container-background-disabled`) with grey text.
