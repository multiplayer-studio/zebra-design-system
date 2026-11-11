# Bottom Sheet

A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions without moving a person off the view behind it. Content Type picks between a run of list rows, a grid of tiles, and a slot that takes whatever the product supplies. All three carry the same drag handle, header and two action footer, so the only thing that changes between them is what sits in the middle.

Source: [Bottom Sheet page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343) · component set `5207:3343` · extracted 2026-11-01 · 3 variants · default `Content Type=list`

> **No blockers, 10 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `contentType` | enum | `list`, `grid`, `generic` | `list` |
| `contentSlot` | slot | | |
| `modal` | boolean (code only) | | `false` |
| `open` | boolean (code only) | | `false` |
| `dismissible` | boolean (code only) | | `true` |

**contentType**
- `list`: Use for a run of labelled actions a person reads down. Rows are full width, so an option needing its own artwork or count will not fit.
- `grid`: Use where options are recognised by their icon rather than read, three to a row. Labels sit beneath the icon and stay short, so a long one wraps and lengthens the whole row.
- `generic`: Use when neither arrangement fits and the content is yours to supply. Nothing is laid out for you beyond the padding, so spacing between items becomes your responsibility.

**modal**: When true, the sheet presents itself at the bottom of the viewport over the Scrim component, traps focus and closes on Escape or a scrim click. When false, it only draws its surface.

**open**: Shows or hides a modal sheet.

**dismissible**: When false, Escape and a scrim click no longer close a modal sheet.

**contentSlot**: Takes the sheet’s content on generic. It is the only arrangement with a slot, so filling it has no effect on list or grid. *(shown when contentType == generic)*

## Internal variations & content inputs

- **header**: Set on the nested header, and not passed in from the sheet.
- **footer**: Pinned to two actions, with the labels set on each Button.
- **tile icon** (`icon`): Sample glyph star on every tile.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `handle` | instance | The drag affordance along the top edge, centred above the header. It is the same on every arrangement. · ref: Sheet Handle |
| `header` | instance | The sheet’s title, with an optional leading Icon Button before it. The title belongs to the header rather than to the sheet. · ref: _Sheet Header · refVariant: Alignment=start |
| `contentRegion` | container | A run of rows, a grid of tiles, or a slot, depending on Content Type. It is the only part that changes between the three. · layout: direction vertical; gap per contentType; padding space/md by space/lg on list, space/md by space/gutter on grid and generic · sizing: width fill; height hug |
| `footer` | instance | Two actions closing the sheet off, an outline button beside a primary one. It is present on every arrangement. · ref: _Card Footer · refVariant: Actions=2 · note: An outline Button beside a primary Button, both small and rounded. |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### contentType

| contentType | contentRegion.gap | contentRegion.paddingInline | items | rootPaddingBottom | measuredPx | figmaNode |
|---|---|---|---|---|---|---|
| list | space/2xs | space/lg | Menu Item, default, icon type, square corners | space/card | 360 x 452 | 5207:3342 |
| grid | space/md | space/gutter | Grid Menu Item, rounded, three to a row, space/md apart | space/card | 360 x 380 | 5207:3344 |
| generic | space/md | space/gutter | contentSlot | space/card | 360 x 388 | 5224:5408 |

## Subcomponents

### Grid Menu Item

One tile of the grid arrangement inside a bottom sheet: an icon above a short label on a tappable square. State carries the ordinary pointer feedback, while Active marks the option a person is on and Disabled puts one out of reach. Bottom Sheet places it three to a row rather than a consumer using it on its own.

Set `5224:5199` · 10 variant(s) · public

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `state` | enum | `default`, `hover`, `pressed` | `default` |
| `active` | boolean | | `False` |
| `disabled` | boolean | | `False` |
| `rounded` | boolean | | `True` |
| `label` | string | | `Label` |
| `showBadge` | boolean | | `False` |

**state**
- `default`: The resting tile. Use it for every option a person is not currently touching.
- `hover`: Pointer feedback on the tile’s ground. It is the only thing that moves, so the icon and label stay as they are.
- `pressed`: The moment of the tap, a step further than hover. It reports contact rather than selection, so it does not persist.

**active**
- `false`: An ordinary tile that is not the current choice.
- `true`: Marks the option a person is on now. It recolours the icon and the label and leaves the ground untouched.

**disabled**
- `false`: A tile that can be chosen.
- `true`: Puts the option out of reach. The icon and the label mute, and the tile keeps the same ground as an available one.

**rounded**
- `true`: Use inside a sheet whose other surfaces are rounded, which is how Bottom Sheet places it.
- `false`: Squares the tile’s corners. Nothing else differs between the two.

**label**: Names the option beneath its icon. The tile holds a fixed width, so a long label wraps and makes every tile in the row taller.

**showBadge**
- `false`: Leaves the tile unmarked, which is the ordinary case.
- `true`: Adds a dot over the icon for an option needing attention. It carries no number, so it says that something is there and not how much.

#### Anatomy

| Part | Details |
|---|---|
| `tile` | The tappable square. Its ground is what answers hover and press, and its corner follows Rounded. |
| `indicator` | The icon, with the badge sitting over it when Show Badge is on. The glyph is fixed rather than chosen per tile. |
| `label` | The option’s name beneath the icon. It is the only text the tile holds, and it takes the same colour as the icon. |

Cells are token names, except those ending Px, which are measurements of the rendered file.

### state

| state | tile.fill | label.color and icon.color |
|---|---|---|
| default | interactive/ghost/background/default | foreground/primary |
| hover | interactive/ghost/background/hover | foreground/primary |
| pressed | interactive/ghost/background/pressed | foreground/primary |
| active | interactive/ghost/background/default | interactive/subtle/foreground/default |
| disabled | interactive/ghost/background/default | interactive/subtle/foreground/disabled |

#### States

| State | Trigger | What changes |
|---|---|---|
| default | State=default | interactive/ghost/background/default behind the icon, with the label in foreground/primary. |
| hover | State=hover | The ground moves to interactive/ghost/background/hover. The icon and the label are unchanged. |
| pressed | State=pressed | The ground moves to interactive/ghost/background/pressed. The icon and the label are unchanged. |
| active | Active=true | The icon and the label take interactive/subtle/foreground/default. The ground stays at its default. |
| disabled | Disabled=true | The icon and the label take interactive/subtle/foreground/disabled. The ground is unchanged. |
| Combinations | Active or Disabled with hover or pressed | Active and Disabled are each drawn at the default state, so pointer feedback and those two marks do not combine. |

#### Behavior

- **Motion:** No transition is defined. A tile changes by taking a different state, and nothing animates between one and the next.
- **Signal strength:** Active and Disabled both change the icon and label colour and nothing else. The ground reports pointer feedback alone.
- **State coverage:** State pairs with neither Active nor Disabled. Each of those two is drawn at the default state only.
- **Width:** On its own the tile is a fixed square. Bottom Sheet stretches it to fill an equal share of its row, so the drawn width is not the width a reader meets.

#### Content

| Property | Type | Description |
|---|---|---|
| Label | text property | Consumer owned, set through Label. It is the only text the tile holds. |
| Icon | Icon, parent owned | Set to large. It is not exposed as an input, so the glyph is fixed rather than chosen per tile. |
| Badge | Notification Indicator, parent owned | Set to small and shown by Show Badge. Its own colour and shape belong to Notification Indicator, and it carries no number. |

#### Usage

**Do**
- Keep labels to a word or two. The row aligns to its tallest tile, so one label that wraps lengthens every tile beside it.
- Use Show Badge for something needing attention rather than for a count. The dot carries no number of its own.

**Don't**
- Don't rely on Active to stand out by itself. It only recolours the icon and the label, so pair it with whatever else marks the current choice.
- Don't expect hover or press to show on an active or a disabled tile. Both of those are drawn at the default state only.

#### Accessibility

- Active and Disabled are both carried by colour alone, with no change of ground or shape, so neither is distinguishable to a person who cannot rely on hue.
- Both need announcing as state, and a disabled tile needs taking out of the tab order rather than only dimming.
- The icon is what a person recognises the option by and it carries no text of its own, so the label has to name the option rather than qualify it.
- The badge is a dot with no number and no label, so whatever it reports needs saying in words wherever that matters.

#### Layout & theming

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | A 92 square on its own. Inside a bottom sheet it fills an equal share of its row, which brings it to 101 at three to a row. |
| Direction | Column | Icon above label, space/sm apart, centred on both axes. |
| Padding | Tokenised | space/lg on all four sides. |
| Radius | Per Rounded | radius/element-sm when true and radius/none when false. |
| Ground | Per State | interactive/ghost/background at default, hover and pressed. Active and Disabled leave it alone. |
| Label | Per Active and Disabled | label/medium in foreground/primary normally, interactive/subtle/foreground/default when Active, and interactive/subtle/foreground/disabled when Disabled. |
| Icon | Set to large | The glyph above the label. It takes the same colour as the label. |
| Badge | Set to small | Sits over the icon when Show Badge is on, within the same block the icon occupies. |

### _Sheet Header

Set `5207:2710` · 2 variant(s) · private

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `headerText` | string | | `Sheet Title` |
| `showLeadingIcon` | boolean | | `True` |
| `alignment` | enum | `start`, `center` | `start` |
| `leadingLabel` *(code only)* | string | | `Back` |

#### Anatomy

| Part | Details |
|---|---|
| `root` | · layout: direction horizontal; gap per alignment; padding per alignment; align center |
| `leadingButton` | · ref: Icon Button · refVariant: Size=small, Shape=rounded, Flavour=subtle · glyph: arrow-back · visibleWhen: showLeadingIcon |
| `title` | · content: headerText · text: style title/medium; color foreground/primary · sizing: fill |

Cells are token names, except those ending Px, which are measurements of the rendered file.

### alignment

| alignment | root.gap | root.padding | leadingButton.position | title |
|---|---|---|---|---|
| start | space/2xs | space/sm by space/lg | in flow, before the title | |
| center | space/gutter | space/gutter by space/lg | absolute, space/lg from the leading edge, centred vertically | centred |

### Sheet Handle

Set `5207:2714` · 1 variant(s) · public

#### Anatomy

| Part | Details |
|---|---|
| `root` | · layout: direction vertical; padding space/lg by space/section; align center · sizing: width fill |
| `bar` | · width: control/target-min · heightPx: 4 · radius: radius/pill · paint: fill border/default |

## Dependencies

- **Scrim** (`specs/scrim`): backdrop of a modal sheet, tone scrim
- **Icon Button** (`2338:1763`): header leading button, small, rounded and subtle
- **Menu Item** (`2402:6508`): list rows
- **Card Footer** (`3311:3383`): footer, Actions=2, padding space/lg, gap space/sm
- **Button** (`2060:15072`): footer actions, small and rounded, outline then primary
- **Icon** (`2046:15010`): header icon and tile icon
- **Notification Indicator** (`3719:6256`): tile badge, small

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `surface/overlay`, `border/default`, `foreground/primary`, `interactive/ghost/background/default`, `interactive/ghost/background/hover`, `interactive/ghost/background/pressed`, `interactive/subtle/foreground/default`, `interactive/subtle/foreground/disabled`
- **Dimension:** `space/{none,xxs,sm,md,lg,card,gutter,section}`, `radius/{none,element-sm,container,pill}`, `control/target-min`
- **Typography:** `title/medium`, `label/medium`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The sheet has no interaction states. Hover, press and focus belong to the rows, tiles and buttons placed inside it. |
| Content Type | The Content Type value | The region between the header and the footer is replaced outright. The handle, the header and the footer are identical across all three. |
| Row and tile states | The nested item’s own state | A list row carries the Menu Item states and a grid tile the Grid Menu Item states. Each is described in that component’s own frame. |
| Footer actions | The nested Button states | The footer holds one outline and one primary button, and their states belong to Button. |

- **Motion:** No transition is defined. Nothing in the component describes how the sheet arrives at the bottom edge or leaves it.
- **Anchoring:** Only the top two corners are rounded, which is what fixes the sheet to the bottom edge. The bottom two stay square because they sit past the edge of the screen.
- **Elevation:** No shadow and no scrim are defined on the sheet. Whatever separates it from the content behind comes from the screen that presents it.
- **Height:** The sheet hugs its content, so it stands as tall as the handle, header, content and footer make it. Nothing in the component caps that height.
- **Content ownership:** Only generic takes a slot. list and grid lay out their own items, so moving between the three replaces the content region rather than refilling it.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Content | Content Slot, consumer owned | Live on generic only. It takes whatever the product supplies, with the sheet providing the padding around it and the spacing between items. |
| List items | Menu Item, parent owned | list lays out a run of menu rows, each set to its default state with an icon type and square corners. Menu Item is documented on the Dropdown page. |
| Grid tiles | Grid Menu Item, parent owned | grid lays out tiles three to a row, all set to rounded. They are documented in their own frame. |
| Item count | Figma only, six items drawn | The list and grid regions hold six items so the arrangement can be read at a glance without a designer building one. Both take a run of items, and how many is the product’s decision. |
| Header | _Sheet Header, parent owned | Carries the sheet title and an optional leading Icon Button. Bottom Sheet always sets it to start, where the button leads and the title reads from the left. Its own center value centres the title and pins the button to the leading edge. |
| Header text | Not exposed | The title belongs to the header rather than to the sheet, so it is set on that part rather than passed in from here. |
| Handle | Sheet Handle, parent owned | The drag affordance along the top edge. It declares nothing, so it is identical on all three arrangements. |
| Footer | _Card Footer, parent owned | Set to its two action arrangement, an outline button beside a primary one, both set to small. It is Card’s footer reused here. |

## Usage

**Do**
- Pick Content Type for how a person reads the options. list is for reading down a set of labels, grid for recognising them by icon.
- Use generic when the content is not a set of options at all. It is the only arrangement that takes a slot.

**Don't**
- Don't try to set the title through the sheet. The header owns that text, so it is set on the header rather than passed in.
- Don't rely on the sheet to cap its own height. It hugs whatever it holds, so a long run of items has to be limited by the screen presenting it.

## Accessibility

- A bottom sheet arrives over the content a person was reading, so the screen presenting it has to say what it is and move focus into it.
- Nothing in the component does that on its own.
- The drag handle is a visual affordance with no label and no focusable control behind it, so dismissing the sheet has to be reachable another way, through the footer or through a gesture the screen supplies.
- The title in the header is the sheet’s accessible name, so it should read as a short noun phrase a person would recognise out of context.
- The footer’s two actions are the only controls present on every arrangement, which makes them the dependable way out.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 360 wide. Height follows the content, standing at 452 on list, 380 on grid and 388 on generic at the item counts drawn. |
| Direction | Column | Handle, header, content region and footer stacked with no gap between them, since each part carries its own padding. |
| Surface | Tokenised | surface/overlay across all three arrangements. |
| Radius | Top corners only | radius/container on the top two corners, with the bottom two left square. |
| Padding | Tokenised | space/card below the footer on all three arrangements. |
| Handle | Fill width | Padded space/lg above and below and space/section at the sides. The bar itself is control/target-min wide at radius/pill, drawn in border/default. |
| Header | Fixed width | Padded space/sm above and below and space/lg at the sides at start, with space/2xs between the Icon Button and the title. At center it is padded space/gutter above and below and space/lg at the sides. The title is title/medium in foreground/primary. |
| Content region | Fill | Padded space/md above and below, with space/lg at the sides on list and space/gutter on grid and generic. Items sit space/2xs apart on list, and space/md apart on grid and generic. |
| Grid rows | Fill | Three tiles to a row, space/md apart, each taking an equal share of the row width. |
| Footer | Set to two actions | Its two buttons each fill an equal share of the row. The padding and spacing around them belong to _Card Footer. |
| Elevation | None defined | No shadow and no scrim sit on the sheet. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-2592) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7642-212)
- [list](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3342) · [grid](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3344) · [generic](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5224-5408) · [Grid Menu Item](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5224-5199) · [_Sheet Header](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-2710) · [Sheet Handle](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-2714)

## Issues

### Warn

- *structure*: Show Leading icon is bound to nothing since the icon became an Icon Button, so it changes nothing in Figma. Code keeps the toggle, because the metadata calls the icon optional.
- *structure*: The leading Icon Button has no accessible name or action in Figma. Code adds leadingLabel and a click event.
- *structure*: With the button off at start, the header drops to 36 tall. Figma does not draw this case.
- *metadata vs code*: The metadata says the icon stays unchanged on Active and Disabled. Code gives it the label's token, by owner decision.
- *internalVariations*: The title, the leading icon and the footer actions are not exposed on the sheet, but a working sheet needs all three. Code must add them.
- *internalVariations*: The tile's glyph is fixed to star in Figma, but every tile needs its own. Code must add an icon input.
- *structure (gaps)*: The handle bar's 4 height has no token.
- *metadata*: Nothing moves focus into the sheet, and the handle has no control behind it. The presenting screen owns both.
- *accessibility*: Active and Disabled on a tile change the label colour only, so code must announce both as state.
- *structure*: Grid Menu Item's Notification Indicator is the small dot, but its drawn position is the top right of the icon block. The metadata only says it sits over the icon.

### Note

- *scrim*: Code adds modal, open and dismissible. A modal sheet sits over the Scrim component at tone scrim.

- *structure*: Figma draws a fixed 360 wide sheet. It needs to fill its container in code.
- *metadata*: No motion, shadow, scrim or height cap are defined, by the metadata's own statement.
- *structure*: Sheet Handle and _Sheet Header are documented here, not in specs of their own.
