# Sub Menu Item

> A row in the Navigation Rail's sub menu panel, with a leading glyph, a label, an optional badge and an optional caret. It is the content the rail's Sub Menu Slot is built around, placed either directly or inside a Collapsible Menu Item. Nesting is a property rather than a layout, indenting the row and quietening its label so one level of hierarchy reads without connector lines.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-sub-menu-item>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `default` | `default` `hover` `active` `selected` |  |
| `disabled` | enum | `false` | `false` `true` |  |
| `nested` | enum | `false` | `false` `true` |  |
| `label` | string | `Label` |  |  |
| `showLeadingIcon` | boolean | `true` |  |  |
| `subMenu` | boolean | `true` |  |  |
| `showBadge` | boolean | `false` |  |  |

## When and how to use

### Do

- Turn Sub Menu off for rows that navigate straight to a destination. The caret is a promise that another level exists.
- Keep the leading icon on for every row in a list, or off for all of them. Mixing the two breaks the label alignment down the panel.

### Don't

- Don't nest more than one level. Only a single indent step is built, so a deeper tree will read as though everything sits at the same depth.
- Don't treat this badge as interchangeable with the rail item's. This one is the counter size and sits in the layout, that one is a bare dot that floats over the glyph.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting |  |
| hover | Pointer over the row |  |
| active | Pointer held down |  |
| selected | Marked as the current row |  |
| disabled | Disabled set to true |  |
| focus | Not modelled |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is modelled. Every state change is colour or opacity only, with no movement, scale or elevation.
- **Caret** — The caret has its own open and closed states, but this component does not drive them. Whatever expands the row is responsible for turning the caret with it.
- **Badge** — The badge sits inside the row's layout rather than floating over it, so turning it on takes width away from the label.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | The row's name. Fixed row width with no truncation and no wrapping, so length has to be controlled by the writing. |
| Leading icon | exposed nested Icon instance | Pinned to Size=small with Framed off and left exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Verified, a placeholder rather than a real destination glyph. |
| Badge | exposed nested Notification Indicator | Pinned to Size=medium, which is the counter rather than the bare dot, and left exposed so its value stays editable. This is a different size from the one the rail item pins, so the two badges are not interchangeable. |
| Caret | exposed nested Caret Indicator | Pinned to the horizontal direction and the closed position, and left exposed so the open state is reachable. Toggled as a whole by Sub Menu. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fill | Fills the slot it sits in, drawn at 184px. It does not hug its label, so rows in a list are all the same width. |
| Height | Hug with a floor | 48px, held up by a control/lg minimum so the target never drops below it. |
| Padding | Fixed per Nested | 4px (space/xxs) top and bottom throughout. 12px (space/md) left and right unnested, with the left edge stepping to 24px when nested. |
| Gap | Fixed | 8px (space/sm) between the icon, the label, the badge and the caret. |
| Radius | Fixed | radius/sm on every variant. |
| Icon and caret | Fixed | Both 16px, the icon an Icon at Size=small and the caret a Caret Indicator in its horizontal direction. |
| Badge | In flow | A 16px Notification Indicator at Size=medium, sitting between the label and the caret rather than overhanging the row. |
| Label type | Fixed per Nested | label/medium (14/20, Medium) unnested, indicator/medium (12/14, Medium) nested. |
| Colour | Theming | foreground/primary at rest, foreground/secondary when nested, interactive/ghost/foreground/default when selected, interactive/neutral/foreground/default when pressed and foreground/disabled when disabled. Backgrounds come from the interactive/ghost family. |

## Accessibility

- Nesting is conveyed by indent, a quieter label token and a smaller type style, with no connector line. The hierarchy has to be expressed in code as well.
- Selection is the only state with a background of its own. Hover and press borrow a translucent scrim and leave the label alone, so neither reaches a keyboard or screen reader user.
- There is no focus variant. Keyboard focus has to be rendered by the implementation.
- Disabled is visual only and nothing on the row explains why it is unavailable.
- The caret marks a row that opens another level but does not describe what is inside it, so the label has to carry that on its own.
- Nested rows drop to a 12px type style, which is small for a navigation target. Check it against your minimum readable size.

---
*Generated from `specs/sub-menu-item` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
