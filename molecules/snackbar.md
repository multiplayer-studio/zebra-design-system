---
name: Snackbar
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ../atoms/button.md]
tokens:
  # contextual default
  snackbar-default-container-background: '{colors.color-fill-overlay}'
  snackbar-default-message-foreground: '{colors.color-ink-high}'
  # contextual info
  snackbar-info-container-background: '{colors.color-status-info-faint}'
  snackbar-info-message-foreground: '{colors.color-ink-high}'
  snackbar-info-icon-foreground: '{colors.color-ink-high}'
  # contextual positive
  snackbar-positive-container-background: '{colors.color-status-success-faint}'
  snackbar-positive-message-foreground: '{colors.color-ink-high}'
  snackbar-positive-icon-foreground: '{colors.color-ink-high}'
  # contextual warning
  snackbar-warning-container-background: '{colors.color-status-warning-faint}'
  snackbar-warning-message-foreground: '{colors.color-ink-high}'
  snackbar-warning-icon-foreground: '{colors.color-ink-high}'
  # contextual negative
  snackbar-negative-container-background: '{colors.color-status-error-faint}'
  snackbar-negative-message-foreground: '{colors.color-ink-high}'
  snackbar-negative-icon-foreground: '{colors.color-ink-high}'
  # contextual deletion
  snackbar-deletion-container-background: '{colors.color-status-error-faint}'
  snackbar-deletion-message-foreground: '{colors.color-ink-high}'
  snackbar-deletion-icon-foreground: '{colors.color-ink-high}'
  # contextual view
  snackbar-view-container-background: '{colors.color-status-neutral-faint}'
  snackbar-view-message-foreground: '{colors.color-ink-high}'
  snackbar-view-icon-foreground: '{colors.color-ink-high}'
  # contextual action
  snackbar-action-container-background: '{colors.color-fill-overlay}'
  snackbar-action-message-foreground: '{colors.color-ink-high}'
  # standard
  snackbar-standard-container-background: '{colors.color-fill-inverse}'
  snackbar-standard-message-foreground: '{colors.color-ink-inverse}'
  snackbar-standard-icon-foreground: '{colors.color-ink-inverse}'
  # shape
  snackbar-contextual-container-radius-rounded: '{radius.radius-pill}'
  snackbar-standard-container-radius-rounded: '{radius.radius-md}'
  snackbar-container-radius-sharp: '{radius.radius-none}'
  # elevation
  snackbar-container-shadow-near: '{shadow.shadow-small}'
  snackbar-container-shadow-far: '{shadow.shadow-medium}'
  # sizes
  snackbar-container-height: '{control.control-lg}'
  snackbar-container-padding-y: '{space.space-2xs}'
  snackbar-container-padding-leading: '{space.space-lg}'
  snackbar-container-padding-trailing: '{space.space-2xs}'
  snackbar-container-gap: '{space.space-lg}'
  snackbar-content-padding-y: '{space.space-sm}'
  snackbar-content-gap: '{space.space-md}'
  snackbar-controls-gap: '{space.space-2xs}'
  snackbar-message-font: '{typography.type-body-medium}'
  snackbar-icon-size: '{icon.icon-size-medium}'
  snackbar-close-size: '{control.control-md}'
  snackbar-close-padding: '{space.space-2xs}'
  # position
  snackbar-position-offset-bottom: '{space.space-xl}'
  snackbar-position-margin-x: '{space.space-lg}'
  # motion
  snackbar-enter-duration: '{motion.motion-slow}'
  snackbar-exit-duration: '{motion.motion-fast}'
  snackbar-easing: '{motion.easing-out}'
---

# Snackbar

> A brief message about something the app just did, floating at the bottom of the viewport and carrying at most one action.

## Anatomy
1. Container — one row at least `--snackbar-container-height` tall, content leading and controls trailing, `--snackbar-container-gap` apart. It has no border; two drop shadows (`--snackbar-container-shadow-near` and `--snackbar-container-shadow-far`) lift it off whatever it covers.
2. Leading glyph (optional) — [Icon](../atoms/icon.md) at `--snackbar-icon-size`. On contextual, Status chooses it: info (info), check_circle (positive), warning (warning), error (negative), delete (deletion), open_in_new_window (view); action and default have none. On standard, Show Icon opens a slot whose glyph the consumer picks.
3. Message — one short sentence in `--snackbar-message-font`, `--snackbar-content-gap` after the glyph. It sits on a single line and never wraps. It is the only text the component takes in.
4. Action (per Status) — a [Button](../atoms/button.md) drawn by the bar, with a fixed label: Undo on deletion, View on view, Action on action and standard. Its shape follows the bar.
   - deletion, view: subtle, medium.
   - action: outline-subtle, small.
   - standard: contrast (filled), small, rounded.
5. Close (per Status) — a subtle [Icon Button](../atoms/icon-button.md) `close`, `--snackbar-close-size` square with `--snackbar-close-padding` around the glyph. Absent on view (the action is the only way out) and on action.

Controls sit `--snackbar-controls-gap` apart.

## Variants
Variant chooses the silhouette and whether Status applies. Status is a preset: tint, glyph and controls move together.

| Variant · Status | Background | Message | Glyph | Action | Close |
|---|---|---|---|---|---|
| contextual · default (default) | `--snackbar-default-container-background` | `--snackbar-default-message-foreground` | none | none | yes |
| contextual · info | `--snackbar-info-container-background` | `--snackbar-info-message-foreground` | info, `--snackbar-info-icon-foreground` | none | yes |
| contextual · positive | `--snackbar-positive-container-background` | `--snackbar-positive-message-foreground` | check_circle, `--snackbar-positive-icon-foreground` | none | yes |
| contextual · warning | `--snackbar-warning-container-background` | `--snackbar-warning-message-foreground` | warning, `--snackbar-warning-icon-foreground` | none | yes |
| contextual · negative | `--snackbar-negative-container-background` | `--snackbar-negative-message-foreground` | error, `--snackbar-negative-icon-foreground` | none | yes |
| contextual · deletion | `--snackbar-deletion-container-background` | `--snackbar-deletion-message-foreground` | delete, `--snackbar-deletion-icon-foreground` | Undo (subtle) | yes |
| contextual · view | `--snackbar-view-container-background` | `--snackbar-view-message-foreground` | open_in_new_window, `--snackbar-view-icon-foreground` | View (subtle) | no |
| contextual · action | `--snackbar-action-container-background` | `--snackbar-action-message-foreground` | none | Action (outline-subtle) | no |
| standard | `--snackbar-standard-container-background` | `--snackbar-standard-message-foreground` | optional, `--snackbar-standard-icon-foreground` | Action (contrast) | yes |

Deletion shares the error tint, so it reads as destructive even where the message is neutral. On standard the close glyph takes `--snackbar-standard-icon-foreground` so it reads on the dark bar.

Shape: rounded (default) → `--snackbar-contextual-container-radius-rounded` (a pill) on contextual and `--snackbar-standard-container-radius-rounded` (a soft rectangle) on standard; sharp → `--snackbar-container-radius-sharp` on both. The close and the action follow: Button and Icon Button shape full on rounded contextual, rounded on standard, sharp on sharp. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Trigger | What changes |
|---|---|---|
| static | — | The bar has no interaction states. Nothing answers hover, focus or press; the action and close carry their own. |
| entering | opened | Rises from below its resting place while fading in, over `--snackbar-enter-duration` with `--snackbar-easing`. |
| leaving | closed by its close, its action or its timer | Rises a little further and fades out over `--snackbar-exit-duration`, then is removed. |

It stays on screen until the exit has finished, and a bar opened again while it is leaving returns fully visible. The timer pauses while the pointer or keyboard focus is on the bar. With reduced motion it only fades, over 150ms (no motion token yet), without moving.

## Spacing & Sizing
| Part | Value |
|---|---|
| Height | `--snackbar-container-height` throughout |
| Padding | `--snackbar-container-padding-y` top and bottom, `--snackbar-container-padding-leading` leading, `--snackbar-container-padding-trailing` trailing |
| Content → controls | `--snackbar-container-gap` |
| Content | `--snackbar-content-padding-y` top and bottom; glyph → message `--snackbar-content-gap` |
| Between controls | `--snackbar-controls-gap` |
| Close | `--snackbar-close-size` square, glyph `--snackbar-icon-size` |
| Action | Button medium (`--button-container-height-medium`) on deletion and view; Button small (`--button-container-height-small`) on action and standard |
| Position | Fixed to the viewport, centred, `--snackbar-position-offset-bottom` above the bottom edge, never wider than the viewport less `--snackbar-position-margin-x` each side |

Figma gives each status its own fixed width (190 to 323); in code the bar hugs its content up to the viewport limit, and the message stays on one line, so message length is a constraint on what gets written. The bar floats in the browser's top layer (a popover), above any z-index on the page, modals included. It neither takes focus nor blocks the page. Two bars open at once occupy the same spot; there is no queue yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | contextual, standard | contextual |
| Status (contextual) | default, info, positive, warning, negative, deletion, view, action | default |
| Shape | rounded, sharp | rounded |
| Message | text | Message |
| Show Icon (standard) | on / off | off |
| Icon (standard) | any icon | — |
| Show Action | on / off (only where the status carries one) | on |
| Show Close | on / off (only where the status carries one) | on |

The action label is fixed per status and is not an input.

## Usage
- Use it for something worth noticing and not worth interrupting for. Where the person has to answer before carrying on, use a [Dialog](../organisms/dialog.md).
- Pick the status for what happened rather than for the colour. Each one brings its own glyph and controls, so the choice settles the whole bar.
- Keep the message to one short line. The bar does not wrap.
- Don't turn the close off on a bar with no action and no timer. That leaves a person with a message and no way to clear it.
- Don't use deletion just to get an error tint. It promises an Undo, and offering one the product cannot honour is worse than a plain error.
- A failure the person could retry needs a status that carries an action; negative carries only a close.
- Don't put critical information only in a snackbar; it goes away.

## Accessibility
- A snackbar appears without being asked for, so it has to announce itself. Nothing in the component does that: the structure around it uses a live region (`role="status"`).
- The tints are subtle by design, so the glyph and the words are what separate info from error for anyone who cannot rely on colour.
- View carries no close. Where it does not dismiss itself, its action is the only way out and has to be reachable by keyboard.
- The close is a real target, not decoration. Give it an accessible name ("Close"), because the glyph carries no text.
- Check the bar does not settle over something a person still needs to read or reach.
- Its movement respects reduced motion: with that preference set it fades without sliding.

## Claude Prompt
Draw a Zebra snackbar floating `--snackbar-position-offset-bottom` above the bottom of the screen, centred: a single-line pill (`--snackbar-contextual-container-radius-rounded`) `--snackbar-container-height` tall with a soft drop shadow, `--snackbar-container-padding-leading` padding at the start and `--snackbar-container-padding-trailing` at the end. A deletion snackbar has a pale red tint (`--snackbar-deletion-container-background`), a near-black `--snackbar-icon-size` delete icon, the message "Order removed" in `--snackbar-message-font` near-black text, then a pill "Undo" text button and a round close (x) icon button at the end. Info, success and warning versions use pale blue, green and amber tints with info, check-circle and warning icons and only a close. The default and action versions are white (`--snackbar-default-container-background`); the action version has a thin grey outlined "Action" button. The standard version is a near-black soft rectangle (`--snackbar-standard-container-background`, `--snackbar-standard-container-radius-rounded` corners) with white text and a filled contrast "Action" button in the bar's own inverse colour.
