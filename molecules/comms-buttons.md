---
name: Comms Buttons
level: molecule
status: draft
composes: [../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  comms-buttons-container-size-minimum: '{layout.touch-target-recommended}'
---

# Comms Buttons

> Round buttons used for communication actions like call, video, mute, etc.

Measurements to be defined.

## Anatomy
1. Round button – [Icon Button](../atoms/icon-button.md), shape full (circle); flavor per action (e.g. positive for answer, negative for end call, outline-subtle for neutral toggles). Size to be defined.
2. Icon – [Icon](../atoms/icon.md) for the action (call, video, mute, …).
3. Optional label – measurements to be defined.

## Variants
Measurements to be defined.

## States
Measurements to be defined. Hover, pressed, focus and disabled are the [Icon Button](../atoms/icon-button.md) states of the chosen flavor; its tokens govern them.

## Spacing & Sizing
Measurements to be defined.

## Usage
- Use for call controls (answer, end, video, mute, speaker); see [Voice Call Popup](../organisms/voice-call-popup.md) and [Dial Pad](../organisms/dial-pad.md).
- Toggle actions (mute, video) need a visible on/off state that is also announced to assistive tech.
- Keep targets at least `--comms-buttons-container-size-minimum`; give every icon-only button an accessible name.
- Use colour plus icon to distinguish destructive actions (end call).

## Stitch Prompt
Draw a row of circular communication buttons, each a solid round button with a single centred white or dark line icon: a green phone (answer), a red phone-down (end call), and neutral grey buttons for mute, video and speaker. Use the Zeta style: IBM Plex Sans labels if shown, flat fills, no gradients.
