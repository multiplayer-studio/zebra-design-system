# Progress Circle

A ring that reports an ongoing process where a bar will not fit, beside an icon or inside a dense row. Five sizes cover inline through to prominent, and Upload turns it into a file-transfer control with a cancel action. Unlike Progress Bar it has no property for the amount of progress, so the arc is fixed here and the real value has to come from the implementation.

Source: [Progress Circle board](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5041-6579) on the Progress Indicators page · extracted 2026-11-06

Progress Circle and [Progress Bar](../progress-bar/progress-bar.spec.md) share a Figma page but have a metadata frame each, so they are specced separately. The page's private `_Upload` set belongs to this component.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `size` | enum | xxsmall, xsmall, small, medium, large | `xxsmall` | variant |
| `rounded` | enum | true, false | `true` | variant |
| `upload` | boolean | true, false | `false` | uploadControl |
| `showTrack` | boolean | true, false | `true` | track |

Size is listed smallest to largest; Figma stores the options as medium, large, small, xsmall, xxsmall.

**size** — xxsmall: "The smallest ring, for sitting inside a line of text or beside a small icon. The stroke does not thin at this size, so the ring reads as heavy relative to its diameter." · xsmall: "A step up while still inline. The largest size at which the Upload control is not built." · small: "The smallest size that supports Upload, though the control nearly fills the ring at this diameter." · medium: "The general-purpose size, and the one where the Upload control sits comfortably inside the ring." · large: "For when progress is the main thing on the surface rather than an inline detail."

**rounded** — true: "Rounds the ends of the progress arc. Despite the name it is a line cap rather than a corner radius, and it only shows where the arc starts and stops." · false: "Squares the arc ends off, for use alongside sharp-shaped controls. The difference is visible at two points on the ring and nowhere else."

**upload** — false: "A plain progress ring." · true: "Places a file-transfer control at the centre of the ring, reporting the percentage and offering a cancel action. It has no effect at xsmall or xxsmall, where the control is not built."

**showTrack** — true: "Shows the unfilled remainder of the ring, which is what makes the arc's extent readable." · false: "Hides it, leaving the arc floating with nothing to measure it against."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Upload control state** — via the nested `_Upload` instance's `Stop` (false, true): "Its own Stop property swaps that readout for a cancel button." Not a property of the ring; whether it becomes one in code (for example `showCancel`) is the implementer's call.

Content inputs: the **value** that drives the arc's sweep (no Figma property; every variant draws about three quarters), plus an indeterminate mode; and the **readout** string inside `_Upload` (sample "75%").

## Anatomy

1. **Ring (root)** — "The outer square frame, fixed at the chosen Size, holding the track and the arc concentrically." Fixed square, size per Size (not token-bound). No auto-layout; children scale with the frame.
2. **Track and arc** — "Two rings drawn as strokes. The track covers the full circle and the arc covers the portion reported as complete."
   - **Track** — full circle, stroke `border/subtle` at `stroke/heavy`, centred on the path, butt caps. Visible when `showTrack`.
   - **Arc** — above the track; starts at twelve o'clock, runs clockwise, sweep = value. Stroke `border/info` at `stroke/heavy`, centred; cap round when `rounded=true`, butt when false. Also carries a `foreground/link` fill that never renders (ignore).
3. **Upload control** — "A nested control centred in the ring, hidden until Upload is turned on and absent altogether at the two smallest sizes." `_Upload` (Stop=false), centred, same size at every ring size (36Px measured). Visible when `upload`; present only at small, medium, large.

## Variants

| size | ring (measured) | upload control |
|---|---|---|
| xxsmall | 24Px | absent |
| xsmall | 36Px | absent |
| small | 40Px | 36Px, centred |
| medium | 48Px | 36Px, centred |
| large | 64Px | 36Px, centred |

| rounded | arc cap |
|---|---|
| true | round |
| false | butt (Figma "none") |

Stroke width is `stroke/heavy` at every size.

## Subcomponents

### _Upload (private)
Set `4416:123` on the *Subcomponents/Progress indicator* board. One prop, `stop` (false, true; default false). Fixed square (36Px measured), free positioning.

| stop | readout | cancel |
|---|---|---|
| false | shown | hidden |
| true | hidden | shown |

- **Readout** — text `indicator/medium`, centred, sample "75%". Colour is unbound (see issues).
- **Cancel** — an [Icon Button](../icon-button/) at Size=small, Shape=full, Flavour=subtle, pinned to State=hover; glyph `close` (rounded family, Icon Size=small, currentColor). As drawn it resolves to `control/sm`, `interactive/ghost/background/hover`, `radius/pill`, `space/2xs`, border `interactive/neutral/border/default` at `stroke/base`; in code use Icon Button with its own states.

Dependencies: Icon Button (`specs/icon-button/`), Icon (`specs/icon/`, delivered as a glyph).

## Tokens & theming

- **Colour:** `border/info`, `border/subtle`, `foreground/link` (bound, never rendered); via Icon Button: `interactive/ghost/background/hover`, `interactive/neutral/border/default`.
- **Dimension:** `stroke/heavy`, `radius/none` (bound on the track, no effect); via Icon Button: `control/sm`, `space/{none, xxs}`, `radius/pill`, `stroke/base`.
- **Typography:** `indicator/medium`. **Glyphs:** `close`.
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).

All 13 names resolve in `tokens/base`; `close` is in the font and not retired.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | "The ring has no hover, pressed, focus or disabled states, and no progress states either. Every one of the ten variants draws the same arc." |
| Upload shown | Upload set to true | — | "A control appears centred in the ring, reporting the percentage. Its own Stop property swaps that readout for a cancel button." |

- **Motion** — "Figma stores no timing and the ring models no transition. The arc is drawn in one fixed position in every variant, so both a determinate sweep and an indeterminate spin belong entirely to the implementation."
- **Progress** — "There is no property for the amount. The arc sits at roughly three quarters in every variant, which is a placeholder rather than a value, so nothing here should be read as a real state."
- **Upload** — "Showing or hiding the control does not resize the ring, because the control is centred inside it rather than stacked with it."

## Content & slots

- **Upload control** (nested instance, toggled by Upload) — "The file-transfer control at the centre, left exposed so its Stop state is reachable from the ring. It is a fixed 36px whatever the ring's size, so at small it nearly fills the ring, and at xsmall and xxsmall it is not present at all."
- **Percentage readout** (inside the Upload control) — "Part of the nested control rather than a property of the ring. It ships reading 75% and has to be overridden on the instance to say anything else."
- **Track and arc** (fixed parts) — "Neither is a slot. The arc's sweep is what would encode a value, and it is identical in every variant."

## Usage

**Do**
- Use medium or large whenever Upload is on. The control is a fixed size, so the smaller rings leave it almost no margin.
- Pair the ring with nearby text. On its own it says that something is happening but never what.

**Don't**
- Don't read the arc as a value. It is identical in every variant, so a screen with several rings will show them all at the same apparent progress.
- Don't use Upload at xsmall or xxsmall. The property is offered at those sizes but the control is not built, so turning it on does nothing.

## Accessibility

- The ring reports progress visually and nothing else. The value, its range and what it refers to all have to be exposed in code.
- The ring carries no label of its own, so on its own it signals that something is happening but not what. Pair it with nearby text.
- The stroke is the same weight at every size, so at xxsmall the ring is proportionally far heavier than at large. Check the smallest sizes still read as a ring.
- The arc and the track are separated by colour alone. Check border/info against border/subtle on the surface behind them.
- The Upload control's cancel action is a real control. It needs an accessible name and a keyboard path, neither of which is modelled here.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed square per Size | "24, 36, 40, 48 and 64px across the five steps. Always square, and never hugging its content." |
| Stroke weight | Fixed | "stroke/heavy at every size. It does not scale, so the ring is roughly a sixth of the diameter at xxsmall and a sixteenth at large." |
| Arc | Fixed | "The track covers the full circle. The arc begins at twelve o'clock and runs about three quarters of the way round, identically in all ten variants." |
| Line cap | Fixed per Rounded | "The arc's ends are round when Rounded is true and square when it is false. The track's ends are always square, though a full circle hides them." |
| Upload control | Fixed | "36px regardless of the ring's size, centred, and present only at small, medium and large." |
| Colour | Theming | "The arc is border/info and the track border/subtle. The arc also carries a foreground/link fill which does not render, because the shape is drawn with no inner area and the stroke does the visible work." |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-77) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5054-336) · [xxsmall](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-187) · [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-173) · [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4415-75) · [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-78) · [Rounded=false](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-240) · [_Upload](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4598-2243)

## Issues

**Warn**
- **Upload is inert at the default size.** No `_Upload` instance exists at xsmall or xxsmall, and xxsmall is the default. Documented in the metadata; decide in code whether to ignore or warn.
- **Readout colour is raw.** The `_Upload` readout fill is a raw black with no token, so it won't flip in Dark. Probably meant `foreground/primary`.
- **Sizes aren't tokens.** Ring sizes and the upload control's size are unbound.
- **No value property.** The arc is a fixed sample; the value, indeterminate mode and motion are code's to design (the metadata says so).
- **Cancel pinned to hover.** The Icon Button inside `_Upload` is fixed at State=hover.

**Note**
- "Square" cap for Rounded=false is Figma's no-cap, i.e. butt; don't use a square cap that extends past the endpoint.
- Readout and cancel are mutually exclusive (Stop), not shown together as the Upload description suggests.
- The readout text box is shorter than its line height; let it hug in code.
- Circle uses `border/info` / `border/subtle`; Bar uses `foreground/link` / `surface/track` for the same roles.
- The arc's `foreground/link` fill and the track's `radius/none` have no visible effect.
- Track and arc are rotated ellipse arcs in Figma; build them as a stroked circle or SVG arc starting at twelve o'clock.
- No motion modelled; no component descriptions; cancel's accessible name and keyboard path unmodelled (metadata says so).
