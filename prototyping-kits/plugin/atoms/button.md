---
name: Button
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # primary
  button-primary-container-background-enabled: '{colors.color-brand-primary-default}'
  button-primary-container-background-hover: '{colors.color-brand-primary-strong}'
  button-primary-container-background-pressed: '{colors.color-brand-primary-deep}'
  button-primary-container-background-disabled: '{colors.color-fill-disabled}'
  button-primary-label-foreground: '{colors.color-brand-primary-on}'
  button-primary-label-foreground-disabled: '{colors.color-ink-disabled}'
  # positive
  button-positive-container-background-enabled: '{colors.color-status-success-default}'
  button-positive-container-background-hover: '{colors.color-status-success-strong}'
  button-positive-container-background-pressed: '{colors.color-status-success-deep}'
  button-positive-container-background-disabled: '{colors.color-fill-disabled}'
  button-positive-label-foreground: '{colors.color-brand-primary-on}'
  button-positive-label-foreground-disabled: '{colors.color-ink-disabled}'
  # negative
  button-negative-container-background-enabled: '{colors.color-status-error-default}'
  button-negative-container-background-hover: '{colors.color-status-error-strong}'
  button-negative-container-background-pressed: '{colors.color-status-error-deep}'
  button-negative-container-background-disabled: '{colors.color-fill-disabled}'
  button-negative-label-foreground: '{colors.color-brand-primary-on}'
  button-negative-label-foreground-disabled: '{colors.color-ink-disabled}'
  # contrast
  button-contrast-container-background-enabled: '{colors.color-fill-inverse}'
  button-contrast-container-background-hover: '{colors.color-fill-inverse-sunken}'
  button-contrast-container-background-pressed: '{colors.color-fill-inverse-elevated}'
  button-contrast-container-background-disabled: '{colors.color-fill-disabled}'
  button-contrast-label-foreground: '{colors.color-ink-inverse}'
  button-contrast-label-foreground-disabled: '{colors.color-ink-disabled}'
  # gradient
  button-gradient-container-background-start: '{colors.color-gradient-default-start}'
  button-gradient-container-background-end: '{colors.color-gradient-default-end}'
  button-gradient-container-background-disabled: '{colors.color-fill-disabled}'
  button-gradient-label-foreground: '{colors.color-brand-primary-on}'
  button-gradient-label-foreground-disabled: '{colors.color-ink-disabled}'
  # outline
  button-outline-container-background-enabled: '{colors.color-fill-default}'
  button-outline-container-background-hover: '{colors.color-fill-faint}'
  button-outline-container-background-pressed: '{colors.color-fill-sunken}'
  button-outline-container-background-disabled: '{colors.color-fill-disabled}'
  button-outline-container-border-color: '{colors.color-brand-primary-default}'
  button-outline-container-border-color-disabled: '{colors.color-line-subtle}'
  button-outline-label-foreground: '{colors.color-ink-brand}'
  button-outline-label-foreground-disabled: '{colors.color-ink-disabled}'
  # outline-subtle
  button-outline-subtle-container-background-enabled: '{colors.color-status-ghost-default}'
  button-outline-subtle-container-background-hover: '{colors.color-fill-faint}'
  button-outline-subtle-container-background-pressed: '{colors.color-fill-sunken}'
  button-outline-subtle-container-background-disabled: '{colors.color-status-ghost-default}'
  button-outline-subtle-container-border-color: '{colors.color-line-default}'
  button-outline-subtle-container-border-color-disabled: '{colors.color-line-subtle}'
  button-outline-subtle-label-foreground: '{colors.color-ink-high}'
  button-outline-subtle-label-foreground-disabled: '{colors.color-ink-disabled}'
  # outline-contrast
  button-outline-contrast-container-background-enabled: '{colors.color-status-ghost-default}'
  button-outline-contrast-container-background-hover: '{colors.color-status-ghost-faint}'
  button-outline-contrast-container-background-pressed: '{colors.color-status-ghost-deep}'
  button-outline-contrast-container-background-disabled: '{colors.color-status-ghost-default}'
  button-outline-contrast-container-border-color: '{colors.color-fill-inverse}'
  button-outline-contrast-container-border-color-hover: '{colors.color-fill-inverse-sunken}'
  button-outline-contrast-container-border-color-pressed: '{colors.color-fill-inverse-elevated}'
  button-outline-contrast-container-border-color-disabled: '{colors.color-line-subtle}'
  button-outline-contrast-label-foreground: '{colors.color-ink-high}'
  button-outline-contrast-label-foreground-disabled: '{colors.color-ink-disabled}'
  # text
  button-text-container-background-enabled: '{colors.color-status-ghost-default}'
  button-text-container-background-hover: '{colors.color-status-ghost-faint}'
  button-text-container-background-pressed: '{colors.color-status-ghost-deep}'
  button-text-container-background-disabled: '{colors.color-status-ghost-default}'
  button-text-label-foreground: '{colors.color-ink-brand}'
  button-text-label-foreground-disabled: '{colors.color-ink-disabled}'
  # text-gradient
  button-text-gradient-container-background-enabled: '{colors.color-status-ghost-default}'
  button-text-gradient-container-background-disabled: '{colors.color-status-ghost-default}'
  button-text-gradient-label-foreground-start: '{colors.color-gradient-strong-start}'
  button-text-gradient-label-foreground-end: '{colors.color-gradient-strong-end}'
  button-text-gradient-label-foreground-disabled: '{colors.color-ink-disabled}'
  # subtle
  button-subtle-container-background-enabled: '{colors.color-status-ghost-default}'
  button-subtle-container-background-hover: '{colors.color-status-ghost-faint}'
  button-subtle-container-background-pressed: '{colors.color-status-ghost-deep}'
  button-subtle-container-background-disabled: '{colors.color-status-ghost-default}'
  button-subtle-label-foreground: '{colors.color-ink-high}'
  button-subtle-label-foreground-disabled: '{colors.color-ink-disabled}'
  # shape
  button-container-radius-sharp: '{radius.radius-none}'
  button-container-radius-rounded: '{radius.radius-element-sm}'
  button-container-radius-full: '{radius.radius-pill}'
  # border, focus, motion
  button-container-border-width: '{stroke.stroke-thin}'
  button-focus-ring-width: '{stroke.stroke-thick}'
  button-focus-ring-color: '{colors.color-line-focus}'
  button-container-transition: '{motion.motion-feedback}'
  # busy, hold to confirm
  button-busy-indicator-stroke-width: '{stroke.stroke-thick}'
  button-busy-indicator-duration: '{motion.motion-spin}'
  button-hold-fill-duration: '{motion.motion-spin}'
  # sizes
  button-container-height-small: '{control.control-sm}'
  button-container-height-medium: '{control.control-md}'
  button-container-height-large: '{control.control-lg}'
  button-container-padding-y: '{space.space-2xs}'
  button-container-padding-x-small: '{space.space-md}'
  button-container-padding-x-medium: '{space.space-md}'
  button-container-padding-x-large: '{space.space-lg}'
  button-container-gap: '{space.space-none}'
  button-label-padding-x-small: '{space.space-2xs}'
  button-label-padding-x-medium: '{space.space-sm}'
  button-label-padding-x-large: '{space.space-sm}'
  button-label-font-small: '{typography.type-label-medium}'
  button-label-font-medium: '{typography.type-label-large}'
  button-label-font-large: '{typography.type-label-large}'
  button-icon-size-small: '{icon.icon-size-small}'
  button-icon-size-medium: '{icon.icon-size-medium}'
  button-icon-size-large: '{icon.icon-size-medium}'
  button-touch-target-size-minimum: '{control.control-target-min}'
---

# Button

> Buttons trigger an action from a text label, with optional icons on either side.

## Anatomy
1. Container — horizontal row, content centred, with a minimum height per size. Carries the background, border and radius. The row has no gap (`--button-container-gap`).
2. Leading icon (optional) — [Icon](../atoms/icon.md), coloured with the label foreground; style follows the button shape.
3. Label — the button text, in a wrapper whose own horizontal padding (`--button-label-padding-x-medium`) is what separates it from the icons. Write it as the verb the user is about to perform.
4. Trailing icon (optional) — [Icon](../atoms/icon.md), as the leading icon.
5. Busy indicator (busy state only) — a spinning arc in the leading icon's place, `--button-icon-size-<size>` square, `--button-busy-indicator-stroke-width` wide, coloured with the label foreground, one turn per `--button-busy-indicator-duration`.
6. Hold fill (Hold to confirm only) — a fill in the flavour's pressed background that grows from the leading edge to the trailing edge while the button is held, over `--button-hold-fill-duration`.

## Variants
Flavour (light mode shown by the tokens; every flavour follows dark and AAA automatically). Label and icon colour stay the same in every interactive state, except on text-gradient.

| Flavour | Enabled bg | Hover bg | Pressed bg | Text / icon | Border |
|---|---|---|---|---|---|
| primary (default) | `--button-primary-container-background-enabled` | `--button-primary-container-background-hover` | `--button-primary-container-background-pressed` | `--button-primary-label-foreground` | none |
| positive | `--button-positive-container-background-enabled` | `--button-positive-container-background-hover` | `--button-positive-container-background-pressed` | `--button-positive-label-foreground` | none |
| negative | `--button-negative-container-background-enabled` | `--button-negative-container-background-hover` | `--button-negative-container-background-pressed` | `--button-negative-label-foreground` | none |
| contrast | `--button-contrast-container-background-enabled` | `--button-contrast-container-background-hover` | `--button-contrast-container-background-pressed` | `--button-contrast-label-foreground` | none |
| gradient | 135° gradient `--button-gradient-container-background-start` 0% → `--button-gradient-container-background-end` 87% | gradient slides to the end colour | gradient slides to the start colour | `--button-gradient-label-foreground` | none |
| outline | `--button-outline-container-background-enabled` | `--button-outline-container-background-hover` | `--button-outline-container-background-pressed` | `--button-outline-label-foreground` | `--button-container-border-width` inside, `--button-outline-container-border-color` |
| outline-subtle | `--button-outline-subtle-container-background-enabled` | `--button-outline-subtle-container-background-hover` | `--button-outline-subtle-container-background-pressed` | `--button-outline-subtle-label-foreground` | `--button-container-border-width` inside, `--button-outline-subtle-container-border-color` |
| outline-contrast | `--button-outline-contrast-container-background-enabled` | `--button-outline-contrast-container-background-hover` | `--button-outline-contrast-container-background-pressed` | `--button-outline-contrast-label-foreground` | `--button-container-border-width` inside, `--button-outline-contrast-container-border-color` (hover `--button-outline-contrast-container-border-color-hover`, pressed `--button-outline-contrast-container-border-color-pressed`) |
| text | `--button-text-container-background-enabled` | `--button-text-container-background-hover` | `--button-text-container-background-pressed` | `--button-text-label-foreground` | none |
| text-gradient | `--button-text-gradient-container-background-enabled` | unchanged | unchanged | 129° gradient across the label, `--button-text-gradient-label-foreground-start` → `--button-text-gradient-label-foreground-end`; slides like gradient | none |
| subtle | `--button-subtle-container-background-enabled` | `--button-subtle-container-background-hover` | `--button-subtle-container-background-pressed` | `--button-subtle-label-foreground` | none |

Filled flavours step their own background. Outline and outline-subtle hold their border and shift a neutral background underneath. Text, subtle and outline-contrast raise a ghost tint from fully transparent; outline-contrast also steps its border on hover and press. The outline border sits inside the container, so it adds no size. Contrast is near-black in light mode and near-white in dark; outline-contrast's border and label follow the page the same way.

Shape: sharp → `--button-container-radius-sharp` with zeta-icons-sharp; rounded (default) → `--button-container-radius-rounded` with zeta-icons-round; full → `--button-container-radius-full` (pill) with zeta-icons-round. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Foreground | Notes |
|---|---|---|---|
| enabled | per flavour | per flavour | resting state |
| hover | per flavour (hover column) | unchanged | pointer devices only |
| pressed | per flavour (pressed column) | unchanged | |
| focused | per flavour (enabled) | unchanged | `--button-focus-ring-width` `--button-focus-ring-color` ring drawn outside the bounds, replacing the resting border; identical on every flavour |
| busy | per flavour (enabled) | unchanged | the action is running: the busy indicator replaces the leading icon (or sits before the label), the button ignores presses until the action ends, and it's announced as busy. Colours don't change ([patterns 3.3](../patterns/03-controls-interaction.md)) |
| holding | per flavour (enabled), hold fill growing | unchanged | Hold to confirm only: the fill grows while held; releasing early cancels and the fill drains back |
| disabled | `--button-<flavour>-container-background-disabled` | `--button-<flavour>-label-foreground-disabled` text + icon | outline borders → `--button-<flavour>-container-border-color-disabled`; no flavour keeps its accent colour; doesn't act, but stays focusable when its reason matters (see Accessibility) |

Busy follows the loading timings ([patterns 4.13–4.15](../patterns/04-states-feedback.md)): the button stops taking presses at once, the indicator appears only if the action takes longer than about a second, and once shown it stays for at least half a second. After success the label briefly shows the result ("Saved"), then the screen moves on; after a failure the button returns to enabled and the error shows where it belongs. A second press while busy does nothing, and the service rejects the duplicate too ([patterns 3.4](../patterns/03-controls-interaction.md)).

Every state change is colour-only, a tint over `--button-container-transition` (the press and release feedback timing), with no scale, shadow or elevation shift. The gradient flavours never swap to a flat colour (a browser can't interpolate a gradient to a solid fill, so it flickers): on hover the gradient slides until the end colour covers the fill (the label on text-gradient), on press it slides the other way until the start colour covers it, and leaving or releasing slides it back. The focus ring is the only change to the outer footprint, so leave room around a button in a tight row.

## Spacing & Sizing
| Size | Height | Padding (V / H) | Label padding (H) | Font | Icon |
|---|---|---|---|---|---|
| small | `--button-container-height-small` | `--button-container-padding-y` / `--button-container-padding-x-small` | `--button-label-padding-x-small` | `--button-label-font-small` | `--button-icon-size-small` |
| medium (default) | `--button-container-height-medium` | `--button-container-padding-y` / `--button-container-padding-x-medium` | `--button-label-padding-x-medium` | `--button-label-font-medium` | `--button-icon-size-medium` |
| large | `--button-container-height-large` | `--button-container-padding-y` / `--button-container-padding-x-large` | `--button-label-padding-x-large` | `--button-label-font-large` | `--button-icon-size-large` |

Width always hugs the label and any visible icons, never fixed; each icon shown adds its own icon size to the width. The label never truncates. Where the space is narrower than the label (a long translation, large text), the label wraps onto more lines and the button grows taller: each height token is a minimum, not a fixed height ([patterns 6.60](../patterns/06-accessibility.md)). Vertical padding is the same at every size.

Icon size is a context override: buttons use the icon atom's `--icon-size-small` / `--icon-size-medium` steps; large reuses medium, so the icon's large step never appears inside a button.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | primary, positive, negative, contrast, gradient, outline, outline-subtle, outline-contrast, text, text-gradient, subtle | primary |
| Shape | sharp, rounded, full | rounded |
| Size | small, medium, large | medium |
| Label | text (a verb phrase) | — |
| Leading icon | on / off, any icon | off |
| Trailing icon | on / off, any icon | off |
| Disabled | on / off | off |
| Busy | on / off | off |
| Hold to confirm | on / off | off |

Hold to confirm is for safety actions that must not fire by accident ([patterns 3.91](../patterns/03-controls-interaction.md)): the action starts on press, the hold fill shows progress, and it acts only when the fill completes. Use it on filled flavours (primary, positive, negative, contrast), never on gradient flavours. Assistive technology and the keyboard reach the action through a confirmation step instead of the hold, and the same action is never also on a gesture that could fire by accident.

Hover, pressed and focus are driven by interaction, never set on a static layout.

## Usage
- Use one primary per screen ([patterns 1.72](../patterns/01-screen-composition.md)). A region's leading action steps down to the next level of emphasis, and everything else to outline, subtle or text. Where several actions are equally important, none is primary. Two outline buttons side by side read as equal weight.
- Write the label as a verb naming what happens ([patterns 7.16](../patterns/07-content-copy.md)).
- Use positive only for the confirmation of a constructive outcome (approve, publish). Use negative for every destructive action: reversible ones act at once and offer Undo, irreversible ones confirm first ([patterns 3.86](../patterns/03-controls-interaction.md)). Keep the cancel beside a negative button no stronger than subtle.
- A destructive action is never the default action, the one Enter or a confirming hardware key triggers ([patterns 3.6](../patterns/03-controls-interaction.md)).
- A button that opens something before acting says so: on desktop, end its label with an ellipsis ("Export as…") ([patterns 3.9](../patterns/03-controls-interaction.md)).
- Use gradient (or text-gradient) only for an action to do with AI (DESIGN.md §3). An AI action ranks like any other action: gradient only when AI is the screen's main purpose (it then takes the primary's place), otherwise text-gradient at the emphasis its rank calls for ([patterns 9.3](../patterns/09-ai.md)). The gradient is never the only AI marker.
- Pair contrast with outline-contrast, outline or text, not with primary; outline-subtle suits a busy surface where an accent border would compete.
- Text and subtle have nothing behind them at rest, so on a coloured or busy surface they stop reading as controls.
- Use a trailing icon for directional or disclosure actions. Both icons on at small leave little room for the label.
- Don't build an icon-only button by hiding the label; use [Icon Button](../atoms/icon-button.md).
- Don't mix shapes inside one button group, and keep the shape consistent with the surrounding UI (sharp UIs use sharp icons).
- Touch target: small and medium (`--button-container-height-small`, `--button-container-height-medium`) are below `--button-touch-target-size-minimum`; extend their hit area to it on touch ([patterns 6.16](../patterns/06-accessibility.md)). A pointer-only product may use `--control-target-pointer-min` instead ([patterns 6.18](../patterns/06-accessibility.md)).

## Accessibility
- The focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) is drawn outside the control and is identical on every flavour ([patterns 6.23](../patterns/06-accessibility.md)).
- An unavailable button stays visible with its reason beside it ([patterns 3.10](../patterns/03-controls-interaction.md)). Where its existence or reason matters, it stays focusable with `aria-disabled="true"` and announces itself as unavailable ([patterns 6.34](../patterns/06-accessibility.md)). Next and Submit are never disabled for an incomplete form: they stay enabled and check the form when pressed ([patterns 4.43](../patterns/04-states-feedback.md)). Dimming is allowed as the state because it's announced and the reason is shown ([patterns 6.11](../patterns/06-accessibility.md)). The short disable while busy needs no reason.
- Busy is exposed as busy (`aria-busy="true"`) with the button still focusable, and the result ("Saved") is announced without moving focus.
- The icon repeats the label rather than adding to it. Every state change is colour-only, so nothing may be signalled by hover or pressed alone.
- Positive and negative never rely on colour alone; the label carries the meaning ([patterns 6.11](../patterns/06-accessibility.md)).
- Labels must make sense out of context (Save, not OK), because screen readers announce them on their own.

## Claude Prompt
Draw a Zebra button: a compact rectangle `--button-container-height-medium` tall with `--button-container-radius-rounded` corners, `--button-container-padding-x-medium` horizontal padding, and a centred label in `--button-label-font-medium`. The primary version is solid Zebra blue (`--button-primary-container-background-enabled`) with white text (`--button-primary-label-foreground`), darkening to `--button-primary-container-background-hover` on hover and `--button-primary-container-background-pressed` when pressed. Optional `--button-icon-size-medium` rounded icons sit either side of the label, `--button-label-padding-x-medium` away. Secondary styles are white with blue text and a thin `--button-container-border-width` blue outline (outline), transparent with dark text and a light grey outline (outline-subtle), or plain blue text (text). A contrast button is near-black (`--button-contrast-container-background-enabled`) with white text; a gradient button fills with a purple-to-blue diagonal gradient (`--button-gradient-container-background-start` → `--button-gradient-container-background-end`). Disabled buttons are flat light grey (`--button-primary-container-background-disabled`) with grey text (`--button-primary-label-foreground-disabled`). Small buttons are `--button-container-height-small` tall with `--button-label-font-small` text and `--button-icon-size-small` icons; large buttons are `--button-container-height-large` tall.
