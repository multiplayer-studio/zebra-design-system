# Assist Chip

Offers a contextual action, or stands for an item someone can discard, such as an attached file. Five colours borrow the status tokens to mark a state or a kind of item, with PDFs in red, spreadsheets in green and documents in blue, and in code foreground, background and border each take an override beyond those five. The label is the only content a consumer writes, and one colour should hold for every chip of the same kind. Reach for a button when the action is the primary next step, and a filter chip when it narrows content.

Source: [Chip page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5122-2783) · component set `5161:4423` · extracted 2026-10-26 · 52 variants · default `State=default, disabled=false, Rounded=true, active=false, Color=neutral`

> **No blockers, 6 warnings.** See [Issues](#issues). One of three chips on the Chip page, each with its own board and metadata frame (see also [input-chip](../input-chip/input-chip.spec.md), [filter-chip](../filter-chip/filter-chip.spec.md)).

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `label` | string | | `Label` | label |
| `showLeadingIcon` | boolean | true, false | `true` | icon |
| `state` | enum (interaction) | `default`, `hover`, `focus`, `selected`, `dragged` | `default` | root |
| `disabled` | boolean | true, false | `false` | root, label |
| `rounded` | boolean | true, false | `true` | root |
| `discardable` | boolean | true, false | `true` | remove |
| `color` | enum | `neutral`, `green`, `orange`, `blue`, `red` | `neutral` | root border, label, icon, remove |
| `foreground` | colour token (code only) | any semantic colour token | per `color` | label, icon, remove |
| `background` | colour token (code only) | any semantic colour token | per `state` | root fill |
| `border` | colour token (code only) | any semantic colour token | per `color` | root border |

Figma also has an `active` axis with a single value (`false`); it is omitted (see issues).

**label**: "The action, phrased as a verb. An assist chip whose label names a noun reads as a filter or a tag instead."

**showLeadingIcon**: true: "Show the glyph naming the action's domain, which is what separates an assist chip from a filter chip at a glance. Keep it consistent across a row, because one chip without an icon among several with them looks misaligned rather than different." · false: "Text only, for an action with no settled icon. Prefer this to inventing one."

**state**: default: "The resting chip, and where placed instances should stay." · hover: "Pointer over the chip." · focus: "Keyboard focus, and the only state carrying a visible outline." · selected: "A chosen or sticky appearance. Worth questioning on a chip that performs an action, because an action does not usually stay selected afterwards." · dragged: "The chip while it is being moved. It reuses the pressed background rather than carrying a token of its own."

**disabled**: false: "The usual case." · true: "The action is unavailable. Say why nearby, because the chip itself gives no other clue."

**discardable**: true: "Adds a remove control after the label, for an item someone can discard, such as an attached file." · false: "No remove control. The chip only triggers its action."

**color**: neutral: "The default. Use it when there is no state or kind of item to mark." · green: "Success colours. Use it for a positive state or one kind of item, such as spreadsheets." · orange: "Warning colours. Use it for a state that needs attention or one kind of item." · blue: "Info colours. Use it for an informative state or one kind of item, such as documents." · red: "Error colours. Use it for a failed state or one kind of item, such as PDFs."

**foreground**: "Overrides the label, icon and remove colour. Keep it in the same family as the border." · **background**: "Overrides the fill, which Color leaves neutral. Use a subtle status token or a colour for one kind of item." · **border**: "Overrides the border colour, in the same family as the foreground."

### Colour overrides

Code only; Figma offers the five `color` presets. Each override takes a semantic colour token and wins for that one paint: override > color > state. Focus outline and disabled tokens are never overridden. Example mapping: PDF red, spreadsheet green, document blue.

**rounded**: true: "Match the contour of the controls around the chip rather than deciding per chip." · false: "The square-cornered pairing, for surfaces built from sharp controls."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Leading glyph** (via the nested Icon's Name swap): any glyph in `packages/icons`, default `star`. "An Icon at Size=small, shipped swapped to Star. The swap runs through the Icon's own Name property, so the glyph can be changed per instance, while visibility is the one thing the chip itself surfaces." Not a chip property in Figma; an `icon` glyph-name input is the natural shape in code.

## Anatomy

1. **Chip (root)**: "The component frame. A horizontal auto-layout hugging its content, carrying the fill and the border." Horizontal, cross-axis centred, gap `space/3xs`, padding `space/xs` top and bottom and `space/sm` left and right. Hugs both ways (88×30Px measured at rest). Radius `radius/pill` (rounded) or `radius/none`. Fill per state; border per color at `stroke/thin`, inside (`interactive/neutral/border/default` on neutral).
2. **Leading icon**: "The optional glyph naming the action's domain, present when Show Leading Icon is on." Glyph `star` by default (rounded family), Icon Size=xsmall pinned, sized by `control/icon-xs` (12Px). Colour is `currentColor`. Visible when `showLeadingIcon`.
3. **Label**: "The action itself, and the only text the chip takes." Text `indicator/medium`, colour per color, cap-height leading trim. Sits in a Label frame padded `space/2xs` left and right, which is the only spacing between icon, label and remove.
4. **Remove**: "A Close icon after the label, shown when Discardable is on. It takes the label colour." Glyph `close` (rounded), Icon Size=small (16Px), `currentColor`. Visible when `discardable`; an interactive target in code.

## Variants

52 variants. State, disabled and Rounded behave as before; Color is a new axis. `disabled=true` is built only with `state=default` and `color=neutral`. Rounded swaps the radius only.

### state (Color=neutral)

| state | disabled | root fill | root border | height (measured) | node |
|---|---|---|---|---|---|
| default | false | interactive/neutral/background/default | interactive/neutral/border/default @ stroke/thin, inside | 30Px | `5161:4424` |
| hover | false | interactive/neutral/background/hover | same | 30Px | `5161:4427` |
| focus | false | interactive/neutral/background/focused | focus/outline @ stroke/thick, outside | 28Px | `5161:4436` |
| selected | false | interactive/neutral/background/selected | same | 30Px | `5161:4460` |
| dragged | false | interactive/neutral/background/pressed | same | 30Px | `5161:4466` |
| default | true | interactive/neutral/background/disabled | none | 28Px | `5161:4433` |

### color (State=default)

Color changes only the border and the label, icon and remove colour. The fill follows State.

| color | root border | label, icon, remove | node |
|---|---|---|---|
| neutral | interactive/neutral/border/default | interactive/neutral/foreground/default | `5161:4424` |
| green | border/success | feedback/success/foreground | `7074:1278` |
| orange | border/warning | feedback/warning/foreground | `7074:1359` |
| blue | border/info | feedback/info/foreground | `7074:1440` |
| red | border/error | feedback/error/foreground | `7074:1521` |

## Subcomponents

No on-page private subcomponents. Library dependency: **Icon** (`2046:15010`), see [specs/icon](../icon/icon.spec.md); glyphs `star` (leading, default) and `close` (remove).

## Tokens & theming

- **Colour:** interactive/neutral/background/{default,hover,focused,selected,pressed,disabled}, interactive/neutral/foreground/{default,disabled}, interactive/neutral/border/default, border/{success,warning,info,error}, feedback/{success,warning,info,error}/foreground, focus/outline
- **Dimension:** space/3xs, space/xs, space/sm, space/2xs, control/icon-xs, radius/pill, radius/none, stroke/thin, stroke/thick
- **Typography:** indicator/medium
- **Glyphs:** star (default), close

Theme axes (from tokens/manifest.json): palette Light / Dark; size Desktop / Mobile / Tablet / Desktop Compact; typography Desktop / Tablet / Mobile / Desktop Compact. Extensions: companion (palette), target (primitives, palette), condensed (typography, size). Every name resolves in `tokens/base`.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | interactive/neutral/background/default behind a 1px inside border, interactive/neutral/border/default on neutral and per Color otherwise. |
| hover | Pointer over the chip | — | Background moves to interactive/neutral/background/hover. Nothing else changes. |
| focus | Keyboard focus | — | Background moves to interactive/neutral/background/focused and the border becomes 2px focus/outline drawn outside. The chip is also 2px shorter than at rest, which looks like a drafting slip rather than an intended change. |
| selected | State set to selected | — | Background moves to interactive/neutral/background/selected. Border, icon and label are unchanged. |
| dragged | Chip being reordered | — | Background moves to interactive/neutral/background/pressed. |
| disabled | disabled set to true | — | Background becomes interactive/neutral/background/disabled, the label drops to the disabled foreground, the border is removed, and the chip is 2px shorter than at rest. |

- **Motion:** "Figma stores no timing and no transition is authored. Every state change is a flat swap of fill, border or text colour."
- **Action:** "Nothing in the set records what the chip does or what happens afterwards. An assist chip is a trigger, and the result belongs entirely to the implementation."
- **Coverage:** "52 variants are built. disabled appears only with State=default and Color=neutral, and active offers a single value."

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. Phrase it as the action itself. |
| Leading Icon | nested Icon, toggled by Show Leading Icon | An Icon at Size=small, shipped swapped to Star. The swap runs through the Icon's own Name property, so the glyph can be changed per instance, while visibility is the one thing the chip itself surfaces. |
| Remove control | nested Icon, toggled by Discardable | A Close icon after the label, shown when Discardable is on. It takes the label colour. |

## Usage

**Do**
- Phrase the label as a verb. The chip is a thing to do, not a thing to pick.
- Keep Show Leading Icon consistent across a row. One chip without an icon among several with them looks misaligned.

**Don't**
- Don't reach for an assist chip when the action is the main one on the screen. That is a button.
- Don't use State=selected to mean an action has stuck. A chip that stays selected is usually a filter chip in disguise.

## Accessibility

- The chip is a control. It needs a button role and a name stating the action, not just the label text.
- Focus is the only state with a visible outline and it is drawn outside the chip, so check it is not clipped by a scrolling row.
- The leading icon sits next to the label and is decorative. If it ever carries meaning the label does not, that meaning has to be in text.
- Disabled chips lose the border and rely on fill and text colour alone. Check both against the surface behind them.
- The label uses indicator/medium over a 14px line. It is the action's only name, so it should not be shortened to an abbreviation.
- Colour marks the kind of item but never replaces the label. Check each override pair for contrast against the surface behind it.
- The remove control is a real target. Name it after what it removes, such as Remove Document.pdf.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Hug width, fixed height | 30 tall at rest and 28 at focus and disabled. The width hugs the label and icons. |
| Padding and gap | Fixed | space/xs on all sides and no gap. The label sits in its own frame padded space/2xs left and right, which spaces it from the icon and the remove control. |
| Radius | Per Rounded | "radius/pill when true and radius/none when false." |
| Fill | Per state | "interactive/neutral/background at default, hover, focused, selected and disabled, with pressed reused for dragged." |
| Border | Per state | "1px inside at rest, interactive/neutral/border/default on neutral and border/success, warning, info or error per Color. Focus swaps to 2px focus/outline drawn outside. Disabled carries none." |
| Label | Theming | "indicator/medium. interactive/neutral/foreground/default on neutral, feedback/success, warning, info or error foreground per Color, and the disabled token when disabled." |
| Leading icon | Fixed | "Icon at Size=small, 16 square." |
| Colour overrides | Per Color, or per instance in code | "Color sets the border and the label. In code, foreground, background and border each accept a colour token on top, so one kind of item can hold one colour across a view." |

Visual reference: [component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423) · [metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5689-822) · [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4424) · [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4436) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4433) · [green](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7074-1278) · [orange](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7074-1359) · [blue](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7074-1440) · [red](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7074-1521)

## Issues

**Warn**
- **Leading icon size.** Metadata says Icon Size=small, 16 square. The set uses Icon Size=xsmall at `control/icon-xs`.
- **Padding and gap.** Metadata says space/xs on all sides and no gap. The root has `space/sm` left and right and a `space/3xs` gap.
- **Height jumps between states.** 30px at rest, 28px at focus and disabled. The 1px inside border counts in layout; the outside focus border and the missing disabled border don't. Build one height with the border kept out of layout.
- **Colour overrides are code only.** Figma has no matching property, so designers get the five Color presets only, and no preset changes the fill.
- **active has one value.** Copied from Filter Chip and unfinished; omitted from the API.
- **selected on an action chip.** The metadata questions it; leave it out of code until design confirms a use.

**Note**
- Spacing tokens were renamed in Figma: the former 4px space/xs is now space/2xs and a new space/xs is 6px. tokens/ was re-exported on 2026-10-22 and every former space/xs in code and specs moved to space/2xs. The new space/xs still carries a "= 4px" description in Figma.
- Icon Size=xsmall was added to both Icon components for the leading icon. The Icon spec does not list it yet.
- Discardable defaults to true in Figma. In code, defaulting to whether a remove handler is set (as Input Chip does) avoids a control that does nothing.
- The glyph is reachable only through the nested Icon's Name swap; an `icon` input in code is the implementer's call. Default `star`.
- Disabled has no stroke; missing stroke-weight bindings there are expected.
- The label uses cap-height leading trim (8px text box against a 14px line).
- No disabled hover/focus, no pressed state, no motion; the action's result belongs to the implementation.
