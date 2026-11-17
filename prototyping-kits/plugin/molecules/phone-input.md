---
name: Phone Input
level: molecule
status: stable
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ./dropdown-menu.md, ../atoms/icon.md]
tokens:
  # country control
  phone-input-country-background-enabled: '{colors.color-fill-default}'
  phone-input-country-background-hover: '{colors.color-fill-faint}'
  phone-input-country-background-pressed: '{colors.color-fill-sunken}'
  phone-input-country-background-open: '{colors.color-fill-selection}'
  phone-input-country-background-disabled: '{colors.color-fill-disabled}'
  phone-input-country-border-color-enabled: '{colors.color-line-default}'
  phone-input-country-border-color-focused: '{colors.color-line-focus}'
  phone-input-country-border-color-disabled: '{colors.color-line-subtle}'
  phone-input-country-icon-foreground: '{colors.color-ink-high}'
  phone-input-country-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # number
  phone-input-number-background-enabled: '{colors.color-fill-default}'
  phone-input-number-background-invalid: '{colors.color-status-error-faint}'
  phone-input-number-background-disabled: '{colors.color-fill-disabled}'
  phone-input-number-border-color-enabled: '{colors.color-line-default}'
  phone-input-number-border-color-hover: '{colors.color-line-strong}'
  phone-input-number-border-color-focused: '{colors.color-line-focus}'
  phone-input-number-border-color-invalid: '{colors.color-status-error-default}'
  phone-input-number-border-color-read-only: '{colors.color-line-subtle}'
  phone-input-number-border-color-disabled: '{colors.color-line-subtle}'
  phone-input-dial-code-foreground: '{colors.color-ink-high}'
  phone-input-dial-code-foreground-disabled: '{colors.color-ink-disabled}'
  phone-input-placeholder-foreground: '{colors.color-ink-disabled}'
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
  phone-input-ghost-container-border-color: '{colors.color-brand-primary-default}'
  phone-input-ghost-container-border-width: '{stroke.stroke-base}'
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
1. Label — an [Input Label](../atoms/input-label.md) naming the number, with the required or optional marker as on [Input](./input.md).
2. Country control — the flag and a chevron ([Icon](../atoms/icon.md), `expand_more`), both `--phone-input-icon-size` in `--phone-input-country-icon-foreground`. It is the dropdown trigger for the country menu and has no visible text. Its start corners take the radius and it has no end border, so it joins the number edge to edge.
3. Number — the dial code (fixed text in `--phone-input-dial-code-foreground` that reads with the value) and the digits, grouped by the country's format as they are typed. While typing, a clear control ([Icon](../atoms/icon.md), `cancel`, `--phone-input-icon-size`) sits at the trailing edge. Its end corners take the radius.
4. Hint — an [Input Hint](../atoms/input-hint.md): the supporting line, and the reason when invalid.
5. Country menu (open only) — a [Dropdown Menu](./dropdown-menu.md) `--phone-input-menu-offset` below the control, left aligned, one row per country with its flag, name and dial code. The selected country is the selected row. It scrolls past eight rows.

Flag: the country's system emoji by default in code (Windows shows letters such as US instead), or flag artwork passed on the country, which replaces the emoji everywhere. Figma draws a flag glyph as a placeholder; swap in real artwork in a design. Artwork keeps its own ratio at `--phone-input-icon-size` wide.

## Variants
Flavour (light mode shown by the tokens; dark and AAA follow automatically):

| Flavour | Country control | Number | Use |
|---|---|---|---|
| default | `--phone-input-country-background-enabled`, `--phone-input-container-border-width` `--phone-input-country-border-color-enabled` | `--phone-input-number-background-enabled`, `--phone-input-container-border-width` `--phone-input-number-border-color-enabled` | inside a form |
| gradient | border `--phone-input-gradient-country-border-color`, running into the number's | 129° gradient border `--phone-input-gradient-number-border-color-start` → `--phone-input-gradient-number-border-color-end` | an AI interaction (DESIGN.md §3); goes back to the default borders when invalid |
| ghost | `--phone-input-ghost-container-background-enabled`; hover `--phone-input-ghost-country-background-hover`, pressed `--phone-input-ghost-country-background-pressed`, open `--phone-input-ghost-country-background-open` | `--phone-input-ghost-container-background-enabled` | a surface that already bounds the field |

Ghost holds a `--phone-input-ghost-container-border-width` `--phone-input-ghost-container-border-color` border on both parts: a theming hook that draws nothing in the standard modes.

Shape: sharp → `--phone-input-container-radius-sharp`; rounded (default) → `--phone-input-container-radius-rounded`; full → `--phone-input-container-radius-full` (pill). Only the outer corners (the control's start, the number's end) take it. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
Assembly states:

| State | Country control | Number | Hint |
|---|---|---|---|
| default | at rest | its own state (below) | guidance |
| invalid | unchanged | `--phone-input-number-background-invalid`, `--phone-input-container-border-width-invalid` `--phone-input-number-border-color-invalid` | the error reason |
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
| Size | Height | Font |
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
| Stack | label, control row and hint `--phone-input-container-gap` apart |
| Menu | `--phone-input-menu-offset` below the control, scrolling past eight rows |
| Width | starts 280 wide and narrows to fit its container; fills it when block |

Small is the only size that also reduces the text.

## Properties
| Property | Options | Default |
|---|---|---|
| State | default, invalid, disabled | default |
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
- Pair the field with validation, and set invalid with the reason in the hint. Grouping is visual: it doesn't prove a number exists.
- Picking a country changes the dial code and format and keeps the digits, dropping any beyond the new format's length. Without a format, digits stop at the E.164 limit.
- Use gradient only for an AI interaction, and ghost only on a surface that already bounds the field.
- In code, mount the menu in a portal positioned against the control, with collision handling.

## Accessibility
- The label names the number and the hint is tied to it with `aria-describedby`.
- The country control has no visible text, so countryLabel names it, followed by the selected country and dial code; it reports `aria-expanded` while the menu is open.
- Flags are decorative and hidden from assistive tech, emoji or artwork.
- Enter or Space opens the menu and moves focus into it; arrow keys move through the rows; Escape closes it and returns focus to the control.
- The number uses `inputmode="tel"` and `autocomplete="tel-national"`.
- Invalid is not colour alone: the heavier border and the hint's reason carry it.
- Disabled takes the country control and the number out of the tab order.

## Claude Prompt
Draw a form field labelled "Phone number": a white (`--phone-input-country-background-enabled`) country control `--phone-input-container-height-medium` tall with a flag and a small down chevron, `--phone-input-country-padding-x` each side, joined edge to edge to a white number field showing the dial code "+1" and grey placeholder digits (`--phone-input-placeholder-foreground`) in `--phone-input-value-font-medium`. Both share one `--phone-input-container-border-width` light grey (`--phone-input-number-border-color-enabled`) outline with `--phone-input-container-radius-rounded` outer corners and no divider gap. A small grey hint line sits `--phone-input-container-gap` below. Show an invalid copy with a pale red fill (`--phone-input-number-background-invalid`), a `--phone-input-container-border-width-invalid` red border (`--phone-input-number-border-color-invalid`) on the number and a red error hint, and an open copy where the country control turns pale blue (`--phone-input-country-background-open`) and a white floating menu `--phone-input-menu-offset` below lists countries with flags and dial codes.
