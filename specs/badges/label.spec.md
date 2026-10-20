# Label

Names a category on an item in a word or two, filled solid in one of five colours. Variant carries the standing of that category and Shape matches the surface it sits on. Reach for it where the thing shown is a fixed category, and for Status Label where it is a state that changes over time.

Source: [Badges page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328) · component set `6404:328` · extracted 2026-10-15 · 10 variants · default `Variant=neutral, Shape=rounded`

> **No blockers, 2 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `label` | string |  | `Label` |
| `variant` | enum | `neutral`, `info`, `positive`, `warning`, `negative` | `neutral` |
| `shape` | enum | `rounded`, `sharp` | `rounded` |

**label**: The category being named. One or two words, because the component hugs its text at 12px and a phrase turns into a wide bar.

**variant**
- `neutral`: No category colour. Reach for it where the label names something carrying no standing of its own, such as a type or a tag.
- `info`: Informational standing, carrying no judgement either way.
- `positive`: A good or completed standing.
- `warning`: A standing that needs attention without having failed.
- `negative`: A failed or blocking standing. The strongest of the five, so spending it widely leaves nothing above it.

**shape**
- `rounded`: Match the contour of the surface the label sits on.
- `sharp`: The square-cornered pair, for dense surfaces built from square corners such as a table cell.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `root` | container | Fill: A solid background per Variant. A strong fill rather than a tint, so the text knocks out of it. Border: A 1px stroke on the same token as the fill, keeping the edge flush and giving a theming set something to raise. · radius: radius/element-sm (rounded) · radius/none (sharp) · layout: direction horizontal; gap space/2xs; padding space/xs · paint: fill per variant; stroke {"color": "same token as the fill", "width": "stroke/thin", "align": "inside, included in layout"} |
| `label` | text | The category name, set through Label. It decides the width of the whole component. · content: label · text: style indicator/medium; color per variant |

## Variants

Cells are token names. Shape changes only the radius.

### variant

| variant | fill+border | label.fill | figmaNode |
|---|---|---|---|
| neutral | foreground/secondary | foreground/inverse | 6404:308 |
| info | feedback/info/background/strong | interactive/primary/foreground/default | 6404:312 |
| positive | feedback/success/background/strong | interactive/primary/foreground/default | 6404:316 |
| warning | feedback/warning/background/strong | foreground/inverse | 6404:320 |
| negative | feedback/error/background/strong | interactive/destructive/foreground/default | 6404:324 |

### shape

| shape | radius | figmaNode |
|---|---|---|
| rounded | radius/element-sm |  |
| sharp | radius/none | 6404:310 |

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `foreground/{secondary,inverse}`, `feedback/{info,success,warning,error}/background/strong`, `interactive/primary/foreground/default`, `interactive/destructive/foreground/default`
- **Dimension:** `space/{xs,2xs}`, `radius/{element-sm,none}`, `stroke/thin`
- **Typography:** `indicator/medium`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states. It names a category rather than offering an action. |
| Variant | The Variant value | Fill, border and text colour move together. Nothing else changes. |

- **Motion:** No transition is defined. A variant change is a swap of fill, border and text colour.
- **Not interactive:** There is nothing to press. Where a category can be acted on, such as removing a tag, that belongs to Chip rather than here.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Consumer owned, set through Label. It hugs, so the text decides the width of the whole component. |

## Usage

**Do**
- Keep it to one or two words. The component hugs its text at 12px, so a phrase becomes a wide bar in a narrow column.
- Reach for Label where the thing shown is a fixed category, and Status Label where it is a state that moves.

**Don't**
- Don't use it for a status that changes. Status Label carries a leading indicator for exactly that, and this has no room for one.
- Don't lean on the colour to carry the category. At 12px on a strong fill the word is doing the work and the colour is reinforcement.

## Accessibility

- The label text is the accessible name and the only thing that names the category. The fill reinforces it and never replaces it.
- Text is 12px knocked out of a strong fill. Check contrast per variant, because the pairing differs between them rather than following one rule.
- neutral and the four feedback variants are separated by colour alone. A reader who cannot tell them apart relies entirely on the word inside.
- Nothing here is focusable. Where a category can be removed or filtered by, that interaction belongs to a different component.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | 18 tall at every variant, hugging its text. The smallest of the badges on this page, sized to sit inline with running text rather than beside it. |
| Padding and gap | Fixed | space/xs on all four sides, with a space/2xs gap held for anything placed beside the text. |
| Radius | Per Shape | radius/element-sm when rounded and radius/none when sharp. Softer than a pill, so it reads as a block of text rather than as a token. |
| Fill and border | Per Variant | neutral draws foreground/secondary. The rest draw feedback/info, success, warning and error at background/strong. The 1px border takes the same token as the fill, so the two move together and the edge stays flush. |
| Label | Theming | indicator/medium at 12px, with the colour paired per variant so the text always knocks out of the fill rather than sitting on it. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3717-5570) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6413-565)
- [neutral](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-308) · [warning](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-320) · [negative, sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-326)

## Issues

### Warn

- *structure vs tokens (line height)*: The metadata gives the label as 18 tall. The text is bound to indicator/medium, whose line height token resolves to 14 in the export, but Figma reports the text box at 8 tall, which is what makes 18 add up (space/xs top and bottom, a 1px border each side, 8 of text). Built from the tokens (padding space/xs, border stroke/thin, line height indicator/medium) the label is 24 tall, not 18. Either the line height should drop for this component, or the padding should, or 24 is the intended height; it needs a decision before code can match Figma.
- *tokens*: Text on info, positive and negative borrows button tokens (interactive/primary/foreground/default, interactive/destructive/foreground/default), and neutral and warning use foreground/inverse. The export now has foreground/on-strong (always white), which covers info, positive and negative; warning still needs a mode-aware 'on' colour because its strong fill lightens in dark mode.

### Note

- *tokens/ (contrast, Light)*: White text on info, positive and warning strong fills measures 4.40, 4.47 and 4.34:1, below 4.5:1 at 12px; negative is 5.19:1. Recorded earlier and acknowledged by the owner.
- *metadata Layout vs structure*: The space/2xs gap is set but there is only one child, so it has no effect today. The metadata says it is 'held for anything placed beside the text'.
- *code (packages/web-components zds-badge-label)*: The experimental element matches the radius and colours, but uses label/small text with space/2xs x space/xs padding, so it comes to 22 tall by its tokens, matching neither 18 nor 24, and it carries a low-footprint variant Figma does not have. Align once the height question above is settled.
- *metadata*: No motion and no interaction states, by the metadata's own statement. The set has no description.
