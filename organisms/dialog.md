---
name: Dialog
level: organism
status: stable
composes: [../atoms/button.md, ../atoms/icon.md]
tokens:
  dialog-width: '{dimensions.dim-dialog-width}'
  dialog-max-height: '{dimensions.dim-dialog-max-height}'
  dialog-container-background: '{colors.surface-default}'
  dialog-container-foreground: '{colors.main-default}'
  dialog-container-border-width: '{border.border-size-small}'
  dialog-container-border-color: '{colors.border-default}'
  dialog-container-radius-rounded: '{rounded.radius-minimal}'
  dialog-container-radius-sharp: '{rounded.radius-none}'
  # flavor: header icon colour overrides (the icon atom has no status colours)
  dialog-info-icon-foreground: '{colors.main-info}'
  dialog-success-icon-foreground: '{colors.main-positive}'
  dialog-warning-icon-foreground: '{colors.main-warning}'
  dialog-error-icon-foreground: '{colors.main-negative}'
  # header
  dialog-header-padding-top: '{spacing.spacing-2xl}'
  dialog-header-padding-x: '{spacing.spacing-2xl}'
  dialog-header-padding-bottom: '{spacing.spacing-none}'
  dialog-header-gap: '{spacing.spacing-small}'
  dialog-title-font: '{typography.title-large}'
  dialog-title-font-weight: '{font-weight.medium}'
  # body
  dialog-body-padding: '{spacing.spacing-2xl}'
  dialog-body-font: '{typography.body-medium}'
  dialog-body-min-height: '{spacing.spacing-2xl}'
  # footer
  dialog-footer-padding: '{spacing.spacing-2xl}'
  dialog-footer-gap: '{spacing.spacing-large}'
  dialog-footer-action-group-gap: '{spacing.spacing-small}'
  # scrim
  dialog-scrim-background: '{colors.surface-overlay}'
---

# Dialog

> A popup dialog used to convey a message to the user.

## Anatomy
1. Container — surface with `--dialog-container-border-width` border, radius from shape.
2. Header — optional leading [Icon](../atoms/icon.md), default size `--icon-size`, colour overridden per flavor + title (single line, ellipsis).
3. Body — typically text.
4. Footer — up to three [Buttons](../atoms/button.md), size medium: other (left, flavor text), cancel (flavor outline) + confirm (flavor per confirm button flavor) (right). The button's own tokens govern colours, states, radius, focus ring and touch target.
5. Backdrop — modal scrim; tapping it closes the dialog by default.

## Variants
| Flavor | Header icon colour (context override) |
|---|---|
| default | `--icon-foreground` (icon default) |
| info | `--dialog-info-icon-foreground` |
| success | `--dialog-success-icon-foreground` |
| warning | `--dialog-warning-icon-foreground` |
| error | `--dialog-error-icon-foreground` |

| Confirm button flavor | Button |
|---|---|
| primary | [Button](../atoms/button.md) flavor primary |
| positive | [Button](../atoms/button.md) flavor positive |
| negative | [Button](../atoms/button.md) flavor negative |

| Footer button count | Layout |
|---|---|
| 3 | other at the start, cancel/confirm grouped at the end |
| 2 | aligned to the end |
| 1 | button stretches full width |

| Shape | Radius |
|---|---|
| rounded (default) | `--dialog-container-radius-rounded` |
| sharp | `--dialog-container-radius-sharp` |

Centered: the header content is centred.

## States
| State | Notes |
|---|---|
| closed | not shown |
| open (modal) | scrim behind; tapping the scrim closes it unless disabled |
| open (non-modal) | no scrim |
| confirm pressed | closes the dialog |

## Spacing & Sizing
| Part | Value |
|---|---|
| Width | `--dialog-width` (fixed) |
| Max height | `--dialog-max-height`, content scrolls |
| Surface | `--dialog-container-background`, text `--dialog-container-foreground` |
| Border | `--dialog-container-border-width` `--dialog-container-border-color` |
| Header padding | `--dialog-header-padding-top` `--dialog-header-padding-x` `--dialog-header-padding-bottom` `--dialog-header-padding-x`, gap `--dialog-header-gap` |
| Header icon | [Icon](../atoms/icon.md) at `--icon-size` |
| Title | `--dialog-title-font` metrics at `--dialog-title-font-weight` weight |
| Body | padding `--dialog-body-padding`, `--dialog-body-font`, min-height `--dialog-body-min-height` |
| Footer | padding `--dialog-footer-padding`, gap `--dialog-footer-gap`; action group gap `--dialog-footer-action-group-gap` |
| Scrim | `--dialog-scrim-background` (provides separation; no shadow) |

## Properties
| Property | Options | Default |
|---|---|---|
| Title | text | — |
| Flavor | default, info, success, warning, error | default |
| Leading icon | shown / hidden; any icon | shown |
| Confirm button flavor | primary, positive, negative | primary |
| Centered | on / off | off |
| Rounded | on / off | on |
| Modal | on / off | on |
| Close on scrim tap | on / off | on |

## Content regions
| Region | Content |
|---|---|
| Body | text |
| Confirm / Cancel / Other | a button each |

## Usage
- Show in response to a user action or to get the user's attention; modal is recommended for most uses.
- Keep the title to one line — it truncates with ellipsis.
- Use flavor + icon to signal severity, but always state it in the title/body too (don't rely on colour alone).
- Footer buttons keep the button's touch target (`--button-touch-target-size-minimum`–`--button-touch-target-size-recommended`) and focus ring (`--button-focus-ring-width` `--button-focus-ring-color`).
- Trap focus inside the modal; Escape and the scrim close it.

## Stitch Prompt
Draw a centred `--dialog-width`-wide white modal card with a `--dialog-container-border-width` light grey (`--dialog-container-border-color`) border and `--dialog-container-radius-rounded` corners over a `--dialog-scrim-background` black scrim. At the top, `--dialog-header-padding-top` padding, a `--icon-size` coloured status icon (blue-black by default, purple info, green success, orange warning, red error) sits beside a single-line `--dialog-title-font`-sized IBM Plex Sans title. Below, a `--dialog-body-padding`-padded body of `--dialog-body-font` dark text (`--dialog-container-foreground`). The footer, `--dialog-footer-padding` padded, holds buttons: a secondary text button on the left and a Cancel outline button plus a solid blue (`--button-primary-container-background-enabled`) Confirm button grouped on the right with `--dialog-footer-action-group-gap` between them.
