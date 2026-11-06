---
name: Global Header
level: organism
status: stable
composes: [../atoms/button.md, ../atoms/icon-button.md, ../atoms/avatar.md, ../atoms/icon.md, ../molecules/search-bar.md, ../molecules/dropdown-menu.md]
tokens:
  global-header-container-background: '{colors.surface-default}'
  global-header-container-height: '{dimensions.dim-global-header-height}'
  global-header-container-padding: '{spacing.spacing-1-5}'
  global-header-container-gap-compact: '{spacing.spacing-6xl}'
  global-header-breakpoint-compact: '{dimensions.dim-global-header-breakpoint-compact}'
  global-header-text-foreground: '{colors.main-default}'
  global-header-text-subtle-foreground: '{colors.main-subtle}'
  global-header-divider-width: '{border.border-size-small}'
  global-header-divider-color: '{colors.border-default}'
  # logo
  global-header-logo-foreground: '{colors.state-inverse-enabled}'
  global-header-logo-width: '{dimensions.dim-global-header-logo-width}'
  global-header-logo-height: '{dimensions.dim-global-header-logo-height}'
  global-header-logo-artwork-width: '{dimensions.dim-global-header-logo-svg-width}'
  global-header-logo-margin-left: '{spacing.spacing-small}'
  global-header-logo-margin-right: '{spacing.spacing-large}'
  global-header-app-switcher-margin-right: '{spacing.spacing-2-5}'
  global-header-platform-name-font: '{typography.title-medium}'
  # menu and actions
  global-header-menu-item-font: '{typography.label-medium}' # override: Button label font
  global-header-menu-item-padding-left: '{spacing.spacing-small}'
  global-header-actions-gap: '{spacing.spacing-large}'
  global-header-actions-padding-right: '{spacing.spacing-small}'
  global-header-action-icon-foreground: '{icon.icon-foreground}' # override: Icon Button subtle icon colour
  # user info
  global-header-user-name-font: '{typography.label-small}'
  global-header-info-margin-right: '{spacing.spacing-large}'
---

# Global Header

> The topmost, persistent navigation bar across the application — product logo, primary navigation, search and user profile access.

## Anatomy
1. Container — full-width bar, **dark theme by default**.
2. App switcher (optional) — [Icon Button](../atoms/icon-button.md), flavor subtle, size medium.
3. Logo — default Zebra logo (or a custom logo), `--global-header-logo-width` × `--global-header-logo-height`.
4. Platform name — text.
5. Menu items — up to **6** [Buttons](../atoms/button.md), flavor subtle, size small / [Dropdown Menu](../molecules/dropdown-menu.md) buttons, separated from the name by a `--global-header-divider-width` divider.
6. Search (optional) — [Search Bar](../molecules/search-bar.md).
7. Action items — up to **6** [Icon Buttons](../atoms/icon-button.md), flavor subtle, size medium / action-menu buttons, followed by a `--global-header-divider-width` divider.
8. User info — name text + [Avatar](../atoms/avatar.md), purple, size xxs (`--avatar-container-size-xxs`).

The buttons, icon buttons, search bar and avatar govern their own colours, states, radius and focus ring; the header defines its bar, layout, text and dividers, plus the two overrides below.

## Variants
| Theme | Background | Text | Subtle | Divider |
|---|---|---|---|---|
| dark (default) | `--global-header-container-background` (colors-dark) | `--global-header-text-foreground` (colors-dark) | `--global-header-text-subtle-foreground` (colors-dark) | `--global-header-divider-color` (colors-dark) |
| light | `--global-header-container-background` | `--global-header-text-foreground` | `--global-header-text-subtle-foreground` | `--global-header-divider-color` |

Base text/logo fill: `--global-header-logo-foreground` (resolved per theme). Avatar: Avatar purple (`--avatar-purple-container-background`, resolved per theme), initials `--avatar-content-foreground`.

## States
| Condition | Behaviour |
|---|---|
| > 6 menu or action items | extra items hidden |
| 6 menu + 6 action items, viewport ≤ `--global-header-breakpoint-compact` | search bar hidden |
| viewport ≤ `--global-header-breakpoint-compact` | main gap becomes `--global-header-container-gap-compact` |
| Item hover/pressed/focus | inherited from button / icon button |

## Spacing & Sizing
| Part | Value |
|---|---|
| Bar padding | `--global-header-container-padding` |
| Layout | row, groups pushed to each end; right group gap `--global-header-actions-gap` |
| Logo | `--global-header-logo-width` × `--global-header-logo-height` (artwork `--global-header-logo-artwork-width` wide), `--global-header-logo-margin-left` left and `--global-header-logo-margin-right` right margin |
| Platform name | `--global-header-platform-name-font` |
| Menu items | Button subtle (icons and text `--button-subtle-label-foreground`), left padding `--global-header-menu-item-padding-left`. Override: label font `--global-header-menu-item-font` (between the Button's small and medium label fonts, to fit the bar) |
| Action icons | Icon Button subtle, icon `--icon-size`; group right padding `--global-header-actions-padding-right`. Override: icon colour `--global-header-action-icon-foreground` (the Icon default colour rather than the subtle grey, so actions read as primary chrome) |
| Dividers | `--global-header-divider-width` `--global-header-divider-color` |
| User name | `--global-header-user-name-font` |
| Header info right margin | `--global-header-info-margin-right`; app-switcher right margin `--global-header-app-switcher-margin-right` |

## Properties
| Property | Options | Default |
|---|---|---|
| Theme | dark, light | dark |
| Platform name | text | none |
| User name | text | none |
| User initials | text | none |
| App switcher | on / off | off |
| Search bar | on / off | off |
| Rounded | on / off | on |

## Content regions
| Region | Expects |
|---|---|
| Platform name | text |
| Menu items | buttons or dropdown menu buttons |
| Action items | icon buttons or action menu buttons |
| User avatar | avatar, size xxs |
| Logo | custom logo replacing the Zebra logo |

## Usage
- Keep it consistent across all views; it anchors the user in the application.
- Max 6 menu items and 6 action items — anything more is hidden; plan overflow into menus.
- At full load (6 + 6) the search disappears at ≤ `--global-header-breakpoint-compact` — don't rely on it as the only search entry.
- Icon-only actions need accessible labels/tooltips; targets ≥ `--button-touch-target-size-minimum`; focus ring is the Button focus ring (`--button-focus-ring-width` `--button-focus-ring-color`).

## Stitch Prompt
Draw a full-width dark (`--global-header-container-background` from colors-dark) top bar about `--global-header-container-height` tall. On the left: a grid app-switcher icon, a `--global-header-logo-foreground` Zebra logo, the platform name in `--global-header-platform-name-font` `--global-header-text-foreground` text, a thin `--global-header-divider-width` `--global-header-divider-color` divider, then up to six `--global-header-menu-item-font` text menu buttons in `--global-header-text-subtle-foreground`. On the right: an optional rounded search field, up to six subtle icon buttons with `--icon-size` `--global-header-action-icon-foreground` icons (alerts, help, settings), a thin divider, the user's name in `--global-header-user-name-font` text and a small round purple (`--avatar-purple-container-background`) xxs avatar with initials. Spacing between groups is `--global-header-actions-gap`, everything vertically centred.
