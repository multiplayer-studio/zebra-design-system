---
name: Voice Call Pop up
level: organism
status: draft
composes: [../atoms/avatar.md, ../molecules/comms-buttons.md, ../atoms/icon-button.md]
tokens:
  # surface
  voice-call-popup-container-background: '{colors.color-fill-default}'
  voice-call-popup-container-border-color: '{colors.color-line-default}'
  voice-call-popup-container-border-width: '{stroke.stroke-thin}'
  voice-call-popup-container-radius-rounded: '{radius.radius-sm}'
  voice-call-popup-container-radius-sharp: '{radius.radius-none}'
  voice-call-popup-container-shadow: '{shadow.shadow-medium}'
  voice-call-popup-container-padding: '{space.space-2xl}'
  voice-call-popup-container-gap: '{space.space-lg}'
  # caller identity
  voice-call-popup-identity-gap: '{space.space-2xs}'
  voice-call-popup-title-font: '{typography.type-title-large}'
  voice-call-popup-title-foreground: '{colors.color-ink-high}'
  voice-call-popup-subtitle-font: '{typography.type-body-small}'
  voice-call-popup-subtitle-foreground: '{colors.color-ink-medium}'
  voice-call-popup-subtitle-gap: '{space.space-2xs}'
  voice-call-popup-subtitle-icon-size: '{control.control-icon-sm}'
  # controls
  voice-call-popup-controls-gap: '{space.space-2xl}'
  # scrim
  voice-call-popup-scrim-background: '{colors.color-fill-scrim}'
---

# Voice Call Pop up

> An overlay shown during an incoming or active voice call.

A composition built from existing Zebra atoms and molecules; the pop-up defines its surface, caller text and scrim.

## Anatomy
1. Scrim — `--voice-call-popup-scrim-background` over the current screen.
2. Pop-up surface — `--voice-call-popup-container-background` card with a `--voice-call-popup-container-border-width` `--voice-call-popup-container-border-color` border and `--voice-call-popup-container-shadow`; a centred column with `--voice-call-popup-container-padding` padding and `--voice-call-popup-container-gap` between groups.
3. Caller identity — [Avatar](../atoms/avatar.md) (large), name in `--voice-call-popup-title-font` `--voice-call-popup-title-foreground`, and call status / duration in `--voice-call-popup-subtitle-font` `--voice-call-popup-subtitle-foreground` led by a `--voice-call-popup-subtitle-icon-size` icon. Lines are `--voice-call-popup-identity-gap` apart.
4. Call controls — a row of [Comms Buttons](../molecules/comms-buttons.md) (answer / decline / end, mute, speaker) `--voice-call-popup-controls-gap` apart; [Icon Buttons](../atoms/icon-button.md) for secondary actions. Their own tokens govern colours, states, focus ring and touch target.

## Variants
Shape: rounded (default) → `--voice-call-popup-container-radius-rounded`; sharp → `--voice-call-popup-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Status line | Controls |
|---|---|---|
| incoming | incoming-call icon + "Incoming call" and the caller's role | Decline (negative), Answer (positive) |
| active | in-call icon + "Active" and the running duration | Mute and Speaker toggles, End call (negative) |
| ended | end-call icon + "Call ended" and the final duration | Dismiss |

The pop-up appears and leaves without its own animation; toggles change icon, label and flavour together. The ended state's controls are provisional.

## Spacing & Sizing
Measurements are provisional: the pop-up has no Figma source yet.

| Part | Value |
|---|---|
| Padding / group gap | `--voice-call-popup-container-padding` / `--voice-call-popup-container-gap` |
| Identity line gap | `--voice-call-popup-identity-gap` |
| Status icon | `--voice-call-popup-subtitle-icon-size`, `--voice-call-popup-subtitle-gap` from the text |
| Controls gap | `--voice-call-popup-controls-gap`, wrapping and centred |

The surface fills the width it is given (a sheet on handhelds, a fixed card on desktop) and is centred over the scrim.

## Properties
| Property | Options | Default |
|---|---|---|
| State | incoming, active, ended | incoming |
| Caller | avatar, name, role | — |
| Rounded | on / off | on |
| Mute / Speaker | on / off (active state) | off |

## Usage
- Use for an incoming or active voice call that must interrupt the current task; don't use it for messages.
- Keep the caller's name and role short; the duration replaces the role once the call is active.
- Offer only the controls the state needs.

## Accessibility
- Answer and decline must be distinguishable by icon and label, not only green and red.
- The pop-up is a dialog named after the call ("Incoming call from …"); move focus into it when it opens.
- Toggles expose their state with `aria-pressed` and change their label ("Mute" → "Muted").
- All controls are composed components and keep their own accessibility (comms button and icon button touch targets and focus rings); never rely on colour alone.

## Claude Prompt
Draw a floating white (`--voice-call-popup-container-background`) call card with a `--voice-call-popup-container-shadow` shadow, a thin `--voice-call-popup-container-border-color` border and `--voice-call-popup-container-radius-rounded` corners over a dimmed (`--voice-call-popup-scrim-background`) screen. It shows a large round avatar, the caller's name in `--voice-call-popup-title-font`, "Incoming call" in small `--voice-call-popup-subtitle-foreground` text with a phone icon, and a row of round controls with labels underneath: a red decline button and a green answer button with phone icons.
