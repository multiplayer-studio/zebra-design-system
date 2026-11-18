---
name: Phone Input
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ./dropdown-menu.md, ../atoms/icon.md, ../atoms/ai-mark.md]
tokens:
  # country control
  phone-input-country-background-enabled: '{colors.color-fill-default}'
  phone-input-country-background-hover: '{colors.color-fill-faint}'
  phone-input-country-background-pressed: '{colors.color-fill-sunken}'
  phone-input-country-background-open: '{colors.color-fill-selection}'
  phone-input-country-background-disabled: '{colors.color-fill-disabled}'
  phone-input-country-border-color-enabled: '{colors.color-line-strong}'
  phone-input-country-border-color-focused: '{colors.color-line-focus}'
  phone-input-country-border-color-disabled: '{colors.color-line-subtle}'
  phone-input-country-icon-foreground: '{colors.color-ink-high}'
  phone-input-country-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # number
  phone-input-number-background-enabled: '{colors.color-fill-default}'
  phone-input-number-background-invalid: '{colors.color-status-error-faint}'
  phone-input-number-background-disabled: '{colors.color-fill-disabled}'
  phone-input-number-border-color-enabled: '{colors.color-line-strong}'
  phone-input-number-border-color-hover: '{colors.color-line-stronger}'
  phone-input-number-border-color-focused: '{colors.color-line-focus}'
  phone-input-number-border-color-invalid: '{colors.color-status-error-default}'
  phone-input-number-border-color-read-only: '{colors.color-line-subtle}'
  phone-input-number-border-color-disabled: '{colors.color-line-subtle}'
  phone-input-dial-code-foreground: '{colors.color-ink-high}'
  phone-input-dial-code-foreground-disabled: '{colors.color-ink-disabled}'
  phone-input-placeholder-foreground: '{colors.color-ink-medium}'
  phone-input-value-foreground: '{colors.color-ink-high}'
  phone-input-value-foreground-disabled: '{colors.color-ink-disabled}'
  phone-input-cursor-foreground: '{colors.color-ink-brand}'
  phone-input-clear-icon-foreground: '{colors.color-ink-high}'
  # gradient
  phone-input-gradient-country-border-color: '{colors.color-gradient-strong-start}'
  phone-input-gradient-number-border-color-start: '{colors.color-gradient-strong-start}'
  phone-input-gradient-number-border-color-end: '{colors.color-gradient-strong-end}'
  # ghost
  phone-input-ghost-container-background-enabled: '{colors.color-status-ghost-default}'
  phone-input-ghost-country-background-hover: '{colors.color-status-ghost-faint}'
  phone-input-ghost-country-background-pressed: '{colors.color-status-ghost-deep}'
  phone-input-ghost-country-background-open: '{colors.color-status-ghost-tint}'
  phone-input-ghost-container-border-color: '{colors.color-line-contrast-brand}'
  phone-input-ghost-container-border-width: '{stroke.stroke-thin}'
  # border
  phone-input-container-border-width: '{stroke.stroke-thin}'
  phone-input-container-border-width-focused: '{stroke.stroke-thick}'
  phone-input-container-border-width-invalid: '{stroke.stroke-thick}'
  # shape
  phone-input-container-radius-sharp: '{radius.radius-none}'
  phone-input-container-radius-rounded: '{radius.radius-sm}'
  phone-input-container-radius-full: '{radius.radius-pill}'
  # sizes
  phone-input-container-height-small: '{control.control-sm}'
  phone-input-container-height-medium: '{control.control-md}'
  phone-input-container-height-large: '{control.control-lg}'
  phone-input-country-padding-x: '{space.space-sm}'
  phone-input-country-gap: '{space.space-2xs}'
  phone-input-number-padding-y: '{space.space-sm}'
  phone-input-number-padding-start: '{space.space-sm}'
  phone-input-number-padding-end: '{space.space-md}'
  phone-input-number-gap: '{space.space-2xs}'
  phone-input-text-padding-x: '{space.space-2xs}'
  phone-input-value-font-small: '{typography.type-body-small}'
  phone-input-value-font-medium: '{typography.type-body-medium}'
  phone-input-value-font-large: '{typography.type-body-medium}'
  phone-input-icon-size: '{icon.icon-size-medium}'
  # assembly
  phone-input-container-gap: '{space.space-2xs}'
  phone-input-menu-offset: '{space.space-sm}'
---

# Phone Input

> Takes a phone number, with a country picker joined to its start that sets the flag, dial code and digit grouping.

## Anatomy
The assembly reads label, hint, error, field, as [Input](./input.md) does ([patterns 1.124](../patterns/01-screen-composition.md)).

1. Label — an [Input Label](../atoms/input-label.md) naming the number, with the "(required)" or "(optional)" marker as on [Input](./input.md).
2. Hint (optional) — an [Input Hint](../atoms/input-hint.md), Type default, under the label and above the field. It stays when an error shows.
3. Error (invalid only) — a second [Input Hint](../atoms/input-hint.md), Type error, on its own line between the hint and the field, saying how to fix the number ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Country control — the flag and a chevron ([Icon](../atoms/icon.md), `expand_more`), both `--phone-input-icon-size` in `--phone-input-country-icon-foreground`. It is the dropdown trigger for the country menu and has no visible text. Its start corners take the radius and it has no end border, so it joins the number edge to edge.
5. Number — the dial code (fixed text in `--phone-input-dial-code-foreground` that reads with the value) and the digits, grouped by the country's format as they are typed. While typing, a clear control ([Icon](../atoms/icon.md), `cancel`, `--phone-input-icon-size`) sits at the trailing edge. Its end corners take the radius.
6. Country list (open only) — a [Dropdown Menu](./dropdown-menu.md) panel `--phone-input-menu-offset` below the control, left aligned, filtered by typing as a [Combobox](./combobox.md) is: focus moves to a filter field at its top, and each keystroke narrows the countries by name, ISO code or dial code ([patterns 3.33](../patterns/03-controls-interaction.md)). One [Menu Item](./menu-item.md) row per country with its flag, name and dial code; the selected country is the selected row with its check. The filtered list scrolls inside the panel, never the page behind it ([patterns 3.32](../patterns/03-controls-interaction.md)).

Flag: the country's system emoji by default in code (Windows shows letters such as US instead), or flag artwork passed on the country, which replaces the emoji everywhere. Figma draws a flag glyph as a placeholder; swap in real artwork in a design. Artwork keeps its own ratio at `--phone-input-icon-size` wide.

## Variants
Flavour (light mode shown by the tokens; dark and AAA follow automatically):

| Flavour | Country control | Number | Use |
|---|---|---|---|
| default | `--phone-input-country-background-enabled`, `--phone-input-container-border-width` `--phone-input-country-border-color-enabled` | `--phone-input-number-background-enabled`, `--phone-input-container-border-width` `--phone-input-number-border-color-enabled` | inside a form |
| gradient | border `--phone-input-gradient-country-border-color`, running into the number's | 129° gradient border `--phone-input-gradient-number-border-color-start` → `--phone-input-gradient-number-border-color-end` | a number the AI filled (DESIGN.md §3), always with an [AI Mark](../atoms/ai-mark.md) beside the label ([DESIGN.md §3 Data and gradient](../DESIGN.md)); goes back to the default borders when invalid or once the person edits it |
| ghost | `--phone-input-ghost-container-background-enabled`; hover `--phone-input-ghost-country-background-hover`, pressed `--phone-input-ghost-country-background-pressed`, open `--phone-input-ghost-country-background-open` | `--phone-input-ghost-container-background-enabled` | a surface that already bounds the field |

Ghost holds a `--phone-input-ghost-container-border-width` `--phone-input-ghost-container-border-color` border on both parts, at the normal width in a colour that is transparent except in the AAA modes (`--color-line-contrast-brand`).

Shape: sharp → `--phone-input-container-radius-sharp`; rounded (default) → `--phone-input-container-radius-rounded`; full → `--phone-input-container-radius-full` (pill). Only the outer corners (the control's start, the number's end) take it. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
Assembly states:

| State | Country control | Number | Hint |
|---|---|---|---|
| default | at rest | its own state (below) | guidance |
| invalid | unchanged | `--phone-input-number-background-invalid`, `--phone-input-container-border-width-invalid` `--phone-input-number-border-color-invalid` | stays; the error line shows above the field |
| disabled | `--phone-input-country-background-disabled`, `--phone-input-country-border-color-disabled`, icons `--phone-input-country-icon-foreground-disabled` | `--phone-input-number-background-disabled`, `--phone-input-number-border-color-disabled`, dial code `--phone-input-dial-code-foreground-disabled`, digits `--phone-input-value-foreground-disabled` | disabled |

Country control states:

| State | Background | Border |
|---|---|---|
| enabled | `--phone-input-country-background-enabled` | `--phone-input-country-border-color-enabled` |
| hover | `--phone-input-country-background-hover` | unchanged |
| pressed | `--phone-input-country-background-pressed` | unchanged |
| focus | unchanged | `--phone-input-container-border-width-focused` `--phone-input-country-border-color-focused` |
| open | `--phone-input-country-background-open` | unchanged |

Number states:

| State | Border | Digits |
|---|---|---|
| enabled | `--phone-input-number-border-color-enabled` | placeholder `--phone-input-placeholder-foreground` |
| hover | `--phone-input-number-border-color-hover` | unchanged |
| focus / selected | `--phone-input-container-border-width-focused` `--phone-input-number-border-color-focused` | placeholder `--phone-input-placeholder-foreground`, caret `--phone-input-cursor-foreground` |
| typing | `--phone-input-container-border-width-focused` `--phone-input-number-border-color-focused` | `--phone-input-value-foreground`, caret `--phone-input-cursor-foreground`; adds the clear control in `--phone-input-clear-icon-foreground` |
| filled | `--phone-input-number-border-color-enabled` | `--phone-input-value-foreground` |
| read-only | `--phone-input-number-border-color-read-only` | `--phone-input-value-foreground` |

No transition is defined. Invalid stays on while a person corrects the number. Figma's selected and typing frames are the focused number with a value; they derive from focus and value, not from a property.

## Spacing & Sizing
| Size | Minimum height | Font |
|---|---|---|
| small | `--phone-input-container-height-small` | `--phone-input-value-font-small` |
| medium (default) | `--phone-input-container-height-medium` | `--phone-input-value-font-medium` |
| large | `--phone-input-container-height-large` | `--phone-input-value-font-large` |

| Property | Value |
|---|---|
| Country control | `--phone-input-country-padding-x` each side, `--phone-input-country-gap` between flag and chevron; hugs its content |
| Number padding | `--phone-input-number-padding-y` top and bottom, `--phone-input-number-padding-start` / `--phone-input-number-padding-end` |
| Number content | dial code and digits `--phone-input-number-gap` apart, inside a `--phone-input-text-padding-x` wrapper |
| Icons | flag, chevron and clear `--phone-input-icon-size` |
| Join | no gap between control and number |
| Stack | label, hint, error and control row `--phone-input-container-gap` apart |
| Country list | `--phone-input-menu-offset` below the control; filtered by typing, scrolling inside the panel |
| Width | starts 280 wide and narrows to fit its container; fills it when block |

Small is the only size that also reduces the text. The heights are minimums: the field grows with the text size ([patterns 5.37](../patterns/05-sizes-devices.md)).

## Properties
| Property | Options | Default |
|---|---|---|
| State | default, invalid, disabled | default |
| Error text | text (shown while invalid) | — |
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| Flavour | default, gradient, ghost | default |
| Flag | emoji, artwork, icon (Figma placeholder) | emoji in code, icon in Figma |
| Open | on / off (derived from the menu) | off |
| value | national digits, without the dial code | — |
| onValueChange | called on every edit and country change with the digits, the country and the E.164 number | — |
| country / defaultCountry | ISO code of the selected country | — |
| countries | list; each takes code, name, dialCode, format, flag | — |
| countryLabel | accessible name of the country control | — |
| name | submits the number in E.164 under this name | — |

Hover, pressed, focus and typing are driven by interaction. The number, dial code and menu rows in Figma are sample content.

## Usage
- Use real flag artwork in the product where flags must show everywhere (Windows has no emoji flags); never ship the Figma glyph as the real thing.
- Don't make the flag the only sign of the country: the dial code and the country's name in the menu carry it too.
- Pair the field with validation, and set invalid with an error line that says how to fix it; the hint stays. Grouping is visual: it doesn't prove a number exists.
- Accept what people naturally type, including spaces, brackets and a typed dial code ([patterns 3.43](../patterns/03-controls-interaction.md)).
- Picking a country changes the dial code and format and keeps the digits, dropping any beyond the new format's length. Without a format, digits stop at the E.164 limit.
- Use gradient only for a number the AI filled, with an [AI Mark](../atoms/ai-mark.md), and ghost only on a surface that already bounds the field.
- In code, mount the menu in a portal positioned against the control, with collision handling.

## Accessibility
- The label names the number; the hint and the error line are tied to it with `aria-describedby`, and `aria-invalid` is set while invalid.
- The country control has no visible text, so countryLabel names it, followed by the selected country and dial code; it reports `aria-expanded` while the menu is open.
- Flags are decorative and hidden from assistive tech, emoji or artwork.
- Enter or Space opens the list and moves focus to its filter field; arrow keys move through the rows while focus stays in the filter; Enter picks a country; Escape closes the list and returns focus to the control ([patterns 3.33](../patterns/03-controls-interaction.md)). Filtering ignores case and accents ([patterns 3.133](../patterns/03-controls-interaction.md)).
- The number uses `inputmode="tel"` and `autocomplete="tel-national"`.
- Invalid is not colour alone: the heavier border and the error line's icon and words carry it ([patterns 6.12](../patterns/06-accessibility.md)).
- A disabled field follows [Input](./input.md)'s rule for staying focusable.
- Small and medium are below the touch minimum; on touch products use large or extend the hit area ([patterns 6.16](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a form field labelled "Phone number", with a small grey hint line under the label: below it a white (`--phone-input-country-background-enabled`) country control `--phone-input-container-height-medium` tall with a flag and a small down chevron, `--phone-input-country-padding-x` each side, joined edge to edge to a white number field showing the dial code "+1" and grey placeholder digits (`--phone-input-placeholder-foreground`) in `--phone-input-value-font-medium`. Both share one `--phone-input-container-border-width` mid grey (`--phone-input-number-border-color-enabled`) outline with `--phone-input-container-radius-rounded` outer corners and no divider gap. Show an invalid copy with a red error line with an error icon between the hint and the field, a pale red fill (`--phone-input-number-background-invalid`) and a `--phone-input-container-border-width-invalid` red border (`--phone-input-number-border-color-invalid`) on the number, and an open copy where the country control turns pale blue (`--phone-input-country-background-open`) and a white floating panel `--phone-input-menu-offset` below holds a filter field above a list of countries with flags and dial codes.
