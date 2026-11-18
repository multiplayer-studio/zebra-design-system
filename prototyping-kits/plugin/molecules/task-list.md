---
name: Task List
level: molecule
status: draft
composes: [../atoms/icon.md, ./progress-circle.md, ../atoms/button.md, ../atoms/divider.md]
tokens:
  # header
  task-list-summary-font: '{typography.type-label-medium}'
  task-list-summary-foreground: '{colors.color-ink-medium}'
  task-list-header-gap: '{space.space-sm}'
  # row
  task-list-row-background-enabled: '{colors.color-status-ghost-default}'
  task-list-row-background-hover: '{colors.color-status-ghost-faint}'
  task-list-row-background-pressed: '{colors.color-status-ghost-deep}'
  task-list-row-transition: '{motion.motion-feedback}'
  task-list-focus-ring-width: '{stroke.stroke-thick}'
  task-list-focus-ring-color: '{colors.color-line-focus}'
  task-list-row-radius-sharp: '{radius.radius-none}'
  task-list-row-radius-rounded: '{radius.radius-element-sm}'
  # text
  task-list-label-font: '{typography.type-body-medium}'
  task-list-label-foreground: '{colors.color-ink-high}'
  task-list-label-foreground-done: '{colors.color-ink-medium}'
  task-list-status-font: '{typography.type-body-small}'
  task-list-status-foreground: '{colors.color-ink-medium}'
  task-list-status-foreground-failed: '{colors.color-status-error-default}'
  # status icons
  task-list-icon-size: '{icon.icon-size-medium}'
  task-list-icon-foreground-waiting: '{colors.color-ink-medium}'
  task-list-icon-foreground-approval: '{colors.color-status-warning-default}'
  task-list-icon-foreground-done: '{colors.color-status-success-default}'
  task-list-icon-foreground-failed: '{colors.color-status-error-default}'
  task-list-icon-foreground-retried: '{colors.color-status-info-default}'
  task-list-progress-size: '{progress-circle.progress-circle-size-xsmall}'
  # sizes (row height is a minimum)
  task-list-row-min-height: '{control.control-target-min}'
  task-list-row-padding-y: '{space.space-sm}'
  task-list-row-padding-x: '{space.space-md}'
  task-list-row-gap: '{space.space-md}'
  task-list-text-gap: '{space.space-3xs}'
---

# Task List

> A list of steps or tasks, each named with a verb and showing its status (waiting, running, needs approval, done, failed or retried) in an icon and words.

## Anatomy
1. Header (optional) — a summary in `--task-list-summary-font` `--task-list-summary-foreground` ("3 of 6 done"), and in the plan variant the list's actions (Approve, Stop), `--task-list-header-gap` above the rows.
2. Rows — one per task, at least `--task-list-row-min-height` tall, padded `--task-list-row-padding-y` / `--task-list-row-padding-x`, parts `--task-list-row-gap` apart, with a [Divider](../atoms/divider.md) between rows where space isn't enough:
   1. Status mark — an [Icon](../atoms/icon.md) at `--task-list-icon-size` coloured for its status, or, while running, a [Progress Circle](./progress-circle.md), indeterminate, at `--task-list-progress-size`.
   2. Label — the task as a verb phrase ("Install firmware on 12 printers"), `--task-list-label-font` `--task-list-label-foreground`. It wraps.
   3. Status line — the status in words, plus any detail ("Failed: printer offline", "Waiting for Dock 3"), `--task-list-text-gap` under the label in `--task-list-status-font` `--task-list-status-foreground`.
   4. Row action (optional) — at the trailing end: a [Button](../atoms/button.md), small ("Approve", "Retry", "Edit"), or a chevron Icon (`chevron_right`) where the row opens the task.

## Variants
**Status** (every status shows its icon and its word; colour is never the only signal)

| Status | Mark | Word | Label | Row action |
|---|---|---|---|---|
| waiting | `pending`, `--task-list-icon-foreground-waiting` | "Waiting", "Not started" or "Can't start yet: …" | `--task-list-label-foreground` | none; a task that can't start yet isn't a link |
| running | Progress Circle, indeterminate | "Running" with any count ("4 of 12") | `--task-list-label-foreground` | Stop, where it can be stopped |
| needs approval | `hand`, `--task-list-icon-foreground-approval` | "Needs your approval" | `--task-list-label-foreground` | Approve (primary flavour in that row only when it's the screen's next action) |
| done | `check_circle`, `--task-list-icon-foreground-done` | "Done" | `--task-list-label-foreground-done`, so unfinished tasks stand out | none |
| failed | `error`, `--task-list-icon-foreground-failed` | "Failed: " and the reason, in `--task-list-status-foreground-failed` | `--task-list-label-foreground` | Retry |
| retried | `replay`, `--task-list-icon-foreground-retried` | "Done after retry" or "Retrying (2 of 3)" | `--task-list-label-foreground` | none |

**Variant**

| Variant | Rows | Use |
|---|---|---|
| checklist (default) | each available task is a link to do it, in any order | long work across several sessions ([patterns 2.36](../patterns/02-navigation-flow.md)) |
| plan | each step can be edited or removed; the header holds Approve and Stop | multi-step work shown before it starts ([patterns 9.37](../patterns/09-ai.md)) |
| progress | read-only, statuses update in place | work running now, in place of a percentage where time isn't reliable ([patterns 4.28](../patterns/04-states-feedback.md), [patterns 9.38](../patterns/09-ai.md)) |

**Shape**: rounded (default) → `--task-list-row-radius-rounded`; sharp → `--task-list-row-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
Row interaction states apply only where the row is a link (checklist) or opens the task:

| State | Background | Notes |
|---|---|---|
| enabled | `--task-list-row-background-enabled` | transparent |
| hover | `--task-list-row-background-hover` | pointer devices only |
| pressed | `--task-list-row-background-pressed` | over `--task-list-row-transition` |
| focus | unchanged | `--task-list-focus-ring-width` `--task-list-focus-ring-color` ring inside the row |

A status change swaps the mark and words in place; rows never re-order while work runs. A step that changes from the plan shows the change and asks for approval again ([patterns 9.38](../patterns/09-ai.md)). With reduced motion the running Progress Circle stops spinning and the word "Running" carries the state.

## Spacing & Sizing
| Property | Value |
|---|---|
| Row min height | `--task-list-row-min-height` |
| Row padding (V / H) | `--task-list-row-padding-y` / `--task-list-row-padding-x` |
| Mark ↔ text ↔ action | `--task-list-row-gap` |
| Label ↔ status line | `--task-list-text-gap` |
| Status mark | `--task-list-icon-size`; running `--task-list-progress-size` |
| Header ↔ rows | `--task-list-header-gap` |

The list fills its container; the text takes what the mark and action leave. Heights are minimums.

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | checklist, plan, progress | checklist |
| Show Summary | on / off | on |
| Divided | on / off | off |
| Shape | rounded, sharp | rounded |
| Rows | label, status, status detail, optional action | — |

## Usage
- Name every task with a verb ("Connect the scanner", not "Scanner") ([patterns 2.36](../patterns/02-navigation-flow.md)).
- Show the list at the start and every time the person returns to the work ([patterns 2.36](../patterns/02-navigation-flow.md)).
- Keep done tasks quiet so the remaining ones stand out; don't remove them.
- Say why a task failed and offer Retry on its row; say why a task can't start yet.
- For AI or automated multi-step work, show the plan with its cost, reach and permissions before it runs, then let the same list become the progress ([patterns 9.37](../patterns/09-ai.md), [patterns 9.38](../patterns/09-ai.md)).
- Use a [Stepper](../organisms/stepper.md) instead for a fixed sequence the person must go through in order.

## Accessibility
- Mark the list up as a list (`ol` where order matters); each row's accessible text includes its status word, not just the icon.
- Status marks are decorative next to the words and hidden from assistive tech.
- Announce status changes through a polite live region ("Install firmware: failed, printer offline"); announce only changes, not every count tick.
- A task that can't start yet isn't a link and isn't focusable, but its reason is readable.
- Row actions name their task ("Retry install firmware"). Approve and Retry never act on the whole list unless they say so.
- The running indicator doesn't flash and stops under reduced motion ([patterns 6.66](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a task list under a grey `--task-list-summary-font` summary "3 of 6 done". Rows at least `--task-list-row-min-height` tall: a green check-circle icon with the grey label "Scan dock labels" and "Done"; a small spinning circle with "Install firmware on 12 printers" and "Running · 4 of 12"; an amber `hand` icon with "Restart Dock 3 printers", "Needs your approval" and a small "Approve" button at the right; a red `error` icon with "Update Dock 5 printer", a red line "Failed: printer offline" and a small "Retry" button; a grey `pending` icon with "Print test labels" and "Can't start yet: waiting for firmware". Labels are near-black `--task-list-label-font`, status lines `--task-list-status-font`.
