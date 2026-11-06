---
name: In Page Banner
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ../atoms/button.md]
tokens:
  in-page-banner-container-border-width: '{border.border-size-small}'
  in-page-banner-text-foreground: '{colors.main-default}'
  # default
  in-page-banner-default-container-background: '{colors.surface-default}'
  in-page-banner-default-container-border-color: '{colors.border-default}'
  # info
  in-page-banner-info-container-background: '{colors.surface-info-subtle}'
  in-page-banner-info-container-border-color: '{colors.border-info}'
  in-page-banner-info-icon-foreground: '{colors.main-info}'
  # positive
  in-page-banner-positive-container-background: '{colors.surface-positive-subtle}'
  in-page-banner-positive-container-border-color: '{colors.border-positive}'
  in-page-banner-positive-icon-foreground: '{colors.main-positive}'
  # warning
  in-page-banner-warning-container-background: '{colors.surface-warning-subtle}'
  in-page-banner-warning-container-border-color: '{colors.border-warning}'
  in-page-banner-warning-icon-foreground: '{colors.main-warning}'
  # negative
  in-page-banner-negative-container-background: '{colors.surface-negative-subtle}'
  in-page-banner-negative-container-border-color: '{colors.border-negative}'
  in-page-banner-negative-icon-foreground: '{colors.main-negative}'
  # shape
  in-page-banner-container-radius-rounded: '{rounded.radius-minimal}'
  in-page-banner-container-radius-sharp: '{rounded.radius-none}'
  # close button
  in-page-banner-close-container-background: '{colors.surface-basic}'
  in-page-banner-close-icon-foreground: '{colors.main-default}'
  in-page-banner-close-button-offset: '{spacing.spacing-minimum}'
  # sizing
  in-page-banner-container-padding: '{spacing.spacing-medium}'
  in-page-banner-icon-size: '{icon.icon-size-medium}'
  in-page-banner-icon-padding-right: '{spacing.spacing-small}'
  in-page-banner-icon-offset-top: '{spacing.spacing-0-5}'
  in-page-banner-title-font: '{typography.label-large}'
  in-page-banner-title-margin-bottom: '{spacing.spacing-minimum}'
  in-page-banner-body-font: '{typography.body-small}'
  in-page-banner-body-margin-right: '{spacing.spacing-3xl}'
  in-page-banner-actions-margin-top: '{spacing.spacing-large}'
  in-page-banner-actions-gap: '{spacing.spacing-small}'
---

# In Page Banner

> In page banners display an important, succinct message, and may provide actions for users to address. Banners should be displayed at the top of the screen, below a top app bar. Only one banner should be shown at a time.

## Anatomy
1. Container – bordered box, tinted per status.
2. Status icon – [Icon](../atoms/icon.md), `--in-page-banner-icon-size` (override: the icon's medium size rather than its default, to sit on the title line), coloured per status (default icons: positive `check_circle`, negative `error`, warning `warning`, info `info`, default `info`).
3. Title – optional heading line.
4. Body – text or media.
5. Close button – [Icon Button](../atoms/icon-button.md) `close`, flavor text, size small, top-right when closable. The icon button's own tokens govern it, except two context overrides so the close control doesn't compete with the message: the icon colour `--in-page-banner-close-icon-foreground` (neutral dark instead of the text flavor's blue), and the resting background `--in-page-banner-close-container-background` (transparent instead of the text flavor's white square). At rest it is just a black cross on the banner's tint.
6. Action footer – optional actions, typically [Buttons](../atoms/button.md).

## Variants
| Status | Background | Border (`--in-page-banner-container-border-width`) | Icon |
|---|---|---|---|
| default | `--in-page-banner-default-container-background` | `--in-page-banner-default-container-border-color` | `--icon-foreground` |
| info | `--in-page-banner-info-container-background` | `--in-page-banner-info-container-border-color` | `--in-page-banner-info-icon-foreground` |
| positive | `--in-page-banner-positive-container-background` | `--in-page-banner-positive-container-border-color` | `--in-page-banner-positive-icon-foreground` |
| warning | `--in-page-banner-warning-container-background` | `--in-page-banner-warning-container-border-color` | `--in-page-banner-warning-icon-foreground` |
| negative | `--in-page-banner-negative-container-background` | `--in-page-banner-negative-container-border-color` | `--in-page-banner-negative-icon-foreground` |

Text is `--in-page-banner-text-foreground` for all statuses.

| Rounded | Radius (container and body media) |
|---|---|
| on (default) | `--in-page-banner-container-radius-rounded` |
| off | `--in-page-banner-container-radius-sharp` |

## States
Static. The close button rests with no background; hover/press follow the Icon Button text flavor (`--button-text-container-background-hover` / `--button-text-container-background-pressed`).

## Spacing & Sizing
| Property | Value |
|---|---|
| Padding | `--in-page-banner-container-padding` |
| Icon | `--in-page-banner-icon-size`; `--in-page-banner-icon-padding-right` right padding, `--in-page-banner-icon-offset-top` top offset |
| Title font | `--in-page-banner-title-font` |
| Title → body | `--in-page-banner-title-margin-bottom` |
| Body font | `--in-page-banner-body-font`; right margin `--in-page-banner-body-margin-right` |
| Close button | small icon button (`--icon-button-container-size-small`, the icon button's own size), offset negative `--in-page-banner-close-button-offset` top/right |
| Action footer | `--in-page-banner-actions-margin-top` top margin; actions `--in-page-banner-actions-gap` apart |

## Properties
| Property | Options | Default |
|---|---|---|
| Status | default, info, positive, warning, negative | default |
| Title | text | none |
| Closable | on / off | on |
| Show icon | on / off | on |
| Icon | any icon (overrides the status icon) | status icon |
| Rounded | on / off | on |
| Actions | up to two buttons | none |

## Usage
- Display at the top of the content area, below the top app bar; only one at a time.
- Keep the message succinct; at most two actions.
- Status is conveyed by icon + colour + wording, never colour alone.
- The close button must have an accessible name.

## Stitch Prompt
Draw an in-page alert box with `--in-page-banner-container-radius-rounded` corners, `--in-page-banner-container-padding` padding and a `--in-page-banner-container-border-width` coloured border: for info, a pale lavender (`--in-page-banner-info-container-background`) fill with a purple (`--in-page-banner-info-container-border-color`) border. On the left a `--in-page-banner-icon-size` purple info icon; beside it a `--in-page-banner-title-font` near-black title and, `--in-page-banner-title-margin-bottom` below, `--in-page-banner-body-font` body text; a small dark close (x) icon in the top-right corner. Underneath, `--in-page-banner-actions-margin-top` down, a row of two small buttons `--in-page-banner-actions-gap` apart. Other statuses use pale green, amber, pink or white fills with matching borders and icons.
