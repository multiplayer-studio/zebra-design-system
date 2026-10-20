# Status Label

Reports a read-only state on an item, such as Active, Overdue or Failed. Status sets the fill, the border and the leading element together while the label text holds one colour throughout, and Leading decides whether the status also shows as a dot, an icon or nothing at all. Reach for it where a state is being reported, and for Label where the thing shown is a category rather than a state.

Source: [Badges page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297) · component set `6403:297` · extracted 2026-10-15 · 30 variants · default `Status=neutral, Leading=indicator, Shape=rounded`

> **No blockers, 2 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `label` | string |  | `Label` |
| `status` | enum | `neutral`, `info`, `positive`, `warning`, `negative` | `neutral` |
| `leading` | enum | `indicator`, `icon`, `none` | `indicator` |
| `shape` | enum | `rounded`, `sharp` | `rounded` |

**label**: The state being reported. Keep it to the state itself and two words at most, because the component hugs its text and a sentence becomes a wide block inside a narrow column.

**status**
- `neutral`: No particular standing. Reach for it where a row needs a state shown but none of the four meanings apply, not as a resting value for a status that simply has not changed yet.
- `info`: Supporting information carrying no judgement. Nothing is wrong and nothing has succeeded e.g ongoing.
- `positive`: A finished or healthy state. Reach for it on completion rather than on progress, or there is nothing left to mark the end with.
- `warning`: Something needs attention but nothing has failed. Using it for a failure understates the problem to anyone scanning a column of these.
- `negative`: A failed or blocking state. The strongest of the five, so spending it on a recoverable problem leaves nothing in reserve for a real one.

**leading**
- `indicator`: A dot in the status colour. The quietest of the three and the right choice where the label already names the state.
- `icon`: A glyph fixed per status, Info for neutral and info, then Check Circle, Warning and Error. Reach for it where the status has to read without the label being read.
- `none`: Text only. The fill and the border still carry the status, so this is the form that leans hardest on colour alone.

**shape**
- `rounded`: Match the contour of the surface the label sits on.
- `sharp`: The square-cornered pair, for dense surfaces built from square corners such as a table cell.

**Internal variation, `leading (icon)`** (via Icon (nested, exposed)): `info`, `check-circle`, `warning`, `error`. An Icon at Size=small whose glyph is fixed per status. The component chooses it and surfaces none of the Icon's own properties, so it is not a slot a consumer fills. The nested Icon is marked exposed in Figma, so its Name swap is reachable on an instance even though the metadata calls it fixed. Driven by Status; not a prop.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `surround` | container | The fill and the border, both following Status. Together they carry the status even when the leading element is off. · radius: radius/pill (rounded) · radius/none (sharp) · layout: direction horizontal; gap space/none; padding space/xs · paint: fill per status; stroke {"color": "per status", "width": "stroke/thin", "align": "inside, included in layout"} |
| `leading` | container | instance | A dot or an icon in the status colour, chosen by Leading and absent when it is none. The component draws it from Status rather than taking one in. · visibleWhen: leading != none · indicator: box control/icon-sm square, padding space/none; dot control/icon-xs ellipse, fill per status · icon: ref Icon; size Icon Size=small; glyph per status; color per status (the glyph's own fill; in code currentColor) |
| `label` | text | The state being reported, set through Label. It decides the width of the whole component. · content: label · text: style body/small; color foreground/primary · container: padding 0 space/xs; gap space/none |

## Variants

Cells are token names. Shape changes only the radius; Leading only which leading element is drawn. Neither changes colour.

### status

| status | surround.fill | surround.stroke | leading.color | icon | figmaNode |
|---|---|---|---|---|---|
| neutral | feedback/neutral/background/subtle | border/default | foreground/primary | info | 6403:147 |
| info | feedback/info/background/subtle | border/info | foreground/info | info | 6403:177 |
| positive | feedback/success/background/subtle | border/success | foreground/success | check-circle | 6403:207 |
| warning | feedback/warning/background/subtle | border/warning | foreground/warning | warning | 6403:237 |
| negative | feedback/error/background/subtle | border/error | foreground/error | error | 6403:267 |

### leading

| leading | leading.part | measuredWidthPx | figmaNode |
|---|---|---|---|
| indicator | control/icon-sm box with a control/icon-xs dot | 69 | 6403:147 |
| icon | Icon Size=small | 69 | 6403:157 |
| none | removed | 53 | 6403:171 |

### shape

| shape | surround.radius | figmaNode |
|---|---|---|
| rounded | radius/pill |  |
| sharp | radius/none | 6403:152 |

## Dependencies

- **Icon** (`2046:15010`, local): Font glyphs, rounded family: info, check-circle, warning, error. All present in codepoints.json; none rejected.

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `feedback/{neutral,info,success,warning,error}/background/subtle`, `border/{default,info,success,warning,error}`, `foreground/{primary,info,success,warning,error}`
- **Dimension:** `space/{none,xs}`, `radius/{pill,none}`, `stroke/thin`, `control/{icon-sm,icon-xs}`
- **Typography:** `body/small`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states. Nothing answers hover, focus or press, because it reports a state rather than offering one. |
| Status | The Status value | Fill, border and the leading element all move together. The label colour does not, so a status change is carried entirely by the surround. |

- **Motion:** No transition is defined. A status change is a swap of fill, border and the leading element.
- **Not interactive:** There is nothing to press. Where a reader needs to act on the state, the action belongs on the row around the label rather than on the label itself.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Consumer owned, set through the Label property. It hugs, so the length of the text decides the width of the whole component. |
| Leading indicator | drawn, per Status | An 8 dot in the status colour inside a 16 box. The component draws it from Status, so there is nothing to pass in. |
| Leading icon | nested Icon, per Status | An Icon at Size=small whose glyph is fixed per status. The component chooses it and surfaces none of the Icon's own properties, so it is not a slot a consumer fills. |

## Usage

**Do**
- Keep the label to the state itself, such as Active or Overdue. The component hugs its text, so a sentence turns into a wide block in a narrow column.
- Reach for Leading=icon where the status has to survive greyscale. The dot and the fill are colour alone, the glyph differs in shape as well.

**Don't**
- Don't make it pressable. It reports a state and offers nothing, so any action belongs on the row around it.
- Don't reach for neutral to mean normal. It is the absence of a status, and spending it that way leaves no way to say that nothing is known.

## Accessibility

- Status is carried by the fill, the border and the leading element. The label holds foreground/primary at every status, so colour alone separates one status from another unless the label names it.
- Set Leading to icon where the status has to survive greyscale or low vision. The glyph differs per status in shape, not only in colour.
- The label text is the accessible name. Where it carries only a colour word or an internal code, the status is unreadable to anyone not already fluent in the convention.
- neutral and info both carry the Info glyph. Where the two appear in one view, the label is the only thing separating them.
- Nothing here is focusable and nothing announces itself. Where a status changes while a person is on the page, the surrounding structure has to announce it.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | 28 tall at every status. The width hugs the label, running 69 with a leading element and 53 without, so the component is as wide as its text needs. |
| Padding and gap | Fixed | space/xs on all four sides, with no gap between the leading element and the label. The leading element is a 16 square box carrying an 8 dot or a 16 icon, and that box supplies the separation on its own. |
| Radius | Per Shape | radius/pill when rounded and radius/none when sharp. Nothing else moves between the two. |
| Fill | Per Status | neutral draws interactive/neutral/background/default. The other four draw feedback/info, success, warning and error at background/subtle, so all four sit at one tint strength rather than escalating with severity. |
| Border | Per Status | A 1px stroke tracking the fill, border/default for neutral and border/info, success, warning or error for the rest. It is what keeps four subtle tints apart from each other at a glance. |
| Label | Theming | body/small at 14px, held at foreground/primary for every status. Only the fill, the border and the leading element move. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3717-5570) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6413-213)
- [neutral, indicator](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-147) · [negative, icon](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-277) · [positive, none, sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-234)

## Issues

### Warn

- *metadata Layout vs structure*: The metadata says 'neutral draws interactive/neutral/background/default'. As built, neutral's fill is feedback/neutral/background/subtle (the new neutral feedback token), alongside border/default and a foreground/primary dot.
- *code (packages/web-components zds-status-label)*: The experimental element still fills neutral with interactive/neutral/background/default. It should move to feedback/neutral/background/subtle to match Figma.

### Note

- *structure*: The neutral dot and neutral icon use foreground/primary, not the new feedback/neutral/foreground. The metadata only says 'in the status colour', so either reads as intended; recorded so the choice is explicit.
- *structure vs metadata Content & Slot*: The nested Icon is marked exposed in Figma, so its glyph swap is reachable on an instance, while the metadata says the glyph is fixed and 'not a slot a consumer fills'. In code the glyph follows status.
- *metadata*: Positive and negative are the design names; the tokens are success and error. No motion and no interaction states, by the metadata's own statement. The set has no description.
