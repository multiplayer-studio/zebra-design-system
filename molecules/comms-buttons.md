---
name: Comms Buttons
level: molecule
status: draft
composes: [../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  # sizes
  comms-buttons-container-size-minimum: '{control.control-lg}'
  comms-buttons-gap: '{space.space-sm}'
  # label
  comms-buttons-label-font: '{typography.type-body-xsmall}'
  comms-buttons-label-foreground: '{colors.color-ink-high}'
---

# Comms Buttons

> Round buttons for communication actions such as answer, end call, video, mute and speaker.

## Anatomy
1. Round button — an [Icon Button](../atoms/icon-button.md), large, shape full (circle), at least `--comms-buttons-container-size-minimum` across. Its flavour follows the action: positive to answer, negative to end, outline-subtle for neutral actions and toggles.
2. Icon — an [Icon](../atoms/icon.md) for the action (`phone`, `end_call`, `video`, `microphone`, `volume_up`, …).
3. Label (optional) — `--comms-buttons-label-font` `--comms-buttons-label-foreground`, centred `--comms-buttons-gap` below the button.

## Variants
| Action | Icon Button flavour | Icon |
|---|---|---|
| answer / call | positive | `phone` |
| end call | negative | `end_call` |
| neutral action (keypad, add) | outline-subtle | per action |
| toggle, off | outline-subtle | the "off" glyph, e.g. `microphone` |
| toggle, on | primary | the "on" glyph, e.g. `microphone_off` |

Toggles (mute, video, speaker) change flavour, glyph and label together when switched.

## States
Hover, pressed, focused and disabled are the [Icon Button](../atoms/icon-button.md) states of the chosen flavour; its tokens govern them, including the focus ring. A toggle adds an on / off state shown by flavour, icon and label together. There is no motion beyond the Icon Button's own.

## Spacing & Sizing
| Property | Token |
|---|---|
| Button | Icon Button large, at least `--comms-buttons-container-size-minimum` |
| Button ↔ label | `--comms-buttons-gap` |
| Label | `--comms-buttons-label-font`, `--comms-buttons-label-foreground` |

Lay several buttons out in a row with even spacing. Measurements are provisional: there is no Figma source yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Action | answer, end, neutral, toggle | neutral |
| Icon | any icon | — |
| Label | short text | none |
| Pressed (toggles) | on / off | off |
| Disabled | on / off | off |

## Usage
- Use for call controls (answer, end, video, mute, speaker); see [Voice Call Popup](../organisms/voice-call-popup.md) and [Dial Pad](../organisms/dial-pad.md).
- Keep the end-call button visually distinct and in a consistent position.
- Use colour plus icon to distinguish destructive actions (end call).
- Keep labels to one or two words.

## Accessibility
- Every button is icon-only, so give each an accessible name ("End call", "Mute microphone").
- Toggles (mute, video, speaker) expose their state with `aria-pressed`, and show it visibly with the icon and label as well as colour.
- Keep targets at least `--comms-buttons-container-size-minimum`.
- Answer and end must not rely on green and red alone; the icon and the name carry the meaning.

## Claude Prompt
Draw a row of circular communication buttons, each a `--comms-buttons-container-size-minimum` solid round button with a single centred icon: a green phone (answer), a red phone-down (end call), and neutral white buttons with a thin grey outline for mute, video and speaker. Under each button sits a short `--comms-buttons-label-font` label. Use the Zebra style: IBM Plex Sans labels, flat fills, no gradients.
