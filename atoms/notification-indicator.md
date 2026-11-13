---
name: Notification Indicator
level: atom
status: stable
composes: []
tokens:
  # colour
  notification-indicator-container-background: '{colors.color-status-error-default}'
  notification-indicator-container-border-color: '{colors.color-line-inverse}'
  notification-indicator-value-foreground: '{colors.color-ink-always-white}'
  # shape and border
  notification-indicator-container-radius: '{radius.radius-pill}'
  notification-indicator-container-border-width: '{stroke.stroke-base}'
  # sizes
  notification-indicator-container-height-large: '{primitives.scale-8}'
  notification-indicator-container-min-width-large: '{primitives.scale-10}'
  notification-indicator-container-padding-x-large: '{space.space-2xs}'
  notification-indicator-container-size-medium: '{primitives.scale-7}'
  notification-indicator-container-size-small: '{primitives.scale-5}'
  notification-indicator-value-font: '{typography.type-indicator-medium}'
---

# Notification Indicator

> Marks that something is waiting on whatever it is pinned to, optionally with a count.

## Anatomy
1. Surround — a fully round (`--notification-indicator-container-radius`) fill in `--notification-indicator-container-background`, sized by Size.
2. Value — the count, in `--notification-indicator-value-font` `--notification-indicator-value-foreground`, centred horizontally and vertically. Present at large and medium, absent at small. The text line is taller than the medium box, so centre it on the box (flex centring) rather than letting it flow from the top.
3. Border — a stroke in `--notification-indicator-container-border-color` at `--notification-indicator-container-border-width` (zero). It is a theming hook, not an omission: a high-contrast theme raises the width to outline the indicator where it overlaps something.

## Variants
| Size | Box | Value |
|---|---|---|
| large (default) | `--notification-indicator-container-height-large` tall, at least `--notification-indicator-container-min-width-large` wide, `--notification-indicator-container-padding-x-large` either side | up to 3 characters; above 99 reads `99+` |
| medium | `--notification-indicator-container-size-medium` square | a single digit |
| small | `--notification-indicator-container-size-small` dot | none |

The colour is the same at every size and does not vary with the count. The indicator says how many and never what kind.

## States
| State | What changes |
|---|---|
| static | the only state; nothing answers hover, focus or press |

No transition is defined: a change in the count is a text swap. Moving between small and the other sizes changes what is being said (whether there is a number at all), not only the scale.

## Spacing & Sizing
| Size | Height | Width | Padding (H) | Radius |
|---|---|---|---|---|
| large | `--notification-indicator-container-height-large` | hugs the value, min `--notification-indicator-container-min-width-large` | `--notification-indicator-container-padding-x-large` | `--notification-indicator-container-radius` |
| medium | `--notification-indicator-container-size-medium` | `--notification-indicator-container-size-medium` | none | `--notification-indicator-container-radius` |
| small | `--notification-indicator-container-size-small` | `--notification-indicator-container-size-small` | none | `--notification-indicator-container-radius` |

Usually overlapped on the corner of the thing it is pinned to (a nav item, tab, icon or menu row), or placed in a row's layout where the parent says so (Sub Menu Item).

## Properties
| Property | Options | Default |
|---|---|---|
| Size | large, medium, small | large |
| Value | text, up to 3 characters (above 99 shows `99+`); ignored at small | 2 |

## Usage
- Use small where the fact that something is new is the whole message; it is the only form that makes no claim about quantity.
- Keep the count short: large stops at 3 characters and shows `99+` above 99; medium holds one digit.
- Don't put a count on small. It carries no text, so the number disappears with nothing to show it went.
- Don't use it to mean anything other than items waiting. For a status on an avatar use the Avatar's own status; for a fixed pending mark use [Icon Indicator](../atoms/icon-indicator.md).
- Remove the indicator at zero rather than showing `0`.

## Accessibility
- The indicator is colour and shape only, and at small it has no text. Whatever it is pinned to must name what is waiting and how many in its accessible name (e.g. "Messages, 3 unread"); hide the indicator itself from assistive tech, or give a standalone one `role="img"` with a label.
- A visible zero reads as a notification about nothing; remove the indicator instead.
- It is not focusable and a change in the count does not announce itself. The surrounding structure must announce that the number moved, where that matters.
- The zero-width border (`--notification-indicator-container-border-width`) lets a high-contrast theme separate the indicator from a busy background.

## Stitch Prompt
Pin a Zebra notification indicator to the corner of a nav icon or tab: a red (`--notification-indicator-container-background`) pill `--notification-indicator-container-height-large` tall and at least `--notification-indicator-container-min-width-large` wide, with `--notification-indicator-container-padding-x-large` side padding and a white (`--notification-indicator-value-foreground`) count in `--notification-indicator-value-font`, such as "3" or "99+". A medium indicator is a `--notification-indicator-container-size-medium` red circle holding a single digit; a small one is a plain `--notification-indicator-container-size-small` red dot with no number.
