---
name: Chat
level: organism
status: draft
composes: [../molecules/message-input.md, ../atoms/avatar.md, ../organisms/top-app-bar.md, ../atoms/notification-indicator.md, ../atoms/button.md, ../atoms/icon-button.md, ../atoms/ai-mark.md]
tokens:
  # surface
  chat-container-background: '{colors.color-fill-default}'
  chat-container-border-color: '{colors.color-line-subtle}'
  chat-container-border-width: '{stroke.stroke-thin}'
  chat-container-radius-rounded: '{radius.radius-md}'
  chat-container-radius-sharp: '{radius.radius-none}'
  # message list
  chat-list-padding: '{space.space-lg}'
  chat-list-gap: '{space.space-md}'
  chat-message-gap: '{space.space-sm}'
  chat-message-max-width: '{component-sizes.size-chat-message-max-width}'
  chat-message-meta-gap: '{space.space-2xs}'
  # bubbles
  chat-bubble-radius-rounded: '{radius.radius-sm}'
  chat-bubble-radius-sharp: '{radius.radius-none}'
  chat-bubble-padding-y: '{space.space-sm}'
  chat-bubble-padding-x: '{space.space-md}'
  chat-bubble-font: '{typography.type-body-medium}'
  chat-sender-font: '{typography.type-label-small}'
  chat-incoming-bubble-background: '{colors.color-fill-faint}'
  chat-incoming-bubble-foreground: '{colors.color-ink-high}'
  chat-outgoing-bubble-background: '{colors.color-brand-primary-default}'
  chat-outgoing-bubble-foreground: '{colors.color-brand-primary-on}'
  chat-assistant-bubble-background: '{colors.color-fill-default}'
  chat-assistant-bubble-foreground: '{colors.color-ink-high}'
  chat-assistant-bubble-border-color: '{colors.color-line-subtle}'
  chat-assistant-bubble-border-width: '{stroke.stroke-thin}'
  chat-assistant-actions-gap: '{space.space-3xs}'
  chat-sources-gap: '{space.space-2xs}'
  chat-sources-font: '{typography.type-body-small}'
  chat-sources-foreground: '{colors.color-ink-link}'
  # meta (timestamps, day labels, delivery status)
  chat-timestamp-foreground: '{colors.color-ink-medium}'
  chat-timestamp-font: '{typography.type-body-xsmall}'
  chat-day-font: '{typography.type-label-small}'
  chat-status-gap: '{space.space-2xs}'
  chat-status-icon-size: '{control.control-icon-sm}'
---

# Chat

> A chat component displays a conversation between users, or between a person and an AI assistant, as a list of messages with sender information and timestamps.

A composition of existing atoms and molecules; the chat itself defines only the message list, bubbles and meta text.

## Anatomy
1. Header — conversation title / participant: [Top App Bar](top-app-bar.md) with a back action, an xxxs [Avatar](../atoms/avatar.md) and the contact name. The top app bar governs its own surface, height and actions.
2. Message list — bubbles grouped by sender, `--chat-list-gap` apart inside `--chat-list-padding`; incoming (left, with an [Avatar](../atoms/avatar.md)) vs outgoing (right). A centred day label (`--chat-day-font`, `--chat-timestamp-foreground`) separates days.
3. Bubble — the message text in `--chat-bubble-font`; in a group conversation an incoming bubble starts with the sender name in `--chat-sender-font`.
4. Message meta — timestamp and delivery / read status under the bubble (on a message that failed, a Retry [Button](../atoms/button.md), text, small, after the status), `--chat-message-meta-gap` below it: `--chat-timestamp-font` text in `--chat-timestamp-foreground`, with a `--chat-status-icon-size` status icon `--chat-status-gap` from the label.
5. Composer — [Message Input](../molecules/message-input.md) with attach, text and send / voice actions; recording a voice message uses the Message Input's voice states.

6. Assistant message (assistant sender only) — a bubble on `--chat-assistant-bubble-background` with a `--chat-assistant-bubble-border-width` `--chat-assistant-bubble-border-color` border and `--chat-assistant-bubble-foreground` text, led by an [AI Mark](../atoms/ai-mark.md) naming what it did ("Answered", "Summarised", [patterns 9.19](../patterns/09-ai.md), [9.20](../patterns/09-ai.md)). Its avatar is a non-person [Avatar](../atoms/avatar.md) (an icon, never a face or a human name, [patterns 9.88](../patterns/09-ai.md)). Beneath the text, sources sit next to the claim they support, labelled by what they are, in `--chat-sources-font` `--chat-sources-foreground`, `--chat-sources-gap` apart ([patterns 9.23](../patterns/09-ai.md)). On the latest answer, feedback: two subtle small [Icon Buttons](../atoms/icon-button.md) (`like`, `dislike`), `--chat-assistant-actions-gap` apart ([patterns 9.56](../patterns/09-ai.md)).

The composed bar, avatars, message input and [Notification Indicator](../atoms/notification-indicator.md) (unread counts) govern their own colours, states and focus rings.

## Variants
| Variant | Notes |
|---|---|
| one-to-one | no sender names on bubbles |
| group | sender name + avatar on incoming bubbles |
| assistant | a conversation with the AI assistant: incoming messages use the assistant message; if a person joins, their messages are incoming bubbles with their name, and the AI marks stay on earlier messages ([patterns 9.22](../patterns/09-ai.md)) |

| Bubble | Background | Text |
|---|---|---|
| incoming | `--chat-incoming-bubble-background` | `--chat-incoming-bubble-foreground` |
| outgoing | `--chat-outgoing-bubble-background` | `--chat-outgoing-bubble-foreground` |
| assistant | `--chat-assistant-bubble-background`, `--chat-assistant-bubble-border-color` border | `--chat-assistant-bubble-foreground` |

Shape: rounded (default) → `--chat-bubble-radius-rounded` bubbles inside a `--chat-container-radius-rounded` surface; sharp → `--chat-bubble-radius-sharp` and `--chat-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Message state | Meta treatment |
|---|---|
| sending | clock icon + "Sending…", no timestamp yet |
| sent | timestamp + check icon + "Sent" |
| delivered | timestamp + check icon + "Delivered" |
| read | timestamp + check icon + "Read" |
| failed | error icon + "Not sent" + Retry; the message stays in the list with its text kept |

| Assistant message state | Treatment |
|---|---|
| working | a short label of what it's doing ("Searching manuals") in place of the reply, at once ([patterns 9.44](../patterns/09-ai.md)) |
| streaming | text appears as it's produced; the composer's send becomes Stop (Message Input generating). The view stays at the start of the reply and doesn't chase its end ([patterns 9.46](../patterns/09-ai.md)) |
| stopped | the partial reply stays, marked "Stopped" |
| error | error icon and what went wrong, with Retry |
| done | AI Mark, sources and feedback shown |

The treatments are provisional: the state is carried by the icon and the label text, never by colour ([patterns 6.11](../patterns/06-accessibility.md)). New messages append at the bottom and the list scrolls to them, except a streaming reply, which keeps its start in view; there is no animation.

## Spacing & Sizing
Measurements are provisional: the chat has no Figma source yet.

| Part | Value |
|---|---|
| Surface | `--chat-container-background`, `--chat-container-border-width` `--chat-container-border-color` border |
| List padding / gap | `--chat-list-padding` / `--chat-list-gap` |
| Avatar–bubble gap | `--chat-message-gap` |
| Message max width | `--chat-message-max-width` of the list |
| Bubble padding (V / H) | `--chat-bubble-padding-y` / `--chat-bubble-padding-x` |
| Bubble–meta gap | `--chat-message-meta-gap` |

Long words wrap inside the bubble rather than widening it.

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | one-to-one, group, assistant | one-to-one |
| Rounded | on / off | on |
| Messages | list of incoming / outgoing messages with sender, time and state | — |
| Message state | sending, sent, delivered, read, failed | sent |
| Assistant message state | working, streaming, stopped, error, done | done |

## Usage
- Use for one-to-one or group messaging between frontline workers; keep the header to the participant or group name.
- Show sender names only in group conversations.
- Group consecutive messages from the same sender; show a day label when the date changes.
- Keep the composer docked at the bottom so it stays reachable while the list scrolls ([patterns 1.33](../patterns/01-screen-composition.md)).
- Offer Retry on a failed message only when retrying could work ([patterns 4.36](../patterns/04-states-feedback.md)).

## Accessibility
- The message list is a log region: new incoming messages are announced politely to assistive technology without stealing focus ([patterns 6.53](../patterns/06-accessibility.md)). A streaming reply announces when it starts and when it finishes, not every word ([patterns 6.59](../patterns/06-accessibility.md)).
- Retry is named with its message ("Retry sending 'On my way'"); feedback buttons are named ("Good answer", "Bad answer") and report `aria-pressed`.
- Interactive parts (top app bar actions, message input, avatars that open a profile) bring their own touch targets and focus rings.
- Outgoing text (`--chat-outgoing-bubble-foreground` on `--chat-outgoing-bubble-background`) and incoming text keep AA contrast in every mode.

## Claude Prompt
Draw a mobile chat screen: a top app bar with back arrow, a small avatar and the contact name. Below, a scrolling conversation where incoming messages are `--chat-incoming-bubble-background` bubbles with `--chat-bubble-radius-rounded` corners on the left with a small avatar, and outgoing messages are `--chat-outgoing-bubble-background` bubbles with `--chat-outgoing-bubble-foreground` text on the right. Bubbles have `--chat-bubble-padding-y` / `--chat-bubble-padding-x` padding and `--chat-bubble-font` text; under each, a tiny `--chat-timestamp-foreground` timestamp with a check icon and "Read". For an assistant conversation, incoming replies sit in white bubbles with a thin `--chat-assistant-bubble-border-color` border, an AI mark ("Answered") at the top, an icon avatar, source links under the text and thumbs up and down icon buttons beneath the latest one. At the bottom, a message input with an attach icon, a text box and a microphone/send button.
