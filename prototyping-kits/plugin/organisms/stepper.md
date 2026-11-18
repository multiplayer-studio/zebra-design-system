---
name: Stepper
level: organism
status: stable
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  # indicator (shared by Step / Horizontal, Step / Vertical and Step Card)
  stepper-indicator-background-default: '{colors.color-fill-default}'
  stepper-indicator-background-complete: '{colors.color-status-success-default}'
  stepper-indicator-background-partial: '{colors.color-status-success-faint}'
  stepper-indicator-background-active: '{colors.color-brand-primary-default}'
  stepper-indicator-background-error: '{colors.color-status-error-default}'
  stepper-indicator-background-disabled: '{colors.color-line-subtle}'
  stepper-indicator-border-color-default: '{colors.color-line-default}'
  stepper-indicator-border-color-complete: '{colors.color-status-success-default}'
  stepper-indicator-border-color-partial: '{colors.color-status-success-default}'
  stepper-indicator-border-color-active: '{colors.color-brand-primary-default}'
  stepper-indicator-border-color-error: '{colors.color-status-error-default}'
  stepper-indicator-border-color-disabled: '{colors.color-line-subtle}'
  stepper-indicator-foreground-default: '{colors.color-ink-high}'
  stepper-indicator-foreground-complete: '{colors.color-ink-always-white}'
  stepper-indicator-foreground-partial: '{colors.color-ink-high}'
  stepper-indicator-foreground-active: '{colors.color-brand-primary-on}'
  stepper-indicator-foreground-error: '{colors.color-ink-always-white}'
  stepper-indicator-foreground-disabled: '{colors.color-ink-disabled}'
  # step label and subtitle (Step / Horizontal, Step / Vertical)
  stepper-label-foreground-default: '{colors.color-ink-medium}'
  stepper-label-foreground-complete: '{colors.color-ink-medium}'
  stepper-label-foreground-partial: '{colors.color-ink-medium}'
  stepper-label-foreground-active: '{colors.color-ink-high}'
  stepper-label-foreground-error: '{colors.color-status-error-default}'
  stepper-label-foreground-disabled: '{colors.color-ink-disabled}'
  stepper-subtitle-foreground: '{colors.color-ink-medium}'
  stepper-subtitle-foreground-disabled: '{colors.color-ink-disabled}'
  # connector
  stepper-connector-color-default: '{colors.color-line-default}'
  stepper-connector-color-complete: '{colors.color-status-success-default}'
  stepper-connector-color-partial: '{colors.color-status-success-default}'
  stepper-connector-color-active: '{colors.color-line-default}'
  stepper-connector-color-error: '{colors.color-line-default}'
  stepper-connector-color-disabled: '{colors.color-line-default}'
  # step card
  stepper-card-container-background-default: '{colors.color-fill-default}'
  stepper-card-container-background-complete: '{colors.color-status-success-faint}'
  stepper-card-container-background-partial: '{colors.color-fill-default}'
  stepper-card-container-background-active: '{colors.color-brand-primary-faint}'
  stepper-card-container-background-error: '{colors.color-fill-default}'
  stepper-card-container-background-disabled: '{colors.color-fill-default}'
  stepper-card-container-border-color-default: '{colors.color-line-default}'
  stepper-card-container-border-color-complete: '{colors.color-status-success-default}'
  stepper-card-container-border-color-partial: '{colors.color-line-default}'
  stepper-card-container-border-color-active: '{colors.color-brand-primary-default}'
  stepper-card-container-border-color-error: '{colors.color-status-error-default}'
  stepper-card-container-border-color-disabled: '{colors.color-line-subtle}'
  stepper-card-label-foreground-default: '{colors.color-ink-medium}'
  stepper-card-label-foreground-complete: '{colors.color-ink-medium}'
  stepper-card-label-foreground-partial: '{colors.color-ink-medium}'
  stepper-card-label-foreground-active: '{colors.color-ink-high}'
  stepper-card-label-foreground-error: '{colors.color-status-error-default}'
  stepper-card-label-foreground-disabled: '{colors.color-ink-disabled}'
  # step segment (compact)
  stepper-segment-start-background-default: '{colors.color-line-subtle}'
  stepper-segment-start-background-complete: '{colors.color-brand-primary-default}'
  stepper-segment-start-background-partial: '{colors.color-brand-primary-default}'
  stepper-segment-start-background-active: '{colors.color-brand-primary-default}'
  stepper-segment-start-background-error: '{colors.color-status-error-default}'
  stepper-segment-start-background-disabled: '{colors.color-line-subtle}'
  stepper-segment-end-background-default: '{colors.color-line-subtle}'
  stepper-segment-end-background-complete: '{colors.color-brand-primary-default}'
  stepper-segment-end-background-partial: '{colors.color-line-subtle}'
  stepper-segment-end-background-active: '{colors.color-brand-primary-default}'
  stepper-segment-end-background-error: '{colors.color-status-error-default}'
  stepper-segment-end-background-disabled: '{colors.color-line-subtle}'
  # compact summary
  stepper-compact-count-foreground: '{colors.color-ink-medium}'
  stepper-compact-title-foreground: '{colors.color-ink-high}'
  stepper-compact-subtitle-foreground: '{colors.color-ink-medium}'
  # interactive step (completed steps that can be revisited; Button's scrim and ring)
  stepper-step-background-hover: '{button.button-text-container-background-hover}'
  stepper-step-background-pressed: '{button.button-text-container-background-pressed}'
  stepper-step-focus-ring-width: '{button.button-focus-ring-width}'
  stepper-step-focus-ring-color: '{button.button-focus-ring-color}'
  stepper-step-radius: '{radius.radius-element-sm}'
  # shape
  stepper-indicator-radius: '{radius.radius-pill}'
  stepper-card-container-radius-sharp: '{radius.radius-none}'
  stepper-card-container-radius-rounded: '{radius.radius-sm}'
  stepper-card-container-min-height: '{control.control-lg}'
  stepper-segment-radius: '{radius.radius-pill}'
  # border
  stepper-indicator-border-width: '{stroke.stroke-thick}'
  stepper-connector-width: '{stroke.stroke-thick}'
  stepper-card-container-border-width: '{stroke.stroke-thin}'
  # sizes
  stepper-indicator-size: '{control.control-icon-lg}'
  stepper-indicator-font: '{typography.type-label-small}'
  stepper-indicator-icon-size: '{icon.icon-size-small}'
  stepper-label-font: '{typography.type-label-large}'
  stepper-subtitle-font: '{typography.type-body-small}'
  stepper-text-padding-top: '{space.space-3xs}'
  stepper-text-gap: '{space.space-3xs}'
  stepper-horizontal-container-padding-x: '{space.space-md}'
  stepper-horizontal-step-padding-y: '{space.space-2xs}'
  stepper-horizontal-head-gap: '{space.space-sm}'
  stepper-horizontal-track-height: '{control.control-icon-lg}'
  stepper-vertical-step-gap: '{space.space-xl}'
  stepper-vertical-connector-length: '{space.space-xl}'
  stepper-vertical-steps-gap: '{space.space-none}'
  stepper-vertical-cards-gap: '{space.space-sm}'
  stepper-card-container-padding-y: '{space.space-sm}'
  stepper-card-container-padding-x: '{space.space-md}'
  stepper-card-container-gap: '{space.space-md}'
  stepper-compact-container-gap: '{space.space-md}'
  stepper-compact-summary-gap: '{space.space-2xs}'
  stepper-compact-count-gap: '{space.space-2xs}'
  stepper-compact-count-font: '{typography.type-body-small}'
  stepper-compact-title-font: '{typography.type-title-medium}'
  stepper-compact-subtitle-font: '{typography.type-body-small}'
  stepper-compact-segments-gap: '{space.space-xs}'
  stepper-segment-height: '{space.space-2xs}'
---

# Stepper

> Steppers show where a person is in a sequence of steps: what is finished, what is current and what is still ahead. Completed steps can be revisited from it.

## Anatomy
1. Container — Horizontal Stepper (a row of steps, or on compact a summary over a segment bar) or Vertical Stepper (a column of steps or step cards). The stepper paints nothing itself; every colour comes from the steps it holds.
2. Step — one step of the sequence, set through the container's slot: Step / Horizontal, Step / Vertical or Step Card. Horizontal and vertical are separate parts, not one part turned on its side.
3. Indicator — the `--stepper-indicator-size` circle at the head of every desktop step, with a `--stepper-indicator-border-width` inside border. It shows the step number in `--stepper-indicator-font`, or on complete and error a fixed [Icon](../atoms/icon.md) glyph at `--stepper-indicator-icon-size` (check_mark on complete, priority on error). Glyphs come from Status and can't be swapped.
4. Text — the label in `--stepper-label-font` (the step's name, always present) and, when Show Subtitle is on, a subtitle in `--stepper-subtitle-font` `--stepper-text-gap` beneath it; the text block has `--stepper-text-padding-top` above it and nothing below. Centred under the indicator on Step / Horizontal, beside it on Step / Vertical and Step Card.
5. Connector — a `--stepper-connector-width` line from this step to the next, drawn by the step itself: to the right on Step / Horizontal, below on Step / Vertical. Step Card has none; Show Line turns it off on the last step.
6. Step Card surface (cards arrangement) — a bordered card holding the indicator and text side by side; fill, border and corner come from Status and the set.
7. Compact summary (Horizontal Stepper, compact) — the count ("Step 3 of 5": step label, current step, "of", total steps; or "Step 3" alone when Show Total is off) in `--stepper-compact-count-font` `--stepper-compact-count-foreground`, then the current step's title in `--stepper-compact-title-font` `--stepper-compact-title-foreground` and subtitle in `--stepper-compact-subtitle-font` `--stepper-compact-subtitle-foreground`.
8. Step Segment (compact) — one division of the bar, `--stepper-segment-height` tall at `--stepper-segment-radius`, split into a Start and an End half. It carries no text.

## Variants
| Arrangement | Property | Steps | Layout |
|---|---|---|---|
| Horizontal, default (desktop) | Size=default | Step / Horizontal | steps in a row, each taking an equal share of the width; label centred under its indicator; connector runs indicator to indicator |
| Horizontal, compact (mobile) | Size=compact | Step Segment | the summary above a bar of equal segments; only the current step is named |
| Vertical, rail (default) | Card=false | Step / Vertical | steps in a column; label beside the indicator; connector runs down to the next indicator |
| Vertical, cards | Card=true | Step Card | a column of cards with no connector, `--stepper-vertical-cards-gap` apart |

Step Card comes in two sets that differ only in their corner: rounded (default) → `--stepper-card-container-radius-rounded`, sharp → `--stepper-card-container-radius-sharp`. Use sharp where cards meet a panel edge or the UI is flat.

## States
Status is set on each step; the stepper itself is static.

**Step / Horizontal and Step / Vertical**

| Status | Indicator fill | Indicator border | Indicator content | Label | Connector |
|---|---|---|---|---|---|
| default | `--stepper-indicator-background-default` | `--stepper-indicator-border-color-default` | number, `--stepper-indicator-foreground-default` | `--stepper-label-foreground-default` | `--stepper-connector-color-default` |
| complete | `--stepper-indicator-background-complete` | `--stepper-indicator-border-color-complete` | check_mark, `--stepper-indicator-foreground-complete` | `--stepper-label-foreground-complete` | `--stepper-connector-color-complete` |
| partial | `--stepper-indicator-background-partial` | `--stepper-indicator-border-color-partial` | number, `--stepper-indicator-foreground-partial` | `--stepper-label-foreground-partial` | `--stepper-connector-color-partial` |
| active | `--stepper-indicator-background-active` | `--stepper-indicator-border-color-active` | number, `--stepper-indicator-foreground-active` | `--stepper-label-foreground-active` | `--stepper-connector-color-active` |
| error | `--stepper-indicator-background-error` | `--stepper-indicator-border-color-error` | priority, `--stepper-indicator-foreground-error` | `--stepper-label-foreground-error` | `--stepper-connector-color-error` |
| disabled | `--stepper-indicator-background-disabled` | `--stepper-indicator-border-color-disabled` | number, `--stepper-indicator-foreground-disabled` | `--stepper-label-foreground-disabled` | `--stepper-connector-color-disabled` |

The subtitle is `--stepper-subtitle-foreground` on every status except disabled (`--stepper-subtitle-foreground-disabled`).

**Step Card** uses the same indicator as above, and:

| Status | Card fill | Card border | Label |
|---|---|---|---|
| default | `--stepper-card-container-background-default` | `--stepper-card-container-border-color-default` | `--stepper-card-label-foreground-default` |
| complete | `--stepper-card-container-background-complete` | `--stepper-card-container-border-color-complete` | `--stepper-card-label-foreground-complete` |
| partial | `--stepper-card-container-background-partial` | `--stepper-card-container-border-color-partial` | `--stepper-card-label-foreground-partial` |
| active | `--stepper-card-container-background-active` | `--stepper-card-container-border-color-active` | `--stepper-card-label-foreground-active` |
| error | `--stepper-card-container-background-error` | `--stepper-card-container-border-color-error` | `--stepper-card-label-foreground-error` |
| disabled | `--stepper-card-container-background-disabled` | `--stepper-card-container-border-color-disabled` | `--stepper-card-label-foreground-disabled` |

Partial leaves the card as default; only the indicator differs.

**Step Segment**

| Status | Start half | End half |
|---|---|---|
| default | `--stepper-segment-start-background-default` | `--stepper-segment-end-background-default` |
| complete | `--stepper-segment-start-background-complete` | `--stepper-segment-end-background-complete` |
| partial | `--stepper-segment-start-background-partial` | `--stepper-segment-end-background-partial` |
| active | `--stepper-segment-start-background-active` | `--stepper-segment-end-background-active` |
| error | `--stepper-segment-start-background-error` | `--stepper-segment-end-background-error` |
| disabled | `--stepper-segment-start-background-disabled` | `--stepper-segment-end-background-disabled` |

Active fills exactly as complete and disabled exactly as default, so the summary title is what names the current step. Partial fills the leading half only, always exactly half.

No transition is defined. Progress changes by resetting each step's Status, and the page decides whether anything moves as the content behind it changes.

**Interactive steps.** Completed (and partial) steps can be revisited from the list; upcoming steps can't be jumped to while creating something, though any step can be opened when editing something that already exists ([patterns 2.38](../patterns/02-navigation-flow.md)). A step that can be opened is a control with these states, from the Button's own scrim and ring:

| State | Change |
|---|---|
| hover | `--stepper-step-background-hover` behind the whole step (indicator and text), corners `--stepper-step-radius`; pointer only |
| pressed | `--stepper-step-background-pressed` |
| focused | `--stepper-step-focus-ring-width` `--stepper-step-focus-ring-color` ring outside the step |

A step that can't be opened has none of these states and isn't focusable. Opening a step doesn't change any Status.

## Spacing & Sizing
| Part | Value |
|---|---|
| Horizontal Stepper (default) | padding 0 `--stepper-horizontal-container-padding-x`; each step fills an equal share of the width |
| Step / Horizontal | padding `--stepper-horizontal-step-padding-y` top and bottom; head (indicator over text) is `--stepper-indicator-size` wide with `--stepper-horizontal-head-gap` between indicator and text, and the text overflows it centred; the track beside the head is `--stepper-horizontal-track-height` tall so the line centres on the indicator, and the line fills the width left over |
| Step / Vertical | rail (indicator above connector) `--stepper-vertical-step-gap` from the text; the step hugs its content and the connector stretches with the step's height, at least `--stepper-vertical-connector-length` |
| Vertical Stepper | steps `--stepper-vertical-steps-gap` apart (rail), `--stepper-vertical-cards-gap` (cards) |
| Indicator | `--stepper-indicator-size` square at `--stepper-indicator-radius`, `--stepper-indicator-border-width` inside border |
| Step Card | fills the column width; padding `--stepper-card-container-padding-y` / `--stepper-card-container-padding-x`; `--stepper-card-container-gap` between indicator and text; `--stepper-card-container-border-width` border; at least `--stepper-card-container-min-height` tall, growing with its text; the text fills the width left beside the indicator |
| Horizontal Stepper (compact) | no side padding; summary and bar `--stepper-compact-container-gap` apart; inside the summary, count and heading `--stepper-compact-summary-gap` apart, count parts `--stepper-compact-count-gap` apart |
| Segment bar | segments `--stepper-compact-segments-gap` apart, each an equal share of the width, `--stepper-segment-height` tall; the radius is on the segment, so a part-filled segment keeps rounded ends and a straight join in the middle |

On horizontal steps all indicators keep the same length and fill behaviour so steps stay evenly spaced; the row top-aligns to the tallest step. A Step Card is at least `--stepper-card-container-min-height` tall (provisional: Figma gives it a fixed height) and grows with a subtitle or wrapped label. The minimum connector length on Step / Vertical (`--stepper-vertical-connector-length`) is not specified in Figma and is provisional, as is the segment height (`--stepper-segment-height`): Figma's prose names a space/xxs step that doesn't exist, so the bound space/2xs is used.

## Properties
**Horizontal Stepper**

| Property | Options | Default |
|---|---|---|
| Size | default, compact | default |
| Slot (default) | Step / Horizontal instances | — |
| Segments (compact) | one Step Segment per step | — |
| Current Step (compact) | number | 3 |
| Total Steps (compact) | number | 5 |
| Show Total (compact) | on / off; off reads "Step 3" when later steps depend on answers | on |
| Label (compact) | text, the current step's title | Label |
| Subtitle (compact) | text | Subtitle |
| Show Subtitle (compact) | on / off | on |

**Vertical Stepper**

| Property | Options | Default |
|---|---|---|
| Card | on / off | off |
| Rounded (Card on) | on / off | on |
| Slot | Step / Vertical or Step Card instances | — |

**Step / Horizontal, Step / Vertical, Step Card**

| Property | Options | Default |
|---|---|---|
| Status | default, complete, partial, active, error, disabled | default |
| Label | text, a word or two | Label |
| Step Number | number | 1 |
| Subtitle | text, a word or two | Subtitle |
| Show Subtitle | on / off | off |
| Show Line (not Step Card) | on / off | on |

**Step Segment**

| Property | Options | Default |
|---|---|---|
| Status | default, complete, partial, active, error, disabled | default |

Complete and error hide the step number behind their glyph.

## Usage
- Use for a sequence of 2 to 8 steps; with more, group steps. Show only steps that apply, and mark optional ones in the subtitle ("Optional"). Where later steps depend on answers, show that more follow instead of a fixed total: Show Total off on compact ("Step 3"), and on the default and vertical arrangements only the steps known so far, the last with Show Line on ([patterns 2.38](../patterns/02-navigation-flow.md)).
- Keep exactly one step on active; it is the only status that marks position.
- Give every step a short noun label, ideally one word. Steps divide the width evenly, so a long label runs into its neighbour before it wraps; where labels can't be shortened, use the vertical stepper.
- Turn Show Line off on the last step, or it trails a line into nothing.
- Don't treat complete and partial as interchangeable: partial means entered and left unfinished.
- Choose by width, not device: compact below `--breakpoint-medium-min`, default (or the vertical stepper at the leading side on expanded widths) above it ([patterns 1.120](../patterns/01-screen-composition.md)). Compact drops every label but the current one, so it is not the default resized. Don't put a long sequence on the compact bar; every segment shortens as steps are added.
- Use partial on a segment only where a step was left half done.
- Use the cards arrangement for a more visual column of stages; match the rounded or sharp set to the surrounding UI. Keep card text short; the card grows rather than cutting it off.
- Use horizontal and vertical steps only in their own orientation.
- For work the system runs, with statuses such as running, needs approval or failed, use a [Task List](../molecules/task-list.md) instead; a stepper is a sequence the person moves through.

## Accessibility
- Give the stepper an accessible name, and announce position in words ("Step 3 of 5: Put-away"); mark the active step as current (`aria-current="step"`).
- Status is carried by the indicator's fill and its glyph together (check_mark on complete, priority on error), never by colour alone ([patterns 6.11](../patterns/06-accessibility.md)); include the status in each step's name ("Delivery, completed").
- The label (and subtitle) is the step's accessible name, so write it as a noun a person recognises out of context.
- The compact bar holds no text and active fills like complete, so the count and title above it are the only account of position; a failed segment needs saying in words elsewhere on the screen.
- An interactive step is a button (or a link in a web console) in the tab order with the focus ring above; steps that can't be opened are plain text. After opening a step, focus moves to the start of that step ([patterns 6.33](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra horizontal stepper: a row of evenly spaced steps, each a `--stepper-indicator-size` circle with a `--stepper-indicator-border-width` border and a small `--stepper-indicator-font` number, its `--stepper-label-font` label centred beneath, and a thin `--stepper-connector-width` grey line (`--stepper-connector-color-default`) running from the circle to the next step. Finished steps are solid green circles (`--stepper-indicator-background-complete`) with a white check and a green connector; a half-done step is a pale green circle with a green border; the current step is a solid blue circle (`--stepper-indicator-background-active`) with a white number and a dark label; future steps are white circles with grey borders and grey labels (`--stepper-label-foreground-default`); a failed step is a red circle with a white priority glyph and a red label. The vertical version stacks the same steps in a column with labels to the right and connectors running down; the card version wraps each step in a bordered card with `--stepper-card-container-radius-rounded` corners, the current one tinted pale blue (`--stepper-card-container-background-active`) with a blue border. On mobile, show "Step 3 of 5", a `--stepper-compact-title-font` title and a subtitle above a bar of `--stepper-segment-height` pill segments, blue for done and current, light grey for ahead.
