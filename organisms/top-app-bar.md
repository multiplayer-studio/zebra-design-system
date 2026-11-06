---
name: Top App Bar
level: organism
status: stable
composes: [../atoms/icon-button.md, ../atoms/icon.md, ../atoms/avatar.md, ../molecules/search-bar.md]
tokens:
  top-app-bar-container-background: '{colors.surface-default}'
  top-app-bar-container-padding-y: '{spacing.spacing-xl}'
  top-app-bar-container-padding-x: '{spacing.spacing-large}'
  top-app-bar-container-height: '{spacing.spacing-9xl}'
  top-app-bar-extended-row-gap: '{spacing.spacing-large}'
  top-app-bar-container-gap: '{spacing.spacing-large}'
  top-app-bar-title-font: '{typography.body-large}'
  top-app-bar-title-foreground: '{colors.main-default}'
  top-app-bar-avatar-gap: '{spacing.spacing-small}'
  top-app-bar-trailing-gap: '{spacing.spacing-large}'
---

# Top App Bar

> Top app bars provide content and actions related to the current screen.

## Anatomy
1. Container — header surface.
2. Leading — navigation [Icon Button](../atoms/icon-button.md), size medium, with an [Icon](../atoms/icon.md) at `--icon-size` (e.g. hamburger_menu, back).
3. Title — text, optionally with an [Avatar](../atoms/avatar.md), size xxxs; or a [Search Bar](../molecules/search-bar.md).
4. Trailing — action [Icon Buttons](../atoms/icon-button.md), size medium (e.g. world, love, more_vertical). The icon button's own tokens govern colours, states, radius, focus ring and touch target.

## Variants
| Variant | Layout |
|---|---|
| default | one row: leading · title (fills, start-aligned) · trailing |
| centered | title content centred between leading and trailing |
| extended | title moves to a second row below the leading/trailing row |
| search | a search bar fills the title area, without its search icon and with a transparent border |

## States
The bar itself is static; leading/trailing controls carry their own hover/pressed/focus states (see icon button).

## Spacing & Sizing
| Part | Value |
|---|---|
| Background | `--top-app-bar-container-background` |
| Padding | `--top-app-bar-container-padding-y` vertical, `--top-app-bar-container-padding-x` horizontal |
| Row gap (extended) | `--top-app-bar-extended-row-gap` |
| Item gap within row | `--top-app-bar-container-gap`, spread to the ends, centred vertically |
| Title type | `--top-app-bar-title-font`, `--top-app-bar-title-foreground` |
| Height | fits content (one row ≈ `--top-app-bar-container-padding-y` + `--icon-size` icon + `--top-app-bar-container-padding-y` = `--top-app-bar-container-height`) |
| Title avatar | [Avatar](../atoms/avatar.md) at `--avatar-container-size-xxxs`, `--top-app-bar-avatar-gap` gap to text |
| Trailing icon gap | `--top-app-bar-trailing-gap` |

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | default, centered, extended, search | default |
| Leading | icon button | none |
| Title | text (+ optional avatar) or search bar | — |
| Trailing actions | icon buttons | none |

## Usage
- Title and actions relate to the current screen only; app-wide navigation belongs in the [Global Header](global-header.md).
- Keep trailing actions few (≈3); overflow into a more_vertical menu.
- Icon-only actions need accessible labels; the icon buttons keep their own touch target and focus ring.

## Stitch Prompt
Draw a white mobile top bar with `--top-app-bar-container-padding-y` vertical and `--top-app-bar-container-padding-x` horizontal padding. On the left a `--icon-size` hamburger menu icon, then a small round avatar and the screen title "Title" in `--top-app-bar-title-font` near-black (`--top-app-bar-title-foreground`) IBM Plex Sans. On the right, three `--icon-size` icons (globe, heart, vertical dots) spaced `--top-app-bar-trailing-gap` apart. For the extended version, keep the icons on the top row and place a larger title on its own row `--top-app-bar-extended-row-gap` below; for centred, centre the title between the icons.
