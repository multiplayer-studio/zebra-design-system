# Tab Bar

A row of tabs for switching between views at the same level. Flavour decides whether the row fills its container or hugs its tabs. The tabs arrive through a slot, so the bar sets the arrangement and the product sets how many.

Source: [Tab Bar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237) · set [3640:2127](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3640-2127) · extracted 2026-10-28

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and measured observations suffixed `Px`.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `flavour` | enum | `full width`, `condensed` | `full width` | variant |
| `tabs` | slot | Tab Item instances | — | tab slot |

**flavour**
- `full width`: Tabs divide the row evenly. Use it where the bar owns the full width of its container.
- `condensed`: Tabs take only the width they need. Use it where the bar shares a row with other content.

**tabs** (Figma `Tab Slot`): Holds the tabs. The bar arranges them, the product decides how many.

## Internal variations & content inputs

None on the bar. Each tab is set on itself; see Tab Item below.

## Anatomy

0. **root**: horizontal row, no gap, padding or radius, cross-axis centred. Fill `surface/section`. Fixed width at full width, hugs at condensed.
1. **Tab slot**: "Where the tabs go. Flavour decides whether they fill or hug." Horizontal, no gap. Fills the root at full width, hugs at condensed.
2. **Tab item**: "Icon, label and an optional badge, carrying its own four states." One instance per tab; drawn with four, the first selected. Each fills at full width, hugs at condensed.
3. **Underline**: "A 2px bottom border on every tab, coloured only when selected." Bottom stroke, `stroke/thick`, inside, `border/transparent` until selected, then `interactive/primary/border/default`.

## Variants

| flavour | root | tab slot | tab | root widthPx (4 tabs) | tab widthPx |
|---|---|---|---|---|---|
| full width | fixed | fill | fill | 708 | 177 |
| condensed | hug | hug | hug | 472 | 118 |

Widths are measured observations, not tokens.

## Subcomponents

### Tab Item (Figma name: "Navigation Rail Item", set 3635:1151)

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `state` | enum | `default`, `hover`, `selected`, `disabled` | `default` | variant |
| `selected` | boolean (variant) | | `false` | variant, true only with `selected` |
| `disabled` | boolean (variant) | | `false` | variant, true only with `disabled` |
| `showLeadingIcon` | boolean | | `true` | icon |
| `showBadge` | boolean | | `false` | badge |
| `label` | string (code only) | | "Tab Item" | label |
| `icon` | glyph (nested swap) | any glyph | `star`, rounded family | icon |

**Anatomy**
- **root**: horizontal, gap `space/sm`, padding `space/md` top and bottom, `space/gutter` each side, centred. Min height `control/lg`, radius `radius/none`. Fill `interactive/ghost/background/default`, bottom stroke `border/transparent` at `stroke/thick`, inside.
- **icon**: Icon, medium, not framed; glyph `star`. Visible when `showLeadingIcon`. Font glyph in currentColor, no colour bound on the tab.
- **label**: text style `label/medium`, colour `foreground/secondary`, hugs.
- **badge**: Notification Indicator, Size=large, value 99+. Visible when `showBadge`.

**Variants (state)**

| state | root fill | root stroke | label colour |
|---|---|---|---|
| default | `interactive/ghost/background/default` | `border/transparent` | `foreground/secondary` |
| hover | `interactive/ghost/background/hover` | — | — |
| selected | `interactive/ghost/background/focused` | `interactive/primary/border/default` | `interactive/neutral/foreground/default` |
| disabled | — | — | `interactive/neutral/foreground/disabled` |

**Dependencies**: Icon (library, key a469ac1c…), Notification Indicator ([spec](../notification-indicator/notification-indicator.spec.md)).

## Tokens & theming

- **Colour**: `surface/section`, `interactive/ghost/background/default`, `interactive/ghost/background/hover`, `interactive/ghost/background/focused`, `border/transparent`, `interactive/primary/border/default`, `foreground/secondary`, `interactive/neutral/foreground/default`, `interactive/neutral/foreground/disabled`
- **Dimension**: `control/lg`, `space/sm`, `space/md`, `space/gutter`, `radius/none`, `stroke/thick`
- **Typography**: `label/medium`
- **Theme axes**: palette (Light, Dark); size (Desktop, Mobile, Tablet, Desktop Compact)

All resolve in `tokens/`. The badge's tokens are in the Notification Indicator spec.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | Ghost surface, label at foreground/secondary, underline transparent. |
| hover | Pointer over the tab | — | The surface moves to its hover token. Label and underline hold. |
| selected | Tab chosen | — | The underline takes interactive/primary/border/default and the label darkens. |
| disabled | — | — | The label drops to its disabled token. The surface does not move, so the label carries it alone. |

- **Motion**: No transition is defined. Selection is a swap of the underline and label colours.
- **Selection model**: Exactly one tab is selected. Nothing in the component enforces that, so the surrounding structure has to.
- **Flavour and width**: full width divides the row, condensed hugs. Switching changes how tabs size, never how many there are.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Tab Slot | slot, product filled | Takes the tabs. Four is what it is drawn with, not a limit it enforces. |
| Tab item | nested, four states | Each tab carries its own state, icon toggle and badge toggle. The bar exposes none of them, so every tab is set on itself. |
| Tab label | not parameterised | Not exposed as an input, so the words come from the implementation. |
| Tab badge | nested, off by default | A notification dot on the tab, hidden until Show Badge turns it on. |

## Usage

**Do**
- Keep one tab selected at all times. A bar with none says nothing about where a person is.
- Use condensed where the bar shares a row. full width divides whatever container it is given, however wide.

**Don't**
- Don't use tabs for actions. Tabs switch between views, and one that does something is a button in the wrong clothes.
- Don't disable a tab that has content behind it. A view a person cannot reach needs explaining, not hiding.

## Accessibility

- Tab labels are not exposed as inputs, so whatever names each tab comes from the implementation and has to be real words.
- Selection is carried by an underline colour and a label colour, both colour alone. The selected tab has to be marked in the structure as well.
- Disabled changes the label colour and nothing else. The surface holds, so check the label still carries enough contrast to read.
- Arrow keys should move between tabs with the selected one as the tab stop. Nothing in the component provides that.
- The badge is a dot with no text. Where it stands for a count or an alert, that has to be available to a reader some other way.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Per Flavour | 48 tall. 708 and fixed at full width, hugging to 472 at condensed with four tabs. |
| Surface | Fixed | surface/section across the row, with no padding, gap or radius of its own. |
| Tab slot | Per Flavour | Tabs fill the row at full width, 177 each with four. At condensed they hug, 118 each. |
| Tab item | Fixed | 48 tall, space/md top and bottom, space/gutter each side, space/sm between icon and label. |
| Selection underline | Theming | A 2px bottom border on every tab, border/transparent until selected and interactive/primary/border/default after. The space is always held, so selecting shifts nothing. |
| Tab label | Theming | label/medium. foreground/secondary at rest, interactive/neutral/foreground/default selected, and the disabled token when off. |

## Visual reference

- Flavour: [full width](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3640-2025) · [condensed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3689-2295)
- Tab state: [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3635-1150) · [hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3635-1149) · [selected](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3635-1148) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3635-1147)

## Issues

**Warn**
- The tab item set is named Navigation Rail Item and clashes with the real Navigation Rail Item (3453:54230); rename it Tab Item.
- State, Disabled and Selected are three variant axes that only form four combinations; State alone carries them.
- The metadata calls the badge a dot, but the tab uses Notification Indicator Size=large with a 99+ count.
- The default variant uses a remote Icon instance (3629:677) while the other variants use the local Icon (2046:15010).
- No focus state is drawn, though the metadata asks for arrow-key movement between tabs.

**Note**
- Selected binds interactive/ghost/background/focused at paint opacity 0, so it paints nothing.
- The tab label is not a Figma text property; the metadata says it comes from the implementation.
- The placeholder glyph is star in the rounded family and exists in codepoints.json.
- No icon colour is bound on the tab; as a font glyph it follows the label colour.
- Motion is intentionally none, per the metadata.
- Neither set has a Figma component description.
