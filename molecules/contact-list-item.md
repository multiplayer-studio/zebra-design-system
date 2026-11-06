---
name: Contact List Item
level: molecule
status: draft
composes: [../atoms/avatar.md, ./status-badge.md, ./list-item.md, ../atoms/icon-button.md]
tokens:
  contact-list-item-container-background-hover: '{colors.surface-hover}'
  contact-list-item-container-background-pressed: '{colors.surface-selected}'
  contact-list-item-focus-ring-width: '{border.border-size-medium}'
  contact-list-item-focus-ring-color: '{colors.border-primary}'
  contact-list-item-action-size-min: '{layout.touch-target-ios}'
---

# Contact List Item

> The chat list items and chat lists are used in communication feeds and contact lists

This page is a composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Row container – list row (see [List Item](./list-item.md)).
2. Leading [Avatar](../atoms/avatar.md), optionally with presence [Status Badge](./status-badge.md).
3. Contact name.
4. Secondary line (role, number or status).
5. Trailing actions – e.g. call / message [Icon Buttons](../atoms/icon-button.md), flavor subtle; the icon button governs colours, states and focus ring.

## Variants
To be defined.

## States
To be defined. Intended: the standard Zeta interaction tokens (hover `--contact-list-item-container-background-hover`, pressed `--contact-list-item-container-background-pressed`, focus `--contact-list-item-focus-ring-width` `--contact-list-item-focus-ring-color`) where the item is interactive.

## Spacing & Sizing
Measurements to be defined.

## Usage
- Use in contact directories and pickers.
- Presence must be conveyed with text or an accessible label, not only the badge colour.
- Icon-only trailing actions need accessible names and ≥ `--contact-list-item-action-size-min` targets.

## Stitch Prompt
Draw a white full-width contact row: a circular avatar with initials and a small green presence dot, a medium-weight near-black name with a grey role line beneath, and on the right two small grey icon buttons for phone and message. Thin light grey divider below.
