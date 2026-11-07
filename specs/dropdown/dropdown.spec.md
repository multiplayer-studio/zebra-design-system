# Dropdown

A pattern rather than a component, pairing a trigger with a Dropdown Menu and placing the menu relative to it. Open shows or hides the menu, Position picks which side it opens on and Align pins which edges line up. The menu is positioned absolutely and sits outside the template's bounds, so a layout only reserves the trigger's space. This is a condensed record, the panel and its rows are documented in their own frames.

Source: [Dropdown page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-5903) · extracted 2026-09-23

> The page holds three sibling public component sets rather than one master matching the page name: **Template/Dropdown** (the positioning pattern, treated here as the master — see issues), **Menu Item**, and **Dropdown Menu**. Template/Dropdown composes the other two plus an external Button trigger.

## API — Dropdown Template

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `open` | enum | false, true | `false` | variant |
| `position` | enum | bottom, top, right, left | `bottom` | variant |
| `align` | enum | left, right, bottom, top | `left` | variant |
| `triggerComponent` | slot (instance swap) | Button, Icon Button (preferred) | Button (Size=small, Shape=rounded, Flavor=primary, State=default, Disabled=false) | root/Trigger Component/Button |
| `triggerSlot` | slot | — | — | *undocumented — see issues* |

**open** — false: "The resting state, trigger only. The menu is still present but hidden, so anything placed in it is kept." · true: "Reveals the menu. Only one closed variant is built, so Position and Align have no effect until Open is true."

**position** — bottom: "Opens below the trigger. The default, and the right choice unless the trigger sits low in the viewport." · top: "Opens above the trigger, for a trigger near the bottom of the view." · right: "Opens to the trailing side, for a trigger in a narrow column or a side rail." · left: "Opens to the leading side, for a trigger near the trailing edge of the view."

**align** — left: "With Position bottom or top, lines the menu's leading edge up with the trigger's." · right: "With Position bottom or top, lines the trailing edges up instead, for a trigger near the trailing edge." · top: "With Position left or right, lines the top edges up. It has no effect while Position is bottom or top." · bottom: "With Position left or right, lines the bottom edges up. It has no effect while Position is bottom or top."

**triggerComponent** — "The control the menu opens from. Button and Icon Button are the suggested options, and the instance stays exposed so the trigger's own label and flavour remain editable."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside `gaps`/`issues`.

## Anatomy — Dropdown Template

- **root** — container, vertical, gap 10px (raw, unused — single child). Hug/hug.
- **triggerComponent** — wrapper, hug/hug, `minWidth: control/sm`.
  - **button** — instance of Button (external), variant `Size=small, Shape=rounded, Flavor=primary, State=default, Disabled=false`, swappable via `triggerComponent`.
  - **dropdownMenu** — instance of Dropdown Menu, pinned `Rounded=true`, visible only when `open`, absolutely positioned; anchor depends on `position` + `align` (see Variants).

## Variants — Dropdown Template

Axis: `position` + `align`, only meaningful when `open=true`. Trigger box is a measured 76×36px; menu box is a measured 213×196px; the offset between them is a fixed 8px (not a spacing token in Figma).

| Position | Align | Anchor | Offset X | Offset Y |
|---|---|---|---|---|
| bottom | left | top-left of trigger | 0 | 44 |
| bottom | right | top-right of trigger | -137 | 44 |
| top | left | bottom-left of trigger | 0 | -214 |
| top | right | bottom-right of trigger | -137 | -204 |
| right | top | top-left, offset right | 84 | 0 |
| right | bottom | bottom-left, offset right | 84 | -160 |
| left | top | top-left, offset left | -221 | 0 |
| left | bottom | bottom-left, offset left | -221 | -160 |

## Subcomponents

### Dropdown Menu

The surface a dropdown opens onto, a floating panel holding a list of Menu Item rows. It brings its own menu surface and elevation, so it needs nothing behind it. Two built-in rows sit above a slot that takes the rest. Rounded sets the corner treatment and Compact tightens the inset for a menu with little room to spare. Place it through the Dropdown Template so its position relative to a trigger comes from a property rather than from nudging it by hand.

**API**

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `rounded` | enum | false, true | `false` | variant |
| `compact` | enum | false, true | `false` | variant |
| `moreItems` | boolean | — | `true` | Content/Slot Container (visible) |
| `slotContainer` | slot (default variant apart from the other three) | holds Menu Item | ships with 2 | Content/Slot Container |

- **rounded** — false: "Square corners, for a panel sitting against surfaces and inputs that are also square. The rows inside square off with it." · true: "Softened corners, for a panel that should read as a floating object rather than part of the surface beneath. The rows round with it, so panel and contents stay in agreement."
- **compact** — false: "The default inset. Use it unless the menu has to fit a rail that cannot spare the room." · true: "Tightens the inset for a cramped rail. A long list then reads as one dense block."
- **moreItems** — true: "Shows the slot below the two built-in rows, which is where the rest of the menu goes." · false: "Hides the slot along with everything placed in it, leaving only the two built-in rows. Fine for a deliberately short menu, but it will also hide content someone else added."
- **slotContainer** — "Where the rest of the menu goes, below the two built-in rows. It takes two Menu Item instances by default. Figma only: the default variant stores its slot content separately from the other three, so content placed there does not carry when Rounded or Compact changes."

**Anatomy**

1. **Panel** (root) — "The outer frame. Hugs its content on both axes and carries the menu surface, the radius and the elevation." Fill `surface/overlay`, radius `radius/none`→`radius/element-md`, effect style `Shadow/medium`. Padding `space/card`, `space/xs` when compact.
2. **Content** — "The vertical stack inside the padding, holding the two built-in rows and then the slot." Gap `space/2xs`.
3. **Built-in rows ×2** — fixed Menu Item instances, pinned to the panel's own Rounded.
4. **Slot Container** — "The open region for additional Menu Item rows. More Items hides it as a whole, along with anything inside it." Ships holding 2 Menu Item instances by default.

**Variants** (axes: `rounded` × `compact`, independent)

| rounded | compact | panel.radius | panel.padding | panel.gap | row.radius | sizePx (4 rows) |
|---|---|---|---|---|---|---|
| false | false | radius/none | space/card | space/3xs | radius/none | 213×196 |
| true | false | radius/element-md | space/card | space/3xs | radius/sm | 213×196 |
| false | true | radius/none | space/xs | space/none | radius/none | 201×184 |
| true | true | radius/element-md | space/xs | space/none | radius/sm | 201×184 |

**States** — Static: "The panel has no interaction states of its own. Hover, selection, focus and disabled all live on the Menu Item rows inside it, so the menu never changes appearance on its own."

**Behavior** — Motion: no timing/transition modelled, driven entirely by the template's Open variant. Elevation: Shadow/medium is fixed and unchanging. Reflow: both axes hug content. **Rounded propagation** (implementation addition): every nested Menu Item row's `rounded` defaults to the panel's own `rounded`, codifying Menu Item's own "match the panel" guidance as an enforced default rather than a convention.

**Usage** — Do: place through the Dropdown Template; keep Rounded consistent with surrounding surfaces. Don't: fill the slot then switch Rounded (content is stored per-variant and won't follow); don't add a background/shadow behind the menu (it already carries its own).

**Accessibility** — Panel announces nothing itself; rows carry the meaning. Elevation is the only separation from the surface behind — check contrast. Panel neither traps focus nor caps height. Keyboard movement between rows must be built in code.

**Layout & theming** — 213×196px hug (201×184px compact); padding space/card all sides, space/xs compact; gap space/2xs between rows; radius per Rounded; Shadow/medium fixed; colour `surface/overlay` only — everything else comes from the rows.

### Menu Item

A single row inside a Dropdown Menu, with a leading element, a label and an optional trailing icon. Six states cover resting, hover, selection, focus and disabled, and Type chooses what sits in the leading position. The row fills the width of the menu that holds it, so its own width is never set directly. Selection is a light brand tint behind the row.

**API**

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `state` | enum | Default, hover, selected, focus, selected focus, disabled | `Default` | variant |
| `type` | enum | Icon, checkbox, radio, custom | `Icon` | variant |
| `rounded` | enum | false, true | `false` | variant |
| `label` | string | — | `"Menu Item"` | Label/Label (characters) |
| `leadingElement` | boolean | — | `true` | Leading Icon / Leading Slot (visible) |
| `trailingIcon` | boolean | — | `false` | Trailing Icon (visible) |
| `leadingSlot` | slot | — | — | Leading Slot (custom type only) |

- **state** — Default: "The resting row." hover: "Documents the pointer-over treatment. The implementation drives this, so choosing it in a layout freezes the row in a state it should not be in." selected: "The row's option is currently chosen. It shows a light brand tint behind the row, with the label and leading element unchanged." focus: "Keyboard focus, drawn as a ring on all four edges with the background left alone. It is the only state that adds a border, which is what keeps it tellable apart from selected." selected focus: "Both at once, for a keyboard user moving across an already-chosen option. Without it the two would be indistinguishable, which is the reason it exists." disabled: "The option is unavailable. Only the label changes, so the difference between available and unavailable rests on contrast alone."
- **type** — Icon: "A leading Icon instance you set yourself. The glyph is exposed, so the row is configured from the menu without detaching." radio: "Names the row as a single-choice option. The leading element is a real Radio Button at Size=medium with no label, which shows the row's choice." checkbox: "Names the row as a multi-choice option. The leading element is a real Checkbox at Size=medium with no label, which shows the row's choice." custom: "Replaces the leading Icon with an empty slot, for a leading element the icon library cannot supply such as an avatar or a colour swatch. Nothing is provided by default, so the slot stays blank until filled."
- **rounded** — false: "Square corners, for a row inside a square menu panel. Match the panel rather than choosing per row." true: "Softened corners, for a rounded panel. Mixing the two inside one menu makes the rows look misaligned against the panel." *Implementation note: this is enforced, not just documented — a Menu Item nested inside a Dropdown Menu inherits the panel's `rounded` by default; pass an explicit `rounded` only to override it standalone.*
- **label** — "The option's name. The row fills the menu's width and the text neither wraps nor truncates, so a long label widens the entire menu."
- **leadingElement** — true: "Shows the leading element: the Icon, the Checkbox or Radio Button, or the slot." false: "Hides it and the label shifts to the leading edge. A menu mixing rows with and without it loses the alignment that makes a list scannable."
- **trailingIcon** — true: "Adds an icon at the trailing edge, for a submenu arrow or an external-link mark. The label already reserves room on that side, so it takes space from the text."
- **leadingSlot** — "Replaces the leading Icon when Type is custom. It carries no suggested components and ships empty, so it stays blank until something is placed in it."

**Internal variations** — Type Icon leads with an exposed Icon (Size=small, Framed=false), default glyph `verified`. Checkbox and radio lead with a real Checkbox or Radio Button (Size=medium, hasLabel=false), 40px with its touch target. Custom leads with the slot.

**Anatomy**

1. **Row** (root) — "The outer horizontal frame. Fills the width of the menu that holds it and keeps a fixed height, so rows line up whatever they contain." Fill `interactive/ghost/background/<state>`, gap `space/sm`, padding `space/2xs` / `space/md`.
2. **Leading element** — "An exposed Icon for the Icon type, a real Checkbox or Radio Button for those types, and an empty slot for custom." The control should be checked when the row is selected, and disabled with the row.
3. **Label** — "A wrapper frame holding the text. Its own padding sets the text away from the leading element and reserves room on the trailing side." Text style `label/medium`, colour `interactive/neutral/foreground/default` (→ `.../disabled`).
4. **Trailing Icon** — "An exposed Icon at the trailing edge, hidden until its toggle is turned on."

**Variants** (axis: `state`). Type changes the row gap and leading padding: `space/sm` and `space/md` for Icon and custom, `space/none` and `space/none` for checkbox and radio.

| state | rounded | root.fill | root.stroke | root.radius | label.color |
|---|---|---|---|---|---|
| Default | false | interactive/ghost/background/default | none | radius/none | — |
| hover | false | interactive/ghost/background/hover | none | radius/none | — |
| selected | false | interactive/ghost/background/selected | none | radius/none | foreground/primary |
| focus | false | interactive/ghost/background/focused | border/focus, 1px | radius/none | — |
| selected focus | false | interactive/ghost/background/selected | border/focus, 1px | radius/none | — |
| disabled | false | interactive/ghost/background/disabled | none | radius/none | interactive/neutral/foreground/disabled |
| Default | true | interactive/ghost/background/default | none | radius/sm | — |
| hover | true | interactive/ghost/background/hover | none | radius/sm | — |
| selected | true | interactive/ghost/background/selected | none | radius/sm | foreground/primary |
| focus | true | interactive/ghost/background/focused | border/focus, 1px | radius/sm | — |
| selected focus | true | interactive/ghost/background/selected | border/focus, 1px | radius/sm | — |
| disabled | true | interactive/ghost/background/disabled | none | radius/sm | interactive/neutral/foreground/disabled |

**States** — see per-value intent above; each row states the trigger and what changes (colour/opacity only, no motion).

**Behavior** — Click target: the whole row. Clicking anywhere on a checkbox row toggles it; on a radio row it selects it and clears the other radio rows. Motion: none, colour/opacity only. Focus ring: drawn inside the row's bounds. Reflow: row fills menu width, fixed height — a long label reflows the menu, not the row.

**Content & slots** — Label (text prop, no truncation/wrap). Leading Icon (exposed nested Icon, Type Icon — ships holding Verified). Leading control (Checkbox or Radio Button, Size=medium, no label, Types checkbox and radio). Leading Slot (Type custom only, empty by default). Trailing Icon (exposed nested Icon, hidden until toggled).

**Usage** — Do: set the leading glyph on every Icon row (default is Verified and means nothing); match Rounded to the panel. Don't: use the Icon type for a choice (checkbox and radio draw the real control); don't rely on the 10% brand selected tint alone being obvious.

**Accessibility** — The 10% brand selection tint needs to be conveyed in code too. Focus ring is the only bordered state. Radio/checkbox rows draw the real control; the role is still set in code. Disabled is contrast-only. Icon decorates, doesn't replace, the label.

**Layout & theming** — Width fill (221px drawn); height fixed control/md; padding 4px/12px (space/2xs, space/md), leading space/none for checkbox and radio, which lines the control's box up with an Icon row's glyph; gap space/sm, space/none for checkbox and radio; label inset 4px/24px (space/2xs, space/xl); radius per Rounded; icons 16px @ Size=small, checkbox and radio controls 40px @ Size=medium; border 1px `border/focus` on focus states only; type `label/medium` (14/20, IBM Plex Sans Medium); colour from `interactive/ghost/*` + `interactive/neutral/foreground/*`, with `foreground/primary` on the selected label.

## External dependencies

- **Button** — used as the template's trigger. Already documented at `specs/button/`.
- **Checkbox** (`6384:207`) and **Radio Button** (`4294:3121`) — Menu Item's leading control for those types, Size=medium, no label. See `specs/checkbox/` and `specs/radio-button/`.
- **Icon** — used as Menu Item's leading/trailing glyph. Already documented at `specs/icon/`. Glyphs come from `packages/icons/codepoints.json`.

## Tokens & theming

**Colour**: `interactive/primary/background/default`, `interactive/primary/border/default`, `interactive/ghost/background/{default,hover,selected,focused,disabled}`, `interactive/neutral/foreground/{default,disabled}`, `border/focus`, `surface/overlay`, `shadow/soft`

**Dimension**: `control/{sm,md}`, `space/{none,2xs,xxs,sm,md,xl,card}`, `radius/{none,sm,element-sm,element-md}`, `stroke/{base,thin}`, `shadow/medium/{blur,x,y}`, `shadow/small/{blur,x,y}`

**Typography**: `label/medium/{font size,font family,font weight,line height,letter spacing}`

**Theme axes**: `palette` (Light, Dark), `size` (Desktop, Mobile, Tablet, Desktop Compact)

Source: `tokens/` (see `tokens/manifest.json`). All tokens above were confirmed present in the export.

## States, behavior & motion (Dropdown Template)

Open is a static variant, not a behaviour — showing/hiding the menu, returning focus to the trigger, and closing on escape all belong to the implementation. The menu can open off-screen near a viewport edge; flipping Position there is the implementation's job. The trigger needs an accessible name and an open/closed state, neither modelled here. Keyboard movement between rows is not modelled by this pattern.

**Rounded propagation** (implementation addition): the template pins `Rounded=true` on its nested Dropdown Menu, which in turn propagates its own `rounded` to every nested Menu Item row by default. A Dropdown built with `rounded=false` therefore rounds nothing anywhere in the stack without extra wiring; the default `rounded=true` rounds panel and rows together.

## Content & slots (Dropdown Template)

Trigger Component (instance swap, prefers Button/Icon Button) — swap through the property, stays exposed. Dropdown Menu (exposed nested instance, pinned Rounded=true) — its More Items toggle and slot are reachable from the template. Menu content goes into the nested menu's slot, not the template.

## Usage (do / don't)

No explicit "How to use" section on the Dropdown Template's own metadata frame (behavioral guidance is folded into Accessibility & Content Guidelines above).

## Accessibility (Dropdown Template)

Same four points as States/behavior above (the metadata frame repeats them under Accessibility & Content Guidelines).

## Layout & theming intents (Dropdown Template)

Bounds: hug the trigger only (76×36px); the open menu reserves no layout space. Offset: fixed 8px. Alignment: fixed per Align, pinning opposite edges. Fill and elevation: none on the template — both belong to the menu.

## Issues

- **warn** (structure) — Page "Dropdown" has no component set named exactly "Dropdown"; it holds three sibling public sets. Template/Dropdown was treated as master since it composes the other two — confirm this matches intent.
- **warn** (api-vs-metadata) — `Trigger Slot#2669:112` (SLOT) is exposed on Dropdown Template but undocumented anywhere in its metadata.
- **warn** (gaps) — Dropdown Template's root/Trigger Component frames carry a raw, untokened 10px item-spacing (never renders — single child each).
- **warn** (bindingDrift) — Dropdown Menu's built-in Menu Item rows report `layoutSizingHorizontal=FIXED` in both Rounded=false variants and `FILL` in both Rounded=true variants, though the row is documented to always fill. Don't copy FIXED literally.
- **note** (extraction-limit) — Menu Item's 48-variant delta output exceeded the transport cap; the variants table here covers State×Rounded (the token-varying axis) reconstructed from confirmed data. Type=custom's exact node swap wasn't independently re-diffed — verify visually before implementing.
- **warn** (figma 2026-10-30) — Checkbox and radio rows keep the control at Checked=false in every state, selected included. Code checks it when the row is selected.
- **warn** (figma 2026-10-30) — Disabled checkbox rows disable the Checkbox; disabled radio rows leave the Radio Button enabled. Code disables both.
- **note** (figma 2026-10-30) — The 40px control overflows the 40px row's 4px padding. Code keeps the row at control/md and centres the control.
- **note** (icon-font) — Default leading/trailing glyph resolves to `verified` (rounded family), present and not retired in `packages/icons/codepoints.json`. Expect every real usage to override it.
- **note** (coverage) — Motion is explicitly absent for all three components per their own metadata, not a gap in extraction.
- **note** (spec-addition) — Rounded propagation (Dropdown → Dropdown Menu → Menu Item) is enforced structurally in both implementations, not just documented as usage guidance. This goes beyond what the Figma file itself binds — Menu Item instances inside Dropdown Menu are separately-set variants in Figma, not derived from the panel's Rounded via any binding — so a future re-extraction of the page will not show this rule in the raw API/deltas; it lives only in this spec's additions and in code.
- **note** (re-extraction 2026-10-28) — Dropdown Menu gained a Compact axis: padding space/xs and panel gap space/none when true, everything else unchanged.
- **note** (slot storage) — Dropdown Menu now has two slot properties across four variants: the default variant uses one, the other three share the second.
- **note** (figma 2026-10-30) — `interactive/ghost/background/selected` now aliases palette `status/ghost/tint`: brand main 60 at 10% in Light, brand main 30 at 10% in Dark. `tokens/` records the tint as the alias plus `aliasOpacity`, and CSS draws it with `color-mix`. The token is shared, so every ghost selected state changes with it.
- **note** (bindingDrift) — Menu Item selected binds its label to `foreground/primary`; selected focus keeps `interactive/neutral/foreground/default`. Both are ink/high, so nothing looks different.
