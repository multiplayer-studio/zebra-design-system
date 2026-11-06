---
name: Pagination
level: molecule
status: stable
composes: [../atoms/icon-button.md, ../atoms/icon.md]
tokens:
  pagination-container-gap: '{spacing.spacing-small}'
  pagination-item-radius-rounded: '{rounded.radius-minimal}'
  pagination-item-radius-sharp: '{rounded.radius-none}'
  # page button
  pagination-page-width: '{spacing.spacing-4xl}'
  pagination-page-height: '{dimensions.dim-pagination-page-height}'
  pagination-page-padding-y: '{spacing.spacing-small}'
  pagination-page-padding-x: '{spacing.spacing-minimum}'
  pagination-page-font: '{typography.body-small}'
  pagination-page-foreground-enabled: '{colors.main-default}'
  pagination-page-background-hover: '{colors.state-default-hover}'
  pagination-page-background-pressed: '{colors.state-default-selected}'
  pagination-page-background-selected: '{colors.state-inverse-selected}'
  pagination-page-foreground-selected: '{colors.main-inverse}'
  pagination-focus-ring-width: '{border.border-size-medium}'
  pagination-focus-ring-color: '{colors.border-primary}'
  # ellipsis (context override: smaller than the icon default)
  pagination-ellipsis-icon-size: '{icon.icon-size-medium}'
---

# Pagination

> Buttons or a dropdown for navigating between pages.

## Anatomy
1. First-page control – [Icon Button](../atoms/icon-button.md) `first_page`, flavor text, size small, shape rounded (Rounded off → sharp). The icon button governs its colours, states, focus ring and size.
2. Previous control – same Icon Button, `chevron_left`.
3. Page buttons – numbers; current page highlighted.
4. Ellipsis – `more_horizontal` [Icon](../atoms/icon.md) where pages are skipped.
5. Next control – same Icon Button, `chevron_right`.
6. Last-page control – same Icon Button, `last_page`.

The dropdown variant: measurements to be defined.

## Variants
| Rounded | Page buttons / controls |
|---|---|
| on (default) | pages `--pagination-item-radius-rounded`; controls Icon Button shape rounded |
| off | pages `--pagination-item-radius-sharp`; controls Icon Button shape sharp |

Sibling count sets how many page numbers appear either side of the current page.

## States
| Element / state | Background | Text / icon |
|---|---|---|
| page – enabled | transparent | `--pagination-page-foreground-enabled` |
| page – hover | `--pagination-page-background-hover` | – |
| page – pressed | `--pagination-page-background-pressed` | – |
| page – current | `--pagination-page-background-selected` | `--pagination-page-foreground-selected` |
| page – focus | `--pagination-focus-ring-width` ring `--pagination-focus-ring-color` | – |
| control – enabled / hover / pressed / focus | Icon Button text flavor | icon per text flavor |
| control – disabled (on first / last page) | Icon Button disabled | – |
| ellipsis | – | Icon default colour `--icon-foreground`; size `--pagination-ellipsis-icon-size` (context override, smaller than the icon default to match the page text) |

## Spacing & Sizing
| Property | Value |
|---|---|
| Gap between all items | `--pagination-container-gap` |
| Page button | `--pagination-page-width` wide × `--pagination-page-height` tall, padding `--pagination-page-padding-y` / `--pagination-page-padding-x`, `--pagination-page-font` |
| Controls | Icon Button size small, `--icon-button-container-size-small` square |
| Ellipsis icon | `--pagination-ellipsis-icon-size` |

## Properties
| Property | Options | Default |
|---|---|---|
| Total pages | number | 10 |
| Current page | number | — |
| Sibling count | number | 1 |
| Rounded | on / off | on |

## Usage
- Use below tables and long lists to move between pages.
- First/previous disable on page 1; next/last disable on the final page.
- The current page uses an inverse fill plus contrast change; also announce it as the current page.
- Controls are `--icon-button-container-size-small` – provide spacing or larger hit areas on touch devices.

## Stitch Prompt
Draw a horizontal pagination row with `--pagination-container-gap` gaps: blue first-page and chevron-left icons, then `--pagination-page-width`-wide page number buttons in `--pagination-page-font` near-black IBM Plex Sans ("1", "2", "3", a grey three-dot ellipsis, "10"), with the current page shown as a near-black (`--pagination-page-background-selected`) `--pagination-item-radius-rounded`-rounded square with off-white (`--pagination-page-foreground-selected`) text, followed by blue chevron-right and last-page icons. Disabled arrows sit on a light grey disabled icon-button square.
