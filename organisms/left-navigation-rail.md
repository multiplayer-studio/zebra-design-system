---
name: Left Navigation Rail
level: organism
status: stable
composes: [../atoms/icon.md]
tokens:
  left-navigation-rail-container-background: '{colors.surface-default}'
  left-navigation-rail-container-gap: '{spacing.spacing-minimum}'
  # item
  left-navigation-rail-item-background-enabled: '{colors.surface-default}'
  left-navigation-rail-item-background-hover: '{colors.surface-hover}'
  left-navigation-rail-item-background-selected: '{colors.surface-selected}'
  left-navigation-rail-item-foreground-enabled: '{colors.main-subtle}'
  left-navigation-rail-item-foreground-hover: '{colors.main-default}'
  left-navigation-rail-item-label-foreground-selected: '{colors.main-subtle}'
  left-navigation-rail-item-icon-foreground-selected: '{colors.main-default}'
  left-navigation-rail-item-focus-ring-width: '{border.border-size-medium}'
  left-navigation-rail-item-focus-ring-color: '{colors.border-primary}'
  left-navigation-rail-item-max-width: '{dimensions.dim-navigation-rail-item-max-width}'
  left-navigation-rail-item-padding-y: '{spacing.spacing-medium}'
  left-navigation-rail-item-padding-x: '{spacing.spacing-large}'
  left-navigation-rail-item-label-font: '{typography.label-small}'
  left-navigation-rail-item-touch-target: '{layout.touch-target-recommended}'
  # related: navigation drawer
  left-navigation-rail-drawer-width: '{dimensions.dim-navigation-drawer-width}'
  left-navigation-rail-drawer-min-width: '{dimensions.dim-navigation-drawer-min-width}'
  left-navigation-rail-drawer-max-width: '{dimensions.dim-navigation-drawer-max-width}'
  left-navigation-rail-drawer-elevation: '{elevation.elevation-6}'
  left-navigation-rail-drawer-duration: '{motion.motion-slower}'
  left-navigation-rail-drawer-item-padding: '{spacing.spacing-medium}'
  left-navigation-rail-drawer-item-font: '{typography.title-medium}'
  left-navigation-rail-drawer-item-background-selected: '{colors.surface-selected}'
  left-navigation-rail-drawer-header-background: '{colors.surface-default-inverse}'
  # related: bottom navigation bar
  left-navigation-rail-bar-border-width: '{border.border-size-small}'
  left-navigation-rail-bar-border-color: '{colors.border-default}'
  left-navigation-rail-bar-item-width-compact: '{dimensions.dim-navigation-bar-item-width-shrink}'
---

# Left Navigation Rail

> Navigation rails let people switch between UI views on large to mid-sized devices.

## Anatomy
1. Rail — vertical column of items, width = widest item.
2. Rail item — navigation link containing:
   - [Icon](../atoms/icon.md) at `--icon-size`; its colour is overridden by the item state (below)
   - label text below (rendered by the rail item itself; wraps, centred)

## Variants
Single variant. The rail holds only rail items.

## States
| State | Background | Icon / text (icon colour is a context override) |
|---|---|---|
| enabled | `--left-navigation-rail-item-background-enabled` | `--left-navigation-rail-item-foreground-enabled` |
| hover | `--left-navigation-rail-item-background-hover` | `--left-navigation-rail-item-foreground-hover` |
| selected | `--left-navigation-rail-item-background-selected` | text `--left-navigation-rail-item-label-foreground-selected`; icon `--left-navigation-rail-item-icon-foreground-selected` |
| disabled | no selected styling; not interactive | – |
| focus | `--left-navigation-rail-item-focus-ring-width` `--left-navigation-rail-item-focus-ring-color` focus ring | – |

## Spacing & Sizing
| Part | Value |
|---|---|
| Item gap | `--left-navigation-rail-container-gap` |
| Item max width | `--left-navigation-rail-item-max-width` |
| Item padding | `--left-navigation-rail-item-padding-y` vertical, `--left-navigation-rail-item-padding-x` horizontal |
| Label | `--left-navigation-rail-item-label-font`, centred, truncated with ellipsis |
| Icon | [Icon](../atoms/icon.md) default size `--icon-size` |

## Properties
Rail item:
| Property | Options | Default |
|---|---|---|
| Icon | icon | none |
| Label | text | none |
| Selected | on / off (current view) | off |
| Disabled | on / off | off |

## Related navigation
- Navigation drawer — modal slide-in panel, width `--left-navigation-rail-drawer-width` (min `--left-navigation-rail-drawer-min-width`, max `--left-navigation-rail-drawer-max-width`), `--left-navigation-rail-drawer-elevation`, anchored left or right, `--left-navigation-rail-drawer-duration` slide; items `--left-navigation-rail-drawer-item-padding` padding, `--left-navigation-rail-drawer-item-font`, active `--left-navigation-rail-drawer-item-background-selected`; dark header/footer `--left-navigation-rail-drawer-header-background`. See [Right Drawer Panel](right-drawer-panel.md).
- Bottom navigation bar — `--left-navigation-rail-bar-border-width` `--left-navigation-rail-bar-border-color` top border, row of grid menu items (see [Bottom Sheet](bottom-sheet.md)), optional dividers/spacers; a compact option shrinks items to `--left-navigation-rail-bar-item-width-compact`.

## Usage
- For large and mid-sized screens; use a bottom navigation bar on small screens.
- Keep labels short (they wrap within `--left-navigation-rail-item-max-width`); always pair icon with label.
- Selected item must be distinguishable beyond colour and announced as the current page.
- Items are `--left-navigation-rail-item-padding-y` + icon + `--left-navigation-rail-item-label-font` line + `--left-navigation-rail-item-padding-y` tall, `--left-navigation-rail-item-max-width` wide — comfortably ≥ `--left-navigation-rail-item-touch-target` touch target.

## Stitch Prompt
Draw a narrow vertical `--left-navigation-rail-container-background` rail on the left edge of a tablet/desktop screen. Stack items `--left-navigation-rail-container-gap` apart, each up to `--left-navigation-rail-item-max-width` wide with `--left-navigation-rail-item-padding-y` top/bottom and `--left-navigation-rail-item-padding-x` side padding: a `--left-navigation-rail-item-foreground-enabled` icon above a centred `--left-navigation-rail-item-label-font` label. The selected item has a `--left-navigation-rail-item-background-selected` background; hovering an item turns it `--left-navigation-rail-item-background-hover` with `--left-navigation-rail-item-foreground-hover` text.
