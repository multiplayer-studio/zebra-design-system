---
name: Message Input
level: molecule
status: stable
composes: [../atoms/icon-button.md, ../atoms/assist-chip.md, ./progress-circle.md, ../atoms/input-hint.md, ../atoms/icon.md]
tokens:
  # container
  message-input-container-background: '{colors.color-fill-default}'
  message-input-container-background-disabled: '{colors.color-fill-disabled}'
  message-input-container-border-color: '{colors.color-line-strong}'
  message-input-container-border-color-disabled: '{colors.color-line-subtle}'
  message-input-container-border-width: '{stroke.stroke-thin}'
  message-input-container-radius: '{radius.radius-container}'
  message-input-container-padding: '{space.space-md}'
  message-input-container-gap: '{space.space-sm}'
  message-input-container-width: '{component-sizes.size-message-input-width}'
  # text (value)
  message-input-value-foreground: '{colors.color-ink-high}'
  message-input-value-foreground-placeholder: '{colors.color-ink-medium}'
  message-input-value-foreground-disabled: '{colors.color-ink-disabled}'
  message-input-value-font: '{typography.type-body-medium}'
  message-input-value-padding-x: '{space.space-md}'
  message-input-value-padding-y: '{space.space-2xs}'
  # slots
  message-input-file-slot-gap: '{space.space-2xs}'
  message-input-chip-border-color: '{colors.color-status-info-default}'
  # toolbar
  message-input-toolbar-gap: '{space.space-sm}'
  message-input-toolbar-group-gap: '{space.space-2xs}'
  message-input-control-size: '{control.control-sm}'
  message-input-control-padding: '{space.space-2xs}'
  message-input-control-radius: '{radius.radius-pill}'
  message-input-control-icon-size: '{icon.icon-size-medium}'
  # tool controls (Attachment, More Tools, Dictate, voice-bar controls)
  message-input-tool-background-enabled: '{colors.color-status-ghost-default}'
  message-input-tool-background-hover: '{colors.color-status-ghost-faint}'
  message-input-tool-background-pressed: '{colors.color-status-ghost-deep}'
  message-input-tool-background-disabled: '{colors.color-status-ghost-default}'
  message-input-tool-foreground: '{colors.color-ink-high}'
  message-input-tool-foreground-disabled: '{colors.color-ink-disabled}'
  message-input-attachment-toggle-background-open: '{colors.color-status-ghost-deep}'
  message-input-attachment-gap: '{space.space-2xs}'
  # primary controls (Send, Stop, Play)
  message-input-send-background-enabled: '{colors.color-brand-primary-default}'
  message-input-send-background-hover: '{colors.color-brand-primary-strong}'
  message-input-send-background-pressed: '{colors.color-brand-primary-deep}'
  message-input-send-background-disabled: '{colors.color-fill-disabled}'
  message-input-send-foreground: '{colors.color-brand-primary-on}'
  message-input-send-foreground-disabled: '{colors.color-ink-disabled}'
  # voice bar
  message-input-voice-gap: '{space.space-sm}'
  message-input-voice-bar-background: '{colors.color-fill-faint}'
  message-input-voice-bar-radius: '{radius.radius-element-md}'
  message-input-voice-bar-height: '{control.control-lg}'
  message-input-voice-bar-gap: '{space.space-sm}'
  message-input-voice-bar-padding-start: '{space.space-md}'
  message-input-voice-bar-padding-start-playback: '{space.space-2xs}'
  message-input-voice-bar-padding-end: '{space.space-2xs}'
  message-input-voice-bar-padding-y: '{space.space-2xs}'
  message-input-waveform-height: '{control.control-icon-md}'
  message-input-waveform-gap: '{space.space-3xs}'
  message-input-waveform-bar-width: '{stroke.stroke-thick}'
  message-input-waveform-bar-radius: '{radius.radius-pill}'
  message-input-waveform-bar-color: '{colors.color-ink-high}'
  message-input-voice-label-foreground: '{colors.color-ink-high}'
  message-input-voice-label-font: '{typography.type-body-medium}'
  message-input-voice-time-foreground: '{colors.color-ink-medium}'
  message-input-voice-time-font: '{typography.type-body-medium}'
  message-input-voice-hint-foreground: '{colors.color-ink-medium}'
  message-input-voice-hint-font: '{typography.type-body-xsmall}'
  message-input-recording-dot-size: '{space.space-sm}'
  message-input-recording-dot-color: '{colors.color-status-error-default}'
  message-input-progress-size: '{control.control-icon-md}'
  # speaking
  message-input-speaking-gap: '{space.space-md}'
  message-input-speaking-padding-top: '{space.space-md}'
  message-input-speaking-padding-bottom: '{space.space-2xs}'
  message-input-orb-size: '{component-sizes.size-message-input-orb}'
  message-input-orb-ring-width: '{stroke.stroke-thick}'
  message-input-orb-ring-start: '{colors.color-gradient-default-start}'
  message-input-orb-ring-end: '{colors.color-gradient-default-end}'
  message-input-orb-ring-inner-start: '{colors.color-gradient-subtle-start}'
  message-input-orb-ring-inner-end: '{colors.color-gradient-subtle-end}'
  message-input-caption-foreground: '{colors.color-ink-high}'
  message-input-caption-font: '{typography.type-body-medium}'
  message-input-stop-speaking-background: '{colors.color-fill-sunken}'
  message-input-stop-speaking-foreground: '{colors.color-ink-high}'
---

# Message Input

> The composer for a message prompt: one State property moves it between typing, dictation, voice recording, generating, an error and the assistant speaking back, all in the same box ([patterns 1.35](../patterns/01-screen-composition.md)).

## Anatomy
1. Container — a fixed-width column on `--message-input-container-background` with a `--message-input-container-border-width` `--message-input-container-border-color` outline and `--message-input-container-radius` corners. It stacks the regions below `--message-input-container-gap` apart.
2. Error line (error only) — an [Input Hint](../atoms/input-hint.md), Type error, at the top of the box: what failed or which limit was reached, and what the person can do now ([patterns 9.50–9.53](../patterns/09-ai.md)).
3. Attachment File Slot (optional) — a product slot above the text on filled and attachment-open, its items `--message-input-file-slot-gap` apart. Empty until the product fills it.
4. Body region — exactly one of Text, Voice or Speaking; it sets the height.
   - **Text** — the typed or dictated value in `--message-input-value-font`; `--message-input-value-foreground-placeholder` while empty, `--message-input-value-foreground` once there is a value. The value comes from the implementation; it is not a Figma property. On dictated a source [Assist Chip](../atoms/assist-chip.md) with a `--message-input-chip-border-color` outline sits in the Attachment Slot below it.
   - **Voice** — the Voice bar (`--message-input-voice-bar-background`, `--message-input-voice-bar-radius`, `--message-input-voice-bar-height` tall) and a Hint line under it in `--message-input-voice-hint-font` `--message-input-voice-hint-foreground`. The bar holds, as the state needs: a Recording dot, a Play control, the Waveform, a Label in `--message-input-voice-label-font` `--message-input-voice-label-foreground`, an elapsed Time in `--message-input-voice-time-font` `--message-input-voice-time-foreground`, a [Progress Circle](./progress-circle.md) and one or two trailing controls.
   - **Speaking** — an Orb of six concentric rings, a Caption in `--message-input-caption-font` `--message-input-caption-foreground`, and a Stop speaking control. The caption is the text version of the spoken reply: it wraps to as many lines as it needs and is never cut off ([patterns 9.67](../patterns/09-ai.md)).
5. Toolbar — Tools on the left, Actions on the right, `--message-input-toolbar-gap` apart; each group's controls sit `--message-input-toolbar-group-gap` apart. Absent while speaking.
   - Tools: **Attachment** (a toggle plus an Attachment Control Slot) and the **More Tools Slot** (product icon controls at the toolbar's size).
   - Actions: **Dictate**, **Send** and **Stop**, as the state needs. While a reply is generating, Stop takes Send's place ([patterns 9.47](../patterns/09-ai.md)).

Every control is an [Icon Button](../atoms/icon-button.md) at Shape=full, `--message-input-control-size` square, `--message-input-control-padding` padding, `--message-input-control-radius`, carrying an [Icon](../atoms/icon.md) at `--message-input-control-icon-size`. The waveform, timer, orb and caption are drawn by the component, not passed in.

**Attachment** (folded in). Closed it is one add toggle. Open, the glyph becomes close, the toggle takes `--message-input-attachment-toggle-background-open`, and the Attachment Control Slot appears beside it (`--message-input-attachment-gap` apart), sized for four controls. Opening it costs the toolbar its More Tools Slot.

## Variants
Control flavours. Tool controls are transparent at rest; primary controls are solid.

| Control | Used for | Enabled bg | Hover bg | Pressed bg | Disabled bg | Icon |
|---|---|---|---|---|---|---|
| tool | Attachment toggle, More Tools, Dictate, Cancel dictation, Cancel transcription, Discard recording, Record again, Delete voice message | `--message-input-tool-background-enabled` | `--message-input-tool-background-hover` | `--message-input-tool-background-pressed` | `--message-input-tool-background-disabled` | `--message-input-tool-foreground` (disabled `--message-input-tool-foreground-disabled`) |
| primary | Send, Stop (generating, listening, recording), Play | `--message-input-send-background-enabled` | `--message-input-send-background-hover` | `--message-input-send-background-pressed` | `--message-input-send-background-disabled` | `--message-input-send-foreground` (disabled `--message-input-send-foreground-disabled`) |
| stop speaking | Stop speaking | `--message-input-stop-speaking-background` | — | — | — | `--message-input-stop-speaking-foreground` |

Waveform: `--message-input-waveform-height` tall, bars `--message-input-waveform-bar-width` wide with `--message-input-waveform-bar-radius` ends, `--message-input-waveform-gap` apart, in `--message-input-waveform-bar-color`. It shows 9 bars while listening and recording (live level) and 24 in playback (the whole take).

Orb: `--message-input-orb-size`, six concentric rings `--message-input-orb-ring-width` wide. The two outer rings are stroked with a 90° gradient `--message-input-orb-ring-start` → `--message-input-orb-ring-end`; the four inner rings use the quieter `--message-input-orb-ring-inner-start` → `--message-input-orb-ring-inner-end`. The inner-ring tokens are derived: Figma leaves rings 1–4 unbound.

## States
| State | Body | Tools | Actions | Send |
|---|---|---|---|---|
| empty (default) | Text, placeholder | Attachment, More Tools | Dictate, Send | off |
| filled | File slot + Text, value | Attachment, More Tools | Dictate, Send | on |
| attachment-open | File slot + Text | Attachment (open) | Dictate, Send | on |
| listening | Voice: Waveform (9), Label, Time, Cancel dictation; Hint | Attachment | Stop, Send | off |
| transcribing | Voice: Label, Progress Circle, Cancel transcription; Hint | Attachment, disabled | Dictate and Send, disabled | off |
| dictated | Text carrying the transcript, plus the source chip | Attachment, More Tools | Dictate, Send | on |
| recording | Voice: Recording dot, Waveform (9), Label, Time, Discard recording; Hint | Attachment, More Tools | Stop, Send | off |
| playback | Voice: Play, Waveform (24), Time, Record again, Delete voice message; Hint | Attachment, More Tools | Send | on |
| generating | Text, placeholder or the next draft | Attachment, More Tools | Dictate, Stop in Send's place | off |
| error | Error line + Text holding the unsent message | Attachment, More Tools | Dictate, Send | on, sends again; off while a limit blocks sending |
| speaking | Speaking: Orb, Caption, Stop speaking | — | — | — |
| disabled | Text, value at `--message-input-value-foreground-disabled` | every control disabled | every control disabled | off |

Disabled swaps the container to `--message-input-container-background-disabled` with a `--message-input-container-border-color-disabled` outline. In the recording bar the Recording dot is `--message-input-recording-dot-size` in `--message-input-recording-dot-color`; in transcribing the Progress Circle is `--message-input-progress-size`; in playback the bar's leading padding drops to `--message-input-voice-bar-padding-start-playback` so Play sits close to the edge.

No transition is defined between states: each is a swap of the body region and the toolbar. Only the controls tint on hover and press, with the Icon Button's own transition. Text, Voice and Speaking are mutually exclusive. Send is on only where there is something to send: filled, attachment-open, dictated, playback and error. Generating starts when a message is sent: Stop ends the reply and keeps what has arrived so far, and Send returns when the reply ends ([patterns 9.47](../patterns/09-ai.md)). Error keeps the unsent text in place so nothing is retyped. A limit (usage, time, permission) uses the error state with Send off, and its line says what's affected and when it lifts ([patterns 9.53](../patterns/09-ai.md)). The two voice paths share the Voice bar and nothing else: dictation (listening → transcribing → dictated) ends as editable text; recording (recording → playback → sent, or discarded) ends as an audio message.

## Spacing & Sizing
| Part | Size | Padding | Gap |
|---|---|---|---|
| Container | `--message-input-container-width` wide, height hugs | `--message-input-container-padding` all sides | `--message-input-container-gap` |
| Text | fills the width | `--message-input-value-padding-y` / `--message-input-value-padding-x` | — |
| Toolbar | fills the width | — | `--message-input-toolbar-gap` (groups `--message-input-toolbar-group-gap`) |
| Control | `--message-input-control-size` square | `--message-input-control-padding` | — |
| Voice | fills the width | — | `--message-input-voice-gap` (bar to hint) |
| Voice bar | `--message-input-voice-bar-height` tall | `--message-input-voice-bar-padding-y` / `--message-input-voice-bar-padding-start` start, `--message-input-voice-bar-padding-end` end | `--message-input-voice-bar-gap` |
| Speaking | fills the width | `--message-input-speaking-padding-top` top, `--message-input-speaking-padding-bottom` bottom | `--message-input-speaking-gap` |

The width is fixed; the height follows the body region (it grows by the error line, the file slot, the voice bar's hint, the caption and, most, the speaking orb). The radius is the same in every state. Open, the Attachment control is the toggle plus four slot controls.

## Properties
| Property | Options | Default |
|---|---|---|
| State | empty, filled, attachment-open, listening, transcribing, dictated, recording, playback, generating, error, speaking, disabled | empty |
| Error text | text (error only) | — |
| Attachment File Slot | slot (product content above the text) | empty |
| More Tools Slot | slot (icon controls only, at the toolbar's size) | empty |
| Attachment · Open | on / off | off |
| Attachment · Attachment Control Slot | slot (one icon control per attachment type; four fit) | empty |

The message value, the voice label, timer, caption and error text come from the implementation. Hover, pressed and focus on the controls are driven by interaction.

## Usage
- Dock it under a conversation: pinned to the bottom on compact screens and, before a conversation starts on wider screens, the most prominent block of the column ([patterns 1.33](../patterns/01-screen-composition.md)). It replaces the old composer bar and the separate Voice Memo sheet; a voice message is recorded and reviewed in place.
- Use listening for dictation (it ends as text) and recording for a voice message (it ends as audio). Don't use listening for a voice message.
- Keep playback in the recording flow: it is the only chance to hear a take before sending or discarding it.
- Don't put a toolbar back during speaking; it is absent so nothing can be composed over the reply.
- Fill the Attachment Control Slot with the types the product supports; an open tray with nothing in it is a dead end. Close the tray once a type is chosen, and don't leave it open as a resting state.
- Put only icon controls in the More Tools and Attachment Control slots; they are sized for the toolbar, not for labelled buttons.
- When disabled, say why in the value text; a composer that refuses input without a reason reads as broken.
- Keep the text focused after sending, so quick replies need no extra tap.
- Every mode happens in this one box: don't move generating, errors or limits to a toast or a dialog ([patterns 1.35](../patterns/01-screen-composition.md)).
- Write the error line as what failed and a next step, never a vague promise ([patterns 9.50–9.52](../patterns/09-ai.md)).

## Accessibility
- State changes are not announced by the component. Dictation starting, transcription finishing, recording starting and stopping, generating starting and ending, an error and the assistant speaking all need announcing by the surrounding structure, without moving focus ([patterns 6.53](../patterns/06-accessibility.md)).
- The waveform and the orb carry no text. The label, timer and caption beside them are all a reader gets, so they must say what is happening (Listening, Recording 0:12, Transcribing). The recording dot repeats the label; it is never the only signal.
- Send is off in several states (and absent while speaking), and off doesn't say why; the value text or the error line has to.
- Stop keeps Send's position and focus while generating, and its name says what it stops ("Stop reply").
- Every control is an icon with no visible label. Each needs an accessible name, and the names differ by state even where the glyph repeats (Stop dictation vs Stop recording; Open vs Close attachments).
- Opening the attachment tray reveals controls without moving focus: announce it, and keep keyboard order matching what a person sees in the shared row.
- While speaking there is no toolbar and only Stop speaking interrupts it; it must be reachable by keyboard. The caption is the reply's text version and can be replayed ([patterns 6.69](../patterns/06-accessibility.md)).
- Figma defines no focus treatment for the text field (an open question); until it does, keep the platform's focus indicator. The controls keep their Icon Button focus ring.

## Claude Prompt
Draw a Zebra message composer: a white card `--message-input-container-width` wide with `--message-input-container-radius` corners, a thin `--message-input-container-border-color` mid grey outline and `--message-input-container-padding` padding. At the top, grey placeholder text "Ask anything" in `--message-input-value-font`. Below it a toolbar: on the left a round transparent add button and a couple of round tool icons, on the right a round microphone button and a round `--message-input-control-size` send button that is light grey (`--message-input-send-background-disabled`) while empty and solid Zebra blue (`--message-input-send-background-enabled`) with a white paper-plane icon once there is text. In the recording state the text is replaced by a pale grey `--message-input-voice-bar-background` pill bar holding a small red dot, a row of thin dark waveform bars, "Recording" and a grey timer "0:12", plus a trash button, with a small grey hint line beneath; the send button becomes a blue stop button. While generating, the send button becomes a blue stop button. In the speaking state the whole card shows a large ring orb with purple-to-indigo gradient outer rings, a caption that wraps over as many lines as it needs and a grey round stop button, with no toolbar.
