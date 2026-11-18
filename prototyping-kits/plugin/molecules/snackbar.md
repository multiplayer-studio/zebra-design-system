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
  # contextual success
  snackbar-success-container-background: '{colors.color-status-success-faint}'
  snackbar-success-message-foreground: '{colors.color-ink-high}'
  snackbar-success-icon-foreground: '{colors.color-ink-high}'
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
  # border (transparent, so the edge shows in forced colours)
  snackbar-container-border-width: '{stroke.stroke-thin}'
  snackbar-container-border-color: '{colors.color-fill-transparent}'
  # shape
  snackbar-contextual-container-radius-rounded: '{radius.radius-pill}'
  snackbar-standard-container-radius-rounded: '{radius.radius-element-md}'
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
  snackbar-enter-duration: '{motion.motion-fast}'
  snackbar-enter-easing: '{motion.easing-out}'
  snackbar-exit-duration: '{motion.motion-instant}'
  snackbar-exit-easing: '{motion.easing-in}'
  snackbar-timeout: '{motion.motion-timeout-toast}'
---

# Snackbar

> A brief confirmation of something the person just did, floating at the bottom of the content area, timing out on its own and carrying at most one action. It never carries an error.

## Anatomy
1. Container — one row at least `--snackbar-container-height` tall (taller when the message wraps), content leading and controls trailing, `--snackbar-container-gap` apart. Two drop shadows (`--snackbar-container-shadow-near` and `--snackbar-container-shadow-far`) lift it off whatever it covers, and a `--snackbar-container-border-width` border in `--snackbar-container-border-color` (transparent) keeps its edge in forced colours ([patterns 6.10](../patterns/06-accessibility.md)).
2. Leading glyph (optional) — [Icon](../atoms/icon.md) at `--snackbar-icon-size`. On contextual, Status chooses it: info (info), check_circle (success), delete (deletion), open_in_new_window (view); action and default have none. On standard, Show Icon opens a slot whose glyph the consumer picks.
3. Message — one short sentence in `--snackbar-message-font`, `--snackbar-content-gap` after the glyph. It sits on one line while it fits and wraps onto more lines when it doesn't, breaking a long word or URL rather than overflowing. The glyph and controls stay centred on the bar. Say what just happened in one line, two at most on a handheld ([patterns 7.84](../patterns/07-content-copy.md)).
4. Action (per Status) — a [Button](../atoms/button.md) drawn by the bar. Its label is the Action Label text property: a single verb, or a verb and its object, such as "Undo delete" ([patterns 7.84](../patterns/07-content-copy.md)). It defaults to Undo on deletion and View on view. Its shape follows the bar.
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
| contextual · success | `--snackbar-success-container-background` | `--snackbar-success-message-foreground` | check_circle, `--snackbar-success-icon-foreground` | none | yes |
| contextual · deletion | `--snackbar-deletion-container-background` | `--snackbar-deletion-message-foreground` | delete, `--snackbar-deletion-icon-foreground` | Action Label, default Undo (subtle) | yes |
| contextual · view | `--snackbar-view-container-background` | `--snackbar-view-message-foreground` | open_in_new_window, `--snackbar-view-icon-foreground` | Action Label, default View (subtle) | no |
| contextual · action | `--snackbar-action-container-background` | `--snackbar-action-message-foreground` | none | Action Label (outline-subtle) | no |
| standard | `--snackbar-standard-container-background` | `--snackbar-standard-message-foreground` | optional, `--snackbar-standard-icon-foreground` | Action Label (contrast) | yes |

There is no warning or error status: a toast never carries an error ([patterns 4.31](../patterns/04-states-feedback.md)). Deletion shares the error tint because it confirms a destructive action the person took, and its Undo reverses it. On standard the close glyph takes `--snackbar-standard-icon-foreground` so it reads on the dark bar.

Shape: rounded (default) → `--snackbar-contextual-container-radius-rounded` (a pill) on contextual, capped at half `--snackbar-container-height` so a wrapped bar keeps the one-line corners instead of growing round ends, and `--snackbar-standard-container-radius-rounded` (a soft rectangle) on standard; sharp → `--snackbar-container-radius-sharp` on both. The close and the action follow: Button and Icon Button shape full on rounded contextual, rounded on standard, sharp on sharp. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Trigger | What changes |
|---|---|---|
| static | — | The bar has no interaction states. Nothing answers hover, focus or press; the action and close carry their own. |
| entering | opened | Rises from below its resting place while fading in, over `--snackbar-enter-duration` with `--snackbar-enter-easing`. |
| leaving | closed by its close, its action, its timer or a newer bar | Rises a little further and fades out over `--snackbar-exit-duration` with `--snackbar-exit-easing`, then is removed. |

It always times out: it stays for at least `--snackbar-timeout`, the timer pauses while the pointer or keyboard focus is on the bar, and it waits longer where the device's accessibility timeout setting asks for it ([patterns 4.76](../patterns/04-states-feedback.md)). It stays on screen until the exit has finished, and a bar opened again while it is leaving returns fully visible. With reduced motion it fades over the same durations without moving ([patterns 6.66](../patterns/06-accessibility.md)).

## Spacing & Sizing
| Part | Value |
|---|---|
| Height | at least `--snackbar-container-height`; grows with a wrapped message |
| Padding | `--snackbar-container-padding-y` top and bottom, `--snackbar-container-padding-leading` leading, `--snackbar-container-padding-trailing` trailing |
| Content → controls | `--snackbar-container-gap` |
| Content | `--snackbar-content-padding-y` top and bottom; glyph → message `--snackbar-content-gap` |
| Between controls | `--snackbar-controls-gap` |
| Close | `--snackbar-close-size` square, glyph `--snackbar-icon-size` |
| Action | Button medium (`--button-container-height-medium`) on deletion and view; Button small (`--button-container-height-small`) on action and standard |
| Position | At the bottom of the content area, centred, `--snackbar-position-offset-bottom` above the lowest of the content area's bottom edge, pinned actions, the bottom navigation and any floating action button, which it never covers ([patterns 1.63](../patterns/01-screen-composition.md)). Never wider than the content area less `--snackbar-position-margin-x` each side. Placed in a layout instead, it is never wider than its container. |

Figma gives each status its own fixed width (190 to 323); in code the bar hugs its content up to the content area's limit, and past that the message wraps while the controls keep their size at the trailing end, so it works from a handheld up to a desktop. The bar floats in the browser's top layer (a popover), above any z-index on the page, modals included. It neither takes focus nor blocks the page. Only one shows at a time: a newer bar replaces the older one at once, with no queue ([patterns 1.63](../patterns/01-screen-composition.md), [4.78](../patterns/04-states-feedback.md)).

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | contextual, standard | contextual |
| Status (contextual) | default, info, success, deletion, view, action | default |
| Shape | rounded, sharp | rounded |
| Message | text | Message |
| Action Label | text (only where the status carries an action) | Undo on deletion, View on view, Undo on action and standard |
| Show Icon (standard) | on / off | off |
| Icon (standard) | any icon | — |
| Show Action | on / off (only where the status carries one) | on |
| Show Close | on / off (only where the status carries one) | on |

Replace the defaults with real copy for what happened, such as "Undo delete".

## Usage
- Use it to confirm something the person just did, where the result isn't visible on its own ([patterns 4.30–4.31](../patterns/04-states-feedback.md)). Where the person has to answer before carrying on, use a [Dialog](../organisms/dialog.md).
- Never use it for an error or a failure, partial or batch failures included ([patterns 4.31, 4.47](../patterns/04-states-feedback.md)). An error appears where it happened, as an [Inline Banner](inline-banner.md) or a field error ([patterns 4.34](../patterns/04-states-feedback.md)).
- Pick the status for what happened rather than for the colour. Each one brings its own glyph and controls, so the choice settles the whole bar.
- Keep the message to one line, two at most on a handheld ([patterns 7.84](../patterns/07-content-copy.md)). Longer content belongs in an [Inline Banner](inline-banner.md).
- Don't use deletion just to get an error tint. It promises an Undo, and offering one the product cannot honour is worse than none.
- Don't put critical information only in a snackbar; it times out ([patterns 4.76](../patterns/04-states-feedback.md)).

## Accessibility
- It is announced politely without taking focus, and its action can be reached by a documented key ([patterns 6.53, 6.55](../patterns/06-accessibility.md)). Nothing in the component does that: the structure around it uses a live region (`role="status"`). The control that triggered it also shows the result in place.
- The tints are subtle by design, so the glyph and the words carry the status ([patterns 6.11](../patterns/06-accessibility.md)).
- View carries no close; it times out like every bar, and its action has to be reachable by keyboard.
- The close is a real target, not decoration. Give it an accessible name ("Close"), because the glyph carries no text.
- Check the bar does not settle over something a person still needs to read or reach.

## Claude Prompt
Draw a Zebra snackbar floating `--snackbar-position-offset-bottom` above the bottom of the screen, centred: a pill (`--snackbar-contextual-container-radius-rounded`) `--snackbar-container-height` tall (a longer message wraps and the bar grows taller, keeping its corners) with a soft drop shadow, `--snackbar-container-padding-leading` padding at the start and `--snackbar-container-padding-trailing` at the end. A deletion snackbar has a pale red tint (`--snackbar-deletion-container-background`), a near-black `--snackbar-icon-size` delete icon, the message "Order removed" in `--snackbar-message-font` near-black text, then a pill "Undo" text button and a round close (x) icon button at the end. Info and success versions use pale blue and green tints with info and check-circle icons and only a close. The default and action versions are white (`--snackbar-default-container-background`); the action version has a thin grey outlined button labelled with a real verb, such as "Undo delete". The standard version is a near-black soft rectangle (`--snackbar-standard-container-background`, `--snackbar-standard-container-radius-rounded` corners) with white text and a filled contrast button in the bar's own inverse colour. It sits at the bottom of the content area, above any bottom navigation or floating action button.
