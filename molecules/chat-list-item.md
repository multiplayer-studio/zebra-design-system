---
name: Chat List Item
level: molecule
status: draft
composes: [../atoms/avatar.md, ./status-badge.md, ./list-item.md, ../atoms/icon.md, ../atoms/indicator.md]
tokens:
  chat-list-item-row-background-hover: '{colors.surface-hover}'
  chat-list-item-row-background-pressed: '{colors.surface-selected}'
  chat-list-item-focus-ring-width: '{border.border-size-medium}'
  chat-list-item-focus-ring-color: '{colors.border-primary}'
---

# Chat List Item

> The chat list items and chat lists are used in communication feeds and contact lists.

Measurements to be defined.

## Anatomy
1. Row container – a [List Item](./list-item.md) row; its own tokens govern padding, gap, headline and divider. The interaction states below are this item's own, since the List Item row has none.
2. Leading [Avatar](../atoms/avatar.md), optionally with a [Status Badge](./status-badge.md).
3. Name / title line.
4. Last-message preview line.
5. Trailing meta – timestamp and unread count ([Indicator](../atoms/indicator.md), notification type) / status [Icons](../atoms/icon.md).

## Variants
Measurements to be defined.

## States
Measurements to be defined. Use the standard Zebra interaction tokens (hover `--chat-list-item-row-background-hover`, pressed `--chat-list-item-row-background-pressed`, focus `--chat-list-item-focus-ring-width` `--chat-list-item-focus-ring-color`) where the item is interactive.

## Spacing & Sizing
Measurements to be defined.

## Usage
- Use in chat feeds; one row per conversation, newest first.
- Unread state must not rely on colour alone (bold text + count badge).
- Truncate previews to one line; the full row is the tap target.
- See [Chat](../organisms/chat.md).

## Stitch Prompt
Draw a white full-width chat row: a circular avatar with a small status dot on the left, then a medium-weight near-black contact name with a single-line grey message preview below it, and on the right a small grey timestamp above a small red unread-count badge. Separate rows with a thin light grey line.
