# Message Input

A composer for conversational, AI-assisted surfaces: type, attach, dictate, record a voice message, hear the reply. One State property moves it between typing, dictation, voice recording and the assistant speaking back, swapping the body region each time. Two slots let a product add its own attachment row and its own extra tools.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6649-196 (page "Message Prompt") · extracted 2026-11-17

Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| state | enum | empty, filled, attachment-open, listening, transcribing, dictated, recording, playback, speaking, disabled | empty | variant |
| attachmentFileSlot | slot | Assist Chip | empty | attachments |
| moreToolsSlot | slot | Icon Button | empty | moreTools |

- **state empty**: The resting composer, nothing typed. Send stays off until there is something to send.
- **state filled**: A typed message ready to go. Send turns on here and nowhere earlier.
- **state attachment-open**: The attachment tray is showing its choices. Transient, not a resting state.
- **state listening**: Dictation is capturing speech. Extra tools drop away so nothing competes with Stop.
- **state transcribing**: Speech captured, text not back yet. Everything is off, so it must not linger.
- **state dictated**: Dictation returned text the person can still edit. Treat it as filled, not as sent.
- **state recording**: A voice message is being captured. Unlike listening, this ends as audio.
- **state playback**: A take waiting to be sent or discarded. The only chance to hear it first.
- **state speaking**: The assistant is replying aloud. The only state with no toolbar at all.
- **state disabled**: Composing is unavailable. Say why in the value text, or there is nothing to act on.
- **attachmentFileSlot**: Holds whatever the product attaches, above the text. Empty until the product fills it.
- **moreToolsSlot**: Room for product tools beside Attachment. Icon controls only, at the toolbar's size.

## Internal variations & content inputs

**Value.** The typed or dictated text. Not a Figma property. Samples: "Placeholder", "Message goes in here.".

**Attachments.** One Assist Chip per file (Discardable, leading icon, Color=neutral). Samples: Document.pdf (`document`), Video_file.mp4 (`video`).

**Voice text.** Label ("Listening…", "Transcribing…", "Recording"), time ("0:07", "0:00/0:04") and a hint line per voice state.

**Waveform.** Bars with sample heights: 9 while listening or recording, 24 in playback.

**Caption.** The assistant's spoken reply, while speaking.

## Anatomy

1. **Body** — Text, Voice or Speaking. One at a time, and it sets the height.
   - **Text** (empty, filled, attachment-open, dictated, disabled): vertical, padding space/2xs top and bottom, space/md at the sides, fills width, minimum height 56Px (no token). Holds the value at body/medium, foreground/disabled for the placeholder and foreground/primary for a value.
   - **Dictated chip** (dictated): an Assist Chip, Label "Dictated", Color=blue, `microphone` glyph, discardable, above the text.
   - **Voice** (listening, transcribing, recording, playback): vertical, gap space/sm, holding the Voice bar and a hint line at body/xsmall on foreground/secondary.
   - **Voice bar**: horizontal, gap space/sm, padding space/2xs, with space/md at the start (space/2xs in playback). Minimum height control/lg, fill surface/subtle, radius radius/element-md. In order:
     - recording dot (recording): ellipse sized space/sm, foreground/error;
     - progress (transcribing): Progress Circle Size=xxsmall, track on;
     - Play (playback): Icon Button, Flavour=primary, `play`;
     - waveform (listening, recording, playback): bars gap space/3xs, height control/icon-md. Each bar is stroke/thick wide, radius/pill, foreground/primary;
     - label (listening, transcribing, recording): body/medium, foreground/primary, fills;
     - time (listening, recording, playback): body/medium, foreground/secondary; fills in playback;
     - trailing controls, Icon Button Flavour=subtle: Cancel dictation, Cancel transcription or Discard recording (`close`); in playback, Record again (`replay`) and Delete voice message (`delete`).
   - **Speaking** (speaking): vertical, centred, gap space/md, padding space/md top and space/2xs bottom. Holds the orb (measured 98Px square, six gradient rings on surface/gradient/start → surface/gradient/end, two visible), the caption (body/medium, centred) and Stop speaking (Icon Button, Flavour=subtle, `stop`).
2. **Toolbar** — Tools on the left, Actions on the right (space-between). Absent while speaking.
   - **Tools**: gap space/2xs. Attachment (Open follows attachment-open), then the More Tools slot.
   - **Actions**: gap space/2xs. Dictate (`microphone`, subtle), or Stop (`stop`, primary) while listening or recording, then Send (`send`, primary). Every control is an Icon Button Size=small, Shape=full, sized control/sm.
3. **Slots** — Attachment File above the body (filled, attachment-open). More Tools beside Attachment, absent on attachment-open, listening and speaking. Both are horizontal, gap space/2xs.

Root: vertical, gap space/sm, padding space/md, fill surface/card, stroke border/default at stroke/thin inside, radius radius/container. Measured 440Px wide; hugs its height.

## Variants

| state | body | toolbar | Send | measured height |
|---|---|---|---|---|
| empty (base) | text, placeholder | Attachment, More Tools · Dictate, Send | disabled | 126Px |
| filled | attachments + text | as empty | enabled | 164Px |
| attachment-open | attachments + text | Attachment Open=true, no More Tools | enabled | 164Px |
| listening | voice: waveform, label, time, Cancel dictation | Attachment · Stop, Send | disabled | 142Px |
| transcribing | voice: progress, label, Cancel transcription | Dictate Flavour=text, disabled | disabled | 142Px |
| dictated | Dictated chip + text | as empty | enabled | 164Px |
| recording | voice: dot, waveform, label, time, Discard recording | Stop, Send | disabled | 142Px |
| playback | voice: Play, waveform, time, Record again, Delete voice message | Send only | enabled | 142Px |
| speaking | orb, caption, Stop speaking | none | — | 272Px |
| disabled | text "Can't send right now" | Dictate Flavour=text, disabled | disabled | 126Px |

Disabled also moves the root to interactive/neutral/background/disabled with a border/disabled stroke.

## Subcomponents

### Attachment

The attachment control in Message Input's toolbar. Closed it is a single add button. Open it expands into a row of attachment type controls the product supplies through a slot.

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| open | boolean | | false | variant |
| attachmentControlSlot | slot | Icon Button | empty | controls |

- **open false**: The resting control, one button. Use it wherever the choices are not needed on screen.
- **open true**: The tray is showing its choices. Transient, because the toolbar loses its other tools while it is open.
- **attachmentControlSlot**: The attachment types the product offers. Left empty it opens onto nothing.

Anatomy: horizontal, gap space/2xs, hugs.
1. **Toggle** — Icon Button Size=small, Shape=full, Flavour=subtle. `add` on interactive/ghost/background/default when closed; `close` on interactive/ghost/background/pressed (State=pressed) when open.
2. **Controls** — the slot, shown when open. Horizontal, gap space/2xs. Sample: four subtle Icon Buttons, `attachment`, `camera`, `sticker`, `audio`.
3. **Open width** — Closed it is one control (measured 36Px square). Open it is the toggle plus the slot (measured 196×36Px).

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Open=false | Resting | — | A single add control. |
| Open=true | Control pressed | — | The glyph becomes close, the button takes its pressed surface and the slot appears. |

- **Motion:** No transition is defined. Opening is a swap, not an animation.
- **Toolbar cost:** Open, it takes the room the More Tools slot would use, and the parent drops that slot.

| Property | Type | Description |
|---|---|---|
| Attachment Control Slot | slot, product filled | Takes one icon control per attachment type. Four fit at the drawn width. |
| Toggle control | nested Icon Button | Drawn by the component. Its glyph flips between add and close with Open. |

- Do: Fill the slot with the types the product supports. An open tray with nothing in it is a dead end.
- Do: Close the tray once a type is chosen. It costs the toolbar its other tools while open.
- Don't: Don't leave it open as a resting state. The More Tools slot disappears while it is.
- Don't: Don't put labelled buttons in the slot. It is sized for icon controls at the toolbar's height.

Accessibility: The toggle is an icon with no text. It needs a name, and the name changes with Open. Opening the tray reveals controls without moving focus. That change has to be announced. Each control in the slot is an icon only, so every one needs a name saying what it attaches. The tray and the toolbar share a row. Keyboard order has to follow what a person sees.

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Open | 36 square closed, 196 by 36 open. |
| Toggle control | Fixed | A 36 Icon Button at Shape=full, Flavour=subtle. |
| Control slot | Fixed | 156 by 36 when open, sized for four 36 controls. |
| Surface | Theming | The toggle takes interactive/ghost/background, default closed and pressed open. |

## Tokens & theming

- **Color:** surface/card, surface/subtle, surface/gradient/start, surface/gradient/end, border/default, border/disabled, foreground/primary, foreground/secondary, foreground/disabled, foreground/error, interactive/neutral/background/disabled, interactive/ghost/background/default, interactive/ghost/background/pressed
- **Dimension:** space/3xs, space/2xs, space/sm, space/md, radius/container, radius/element-md, radius/pill, stroke/thin, stroke/thick, control/sm, control/lg, control/icon-md
- **Typography:** body/medium, body/xsmall
- **Glyphs:** add, close, attachment, camera, sticker, audio, microphone, send, stop, play, replay, delete, document, video. All are rounded font glyphs and take currentColor.
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark), size (Desktop, Mobile, Tablet, Desktop Compact) and every brand extension.
- **Dependencies:** Icon Button, Icon, Assist Chip, Progress Circle.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| empty | Resting | — | Placeholder at foreground/disabled, Send disabled. |
| filled | Text entered | — | The value moves to foreground/primary and Send enables. |
| attachment-open | Attachment pressed | — | Attachment expands to its open form and the More Tools slot drops out. |
| listening | Dictation started | — | Text swaps for the Voice bar. Actions become Stop and a disabled Send. |
| transcribing | Dictation stopped | — | The Voice bar holds while every control disables. |
| dictated | Transcript returned | — | The Voice bar swaps back to Text carrying the transcript, and Send enables. |
| recording | Record started | — | The Voice bar gains a foreground/error dot and a discard control. Send stays off. |
| playback | Record stopped | — | The Voice bar gains Play, a full waveform and an elapsed timer. Send enables. |
| speaking | Assistant replies | — | The body becomes an orb and a caption. The toolbar is gone entirely. |
| disabled | — | — | Surface and border take their disabled tokens and every control turns off. |

- **Motion:** No transition is defined. Each state is a swap of the body region and the toolbar.
- **Body region:** Text, Voice and Speaking are mutually exclusive. Only one is ever present.
- **Send enablement:** Send is on only where there is something to send, at filled, attachment-open, dictated and playback.
- **Two voice paths:** Dictation ends as editable text. Recording ends as an audio message. They share the Voice bar and nothing else.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Message value | text | The typed or dictated text. Not exposed as an input, so it comes from the implementation. |
| Slots | two, product filled | The only places a product adds content of its own. |
| Slots | Attachment File Slot | Sits above the text on filled and attachment-open. |
| Slots | More Tools Slot | Sits beside Attachment in the toolbar. Absent on attachment-open and listening. |
| Nested controls | Icon Button and Attachment | Every control is an Icon Button at Shape=full. Attachment has its own frame. |
| Voice and Speaking | drawn | The waveform, timer, orb and caption are drawn by the component, not passed in. |

## Usage (do / don't)

- Do: Say why in the value text when disabled. A composer that refuses input without a reason reads as broken.
- Do: Keep playback in the recording flow. It is the only chance to hear a take before sending it.
- Don't: Don't use listening for a voice message. It ends as text, recording ends as audio.
- Don't: Don't put a toolbar back during speaking. It is absent so nothing can be composed over the reply.

## Accessibility

State changes are not announced. Dictation starting, transcription finishing and the assistant speaking all need announcing by the surrounding structure.
The waveform and the orb carry no text. The label and timer beside them are all a reader gets, so they have to say what is happening.
Send is disabled in five of the ten states. Disabled does not say why, so the value text or a nearby message has to.
Every control is an icon with no label. Each needs a name, and the names differ by state even where the glyph repeats.
While speaking there is no toolbar and only Stop speaking interrupts it. That control has to be reachable by keyboard.

Names from the Figma layers: Dictate, Send, Stop, Cancel dictation, Cancel transcription, Discard recording, Play, Record again, Delete voice message, Stop speaking.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 440 wide. Height follows the body region, 130 empty, 146 voice, 168 with an attachment row and 276 speaking. |
| Padding and gap | Fixed | space/md on all four sides, space/sm between the body region and the toolbar. |
| Radius | Fixed | radius/container on every state. |
| Surface | Per State | surface/card with a border/default outline, moving to interactive/neutral/background/disabled and border/disabled when disabled. |
| Body region | One of three | Text, Voice or Speaking. Text carries body/medium at 16px. |
| Toolbar | Fixed | Tools on the left, Actions on the right. Controls are 36 square, Send and Stop 40. |
| Voice bar | Fixed | 48 tall on surface/track, holding a 2px bar waveform, a label, a timer and one trailing control. |

## Visual reference

- Page: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6649-196
- Message Input: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6962-798
- Attachment: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6683-11946
- Per-variant links are in the JSON.

## Issues

**Warn**
- Metadata says Send and Stop are 40. Every action is an Icon Button at Size=small, bound to control/sm.
- Metadata says the Voice bar sits on surface/track. It is bound to surface/subtle.
- Metadata gives heights of 130, 146, 168 and 276. The variants measure 126, 142, 164 and 272.
- Transcribing: metadata says every control disables. Attachment, the More Tools slot and Cancel transcription stay enabled.
- Disabled: metadata says every control turns off. Attachment stays enabled, because it has no disabled option.
- Dictated: the Dictated chip sits in a plain frame, not the Attachment File Slot. The metadata doesn't mention the chip.
- The speaking caption's first run is foreground/disabled and the rest foreground/primary. The metadata doesn't say what the split means.
- The Attachment toggle and its slot controls are all named Icon Button, so they give no name to carry into code.
- The orb rings' stroke width and opacity have no token. The Text region's minimum height has no token either.

**Note**
- Disabled Dictate switches Flavour from subtle to text. Send keeps its flavour.
- Playback drops Dictate from Actions. The metadata doesn't say so.
- Each voice state has a hint line in body/xsmall at foreground/secondary. The metadata doesn't mention it.
- Four of the six orb rings are hidden. No motion is defined, so any animation of the orb or waveform is the implementer's call.
- The recording dot is sized with space/sm and the waveform bars with stroke/thick.
- The value text is not a Figma property. The metadata says it comes from the implementation.
- No transition is defined for Message Input or Attachment. Each state is a swap.
