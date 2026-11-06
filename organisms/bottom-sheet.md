---
name: Bottom Sheet
level: organism
status: stable
composes: [../molecules/list-item.md, ../atoms/icon.md, ../atoms/indicator.md]
tokens:
  # container
  bottom-sheet-container-padding-top: '{spacing.spacing-small}'
  bottom-sheet-container-padding-x: '{spacing.spacing-small}'
  bottom-sheet-container-padding-bottom: '{spacing.spacing-5xl}'
  bottom-sheet-container-radius: '{rounded.radius-large}'
  bottom-sheet-container-max-height: '{dimensions.dim-bottom-sheet-max-height}'
  bottom-sheet-container-background: '{colors.surface-default}'
  bottom-sheet-container-duration: '{motion.motion-medium}'
  bottom-sheet-scrim-background: '{colors.surface-overlay}'
  # handle
  bottom-sheet-handle-width: '{spacing.spacing-4xl}'
  bottom-sheet-handle-height: '{spacing.spacing-minimum}'
  bottom-sheet-handle-background: '{colors.surface-disabled}'
  bottom-sheet-handle-radius: '{rounded.radius-full}'
  # header
  bottom-sheet-header-padding: '{spacing.spacing-xl}'
  bottom-sheet-header-font: '{typography.title-large}'
  bottom-sheet-header-foreground: '{colors.main-default}'
  # grid
  bottom-sheet-grid-gap: '{spacing.spacing-5xl}'
  bottom-sheet-grid-item-padding: '{spacing.spacing-small}'
  bottom-sheet-grid-item-padding-y-labelled: '{spacing.spacing-small}'
  bottom-sheet-grid-item-padding-x-labelled: '{spacing.spacing-2xl}'
  bottom-sheet-grid-item-gap: '{spacing.spacing-small}'
  bottom-sheet-grid-item-min-width: '{dimensions.dim-bottom-sheet-grid-item-min-width}'
  bottom-sheet-grid-item-foreground: '{colors.main-subtle}'  # also overrides the icon colour
  bottom-sheet-grid-item-foreground-active: '{colors.main-primary}'
  bottom-sheet-grid-label-font: '{typography.label-small}'
  # indicator placement + ring colour override (ring matches the sheet surface)
  bottom-sheet-indicator-offset: '{spacing.spacing-0-5}'
  bottom-sheet-indicator-border-color: '{colors.surface-default}'
  # touch target
  bottom-sheet-touch-target-size-minimum: '{layout.touch-target-ios}'
  bottom-sheet-touch-target-size-recommended: '{layout.touch-target-recommended}'
---

# Bottom Sheet

> Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen.

## Anatomy
1. Container — anchored to bottom, top corners rounded, slides up/down.
2. Drag handle — small pill centred at the top.
3. Header — title text, start- or centre-aligned.
4. Content — either a stack of [List Items](../molecules/list-item.md) (the list item's own tokens govern each row) or a 3-column grid of grid menu items.
5. Grid menu item — [Icon](../atoms/icon.md) at `--icon-size` + label, optional [Indicator](../atoms/indicator.md), type notification (the indicator's own tokens govern its size, fill, radius and ring width).

## Variants
| Variant | Values |
|---|---|
| Header alignment | start (default) \| center |
| Content | list (list items, stretched column) \| grid (grid menu items, 3 columns, gap `--bottom-sheet-grid-gap`) |

## States
| Part | State | Value |
|---|---|---|
| Sheet | expanded | in place |
| Sheet | collapsed | moved down by its full height — off screen; `--bottom-sheet-container-duration` transition |
| Grid item | default | icon + label `--bottom-sheet-grid-item-foreground` (overrides the icon default colour) |
| Grid item | active | icon + label `--bottom-sheet-grid-item-foreground-active` |

## Spacing & Sizing
| Part | Value |
|---|---|
| Container padding | `--bottom-sheet-container-padding-top` / `--bottom-sheet-container-padding-x` / `--bottom-sheet-container-padding-bottom` bottom / `--bottom-sheet-container-padding-x` |
| Top corners | `--bottom-sheet-container-radius` |
| Max height | `--bottom-sheet-container-max-height` |
| Background | `--bottom-sheet-container-background` |
| Handle | `--bottom-sheet-handle-width` wide × `--bottom-sheet-handle-height` tall, `--bottom-sheet-handle-background`, `--bottom-sheet-handle-radius` |
| Header | padding `--bottom-sheet-header-padding`, `--bottom-sheet-header-font`, `--bottom-sheet-header-foreground` |
| Grid item | padding `--bottom-sheet-grid-item-padding` (labelled: `--bottom-sheet-grid-item-padding-y-labelled` / `--bottom-sheet-grid-item-padding-x-labelled`), gap `--bottom-sheet-grid-item-gap`, min-width `--bottom-sheet-grid-item-min-width` |
| Grid label | `--bottom-sheet-grid-label-font` |
| Indicator | [Indicator](../atoms/indicator.md) offset negative `--bottom-sheet-indicator-offset` top/right; ring `--indicator-container-border-width` in `--bottom-sheet-indicator-border-color` (override: ring matches the sheet surface) |
| Scrim (modal use) | `--bottom-sheet-scrim-background` |

## Properties
| Property | Options | Default |
|---|---|---|
| Header alignment | start, center | start |
| Title | text | "Title" |
| Expanded | on / off | on |
| Content | list, grid | list |

Grid menu item: icon, label, active (on / off).

## Usage
- Use for supplementary content/actions related to the current screen; keep primary content in the page.
- List layout for text actions; grid layout for icon-led shortcuts (3 per row).
- Each item ≥ `--bottom-sheet-touch-target-size-minimum`–`--bottom-sheet-touch-target-size-recommended` touch target; provide a visible dismiss path (handle drag, close action or scrim tap).
- Active grid item uses colour — pair it with a clear label.

## Stitch Prompt
Draw a white sheet anchored to the bottom of a phone screen with `--bottom-sheet-container-radius` rounded top corners over a black scrim (`--bottom-sheet-scrim-background`). Centred at the top is a light grey (`--bottom-sheet-handle-background`) pill handle, `--bottom-sheet-handle-width` wide and `--bottom-sheet-handle-height` tall. Below, a `--bottom-sheet-header-font` "Title" in near-black (`--bottom-sheet-header-foreground`), left-aligned (or centred), with `--bottom-sheet-header-padding` padding. Content is either a vertical list of full-width menu rows, or a 3-column grid of icon tiles, each with a `--icon-size` grey (`--bottom-sheet-grid-item-foreground`) icon above a `--bottom-sheet-grid-label-font` label, spaced `--bottom-sheet-grid-gap` apart; the active tile is tinted blue (`--bottom-sheet-grid-item-foreground-active`). Leave `--bottom-sheet-container-padding-bottom` breathing room at the bottom.
