---
name: Date Picker
level: organism
status: draft
composes: [../molecules/input.md, ../atoms/icon-button.md, ../atoms/button.md, ../molecules/menu-item.md]
tokens:
  # fields
  date-picker-fields-gap: '{space.space-lg}'
  date-picker-field-width: '{component-sizes.size-date-picker-field-width}'
  date-picker-trigger-size: '{control.control-target-min}'
  date-picker-trigger-radius-rounded: '{radius.radius-element-sm}'
  date-picker-trigger-foreground: '{colors.color-ink-medium}'
  date-picker-trigger-foreground-disabled: '{colors.color-ink-disabled}'
  # popover
  date-picker-popover-background: '{colors.color-fill-default}'
  date-picker-popover-radius-rounded: '{radius.radius-sm}'
  date-picker-popover-radius-sharp: '{radius.radius-none}'
  date-picker-popover-shadow: '{shadow.shadow-small}'
  date-picker-popover-padding: '{space.space-lg}'
  date-picker-popover-gap: '{space.space-sm}'
  # header
  date-picker-header-font: '{typography.type-title-medium}'
  date-picker-header-foreground: '{colors.color-ink-high}'
  date-picker-weekday-font: '{typography.type-label-small}'
  date-picker-weekday-foreground: '{colors.color-ink-high}'
  date-picker-weekday-height: '{control.control-target-min}'
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

> A versatile input component for selecting dates, times, or ranges. It provides a calendar interface alongside input fields, supporting single date selection, time selection, date ranges, and week-based selection. Optional presets allow for quick access to common date values like "Today" or "Last 7 Days."

## Anatomy
1. Input field(s) — [Input](../molecules/input.md) with Type date (one, or start + end for ranges), each `--date-picker-field-width` wide, `--date-picker-fields-gap` apart; Input with Type time for time selection. The calendar icon trigger inside the field is a `--date-picker-trigger-size` square in `--date-picker-trigger-foreground` (`--date-picker-trigger-foreground-disabled` when the field is disabled).
2. Calendar popover — `--date-picker-popover-background` surface with `--date-picker-popover-shadow`, `--date-picker-popover-padding` inside. Month/year header in `--date-picker-header-font` `--date-picker-header-foreground` between previous/next [Icon Buttons](../atoms/icon-button.md); weekday row in `--date-picker-weekday-font` `--date-picker-weekday-foreground`; 7-column day grid.
3. Day cell — selectable date (today, selected, in-range, disabled), a `--date-picker-day-size` square in `--date-picker-day-font`.
4. Presets panel (optional) — list of quick values ("Today", "Last 7 Days") as [Menu Items](../molecules/menu-item.md), separated from the calendar by a `--date-picker-divider-width` `--date-picker-divider-color` divider.
5. Footer — Cancel ([Button](../atoms/button.md), flavour outline) / Apply ([Button](../atoms/button.md), flavour primary), `--date-picker-footer-gap` apart.

Composed inputs, icon buttons, menu items and buttons keep their own tokens for colours, states and radius.

## Variants
| Mode | Selection |
|---|---|
| single date | one day |
| time | time value via the time input |
| date range | start + end, days between highlighted |
| week | a whole week row |
| + presets | side list of quick values |

Shape: rounded (default) → popover `--date-picker-popover-radius-rounded`, day cells `--date-picker-day-radius-rounded`; sharp → `--date-picker-popover-radius-sharp` / `--date-picker-day-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Day cell state | Background | Foreground | Notes |
|---|---|---|---|
| default | none | `--date-picker-day-foreground-enabled` | |
| today | none | `--date-picker-day-foreground-enabled` | `--date-picker-day-font-today` plus a `--date-picker-day-today-border-width` outline in the text colour, so it is not marked by colour alone |
| hover | `--date-picker-day-background-hover` | unchanged | pointer devices only |
| pressed | `--date-picker-day-background-pressed` | unchanged | |
| focused | unchanged | unchanged | `--date-picker-focus-ring-width` `--date-picker-focus-ring-color` ring, drawn inside the cell |
| selected | `--date-picker-day-background-selected` | `--date-picker-day-foreground-selected` | range ends square off on their inner side |
| in range | `--date-picker-day-background-in-range` | `--date-picker-day-foreground-in-range` | square corners so the band reads as one strip |
| disabled | none | `--date-picker-day-foreground-disabled` | not selectable, announced as unavailable |

The popover opens from the field's calendar trigger and closes on Apply or Cancel; Cancel restores the last applied value. Typing a date in the field always works and moves the calendar to that month. Motion is not yet defined.

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
| Footer gap | `--date-picker-footer-gap` |

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
- Always allow typing the date in the input as well as picking from the calendar.
- Use presets for frequent ranges; label range endpoints clearly (Start date / End date).
- Use week mode when the data is reported per week; a click anywhere in a row selects the whole week.
- Explain disabled dates in the field hint (e.g. "26 Nov closed").

## Accessibility
- The calendar grid is arrow-key navigable (arrows move by day and week, Page Up / Page Down by month), with each date announced in full, including "today" and "unavailable".
- Day cells show a `--date-picker-focus-ring-width` `--date-picker-focus-ring-color` focus ring and meet the `--date-picker-day-size` touch target; composed controls keep their own accessibility.
- Today, selected and in-range are never shown by colour alone: today adds weight and an outline, selection is exposed with `aria-selected`.
- The month title is a polite live region so paging months is announced.

## Claude Prompt
Draw a date input field with a calendar icon; below it, a white (`--date-picker-popover-background`) popover card with `--date-picker-popover-radius-rounded` corners and a soft `--date-picker-popover-shadow`. The popover shows a month header ("March 2026") in `--date-picker-header-font` with chevron left/right icon buttons, a row of weekday initials, and a 7-column grid of `--date-picker-day-size` day numbers. A selected start and end day are solid blue (`--date-picker-day-background-selected`) with white numbers (`--date-picker-day-foreground-selected`), and the days between have a pale blue (`--date-picker-day-background-in-range`) band. A left column lists presets like "Today", "Last 7 Days", "Last 30 Days". A footer holds an outline Cancel and a blue Apply button.
