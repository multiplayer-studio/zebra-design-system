---
name: Icon
level: atom
status: stable
composes: []
tokens:
  icon-size: '{spacing.spacing-2xl}'
  icon-size-small: '{spacing.spacing-large}'
  icon-size-medium: '{spacing.spacing-xl}'
  icon-size-large: '{spacing.spacing-5xl}'
  icon-foreground: '{colors.main-default}'
  icon-foreground-inverse: '{colors.main-inverse}'
  icon-foreground-disabled: '{colors.main-disabled}'
  icon-stroke-width: '{border.border-size-medium}'
  icon-glyph-duration: '{motion.motion-slow}'
  icon-glyph-easing: '{motion.easing-standard}'
---

# Icon

> Zeta icons come from the Zebra Icons library (v1.9.8), a ligature icon font available in rounded and sharp styles.

## Anatomy
1. Glyph — a font ligature: the icon name (e.g. `add`, `close`) is the text content; the font turns it into the glyph. Alternatively a custom vector glyph in the icon colour.
2. Optional stroke — an outline of `--icon-stroke-width` (transparent by default), painted under the fill.

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
Icons are not interactive on their own. Colour inherits from the parent component's state (e.g. disabled → `--icon-foreground-disabled`). Changes animate over `--icon-glyph-duration` with `--icon-glyph-easing`.

## Spacing & Sizing
| Property | Default |
|---|---|
| size (square) | `--icon-size` |
| colour | `--icon-foreground` |
| stroke width | `--icon-stroke-width` |
| stroke colour | transparent |

The glyph can be slightly narrower than its square (the font draws it at about 0.96 of the size wide), so never rely on it filling its box. **An icon placed inside another element (a checkbox box, an icon button, a chip, an avatar, a badge) is perfectly centred in that element, horizontally and vertically**, even when the icon is as large as or larger than the space available.

Common component sizes: `--icon-size-small` (small button), `--icon-size-medium` (button md/lg, chips, checkbox), `--icon-size` (icon button, FAB small, default), `--icon-size-large` (FAB large). Icons never shrink when space is tight and are not text-selectable.

## Properties
| Property | Options | Default |
|---|---|---|
| Name | any icon name from the library | — |
| Style | rounded, sharp | rounded |
| Size | any spacing token | `--icon-size` |
| Colour | any main/state colour token | `--icon-foreground` |

## Usage
- Browse and download icons from the Zebra Icons library (Sharp/Round toggle, multi-select download).
- Match the icon style to the component shape: rounded UI → round font, sharp UI → sharp font.
- Decorative icons should be hidden from assistive tech; meaningful standalone icons need an accessible label on their interactive parent.
- Don't rely on icon colour alone to convey status; pair it with text.

## Stitch Prompt
Use Zeta icons as simple, solid, single-colour glyphs on a `--icon-size` square, drawn in near-black `--icon-foreground` by default (or white/light `--icon-foreground-inverse` on coloured fills). The default rounded set has softly rounded terminals and corners; the sharp set has square corners for sharp-cornered interfaces. Icons cover Zebra enterprise themes such as barcodes, scanners, printers, RFID, batteries and wifi, alongside the usual navigation, communication, calendar and file-type glyphs. Size them `--icon-size-small` in small controls, `--icon-size-medium` in buttons and chips, and `--icon-size` elsewhere.
