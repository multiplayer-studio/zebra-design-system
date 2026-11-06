---
name: Breadcrumb
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # item
  breadcrumb-item-label-foreground-enabled: '{colors.main-subtle}'
  breadcrumb-item-label-foreground-hover: '{colors.main-primary}'
  breadcrumb-item-label-foreground-pressed: '{colors.main-default}'
  breadcrumb-item-icon-foreground-enabled: '{colors.main-subtle}'
  breadcrumb-item-icon-foreground-hover: '{colors.main-primary}'
  breadcrumb-item-icon-foreground-pressed: '{colors.main-default}'
  breadcrumb-item-icon-size: '{icon.icon-size-medium}'
  breadcrumb-item-icon-margin: '{spacing.spacing-small}'
  # separator
  breadcrumb-separator-foreground: '{colors.main-subtle}'
  breadcrumb-separator-size: '{icon.icon-size-small}'
  breadcrumb-separator-margin: '{spacing.spacing-small}'
  # more button
  breadcrumb-more-button-background-enabled: '{colors.surface-warm}'
  breadcrumb-more-button-background-hover: '{colors.surface-hover}'
  breadcrumb-more-button-background-pressed: '{colors.surface-selected}'
  breadcrumb-more-button-border-width: '{border.border-size-small}'
  breadcrumb-more-button-border-color: '{colors.border-default}'
  breadcrumb-more-button-radius-rounded: '{rounded.radius-minimal}'
  breadcrumb-more-button-radius-sharp: '{rounded.radius-none}'
  breadcrumb-more-button-padding-y: '{spacing.spacing-minimum}'
  breadcrumb-more-button-padding-x: '{spacing.spacing-small}'
  breadcrumb-more-button-icon-size: '{spacing.spacing-medium}'
---

# Breadcrumb

> The breadcrumb is a secondary navigation pattern that helps a user understand the hierarchy among levels and navigate back through them.

## Anatomy
1. Container – row that wraps when space runs out.
2. Item – link with optional leading [Icon](../atoms/icon.md) + label.
3. Separator – `chevron_right` glyph before every item except the first.
4. More button (when truncated) – small bordered button with a `more_horizontal` [icon](../atoms/icon.md) replacing the hidden middle items. It is breadcrumb-specific (warm fill, compact padding), not an Icon Button.

Icons (item icon, separator glyph, more icon) are [Icon](../atoms/icon.md) glyphs with context overrides: sizes smaller than the icon default (`--breadcrumb-item-icon-size`, `--breadcrumb-separator-size`, `--breadcrumb-more-button-icon-size`) to sit with the text, and colours that follow the link state (`--breadcrumb-item-icon-foreground-enabled` …) and the subtle separator colour (`--breadcrumb-separator-foreground`).

## Variants
| Variant | Behaviour |
|---|---|
| full | All items shown |
| truncated (max items = n) | First item + last n−1 items shown; middle items collapse into the more button (minimum 2 items shown) |

| Rounded | Separator / more icon font | More button radius |
|---|---|---|
| on | zeta-icons-round | `--breadcrumb-more-button-radius-rounded` |
| off | zeta-icons-sharp | `--breadcrumb-more-button-radius-sharp` |

## States
| State | Item text | Item icon |
|---|---|---|
| enabled | `--breadcrumb-item-label-foreground-enabled` | `--breadcrumb-item-icon-foreground-enabled` |
| hover | `--breadcrumb-item-label-foreground-hover` | `--breadcrumb-item-icon-foreground-hover` |
| pressed | `--breadcrumb-item-label-foreground-pressed` | `--breadcrumb-item-icon-foreground-pressed` |

| More button | Background | Border |
|---|---|---|
| enabled | `--breadcrumb-more-button-background-enabled` | `--breadcrumb-more-button-border-width` `--breadcrumb-more-button-border-color` |
| hover | `--breadcrumb-more-button-background-hover` | `--breadcrumb-more-button-border-width` transparent |
| pressed | `--breadcrumb-more-button-background-pressed` | – |

Separator colour `--breadcrumb-separator-foreground`.

## Spacing & Sizing
| Property | Value |
|---|---|
| Separator glyph | `--breadcrumb-separator-size`, `--breadcrumb-separator-margin` margin each side |
| Item icon | `--breadcrumb-item-icon-size` square, `--breadcrumb-item-icon-margin` right margin |
| More button | padding `--breadcrumb-more-button-padding-y` `--breadcrumb-more-button-padding-x`, icon `--breadcrumb-more-button-icon-size` |
| Item font | inherited from context |

## Properties
| Property | Options | Default |
|---|---|---|
| Max items | number (0 = no truncation) | 0 |
| Rounded | on / off | on |
| Item label | text | — |
| Item leading icon | any icon | none |
| Item link | destination | — |

## Usage
- Use for hierarchies of three or more levels; the first item is usually Home (often with a home icon).
- The last item is the current page.
- Truncate long trails; the more button reveals the hidden levels.
- Expose the trail as a navigation landmark labelled "Breadcrumb" for assistive tech.

## Stitch Prompt
Draw a single-line breadcrumb trail: a `--breadcrumb-item-icon-size` grey home icon followed by "Home", then small `--breadcrumb-separator-size` grey chevron-right separators with `--breadcrumb-separator-margin` space on each side between grey (`--breadcrumb-item-label-foreground-enabled`) link labels such as "Section" and "Current page". Hovered links turn blue (`--breadcrumb-item-label-foreground-hover`). In a truncated version, a small light grey (`--breadcrumb-more-button-background-enabled`) button with a `--breadcrumb-more-button-border-width` `--breadcrumb-more-button-border-color` border, `--breadcrumb-more-button-radius-rounded` corners and a three-dot icon replaces the middle levels.
