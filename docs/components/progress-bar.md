# Progress Bar

> A horizontal track that fills to show how far an ongoing process has got. Progress is a single value that grows from empty to full, with two further modes for when the extent is not known. An optional label above the bar reports the state in words. Nothing here animates, so both the fill's growth and the indeterminate movement belong to the implementation.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-progress-bar>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `progress` | enum | `0%` | `0%` `25%` `50%` `100%` `Indeterminate` `Buffering` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `size` | enum | `small` | `small` `large` |  |
| `showLabel` | boolean | `true` |  |  |
| `showTrack` | boolean | `true` |  | Also hides the Buffering band, which shares the property — see issues. |
| `showMoreDetails` | boolean | `false` |  |  |
| `trailing` | slot | `empty (ships holding a hidden Icon)` |  |  |

## When and how to use

### Do

- Use Indeterminate or Buffering when the duration genuinely is not known. A measured bar sitting at a guessed percentage is worse than one that admits it cannot measure.
- Keep the label on unless nearby copy already names what is progressing. The bar reports a proportion, not a subject.

### Don't

- Don't ship Indeterminate or Buffering as a still. Both are drawn frozen here and only make sense in motion.
- Don't leave the shipped label copy in place. Strings like Uploading... are placeholders tied to the variant, not wording anyone chose for your screen.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — | The bar has no hover, pressed, focus or disabled states. It reports a value rather than accepting input, so the only thing that changes its appearance is the Progress value itself. |
| Indeterminate | Progress set to Indeterminate | The indicator becomes a short fixed-length segment rather than a measured fill. Figma draws it in one position, a real implementation moves it along the track. |
| Buffering | Progress set to Buffering | A band shows how much has preloaded; the indicator never runs past it. No band on an indeterminate bar; don't build Figma's moving segment over the band. |

## Behaviour

- **Motion** — Figma stores no timing and the bar models no transition. Every Progress value is a static snapshot, so the fill growing, and the indeterminate segment travelling, both belong to the implementation.
- **Indeterminate and Buffering** — Both are drawn frozen in a single position. Shipping either as a still misrepresents them, because their whole meaning is that they are moving.
- **Reflow** — Width is fixed and height comes from the chosen Size, so the bar never grows with its content. A long label wraps inside the row above rather than widening the bar.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text baked per Progress value | The row above the bar. It is not a text property, so its wording is fixed by the Progress value and has to be overridden on the instance to say anything else. The shipped strings read as placeholders, for example Uploading... on Indeterminate. |
| Right Slot | slot, empty by default | Trailing content in the label row, revealed by Show More Details. It ships holding a hidden Icon and suggests no components, so it stays empty until filled. One property serves every variant, so content placed here survives a change of Progress, Shape or Size. |
| Track and indicator | fixed parts | Neither is a slot. The indicator's width is the value, so in Figma it is set by choosing the nearest step or overriding the width directly, and at runtime it is driven straight from the real number. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Width | Fixed | 408px as drawn. The bar does not hug its content, so whoever places it decides the width. |
| Height | Hug per Size | 44px at small and 52px at large with the label shown. The difference is the indicator group, which is 8px at small and 16px at large. |
| Gap | Fixed | space/lg between the label row and the indicator group. The label row's own internal gap is a raw 10px rather than a token. |
| Radius | Fixed per Shape and Size | The track and indicator take radius/sm at small and radius/md at large while Shape is rounded, and radius/none while it is sharp. The radius scales with thickness so the ends stay fully round. |
| Indicator width | Fixed per Progress | The indicator's width is the value expressed as a share of the 408px track. Figma samples it at 0, 204 and 408px because a variant cannot carry a number, and both Indeterminate and Buffering draw a fixed 143px segment instead. |
| Buffered band | Fixed | Buffering adds a 306px band on surface/shade from the start of the track to the buffered point. |
| Label type | Fixed | label/medium. |
| Colour | Theming | The indicator is foreground/link, the track surface/track, the band surface/shade and the label foreground/secondary. |

## Accessibility

- The bar reports a value visually and nothing else. The current value, its range and what it refers to all have to be exposed in code.
- The label wording is fixed per Progress value and the shipped strings read as placeholders. Replace them with copy that names the actual task.
- Turning Show Track off removes the reference the fill is measured against, which makes the proportion much harder to judge.
- Indeterminate and Buffering convey that work continues through movement. Someone who cannot perceive the animation gets no signal from them, so pair either with text.
- The fill and the track are separated by colour alone. Check foreground/link against surface/track on the surface you place the bar on.

---
*Generated from `specs/progress-bar` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
