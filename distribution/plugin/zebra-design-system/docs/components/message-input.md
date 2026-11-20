# Message Input

> A composer for conversational, AI-assisted surfaces: type, attach, dictate, record a voice message, hear the reply.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-message-input>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `empty` | `empty` `filled` `attachment-open` `listening` `transcribing` `dictated` `recording` `playback` `speaking` `disabled` |  |
| `showReply` | boolean | `false` |  |  |
| `attachmentFileSlot` | slot | `empty` |  |  |
| `moreToolsSlot` | slot | `empty` |  |  |

## When and how to use

### Do

- Say why in the value text when disabled. A composer that refuses input without a reason reads as broken.
- Keep playback in the recording flow. It is the only chance to hear a take before sending it.

### Don't

- Don't use listening for a voice message. It ends as text, recording ends as audio.
- Don't put a toolbar back during speaking. It is absent so nothing can be composed over the reply.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]
- [object Object]
- [object Object]
- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- State changes are not announced. Dictation starting, transcription finishing and the assistant speaking all need announcing by the surrounding structure.
- The waveform and the orb carry no text. The label and timer beside them are all a reader gets, so they have to say what is happening.
- Send is disabled in five of the ten states. Disabled does not say why, so the value text or a nearby message has to.
- Every control is an icon with no label. Each needs a name, and the names differ by state even where the glyph repeats.
- While speaking there is no toolbar and only Stop speaking interrupts it. That control has to be reachable by keyboard.

---
*Generated from `specs/message-input` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
