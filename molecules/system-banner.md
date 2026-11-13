---
name: System Banner
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ../atoms/button.md]
tokens:
  # default (the success colour)
  system-banner-default-container-background: '{colors.color-status-success-default}'
  system-banner-default-content-foreground: '{colors.color-ink-always-white}'
  # info
  system-banner-info-container-background: '{colors.color-status-info-default}'
  system-banner-info-content-foreground: '{colors.color-ink-always-white}'
  # warning
  system-banner-warning-container-background: '{colors.color-status-warning-default}'
  system-banner-warning-content-foreground: '{colors.color-ink-always-blank}'
  # negative
  system-banner-negative-container-background: '{colors.color-status-error-default}'
  system-banner-negative-content-foreground: '{colors.color-ink-always-white}'
  # shape
  system-banner-container-radius: '{radius.radius-none}'
  system-banner-dismiss-radius: '{radius.radius-element-sm}'
  # mobile sizes
  system-banner-mobile-container-padding: '{space.space-sm}'
  system-banner-mobile-container-gap: '{space.space-2xs}'
  system-banner-mobile-content-padding-y: '{space.space-sm}'
  system-banner-mobile-content-gap: '{space.space-sm}'
  system-banner-mobile-description-padding-y: '{space.space-sm}'
  system-banner-mobile-actions-padding-y: '{space.space-2xs}'
  system-banner-mobile-title-font: '{typography.type-label-large}'
  system-banner-mobile-icon-box-size: '{icon.icon-frame-size}'
  system-banner-mobile-dismiss-size: '{control.control-md}'
  # desktop sizes
  system-banner-desktop-container-padding: '{space.space-lg}'
  system-banner-desktop-container-gap: '{space.space-sm}'
  system-banner-desktop-content-gap: '{space.space-lg}'
  system-banner-desktop-content-padding-y-multiline: '{space.space-2xs}'
  system-banner-desktop-text-padding-y: '{space.space-sm}'
  system-banner-desktop-text-padding-y-multiline: '{space.space-2xs}'
  system-banner-desktop-text-gap-multiline: '{space.space-2xs}'
  system-banner-desktop-title-font: '{typography.type-label-medium}'
  system-banner-desktop-icon-box-size: '{control.control-sm}'
  system-banner-desktop-dismiss-size: '{control.control-sm}'
  # shared sizes
  system-banner-description-font: '{typography.type-body-small}'
  system-banner-actions-gap: '{space.space-sm}'
  system-banner-icon-size: '{icon.icon-size-medium}'
  system-banner-dismiss-padding: '{space.space-2xs}'
---

# System Banner

> A full-width message pinned to the top of a screen or view, carrying a status colour, a title, an optional description and an optional action.

## Anatomy
1. Container — spans the screen edge to edge, square-cornered (`--system-banner-container-radius`), filled with the status colour. Its children sit in one row: glyph, content, dismiss. The whole banner is locked to dark mode whatever mode its page uses; in code its root carries the dark theme scope.
2. Status glyph (optional) — [Icon](../atoms/icon.md) at `--system-banner-icon-size`, held to the top of the row in a square box (`--system-banner-mobile-icon-box-size` on mobile, `--system-banner-desktop-icon-box-size` on desktop). On mobile the glyph is exposed and chosen per use (Figma holds verified on every status); on desktop it follows Status: check_circle (default), info (info), warning (warning), error (negative).
3. Content — fills the width the glyph and the dismiss leave.
   - Title — the headline, one line where possible.
   - Description (optional) — the supporting line under the title. Mobile switches it with Show Description; desktop shows it on multiline.
4. Action slot (optional) — one small outline-contrast [Button](../atoms/button.md) by default; the slot accepts more, `--system-banner-actions-gap` apart. It sits beneath the text on mobile and on desktop multiline, and beside it on desktop single line.
5. Dismiss (optional) — a subtle [Icon Button](../atoms/icon-button.md) `close` at the trailing edge, square at `--system-banner-dismiss-radius`. Default, info and warning carry it; negative never does, so that banner stays until the condition clears.
6. Status Bar (Figma only, not built) — a mock phone status bar above the mobile banner so it previews as a phone screen. It is not part of the component.

## Variants
| Status | Background | Title, description and glyph |
|---|---|---|
| default | `--system-banner-default-container-background` | `--system-banner-default-content-foreground` |
| info | `--system-banner-info-container-background` | `--system-banner-info-content-foreground` |
| warning | `--system-banner-warning-container-background` | `--system-banner-warning-content-foreground` |
| negative | `--system-banner-negative-container-background` | `--system-banner-negative-content-foreground` |

Default is the success colour, despite the name: use it on completion, not as a neutral default. Because the banner is locked to dark mode, each background resolves to its dark-mode value in every page mode, and the action Button and dismiss draw in their dark-mode colours (white outline and label, white glyph) beside the text. Warning is the exception: its dismiss glyph and the action Button's outline and label take `--system-banner-warning-content-foreground` (near-black), like its text, because white fails on the warning fill.

| Platform | Layout |
|---|---|
| mobile | Glyph framed to `--system-banner-mobile-icon-box-size`; title `--system-banner-mobile-title-font`; description and actions stacked under the title |
| desktop | Glyph in a `--system-banner-desktop-icon-box-size` box; title `--system-banner-desktop-title-font`; Content Type single line (title and action on one row) or multiline (description under the title, action beneath) |

## States
| State | What changes |
|---|---|
| static | The banner has no interaction states of its own. Hover, focus and pressed live on the action Button and the dismiss Icon Button. |

It slides in from the top as it opens, pushing the content below it down, and plays the same motion in reverse when removed: 400ms, easing out on the way in and in on the way out. There is no motion token for that yet, so prototypes show and hide it without animating; with reduced motion it fades instead. The component only offers the dismiss: what happens after it is pressed, and whether the banner can return, is the product's decision.

## Spacing & Sizing
| Part | mobile | desktop |
|---|---|---|
| Row padding (all sides) | `--system-banner-mobile-container-padding` | `--system-banner-desktop-container-padding` |
| Glyph, content, dismiss | `--system-banner-mobile-container-gap` apart | `--system-banner-desktop-container-gap` apart |
| Content padding (V) | `--system-banner-mobile-content-padding-y` | none; `--system-banner-desktop-content-padding-y-multiline` on multiline |
| Text → actions | `--system-banner-mobile-content-gap` | `--system-banner-desktop-content-gap` |
| Text padding (V) | description `--system-banner-mobile-description-padding-y` | `--system-banner-desktop-text-padding-y`; `--system-banner-desktop-text-padding-y-multiline` on multiline |
| Title → description | `--system-banner-mobile-description-padding-y` | `--system-banner-desktop-text-gap-multiline` |
| Action row padding (V) | `--system-banner-mobile-actions-padding-y` | none |
| Glyph box | `--system-banner-mobile-icon-box-size` | `--system-banner-desktop-icon-box-size` |
| Dismiss | `--system-banner-mobile-dismiss-size` square, `--system-banner-dismiss-padding` around the glyph | `--system-banner-desktop-dismiss-size` square, `--system-banner-dismiss-padding` around the glyph |
| Fonts | title `--system-banner-mobile-title-font`, description `--system-banner-description-font` | title `--system-banner-desktop-title-font`, description `--system-banner-description-font` |

Width fills the screen or view (Figma's 412 and 983 are previews); height hugs the content, so a longer description makes the banner taller, never wider. The text wraps inside its own column. There is no radius: the banner meets both edges, so a radius would leave a gap at the sides. The action label is the small Button's `--button-label-font-small`.

## Properties
| Property | Options | Default |
|---|---|---|
| Platform | mobile, desktop | mobile |
| Status | default, info, warning, negative | default |
| Content Type (desktop) | single line, multiline | single line |
| Title | text | Banner Title |
| Description | text | — |
| Show Description (mobile) | on / off | on |
| Show Leading Icon | on / off | on |
| Status icon (mobile) | any icon | verified |
| Show Actions | on / off | on |
| Show Close | on / off (not on negative) | on |

## Usage
- Match Status to what happened rather than to the colour you want. Using negative for emphasis leaves nothing for a real failure.
- Use it for page-wide or system news; a message about one form or card is an [Inline Banner](inline-banner.md).
- Keep the title to one line and let the description carry the detail. On desktop, use multiline only when the reason needs spelling out.
- Keep the action outline-contrast. Changing its flavour per message breaks the pairing with the background.
- Don't let the background colour carry the status on its own. Keep the glyph on, and say what has happened in the text as well.
- Don't turn the dismiss off on a banner a person can do nothing about. That leaves a message on screen with no way to clear it.

## Accessibility
- A banner appears without being asked for, so it has to announce itself. Nothing in the component does that: the product sends the message to the screen reader as it opens (`role="status"`, or `role="alert"` for negative).
- On mobile the glyph is the same on every status, so the text has to say what has happened. On desktop the glyph follows Status, but it is a small difference at this size, so the text should still name the status.
- Text and glyph colour deliberately differ from the Figma binding, which uses the page's primary text colour. Following the component's own intent, they are always white (`--system-banner-default-content-foreground`, `--system-banner-info-content-foreground`, `--system-banner-negative-content-foreground`) except on warning, which is always near-black (`--system-banner-warning-content-foreground`): white on the dark-mode warning fill is about 2.4:1 and fails. Warning's action Button and dismiss follow the same near-black for the same reason.
- The dismiss is `--system-banner-mobile-dismiss-size` square on mobile, which meets the minimum target, and `--system-banner-desktop-dismiss-size` on desktop, which is below it (`--icon-button-touch-target-size-minimum`); on desktop count the surrounding padding, and keep it in reading order for the keyboard. Give it an accessible name, such as "Dismiss banner".

## Stitch Prompt
Draw a Zebra system banner as a full-width, square-cornered strip across the very top of a phone screen, filled solid green (`--system-banner-default-container-background`) with `--system-banner-mobile-container-padding` padding. On the left a white `--system-banner-icon-size` verified icon in a `--system-banner-mobile-icon-box-size` square; beside it a white `--system-banner-mobile-title-font` title and, below, a white `--system-banner-description-font` description; under the text a small button with a white outline and white label. A white close (x) icon button sits at the far right. Other statuses fill blue (`--system-banner-info-container-background`), red (`--system-banner-negative-container-background`, no close) or amber (`--system-banner-warning-container-background`, with near-black text, button outline and close icon `--system-banner-warning-content-foreground`). The desktop version spans a wide view with `--system-banner-desktop-container-padding` padding, a `--system-banner-desktop-title-font` title and the action button beside the title on one line.
