# Accordion

A vertically stacked list of disclosure rows sharing one container, for a page that has more sections than it has room to show at once. Selectable decides whether rows can be ticked as well as opened, and In Card decides whether the list reads as a bounded object. The rows themselves are separate components with their own frames.

Source: [Accordion page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33) · extracted 2026-10-21 (re-extracted after the title moved from `title/large` to `title/medium`; nothing else changed in structure, bindings or metadata text)

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `selectable` | enum | true, false | `true` | which row component, which slot |
| `rounded` | enum | false, true | `false` | root radius, leading control Shape |
| `inCard` | enum | true, false | `true` | root border, row dividers |
| `items` | slot | Accordion Item rows | — | items |

**selectable**: true: "Rows carry a leading control and can be ticked, so the list doubles as a chooser. Reach for it when someone has to mark items, not merely read them. It is the same row component either way, with the selection turned on." · false: "Rows disclose content only, with the caret trailing the title. The right choice for content reveal, an FAQ or a settings group where nothing is being chosen."

**rounded**: false: "Match the contour of the surface the list sits on rather than deciding per instance. Only the outer container responds, so on a long list the difference shows at the first and last rows and nowhere else." · true: "The rounded pairing, for surfaces built from rounded controls. The nested row buttons inherits the rounding."

**inCard**: true: "Treat the list as one bounded object, set apart from what surrounds it. This also turns the row dividers on, so the choice governs the internal rhythm as much as the outer edge." · false: "Let the list sit directly on the page and take its separation from the surrounding layout. Dividers disappears with the outline, so rows run together and the container has to supply the breathing room."

**items**: Figma has two slot properties, `Items Slot Selectable#5621:15` (Selectable=true, prefers _Accordion Item Selectable) and `Items Slot#5622:16` (Selectable=false, prefers _Accordion Item). The metadata says that in code this is one content slot.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues. Measurements end in Px.

## Internal variations & content inputs

**Per-row open, selected, hover and title.** None of these is surfaced on the Accordion. Open is a variant of the nested item. Selected and hover are variants of the nested header, and Title is a text property on the header. All eight master variants show four closed rows titled "Heading". In code, open and selected are per-item state owned by the Accordion, and the title is item content. The intent is single-expand: "Only one item can have the open state at a time."

**Row content.** The item's Content Slot is empty by default and takes any content.

## Anatomy

1. **Container (root):** "The outer frame. It owns the border, the corner radius and the vertical stacking, and carries no fill of its own." Vertical, gap `space/none`, no padding. Fixed width, hug height (measured 381×229Px in card, 379×224Px without). Stroke `border/default` drawn inside when `inCard`; the width is untokenised (see issues). Radius `radius/lg` when `rounded`, otherwise none.
2. **Fixed rows (first, last):** "The first and last rows, placed directly in the variant rather than in the slot. They are not swappable content." Accordion Item, fill width. The first row's `showDivider` equals `inCard`. The last row's is always false.
3. **Items slot:** "The middle region a consumer fills with rows. Which of the two slots is present follows the Selectable axis." Vertical, no gap, fill width. The sample is two closed rows.

In code, items 2 and 3 are one list. The last item never shows its divider.

## Variants

| selectable | rounded | inCard | row | root radius | root stroke | row dividers | leading control shape |
|---|---|---|---|---|---|---|---|
| true | false | true | Item Selectable | none | `border/default` | on, last off | sharp |
| true | true | true | Item Selectable | `radius/lg` | `border/default` | on, last off | rounded |
| true | false | false | Item Selectable | none | none | off | sharp |
| true | true | false | Item Selectable | `radius/lg` | none | off | rounded |
| false | false | true | Item | none | `border/default` | on, last off | — |
| false | true | true | Item | `radius/lg` | `border/default` | on, last off | — |
| false | false | false | Item | none | none | off | — |
| false | true | false | Item | `radius/lg` | none | off | — |

## Subcomponents

### Accordion Item (private: `_Accordion Item` 5593:74, `_Accordion Item Selectable` 5622:3386)

"One row of an Accordion, holding a title, a disclosure control, and the content it reveals. Selectable decides whether the row also carries a selection, which changes the controls it offers and how a tap is divided between them. Open, the title, the divider and the content behave the same either way."

| Prop | Type | Values | Default | Where in Figma |
|---|---|---|---|---|
| `selectable` | enum | true, false | — | choice of set |
| `open` | enum | false, true | `false` | `Open` variant |
| `showDivider` | boolean | true, false | `true` | `Show Divider#5599:9` |
| `content` | slot | any | empty | `Content Slot#5593:8`, present when open |
| `title` | string | — | "Heading" | `Title#5593:0`, on the header |
| `selected` | enum | false, true | `false` | `Selected`, on the selectable header |
| `state` | enum | Default, hover | `Default` | `State`, on both headers |

Per-value intent (verbatim):

- **selectable**: true: "The row carries a selection as well as disclosure. A leading control takes the open and close and the rest of the row takes the selection, so the two actions never share a target." · false: "Disclosure only. The whole row is a single target that opens and closes it, and the caret trails the title instead of leading."
- **open**: false: "Collapsed, showing the title alone." · true: "Expanded, with the content sitting below the title and the caret rotated to match."
- **selected**: false: "Not chosen. It only carries meaning while Selectable is on, because nothing else offers a way to choose." · true: "Chosen. A mark trails the title and the heading gives up the width it needs."
- **state**: Default: "The resting row." · hover: "Pointer over the row. Only the background answers, so hover is the weakest of the signals this row gives."
- **title**: "The row's label. Name the section it opens, because the caret says that a row opens but never what is inside it."
- **showDivider**: true: "A rule closing the row off from the next one." · false: "No rule. Which rows carry one is decided by the Accordion placing them, not by the row itself."

Anatomy:

1. **Row (root):** "The frame holding the header and, when open, the content beneath it." Vertical, gap `space/none`, fill width, hug height.
2. **Header:** "The title with its disclosure control. The control leads when Selectable is on and trails when it is off." This is the Accordion Header below, measured 56Px tall in the row. The plain header is pinned to a fixed, untokenised 56Px here (it hugs to 52Px on its own since the title/medium change); the selectable header hugs to 56Px (see issues).
3. **Content and divider:** "What the row reveals when open, with a rule closing it off from the next row."
   - Content slot (only when `open`): vertical, gap `space/sm`, padding `space/lg`, clips. It is set to hug horizontally (see issues).
   - Divider (only when `showDivider`): horizontal, fill width, thickness `stroke/thin`.

| open | content | caret, plain row | caret, selectable row (in leading control) |
|---|---|---|---|
| false | absent | `expand-more` | `chevron-right` |
| true | shown | `expand-less` | `expand-more` |

In Figma both changes are glyph swaps through Caret Indicator's Open variant. By owner decision, code rotates one glyph instead: `expand-more` turns 180deg on the plain row, `chevron-right` turns 90deg clockwise in the leading control, both animated on `animations/spring` (see Owner decisions).

### Accordion Header (private: `_Accordion Header` 5529:4858, `_Accordion Header Selectable` 5593:1444)

| | plain | selectable |
|---|---|---|
| layout | horizontal, centred, gap `space/sm`, padding `space/lg` | horizontal, centred, gap `space/2xs`, padding `space/sm` |
| order | title, then the trailing caret | leading control, then the title, then the selection mark |
| fill, Default | `interactive/ghost/background/default` | same |
| fill, hover | `interactive/ghost/background/hover` | same |

The header has no border and no radius. Standalone, the plain header measures 381×52Px and the selectable one 381×56Px.

- **Title:** `title/medium` (was `title/large` before 2026-10-21), colour `foreground/primary`. It hugs, with no truncation. It sits in a heading column (gap `space/3xs`, fill) and a title row (gap `space/2xs`).
- **Caret (plain header only):** Caret Indicator, Size=medium. Glyph `expand-more`, or `expand-less` when open. Rounded family, `currentColor`.
- **Leading control (selectable header only):** Icon Button, Size=medium (`control/md`), Flavour=subtle. Shape is sharp, or rounded when the Accordion's `rounded` is true. It holds a small Caret Indicator; the glyphs are in the item table above.
- **Selection mark (selectable header only, when `selected`):** Icon, Framed=true, height `control/target-min`. Glyph `check-mark`, rounded family, `currentColor`. When it shows, the heading column narrows (measured 321→277Px).

### Dependencies

- Icon Button: `specs/icon-button`
- Icon: `specs/icon`
- Divider: `specs/divider`
- Caret Indicator (3453:54347, on the Navigation Rail page): specced in [specs/navigation-rail](../navigation-rail/navigation-rail.spec.md) (subcomponents › Caret Indicator). In code it reduces to a glyph.

## Tokens & theming

- **Colour:** `border/default`, `interactive/ghost/background/{default, hover}`, `foreground/primary`.
- **Dimension:** `space/{none, 2xs, xxs, sm, lg}`, `radius/{lg, none}`, `stroke/thin`, `control/md`, `control/target-min`.
- **Typography:** `title/medium`. **Motion:** `animations/spring` (owner decision; not bound in Figma). **Glyphs:** `expand-more`, `expand-less`, `chevron-right`, `check-mark`.
- **From dependencies:** `interactive/neutral/border/default` and `stroke/base` are Icon Button's own bindings.
- **Theme axes:**
  - palette: Light, Dark
  - size: Desktop, Mobile, Tablet, Desktop Compact
  - typography: Desktop, Tablet, Mobile, Desktop Compact

All 21 bound names resolve in `tokens/` (the five `title/medium/*` font properties replace `title/large/*`), and so does `animations/spring`. All four glyphs are in the font, not retired and not rejected.

## States, behavior & motion

**Accordion**

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The set declares no state axis of its own. Nothing about the container changes on hover, focus or press. |
| Row hover | Hover on a nested row | — | Handled inside the row components and documented in their frames. The container does not repaint. |

- **Motion:** "Figma stores no timing, and no expand or collapse transition is authored. The height change that opening a row implies is not modelled."
- **Open and close:** "No property on this set opens a row. Open sits on the nested header and reads false in all eight variants, so the set documents the collapsed list only. Only one item can have the open state at a time."
- **Interaction:** "Selectable switches the interaction model as well as the look. Without it the whole header toggles the row open. With it, the leading icon button takes the open and close and the rest of the header takes the selection."

**Accordion Item**

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Default | — | — | The resting row, with nothing emphasised. |
| hover | Pointer over the row | — | The background lifts. The title, the caret and any selection mark all hold, so the background carries the whole change. |
| Open | Open set to true | — | The content appears below the title and the caret rotates to point at it. The row grows to fit whatever the content needs. |
| Selected | Selected set to true, while Selectable is on | — | A mark appears at the trailing edge and the heading narrows to make room for it. |

- **Motion:** "No transition is defined. Opening a row is the content appearing and the caret rotating, with nothing specified in between."
- **Interaction:** "Without Selectable the whole row is one target that opens and closes it. With Selectable the leading control takes the open and close and the rest of the row takes the selection, so the two actions never share a target."
- **Selection:** "Nothing links one row's selection to another. Whether one row or many may be chosen is decided where the rows are placed."

## Content & slots

**Accordion**

- **Items Slot Selectable** (slot, present when Selectable is true): "Takes Accordion Item rows with Selectable on, one per row. This is the only part of the list a consumer adds to. Figma holds two slots, one per Selectable value, so the row content can stay locked in each. In code it is a single content slot."
- **Items Slot** (slot, present when Selectable is false): "The same role for the non-selectable rows. Only one of the two slots exists in any given variant, so the Selectable choice decides which one is available. This is a Figma only implementation, in code both slots are available as a single content slot."
- **First and last rows** (fixed instances, outside the slot): "The row above the slot and the row below it are placed instances rather than slot content. Reordering or removing them means detaching, and the last one is where the divider is deliberately switched off. The are static element in Figma only, in code the last element will always have the divider turned off"

**Accordion Item**

- **Title** (text property): "Plain text, defaulting to Heading. The only text the row takes."
- **Content Slot** (slot, present when Open is true): "Holds whatever the row reveals. It takes any content and is what sets the row's open height."
- **Leading control** (nested, present when Selectable is on): "An Icon Button carrying the caret. It owns the open and close, runs its own interaction states, and takes its shape from the Accordion around it."
- **Caret** (nested, present when Selectable is off): "A Caret Indicator trailing the title, rotating with the open state. It is not a control of its own, because the whole row is the target."
- **Selection mark** (nested, present when Selected is true): "A framed check icon at the trailing edge. It reports the selection rather than offering it, since the row body is what toggles it."
- **Two sets in Figma** (Figma only): "Selectable and non-selectable rows are built as two component sets so the slot content can stay locked in each. They are one component with a Selectable variant, and the split carries no meaning beyond authoring."

## Usage

**Accordion: Do**
- Pick Selectable before filling the slot. Changing it later swaps the row component and drops the titles already entered.
- Keep In Card consistent across sibling lists on one screen. It governs the dividers as well as the border, so a mixed pair reads as two different components.

**Accordion: Don't**
- Don't expect to open a row from the Accordion instance. Open lives on the nested header and is not surfaced here.
- Don't treat the first and last rows as slot content. They are fixed instances, and the last one has its divider deliberately turned off.

**Item: Do**
- Write titles that name the section. The caret says that a row opens, the title has to say what is inside it.
- Decide Selectable once for a whole list. A row that selects sitting next to rows that only open reads as two different controls.

**Item: Don't**
- Don't put a second control inside a non-selectable row. The whole row is one target, so anything else competes with it.
- Don't use Selected without Selectable. The mark appears with no control behind it to change it.

## Accessibility

Quoted verbatim. The two lines about `title/large` at 20px are stale: the title is now `title/medium` (see issues).

**Accordion**
- No focus state is modelled anywhere in the set, so the keyboard path through the rows has to be built in code.
- The caret is the only sign that a row expands. Expose expanded and collapsed as real state rather than leaving it to the glyph.
- With In Card false there is no border and no divider, so nothing separates the rows until one is hovered. Check the list still reads as a list at rest.
- Titles use title/large, which is heading sized. On a screen with real headings the hierarchy needs checking.
- Opening a row reveals content that was not previously in the reading order. That insertion has to be announced.

**Accordion Item**
- Without Selectable the whole row is one control. It needs a single focusable target carrying its expanded state.
- With Selectable there are two targets, the leading control for open and close and the rest of the row for selection. Each needs its own name, or one of the two actions cannot be reached.
- The caret's rotation is the only sign that a row is open. Expanded and collapsed have to be exposed in the markup rather than left to the glyph.
- Selection shows as a trailing mark. It needs a real selected state alongside it.
- Hover changes the background and nothing else, so anyone not using a pointer gets no equivalent signal.
- The title is set at 20px, which is heading sized. On a screen carrying real headings the hierarchy needs checking.

## Layout & theming intents

**Accordion**

| Property | Type | Description |
|---|---|---|
| Size | Fill/Flexible width, hug height | "Width fills available space or restricted as needed. Height always hugs the rows." |
| Border | Per In Card | "A 1px inside stroke bound to border/default when In Card is true. No stroke at all when it is false." |
| Radius | Per rounded | "radius/lg on all four corners when rounded is true. When false the radius is a literal 0." |
| Fill | Theming | "The container carries no fill. Every surface colour in the list comes from the row components." |
| Stacking | Fixed | "Vertical, zero padding, and the gap bound to space/none so rows butt directly against each other." |
| Dividers | Per In Card | "With In Card true, Show Divider is on for every row except the last. With In Card false it is off on all of them. The value is baked into each instance and is not exposed." |
| Row height | Fixed | "56 per row, rising to 57 wherever a divider is switched on." |

**Accordion Item**

| Property | Type | Description |
|---|---|---|
| Size | Fill width, hug height | "Fills its container. The header is 56 tall and a row carrying its divider is 57. Open rows grow to whatever the content needs." |
| Padding | Per Selectable | "space/lg on all four sides of the header without Selectable, and space/sm with it, because the leading control is taller than the title." |
| Gap | Per Selectable | "space/sm between the title and the caret without Selectable, space/2xs between the control, the title and the mark with it." |
| Background | Theming | "interactive/ghost/background/default at rest and interactive/ghost/background/hover on hover. No border and no corner radius." |
| Title | Theming | "title/large, in foreground/primary." |
| Caret | Fixed | "Caret Indicator at Size=medium, 20 square, trailing the title when Selectable is off." |
| Leading control | Fixed | "Icon Button at Size=medium, 40 square, Flavour=subtle, leading the title when Selectable is on." |
| Selection mark | Fixed | "A framed Icon at 40 square on the trailing edge, present only while Selected is true." |
| Divider | Per Show Divider | "A 1px horizontal rule beneath the row, adding 1 to its height when shown." |

The Title row is stale: the title is now `title/medium` (see issues).

## Owner decisions

- **The caret rotates one glyph with animation rather than swapping glyphs.** Applies to the plain row's trailing caret (`expand-more`, rotated 180deg when open) and the selectable row's leading-control glyph (`chevron-right`, rotated 90deg clockwise when open). Figma still swaps glyphs through Caret Indicator's Open variant.
- **Motion that matches Switch uses the `animations/spring` token (`--animations-spring`).** Applies to the caret rotation and the content panel's height change on open and close, with no transition under prefers-reduced-motion. Figma models no motion on this page.

## Visual reference

- [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5621-1973)
- [Accordion metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5651-1679) · [Item metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5651-1855)
- Variants:
  - [selectable, sharp, in card](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5621-1972)
  - [selectable, rounded, in card](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5621-2312)
  - [plain, sharp, in card](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5622-3026)
  - [plain, rounded, not in card](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5622-3044)
- Rows and headers:
  - [Item open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5593-105)
  - [Item Selectable open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5622-3397)
  - [Header hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-4880)
  - [Header Selectable, selected](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5593-1465)

## Issues

**Warn**
- **Metadata still describes title/large.** Both header sets now bind the title to `title/medium` (all five font properties). Item Layout & Theming still reads "title/large", and both Accessibility lists still call the title "title/large" / "heading sized". `title/medium` is 16px over a 20px line in every typography mode, so the heading-size concern no longer holds as written. What remains is a page-hierarchy question for code: whether the row's title is marked up as a heading, and at which level. The owner should update those three lines; they are quoted verbatim in this document.
- **Plain header height is now a pinned, untokenised 56.** With `title/large` the plain header hugged to 56Px, matching the selectable header (`space/sm` + `control/md` + `space/sm`). With `title/medium` it hugs to 52Px, but the item pins it to a fixed 56Px with no token, so rows still measure 56Px (57Px with a divider) as "Row height" says. Code keeps 56 with a min-height of `control/md` + 2 × `space/sm`, so plain and selectable rows match. Owner decision: confirm 56 for plain rows (and bind or document it), or let them hug to 52.
- **Untokenised border width.** The Accordion root stroke is a raw 1px in all four In Card=true variants. Only its colour is bound (`border/default`). The row Divider uses `stroke/thin`.
- **"Open sits on the nested header": it doesn't.** Open is a variant of the nested Accordion Item. Neither header set has one.
- **Width is fixed, not fill.** The root has a fixed width in all eight variants, while the metadata says "Fill/Flexible". In code the width belongs to the container.
- **Item metadata lists properties the item sets don't have.** Selected, State and Title are on the header sets and aren't surfaced. Selectable is a choice between two sets. The spec models the intended single component.
- **Single-expand is stated only once.** It appears in a single behaviour row and nothing models it. Decide in code whether multiple rows can ever be open.
- **Content Slot hugs width.** It is set to hug where the row fills, so content won't stretch to the row width.
- **Only hover is modelled.** There is no focus, pressed or disabled state on the container, rows or headers, and no motion is authored (code animates the caret and panel on `animations/spring` by owner decision). The metadata says both are intentionally absent.

**Note**
- **The caret swaps glyphs in Figma; code rotates it.** Plain rows go `expand-more` → `expand-less`. Selectable rows go `chevron-right` → `expand-more`, because the item overrides Direction to horizontal. The standalone selectable header pins vertical, which disagrees with the item. Resolved by owner decision: code rotates one glyph with animation. Figma has not been redrawn to match.
- Radius is bound only when `rounded` is true. When false it is an unbound 0, as the metadata says.
- Open, Selected, hover and Title are reachable only through nested overrides. In code, open and selected are per-item state owned by the Accordion.
- The fixed first and last rows and the two slot properties are Figma-only. In code there is one item list, and the last item has no divider.
- No truncation or line limit is specified for long titles.
- Caret Indicator lives on the Navigation Rail page; its spec is in specs/navigation-rail (subcomponents › Caret Indicator).
- None of the five sets has a component description.
- Verbatim quotes keep the authored typos.
