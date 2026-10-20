# Slider

A control for choosing a value along a range by dragging a thumb. State, Stepped and Range are the slider's own properties, and the track, the step indicators and the thumb all take their appearance from them rather than being set individually. Stepped marks the valid stops, and Range adds a second thumb so a span can be chosen instead of a single value.

Source: [Slider page](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6125-1084) · component set `6132:3190` · extracted 2026-10-14 (re-extracted) · 2 variants (plus 4 on `_Active Track` and 8 on `_Thumb`)

**Changed since the first extraction:** `Show Steps` is renamed `Stepped`, and the metadata was revised: summary, Stepped intent, States table, Behavior, Anatomy, Accessibility, and Layout & Theming. The structure is otherwise unchanged, and Slider still exposes only Shape.

> **Two blockers.** State, Stepped and Range aren't exposed on Slider in Figma, and nothing models the value, minimum, maximum or step. See [Issues](#issues).

## API

| Prop | Type | Values | Default | Exposed on Slider in Figma? |
|---|---|---|---|---|
| `shape` | enum | `rounded`, `sharp` | `rounded` | yes |
| `state` | enum | `default`, `hover`, `selected`, `disabled` | `default` | **no**: only on nested `_Active Track` |
| `stepped` | boolean | `true`, `false` | `true` | **no**: only on nested `_Active Track` |
| `range` | boolean | `false`, `true` | `false` | **no**: only on nested `_Active Track` |

**shape**
- `rounded`: Match the contour of the controls around the slider. It reaches the track ends and the thumb together, so the two never disagree.
- `sharp`: The square-cornered pairing, for surfaces built from sharp controls.

**state**
- `default`: The resting control. State belongs to the slider and the track, the thumb and the step indicators all inherit it, so it is never set on the parts individually.
- `hover`: Pointer over a thumb. Only that thumb grows; the fill and, in range mode, the other thumb hold. It is the only state that depends on a pointer being present.
- `selected`: A thumb is pressed or has keyboard focus. The active fill and both thumbs take the selected foreground, and only the thumb under the pointer takes the larger size. This is the state to show while a drag is in progress.
- `disabled`: The value cannot be changed. Both the track and the thumb drop to the disabled foreground, so the control still reads as a slider rather than disappearing.

**stepped**
- `true`: Used when specific values are assignable in the range and also marks the valid stops along the track. Without the dots the control implies anything in the range is reachable smoothly.
- `false`: A continuous range with no stops drawn and a smooth transition between values, allowing finer adjustments.

**range**
- `false`: A single value, with one thumb.
- `true`: A span rather than a value. A second thumb marks the start, so both ends are chosen on the same track and each needs its own value.

In code, `hover` and `selected` are interaction states, not props; `disabled` is the only state to set. Per the designer's clarifications (below), **the larger thumb size goes only to the thumb under the pointer** (or being dragged), in every state, and **selected is colour only**: triggered by pressing or keyboard focus, it applies to the fill and both thumbs.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Internal variations & content inputs

**Value.** Not modelled as a property. The value is the active fill's width; the sample sits at 50% (`measuredFillWidthPx` 200 of 400). Figma has no input for the minimum, maximum or step.

**Stops.** The dots are slot content (`Step Indicators › Dot Slots`, 5 in the sample). The metadata says the count "arrives with the content rather than from a number on the slider". In code it normally derives from min, max and step.

## Anatomy

Stacking, back to front: base track, active fill, step indicators, thumb.

1. **Track**: "Two layers. The base runs the full width, and the active fill runs from the minimum to the value."
   - **root (base)**: fixed (`measuredSizePx` 400 × 4), fill `surface/track`, radius `radius/xs` when rounded and `radius/none` when sharp.
   - **activeFill**: absolute, anchored at the start and vertically centred, running from the minimum to the value. Radius `radius/xs` when rounded and `radius/none` when sharp: `_Active Track`'s own fill is square, and each Slider variant sets the radius on the nested fill (see issues). Fill per state, in the table below.
2. **Step indicators**: "The dots marking each stop. They span the full track, so they sit above the active fill and the base alike and below the thumb." Visible when `stepped`. A horizontal space-between row with `space/2xs` inline padding. Each dot is an ellipse in `foreground/inverse` (`measuredSizePx` 2 × 2, no size token). *In Figma it spans the full track only while the value sits at 50% (see issues).*
3. **Thumb**: "Sits at the value, above everything else. A second thumb marks the start of the span in range mode." Centred on the active fill's trailing edge and vertically on the track. Size and fill per state; radius `radius/pill` when rounded and square when sharp.
   - **startThumb**: visible when `range`. At the active fill's leading edge, and identical to the thumb in every state.

## Variants

**State**: drives every colour. Thumb size is per thumb: `control/icon-md` for the thumb under the pointer (or being dragged), `control/icon-sm` for every other thumb, in every state. Selected colours the fill and both thumbs, and is triggered by pressing or by keyboard focus.

| state | activeFill.fill | thumb.fill | thumb.size | thumb (`measuredSizePx`) |
|---|---|---|---|---|
| default | `interactive/neutral/foreground/default` | `interactive/neutral/foreground/default` | `control/icon-sm` | 16 |
| hover (hovered thumb only) | `interactive/neutral/foreground/default` | `interactive/neutral/foreground/default` | `control/icon-md` | 20 |
| selected (pressed or focused; colour on both thumbs) | `interactive/ghost/foreground/default` | `interactive/ghost/foreground/default` | `control/icon-sm`; `control/icon-md` for the hovered or dragged thumb | 16 (20 hovered or dragged) |
| disabled | `interactive/neutral/foreground/disabled` | `interactive/neutral/foreground/disabled` | `control/icon-sm` | 16 |

**Shape**: drives only the corner radii.

| shape | track.radius | activeFill.radius | thumb.radius |
|---|---|---|---|
| rounded | `radius/xs` | `radius/xs` | `radius/pill` |
| sharp | `radius/none` | `radius/none` | none |

## Subcomponents

- **_Active Track** (private): holds every state-driven part. Its API is `state`, `stepped` and `range`. Only the fill is in flow, so its `space/-md` gap has no effect. It has no Shape property; each Slider variant sets the nested thumbs' shape directly.
- **_Thumb** (private): `state` × `shape`, 8 variants. One rectangle whose height is bound to `control/icon-sm` or `control/icon-md` and whose width is unbound.
- **Step Indicators** (public by name, only used here): one SLOT (`Dot Slots`) expecting `_Dot Indicator` instances. A space-between row with `space/2xs` inline padding.
- **_Dot Indicator** (private): one 2 × 2 ellipse in `foreground/inverse`.

**Sibling on the page: Slider Input Field.** A separate public composition with no metadata: a label (`label/medium`, raw fill) above a full-width Slider, `indicator/medium` min and max captions in `foreground/secondary` beneath it, and a value box beside it. The value box is `control/md` tall, `radius/sm`, `interactive/neutral/background/default` with a `interactive/neutral/border/default` stroke at `stroke/thin`, and `body/medium` text. The row uses a `space/gutter` gap. Spec it separately once it has a metadata frame.

## Tokens & theming

- **Color:** `surface/track`, `interactive/neutral/foreground/{default,disabled}`, `interactive/ghost/foreground/default`, `foreground/inverse`
- **Dimension:** `radius/{xs,none,pill}`, `control/icon-{sm,md}`, `space/2xs`, `space/-md`
- **Typography / effect:** none on Slider itself

Theme axes, taken from `tokens/manifest.json`:
- **palette:** Light, Dark
- **size:** Desktop, Mobile, Tablet, Desktop Compact
- **extensions:** `tokens/extensions/` (companion, target, condensed)

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | The resting control. Nothing is emphasised and the thumb sits at its base size. |
| hover | Pointer over a thumb | — | Only the hovered thumb grows. The active fill and, in range mode, the other thumb hold, so that thumb carries the whole change and the track looks untouched. |
| selected | A thumb is pressed or has keyboard focus | — | The active fill and both thumbs shift to the selected foreground. Only the thumb under the pointer takes the larger size; the other keeps its base size. |
| disabled | — | — | The active fill and the thumb both drop to the disabled foreground, and the thumb returns to its base size. |
| Stepped | Stepped set to true | — | Dots appear along the track marking each valid stop. Nothing else moves, because they sit above both track layers rather than between them. |
| Range | Range set to true | — | A second thumb appears at the start of the active fill. Both thumbs run on the same track and carry the same state. |

| Type | Description |
|---|---|
| Motion | No transition is defined. Moving the thumb is a width change on the active fill, with nothing specified between one position and the next. |
| Value | The active fill's width is the value, and the thumb is pinned to its trailing edge. Position and fill move together rather than being set as two separate things. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Step indicators | slot, dots supplied with the content | Holds the dots marking each stop. The count arrives with the content rather than from a number on the slider, and the dots are spaced evenly across the full track so they cross the active fill and the base alike. |
| Thumb | fixed element, inherits state and shape | One thumb at the value, and a second at the start when range is on. Its colour follows the slider's state and its size follows the pointer, so it is never styled on its own. |
| Track | fixed element, two layers | A full-width base and an active fill that runs from the minimum to the value. Neither takes content, and the base is the only part that does not change with state. |

## Usage

**Do**
- Reach for it where the range matters more than the exact figure. A value that has to be precise is quicker to type than to drag.
- Turn steps on whenever only certain values are valid, so the dots say where the thumb can land.

**Don't**
- Don't set state on the track or the thumb separately. State is the slider's, and the parts follow it.
- Don't use Shape to carry meaning. It matches the controls around the slider and says nothing about the value.

## Accessibility

- The value is carried by position and fill alone. It has to be exposed as a number together with its minimum and maximum.
- Keyboard focus shows the selected colour on the fill and both thumbs, and the focused thumb also takes a ring, so in range mode it is clear which end the keys will move.
- Hover is answered by the hovered thumb growing while the track holds. Anyone not using a pointer gets no size change; the focus ring stands in for it.
- The step dots use foreground/inverse across the whole track, so their contrast differs either side of the value.
- In range mode two thumbs share one track. Each needs its own name and its own value, or the pair reads as a single control.
- Disabled is carried by colour on both the track and the thumb, with no change of size or shape to back it up.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed | 400 wide and 4 tall. The width is the track, and the thumb overhangs it above and below. |
| Radius | Per Shape | radius/xs on the base track when rounded and radius/none when sharp. The thumb takes radius/pill when rounded and square corners when sharp. The active fill is square-ended on both variants, so on a rounded slider its end meets the rounded base. |
| Track | Theming | The base is surface/track across the full width. The active fill is interactive/neutral/foreground/default, moving to interactive/ghost/foreground/default when selected and interactive/neutral/foreground/disabled when disabled. |
| Thumb | Per State | 16 square at rest. 20 only for the thumb under the pointer or being dragged, in any state. Centred on the track in every case. |
| Step indicators | Fixed | Dots of 2 by 2 in foreground/inverse, spaced evenly across the full track width with space/2xs held at each end. |
| Stacking | Fixed | Base track, active fill, step indicators, thumb, from back to front. The dots sit above both track layers and below the thumb. |
| Second thumb | Per Range | Matches the first thumb in colour and shape, and sits at the start of the active fill. It takes the larger size only when it is the one under the pointer. |

## Designer clarifications

These were given directly and have since been written into the Figma metadata frame, so the verbatim sections above already reflect them.

- **Hover (2026-10-14):** "The hover is on the Thumb being hovered not both thumb on the range. Thumb gets bigger on hover." Only the thumb under the pointer grows. The fill, the track and the other thumb don't change, and hovering bare track changes nothing.
- **Pressed and focus (2026-10-14):** "both gets the blue focus or pressed." Pressing (dragging) and keyboard focus both put the slider in the selected state: the fill and both thumbs take `interactive/ghost/foreground/default`. Selected is colour only.
- **Size on focus and pressed (2026-10-14):** "I also noticed the size increase on the focus state of the second thumb in the range slide. only the one hovered should have the increased size." The larger size goes only to the thumb under the pointer, including the one being dragged, in every state. A thumb focused from the keyboard keeps its base size unless it is also hovered.

## Visual reference

No images are stored. Pull a fresh shot from these links:
[component set](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3190) ·
[metadata](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6159-833) ·
[rounded](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3158) ·
[sharp](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3739) ·
states: [default](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3415) ·
[hover](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3410) ·
[selected](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3405) ·
[disabled](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-3390) ·
[thumb](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6131-2467) ·
[step indicators](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6132-2568) ·
[Slider Input Field](https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6154-5813)

## Issues

### Blocker

- **State, Stepped and Range aren't exposed on Slider.** The revised metadata now says outright that they are "the slider's own properties", but in Figma they still exist only on the nested `_Active Track`. Build them as slider props.
- **Nothing models the value, minimum, maximum or step.** The value is only the fill's width (50% in the sample), and the step count is only however many dots are in the slot. The accessibility text requires "a number together with its minimum and maximum".

### Warn

- **Figma's variants still grow both thumbs on hover and selected.** The metadata now says only the thumb under the pointer grows, but state is set on `_Active Track`, so its variants can't show one thumb enlarged and the other at rest. Build to the metadata.
- **The metadata says the active fill is square-ended; Figma rounds it.** The rounded Slider binds `radius/xs` on the nested fill's corners (the sharp one binds `radius/none`). Decide which is intended. This supersedes the earlier note in this spec, which was read from `_Active Track` rather than from Slider.
- **Range mode can't show a span that doesn't start at the minimum.** The fill is pinned to the start of the track and the start thumb to the fill's leading edge. Build to the intent, with the fill running between the two thumbs.
- **The step dots span the full track only at 50%.** They're a child of the fill, sized at twice its width, and scale with it. Build "spaced evenly across the full track width".
- **The base track is near-invisible against the page:** 1.19:1 in Light and 1.24:1 in Dark, against WCAG's 3:1.
- **The step dots are invisible on the unfilled side:** 1.24:1 in Light and 1.45:1 in Dark on the base track.
- **Description drift.** `control/icon-sm` says 20 but resolves to 16. `control/icon-md` says 24 but resolves to 20. `radius/none` says 2px but resolves to 0. `space/-md` says 32px but aliases a negative step. On the sibling, `control/md` says 48 but the value box renders 40 tall.
- **Raw values.** The track height, the dot size and the thumb width have no token. The thumb binds only its height, so a size mode could make it non-square.
- **Untokened inert gaps** on Slider and Step Indicators. On Slider Input Field, the label's text fill is raw.

### Note

- Focus is now defined in the metadata: the selected colour on the fill and both thumbs, plus a ring on the focused thumb. Figma has no focus variant to draw it, so the ring is the implementer's (`border/focus` at `stroke/thick` in the reference implementations).
- Resolved 2026-10-14: `surface/track` and `space/-md` are now in `tokens/`. The CSS build collapses `space/-md`'s leading dash, so it collides with `--space-md`; Slider doesn't need it.
- The revised States table lists Stepped and Range as states. They are properties: nothing triggers them at run time.
- Step Indicators' alignment differs by state on the nested instance (space-between at default, start elsewhere). It has no visible effect.
- The thumb and the fill share one token at every state, so the thumb is told apart only by overhanging the track. It has no border or shadow.
- The start thumb sits 2 off-centre from the fill's leading edge. The dots' `space/2xs` inset at each end is now stated as intended, so the first and last dots sit just inside the minimum and maximum.
- The thumb is sized with icon tokens, and selected uses the ghost button's foreground, so changes to either will move the slider.
- `_Thumb` and `_Active Track` order State differently; the spec uses `_Active Track`'s order.
- No motion is defined, by the metadata's own statement.
- Step Indicators is public by name but internal. Slider Input Field has no metadata, unnamed frames, a placeholder variant property and a styled frame for its value box. No set on the page has a native description.
