---
name: Right Drawer Panel
level: organism
status: draft
composes: [../atoms/icon-button.md, ../atoms/button.md, ../molecules/list-item.md, ../atoms/card.md]
tokens:
  right-drawer-panel-container-width: '{dimensions.dim-right-drawer-panel-width}'
  right-drawer-panel-container-min-width: '{dimensions.dim-right-drawer-panel-min-width}'
  right-drawer-panel-container-max-width: '{dimensions.dim-right-drawer-panel-max-width}'
  right-drawer-panel-container-spacing-minimum: '{spacing.spacing-minimum}'
  right-drawer-panel-container-spacing-maximum: '{spacing.spacing-4xl}'
  right-drawer-panel-container-radius-rounded: '{rounded.radius-minimal}'
  right-drawer-panel-container-background: '{colors.surface-default}'
  right-drawer-panel-container-elevation: '{elevation.elevation-6}'
  right-drawer-panel-content-foreground: '{colors.main-default}'
  right-drawer-panel-content-foreground-subtle: '{colors.main-subtle}'
  right-drawer-panel-divider-border-color: '{colors.border-default}'
  right-drawer-panel-scrim-background: '{colors.surface-overlay}'
---

# Right Drawer Panel

> A panel that slides in from the edge of the screen to display additional content without navigating away from the current view.

A composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Scrim — dims the page when modal.
2. Panel — full-height surface anchored to the right edge.
3. Header — title + close [Icon Button](../atoms/icon-button.md) `close`, flavor subtle, size medium.
4. Content — scrollable area (forms, [list items](../molecules/list-item.md), details, [cards](../atoms/card.md)).
5. Optional footer — [Buttons](../atoms/button.md), right-aligned: a primary Button for the main action and an outline-subtle Button for Cancel.

The composed buttons, list items and cards govern their own colours, states, radius and focus ring; the panel defines only its surface, layout, text, dividers and scrim.

## Variants
| Variant | Behaviour |
|---|---|
| modal | scrim over page; tap outside, swipe or close button dismisses |
| persistent | sits beside content, no scrim |

## States
closed (off-screen right) → open (slid in). Dismiss via swipe, tap outside (modal) or close button.

## Spacing & Sizing
Measurements to be defined. Intended width `--right-drawer-panel-container-width` (min `--right-drawer-panel-container-min-width`, max `--right-drawer-panel-container-max-width`). Use Zeta tokens only: spacing `--right-drawer-panel-container-spacing-minimum` … `--right-drawer-panel-container-spacing-maximum`; radius `--right-drawer-panel-container-radius-rounded` when rounded; background `--right-drawer-panel-container-background`, text `--right-drawer-panel-content-foreground`, secondary text `--right-drawer-panel-content-foreground-subtle`, dividers `--right-drawer-panel-divider-border-color`; elevation `--right-drawer-panel-container-elevation`; scrim `--right-drawer-panel-scrim-background`.

## Usage
- Use for menus, navigation, settings or contextual details without leaving the current view.
- Prefer modal on small screens, persistent on wide layouts.
- Move focus into the panel on open, trap it while modal, return it to the trigger on close; Escape closes.
- Interactive parts inherit the atoms' accessibility: Button touch targets ≥ `--button-touch-target-size-minimum`–`--button-touch-target-size-recommended`, Button focus ring `--button-focus-ring-width` `--button-focus-ring-color`; never rely on colour alone.

## Stitch Prompt
Draw a desktop page dimmed by a black scrim (`--right-drawer-panel-scrim-background`) with a white full-height panel sliding in from the right edge, about a third of the screen wide, with a strong soft drop shadow on its left side. At the top of the panel, a medium-weight title and an X close icon button; below, a scrollable stack of form fields or list rows; at the bottom, a right-aligned Cancel and a solid blue (`--button-primary-container-background-enabled`) primary button.
