# Avatar Rail

Shows a group of people as overlapping avatars, with an optional counter standing in for everyone who did not fit. Up to four avatars are carried, the first two always and the last two by choice, and Size moves the whole rail together rather than any single avatar. Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the subject.

Source: [Avatar page](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6494-1953) · component set `6494:1953` · extracted 2026-10-18 · 18 variants · default `Size=xxxsmall, Stacking=start`

> **No blockers, 4 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `size` | enum | `xxxsmall`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `xxxlarge` | `xxxsmall` |
| `stacking` | enum | `start`, `end` | `start` |
| `max` | number | `2`, ` `, `t`, `o`, ` `, `4` | `4` |
| `showOverflow` | boolean | | `true` |
| `overflowCount` | string | | `+2` |
| `showAvatar3` | boolean | | `true` |
| `showAvatar4` | boolean | | `true` |

**size**
- `xxxsmall`: The smallest step, for a rail sitting inside a dense row such as a table cell.
- `xxsmall`: A step up, still for compact rows where the group is secondary to the text beside it.
- `xsmall`: For secondary groups in a list, where the rail supports the row rather than leading it.
- `small`: For list rows and menu items where the people are part of the point rather than decoration.
- `medium`: The balanced step, and the right choice where the rail stands on its own inside a card.
- `large`: For emphasis in a card header, where the group is the subject of the block.
- `xlarge`: For a prominent group on a detail page.
- `xxlarge`: For a header where the people are the main content rather than a supporting detail.
- `xxxlarge`: The largest step, for a full width header. The rail grows quickly at this end, so check it still fits its column before reaching for it.

**stacking**
- `start`: The first avatar sits above the ones after it, so the group reads left to right with the earliest person shown whole.
- `end`: Reverses it, so the last position is the one shown whole. Reach for it where the counter should sit on top of the stack rather than beneath it.

**max**: Code only. How many avatars the rail shows, with the first two always present. Figma has no Max property and sets the same thing with Show Avatar 3 and Show Avatar 4. Everyone past Max is counted into the overflow, as the avatars passed in less Max, so a group of six at Max 4 reads +2 and at Max 3 reads +3.

**showOverflow**
- `true`: Keeps the counter at the end, standing in for everyone not shown. In code it appears only when there are more avatars than Max.
- `false`: Drops it. Only safe where the rail shows the whole group, because without the counter a trimmed group reads as complete.

**overflowCount**: Figma only. How many people the rail is not showing, typed by hand in Figma. In code it is not a property: the rail generates it from Max, as the avatars passed in less Max. It is a remainder rather than a total, so a group of six shown four at a time reads +2 and never 6. *(shown when showOverflow = true and avatars > max)*

**showAvatar3**: Not in the Property Breakdown. The Anatomy annotation calls avatars 3 and 4 'the two optional positions, each toggled on its own, so a rail can carry two, three or four. (Figma Only)'. In code, max and the avatars passed in decide this.

**showAvatar4**: As showAvatar3.

**Internal variation, `avatar1..avatar4`** (via Avatar (nested, not exposed)): `initials`, `photo`, `Icon`. Content type, swatch colour, photo and initials are set on each nested Avatar's own Avatar Type instance (sample: initials purple, photo, initials blue, initials sea). The rail pins Show Ring, Show Close and Show Status to false and surfaces none of Avatar's properties. The Avatar instances are not exposed (isExposedInstance false), so this is reached by selecting into the rail, not from its properties panel.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `rail` | container | Horizontal row, hugging its contents. The negative gap is what overlaps the avatars. · layout: direction horizontal; gap space/neg/xl at medium (a quarter of the diameter, negative); raw at every other size; padding space/none (unbound, zero); align start, centred vertically; paintOrder start: first child on top (reverse z-order) · end: last child on top |
| `avatar1` | instance | Always present. · size: control/lg at medium (the diameter); scaled elsewhere · radius: radius/pill · paint: cutout border/inverse stroke, outside, stroke/thick at medium (scaled elsewhere) |
| `avatar2` | instance | Always present. Same as avatar1. |
| `avatar3` | instance | Optional. Same as avatar1. · visibleWhen: showAvatar3 |
| `avatar4` | instance | Optional. Same as avatar1. · visibleWhen: showAvatar4 |
| `overflow` | container | The counter circle at the end, drawn by the rail. Not an Avatar: no person, no photo, no presence. · visibleWhen: showOverflow · size: control/lg at medium (matches the avatar diameter); scaled elsewhere · radius: radius/pill · layout: align center, center; padding none · paint: fill feedback/neutral/background/subtle; stroke border/default, inside, stroke/thick at medium (scaled elsewhere) |
| `count` | text | The remainder, centred in the overflow circle. · content: overflowCount · text: style label/large at medium; detached and scaled at every other size; color foreground/primary |

## Variants

Cells ending Px are measurements of the rendered file, not values to copy. Every size is the medium variant scaled by diameter / 48 (the Avatar's own method), so each measurement is a fixed ratio of the diameter: gap -1/4, cutout and overflow ring 1/24, count font 1/3, count line height 1/2. Only medium binds tokens. Stacking changes only paint order.

### size

| size | diameterPx | diameter | gapPx | gap | rootWidthPx (4 avatars + overflow) | avatarScale | cutoutWeightPx | overflowRingPx | countFontSizePx | countLineHeightPx | countStyle | figmaNode |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| xxxsmall | 24 | — | -6.0 | raw | 96 | 0.5 | 1.0 | 1.0 | 8.0 | 12.0 | detached | 6501:15772 |
| xxsmall | 32 | — | -8.0 | raw | 128 | 0.67 | 1.33 | 1.33 | 10.67 | 16.0 | detached | 6501:15806 |
| xsmall | 36 | — | -9.0 | raw | 144 | 0.75 | 1.5 | 1.5 | 12.0 | 18.0 | detached | 6501:15840 |
| small | 40 | — | -10.0 | raw | 160 | 0.83 | 1.67 | 1.67 | 13.33 | 20.0 | detached | 6501:15874 |
| medium | 48 | control/lg | -12.0 | space/neg/xl | 192 | 1.0 | 2.0 | 2.0 | 16.0 | 24.0 | label/large | 6494:609 |
| large | 60 | — | -15.0 | raw | 240 | 1.25 | 2.5 | 2.5 | 20.0 | 30.0 | detached | 6501:15908 |
| xlarge | 80 | — | -20.0 | raw | 320 | 1.67 | 3.33 | 3.33 | 26.67 | 40.0 | detached | 6501:15942 |
| xxlarge | 120 | — | -30.0 | raw | 480 | 2.5 | 5.0 | 5.0 | 40.0 | 60.0 | detached | 6501:15976 |
| xxxlarge | 200 | — | -50.0 | raw | 800 | 4.17 | 8.33 | 8.33 | 66.67 | 100.0 | detached | 6501:16010 |

### stacking

| stacking | paintOrder | figmaNode |
|---|---|---|
| start | first on top (avatar1 over avatar2 … avatar4 over overflow) | 6494:609 |
| end | last on top (overflow over avatar4 … avatar2 over avatar1) | 6494:1473 |

## Dependencies

- **Avatar** (`4906:1172`, local): Instances of Avatar Size=medium, scaled per rail size (0.5 to 4.17). Spec: specs/avatar/avatar.spec.md. No icon glyphs are used by the rail itself.

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `border/inverse`, `border/default`, `feedback/neutral/background/subtle`, `foreground/primary`
- **Dimension:** `space/neg/xl`, `space/none`, `control/lg`, `stroke/thick`, `radius/pill`
- **Typography:** `label/large`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The rail has no interaction states. Nothing answers hover, focus or press, and the avatars inside it carry none either. |
| Stacking | The Stacking value | Only the paint order changes. Positions, diameters and the overlap all hold, so the two values differ solely in which edge of each avatar is covered. |

- **Motion:** No transition is defined. Changing Size or Stacking is a static swap.
- **Overlap:** The quarter diameter overlap is what makes the rail read as one group rather than a row of separate avatars. Spacing them apart turns the same content into a list of individuals.
- **Composition limits:** Four positions and a counter, with the first two always present. A group of one belongs in a single Avatar, and a group too large for four belongs in the counter rather than in a longer rail.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Avatar slots | nested Avatar | Up to four positions, each an Avatar, the first two always present. In code Max sets how many show (2 to 4); in Figma, Show Avatar 3 and Show Avatar 4 do. |
| Avatar properties | parent owned | The rail turns off the ring and the dismiss badge on every avatar and surfaces none of Avatar's own properties except the status badge. The person shown is set on the nested avatar, and everything else is left to the rail so the group stays uniform. Avatar Metadata covers what an Avatar offers on its own terms. |
| Overflow | drawn | A circle at the end of the rail, drawn by the rail rather than taken in. It is not an Avatar, so it carries no person, no photo and no presence. |
| Overflow Count | text property (Figma only) | Figma only, typed by hand through Overflow Count. In code the count is generated from Max and the avatars passed in, so there is no count to set. Keep it short, because the circle holding it does not grow. |

## Usage

**Do**
- Keep Show Overflow on whenever the group is larger than the rail shows. Without the counter a trimmed group reads as the whole group.
- Let Size move the whole rail. Every avatar takes the same diameter, so the step is a decision about the group and not about any one person in it.

**Don't**
- Don't reach for the rail to show one person. A single Avatar is the component for that, and a rail of one has an overlap that never happens.

## Accessibility

- The rail is a group and the counter at the end is part of what it says. A reader who gets only the avatars gets a smaller group than the real one.
- The counter is a bare number. Something has to say what it counts, because +2 on its own does not say two more people.
- Avatars overlap by a quarter, so part of each one is always covered. Check initials still read at the smallest step, where the diameter is 24.
- The rail turns the presence badge off on every avatar, so presence is not available here. Anything depending on it needs a different arrangement.
- Nothing in the rail is focusable and nothing announces itself. Where people join or leave the group while a person is on the page, the structure around it has to report that.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Size | Nine steps, 24, 32, 36, 40, 48, 60, 80, 120 and 200 square. Every avatar in the rail takes the same diameter, so the step is a decision about the group rather than about any one person in it. |
| Overlap | Derived from Size | Each avatar sits over the one before it by a quarter of a diameter, from 6 at the smallest step to 50 at the largest. The overlap scales with the avatar rather than holding one fixed value, so the rail reads the same at every size. |
| Overall width | Hug | Four times the diameter when all five positions are filled, from 96 at the smallest to 800 at the largest. Each position after the first adds three quarters of a diameter, so dropping one takes exactly that much back. |
| Overflow | Fixed | A circle matching the avatar diameter, at radius/pill on feedback/neutral/background/subtle. It does not grow with its text, so a longer count has to fit the circle rather than widen it. |
| Count | Scales with Size | Centred in the overflow circle and scaling with the rail rather than holding one size across the nine steps. |
| Paint order | Per Stacking | start paints each avatar above the one after it and end reverses that. Nothing moves and nothing resizes, only which edge of each avatar is the covered one. |

## Visual reference

- [Page](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=2364-6017) · [Component set](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6494-1953) · [Metadata](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6520-737)
- [medium, start](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6494-609) · [medium, end](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6494-1473) · [xxxsmall (default)](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6501-15772) · [xxxlarge](https://www.figma.com/design/UZuTdXUhuybNkybf1NZuOt/Avatar-Rail?node-id=6501-16010)

## Issues

### Warn

- *tokens (spec vs export)*: The medium gap binds space/neg/xl, which is not in tokens/ (the export has space/neg/{xs,sm,md} only). The token lives in this working file, not yet in the exported library. Re-run the token export once it is published; until then code derives the overlap as a quarter of the diameter.
- *metadata Content & Slot vs Accessibility vs structure*: Content & Slot says the rail 'surfaces none of Avatar's own properties except the status badge'; Accessibility says 'The rail turns the presence badge off on every avatar, so presence is not available here'. Structure agrees with Accessibility: Show Status is false on every avatar, the avatars are not exposed, and the rail has no status property.
- *metadata Layout & Theming vs Stacking*: Overlap says 'Each avatar sits over the one before it'. Under the default Stacking=start the reverse holds: each avatar sits over the one after it (the Stacking and Paint order rows say so). Only Stacking=end matches that sentence.
- *structure (overflow vs avatars)*: The avatars have their rings off and a border/inverse cutout outside; the overflow keeps a border/default ring inside and has no cutout. The metadata's Overflow row names only the fill. Under Stacking=end the overflow paints over avatar4 with no cutout separating them. Confirm whether the overflow should take the same border/inverse cutout.

### Note

- *metadata Property Breakdown vs Figma API*: Show Avatar 3 and Show Avatar 4 are Figma properties without rows of their own in the Property Breakdown; its Max row (code only) names them as Figma's equivalent, and the Anatomy annotation marks them '(Figma Only)'.
- *owner decision (2026-10-18)*: Now carried by the metadata itself: the Property Breakdown has a code-only Max row (2 to 4, default 4) and marks Overflow Count as Figma only, generated in code as the avatars passed in less Max and shown when Show Overflow is on and there is a remainder.
- *structure (bindingDrift / gaps)*: Nine bindings exist on medium only: rail gap, avatar width and cutout weight, overflow width, height and ring weight, count font size, line height and letter spacing. Every other size is medium scaled (raw values, count text detached from label/large), the same method as Avatar's own size ladder. Implement as ratios of the diameter (see Variants), not as nine authored values.
- *structure (nested instances)*: Each avatar is an Avatar Size=medium instance scaled by diameter / 48, not Avatar's matching Size variant. Visually identical, because Avatar's own sizes are medium scaled the same way; in code render Avatar at the matching size.
- *structure (exposure)*: The nested avatars are not exposed instances, so the person shown is changed by selecting into the rail rather than from its properties panel, though the metadata says 'The person shown is set on the nested avatar'.
- *coverage*: States and motion are intentionally absent (metadata: static, no transition). No focus, hover or press, and no announcement behaviour, by design.
