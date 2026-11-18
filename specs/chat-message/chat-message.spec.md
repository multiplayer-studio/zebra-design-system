# Chat Message

One message in a chat, from someone else, you or the assistant. Style sets the setting: channel for group chats, conversation for assistant and one-to-one chats. Platform sets how actions open: hover on desktop, long press on mobile. Sequence separates the first message in a run, which carries the header, from the consecutive messages under it.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-18615 (page "Chat Message") · extracted 2026-11-17

Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| platform | enum | mobile, desktop | desktop | variant |
| style | enum | conversation, channel | channel | variant |
| role | enum | receiver, sender, assistant | receiver | variant |
| state | enum | default, active, loading | default | variant |
| sequence | enum | first, consecutive | first | variant |
| rounded | boolean |  | true | variant |
| showAvatar | boolean |  | true | avatar |
| showHeader | boolean |  | true | header |
| showReply | boolean |  | false | reply |
| showReactions | boolean |  | false | reactions |
| showFooter | boolean |  | false | footer |
| attachments | boolean |  | false | attachments |
| hideTime | boolean |  | true | timeColumn (visibility) |
| reactionControls | boolean |  | false | reactionRow |
| showControls | boolean |  | true | controls (assistant) |
| expandMenu | boolean |  | false | menu |
| name | string |  | First Last | name |
| replyTo | string |  | First Last | reply.author |
| replyText | string |  | Is the chilled delivery here yet? | reply.text |
| attachmentSlot | slot | Photos, Attachments, Thread |  | attachments |
| reactionsSlot | slot | Assist Chip |  | reactions |
| timestampSlot | slot | Timestamp |  | timeColumn |

- **platform desktop**: Controls appear on hover or focus, beside the header.
- **platform mobile**: No controls on the message. A long press opens reactions and actions over a scrim. The message component container is also surfaced above the scrim.
- **style channel**: Used in group conversations within organizations. Every message, yours included, uses a text-style bubble on the page with avatar and name, and is right aligned within the chat area
- **style conversation**: Used in AI assistant conversations and one-to-one chats. Your messages sit in a bubble on the right; others stay on the left.
- **role receiver**: Someone else, not an assistant or yourself, the sender. Avatar and name on the left. A bubble message style is used in conversation, while a no fill bubble is used in channels.
- **role sender**: Yourself, the first-person perspective of the chat. A bubble message style is used in conversation, while a no fill bubble is used in channels.
- **role assistant**: The assistant. It uses it’s own avatar and always uses no fill bubbles for both channel and conversations.
- **state default**: A message at it’s rest state, with no hover state or controls shown.
- **state active**: Enabled by hovering on message on desktop, on press/hold of a message on mobile. Shows actions for the one message.
- **state loading**: For the assistant role, this shows a loading state when a message is generating. For receiver roles, this loading state is used to show when a message is being typed by them.
- **sequence first**: Starts a run from one sender. Shows avatar, name and timestamp.
- **sequence consecutive**: Follows a message from the same sender. Header and avatar are hidden on default and content lines up under the first. A message is considered a consecutive message if it is a separate input/entry from the text field.
- **rounded true**: Rounded corners on the bubble, controls and attachments.
- **rounded false**: Sharp corners throughout.
- **showAvatar**: The avatar icon. Avatar is off on consecutive messages and not shown on sender convo style messages.
- **showHeader**: Name and timestamp. Off on consecutive messages.
- **showReply**: A quoted line tagging the user and the message this one message is answering in response to.
- **showReactions**: Turns on Reactions Slot under the content, showing all reactions selected from the Reaction Controls.
- **showFooter**: Delivery status/read receipts under your own message. Is only applicable to your most recently sent message.
- **attachments**: Turns on Attachment Slot under the text.
- **hideTime**: Keeps the timestamp hidden for consecutive messages until hover states. When hidden, the slot should remain present, meaning the messages will remain indented regardless of the timestamp being hidden or revealed.
- **reactionControls**: Shows the reactions row above the controls.
- **showControls**: Only applicant to the assistant message variants. Hides the controls below the message when false. Show Controls should be set to false for all desktop previous assistant messages excluding the most recent one it has sent.
- **expandMenu**: Shows the action menu, including a slot to include more action controls.
- **name**: The example uses placeholder copies, but should surface the user’s name for the respective message.
- **replyTo**: The example uses placeholder copies, but should surface the user’s who’s message is being responded too for when “Show Reply” is true
- **replyText**: The example uses placeholder copies, but should feature respectively the the message being responded to when “Show Reply” is true.
- **attachmentSlot**: The message body that included along with a message. This slot could hold photos, attachments or a thread containing message bubbles but never another message bubble on it’s own.
- **reactionsSlot**: A slot carrying reaction chips that indicate the selected type and number of each reaction for a single message.
- **timestampSlot**: Holds the Timestamp.

Role values are written `receiver (other)`, `sender (you)` and `assistant (ai)` in Figma.

## Internal variations & content inputs

**Bubble.** Style, Status and Role are pinned per variant from Style and Role. Status follows the run, which the message doesn't expose.

- **bubble.message**: text. Sample: Chilled delivery is in at door 2.
- **timestamp**: time, formatted by the product. Sample: 09:41
- **loading.label**: label. Sample: Thinking (assistant) / Typing (receiver, sender)
- **reactions**: Assist Chip per reaction (emoji and count). Sample: 3 (Color=blue), 1 (Color=neutral)
- **footer.status**: label. Sample: Seen. The text layer is hidden; only the check-mark glyph shows.
- **menu**: Dropdown Menu items. Not readable on the page. Metadata lists Copy text, Reply, Forward, Mark as unread, plus product actions.

## Anatomy

1. **Avatar and header** — Avatar (Size=xsmall; status, ring and close off), shown on first messages when `showAvatar`, never on conversation sender. The header (`showHeader`) holds the name at label/medium on foreground/primary and the Timestamp, gap space/xs, baseline aligned. On consecutive messages the Timestamp Slot takes the avatar's column so content lines up; it is one body/small line tall with the time centred on the message's first line, dropping by the bubble's space/sm padding in a conversation, and it shows the time only when active.
   - **Reply** (`showReply`): the `reply` glyph at control/icon-xs, the author at label/small on foreground/primary and the quoted text at body/xsmall on foreground/secondary, gap space/2xs. It sits under the header, except on mobile conversation receiver, where it sits above.
2. **Message content** — vertical, gap space/sm: the Bubble, then the Attachment Slot (`attachments`) for Photos, Attachments or a Thread. While loading, the Loading Indicator takes its place.
3. **Reactions and footer** — the Reactions Slot (`showReactions`, Assist Chips, gap space/2xs), and the footer (`showFooter`, `check-mark` glyph, gap space/2xs). Neither exists on assistant messages.
   - **Thread** (code placement): Figma carries the Thread in the Attachment Slot. In code it moves to its own container under the message, outside the message's surface, indented by space/sm + control/sm + space/sm to line up with the text. Opening it or hovering a reply never makes the parent active; hover highlights only the item under the pointer (spec Threads).
4. **Controls** — receiver and sender, desktop active: a floating Controls (Style=fill) anchored top-right, lifted to overlap the message top. Assistant: Controls Style=none in flow under the content, shown when `showControls`. The reaction row (`reactionControls`) and menu (`expandMenu`, Dropdown Menu Compact) are absolute: above and under the controls on desktop, above and under the message on mobile. Neither exists on assistant messages.

Root: horizontal, gap space/sm, padding space/sm with space/card at the top on first messages with a header. Radius radius/md (radius/none when Rounded=false). No fill at rest; interactive/ghost/background/hover when desktop and active. Main: vertical, gap space/sm, fills (hugs and ends for conversation sender). Measured 400Px wide; fills the list.

## Variants

| style | role | avatar + header | bubble | alignment |
|---|---|---|---|---|
| channel | receiver | yes | Style=none, Role=receiver | start |
| channel | sender | yes | Style=none, Role=sender | start |
| channel | assistant | — | Style=none, Role=sender | start |
| conversation | receiver | yes | Style=fill, Role=receiver | start |
| conversation | sender | no, no header | Style=fill, Role=sender | end |
| conversation | assistant | yes | Style=none, Role=receiver (first) / sender (consecutive) | start |

- Channel assistant exists at Sequence=consecutive only. Conversation assistant carries its controls in flow.

| state | what changes |
|---|---|
| default (base) | No surface. Only the assistant shows controls. |
| active | Desktop: interactive/ghost/background/hover and floating Controls; reaction row and menu behind their toggles. Mobile: no surface change; reaction row and menu behind their toggles. |
| loading | The Loading Indicator replaces the content (Typing for receiver and sender, Thinking for assistant). Exists at conversation assistant first, and at every role consecutive. |

| sequence | leading column | header | top padding |
|---|---|---|---|
| first (base) | avatar | shown | space/card |
| consecutive | Timestamp Slot (time on active) | hidden | space/sm |

Rounded=false moves the root and every nested part to radius/none.

## Subcomponents

### Bubble

| Prop | Type | Values | Default |
|---|---|---|---|
| message | string |  | On my way. |
| style | enum | fill, none | fill |
| status | enum | single, first, middle, last | single |
| role | enum | sender, receiver | sender |
| rounded | boolean |  | true |

- **message**: The message text surfaced within a bubble.
- **style fill**: A tinted bubble. Receiver or sender messages in a conversation are in bubbles.
- **style none**: Plain text, with no filled bubble. Everyone in channel; others in conversations.
- **status single**: A singular on its own, not followed by a consecutive message. All corners round.
- **status first**: Opens a run. The corner toward the next message tightens.
- **status middle**: Inside a run. Both inner corners tighten.
- **status last**: Closes a run. The corner toward the previous message tightens.
- **role sender**: Yourself, the first-person perspective of the chat.
- **role receiver**: Someone else, not an assistant or yourself, the sender.

- **root**: layout horizontal, padding space/sm block, space/md inline; fill sender interactive/primary/background/default · receiver surface/brand · Style=none: none and no padding; radius radius/lg, with the inner corners at radius/xs per Status; radius/none when Rounded=false
- **message**: textStyle body/small; color foreground/on-strong (fill sender) · foreground/primary otherwise; sizing fill
- **Status corners** (radius/xs on the inner corners): first: sender: bottom-end radius/xs · receiver: bottom-start radius/xs; middle: sender: top-end and bottom-end · receiver: top-start and bottom-start; last: sender: top-end · receiver: top-start
- Style=none exists only at Status=single.

### Controls

| Prop | Type | Values | Default |
|---|---|---|---|
| controlSlot | slot | Icon Button |  |
| style | enum | none, fill | fill |
| rounded | boolean |  | true |

- **controlSlot**: Extra actions that are enabled alongside basic selections such as reactions, reply and more.
- **style fill**: Control bar has a filled color.
- **style none**: Control bar does not have a filled cover and is transparent.

- **root**: layout horizontal, gap and padding space/3xs; fill surface/overlay (Style=fill) · none; effect Shadow/small; radius radius/md · radius/none
- **react**: of Icon Button Size=small, Flavour=text; glyph happy; intent Opens the reactions row above the controls.
- **controlSlot**: default Reply (Icon Button, glyph reply); intent Reply by default. Holds extra product actions.
- **more**: of Icon Button Size=small, Flavour=text; glyph more-horizontal; intent Opens the action menu as a popover. Closes the reactions row.

### Loading Indicator

| Prop | Type | Values | Default |
|---|---|---|---|
| label | string |  | Thinking |
| rounded | boolean |  | true |

- **label**: Indicates what the the assistant or receiver is doing as a loading indication on the sender’s end. Typically indicated as “Thinking” or “Pondering” for assistant, and “Typing” for receivers. Short, present tense.

- **root**: layout horizontal, gap space/xs, centred
- **dots**: count 3; gap space/3xs; size space/2xs; fill foreground/tertiary; opacity 1, 0.6, 0.3 (no token); radius radius/lg · radius/none
- **label**: textStyle label/small; color foreground/tertiary

### Timestamp

- **time**: textStyle body/xsmall; color foreground/secondary; sample 09:41; _note Not a property. The product formats it.

### Thread

| Prop | Type | Values | Default |
|---|---|---|---|
| state | enum | default, open | default |
| replyCount | string |  | 3 |
| threadSlot | slot | Chat Message |  |

- **state default**: Collapsed on default. "X replies" and a down caret to indicated number of replies within a thread.
- **state open**: Expanded. Caret points up; Thread Slot shows the replies.
- **replyCount**: Number of replies within a thread.
- **threadSlot**: The reply messages, each a Chat Message.

- **toggle**: layout horizontal, gap space/xs, padding space/2xs block, centred; count Reply Count + "replies" ("reply" for one), body/xsmall, gap space/3xs (colour unbound, see issues); alignment count, divider and caret centred on the row (metadata); the divider must not stretch; divider Divider, horizontal, fills; caret Caret Indicator, Direction=vertical, Size=medium; expand-more closed, expand-less open
- **threadSlot**: visibleWhen state=open; layout vertical, padding-bottom space/sm; sizing fill

### Photos

| Prop | Type | Values | Default |
|---|---|---|---|
| count | enum | 1, 2, 3, more | 1 |
| extraCount | string |  | +2 |
| showIcon | boolean |  | true |
| rounded | boolean |  | true |

- **count 1**: One photo, full width.
- **count 2**: Two equal tiles.
- **count 3**: One large tile and two stacked.
- **count more**: As 3, with the last tile showing Extra Count.
- **extraCount**: How many photos are hidden on default view.
- **showIcon**: The placeholder indicating file-type icon. Show Icon should be false once a component has been filled with a real image.

- **root**: layout horizontal, gap space/3xs; sizing measured 288×192Px
- **photo**: fill image over surface/card; stroke border/subtle at stroke/thin; radius radius/lg · radius/none; icon image glyph foreground/tertiary, Icon Size=medium, centred, when showIcon
- **stack**: visibleWhen count in [3, more]; layout vertical, gap space/3xs, two tiles
- **extraCount**: visibleWhen count=more; position absolute, bottom-right; layout padding space/3xs block, space/xs inline; fill surface/inverse; radius radius/pill; text body/xsmall, foreground/inverse

### Attachments

| Prop | Type | Values | Default |
|---|---|---|---|
| type | enum | file, video, audio | file |
| playback | enum | default, active | default |
| fileName | string |  | Delivery receipt.pdf |
| fileMeta | string |  | PDF · 248 KB |
| duration | string |  | 0:08 |
| showIcon | boolean |  | true |
| rounded | boolean |  | true |

- **type file**: A file tile with name, meta and download icon.
- **type video**: A video preview with play and duration. One per attachment.
- **type audio**: A waveform with play and duration.
- **playback default**: Not playing.
- **playback active**: Playing. Play becomes pause; the waveform fills.

- **file**: root horizontal, gap space/sm, padding space/sm block, space/xs inline; surface/card, border/subtle at stroke/thin, radius/lg; tile control/sm square, surface/card, document glyph interactive/primary/background/default (Icon Size=large); text vertical, gap space/2xs, padding-end space/lg; name label/medium foreground/primary, one line, truncates; meta body/xsmall foreground/tertiary; download Icon Button Size=medium, Flavour=text, glyph download overridden to foreground/secondary
- **video**: root surface/subtle, radius/lg, clips; poster image glyph foreground/tertiary, top-start, when showIcon; play Icon Button Size=large, Shape=full (sharp when not rounded), Flavour=primary overridden to surface/card fill and an interactive/primary/background/default glyph; durationChip surface/inverse, radius/pill, body/xsmall foreground/inverse
- **audio**: root as file, padding-end space/md; play Icon Button Size=small, Shape=full (sharp when not rounded), Flavour=primary overridden to surface/card fill and an interactive/primary/background/default glyph, control/xs; pause when active; waveform bars stroke/thick wide, radius/pill, gap space/3xs, height control/icon-md; interactive/primary/background/disabled, played bars interactive/primary/background/default; duration body/xsmall foreground/tertiary (Elapsed while active)

## Tokens & theming

- **Color:** interactive/ghost/background/hover, interactive/primary/background/default, interactive/primary/background/disabled, surface/brand, surface/overlay, surface/card, surface/subtle, surface/inverse, border/subtle, foreground/primary, foreground/secondary, foreground/tertiary, foreground/on-strong, foreground/inverse
- **Dimension:** space/none, space/3xs, space/2xs, space/xs, space/sm, space/md, space/lg, space/card, radius/none, radius/xs, radius/md, radius/lg, radius/pill, stroke/thin, stroke/thick, control/xs, control/sm, control/md, control/lg, control/icon-xs, control/icon-md
- **Typography:** label/medium, label/small, body/small, body/xsmall
- **Effects:** Shadow/small
- **Motion:** animations/smooth
- **Glyphs:** reply, check-mark, happy, forward, more-horizontal, copy-file, refresh, image, document, download, play, pause, expand-more, expand-less. All are rounded font glyphs, present and not retired in packages/icons/codepoints.json. They take currentColor from their Icon or Icon Button.
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark), size (Desktop, Mobile, Tablet, Desktop Compact) and every brand extension.
- **Dependencies:** Avatar, Icon, Icon Button, Assist Chip, Dropdown Menu, Divider, Caret Indicator, Scrim (mobile long press, outside the component).

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | No controls. Transparent surface. |
| active · desktop | Pointer over the message, or focus inside it | animations/smooth | Surface of message takes interactive/ghost/background/hover. Controls appear in the gap beside the header. |
| reactions open · desktop | Reactions control pressed | — | A row of 5 or more emoji appears above the controls. Closes the expanded menu if it was open. |
| menu open · desktop | More control pressed | — | The menu opens as a popover layered above the message list. Closes the reactions row if it was open. |
| press/hold · mobile | Long press on the message | about 450 ms | A scrim covers the screen. The pressed message shows in focus above the scrim, reactions above it, actions below. The basic controls are not shown here, and are covered by the reaction controls and expanded menu only. |
| dismissed | Escape, a press outside, or a tap on the scrim | — | Everything closes. Focus returns to the message. |
| loading | Assistant or receiver starts a reply | until first text | Content is the Loading Indicator with its label. The loading ellipses slowly fade in a rippling effect from left to right. |
| consecutive | Same sender follows on | — | Avatar and header hide. Each consecutive message keeps its own controls. |
| Thread open | Reply count or caret pressed | — | Caret flips. Replies appear in the Thread Slot under it. Pressing again collapses. |
| Playback active | Play pressed on audio or video | length of the clip | Play becomes pause. The audio waveform fills as it plays. |
| Control pressed | Reactions or more pressed | — | The control takes the pressed ghost surface while its row or menu is open. |

- **Grouping:** Only the first message in a run shows avatar, name and time. Every message keeps its own controls; actions never apply to a whole group.
- **Desktop controls:** Reactions toggle, menu toggle, and a slot for extra actions. Shown on hover or focus, placed in the gap beside the header. Additionally,  reactions row and the menu never show together. Opening one closes the other. Controls appear with 16px overlap using space/lg token, into the parent component’s container from the top, to avoid covering the bubble.
- **Desktop menu:** A popover layered above the message list. It does not push the list or the message.
- **Mobile long press:** No three-dot control. On mobile, every message works by long press only. A long press opens a scrim and shows for each pressed message, with the message in focus above the scrim, the reaction controls above it and the action menu below it, layered above the scrim as well, so it is clear which message was picked. When the menu won’t fit, slide the held message up just enough, leaving space/sm at the bottom and keeping the reactions on screen.
- **Mobile actions:** Copy text, Reply, Forward, Mark as unread, plus product actions through the slot.
- **Threads:** In Figma, a thread in the Attachment Slot shows "X replies" and a caret. In implementation, move the thread out of the Attachment Slot into its own container under the message, indented to line up with the message text. Pressing it expands the replies into its own slot, and collapses them. When a thread is opened or expanded, the parent’s message should no longer be in an active/hover state because each individual message within the thread has it’s own active/hover state behavior. Hover highlights only the item under the pointer (message or reply), not both.
- **Motion:** Hover surface and controls fade with animations/smooth. Scrim and lift on mobile have no motion defined yet.
- **Assistant message controls:** For messages with an assistant on desktop only, controls will always shown as the default state only on the assistant’s most recently sent message. Other prior messages from the assistant will use the default state behavior, which only shows the controls on hover. The space for the controls should always be maintained consistent if Show Controls is true or false, in order to avoid shifting messages height when hovering.  On mobile, controls will always be visible as the default state for all messages, regardless of order. Reaction controls and expanded menu are not applicable to assistant messages on both mobile and desktop behavior.
- **Thread (subcomponent):** Expand and collapse in place. Replies push the messages below down; they do not open a new view.
- **Photos and videos:** Photos group into one grid. Videos send as separate Attachments so each can preview.
- **Controls (subcomponent):** Reactions and more are toggles. Only one of their panels is open at a time on desktop. Mobile surfaces only the reaction controls and expanded menu.
- **Motion (subcomponents):** Loading dots and label sweep repeat until text arrives. No other motion is defined.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Message Content | layer | The body that includes text, photos, video, audio, files. Never another message. A follow-up is its own Chat Message at Sequence=consecutive. |
| Attachment Slot | slot, product filled | Photos, Attachments or a Thread, under the message’s text. |
| Thread | nested subcomponent | Can be placed in the Attachment Slot. Not a property of the message. Shows a sequence of message that respond to the original message it is nested within. |
| Reactions Slot | slot, product filled | Carries reaction chips with counts of each. Show Reactions turns it on. |
| Control Slot | slot, product filled | Extra desktop actions beside reactions and the menu. On mobile, extra items go in the action menu. |
| Timestamp Slot | slot | Holds the Timestamp subcomponent. |
| Name and Reply | text | Sender name, and the author and text of a quoted message. |
| Thread Slot | slot, product filled | Reply messages only. Each is a Chat Message with its own controls. |
| Bubble text | text | Message text. Hugs the contents and should wrap if bubble reaches 80% width of chat container. If; links and mentions inline. |
| Loading label | text | One or two words: Thinking, Searching, Typing. |
| Attachment text | text | File name truncates at the end. Meta is type and size. |
| Photos | image fills | The product supplies images; Extra Count is the hidden total. |

## Usage (do / don't)

- Do: Use Sequence=consecutive for a follow-up from the same sender. Each message keeps its own controls.
- Do: On mobile, keep the held message in view between the reactions row and the menu, so people see what message they selected.
- Do: Put a Thread in the Attachment Slot of the message it belongs to.
- Do: Send each video as its own Attachment so it can preview. Group photos in in Photo subcomponents.
- Don't: Don't put a message inside the attachment slot, unless including a thread message within the thread subcomponent’s own slot. The message’s attachment slot should only include media, files, a thread.
- Don't: Don't show the reactions row and the menu together on desktop. One opens, the other closes.
- Don't: Don't use Bubble Status to join messages from different senders.
- Don't: Don’t have bubbles exceed 80% of the chat’s containers width. Hug messages below 80% width or wrap at 80% if message bubbles run longer than 80% chat container width on both desktop and mobile platform.

## Accessibility

The reactions row and menu close on Escape and return focus to their trigger.
The Thread toggle is a button that says whether it is expanded and includes the count ("3 replies").

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fills the list | Text caps at 12 × control/lg wide, 15 × for the assistant. Bubbles hug their text but follow exact behavior indicated in subcomponent metadata for bubble layouts. |
| Padding and gap | Fixed | space/sm around each message and between avatar and content. space/xs inside the header and between blocks. |
| Surface | Per State | Transparent at rest, interactive/ghost/background/hover when active. Off while loading. |
| Bubble | Per Style and Role | Your messages in conversation: surface/brand. Everything else is plain text on the page. follow exact behavior indicated in subcomponent metadata for bubble layouts. |
| Controls and menu - sender and receiver | Floating | surface/overlay with a soft xsmall shadow, layered above the list. |
| Controls - assistant | Bottom left alignment within message’s content frame | The controls on an assistant message will always sit below the message and does not have a floating behavior. The controls for an assistant message will always have a no-fill “none” style. |
| Mobile scrim | Overlay | The Scrim component, under the lifted message and its menus. |
| Corners | Per Rounded | Bubble and attachments round; joins inside a run of your messages tighten to the small radius. All rounded or sharpened property behaviors of the component and it’s nested component’s properties should be consistent based on the parent component’s configuration. |
| Bubble (subcomponent) | Hugs, wraps to a next line when reached 80% width of chat container. | space/sm by space/md padding. Fill uses surface/brand; joins tighten to the small chat radius. Message bubbles should hug it’s contents or otherwise wrap to the next line if the bubble reaches and exceeds 80% of the width of the total chat container. The sender’s bubble always uses a interactive/primary/background/default token fill with foreground/on-strong token for it’s text. The receiver’s bubble always uses surface/brand fill with foreground/primary for it’s text. |
| Controls (subcomponent) | Floating | surface/overlay, soft xsmall shadow, space/3xs padding and gap. |
| Timestamp | Text | body/xsmall in foreground/secondary. |
| Thread | Fills content width | Count and caret on one line with a border/default divider between. The reply count, divider, and caret should be vertically center aligned to each other. |
| Photos | Grid | Tiles keep a fixed gap and the tile radius. Count sets the layout. |
| Attachments | Hug, capped | File and audio sit on the bubble tint with space/xs padding. |
| Theming | Tokens only | Every part follows the theme scope it sits in: dark, extension and nested. |

## Visual reference

- Page: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-18615
- Chat Message: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-18698
- Bubble: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19217
- Controls: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19258
- Loading Indicator: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19269
- Photos: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282
- Attachments: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19335
- Thread: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8440-34713
- Timestamp: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-24563
- Per-variant links are in the JSON.

## Issues

**Warn**
- Variant matrix: There is no channel assistant message at Sequence=first, and no loading variant at Sequence=first for receiver or sender. 116 of the 144 combinations exist.
- Metadata vs Bubble colours: The master metadata says your conversation bubbles are surface/brand. Bubble binds sender to interactive/primary/background/default and receiver to surface/brand, as the subcomponent metadata says.
- Metadata vs Controls shadow: Both metadata frames say a soft xsmall shadow. Controls uses the Shadow/small effect style.
- Metadata vs width rule: The master metadata caps text at 12 × control/lg (15 × for the assistant). The subcomponent metadata wraps bubbles at 80% of the chat container.
- Metadata vs channel alignment: The metadata says channel messages are right aligned. Every channel variant, yours included, is start aligned.
- Metadata vs gaps: The metadata says space/xs between blocks. Main stacks its blocks at space/sm.
- Hide Time: Hide Time is bound to the Timestamp Slot's visibility, so false removes the slot and the indent. The metadata says the slot should stay. The time itself shows only in the active variants.
- Controls overlap: The metadata says controls overlap the message top by space/lg. First messages overlap that much; consecutive ones overlap less, between 7 and 12Px measured.
- Popover anchoring: Menu and reaction-row anchors vary between equivalent variants, for example the menu on desktop channel sender consecutive and on mobile conversation sender first.
- Bubble Status in the master: Conversation sender consecutive uses Status=first. Conversation receiver consecutive uses single on desktop and first on mobile. Status should follow the run.
- Assistant loading: The assistant's first loading variant has a Bubble inside its hidden Attachment Slot. The metadata says the slot never holds a bubble.
- Controls corners: With Rounded=true, React is Shape=sharp beside rounded Reply and More, and Style=none is sharp throughout. With Rounded=false, Style=fill keeps Reply and More rounded.
- Attachments video: Playback=active removes the play control and the duration, so a playing video has no pause. The metadata says play becomes pause.
- Attachments surface: The metadata says file and audio sit on the bubble tint with space/xs padding. They bind surface/card with a border/subtle stroke, padding space/sm block and space/xs inline.
- Token gaps: Thread's count and "replies" text have no colour token. Attachments' file tile radius has no token, nor Controls' slot gap or the loading dots' opacity.

**Note**
- Footer: Footer exists on receiver variants too. The metadata scopes it to your own most recent message. Its Status text is hidden, leaving only the check-mark glyph.
- Reply placement: Mobile conversation receiver puts the reply line above the header. Every other variant puts it under the header.
- Assistant bubble: The assistant's first message uses Bubble Role=receiver and its consecutive ones Role=sender. Both are Style=none, so only the binding differs.
- Root top padding: First messages with a header use space/card at the top; everything else uses space/sm.
- Mobile active: Mobile active looks like default until Reaction Controls or Expand Menu is on. The scrim and lift live outside the component.
- Menu contents: The Dropdown Menu and reaction row content can't be read from the hidden instances. The metadata lists Copy text, Reply, Forward and Mark as unread.
- Fixed text: Thread's "replies" and Timestamp's time are fixed text, not properties.
- Rounded=false: Audio waveform bars keep radius/pill when Rounded=false.
- Loading dots: The dots are sized with space/2xs. Their ripple is motion, not a token.
- Accessibility coverage: The master metadata gives one accessibility line. Names for the icon-only controls and how the long press is reached by keyboard are not stated.
- Component description: The Chat Message set has no Figma description. The summary comes from the metadata.
