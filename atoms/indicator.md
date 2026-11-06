---
name: Indicator
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  indicator-container-radius: '{rounded.radius-full}'
  indicator-container-border-width: '{border.border-size-medium}'
  indicator-container-size-small: '{spacing.spacing-small}'
  indicator-container-size-medium: '{spacing.spacing-medium}'
  # notification
  indicator-notification-container-background: '{colors.main-negative}'
  indicator-notification-container-border-color: '{colors.border-pure}'
  indicator-notification-label-foreground: '{colors.state-default-enabled}'
  indicator-notification-label-font: '{typography.label-indicator}'
  indicator-notification-container-height-large: '{spacing.spacing-large}'
  indicator-notification-container-width-large: '{spacing.spacing-3xl}'
  indicator-notification-container-radius-large: '{rounded.radius-minimal}'
  indicator-notification-ring-width-large: '{border.border-size-small}'
  indicator-notification-ring-color-large: '{colors.border-pure}'
  indicator-notification-ring-margin-large: '{border.border-size-small}'
  # icon
  indicator-icon-container-background: '{colors.main-primary}'
  indicator-icon-container-border-color: '{colors.main-inverse}'
  indicator-icon-content-foreground: '{colors.state-default-enabled}'
  indicator-icon-container-size-large: '{spacing.spacing-xl}'
  indicator-icon-content-size-medium: '{spacing.spacing-small}'
  indicator-icon-content-size-large: '{spacing.spacing-medium}'
---

# Indicator

> Indicators are used to show the status of a user or any messages/notifications they might have.

## Anatomy
1. Container — circle (`--indicator-container-radius`), `--indicator-container-border-width` light border, centred content.
2. Content — notification: a number (capped at "99+"); icon: an [icon](../atoms/icon.md). Small size has no content (dot only). The number or icon is **perfectly centred** in the container, horizontally and vertically, at every size. At medium the number's line height (`--indicator-notification-label-font`, 14px) is taller than the box (`--indicator-container-size-medium`, 12px), so centre the content on the box (e.g. flex centring) and never let it flow from the top of the box, which pushes it down and to the right.

The [icon](../atoms/icon.md) is a deliberate context override: it is smaller than the icon default (`--indicator-icon-content-size-medium` / `--indicator-icon-content-size-large`) to fit the badge, and drawn in `--indicator-icon-content-foreground` on the coloured fill.

## Variants
| Type | Background | Border | Content |
|---|---|---|---|
| notification (default) | `--indicator-notification-container-background` | `--indicator-container-border-width` `--indicator-notification-container-border-color` | `--indicator-notification-label-foreground`, `--indicator-notification-label-font` |
| icon | `--indicator-icon-container-background` | `--indicator-container-border-width` `--indicator-icon-container-border-color` | icon `--indicator-icon-content-foreground` |

| Size | Box | Content |
|---|---|---|
| small | `--indicator-container-size-small` square | none (dot) |
| medium (default) | `--indicator-container-size-medium` square | icon `--indicator-icon-content-size-medium` / single digit |
| large — icon | `--indicator-icon-container-size-large` square | icon `--indicator-icon-content-size-large` |
| large — notification | (`--indicator-notification-container-height-large` minus `--indicator-container-border-width`) tall × (`--indicator-notification-container-width-large` minus `--indicator-container-border-width`) wide, `--indicator-notification-container-radius-large` rounded rectangle, no border but a `--indicator-notification-ring-width-large` `--indicator-notification-ring-color-large` ring + `--indicator-notification-ring-margin-large` margin | 2+ digits / "99+" |

A notification indicator grows to the large size when its count is above 9.

## States
Static, non-interactive. No hover/focus/disabled states.

## Spacing & Sizing
- Border `--indicator-container-border-width` (small/medium, icon large).
- Square except the large notification lozenge.
- Typically overlapped on the corner of an [avatar](../atoms/avatar.md) (status position), icon button or nav item.

## Properties
| Property | Options | Default |
|---|---|---|
| Type | notification, icon | notification |
| Count | number (above 99 shows "99+") | none |
| Icon | icon | none |
| Size | small, medium, large | medium |

## Usage
- Notification indicators show unread counts; icon indicators show user status/role.
- Keep counts short (99+ cap); use the small dot when the count doesn't matter.
- Provide the count/status in the accessible name of the parent element — the dot alone conveys nothing to screen readers or colour-blind users.

## Stitch Prompt
Draw indicators as tiny badges overlapping the corner of another element. A notification indicator is a `--indicator-notification-container-background` circle with a `--indicator-container-border-width` `--indicator-notification-container-border-color` outline and a `--indicator-notification-label-foreground` `--indicator-notification-label-font` number; `--indicator-container-size-medium` across for a single digit, becoming a (`--indicator-notification-container-width-large` minus `--indicator-container-border-width`) wide by (`--indicator-notification-container-height-large` minus `--indicator-container-border-width`) tall `--indicator-notification-container-background` lozenge with `--indicator-notification-container-radius-large` corners for larger counts like "99+". An icon indicator is a `--indicator-icon-container-background` circle with a `--indicator-icon-container-border-color` outline and a tiny `--indicator-icon-content-foreground` icon (`--indicator-container-size-medium` circle at medium, `--indicator-icon-container-size-large` at large). The small size is just a `--indicator-container-size-small` dot with no content.
