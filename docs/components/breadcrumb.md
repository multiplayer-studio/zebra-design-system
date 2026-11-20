# Breadcrumb

> Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a level. A long trail collapses its middle into an overflow menu, so every crumb stays reachable.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-breadcrumb>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `flavour` | enum | `default` | `default` `accent` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `collapsed` | enum | `false` | `false` `true` |  |
| `open` | enum | `false` | `false` `true` |  |
| `items` | array |  |  |  |
| `maxItems` | number |  |  |  |
| `label` | string |  |  |  |
| `overflowLabel` | string |  |  |  |
| `portalContainer` | element |  |  |  |

## When and how to use

### Do

- Use it on pages more than one level deep, with the root first.
- Set maxItems where the trail could outgrow its row.

### Don't

- Don't use it for steps in a flow. Stepper is for a sequence, and a breadcrumb is for a place.
- Don't give the current page a link. It is never one, even with an href.

## States

| State | Trigger | What changes |
|---|---|---|
| default | — |  |
| hover | Pointer over a crumb |  |
| focus | Keyboard focus on a crumb |  |
| current | Being the last item |  |
| Overflow control | Its own Icon Button states |  |
| Open | Activating the overflow control |  |

## Behaviour

- **Motion** — No transition is defined. Crumbs change colour at once.
- **Collapse** — With maxItems set and a longer trail, the first crumb stays, then maxItems minus one from the end. The rest move to the menu, in order.
- **Dropdown** — The overflow control is the Template/Dropdown trigger. The menu opens below it, left aligned, space/sm away. It is Dropdown Menu with Compact on, so a short list stays tight.
- **Menu rows** — Each hidden crumb is a Menu Item, with its icon if it has one. Choosing a row runs onSelect, follows href, and closes the menu.
- **Keyboard** — Enter or Space opens the menu. Arrow keys move through the rows. Escape closes it and returns focus to the control.
- **Portal** — Figma only: the menu is drawn inside the component. In code it mounts in a portal and is positioned against the control, with collision handling.
- **Wrapping** — A long trail wraps, with lines space/2xs apart. The separator stays at the end of a line, so each line starts on a crumb. Figma draws one line.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Crumbs | items, consumer owned | The path. Keep labels short, because the trail reads as one line. |
| Label | Text property | The crumb's name. It is the only required part of an item. |
| Icon | Show Icon, nested Icon | An optional glyph before the label. Figma only: an exposed instance. In code it is the item's icon. |
| Separator | Parent owned | chevron-right at small. Figma only: Show Separator. In code it renders after every crumb but the last. |
| Overflow control | Icon Button, parent owned | Small and outline-subtle, with more-horizontal. Its shape follows Shape. |
| Overflow menu | Dropdown Menu, parent owned | Compact on, with Rounded following Shape. Its rows are Menu Items for the hidden crumbs. |
| Sample trail | Figma only | The labels and the number of crumbs are sample content, not API. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug | Hugs the trail. A collapsed trail stands at control/sm, because of the overflow control, so it is taller than a full one. |
| Direction | Row, wrapping | Crumbs and separators in a row, space/md apart. Wrapped lines sit space/2xs apart. |
| Crumb | Tokenised | body/medium, with space/sm between icon and label. foreground/secondary, foreground/link on hover, foreground/primary when current. |
| Icon | Set to small | foreground/primary in every state. foreground/link on an accent current page. |
| Separator | Set to small | chevron-right in foreground/primary. |
| Overflow control | Set to small | Icon Button, outline-subtle. Rounded or sharp from Shape. |
| Overflow menu | Compact | Dropdown Menu with Compact on: space/xs padding, space/none between rows, on surface/overlay. It sits space/sm below the control. |

## Accessibility

- A labelled nav holding an ordered list.
- The last item carries aria-current="page" and is not a link.
- Separators are hidden from assistive tech.
- The overflow control has no visible text, so overflowLabel names it.
- Opening the menu moves focus to its rows, and Escape returns it to the control.
- Hover is colour alone, so keyboard users rely on the focus ring.

---
*Generated from `specs/breadcrumb` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
