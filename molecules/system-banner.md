---
name: System Banner
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ../atoms/button.md]
tokens:
  # success
  system-banner-success-container-background: '{colors.color-status-success-default}'
  system-banner-success-content-foreground: '{colors.color-ink-always-white}'
  # info
  system-banner-info-container-background: '{colors.color-status-info-default}'
  system-banner-info-content-foreground: '{colors.color-ink-always-white}'
  # warning
  system-banner-warning-container-background: '{colors.color-status-warning-default}'
  system-banner-warning-content-foreground: '{colors.color-ink-always-blank}'
  # error
  system-banner-error-container-background: '{colors.color-status-error-default}'
  system-banner-error-content-foreground: '{colors.color-ink-always-white}'
  # shape
  system-banner-container-radius: '{radius.radius-none}'
  system-banner-dismiss-radius: '{radius.radius-element-sm}'
  # compact sizes
  system-banner-compact-container-padding: '{space.space-sm}'
  system-banner-compact-container-gap: '{space.space-2xs}'
  system-banner-compact-content-padding-y: '{space.space-sm}'
  system-banner-compact-content-gap: '{space.space-sm}'
  system-banner-compact-description-padding-y: '{space.space-sm}'
  system-banner-compact-actions-padding-y: '{space.space-2xs}'
  system-banner-compact-title-font: '{typography.type-label-large}'
  system-banner-compact-icon-box-size: '{icon.icon-frame-size}'
  system-banner-compact-dismiss-size: '{control.control-md}'
  # expanded sizes
  system-banner-expanded-container-padding: '{space.space-lg}'
  system-banner-expanded-container-gap: '{space.space-sm}'
  system-banner-expanded-content-gap: '{space.space-lg}'
  system-banner-expanded-content-padding-y-multiline: '{space.space-2xs}'
  system-banner-expanded-text-padding-y: '{space.space-sm}'
  system-banner-expanded-text-padding-y-multiline: '{space.space-2xs}'
  system-banner-expanded-text-gap-multiline: '{space.space-2xs}'
  system-banner-expanded-title-font: '{typography.type-label-medium}'
  system-banner-expanded-icon-box-size: '{control.control-sm}'
  system-banner-expanded-dismiss-size: '{control.control-sm}'
  # shared sizes
  system-banner-description-font: '{typography.type-body-small}'
  system-banner-actions-gap: '{space.space-sm}'
  system-banner-icon-size: '{icon.icon-size-medium}'
  system-banner-dismiss-padding: '{space.space-2xs}'
  # motion
  system-banner-enter-duration: '{motion.motion-slow}'
  system-banner-enter-easing: '{motion.easing-out}'
  system-banner-exit-duration: '{motion.motion-fast}'
  system-banner-exit-easing: '{motion.easing-in}'
---

# System Banner

> A full-width message directly below the header about a condition affecting the whole product (connectivity, sync, maintenance, licence), carrying a status colour, a title, an optional description and an optional action.

## Anatomy
1. Container — spans the content area's full width directly below the header, never above or over global navigation, and pushes the content down rather than covering it ([patterns 1.58](../patterns/01-screen-composition.md)). It is square-cornered (`--system-banner-container-radius`) and filled with the status colour. Its children sit in one row: glyph, content, dismiss. The whole banner is locked to dark mode whatever mode its page uses; in code its root carries the dark theme scope.
2. Status glyph (optional) — [Icon](../atoms/icon.md) at `--system-banner-icon-size`, held to the top of the row in a square box (`--system-banner-compact-icon-box-size` on compact, `--system-banner-expanded-icon-box-size` on expanded). It follows Status at both sizes, one glyph per severity across the system: check_circle (success), info (info), warning (warning), error (error).
3. Content — fills the width the glyph and the dismiss leave.
   - Title — the headline, one line where possible.
   - Description (optional) — the supporting line under the title. Compact switches it with Show Description; expanded shows it on multiline.
4. Action slot (optional) — one small outline-contrast [Button](../atoms/button.md) by default; the slot accepts more, `--system-banner-actions-gap` apart. It sits beneath the text on compact and on expanded multiline, and beside it on expanded single line.
5. Dismiss (optional) — a subtle [Icon Button](../atoms/icon-button.md) `close` at the trailing edge, square at `--system-banner-dismiss-radius`. Success, info and warning carry it; error never does, because a critical banner stays until the condition clears ([patterns 4.77](../patterns/04-states-feedback.md)).
6. Status Bar (Figma only, not built) — a mock phone status bar above the compact banner so it previews as a phone screen. It is not part of the component.

## Variants
| Status | Background | Title, description and glyph |
|---|---|---|
| success | `--system-banner-success-container-background` | `--system-banner-success-content-foreground` |
| info | `--system-banner-info-container-background` | `--system-banner-info-content-foreground` |
| warning | `--system-banner-warning-container-background` | `--system-banner-warning-content-foreground` |
| error | `--system-banner-error-container-background` | `--system-banner-error-content-foreground` |

Success is only for a system condition that has been restored ("Back online", "Sync complete"); routine success is quiet, or a [Snackbar](snackbar.md) ([patterns 4.30–4.31](../patterns/04-states-feedback.md)). Because the banner is locked to dark mode, each background resolves to its dark-mode value in every page mode, and the action Button and dismiss draw in their dark-mode colours (white outline and label, white glyph) beside the text. Warning is the exception: its dismiss glyph and the action Button's outline and label take `--system-banner-warning-content-foreground` (near-black), like its text, because white fails on the warning fill.

| Size | Layout |
|---|---|
| compact | Glyph framed to `--system-banner-compact-icon-box-size`; title `--system-banner-compact-title-font`; description and actions stacked under the title |
| expanded | Glyph in a `--system-banner-expanded-icon-box-size` box; title `--system-banner-expanded-title-font`; Content Type single line (title and action on one row) or multiline (description under the title, action beneath) |

## States
| State | What changes |
|---|---|
| static | The banner has no interaction states of its own. Hover, focus and pressed live on the action Button and the dismiss Icon Button. |

The compact size is used below `--breakpoint-medium-min` (the compact size class); the expanded size from `--breakpoint-medium-min` (medium and up).

It slides in from the top as it opens, pushing the content below it down, over `--system-banner-enter-duration` with `--system-banner-enter-easing`, and slides back out over the shorter `--system-banner-exit-duration` with `--system-banner-exit-easing`. With reduced motion it fades instead ([patterns 6.66](../patterns/06-accessibility.md)).

Only one shows at a time, in the slot below the header: the one that most limits what the person can do shows first ([patterns 1.59](../patterns/01-screen-composition.md), [4.4](../patterns/04-states-feedback.md)). A dismissed banner returns while its condition remains ([patterns 4.77](../patterns/04-states-feedback.md)). The component only offers the dismiss; the product tracks the condition.

## Spacing & Sizing
| Part | compact | expanded |
|---|---|---|
| Row padding (all sides) | `--system-banner-compact-container-padding` | `--system-banner-expanded-container-padding` |
| Glyph, content, dismiss | `--system-banner-compact-container-gap` apart | `--system-banner-expanded-container-gap` apart |
| Content padding (V) | `--system-banner-compact-content-padding-y` | none; `--system-banner-expanded-content-padding-y-multiline` on multiline |
| Text → actions | `--system-banner-compact-content-gap` | `--system-banner-expanded-content-gap` |
| Text padding (V) | description `--system-banner-compact-description-padding-y` | `--system-banner-expanded-text-padding-y`; `--system-banner-expanded-text-padding-y-multiline` on multiline |
| Title → description | `--system-banner-compact-description-padding-y` | `--system-banner-expanded-text-gap-multiline` |
| Action row padding (V) | `--system-banner-compact-actions-padding-y` | none |
| Glyph box | `--system-banner-compact-icon-box-size` | `--system-banner-expanded-icon-box-size` |
| Dismiss | `--system-banner-compact-dismiss-size` square, `--system-banner-dismiss-padding` around the glyph | `--system-banner-expanded-dismiss-size` square, `--system-banner-dismiss-padding` around the glyph |
| Fonts | title `--system-banner-compact-title-font`, description `--system-banner-description-font` | title `--system-banner-expanded-title-font`, description `--system-banner-description-font` |

Width fills the screen or view (Figma's 412 and 983 are previews); height hugs the content, so a longer description makes the banner taller, never wider. The text wraps inside its own column. There is no radius: the banner meets both edges, so a radius would leave a gap at the sides. The action label is the small Button's `--button-label-font-small`.

## Properties
| Property | Options | Default |
|---|---|---|
| Size | compact, expanded | compact |
| Status | success, info, warning, error | info |
| Content Type (expanded) | single line, multiline | single line |
| Title | text | Banner Title |
| Description | text | — |
| Show Description (compact) | on / off | on |
| Show Leading Icon | on / off | on |
| Show Actions | on / off | on |
| Show Close | on / off (not on error) | on |

## Usage
- Match Status to what happened rather than to the colour you want. Using error for emphasis leaves nothing for a real failure.
- Use it for a condition of the whole product; a message about one page, section or element is an [Inline Banner](inline-banner.md), and information people need to do the task goes in the content ([patterns 1.57, 1.62](../patterns/01-screen-composition.md)).
- Keep the title to one line and let the description carry the detail. On expanded, use multiline only when the reason needs spelling out.
- Keep the action outline-contrast. Changing its flavour per message breaks the pairing with the background.
- Keep the glyph on, and say what has happened in the text as well ([patterns 6.11](../patterns/06-accessibility.md)).
- For the product's own connection or sync state, use [Connection Status](./connection-status.md) in the shell; a System Banner is for a lasting condition people must know about.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## Accessibility
- It announces itself without moving focus ([patterns 6.53–6.54](../patterns/06-accessibility.md)). Nothing in the component does that: the product sends the message to the screen reader as it opens (`role="status"`, or `role="alert"` for error).
- Text and glyph colour deliberately differ from the Figma binding, which uses the page's primary text colour. Following the component's own intent, they are always white (`--system-banner-success-content-foreground`, `--system-banner-info-content-foreground`, `--system-banner-error-content-foreground`) except on warning, which is always near-black (`--system-banner-warning-content-foreground`): white on the dark-mode warning fill is about 2.4:1 and fails. Warning's action Button and dismiss follow the same near-black for the same reason.
- The dismiss is drawn `--system-banner-compact-dismiss-size` square on compact and `--system-banner-expanded-dismiss-size` on expanded, both below `--icon-button-touch-target-size-minimum`; its hit area extends to that minimum at both sizes ([patterns 6.16](../patterns/06-accessibility.md)). Keep it in reading order for the keyboard, and give it the accessible name "Close".

## Claude Prompt
Draw a Zebra system banner as a full-width, square-cornered strip directly below the header of a phone screen, filled solid green (`--system-banner-success-container-background`) with `--system-banner-compact-container-padding` padding. On the left a white `--system-banner-icon-size` check-circle icon in a `--system-banner-compact-icon-box-size` square; beside it a white `--system-banner-compact-title-font` title and, below, a white `--system-banner-description-font` description; under the text a small button with a white outline and white label. A white close (x) icon button sits at the far right. Other statuses fill blue (`--system-banner-info-container-background`), red (`--system-banner-error-container-background`, no close) or amber (`--system-banner-warning-container-background`, with near-black text, button outline and close icon `--system-banner-warning-content-foreground`). The expanded version spans a wide view with `--system-banner-expanded-container-padding` padding, a `--system-banner-expanded-title-font` title and the action button beside the title on one line.
