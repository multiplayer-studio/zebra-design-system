---
name: Push to Talk
level: molecule
status: draft
composes: [../atoms/icon.md, ../atoms/avatar.md, ../atoms/switch.md, ../atoms/icon-button.md]
tokens:
  # talk control
  push-to-talk-control-background-ready: '{colors.color-brand-primary-default}'
  push-to-talk-control-background-hover: '{colors.color-brand-primary-strong}'
  push-to-talk-control-background-talking: '{colors.color-status-success-default}'
  push-to-talk-control-background-receiving: '{colors.color-status-info-default}'
  push-to-talk-control-background-busy: '{colors.color-status-neutral-default}'
  push-to-talk-control-background-refused: '{colors.color-status-error-default}'
  push-to-talk-control-background-disabled: '{colors.color-fill-disabled}'
  push-to-talk-control-foreground: '{colors.color-brand-primary-on}'
  push-to-talk-control-foreground-status: '{colors.color-brand-primary-on}'
  push-to-talk-control-foreground-disabled: '{colors.color-ink-disabled}'
  push-to-talk-control-border-color: '{colors.color-fill-transparent}'
  push-to-talk-control-border-width: '{stroke.stroke-thin}'
  push-to-talk-control-transition: '{motion.motion-feedback}'
  push-to-talk-control-radius: '{radius.radius-pill}'
  push-to-talk-control-size: '{primitives.scale-20}'
  push-to-talk-icon-size: '{icon.icon-size-large}'
  # talking ring (shape cue)
  push-to-talk-ring-width: '{stroke.stroke-heavy}'
  push-to-talk-ring-color: '{colors.color-status-success-default}'
  push-to-talk-ring-offset: '{space.space-xs}'
  # focus
  push-to-talk-focus-ring-width: '{stroke.stroke-thick}'
  push-to-talk-focus-ring-color: '{colors.color-line-focus}'
  # text
  push-to-talk-state-font: '{typography.type-label-large}'
  push-to-talk-state-foreground: '{colors.color-ink-high}'
  push-to-talk-channel-font: '{typography.type-title-large}'
  push-to-talk-channel-foreground: '{colors.color-ink-high}'
  push-to-talk-speaker-font: '{typography.type-body-medium}'
  push-to-talk-speaker-foreground: '{colors.color-ink-high}'
  push-to-talk-meta-font: '{typography.type-body-small}'
  push-to-talk-meta-foreground: '{colors.color-ink-medium}'
  # layout
  push-to-talk-stack-gap: '{space.space-lg}'
  push-to-talk-info-gap: '{space.space-2xs}'
  push-to-talk-speaker-gap: '{space.space-xs}'
---

# Push to Talk

> A hold-to-talk control for a voice channel, with the active channel and who is speaking directly above it and a latch for hands-busy work.

## Anatomy
Top to bottom, centred, `--push-to-talk-stack-gap` apart:
1. Channel — the active channel's name in `--push-to-talk-channel-font` `--push-to-talk-channel-foreground`, with its member count or site under it in `--push-to-talk-meta-font` `--push-to-talk-meta-foreground` (`--push-to-talk-info-gap` apart). An [Icon Button](../atoms/icon-button.md), subtle, medium (`swap`, "Change channel") sits at its trailing end where the person can change channel.
2. Speaker — who is speaking now: an [Avatar](../atoms/avatar.md) (small) and their name in `--push-to-talk-speaker-font` `--push-to-talk-speaker-foreground`, `--push-to-talk-speaker-gap` apart; "Channel clear" in `--push-to-talk-meta-foreground` when nobody is ([patterns 1.143](../patterns/01-screen-composition.md)).
3. Talk control — a circle `--push-to-talk-control-size` across (`--push-to-talk-control-radius`), holding the `ptt` [Icon](../atoms/icon.md) at `--push-to-talk-icon-size`. A `--push-to-talk-control-border-width` `--push-to-talk-control-border-color` edge keeps its outline in forced colours.
4. State label — under the control, in `--push-to-talk-state-font` `--push-to-talk-state-foreground`: "Hold to talk", "Talking", "Receiving", "Channel busy", "Can't talk now", "Offline".
5. Latch — a [Switch](../atoms/switch.md) labelled "Latch", where the product allows it ([patterns 3.131](../patterns/03-controls-interaction.md)).

## Variants
**State** (each has its own colour, words and sound: [patterns 4.95](../patterns/04-states-feedback.md))

| State | Control fill | Icon | Shape cue | State label |
|---|---|---|---|---|
| ready (default) | `--push-to-talk-control-background-ready` | `--push-to-talk-control-foreground` | — | "Hold to talk" |
| talking | `--push-to-talk-control-background-talking` | `--push-to-talk-control-foreground-status` | a `--push-to-talk-ring-width` `--push-to-talk-ring-color` ring `--push-to-talk-ring-offset` outside the circle | "Talking" (latched: "Talking, tap to stop") |
| receiving | `--push-to-talk-control-background-receiving` | `--push-to-talk-control-foreground-status` | the speaker row shows who | "Receiving" |
| busy | `--push-to-talk-control-background-busy` | `--push-to-talk-control-foreground-status` | — | "Channel busy" |
| refused | `--push-to-talk-control-background-refused` | `--push-to-talk-control-foreground-status` | — | "Can't talk now" and the reason; returns to its earlier state when released |
| disabled | `--push-to-talk-control-background-disabled` | `--push-to-talk-control-foreground-disabled` | — | "Offline" or the reason; stays focusable |

**Mode**: hold (default) transmits only while the control is held and stops on release. With Latch on, a tap starts transmitting and the next tap stops it ([patterns 3.131](../patterns/03-controls-interaction.md)).

## States
| State | Change |
|---|---|
| hover | ready fill becomes `--push-to-talk-control-background-hover`; pointer devices only |
| pressed | starts talking at once, on press, not release ([patterns 3.2](../patterns/03-controls-interaction.md)) |
| focus | `--push-to-talk-focus-ring-width` `--push-to-talk-focus-ring-color` ring outside the circle (outside the talking ring when both show) |

Fill and icon colours change over `--push-to-talk-control-transition`. The talking ring is static: no pulse, so nothing needs stopping under reduced motion. Sliding a finger off the control while holding stops transmitting.

## Spacing & Sizing
| Property | Value |
|---|---|
| Control | `--push-to-talk-control-size` circle |
| Icon | `--push-to-talk-icon-size` |
| Talking ring | `--push-to-talk-ring-width`, `--push-to-talk-ring-offset` out |
| Stack gap | `--push-to-talk-stack-gap` |
| Channel ↔ meta | `--push-to-talk-info-gap` |
| Avatar ↔ speaker name | `--push-to-talk-speaker-gap` |

The control sits low in the screen, in thumb reach, and is the screen's largest target. `--push-to-talk-control-size` is a draft placeholder on the closest scale step, to be confirmed in Figma.

## Properties
| Property | Options | Default |
|---|---|---|
| State | ready, talking, receiving, busy, refused, disabled | ready |
| Show Latch | on / off | off |
| Latched | on / off | off |
| Show Change channel | on / off | on |
| Channel, meta, speaker | text | — |

## Usage
- On a push-to-talk screen the talk control is the focal element, reachable without looking, with the channel and speaker directly above ([patterns 1.143](../patterns/01-screen-composition.md)).
- Transmitting must be unmistakable: colour, ring, words, sound and the hardware key's light change together ([patterns 3.131](../patterns/03-controls-interaction.md), [patterns 4.95](../patterns/04-states-feedback.md)).
- Where the device has a PTT key, the screen shows what it does, on the edge nearest the key ([patterns 3.119](../patterns/03-controls-interaction.md)). The key and the screen control do the same thing.
- A call arriving mid-task appears as a notice, not a takeover ([patterns 2.84](../patterns/02-navigation-flow.md)); while the person moves around, push-to-talk stays reachable from its key or the system's ongoing notification ([patterns 2.63](../patterns/02-navigation-flow.md)).
- Turn on Show Latch where hands-busy work or people who can't hold a control need it, and make latched talking just as visible.
- Use a gloved-size layout where gloves are worn; the control's size already exceeds every target minimum.

## Accessibility
- The control is a `button` named "Push to talk" with `aria-pressed` reflecting transmitting; its state label is tied to it with `aria-describedby`.
- Keyboard: Space held transmits and release stops, matching the touch behaviour; with Latch on, Space or Enter toggles. A hardware PTT key works the same.
- Announce state changes (Talking, Receiving from Jo Smith, Channel busy, Can't talk now) through a polite live region; each state also has its own sound ([patterns 4.95](../patterns/04-states-feedback.md)).
- Every state shows words and, for talking, a ring, so colour is never the only signal ([patterns 6.11](../patterns/06-accessibility.md)).
- Disabled stays focusable (`aria-disabled="true"`) and says why ("Offline: reconnecting").
- People who can't hold a control use Latch, so turn it on wherever the product's users might need it.

## Claude Prompt
Draw a push-to-talk panel, centred: at the top a `--push-to-talk-channel-font` channel name "Dock team" with a grey "8 members · Dock 3" under it and a small swap icon button at its right; below, a small avatar and "Jo Smith is speaking"; below that a large `--push-to-talk-control-size` blue circle (`--push-to-talk-control-background-ready`) holding a white `ptt` icon, with "Hold to talk" in `--push-to-talk-state-font` under it; at the bottom a Switch labelled "Latch". Show a second copy while talking: the circle green (`--push-to-talk-control-background-talking`) with a `--push-to-talk-ring-width` green ring `--push-to-talk-ring-offset` outside it, and the label "Talking".
