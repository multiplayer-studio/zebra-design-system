# Navigation Rail Item

> A single destination in a Navigation Rail, shown as a glyph in a square target or, in the wide form, a glyph and label on one row. It is the content the rail's Menu and Footer slots are built around, and the rail sets nothing on it beyond visibility, so every property here is yours per instance. Selection recolours the glyph and label rather than laying a scrim behind them, which is what keeps it distinct from hover and press.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-navigation-rail-item>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `default` | `default` `hover` `active` `selected` |  |
| `disabled` | enum | `false` | `false` `true` |  |
| `expanded` | enum | `false` | `false` `true` |  |
| `label` | string | `Label` |  |  |
| `showLabel` | boolean | `false` |  |  |
| `showIcon` | boolean | `true` |  |  |
| `showBadge` | boolean | `false` |  |  |

## When and how to use

### Do

- Set exactly one item across the whole rail to selected. Selection is the item's job and neither the rail nor the panel manages it.
- Swap the glyph on every item. It ships holding a Star placeholder, which says nothing about where the destination goes.

### Don't

- Don't turn Show Icon off in the narrow form. With the caption hidden too, the item becomes an empty target with nothing to read.
- Don't rely on Show Label to hide labels in the wide form. It only controls the narrow one, where the label is hidden by default anyway.

## States

| State | Trigger | What changes |
|---|---|---|
| default | Resting |  |
| hover | Pointer over the item |  |
| active | Pointer held down |  |
| selected | Marked as the current destination |  |
| disabled | Disabled set to true |  |
| focus | Not modelled |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is modelled. Every state change is colour or opacity only, with no movement, scale or elevation.
- **Badge** — The badge is positioned absolutely over the glyph and sits outside the layout, so showing or hiding it never reflows the item or the rail.
- **Form change** — Switching Expanded changes the layout direction, the padding and the text style all at once. It is a different shape rather than a resize, so it is set by the rail rather than animated.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | The destination's name. There is no truncation and no wrapping, so in the narrow form a long word simply overflows its column. |
| Icon | exposed nested Icon instance | The item pins Icon to Size=small with Framed off and leaves the instance exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Star, a placeholder rather than a real destination glyph. |
| Badge | nested Notification Indicator, toggled by Show Badge | Pinned to Size=small, the dot with no number. The item does not leave this instance exposed, so its value and size cannot be changed without detaching. At this size the dot signals that something is waiting, not how much. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Hug in the narrow form, fixed in the wide one | 48px collapsed, growing only if a caption is wider. 176px expanded, fixed regardless of label length. |
| Height | Hug with a floor | 48px in both forms, held up by a control/lg minimum on both axes so the target never drops below it. |
| Padding | Fixed per form | 8px (space/sm) top and bottom in both. 4px (space/xxs) left and right collapsed, 16px (space/lg) expanded. |
| Gap | Fixed per form | None collapsed, where the caption sits directly under the glyph. 16px (space/lg) expanded, between glyph and label. |
| Radius | Fixed | radius/sm on every variant. |
| Icon | Fixed | A 16px Icon at Size=small with Framed off, in a 16px box that does not clip its content. |
| Badge | Absolute | An 8px Notification Indicator at Size=small, placed at 12,-4 against the 16px glyph box so it overhangs the top-right corner, outside the layout flow. |
| Label type | Fixed per form | indicator/small (10/12, Regular) collapsed, label/medium (14/20, Medium) expanded. |
| Colour | Theming | interactive/neutral/foreground/default at rest, hover and press. interactive/subtle/foreground/default when selected, interactive/subtle/foreground/disabled when disabled. Backgrounds come from the interactive/ghost family. Glyph and label take the same token in every state. |

## Accessibility

- In the narrow form the destination is a glyph alone unless Show Label is on. An icon is not a name, so the accessible name has to come from code.
- Selection is carried by colour on the glyph and label, with no scrim, underline or indicator bar. It needs to be conveyed in code as well.
- Hover and press are carried by a translucent scrim alone and leave the glyph and label unchanged, so neither reaches a keyboard or screen reader user.
- There is no focus variant. Keyboard focus has to be rendered by the implementation.
- Disabled is visual only and nothing on the item explains why a destination is unavailable.
- The badge is a dot with no number at the size this component pins, so whatever it signals needs a text equivalent.

---
*Generated from `specs/navigation-rail-item` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
