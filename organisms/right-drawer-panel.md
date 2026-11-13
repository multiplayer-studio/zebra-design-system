---
name: Right Drawer Panel
level: organism
status: draft
composes: [../atoms/icon-button.md, ../atoms/button.md, ../molecules/menu-item.md, ../molecules/card.md, ../atoms/scrim.md]
tokens:
  # container
  right-drawer-panel-container-background: '{colors.color-fill-default}'
  right-drawer-panel-container-elevation: '{shadow.shadow-large}'
  right-drawer-panel-container-radius-rounded: '{radius.radius-sm}'
  right-drawer-panel-container-radius-sharp: '{radius.radius-none}'
  right-drawer-panel-scrim-background: '{colors.color-fill-scrim}'
  # text
  right-drawer-panel-title-font: '{typography.type-title-medium}'
  right-drawer-panel-content-foreground: '{colors.color-ink-high}'
  right-drawer-panel-content-foreground-subtle: '{colors.color-ink-medium}'
  right-drawer-panel-content-font-subtle: '{typography.type-body-small}'
  # dividers
  right-drawer-panel-divider-border-width: '{stroke.stroke-thin}'
  right-drawer-panel-divider-border-color: '{colors.color-line-default}'
  # sizes
  right-drawer-panel-container-width: '{component-sizes.size-right-drawer-panel-width}'
  right-drawer-panel-container-min-width: '{primitives.scale-container-0}'
  right-drawer-panel-container-max-width: '{component-sizes.size-right-drawer-panel-max-width}'
  # spacing
  right-drawer-panel-header-padding-y: '{space.space-md}'
  right-drawer-panel-header-padding-x: '{space.space-lg}'
  right-drawer-panel-header-gap: '{space.space-sm}'
  right-drawer-panel-content-padding: '{space.space-lg}'
  right-drawer-panel-content-gap: '{space.space-lg}'
  right-drawer-panel-footer-padding-y: '{space.space-md}'
  right-drawer-panel-footer-padding-x: '{space.space-lg}'
  right-drawer-panel-footer-gap: '{space.space-sm}'
---

# Right Drawer Panel

> A panel that slides in from the right edge of the screen to show additional content without navigating away from the current view.

## Anatomy
1. Scrim — [Scrim](../atoms/scrim.md) in `--right-drawer-panel-scrim-background`, dimming the page when the panel is modal.
2. Panel — full-height surface anchored to the right edge, `--right-drawer-panel-container-background`, with `--right-drawer-panel-container-elevation` and its left corners rounded.
3. Header — title in `--right-drawer-panel-title-font` and a close [Icon Button](../atoms/icon-button.md) `close`, flavour subtle, size medium; a `--right-drawer-panel-divider-border-width` `--right-drawer-panel-divider-border-color` divider below.
4. Content — scrollable area for forms, [Menu Items](../molecules/menu-item.md), details and [Cards](../molecules/card.md). Body text is `--right-drawer-panel-content-foreground`; secondary text `--right-drawer-panel-content-foreground-subtle` in `--right-drawer-panel-content-font-subtle`.
5. Footer (optional) — right-aligned [Buttons](../atoms/button.md): a primary Button for the main action and an outline-subtle Button for Cancel, with a divider above.

The composed buttons, menu items, cards and scrim govern their own colours, states, radius and focus ring; the panel defines only its surface, layout, text, dividers and scrim colour.

## Variants
| Variant | Behaviour |
|---|---|
| modal (default) | scrim over the page; tap outside, swipe, Escape or the close button dismisses |
| persistent | sits beside the content with a divider on its left edge, no scrim and no elevation |

Shape: rounded (default) → `--right-drawer-panel-container-radius-rounded` on the left corners of a modal panel; sharp → `--right-drawer-panel-container-radius-sharp`. A persistent panel is always square. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Panel | Scrim (modal) |
|---|---|---|
| closed | off-screen right, hidden from assistive technology | hidden |
| open | slid in against the right edge | `--right-drawer-panel-scrim-background` over the page |

Dismiss via swipe, tap outside (modal), Escape or the close button. No transition is defined yet, so the panel appears and disappears without animation.

## Spacing & Sizing
Measurements are provisional: this component has no Figma source yet.

| Part | Value |
|---|---|
| Width | `--right-drawer-panel-container-width` of the viewport, clamped between `--right-drawer-panel-container-min-width` and `--right-drawer-panel-container-max-width` |
| Height | full height of the viewport |
| Header padding (V / H) | `--right-drawer-panel-header-padding-y` / `--right-drawer-panel-header-padding-x`, gap `--right-drawer-panel-header-gap` |
| Content padding / gap | `--right-drawer-panel-content-padding` / `--right-drawer-panel-content-gap` |
| Footer padding (V / H) | `--right-drawer-panel-footer-padding-y` / `--right-drawer-panel-footer-padding-x`, gap `--right-drawer-panel-footer-gap` |
| Dividers | `--right-drawer-panel-divider-border-width` `--right-drawer-panel-divider-border-color` |

The header and footer stay fixed; only the content scrolls. A long title truncates rather than pushing the close button out.

## Properties
| Property | Options | Default |
|---|---|---|
| Variant | modal, persistent | modal |
| Title | text | — |
| Content | slot | — |
| Footer | on / off | on |
| Shape | rounded, sharp | rounded |
| Open | on / off | off |

## Usage
- Use for settings, filters or contextual details without leaving the current view. For app navigation use a navigation drawer instead.
- Prefer modal on small screens and persistent on wide layouts.
- Keep one primary action in the footer, with Cancel beside it as outline-subtle.
- Don't stack a second drawer on top of an open one.

## Accessibility
- On open, move focus into the panel (to the close button or the first field). While modal, trap focus inside it; on close, return focus to the trigger. Escape closes the panel.
- A modal panel is a dialog (`role="dialog"`, `aria-modal="true"`) named by its title; a persistent panel is a labelled region.
- The close Icon Button needs an accessible name ("Close panel"). The buttons bring their own focus ring (`--button-focus-ring-width` `--button-focus-ring-color`) and touch target (`--button-touch-target-size-minimum`).
- The scrim is decorative: it must not be the only way to close the panel.
- Never rely on colour alone to convey content state inside the panel.

## Claude Prompt
Draw a desktop page dimmed by a dark scrim (`--right-drawer-panel-scrim-background`) with a white (`--right-drawer-panel-container-background`) full-height panel against the right edge, about `--right-drawer-panel-container-width` of the screen wide, with a strong soft drop shadow (`--right-drawer-panel-container-elevation`) on its left side and `--right-drawer-panel-container-radius-rounded` left corners. At the top of the panel, a `--right-drawer-panel-title-font` title and an X close icon button, with a thin divider below; then a scrollable stack of form fields, list rows and a card; at the bottom, behind a thin divider, a right-aligned outline Cancel button and a solid blue (`--button-primary-container-background-enabled`) primary button.
