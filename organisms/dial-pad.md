---
name: Dial Pad
level: organism
status: draft
composes: [../organisms/bottom-sheet.md, ../atoms/fab.md, ../atoms/icon-button.md, ../molecules/comms-buttons.md]
tokens:
  # container
  dial-pad-container-background: '{colors.color-fill-default}'
  dial-pad-container-border-color: '{colors.color-line-default}'
  dial-pad-container-border-width: '{stroke.stroke-thin}'
  dial-pad-container-padding: '{space.space-2xl}'
  dial-pad-container-gap: '{space.space-2xl}'
  # number display
  dial-pad-display-height: '{control.control-lg}'
  dial-pad-display-gap: '{space.space-sm}'
  dial-pad-number-font: '{typography.type-title-large}'
  dial-pad-number-foreground: '{colors.color-ink-high}'
  dial-pad-number-placeholder-foreground: '{colors.color-ink-medium}'
  # keypad
  dial-pad-keypad-gap: '{space.space-md}'
  dial-pad-key-size: '{primitives.scale-18}'
  dial-pad-key-size-minimum: '{control.control-lg}'
  dial-pad-key-padding-x: '{space.space-sm}'
  dial-pad-key-gap: '{space.space-2xs}'
  dial-pad-key-radius-rounded: '{radius.radius-element-sm}'
  dial-pad-key-radius-sharp: '{radius.radius-none}'
  dial-pad-key-background-enabled: '{colors.color-fill-default}'
  dial-pad-key-background-hover: '{colors.color-fill-faint}'
  dial-pad-key-background-pressed: '{colors.color-fill-sunken}'
  dial-pad-key-border-color: '{colors.color-line-default}'
  dial-pad-key-border-width: '{stroke.stroke-thin}'
  dial-pad-key-label-font: '{typography.type-title-large}'
  dial-pad-key-label-foreground: '{colors.color-ink-high}'
  dial-pad-key-sublabel-font: '{typography.type-label-small}'
  dial-pad-key-sublabel-foreground: '{colors.color-ink-medium}'
  dial-pad-key-sublabel-height: '{space.space-lg}'
  # actions and status
  dial-pad-actions-gap: '{space.space-md}'
  dial-pad-status-font: '{typography.type-body-small}'
  dial-pad-status-foreground: '{colors.color-ink-medium}'
  # focus, motion
  dial-pad-focus-ring-width: '{stroke.stroke-thick}'
  dial-pad-focus-ring-color: '{colors.color-line-focus}'
  dial-pad-key-transition: '{motion.motion-smooth}'
---

# Dial Pad

> Dial pad gives the user the ability to dial a number and start a call. It also has a quick dial security action and a delete entry action.

A composition built from existing Zebra atoms and molecules; the dial pad defines its container, number display and keys.

## Anatomy
1. Container — `--dial-pad-container-background` column with a `--dial-pad-container-border-width` `--dial-pad-container-border-color` border, `--dial-pad-container-padding` padding and `--dial-pad-container-gap` between rows.
2. Number display — the entered digits in `--dial-pad-number-font` `--dial-pad-number-foreground`; a "Enter number" placeholder in `--dial-pad-number-placeholder-foreground` when empty. At least `--dial-pad-display-height` tall.
3. Keypad — 4-row by 3-column grid of keys 1–9, *, 0, # (digit + letters), `--dial-pad-keypad-gap` apart. Keys are the dial pad's own part, modelled on the [Bottom Sheet](bottom-sheet.md) Grid Menu Item: digit in `--dial-pad-key-label-font` `--dial-pad-key-label-foreground`, letters beneath in `--dial-pad-key-sublabel-font`, `--dial-pad-key-gap` apart.
4. Call action — primary call button: a [FAB](../atoms/fab.md) or a [Comms Button](../molecules/comms-buttons.md) (positive); its own tokens govern colours, states and size.
5. Quick dial security action — a dedicated [Comms Button](../molecules/comms-buttons.md) (negative), labelled and iconed differently from Call.
6. Delete entry — backspace [Icon Button](../atoms/icon-button.md) beside the display; its own tokens govern colours, states, focus ring and touch target.
7. Status line (optional) — `--dial-pad-status-font` `--dial-pad-status-foreground` text under the actions ("Calling 555…").

## Variants
| Call action | Notes |
|---|---|
| Comms Button (default) | round positive button with a "Call" label, matching the security button |
| FAB | full-shape FAB with a "Call" label |

Shape: rounded (default) → keys use `--dial-pad-key-radius-rounded`; sharp → `--dial-pad-key-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Key state | Background | Border | Notes |
|---|---|---|---|
| enabled | `--dial-pad-key-background-enabled` | `--dial-pad-key-border-width` `--dial-pad-key-border-color` | |
| hover | `--dial-pad-key-background-hover` | unchanged | pointer devices only |
| pressed | `--dial-pad-key-background-pressed` | unchanged | appends the digit |
| focused | `--dial-pad-key-background-enabled` | unchanged | `--dial-pad-focus-ring-width` `--dial-pad-focus-ring-color` ring outside the key |

Key state changes are colour-only over `--dial-pad-key-transition`. Delete is disabled while the display is empty.

## Spacing & Sizing
Measurements are provisional: the dial pad has no Figma source yet.

| Part | Value |
|---|---|
| Container padding / row gap | `--dial-pad-container-padding` / `--dial-pad-container-gap` |
| Display | min height `--dial-pad-display-height`, gap to delete `--dial-pad-display-gap` |
| Key | `--dial-pad-key-size` tall (never below `--dial-pad-key-size-minimum`), padding-x `--dial-pad-key-padding-x` |
| Letter row | `--dial-pad-key-sublabel-height` tall, kept even when empty so digits align |
| Keypad / actions gap | `--dial-pad-keypad-gap` / `--dial-pad-actions-gap` |

The pad is three keys wide plus gaps and padding; the actions sit in the same three columns, Call in the middle, Security on the right.

## Properties
| Property | Options | Default |
|---|---|---|
| Call action | Comms Button, FAB | Comms Button |
| Security quick dial | on / off | on |
| Rounded | on / off | on |
| Number | digits, *, # | empty |

## Usage
- Make the security quick-dial clearly distinct from the regular call action (colour, icon and label) to avoid mis-taps.
- Keep the delete action beside the number it edits.
- Allow pasting or typing a number on devices with a keyboard.

## Accessibility
- Keys meet at least `--dial-pad-key-size-minimum` and have accessible names ("2 A B C", "Star", "Hash").
- Keys show a `--dial-pad-focus-ring-width` `--dial-pad-focus-ring-color` focus ring.
- The number display is a status region, so screen readers hear each digit as it's entered.
- Composed controls keep their own accessibility (comms buttons, FAB and icon button targets and focus rings). Never rely on colour alone: Call and Security differ in icon and label too.

## Stitch Prompt
Draw a mobile dial pad: the dialled number in large `--dial-pad-number-font` text at the top with a backspace icon to its right, then a 4-row by 3-column grid of `--dial-pad-key-size` keys with `--dial-pad-key-radius-rounded` corners, a white (`--dial-pad-key-background-enabled`) fill and a thin `--dial-pad-key-border-color` border, showing digits 1–9, *, 0, # with small `--dial-pad-key-sublabel-foreground` letter groups beneath the digits. Under the grid, a large green circular call button in the centre and a distinct red security quick-dial button beside it, each labelled underneath.
