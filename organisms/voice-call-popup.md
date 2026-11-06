---
name: Voice Call Pop up
level: organism
status: draft
composes: [../atoms/avatar.md, ../molecules/comms-buttons.md, ../atoms/icon-button.md]
tokens:
  voice-call-popup-container-background: '{colors.surface-default}'
  voice-call-popup-container-radius-rounded: '{rounded.radius-minimal}'
  voice-call-popup-container-border-color: '{colors.border-default}'
  voice-call-popup-title-foreground: '{colors.main-default}'
  voice-call-popup-subtitle-foreground: '{colors.main-subtle}'
  voice-call-popup-scrim-background: '{colors.surface-overlay}'
---

# Voice Call Pop up

> An overlay shown during an incoming or active voice call.

This page is a composition guide built from existing Zebra atoms and molecules. Measurements to be defined.

## Anatomy
1. Pop-up surface — elevated card/overlay.
2. Caller identity — [Avatar](../atoms/avatar.md), name, call status/duration.
3. Call controls — [Comms Buttons](../molecules/comms-buttons.md) (answer / decline / end) and [Icon Buttons](../atoms/icon-button.md) (mute, speaker). Their own tokens govern colours, states, focus ring and touch target.

## Variants
Measurements to be defined.

## States
Incoming / active / ended. Measurements to be defined.

## Spacing & Sizing
Measurements to be defined. Stated so far: the surface is `--voice-call-popup-container-background` with `--voice-call-popup-container-radius-rounded` corners when rounded and a `--voice-call-popup-container-border-color` border; caller name `--voice-call-popup-title-foreground`, status text `--voice-call-popup-subtitle-foreground`; scrim `--voice-call-popup-scrim-background`. Spacing and elevation will use the Zebra semantic scales once defined.

## Usage
- Answer/decline must be distinguishable by icon and label, not only green/red.
- All controls are composed components and keep their own accessibility (comms buttons ≥ `--comms-buttons-container-size-minimum`; icon buttons keep their own focus ring and touch target); never rely on colour alone.

## Stitch Prompt
Draw a floating white call card with a soft shadow and rounded corners over the current screen. It shows a round avatar, the caller's name in medium weight, "Incoming call" in small grey text, and a row of controls: mute and speaker icon buttons, a red decline button and a green answer button with phone icons.
