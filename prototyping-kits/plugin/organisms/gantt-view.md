---
name: Gantt View
level: organism
status: draft
composes: [../molecules/menu-item.md, ../atoms/progress-bar.md, ../atoms/tooltip.md, ../atoms/avatar.md, ../molecules/segmented-control.md]
tokens:
  # container
  gantt-view-container-background: '{colors.color-fill-default}'
  gantt-view-container-border-color: '{colors.color-line-default}'
  gantt-view-container-border-width: '{stroke.stroke-thin}'
  gantt-view-container-radius-rounded: '{radius.radius-sm}'
  gantt-view-container-radius-sharp: '{radius.radius-none}'
  # toolbar
  gantt-view-toolbar-padding-y: '{space.space-md}'
  gantt-view-toolbar-padding-x: '{space.space-lg}'
  gantt-view-toolbar-gap: '{space.space-md}'
  gantt-view-title-font: '{typography.type-label-large}'
  # text
  gantt-view-content-foreground: '{colors.color-ink-high}'
  gantt-view-content-foreground-subtle: '{colors.color-ink-medium}'
  # task column
  gantt-view-task-column-width: '{primitives.scale-container-0}'
  gantt-view-task-padding-x: '{space.space-lg}'
  gantt-view-task-gap: '{space.space-sm}'
  gantt-view-task-name-font: '{typography.type-label-medium}'
  gantt-view-task-meta-font: '{typography.type-body-xsmall}'
  gantt-view-task-meta-gap: '{space.space-2xs}'
  gantt-view-status-icon-size: '{control.control-icon-sm}'
  gantt-view-row-height: '{control.control-lg}'
  # timeline header
  gantt-view-header-row-height: '{primitives.scale-10}'
  gantt-view-header-font: '{typography.type-label-small}'
  gantt-view-header-padding-x: '{space.space-2xs}'
  # day column width per zoom
  gantt-view-day-width-day: '{primitives.scale-17}'
  gantt-view-day-width-week: '{primitives.scale-7}'
  gantt-view-day-width-month: '{primitives.scale-4}'
  # today marker
  gantt-view-today-marker-width: '{stroke.stroke-thick}'
  gantt-view-today-marker-background: '{colors.color-fill-inverse}'
  gantt-view-today-label-foreground: '{colors.color-ink-inverse}'
  gantt-view-today-label-font: '{typography.type-label-small}'
  gantt-view-today-label-padding-x: '{space.space-2xs}'
  gantt-view-today-label-offset: '{space.space-2xs}'
  # task bar
  gantt-view-bar-height: '{primitives.scale-10}'
  gantt-view-bar-background: '{colors.color-fill-default}'
  gantt-view-bar-border-color: '{colors.color-line-default}'
  gantt-view-bar-border-color-hover: '{colors.color-line-strong}'
  gantt-view-bar-border-color-selected: '{colors.color-line-selection}'
  gantt-view-bar-border-width-selected: '{stroke.stroke-thick}'
  gantt-view-bar-radius-rounded: '{radius.radius-element-sm}'
  gantt-view-bar-progress-background: '{colors.color-brand-primary-default}'
  gantt-view-tooltip-offset: '{space.space-lg}'
  # touch target, focus
  gantt-view-touch-target-size-minimum: '{primitives.scale-14}'
  gantt-view-touch-target-size-recommended: '{control.control-lg}'
  gantt-view-focus-ring-width: '{stroke.stroke-thick}'
  gantt-view-focus-ring-color: '{colors.color-line-focus}'
---

# Gantt View

> A component for visualizing time-based data, such as tasks, schedules, or project plans, along a timeline. Commonly used for planning, tracking progress, and managing timelines in complex workflows.

## Anatomy
1. Container — `--gantt-view-container-background` surface with a `--gantt-view-container-border-width` `--gantt-view-container-border-color` border and `--gantt-view-container-radius-rounded` corners.
2. Toolbar — title in `--gantt-view-title-font` and the zoom control, a [Segmented Control](../molecules/segmented-control.md) (Day / Week / Month).
3. Task list column — a sticky `--gantt-view-task-column-width` column; each row reads like a [Menu Item](../molecules/menu-item.md): optional [Avatar](../atoms/avatar.md) for the assignee, task name in `--gantt-view-task-name-font`, progress and status in `--gantt-view-task-meta-font` `--gantt-view-content-foreground-subtle`, their parts `--gantt-view-task-meta-gap` apart.
4. Timeline header — two rows (month, then day / week) of `--gantt-view-header-font` labels.
5. Grid — vertical gridlines at each unit, in `--gantt-view-container-border-color`; a today marker (`--gantt-view-today-marker-width`, `--gantt-view-today-marker-background`) with a "Today" label in `--gantt-view-today-label-foreground` on the marker colour.
6. Task bar — horizontal bar spanning start → end, `--gantt-view-bar-height` tall on `--gantt-view-bar-background`, with a progress fill in `--gantt-view-bar-progress-background` (the [Progress Bar](../atoms/progress-bar.md) indicator colour).
7. Dependencies / milestones (optional, not yet specified).
8. [Tooltip](../atoms/tooltip.md) on bar hover or focus with name, dates, progress and status; its pointer sits `--gantt-view-tooltip-offset` in from the bar's start.

## Variants
| Zoom | Day column width | Header units |
|---|---|---|
| day | `--gantt-view-day-width-day` | each date |
| week (default) | `--gantt-view-day-width-week` | week start dates |
| month | `--gantt-view-day-width-month` | week numbers |

Shape: rounded (default) → `--gantt-view-container-radius-rounded`; sharp → `--gantt-view-container-radius-sharp`. Bar colours per status are not yet specified. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Task bar state | Border | Notes |
|---|---|---|
| default | `--gantt-view-bar-border-color` | progress fill per task |
| hover | `--gantt-view-bar-border-color-hover` | tooltip shows |
| focused | unchanged | `--gantt-view-focus-ring-width` `--gantt-view-focus-ring-color` ring; tooltip shows |
| selected | `--gantt-view-bar-border-width-selected` `--gantt-view-bar-border-color-selected` | toggled by click |
| overdue | `--gantt-view-bar-border-color` | warning icon and "Overdue" in the task column, never colour alone |

Switching zoom redraws the timeline without animation; the timeline scrolls horizontally while the task column stays put.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet.

| Part | Value |
|---|---|
| Toolbar padding (V / H) / gap | `--gantt-view-toolbar-padding-y` / `--gantt-view-toolbar-padding-x` / `--gantt-view-toolbar-gap` |
| Task column | `--gantt-view-task-column-width` wide, `--gantt-view-task-padding-x` horizontal padding, `--gantt-view-task-gap` between avatar and text |
| Task row height | `--gantt-view-row-height` |
| Header row height | `--gantt-view-header-row-height`, labels `--gantt-view-header-padding-x` from the gridline |
| Task bar | `--gantt-view-bar-height` tall, `--gantt-view-bar-radius-rounded` corners, at least `--gantt-view-touch-target-size-minimum` wide |
| Today label | `--gantt-view-today-label-font`, `--gantt-view-today-label-padding-x` padding, `--gantt-view-today-label-offset` from the marker |
| Status icon | `--gantt-view-status-icon-size` |

## Properties
| Property | Options | Default |
|---|---|---|
| Zoom | day, week, month | week |
| Rounded | on / off | on |
| Assignee avatar | on / off | on |
| Today marker | on / off | on |
| Tasks | name, assignee, start, end, progress | — |

## Usage
- Keep task labels readable in the left column; don't rely on bar colour alone for status.
- Provide a tabular / list alternative for screen-reader users.
- Use day zoom for short schedules and month zoom for programmes that run for several months.

## Accessibility
- Provide a table of the same tasks (name, assignee, start, end, progress, status) for screen readers.
- Task bars are buttons: touch targets at least `--gantt-view-touch-target-size-minimum` to `--gantt-view-touch-target-size-recommended`, a `--gantt-view-focus-ring-width` `--gantt-view-focus-ring-color` focus ring, and an accessible name that repeats the tooltip text.
- Selection is exposed with `aria-pressed`; overdue is written out in text with an icon.
- The scrolling timeline is a focusable region, so it can be scrolled from the keyboard. Composed atoms and molecules keep their own accessibility.

## Claude Prompt
Draw a project timeline in a white (`--gantt-view-container-background`) panel with a thin `--gantt-view-container-border-color` border: a left column `--gantt-view-task-column-width` wide listing task names with small avatars, and to the right a horizontally scrolling grid with month and week labels across the top and faint vertical gridlines. Each task has a rounded horizontal bar `--gantt-view-bar-height` tall spanning its dates, partly filled in blue (`--gantt-view-bar-progress-background`) to show progress; a dark vertical line (`--gantt-view-today-marker-background`) marks today. A segmented control above toggles Day / Week / Month.
