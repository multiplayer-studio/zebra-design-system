---
name: Tabs
level: molecule
status: stable
composes: []
tokens:
  tabs-container-background: '{colors.surface-default}'
  tabs-item-background: '{colors.surface-default}'
  tabs-label-foreground-enabled: '{colors.main-subtle}'
  tabs-label-foreground-hover: '{colors.main-default}'
  tabs-label-foreground-selected: '{colors.main-default}'
  tabs-label-foreground-disabled: '{colors.main-disabled}'
  tabs-indicator-width: '{border.border-size-medium}'
  tabs-indicator-color: '{colors.border-primary}'
  tabs-item-padding-y: '{spacing.spacing-medium}'
  tabs-item-padding-x: '{spacing.spacing-large}'
  tabs-label-font: '{typography.title-medium}'
  tabs-item-height: '{spacing.spacing-7xl}'
  tabs-item-height-touch-minimum: '{layout.touch-target-ios}'
  tabs-container-gap: '{spacing.spacing-none}'
---

# Tabs

> Tabs are used to show different views or sections of content within the same context.

## Anatomy
1. Tab bar – horizontal row, left-aligned, white background.
2. Tab item – text label, no wrapping.
3. Active indicator – `--tabs-indicator-width` bottom border on the active tab.

## Variants
Single text variant. A dropdown tab variant is planned; measurements to be defined.

## States
| State | Text | Indicator |
|---|---|---|
| enabled | `--tabs-label-foreground-enabled` | none |
| hover / pressed | `--tabs-label-foreground-hover` | none |
| active | `--tabs-label-foreground-selected` | `--tabs-indicator-width` solid `--tabs-indicator-color` bottom border |
| disabled | `--tabs-label-foreground-disabled` | none |

Background: `--tabs-container-background` on the bar and `--tabs-item-background` on items.

## Spacing & Sizing
| Property | Value |
|---|---|
| Tab padding | `--tabs-item-padding-y` `--tabs-item-padding-x` |
| Tab font | `--tabs-label-font` |
| Tab height | `--tabs-item-height` (`--tabs-item-padding-y` + `--tabs-label-font` line height + `--tabs-item-padding-y`); active tab adds the `--tabs-indicator-width` border below |
| Tab width | fits label |
| Gap between tabs | `--tabs-container-gap` |

## Properties
| Property | Options | Default |
|---|---|---|
| Tab label | text | — |
| Active | on / off | off |
| Disabled | on / off | off |
| Rounded | on / off | on |

## Usage
- Use for switching between related sections in the same context; for mutually exclusive views of the same data consider [Segmented Control](./segmented-control.md).
- Exactly one tab active; keep labels short (one or two words) — they do not wrap.
- Active state uses both a blue underline and darker text, not colour alone.
- Tab height (`--tabs-item-height`, = `--tabs-item-height-touch-minimum`) meets touch-target guidance.

## Stitch Prompt
Draw a white horizontal tab bar with left-aligned tabs labelled in `--tabs-label-font` IBM Plex Sans, each with `--tabs-item-padding-y` vertical and `--tabs-item-padding-x` horizontal padding. Inactive tabs are mid grey (`--tabs-label-foreground-enabled`); the active tab has near-black text and a `--tabs-indicator-width` soft-blue (`--tabs-indicator-color`) underline along its bottom edge; a disabled tab is light grey (`--tabs-label-foreground-disabled`).
