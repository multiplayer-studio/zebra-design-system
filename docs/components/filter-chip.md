# Filter Chip

> Lets someone narrow a set of content by switching criteria on and off, such as categories in a list of results. Use them in groups where more than one can be on at once. Reach for an assist chip when the control triggers an action rather than a filter.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-filter-chip>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `label` | string | `Label` |  |  |
| `active` | boolean | `false` |  |  |
| `state` | enum | `default` | `default` `hover` `focus` `selected` `dragged` | hover and focus are interaction states in code; dragged comes from a reorder interaction; selected overlaps active (see issues). |
| `disabled` | boolean | `false` |  |  |
| `rounded` | boolean | `true` |  |  |

## When and how to use

### Do

- Use active to turn a filter on. It is the only value that both recolours the chip and shows the check mark.
- Keep filter chips in a group where more than one can be on. A single chip that toggles is usually a switch or a checkbox.

### Don't

- Don't mix State=selected with active in one row. They are two different ways to look chosen and they do not match.
- Don't rely on the colour flip alone for the on state. The check mark is what carries it.

## States

| State | Trigger | What changes |
|---|---|---|
| default | — |  |
| hover | Pointer over the chip |  |
| focus | Keyboard focus |  |
| selected | State set to selected |  |
| dragged | Chip being reordered |  |
| disabled | disabled set to true |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is authored. Turning a filter on is a flat swap of fill, text colour and the presence of the check mark.
- **Turning on** — active is what switches the filter. It replaces the neutral palette with interactive/inverse and inserts a leading check mark, which also changes the chip's vertical padding and its gap.
- **Coverage** — Sixteen of the forty possible combinations are built. active=true exists only with State=default and State=focus, so hovering or dragging an active chip is not drawn.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. The only text the chip takes. |
| Selected Icon | nested Icon, present when active is true | An Icon at Size=small swapped to Check Mark, inserted before the label. It is not a slot and carries no property of its own on the chip. |
| Trailing content | not provided | There is no trailing slot. A filter chip cannot carry a count or a remove control without detaching. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug width, fixed height | 32 tall across all sixteen variants. Width hugs the label, plus the check mark when active. |
| Padding | Per active | space/md left and right throughout. Vertically space/sm when active is false and space/xs when it is true, because the 16px check is taller than the label. |
| Gap | Per active | space/xs when active is false, space/sm when true. |
| Radius | Per Rounded | radius/pill when true and radius/none when false. |
| Fill | Per state | interactive/neutral/background at default, hover, focused, selected and disabled, with pressed reused for dragged. active=true overrides all of it with interactive/inverse/background/selected. |
| Border | Per state | 1px inside interactive/neutral/border/default at rest. Focus swaps to 2px focus/outline drawn outside. active=true uses interactive/inverse/border/pressed. Disabled carries none. |
| Label | Theming | indicator/medium, IBM Plex Sans Medium 12 over a 14px line, in interactive/neutral/foreground/default, dropping to the disabled token and flipping to interactive/inverse/foreground/default when active. |

## Accessibility

- An active chip carries a check mark as well as the inverse palette, which is what keeps the on state readable without colour. Do not remove it.
- State=selected shows a chosen chip through colour alone with no check mark, so it fails that test. Prefer active.
- Focus is the only state with a visible outline and it is drawn outside the chip, so check it is not clipped by a scrolling filter row.
- Each chip is an on and off control. Expose a pressed or checked state, not just a label.
- The label uses indicator/medium at 12px over a 14px line. Check it against the inverse palette as well as the neutral one.

---
*Generated from `specs/filter-chip` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
