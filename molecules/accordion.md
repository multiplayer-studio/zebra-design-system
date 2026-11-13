---
name: Accordion
level: molecule
status: stable
composes: [../atoms/icon-button.md, ../atoms/caret-indicator.md, ../atoms/divider.md, ../atoms/icon.md]
tokens:
  # container
  accordion-container-border-color: '{colors.color-line-default}'
  accordion-container-border-width: '{stroke.stroke-thin}'
  accordion-container-radius-sharp: '{radius.radius-none}'
  accordion-container-radius-rounded: '{radius.radius-lg}'
  accordion-container-gap: '{space.space-none}'
  # header
  accordion-header-height: '{primitives.scale-16}'
  accordion-header-background-enabled: '{colors.color-status-ghost-default}'
  accordion-header-background-hover: '{colors.color-status-ghost-faint}'
  accordion-header-padding: '{space.space-lg}'
  accordion-header-gap: '{space.space-sm}'
  accordion-selectable-header-padding: '{space.space-sm}'
  accordion-selectable-header-gap: '{space.space-2xs}'
  accordion-title-foreground: '{colors.color-ink-high}'
  accordion-title-font: '{typography.type-title-medium}'
  accordion-selected-mark-foreground: '{colors.color-ink-high}'
  accordion-selected-mark-size: '{icon.icon-frame-size}'
  # divider
  accordion-divider-color: '{colors.color-line-default}'
  accordion-divider-width: '{stroke.stroke-thin}'
  # content
  accordion-content-padding: '{space.space-lg}'
  accordion-content-gap: '{space.space-sm}'
---

# Accordion

> A vertically stacked list of disclosure rows sharing one container, for a page with more sections than room to show them.

## Anatomy
1. Container — the outer frame: owns the border, the radius and the vertical stack (`--accordion-container-gap`, no padding). It has no fill; every surface colour comes from the rows.
2. Row — one item: a header, an optional [Divider](../atoms/divider.md) (`--accordion-divider-width` `--accordion-divider-color`) closing it off from the next row, and, when open, the content beneath.
3. Header — `--accordion-header-height` tall, `--accordion-header-background-enabled` at rest. Holds:
   - Leading control (Selectable on) — an [Icon Button](../atoms/icon-button.md) (subtle, medium) carrying the caret; it opens and closes the row and takes its shape from the accordion.
   - Title — one line of plain text in `--accordion-title-font` `--accordion-title-foreground`. The only text the row takes.
   - Caret (Selectable off) — a [Caret Indicator](../atoms/caret-indicator.md) (`expand_more`, size medium: `--caret-indicator-icon-size-medium`, `--caret-indicator-icon-foreground`) trailing the title. Not a control: the whole header is the target.
   - Selection mark (Selected on) — a framed `check_mark` [Icon](../atoms/icon.md), `--accordion-selected-mark-size` square, `--accordion-selected-mark-foreground`, at the trailing edge. It reports the selection rather than offering it.
4. Content slot (Open on) — any content, `--accordion-content-padding` on every side and `--accordion-content-gap` between its children. It sets the open row's height.

## Variants
| Selectable | Header padding | Header gap | Controls | Tap behaviour |
|---|---|---|---|---|
| on (default) | `--accordion-selectable-header-padding` | `--accordion-selectable-header-gap` | leading Icon Button, title, selection mark when selected | the leading control opens and closes; the rest of the header selects |
| off | `--accordion-header-padding` | `--accordion-header-gap` | title, trailing caret | the whole header opens and closes |

| In card | Border | Dividers |
|---|---|---|
| on (default) | `--accordion-container-border-width` inside, `--accordion-container-border-color` | under every row except the last |
| off | none | none; the surrounding layout supplies the separation |

Shape (the `rounded` property): on (default) → `--accordion-container-radius-rounded`, rounded leading Icon Buttons; off → `--accordion-container-radius-sharp`, sharp leading Icon Buttons. Only the container's outer corners respond, so the difference shows at the first and last rows. Figma defaults to sharp; the system default is rounded. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| State | Background | Notes |
|---|---|---|
| default | `--accordion-header-background-enabled` | resting row |
| hover | `--accordion-header-background-hover` | pointer devices only; title, caret and mark hold, so the background carries the whole change |
| open | unchanged | the content appears below the header and the caret rotates to point at it |
| selected | unchanged | Selectable only: the mark appears and the title gives up the width it needs |

No transition is defined for the content: opening a row is the content appearing, while the caret turns over its own `--caret-indicator-icon-transition`. Only one row is open at a time. The container itself never repaints; hover belongs to the rows, and the leading Icon Button runs its own interaction states.

## Spacing & Sizing
| Part | Size | Padding | Gap |
|---|---|---|---|
| Container | fills the available width, hugs the rows | none | `--accordion-container-gap` |
| Header (Selectable off) | `--accordion-header-height` | `--accordion-header-padding` | `--accordion-header-gap` |
| Header (Selectable on) | `--accordion-header-height` | `--accordion-selectable-header-padding` (the leading control is taller than the title) | `--accordion-selectable-header-gap` |
| Divider | `--accordion-divider-width`, added under the row | — | — |
| Content | hugs its content | `--accordion-content-padding` | `--accordion-content-gap` |

A row with its divider is `--accordion-header-height` plus `--accordion-divider-width` tall. The leading control is a medium Icon Button; the caret is `--caret-indicator-icon-size-medium`; the selection mark is `--accordion-selected-mark-size`.

## Properties
**Accordion**
| Property | Options | Default |
|---|---|---|
| Selectable | on / off | on |
| rounded | on / off | on |
| In card | on / off | on |
| Items | rows (a single content slot in code) | — |

**Row**
| Property | Options | Default |
|---|---|---|
| Title | text | Heading |
| Open | on / off | off |
| Selected | on / off (Selectable only) | off |
| Show divider | on / off (set by the accordion from In card and position) | on |
| Content | slot, any content (Open only) | — |

Hover is driven by interaction, never set on a static layout. The last row never shows its divider.

## Usage
- Choose Selectable once for a whole list, before filling it. A row that selects beside rows that only open reads as two different controls.
- Use Selectable off for content reveal, an FAQ or a settings group where nothing is chosen; use it on when people must mark items, not just read them.
- Write titles that name the section: the caret says a row opens, never what is inside.
- Keep In card consistent across sibling lists on one screen; it governs the dividers as well as the border.
- Whether one row or several may be selected is decided where the accordion is used; rows don't link their selections.
- Don't put a second control inside a non-selectable row: the whole header is one target.
- Don't use Selected without Selectable: the mark would appear with no control behind it.

## Accessibility
- Selectable off: each header is a single button carrying `aria-expanded` and controlling its content region.
- Selectable on: two targets per row, each with its own name. The leading control carries `aria-expanded` ("Show details for …"); the rest of the header carries the selection (`aria-pressed` or `aria-checked`). The trailing mark is decorative once the state is exposed.
- The caret's rotation is the only visual sign of open; expose expanded and collapsed as real state.
- Opening a row inserts content into the reading order; keep it directly after its header so it is reached next.
- Hover changes only the background, so keyboard users rely on a focus ring on the header and on the Icon Button's own ring. Figma models no focus state; build it in code.
- With In card off there is no border or divider; check the list still reads as a list at rest.
- Titles are heading-sized (`--accordion-title-font`); check the hierarchy on a screen that has real headings.

## Stitch Prompt
Draw a full-width list with a thin light grey `--accordion-container-border-color` border and softly rounded outer corners (`--accordion-container-radius-rounded`), holding a stack of `--accordion-header-height` rows separated by thin light grey lines. Each row has a near-black `--accordion-title-font` IBM Plex Sans title `--accordion-header-padding` from the left and a small down-pointing caret at the right. The second row is open: its caret points up, and below it sits plain body content with `--accordion-content-padding` padding. A hovered row tints very faint grey (`--accordion-header-background-hover`). In the selectable version each row instead starts with a rounded ghost icon button holding the caret, and a selected row shows a check mark at its right edge.
