# Progress Bar

A horizontal track that fills to show how far an ongoing process has got. Progress is a single value that grows from empty to full, with two further modes for when the extent is not known. An optional label above the bar reports the state in words. Nothing here animates, so both the fill's growth and the indeterminate movement belong to the implementation.

Source: [Progress Bar board](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1345) on the Progress Indicators page · extracted 2026-11-06

Progress Bar and [Progress Circle](../progress-circle/progress-circle.spec.md) share a Figma page but have a metadata frame each, so they are specced separately.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `progress` | enum (a number in code) | 0%, 25%, 50%, 100%, Indeterminate, Buffering | `0%` | variant |
| `shape` | enum | rounded, sharp | `rounded` | variant |
| `size` | enum | small, large | `small` | variant |
| `showLabel` | boolean | true, false | `true` | labelRow |
| `showTrack` | boolean | true, false | `true` | track, buffer |
| `showMoreDetails` | boolean | true, false | `false` | trailingSlot |
| `trailing` | slot | any | empty | trailingSlot |

**progress** — 0% to 100%: "The bar reports one value that grows from empty to full. Figma offers it as four fixed steps only because a variant cannot hold a number, so pick the nearest when laying out and let the implementation drive the real value. The steps are samples, not thresholds worth designing around." · Indeterminate: "Work is happening but its extent is unknown. The indicator becomes a short segment that a real implementation slides along the track, so it should never sit still in a shipped screen." · Buffering: "Code only: a band shows how much has preloaded; the indicator never runs past it. Determinate bars only, never indeterminate."

In code: a numeric value with a max, a mode (determinate, indeterminate, buffering) and, for buffering, a buffer value. **Owner decision:** the band (`buffer`) is what has preloaded and shows only when `buffering` is on, and never on an indeterminate bar; the value never runs past it.

**shape** — rounded: "Softened ends on both the track and the fill, matching the system's rounded controls." · sharp: "Square ends, for a bar sitting flush against square surfaces. Beside rounded controls the two treatments read as different components."

**size** — small: "The everyday bar, thin enough to sit under a label without dominating it." · large: "A heavier bar for when progress is the main thing on the surface rather than a detail beside other content."

**showLabel** — true: "Shows the text row above the bar. The wording is fixed by the Progress value rather than set as a property, so it changes when the value does." · false: "Hides the row, leaving the bar alone. Only do this where nearby copy already names the task, because a bar on its own reports a proportion and not a subject."

**showTrack** — true: "Shows the unfilled remainder behind the indicator, which is what makes the proportion readable." · false: "Hides it, leaving only the filled portion. The bar then shows a length with nothing to measure it against." (Also hides the Buffering band, see issues.)

**showMoreDetails** — true: "Reveals a slot at the trailing end of the label row for supporting detail. It shares the row with the label, so a long label and a filled slot will compete for the same space."

**trailing** (Figma `Right Slot`, a native SLOT property) — "Trailing content in the label row, revealed by Show More Details. It ships holding a hidden Icon and suggests no components, so it stays empty until filled. One property serves every variant, so content placed here survives a change of Progress, Shape or Size."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

No swap-only variations. Content inputs: the **label** string (baked per variant in Figma, samples "0%", "25% complete", "50% complete", "Complete", "Uploading...", "Loading..."; a plain string in code), the **value** that drives the indicator width, and on Buffering the **buffer value** that drives the band.

## Anatomy

1. **Bar (root)** — "The outer frame. Fixed width, stacking the label row above the indicator group with a gap between them, and hugging whatever height the chosen Size produces." Vertical, gap `space/lg`, no padding, radius `radius/none`, clips. Fixed width (408Px measured), hugs height (44Px small, 52Px large).
2. **Label row** — "Holds the text that reports the state and, when Show More Details is on, a trailing slot beside it." Horizontal, centred, fills width, hugs height; gap is a raw value (issues). Visible when `showLabel`.
   - **Label** — `label/medium`, colour `foreground/secondary`, start-aligned, fills width, wraps.
   - **Trailing slot** — horizontal, gap `space/2xs`, padding `space/none`, hugs. Visible when `showMoreDetails`. Default content is a hidden glyph `hourglass` (rounded family, Icon Size=small, currentColor); in code the slot is empty by default.
3. **Indicator group** — "The track, the indicator that fills it, and on Buffering a third band covering the buffered span." Fills width; fixed thickness per size (not token-bound). Stacking bottom to top: track, buffer, indicator.
   - **Track** — fills the group, fill `surface/track`, radius per shape × size. Visible when `showTrack`.
   - **Buffer** (Buffering only) — anchored left, width = buffer value (sampled at three quarters), fill `surface/shade` (apply the token alone, see issues), radius per shape × size. Visible when `showTrack`.
   - **Indicator** — anchored left, full thickness, width = value as a share of the track; on Indeterminate and Buffering a short fixed-length segment. Fill `foreground/link`, radius per shape × size.

## Variants

| size | thickness (measured) | root height (measured) | radius when rounded |
|---|---|---|---|
| small | 8Px | 44Px | `radius/sm` |
| large | 16Px | 52Px | `radius/md` |

| shape | track / buffer / indicator radius |
|---|---|
| rounded | `radius/sm` (small) · `radius/md` (large) |
| sharp | `radius/none` |

| progress | label sample | indicator (measured, track 408Px) |
|---|---|---|
| 0% | 0% | 0Px |
| 25% | 25% complete | 1/4 |
| 50% | 50% complete | 1/2 |
| 100% | Complete | 408Px (full) |
| Indeterminate | Uploading... | 143Px segment at 133Px from the start |
| Buffering | Loading... | 143Px segment at the start, plus buffer band 3/4 |

## Subcomponents

None. The only nested instance is the hidden `Icon` default content of the trailing slot (see [Icon](../icon/)); it is delivered as the glyph `hourglass`.

## Tokens & theming

- **Colour:** `foreground/link`, `foreground/secondary`, `surface/track`, `surface/shade`.
- **Dimension:** `space/{lg, xxs, none}`, `radius/{none, sm, md}`.
- **Typography:** `label/medium`. **Glyphs:** `hourglass`.
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).

All 11 names resolve in `tokens/base`; `hourglass` is in the font and not retired.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | "The bar has no hover, pressed, focus or disabled states. It reports a value rather than accepting input, so the only thing that changes its appearance is the Progress value itself." |
| Indeterminate | Progress set to Indeterminate | — | "The indicator becomes a short fixed-length segment rather than a measured fill. Figma draws it in one position, a real implementation moves it along the track." |
| Buffering | Progress set to Buffering | — | "A band shows how much has preloaded; the indicator never runs past it. No band on an indeterminate bar; don't build Figma's moving segment over the band." |

- **Motion** — "Figma stores no timing and the bar models no transition. Every Progress value is a static snapshot, so the fill growing, and the indeterminate segment travelling, both belong to the implementation."
- **Indeterminate and Buffering** — "Both are drawn frozen in a single position. Shipping either as a still misrepresents them, because their whole meaning is that they are moving."
- **Reflow** — "Width is fixed and height comes from the chosen Size, so the bar never grows with its content. A long label wraps inside the row above rather than widening the bar."

## Content & slots

- **Label** (text baked per Progress value) — "The row above the bar. It is not a text property, so its wording is fixed by the Progress value and has to be overridden on the instance to say anything else. The shipped strings read as placeholders, for example Uploading... on Indeterminate."
- **Right Slot** (slot, empty by default) — "Trailing content in the label row, revealed by Show More Details. It ships holding a hidden Icon and suggests no components, so it stays empty until filled. One property serves every variant, so content placed here survives a change of Progress, Shape or Size."
- **Track and indicator** (fixed parts) — "Neither is a slot. The indicator's width is the value, so in Figma it is set by choosing the nearest step or overriding the width directly, and at runtime it is driven straight from the real number."

## Usage

**Do**
- Use Indeterminate or Buffering when the duration genuinely is not known. A measured bar sitting at a guessed percentage is worse than one that admits it cannot measure.
- Keep the label on unless nearby copy already names what is progressing. The bar reports a proportion, not a subject.

**Don't**
- Don't ship Indeterminate or Buffering as a still. Both are drawn frozen here and only make sense in motion.
- Don't leave the shipped label copy in place. Strings like Uploading... are placeholders tied to the variant, not wording anyone chose for your screen.

## Accessibility

- The bar reports a value visually and nothing else. The current value, its range and what it refers to all have to be exposed in code.
- The label wording is fixed per Progress value and the shipped strings read as placeholders. Replace them with copy that names the actual task.
- Turning Show Track off removes the reference the fill is measured against, which makes the proportion much harder to judge.
- Indeterminate and Buffering convey that work continues through movement. Someone who cannot perceive the animation gets no signal from them, so pair either with text.
- The fill and the track are separated by colour alone. Check foreground/link against surface/track on the surface you place the bar on.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fixed | "408px as drawn. The bar does not hug its content, so whoever places it decides the width." |
| Height | Hug per Size | "44px at small and 52px at large with the label shown. The difference is the indicator group, which is 8px at small and 16px at large." |
| Gap | Fixed | "space/lg between the label row and the indicator group. The label row's own internal gap is a raw 10px rather than a token." |
| Radius | Fixed per Shape and Size | "The track and indicator take radius/sm at small and radius/md at large while Shape is rounded, and radius/none while it is sharp. The radius scales with thickness so the ends stay fully round." |
| Indicator width | Fixed per Progress | "The indicator's width is the value expressed as a share of the 408px track. Figma samples it at 0, 204 and 408px because a variant cannot carry a number, and both Indeterminate and Buffering draw a fixed 143px segment instead." |
| Buffered band | Fixed | "Buffering adds a 306px band on surface/shade from the start of the track to the buffered point." |
| Label type | Fixed | "label/medium, IBM Plex Sans Medium." |
| Colour | Theming | "The indicator is foreground/link, the track surface/track, the band surface/shade and the label foreground/secondary." |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1997) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5054-90) · [0% base](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1998) · [50%](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-2002) · [Indeterminate](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4285-2023) · [Buffering](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4285-2027) · [sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4330-2072) · [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4411-5171)

## Issues

**Warn**
- **Band opacity doubled.** Figma lays a 10% paint opacity over `surface/shade`, which is already a 10% alpha, so the band renders at about 1%. Use the token alone.
- **Raw gap.** The label row gap is a raw value in every variant (the metadata admits it).
- **Thickness has no token.** 8Px / 16Px indicator-group heights are unbound, while radius is bound.
- **0% is faked.** The 0% variants use a raw right padding the width of the track plus an absolute track; others use an in-flow track. Implement 0% as a zero-width indicator.
- **Show Track hides Buffering too.** The band shares the property, so Buffering without a track looks like a stuck bar. Not documented.

**Note**
- Indicator-group radius is bound in 20 of 24 variants, mixing `radius/sm` and `radius/none` regardless of Shape. The group doesn't clip, so ignore it.
- Metadata lists width samples 0, 204, 408; there is also 25% at 102Px.
- Buffering variants fix the root height; others hug. Same rendered height.
- The indicator uses `foreground/link`; recolouring links recolours every bar.
- Right Slot is a native SLOT property, absent from the Property Breakdown table; default content is a hidden `hourglass` glyph.
- Progress is an enum only because variants can't hold numbers.
- No motion modelled (stated in the metadata); no component description.
