# Input Chip

Represents a person, entity or value someone has entered or picked, such as a recipient on a message, so it can be reviewed and removed without retyping. It belongs inside input and selection fields. Reach for a filter chip to narrow content, or an assist chip to offer an action.

Source: [Chip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5122-2783) · component set `5125:3467` · extracted 2026-10-26 · 8 variants · default `State=default, disabled=false, Rounded=true, Size=medium`

> **No blockers, 6 warnings.** See [Issues](#issues). One of three chips on the Chip page; each has its own board and metadata frame, so each has its own spec (see also [filter-chip](../filter-chip/filter-chip.spec.md), [assist-chip](../assist-chip/assist-chip.spec.md)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | | `Label` | label |
| `showAvatar` | boolean | true, false | `true` | avatar |
| `state` | enum (interaction) | `default`, `hover`, `focus` | `default` | root |
| `disabled` | boolean | true, false | `false` | root, label |
| `rounded` | boolean | true, false | `true` | root |
| `size` | enum | `medium` | `medium` | root |

**label**: "The value the chip stands for, usually a name or a term someone entered. Keep it to the entity itself. A chip that needs explaining is carrying a sentence that belongs in the field's helper text."

**showAvatar**: true: "Show a face or initials when the value is a person, which is what makes a row of recipients scannable. Leave it on only when every chip in the field can supply one, because a mix of some with and some without reads as broken alignment." · false: "For values that are not people, such as a tag or a typed term. The chip closes up around the label and the remove control."

**state**: default: "The resting chip, and where placed instances should stay. This axis records the interaction treatment rather than driving it." · hover: "Pointer over the chip. Setting it by hand pins the chip into a hovered look that never clears." · focus: "Keyboard focus. The one state a keyboard user depends on, so check it survives whatever surface the field sits on." In code it comes from pointer and focus, not from a prop.

**disabled**: false: "The usual case." · true: "The value is fixed. Pair it with an explanation nearby, because the remove control stays visible and a control that looks available but will not respond reads as broken rather than locked."

**size**: Figma has a Size axis with one value, `medium`. The metadata does not describe it (see issues).

**rounded**: true: "Match the contour of the field the chips sit in rather than deciding per chip." · false: "The square-cornered pairing, for forms built from sharp controls."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

None on the chip itself. The avatar's photo or initials are the nested [Avatar](../avatar/avatar.spec.md)'s own content input.

## Anatomy

1. **Chip (root)**: "The component frame. A horizontal auto-layout that hugs its content at a fixed height, carrying the fill and the border." Horizontal, gap `space/sm`, padding `space/xxs` top/bottom and `space/sm` left/right, cross-axis centred. Width hugs, height `control/target-min`. Radius `radius/pill` (rounded) or `radius/none`. Fill `interactive/ghost/background/default`; border `interactive/neutral/border/default` at `stroke/thin`, inside.
2. **Avatar**: "The optional leading identity, present when Show Avatar is on." [Avatar](../avatar/avatar.spec.md) pinned to `size=xxxsmall`, `showStatus`, `showRing` and `showClose` all false (24Px measured). Visible when `showAvatar`.
3. **Label**: text `label/medium`, colour `interactive/neutral/foreground/default`, hugs. Content from `label`.
4. **Remove control**: "The trailing close icon. Always present, with no property to hide it." Glyph `close` (rounded family), Icon Size=small pinned by the chip (16Px). Colour is `currentColor`.

## Variants

8 of 12 combinations built: `disabled=true` exists only with `state=default`. Height is `control/target-min` throughout.

| state | disabled | root fill | root border | label colour | width (measured) | node |
|---|---|---|---|---|---|---|
| default | false | interactive/ghost/background/default | interactive/neutral/border/default @ stroke/thin, inside | interactive/neutral/foreground/default | 109Px | `5125:3466` |
| hover | false | interactive/ghost/background/hover | interactive/neutral/border/default @ stroke/thin, inside | interactive/neutral/foreground/default | 109Px | `5125:3468` |
| focus | false | interactive/ghost/background/focused | focus/outline @ stroke/thick, outside | interactive/neutral/foreground/default | 107Px | `5125:3494` |
| default | true | interactive/neutral/background/disabled | none | interactive/neutral/foreground/disabled | 107Px | `5125:3481` |

| rounded | radius |
|---|---|
| true | radius/pill |
| false | radius/none |

## Subcomponents

No on-page private subcomponents. Library dependencies in the same file:
- **Avatar** (`4906:1172`), see [specs/avatar](../avatar/avatar.spec.md).
- **Icon** (`2046:15010`), see [specs/icon](../icon/icon.spec.md); glyph `close`.

## Tokens & theming

- **Colour:** interactive/ghost/background/default, interactive/ghost/background/hover, interactive/ghost/background/focused, interactive/neutral/background/disabled, interactive/neutral/border/default, interactive/neutral/foreground/default, interactive/neutral/foreground/disabled, focus/outline
- **Dimension:** control/target-min, space/none, space/xxs, space/sm, radius/pill, radius/none, stroke/thin, stroke/thick
- **Typography:** label/medium
- **Glyphs:** close

Theme axes (from tokens/manifest.json): palette Light / Dark; size Desktop / Mobile / Tablet / Desktop Compact; typography Desktop / Tablet / Mobile / Desktop Compact. Extensions: companion (palette), target (primitives, palette), condensed (typography, size). All names resolve in `tokens/base`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | Background interactive/ghost/background/default with a 1px inside border in interactive/neutral/border/default. |
| hover | Pointer over the chip | — | Background moves to interactive/ghost/background/hover. Border, label and both icons are unchanged. |
| focus | Keyboard focus | — | Background moves to interactive/ghost/background/focused and the border is replaced by a 2px focus/outline drawn outside the chip, so nothing reflows. |
| disabled | disabled set to true | — | Background becomes interactive/neutral/background/disabled, the label drops to interactive/neutral/foreground/disabled, and the border is removed entirely. |

- **Motion:** "Figma stores no timing and no transition is authored. Every state change is a flat swap of fill, border or text colour."
- **Removal:** "The remove control is always present and the set models no removed state. What activating it does, and whether the value can be restored, belongs to the implementation."
- **Coverage:** "Eight of the twelve possible combinations are built. disabled appears only alongside State=default, so there is no disabled hover or disabled focus to point at."

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. The only text the chip takes. |
| Avatar | nested instance, toggled by Show Avatar | An Avatar at Size=xxxsmall with its own Status, Ring and Close all switched off, so only the face or initials shows. Its visibility is the one child property the chip surfaces. |
| Remove control | fixed nested Icon | An Icon at Size=small swapped to Close. There is no property to hide it, so every input chip shows a remove affordance whether or not the value can be removed. |

## Usage

**Do**
- Use one chip per value, inside the field the value was entered in. A row of chips is how someone checks what they have picked.
- Turn Show Avatar off for values that are not people. A placeholder face on a tag is worse than no face at all.

**Don't**
- Don't use an input chip to filter a list. That is a filter chip, and the remove icon here promises deletion rather than toggling.
- Don't leave a chip disabled without saying why nearby. The remove control stays visible, so it reads as broken rather than locked.

## Accessibility

- The remove control is an icon with no text. It needs an accessible name that includes the value it removes, not just Remove.
- Focus is the only state with a visible outline and it is drawn outside the chip. Check it is not clipped by the field around it.
- Removing a chip changes what the field contains. That change has to be announced, or a keyboard user loses track of what is left.
- Disabled chips drop the border entirely and rely on fill and text colour alone. Check both against the field background.
- The label uses label/medium at 14px and carries the actual value, so it should not be reduced further.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | "40 tall across all eight variants. Width hugs the avatar, label and remove control." |
| Padding and gap | Fixed | "space/xs top and bottom, space/sm left and right, with a space/sm gap between the three parts." |
| Radius | Per Rounded | "radius/pill when true and radius/none when false, bound on all four corners." |
| Fill | Theming | "interactive/ghost/background at default, hover and focused. disabled uses interactive/neutral/background/disabled." |
| Border | Per state | "1px inside interactive/neutral/border/default at rest and on hover. Focus replaces it with 2px focus/outline drawn outside. Disabled carries no border." |
| Label | Theming | "label/medium, IBM Plex Sans Medium 14 over a 20px line, in interactive/neutral/foreground/default and dropping to the disabled token." |
| Child sizes | Fixed | "Avatar 24 square, remove icon 16 square." |

Visual reference: [component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3467) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5689-234) · [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3494) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3481)

## Issues

**Warn**
- **Size has one value and no intent.** Figma added a Size axis with only `medium`. The metadata does not mention it. Keep the prop for later sizes, or leave it out until a second size exists.
- **Padding quote is stale.** Metadata says space/xs top and bottom. The binding is `space/xxs`, the old 4px space/xs after the rename.
- **Hover is effectively invisible.** The ghost fills carry a paint opacity on top of the token (0 at default/focus, 0.05 at hover). `interactive/ghost/background/hover` is already a 5% alpha colour, so hover renders at about 0.25%. Build with the token alone and confirm with design.
- **Focus does reflow.** The 1px inside border is included in layout at rest and the 2px outside focus border is not, so the chip narrows by 2px at focus and disabled (109 → 107 measured) and content shifts 1px, contrary to the metadata's "nothing reflows". In code keep borders out of layout.
- **Stale token description.** `control/target-min` says "= 44px" but resolves to 40px.
- **Remove control has no API.** No handler, no accessible name, no way to hide it for fixed values; it shows even when disabled. Decide in code.

**Note**
- Stroke-weight bindings are absent in the disabled variants only because the stroke is removed.
- `state` is a Figma variant; in code hover and focus come from interaction.
- No disabled hover/focus, removed or pressed state; no motion.
- The Avatar spec's Show Close mentions "a multi-select chip list"; inside a chip use this chip's remove control, not the Avatar's close badge.
- A stray remote Notification Indicator instance (`5122:2980`) sits loose on the page outside every board.
