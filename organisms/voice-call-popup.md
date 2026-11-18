---
name: Voice Call Pop up
level: organism
status: draft
composes: [../atoms/avatar.md, ../molecules/comms-buttons.md, ../atoms/icon-button.md]
tokens:
  # surface
  voice-call-popup-container-background: '{colors.color-fill-default}'
  voice-call-popup-container-border-color: '{colors.color-fill-transparent}'
  voice-call-popup-container-border-width: '{stroke.stroke-thin}'
  voice-call-popup-container-radius-rounded: '{radius.radius-element-md}'
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
  # ongoing (minimised, floating)
  voice-call-popup-ongoing-padding-y: '{space.space-xs}'
  voice-call-popup-ongoing-padding-x: '{space.space-sm}'
  voice-call-popup-ongoing-gap: '{space.space-sm}'
  voice-call-popup-ongoing-radius: '{radius.radius-pill}'
  voice-call-popup-ongoing-title-font: '{typography.type-label-medium}'
  voice-call-popup-ongoing-inset: '{space.space-page}'
  # scrim
  voice-call-popup-scrim-background: '{colors.color-fill-scrim}'
---

# Voice Call Pop up

> An overlay shown for an incoming or active voice call, which minimises to a small floating element so the call stays reachable while the person keeps working.

A composition built from existing Zebra atoms and molecules; the pop-up defines its surface, caller text and scrim.

## Anatomy
1. Scrim — `--voice-call-popup-scrim-background` over the current screen.
2. Pop-up surface — `--voice-call-popup-container-background` card with a `--voice-call-popup-container-border-width` `--voice-call-popup-container-border-color` border (transparent, so the edge shows in forced colours, [patterns 6.10](../patterns/06-accessibility.md)) and `--voice-call-popup-container-shadow`; a centred column with `--voice-call-popup-container-padding` padding and `--voice-call-popup-container-gap` between groups.
3. Caller identity — [Avatar](../atoms/avatar.md) (large), name in `--voice-call-popup-title-font` `--voice-call-popup-title-foreground`, and call status / duration in `--voice-call-popup-subtitle-font` `--voice-call-popup-subtitle-foreground` led by a `--voice-call-popup-subtitle-icon-size` icon. Lines are `--voice-call-popup-identity-gap` apart.
4. Call controls — a row of [Comms Buttons](../molecules/comms-buttons.md) (answer / decline / end, mute, speaker) `--voice-call-popup-controls-gap` apart; [Icon Buttons](../atoms/icon-button.md) for secondary actions, including Minimise (`full_screen_exit`) in the active state. Their own tokens govern colours, states, focus ring and touch target.

**Ongoing (minimised)** — the active call shrunk to a pill that floats above every screen, with no scrim ([patterns 2.63](../patterns/02-navigation-flow.md), [1.119](../patterns/01-screen-composition.md)): the same surface, border and shadow at `--voice-call-popup-ongoing-radius`, padded `--voice-call-popup-ongoing-padding-y` / `--voice-call-popup-ongoing-padding-x`, parts `--voice-call-popup-ongoing-gap` apart. It holds a small Avatar, the caller's name in `--voice-call-popup-ongoing-title-font` with the running duration in `--voice-call-popup-subtitle-font`, and the End call Comms Button. It sits `--voice-call-popup-ongoing-inset` from the screen's edges, above the bottom navigation and clear of the screen's primary action, and can be dragged to another edge. Pressing it anywhere but End call returns the full pop-up.

## Variants
Shape: rounded (default) → `--voice-call-popup-container-radius-rounded`; sharp → `--voice-call-popup-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Status line | Controls |
|---|---|---|
| incoming | incoming-call icon + "Incoming call" and the caller's role | Decline (negative), Answer (positive) |
| active | in-call icon + "Active" and the running duration | Mute and Speaker toggles, End call (negative), Minimise |
| ongoing | the minimised pill: name and running duration | End call; pressing the pill expands it |
| ended | end-call icon + "Call ended" and the final duration | Close |

The pop-up appears and leaves without its own animation; toggles change icon, label and flavour together. The ended state's controls are provisional. In the active state, the system Back and Escape minimise the call rather than ending it.

## Spacing & Sizing
Measurements are provisional: the pop-up has no Figma source yet.

| Part | Value |
|---|---|
| Padding / group gap | `--voice-call-popup-container-padding` / `--voice-call-popup-container-gap` |
| Identity line gap | `--voice-call-popup-identity-gap` |
| Status icon | `--voice-call-popup-subtitle-icon-size`, `--voice-call-popup-subtitle-gap` from the text |
| Controls gap | `--voice-call-popup-controls-gap`, wrapping and centred |
| Ongoing pill | hugs its content; `--voice-call-popup-ongoing-padding-y` / `--voice-call-popup-ongoing-padding-x`, gap `--voice-call-popup-ongoing-gap`, `--voice-call-popup-ongoing-inset` from the edges |

The surface fills the width it is given (a sheet at compact, a fixed card from medium) and is centred over the scrim.

## Properties
| Property | Options | Default |
|---|---|---|
| State | incoming, active, ongoing, ended | incoming |
| Caller | avatar, name, role | — |
| Rounded | on / off | on |
| Mute / Speaker | on / off (active state) | off |

## Usage
- Use for an incoming phone or VoIP call that must interrupt the current task; don't use it for messages.
- Minimise an active call to ongoing as soon as the person needs the screen; it returns to full view in one press.
- Don't use it for push-to-talk: a push-to-talk call arriving mid-task appears as a notice and the task resumes where it was, and talking happens on the hardware key or the [Push to Talk](../molecules/push-to-talk.md) control ([patterns 2.84](../patterns/02-navigation-flow.md)).
- Keep the caller's name and role short; the duration replaces the role once the call is active.
- Offer only the controls the state needs.

## Accessibility
- Answer and decline differ by icon and label as well as colour ([patterns 6.11](../patterns/06-accessibility.md)).
- The pop-up is a dialog named after the call ("Incoming call from …") and follows the overlay focus rules ([patterns 6.28](../patterns/06-accessibility.md), [6.29](../patterns/06-accessibility.md)). The ongoing pill isn't modal: it's a labelled region ("Call with …, 3 minutes") with its expand button and End call in the tab order, and the duration isn't announced every second.
- Toggles expose their state with `aria-pressed` and change their label ("Mute" → "Muted").
- All controls are composed components and keep their own accessibility (comms button and icon button touch targets and focus rings).

## Claude Prompt
Draw a floating white (`--voice-call-popup-container-background`) call card with a `--voice-call-popup-container-shadow` shadow, a thin `--voice-call-popup-container-border-color` border and `--voice-call-popup-container-radius-rounded` corners over a dimmed (`--voice-call-popup-scrim-background`) screen. It shows a large round avatar, the caller's name in `--voice-call-popup-title-font`, "Incoming call" in small `--voice-call-popup-subtitle-foreground` text with a phone icon, and a row of round controls with labels underneath: a red decline button and a green answer button with phone icons. For the ongoing call, draw a small white pill floating near the bottom corner of a working screen, with a tiny avatar, the caller's name, "03:12" and a small red end-call button.
