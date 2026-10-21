# Navigation Item

A single destination inside a Navigation Bar, shown as an icon above a label with an optional badge. It is the content the bar's slots are built around, and the bar sets nothing on it, so every property here is yours to set per instance. Selection is expressed with Active, and exactly one item in a bar should carry it.

Source: [Navigation Item set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2841-3535) on the Navigation Bar page · extracted 2026-10-20

This is a separate spec, not a subcomponent of [Navigation Bar](../navigation-bar/navigation-bar.spec.md), for three reasons:
- It is public.
- It has its own Navigation Item Metadata frame.
- The bar's metadata defers to that frame.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `active` | enum | false, true | `false` | variant |
| `disabled` | enum | false, true | `false` | variant (only with `active=false`) |
| `label` | string | — | `"Label"` | label |
| `showBadge` | boolean | true, false | `false` | badge |

**active**: false: "The resting destination, reading as available rather than chosen." · true: "Marks the destination the user is currently on. Exactly one item in a bar should carry it, and nothing in the component enforces that, so a bar with two active items or none is easy to ship."

**disabled**: false: "The destination can be selected." · true: "The destination is unavailable. Nothing on the item explains why, so if the reason matters it has to come from the surrounding context. Offered on inactive items."

**label**: "The destination's name, and the only text on the item. One or two words, because the item hugs its label and a long one makes that destination wider than the rest of the row."

**showBadge**: false: "No badge on the icon." · true: "Reveals a Notification Indicator over the icon's top-right corner, signalling that something is waiting. It sits outside the layout, so turning it on never changes the item's size or shifts its neighbours."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

- **Icon:** this is a swap-only exposed Icon instance, pinned to Size=medium with Framed off. Its default glyph is `star` (rounded family), a placeholder. In code it is a glyph name, so it is likely to become an `icon` prop. That is the implementer's call.
- **Badge:** this is an exposed Notification Indicator, pinned to Size=small (the dot). Its Value and Size remain reachable on the instance.

## Anatomy

1. **Item** (root): "The outer vertical frame. Hugs its label horizontally and holds a fixed height, so every item in a bar lines up regardless of label length." Vertical and centred, with gap `space/sm` and padding `space/sm` top and bottom, `space/lg` left and right. Sizing is hug × fixed (67×72Px measured). Its fill is `interactive/ghost/background/default` at paint opacity zero, so it renders nothing.
2. **Icon box**: "The 20px box holding the icon, and the anchor the badge is positioned against. It does not clip, which is what lets the badge overhang its corner." It holds:
   - **icon**: glyph `star`, rounded family, Icon Size=medium (the nested Icon's size, not a token here). Colour is currentColor, following the label.
   - **badge**: Notification Indicator Size=small ([specs/notification-indicator](../notification-indicator/notification-indicator.spec.md)), absolutely positioned at the icon box's top-right and overhanging it (offset 16,−4Px measured). Visible when `showBadge`.
3. **Label**: "The destination's name, sitting under the icon and taking the same colour as it in every state." Text style `Body/body small` (see issues), colour per variant, no wrapping and no truncation, hugs.

## Variants

| active | disabled | label colour | icon colour as drawn in Figma |
|---|---|---|---|
| false | false | `foreground/primary` | `foreground/primary` |
| true | false | `interactive/subtle/foreground/default` | `interactive/ghost/foreground/default` |
| false | true | `interactive/subtle/foreground/disabled` | `foreground/disabled` |

Build the icon on currentColor so it takes the label colour, as the metadata states. The Figma icon bindings disagree (see issues). `active=true, disabled=true` doesn't exist.

## Subcomponents

There are none on the page. The dependencies are:
- **Icon** (2046:15010). See [specs/icon](../icon/icon.spec.md).
- **Notification Indicator** (3719:6256, the Badges-page set). See [specs/notification-indicator](../notification-indicator/notification-indicator.spec.md). It is not the drifted copy on this page.

## Tokens & theming

- **Colour:** `interactive/ghost/background/default`, `foreground/primary`, `interactive/subtle/foreground/{default, disabled}`. `interactive/ghost/foreground/default` and `foreground/disabled` are bound on the icon vector only, and are superseded by currentColor in code.
- **Dimension:** `space/{sm, lg}`.
- **Typography:** `Body/body small`, a remote style that is not in the export. The local equivalent is `body/small`.
- **Glyphs:** `star`, which is in the font and not retired.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact). Extensions are in `tokens/extensions/`.

The 8 colour and dimension names resolve in `tokens/`. The 4 remote `type/body/small/*` variables don't.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | "Icon and label both sit on foreground/primary." |
| active | Active set to true | — | "Icon and label both move to interactive/subtle/foreground/default. Nothing else changes, there is no background, underline or indicator bar, so colour alone carries selection." |
| disabled | Disabled set to true | — | "Icon and label both move to interactive/subtle/foreground/disabled. Offered on inactive items." |
| badge shown | Show Badge set to true | — | "A Notification Indicator appears over the icon's top-right corner. It is absolutely positioned, so the item's footprint does not change." |
| hover and pressed | Not modelled | — | "The component has no hover or pressed variants. Any pointer feedback comes from the implementation rather than from here." |

- **Motion:** "Figma stores no timing and no transition is modelled. Moving between states is a colour change only, with no movement, scale or elevation."
- **Badge:** "The badge sits outside the layout flow, so showing or hiding it never reflows the item or the bar around it."
- **Reflow:** "The item re-hugs its label whenever the text changes, which shifts every item beside it in the bar."

## Content & slots

- **Label** (text property): "The destination's name. There is no truncation and no wrapping, the item simply grows."
- **Icon** (exposed nested Icon instance): "Navigation Item pins Icon to Size=medium with Framed off and leaves the instance exposed, so the glyph can be swapped per instance while the sizing stays consistent. See the Icon Metadata frame. It arrives holding Star, a placeholder rather than a real destination glyph."
- **Badge** (exposed nested Notification Indicator, toggled by Show Badge): "Navigation Item exposes only its visibility and pins it to Size=small, the dot with no number, where the Notification Indicator's own default is large. The instance stays exposed, so its Value and Size remain reachable. At this size the dot signals that something is there, not how much."

## Usage

**Do**
- Set exactly one item in a bar to Active. Selection is the item's job, and the bar does nothing to manage it.
- Swap the icon on every item. It ships holding a Star placeholder, which says nothing about where the destination goes.

**Don't**
- Don't use Show Badge to show a count. It is pinned to the small size, which is a dot with no readable number in it.
- Don't give items long labels. Each one hugs its own text, so a single long name makes that destination wider than everything beside it.

## Accessibility

- Selection is carried by colour alone. There is no underline, background or indicator bar, so the active destination has to be conveyed in code as well.
- The icon repeats the label rather than adding to it, so the label has to stand on its own.
- Disabled is visual only, and nothing on the item explains why a destination is unavailable.
- The badge is a dot with no number at the size this component pins, so whatever it signals needs a text equivalent.
- Icon and label move together between states, so they stay consistent with each other. Check interactive/subtle/foreground/disabled against the surface the bar sits on.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Hug | "Hugs the label, so an item is as wide as its text plus 16px (space/lg) of padding each side. Items in a row are not equal width unless their labels are." |
| Height | Fixed | "72px at every variant. This is what sets the Navigation Bar's height, because the bar hugs its content." |
| Padding | Fixed | "8px (space/sm) top and bottom, 16px (space/lg) left and right." |
| Gap | Fixed | "8px (space/sm) between the icon box and the label." |
| Icon | Fixed | "A 20px Icon at Size=medium with Framed off, sitting in a 20px box that does not clip its content." |
| Badge | Absolute | "An 8px Notification Indicator at Size=small, placed at 16,-4 against the 20px icon box so it overhangs the top-right corner. It is outside the layout flow." |
| Label type | Fixed | "Body/body small (14/20), IBM Plex Sans Regular." |
| Colour | Theming | "foreground/primary at rest, interactive/subtle/foreground/default when Active, interactive/subtle/foreground/disabled when Disabled. Icon and label take the same token in every state, and the item has no fill of its own." |

## Issues

**Warn**
- **The icon colour doesn't follow the label in Figma.** When active, the icon is `interactive/ghost/foreground/default`. When disabled, it is `foreground/disabled`. The metadata says it should match the label. Use currentColor in code and fix the bindings in Figma.
- **The label's typography is remote.** `Body/body small` and `type/body/small/{font-size, font-family, font-weight, line-height}` come from another library and are not in `tokens/`. Use the local `body/small`.
- **There are unbound values.** The fixed item height (72Px) is raw. The icon box carries a raw gap of 10 that has no effect.

**Note**
- The root has a transparent bound fill, although the metadata says "no fill".
- `active` × `disabled` has no active+disabled variant. Consider one state enum in code.
- No hover, pressed or focus states exist. Decide focus treatment in code.
- The badge is the Badges-page Notification Indicator, not this page's drifted copy.
- The badge offset is measured, not tokenised. In code, pin it to the icon's top-right.
- The set has no component description.
