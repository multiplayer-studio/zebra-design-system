# Scrollbar

The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and length mirror the scroll offset; hovering raises a track scrim so the grab target reads. Two orientations draw the same bar on either axis, and the scrolling region, not the bar, owns the behaviour.

Source: [Scrollbar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947) · set `6068:12030` · extracted 2026-11-07 · 4 variants · metadata frame `8114:33` (written 2026-11-07)

Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `orientation` | enum | vertical, horizontal | `vertical` | variant (axis) |
| `state` | enum | default, hover | `default` | variant (colour; CSS state in code) |

**orientation** — vertical: "The axis the region scrolls. Vertical stands against the trailing edge of the content and the handle slides up and down." · horizontal: "Lies along the bottom edge for content that pans sideways, as the Table's frozen arrangement uses it."

**state** — default: "The resting bar. The track is invisible and the handle sits quiet, so the bar reads as part of the content's edge rather than a control." · hover: "Pointer over the gutter. The track raises the ghost scrim and the handle darkens, which is what makes the grab target readable."

## Internal variations & content inputs

None swap-only. Content input: the **value** — the handle's length is the viewport's share of the content (drawn at a sample 64Px) and its offset mirrors the scroll position. No Figma property carries it.

## Anatomy

1. **Bar** (the component frame) — horizontal row for the vertical orientation, vertical column for the horizontal one, handle centred on the cross axis; padding `space/2xs` on all four sides, gap `space/none`; 12×200Px / 200×12Px measured. "The component frame: a gutter holding the handle, padded space/2xs on every side so the handle floats clear of the content edge. It runs the full length of the scrolling region's edge."
2. **Track** — absolute, scales with the bar on both axes; fill `interactive/ghost/background/default` at rest, `interactive/ghost/background/hover` on hover (paint opacities 0 / 0.05 double the tokens' own alpha, see Issues). "A rectangle filling the bar behind the handle — the same ghost scrim the buttons use."
3. **Handle** — `radius/pill`, 4Px thick, 64Px long as drawn; fill `foreground/disabled` at rest, `foreground/secondary` on hover. "The pill that shows the position. Its length is a sample of the value, not a property."

## Variants

| orientation | bar layout | measuredPx |
|---|---|---|
| vertical | row, handle centred | 12 × 200 |
| horizontal | column, handle centred | 200 × 12 |

| state | track | handle |
|---|---|---|
| default | `interactive/ghost/background/default` @ 0 | `foreground/disabled` |
| hover | `interactive/ghost/background/hover` @ 0.05 | `foreground/secondary` |

Orientation and state are independent: the axes swap and nothing else.

## Subcomponents

None. The set contains no nested instances. Used by Table Content (frozen arrangement horizontal, vertical-scroll arrangement vertical) — see [specs/table](../table/table.spec.md).

## Tokens & theming

- **Colour:** `foreground/disabled`, `foreground/secondary`, `interactive/ghost/background/default`, `interactive/ghost/background/hover`
- **Dimension:** `space/2xs`, `space/none`, `radius/pill`
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact)

All 7 names resolve in `tokens/`.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| default | Resting | "The handle draws in foreground/disabled over an invisible track. Only the colours are modelled; the handle's position and length come from the scrolling region." |
| hover | Pointer over the gutter | "The track raises interactive/ghost/background/hover and the handle moves to foreground/secondary. No pressed or dragging treatment exists." |

- **Motion** — "Figma stores no timing and no transition is authored. Whether the bar fades in with scroll activity and out when it stops belongs to the implementation."
- **Value** — "The handle's length is the viewport's share of the content and its offset mirrors the scroll position. The set draws one sample; nothing in it encodes a value."

## Content & slots

- **Handle** (fixed part) — "Not a slot. A pill that takes its length from the value and its colour from the state; there is no property to restyle or hide it per instance."
- **Track** (fixed part) — "Not a slot. The full-length gutter behind the handle, invisible at rest and scrimmed on hover."

## Usage

**Do**
- Let the scrolling region own it. The bar reports position; wiring scroll, drag and keyboard belongs to the region that clips the content.
- Match Orientation to the overflow axis — vertical beside a scrolling list, horizontal under the Table's frozen columns.

**Don't**
- Don't restyle the handle to look like a control. It has no focus state, so anything that invites clicking promises more than the set models.
- Don't rely on hover to reveal the bar. A touch screen never hovers, so the resting handle has to be visible on its own.

## Accessibility

- The set models no focus, pressed or dragging state, so keyboard scrolling and drag behaviour belong entirely to the implementation.
- The resting handle is foreground/disabled on the page surface. Check it stays visible against the surfaces the region scrolls over.
- Assistive technology reaches scrolling through the region, not the bar: expose the region and keep the bar presentational.
- Hover is the only state change and colour its only signal, so nothing here reaches someone who cannot see the bar move.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Thickness | Fixed | "The gutter is 12 and the handle 4 as drawn, with neither bound to a token. The length runs the scrolling region's full edge." |
| Padding | Fixed | "space/2xs on all four sides, which is what centres the handle in the gutter and keeps it clear of the content edge." |
| Radius | Fixed | "radius/pill on the handle in every variant. The track has no radius of its own." |
| Handle length | Value | "Drawn at a sample 64. In use the length is the viewport's share of the content and is never a property." |
| Fill | Theming | "The handle is foreground/disabled at rest and foreground/secondary on hover. The track is interactive/ghost/background/default, rising to the hover token under the pointer." |
| Orientation | Per Orientation | "vertical and horizontal swap the axes and nothing else: the same padding, colours and radius on both." |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6068-12030) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8114-33) · [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947)

## Issues

**Warn**
- **Thickness has no token.** The gutter (12Px), handle (4Px) and the handle's sample length (64Px) are unbound — no dimension token on the set beyond the padding.
- **Track scrim opacity doubled.** The track sets a paint opacity of 0 / 0.05 over `interactive/ghost/background/*`, which already carries the scrim in its own alpha — the same doubling Button has. Code binds the token alone.
- **Handle rest colour is a text token.** The resting handle binds `foreground/disabled` — a text-role token on a part that is not disabled. It resolves to the intended quiet grey, but a token meant for disabled text now controls scrollbar colour.

**Note**
- No pressed, dragging or focus state and no value are modelled, by design: the bar is the static indicator and the scrolling region owns the behaviour. Motion is not modelled.
