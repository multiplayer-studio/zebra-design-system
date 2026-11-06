---
name: Status Badge
level: molecule
status: stable
composes: [../atoms/indicator.md, ../atoms/avatar.md, ../atoms/icon.md]
tokens:
  status-badge-ring-width: '{dimensions.dim-avatar-badge-border-scale}'
---

# Status Badge

> Status badges used to show more information on an Avatar. Indicators are used to show the status of a user or any messages/notifications they might have.

## Anatomy
1. Host [Avatar](../atoms/avatar.md) – badge sits in its status position, anchored bottom-right, wrapped in a white ring (avatar size × `--status-badge-ring-width`).
2. Badge – an [Indicator](../atoms/indicator.md) (notification or icon type). The indicator governs its colours, border, radius, font and sizes.
3. Content – a number (notification), an [Icon](../atoms/icon.md) (icon type), or nothing (small dot), as rendered by the indicator.

## Variants
| Type | Badge |
|---|---|
| notification (default) | Indicator type notification (`--indicator-notification-container-background` fill) |
| icon | Indicator type icon (`--indicator-icon-container-background` fill) |

| Size | Badge |
|---|---|
| small | Indicator size small – `--indicator-container-size-small` dot, no content |
| medium (default) | Indicator size medium – `--indicator-container-size-medium` square |
| large – icon | Indicator size large – `--indicator-icon-container-size-large` square |
| large – notification | Indicator large notification lozenge (`--indicator-notification-container-width-large` × `--indicator-notification-container-height-large` minus the border, `--indicator-notification-container-radius-large` corners) |

A notification badge grows to the large size for counts above 9; counts above 99 display "99+".

## States
Static, non-interactive. Rounded: circles use the indicator's `--indicator-container-radius`.

## Spacing & Sizing
| Property | Value |
|---|---|
| Ring around the badge | avatar size × `--status-badge-ring-width` |
| Aspect ratio | 1:1 except large notification |
| Position on avatar | flush with the bottom-right corner |

## Properties
| Property | Options | Default |
|---|---|---|
| Type | notification, icon | notification |
| Count | non-negative number (notification) | none |
| Icon | any icon (icon type) | none |
| Size | small, medium, large | medium |
| Rounded | on / off | on |

## Usage
- Use notification badges for unread counts, icon badges for presence/status on avatars.
- Do not rely on colour alone — pair with text or an accessible label (e.g. "3 unread messages", "Available").
- Small dots carry no text; reserve them for simple "new" signals.

## Stitch Prompt
Draw a medium circular avatar with a small badge overlapping its bottom-right edge: either a `--indicator-container-size-medium` red (`--indicator-notification-container-background`) circle with a crisp `--indicator-container-border-width` white border, or for counts above nine, a red rounded lozenge (`--indicator-notification-container-radius-large` corners) with a white "12" in `--indicator-notification-label-font` text. An alternative status badge is a `--indicator-icon-container-size-large` blue (`--indicator-icon-container-background`) circle with a `--indicator-container-border-width` off-white border and a tiny white check icon.
