---
name: Vertical Speed Scroller
level: organism
status: draft
composes: [../molecules/contact-list-item.md, ../molecules/list-item.md]
tokens:
  vertical-speed-scroller-index-label-foreground-pressed: '{colors.main-primary}'
  vertical-speed-scroller-focus-ring-width: '{border.border-size-medium}'
  vertical-speed-scroller-focus-ring-color: '{colors.border-primary}'
---

# Vertical Speed Scroller

> An alphabetical list that allows users to quickly navigate through a long list of items.

This page is a composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Index rail — vertical strip of letters A–Z (and #) on the trailing edge, rendered by the scroller itself.
2. Letter indicator — enlarged current letter while dragging.
3. List — section headers per letter with [Contact List Items](../molecules/contact-list-item.md) / [List Items](../molecules/list-item.md); their own tokens govern rows, states and focus ring.

## Variants
To be defined.

## States
Letter: default / active (being touched) / unavailable (no items).

## Spacing & Sizing
Measurements to be defined. Spacing, radius and colours will use the Zeta semantic scales once defined.

## Usage
- Use for long, alphabetically sorted lists such as contacts.
- Rail letters are small — keep a generous touch area and provide search as an alternative.
- Index rail letters (the scroller's own part) show a `--vertical-speed-scroller-focus-ring-width` `--vertical-speed-scroller-focus-ring-color` focus ring and meet the recommended touch target; list rows keep their own accessibility. Never rely on colour alone.

## Stitch Prompt
Draw a mobile contacts list with letter section headers ("A", "B"…) and contact rows with avatars. Along the right edge, a slim vertical column of small grey letters A to Z; the currently touched letter is highlighted in blue (`--vertical-speed-scroller-index-label-foreground-pressed`) and shown enlarged in a bubble beside the rail.
