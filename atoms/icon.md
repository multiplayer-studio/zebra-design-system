---
name: Icon
level: atom
status: stable
composes: []
tokens:
  # sizes
  icon-size: '{control.control-icon-sm}'
  icon-size-xsmall: '{control.control-icon-xs}'
  icon-size-small: '{control.control-icon-sm}'
  icon-size-medium: '{control.control-icon-md}'
  icon-size-large: '{control.control-icon-lg}'
  icon-frame-size: '{control.control-target-min}'
  # colour (inherited from the parent by default)
  icon-foreground: '{colors.color-ink-high}'
  icon-foreground-inverse: '{colors.color-ink-inverse}'
  icon-foreground-disabled: '{colors.color-ink-disabled}'
---

# Icon

> Wraps a single glyph from the Zebra Icons library (v1.9.8, rounded and sharp) so it can be sized consistently and embedded in other components.

## Anatomy
1. Frame — the component's own box. With Framed off it hugs the glyph exactly; with Framed on it is a fixed `--icon-frame-size` square with the glyph centred. It has no fill, padding or radius, so Framed adds room and nothing visible.
2. Glyph — a font ligature (the icon name, e.g. `add`, is the text content and the font draws the glyph), or the icon's inline SVG from `icons.json` (`round` / `sharp`), painted in `currentColor` and sized `1em` (how prototypes draw icons). It takes its colour from the component that embeds it.

## Variants
| Variant | Font family | When |
|---|---|---|
| rounded (default) | `zeta-icons-round` | rounded / full shaped components |
| sharp | `zeta-icons-sharp` | sharp-shaped components |

Components pass the style down automatically (e.g. a sharp button → sharp icons).

**Icon set** — 715 named icons (listed in `icons.json`). Rough families:

| Family (prefix-matched, overlapping) | Count | Examples |
|---|---|---|
| File-type attachments (`*_attach`) | 86 | pdf_attach, docx_attach, zip_attach |
| Outline variants (`*_outline`) | 33 | alert_outline, star_outline, person_outline |
| People / users | 25 | person, person_search, user_circle, groups |
| Comms (chat, call, email, phone, mic, video) | 46 | chat_bubble, end_call, email_outline, video_off |
| Navigation, arrows, menus | 31 | arrow_back, chevron_left, caret_down, expand_more, first_page |
| Calendar, clock, timers | 41 | calendar_day, clock_timer, schedule |
| Charts & data | 22 | chart_bar, chart_pie, analytics, table |
| Device / hardware (Zebra-specific) | 60 | barcode, scanner, printer, uhf_rfid, battery, wifi_0–2, bluetooth |
| Editing & text formatting | 28 | bold, italic, align_left, indent_increase, edit |
| Status & feedback | 27 | check_circle, error, warning, info, help |
| AI | 4 | ai_stars, ai_single_star, ai_measure, ai_attach |
| Brands | 7 | facebook, instagram, linkedin, youtube, google_drive, android |

## States
Icon has no interaction states of its own. Hover, pressed, focus and disabled are all rendered by the parent, and the glyph follows the parent's foreground colour (e.g. disabled → `--icon-foreground-disabled`). It is static: any transition belongs to the embedding component.

## Spacing & Sizing
| Size | Glyph | Framed box |
|---|---|---|
| xsmall | `--icon-size-xsmall` | `--icon-frame-size` |
| small (default) | `--icon-size-small` | `--icon-frame-size` |
| medium | `--icon-size-medium` | `--icon-frame-size` |
| large | `--icon-size-large` | `--icon-frame-size` |

`--icon-size` is the default glyph size. Always square, no padding. With Framed on, the box stays `--icon-frame-size` at every size and the glyph keeps its own size, centred.

The glyph can be slightly narrower than its square (the font draws it at about 0.96 of the size wide), so never rely on it filling its box. **An icon placed inside another element (a checkbox box, an icon button, a chip, an avatar, a badge) is perfectly centred in that element, horizontally and vertically**, even when the icon is as large as or larger than the space available. Icons never shrink when space is tight and are not text-selectable.

Common component sizes: `--icon-size-small` (small button and icon button), `--icon-size-medium` (button and icon button medium/large — the most used step), `--icon-size-large` (navigation header only; use it only where the icon is the focal point).

## Properties
| Property | Options | Default |
|---|---|---|
| Name | any icon name from the library | — |
| Style | rounded, sharp | rounded |
| Size | xsmall, small, medium, large | small |
| Framed | on / off | off |

Colour is not a property: the glyph inherits its parent's foreground. Most embedding components lock Size and Framed, leaving the glyph as the only choice.

## Usage
- Browse and download icons from the Zebra Icons library (Sharp/Round toggle, multi-select download).
- Set the glyph deliberately every time; there is no sensible default icon.
- Match the icon style to the component shape: rounded UI → round font, sharp UI → sharp font.
- Turn Framed on only where the icon is tappable on its own. Inside a button or a menu row the parent already provides the target.
- Don't override the glyph's colour on an instance. Recolour the parent instead, or the parent's states stop working.
- Don't rely on an icon alone to carry meaning; pair it with a visible label.

## Accessibility
- Icon carries no text. Anything it communicates has to be repeated in a visible label or an accessible name on its interactive parent; decorative icons are hidden from assistive tech.
- Framed pads the glyph to `--icon-frame-size`, the minimum tappable size. A bare `--icon-size-small` or `--icon-size-medium` icon is not a target on its own.
- The glyph inherits its parent's foreground colour, so contrast is a property of the surface it lands on rather than of this component.
- There are no interaction states here. Focus and disabled treatments come from the embedding component.
- Don't rely on icon colour alone to convey status; pair it with text.

## Claude Prompt
Use Zebra icons as simple, solid, single-colour glyphs on a square, `--icon-size-small` by default and `--icon-size-medium` inside buttons, drawn in near-black `--icon-foreground` (or white `--icon-foreground-inverse` on coloured fills). The default rounded set has softly rounded terminals and corners; the sharp set has square corners for sharp-cornered interfaces. Icons cover Zebra enterprise themes such as barcodes, scanners, printers, RFID, batteries and wifi, alongside the usual navigation, communication, calendar and file-type glyphs. A standalone tappable icon sits centred in an invisible `--icon-frame-size` square.
