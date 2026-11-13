---
name: Notification Item
level: molecule
status: stable
composes: [../atoms/avatar.md, ../atoms/icon.md, ../atoms/notification-indicator.md, ../atoms/icon-indicator.md, ../atoms/button.md]
tokens:
  # container
  notification-item-container-background-unread: '{colors.color-fill-default}'
  notification-item-container-background-read: '{colors.color-status-ghost-default}'
  notification-item-container-border-color: '{colors.color-line-default}'
  notification-item-container-border-width: '{stroke.stroke-base}'
  notification-item-container-radius: '{radius.radius-md}'
  notification-item-container-padding-y: '{space.space-gutter}'
  notification-item-container-padding-x: '{space.space-card}'
  notification-item-container-gap: '{space.space-sm}'
  # leading visual
  notification-item-visual-size: '{control.control-sm}'
  notification-item-visual-radius: '{radius.radius-pill}'
  notification-item-visual-icon-size: '{icon.icon-size-medium}'
  notification-item-visual-icon-foreground: '{colors.color-ink-medium}'
  notification-item-visual-icon-border-color: '{colors.color-line-default}'
  notification-item-visual-icon-border-width: '{stroke.stroke-thin}'
  # content column
  notification-item-content-gap: '{space.space-sm}'
  notification-item-message-gap: '{space.space-2xs}'
  # header row
  notification-item-header-gap: '{space.space-sm}'
  notification-item-unread-dot-padding-y: '{space.space-sm}'
  notification-item-title-font-unread: '{typography.type-label-large}'
  notification-item-title-font-read: '{typography.type-body-medium}'
  notification-item-title-foreground: '{colors.color-ink-high}'
  notification-item-metadata-gap: '{space.space-2xs}'
  notification-item-metadata-padding-y: '{space.space-3xs}'
  notification-item-timestamp-font: '{typography.type-label-small}'
  notification-item-timestamp-foreground: '{colors.color-ink-low}'
  # body
  notification-item-body-font: '{typography.type-body-small}'
  notification-item-body-foreground: '{colors.color-ink-high}'
  # attachment
  notification-item-attachment-gap: '{space.space-2xs}'
  notification-item-attachment-font: '{typography.type-label-small}'
  notification-item-attachment-foreground: '{colors.color-ink-link}'
  notification-item-attachment-icon-size: '{icon.icon-size-small}'
  # actions
  notification-item-actions-gap: '{space.space-2xs}'
  # group indicator
  notification-item-group-bar-background: '{colors.color-line-focus}'
  notification-item-group-bar-height: '{primitives.scale-3}'
  notification-item-group-bar-inset: '{space.space-card}'
  notification-item-group-bar-radius: '{radius.radius-md}'
---

# Notification Item

> A single entry in a notification list: where it came from, a title and message, an optional attachment and an action, unread or read.

## Anatomy
1. Container — horizontal row, fixed width, height hugs the content. Radius `--notification-item-container-radius`, padding `--notification-item-container-padding-y` / `--notification-item-container-padding-x`, `--notification-item-container-gap` between the leading visual and the content. Background per Read. A `--notification-item-container-border-width` border in `--notification-item-container-border-color` sits on every entry at zero width by default, a hook a high-contrast theme can raise to a hard outline.
2. Leading visual — a `--notification-item-visual-size` circle (`--notification-item-visual-radius`) standing for the source, in one of three flavours:
   - avatar (default) — an [Avatar](../atoms/avatar.md) at size xxsmall with its status, ring and close off, centred.
   - image — the artwork is the circle's background, not an element inside it.
   - icon — an [Icon](../atoms/icon.md) at `--notification-item-visual-icon-size` in `--notification-item-visual-icon-foreground`, centred, inside a `--notification-item-visual-icon-border-width` `--notification-item-visual-icon-border-color` ring.
3. Content — a column, `--notification-item-content-gap` between its rows:
   - Message — `--notification-item-message-gap` between header and body.
     - Header row (`--notification-item-header-gap`): unread dot (a [Notification Indicator](../atoms/notification-indicator.md), padded `--notification-item-unread-dot-padding-y` above and below; unread only), title (`--notification-item-title-foreground`, font per Read), and metadata (`--notification-item-metadata-gap`, padded `--notification-item-metadata-padding-y`): the timestamp in `--notification-item-timestamp-font` `--notification-item-timestamp-foreground` and the optional urgency [Icon Indicator](../atoms/icon-indicator.md).
     - Body — `--notification-item-body-font` in `--notification-item-body-foreground`; truncates rather than wrapping on.
   - Attachment (optional) — an `attachment` icon at `--notification-item-attachment-icon-size` and the filename in `--notification-item-attachment-font`, both `--notification-item-attachment-foreground`, `--notification-item-attachment-gap` apart.
   - Action slot (optional) — fills the column width, items `--notification-item-actions-gap` apart; holds one [Button](../atoms/button.md) by default.
4. Group indicator (optional) — a bar `--notification-item-group-bar-height` tall in `--notification-item-group-bar-background`, radius `--notification-item-group-bar-radius`, inset `--notification-item-group-bar-inset` from each side and pinned to the bottom edge. It is positioned absolutely, so it never changes the height.

## Variants
| Read | Background | Unread dot | Title font | Group bar |
|---|---|---|---|---|
| false (default) | `--notification-item-container-background-unread` | shown | `--notification-item-title-font-unread` | shown when Group is on |
| true | `--notification-item-container-background-read` (no fill; sits flush on the list) | hidden | `--notification-item-title-font-read` | never |

Leading visual flavour: avatar (default), image, icon (the fallback; it tells sources apart least well).

## States
| State | What changes |
|---|---|
| unread | fill, dot and medium-weight title |
| read | fill, dot and title weight drop away; nothing else changes |
| grouped | the group bar appears at the bottom edge (unread only) |

The item itself has no hover, focus, pressed or disabled state; only the Button in the action slot is interactive and carries its own states. No transition is defined: marking an entry read is the fill disappearing.

## Spacing & Sizing
| Part | Padding | Gap |
|---|---|---|
| Container | `--notification-item-container-padding-y` / `--notification-item-container-padding-x` | `--notification-item-container-gap` |
| Content column | — | `--notification-item-content-gap` |
| Message | — | `--notification-item-message-gap` |
| Header row | — | `--notification-item-header-gap` |
| Unread dot | `--notification-item-unread-dot-padding-y` top and bottom | — |
| Metadata | `--notification-item-metadata-padding-y` top and bottom | `--notification-item-metadata-gap` |
| Attachment | — | `--notification-item-attachment-gap` |
| Action slot | — | `--notification-item-actions-gap` |

Drawn 360 wide; in a list the item fills the list width. Height hugs the content: hiding the attachment or the actions shortens the entry, independently. The leading visual is the same size on all three flavours.

## Properties
| Property | Options | Default |
|---|---|---|
| Read | false, true | false |
| Group | on / off | off |
| Show attachment | on / off | on |
| Show actions | on / off | on |
| Show urgency indicator | on / off | on |
| Leading visual | avatar, image, icon | avatar |
| Title | text | Urgent Message |
| Timestamp | text | Just now |
| Body | text | — |
| Attachment filename | text | — |
| Action slot | slot (one Button by default) | Button |

## Usage
- Keep the title to the event and the body to the detail. The body truncates, so the title must carry the meaning alone.
- Switch off the rows you have no content for; an empty attachment row reads as a failed load.
- Reserve the urgency indicator for the entries that need attention first; on every item it signals nothing.
- Prefer the avatar for people and the image for things with their own artwork; use the icon flavour as the fallback.
- Don't rely on Group on a read entry; the bar shows only while unread.
- Don't use Read as a general status; it has two values, seen and unseen.
- Turn the actions off for purely informational entries; the action slot is the only thing an entry offers to do.

## Accessibility
- Unread is shown by a fill and a small dot, both visual only; expose it in the markup too (for example "Unread" in the accessible name).
- The item has no focus state; only the action Button is focusable. If the whole entry must be reachable, build that in code.
- The leading visual carries no text in any flavour, and the image is a background; name the source in the title or give the image a description.
- The urgency indicator is an icon with no text; give it an accessible name such as "Urgent".
- The body truncates, so make the full message reachable another way (open the item, or expose the full text to assistive tech).
- The border sits at zero width so a high-contrast theme can raise `--notification-item-container-border-width`; by default an entry is bounded by its fill and spacing.

## Claude Prompt
Draw a Zebra notification entry `--notification-item-container-padding-y` / `--notification-item-container-padding-x` padded with `--notification-item-container-radius` corners on a white fill (`--notification-item-container-background-unread`). On the left a `--notification-item-visual-size` circular avatar. To its right: a header row with a small blue unread dot, a `--notification-item-title-font-unread` near-black title, and a `--notification-item-timestamp-font` grey timestamp (`--notification-item-timestamp-foreground`) with a small red clock badge; beneath it one line of `--notification-item-body-font` message text; then a blue (`--notification-item-attachment-foreground`) paperclip icon and filename; then a full-width small primary button. Read entries have no fill, no dot and a regular-weight title. A grouped unread entry shows a thin light-blue bar (`--notification-item-group-bar-background`) along its bottom edge.
