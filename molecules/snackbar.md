---
name: Snackbar
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/button.md]
tokens:
  snackbar-container-radius-rounded: '{rounded.radius-minimal}'
  snackbar-container-radius-full: '{rounded.radius-full}'
  snackbar-container-radius-sharp: '{rounded.radius-none}'
  snackbar-container-padding-y: '{spacing.spacing-medium}'
  snackbar-container-padding-x: '{spacing.spacing-large}'
  snackbar-container-gap: '{spacing.spacing-small}'
  snackbar-container-height: '{spacing.spacing-8xl}'
  snackbar-content-gap: '{spacing.spacing-large}'
  snackbar-label-line-height: '{spacing.spacing-2xl}'
  snackbar-default-close-icon-foreground: '{colors.main-inverse}'
  # default
  snackbar-default-container-background: '{colors.surface-default-inverse}'
  snackbar-default-label-foreground: '{colors.main-inverse}'
  snackbar-default-icon-foreground: '{colors.main-inverse}'
  snackbar-default-action-foreground: '{colors.main-primary}'
  # positive
  snackbar-positive-container-background: '{colors.surface-positive-subtle}'
  snackbar-positive-label-foreground: '{colors.main-default}'
  snackbar-positive-icon-foreground: '{colors.main-positive}'
  snackbar-positive-action-foreground: '{colors.main-default}'
  # info
  snackbar-info-container-background: '{colors.surface-info-subtle}'
  snackbar-info-label-foreground: '{colors.main-default}'
  snackbar-info-icon-foreground: '{colors.main-info}'
  snackbar-info-action-foreground: '{colors.main-default}'
  # warning
  snackbar-warning-container-background: '{colors.surface-warning-subtle}'
  snackbar-warning-label-foreground: '{colors.main-default}'
  snackbar-warning-icon-foreground: '{colors.main-warning}'
  snackbar-warning-action-foreground: '{colors.main-default}'
  # negative
  snackbar-negative-container-background: '{colors.surface-negative-subtle}'
  snackbar-negative-label-foreground: '{colors.main-default}'
  snackbar-negative-icon-foreground: '{colors.main-negative}'
  snackbar-negative-action-foreground: '{colors.main-default}'
  # view
  snackbar-view-container-background: '{colors.surface-primary-subtle}'
  snackbar-view-label-foreground: '{colors.main-default}'
  snackbar-view-icon-foreground: '{colors.main-primary}'
  snackbar-view-action-foreground: '{colors.main-default}'
---

# Snackbar

> Snackbars provide brief messages about app processes at the bottom of the screen. Contextual snackbars provide brief messages in relation to an action that has been taken by the user.

## Anatomy
1. Container – horizontal bar, content left, actions right.
2. Leading icon (optional) – [Icon](../atoms/icon.md).
3. Message – text.
4. Action (optional) – [Button](../atoms/button.md), flavor text, size medium (font `--button-label-font-medium`). Context override: its label colour follows the snackbar status (Action text column below) so it stays legible on the tinted / inverse background, and it has no hover background.
5. Close button (optional) – `cancel` [icon](../atoms/icon.md) (or a chosen close icon).

Icon colours (Icon column below, and `--snackbar-default-close-icon-foreground`) are context overrides of the icon default colour: status-coloured on tinted backgrounds, light on the inverse default background.

## Variants
| Status | Background | Text | Icon | Action text |
|---|---|---|---|---|
| default | `--snackbar-default-container-background` | `--snackbar-default-label-foreground` | `--snackbar-default-icon-foreground` | `--snackbar-default-action-foreground` |
| positive | `--snackbar-positive-container-background` | `--snackbar-positive-label-foreground` | `--snackbar-positive-icon-foreground` | `--snackbar-positive-action-foreground` |
| info | `--snackbar-info-container-background` | `--snackbar-info-label-foreground` | `--snackbar-info-icon-foreground` | `--snackbar-info-action-foreground` |
| warning | `--snackbar-warning-container-background` | `--snackbar-warning-label-foreground` | `--snackbar-warning-icon-foreground` | `--snackbar-warning-action-foreground` |
| negative | `--snackbar-negative-container-background` | `--snackbar-negative-label-foreground` | `--snackbar-negative-icon-foreground` | `--snackbar-negative-action-foreground` |
| view | `--snackbar-view-container-background` | `--snackbar-view-label-foreground` | `--snackbar-view-icon-foreground` | `--snackbar-view-action-foreground` |

| Shape | Radius |
|---|---|
| rounded (default) | `--snackbar-container-radius-rounded` |
| full | `--snackbar-container-radius-full` (pill) |
| sharp | `--snackbar-container-radius-sharp` |

## States
Static surface. Close icon in default status is `--snackbar-default-close-icon-foreground`. Action and close buttons have transparent backgrounds and no hover styling.

## Spacing & Sizing
| Property | Value |
|---|---|
| Padding | `--snackbar-container-padding-y` `--snackbar-container-padding-x` |
| Gap icon ↔ text, action ↔ close | `--snackbar-content-gap` |
| Gap between content and actions | `--snackbar-container-gap` |
| Action font | Button size medium, `--button-label-font-medium` |
| Height (one line with action) | `--snackbar-container-padding-y` + `--snackbar-label-line-height` line + `--snackbar-container-padding-y` (= `--snackbar-container-height`) |

## Properties
| Property | Options | Default |
|---|---|---|
| Status | default, positive, negative, info, warning, view | default |
| Leading icon | icon | none |
| Message | text | none |
| Action label | text | none |
| Close button | on / off | off |
| Close icon | icon | cancel |
| Shape | sharp, rounded, full | rounded |

## Usage
- Show at the bottom of the screen for brief, non-blocking feedback; one snackbar at a time.
- Keep messages to a single short sentence; at most one action.
- Use status colours consistently and include an icon so meaning is not colour-only.
- Give the close button an accessible label; don't put critical information only in a snackbar.

## Stitch Prompt
Draw a horizontal toast bar at the bottom of a screen with `--snackbar-container-radius-rounded` corners, `--snackbar-container-padding-y` vertical and `--snackbar-container-padding-x` horizontal padding: `--snackbar-default-container-background` background, a `--snackbar-default-icon-foreground` icon and `--snackbar-default-label-foreground` message "Message sent" on the left, and on the right a `--snackbar-default-action-foreground` `--button-label-font-medium` "Undo" text action and a `--snackbar-default-close-icon-foreground` circular close icon, `--snackbar-content-gap` apart. Status variants use pale tinted backgrounds (`--snackbar-positive-container-background`, `--snackbar-info-container-background`, `--snackbar-warning-container-background`, `--snackbar-negative-container-background`, `--snackbar-view-container-background`) with `--snackbar-positive-label-foreground` text, `--snackbar-positive-action-foreground` action text and a matching coloured icon.
