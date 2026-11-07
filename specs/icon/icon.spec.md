# Icon

Wraps a single glyph from the icon library so it can be sized consistently and embedded in other components. Three sizes, plus an optional box that pads the glyph to a 40px touch target. Button, Icon Button, Dropdown, Search, Avatar, Top App Bar, Navigation Bar and Navigation Rail all embed it, and almost every one of them locks Size and Framed, leaving the glyph as the only decision. On its own it is decorative, the meaning has to come from somewhere else.

Source: [Icon page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15004) · component set `2046:15010` · extracted 2026-09-22, updated 2026-11-06 · 8 variants

Values in this document are token names. The only literals are inside verbatim metadata quotes, inside `Issues`, and in columns explicitly labelled as measurements.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `name` | slot (Figma `INSTANCE_SWAP`) | any glyph name in the icon font | `verified` | glyph |
| `size` | enum | `xsmall`, `small`, `medium`, `large` | `small` | variant |
| `framed` | boolean | `false`, `true` | `false` | variant |

Figma names: `Name#2167:166`, `Size`, `Framed`.

### `name`

> The glyph itself, swapped from the icon library. This is the one property most embedding components leave open, so it is usually the only decision left to make. It arrives set to Verified, which is the right answer for almost nothing.

### `size`

- **xsmall** — not in the metadata. 12px (`control/icon-xs`); framed, a 24px box (`control/xs`).
- **small** — 16px. The dense step, and what Button and Icon Button use at their own small size.
- **medium** — 20px. The most widely used step in the file, and what Button and Icon Button use at both medium and large.
- **large** — 28px. Used by exactly one component in this file, Navigation Header. Use it only where the icon is genuinely the focal point.

### `framed`

- **false** — The frame hugs the glyph exactly, so the component takes up only the glyph's own box. Correct whenever the parent already provides padding or a target area, which is nearly always.
- **true** — Pads the glyph to a fixed 40px box so it meets the minimum touch target on its own. It adds space and nothing visible, so it suits a standalone tappable icon and is wrong inside a control that is already sized.

## Internal variations & content inputs

**Style (rounded / sharp)** — every icon component set in the library carries a Style axis. Icon pins its nested glyph to `Style=rounded` and does not expose the axis, so as built it cannot render the sharp family. In an icon-font implementation this axis is a **font family** (`ZdsIcons-Rounded` / `ZdsIcons-Sharp`), not a different glyph: both families share codepoints, so exposing it costs nothing but a family switch. Decide deliberately rather than inheriting Figma's pin — see Issues.

**Glyph name** — the only content this component carries. 724 glyph names are available from `packages/icons/codepoints.json`, which maps each Figma `setId` to its glyph name so the lookup is exact rather than guessed from a layer name. Reference a glyph by name; never by Figma node and never as an exported SVG.

## Anatomy

1. **Frame** (`root`, container) — *The component's own box. With Framed off it hugs the glyph exactly, with Framed on it becomes a fixed 40px square with the glyph centred.*
   Vertical auto-layout, zero gap, no padding on any variant. No fill, no stroke, no radius, no effects — framing adds room and nothing visible. Sizing is `hug` when `framed` is false and `fixed` at `control/target-min` when true; alignment goes from start to center at the same time.

2. **Glyph** (`glyph`, instance) — *The swapped icon instance. Carries the artwork and takes its colour from the parent that embeds it.*
   Fixed and square, dimension bound per size to `control/icon-sm` / `control/icon-md` / `control/icon-lg`. Colour is **not** bound here: the glyph takes `currentColor`, which in a font implementation satisfies the inheritance requirement with no per-parent icon colour token. Bound to the `name` prop.

## Variants

`measured…Px` columns are observations of the rendered file, not design decisions — the tokens are the contract.

| size | framed | glyph dimension | root sizing | root align | root dimension | measuredRootBoxPx | measuredGlyphBoxPx |
|---|---|---|---|---|---|---|---|
| xsmall | false | `control/icon-xs` | fixed | start | `control/icon-xs` | 12 | 12 |
| xsmall | true | `control/icon-xs` | fixed | center | `control/xs` | 24 | 12 |
| small | false | `control/icon-sm` | hug | start | — | 16 | 16 |
| small | true | `control/icon-sm` | fixed | center | `control/target-min` | 40 | 16 |
| medium | false | `control/icon-md` | hug | start | — | 20 | 20 |
| medium | true | `control/icon-md` | fixed | center | `control/target-min` | 40 | 20 |
| large | false | `control/icon-lg` | hug | start | — | 28 | 28 |
| large | true | `control/icon-lg` | fixed | center | `control/target-min` | 40 | 28 |

Nothing else changes across the eight variants. Since 2026-11-06 Figma draws the small, medium and large unframed variants fixed, with unbound glyphs; code hugs and binds the token, as in this table.

## Subcomponents

**Icon library component sets** — 724 sets on the [Assets page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-6754), same file (not remote), outside this component page. Each carries a single `Style` axis (`rounded` / `sharp`). The referenced default is `Verified` (`2046:7116`) → glyph `verified`.

These are not extracted as anatomy trees. In this project the library is delivered as an icon font (`packages/icons`), so each set resolves to a glyph name rather than to artwork.

### Icon font

| | |
|---|---|
| Source | `packages/icons` |
| Families | `ZdsIcons-Rounded`, `ZdsIcons-Sharp` (pinned: rounded) |
| Glyphs | 724 |
| Default glyph | `verified` — present, not retired, not rejected |
| Colour | `currentColor` |
| Size | bound on this component; maps to font-size on the glyph element |

## Tokens & theming

Source: `tokens/` (see `tokens/manifest.json`).

- **dimension** — `control/icon-xs`, `control/icon-sm`, `control/icon-md`, `control/icon-lg`, `control/xs`, `control/target-min`
- **color / typography / effect** — none. Icon binds no colour and no type token.

Theme axes available in the export: `palette` (Light, Dark), `size` (Desktop, Mobile, Tablet, Desktop Compact), `typography` (Desktop, Tablet, Mobile, Desktop Compact).

Palette and typography do not reach this component — its appearance varies only with the foreground colour of whatever embeds it. All four dimension tokens live in the `size` collection but alias the same primitive in every one of its four modes, so Icon's geometry does not respond to breakpoint.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | Icon has no interaction states of its own. It takes its colour from whatever embeds it, so hover, pressed, focus and disabled are all rendered by the parent. |

- **Motion** — None modelled in Figma. Icon is a static graphic, and any transition belongs to the component that embeds it.
- **Colour** — Not set here. The glyph inherits the foreground token of its parent, which is why the same Icon reads light on a filled button and accent-coloured on an outline one.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Name | instance swap, icon library | Any glyph from the library the property points at, and the only content this component carries. |
| Glyph colour | inherited, not a property | The glyph follows the parent's foreground token. Recolour the parent rather than overriding the vector here, or the parent's states will stop working. |

## Usage

**Do**

- Set the glyph deliberately every time. The component arrives holding Verified, which is the right answer for almost nothing.
- Turn Framed on only where the icon is tappable on its own. Inside a button or a menu row the parent already provides the target.

**Don't**

- Don't override the glyph's colour on the instance. It inherits from the parent, and overriding it breaks every state the parent renders.
- Don't rely on an icon alone to carry meaning. It has no text of its own, so pair it with a visible label or give it an accessible name in code.

## Accessibility

- Icon carries no text. Anything it communicates has to be repeated in a visible label or an accessible name in code.
- Framed pads the glyph to control/target-min, the minimum tappable size. A bare 16px or 20px icon is not a target on its own.
- The glyph inherits its parent's foreground colour, so contrast is a property of the surface it lands on rather than of this component.
- There are no interaction states here. Focus and disabled treatments come from the embedding component.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Size | 16px at small, 20px at medium, 28px at large, always square. |
| Framed box | Fixed | 40px square when Framed is true, bound to control/target-min, at every Size. The glyph keeps its own size and is centred inside. |
| Padding | None | Zero on every variant. With Framed off the frame hugs the glyph, with Framed on the space comes from centring inside the fixed box rather than from padding. |
| Fill and radius | None | The framed box has no fill and no corner radius, so Framed adds room and nothing visible. |
| Colour | Inherited | Not bound on this component. The glyph takes the foreground token of whatever embeds it. |

## Visual reference

No images are stored; every node deep-links into Figma so a shot can be pulled on demand and is never stale.

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15004) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15010) · [Metadata frame](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4740-41)
- Variants: [small/unframed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15009) · [small/framed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15017) · [medium/unframed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15011) · [medium/framed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15020) · [large/unframed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15014) · [large/framed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15023)

## Issues

### Warnings

1. **Style axis pinned, not exposed** *(api vs metadata)* — The library's Style axis (rounded / sharp) is pinned to rounded on the nested glyph instance and is not exposed as a property, so Icon cannot render the sharp family at all. The metadata never mentions Style, so a reader cannot tell whether this is a deliberate restriction or an oversight. The icon font ships both families sharing codepoints, so an implementation could expose the axis for free — decide deliberately rather than by inheriting Figma's pin.

2. **Swap picker offers one glyph out of 724** *(api vs metadata)* — Content & Slot says the Name swap accepts "Any glyph from the library the property points at", but the property's `preferredValues` list contains exactly one component set — `Verified`, the default itself. Designers can still swap manually, but the guided path contradicts the stated intent.

3. **All four dimension tokens have stale descriptions** *(descriptionDrift)* — `control/icon-sm` says "= 20px" but resolves to 16px; `control/icon-md` says "= 24px" but resolves to 20px; `control/icon-lg` says "= 32px" but resolves to 28px; `control/target-min` says "= 44px" but resolves to 40px. The resolved values are the ones the metadata and the rendered variants agree on, so the descriptions are wrong, not the bindings. Fix in Figma.

4. **Width is never token-bound** *(gaps)* — Only height is variable-bound on both the root frame and the glyph instance; width is left raw on every variant. The component is square in every variant purely by coincidence of the two numbers matching. An implementation should bind one dimension token to both axes rather than reproduce the unbound width.

12. **xsmall not in the metadata** — Size=xsmall is undocumented. Its framed box is 24px (`control/xs`), while the metadata says 40px at every Size.

13. **Unframed bindings dropped** *(2026-11-06)* — the small, medium and large unframed variants are now fixed-size with unbound glyphs. Code binds each size's `control/icon` token on both axes.

### Notes

5. **Expected binding drift** — root height is bound to `control/target-min` in the three `Framed=true` variants and unbound in the three `Framed=false` ones (3 of 6). Correct by design — with Framed off the frame hugs its child — but it will surface in any automated binding audit.

6. **Geometry is breakpoint-invariant** — the four tokens live in the four-mode `size` collection but alias the same primitive in every mode. If responsive icon sizing is ever wanted, the hook already exists.

7. **40px vs the 44px the token name implies** — the accessibility text calls the framed box "the minimum tappable size", and the token is named `target-min` with a description claiming 44px. 40px clears the WCAG 2.2 AA target minimum comfortably but falls short of 44px. Worth confirming which standard the figure was chosen against.

8. **Empty sections are intentional** — States & Triggers carries a single "Static" row and Behavior & Motion Intent says "None modelled in Figma". Icon delegates every state and transition to the component that embeds it.

9. **No on-page subcomponents** — the 724 icon sets live on the Assets page in the same file (not remote), outside this component page. They are referenced here by glyph name via `packages/icons/codepoints.json` rather than re-extracted.

10. **Default glyph verified against the font** — `verified` (Figma setId `2046:7116`) exists in `codepoints.json`, is not retired, and is not among the 18 rejected labels in `inventory.json`. No fallback SVG needed for it. Note that 18 labels across 9 icons are rejected by the font build (stroked paths and non-square viewBoxes); a consumer selecting one of those names gets an invisible icon and needs an inline SVG fallback.

11. **No Figma description** — the component set carries no description and no documentation links, so the intent captured here exists only in the Icon Metadata frame.

14. **Code decisions** — code exposes the Style axis as `iconStyle` (rounded default, sharp available), since both families share codepoints. `name` is required in code; there is no default glyph.
