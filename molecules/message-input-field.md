---
name: Message Input Field
level: molecule
status: draft
composes: [./text-input.md, ../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  # own measurements to be defined; composed children's tokens govern their parts
---

# Message Input Field

> Input used for sending messages in a chat or communication interface.

This page is a composition guide built from existing Zebra atoms and molecules. Measurements to be defined.

## Anatomy
1. Container – bar docked under the conversation.
2. Leading actions – e.g. attach / emoji [Icon Buttons](../atoms/icon-button.md).
3. Text field – [Text Input](./text-input.md), multi-line type.
4. Send button – [Icon Button](../atoms/icon-button.md) with a send [Icon](../atoms/icon.md); voice-memo trigger when empty.

## Variants
To be defined.

## States
To be defined. The bar itself is not interactive; the [Text Input](./text-input.md) and [Icon Button](../atoms/icon-button.md) states (hover, pressed, focus, disabled) are their own, governed by their tokens.

## Spacing & Sizing
Measurements to be defined.

## Usage
- Dock at the bottom of [Chat](../organisms/chat.md); grow vertically for multi-line messages up to a limit.
- Disable Send until there is content; label all icon buttons.
- Keep the field focused after sending for rapid replies.

## Stitch Prompt
Draw a chat composer bar docked at the bottom of a screen: a white bar with a subtle top border, a grey paperclip icon on the left, a rounded light-bordered text field with grey placeholder "Type a message" filling the middle, and a blue circular send button with a white paper-plane icon on the right.
