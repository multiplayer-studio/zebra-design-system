# Global Header

The bar across the top of an application, carrying the product’s identity at the leading edge, navigation and search in the middle, and the person’s account at the trailing edge. Most of what it holds is optional: the app switcher, the search bar, the two menu regions and the dividers each turn on independently, so one component covers a bare branded bar and a fully loaded one. Rounded is set once and carries into every control nested inside it.

Source: [Global header page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5644) · component set `2356:5644` · extracted 2026-11-01 · 2 variants · default `Rounded=false`

> **No blockers, 6 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `rounded` | boolean | | `False` |
| `appSwitcher` | boolean | | `True` |
| `searchBar` | boolean | | `True` |
| `menuItems` | boolean | | `False` |
| `menuItemsSlot` | slot | | |
| `actionMenu` | boolean | | `False` |
| `actionMenuSlot` | slot | | |
| `dividers` | boolean | | `False` |
| `platformName` | string | | `Platform Name` |
| `showPlatformName` | boolean | | `True` |
| `showLogo` | boolean | | `True` |
| `logoSlot` | slot | | |
| `mode` *(code only)* | enum | `dark`, `light` | `dark` |

**mode** *(code only)*
- `dark`: The default. The header stays dark whatever the page mode.
- `light`: An override set on the header itself.

**rounded**
- `false`: Use where the header meets the viewport edges and reads as part of the chrome. Every control inside squares off with the bar.
- `true`: The corner carries into every nested control, so nothing stays square. (Use the radius around the header where the header sits inside a padded shell and reads as a floating surface.)

**appSwitcher**
- `true`: Keeps the grid button that moves a person between products. Drop it in a single product, where there is nothing to switch to.
- `false`: Removes it. The account control then sits against the trailing edge with nothing after it.

**searchBar**
- `true`: Keeps search in the middle band. It fills the spare width up to a maximum 280, so it will not stretch past that on a wider header.
- `false`: Removes it. The middle band collapses to whatever the menu regions hold, and to nothing when both are off.

**menuItems**
- `false`: Leaves the navigation region out, which suits a header whose navigation lives elsewhere on the page.
- `true`: Opens the navigation region before search. It takes the width the middle band has spare, so it is the part that absorbs a wider viewport.

**menuItemsSlot**: Takes the navigation controls. It is only drawn when MenuItems is on, so filling it alone leaves it hidden. *(shown when menuItems)*

**actionMenu**
- `false`: Leaves the trailing action region out, keeping the middle band to navigation and search.
- `true`: Opens a region for icon actions after search. It hugs its content, so it never takes width from search.

**actionMenuSlot**: Takes the trailing action controls. It is only drawn when ActionMenu is on. *(shown when actionMenu)*

**dividers**
- `false`: Leaves the three regions to spacing alone, which reads as one continuous bar.
- `true`: Draws a hairline before the middle band and another after it. Use it where the regions hold enough to blur together.

**platformName**: Names the product beside the mark. It takes a product name rather than a page title, because it does not change as a person navigates. *(shown when showPlatformName)*

**showPlatformName**
- `true`: Keeps the product name. Use it where the mark alone does not identify the product.
- `false`: Drops it, leaving the mark to carry identity on its own.

**showLogo**: Declared on the component and defaulting to true. Nothing in the header is bound to it, so the logo region is present either way and Slot Logo is what varies it.

**logoSlot**: Takes the product’s mark at the leading edge. It carries no visibility toggle of its own, so the region is always drawn.

## Internal variations & content inputs

- **account**: Both are fixed sample content on the nested instance. Neither is exposed in Figma.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `bar` | container | The surface itself, one row of content padded on every side and holding its three regions a shared gutter apart. · layout: direction horizontal; gap space/gutter; padding space/sm; align center · sizing: width fill; height hug · paint: fill surface/section; stroke color border/default; width stroke/base; align inside · radius: per rounded |
| `leadingGroup` | container | The menu button, the brand mark and the product name. It hugs its content, so a longer product name takes width from the middle. · layout: direction horizontal; gap space/gutter; align center · sizing: hug · parts: menuButton: Icon Button, medium, subtle, glyph hamburger-menu, brandMark: logoSlot, platformName: text, title/medium, foreground/primary |
| `middleBand` | container | Navigation, search and the trailing actions. It fills whatever the two end groups leave and packs its content to the trailing edge. · layout: direction horizontal; gap space/sm; justify end; align center · sizing: width fill; height hug · parts: navigation: menuItemsSlot, fill, gap space/3xs, search: Search, medium, fills to a maximum 280, actions: actionMenuSlot, hug, gap space/3xs |
| `accountGroup` | container | The account control and the app switcher, hugging their content at the end of the bar. · layout: direction horizontal; gap space/gutter; align center · sizing: hug · parts: account: _User Profile as the Template/Dropdown trigger, appSwitcher: Icon Button, medium, subtle, glyph apps |
| `dividers` | instance | Two vertical hairlines, one before the middle band and one after it. Both are off by default and appear together. · ref: Divider · refVariant: Orientation=vertical · visibleWhen: dividers · sizing: height fill |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### rounded

| rounded | bar.radius | controls.shape | account.radius | figmaNode |
|---|---|---|---|---|
| false | radius/none | sharp | radius/none | 2356:5580 |
| true | radius/element-sm | rounded | radius/sm | 2356:5655 |

## Subcomponents

### _User Profile

Set `2742:885` · 10 variant(s) · private

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `state` | enum | `default`, `hover`, `focus`, `pressed`, `disabled` | `default` |
| `rounded` | boolean | | `False` |

#### Anatomy

| Part | Details |
|---|---|
| `root` | · layout: direction horizontal; gap space/2xs; padding space/2xs by space/sm; align center · sizing: width hug; height control/md · paint: fill interactive/neutral/background/default; stroke color interactive/neutral/border/default; width stroke/base |
| `username` | · text: style label/small; color foreground/primary |
| `avatar` | · ref: Avatar · refVariant: Size=xxsmall, no status, ring or close |
| `chevron` | · ref: Icon · refVariant: Size=small · glyph: expand-more |

Cells are token names, except those ending Px, which are measurements of the rendered file.

### state

| state | root.fill | root.stroke | username.color |
|---|---|---|---|
| default | interactive/neutral/background/default | | |
| hover | interactive/neutral/background/hover | | |
| pressed | interactive/neutral/background/pressed | | |
| focus | interactive/neutral/background/focused | border/focus at stroke/thin | |
| disabled | interactive/neutral/background/disabled | interactive/neutral/border/disabled | interactive/ghost/foreground/disabled |

## Dependencies

- **Icon Button** (`2338:1763`): menu button, app switcher and slot defaults, medium and subtle
- **Button** (`2060:15072`): slot default in the navigation region, medium and subtle
- **Search** (`2356:5205`): search, medium, enabled, shape follows rounded
- **Divider** (`2152:8803`): vertical dividers
- **Template/Dropdown** (`2669:10309`): account menu, bottom and left
- **Avatar** (`4906:1172`): account control, xxsmall
- **Brand Logo Horizontal** (`2356:4944`): default content of logoSlot

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `surface/section`, `border/default`, `border/focus`, `foreground/primary`, `interactive/neutral/background/default`, `interactive/neutral/background/hover`, `interactive/neutral/background/pressed`, `interactive/neutral/background/focused`, `interactive/neutral/background/disabled`, `interactive/neutral/border/default`, `interactive/neutral/border/disabled`, `interactive/ghost/foreground/disabled`
- **Dimension:** `space/{2xs,xxs,sm,gutter}`, `radius/{none,sm,element-sm}`, `stroke/{base,thin}`, `control/md`
- **Typography:** `title/medium`, `label/small`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export.

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| Static | — | The header itself has no interaction states. Hover, focus and press belong to the controls placed inside it. |
| Rounded | The Rounded value | Every corner in the bar changes together, from the bar itself through the icon buttons, the search field and the account control. |
| Account control | _User Profile State | It carries default, hover, pressed, focus and disabled. The background moves through the neutral interactive tokens, and focus is the only one that draws a visible border. |
| Menu open | The dropdown Open value | The account control is the trigger for a dropdown. What opening it does belongs to Template/Dropdown and is described in its own frame. |
| Region visibility | AppSwitcher, SearchBar, MenuItems, ActionMenu, Dividers | Each toggle takes its region out of the layout rather than leaving a gap, so the remaining regions close up. |

- **Motion:** No transition is defined. Regions appear and disappear with their toggles, and nothing animates the change.
- **Mode:** Frozen in dark whatever the page mode. An override set on the header itself is the only exception.
- **Width:** The bar holds a fixed width, with the middle band filling whatever the two end groups leave. Those groups hug their content, so a longer product name or an extra action takes width away from navigation.
- **Middle alignment:** The middle band packs its content to its trailing edge. With navigation off, search sits next to the account group rather than in the centre of the bar.
- **Shape propagation:** Rounded is set once on the bar and carried into every nested control. Setting a nested control’s own shape separately is the one place a consumer can leave the header inconsistent with itself.
- **Border theming:** A stroke bound to border/default sits on the bar at zero weight, and the nested controls carry the same arrangement. The weight is a theming hook, so a high contrast variable set can give the bar and everything in it a hard outline.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Brand mark | Slot Logo, consumer owned | Takes the product’s mark at the leading edge. The content sitting in it by default is _Brand Logo Horizontal, which filling the slot replaces. |
| Product name | PlatformName, text | Consumer owned, and the only text the header itself takes in. |
| Navigation | Slot-Menu-Items, consumer owned | Takes the navigation controls. The content in it by default is one Icon Button and one Button, both subtle and medium, which is the pairing the region is spaced for. |
| Trailing actions | Slot-Menu-Actions, consumer owned | Takes icon actions after search. The content in it by default is two Icon Buttons at the same size and flavour. |
| Search | Search, parent owned | Held at medium with its shape following Rounded. It comes from a separate library rather than this file, so it has no frame here. |
| App switcher | Icon Button, parent owned | An Apps glyph on a subtle medium Icon Button. The glyph is fixed, so this is a product switcher rather than a general purpose action. |
| Menu button | Icon Button, parent owned | A Hamburger glyph at the leading edge. It carries no visibility toggle, so it is always present. |
| Account control | _User Profile, parent owned | A username, an avatar and a chevron, wired as the trigger of Template/Dropdown. Neither the username nor the avatar is exposed as an input. |
| Dividers | Divider, parent owned | Two vertical hairlines shown together by one toggle. They stretch to the height of the content row. |

## Usage

**Do**
- Set Rounded once on the header and let it carry. Every control inside follows it, so the bar stays consistent without touching each one.
- Keep PlatformName to the product's name. It sits beside the mark as identity and should not change as a person moves around the product.

**Don't**
- Don't fill a menu slot and leave its toggle off. Slot-Menu-Items and Slot-Menu-Actions only appear when MenuItems and ActionMenu are on.
- Don't lean on search to absorb a wider viewport. It stops at a maximum 280, so the navigation region is the part that grows.

## Accessibility

- The header is a landmark rather than a control, so it takes its role and its name from the page around it, and the navigation region inside it needs one of its own.
- Every control in the bar carries a glyph and no visible label, so the menu button, the app switcher and the trailing actions each need an accessible name supplied where they are placed.
- The account control is a dropdown trigger, so it has to announce both the person it represents and the fact that it opens a menu.
- Focus is the only state on that control that draws a visible border, which makes the border/focus outline the one thing a keyboard user has to locate it by.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Filled width, hug height | 100% wide and 56 tall on both variants, with the content row inside standing at control/md. |
| Direction | Row | Leading group, middle band and account group on one line, space/gutter apart, with space/sm padding on every side of the bar. |
| Leading group | Hug | space/gutter between the menu button, the brand mark and the product name. |
| Middle band | Fill | Takes the width the two end groups leave, spaces its children space/sm apart, and packs them to its trailing edge. |
| Navigation region | Fill | Takes the width spare inside the middle band, with space/3xs between its controls. |
| Action region | Hug | Hugs its controls with space/3xs between them, which is why it never takes width from search. |
| Search | Set to medium | Its shape follows Rounded and its size is held at medium. The header gives it a maximum 280 and no fixed width. Below that it fills the spare width, so it gives way before it can overlap a neighbour. |
| Account group | Hug | space/gutter between the account control and the app switcher. |
| Controls | Set per variant | The icon buttons are set to medium and subtle. The account control is control/md tall and hugs its width, padded space/2xs and space/sm with space/2xs between its parts. |
| Radius | Per Rounded | radius/none throughout when false. When true the bar takes radius/element-sm and every nested control is set to its rounded shape, while the account control takes radius/sm. |
| Surface | Tokenised | surface/section on the bar. The icon buttons are set to the subtle flavour, and the account control carries the neutral interactive backgrounds. |
| Text | Tokenised | The product name is title/medium in foreground/primary. The username is label/small, dropping to interactive/ghost/foreground/disabled when the account control is disabled. |
| Account states | Per State | interactive/neutral/background at default, hover, pressed, focused and disabled. focus adds a border/focus stroke at 1 wide, and every other state carries interactive/neutral/border/default at zero weight. |
| Dividers | Fill height | Set to vertical and stretching to the height of the content row. The two of them appear together. |
| Theme/Mode | Frozen in Dark Mode | The global header is frozen in dark mode irrespective of the page mode, except a mode override is set on the global header itself. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2314-3348) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5644) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7632-290)
- [rounded false](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5580) · [rounded true](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2356-5655) · [_User Profile](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2742-885)

## Issues

### Warn

- *structure vs metadata*: showLogo is declared but bound to nothing, so turning it off changes nothing in Figma. Code has to decide what it does.
- *dependency*: Search is an instance of a remote library set (2356:5205), not the file's Search (2152:8811). Its rounded variant also pads space/3xs above and below where sharp pads space/sm.
- *metadata vs structure*: The metadata calls search both a maximum 280 and a fixed width, and the instance sets 280 as a minimum. Code uses the maximum, and search shrinks below it.
- *metadata vs structure*: The metadata says both a fixed width and a filled 100% width. Figma draws a fixed bar, and it needs to fill its container in code.
- *internalVariations* (note): The account avatar is a full Avatar; code takes any Avatar property except size, which stays xxsmall.
- *accessibility*: The menu button, the app switcher and the account control have no accessible names in Figma, so each needs a label input in code.

### Note

- *internalVariations*: The account menu's rows belong to Template/Dropdown, so the header needs a way to pass them in.
- *structure*: The stroke on the bar resolves to zero, which the metadata states is a theming hook.
- *metadata*: No motion is defined, by the metadata's own statement.
