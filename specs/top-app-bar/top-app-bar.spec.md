# Top App Bar

The header at the top of a mobile screen, carrying the screen’s name between a leading control and whatever actions the screen needs. Type switches it between six arrangements: a standard title row, a centred title, two selection toolbars, a full width search field, and a taller layout that drops the title onto its own line. Each arrangement brings its own leading control and its own content, so changing Type replaces what the bar holds rather than rearranging it.

Source: [Top App Bar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217) · component set `3116:1217` · extracted 2026-10-31 · 12 variants · default `Type=default, Shape=sharp`

> **No blockers, 6 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `type` | enum | `default`, `centered`, `contextual`, `contextual alt`, `search`, `extended` | `default` |
| `shape` | enum | `sharp`, `rounded` | `sharp` |
| `pageTitle` | string | | `Title` |
| `contextualControlSlot` | slot | | |
| `trailingSlot` | slot | | |

**type**
- `default`: Use for an ordinary screen that needs a title and a few actions. It is the only arrangement that carries an avatar beside the title.
- `centered`: Use where the title should read as the screen’s name rather than a label beside controls. It allows one trailing control, so a screen needing several will not fit.
- `contextual`: Use while items are selected and the bar becomes a toolbar for them. Its count is fixed content, so it does not report the real selection.
- `contextual alt`: Use for the same selection toolbar where the count needs to be settable. The count sits inside a button, so it reads as something to press.
- `search`: Use when search takes over the whole bar. It drops the title and every action but the back control, so nothing else is reachable while searching.
- `extended`: Use where the title needs a line of its own below the controls. It is taller than the other five, so a layout assuming one bar height will shift.

**shape**
- `sharp`: Use where the bar meets the screen edges and reads as part of the chrome.
- `rounded`: Use where the bar sits inside a padded surface. It rounds the bar’s own corner only, and the controls inside keep the shape they already have.

**pageTitle**: Names the screen. It is read by default, centered and extended only, so setting it on the other three changes nothing. *(shown when type is default, centered or extended)*

**contextualControlSlot**: Takes the actions offered while items are selected. It exists on contextual and contextual alt, and nowhere else. *(shown when type is contextual or contextual alt)*

**trailingSlot**: Takes the trailing actions on an ordinary screen. It exists on default and extended, and nowhere else. *(shown when type is default or extended)*

## Internal variations & content inputs

- **leadingControl**: The glyph is decided by Type and is not exposed.
- **centered trailing**: centered holds one fixed Icon Button rather than a slot.
- **count** (`count`): Sample text 2 Items on contextual and contextual alt.
- **avatar** (`src`): Sample photo on default.
- **search** (`value`): Sample text on search.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `bar` | container | The surface itself, holding one content row padded on every side. extended adds a second row beneath it. · layout: direction vertical; gap space/sm; padding space/md by space/sm · sizing: width fill; height hug · paint: fill surface/section |
| `leadingControl` | instance | An icon button at the start of the bar. Which glyph it carries is decided by Type, not passed in. · ref: Icon Button · refVariant: Size=small, Shape=rounded, Flavour=subtle · note: Glyph per type, see the variants table. |
| `title` | text | The screen’s name. It is present on default, centered and extended, and centered sets it a step smaller than the other two. · content: pageTitle · visibleWhen: type is default, centered or extended · text: style per type; color foreground/primary, see issues |
| `trailingRegion` | container | Either a slot, a single fixed control, or nothing at all, depending on Type. · layout: direction horizontal; gap space/none; align center · sizing: hug |
| `secondRow` | container | extended only. The title moves off the control row onto a line of its own, which is what makes that arrangement taller. · visibleWhen: type == extended · layout: direction horizontal; gap space/sm; padding space/sm left and right; align center · sizing: width fill |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### type

| type | leading.glyph | middle | title.style | trailing | measuredHeightPx | figmaNode | bar.gap |
|---|---|---|---|---|---|---|---|
| default | hamburger-menu | avatar and title | label/large | trailingSlot | 60 | 3112:1215 | |
| centered | hamburger-menu | centred title | label/medium | one Icon Button, glyph user-circle | 60 | 3116:1218 | |
| contextual | close | count as text | none, count is label/medium | contextualControlSlot | 60 | 3116:1601 | |
| contextual alt | close, on a Button with the count as its label | count inside the Button, small and subtle | none | contextualControlSlot | 60 | 3116:1696 | |
| search | arrow-back | Search, small and ghost, fills the row, gap space/md | none | none | 60 | 3116:1723 | |
| extended | hamburger-menu | none, title on the second row | label/large | trailingSlot | 100 | 3116:1953 | space/lg |

### shape

| shape | bar.radius |
|---|---|
| sharp | none, no token bound |
| rounded | radius/element-sm |

## Dependencies

- **Icon Button** (`2338:1763`): leading control and slot defaults, small, rounded and subtle
- **Button** (`2060:15072`): count on contextual alt, small, rounded and subtle, leading icon on
- **Search** (`2152:8811`): search field, small, rounded and ghost
- **Avatar** (`2699:17793`): default only, xxxsmall

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `surface/section`, `foreground/primary`, `interactive/neutral/foreground/default`
- **Dimension:** `space/{none,sm,md,lg}`, `radius/element-sm`, `control/sm`
- **Typography:** `label/large`, `label/medium`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The bar has no interaction states. Hover, focus and press belong to the controls placed inside it. |
| Type | The Type value | Each value replaces the bar’s contents rather than repositioning them. The leading control, the title treatment and which slot exists all change together. |
| Shape | The Shape value | The bar’s own corner, and nothing else. The controls inside hold the shape they were given either way. |
| Leading control | The Type value | A hamburger on default, centered and extended. A close on contextual and contextual alt. A back arrow on search. |
| Title treatment | The Type value | default and extended set the title a step larger than centered. contextual shows a fixed count in its place, and contextual alt shows that count inside a button. |

- **Motion:** No transition is defined. Changing Type replaces the bar’s contents outright, and nothing animates between one arrangement and the next.
- **Type is a content switch:** Type does not rearrange one set of parts. Each value brings its own leading control, its own middle content and its own slot, so moving between values is a replacement rather than a reflow.
- **Shape does not carry:** Shape sets the bar’s corner on its own. The nested controls are rounded in both values, so a sharp bar still contains rounded controls.
- **Height:** Five arrangements stand at one height. extended is taller because it puts the title on a second row beneath the controls.
- **Slot availability:** The two slots are never both present. Each Type offers at most one of them, and centered and search offer neither.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Screen title | Page Title, text | Consumer owned on default, centered and extended. The other three arrangements draw no title, so the property has nowhere to land. |
| Trailing actions | Trailing Slot, consumer owned | Present on default and extended. The content in it by default is three icon buttons set to small and subtle. |
| Contextual actions | Contextual Control Slot, consumer owned | Present on contextual and contextual alt. The content in it by default is four icon buttons set to small and subtle. |
| Centered trailing | Parent owned | centered holds a single icon button rather than a slot, so its trailing action is fixed rather than passed in. |
| Leading control | Icon Button, parent owned | Set to small and subtle on every arrangement. Its glyph is decided by Type and is not exposed as an input. |
| Avatar | Parent owned | default carries a small photo avatar beside the title. It is not exposed as an input, and no other arrangement has one. |
| Selection count | Parent owned | contextual draws a fixed count as plain text. contextual alt puts the same count inside a button, where it is that button’s own label. |
| Search field | Search, parent owned | Set to small and ghost, and carried already in its typing state with text and a cursor in place. |

## Usage

**Do**
- Pick Type for what the screen is doing. Each value is a different arrangement with its own content, not a styling choice applied to one layout.
- Keep Page Title to the screen's name. It is the bar's only text input, and it reads as the screen's identity rather than as a label.

**Don't**
- Don't set Page Title on contextual, contextual alt or search. Those arrangements draw no title, so the text has nowhere to appear.
- Don't expect Shape to reshape the controls. It sets the bar's own corner, and the icon buttons inside stay rounded either way.

## Accessibility

- The bar is a landmark rather than a control, so it takes its role and its name from the screen around it.
- Every control in it carries a glyph and no visible label, so the leading control and each trailing action need an accessible name supplied where they are placed, and that name has to follow Type, since the same leading position is a menu, a dismiss and a back control depending on the arrangement.
- The title is the screen’s name and should match whatever the screen is announced as, so a person arriving by screen reader hears the same thing a sighted person reads.
- On the selection arrangements the count is the only report of how many items are held, so it needs to be announced when it changes rather than only drawn.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 390 wide on every variant. 60 tall on five arrangements and 100 on extended, which carries a second row. |
| Direction | Column | A content row, with extended adding a title row beneath it. space/sm between rows, and space/lg on extended. |
| Padding | Tokenised | space/md above and below, space/sm on both sides. |
| Content row | Fill | Spreads its leading group and its trailing region to opposite ends. search instead lays its two parts out from the start, space/md apart. |
| Leading group | Fill | space/md between the leading control and whatever follows it. |
| Leading control | Set to small | An icon button set to small and subtle on every arrangement. |
| Trailing region | Hug | Hugs its content on default, extended, contextual and contextual alt. centered instead holds one control that fills the row height. |
| Search field | Set to small | Fills the width left beside the back control, set to small and ghost. |
| Surface | Tokenised | surface/section across every arrangement. |
| Radius | Per Shape | radius/element-sm on rounded. sharp carries a plain zero corner with no token bound to it. |
| Title | Per Type | label/large on default and extended, label/medium on centered. The title colour is set directly rather than bound to a token. |
| Selection count | Per Type | label/medium on contextual, also set directly rather than bound. On contextual alt it comes from the button and takes interactive/neutral/foreground/default. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3108-191) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7638-227)
- [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3112-1215) · [centered](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1218) · [contextual](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1601) · [contextual alt](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1696) · [search](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1723) · [extended](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1953) · [rounded](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3181-12299)

## Issues

### Warn

- *structure (gaps)*: The title and the count use a raw black, not a token, so they would not follow dark mode. Code uses foreground/primary.
- *internalVariations*: The selection count is fixed text in Figma, but the accessibility section needs it to report the real count. Code must make it an input.
- *internalVariations*: The leading control's action, the avatar and the search field are not exposed in Figma, but a working bar needs all three.
- *metadata vs structure*: The metadata puts space/md after the leading control on every arrangement, but contextual binds space/none, so the count touches it.
- *dependency*: Avatar is an instance of the older set 2699:17793, not the current Avatar 4906:1172.
- *structure vs metadata*: Search is drawn in its typing state with sample text, which is a Figma picture. Code should open it empty.

### Note

- *structure*: Figma draws a fixed 390 wide bar. It needs to fill its container in code.
- *metadata*: Shape reaches the bar's corner only, and nested controls stay rounded in both values.
- *metadata*: No motion is defined, by the metadata's own statement.
