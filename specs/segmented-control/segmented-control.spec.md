# Segmented Control

A row of mutually exclusive options sharing one track, where exactly one is active at a time. It ships with three segments, two placed directly and a third in a slot, so changing the count means working inside the instance. Use Tab Bar when the choice moves between views rather than switching a mode within one.

Source: [Segmented Control page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-658) · extracted 2026-11-25

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `shape` | enum | rounded, sharp, full | `rounded` | variant: track radius and every placed segment's Shape |
| `flavour` | enum | default, inverse | `default` | variant: track fill and border, and the active segment's Style |
| `moreItems` | slot | `_Segmented item` only | one segment (Item 3) | moreItemsSlot |

**shape**: rounded: "Match the contour of the surface the control sits on. It reaches the track and every segment placed inside it, so the whole control stays consistent without touching the items." · sharp: "The square-cornered pairing, for surfaces built from sharp controls." · full: "The pill-shaped pairing, for surfaces built from full-shaped controls."

**flavour** (not the segment's Flavour; it maps to the segment's Style, see issues): default: "Used for lighter emphasis on selected controls. Fill of the selected control subcomponent is a lighter surface on a darker grey surface parent." · inverse: "Used for stronger emphasis on selected controls. Fill of the selected control subcomponent is a darker surface on a lighter grey surface parent. The parent has a default-colored stroke on the border."

**moreItems**: "Holds segments beyond the first two. It hugs its content, so whatever is placed there sets how far the track extends. (Implementation makes use of the segment options)" Accepts `_Segmented item` only (preferred values only), no min or max children, not shown empty by default.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Segments.** The control exposes none of the segment's properties. Label, state (default, active, hover) and flavour (default, text only, icon only) are set inside each nested `_Segmented item`; its Shape follows `shape` and its Style follows `flavour`. The metadata now gives the production intent: "(Important! In production, the core can set base properties across elements)" and the slot "(Implementation makes use of the segment options)". So in code: an options list (label, optional glyph, value), one selected value, and shape, style and content flavour set once on the control. Sample: three options, Item 1 active; one must always be active.

## Anatomy

1. **Track** (root): horizontal, gap `space/2xs`, padding `space/2xs`, centred; hugs both axes (289×44Px measured with three segments, 280×46Px inverse). Fill `interactive/neutral/background/pressed`, no border (default) or `interactive/neutral/background/default` with a `border/default` border counted in the layout (inverse); no shadow; radius `radius/sm` (rounded), `radius/none` (sharp) or `radius/pill` (full). "The outer frame. A horizontal auto-layout hugging its segments, carrying the background and the corner radius."
2. **Fixed segments**: two `_Segmented item` instances (Item 1 active, Item 2 default, flavour default). "The first two segments, placed directly in the variant rather than in the slot."
3. **More items Slot**: horizontal, gap `space/2xs`, no padding, hugs; holds one `_Segmented item` (Item 3) as shipped. "The trailing region holding any further segments. It sits last in the row and hugs its content."

**Active indicator (intent only, not drawn).** The Motion row says the active background "is not tied to the segmented item but bound to the control, so it moves easily across items". On the canvas it is the active segment's own fill, `interactive/neutral/background/focused` (default) or `interactive/inverse/background/focused` (inverse), with the segment's radius. Build it as one control-level element that slides to the chosen segment.

## Variants

| shape | track radius | segments placed with | segment radius |
|---|---|---|---|
| rounded | `radius/sm` | Shape=rounded | `radius/sm` |
| sharp | `radius/none` | Shape=sharp | `radius/none` |
| full | `radius/pill` | Shape=full | `radius/pill` |

| flavour | track fill | track border | active fill | active label / icon |
|---|---|---|---|---|
| default | `interactive/neutral/background/pressed` | none | `interactive/neutral/background/focused` | `foreground/primary` |
| inverse | `interactive/neutral/background/default` | `border/default` | `interactive/inverse/background/focused` | `foreground/inverse` |

Nothing else changes. Segments added to the slot are not reached by `shape`: the sharp and full page examples hold slot segments at Shape=rounded (see issues).

**Page examples:** a rounded, icon only, four-segment control ([5757:740](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-740)), a sharp, text only, four-segment control labelled 1 to 4 ([5757:827](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-827)) and a full, icon only, four-segment control ([5757:853](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-853)); 5757:857 duplicates the sharp one.

## Subcomponent: _Segmented item (private)

"One option inside a Segmented Control, carrying a label, an icon, or both. It is private to that control, which places two directly and a third in a slot and exposes none of its properties, so every label and state is set by selecting into the nested instance."

### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `label` | string | — | `Item` |
| `shape` | enum | rounded, sharp, full | `rounded` |
| `state` | enum | default, active, hover | `default` |
| `flavour` | enum | default, text only, icon only | `default` |
| `style` | enum | default, inverse | `default` |

- **label**: "The option's name. Keep it to one or two words, because segments hug their labels and a single long option makes the whole row uneven."
- **shape**: rounded: "Follow the parent control rather than deciding here. Each Segmented Control variant already sets a matching value on the segments it places." · sharp: "The square-cornered pairing, used where the parent is sharp." · full: "The pill-shaped pairing, used where the parent is full-shaped as well."
- **state**: default: "An unchosen segment. Its label sits a step quieter than the others, which is what lets the chosen one stand out." · active: "The chosen segment. Exactly one in a control should carry it, and nothing in the set enforces that." · hover: "Pointer over an unchosen segment. It changes the label colour and adds no background, so the hover feedback is weaker here than on most controls in this system."
- **flavour**: default: "Icon and label together, despite the name suggesting the plainest case. Use it when the icons add recognition the words alone do not." · text only: "Labels alone, and the clearest choice whenever the options are not easily iconified." · icon only: "Icons alone, for a control tight on space. Nothing names the options on screen, so the icons have to be unambiguous and the names supplied another way."
- **style**: default: "The subcomponents for Segment control used within the default style parent component. Active pills have a light fill." · inverse: "The subcomponents for Segment control used within the inverse style parent component. Active pills have a inverse dark fill."

### Anatomy

1. **Segment** (root): horizontal, centred both ways; block padding `space/2xs`; hugs, min-height `control/sm`; radius `radius/sm` / `radius/none` / `radius/pill` by `shape`. "The component frame. A horizontal auto-layout hugging its content, and the surface that carries the fill on the chosen state."
2. **Icon**: glyph `star`, rounded family, Icon Size=small (16Px measured); colour is currentColor, following the label. Visible on default and icon only. "The leading glyph, present on the default and icon only flavours."
3. **Label**: text style `label/medium`, content from `label`. Visible on default and text only. "The option's name, present on the default and text only flavours."

### Flavour table

| flavour | parts | padding start | padding end | gap | measured width |
|---|---|---|---|---|---|
| default | icon + label | `space/md` | `space/lg` | `space/2xs` | 80Px |
| text only | label | `space/lg` | `space/lg` | `space/sm` (no effect, one child) | 64Px |
| icon only | icon | `space/lg` | `space/lg` | `space/sm` (no effect, one child) | 48Px |

### State table

| state | style | fill | label / icon |
|---|---|---|---|
| default | both | none | `foreground/secondary` |
| hover | both | none | `foreground/primary` |
| active | default | `interactive/neutral/background/focused` | `foreground/primary` |
| active | inverse | `interactive/inverse/background/focused` | `foreground/inverse` |

Style changes the active state only.

| State | Trigger | What changes |
|---|---|---|
| default | — | "No fill at all. The label sits at foreground/secondary." |
| hover | Pointer over the segment | "The label moves to foreground/primary. No background appears, so hover changes one colour and nothing else." |
| active | State set to active | "A fill of interactive/neutral/background/focused appears and the label moves to foreground/primary. That is the same label colour hover uses, so the fill is the only thing separating the two." |

### Behavior

- **Motion**: "Figma stores no timing and no transition is authored. Becoming the chosen segment is a fill appearing, with no movement behind it."
- **Selection**: "The segment has no link to its siblings. Which one is active is decided entirely by whoever places them."

### Content

- **Label** (text property): "Plain text set per instance, defaulting to Item. The icon only flavour has no text node for it to reach, so the property stays settable and renders nothing."
- **Icon** (fixed nested Icon): "An Icon at Size=small swapped to Star. None of its properties is exposed, so every segment shows the same glyph unless the instance is detached."
- **Trailing content** (not provided): "There is no second slot. A segment cannot carry a count or a badge without detaching."

### Usage

**Do**
- Pick one Flavour and hold it across every segment in a control. An icon-only segment dropped into a row of labelled ones breaks the row.
- Let the parent's Rounded decide the contour. Setting it per segment is how a control ends up with mismatched corners.

**Don't**
- Don't rely on hover to show what is chosen. Hover and active share a label colour, and only the fill tells them apart.
- Don't use icon only without naming the options elsewhere. The glyph is a locked Star in every variant as drawn.

### Accessibility

- No focus state exists in any of the eighteen variants, so keyboard focus has to be built entirely in code.
- The chosen state is a fill plus a label-colour change. Both are colour, so the selected state has to be exposed in the markup as well.
- Hover and active share foreground/primary on the label. Anyone who cannot make out the fill cannot tell the two apart.
- The icon only flavour carries no text at all. Those segments need an accessible name from somewhere outside the component.
- The label uses label/medium over a 20px line, and is the option's only name in two of the three flavours.

### Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | "36 tall in all eighteen variants. Width follows the content, 80 at the default flavour, 64 at text only and 48 at icon only with the shipped label." |
| Padding | Per Flavour | "space/xs top and bottom throughout. Horizontally space/md on the default flavour and space/lg on both text only and icon only, so dropping a part widens the padding rather than narrowing the segment." |
| Gap | Per Flavour | "space/xs on the default flavour. Text only and icon only declare space/sm, which separates nothing because each has a single child." |
| Radius | Per Shape | "radius/sm when true and radius/none when false." |
| Fill | Per State | "Only active carries one, interactive/neutral/background/focused. default and hover have no fill at all." |
| Label | Theming | "label/medium. foreground/secondary at default, foreground/primary on both hover and active." |
| Icon | Fixed | "Icon at Size=small, 16 square, swapped to Star in every variant that shows one." |

## Dependencies

- **Icon** (`2046:15010`, local; see `specs/icon`): Size=small, Framed=false, Name swapped to Star (rounded). Delivered as the `star` glyph from `packages/icons`.

## Tokens & theming

- **Colour:** `interactive/neutral/background/{pressed, default, focused}`, `interactive/inverse/background/focused`, `foreground/{primary, secondary, inverse}`, `border/default`.
- **Dimension:** `space/{2xs, sm, md, lg}`, `radius/{sm, none, pill}`, `control/sm`.
- **Typography:** `label/medium` (bound to `label/medium/{font size, font family, font weight, line height, letter spacing}`). **Glyphs:** `star`.
- **Theme axes:** palette (Light, Dark); size and typography (Desktop, Mobile, Tablet, Desktop Compact). Extensions (companion, target) are listed in `tokens/manifest.json`.

All 21 bound variable names resolve in `tokens/base/**`; `star` is in the font and not retired. One gap: the inverse track's border weight is a raw value (see issues). The export has no duration or easing tokens.

## States, behavior & motion

The control itself has no state axis.

| State | Trigger | What changes |
|---|---|---|
| Static | — | "The core declares no state axis of its own. Which segment looks chosen is set on the nested items." |
| Selection | State set to active on one segment | "That segment gains a fill and its label moves to the primary foreground. Nothing in the core enforces that only one carries it." |

- **Motion**: "The active background moves in 0.15s ease-in transition between item in the control. (Active background is not tied to the segmented item but bound to the control, so it moves easily across items)"
- **Selection**: "The set ships with Item 1 active, there most always be an active segment on."
- **Adding segments**: "The count is structural rather than a property. Two segments sit directly in each variant and a third in the slot, so a fourth means duplicating inside the instance. (Figma only implementation)"

No motion token exists in `tokens/`, so the duration and easing above have nothing to bind to (see issues).

## Content & slots

- **More items Slot** (slot, one segment as shipped): "Holds segments beyond the first two. It hugs its content, so whatever is placed there sets how far the track extends. (Implementation makes use of the segment options)"
- **Fixed segments** (two placed instances, outside the slot): "Item 1 and Item 2 are placed directly in each variant rather than in the slot. Removing one means detaching, and Item 1 is the one shipped active. (Figma only)"
- **Segment properties** (not exposed): "The core surfaces none of the segment's properties. Every label, state and flavour is set by selecting into the nested instance. See the _Segmented item frame for what each one offers. (Important! In production, the core can set base properties across elements)"

## Usage

**Do**
- Keep the options short and parallel. The row is read in one glance, so uneven label lengths make the track look broken.
- Set exactly one segment to active. The component will not do it, and will happily show two.

**Don't**
- Don't use it to move between screens. It switches a mode within one view, which is what separates it from Tab Bar.
- Don't grow it past a handful of segments. Each one hugs its own label, so a long list pushes the track wider than whatever contains it.

## Accessibility

- The control is one choice among several. It needs a radiogroup or tablist role rather than a row of unrelated buttons.
- No focus state exists on the core or on the segments, so arrow-key movement and a visible focus ring both have to come from code.
- The chosen segment is shown by a fill and a text-colour change. Expose the selected state in the markup rather than leaving it to colour.
- The track uses interactive/neutral/background/pressed and the active segment interactive/neutral/background/focused. Check those two against each other, because the difference between chosen and unchosen is the whole point of the control.
- Nothing prevents two segments reading as active at once. That has to be enforced, or the control contradicts itself.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug both axes | "289 by 44 as shipped with three segments. Width follows the segments, so it grows with their labels." |
| Padding and gap | Fixed | "space/xs on all four sides of the track, with a space/xs gap between segments." |
| Radius | Per Rounded | "radius/sm when true and radius/none when false, on the track and on every segment it places." |
| Fill | Theming | "interactive/neutral/background/pressed on the track. No border and no shadow." |
| Segments | Hug | "Each segment hugs its own content, so the track is the sum of the labels rather than an equal-width grid. Segments are not the same width as each other." |
| Slot | Hug | "The More items Slot hugs whatever is placed in it and sits last in the row." |

## Visual reference

[Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774) · [rounded](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-230) · [sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-775) · [full](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1338) · [rounded, inverse](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1363) · [sharp, inverse](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1368) · [full, inverse](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1373) · [_Segmented item set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1813) · [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1812) · [active](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1814) · [hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-150) · [text only](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1838) · [icon only](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1859) · [segment, sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5723-1819) · [segment, full](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1283) · [segment, inverse](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8851-1550) · [example: icon only](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-740) · [example: text only, sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-827) · [example: icon only, full](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-853) · [control metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5764-159) · [segment metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5764-355)

## Issues

**Warn**
- **Moving indicator not modelled.** The control's Motion row asks for an active background bound to the control that slides between segments (0.15s ease-in). On the canvas the fill belongs to the active segment, there is no indicator layer, and there are no prototype reactions.
- **Control and segment metadata disagree on motion.** The `_Segmented item` frame still says "no transition is authored… a fill appearing, with no movement behind it".
- **Slot missing from Property Breakdown.** More items Slot appears only under Content & Slot.
- **Padding misstated.** The default flavour's padding is `space/md` at the start and `space/lg` at the end, not `space/md` on both sides as the metadata says.
- **Spacing token misstated.** The metadata says `space/xs` for the track's padding and gap and the segment's block padding and default gap; Figma binds `space/2xs`.
- **Inverse is documented only as a property.** States, Layout & Theming and Accessibility describe the default flavour alone; the inverse values come from the bindings.
- **Inverse border weight has no token.** It is a raw 1; `stroke/thin` carries the same value.
- **One segment has the wrong shape.** In Shape=full, Flavour=default the slot's segment is Shape=sharp.
- **Two properties share the name Flavour.** The control's is default or inverse; the segment's is default, text only or icon only. The control's Flavour corresponds to the segment's Style.
- **Stale wording in the metadata.** Both Radius rows still read "when true… when false" and name no value for full; the segment's Usage still says "the parent's Rounded"; its text still counts "eighteen variants" where there are 54.
- **No focus, pressed or disabled design.** Focus ring, arrow-key movement and any disabled look are left to code with no token guidance, in both flavours.
- **Icon locked to `star`.** No swap is exposed in any of the 54 variants; in code the glyph is a per-option input.
- **Shape doesn't reach slot content.** The sharp and full page examples hold slot segments at Shape=rounded, against "It reaches the track and every segment placed inside it".

**Note**
- **Motion uses `animations/spring`.** The metadata's 0.15s ease-in has no token; by owner decision the indicator uses the `animations/spring` token (size collection, `250ms cubic-bezier(0.34, 1.36, 0.64, 1)`), the same as Switch.
- Selection is an explicit rule ("there most always be an active segment on", verbatim), but the structure, the Usage Do and the Accessibility text all still say nothing enforces it. Code must keep exactly one active.
- The fixed-two-plus-slot structure is marked Figma-only; the slot maps to segment options and the core sets base properties across segments.
- "Fixed height" in the metadata is really hug with min-height `control/sm`.
- The icon family stays rounded in every Shape.
- Hover and active share the label colour in the default style; only the active fill separates them.
- Text only and icon only bind a gap that has nothing to separate.
- Label is settable but renders nothing on icon only.
- Contrast between track and active fill is not verified here for either flavour.
- The slot accepts only `_Segmented item` and has no min or max.
- Icon colour follows the label via the drawn vector; currentColor covers it.
- The inverse variants label the first segment "Item", and only Shape=full sets Style=inverse on an unchosen segment; neither changes the look.
- Of the four page examples, 5757:857 duplicates 5757:827; the Component Details card lists Web as pending development.
- Neither set has a Figma description.
