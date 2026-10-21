# Pagination

A horizontal bar of page controls, first/previous/next/last jump buttons, a row of page number indicators, and an optional overflow marker for a long page range. Used inside Table Footer and anywhere else a result set needs to be split across pages. If there is only ever one page of results, do not include it at all, an empty or single page pagination bar signals a feature that was not finished.

Source: [Pagination page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3853-1209) · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `showControls` | boolean | true, false | `true` | firstPage, previous, next, lastPage |
| `showMore` | boolean | true, false | `true` | overflow, trailingIndicator |
| `outline` | enum | false, true | `false` | variant |
| `rounded` | enum | false, true | `false` | variant |

**showControls** — true: "Shows First Page, Chevron Left, Chevron Right, and Last Page, the four jump controls, as one group. The default." · false: "Hides all four jump controls at once. Use when only direct page number navigation is offered, no first, last, previous, or next jumping."

**showMore** — true: "Shows the overflow control, the "..." button, together with the trailing page number indicator that follows it, as one paired group. The default." · false: "Hides the overflow control and its paired trailing indicator together. Use when the full page range fits without collapsing pages behind an ellipsis."

**outline** — false: "Every control and indicator renders filled, with no border. The default." · true: "Every control and indicator gains a 1px border. Applies to the whole bar at once, there is no per-button override."

**rounded** — false: "Sharp corners on every control and indicator. The default." · true: "4px corners on every control and indicator. Applies to the whole bar at once, there is no per-button override."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Page numbers** — four Main Slots, one per Outline × Rounded (plus an orphaned fifth), a Figma workaround; in code one list derived from the current page and page count. Sample: three numbers, one selected.

## Anatomy

Root: horizontal, gap `space/sm`, no padding, centred; hugs (388×36Px measured).

1. **First page, previous** — `_controls`, glyphs `first-page`, `chevron-left`; visible when `showControls`. "The leading pair of the jump controls group, toggled together with the trailing pair by Show Controls."
2. **Page numbers** — `_indicators`, gap `space/sm`. "The repeatable indicator slot, one marked selected for the current page."
3. **Overflow + trailing indicator** — `_controls` with `more-horizontal`, then an `_indicators` for the last page; visible when `showMore`. "The "..." control and its paired trailing indicator, shown or hidden together by Show More."
4. **Next, last page** — `_controls`, glyphs `chevron-right`, `last-page`; visible when `showControls`. "The trailing pair of the jump controls group, toggled together with the leading pair by Show Controls."

## Variants

| outline | rounded | radius | border width |
|---|---|---|---|
| false | false | `radius/none` | `stroke/base` |
| true | false | `radius/none` | `stroke/thin` (no trailing indicator — see issues) |
| false | true | `radius/sm` | `stroke/base` |
| true | true | `radius/sm` | `stroke/thin` |

## Subcomponents

### _controls (jump and overflow buttons)
Square `control/sm`, padding `space/sm`; glyph Icon Size=medium, rounded family, colour follows the text (currentColor).

| state | fill | border |
|---|---|---|
| enabled | `interactive/neutral/background/default` | `interactive/neutral/border/default` |
| hover | `interactive/neutral/background/hover` | no-outline `…/border/default` · outline `interactive/neutral/border/hover` |
| pressed | `interactive/neutral/background/pressed` | `interactive/neutral/border/pressed` |
| focused | `interactive/neutral/background/default` | `border/focus` @ `stroke/thick` |
| disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` |

### _indicators (page numbers)
Square `control/sm`, label `body/small`.

| state | fill | border | label |
|---|---|---|---|
| enabled | `interactive/neutral/background/default` | `interactive/neutral/border/default` | `foreground/primary` |
| hover | `interactive/neutral/background/hover` | no-outline `…/border/default` · outline `interactive/neutral/border/hover` | `foreground/primary` |
| pressed | `interactive/neutral/background/pressed` | see issues | `foreground/primary` |
| focused | `interactive/neutral/background/default` | `border/focus` @ `stroke/thick` | `foreground/primary` |
| selected | `interactive/inverse/background/selected` | none on outline | `foreground/inverse` |
| disabled | `interactive/neutral/background/disabled` | no-outline `interactive/neutral/border/disabled` · outline `interactive/primary/border/disabled` | `foreground/disabled` |

## Tokens & theming

- **Colour:** `interactive/neutral/background/{default, hover, pressed, disabled}`, `interactive/neutral/border/{default, hover, pressed, disabled}`, `interactive/inverse/background/selected`, `interactive/inverse/border/default`, `interactive/primary/border/disabled`, `border/{focus, default}`, `foreground/{primary, inverse, disabled}`.
- **Dimension:** `control/sm`, `space/{none, sm}`, `radius/{none, sm}`, `stroke/{base, thin, thick}`.
- **Typography:** `body/small`. **Glyphs:** `first-page`, `chevron-left`, `chevron-right`, `last-page`, `more-horizontal`.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).

All 29 names resolve in `tokens/`; all five glyphs are in the font.

## States, behavior & motion

No States or Behavior sections in the metadata. Which numbers show around the current page, when the overflow appears, and what jumps do at the ends aren't modelled.

## Content & slots

- **Page numbers** (_indicators instances, up to 3 shown, state enabled or selected) — "The repeatable part. One indicator carries State=selected for the current page, the rest stay enabled. Consumer owned, but lives inside whichever Main Slot matches the current Outline/Rounded combination, see Property Breakdown."
- **Jump controls** (_controls instances, fixed to First Page, Chevron Left, Chevron Right, Last Page) — "Parent owned. The four icons and their order are fixed, Show Controls toggles all four together, there is no way to show only one."
- **Overflow** (_controls instance, fixed to the more_horizontal icon) — "Parent owned, fixed glyph. Paired with one trailing _indicators instance under Show More, the two always show or hide together."

## Usage

**Do**
- Use Show Controls and Show More independently, turn off the jump buttons for a short list while keeping the overflow indicator for a long one, or the reverse.
- Set Outline and Rounded once for the whole bar. They are whole-bar styling choices, not something to vary button by button.

**Don't**
- Don’t expect page number content set in the slot to survive switching Outline or Rounded. Each combination owns its own separate slot, re-enter it after changing either.
- Don’t reach for the Main Slot 1 property with key 4489:15, it isn’t wired to any variant. Use whichever Main Slot property your current Outline/Rounded combination actually shows.

## Accessibility

- Keyboard and focus behaviour belongs to the nested _controls and _indicators states, not to Pagination itself. The overflow control has no visible label, it needs an accessible name supplied in code, something like "more pages" rather than reading the glyph.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Control size | 36×36 each | "Every control and indicator is the same fixed square, regardless of Outline or Rounded." |
| Gap | 8px, not token bound | "itemSpacing between every top-level item in the bar, controls, the slot, and indicators alike." |
| Corner radius | Manual, per Outline×Rounded variant | "sharp = 0, rounded = 4, set directly on each variant’s controls and indicators, not bound to a radius variable." |
| Border | Manual, per Outline×Rounded variant | "Outline=true adds a 1px stroke to every control and indicator, Outline=false removes it entirely. Also not token bound." |
| Container | Hugs content, 388px at the 3-indicator default | "Width is not fixed, it grows or shrinks with however many page number indicators the active slot holds." |

## Issues

**Warn**
- **Missing trailing indicator.** `outline=true, rounded=false` shows only the overflow under Show More; the other three variants also show the last page's number.
- **Metadata says "not token bound" — they are.** Gap `space/sm`, radius `radius/none` / `radius/sm`, border `stroke/base` / `stroke/thin`, size `control/sm`.
- **Odd disabled border.** Outline indicators use `interactive/primary/border/disabled`; everything else `interactive/neutral/border/disabled`.
- **Odd pressed border.** The round outline indicator uses `border/default`; the others `interactive/neutral/border/pressed`.
- **Paging behaviour isn't modelled.** The window of numbers, when the overflow shows, and jumps at the ends are for code to decide.

**Note**
- The "outline" indicator sets name their Outline variant `false`; their `stroke/thin` makes them the outline style.
- Selected drops the border on outline indicators.
- The overflow uses a stand-alone `Icon/more_horizontal`; use the font's `more-horizontal`.
- Four Main Slots plus an orphaned fifth are a Figma workaround.
- Control glyph colour isn't bound in Figma; in code it follows currentColor.
- No States or Behavior sections; no component descriptions.
