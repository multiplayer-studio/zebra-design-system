---
name: Combobox
level: molecule
status: draft
composes: [../atoms/input-label.md, ../atoms/input-hint.md, ../atoms/icon.md, ../atoms/divider.md, ./dropdown-menu.md, ./menu-item.md, ./input-chip.md]
tokens:
  # field
  combobox-field-background-enabled: '{colors.color-fill-default}'
  combobox-field-background-disabled: '{colors.color-fill-disabled}'
  combobox-field-border-color-enabled: '{colors.color-line-strong}'
  combobox-field-border-color-hover: '{colors.color-line-stronger}'
  combobox-field-border-color-focused: '{colors.color-line-focus}'
  combobox-field-border-color-open: '{colors.color-line-focus}'
  combobox-field-border-color-error: '{colors.color-status-error-default}'
  combobox-field-border-color-read-only: '{colors.color-line-subtle}'
  combobox-field-border-color-disabled: '{colors.color-line-subtle}'
  combobox-field-border-width: '{stroke.stroke-thin}'
  combobox-field-border-width-focused: '{stroke.stroke-thick}'
  # text
  combobox-value-foreground: '{colors.color-ink-high}'
  combobox-value-foreground-disabled: '{colors.color-ink-disabled}'
  combobox-placeholder-foreground: '{colors.color-ink-medium}'
  combobox-cursor-foreground: '{colors.color-ink-brand}'
  combobox-value-font-small: '{typography.type-body-small}'
  combobox-value-font-medium: '{typography.type-body-medium}'
  combobox-value-font-large: '{typography.type-body-medium}'
  combobox-count-font: '{typography.type-label-medium}'
  combobox-count-foreground: '{colors.color-ink-high}'
  # suggestions
  combobox-match-font-weight: '{font-weight.font-weight-bold}'
  combobox-empty-font: '{typography.type-body-small}'
  combobox-empty-foreground: '{colors.color-ink-medium}'
  combobox-option-min-height: '{menu-item.menu-item-container-height}'
  # icons and controls (leading, clear, chevron)
  combobox-icon-foreground: '{colors.color-ink-high}'
  combobox-icon-foreground-disabled: '{colors.color-ink-disabled}'
  combobox-icon-size-small: '{icon.icon-size-small}'
  combobox-icon-size-medium: '{icon.icon-size-medium}'
  combobox-icon-size-large: '{icon.icon-size-medium}'
  combobox-control-focus-ring-width: '{stroke.stroke-thick}'
  combobox-control-focus-ring-color: '{colors.color-line-focus}'
  combobox-trailing-gap: '{space.space-sm}'
  combobox-divider-height: '{control.control-icon-md}'
  # shape
  combobox-field-radius-sharp: '{radius.radius-none}'
  combobox-field-radius-rounded: '{radius.radius-element-sm}'
  combobox-field-radius-full: '{radius.radius-pill}'
  # sizes (heights are minimums: chips wrap and grow the field)
  combobox-container-width: '{component-sizes.size-input-width}'
  combobox-field-min-height-small: '{control.control-sm}'
  combobox-field-min-height-medium: '{control.control-md}'
  combobox-field-min-height-large: '{control.control-lg}'
  combobox-field-padding-y: '{space.space-sm}'
  combobox-field-padding-x: '{space.space-md}'
  combobox-field-gap: '{space.space-2xs}'
  combobox-text-padding-x: '{space.space-2xs}'
  combobox-chip-gap: '{space.space-2xs}'
  combobox-stack-gap: '{space.space-xs}'
  combobox-menu-offset: '{space.space-2xs}'
  combobox-touch-target-size-minimum: '{control.control-target-min}'
---

# Combobox

> A field that filters a long list as people type and commits one choice or several, with a label, hint and error line like every field.

## Anatomy
1. Label — an [Input Label](../atoms/input-label.md). Names the field and carries "(required)" or "(optional)" in words ([patterns 7.31](../patterns/07-content-copy.md)).
2. Hint (optional) — an [Input Hint](../atoms/input-hint.md), type default, under the label and above the field. It stays visible when an error shows.
3. Error (when invalid) — a second [Input Hint](../atoms/input-hint.md), type error, on its own line between the hint and the field, with its icon and words that say how to fix it ([patterns 1.64](../patterns/01-screen-composition.md)).
4. Field — the container, at least `--combobox-field-min-height-medium` tall, carrying the background, border and radius. Its parts sit `--combobox-field-gap` apart:
   1. Leading icon (optional) — an [Icon](../atoms/icon.md) at `--combobox-icon-size-medium`, e.g. `search`. Only for the field's purpose.
   2. Chips (multi only, while focused) — one [Input Chip](./input-chip.md) per chosen item, `--combobox-chip-gap` apart, before the text. They wrap, and the field grows.
   3. Text — what the person types, then the committed value (single), padded `--combobox-text-padding-x` each side.
   4. Count (multi only, while closed) — "3 selected" in `--combobox-count-font` `--combobox-count-foreground`, in place of the chips.
   5. Trailing group — the clear control (`cancel`) when there is text or a choice, a vertical [Divider](../atoms/divider.md) `--combobox-divider-height` tall, and the chevron (`expand_more` closed, `expand_less` open), `--combobox-trailing-gap` apart.
5. Suggestions (open only) — a [Dropdown Menu](./dropdown-menu.md) `--combobox-menu-offset` below the field and as wide as it, holding [Menu Item](./menu-item.md) rows at least `--combobox-option-min-height` tall. Unlike a menu, this list may scroll inside itself; the page behind it never scrolls ([patterns 3.32](../patterns/03-controls-interaction.md)). When nothing matches, one line in `--combobox-empty-font` `--combobox-empty-foreground` says so ("No sites match 'dock'").

Label, hint, error and field stack `--combobox-stack-gap` apart, in that order ([patterns 1.124](../patterns/01-screen-composition.md)).

## Variants
**Selection**

| Selection | Rows | Closed field shows | After a choice |
|---|---|---|---|
| single (default) | Menu Item, check type: the chosen row shows the check ([patterns 3.84](../patterns/03-controls-interaction.md)) | the chosen value | the list closes ([patterns 3.31](../patterns/03-controls-interaction.md)) |
| multi | Menu Item, check type: every chosen row shows the check | the count ("3 selected") and the clear control | the list stays open until dismissed; the text clears so the next search can start |

**Match**

| Match | Commits | Use |
|---|---|---|
| strict (default) | only a row from the list; free text left in the field on blur is kept and the field shows the error "Choose a … from the list"; nothing is committed | a known item: a site, a device, a user ([patterns 3.34](../patterns/03-controls-interaction.md)) |
| free | what was typed, unless a suggestion is chosen | any value, with suggestions as help |

In each suggestion the part not yet typed is emphasised at `--combobox-match-font-weight`; the typed part stays at the row's own weight ([patterns 3.35](../patterns/03-controls-interaction.md)). On compact screens the rows are plain text: label only, no leading element ([patterns 3.36](../patterns/03-controls-interaction.md)).

**Shape**: sharp → `--combobox-field-radius-sharp`; rounded (default) → `--combobox-field-radius-rounded`; full → `--combobox-field-radius-full`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Border | Text | Notes |
|---|---|---|---|
| enabled | `--combobox-field-border-width` `--combobox-field-border-color-enabled` | placeholder `--combobox-placeholder-foreground` | resting, nothing chosen |
| hover | `--combobox-field-border-color-hover` | unchanged | pointer devices only |
| focus | `--combobox-field-border-width-focused` `--combobox-field-border-color-focused` | cursor `--combobox-cursor-foreground` | keyboard focus, list closed |
| open | `--combobox-field-border-width-focused` `--combobox-field-border-color-open` | typed text `--combobox-value-foreground` | suggestions show and update with each keystroke ([patterns 3.33](../patterns/03-controls-interaction.md)) |
| filled | `--combobox-field-border-color-enabled` | value or count `--combobox-value-foreground` | a committed choice; the clear control shows |
| invalid | `--combobox-field-border-color-error` | value kept | the error line shows above the field; the hint stays |
| read-only | `--combobox-field-border-color-read-only` | value `--combobox-value-foreground` | focusable and selectable; the list doesn't open |
| disabled | `--combobox-field-border-color-disabled`, background `--combobox-field-background-disabled` | `--combobox-value-foreground-disabled`; every icon `--combobox-icon-foreground-disabled` | use only where the reason is shown nearby; otherwise keep it read-only |

No transition is defined: each state swaps border colour and weight, and at open the chevron and the list. Focus stays in the text while the arrow keys move a highlight through the rows; the highlighted row shows Menu Item's focus ring, a chosen row its check and selected tint, so focus and selection never look the same ([patterns 3.70](../patterns/03-controls-interaction.md)). The error keeps what the person typed ([patterns 1.64](../patterns/01-screen-composition.md)).

## Spacing & Sizing
| Size | Min height | Padding (V / H) | Font | Icons |
|---|---|---|---|---|
| small | `--combobox-field-min-height-small` | `--combobox-field-padding-y` / `--combobox-field-padding-x` | `--combobox-value-font-small` | `--combobox-icon-size-small` |
| medium (default) | `--combobox-field-min-height-medium` | `--combobox-field-padding-y` / `--combobox-field-padding-x` | `--combobox-value-font-medium` | `--combobox-icon-size-medium` |
| large | `--combobox-field-min-height-large` | `--combobox-field-padding-y` / `--combobox-field-padding-x` | `--combobox-value-font-large` | `--combobox-icon-size-large` |

The assembly is `--combobox-container-width` wide by default and the field fills it. Heights are minimums: wrapped chips grow the field. The list sits `--combobox-menu-offset` below the field, matches its width and doesn't add to the assembly's height. It shows about six rows, then scrolls inside itself; the visible row count is a draft placeholder, to be confirmed in Figma. Each trailing control keeps a hit area of at least `--combobox-touch-target-size-minimum`.

## Properties
| Property | Options | Default |
|---|---|---|
| Selection | single, multi | single |
| Match | strict, free | strict |
| Size | small, medium, large | medium |
| Shape | sharp, rounded, full | rounded |
| State | enabled, hover, focus, open, filled, invalid, read-only, disabled | enabled |
| Leading icon | on / off, any icon | off |
| Show Hint | on / off | on |
| Error | text, or none | none |
| Label, placeholder, options | text | — |

Hover, focus and open are driven by interaction, never set on a static layout. Label marking ("(required)", "(optional)") is set on the [Input Label](../atoms/input-label.md).

## Usage
- Use Combobox for a long, known list: past fifteen options, or any list a menu would have to scroll ([patterns 3.16](../patterns/03-controls-interaction.md)). For a short list use [Select](./select.md) or visible radios.
- Use strict for anything that must exist (a site, device or user) and free only where any value is valid ([patterns 3.34](../patterns/03-controls-interaction.md)).
- Never offer a suggestion that leads nowhere; when nothing matches, say so in the list ([patterns 3.35](../patterns/03-controls-interaction.md)).
- Multi: the closed field shows the count with a clear control; open, each choice is an Input Chip that can be removed ([patterns 3.31](../patterns/03-controls-interaction.md)).
- Keep the hint visible when an error shows, and write the error as the fix ("Choose a site from the list") ([patterns 1.64](../patterns/01-screen-composition.md)).
- The placeholder is never the label or the only instruction ([patterns 1.124](../patterns/01-screen-composition.md)).
- Inside dialogs and tables the list floats above the container rather than being clipped.

## Accessibility
- Use the ARIA combobox pattern: the text input has `role="combobox"`, `aria-expanded`, `aria-controls` pointing at the `role="listbox"` and `aria-activedescendant` for the highlighted row. Rows are `role="option"` with `aria-selected`; multi sets `aria-multiselectable="true"` on the listbox.
- Keyboard: typing filters; Down opens the list and moves the highlight; Enter commits the highlighted row; Escape closes the list and keeps what was typed ([patterns 3.33](../patterns/03-controls-interaction.md)); Backspace in an empty multi field removes the last chip.
- Announce the number of suggestions as they change through a polite live region ("6 results").
- Associate the hint and the error with the input through `aria-describedby`, and set `aria-invalid="true"` in the error state. The error carries an icon and words, never colour alone ([patterns 6.12](../patterns/06-accessibility.md)).
- The clear control is named for what it clears ("Clear sites"); the chevron's name says it shows the options. Each takes a `--combobox-control-focus-ring-width` `--combobox-control-focus-ring-color` ring.
- Each chip's remove control names its item ("Remove Dock 3").
- In the label, mark the minority in words: "(required)" where required fields are fewer, "(optional)" where most are required, never an asterisk alone ([patterns 7.31](../patterns/07-content-copy.md)); a required field also sets `aria-required="true"`.

## Claude Prompt
Draw a Zebra combobox: a small near-black label "Site (required)", under it a grey one-line hint "Start typing a site name", then `--combobox-stack-gap` below a `--combobox-container-width` wide white box (`--combobox-field-background-enabled`) at least `--combobox-field-min-height-medium` tall with a `--combobox-field-border-width` mid-grey border (`--combobox-field-border-color-enabled`) and `--combobox-field-radius-rounded` corners. Inside: a `search` icon, the typed text "Doc", then at the right a circular clear icon, a short vertical divider and a chevron. The border is `--combobox-field-border-width-focused` blue (`--combobox-field-border-color-open`). `--combobox-menu-offset` below, a white floating list of the same width shows rows "Dock **3**", "Dock **4 north**" with the untyped part bold (`--combobox-match-font-weight`); the highlighted row has a blue focus ring inside its edges. For a multi combobox, show the closed field reading "3 selected" with a clear control, and the open field holding removable chips.
