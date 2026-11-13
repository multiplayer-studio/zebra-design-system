---
name: Contact List Item
level: molecule
status: draft
composes: [../atoms/avatar.md, ./menu-item.md, ../atoms/icon-button.md]
tokens:
  # row
  contact-list-item-container-background-enabled: '{colors.color-fill-default}'
  contact-list-item-container-background-hover: '{colors.color-fill-faint}'
  contact-list-item-container-background-pressed: '{colors.color-fill-sunken}'
  contact-list-item-focus-ring-width: '{stroke.stroke-thick}'
  contact-list-item-focus-ring-color: '{colors.color-line-focus}'
  contact-list-item-divider-width: '{stroke.stroke-thin}'
  contact-list-item-divider-color: '{colors.color-line-default}'
  # text
  contact-list-item-name-font: '{typography.type-title-medium}'
  contact-list-item-name-foreground: '{colors.color-ink-high}'
  contact-list-item-secondary-font: '{typography.type-body-small}'
  contact-list-item-secondary-foreground: '{colors.color-ink-medium}'
  # sizes
  contact-list-item-container-padding-y: '{space.space-sm}'
  contact-list-item-container-padding-x: '{space.space-lg}'
  contact-list-item-container-gap: '{space.space-md}'
  contact-list-item-text-gap: '{space.space-3xs}'
  contact-list-item-action-size-min: '{primitives.scale-14}'
---

# Contact List Item

> One person in a contact directory or picker: who they are, their presence, and quick actions to reach them.

## Anatomy
1. Row — a [Menu Item](./menu-item.md) row, `--contact-list-item-container-background-enabled`, with a `--contact-list-item-divider-width` `--contact-list-item-divider-color` line under every row except the last. The row is not one control: the open area and each action are.
2. Open area — the avatar and text together, one button that opens the contact.
3. Leading — an [Avatar](../atoms/avatar.md) (initials or photo), optionally with its presence status.
4. Name — `--contact-list-item-name-font` `--contact-list-item-name-foreground`, one line.
5. Secondary line — role, number or presence, `--contact-list-item-secondary-font` `--contact-list-item-secondary-foreground`, one line, truncated.
6. Trailing actions — e.g. call and message [Icon Buttons](../atoms/icon-button.md), flavour subtle, each at least `--contact-list-item-action-size-min`; the Icon Button governs their colours, states and focus ring.

## Variants
| Variant | Trailing |
|---|---|
| with actions (default) | one or two Icon Buttons (call, message) |
| without actions | nothing; the open area fills the row |

Presence (online, away, offline) is the Avatar's own status and is repeated in the secondary line.

## States
| State | Background | Notes |
|---|---|---|
| enabled | `--contact-list-item-container-background-enabled` | |
| hover | `--contact-list-item-container-background-hover` | pointer devices only; the whole row tints |
| pressed | `--contact-list-item-container-background-pressed` | |
| focused (open area) | unchanged | `--contact-list-item-focus-ring-width` `--contact-list-item-focus-ring-color` ring inside the open area |

The action buttons keep their own Icon Button states. All changes are instant.

## Spacing & Sizing
| Property | Token |
|---|---|
| Row padding (V / H) | `--contact-list-item-container-padding-y` / `--contact-list-item-container-padding-x` |
| Gap (avatar ↔ text ↔ actions) | `--contact-list-item-container-gap` |
| Name ↔ secondary line | `--contact-list-item-text-gap` |
| Open area and action targets | at least `--contact-list-item-action-size-min` tall |
| Divider | `--contact-list-item-divider-width` |

The row fills the list's width; the text column takes the remaining space and truncates. Measurements are provisional: there is no Figma source yet.

## Properties
| Property | Options | Default |
|---|---|---|
| Name | text | — |
| Secondary line | text | none |
| Avatar | initials, photo | initials |
| Presence | on / off | off |
| Actions | none, call, message, call + message | call + message |

## Usage
- Use in contact directories and pickers; sort alphabetically and pair long lists with the [Vertical Speed Scroller](../organisms/vertical-speed-scroller.md).
- Keep the actions to the two most common ways of reaching someone.
- Put the role or department in the secondary line, and lead with presence when it matters ("Online · Picker").

## Accessibility
- Presence must be conveyed with text or an accessible label, not only the status colour.
- Icon-only actions need accessible names that include the person ("Call Rosa Tan"), and targets of at least `--contact-list-item-action-size-min`.
- The open area and the actions are separate buttons in reading order; don't nest one inside the other.
- The focus ring (`--contact-list-item-focus-ring-width` `--contact-list-item-focus-ring-color`) is drawn inside the open area so the row edges don't clip it.

## Stitch Prompt
Draw a white full-width contact row with `--contact-list-item-container-padding-x` side padding: a circular avatar with initials and a small green presence dot, a `--contact-list-item-name-font` near-black name with a grey `--contact-list-item-secondary-font` role line beneath, and on the right two small grey icon buttons for phone and message. A thin light grey `--contact-list-item-divider-color` divider runs below.
