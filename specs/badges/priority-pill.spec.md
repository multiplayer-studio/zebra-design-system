# Priority Pill

Shows where an item sits on a four step scale, from low to urgent. Level sets the fill, the circle and the glyph together, Variant decides whether the name appears beside the circle or the circle stands alone, and Leading swaps the glyph for a rank number. Reach for it where items compete for attention and the order between them is the point.

Source: [Badges page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410) · component set `6406:410` · extracted 2026-10-15 · 32 variants · default `Level=low, Variant=lozenge, Size=large, Leading=icon`

> **No blockers, 3 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `label` | string |  | `Label` |
| `priorityNumber` | string |  | `4` |
| `level` | enum | `low`, `medium`, `high`, `urgent` | `low` |
| `variant` | enum | `lozenge`, `badge` | `lozenge` |
| `size` | enum | `small`, `large` | `large` |
| `leading` | enum | `icon`, `number` | `icon` |

**label**: The priority name, such as Low or Urgent. Carried on lozenge only, so switching to badge removes it rather than shortening it. *(shown when variant = lozenge)*

**priorityNumber**: The rank shown inside the circle when Leading is number. One or two characters, because the circle is a fixed square and does not grow with the value. *(shown when leading = number)*

**level**
- `low`: The bottom of the scale, drawn in a neutral rather than a feedback colour so it reads as ordinary rather than as something going well.
- `medium`: The middle of the scale. It takes the info colour, the one level that does not escalate the surface it sits on.
- `high`: Ahead of the rest but not at the top. Reaching for it on a true emergency leaves nothing above it.
- `urgent`: The top of the scale. The strongest colour in the set, so spending it broadly flattens the very scale it exists to express.

**variant**
- `lozenge`: Circle and label together. Reach for it wherever a reader may not already know the scale, because the label is the only part that names the level outright.
- `badge`: The circle alone. Reach for it in a dense list or pinned to another object, and only where the colour and the glyph are already understood.

**size**
- `large`: The default, for a row with room for the name.
- `small`: For dense lists. It reduces the text as well as the box, so a long name gets harder to read rather than merely tighter.

**leading**
- `icon`: A direction glyph in the circle, down for low, a dash for medium, up for high and the priority mark for urgent. It says which way the level points without the label being read.
- `number`: A rank number in the circle in place of the glyph. Reach for it where the exact position in a queue matters, and note that it removes the only cue to direction that is not colour.

**Internal variation, `glyph`** (via Icon (nested)): low: `arrow-down`, medium: `remove`, high: `arrow-up`, urgent: `priority`. An Icon at Size=small whose glyph is fixed per level. The component chooses it from Level and surfaces none of the Icon's own properties, so it is not a slot a consumer fills.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `pill` | container | The surround, filled per Level. On badge this is the whole component. · radius: radius/pill · layout: direction horizontal; gap space/xs (lozenge); padding large: space/xs, trailing space/sm · small: space/2xs, trailing space/sm · badge: even (space/xs large, space/2xs small) · paint: fill per level |
| `circle` | container | A knockout disc carrying either a direction glyph or a rank number. It takes the label's colour while its contents take the pill's. · size: control/icon-md (large) · control/icon-sm (small) · radius: radius/pill · layout: padding space/none; align center · paint: fill per level (the label's colour) |
| `glyph` | instance | visibleWhen: leading = icon · size: Icon Size=small (large: 16, exact) · scaled to 12 at small (unbound) · color: the pill's fill token |
| `rank` | text | visibleWhen: leading = number · content: priorityNumber · text: style indicator/medium (large; bound per property, no text style) · indicator/small (small); color the pill's fill token |
| `label` | text | The priority name, set through Label and present on lozenge only. · visibleWhen: variant = lozenge · content: label · text: style body/small (large) · indicator/small (small); color per level · container: padding trailing space/xs (large) · space/2xs (small) |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file. Level changes only colour, glyph and text, at every Variant, Size and Leading.

### level

| level | pill.fill | circle.fill + label.fill | glyph/rank colour | glyph | figmaNode |
|---|---|---|---|---|---|
| low | foreground/secondary | foreground/inverse | foreground/secondary | arrow-down | 6406:234 |
| medium | feedback/info/background/strong | interactive/primary/foreground/default | feedback/info/background/strong | remove | 6406:278 |
| high | feedback/warning/background/strong | foreground/inverse | feedback/warning/background/strong | arrow-up | 6406:322 |
| urgent | feedback/error/background/strong | interactive/destructive/foreground/default | feedback/error/background/strong | priority | 6406:366 |

### size

| size | pill.padding | circle | glyphPx | label | rank | measuredHeightPx | figmaNode |
|---|---|---|---|---|---|---|---|
| small | space/2xs, trailing space/sm | control/icon-sm | 12 | indicator/small, trailing space/2xs | indicator/small | 20 | 6406:247 |
| large | space/xs, trailing space/sm | control/icon-md | 16 | body/small, trailing space/xs | indicator/medium | 28 | 6406:234 |

### variant

| variant | label | pill.padding | measuredSizePx | figmaNode |
|---|---|---|---|---|
| lozenge | shown | trailing space/sm |  |  |
| badge | removed | even on all sides | 28 / 20 square | 6406:260 |

### leading

| leading | circle.content | figmaNode |
|---|---|---|
| icon | glyph |  |
| number | rank (Priority Number) | 6406:242 |

## Dependencies

- **Icon** (`2046:15010`, local): Font glyphs, rounded family: arrow-down, remove, arrow-up, priority. All present in codepoints.json; none rejected.

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `foreground/{secondary,inverse}`, `feedback/{info,warning,error}/background/strong`, `interactive/primary/foreground/default`, `interactive/destructive/foreground/default`
- **Dimension:** `space/{none,2xs,xs,sm}`, `radius/pill`, `control/{icon-md,icon-sm}`
- **Typography:** `body/small`, `indicator/medium`, `indicator/small`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states. Nothing answers hover, focus or press, because it reports a rank rather than offering an action. |
| Level | The Level value | The pill fill, the circle fill and the label colour move together, and the glyph changes shape with them. Nothing else varies. |

- **Motion:** No transition is defined. A level change is a swap of fill, circle, label colour and glyph.
- **Variant and label:** badge removes the label rather than hiding it, so the component becomes a fixed square instead of a pill that hugs its text. Whatever the label was carrying has to be available elsewhere on the row.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Consumer owned, set through Label. Present on lozenge only. |
| Priority Number | text property | Consumer owned, set through Priority Number and shown in the circle when Leading is number. |
| Leading glyph | nested Icon, per Level | An Icon at Size=small whose glyph is fixed per level. The component chooses it from Level and surfaces none of the Icon's own properties, so it is not a slot a consumer fills. |
| Circle | drawn | Drawn by the component rather than passed in. It holds either the glyph or the number and never both. |

## Usage

**Do**
- Reach for lozenge wherever a reader may not already know the scale. The label is the only part that names the level without prior knowledge of the colours.
- Keep Leading=icon where direction matters more than exact position. The glyph changes shape per level, so it survives greyscale in a way the fill does not.

**Don't**
- Don't mix badge and lozenge down one column. The two read as different scales rather than as one scale abbreviated.
- Don't treat the rank number as a count. It is a position in a queue, so a larger number does not mean more of anything.

## Accessibility

- Level is carried by fill and by glyph shape. With Leading=number the glyph is gone, leaving colour as the only cue that is not text, so the label has to be present or the level named nearby.
- badge drops the label entirely. It needs an accessible name from the surrounding structure, or the level reaches only a reader who already knows the colour code.
- The circle is a knockout, so its contents sit in the pill's background colour on the label's colour. Check that pairing holds contrast at small, where the glyph is 16 and the number is 10px.
- At small the label drops to 10px, which is below comfortable reading size for a long name. Keep names to one short word at that size.
- Nothing here is focusable and nothing announces itself. A level changing while a person is on the page has to be announced by the structure around it.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug on lozenge, fixed on badge | Lozenge is 28 tall at large and 20 at small, hugging its label. Badge is a fixed square at the same two heights, 28 and 20, because it carries no label to hug. |
| Padding and gap | Fixed | space/xs around the lozenge at large and space/2xs at small, with a wider trailing edge at both so the label clears the end of the pill. The circle and the label are separated by space/xs at both sizes. |
| Radius | Fixed | radius/pill on every level, variant and size. There is no square cornered form. |
| Fill | Per Level | low draws foreground/secondary. medium, high and urgent draw feedback/info, warning and error at background/strong. low is the only level not taking a feedback colour, which is what keeps it reading as ordinary rather than good. |
| Circle | Knockout | 20 at large and 16 at small, filled with the same token as the label. Whatever sits inside it, glyph or number, is drawn in the pill's own background colour, so the circle reads as a hole punched through the pill. |
| Label | Theming | body/small at 14px on large and indicator/small at 10px on small. The colour pairs with the level, foreground/inverse on low and high and the matching foreground token on medium and urgent. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3717-5570) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6413-389)
- [low, lozenge, large, icon](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-234) · [urgent](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-366) · [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-247) · [badge](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-260) · [number](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-242) · [small, badge, number](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-275)

## Issues

### Warn

- *metadata Accessibility vs structure*: The metadata says that at small 'the glyph is 16'. As built, the small glyph is the Icon at Size=small scaled to 12 to fit the 16 circle (the circle less space/2xs each side), with no size token. At large the glyph is the Icon at Size=small, 16, exactly.
- *code (packages/web-components zds-priority-pill)*: The experimental element differs from Figma in two places: the circle-to-label gap at large is 6 (space/xs + space/2xs) where Figma and the metadata use space/xs, and the small label is label/small (12) where Figma uses indicator/small (10). Everything else matches (padding, trailing label space, circle sizes and colours, glyphs, rank styles).
- *tokens*: Medium and urgent borrow button tokens for the circle and label (interactive/primary/foreground/default, interactive/destructive/foreground/default); low and high use foreground/inverse. foreground/on-strong now exists for text on strong fills and covers medium and urgent; high (warning) still needs a mode-aware 'on' colour because its fill lightens in dark mode.

### Note

- *structure (gaps)*: The badge variants keep a raw 6 gap on the pill. It has no effect (the badge has a single child), but it is the one unbound value in the set.
- *structure*: The large rank text binds every indicator/medium property individually but carries no text style, unlike the small rank (indicator/small style). Rendered the same; worth tidying.
- *tokens/ (contrast)*: The knockout pairs in light mode: medium 4.40:1 (info on white), high 4.34:1 (warning on foreground/inverse), urgent 5.19:1, low above 6:1. Acknowledged earlier by the owner.
- *metadata*: No motion and no interaction states, by the metadata's own statement. The set has no description.
