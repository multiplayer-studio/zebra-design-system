# Navigation Rail

A vertical navigation column for the edge of a desktop view, made of a narrow icon rail and a sub menu panel beside it. It is a container rather than a fixed design, three slots hold the destinations and the variant axes control only the rail's width and whether captions show. Fill the slots with Navigation Rail Item and Sub Menu Item instances. It paints no panel of its own, sitting on surface/section and marking the boundary between rail and panel with a single border.

Source: [Navigation Rail page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3182-237) · set 3453:54061 · extracted 2026-10-21

The page has seven public components (43 variants) and three metadata frames, the same sets, node ids and frames as on 2026-10-20 (none added or removed). They are split like this:

> **Changed in Figma since 2026-10-20:** the metadata adds a code-only `shape` property and says the Sub Menu Header's sub elements inherit the rail's shape; Sub Menu Header's `sub page` variant now uses an Icon Button for its back arrow, with a `space/sm` gap to the title. Everything else on the page is structurally unchanged.

| Component | Variants | Where it is specced | Why |
|---|---|---|---|
| Navigation Rail | 3 | here | the master |
| Navigation Rail Item | 10 | [specs/navigation-rail-item](../navigation-rail-item/navigation-rail-item.spec.md) | has its own Navigation Rail Item Metadata frame |
| Sub Menu Item | 10 | [specs/sub-menu-item](../sub-menu-item/sub-menu-item.spec.md) | has its own Sub Menu Item Metadata frame |
| Navigation Header | 4 | here, [Subcomponents](#navigation-header) | no metadata of its own |
| Sub Menu Header | 2 | here, [Subcomponents](#sub-menu-header) | no metadata of its own |
| Caret Indicator | 12 | here, [Subcomponents](#caret-indicator) | no metadata of its own. Accordion uses it too and should point here |
| Collapsible Menu Item | 2 | here, [Subcomponents](#collapsible-menu-item) | no metadata of its own |

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `expanded` | enum | false, true | `false` | variant |
| `label` | enum | false, true | `false` | variant (only with `expanded=false`) |
| `showHeaderAction` | boolean | true, false | `true` | headerAction |
| `showToggleItem` | boolean | true, false | `true` | toggleItem |
| `showSubMenu` | boolean | true, false | `true` | subMenu |
| `moreRailItems` | boolean | true, false | `true` | menuSlot |
| `moreFooterItems` | boolean | true, false | `true` | footerSlot |
| `shape` | enum (code only, not in Figma) | rounded, sharp | `rounded` | corner shape of every nested component (`radius/sm` / `radius/none`) |
| `inverse` | boolean (code only, not in Figma) | false, true | `false` | the rail's locked colour mode: dark, or light when true |
| `menuSlot` | slot | Navigation Rail Item, Divider | — | menuSlot |
| `footerSlot` | slot | Navigation Rail Item, Divider | — | footerSlot |
| `subMenuSlot` | slot | Sub Menu Item, Collapsible Menu Item | — | subMenuSlot |

**expanded**: false: "The narrow icon rail. Destinations read as glyphs alone unless Label is on, so it only works where the icons are genuinely recognisable." · true: "The wide rail, with every item's label beside its icon and the header action becoming a full Button. Reach for it when the destinations cannot be told apart by glyph. It changes the rail's overall width, so the page beside it has to give up the difference."

**label**: false: "Icons only in the narrow rail." · true: "Adds a caption under each icon in the narrow rail, buying recognition without the width of Expanded. The column stays narrow, so only very short words fit. Content placed in the Menu Slot is held separately per Label setting and does not carry across a change to it."

**showHeaderAction**: true: "Shows the action under the header, a create or compose entry point rather than a destination." · false: "Hides it, for a rail that is purely navigational."

**showToggleItem**: true: "Shows the last footer item, which carries the panel glyph and is how a user moves between the narrow and wide rail." · false: "Hides it. Only do this when something outside the rail controls Expanded, otherwise the user has no way to change it back."

**showSubMenu**: true: "Shows the panel beside the rail, for destinations that have a second level." · false: "Hides the panel and leaves the icon rail on its own. The rail's overall width drops by the panel's width, so the layout beside it moves."

**moreRailItems**: true: "Shows the Menu Slot below the three built-in rail items, which is where additional destinations go." · false: "Hides the slot along with everything placed in it, leaving only the three built-in items."

**moreFooterItems**: true: "Shows the Footer Slot above the fixed footer items." · false: "Hides the slot along with everything placed in it."

**shape** (code only): rounded: "Doesn’t appear in Figma, but this controls the shape of all sub items within the rail unless overridden" · sharp: the Figma text is copied from More Rail Items (see notes). **Owner decision:** shape reaches every nested component (Navigation Rail Item, Sub Menu Item, Collapsible Menu Item, the header action, and the Buttons and Icon Buttons inside Navigation Header and Sub Menu Header, including the back button); rounded = `radius/sm`, sharp = `radius/none`, and a nested Button or Icon Button takes the same-named shape. The rail itself has no corners and is unaffected. Items used outside a rail stay rounded.

**inverse** (code only, owner decision): false: the rail is locked to dark mode, whatever the page's mode. true: it is locked to light mode instead. Either way everything inside the rail (items, headers, sub menu, slotted content, popups) follows the rail, not the page. Implemented as the token layer's `mode-dark` / `mode-light` class on the rail's root, so an `.ext-*` brand on an ancestor still applies.

Only three variants exist: narrow, narrow with labels, and wide. `label=true` with `expanded=true` is not built.

**Unwired in Figma (not part of the API):**
- `Show Header` (#3388:12) is bound to nothing, so the header always shows.
- `Menu Slot#3200:20` is an orphan. The live Menu Slots are #3497:69 (Label=false) and #3497:65 (Label=true). That split is a Figma workaround, and in code it is one `menuSlot`.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Header** is a Navigation Header, pinned to Type=avatar, and its Expanded follows the rail's. You can only change it by swapping the nested instance.

**Sub Menu Header** is pinned to Type=sub page, whose back affordance is an Icon Button (Size=small, Shape=sharp, Flavour=subtle) with glyph `arrow-back`. It is exposed.

**Built-in items:**
- Rail Item 1–3 and the Footer Rail Item are Navigation Rail Items with label "Label" and a `star` placeholder glyph.
- The toggle item shows `left-panel-open` with the label "Open" when narrow, and `left-panel-close` with "Close" when wide.

## Anatomy

Root: horizontal, gap `space/none`, padding `space/none`, fill `surface/section`. Hugs its width (312Px narrow, 440Px wide, min-width 72Px). Its height is drawn fixed at 991Px and should fill in use.

1. **Main Rail**: "The icon column, holding the header, the action, the menu list and the footer. Its width is what changes between the two Expanded variants." Vertical, gap `space/md`, padding `space/card` top/bottom and `space/md` left/right. Fixed width × fill height; clips. It measures 72Px narrow and 200Px wide.
   - **header**: Navigation Header, Type=avatar, Expanded matching the rail.
   - **headerAction** (visible when `showHeaderAction`): glyph `add-circle-outline`.
     - Narrow: an Icon Button (Size=large, Shape=rounded, Flavour=primary), square at `control/lg`.
     - Wide: a Button (same size, shape and flavour) labelled "Create" with its leading icon on. It fills the width at height `control/lg`.
2. **Menu List**: "The middle of the rail, holding three built-in items and then the Menu Slot. It absorbs whatever height is left between the header block and the footer." Vertical, gap `space/xs`, fill × fill.
   - **Rail Item 1–3**: Navigation Rail Item, with Expanded = `expanded` and Show Label = `label`.
   - **menuSlot** (visible when `moreRailItems`): vertical, gap `space/xs`, clips.
     - Horizontal padding is `space/xs` narrow and `space/none` wide.
     - It fills its height when narrow and hugs when wide.
     - Sample content: a Divider and three items.
3. **Footer**: "Pinned to the bottom, holding the Footer Slot and two fixed items. The last of them is the toggle a user presses to change the rail's width." Vertical, gap `space/xs`, fill × hug.
   - **footerSlot** (visible when `moreFooterItems`): vertical, gap `space/xs`, clips. Sample content: a Divider and three items.
   - **Footer Rail Item**: a Navigation Rail Item.
   - **toggleItem** (visible when `showToggleItem`): a Navigation Rail Item showing `left-panel-open` "Open" when narrow and `left-panel-close` "Close" when wide. Code wires it to `expanded`.
4. **Sub menu** (visible when `showSubMenu`): "The panel beside the rail, holding the Sub Menu Header and the Sub Menu Slot. It carries the only vertical border in the component, on its leading edge." Vertical, gap `space/none`, fixed width (240Px, min 240Px) × fill height. It has a left-edge stroke in `border/default`, with an unbound width (see issues).
   - **subMenuHeader**: Sub Menu Header, Type=sub page; fill × fixed. Its back button is an Icon Button (`arrow-back`).
   - **subMenuSlot**: vertical, gap `space/xs`, padding `space/sm`, fill × hug. Sample content: one Collapsible Menu Item and four Sub Menu Items.

## Variants

| label | expanded | main rail | root | header action | rail items | menu slot padding-x | toggle | node |
|---|---|---|---|---|---|---|---|---|
| false | false | 72Px | 312Px | Icon Button | Expanded=false | `space/xs` | `left-panel-open` "Open" | 4654:10599 |
| true | false | 72Px | 312Px | Icon Button | Expanded=false, Show Label=true | `space/xs` (own slot content) | `left-panel-open` "Open" | 3453:54097 |
| false | true | 200Px | 440Px | Button "Create" | Expanded=true, fill | `space/none` | `left-panel-close` "Close" | 3453:54121 |

The widths are measured, not tokens. They come from the items (`control/lg`), the rail padding and the panel's fixed width.

## Subcomponents

### Navigation Rail Item → [specs/navigation-rail-item](../navigation-rail-item/navigation-rail-item.spec.md)
### Sub Menu Item → [specs/sub-menu-item](../sub-menu-item/sub-menu-item.spec.md)

### Navigation Header
Set 3453:54312 · 4 variants · no metadata.

| Prop | Type | Values | Default |
|---|---|---|---|
| `type` | enum | avatar, logo | `avatar` |
| `expanded` | enum | true, false | `true` |
| `title` | string | — | `"Title"` |
| `showTitle` | boolean | | `true` (no effect when collapsed) |
| `showIconButton` | boolean | | `true` (no effect when collapsed) |

**Root:** horizontal, padding `space/none`. It is space-between and fixed (184×56Px) when expanded, and centred with min-width `control/lg` (48×56Px) when collapsed.

**Brand group:** horizontal, gap `space/sm`, padding `space/xs` on the left and right. It holds:
- **mark**:
  - avatar: an Avatar (Size=small, Show Status on, Ring and Close off).
  - logo: an Icon (Size=large, Framed=true) with glyph `zebra` and height `control/target-min`.
- **title**: `label/medium`, `foreground/primary`, hugging. Shown only when expanded.

**Action:** an Icon Button (Size=small, Shape=sharp, Flavour=subtle) with glyph `settings` at `control/sm`. Shown only when expanded.

| type | expanded | content | node |
|---|---|---|---|
| avatar | true | avatar, title, action | 3453:54313 |
| avatar | false | avatar only | 3453:54319 |
| logo | true | logo, title, action | 3453:54322 |
| logo | false | logo only | 3453:54328 |

### Sub Menu Header
Set 3453:54332 · 2 variants · no metadata.

| Prop | Type | Values | Default |
|---|---|---|---|
| `type` | enum | default, sub page | `default` |
| `title` | string | — | `"Sub Header"` |
| `showLeadingIcon` | boolean | | `true` (wired in Type=default only) |
| `showTrailingActions` | boolean | | `true` |
| `trailingActions` | slot | prefers Button, Icon Button, Icon, plus one unknown set | sample: Button small/sharp/text "Button" |

**Root:** horizontal and space-between, padding `space/lg` on the left and right. Fixed at 72Px tall (it fills its width in the rail). It has a bottom stroke in `border/default` with an unbound width.

**Icon and title:** horizontal, padding `space/none`, gap `space/md` in `default` and `space/sm` in `sub page`.
- **leading glyph** (`default` only, visible when `showLeadingIcon`): Icon Size=medium, Framed=false, glyph `verified` (a placeholder), currentColor.
- **back button** (`sub page` only): an Icon Button (Size=small, Shape=sharp, Flavour=subtle) with glyph `arrow-back`, sized `control/sm` by the Icon Button. It has no visibility binding, so `showLeadingIcon` does nothing here. **Changed 2026-10-21:** it used to be a bare Icon Size=medium glyph.
- **title**: `label/medium`, `foreground/primary`.

| type | lead | lead visible when | icon-to-title gap | node |
|---|---|---|---|---|
| default | Icon `verified` (placeholder) | `showLeadingIcon` | `space/md` | 3453:54333 |
| sub page | Icon Button small/sharp/subtle, `arrow-back` | always (binding missing) | `space/sm` | 3453:54340 |

**Trailing actions:** horizontal, gap `space/xs`.

### Caret Indicator
Set 3453:54347 · 12 variants · no metadata. **This is the folder Accordion should point to** (specs/accordion currently lists it as unspecced). Sub Menu Item and Collapsible Menu Item use it too.

| Prop | Type | Values | Default |
|---|---|---|---|
| `open` | enum | false, true | `false` |
| `direction` | enum | vertical, horizontal | `vertical` |
| `size` | enum | small, medium, large | `small` |

It is one glyph (an Icon with Framed=false, rounded family, currentColor) in a hugging frame. It binds no tokens. **In Figma**, opening swaps the glyph:

| direction | open=false | open=true |
|---|---|---|
| vertical | `expand-more` | `expand-less` |
| horizontal | `chevron-right` | `expand-more` |

Size sets the nested Icon's own size: small is 16Px, medium 20Px and large 28Px (all measured).

**In code (owner decision, carried over):** carets and chevrons rotate one glyph with animation rather than swapping glyphs. Use `expand-more` for `vertical`, turned 180deg when open, and `chevron-right` for `horizontal`, turned 90deg clockwise when open; both end states match the glyphs Figma swaps to. The rotation transitions on `animations/spring` (`--animations-spring`), the motion Switch uses, and is switched off under prefers-reduced-motion. Figma has not been redrawn to rotate.

### Collapsible Menu Item
Set 3453:54352 · 2 variants · no metadata.

| Prop | Type | Values | Default |
|---|---|---|---|
| `open` | enum | false, true | `false` |
| `children` | slot (Sub Menu Slot#3423:58) | Sub Menu Item, Nested=true | visible when `open` |

**Root:** vertical, gap `space/none`, fill × hug. When open it gets radius `radius/sm` and clips.

**Header:** a Sub Menu Item with Nested=false, Sub Menu=true and the leading icon on.
- Its State is `default` when closed and `active` when open (`interactive/ghost/background/pressed`, with `radius/sm` on the top corners only).
- It overrides the caret to Direction=vertical, so the glyph is `expand-more` when closed and `expand-less` when open.

**Children** (when open): vertical, gap `space/xs`, padding `space/sm`, fill `surface/menu`, `radius/sm` on the bottom corners, clips. The sample is four nested Sub Menu Items with Sub Menu=false.

| open | header state | caret | children | node |
|---|---|---|---|---|
| false | default | `expand-more` | hidden | 3453:54353 |
| true | active | `expand-less` | shown on `surface/menu` | 3453:54360 |

### Dependencies
- Icon ([specs/icon](../icon))
- Icon Button ([specs/icon-button](../icon-button)), now also Sub Menu Header's back button
- Button ([specs/button](../button))
- Avatar ([specs/avatar](../avatar))
- Divider ([specs/divider](../divider))

None of them is remote.

### Notification Indicator copy (set 2837:1489)
Sub Menu Item is the only part that uses the drifted copy that [specs/navigation-bar](../navigation-bar/navigation-bar.spec.md) found. It is the badge in all 10 Sub Menu Item variants, at Size=medium, so it also arrives wherever Sub Menu Item is placed: the rail's Sub Menu Slot and Collapsible Menu Item.

Navigation Rail Item's badge is the specced Badges-page set (3719:6256, Size=small). The master and the other four subcomponents hold no Notification Indicator.

The medium variant has 16 direct instances today (the navigation-bar spec recorded 15):
- 10 in the Sub Menu Item variants
- 1 in the Sub Menu Item metadata anatomy example
- 1 in the stray "Navigation Rail" frame
- 4 in an orphaned Sub Menu Item set (3404:28070) that sits on no page

## Tokens & theming

- **Colour:** `surface/section`, `surface/menu`, `border/default`, `foreground/primary`, `interactive/primary/{background, border}/default`, `interactive/ghost/background/{default, pressed}`, `interactive/ghost/border/default`, `interactive/neutral/border/default`.
- **Dimension:** `space/{none, xs, sm, md, lg, xl, card}`, `control/{sm, lg, target-min}`, `radius/{none, sm, element-sm}`, `stroke/{base, thin}`.
- **Typography:** `label/medium`.
- **Motion (owner decision, not bound in Figma):** `animations/spring`, for the Caret Indicator rotation.
- **Glyphs:** `add-circle-outline`, `left-panel-open`, `left-panel-close`, `settings`, `zebra`, `verified`, `arrow-back`, `star`, `expand-more`, `expand-less`, `chevron-right`.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact).
- **Extensions** (tokens/manifest.json, new since the last extraction): companion (palette), target (primitives, palette), condensed (typography, size). The rail binds names only, so it themes under them unchanged; condensed can move the measured widths.

All 26 bound token names, plus `animations/spring`, resolve in `tokens/` and all 11 glyphs are in the font (none retired). The two item specs list their own tokens.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | "The rail has no interaction states of its own. Selection, hover, press and disabled all live on the Navigation Rail Item and Sub Menu Item instances inside the slots, so the container never changes appearance." |

- **Motion**: "Figma stores no timing and the rail models no transition. Moving between the narrow and wide rail is a variant switch, an authoring choice rather than something that animates here."
- **Width change**: "Expanded and Show Sub menu both change the component's overall width. Whatever sits beside the rail has to absorb the difference, so plan the page for every width you intend to ship."
- **Vertical fill**: "The menu list takes whatever height is left between the header block and the footer, so the footer stays pinned to the bottom however many items sit above it."

## Content & slots

- **Menu Slot** (slot, holds Navigation Rail Item): "Additional destinations below the three built-in rail items. It ships holding a Divider and three items. See the Navigation Rail Item Metadata frame. Its content is stored separately for each Label setting, so switching Label leaves the content behind."
- **Footer Slot** (slot, holds Navigation Rail Item): "Destinations pinned to the bottom, above the two fixed footer items. It ships holding a Divider and three items, and the same content is shared by every variant."
- **Sub Menu Slot** (slot, holds Sub Menu Item and Collapsible Menu Item): "The second-level list inside the panel. It ships holding one Collapsible Menu Item and four Sub Menu Items, and its content is shared by every variant. See the Sub Menu Item Metadata frame."
- **Sub Menu Header** (exposed nested instance): "The panel's title bar, carrying a back affordance, an editable title and a trailing slot of its own holding a Button. The rail leaves the instance exposed, so all of that is reachable without detaching. The shape of all sub elements are inherited from the main rail component."
- **Header and header action** (fixed nested instances): "The header is a Navigation Header showing an avatar. The action below it is an Icon Button in the narrow rail and a Button in the wide one. Neither is a slot, so changing them means overriding the nested instance."

## Usage

**Do**
- Fill the Menu Slot and Footer Slot with Navigation Rail Item instances and let the rail handle the spacing and alignment.
- Keep the toggle item visible unless something outside the rail controls Expanded, since it is the only control a user has over the rail's width.

**Don't**
- Don't place Menu Slot content and then switch Label. The two Label settings hold that slot's content separately, so the content will not come with you.
- Don't lean on Label to make destinations readable. The caption sits inside the narrow column and only the shortest words fit, Expanded is the setting that gives labels room.

## Accessibility

- The rail is a container and announces nothing itself. The destinations inside carry the meaning, so each needs a clear name even when only its glyph shows.
- Collapsed, destinations are glyph-only unless Label is on. An icon is not a name, so the accessible name has to come from code.
- Exactly one destination should read as selected across the rail and the panel together, and nothing in the component enforces that.
- The panel is separated from the rail by a single border on its leading edge. Check that border/default reads against surface/section, because nothing else marks the boundary.
- The toggle item is the only way a user changes the rail's width. Hiding it without providing another control strands anyone who needs the labels.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Hug | "312px collapsed and 440px expanded. That is the icon rail at 72px or 200px, plus the sub menu panel at a fixed 240px in both." |
| Height | Fill | "Fills its parent, drawn at 991px. The icon rail and the panel both fill it, and the menu list absorbs the space left between the header block and the footer." |
| Rail padding | Fixed | "12px on all four sides of the icon rail, space/md left and right and space/card top and bottom, with a 12px (space/md) gap between the header, the action, the menu list and the footer." |
| Item spacing | Fixed | "4px (space/xs) between items in both the menu list and the footer. The Menu Slot adds 4px (space/xs) of horizontal padding of its own." |
| Panel padding | Fixed | "The Sub Menu Slot insets its rows by 8px (space/sm) on all four sides, with a 4px (space/xs) gap between them." |
| Border | Fixed | "A single 1px border on border/default down the leading edge of the sub menu panel, plus a 1px bottom border on the same token under the Sub Menu Header. Nothing else in the component is stroked." |
| Fill | Theming | "The component sits on surface/section. Neither the icon rail nor the panel paints a fill of its own, so both show that surface through." |
| Colour | Theming | "The rail binds only its surface and its two borders. Every other colour comes from the items in the slots." |

## Owner decisions

- Carets and chevrons rotate one glyph with animation rather than swapping glyphs (Caret Indicator, and through it Sub Menu Item and Collapsible Menu Item). Figma still swaps.
- Motion that matches Switch uses the `animations/spring` token (`--animations-spring`). It applies to the caret rotation. Figma models no motion on this page.
- **Locked to dark mode by default; `inverse` locks it to light.** Code-only: the rail's root carries the token layer's `mode-dark` (or `mode-light`) class, so everything inside follows the rail and `.ext-*` brands still apply..
- **Shape reaches every nested component.** Slot items, Collapsible Menu Item, the header action, and the Buttons and Icon Buttons inside Navigation Header and Sub Menu Header, including the back button. Figma draws the header buttons sharp and the header action rounded; the decision overrides both. The rail itself is unaffected.
- **Shape tokens: rounded = `radius/sm`, sharp = `radius/none`.** Figma rebinds placed items to `radius/element-sm` (the same value today); code keeps the item sets' own `radius/sm`.

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3182-237) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54061) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4762-6539)
- Variants: [narrow](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4654-10599) · [narrow + label](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54097) · [wide](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54121)
- Subcomponents: [Navigation Header](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54312) · [Sub Menu Header](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54332) ([sub page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54340)) · [Caret Indicator](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54347) · [Collapsible Menu Item, open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54360)

## Issues

**Warn**
- **Unwired Show Header.** It is bound to nothing, so the header always shows, and the metadata doesn't mention it.
- **Sub Menu Slot prefers an orphan.** Its preferred instance is Sub Menu Item set 3404:28070 (key e97045ae…). That is an older 4-variant copy on no page; the live set is 3453:54275. Collapsible Menu Item's closed variant still holds four of its instances in the hidden slot.
- **Menu and Footer Slots prefer an unknown set.** They prefer Divider plus key a93b5504…. That key is neither this page's Navigation Rail Item nor Tab Bar's, and a library search doesn't find it.
- **Unbound border widths.** The panel's left border and the Sub Menu Header's bottom border are raw 1Px strokes, though their colour is `border/default`. Use `stroke/thin` in code.
- **Sub Menu Header, Type=sub page.** Show Leading Icon is not wired in this variant, so the back button cannot be hidden. The back arrow is now an Icon Button, but it still has no visibility binding.
- **Height.** The metadata says the rail fills its height, but the set is drawn fixed at 991Px. Build it to fill.
- **Menu Slot padding.** The metadata says the Menu Slot adds `space/xs` of horizontal padding. That is true only in the narrow variants; the wide one uses `space/none`.
- **Double alpha.** Collapsible Menu Item's open header, and the item scrims, add a paint opacity on top of an already-translucent ghost token. Use the token alone in code.
- **Dev Deviation frame.** It records that code "only supports the collapsed, icon-only rail layout (fixed 64px width)" and that the Menu and Footer Slots are not implemented in code. Figma's narrow rail is 72Px.
- **Behaviour code must own.** Nothing wires the toggle item to `expanded`, and nothing enforces a single selected destination.

**Note**
- **Shape (resolved by owner decision).** Rounded = `radius/sm`, sharp = `radius/none`, and it reaches every nested component, including the header action and the header buttons that Figma still draws sharp. Figma's sharp description is still copied from More Rail Items and needs fixing in Figma; the behaviour does not.
- **Radius rebound in the rail (resolved).** Placed items rebind to `radius/element-sm` while the item sets use `radius/sm`; same value today. Code follows the rail's shape with the item sets' own `radius/sm` for rounded.
- `Menu Slot#3200:20` is an orphan, and the per-Label Menu Slots are a Figma workaround.
- Label=true with Expanded=true is not built.
- Unbound gaps of 10 on Navigation Header (collapsed) and Caret Indicator have only one child each, so they never render.
- The header type and the Sub Menu Header type are swap-only from the rail.
- An open Collapsible Menu Item puts its header in State=active, so an open group reads as pressed. It also turns its caret vertical.
- Four subcomponents have no metadata and no descriptions, and nothing on the page models focus.
- The page has some extras:
  - A stray "Navigation Rail" frame (5547:2915) holds a detached copy of the panel.
  - The Template frame's card carries Dropdown copy.
  - Three Template instances point at an old "Navigation Rail/false/false" component.
- Caret Indicator still swaps glyphs in Figma. The owner decision to rotate one glyph on `animations/spring` stands.
- `tokens/manifest.json` now lists extension collections (companion, target, condensed). The condensed size and typography overrides can move the measured widths recorded here.
- The Tab Bar page has a different component also called "Navigation Rail Item" (3635:1151). See [navigation-rail-item duplicateCheck](../navigation-rail-item/navigation-rail-item.spec.md#duplicate-check-tab-bar).
