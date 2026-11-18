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
1. Round button — an [Icon Button](../atoms/icon-button.md), large, shape full (circle), at least `--comms-buttons-container-size-minimum` across. Its flavour follows the action: positive to answer, negative to end, outline-subtle for neutral actions and toggles that are off, primary for toggles that are on.
2. Icon — an [Icon](../atoms/icon.md) for the action (`phone`, `end_call`, `video`, `microphone`, `volume_up`, …).
3. Label (optional) — `--comms-buttons-label-font` `--comms-buttons-label-foreground`, centred `--comms-buttons-gap` below the button.

## Variants
| Action | Icon Button flavour | Icon |
|---|---|---|
| answer / call | positive | `phone` |
| end call | negative | `end_call` |
| neutral action (keypad, add) | outline-subtle | per action |
| toggle, off | outline-subtle (outlined) | the action's glyph, e.g. `microphone_off` for Mute |
| toggle, on | primary (filled) | the same glyph |

Toggles (mute, video, speaker) keep the same glyph and label in both states; only the flavour changes, filled when on and outlined when off, with the pressed state exposed as `aria-pressed` ([patterns 3.8](../patterns/03-controls-interaction.md)). Filled versus outlined is a change of shape as well as colour, so the state never rests on colour alone.

## States
Hover, pressed, focused and disabled are the [Icon Button](../atoms/icon-button.md) states of the chosen flavour; its tokens govern them, including the focus ring. A toggle adds an on / off state shown by flavour (filled or outlined) and `aria-pressed`. There is no motion beyond the Icon Button's own.

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
- Use for call controls (answer, end, video, mute, speaker); see [Voice Call Popup](../organisms/voice-call-popup.md) and [Dial Pad](../organisms/dial-pad.md). A talk control that transmits while held is a [Push To Talk](./push-to-talk.md), not a comms button.
- Keep the end-call button visually distinct and in a consistent position.
- End call is destructive, so it takes the negative flavour, with its icon and name carrying the meaning as well as the colour ([patterns 6.11](../patterns/06-accessibility.md)).
- Keep labels to one or two words; they wrap rather than truncate. A toggle's label names the action and doesn't change with its state.

## Accessibility
- Every button is icon-only, so give each an accessible name ("End call", "Mute microphone").
- Toggles (mute, video, speaker) expose their state with `aria-pressed`, and show it visibly as filled or outlined; their name stays the same in both states.
- Keep targets at least `--comms-buttons-container-size-minimum`.
- Answer and end must not rely on green and red alone; the icon and the name carry the meaning.

## Claude Prompt
Draw a row of circular communication buttons, each a `--comms-buttons-container-size-minimum` solid round button with a single centred icon: a green phone (answer), a red phone-down (end call), and neutral white buttons with a thin grey outline for mute, video and speaker; a mute button that is on is filled solid blue with the same icon. Under each button sits a short `--comms-buttons-label-font` label. Use the Zebra style: IBM Plex Sans labels, flat fills, no gradients.
