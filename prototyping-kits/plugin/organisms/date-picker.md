---
name: Date Picker
level: organism
status: draft
composes: [../molecules/input.md, ../atoms/icon-button.md, ../atoms/button.md, ../molecules/menu-item.md]
tokens:
  # fields
  date-picker-fields-gap: '{space.space-lg}'
  date-picker-field-width: '{component-sizes.size-date-picker-field-width}'
  date-picker-trigger-size: '{control.control-md}'
  date-picker-trigger-radius-rounded: '{radius.radius-element-sm}'
  date-picker-trigger-foreground: '{colors.color-ink-medium}'
  date-picker-trigger-foreground-disabled: '{colors.color-ink-disabled}'
  # popover
  date-picker-popover-background: '{colors.color-fill-default}'
  date-picker-popover-radius-rounded: '{radius.radius-sm}'
  date-picker-popover-radius-sharp: '{radius.radius-none}'
  date-picker-popover-shadow: '{shadow.shadow-small}'
  date-picker-popover-border-width: '{stroke.stroke-thin}'
  date-picker-popover-border-color: '{colors.color-fill-transparent}'
  date-picker-popover-padding: '{space.space-lg}'
  date-picker-popover-gap: '{space.space-sm}'
  # header
  date-picker-header-font: '{typography.type-title-medium}'
  date-picker-header-foreground: '{colors.color-ink-high}'
  date-picker-weekday-font: '{typography.type-label-small}'
  date-picker-weekday-foreground: '{colors.color-ink-high}'
  date-picker-weekday-height: '{control.control-md}'
  # day cell
  date-picker-day-size: '{control.control-lg}'
  date-picker-day-font: '{typography.type-body-medium}'
  date-picker-day-font-today: '{typography.type-label-large}'
  date-picker-day-today-border-width: '{stroke.stroke-thin}'
  date-picker-day-radius-rounded: '{radius.radius-element-sm}'
  date-picker-day-radius-sharp: '{radius.radius-none}'
  date-picker-day-foreground-enabled: '{colors.color-ink-high}'
  date-picker-day-background-hover: '{colors.color-fill-faint}'
  date-picker-day-background-pressed: '{colors.color-fill-sunken}'
  date-picker-day-background-selected: '{colors.color-brand-primary-default}'
  date-picker-day-foreground-selected: '{colors.color-brand-primary-on}'
  date-picker-day-background-in-range: '{colors.color-fill-selection}'
  date-picker-day-foreground-in-range: '{colors.color-ink-selection}'
  date-picker-day-foreground-disabled: '{colors.color-ink-disabled}'
  # presets
  date-picker-presets-padding-y: '{space.space-sm}'
  date-picker-preset-padding-y: '{space.space-md}'
  date-picker-preset-padding-x: '{space.space-lg}'
  date-picker-divider-width: '{stroke.stroke-thin}'
  date-picker-divider-color: '{colors.color-line-subtle}'
  # footer
  date-picker-footer-gap: '{space.space-sm}'
  # focus
  date-picker-focus-ring-width: '{stroke.stroke-thick}'
  date-picker-focus-ring-color: '{colors.color-line-focus}'
---

# Date Picker

> A versatile input component for selecting dates, times, or ranges. It provides a calendar interface alongside input fields, supporting single date selection, time selection, date ranges, and week-based selection. Optional presets allow for quick access to common date values like "Today" or "Last 7 days".

## Anatomy
1. Input field(s) — [Input](../molecules/input.md) with Type date (one, or start + end for ranges), each `--date-picker-field-width` wide, `--date-picker-fields-gap` apart; Input with Type time for time selection. Each field keeps the Input's anatomy, read in order label, hint, error, input: the hint (with the date format, "For example, 26 November 2026") sits under the label and stays visible when an error shows, and the error is its own line between hint and input, with icon and words saying how to fix it. The calendar icon trigger inside the field is a `--date-picker-trigger-size` square in `--date-picker-trigger-foreground` (`--date-picker-trigger-foreground-disabled` when the field is disabled).
2. Calendar popover — `--date-picker-popover-background` surface with `--date-picker-popover-shadow`, a `--date-picker-popover-border-width` border in `--date-picker-popover-border-color` (transparent, so the edge shows in forced colours, [patterns 6.10](../patterns/06-accessibility.md)), `--date-picker-popover-padding` inside. Month/year header in `--date-picker-header-font` `--date-picker-header-foreground`, the month spelled out, between previous/next [Icon Buttons](../atoms/icon-button.md); weekday row in `--date-picker-weekday-font` `--date-picker-weekday-foreground`; 7-column day grid.
3. Day cell — selectable date (today, selected, in-range, disabled), a `--date-picker-day-size` square in `--date-picker-day-font`.
4. Presets panel (optional) — list of quick values ("Today", "Last 7 days") as [Menu Items](../molecules/menu-item.md), separated from the calendar by a `--date-picker-divider-width` `--date-picker-divider-color` divider.
5. Footer (time mode and Presets on only) — Cancel ([Button](../atoms/button.md), flavour outline-subtle) then Apply ([Button](../atoms/button.md), flavour primary) at the trailing end, `--date-picker-footer-gap` apart. Single date, date range and week have no footer: picking closes the calendar.

Composed inputs, icon buttons, menu items and buttons keep their own tokens for colours, states and radius.

## Variants
| Mode | Selection | Closes |
|---|---|---|
| single date | one day | when the day is picked |
| time | time value via the time input | on Apply |
| date range | start + end in one calendar, days between highlighted; the end can't fall before the start | when the end is picked |
| week | a whole week row | when the week is picked |
| + presets | side list of quick values | on Apply |

Shape: rounded (default) → popover `--date-picker-popover-radius-rounded`, day cells `--date-picker-day-radius-rounded`; sharp → `--date-picker-popover-radius-sharp` / `--date-picker-day-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Day cell state | Background | Foreground | Notes |
|---|---|---|---|
| default | none | `--date-picker-day-foreground-enabled` | |
| today | none | `--date-picker-day-foreground-enabled` | `--date-picker-day-font-today` plus a `--date-picker-day-today-border-width` outline in the text colour ([patterns 6.11](../patterns/06-accessibility.md)) |
| hover | `--date-picker-day-background-hover` | unchanged | pointer devices only |
| pressed | `--date-picker-day-background-pressed` | unchanged | |
| focused | unchanged | unchanged | `--date-picker-focus-ring-width` `--date-picker-focus-ring-color` ring, drawn inside the cell |
| selected | `--date-picker-day-background-selected` | `--date-picker-day-foreground-selected` | range ends square off on their inner side |
| in range | `--date-picker-day-background-in-range` | `--date-picker-day-foreground-in-range` | square corners so the band reads as one strip |
| disabled | none | `--date-picker-day-foreground-disabled` | shown but can't be chosen, announced as unavailable |

The calendar follows [patterns 3.52](../patterns/03-controls-interaction.md): it opens next to its field from `--breakpoint-medium-min` up, and as an overlay on compact widths, where a range opens full screen. It marks today and doesn't grow on bigger screens. It closes when the pick is complete (see Variants), or on Apply or Cancel where there's a footer; Cancel, Escape and the system Back restore the last value. Typing a date in the field always works ([patterns 3.51](../patterns/03-controls-interaction.md)), accepts typed month names, and moves the calendar to that month. If one part of a typed date is wrong, only that part is named in the error ([patterns 3.56](../patterns/03-controls-interaction.md)). Motion is not yet defined.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet.

| Part | Value |
|---|---|
| Field width | `--date-picker-field-width` |
| Fields gap | `--date-picker-fields-gap` |
| Calendar trigger | `--date-picker-trigger-size` square, `--date-picker-trigger-radius-rounded` focus shape |
| Popover padding / gap | `--date-picker-popover-padding` / `--date-picker-popover-gap` |
| Weekday row height | `--date-picker-weekday-height` |
| Day cell | `--date-picker-day-size` square |
| Presets list | `--date-picker-presets-padding-y` top and bottom; each preset `--date-picker-preset-padding-y` / `--date-picker-preset-padding-x` |
| Footer gap (time, presets) | `--date-picker-footer-gap` |

On narrow screens the presets panel stacks above the calendar and the divider moves to its bottom edge.

## Properties
| Property | Options | Default |
|---|---|---|
| Mode | single date, time, date range, week | single date |
| Presets | on / off | off |
| Rounded | on / off | on |
| Disabled dates | any set of days, or a min / max date | none |
| Disabled | on / off | off |

## Usage
- A short fixed set of dates (about ten or fewer) is a list of those dates, such as a [Select](../molecules/select.md), not a calendar ([patterns 3.53](../patterns/03-controls-interaction.md)).
- Use presets for frequent ranges ("Today", "Last 7 days"); label range endpoints clearly (Start date / End date).
- A time that people in several time zones will read carries its zone ([patterns 3.55](../patterns/03-controls-interaction.md)).
- Use week mode when the data is reported per week; a click anywhere in a row selects the whole week.
- Explain disabled dates in the field hint (e.g. "26 Nov closed").

## Accessibility
- The calendar grid is arrow-key navigable (arrows move by day and week, Page Up / Page Down by month), with each date announced in full, including "today" and "unavailable".
- Day cells show a `--date-picker-focus-ring-width` `--date-picker-focus-ring-color` focus ring and meet the `--date-picker-day-size` touch target; composed controls keep their own accessibility.
- Today adds weight and an outline; selection is exposed with `aria-selected`.
- On closing, focus returns to the field ([patterns 6.29](../patterns/06-accessibility.md)).
- The month title is a polite live region so paging months is announced.

## Claude Prompt
Draw a date input field with a calendar icon; below it, a white (`--date-picker-popover-background`) popover card with `--date-picker-popover-radius-rounded` corners and a soft `--date-picker-popover-shadow`. The popover shows a month header ("March 2026") in `--date-picker-header-font` with chevron left/right icon buttons, a row of weekday initials, and a 7-column grid of `--date-picker-day-size` day numbers. A selected start and end day are solid blue (`--date-picker-day-background-selected`) with white numbers (`--date-picker-day-foreground-selected`), and the days between have a pale blue (`--date-picker-day-background-in-range`) band. A left column lists presets like "Today", "Last 7 days", "Last 30 days". With presets, a footer holds an outline Cancel and a blue Apply button; without them, there is no footer.
