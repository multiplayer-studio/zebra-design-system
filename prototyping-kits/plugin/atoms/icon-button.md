---
name: Icon Button
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # primary
  icon-button-primary-container-background-enabled: '{colors.color-brand-primary-default}'
  icon-button-primary-container-background-hover: '{colors.color-brand-primary-strong}'
  icon-button-primary-container-background-pressed: '{colors.color-brand-primary-deep}'
  icon-button-primary-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-primary-icon-foreground: '{colors.color-brand-primary-on}'
  icon-button-primary-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # positive
  icon-button-positive-container-background-enabled: '{colors.color-status-success-default}'
  icon-button-positive-container-background-hover: '{colors.color-status-success-strong}'
  icon-button-positive-container-background-pressed: '{colors.color-status-success-deep}'
  icon-button-positive-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-positive-icon-foreground: '{colors.color-brand-primary-on}'
  icon-button-positive-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # negative
  icon-button-negative-container-background-enabled: '{colors.color-status-error-default}'
  icon-button-negative-container-background-hover: '{colors.color-status-error-strong}'
  icon-button-negative-container-background-pressed: '{colors.color-status-error-deep}'
  icon-button-negative-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-negative-icon-foreground: '{colors.color-brand-primary-on}'
  icon-button-negative-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # contrast
  icon-button-contrast-container-background-enabled: '{colors.color-fill-inverse}'
  icon-button-contrast-container-background-hover: '{colors.color-fill-inverse-sunken}'
  icon-button-contrast-container-background-pressed: '{colors.color-fill-inverse-elevated}'
  icon-button-contrast-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-contrast-icon-foreground: '{colors.color-ink-inverse}'
  icon-button-contrast-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # gradient
  icon-button-gradient-container-background-start: '{colors.color-gradient-default-start}'
  icon-button-gradient-container-background-end: '{colors.color-gradient-default-end}'
  icon-button-gradient-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-gradient-icon-foreground: '{colors.color-brand-primary-on}'
  icon-button-gradient-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # outline
  icon-button-outline-container-background-enabled: '{colors.color-fill-default}'
  icon-button-outline-container-background-hover: '{colors.color-fill-faint}'
  icon-button-outline-container-background-pressed: '{colors.color-fill-sunken}'
  icon-button-outline-container-background-disabled: '{colors.color-fill-disabled}'
  icon-button-outline-container-border-color: '{colors.color-brand-primary-default}'
  icon-button-outline-container-border-color-disabled: '{colors.color-line-subtle}'
  icon-button-outline-icon-foreground: '{colors.color-ink-brand}'
  icon-button-outline-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # outline-subtle
  icon-button-outline-subtle-container-background-enabled: '{colors.color-status-ghost-default}'
  icon-button-outline-subtle-container-background-hover: '{colors.color-fill-faint}'
  icon-button-outline-subtle-container-background-pressed: '{colors.color-fill-sunken}'
  icon-button-outline-subtle-container-background-disabled: '{colors.color-status-ghost-default}'
  icon-button-outline-subtle-container-border-color: '{colors.color-line-default}'
  icon-button-outline-subtle-container-border-color-disabled: '{colors.color-line-subtle}'
  icon-button-outline-subtle-icon-foreground: '{colors.color-ink-high}'
  icon-button-outline-subtle-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # outline-contrast
  icon-button-outline-contrast-container-background-enabled: '{colors.color-status-ghost-default}'
  icon-button-outline-contrast-container-background-hover: '{colors.color-status-ghost-faint}'
  icon-button-outline-contrast-container-background-pressed: '{colors.color-status-ghost-deep}'
  icon-button-outline-contrast-container-background-disabled: '{colors.color-status-ghost-default}'
  icon-button-outline-contrast-container-border-color: '{colors.color-fill-inverse}'
  icon-button-outline-contrast-container-border-color-hover: '{colors.color-fill-inverse-sunken}'
  icon-button-outline-contrast-container-border-color-pressed: '{colors.color-fill-inverse-elevated}'
  icon-button-outline-contrast-container-border-color-disabled: '{colors.color-line-subtle}'
  icon-button-outline-contrast-icon-foreground: '{colors.color-ink-high}'
  icon-button-outline-contrast-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # text
  icon-button-text-container-background-enabled: '{colors.color-status-ghost-default}'
  icon-button-text-container-background-hover: '{colors.color-status-ghost-faint}'
  icon-button-text-container-background-pressed: '{colors.color-status-ghost-deep}'
  icon-button-text-container-background-disabled: '{colors.color-status-ghost-default}'
  icon-button-text-icon-foreground: '{colors.color-ink-brand}'
  icon-button-text-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # text-gradient
  icon-button-text-gradient-container-background-enabled: '{colors.color-status-ghost-default}'
  icon-button-text-gradient-container-background-disabled: '{colors.color-status-ghost-default}'
  icon-button-text-gradient-icon-foreground-start: '{colors.color-gradient-strong-start}'
  icon-button-text-gradient-icon-foreground-end: '{colors.color-gradient-strong-end}'
  icon-button-text-gradient-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # subtle
  icon-button-subtle-container-background-enabled: '{colors.color-status-ghost-default}'
  icon-button-subtle-container-background-hover: '{colors.color-status-ghost-faint}'
  icon-button-subtle-container-background-pressed: '{colors.color-status-ghost-deep}'
  icon-button-subtle-container-background-disabled: '{colors.color-status-ghost-default}'
  icon-button-subtle-icon-foreground: '{colors.color-ink-high}'
  icon-button-subtle-icon-foreground-disabled: '{colors.color-ink-disabled}'
  # shape
  icon-button-container-radius-sharp: '{radius.radius-none}'
  icon-button-container-radius-rounded: '{radius.radius-element-sm}'
  icon-button-container-radius-full: '{radius.radius-pill}'
  # border, focus, motion
  icon-button-container-border-width: '{stroke.stroke-thin}'
  icon-button-focus-ring-width: '{stroke.stroke-thick}'
  icon-button-focus-ring-color: '{colors.color-line-focus}'
  icon-button-container-transition: '{motion.motion-feedback}'
  # busy
  icon-button-busy-indicator-stroke-width: '{stroke.stroke-thick}'
  icon-button-busy-indicator-duration: '{motion.motion-spin}'
  # sizes
  icon-button-container-size-small: '{control.control-sm}'
  icon-button-container-size-medium: '{control.control-md}'
  icon-button-container-size-large: '{control.control-lg}'
  icon-button-container-padding: '{space.space-2xs}'
  icon-button-icon-size-small: '{icon.icon-size-small}'
  icon-button-icon-size-medium: '{icon.icon-size-medium}'
  icon-button-icon-size-large: '{icon.icon-size-medium}'
  icon-button-touch-target-size-minimum: '{control.control-target-min}'
---

# Icon Button

> Icon buttons trigger an action from a single glyph, with no text label; they carry the same flavours, shapes and states as Button.

## Anatomy
1. Container — the button's own frame, a fixed square at every size and never hugging its content. Carries the background, border and radius.
2. Icon — a single [Icon](../atoms/icon.md), always visible and centred, coloured with the flavour's icon foreground; style follows the button shape. Its size is set by the button, so the nested icon's own Size and Framed are left alone (Framed would nest a `--icon-frame-size` box inside an already-sized control). The glyph is the only content: there is no default worth keeping, so always choose it (the design file ships More Horizontal, which reads as an overflow menu).

## Variants
Flavour (light mode shown by the tokens; every flavour follows dark and AAA automatically). The icon colour stays the same in every interactive state, except on text-gradient.

| Flavour | Enabled bg | Hover bg | Pressed bg | Icon | Border |
|---|---|---|---|---|---|
| primary (default) | `--icon-button-primary-container-background-enabled` | `--icon-button-primary-container-background-hover` | `--icon-button-primary-container-background-pressed` | `--icon-button-primary-icon-foreground` | none |
| positive | `--icon-button-positive-container-background-enabled` | `--icon-button-positive-container-background-hover` | `--icon-button-positive-container-background-pressed` | `--icon-button-positive-icon-foreground` | none |
| negative | `--icon-button-negative-container-background-enabled` | `--icon-button-negative-container-background-hover` | `--icon-button-negative-container-background-pressed` | `--icon-button-negative-icon-foreground` | none |
| contrast | `--icon-button-contrast-container-background-enabled` | `--icon-button-contrast-container-background-hover` | `--icon-button-contrast-container-background-pressed` | `--icon-button-contrast-icon-foreground` | none |
| gradient | 135° gradient `--icon-button-gradient-container-background-start` 0% → `--icon-button-gradient-container-background-end` 87% | gradient slides to the end colour | gradient slides to the start colour | `--icon-button-gradient-icon-foreground` | none |
| outline | `--icon-button-outline-container-background-enabled` | `--icon-button-outline-container-background-hover` | `--icon-button-outline-container-background-pressed` | `--icon-button-outline-icon-foreground` | `--icon-button-container-border-width` inside, `--icon-button-outline-container-border-color` |
| outline-subtle | `--icon-button-outline-subtle-container-background-enabled` | `--icon-button-outline-subtle-container-background-hover` | `--icon-button-outline-subtle-container-background-pressed` | `--icon-button-outline-subtle-icon-foreground` | `--icon-button-container-border-width` inside, `--icon-button-outline-subtle-container-border-color` |
| outline-contrast | `--icon-button-outline-contrast-container-background-enabled` | `--icon-button-outline-contrast-container-background-hover` | `--icon-button-outline-contrast-container-background-pressed` | `--icon-button-outline-contrast-icon-foreground` | `--icon-button-container-border-width` inside, `--icon-button-outline-contrast-container-border-color` (hover `--icon-button-outline-contrast-container-border-color-hover`, pressed `--icon-button-outline-contrast-container-border-color-pressed`) |
| text | `--icon-button-text-container-background-enabled` | `--icon-button-text-container-background-hover` | `--icon-button-text-container-background-pressed` | `--icon-button-text-icon-foreground` | none |
| text-gradient | `--icon-button-text-gradient-container-background-enabled` | unchanged | unchanged | 129° gradient across the glyph, `--icon-button-text-gradient-icon-foreground-start` → `--icon-button-text-gradient-icon-foreground-end`; slides like gradient | none |
| subtle | `--icon-button-subtle-container-background-enabled` | `--icon-button-subtle-container-background-hover` | `--icon-button-subtle-container-background-pressed` | `--icon-button-subtle-icon-foreground` | none |

Filled flavours step their own background. Outline and outline-subtle hold their border and shift a neutral background underneath. Text, subtle and outline-contrast raise a ghost tint from fully transparent; outline-contrast also steps its border on hover and press. The outline border sits inside the container, so it adds no size. Contrast is near-black in light mode and near-white in dark; outline-contrast's border and glyph follow the page the same way. On text-gradient the gradient runs across one small glyph, so it reads as a colour shift more than a gradient.

Shape: sharp → `--icon-button-container-radius-sharp` with zeta-icons-sharp; rounded (default) → `--icon-button-container-radius-rounded` with zeta-icons-round; full → `--icon-button-container-radius-full` (a circle) with zeta-icons-round. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Foreground | Notes |
|---|---|---|---|
| enabled | per flavour | per flavour | resting state |
| hover | per flavour (hover column) | unchanged | pointer devices only |
| pressed | per flavour (pressed column) | unchanged | |
| focused | per flavour (enabled) | unchanged | `--icon-button-focus-ring-width` `--icon-button-focus-ring-color` ring drawn outside the bounds, replacing the resting border; identical on every flavour |
| busy | per flavour (enabled) | unchanged | the action is running: a spinning arc replaces the glyph, `--icon-button-icon-size-<size>` square, `--icon-button-busy-indicator-stroke-width` wide, in the icon foreground, one turn per `--icon-button-busy-indicator-duration`. Ignores presses until the action ends; timings as Button's busy state ([patterns 3.3](../patterns/03-controls-interaction.md), [4.13–4.15](../patterns/04-states-feedback.md)) |
| disabled | `--icon-button-<flavour>-container-background-disabled` | `--icon-button-<flavour>-icon-foreground-disabled` | outline borders → `--icon-button-<flavour>-container-border-color-disabled`; no flavour keeps its accent colour; doesn't act, but stays focusable when its reason matters (see Accessibility) |

Every state change is colour-only, a tint over `--icon-button-container-transition` (the press and release feedback timing), with no scale, shadow or elevation shift. The gradient flavours never swap to a flat colour (a browser can't interpolate a gradient to a solid fill, so it flickers): on hover the gradient slides until the end colour covers the fill (the glyph on text-gradient), on press it slides the other way until the start colour covers it, and leaving or releasing slides it back. The focus ring is the only change to the outer footprint, so leave room around an icon button in a tight toolbar. The control never resizes: swapping the glyph changes nothing about its footprint.

## Spacing & Sizing
| Size | Box (w × h) | Padding | Icon |
|---|---|---|---|
| small | `--icon-button-container-size-small` square | `--icon-button-container-padding` | `--icon-button-icon-size-small` |
| medium (default) | `--icon-button-container-size-medium` square | `--icon-button-container-padding` | `--icon-button-icon-size-medium` |
| large | `--icon-button-container-size-large` square | `--icon-button-container-padding` | `--icon-button-icon-size-large` |

Both axes are fixed to the same size, so the button is always square; padding is the same on all four sides at every size. The glyph is perfectly centred in the box.

Icon size is a context override: icon buttons use the icon atom's `--icon-size-small` / `--icon-size-medium` steps; large reuses medium, so the glyph doesn't grow between medium and large even though the button does.

## Properties
| Property | Options | Default |
|---|---|---|
| Flavour | primary, positive, negative, contrast, gradient, outline, outline-subtle, outline-contrast, text, text-gradient, subtle | primary |
| Shape | sharp, rounded, full | rounded |
| Size | small, medium, large | medium |
| Icon | any icon from the set | — (always set it) |
| Disabled | on / off | off |
| Busy | on / off | off |

Hover, pressed and focus are driven by interaction, never set on a static layout.

## Usage
- Use for compact, well-understood actions (close, more, edit). If the action takes a word to be clear, use [Button](../atoms/button.md) instead.
- The screen has one primary action ([patterns 1.72](../patterns/01-screen-composition.md)); a primary icon button is that action, so it's rare. In a toolbar, the leading action steps down a level. Subtle is the usual choice for secondary toolbar controls; outline-subtle gives a visible edge on a busy toolbar; outline keeps the accent edge.
- Text has nothing behind it at rest, so on a busy surface the target becomes hard to find.
- Use positive only where the glyph already reads as approval. Use negative for every destructive action, with a glyph that says so (delete, remove), because the colour alone doesn't ([patterns 6.11](../patterns/06-accessibility.md)). A reversible one acts at once and offers Undo; an irreversible one confirms first ([patterns 3.86](../patterns/03-controls-interaction.md)).
- Use gradient (or text-gradient) only for an action to do with AI (DESIGN.md §3). It ranks like any other action: gradient only when AI is the screen's main purpose, otherwise text-gradient ([patterns 9.3](../patterns/09-ai.md)).
- Pair contrast with outline-contrast, outline or text, not with primary.
- Full (circle) suits a floating or standalone action; it looks wrong inside a form control.
- Don't leave a placeholder glyph in place; an overflow glyph will be understood as an overflow menu.
- Touch target: small and medium are below `--icon-button-touch-target-size-minimum`; large meets it. Extend the hit area of small and medium to it on touch, or prefer large ([patterns 6.16](../patterns/06-accessibility.md)). A pointer-only product may use `--control-target-pointer-min`, which medium meets ([patterns 6.18](../patterns/06-accessibility.md)).

## Accessibility
- Nothing on the control is readable, so every instance needs an accessible name in code (for example `aria-label="Delete"`); the glyph itself is decorative and hidden from assistive tech. Repeated buttons carry their item in the name ("Delete Printer 3").
- Show the name in a [Tooltip](../atoms/tooltip.md) on hover and on focus, and on long press on touch ([patterns 3.7](../patterns/03-controls-interaction.md)).
- The focus ring (`--icon-button-focus-ring-width` `--icon-button-focus-ring-color`) is drawn outside the control and is identical on every flavour ([patterns 6.23](../patterns/06-accessibility.md)).
- An unavailable icon button stays visible with its reason beside it, in text, not only in a tooltip ([patterns 3.10](../patterns/03-controls-interaction.md)). Where its existence or reason matters, it stays focusable with `aria-disabled="true"` ([patterns 6.34](../patterns/06-accessibility.md)); dimming is the state because it's announced and the reason is shown ([patterns 6.11](../patterns/06-accessibility.md)).
- Busy is exposed as busy (`aria-busy="true"`), and the button stays focusable.
- A destructive icon button shows it by its glyph and name, not by colour alone.

## Claude Prompt
Draw a Zebra icon button: a `--icon-button-container-size-medium` square with `--icon-button-container-radius-rounded` corners and `--icon-button-container-padding` padding, holding a single centred `--icon-button-icon-size-medium` rounded glyph and no text. The primary version is solid Zebra blue (`--icon-button-primary-container-background-enabled`) with a white glyph (`--icon-button-primary-icon-foreground`), darkening to `--icon-button-primary-container-background-hover` on hover and `--icon-button-primary-container-background-pressed` when pressed. Quieter versions are white with a blue glyph and a thin `--icon-button-container-border-width` blue outline (outline), transparent with a dark glyph and a light grey outline (outline-subtle), transparent with a dark glyph (subtle) or a blue glyph (text). A contrast version is near-black (`--icon-button-contrast-container-background-enabled`) with a white glyph; a gradient version fills with a purple-to-blue diagonal gradient. Disabled is flat light grey (`--icon-button-primary-container-background-disabled`) with a grey glyph (`--icon-button-primary-icon-foreground-disabled`). Small is `--icon-button-container-size-small` with a `--icon-button-icon-size-small` glyph, large is `--icon-button-container-size-large`, and the full shape makes it a circle.
