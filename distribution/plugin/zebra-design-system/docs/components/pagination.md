# Pagination

> A horizontal bar of page controls, first/previous/next/last jump buttons, a row of page number indicators, and an optional overflow marker for a long page range. Used inside Table Footer and anywhere else a result set needs to be split across pages. If there is only ever one page of results, do not include it at all, an empty or single page pagination bar signals a feature that was not finished.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-pagination>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `showControls` | boolean | `true` |  |  |
| `showMore` | boolean | `true` |  |  |
| `outline` | enum | `false` | `false` `true` |  |
| `rounded` | enum | `false` | `false` `true` |  |

## When and how to use

### Do

- Use Show Controls and Show More independently, turn off the jump buttons for a short list while keeping the overflow indicator for a long one, or the reverse.
- Set Outline and Rounded once for the whole bar. They are whole-bar styling choices, not something to vary button by button.

### Don't

- Don’t expect page number content set in the slot to survive switching Outline or Rounded. Each combination owns its own separate slot, re-enter it after changing either.
- Don’t reach for the Main Slot 1 property with key 4489:15, it isn’t wired to any variant. Use whichever Main Slot property your current Outline/Rounded combination actually shows.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Page numbers | _indicators instances, up to 3 shown, state enabled or selected | The repeatable part. One indicator carries State=selected for the current page, the rest stay enabled. Consumer owned, but lives inside whichever Main Slot matches the current Outline/Rounded combination, see Property Breakdown. |
| Jump controls | _controls instances, fixed to First Page, Chevron Left, Chevron Right, Last Page | Parent owned. The four icons and their order are fixed, Show Controls toggles all four together, there is no way to show only one. |
| Overflow | _controls instance, fixed to the more_horizontal icon | Parent owned, fixed glyph. Paired with one trailing _indicators instance under Show More, the two always show or hide together. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Control size | 36×36 each | Every control and indicator is the same fixed square, regardless of Outline or Rounded. |
| Gap | 8px, not token bound | itemSpacing between every top-level item in the bar, controls, the slot, and indicators alike. |
| Corner radius | Manual, per Outline×Rounded variant | sharp = 0, rounded = 4, set directly on each variant’s controls and indicators, not bound to a radius variable. |
| Border | Manual, per Outline×Rounded variant | Outline=true adds a 1px stroke to every control and indicator, Outline=false removes it entirely. Also not token bound. |
| Container | Hugs content, 388px at the 3-indicator default | Width is not fixed, it grows or shrinks with however many page number indicators the active slot holds. |

## Accessibility

- Keyboard and focus behaviour belongs to the nested _controls and _indicators states, not to Pagination itself. The overflow control has no visible label, it needs an accessible name supplied in code, something like "more pages" rather than reading the glyph.

---
*Generated from `specs/pagination` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
