# Segmented Control

> A row of mutually exclusive options sharing one track, where exactly one is active at a time. It ships with three segments, two placed directly and a third in a slot, so changing the count means working inside the instance. Reach for Tab Bar when the choice moves between views rather than switching a mode within one.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-segmented-control>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `moreItems` | slot | `one _Segmented item (Item 3, State=default)` |  |  |

## When and how to use

### Do

- Keep the options short and parallel. The row is read in one glance, so uneven label lengths make the track look broken.
- Set exactly one segment to active. The component will not do it, and will happily show two.

### Don't

- Don't use it to move between screens. It switches a mode within one view, which is what separates it from Tab Bar.
- Don't grow it past a handful of segments. Each one hugs its own label, so a long list pushes the track wider than whatever contains it.

## Behaviour

- **Motion** — The active background moves in 0.15s ease-in transition between item in the control. (Active background is not tied to the segmented item but bound to the control, so it moves easily across items)
- **Selection** — The set ships with Item 1 active, there most always be an active segment on.
- **Adding segments** — The count is structural rather than a property. Two segments sit directly in each variant and a third in the slot, so a fourth means duplicating inside the instance. (Figma only implementation)

## Content

| Part | Kind | Guidance |
|---|---|---|
| More items Slot | slot, one segment as shipped | Holds segments beyond the first two. It hugs its content, so whatever is placed there sets how far the track extends. (Implementation makes use of the segment options) |
| Fixed segments | two placed instances, outside the slot | Item 1 and Item 2 are placed directly in each variant rather than in the slot. Removing one means detaching, and Item 1 is the one shipped active. (Figma only) |
| Segment properties | not exposed | The core surfaces none of the segment's properties. Every label, state and flavour is set by selecting into the nested instance. See the _Segmented item frame for what each one offers. (Important! In production, the core can set base properties across elements) |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug both axes | 289 by 44 as shipped with three segments. Width follows the segments, so it grows with their labels. |
| Padding and gap | Fixed | space/xxs on all four sides of the track, with a space/xxs gap between segments. |
| Radius | Per Rounded | radius/sm when true and radius/none when false, on the track and on every segment it places. |
| Fill | Theming | interactive/neutral/background/pressed on the track. No border and no shadow. |
| Segments | Hug | Each segment hugs its own content, so the track is the sum of the labels rather than an equal-width grid. Segments are not the same width as each other. |
| Slot | Hug | The More items Slot hugs whatever is placed in it and sits last in the row. |

## Accessibility

- The control is one choice among several. It needs a radiogroup or tablist role rather than a row of unrelated buttons.
- No focus state exists on the core or on the segments, so arrow-key movement and a visible focus ring both have to come from code.
- The chosen segment is shown by a fill and a text-colour change. Expose the selected state in the markup rather than leaving it to colour.
- The track uses interactive/neutral/background/pressed and the active segment interactive/neutral/background/focused. Check those two against each other, because the difference between chosen and unchosen is the whole point of the control.
- Nothing prevents two segments reading as active at once. That has to be enforced, or the control contradicts itself.

---
*Generated from `specs/segmented-control` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
