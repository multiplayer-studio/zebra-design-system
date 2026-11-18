---
name: Input
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ../atoms/divider.md, ../atoms/icon.md, ../atoms/ai-mark.md]
tokens:
  # container (default flavour)
  input-container-background-enabled: '{colors.color-fill-default}'
  input-container-background-disabled: '{colors.color-fill-disabled}'
  input-container-border-color-enabled: '{colors.color-line-strong}'
  input-container-border-color-hover: '{colors.color-line-stronger}'
  input-container-border-color-focused: '{colors.color-line-focus}'
  input-container-border-color-selected: '{colors.color-line-focus}'
  input-container-border-color-typing: '{colors.color-line-focus}'
  input-container-border-color-filled: '{colors.color-line-strong}'
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
  input-ghost-container-border-color: '{colors.color-line-contrast-brand}'
  input-ghost-container-border-width: '{stroke.stroke-thin}'
  # text
  input-value-foreground: '{colors.color-ink-high}'
  input-value-foreground-disabled: '{colors.color-ink-disabled}'
  input-placeholder-foreground: '{colors.color-ink-medium}'
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

> A single-line text field for text, numbers, passwords, dates and times, read in the order label, hint, error, field.

Input is the whole assembly (label, hint, error, field). The field on its own, with Show Label and Show Hint off, is what other components nest (Stepper Input, Date Picker).

## Anatomy
Every field reads label, hint, error, field ([patterns 1.124](../patterns/01-screen-composition.md)):

1. Label (optional) — [Input Label](../atoms/input-label.md), turned on by Show Label. Its marker, information icon and dimming are set on the label. The label mark the minority in words: "(required)" where required fields are fewer, "(optional)" where most are required, never an asterisk alone ([patterns 7.31](../patterns/07-content-copy.md)).
2. Hint (optional) — [Input Hint](../atoms/input-hint.md), Type default, turned on by Show Hint. It sits under the label, above the field, and stays when an error shows. It holds any format example ("For example, ZT411-10022"), never only the placeholder ([patterns 7.29](../patterns/07-content-copy.md)).
3. Error (invalid only) — a second [Input Hint](../atoms/input-hint.md), Type error, on its own line between the hint and the field. It has an icon and words, and says how to fix the problem ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Field — the container: a horizontal row, at least `--input-container-height-medium` tall, carrying the background, border and radius. Its parts sit `--input-container-gap` apart.
   1. Leading icon (optional) — [Icon](../atoms/icon.md), `--input-icon-size-medium`, turned on by hasLeading. Text, number and password only, and only an icon for the field's purpose ([patterns 3.46](../patterns/03-controls-interaction.md)).
   2. Input text — the placeholder, then the value, padded `--input-text-padding-x` each side. It fills whatever width the icons leave.
   3. Trailing position — empty on text until hasTrailing fills it; on the other types the control that defines the type (below). A field that accepts scanning carries a scan control (`barcode`) here, turned on by Scan, ahead of the clear control. While typing, a clear control (`cancel`) joins them: the scan control, the clear control, a vertical [Divider](../atoms/divider.md) `--input-divider-height` tall and the type control sit `--input-trailing-gap` apart ([patterns 3.46](../patterns/03-controls-interaction.md)).

The parts stack `--input-stack-gap` apart. Turning the label or hint off removes its height. The error line takes its height only while the field is invalid, so the field moves down when it appears.

Every icon and control in the field (leading, trailing, scan, type control, clear) is an [Icon](../atoms/icon.md) drawn in `--input-icon-foreground`, the same as the value.

## Variants
**Type** chooses the placeholder and the trailing control:

| Type | Placeholder | Leading icon | Trailing control |
|---|---|---|---|
| text (default) | Placeholder | optional | none; hasTrailing adds any icon |
| number | 0 | optional | `dialpad`, toggled by hasTrailing; never a spinner |
| password | Password | optional | reveal: `visibility` (Figma's only glyph); swapping to `visibility_off` while revealed is code-only; always present. The value is hidden by default |
| date | mm/dd/yyyy (the user's locale format) | none | calendar `calendar_3_day`, opens the [Date Picker](../organisms/date-picker.md); always present |
| time | --:-- -- (the user's locale format) | none | clock `clock_outline`, opens a time picker; always present |

**Content** declares what the field holds, so the on-screen keyboard, the Enter key and autofill match it ([patterns 3.38–3.41](../patterns/03-controls-interaction.md)):

| Content | Keyboard (`inputmode`) | Autocorrect, spellcheck, capitals | Autofill (`autocomplete`) |
|---|---|---|---|
| prose (default for text) | text | on | off |
| name | text | autocorrect and spellcheck off; capitalise each word | the name part, for fields about the person |
| email | email | off | `email`, for the person's own address |
| phone | tel | off | `tel`, for the person's own number |
| web address | url | off | `url` |
| whole number | numeric | off | off |
| decimal or negative number | decimal, with the locale's separator | off | off |
| code, ID or serial | text, or numeric for digits only | off, with no automatic capitals | off |

The Enter key says what happens next (`enterkeyhint`): Next between fields, Done on the last ([patterns 3.39](../patterns/03-controls-interaction.md)). On a shared device, autofill never offers values another person entered ([patterns 3.134](../patterns/03-controls-interaction.md)).

**Flavour**

| Flavour | Background | Border |
|---|---|---|
| default | `--input-container-background-enabled` | `--input-container-border-width` `--input-container-border-color-enabled` |
| gradient | `--input-gradient-container-background-enabled` | `--input-container-border-width`, a 90° gradient `--input-gradient-container-border-color-start` → `--input-gradient-container-border-color-end` |
| ghost | `--input-ghost-container-background-enabled` (none) | `--input-ghost-container-border-width` `--input-ghost-container-border-color` (transparent except in the AAA modes) |

Gradient marks a field the AI filled or works in (DESIGN.md §3). It's never the only marker: put an [AI Mark](../atoms/ai-mark.md) beside the label ([DESIGN.md §3 Data and gradient](../DESIGN.md)). Once the person changes the AI's value, the field returns to default ([DESIGN.md §3 Data and gradient](../DESIGN.md)). Ghost has no visible border, for a field on a surface that already bounds it. Its border is drawn at the normal width in a colour that is transparent except in the AAA modes, where it shows in the brand primary (`--color-line-contrast-brand`).

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
| invalid | `--input-container-border-color-invalid` | value `--input-value-foreground` | set by the form; the error line appears above the field and the value is kept |
| read-only | `--input-container-border-color-read-only` | value `--input-value-foreground` | value still legible and selectable; no clear control |
| disabled | `--input-container-border-color-disabled`, background `--input-container-background-disabled` (ghost `--input-ghost-container-background-disabled`) | value `--input-value-foreground-disabled`; every icon `--input-icon-foreground-disabled` | see below for focus |

Focus, invalid, read-only and disabled look the same on every flavour except ghost, which keeps its ghost border in every state. The run through enabled, focus, selected, typing and filled is driven by interaction; invalid and read-only are set by the form. No transition is defined: each state swaps border colour, border weight, text colour and, at typing, the clear control.

On the assembly, invalid and disabled are set once and passed down: invalid sets the field to invalid and shows the error line, while the hint stays at default; disabled sets the field to disabled, the label to Disabled and the hint to disabled. Read-only, hover, focus and typing belong to the field alone; the label stays at full strength.

Where the value or the reason it can't change matters, use read-only, or keep the disabled field focusable (`aria-disabled`) with the reason in the hint ([patterns 6.34](../patterns/06-accessibility.md)). A disabled field that can be inferred from its neighbours leaves the tab order.

## Spacing & Sizing
| Size | Minimum height | Padding (V / H) | Value font | Icons |
|---|---|---|---|---|
| small | `--input-container-height-small` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-small` | `--input-icon-size-small` |
| medium (default) | `--input-container-height-medium` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-medium` | `--input-icon-size-medium` |
| large | `--input-container-height-large` | `--input-container-padding-y` / `--input-container-padding-x` | `--input-value-font-large` | `--input-icon-size-large` |

The heights are minimums: the field grows with the text size and never clips it ([patterns 5.37](../patterns/05-sizes-devices.md)). The value stays on one line and scrolls within the field. The field and the assembly are `--input-container-width` wide by default; the field fills the width of the stack, and the label, hint and error wrap at that width rather than widening it. A field's width suggests the length of what goes in it ([patterns 3.42](../patterns/03-controls-interaction.md)). Padding holds across all sizes. Each icon shown takes its own size plus `--input-container-gap` from the text. The stack gap is `--input-stack-gap` between label, hint, error and field.

Icon size is a context override: fields use the Icon's `--icon-size-medium` step, and `--icon-size-small` at small.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | text, number, password, date, time | text |
| Content | prose, name, email, phone, web address, whole number, decimal, code | prose (number: whole number) |
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| Flavour | default, gradient, ghost | default |
| State | enabled, hover, focus, selected, typing, filled, invalid, read-only, disabled | enabled |
| hasLeading | on / off (text, number, password) | off |
| hasTrailing | on / off (text, number) | off |
| Scan | on / off (text, number) | off |
| Show Label | on / off | on |
| Show Hint | on / off | on |
| Error text | text (shown while invalid) | — |
| Placeholder / value | text | per type |

Label Type, Disabled, Show Information and Show Sub Label are set on the [Input Label](../atoms/input-label.md). The hint line is an [Input Hint](../atoms/input-hint.md) at Type default and the error line one at Type error; Show Icon is set on each. Hover, focus, selected and typing are driven by interaction, never set on a static layout.

## Usage
- Pick the type and content that match the value; the keyboard, placeholder and trailing control tell people what is expected before they type.
- Keep Show Label on. Use the field without a label only where something nearby already names it, and still give it an accessible name.
- Never set invalid without an error line that says how to fix it ([patterns 6.12](../patterns/06-accessibility.md)). The border is the signal, the error line the reason, and the hint stays.
- Put format examples in the hint, never only in the placeholder ([patterns 7.29](../patterns/07-content-copy.md)). A time follows the device's 12- or 24-hour format ([patterns 3.54](../patterns/03-controls-interaction.md)).
- Accept what people naturally type: spaces, dashes and a typed unit are cleaned up silently, with no input mask ([patterns 3.43](../patterns/03-controls-interaction.md)).
- Turn Scan on for a field that accepts a scan; typing stays available with the same validation ([patterns 3.111](../patterns/03-controls-interaction.md)).
- Use read-only where people still need to read or copy the value, and disabled where they don't.
- Don't leave the parts on different states; a full-strength label over a disabled field reads as a mistake.
- Use default inside forms, ghost on a surface that already bounds the field, and gradient only for an AI field, always with an [AI Mark](../atoms/ai-mark.md).
- Show only one clear control: hide the platform's own clear and picker buttons.
- Small and medium are below `--input-touch-target-size-minimum`; on touch products use large or extend the hit area ([patterns 6.16](../patterns/06-accessibility.md)).

## Accessibility
- The field has no name of its own. The [Input Label](../atoms/input-label.md) supplies it; without a visible label, give the field an accessible name. A placeholder is never a name ([patterns 6.47](../patterns/06-accessibility.md)).
- Tie the hint and the error line to the field with `aria-describedby`, so they're read after the name, and set `aria-invalid` while invalid. Invalid is never colour alone: the error line carries an icon and words ([patterns 6.12](../patterns/06-accessibility.md)).
- Read-only keeps the value reachable and selectable. See States for when a disabled field stays focusable.
- The leading icon, clear, scan and type controls are glyphs with no text. Each control needs a name (the clear control says what it clears, e.g. "Clear order number"; the scan control "Scan order number"; the reveal toggle says "Show password" and reports its pressed state). Each takes a focus ring of `--input-control-focus-ring-width` `--input-control-focus-ring-color`.
- The clear control appears only while typing; announce its arrival or keep it reachable by keyboard.
- The placeholder disappears once someone types; never put anything there a person has to keep ([patterns 1.124](../patterns/01-screen-composition.md)).

## Claude Prompt
Draw a Zebra form field: a small `--input-label-name-font` label, then `--input-stack-gap` below it a small grey hint line with an info icon, then a `--input-container-width` wide, `--input-container-height-medium` tall white (`--input-container-background-enabled`) box with a `--input-container-border-width` mid grey border (`--input-container-border-color-enabled`) and `--input-container-radius-rounded` corners, `--input-container-padding-x` horizontal padding, and grey placeholder text in `--input-value-font-medium` (`--input-placeholder-foreground`). Optional `--input-icon-size-medium` near-black icons sit at either end; a password field ends in an eye icon, a date field in a calendar and a time field in a clock. While typing, a circular clear (x) icon, a short vertical divider and the type icon sit together at the right. On focus the border thickens to `--input-container-border-width-focused` in blue (`--input-container-border-color-focused`). An invalid field keeps its hint, adds a red error line with an error icon between the hint and the box, and has a red border (`--input-container-border-color-invalid`); disabled fields are light grey (`--input-container-background-disabled`) with grey text.
