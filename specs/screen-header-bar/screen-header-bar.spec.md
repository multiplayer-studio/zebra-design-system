# Screen Header Bar

The bar at the top of a screen, carrying a back affordance, the screen's title and one action. It holds a single slot on the right, so it suits a screen with exactly one primary action rather than a toolbar of several. Reach for Top App Bar when the screen needs more than one action or a different leading control.

Source: [Screen Header Bar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5712-290) · set `5712:3566` · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `title` | string | — | `Add Subscribers` | title |
| `showLeadingIcon` | boolean | true, false | `true` | leadingIcon |
| `rounded` | enum | true, false | `true` | variant (actionSlot Button shape only) |
| `actionSlot` | slot | preferred: Button, Icon Button (not enforced, no min/max) | one primary Button | actionSlot |

**title**: "The screen's name, and the thing a reader orients by. Name the screen rather than the task in progress, because the bar does not change as someone works and a title implying progress goes stale the moment they act."

**showLeadingIcon**: true: "Show the back affordance. Leave it on for any screen pushed on top of another, which is the case this bar is drawn for." · false: "Drop it on a root screen with nowhere to go back to. The heading takes the reclaimed space, so nothing else needs adjusting."

**rounded**: true: "Despite the name this does not round the bar. It sets the contour of the action button in the slot, so pick the value matching the buttons used elsewhere on the screen." · false: "The sharp pairing for that same button. It reaches only the button shipped in the slot, so replacing the slot content drops the connection entirely."

**actionSlot**: "Holds the trailing action and hugs whatever is placed in it. It ships a Button at Size=medium and Flavour=primary. Nothing limits it to one control, so a crowded slot is possible and is the thing to watch."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Leading icon**: an Icon Button pinned to size medium, shape sharp, flavour subtle, glyph `chevron-left`. In Figma it is an exposed nested instance (its Icon is exposed too), so the glyph and the button's props can be changed per instance. The metadata says otherwise; see issues. Whether these become props in code is the implementer's call.

**Content inputs**: `title` (sample "Add Subscribers"); `actionSlot` children (sample: one primary Button labelled "Button").

## Anatomy

Root: horizontal, gap `space/xs`, padding top/right/bottom `space/md`, left `space/sm`; items start-packed, centred on the cross axis. Width fixed, height hugs (474×64Px measured). Fill `interactive/ghost/background/default` at paint opacity zero (transparent); no border, no shadow, no radius.

1. **Leading icon**: Icon Button ([specs/icon-button](../icon-button/)) at size medium, shape sharp, flavour subtle, square `control/md`. Glyph `chevron-left`, rounded family, Icon Size=medium, colour `currentColor`. Visible when `showLeadingIcon`. Instance overrides seen: border `interactive/neutral/border/default` @ `stroke/base`, padding `space/xs`, radius `radius/none`. "The back chevron, present when Show Leading Icon is on. A locked Icon instance with only its visibility exposed."
2. **Heading content**: vertical, gap `space/2xs`, no padding, fills horizontally, hugs vertically. Holds a title row (horizontal, gap `space/xs`, hug) with the title text: `title/large` in `foreground/primary`, left-aligned, auto width, no truncation. "The title wrapper. It fills the space between the icon and the slot, which is what holds the action hard right."
3. **Action slot**: horizontal, gap `space/xs`, centred, hugs. Default content: Button ([specs/button](../button/)) size medium, flavour primary, shape per `rounded`, label "Button", no icons. "The trailing region a consumer fills. It hugs its content, so the heading absorbs whatever width is left."

## Variants

| rounded | slot Button shape | slot Button radius | leading Icon Button shape |
|---|---|---|---|
| true (default) | rounded | `radius/element-sm` | sharp |
| false | sharp | `radius/none` | sharp |

Nothing else differs between the two variants.

## Subcomponents

None on the page. Dependencies on already-specced components:

| Component | Figma id | Spec | Used as |
|---|---|---|---|
| Icon Button | `2338:1763` | [specs/icon-button](../icon-button/) | leadingIcon; preferred actionSlot value |
| Button | `2060:15072` | [specs/button](../button/) | actionSlot default; preferred actionSlot value |
| Icon | `2046:15010` | [specs/icon](../icon/) | inside leadingIcon (Size=medium, Name=Chevron Left) |

## Related pages (not specced)

- **Top App Bar** (`3116:1217`, 12 variants): Page Title (text, "Title"), Contextual Control Slot, Trailing Slot, Type (default | centered | contextual | contextual alt | search | extended), Shape (rounded | sharp, default sharp). Same screen-level role with more layouts. Screen Header Bar is effectively a single-action preset of it, with a differently named shape axis.
- **Global Header** (`2356:5644`, 2 variants, plus `_Brand Logo Horizontal`, `_User Profile`): AppSwitcher, SearchBar, Dividers, ActionMenu, MenuItems, Show Platform Name, Show Logo (booleans), PlatformName (text), Slot-Menu-Items, Slot-Menu-Actions, Slot Logo (slots), Rounded (true | false). This is the platform-level header and doesn't meaningfully overlap.

## Tokens & theming

- **Color**: `interactive/ghost/background/default`, `foreground/primary`; nested: `interactive/neutral/border/default`, `interactive/primary/background/default`, `interactive/primary/border/default`
- **Dimension**: `space/2xs`, `space/xs`, `space/sm`, `space/md`, `space/none`, `control/md`, `radius/none`, `radius/element-sm`, `stroke/base`
- **Typography**: `title/large` (font size / family / weight / line height / letter spacing variables)
- **Glyphs**: `chevron-left`
- **Theme axes**: palette (Light, Dark) · size (Desktop, Mobile, Tablet, Desktop Compact) · typography (Desktop, Tablet, Mobile, Desktop Compact)

All 20 names resolve in `tokens/base/`. `chevron-left` is in `packages/icons/codepoints.json` and is not retired.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The set declares no hover, focus, pressed or disabled axis. The two variants render identically apart from the corners of the action button. |
| Leading icon | Show Leading Icon toggled off | — | The back affordance is removed and the heading absorbs the 28px it occupied. Nothing else moves, because the bar's width is fixed. |

| Type | Description |
|---|---|
| Motion | Figma stores no timing and no transition is authored. Nothing in the set changes over time. |
| Navigation | The leading chevron is a locked Icon instance with no state of its own. What it does on activation, and whether it is reachable at all, belongs to the implementation. |
| Reach of Rounded | Rounded is a variant on this set rather than a property passed down, so it restyles the shipped action button and nothing else. Slot content put there later will not follow it. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Title | text property | Plain text set per instance, defaulting to Add Subscribers. The heading wrapper is built with a gap for a second line, but no subtitle property exists to fill it. |
| Action Slot | slot, one Button as shipped | Holds the trailing action and hugs whatever is placed in it. It ships a Button at Size=medium and Flavour=primary. Nothing limits it to one control, so a crowded slot is possible and is the thing to watch. |
| Leading icon | fixed nested Icon, toggled by Show Leading Icon | An Icon at Size=medium swapped to Chevron Left. Only its visibility is surfaced, so the glyph cannot be changed from an instance without detaching. |

## Usage

**Do**
- Use it as the top bar of a pushed screen, with the back chevron on and a single action on the right.
- Match Rounded to the buttons used elsewhere on the screen. It exists to keep the action button consistent, not to shape the bar.

**Don't**
- Don't put more than one control in the Action Slot. It will hug them, but the bar was drawn around a single action.
- Don't assume the bar stretches to the screen. It ships at a fixed width, so it has to be set to fill wherever it is placed.

## Accessibility

- The leading chevron is a locked icon with no label and no state. It needs an accessible name and a keyboard path, neither of which is modelled here.
- No focus state exists anywhere in the set, so focus order and a visible focus ring both have to come from code.
- The title uses title/large at 20px. It names the screen, so it should map to a real heading in the markup rather than being styled text.
- The bar's fill is interactive/ghost/background/default, an interactive token on a static container. Check it against the screen behind it and against the action button sitting on it.
- Turning the leading icon off removes the only back affordance. On a pushed screen something else then has to provide one.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 474 wide and 56 tall in both variants. The width is fixed rather than filling, so a placed instance will not stretch to its container on its own. |
| Padding and gap | Fixed | space/sm top and bottom, space/lg left and right, with a space/sm gap between the icon, the heading and the slot. |
| Alignment | Fixed | Horizontal auto-layout, items centred on the cross axis and packed from the start. The heading fills, which pushes the slot hard right. |
| Radius | None | Zero on both variants with no token bound. The Rounded axis does not touch it. |
| Fill | Theming | interactive/ghost/background/default, an interactive token on a static container. No border and no shadow. |
| Title | Theming | title/large, IBM Plex Sans Medium 20 over a 24px line, in foreground/primary. This style resolves to a remote library rather than a local one. |
| Leading icon | Fixed | Icon at Size=medium, 20 square. Hiding it returns 28px to the heading, the icon plus one gap. |

## Issues

**Warn**
- **Leading icon (metadata vs extracted)**: The metadata calls it a locked Icon at Size=medium, 20 square, with no state. It is actually an Icon Button (medium, sharp, subtle) sized `control/md` with `space/xs` padding, wrapping that Icon. That makes it a control with its own state axis, about twice the size the metadata states.
- **Exposed instance**: The metadata says only visibility is surfaced. Leading Icon is an exposed nested instance and its Icon is exposed too, so the glyph and button props are editable per instance.
- **Size**: The metadata says "56 tall". Measured height is 64Px (`space/md` top and bottom around `control/md` controls). Width matches.
- **Padding & gap**: The metadata says `space/sm` top/bottom, `space/lg` left/right, `space/sm` gap. Bound: top/right/bottom `space/md`, left `space/sm`, gap `space/xs`. `space/lg` is unused.
- **Reclaimed width**: The metadata says hiding the icon returns 28px. It returns `control/md` plus the `space/xs` gap.
- **Remote variables**: The root fill, `foreground/primary`, `space/2xs`, `space/xs` on the heading, title row and slot, and all five `title/large/*` font variables are bound to remote library copies of same-named variables. Every name resolves in `tokens/`, so code is unaffected. The Figma file should be relinked to its local variables.

**Note**
- The metadata says the title style "resolves to a remote library". The `title/large` text style is local; only the variables bound on the title node are remote.
- The root fill (and the Icon Button's fill override) has paint opacity zero, so the bar is transparent whatever `interactive/ghost/background/default` resolves to.
- `rounded` reaches only the slot Button; the leading Icon Button stays sharp in both variants, so `rounded=true` pairs a rounded action with a sharp back button.
- Action Slot is missing from the Property Breakdown table; it appears only under Content & Slot. The other defaults match Figma.
- The slot is a native SLOT property with Button and Icon Button as preferred values. Preferred-only is off and it has no min/max, so "one action" is guidance only.
- The heading wrapper (`space/2xs`) and title row (`space/xs`) have gaps but only a single child each; no subtitle property exists.
- The root width is fixed (474Px measured). Usage says to set it to fill; implement it as the full width of its container.
- It overlaps Top App Bar, which covers the same role with more layouts. Global Header does not overlap.
- The set has no description. No interactive states or motion exist, by design. The back button's activation and accessible name are left to code.
