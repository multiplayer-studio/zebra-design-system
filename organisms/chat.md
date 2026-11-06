---
name: Chat
level: organism
status: draft
composes: [../molecules/message-input-field.md, ../atoms/avatar.md, ../organisms/top-app-bar.md, ../organisms/voice-memo.md, ../atoms/indicator.md]
tokens:
  chat-bubble-radius-rounded: '{rounded.radius-minimal}'
  chat-incoming-bubble-background: '{colors.surface-hover}'
  chat-outgoing-bubble-background: '{colors.surface-primary}'
  chat-outgoing-bubble-foreground: '{colors.main-inverse}'
  chat-timestamp-foreground: '{colors.main-subtle}'
---

# Chat

> A chat component displays a conversation between users, typically as a list of messages with sender information and timestamps.

A composition of existing atoms and molecules. Measurements to be defined.

## Anatomy
1. Header — conversation title / participant: [Top App Bar](top-app-bar.md) with back action, small [avatar](../atoms/avatar.md) and contact name. The top app bar governs its own surface, height and actions.
2. Message list — bubbles grouped by sender; incoming (left, with [avatar](../atoms/avatar.md)) vs outgoing (right).
3. Message meta — sender name, timestamp, delivery/read status.
4. Composer — [message input field](../molecules/message-input-field.md) with send / attach / voice actions; voice recording opens [Voice Memo](voice-memo.md).

The composed bar, avatar, input field and voice memo govern their own colours, states and focus rings; the chat defines only the message bubbles and timestamps.

## Variants
| Variant | Notes |
|---|---|
| one-to-one | no sender names on bubbles |
| group | sender name + avatar on incoming bubbles |

## States
Message: sending / sent / delivered / read / failed — treatments to be defined.

## Spacing & Sizing
Measurements to be defined. Use the system spacing scale and semantic tokens only; radius `--chat-bubble-radius-rounded` when rounded.

## Usage
- Timestamps and read status must be text/icon, not colour only.
- New incoming messages should be announced politely to assistive technology without stealing focus.
- Interactive parts (top app bar actions, message input field, voice memo) bring their own touch targets and focus rings; never rely on colour alone.

## Stitch Prompt
Draw a mobile chat screen: a `--top-app-bar-container-background` top app bar with back arrow, a small avatar and the contact name. Below, a scrolling conversation where incoming messages are `--chat-incoming-bubble-background` rounded bubbles on the left with a small avatar, and outgoing messages are `--chat-outgoing-bubble-background` bubbles with `--chat-outgoing-bubble-foreground` text on the right, each with a tiny `--chat-timestamp-foreground` timestamp. At the bottom, a message input field with an attach icon, a text box and a microphone/send button.
