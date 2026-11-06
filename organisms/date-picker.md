---
name: Date Picker
level: organism
status: draft
composes: [../molecules/date-input.md, ../molecules/time-input.md, ../atoms/icon-button.md, ../atoms/button.md, ../molecules/list-item.md]
tokens:
  date-picker-day-foreground-enabled: '{colors.main-default}'
  date-picker-day-background-selected: '{colors.surface-primary}'
  date-picker-day-background-in-range: '{colors.surface-selected}'
  date-picker-day-foreground-disabled: '{colors.main-disabled}'
  date-picker-focus-ring-width: '{border.border-size-medium}'
  date-picker-focus-ring-color: '{colors.border-primary}'
  date-picker-popover-background: '{colors.surface-default}'
  date-picker-popover-radius-rounded: '{rounded.radius-minimal}'
---

# Date Picker

> A versatile input component for selecting dates, times, or ranges. It provides a calendar interface alongside input fields, supporting single date selection, time selection, date ranges, and week-based selection. Optional presets allow for quick access to common date values like "Today" or "Last 7 Days."

This page is a composition guide built from existing Zebra atoms and molecules. Measurements to be defined.

## Anatomy
1. Input field(s) — [date input](../molecules/date-input.md) (one, or start + end for ranges); [time input](../molecules/time-input.md) for time selection.
2. Calendar popover — month/year header with previous/next [Icon Buttons](../atoms/icon-button.md), weekday row, day grid.
3. Day cell — selectable date (today, selected, in-range, disabled).
4. Presets panel (optional) — list of quick values ("Today", "Last 7 Days") as [List Items](../molecules/list-item.md).
5. Footer — Cancel ([Button](../atoms/button.md), flavor outline) / Apply ([Button](../atoms/button.md), flavor primary). Composed inputs, icon buttons, list items and buttons keep their own tokens for colours, states and radius.

## Variants
| Mode | Selection |
|---|---|
| single date | one day |
| time | time value via time input |
| date range | start + end, days between highlighted |
| week | a whole week row |
| + presets | side list of quick values |

## States
| Day cell state | Intended treatment |
|---|---|
| default | `--date-picker-day-foreground-enabled` text |
| today | marked distinctly (not by colour alone) |
| selected | primary fill (`--date-picker-day-background-selected`) |
| in range | subtle selected fill (`--date-picker-day-background-in-range`) |
| hover / focus | hover surface / `--date-picker-focus-ring-width` focus ring |
| disabled | `--date-picker-day-foreground-disabled` |

## Spacing & Sizing
Measurements to be defined. Stated so far: the popover is `--date-picker-popover-background` with `--date-picker-popover-radius-rounded` corners when rounded. Spacing, borders, elevation and scrim will use the Zebra semantic scales once defined.

## Properties
| Property | Options |
|---|---|
| Mode | single date, time, date range, week |
| Presets | on / off |
| Rounded | on / off |
| Disabled dates | any set of days |

## Usage
- Always allow typing the date in the input as well as picking from the calendar.
- Use presets for frequent ranges; label range endpoints clearly.
- Calendar grid must be arrow-key navigable with announced dates.
- Day cells (the picker's own part) show a `--date-picker-focus-ring-width` `--date-picker-focus-ring-color` focus ring and meet the recommended touch target; composed controls keep their own accessibility. Never rely on colour alone.

## Stitch Prompt
Draw a date input field with a calendar icon; below it, a white popover card with `--date-picker-popover-radius-rounded` corners and a soft shadow. The popover shows a month header ("March 2026") with chevron left/right icon buttons, a row of weekday initials, and a 7-column grid of day numbers. A selected start and end day are solid blue (`--date-picker-day-background-selected`) with white numbers, the days between have a pale blue (`--date-picker-day-background-in-range`) band. A left column lists presets like "Today", "Last 7 Days", "Last 30 Days". A footer holds Cancel and a blue Apply button.
