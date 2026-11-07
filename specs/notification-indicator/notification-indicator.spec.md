# Notification Indicator

Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether that count is shown at all, with small reducing to a plain dot that says only that something is new. It carries one fixed colour, so it reports how many and never what kind.

Source: [Badges page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6256) · component set `3719:6256` · extracted 2026-10-31 · 3 variants · default `Size=large`

> **No blockers, 2 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `value` | string | | `2` |
| `size` | enum | `small`, `medium`, `large` | `large` |

**value**: The count shown inside the indicator. Carried at large and medium, and dropped entirely at small. It holds 3 characters at most, and anything above 99 reads 99+. *(shown when size != small)*

**size**
- `large`: The widest form, for a count of up to 3 characters.
- `medium`: A fixed square holding a single digit. Use it where space is tight but the number still matters.
- `small`: A plain dot with no count. It says something is new without saying how much, so using it where the number matters loses the number silently.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `surround` | container | A fully round fill in one fixed colour, sized by Size. · radius: radius/pill · layout: direction vertical; gap space/none · paint: fill interactive/destructive/background/default; stroke {"color": "border/inverse", "width": "stroke/base", "align": "inside, included in layout"} |
| `border` | stroke | A zero weight stroke bound to border/inverse, held as a theming hook so a high contrast set can outline the indicator against what sits behind it. |
| `value` | text | The count, set through Value. Carried at large and medium and absent at small. · visibleWhen: size != small · content: value · text: style indicator/medium; color foreground/on-strong |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### size

| size | surround.size | measuredPx | padding | value | value.maxLines | surround.clips | figmaNode |
|---|---|---|---|---|---|---|---|
| small | unbound | 8 x 8 | 0 (unbound) | removed | none | yes | 3719:6259 |
| medium | unbound | 16 x 16 | space/none | shown, single digit | 1, ends truncated | yes | 3719:6257 |
| large | min width control/icon-lg, hugs the value | 28 x 20 | space/2xs left and right | shown, up to 3 characters | 3, ends truncated | no | 3719:6260 |

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `interactive/destructive/background/default`, `border/inverse`, `foreground/on-strong`
- **Dimension:** `space/{none,xxs}`, `radius/pill`, `stroke/base`, `control/icon-lg`
- **Typography:** `indicator/medium`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The component has no interaction states. It reports that something is waiting rather than offering a way to deal with it. |
| Size | The Size value | The only thing that changes is whether the count is shown. The colour holds across all three. |

- **Motion:** No transition is defined. A change in the count is a text swap.
- **Count and size:** small carries no count at all. Moving between small and the other two changes what is being said rather than only the scale, so the choice follows whether the number is worth reading.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Value | text property | Consumer owned, set through Value and shown at large and medium. large grows to 3 characters at most, and anything above 99 reads 99+. |

## Usage

**Do**
- Use small where the fact that something is new is the whole message. It is the only form that makes no claim about quantity.
- Keep the count short. large stops at 3 characters and shows 99+ above 99, and medium holds a single digit.

**Don't**
- Don't use it to mean anything other than items waiting. It has one fixed colour, so it cannot carry a second meaning alongside the first.
- Don't put a count on small. It carries no text, so the number disappears with nothing to show it went.

## Accessibility

- The indicator is colour and shape only. The count is its sole text and at small there is none, so what it refers to has to be named by whatever it is pinned to.
- A count of zero belongs with the indicator removed rather than shown as a zero. There is no empty form, so a visible zero reads as a notification about nothing.
- The zero weight border is a theming hook. A high contrast set raises it and separates the indicator from a busy background, which matters because it usually overlaps something.
- Nothing here is focusable and a change in the count does not announce itself. The structure around it has to report that the number moved.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Size | 28 by 20 at large, a 16 square at medium and an 8 dot at small. |
| Padding | Per Size | space/2xs left and right at large. medium and small carry none, because their content is centred inside a fixed square. |
| Radius | Fixed | radius/pill at all three sizes, so every form is fully round whether or not it holds a number. |
| Fill | Fixed | interactive/destructive/background/default at every size. One colour throughout, which does not vary with the count. |
| Border | Theming | A stroke bound to border/inverse sits on all three sizes at zero weight. The weight is a theming hook rather than an omission, so a high contrast set can give the indicator a hard outline where it overlaps whatever it is pinned to. |
| Value | Theming | indicator/medium in foreground/on-strong. Present at large and medium, absent at small. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3717-5570) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6256) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6413-741)
- [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6260) · [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6257) · [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6259)

## Issues

### Warn

- *structure vs metadata*: The large variant still carries a raw 3 top and bottom, but the metadata has none. It renders the same, because the height is fixed and the count is centred.
- *structure (gaps)*: The 20 height of large and the 16 and 8 squares have no size tokens.

### Note

- *structure*: Large still allows 3 lines of text, which the 3 character limit makes unnecessary.
- *structure*: The border is bound on all three sizes, but stroke/base resolves to zero. The metadata states this as a deliberate theming hook.
- *metadata*: No motion and no interaction states, by the metadata's own statement. The set has no description.
