# Label

Names a category on an item in a word or two. Variant carries the standing of that category, and Bold and Outlined decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never responds, which is the line between it and Chip.

Source: [Badges page](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=6404-328) · component set `6404:328` · extracted 2026-10-22 · 30 variants · default `Variant=neutral, Shape=rounded, Bold=true, Outlined=false`

> **No blockers, 2 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `label` | string | | `Label` |
| `variant` | enum | `neutral`, `info`, `positive`, `warning`, `negative` | `neutral` |
| `shape` | enum | `rounded`, `sharp` | `rounded` |
| `bold` | boolean | | `true` |
| `outlined` | boolean | applies only when `bold` is false | `false` |

**label**: The category name, in one or two words.

**variant**
- `neutral`: Use for a category with no standing, such as a type or a topic.
- `info`: Use for a category that informs and asks for no action.
- `positive`: Use for a category that marks a finished or successful outcome.
- `warning`: Use for a category that needs attention but has not failed.
- `negative`: Use for a category that has failed or is blocking.

**shape**
- `rounded`: Use by default, and wherever the surrounding components have rounded corners.
- `sharp`: Use on square-cornered surfaces such as table cells. Never mix both shapes in one view.

**bold**
- `true`: Solid fill with light text, the strongest form, for a label that must be spotted at a glance. Keep Outlined false, because Bold and Outlined together is not built.
- `false`: Tinted fill with dark text, for a label that supports the item rather than leads it. Pair with Outlined to choose between the edged and the plain form.

**outlined**
- `false`: No visible border. With Bold false this is the quietest form, for surfaces that already set the label apart.
- `true`: Adds a 1px border to the tinted fill, for a label that must stay findable without dominating. Use only with Bold false.

### Emphasis forms

Bold and Outlined combine into three forms, not four. Bold=true with Outlined=true is not built; in code bold wins and outlined is ignored.

| Form | bold | outlined | Fill | Stroke | Label | measuredHeightPx |
|---|---|---|---|---|---|---|
| bold | true | false | strong, per variant | same token as the fill, stroke/thin, inside and in layout | knocked out, per variant | 26 |
| outlined | false | true | subtle, per variant | per variant, stroke/thin, centred on the edge | foreground/primary | 24 |
| plain | false | false | subtle, per variant | per variant at stroke/base (zero weight), a theming hook | foreground/primary | 24 |

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `root` | container | Fill: A background per Variant, solid on the bold form and a tint on the other two. Border: Visible only on the outlined form. The same bound stroke sits on the plain form at zero weight, held as a theming hook. · radius: radius/element-sm (rounded) · radius/none (sharp) · layout: horizontal; gap space/3xs; padding space/2xs · stroke: stroke/thin (bold, outlined) · stroke/base (plain) |
| `label` | text | The category name, set through Label. It decides the width of the whole component. · text: style body/xsmall; colour per variant on bold, foreground/primary otherwise |

## Variants

Cells are token names. Shape changes only the radius.

### Bold form (Bold=true, Outlined=false)

| variant | fill + stroke | label.fill | figmaNode |
|---|---|---|---|
| neutral | foreground/secondary | foreground/inverse | 6404:308 |
| info | feedback/info/background/strong | interactive/primary/foreground/default | 6404:312 |
| positive | feedback/success/background/strong | interactive/primary/foreground/default | 6404:316 |
| warning | feedback/warning/background/strong | foreground/inverse | 6404:320 |
| negative | feedback/error/background/strong | interactive/destructive/foreground/default | 6404:324 |

### Outlined and plain forms (Bold=false)

Outlined decides whether the stroke shows. Everything else is shared.

| variant | fill | stroke | label.fill | figmaNode (outlined / plain) |
|---|---|---|---|---|
| neutral | surface/subtle | border/strong | foreground/primary | 7046:912 / 7046:933 |
| info | feedback/info/background/subtle | feedback/info/background/strong | foreground/primary | 7046:916 / 7046:937 |
| positive | feedback/success/background/subtle | border/success | foreground/primary | 7046:920 / 7046:941 |
| warning | feedback/warning/background/subtle | border/warning | foreground/primary | 7046:924 / 7046:945 |
| negative | feedback/error/background/subtle | border/error | foreground/primary | 7046:928 / 7046:949 |

### shape

| shape | radius | figmaNode |
|---|---|---|
| rounded | radius/element-sm | |
| sharp | radius/none | 6404:310 |

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `foreground/{secondary,inverse,primary}`, `feedback/{info,success,warning,error}/background/{strong,subtle}`, `surface/subtle`, `border/{strong,success,warning,error}`, `interactive/primary/foreground/default`, `interactive/destructive/foreground/default`
- **Dimension:** `space/{xxs,2xs}`, `radius/{element-sm,none}`, `stroke/{thin,base}`
- **Typography:** `body/xsmall`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export (surface/subtle added on 2026-10-22).

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states. Nothing answers hover, focus or press, because it names a category rather than offering one. |
| Variant and emphasis | Variant, Bold or Outlined | Fill, border and text colour move together. Variant chooses the colour family and the two emphasis properties decide how much of it shows. |

- **Motion:** No transition is defined. A variant change is a swap of fill, border and text colour.
- **Read only:** A badge reports and never responds. There is nothing to press, no selected form and no interaction states, which is the line between this and Chip. Where a category can be chosen, removed or filtered by, that is Chip's job rather than this one's.
- **Emphasis model:** Bold and Outlined give three forms rather than four. Bold alone is the solid one, Outlined alone is the edged one, neither gives the quiet tint, and the two together are not built.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Consumer owned, set through Label. It hugs, so the text decides the width of the whole component. |

## Usage

**Do**
- Keep it to one or two words. The component hugs its text at 12px, so a phrase becomes a wide bar in a narrow column.
- Pick one emphasis and hold it down a column. Mixing solid and tinted labels in one list reads as two kinds of thing rather than one scale.

**Don't**
- Don't use a label where a person can act on the category. Choosing, removing and filtering belong to Chip, and a label that looks pressable but is not is worse than either.
- Don't lean on the colour to carry the category. At 12px the word is doing the work and the colour is reinforcement.

## Accessibility

- The label text is the accessible name and the only thing that names the category. The fill reinforces it and never replaces it.
- It is not focusable and not a control. Nothing about it should suggest otherwise, because a person who tries to press it gets no answer.
- The bold form knocks 12px text out of a strong fill. Check contrast per variant, because the pairing differs between them rather than following one rule.
- The plain form carries no visible edge, so on a tinted surface it can lose its boundary. The zero weight border is the hook that gives it one in a high contrast set.
- neutral and the four feedback variants are separated by colour alone. A reader who cannot tell them apart relies entirely on the word inside.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | 24 tall on the outlined and plain forms and 26 on bold, the difference being a 1px stroke drawn inside the box rather than centred on its edge. The width hugs the text in every form. |
| Padding and gap | Fixed | space/2xs on all four sides, with a space/3xs gap held for anything placed beside the text. |
| Radius | Per Shape | radius/element-sm when rounded and radius/none when sharp. Softer than a pill, so it reads as a block of text rather than as a token. |
| Fill | Per Variant and emphasis | bold takes feedback/info, success, warning or error at background/strong, with neutral on foreground/secondary. The other two forms take the matching background/subtle, with neutral on surface/subtle. |
| Border | Per emphasis | outlined draws a 1px stroke centred on the edge, border/strong for neutral and the matching border token otherwise. The plain form carries that same bound stroke at zero weight, which is a theming hook rather than an absent border, so a high contrast set can give every label an edge. bold's stroke matches its own fill. |
| Label | Theming | body/xsmall in every form. bold knocks the text out of its fill, foreground/inverse on neutral and the matching foreground token elsewhere, while the other two hold foreground/primary. |

## Visual reference

- [Page](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=3717-5570) · [Component set](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=6404-328) · [Metadata](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=6413-565)
- [bold, neutral](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=6404-308) · [outlined, info](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=7046-916) · [plain, warning](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=7046-945) · [bold, neutral, sharp](https://www.figma.com/design/ygOr6iyTBCNEMI62lqKDp1/Message-prompt?node-id=6404-310)

## Issues

### Warn

- *metadata Layout vs structure (outlined border)*: The metadata says outlined takes "the matching border token" for the four feedback variants. positive, warning and negative do, but info strokes with feedback/info/background/strong, not border/info. The plain form's zero-weight stroke carries the same token. Code follows Figma.
- *metadata Layout vs structure (bold text)*: The metadata says bold text is "foreground/inverse on neutral and the matching foreground token elsewhere". As built, info and positive take interactive/primary/foreground/default, negative takes interactive/destructive/foreground/default and warning takes foreground/inverse. foreground/on-strong would cover info, positive and negative; warning needs a mode-aware "on" colour. Code follows Figma.

### Note

- *tokens/ (export)*: surface/subtle was missing from tokens/. Added on 2026-10-22 as `{palette.fill.sunken}`, matching Figma's VariableID:6680:11902, and the CSS layer regenerated.
- *api (emphasis)*: Bold=true with Outlined=true is not built. In code Bold wins and Outlined has no effect while Bold is true.
- *tokens/ (contrast, Light)*: White text on info, positive and warning strong fills measures 4.40, 4.47 and 4.34:1, below 4.5:1 at 12px; negative is 5.19:1. Bold form only. Acknowledged by the owner.
- *metadata Layout vs structure*: The space/3xs gap has only one child, so it has no effect today. The metadata says it is "held for anything placed beside the text".
- *metadata*: Positive and negative are the design names; the tokens are success and error. No motion and no interaction states. The set has no description.
