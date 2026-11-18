---
name: Priority Pill
level: atom
status: stable
composes: [../atoms/icon.md]
tokens:
  # low, medium, high (neutral; the glyph and word carry the level)
  priority-pill-low-container-background: '{colors.color-fill-sunken}'
  priority-pill-low-circle-background: '{colors.color-fill-default}'
  priority-pill-low-circle-foreground: '{colors.color-ink-high}'
  priority-pill-low-label-foreground: '{colors.color-ink-high}'
  priority-pill-medium-container-background: '{colors.color-fill-sunken}'
  priority-pill-medium-circle-background: '{colors.color-fill-default}'
  priority-pill-medium-circle-foreground: '{colors.color-ink-high}'
  priority-pill-medium-label-foreground: '{colors.color-ink-high}'
  priority-pill-high-container-background: '{colors.color-fill-sunken}'
  priority-pill-high-circle-background: '{colors.color-fill-default}'
  priority-pill-high-circle-foreground: '{colors.color-ink-high}'
  priority-pill-high-label-foreground: '{colors.color-ink-high}'
  # urgent (strongest neutral)
  priority-pill-urgent-container-background: '{colors.color-fill-inverse}'
  priority-pill-urgent-circle-background: '{colors.color-ink-inverse}'
  priority-pill-urgent-circle-foreground: '{colors.color-ink-high}'
  priority-pill-urgent-label-foreground: '{colors.color-ink-inverse}'
  # shape
  priority-pill-container-radius: '{radius.radius-pill}'
  priority-pill-circle-radius: '{radius.radius-pill}'
  # sizes
  priority-pill-container-gap: '{space.space-2xs}'
  priority-pill-container-padding-y-large: '{space.space-2xs}'
  priority-pill-container-padding-start-large: '{space.space-2xs}'
  priority-pill-container-padding-end-large: '{space.space-sm}'
  priority-pill-container-padding-end-badge-large: '{space.space-2xs}'
  priority-pill-container-padding-y-small: '{space.space-3xs}'
  priority-pill-container-padding-start-small: '{space.space-3xs}'
  priority-pill-container-padding-end-small: '{space.space-sm}'
  priority-pill-container-padding-end-badge-small: '{space.space-3xs}'
  priority-pill-circle-size-large: '{control.control-icon-md}'
  priority-pill-circle-size-small: '{control.control-icon-sm}'
  priority-pill-glyph-size: '{icon.icon-size-small}'
  priority-pill-rank-font-large: '{typography.type-indicator-medium}'
  priority-pill-rank-font-small: '{typography.type-indicator-small}'
  priority-pill-label-padding-end-large: '{space.space-2xs}'
  priority-pill-label-padding-end-small: '{space.space-3xs}'
  priority-pill-label-font-large: '{typography.type-body-small}'
  priority-pill-label-font-small: '{typography.type-indicator-small}'
---

# Priority Pill

> Shows where an item sits on a four-step scale, from low to urgent.

## Anatomy
1. Pill — the surround, a `--priority-pill-container-radius` row filled per Level. On badge it is the whole component.
2. Circle — a light disc (`--priority-pill-circle-radius`) filled with `--priority-pill-<level>-circle-background`, holding either a direction glyph or a rank number, never both, drawn in `--priority-pill-<level>-circle-foreground`.
3. Glyph (Leading=icon) — an [Icon](../atoms/icon.md) at `--priority-pill-glyph-size`, fixed per level: `arrow_down` (low), `remove` (medium), `arrow_up` (high), `priority_urgent` (urgent). A context override: it takes the circle foreground, not the inherited text colour.
4. Rank (Leading=number) — one or two characters in `--priority-pill-rank-font-large` / `--priority-pill-rank-font-small`. The circle is a fixed square and does not grow with the value.
5. Label (lozenge only) — the priority name, in a wrapper with `--priority-pill-label-padding-end-large` trailing padding, so the text clears the end of the pill.

## Variants
| Level | Pill | Circle | Glyph / rank | Label |
|---|---|---|---|---|
| low (default) | `--priority-pill-low-container-background` | `--priority-pill-low-circle-background` | `--priority-pill-low-circle-foreground` | `--priority-pill-low-label-foreground` |
| medium | `--priority-pill-medium-container-background` | `--priority-pill-medium-circle-background` | `--priority-pill-medium-circle-foreground` | `--priority-pill-medium-label-foreground` |
| high | `--priority-pill-high-container-background` | `--priority-pill-high-circle-background` | `--priority-pill-high-circle-foreground` | `--priority-pill-high-label-foreground` |
| urgent | `--priority-pill-urgent-container-background` | `--priority-pill-urgent-circle-background` | `--priority-pill-urgent-circle-foreground` | `--priority-pill-urgent-label-foreground` |

Priority is a separate scale from status and never borrows status colours ([DESIGN.md §3 Status](../DESIGN.md)). Every level is neutral: the level is carried by its place on the scale, its glyph and its word. Low, medium and high share one quiet grey; urgent alone inverts to the strongest neutral, so it stands out without a status colour. The per-level tokens are kept so a product can add a quiet priority colour later.

| Variant | Shows | Width |
|---|---|---|
| lozenge (default) | circle + label | hugs the label |
| badge | circle only | a fixed square: circle plus padding all round |

| Leading | Circle holds |
|---|---|
| icon (default) | the per-level direction glyph |
| number | the Priority Number |

## States
| State | What changes |
|---|---|
| static | the only state; nothing answers hover, focus or press |

No transition is defined: a level change swaps pill fill, circle, label colour and glyph together. Badge removes the label rather than hiding it, so whatever the label carried must be available elsewhere on the row.

## Spacing & Sizing
| Size | Circle | Padding (V / start / end) | Badge end padding | Gap | Label end padding | Label font | Rank font |
|---|---|---|---|---|---|---|---|
| large (default) | `--priority-pill-circle-size-large` | `--priority-pill-container-padding-y-large` / `--priority-pill-container-padding-start-large` / `--priority-pill-container-padding-end-large` | `--priority-pill-container-padding-end-badge-large` | `--priority-pill-container-gap` | `--priority-pill-label-padding-end-large` | `--priority-pill-label-font-large` | `--priority-pill-rank-font-large` |
| small | `--priority-pill-circle-size-small` | `--priority-pill-container-padding-y-small` / `--priority-pill-container-padding-start-small` / `--priority-pill-container-padding-end-small` | `--priority-pill-container-padding-end-badge-small` | `--priority-pill-container-gap` | `--priority-pill-label-padding-end-small` | `--priority-pill-label-font-small` | `--priority-pill-rank-font-small` |

Height is the circle plus twice the vertical padding at both sizes; the badge is a square of that height (it has no gap and its end padding matches the start). The glyph stays `--priority-pill-glyph-size` at both sizes, so at small it fills the circle. Small reduces the text as well as the box.

## Properties
| Property | Options | Default |
|---|---|---|
| Label | text, the priority name (lozenge only) | — |
| Priority Number | 1–2 characters (Leading=number only) | 4 |
| Level | low, medium, high, urgent | low |
| Variant | lozenge, badge | lozenge |
| Size | large, small | large |
| Leading | icon, number | icon |

## Usage
- Use lozenge wherever a reader may not already know the scale; the label is the only part that names the level outright.
- Use badge in a dense list or pinned to another object, only where the glyphs are already understood.
- Keep Leading=icon; the glyph changes shape per level, and with the fills neutral it's the main cue after the word.
- Use number only where the exact position in a queue matters. The rank is a position, not a count.
- Don't mix badge and lozenge down one column; they read as two different scales.
- Spend urgent sparingly; using it broadly flattens the scale.
- At small, keep names to one short word.

## Accessibility
- Level is carried by glyph shape and the word, never by colour ([patterns 6.11](../patterns/06-accessibility.md)). With Leading=number the glyph is gone: keep the label, or name the level nearby.
- Badge drops the label. Give it an accessible name from the surrounding structure (e.g. `role="img"` with "Priority 1, urgent").
- The circle's contents (circle foreground on circle background) and the label (on the pill) meet the contrast floors ([patterns 6.1–6.2](../patterns/06-accessibility.md)), especially at small.
- Small text is below comfortable reading size for a long name.
- Nothing is focusable and nothing announces itself; a level change is announced by the surrounding structure ([patterns 6.53](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a Zebra priority pill: a `--priority-pill-container-radius` pill in a neutral fill, with `--priority-pill-container-padding-start-large` padding at the start and `--priority-pill-container-padding-end-large` at the end, starting with a `--priority-pill-circle-size-large` circle that holds a small glyph, followed by the priority name in `--priority-pill-label-font-large` text. Low, medium and high are a light grey pill (`--priority-pill-low-container-background`) with a white circle and near-black glyph and text: a down arrow for low, a dash for medium, an up arrow for high. Urgent inverts to a near-black pill (`--priority-pill-urgent-container-background`) with a light circle, a priority mark and light text. The badge variant is just the circle in its ring; the small size uses a `--priority-pill-circle-size-small` circle and `--priority-pill-label-font-small` text. A ranked version shows a number in the circle instead of the glyph.
