---
name: Notification List Item
level: molecule
status: draft
composes: [../atoms/avatar.md, ../atoms/icon.md, ../atoms/indicator.md, ./list-item.md]
tokens:
  notification-list-item-row-background-hover: '{colors.surface-hover}'
  notification-list-item-row-background-pressed: '{colors.surface-selected}'
  notification-list-item-focus-ring-width: '{border.border-size-medium}'
  notification-list-item-focus-ring-color: '{colors.border-primary}'
---

# Notification List Item

> Notification list items are used in notification lists.

Measurements to be defined.

## Anatomy
1. Row container – a [List Item](./list-item.md) row; its own tokens govern padding, gap, headline and divider. The interaction states below are this item's own, since the List Item row has none.
2. Leading [Avatar](../atoms/avatar.md) or [Icon](../atoms/icon.md) for the source.
3. Title / message text.
4. Timestamp.
5. Unread [Indicator](../atoms/indicator.md).

## Variants
Measurements to be defined.

## States
Measurements to be defined. Use the standard Zebra interaction tokens (hover `--notification-list-item-row-background-hover`, pressed `--notification-list-item-row-background-pressed`, focus `--notification-list-item-focus-ring-width` `--notification-list-item-focus-ring-color`) where the item is interactive.

## Spacing & Sizing
Measurements to be defined.

## Usage
- Use in notification centres; newest first.
- Mark unread with more than colour (dot + weight) and expose it to assistive tech.
- The whole row should be the tap target; keep text to two lines.

## Stitch Prompt
Draw a white full-width notification row: a circular avatar or coloured icon on the left, a near-black notification message (up to two lines) with a small grey timestamp beneath, and a small blue unread dot on the right. Unread rows can have a very pale blue tint. Thin light grey divider below.
