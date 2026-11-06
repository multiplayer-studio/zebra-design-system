---
name: Accordion
level: molecule
status: stable
composes: [../atoms/icon.md]
tokens:
  # container
  accordion-container-background-enabled: '{colors.surface-default}'
  accordion-container-border-width: '{border.border-size-small}'
  accordion-in-card-container-border-color: '{colors.border-subtle}'
  accordion-container-radius-rounded: '{rounded.radius-rounded}'
  accordion-container-radius-sharp: '{rounded.radius-none}'
  accordion-divider-border-width: '{border.border-size-small}'
  # header
  accordion-header-height: '{dimensions.dim-accordion-header-height}'
  accordion-header-background-hover: '{colors.surface-hover}'
  accordion-title-foreground: '{colors.main-default}'
  accordion-title-font: '{typography.title-large}'
  accordion-title-padding-y: '{spacing.spacing-large}'
  accordion-title-padding-left: '{spacing.spacing-large}'
  accordion-trailing-icon-padding-right: '{spacing.spacing-large}'
  accordion-trailing-icon-foreground-selected: '{colors.main-primary}'
  accordion-leading-icon-background-hover: '{colors.surface-selected-hover}'
  accordion-leading-icon-radius: '{rounded.radius-rounded}'
  accordion-leading-icon-padding-y: '{spacing.spacing-medium}'
  accordion-leading-icon-padding-right: '{spacing.spacing-small}'
  accordion-leading-icon-padding-left: '{spacing.spacing-large}'
  accordion-header-extra-margin-x: '{spacing.spacing-large}'
  accordion-header-extra-margin-bottom: '{spacing.spacing-large}'
  accordion-header-extra-margin-top: '{spacing.spacing-none}'
  # body
  accordion-body-font: '{typography.body-small}'
  accordion-body-padding-y: '{spacing.spacing-none}'
  accordion-body-padding-x: '{spacing.spacing-large}'
  accordion-body-padding-y-expanded: '{spacing.spacing-large}'
  accordion-body-duration: '{motion.motion-medium}'
  accordion-body-easing: '{motion.easing-out}'
---

# Accordion

> The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.

## Anatomy
1. Accordion container – white block; optional card border (in-card).
2. Item header row – title + trailing [Icon](../atoms/icon.md).
3. Trailing icon – [Icon](../atoms/icon.md) at its default size and colour: `expand_more` (expandable; rotates 180° open), `chevron_right` (navigation), or `check_mark` (selectable & selected). Context override: the selected `check_mark` is drawn in `--accordion-trailing-icon-foreground-selected` to mark selection.
4. Leading chevron (selectable items with content) – [Icon](../atoms/icon.md) `chevron_right` in its own tap zone, rotates 90° when expanded.
5. Header extra – optional content under the title.
6. Body – item content, animated open/closed (`--accordion-body-duration` `--accordion-body-easing`).
7. Dividers – `--accordion-divider-border-width` lines between items (in card mode).

## Variants
| Item type | Tap behaviour | Trailing icon |
|---|---|---|
| expandable (default) | whole row toggles | `expand_more` |
| selectable (no content) | whole row toggles selection | `check_mark` when selected |
| selectable + content | left chevron expands, rest selects | leading `chevron_right` + `check_mark` |
| navigation | whole row navigates; body hidden | `chevron_right` |

| Container | Border | Radius |
|---|---|---|
| default | `--accordion-container-border-width` transparent | `--accordion-container-radius-rounded` when rounded |
| in-card | `--accordion-container-border-width` `--accordion-in-card-container-border-color` + `--accordion-divider-border-width` dividers between items | `--accordion-container-radius-rounded` when rounded, else `--accordion-container-radius-sharp` |

## States
| State | Style |
|---|---|
| enabled | bg `--accordion-container-background-enabled`, title `--accordion-title-foreground` |
| header hover | `--accordion-header-background-hover` |
| leading chevron hover | `--accordion-leading-icon-background-hover`, radius `--accordion-leading-icon-radius` |
| expanded | trailing chevron rotated 180° (leading 90°); body visible |
| selected | `check_mark` icon `--accordion-trailing-icon-foreground-selected` |

## Spacing & Sizing
| Property | Value |
|---|---|
| Title font | `--accordion-title-font` |
| Title margin | `--accordion-title-padding-y` top/bottom → `--accordion-header-height` header |
| Title left margin (non-selectable) | `--accordion-title-padding-left` |
| Trailing icon right margin | `--accordion-trailing-icon-padding-right` |
| Leading chevron padding | `--accordion-leading-icon-padding-y` top/bottom, `--accordion-leading-icon-padding-right` right, `--accordion-leading-icon-padding-left` left |
| Body padding | `--accordion-body-padding-y` `--accordion-body-padding-x`; `--accordion-body-padding-y-expanded` top/bottom when open |
| Header extra margin | `--accordion-header-extra-margin-x` sides, `--accordion-header-extra-margin-bottom` bottom, `--accordion-header-extra-margin-top` top |

## Properties
**Accordion**
| Property | Options | Default |
|---|---|---|
| In card | on / off | off |
| Expand multiple | on / off | off (one open at a time) |
| Select multiple | on / off | off |
| Rounded | on / off | on |

**Item**
| Property | Options | Default |
|---|---|---|
| Title | text | — |
| Type | expandable, selectable, navigation | expandable |
| Expanded | on / off | off |
| Selected | on / off | off |
| Header extra content | optional | none |

## Usage
- Use to progressively disclose related sections; keep titles short and descriptive.
- Default allows one open item; enable expand multiple when users compare sections.
- Use in-card when the accordion stands alone on a surface.
- Header rows are `--accordion-header-height`, a comfortable touch target; ensure items are keyboard operable and expose expanded state.

## Stitch Prompt
Draw a white card with `--accordion-container-radius-rounded` corners and a `--accordion-container-border-width` very light grey (`--accordion-in-card-container-border-color`) border containing a vertical stack of `--accordion-header-height` rows separated by `--accordion-divider-border-width` light grey lines. Each row has a `--accordion-title-font` near-black IBM Plex Sans title `--accordion-title-padding-left` from the left and a grey down-chevron `--accordion-trailing-icon-padding-right` from the right. The second row is expanded: its chevron points up and below it sits `--accordion-body-font` body text with `--accordion-body-padding-x` padding. Hovered rows tint pale grey-blue (`--accordion-header-background-hover`).
