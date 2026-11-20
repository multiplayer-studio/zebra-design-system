# Navigation Rail

> A vertical navigation column for the edge of a desktop view, made of a narrow icon rail and a sub menu panel beside it. It is a container rather than a fixed design, three slots hold the destinations and the variant axes control only the rail's width and whether captions show. Fill the slots with Navigation Rail Item and Sub Menu Item instances. It paints no panel of its own, sitting on surface/section and marking the boundary between rail and panel with a single border.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-navigation-rail>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `expanded` | enum | `false` | `false` `true` |  |
| `label` | enum | `false` | `false` `true` |  |
| `showHeaderAction` | boolean | `true` |  |  |
| `showToggleItem` | boolean | `true` |  |  |
| `showSubMenu` | boolean | `true` |  |  |
| `moreRailItems` | boolean | `true` |  |  |
| `moreFooterItems` | boolean | `true` |  |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `inverse` | boolean | `false` |  |  |
| `railMaxWidth` | length | `null` |  |  |
| `subMenuMaxWidth` | length | `null` |  |  |
| `menuSlot` | slot |  |  |  |
| `footerSlot` | slot |  |  |  |
| `subMenuSlot` | slot |  |  |  |

## When and how to use

### Do

- Fill the Menu Slot and Footer Slot with Navigation Rail Item instances and let the rail handle the spacing and alignment.
- Keep the toggle item visible unless something outside the rail controls Expanded, since it is the only control a user has over the rail's width.

### Don't

- Don't place Menu Slot content and then switch Label. The two Label settings hold that slot's content separately, so the content will not come with you.
- Don't lean on Label to make destinations readable. The caption sits inside the narrow column and only the shortest words fit, Expanded is the setting that gives labels room.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Collapse / expand | The Toggle item, or Expanded set from outside |  |
| Sub menu open / close | Show Sub menu, or choosing a destination with a second level |  |
| Group open / close | A Collapsible Menu Item header |  |

## Behaviour

- **Motion** — Collapse / expand, sub menu open / close and group open / close all use animations/smooth (ease-in-out, 250ms), the caret's turn included. Turn motion off under prefers-reduced-motion.
- **Width change** — Expanded and Show Sub menu both change the component's overall width. Whatever sits beside the rail has to absorb the difference, so plan the page for every width you intend to ship.
- **Truncated labels** — Sub menu labels that don't fit end in an ellipsis. Hovering a cut-off label for 3 seconds shows it in full in a tooltip; keyboard focus shows it at once. Labels that fit show no tooltip, and the tooltip is not announced a second time to screen readers.
- **Caret** — Carets turn a single glyph rather than swapping between two. Figma shows each end state with its own glyph; build one glyph that rotates, on animations/smooth inside the rail.
- **Vertical fill** — The menu list takes whatever height is left between the header block and the footer, so the footer stays pinned to the bottom however many items sit above it.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Menu Slot | slot, holds Navigation Rail Item | Additional destinations below the three built-in rail items. It ships holding a Divider and three items. See the Navigation Rail Item Metadata frame. Its content is stored separately for each Label setting, so switching Label leaves the content behind. |
| Footer Slot | slot, holds Navigation Rail Item | Destinations pinned to the bottom, above the two fixed footer items. It ships holding a Divider and three items, and the same content is shared by every variant. |
| Sub Menu Slot | slot, holds Sub Menu Item and Collapsible Menu Item | The second-level list inside the panel. It ships holding one Collapsible Menu Item and four Sub Menu Items, and its content is shared by every variant. See the Sub Menu Item Metadata frame. |
| Sub Menu Header | exposed nested instance | The panel's title bar, carrying a back affordance, an editable title and a trailing slot of its own holding a Button. The rail leaves the instance exposed, so all of that is reachable without detaching. The shape of all sub elements are inherited from the main rail component. |
| Header and header action | fixed nested instances | The header is a Navigation Header showing an avatar. The action below it is an Icon Button in the narrow rail and a Button in the wide one. Neither is a slot, so changing them means overriding the nested instance. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Hug | The narrow rail is 72px and the wide rail 200px; Rail Max Width can cap the wide rail. The sub menu sizes to its content: as wide as its widest top-level row or its header, never narrower than 240px, and all rows share that width. A Collapsible Menu Item never makes it wider. Sub Menu Max Width can cap it. Figma draws the sub menu at a fixed 240px; build it to size to its content. |
| Height | Fill | Fills its parent, drawn at 991px. The icon rail and the panel both fill it, and the menu list absorbs the space left between the header block and the footer. |
| Rail padding | Fixed | 12px on all four sides of the icon rail, space/md left and right and space/card top and bottom, with a 12px (space/md) gap between the header, the action, the menu list and the footer. |
| Item spacing | Fixed | 4px (space/xxs) between items in both the menu list and the footer. The Menu Slot adds 4px (space/xxs) of horizontal padding of its own. |
| Panel padding | Fixed | The Sub Menu Slot insets its rows by 8px (space/sm) on all four sides, with a 4px (space/xxs) gap between them. |
| Border | Fixed | A single 1px border on border/default down the leading edge of the sub menu panel, plus a 1px bottom border on the same token under the Sub Menu Header. Nothing else in the component is stroked. |
| Fill | Theming | The rail always shows in dark mode, whatever the page's mode; Inverse shows it in light mode. It sits on surface/section, and neither the icon rail nor the panel paints a fill of its own. |
| Colour | Theming | The rail binds only its surface and its two borders. Every other colour comes from the items in the slots. |

## Accessibility

- The rail is a container and announces nothing itself. The destinations inside carry the meaning, so each needs a clear name even when only its glyph shows.
- Collapsed, destinations are glyph-only unless Label is on. An icon is not a name, so the accessible name has to come from code.
- Exactly one destination should read as selected across the rail and the panel together, and nothing in the component enforces that.
- The panel is separated from the rail by a single border on its leading edge. Check that border/default reads against surface/section, because nothing else marks the boundary.
- The toggle item is the only way a user changes the rail's width. Hiding it without providing another control strands anyone who needs the labels.

---
*Generated from `specs/navigation-rail` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
