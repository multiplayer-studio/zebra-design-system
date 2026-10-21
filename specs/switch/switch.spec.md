# Switch

A single on or off toggle, a track with a thumb slider that switches between its two ends. Two independent icon slots sit at either end of the track, which can be removed as a pair. Focus adds a border rather than changing the track or thumb colour.

Source: [Switch page](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5655-893) · component set `5804:156` · extracted 2026-10-13 (re-extracted) · 6 variants

**Changed since the previous extraction:** the thumb is now a rectangle bound to `radius/pill` (it was an ellipse), and the Motion row was rewritten. A width-stretch line was added, and the lines about layout-driven/RTL movement and the focus ring were removed.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `state` | enum | `disabled`, `enabled`, `focus` | `enabled` | variant |
| `switch` | enum | `on`, `off` | `off` | variant |
| `hasIcons` | boolean | `true`, `false` | `true` | `icons` visibility |

**state**
- `enabled`: The resting state. Track and thumb take their default or pressed token depending on Switch.
- `focus`: Adds a 2px border bound to border/focus, replacing the 0 weight border/default border at rest. Track and thumb colour do not change.
- `disabled`: Track and thumb switch to their disabled tokens regardless of Switch. The control does not accept input.

**switch**
- `off`: The track sits on interactive/selection/background/default and the thumb sits at the left. The icon slot nearest the thumb is covered.
- `on`: The track switches to interactive/selection/background/pressed and the thumb slides 32px to the right. The thumb colour itself does not change between on and off.

**hasIcons**
- `true`: Shows both icon slots at the ends of the track.
- `false`: Removes both icon slots, leaving a plain track and thumb.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Internal variations & content inputs

**Icon glyphs (swap-only).** Each icon slot is a nested Icon whose glyph is changed by swapping it. Switch exposes no property for this. Any glyph from `packages/icons` can go in either slot. In the sample, the start slot shows `microphone-off` when off and `microphone` when on, and the end slot always shows `microphone-off`. Whether code exposes these as props is an implementation decision.

No content inputs.

## Anatomy

0. **root**: a fixed-size container (`measuredSizePx` 64 × 32) with radius `radius/pill` that clips its content. It uses horizontal layout with padding `space/xs`, gap `space/sm` and cross-axis centred alignment. The main-axis alignment is `start` when off and `end` when on, and this is what moves the thumb. Border: `border/default` at `stroke/base`, inside, at rest; `border/focus` at `stroke/thick`, outside, when focused (see issues).
1. **track**: "A rectangle sitting behind everything else. Its own colour depends on both State and Switch." Absolutely positioned and fills the root, with radius `radius/pill`.
   - **icons** (unnumbered wrapper): absolutely positioned and fills the root. Horizontal layout with padding `space/xs`, space-between, centred. Visible when `hasIcons`. It sits above the track and below the thumb.
2. **startIcon** (Figma "On Icon", left): "An instance swap slot, covered by the thumb when Switch is on." This is an Icon pinned to `Size=medium, Framed=false` (`renderedSizePx` 20), Rounded family. Colour is `foreground/inverse`, or `foreground/disabled` when disabled. *In the geometry it is covered when off and visible when on.*
3. **endIcon** (Figma "Off Icon", right): "An instance swap slot, covered by the thumb when Switch is off." Same Icon setup and colour as startIcon. *In the geometry it is visible when off and covered when on.*
4. **thumb**: "A circle that slides 32px between the two ends. Its own colour does not change between on and off, only between enabled and disabled." A rectangle with radius `radius/pill`, so it reads as a circle at rest and as a pill while it stretches. Its height is `control/xs` and its width is unbound (`measuredSizePx` 24 × 24). It is the only in-flow child, at `measuredOffsetPx` 4 when off and 36 when on.

## Variants

The two axes are orthogonal: `switch` controls only the track colour and the thumb position, and `state` controls only the colours and the border.

| state | switch | track.fill | thumb.fill | thumb | root border | icon colour |
|---|---|---|---|---|---|---|
| enabled | off | `interactive/selection/background/default` | `interactive/primary/foreground/default` | start | `border/default` · `stroke/base` · inside | `foreground/inverse` |
| enabled | on | `interactive/selection/background/pressed` | `interactive/primary/foreground/default` | end | `border/default` · `stroke/base` · inside | `foreground/inverse` |
| focus | off | `interactive/selection/background/default` | `interactive/primary/foreground/default` | start | `border/focus` · `stroke/thick` · outside | `foreground/inverse` |
| focus | on | `interactive/selection/background/pressed` | `interactive/primary/foreground/default` | end | `border/focus` · `stroke/thick` · outside | `foreground/inverse` |
| disabled | off | `interactive/selection/background/disabled` | `interactive/primary/foreground/disabled` | start | `border/default` · `stroke/base` · inside | `foreground/disabled` |
| disabled | on | `interactive/selection/background/disabled` | `interactive/primary/foreground/disabled` | end | `border/default` · `stroke/base` · inside | `foreground/disabled` |

## Subcomponents

None on this page.

**Dependency: Icon** (`2046:15010`, local to this file, specced at [specs/icon/](../icon/icon.spec.md)). It is pinned to `Size=medium, Framed=false` and delivered as an icon-font glyph from `@zebra-design-system/icons`. The sample's glyphs `microphone` and `microphone-off` are in `codepoints.json`, are not retired or rejected, and their setIds match the instances exactly. The glyph takes `currentColor`, which Switch sets per state. Switch pins the Rounded family, and the Style axis only swaps the font family.

## Tokens & theming

- **Color:** `interactive/selection/background/{default,pressed,disabled}`, `interactive/primary/foreground/{default,disabled}`, `border/default`, `border/focus`, `foreground/inverse`, `foreground/disabled`
- **Dimension:** `space/xs`, `space/sm`, `radius/pill`, `stroke/base`, `stroke/thick`, `control/xs`
- **Typography / effect:** none

Theme axes, taken from `tokens/manifest.json`:
- **palette:** Light, Dark
- **size:** Desktop, Mobile, Tablet, Desktop Compact
- **extensions:** `tokens/extensions/` (companion, target, condensed)

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| enabled | Resting | — | Track and thumb sit on their default or pressed token depending on Switch. No border. |
| focus | Keyboard focus | — | A 2px border appears, bound to border/focus, drawn inside the control's own bounds. Track and thumb colour do not change from enabled. |
| disabled | Disabled state set | — | Track and thumb switch to their disabled tokens. The control does not accept input. |

**Motion**

> When the switch is toggled, the thumb slides to the opposite end of the track and the track colour changes from off to on at the same time.
> The movement uses ease-spring: cubic-bezier(0.34, 1.36, 0.64, 1), with a duration of 250ms.
> The track colour changes in step with the thumb, so it reaches its final colour exactly when the thumb arrives.
> If the switch is toggled again during the animation, the thumb reverses from where it is, without jumping or restarting.
> The thumb increases it’s width to 1.3 before settling back to it’s original width

## Content & slots

| Property | Type | Description |
|---|---|---|
| Left icon slot | Instance swap on a nested Icon | Independent of the right slot. This file's sample shows Microphone Off at rest and Microphone when the switch is on, to demonstrate a state communicating pair. Any glyph can replace either one. |
| Right icon slot | Instance swap on a nested Icon | Independent of the left slot. Always shows Microphone Off in this sample, covered by the thumb when the switch is on. |

## Usage

**Do**
- Keep the two icon slots paired to communicate the current state, the way this file's Microphone example does, rather than using unrelated glyphs on each side.
- Turn hasIcons off for a plain track and thumb switch with no icon content at either end.

**Don't**
- Don't expect the thumb to change colour between on and off, only the track does. Rely on the track colour and the thumb's position together to show state.
- Don't expect this component's own focus border to extend past its bounds, it is drawn inside the 64x32 footprint rather than around it.

## Accessibility

- The switch has the role of switch and tells assistive technology whether it is on or off. Screen readers announce it as “[label], switch, on” or “off”.
- Space toggles the switch. Enter may also toggle it. Tab moves focus to and from the switch.
- The focus ring is clearly visible on keyboard focus against both the on and off track colours.
- The switch’s state is shown by the thumb’s position as well as by colour, so it does not depend on colour alone.
- A disabled switch can’t be toggled, but it stays readable, and the reason it’s disabled is explained nearby when it isn’t obvious.
- With reduced motion turned on, the state changes instantly. The colour change remains, because it shows the switch’s state.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fixed | 64px, held fixed rather than hugging its content. |
| Height | Fixed | 32px, held fixed. |
| Padding | Fixed | 4px on every side of the track. |
| Thumb | Fixed size, fixed travel | 24px across. Slides between x=4 at off and x=36 at on, 32px of travel. |
| Icon size | Fixed | 20px square at each end, inside the same 4px padding as the thumb. |
| Border | Fixed per State | 0 weight bound to border/default at rest, 2px bound to border/focus when focused, drawn inside the control’s own bounds so the overall size does not change. |

## Visual reference

No images are stored. Pull a fresh shot from these links:
[component set](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5804-156) ·
[metadata](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=6116-9977) ·
[enabled/off](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5853-99) ·
[enabled/on](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5856-135) ·
[focus/off](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5856-168) ·
[focus/on](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5856-178) ·
[disabled/off](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5856-146) ·
[disabled/on](https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5856-157)

## Issues

### Warn

- **The focus ring is effectively invisible when drawn inside the track**, as the metadata says it is. `border/focus` against the track is 1.33:1 (on) and 1.12:1 (off) in Light, and 1.00:1 (on) and 1.54:1 (off) in Dark: in Dark it is the same colour as the on track. WCAG asks 3:1, and the metadata's own accessibility line says the ring is "clearly visible" against both tracks. Drawn outside, as Figma has it, the ring sits on the page surface instead.
- **In Dark, the off thumb is 2.91:1 against its track**, below the 3:1 WCAG asks for a state-bearing part. Light is 3.77:1.
- **The focus border is inside in the metadata but outside in Figma.** Figma draws it outside the root, while the metadata says three times that it is drawn inside the control's own bounds. Decide which is intended and fix the other source.
- **The Anatomy annotations swap the icon slots.** They say the left slot is covered when on and the right when off. The geometry, the Property Breakdown and Content & Slot all say the opposite. Trust the geometry.
- **`control/xs` description drift.** Its description says "= 40px, source: scale/12", but it aliases scale/9, which resolves to 24px. The thumb height uses it.
- **`stroke/base` description drift.** Its description says "= 1px", but it resolves to 0. That is why the rest border is invisible, which matches the metadata, but the name invites misuse.
- **The thumb width is unbound** while its height is `control/xs`. If that token changes in some size mode, the thumb stops being a circle. The new stretch motion animates this same unbound width.
- **The stretch motion is underspecified.** The line "increases it’s width to 1.3" doesn't say whether 1.3 is a multiplier, when the peak happens within the 250ms, which edge stays anchored (or whether that mirrors in RTL), or which curve it uses. No stretched frame is modelled on the canvas.
- **Two Motion intents were removed.** The lines saying the thumb moves by layout alignment (so it works at any size and in RTL) and that the focus ring doesn't animate are gone. The file still moves the thumb by alignment. Confirm the removals were deliberate.
- **The root size (64 × 32) is raw**, with no token. It is recorded as a measurement.
- **The icon colour is undocumented.** It is set per state as a fill override on the nested glyph (`foreground/inverse` or `foreground/disabled`), and no metadata section mentions it.

### Note

- Resolved 2026-10-13: the token blocker. `tokens/` was re-exported from `IIMfLwyDF9xnwmpKpy8Kj7` and now contains `interactive/selection/background/*` and `control/xs` (24 at every size mode; `condensed` overrides it in Desktop).
- The Motion row's Description cell contains a stray "On Icon" instance, which looks like a pasted layer.
- The Anatomy text still calls the thumb "A circle". It is now a pill-rounded rectangle: a circle at rest, a pill during the stretch.
- The icon slots are swap-only, with no exposed property. Whether code exposes them as props is your call.
- `switch` is naturally a boolean (`checked`) in code. `focus` should come from keyboard focus, not a prop. Hover, pressed and focus+disabled are not modeled anywhere. Figma's State order (disabled, enabled, focus) differs from the metadata's.
- The on track uses an interaction-state token (`…/pressed`) to mean "selected". The thumb and track draw from different token families.
- The root's gap (`space/sm`) has no visible effect, because only the thumb is in flow.
- `space/sm`, `space/xs` and `stroke/thick` name stale source scale steps in their descriptions. Their px values still match.
- The motion curve and duration are literals in the metadata. They now have a token: `animations/spring` (size collection, `250ms cubic-bezier(0.34, 1.36, 0.64, 1)`), shared with Segmented Control. The stretch's trailing curve has no token.
- The accessibility text refers to a "[label]", but Switch has no label part, so the name must come from an external label.
- There are no on-page subcomponents. The component set has no native Figma description.
