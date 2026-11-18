---
name: Inline Banner
level: molecule
status: stable
composes: [../atoms/icon.md, ../atoms/icon-button.md, ../atoms/button.md]
tokens:
  # subtle info
  inline-banner-subtle-info-container-background: '{colors.color-status-info-faint}'
  inline-banner-subtle-info-container-border-color: '{colors.color-status-info-default}'
  inline-banner-subtle-info-icon-foreground: '{colors.color-status-info-default}'
  inline-banner-subtle-info-text-foreground: '{colors.color-ink-high}'
  # subtle neutral
  inline-banner-subtle-neutral-container-background: '{colors.color-status-neutral-faint}'
  inline-banner-subtle-neutral-container-border-color: '{colors.color-line-default}'
  inline-banner-subtle-neutral-icon-foreground: '{colors.color-status-neutral-default}'
  inline-banner-subtle-neutral-text-foreground: '{colors.color-ink-high}'
  # subtle success
  inline-banner-subtle-success-container-background: '{colors.color-status-success-faint}'
  inline-banner-subtle-success-container-border-color: '{colors.color-status-success-default}'
  inline-banner-subtle-success-icon-foreground: '{colors.color-status-success-default}'
  inline-banner-subtle-success-text-foreground: '{colors.color-ink-high}'
  # subtle warning
  inline-banner-subtle-warning-container-background: '{colors.color-status-warning-faint}'
  inline-banner-subtle-warning-container-border-color: '{colors.color-status-warning-default}'
  inline-banner-subtle-warning-icon-foreground: '{colors.color-status-warning-default}'
  inline-banner-subtle-warning-text-foreground: '{colors.color-ink-high}'
  # subtle error
  inline-banner-subtle-error-container-background: '{colors.color-status-error-faint}'
  inline-banner-subtle-error-container-border-color: '{colors.color-status-error-default}'
  inline-banner-subtle-error-icon-foreground: '{colors.color-status-error-default}'
  inline-banner-subtle-error-text-foreground: '{colors.color-ink-high}'
  # solid info
  inline-banner-solid-info-container-background: '{colors.color-status-info-default}'
  inline-banner-solid-info-container-border-color: '{colors.color-status-info-default}'
  inline-banner-solid-info-icon-foreground: '{colors.color-ink-always-white}'
  inline-banner-solid-info-text-foreground: '{colors.color-ink-always-white}'
  # solid neutral
  inline-banner-solid-neutral-container-background: '{colors.color-status-neutral-strong}'
  inline-banner-solid-neutral-container-border-color: '{colors.color-status-neutral-strong}'
  inline-banner-solid-neutral-icon-foreground: '{colors.color-ink-inverse}'
  inline-banner-solid-neutral-text-foreground: '{colors.color-ink-inverse}'
  # solid success
  inline-banner-solid-success-container-background: '{colors.color-status-success-default}'
  inline-banner-solid-success-container-border-color: '{colors.color-status-success-default}'
  inline-banner-solid-success-icon-foreground: '{colors.color-ink-always-white}'
  inline-banner-solid-success-text-foreground: '{colors.color-ink-always-white}'
  # solid warning
  inline-banner-solid-warning-container-background: '{colors.color-status-warning-default}'
  inline-banner-solid-warning-container-border-color: '{colors.color-status-warning-default}'
  inline-banner-solid-warning-icon-foreground: '{colors.color-ink-inverse}'
  inline-banner-solid-warning-text-foreground: '{colors.color-ink-inverse}'
  # solid error
  inline-banner-solid-error-container-background: '{colors.color-status-error-default}'
  inline-banner-solid-error-container-border-color: '{colors.color-status-error-default}'
  inline-banner-solid-error-icon-foreground: '{colors.color-ink-always-white}'
  inline-banner-solid-error-text-foreground: '{colors.color-ink-always-white}'
  # shape and border
  inline-banner-container-radius-rounded: '{radius.radius-element-md}'
  inline-banner-container-radius-sharp: '{radius.radius-none}'
  inline-banner-container-border-width: '{stroke.stroke-thin}'
  # sizes
  inline-banner-container-padding-y: '{space.space-md}'
  inline-banner-container-padding-x: '{space.space-lg}'
  inline-banner-container-gap: '{space.space-sm}'
  inline-banner-content-gap: '{space.space-lg}'
  inline-banner-content-gap-wrapped: '{space.space-sm}'
  inline-banner-text-gap: '{space.space-2xs}'
  inline-banner-actions-gap: '{space.space-sm}'
  inline-banner-title-font: '{typography.type-label-large}'
  inline-banner-description-font: '{typography.type-body-small}'
  inline-banner-icon-size: '{icon.icon-size-medium}'
  inline-banner-icon-box-height: '{primitives.scale-9}'
---

# Inline Banner

> A notice about one page, section or element, placed next to what it is about, at its container's width.

## Anatomy
1. Container — fills its container's width and hugs its content. Carries the background, a `--inline-banner-container-border-width` border inside the edge and the radius. Its children sit in a row `--inline-banner-container-gap` apart.
2. Status glyph — [Icon](../atoms/icon.md) at `--inline-banner-icon-size`, centred in a box `--inline-banner-icon-box-height` tall so it lines up with the title's first line. It follows Status, one glyph per severity across the system: lightbulb (neutral), info (info), check_circle (success), warning (warning), error (error).
3. Content — the text block and the action slot. It takes the width the glyph and the close leave.
   - Title — the headline, what happened, in `--inline-banner-title-font`.
   - Description (optional) — why, and what to do next, `--inline-banner-text-gap` below the title in `--inline-banner-description-font`.
4. Action slot (optional) — the controls the message needs, normally one small [Button](../atoms/button.md): outline-subtle on subtle, outline-contrast on solid. Several sit `--inline-banner-actions-gap` apart. The slot sits `--inline-banner-content-gap` beside the text when there is room, and `--inline-banner-content-gap-wrapped` beneath it when the container is narrow.
5. Close (optional) — a small subtle [Icon Button](../atoms/icon-button.md) `close` at the trailing edge. A notice about a condition that still holds has none ([patterns 1.60](../patterns/01-screen-composition.md), [4.77](../patterns/04-states-feedback.md)).

The action slot and the close take the banner's Shape. On solid they follow the text colour: info, success and error sit in a dark-mode scope so they draw white; neutral and warning take the page's opposite scope (dark on a light page, light on a dark page), matching `--color-ink-inverse`.

## Variants
Status × Appearance.

| Appearance · Status | Background | Border | Glyph | Title / description |
|---|---|---|---|---|
| subtle · info (default) | `--inline-banner-subtle-info-container-background` | `--inline-banner-subtle-info-container-border-color` | `--inline-banner-subtle-info-icon-foreground` | `--inline-banner-subtle-info-text-foreground` |
| subtle · neutral | `--inline-banner-subtle-neutral-container-background` | `--inline-banner-subtle-neutral-container-border-color` | `--inline-banner-subtle-neutral-icon-foreground` | `--inline-banner-subtle-neutral-text-foreground` |
| subtle · success | `--inline-banner-subtle-success-container-background` | `--inline-banner-subtle-success-container-border-color` | `--inline-banner-subtle-success-icon-foreground` | `--inline-banner-subtle-success-text-foreground` |
| subtle · warning | `--inline-banner-subtle-warning-container-background` | `--inline-banner-subtle-warning-container-border-color` | `--inline-banner-subtle-warning-icon-foreground` | `--inline-banner-subtle-warning-text-foreground` |
| subtle · error | `--inline-banner-subtle-error-container-background` | `--inline-banner-subtle-error-container-border-color` | `--inline-banner-subtle-error-icon-foreground` | `--inline-banner-subtle-error-text-foreground` |
| solid · info | `--inline-banner-solid-info-container-background` | `--inline-banner-solid-info-container-border-color` | `--inline-banner-solid-info-icon-foreground` | `--inline-banner-solid-info-text-foreground` |
| solid · neutral | `--inline-banner-solid-neutral-container-background` | `--inline-banner-solid-neutral-container-border-color` | `--inline-banner-solid-neutral-icon-foreground` | `--inline-banner-solid-neutral-text-foreground` |
| solid · success | `--inline-banner-solid-success-container-background` | `--inline-banner-solid-success-container-border-color` | `--inline-banner-solid-success-icon-foreground` | `--inline-banner-solid-success-text-foreground` |
| solid · warning | `--inline-banner-solid-warning-container-background` | `--inline-banner-solid-warning-container-border-color` | `--inline-banner-solid-warning-icon-foreground` | `--inline-banner-solid-warning-text-foreground` |
| solid · error | `--inline-banner-solid-error-container-background` | `--inline-banner-solid-error-container-border-color` | `--inline-banner-solid-error-icon-foreground` | `--inline-banner-solid-error-text-foreground` |

Subtle is a tint with a status border and a status glyph; it informs, and several can share a page. Solid is the strong status fill with its border the same colour; it stands out, one per view. Its text and glyph are always white on info, success and error, and `--color-ink-inverse` on neutral and warning (white in light mode, near-black in dark), which keeps every solid status at 4.5:1 or more. Solid neutral uses the `strong` step so white text passes in light mode. Neutral's subtle border is the plain line colour, not a status one.

Shape: rounded (default) → `--inline-banner-container-radius-rounded`; sharp → `--inline-banner-container-radius-sharp`, for edge-to-edge containers. The actions and the close follow the shape. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | What changes |
|---|---|
| static | The banner has no interaction states of its own. Hover, focus and pressed live on the action Button and the close Icon Button. |

There is no motion: the banner appears and disappears with the content it sits in. A notice clears when its problem is resolved, or when it is closed if it has a close ([patterns 4.77](../patterns/04-states-feedback.md)). Pressing the close reports it; the product removes the banner.

## Spacing & Sizing
| Part | Value |
|---|---|
| Padding (V / H) | `--inline-banner-container-padding-y` / `--inline-banner-container-padding-x` |
| Glyph, content, close | `--inline-banner-container-gap` apart |
| Text → actions | `--inline-banner-content-gap` beside, `--inline-banner-content-gap-wrapped` when wrapped beneath |
| Title → description | `--inline-banner-text-gap` |
| Between actions | `--inline-banner-actions-gap` |
| Glyph | `--inline-banner-icon-size` in a `--inline-banner-icon-box-height` box |
| Border | `--inline-banner-container-border-width`, on both appearances |
| Fonts | title `--inline-banner-title-font`, description `--inline-banner-description-font` |

The banner fills its container's width (Figma's 640 is a preview only) and its height follows the content. The text keeps a minimum width and the actions wrap beneath it when the container is narrower; that minimum has no size token yet, so prototypes wrap the actions once they need more than half the row.

## Properties
| Property | Options | Default |
|---|---|---|
| Status | info, neutral, success, warning, error | info |
| Appearance | subtle, solid | subtle |
| Shape | rounded, sharp | rounded |
| Title | text | Inline banner title |
| Description | text | Supporting line: why, and what to do next. |
| Show Description | on / off | on |
| Show Icon | on / off | on |
| Show Actions | on / off | on |
| Show Close | on / off | off |

The action slot takes any controls; its sample Button is not part of the API.

## Usage
- Use solid for the one message on a view that blocks or changes what the person can do. Make everything else subtle.
- Place it next to what it is about: about a page, at the top of its content below the title; about a section, inside it below its heading; about one element, directly above or below it ([patterns 1.60](../patterns/01-screen-composition.md)).
- Don't stack several solid banners. They compete, and the page reads as an alarm.
- Don't use it for a condition of the whole product. That is [System Banner](system-banner.md), below the header.
- Keep the action outline-subtle on subtle and outline-contrast on solid, so it never outranks the message. A message has at most one action, and errors and warnings always have one ([patterns 1.61](../patterns/01-screen-composition.md)).
- A notice about a live condition can't be closed: leave Show Close off while the condition still holds ([patterns 1.60](../patterns/01-screen-composition.md)).

## Accessibility
- Announce it politely (`role="status"`). Use `role="alert"` only for an error or warning that is time-sensitive ([patterns 6.54](../patterns/06-accessibility.md)).
- Keep the glyph on, or name the status in the text ([patterns 6.11](../patterns/06-accessibility.md)).
- The action and the close carry their own focus states. Give the close the accessible name "Close".
- Known gap: in the Companion dark theme, solid success and solid error put white text on a light fill (about 1.3–1.7:1), below AA. To be fixed in a later release.

## Claude Prompt
Draw a Zebra inline banner as a full-width box inside a form or card, with `--inline-banner-container-radius-rounded` corners, a thin `--inline-banner-container-border-width` border and `--inline-banner-container-padding-y` / `--inline-banner-container-padding-x` padding. The default subtle info banner has a pale blue fill (`--inline-banner-subtle-info-container-background`), a blue border (`--inline-banner-subtle-info-container-border-color`) and a blue `--inline-banner-icon-size` info icon on the left, lined up with a near-black `--inline-banner-title-font` title; under it a `--inline-banner-description-font` supporting line. To the right of the text sits one small outlined button, and a small close (x) icon button at the far right. Other subtle statuses use pale green, amber, red or grey tints with matching borders and glyphs. Solid banners fill with the strong status colour (e.g. `--inline-banner-solid-error-container-background`) with white text and icon (`--inline-banner-solid-error-text-foreground`) and a white outlined button; solid warning and solid neutral (dark grey) use `--color-ink-inverse` text instead, near-black in dark mode.
