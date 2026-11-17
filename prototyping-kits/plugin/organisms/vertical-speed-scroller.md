---
name: Vertical Speed Scroller
level: organism
status: draft
composes: [../molecules/contact-list-item.md, ../molecules/menu-item.md]
tokens:
  # frame and list
  vertical-speed-scroller-container-background: '{colors.color-fill-default}'
  vertical-speed-scroller-container-border-color: '{colors.color-line-subtle}'
  vertical-speed-scroller-divider-width: '{stroke.stroke-thin}'
  vertical-speed-scroller-divider-color: '{colors.color-line-subtle}'
  # section header
  vertical-speed-scroller-section-header-background: '{colors.color-fill-faint}'
  vertical-speed-scroller-section-header-foreground: '{colors.color-ink-high}'
  vertical-speed-scroller-section-header-font: '{typography.type-label-medium}'
  vertical-speed-scroller-section-header-padding-y: '{space.space-2xs}'
  vertical-speed-scroller-section-header-padding-x: '{space.space-lg}'
  # index rail
  vertical-speed-scroller-index-width: '{control.control-lg}'
  vertical-speed-scroller-index-item-min-height: '{control.control-target-min}'
  vertical-speed-scroller-index-label-font: '{typography.type-body-xsmall}'
  vertical-speed-scroller-index-label-font-pressed: '{typography.type-label-medium}'
  vertical-speed-scroller-index-label-foreground: '{colors.color-ink-medium}'
  vertical-speed-scroller-index-label-foreground-pressed: '{colors.color-brand-primary-default}'
  vertical-speed-scroller-index-label-foreground-disabled: '{colors.color-ink-disabled}'
  # letter indicator bubble
  vertical-speed-scroller-bubble-size: '{primitives.scale-17}'
  vertical-speed-scroller-bubble-radius: '{radius.radius-pill}'
  vertical-speed-scroller-bubble-background: '{colors.color-brand-primary-default}'
  vertical-speed-scroller-bubble-foreground: '{colors.color-brand-primary-on}'
  vertical-speed-scroller-bubble-font: '{typography.type-display-medium}'
  vertical-speed-scroller-bubble-offset: '{space.space-sm}'
  # focus
  vertical-speed-scroller-focus-ring-width: '{stroke.stroke-thick}'
  vertical-speed-scroller-focus-ring-color: '{colors.color-line-focus}'
---

# Vertical Speed Scroller

> An alphabetical list that allows users to quickly navigate through a long list of items.

## Anatomy
1. Index rail — `--vertical-speed-scroller-index-width` vertical strip of letters A–Z (and #) on the trailing edge, rendered by the scroller itself, in `--vertical-speed-scroller-index-label-font` `--vertical-speed-scroller-index-label-foreground`.
2. Letter indicator — a `--vertical-speed-scroller-bubble-size` `--vertical-speed-scroller-bubble-background` bubble that shows the current letter enlarged (`--vertical-speed-scroller-bubble-font`, `--vertical-speed-scroller-bubble-foreground`) beside the rail while dragging.
3. Section header — sticky letter heading per group, `--vertical-speed-scroller-section-header-font` `--vertical-speed-scroller-section-header-foreground` on `--vertical-speed-scroller-section-header-background`.
4. List — [Contact List Items](../molecules/contact-list-item.md) or [Menu Items](../molecules/menu-item.md) separated by `--vertical-speed-scroller-divider-width` `--vertical-speed-scroller-divider-color` dividers; their own tokens govern rows, states and focus ring.

## Variants
None yet. The list can hold contact list items (with avatars) or plain menu items.

## States
| Letter state | Font | Foreground | Notes |
|---|---|---|---|
| default | `--vertical-speed-scroller-index-label-font` | `--vertical-speed-scroller-index-label-foreground` | |
| active (being touched) | `--vertical-speed-scroller-index-label-font-pressed` | `--vertical-speed-scroller-index-label-foreground-pressed` | bubble shows the letter; the list jumps to its section |
| focused | unchanged | unchanged | `--vertical-speed-scroller-focus-ring-width` `--vertical-speed-scroller-focus-ring-color` ring |
| unavailable (no items) | `--vertical-speed-scroller-index-label-font` | `--vertical-speed-scroller-index-label-foreground-disabled` | not interactive, exposed as disabled |

Dragging along the rail jumps section by section with no animation; the bubble hides when the finger lifts.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet.

| Part | Value |
|---|---|
| Index rail width | `--vertical-speed-scroller-index-width` (the list keeps this much clear on its trailing side) |
| Letter height | at least `--vertical-speed-scroller-index-item-min-height`; letters share the rail height equally |
| Section header padding (V / H) | `--vertical-speed-scroller-section-header-padding-y` / `--vertical-speed-scroller-section-header-padding-x` |
| Bubble | `--vertical-speed-scroller-bubble-size` square, `--vertical-speed-scroller-bubble-radius`, `--vertical-speed-scroller-bubble-offset` from the rail |
| Frame | `--vertical-speed-scroller-container-background`, `--vertical-speed-scroller-divider-width` `--vertical-speed-scroller-container-border-color` border |

## Properties
| Property | Options | Default |
|---|---|---|
| Index | A–Z + # | A–Z + # |
| Row type | contact list item, menu item | contact list item |
| Unavailable letters | shown disabled / hidden | shown disabled |

## Usage
- Use for long, alphabetically sorted lists such as contacts.
- Rail letters are small: keep a generous touch area and provide search as an alternative.
- Keep every letter on the rail, even empty ones, so its position stays predictable.

## Accessibility
- Index letters are buttons with names like "Jump to M"; empty letters are `aria-disabled` and say "no contacts".
- Letters show a `--vertical-speed-scroller-focus-ring-width` `--vertical-speed-scroller-focus-ring-color` focus ring and Enter / Space jumps to the section.
- The active letter changes weight as well as colour, and the bubble repeats it, so state is never colour alone.
- The list is a focusable region that scrolls from the keyboard; list rows keep their own accessibility.

## Claude Prompt
Draw a mobile contacts list with letter section headers ("A", "B"…) on a pale grey band (`--vertical-speed-scroller-section-header-background`) and contact rows with avatars. Along the right edge, a slim `--vertical-speed-scroller-index-width` column of small grey letters A to Z (`--vertical-speed-scroller-index-label-foreground`); the currently touched letter is highlighted in blue (`--vertical-speed-scroller-index-label-foreground-pressed`) and shown enlarged in a round blue bubble (`--vertical-speed-scroller-bubble-background`, white letter) beside the rail.
