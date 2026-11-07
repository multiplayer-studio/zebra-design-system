# Breadcrumb

Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a level. A long trail collapses its middle into an overflow menu, so every crumb stays reachable.

Source: [Breadcrump page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7662-814) · component set `7667:447` · extracted 2026-11-01 · 10 variants · default `Collapsed=false, Shape=rounded, Flavour=default, Open=false`

> **No blockers, 6 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `flavour` | enum | `default`, `accent` | `default` |
| `shape` | enum | `rounded`, `sharp` | `rounded` |
| `collapsed` *(derived)* | enum | `false`, `true` | `false` |
| `open` *(derived)* | enum | `false`, `true` | `false` |
| `items` *(code only)* | array | | |
| `maxItems` *(code only)* | number | | |
| `label` *(code only)* | string | | |
| `overflowLabel` *(code only)* | string | | |
| `portalContainer` *(code only)* | element | | |

**flavour**
- `default`: Sets the current page in foreground/primary. Use it unless the trail needs to stand out.
- `accent`: Sets the current page and its icon in foreground/link. In code this is flavour.

**shape**
- `rounded`: Matches surfaces built from rounded controls. Reaches the overflow control and its menu only.
- `sharp`: Matches square surfaces. The crumbs are text, so they do not change.

**collapsed**
- `false`: Shows every crumb. Figma only: derived from maxItems, not a prop.
- `true`: Keeps the first crumb and the last ones. The rest move to the overflow menu.

**open**
- `false`: The overflow menu is closed. Figma only: derived from the menu, not a prop.
- `true`: Shows the compact menu below the overflow control. Drawn with Collapsed on.

**items**: The path, root first. Each item takes label, href, icon and onSelect. The last item is the current page.

**maxItems**: How many crumbs show before the middle collapses. Unset shows them all. The minimum is 2.

**label**: Accessible name of the trail. Defaults to Breadcrumb.

**overflowLabel**: Accessible name of the overflow control. Defaults to Show hidden pages.

**portalContainer**: Where the overflow menu mounts. Set it when the theme is scoped below body.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Internal variations & content inputs

- **crumb icon**: An optional glyph before the label. Figma only: an exposed instance. In code it is the item's icon.
- **label** (`label`): Sample trail of 5 crumbs, not API.
- **icon** (`icon`): Sample glyph location on the current page.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `root` | container | layout: direction horizontal; gap space/md; crossGap space/2xs; padding space/none; align center · sizing: hug |
| `crumb` | instance | A link back up the hierarchy, with an optional icon. · ref: _Breadcrumb Item · refVariant: State=default |
| `separator` | instance | The chevron after each crumb. Decorative, so hidden from assistive tech. · ref: Icon · refVariant: Size=small · glyph: chevron-right |
| `overflowControl` | instance | Holds the hidden crumbs, and opens the compact menu. · ref: Icon Button · refVariant: Size=small, Flavour=outline-subtle, State=default · glyph: more-horizontal · visibleWhen: collapsed |
| `currentPage` | instance | The last item. It is text, not a link. · ref: _Breadcrumb Item · refVariant: State=current |
| `overflowMenu` | instance | ref: Dropdown Menu · refVariant: Compact=true · visibleWhen: open · note: Figma only: drawn inside the component. Rows are Menu Items for the hidden crumbs. · position: below overflowControl, left aligned |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### flavour

| flavour | currentPage.state | figmaNode |
|---|---|---|
| default | current | 7667:69 |
| accent | current accent | 7667:119 |

### shape

| shape | overflowControl.shape | overflowMenu.rounded | figmaNode |
|---|---|---|---|
| rounded | rounded | true | 7667:259 |
| sharp | sharp | false | 7667:353 |

### collapsed

| collapsed | middle | measuredHeightPx | figmaNode |
|---|---|---|---|
| false | every crumb | 24 at the sample's five crumbs | 7667:69 |
| true | overflowControl and a separator, space/md apart | 36 | 7667:259 |

### open

| open | overflowMenu | figmaNode | measuredMenuPx | measuredOffsetPx |
|---|---|---|---|---|
| false | absent | 7667:259 | | |
| true | Dropdown Menu, Compact=true, More Items off, rows without leading element | 7668:968 | 201 x 96 | 8 |

## Subcomponents

### _Breadcrumb Item

One crumb. Hover and focus are CSS states. current is derived from being the last item, and current accent from flavour on Breadcrumb. Show Separator is off on the last item.

Set `7665:138` · 5 variant(s) · private

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `state` | enum | `default`, `hover`, `focus`, `current`, `current accent` | `default` |
| `label` | string | | `Breadcrumb` |
| `showIcon` | boolean | | `False` |
| `showSeparator` | boolean | | `True` |

#### Anatomy

| Part | Details |
|---|---|
| `root` | layout: direction horizontal; gap space/md; padding space/none; align center · sizing: hug |
| `crumb` | radius: radius/sm · layout: direction horizontal; gap space/sm; padding space/none; align center · sizing: hug |
| `icon` | ref: Icon · refVariant: Size=small · glyph: location (sample) · visibleWhen: showIcon · note: Exposed nested instance, so the glyph is swapped on the Icon. |
| `label` | content: label · text: style body/medium; color per state |
| `separator` | ref: Icon · refVariant: Size=small · glyph: chevron-right · visibleWhen: showSeparator |

Cells are token names.

### state

| state | label.color | icon.color | crumb.stroke | figmaNode |
|---|---|---|---|---|
| default | foreground/secondary | foreground/primary | none | 7665:83 |
| hover | foreground/link | foreground/primary | none | 7665:94 |
| focus | foreground/secondary | foreground/primary | border/focus at stroke/thick, outside | 7665:105 |
| current | foreground/primary | foreground/primary | none | 7665:116 |
| current accent | foreground/link | foreground/link | none | 7665:127 |

## Dependencies

- **Icon** (`2046:15010`): crumb icon and separator, small
- **Icon Button** (`2338:1763`): overflow control, small and outline-subtle, glyph more-horizontal
- **Dropdown Menu** (`2666:6863`): overflow menu, Compact=true, Rounded follows shape
- **Menu Item** (`2402:6508`): overflow menu rows
- **Template/Dropdown** (`2669:10309`): named by the metadata as the trigger and menu pattern, not instanced on the page

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `foreground/primary`, `foreground/secondary`, `foreground/link`, `border/focus`
- **Dimension:** `space/{none,xxs,sm,md}`, `radius/sm`, `stroke/thick`
- **Typography:** `body/medium`
- **Named by the metadata, bound by nested components:** `control/sm`, `space/xs`, `surface/overlay`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export, and glyphs `chevron-right`, `more-horizontal` and `location` are in the icon font.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | Text in foreground/secondary. |
| hover | Pointer over a crumb | — | Text moves to foreground/link. The icon holds its colour. A CSS state, not a prop. |
| focus | Keyboard focus on a crumb | — | A stroke/thick ring in border/focus. A CSS state, not a prop. |
| current | Being the last item | — | Text in foreground/primary, with no link. Derived from position. accent moves it and its icon to foreground/link. |
| Overflow control | Its own Icon Button states | — | Hover, press and focus belong to Icon Button. |
| Open | Activating the overflow control | — | Opens Dropdown Menu with Compact on. The control reports itself as expanded. |

- **Motion:** No transition is defined. Crumbs change colour at once.
- **Collapse:** With maxItems set and a longer trail, the first crumb stays, then maxItems minus one from the end. The rest move to the menu, in order.
- **Dropdown:** The overflow control is the Template/Dropdown trigger. The menu opens below it, left aligned, space/sm away. It is Dropdown Menu with Compact on, so a short list stays tight.
- **Menu rows:** Each hidden crumb is a Menu Item, with its icon if it has one. Choosing a row runs onSelect, follows href, and closes the menu.
- **Keyboard:** Enter or Space opens the menu. Arrow keys move through the rows. Escape closes it and returns focus to the control.
- **Portal:** Figma only: the menu is drawn inside the component. In code it mounts in a portal and is positioned against the control, with collision handling.
- **Wrapping:** A long trail wraps, with lines space/2xs apart. The separator stays at the end of a line, so each line starts on a crumb. Figma draws one line.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Crumbs | items, consumer owned | The path. Keep labels short, because the trail reads as one line. |
| Label | Text property | The crumb's name. It is the only required part of an item. |
| Icon | Show Icon, nested Icon | An optional glyph before the label. Figma only: an exposed instance. In code it is the item's icon. |
| Separator | Parent owned | chevron-right at small. Figma only: Show Separator. In code it renders after every crumb but the last. |
| Overflow control | Icon Button, parent owned | Small and outline-subtle, with more-horizontal. Its shape follows Shape. |
| Overflow menu | Dropdown Menu, parent owned | Compact on, with Rounded following Shape. Its rows are Menu Items for the hidden crumbs. |
| Sample trail | Figma only | The labels and the number of crumbs are sample content, not API. |

## Usage

**Do**
- Use it on pages more than one level deep, with the root first.
- Set maxItems where the trail could outgrow its row.

**Don't**
- Don't use it for steps in a flow. Stepper is for a sequence, and a breadcrumb is for a place.
- Don't give the current page a link. It is never one, even with an href.

## Accessibility

- A labelled nav holding an ordered list.
- The last item carries aria-current="page" and is not a link.
- Separators are hidden from assistive tech.
- The overflow control has no visible text, so overflowLabel names it.
- Opening the menu moves focus to its rows, and Escape returns it to the control.
- Hover is colour alone, so keyboard users rely on the focus ring.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug | Hugs the trail. A collapsed trail stands at control/sm, because of the overflow control, so it is taller than a full one. |
| Direction | Row, wrapping | Crumbs and separators in a row, space/md apart. Wrapped lines sit space/2xs apart. |
| Crumb | Tokenised | body/medium, with space/sm between icon and label. foreground/secondary, foreground/link on hover, foreground/primary when current. |
| Icon | Set to small | foreground/primary in every state. foreground/link on an accent current page. |
| Separator | Set to small | chevron-right in foreground/primary. |
| Overflow control | Set to small | Icon Button, outline-subtle. Rounded or sharp from Shape. |
| Overflow menu | Compact | Dropdown Menu with Compact on: space/xs padding, space/none between rows, on surface/overlay. It sits space/sm below the control. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7662-814) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-447) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7668-1158)
- [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-69) · [accent](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-119) · [collapsed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-259) · [sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-353) · [open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7668-968) · [open sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7668-1064) · [_Breadcrumb Item](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-138) · [item focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-105)

## Issues

### Warn

- *metadata vs structure*: collapsed and open are Figma variants, but the metadata says neither is a prop. Code derives them, from maxItems and from the menu.
- *structure vs metadata*: open is drawn at flavour default only. There is no accent open variant, though flavour does not touch the menu.
- *structure (gaps)*: The menu's distance from the control is a raw 8 on an absolute layer, because Figma cannot bind it. The metadata says space/sm.
- *structure vs metadata*: _Breadcrumb Item has no shape axis, so its crumb stays radius/sm on sharp. The focus ring is the only place it shows, and the metadata says crumbs do not change.
- *internalVariations*: The crumb's glyph has no property, only an exposed nested Icon. Code must take it as an item input.
- *accessibility*: The overflow control has no accessible name in Figma, and no input carries one. Code must supply it through overflowLabel.

### Note

- *structure vs metadata*: Direction says wrapping, but the set does not wrap. The metadata states this, so it is intended. space/2xs is bound for the wrapped lines.
- *structure*: Collapsed=false repeats across both shapes with no visible change, because there is no overflow control to reach.
- *metadata*: items, maxItems, label, overflowLabel and portalContainer exist in the Property Breakdown only. Figma has nothing to bind them to.
- *metadata*: control/sm, space/xs and surface/overlay are named by the metadata and belong to nested components, so this page binds none of them directly.
- *metadata*: No Theming row exists in Layout & Theming Intents. The Do and Don't picture areas are empty.
- *metadata*: No motion, by the metadata's own statement.
- *structure*: The page is named Breadcrump. The component and boards are Breadcrumb.
