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
  button-container-transition: '{motion.motion-smooth}'
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
1. Container — horizontal row, content centred, height fixed per size. Carries the background, border and radius. The row has no gap (`--button-container-gap`).
2. Leading icon (optional) — [Icon](../atoms/icon.md), coloured with the label foreground; style follows the button shape.
3. Label — the button text, in a wrapper whose own horizontal padding (`--button-label-padding-x-medium`) is what separates it from the icons. Write it as the verb the user is about to perform.
4. Trailing icon (optional) — [Icon](../atoms/icon.md), as the leading icon.

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
| disabled | `--button-<flavour>-container-background-disabled` | `--button-<flavour>-label-foreground-disabled` text + icon | outline borders → `--button-<flavour>-container-border-color-disabled`; no flavour keeps its accent colour; not interactive |

Every state change is colour-only, a tint over `--button-container-transition`, with no scale, shadow or elevation shift. The gradient flavours never swap to a flat colour (a browser can't interpolate a gradient to a solid fill, so it flickers): on hover the gradient slides until the end colour covers the fill (the label on text-gradient), on press it slides the other way until the start colour covers it, and leaving or releasing slides it back. The focus ring is the only change to the outer footprint, so leave room around a button in a tight row.

## Spacing & Sizing
| Size | Height | Padding (V / H) | Label padding (H) | Font | Icon |
|---|---|---|---|---|---|
| small | `--button-container-height-small` | `--button-container-padding-y` / `--button-container-padding-x-small` | `--button-label-padding-x-small` | `--button-label-font-small` | `--button-icon-size-small` |
| medium (default) | `--button-container-height-medium` | `--button-container-padding-y` / `--button-container-padding-x-medium` | `--button-label-padding-x-medium` | `--button-label-font-medium` | `--button-icon-size-medium` |
| large | `--button-container-height-large` | `--button-container-padding-y` / `--button-container-padding-x-large` | `--button-label-padding-x-large` | `--button-label-font-large` | `--button-icon-size-large` |

Width always hugs the label and any visible icons, never fixed; each icon shown adds its own icon size to the width. The label never truncates or wraps, so a long label (or one swapped at runtime) widens the control and shifts its neighbours. The fixed height does the real work; vertical padding is the same at every size.

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

Hover, pressed and focus are driven by interaction, never set on a static layout.

## Usage
- Use one primary per view or per group. Everything else steps down to outline, subtle or text so the single most important action stays findable. Two outline buttons side by side read as equal weight.
- Write the label as the verb the user is about to perform, Save rather than OK.
- Use positive only for the confirmation of a constructive outcome (approve, publish), and negative only for destructive actions the user can't undo. Keep the cancel beside a negative button no stronger than subtle.
- Use gradient (or text-gradient) for one promotional moment per screen only; it outranks primary.
- Pair contrast with outline-contrast, outline or text, not with primary; outline-subtle suits a busy surface where an accent border would compete.
- Text and subtle have nothing behind them at rest, so on a coloured or busy surface they stop reading as controls.
- Use a trailing icon for directional or disclosure actions. Both icons on at small leave little room for the label.
- Don't build an icon-only button by hiding the label; use [Icon Button](../atoms/icon-button.md).
- Don't mix shapes inside one button group, and keep the shape consistent with the surrounding UI (sharp UIs use sharp icons).
- Touch target: small (`--button-container-height-small`) is below `--button-touch-target-size-minimum`; add surrounding hit area on touch UIs.

## Accessibility
- The focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) is drawn outside the control and is identical on every flavour, so it stays visible whatever the button sits on.
- Disabled is a visual state only. Say why the action is unavailable in nearby text; a disabled control with no explanation looks broken.
- The icon repeats the label rather than adding to it. Every state change is colour-only, so nothing may be signalled by hover or pressed alone.
- Positive and negative must not rely on colour: the label carries the meaning.
- Labels must make sense out of context (Save, not OK), because screen readers announce them on their own.

## Stitch Prompt
Draw a Zebra button: a compact rectangle `--button-container-height-medium` tall with `--button-container-radius-rounded` corners, `--button-container-padding-x-medium` horizontal padding, and a centred label in `--button-label-font-medium`. The primary version is solid Zebra blue (`--button-primary-container-background-enabled`) with white text (`--button-primary-label-foreground`), darkening to `--button-primary-container-background-hover` on hover and `--button-primary-container-background-pressed` when pressed. Optional `--button-icon-size-medium` rounded icons sit either side of the label, `--button-label-padding-x-medium` away. Secondary styles are white with blue text and a thin `--button-container-border-width` blue outline (outline), transparent with dark text and a light grey outline (outline-subtle), or plain blue text (text). A contrast button is near-black (`--button-contrast-container-background-enabled`) with white text; a gradient button fills with a purple-to-blue diagonal gradient (`--button-gradient-container-background-start` → `--button-gradient-container-background-end`). Disabled buttons are flat light grey (`--button-primary-container-background-disabled`) with grey text (`--button-primary-label-foreground-disabled`). Small buttons are `--button-container-height-small` tall with `--button-label-font-small` text and `--button-icon-size-small` icons; large buttons are `--button-container-height-large` tall.
