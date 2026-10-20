# Icon Indicator

A small circular marker carrying a fixed glyph, sized to sit beside text or on its own. Size is its only property and moves the circle and the glyph together. It says one thing and names nothing, so whatever it refers to has to be named beside it.

Source: [Badges page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-416) · component set `6407:416` · extracted 2026-10-15 · 3 variants · default `Size=small`

> **No blockers, 3 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `size` | enum | `small`, `medium`, `large` | `small` |

**size**
- `small`: The default, an inline size for sitting beside running text.
- `medium`: One step up, for a row with more room around it.
- `large`: The biggest, matching the other badges on this page at their largest so a mixed row still lines up.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `surround` | container | A circle filled foreground/secondary, sized by Size. · size: control/icon-sm · control/icon-md · control/icon-lg · radius: radius/pill · layout: padding space/none; gap space/none; align center · paint: fill foreground/secondary |
| `glyph` | instance | A Clock, fixed by the component and scaled with the circle. · size: small: Icon Size=small scaled to 12 · medium: Icon Size=small (16) · large: Icon Size=large scaled to 24 · glyph: clock · color: foreground/on-strong |
| `inset` | space | The ring of space around the glyph. It comes from the difference between the circle and the glyph rather than from padding. |

## Variants

Cells are token names, except those ending Px.

### size

| size | surround | glyph | glyphPx | figmaNode |
|---|---|---|---|---|
| small | control/icon-sm | Icon Size=small, scaled (unbound) | 12 | 6407:400 |
| medium | control/icon-md | Icon Size=small | 16 | 6407:405 |
| large | control/icon-lg | Icon Size=large, scaled (unbound) | 24 | 6407:410 |

## Dependencies

- **Icon** (`2046:15010`, local): Font glyph 'clock', rounded family; present in codepoints.json, not rejected.

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `foreground/secondary`, `foreground/on-strong`
- **Dimension:** `control/{icon-sm,icon-md,icon-lg}`, `space/none`, `radius/pill`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states and nothing beyond Size varies. |
| Size | The Size value | The circle and the glyph scale together. Colour and glyph shape hold. |

- **Motion:** No transition is defined. Size is the only thing that varies.
- **Fixed meaning:** The glyph does not change, so the component says exactly one thing. A different meaning has to come from a different component rather than from swapping the glyph here.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Glyph | nested Icon, fixed | A Clock at Size=small or large depending on the circle. The component chooses it and surfaces none of the Icon's own properties, so there is nothing to pass in. |

## Usage

**Do**
- Match the size to the text it sits beside. small is the inline size, large is for a row of its own.
- Pair it with text that says what is pending. The glyph is fixed, so the component cannot name the thing it refers to.

**Don't**
- Don't expect the glyph to change. It carries one meaning, and a different one needs a different component.
- Don't reach for it where a count matters. Notification Indicator carries a number, this carries none.

## Accessibility

- The glyph is fixed and there is no text. The component names nothing on its own, so what it refers to has to come from the structure around it.
- It carries one colour at one strength. Where it sits on a tinted surface, check the circle still separates from what is behind it.
- The glyph scales with the circle but keeps its shape, so at the smallest size it is 12 and detail is lost. Check it still reads at that size on the target display.
- Nothing here is focusable and nothing announces a change.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Size | A circle of 16, 20 or 28, carrying the glyph at 12, 16 or 24. |
| Padding | None | No padding at any size. The glyph is centred, and the ring of space around it comes from the difference between the two measurements rather than from padding. |
| Radius | Fixed | radius/pill at every size, so the surround is always a circle. |
| Fill | Fixed | foreground/secondary at every size. One colour throughout, with nothing varying it. |
| Glyph | Fixed | An Icon carrying the Clock glyph, at Size=small for the two smaller circles and Size=large for the biggest. The component sets it rather than taking one in. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3717-5570) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-416) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6413-917)
- [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-400) · [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-405) · [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-410)

## Issues

### Warn

- *code (packages/web-components zds-icon-indicator) vs metadata*: Figma and its metadata define a fixed meaning: a Clock glyph on foreground/secondary, nothing else variable ('A different meaning has to come from a different component'). The experimental element was built, at the owner's request, to be host-controlled: icon, fill and foreground are properties (default glyph check-mark, default size medium). The two need reconciling: either the element's defaults become Clock / small with the host overrides kept as an extension, or the metadata's 'fixed meaning' is relaxed.
- *tokens/ (contrast, Dark)*: The glyph is foreground/on-strong (white in every mode) on foreground/secondary, which turns light in dark mode: 1.51:1, so the glyph all but disappears in dark mode. Light mode is 6.78:1. foreground/inverse would flip with the fill and hold in both modes.
- *structure (gaps)*: The small (12) and large (24) glyphs are Icon instances scaled to fit, with no size token; only medium (Icon Size=small, 16) is exact. The metadata states 12 and 24 as intended.

### Note

- *metadata*: No motion and no interaction states, by the metadata's own statement. The set has no description.
