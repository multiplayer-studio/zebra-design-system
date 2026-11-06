---
name: Dial Pad
level: organism
status: draft
composes: [../molecules/tile-button.md, ../atoms/fab.md, ../atoms/icon-button.md, ../molecules/comms-buttons.md]
tokens:
  dial-pad-container-background: '{colors.surface-default}'
  dial-pad-key-radius-rounded: '{rounded.radius-minimal}'
  dial-pad-key-border-color: '{colors.border-default}'
  dial-pad-key-label-foreground: '{colors.main-default}'
  dial-pad-key-sublabel-foreground: '{colors.main-subtle}'
  dial-pad-key-size-minimum: '{layout.touch-target-recommended}'
  dial-pad-focus-ring-width: '{border.border-size-medium}'
  dial-pad-focus-ring-color: '{colors.border-primary}'
---

# Dial Pad

> Dial pad gives the user the ability to dial a number and start a call. It also has a quick dial security action and a delete entry action.

This page is a composition guide built from existing Zebra atoms and molecules. Measurements to be defined.

## Anatomy
1. Number display — the entered digits.
2. Keypad — 4-row by 3-column grid of keys 1–9, *, 0, # (digit + letters). Keys are the dial pad's own part, modelled on [Tile Buttons](../molecules/tile-button.md).
3. Call action — primary call button: a [FAB](../atoms/fab.md) or a [Comms Button](../molecules/comms-buttons.md); its own tokens govern colours, states and size.
4. Quick dial security action — dedicated button.
5. Delete entry — backspace [Icon Button](../atoms/icon-button.md); its own tokens govern colours, states, focus ring and touch target.

## Variants
Measurements to be defined.

## States
Keys: enabled / pressed / focus. Delete: hidden or disabled when the display is empty.

## Spacing & Sizing
Measurements to be defined. Stated so far: background `--dial-pad-container-background`; keys use `--dial-pad-key-radius-rounded` corners when rounded and a `--dial-pad-key-border-color` border, digits `--dial-pad-key-label-foreground`, letters `--dial-pad-key-sublabel-foreground`. Spacing will use the Zebra semantic scale once defined.

## Usage
- Make the security quick-dial clearly distinct from the regular call action to avoid mis-taps.
- Keys need ≥ `--dial-pad-key-size-minimum` targets and accessible names ("2 ABC").
- Keys show a `--dial-pad-focus-ring-width` `--dial-pad-focus-ring-color` focus ring. Composed controls keep their own accessibility (comms buttons ≥ `--comms-buttons-container-size-minimum`). Never rely on colour alone.

## Stitch Prompt
Draw a mobile dial pad: the dialled number in large text at the top with a backspace icon to its right, then a 4-row by 3-column grid of round keys showing digits 1–9, *, 0, # with small letter groups beneath the digits. Under the grid, a large green circular call button in the centre and a distinct red security quick-dial button beside it.
