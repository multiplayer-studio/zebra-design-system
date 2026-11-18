---
name: Chat List Item
level: molecule
status: draft
composes: [../atoms/avatar.md, ./menu-item.md, ../atoms/notification-indicator.md, ../atoms/icon.md]
tokens:
  # row
  chat-list-item-row-background-enabled: '{colors.color-fill-default}'
  chat-list-item-row-background-hover: '{colors.color-fill-faint}'
  chat-list-item-row-background-pressed: '{colors.color-fill-sunken}'
  chat-list-item-focus-ring-width: '{stroke.stroke-thick}'
  chat-list-item-focus-ring-color: '{colors.color-line-focus}'
  chat-list-item-divider-width: '{stroke.stroke-thin}'
  chat-list-item-divider-color: '{colors.color-line-default}'
  # text
  chat-list-item-name-font: '{typography.type-body-medium}'
  chat-list-item-name-font-unread: '{typography.type-title-medium}'
  chat-list-item-name-foreground: '{colors.color-ink-high}'
  chat-list-item-preview-font: '{typography.type-body-small}'
  chat-list-item-preview-foreground: '{colors.color-ink-medium}'
  chat-list-item-preview-foreground-unread: '{colors.color-ink-high}'
  chat-list-item-meta-font: '{typography.type-body-xsmall}'
  chat-list-item-meta-foreground: '{colors.color-ink-medium}'
  # sizes
  chat-list-item-row-padding-y: '{space.space-md}'
  chat-list-item-row-padding-x: '{space.space-lg}'
  chat-list-item-row-gap: '{space.space-md}'
  chat-list-item-text-gap: '{space.space-3xs}'
  chat-list-item-meta-gap: '{space.space-2xs}'
---

# Chat List Item

> One conversation in a chat feed: who, the latest message, when, and how much is unread.

It is a specialised row; a product may build it on the generic [List Item](list-item.md), keeping the parts and tokens below.

## Anatomy
1. Row — a [Menu Item](./menu-item.md) row used as one button, `--chat-list-item-row-background-enabled`, with a `--chat-list-item-divider-width` `--chat-list-item-divider-color` line under every row except the last. The interaction states below are this item's own.
2. Leading — an [Avatar](../atoms/avatar.md) (initials, photo or group icon), optionally with its presence status.
3. Name — the contact or group name, `--chat-list-item-name-font` `--chat-list-item-name-foreground` (`--chat-list-item-name-font-unread` when unread), one line; a long name truncates at the end.
4. Preview — the last message, `--chat-list-item-preview-font` `--chat-list-item-preview-foreground` (`--chat-list-item-preview-foreground-unread` when unread), one line, truncated at the end.
5. Trailing meta — a timestamp in `--chat-list-item-meta-font` `--chat-list-item-meta-foreground`, above either the unread count ([Notification Indicator](../atoms/notification-indicator.md)) or a status [Icon](../atoms/icon.md) (read, delivered, muted) in `--chat-list-item-meta-foreground`.

## Variants
| Variant | Name | Preview | Trailing |
|---|---|---|---|
| read (default) | `--chat-list-item-name-font` | `--chat-list-item-preview-foreground` | timestamp + status icon |
| unread | `--chat-list-item-name-font-unread` | `--chat-list-item-preview-foreground-unread` | timestamp + unread count |

The leading Avatar can be a person (initials or photo, with presence) or a group (group icon).

## States
| State | Background | Notes |
|---|---|---|
| enabled | `--chat-list-item-row-background-enabled` | |
| hover | `--chat-list-item-row-background-hover` | pointer devices only |
| pressed | `--chat-list-item-row-background-pressed` | |
| focused | `--chat-list-item-row-background-enabled` | `--chat-list-item-focus-ring-width` `--chat-list-item-focus-ring-color` ring drawn inside the row |

Opening a conversation marks it read: the name and preview drop to their read styles and the count disappears. All changes are instant.

## Spacing & Sizing
| Property | Token |
|---|---|
| Row padding (V / H) | `--chat-list-item-row-padding-y` / `--chat-list-item-row-padding-x` |
| Gap (avatar ↔ text ↔ meta) | `--chat-list-item-row-gap` |
| Name ↔ preview | `--chat-list-item-text-gap` |
| Timestamp ↔ count / icon | `--chat-list-item-meta-gap` |
| Divider | `--chat-list-item-divider-width` |

The row fills the list's width; the text column takes the remaining space and truncates, with the full name and preview on hover and focus ([patterns 5.30](../patterns/05-sizes-devices.md)). Measurements are provisional: there is no Figma source yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Name | text | — |
| Preview | text | — |
| Avatar | person, group | person |
| Presence | on / off | off |
| Timestamp | text | — |
| Unread count | number, or none | none |
| Status icon | read, delivered, muted, none | none |

## Usage
- Use in chat feeds; one row per conversation, newest first.
- Previews truncate to one line; the full row is the tap target, and the full text shows on hover and focus.
- Prefix the preview with the sender in group chats ("Rosa: …") and with "You:" for your own messages.
- See [Chat](../organisms/chat.md).

## Accessibility
- The whole row is one button; its accessible name reads naturally and carries the full, untruncated text (name, preview, time, unread count). On focus the full preview also shows visually, as on hover ([patterns 6.60](../patterns/06-accessibility.md)).
- Unread is shown by the heavier name and the count, never colour alone ([patterns 6.11](../patterns/06-accessibility.md)); the count has an accessible label ("3 unread messages").
- Status icons (read, delivered, muted) and presence need a text equivalent, e.g. visually hidden text.
- The focus ring (`--chat-list-item-focus-ring-width` `--chat-list-item-focus-ring-color`) sits inside the row so neighbouring rows don't clip it.

## Claude Prompt
Draw a white full-width chat row with `--chat-list-item-row-padding-x` side padding: a circular avatar with a small status dot on the left, then a near-black contact name (`--chat-list-item-name-font-unread` when unread) with a single-line grey `--chat-list-item-preview-font` message preview below it, and on the right a small grey `--chat-list-item-meta-font` timestamp above a small red unread-count badge. Separate rows with a thin light grey `--chat-list-item-divider-color` line.
