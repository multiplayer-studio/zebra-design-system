# Divider

A thin line used to visually separate content into distinct sections or groups, such as list rows, cards, or menu items. Orientation sets whether the line runs horizontal or vertical. It's a static, non-interactive element with no content of its own, choose the orientation that matches the layout direction it needs to divide.

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8795 (page "Divider") · extracted 2026-09-23

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| orientation | enum | horizontal, vertical | horizontal | variant |

- **horizontal** — Use to separate stacked content in a vertical layout, like rows in a list or sections on a page.
- **vertical** — Use to separate side-by-side content, like items in a horizontal row or a toolbar.

## Internal variations & content inputs

None. Divider has no nested instances and no sample content.

## Anatomy

1. **root** — sizes and clips the line. Fixed thickness on the cross axis (height for horizontal, width for vertical); the main axis resizes via constraints to fill its container. Corner radius `radius/none` on all corners, both orientations.
2. **line** — the only visible part. Renders as a horizontal or vertical stroke depending on Orientation, 1px thick (`stroke/thin` token), colored `border/default`. The vertical variant is the same line rotated -90°, not a second drawing.

## Variants

| orientation | root.width | root.height | line.rotation |
|---|---|---|---|
| horizontal (base) | fill (320 measured starting size) | stroke/thin | 0deg |
| vertical | stroke/thin | fill (40 measured starting size) | -90deg |

## Subcomponents

None.

## Tokens & theming

- **Color:** `border/default`
- **Dimension:** `stroke/thin`, `radius/none`
- **Theme axes:** palette (Light, Dark) · size breakpoint (Desktop, Mobile, Tablet, Desktop Compact)

## States, behavior & motion

Divider has no interactive states. Orientation is fixed at placement and never changes at runtime.

Motion: none. Divider is a static visual element, it does not animate or transition between states or orientations.

## Content & slots

Divider has no content slots. It renders only the separator line and holds no text, icon, or nested elements.

## Usage

**Do**
- Choose Orientation to match the layout direction, horizontal to separate stacked content, vertical to separate side-by-side content.
- Resize the instance to fill its container rather than leaving it at the default 320×1 (or 1×40) size, the line stretches with the frame.

**Don't**
- Don't use Divider as a spacing or margin mechanism, it's a visual line with no built-in padding, use layout gap for spacing between elements instead.

## Accessibility

- Non-interactive and not focusable, Divider carries no keyboard or focus behavior of its own
- In code, expose it with the platform's separator role (and an orientation attribute for the vertical variant) so assistive technology announces it correctly
- Uses the `border/default` semantic token for its color, which resolves separately for light and dark mode, don't override it with a hardcoded color

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Thickness | Fixed | 1px, bound to the stroke/thin token, the same for both orientations. |
| Length | Resizable | Not fixed. Constraints on the internal line stretch it to fill the available width (horizontal) or height (vertical) when the instance is resized. |
| Corner radius | Fixed | 0px, bound to the radius/none token, hard edges on both orientations. |
| Color | Theming | border/default token. Resolves to a light neutral gray in light mode and a darker neutral gray in dark mode, so it stays visible in both themes automatically. |

## Issues

**Note**
- root's fixed-axis dimension is bound to `stroke/thin` as "height" in the horizontal variant and as "width" in the vertical variant — the extractor reports this as binding drift (present in 1 of 2 variants each), but it's the correct, axis-appropriate split: each orientation only has a cross-axis thickness to bind, not a real inconsistency.
- The Property Breakdown table's "Default" column shows a small checkmark-style icon for the horizontal row and "-" for vertical — this is the metadata template's own default-value marker, not a component icon prop. Divider has no icon parts.
- Every metadata section (States, Behavior, Content, Anatomy, Usage, Accessibility, Layout & Theming) is present and explicitly filled — States and Behavior say "none" outright rather than being empty, so their absence is authored intent, not a gap in this extraction.
