---
name: Gantt View
level: organism
status: draft
composes: [../molecules/list-item.md, ../atoms/progress-bar.md, ../atoms/tooltip.md, ../atoms/avatar.md, ../molecules/segmented-control.md]
tokens:
  gantt-view-container-spacing-minimum: '{spacing.spacing-minimum}'
  gantt-view-container-spacing-maximum: '{spacing.spacing-4xl}'
  gantt-view-container-radius-rounded: '{rounded.radius-minimal}'
  gantt-view-container-background: '{colors.surface-default}'
  gantt-view-content-foreground: '{colors.main-default}'
  gantt-view-content-foreground-subtle: '{colors.main-subtle}'
  gantt-view-container-border-color: '{colors.border-default}'
  gantt-view-touch-target-size-minimum: '{layout.touch-target-ios}'
  gantt-view-touch-target-size-recommended: '{layout.touch-target-recommended}'
  gantt-view-focus-ring-width: '{border.border-size-medium}'
  gantt-view-focus-ring-color: '{colors.border-primary}'
---

# Gantt View

> A component for visualizing time-based data, such as tasks, schedules, or project plans, along a timeline. Commonly used for planning, tracking progress, and managing timelines in complex workflows.

A composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Task list column — task names (like [list items](../molecules/list-item.md)), optional [avatar](../atoms/avatar.md) for assignee.
2. Timeline header — date scale (days / weeks / months), zoom via [segmented control](../molecules/segmented-control.md).
3. Grid — vertical time gridlines, today marker.
4. Task bar — horizontal bar spanning start→end, optional progress fill: a [Progress Bar](../atoms/progress-bar.md) indicator (`--progress-bar-indicator-background`); the progress bar's own tokens govern the fill.
5. Dependencies / milestones (optional).
6. [Tooltip](../atoms/tooltip.md) on bar hover with details.

## Variants
To be defined (time scales, bar colours per status).

## States
Task bar: default / hover (tooltip) / selected / overdue — treatments to be defined.

## Spacing & Sizing
Measurements to be defined. Use Zeta tokens only: spacing `--gantt-view-container-spacing-minimum` … `--gantt-view-container-spacing-maximum`; radius `--gantt-view-container-radius-rounded` when rounded; background `--gantt-view-container-background`, text `--gantt-view-content-foreground`, secondary text `--gantt-view-content-foreground-subtle`, borders `--gantt-view-container-border-color`.

## Usage
- Keep task labels readable in the left column; don't rely on bar colour alone for status.
- Provide a tabular/list alternative for screen-reader users.
- Composed atoms and molecules keep their own accessibility. The gantt's own task bars: touch targets ≥ `--gantt-view-touch-target-size-minimum`–`--gantt-view-touch-target-size-recommended`, focus ring `--gantt-view-focus-ring-width` `--gantt-view-focus-ring-color`, never rely on colour alone.

## Stitch Prompt
Draw a project timeline: a left column listing task names with small avatars, and to the right a horizontally scrolling grid with week labels across the top and faint vertical gridlines. Each task has a rounded horizontal bar spanning its dates, partly filled in blue (`--progress-bar-indicator-background`) to show progress; a thin vertical line marks today. A segmented control above toggles Day / Week / Month.
