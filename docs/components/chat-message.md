# Chat Message

> One message in a chat, from someone else, you or the assistant. Style sets the setting: channel for group chats, conversation for assistant and one-to-one chats. Platform sets how actions open: hover on desktop, long press on mobile. Sequence separates the first message in a run, which carries the header, from the consecutive messages under it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-chat-message>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `platform` | enum | `desktop` | `mobile` `desktop` |  |
| `style` | enum | `channel` | `conversation` `channel` |  |
| `role` | enum | `receiver` | `receiver` `sender` `assistant` |  |
| `state` | enum | `default` | `default` `active` `loading` |  |
| `sequence` | enum | `first` | `first` `consecutive` |  |
| `rounded` | boolean | `true` |  |  |
| `showAvatar` | boolean | `true` |  |  |
| `showHeader` | boolean | `true` |  |  |
| `showReply` | boolean | `false` |  |  |
| `showReactions` | boolean | `false` |  |  |
| `showFooter` | boolean | `false` |  |  |
| `attachments` | boolean | `false` |  |  |
| `hideTime` | boolean | `true` |  |  |
| `reactionControls` | boolean | `false` |  |  |
| `showControls` | boolean | `true` |  |  |
| `expandMenu` | boolean | `false` |  |  |
| `name` | string | `First Last` |  |  |
| `replyTo` | string | `First Last` |  |  |
| `replyText` | string | `Is the chilled delivery here yet?` |  |  |
| `attachmentSlot` | slot |  |  |  |
| `reactionsSlot` | slot |  |  |  |
| `timestampSlot` | slot |  |  |  |

## When and how to use

### Do

- Use Sequence=consecutive for a follow-up from the same sender. Each message keeps its own controls.
- On mobile, keep the held message in view between the reactions row and the menu, so people see what message they selected.
- Put a Thread in the Attachment Slot of the message it belongs to.
- Send each video as its own Attachment so it can preview. Group photos in in Photo subcomponents.

### Don't

- Don't put a message inside the attachment slot, unless including a thread message within the thread subcomponent’s own slot. The message’s attachment slot should only include media, files, a thread.
- Don't show the reactions row and the menu together on desktop. One opens, the other closes.
- Don't use Bubble Status to join messages from different senders.
- Don’t have bubbles exceed 80% of the chat’s containers width. Hug messages below 80% width or wrap at 80% if message bubbles run longer than 80% chat container width on both desktop and mobile platform.

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
|  |  |  |

## Behaviour

- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
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
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- The reactions row and menu close on Escape and return focus to their trigger.
- The Thread toggle is a button that says whether it is expanded and includes the count ("3 replies").

---
*Generated from `specs/chat-message` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
