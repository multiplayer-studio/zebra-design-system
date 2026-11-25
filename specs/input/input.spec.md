# Input

The full field assembly, a label above, the field itself and a hint below, stacked and spaced as one unit. Type chooses which of the five field types sits in the middle, and the label and the hint can each be turned off. Use it wherever a field needs a name or supporting text, and use Input Field on its own where it needs neither.

Source: [Input page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997) · assembly `6331:31902` · extracted 2026-10-15, updated 2026-11-06 · five field sets × 243 variants (Size 3 × Shape 3 × State 9 × Flavour 3, complete), Input Label 6, Input Hint 3 · two metadata frames (Input, Input Field)

> **No blockers. One warning** remains after review: ghost borders draw nothing in most states. Owner decisions are recorded in [Issues](#issues).

## Assembly — Input

### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `type` | slot | Input / Text · Number · Password · Date · Time | Input / Text (medium, rounded, enabled, default) |
| `showLabel` | boolean | | `true` |
| `subLabel` *(code only)* | text | | empty |
| `showHint` | boolean | | `true` |
| `state` *(code only)* | enum | `default`, `invalid`, `disabled` | `default` |
| `block` *(code only)* | boolean | | `false` |

- **type:** Chooses which field fills the middle of the stack, from text, number, password, date and time. The choice brings its own placeholder and its own trailing control, so picking the type is most of the work of configuring the field. Input Field Metadata covers what each one carries.
- **block** `true`: Fills the container's width. `false`: Tentative 280 wide: it narrows to fit its container.
- **showLabel** `true`: The label sits above the field and names it. Keep it on, because the field carries no name of its own and the placeholder is gone as soon as someone types. `false`: Drops the label from the stack. Only safe where something else nearby already names the field, and the name still has to reach assistive technology some other way.
- **subLabel:** Figma turns the line on with the nested Label's Show Sub Label. Code takes `subLabel` as text on the assembly, shown under the name when set, and only with a label.
- **showHint** `true`: Keeps the supporting line below the field. This is where a validation message lands, so leaving it on reserves the space before it is needed. `false`: Drops the line and shortens the stack. A field that can fail validation then has nowhere to put the reason, and turning the line back on later moves everything below it.

- **state** *(decided for code)*: the assembly surfaces the general states and fans them out:
  - invalid sets the field to invalid and the hint to error;
  - disabled sets the field and hint to disabled and dims the label.

  Metadata: "The assembly own general states which it’s children inherits (Invalid, disabled)." In Figma these are still set part by part.

**Part properties.** Figma surfaces the parts' own properties through the nested instances. In code the assembly surfaces them itself (decided): the field's size, shape, flavour and icon toggles, the label's type and information icon, and the hint's icon. The assembly places them as: label `Type=optional, Disabled=false, Show Information=false`; field `Size=medium, Shape=rounded, State=enabled, Flavour=default`; hint `Type=default, Show Icon=true`.

### Anatomy

| Part | What it is |
|---|---|
| `root` | Vertical stack, gap `space/xs`, no padding. Width is a tentative 280: it narrows to fit the container, and block fills it. Hugs height. |
| `label` | Input Label, shown by `showLabel`. The field's name, turned on by Show Label. It carries the required or optional marker and the information icon, and the sub label when set. |
| `field` | The chosen field set, fills the width. The control, chosen by Type. Its own Size, Shape, State and Flavour are set here rather than on the assembly. |
| `hint` | Input Hint, shown by `showHint`. The supporting line, turned on by Show Hint. Guidance at rest, and the validation message when its Type is error. |

Measured default stack: label 20 + field 40 + hint 16 + two gaps = 88 Px.

## Input Field (five sets, one model)

Figma builds one set per type (`Input / Text` `6306:7940`, `Number` `6307:18854`, `Password` `6307:22538`, `Date` `6294:1996`, `Time` `6295:2185`). They share Size, Shape, State and Flavour exactly, so in code they read as one field with a `type`.

The text, value and placeholder are not exposed as properties in Figma; they come from the implementation.

### API

| Prop | Type | Values | Default (Figma) |
|---|---|---|---|
| `type` | enum | `text`, `number`, `password`, `date`, `time` | `text` |
| `size` | enum | `small`, `medium`, `large` | `medium` (decided; Figma's sets still say large) |
| `shape` | enum | `sharp`, `rounded`, `full` | `rounded` |
| `state` | enum | `enabled`, `hover`, `focus`, `selected`, `typing`, `filled`, `invalid`, `read-only`, `disabled` | `enabled` |
| `block` *(code only)* | boolean | | `false` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |
| `hasLeading` | boolean | text, number, password only | `false` |
| `hasTrailing` | boolean | text and number only | text `false`, number `true` |

**type**
- `text`: The general case, a free text value with nothing in the trailing position until one is asked for.
- `number`: A numeric value only input.
- `password`: A concealed value with a reveal control that cannot be turned off.
- `date`: A date, with a calendar control and the expected format in the placeholder.
- `time`: A time, with a clock control. Same reasoning as date, the placeholder carries the shape of the value.

**size**
- `medium`: The default, for surfaces and toolbars where the field sits alongside other controls.
- `large`: For a field that is the main thing on its surface.
- `small`: The tightest, and the only size that also reduces the text.

**shape**
- `rounded`: The default softened corners, matching surrounding rounded controls.
- `sharp`: Square corners, for surfaces built from sharp-edged controls.
- `full`: A pill, for a field that reads as its own object on a surface rather than one row of a form.

**state**
- `enabled`: The resting empty field, showing its placeholder and waiting.
- `hover`: Pointer over the field. The border is the only thing that answers.
- `focus`: The field has keyboard focus and is ready for input. It carries the heaviest border in the set, so it stays findable where several fields sit together.
- `selected`: Focus has settled and the cursor is placed. Lighter than focus, for a field already being worked in.
- `typing`: A value is being entered. This is the only state that offers a way to clear the field, so it is not interchangeable with filled.
- `filled`: A committed value. The field is at rest again but the text stays at full strength, which is what separates it from enabled.
- `invalid`: The value failed validation. The border carries the signal and nothing else does, so pairing it with a Hint set to error is what makes the problem readable.
- `read-only`: The value is shown but cannot be changed. Use it where a person still needs to read or copy the value, and use disabled where they do not.
- `disabled`: The field cannot be used and is out of the tab order. Both the surface and the border drop away, so it reads as out of play rather than merely empty.

**flavour**
- `default`: A bordered field on a neutral surface, and the right choice inside a form.
- `gradient`: For a unique interaction highlight, such as an AI companion field. It marks the field as special, so using it on an ordinary field spends that signal for nothing.
- `ghost`: No visible border at rest, for a field sitting on a surface that already bounds it. On an unbounded surface it stops reading as a field at all.

**hasLeading** `false`: No leading icon, which is where the field starts. The text begins at the padding edge and takes the full width. `true`: Adds an icon ahead of the text. Use it where the icon says something the placeholder cannot, and leave it off where it would only repeat the label above.

**hasTrailing** `false`: No optional trailing control. The types that define themselves by a control, password, date and time, carry it intrinsically and expose no toggle at all. `true`: Adds a trailing control to text or number, the two types that leave the position open.

Both icon glyphs are swappable through the nested Icon's own Name property, not exposed on the set:
- leading: `email`;
- trailing: `info` on text, `dialpad` on number.

### Anatomy

| Part | What it is |
|---|---|
| `root` | Horizontal, padding `space/sm` (top, bottom) `space/md` (sides), gap `space/2xs`. Height by size; width is a tentative 280, narrows to fit the container, and block fills it. Fill, stroke and radius per the tables below. |
| `leadingIcon` | Icon, shown by `hasLeading` (text, number, password). Off by default, and an Icon at 20 square when hasLeading turns it on. Colour: `foreground/primary`, `foreground/disabled` when disabled. |
| `text` | Fills the width, padding `0 space/2xs`. The placeholder, and then the value once one is entered. It fills whatever width the icons leave. Holds `placeholder` (`foreground/disabled`), `value` (`foreground/primary`, `foreground/disabled` when disabled) and, at focus/selected/typing, a `cursor` (`|`, `foreground/cursor`). Style `body/medium`, `body/small` at small. |
| `trailingIcon` | Icon, shown by `hasTrailing` (text: `info`; number: `dialpad`, on by default). `foreground/primary`, `foreground/disabled` when disabled. Hidden while typing. |
| `typeControl` | Icon, always present on password (`visibility`), date (`calendar-3-day`), time (`clock-outline`). `foreground/primary`, `foreground/disabled` when disabled. |
| `clear` | Icon `cancel`, typing only, `foreground/primary`. On text and number it replaces the trailing icon; on password, date and time it joins the type control in a group: clear · vertical Divider · control, gap `space/sm` (57 Px at large). |

Every icon and control takes the value's colour: `foreground/primary`, and `foreground/disabled` when disabled. In code they inherit it (currentColor). The placeholder stays `foreground/disabled` and the cursor `foreground/cursor`.

### Variants

**Size** (from large)

| size | height | text | icons | measured |
|---|---|---|---|---|
| small | `control/sm` | `body/small` | Icon Size=small | 36 / 16 Px |
| medium | `control/md` | `body/medium` | Icon Size=medium | 40 / 20 Px |
| large | `control/lg` | `body/medium` | Icon Size=medium | 48 / 20 Px |

**Shape:** sharp `radius/none` · rounded `radius/sm` · full `radius/pill`.

Size and shape never change colour, stroke or visibility (checked across all 243 variants).

**State × Flavour** (root fill / stroke / weight; identical at every size and shape and across all five types)

| flavour | state | fill | stroke | weight |
|---|---|---|---|---|
| default | enabled | `interactive/neutral/background/default` | `interactive/neutral/border/default` | `stroke/thin` |
| default | hover | ″ | `interactive/neutral/border/hover` | `stroke/thin` |
| default | focus | ″ | `border/focus` | `stroke/thick`, **outside** |
| default | selected | ″ | `border/focus` | `stroke/thin` |
| default | typing | ″ | `border/focus` | `stroke/thin` |
| default | filled | ″ | `interactive/neutral/border/default` | `stroke/thin` |
| default | invalid | ″ | `border/error` | `stroke/thin` |
| default | read-only | ″ | `border/subtle` | `stroke/thin` |
| default | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` |
| gradient | enabled | `interactive/neutral/background/default` | linear `foreground/gradient/start` → `foreground/gradient/end` | `stroke/thin` |
| gradient | hover | ″ | `border/gradient/end` | `stroke/thin` |
| gradient | focus | ″ | `border/focus` | `stroke/thick`, outside |
| gradient | selected | ″ | `border/gradient/start` | `stroke/thin` |
| gradient | typing | ″ | `border/gradient/start` | `stroke/thin` |
| gradient | filled | ″ | linear `foreground/gradient/start` → `foreground/gradient/end` | `stroke/thin` |
| gradient | invalid | ″ | `border/error` | `stroke/thin` |
| gradient | read-only | ″ | `border/subtle` | `stroke/thin` |
| gradient | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` |
| ghost | enabled | none | `interactive/ghost/border/default` | `stroke/base` |
| ghost | hover | none | `interactive/neutral/border/hover` | `stroke/base` |
| ghost | focus | none | `border/focus` | `stroke/thick`, outside |
| ghost | selected | none | `border/focus` | `stroke/base` |
| ghost | typing | none | `border/focus` | `stroke/base` |
| ghost | filled | none | `interactive/ghost/border/default` | `stroke/base` |
| ghost | invalid | none | `border/error` | `stroke/thin` |
| ghost | read-only | none | `border/subtle` | `stroke/base` |
| ghost | disabled | none | `interactive/ghost/border/disabled` | `stroke/base` |

Text: placeholder at enabled, hover, focus and selected; value at typing, filled, invalid, read-only and disabled (`foreground/disabled` when disabled); cursor at focus, selected and typing; clear at typing.

**Type**

| type | placeholder | sample value | leading | trailing | while typing |
|---|---|---|---|---|---|
| text | Placeholder | Value | `hasLeading` (email) | `hasTrailing`, off (info) | clear replaces trailing |
| number | 0 | 3 | `hasLeading` (email) | `hasTrailing`, on (dialpad) | clear replaces trailing |
| password | Password | •••••••• | `hasLeading` (email) | visibility, always | clear · divider · visibility |
| date | mm/dd/yyyy | 10/14/2026 | none | calendar-3-day, always | clear · divider · calendar-3-day |
| time | --:-- -- | 09:30 AM | none | clock-outline, always | clear · divider · clock-outline |

## Input Label (`6329:31743`)

| Prop | Values | Default |
|---|---|---|
| `type` | `default`, `required`, `optional` | `default` |
| `disabled` | `false`, `true` | `false` |
| `showInformation` | boolean | `true` (the assembly turns it off) |
| `showSubLabel` | boolean | `false` |

- `default`: The plain name with nothing after it. `optional`: Use it where most of the form is required, so the exception is the thing being marked. `required`: Adds an asterisk after the name. Use it only where submission genuinely fails without a value.
- Disabled `false`: The name at full strength. `true`: Dims the name to sit with a disabled field. It does not disable anything, so it has to be set alongside the field's own State rather than instead of it.
- Show Information `true`: Adds an information icon after the name, for an explanation the label itself has no room for.
- Show Sub Label: not in the metadata. Shows a supporting line under the name.

Parts:
- **Layout:** vertical, gap `space/xs`: the label row, then the sub label. Measured 20 Px tall with the sub label off.
- **Label row:** horizontal, gap `space/2xs`, holding the name, marker and icon.
- **Name:** `label/medium`, `foreground/primary` → `foreground/disabled`.
- **`*`:** `label/medium`, `foreground/error`, also when disabled.
- **`(optional)`:** `body/small`, `foreground/secondary`, also when disabled.
- **Information:** an `info` Icon at Size=medium, `foreground/primary` → `foreground/disabled`.
- **Sub label:** `body/small`, `foreground/secondary` → `foreground/disabled`. Sample text "Description".

## Input Hint (`6329:31836`)

| Prop | Values | Default |
|---|---|---|
| `type` | `default`, `error`, `disabled` | `default` |
| `showIcon` | boolean | `true` |

- `default`: The resting supporting line, for guidance about what to enter. `error`: The validation message that says what went wrong. The field's border carries the signal and this carries the reason, so neither works alone. `disabled`: Dims the line to sit with a disabled field.
- Show Icon `true`: Keeps an icon ahead of the message, which is what makes an error read as an error before the words are read. `false`: Message only.

Parts:
- **Layout:** horizontal, gap `space/2xs`, measured 16 Px tall.
- **Icon:** Icon at Size=small, depending on type:
  - default: `info` in `foreground/primary`;
  - error: `error` in `foreground/error`;
  - disabled: `info` in `foreground/disabled`.
- **Message:** `body/xsmall`, in `foreground/secondary`, `foreground/error` or `foreground/disabled` to match.

## Dependencies

- **Icon** (`2046:15010`, local), as font glyphs, rounded family: `email`, `info`, `cancel`, `dialpad`, `visibility`, `calendar-3-day`, `clock-outline`, `error`. All are present in `codepoints.json`; none were rejected.
- **Divider** (`2152:8803`, local, Orientation=vertical): the separator in the typing group. See `specs/divider/`.

## Tokens & theming

Names only; values live in `tokens/` (see `tokens/manifest.json`).

- **Colour:**
  - `interactive/neutral/background/{default,disabled}`
  - `interactive/neutral/border/{default,hover,disabled}`
  - `interactive/ghost/border/{default,disabled}`
  - `border/{focus,error,subtle,default}`, `border/gradient/{start,end}`, `foreground/gradient/{start,end}`
  - `foreground/{primary,secondary,disabled,cursor,error}`
- **Dimension:** `control/{lg,md,sm,icon-md}`, `space/{none,xxs,sm,md}`, `radius/{none,sm,pill}`, `stroke/{base,thin,thick}`
- **Typography:** `body/medium`, `body/small`, `body/xsmall`, `label/medium`
- **Theme axes:** palette Light/Dark · size and typography Desktop/Mobile/Tablet/Desktop Compact · extensions companion, target, condensed

Every token resolves in the export.

## States, behavior & motion

### Input (assembly)

| State | Trigger | What changes |
|---|---|---|
| disabled | Set on the assembly | The assembly, should handle the disabled state across the components. |
| invalid | Set on the assembly | The same split. The field's State goes to invalid and the hint's Type goes to error. One supplies the signal and the other the message, and neither implies the other. |
| read-only | Set on the field | Only the field carries this. The label stays at full strength, which is right, because the name of a value worth reading is still worth reading. |
| hover, focus, typing | Set on the field | The field runs these on its own and nothing above or below it changes. |

- **Motion:** No transition is defined on the assembly. Each part swaps its own tokens.
- **Composition:** Three parts stacked vertically, with the height hugging them. Turning off the label or the hint removes its height rather than leaving a gap, so the stack shortens and whatever sits below it moves up.
- **State coordination:** The assembly own general states which it’s children inherits (Invalid, disabled). Anything that reads as one state across the label, the field and the hint is three independent settings held in agreement by the assembly.

### Input Field

| State | Trigger | What changes |
|---|---|---|
| enabled | — | The resting empty field. interactive/neutral/border/default at 1px on an interactive/neutral/background/default surface, with the placeholder at foreground/disabled. |
| hover | Pointer over the field | The border moves to interactive/neutral/border/hover. Surface and text hold. |
| focus | Keyboard focus | The border becomes border/focus at 2px, double its resting weight. The field is ready for input but the placeholder still reads as a placeholder. |
| selected | Focus settled, cursor placed | The border stays border/focus and returns to 1px. Lighter than focus, for a field already being worked in. |
| typing | Text being entered | The text becomes a real value at foreground/primary and a clear control appears at the trailing edge. The border holds border/focus. |
| filled | A committed value | The border returns to interactive/neutral/border/default while the text stays at foreground/primary. The clear control goes. |
| invalid | Validation failed | The border moves to border/error. The text stays at foreground/primary, so the border carries the whole signal and the Hint beneath it carries the reason. |
| read-only | Presented but not editable | The border drops to border/subtle and the value stays at foreground/primary. Still legible and still selectable, which is what separates it from disabled. |
| disabled | — | Surface and border move to interactive/neutral/background/disabled and interactive/neutral/border/disabled, and the text and every icon drop to foreground/disabled. The whole control recedes. |

- **Motion:** No transition is defined. Each state is a swap of border colour, border weight, text colour and, at typing, the presence of the clear control.
- **Typing lifecycle:** The run is enabled, focus, selected, typing, filled. Only typing carries the clear control, so emptying the field from inside it is available while a value is being entered and not after it is committed.
- **Validation and lock:** invalid and read-only sit outside that run. The surrounding form sets them rather than the field reaching them by interaction, and invalid pairs with the Hint set to error, which carries the reason.

## Content & slots

**Input**
- **Label** (Input Label, toggled by Show Label): The field's name, with an optional required or optional marker and an information icon. The assembly exposes only whether it shows, so the marker, the dimming and the icon are all set on the label.
- **Field** (Input Field, chosen by Type): The control itself. An Input arrives with it at Size=medium and Shape=rounded, and everything it offers, Size, Shape, State and Flavour, is set on the field rather than surfaced by the assembly. A column of these does not share one size unless every field is set to match.
- **Hint** (Input Hint, toggled by Show Hint): The supporting line under the field, carrying guidance at rest and the validation message when its Type is error. Its icon is a separate toggle on the hint.
- **Text content** (not parameterised): The name, the hint and the message are not exposed as inputs on the assembly, so all three come from the implementation.

**Input Field**
- **Input text** (not parameterised): The value and the placeholder. Neither is exposed as an input on the field, so both come from the implementation. The placeholder is what distinguishes the types, Placeholder for text, 0 for number, Password, mm/dd/yyyy and --:-- --.
- **Leading icon** (nested Icon, toggled by hasLeading): Off by default. When on it takes an Icon at Size=medium, 20 square, and the glyph is swappable through the Icon's own Name property.
- **Trailing control** (per type): Text leaves the trailing position empty and exposes hasTrailing to fill it. Number exposes the same toggle but arrives with a stepper already in place. Password, Date and Time carry a control that defines the type, a reveal, a calendar and a clock, so none of them expose a toggle for it.
- **Clear control** (typing only): Appears at the trailing position while typing and is the only way to empty the field from within it. Where the type already carries its own control the two sit together in a 57 wide group rather than one replacing the other.

## Usage

**Input — Do**
- Keep Show Label on. The field has no name of its own, and the placeholder that might stand in for one disappears the moment someone starts typing.
- Move the field to invalid and the hint to error together. One carries the signal and the other carries the reason, and either on its own is half a message.

**Input — Don't**
- Don't turn Show Hint off on a field that can fail validation. The message has nowhere to land, and adding the line later pushes everything below it down.
- Don't leave the parts on different states. A full strength label over a disabled field reads as a mistake rather than a style, and nothing in the assembly prevents it.

**Input Field — Do**
- Pick the type that matches the value. The placeholder and the trailing control arrive with it, and together they tell a person what is expected before they type anything.
- Pair invalid with a Hint set to error. The border colour is the only thing invalid changes, so on its own it says something is wrong without saying what.

**Input Field — Don't**
- Don't use disabled where a person still needs to read the value. read-only keeps it legible and selectable, disabled puts it out of reach and out of the tab order.
- Don't lean on the placeholder as the label. It clears the moment typing starts, so whatever it was carrying disappears exactly when it is needed.

## Accessibility

**Input**
- The label is the field's name. Show Label controls only whether it is visible, so a field without a visible label still needs its name to reach assistive technology.
- The required marker is an asterisk and a colour, and neither is readable on its own. The requirement has to be carried in the field's semantics as well as shown.
- (optional) is a word rather than a symbol, so it reads where the asterisk does not. Mark whichever of required or optional is the exception in the form, not both.
- A validation message in the hint has to be associated with the field, or it is announced as loose text with nothing tying it to what failed.
- The information icon on the label has no text. Where it opens an explanation it is a control, so it needs a name and a target of its own.
- The three parts dim independently. Check the whole stack at one state, because a disabled field under a full strength label is a contrast mismatch that neither part shows on its own.

**Input Field**
- The field carries no label of its own. Input pairs it with Input Label, and a field used on its own still needs a name from the implementation.
- A placeholder is not a label. It clears the moment a value is entered, so anything a reader has to keep is not safe there.
- invalid changes the border colour and nothing else. The reason belongs in the Hint set to error, and the field has to be associated with it for the message to be announced.
- read-only and disabled look alike and behave differently. read-only keeps the value reachable and selectable, disabled takes the control out of the tab order.
- The leading icon, the clear control and any type control are glyphs with no text. Each needs a name, and the clear control needs one that says what it clears.
- At small the text drops to 14px and the control to 36 tall. Check the trailing control still offers a large enough target at that height.

## Layout & theming intents

**Input**

| Property | Type | Description |
|---|---|---|
| Size | Flexible width, hug height | Tentative 280 wide, with the height hugging whatever is turned on. At the default that is a 20 label, a 40 field and a 16 hint, coming to 84. |
| Gap | Fixed | space/xs (6) between all three parts. That is one step wider than the space/2xs (4) the field uses between its icons and its text. |
| Label | Hug | 20 tall and hugging its text, with a space/2xs gap between the name, any marker and the information icon. A sub label, when shown, sits space/xs below. |
| Hint | Hug | 16 tall, body/xsmall, with a space/2xs gap after a 16 square icon. Smaller than the field's own text, which keeps the value the loudest thing in the stack. |
| Field | Fill | The field fills the width of the stack while the label and the hint hug their own content, so only the field tracks the container. |
| Colour | Theming | Each part draws its own tokens. The label runs foreground/primary and drops to foreground/disabled, the required marker holds foreground/error either way, and the hint text moves between foreground/secondary, foreground/error and foreground/disabled. |

**Input Field**

| Property | Type | Description |
|---|---|---|
| Size | Flexible width | Tentative 280 wide, so the container sets the width rather than the content. Height is bound per size, control/lg at large for 48, control/md at medium for 40 and control/sm at small for 36. |
| Padding and gap | Fixed | space/sm top and bottom, space/md left and right, with a space/2xs gap between the leading icon, the text and the trailing control. Padding holds across all three sizes, so height alone carries the density. |
| Radius | Per Shape | radius/none when sharp, radius/sm when rounded and radius/pill when full. The four corners are bound individually rather than as a single value. |
| Surface | Per Flavour | interactive/neutral/background/default on default and gradient, moving to interactive/neutral/background/disabled when disabled. Ghost carries no surface of its own, so whatever sits behind it shows through. |
| Border | Per Flavour | Default draws at 1px and rises to 2px on focus. Gradient keeps those weights and draws its border from the gradient tokens: a foreground/gradient/start to foreground/gradient/end gradient at rest and when filled, border/gradient/end on hover and border/gradient/start when selected or typing. Focus, invalid, read-only and disabled use the same tokens as default. Ghost holds a bound border at zero weight, which is a theming hook rather than an absent border, so a high contrast variable set can give it a hard outline. |
| Text | Theming | body/medium for large and medium, body/small for small. The colour changes with state, which States and Triggers sets out. |
| Icons and controls | Fixed | Every icon is Size=medium at 20 square at large and medium, and Size=small at 16 square at small, and the inner text frame fills whatever width they leave. At large one icon costs 24 including its gap, taking the text from 254 to 230, and two take it to 206. Every icon and control, leading, trailing, the type control and clear, draws foreground/primary like the value, and foreground/disabled when the field is disabled. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6288-997) · [Input](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6331-31902) · [Input Label](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6329-31743) · [Input Hint](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6329-31836)
- Field sets: [Text](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-7940) · [Number](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6307-18854) · [Password](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6307-22538) · [Date](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6294-1996) · [Time](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6295-2185)
- States: [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8031) · [typing](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8139) · [invalid](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8238) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8328) · [gradient](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8373) · [ghost](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8805) · [ghost, selected](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6306-8949)

## Issues

### Warn

1. **Ghost borders draw nothing in most states.** Ghost binds its border weight to `stroke/base`, which is zero, everywhere except focus (`stroke/thick`) and invalid (`stroke/thin`). Hover gives no feedback, and selected and typing, the two states in which someone is working in the field, show no focus indication beyond the cursor.

### Fixed in Figma (2026-11-06)

- **Show Sub Label.** The unwired property was removed from the assembly. The nested Label's own toggle is the one to use.
- **Size row.** The metadata now says the default stack comes to 88.
- **Stack gap.** Input now binds `space/xs`, as Select does.

### Fixed in Figma (2026-10-15)

- **Metadata corrected:**
  - the assembly's stack height (a 40 field, not 48) and hint colour (`foreground/secondary`);
  - the field's gradient Border description, which now matches the build;
  - icon sizes (16 at small).
- **Icons and controls use the text colours.** Every icon and control in the five field sets (leading, trailing, type control, clear; 2,025 glyphs, verified) is `foreground/primary`, and `foreground/disabled` when disabled. This replaces the earlier mix of unbound icons, `interactive/neutral/foreground/*` and a one-variant binding drift.

### Decisions

- **Sub label is text on the assembly** (`subLabel`). It shows under the name when set, only with a label, and is tied to the field as its description.
- **State and part properties live on the assembly in code.** Figma surfaces the subcomponents' own properties; code surfaces them on the assembly, including a general state (`default` / `invalid` / `disabled`) that fans out to label, field and hint.
- **Default size is medium,** as the metadata and the assembly say. Figma's field sets still default to large; to be fixed in Figma later.
- **280 is a tentative width**, not a minimum or a fixed one. The field narrows to fit its container, and `block` fills it.
- **Number keeps its dialpad** and clear replaces it while typing (the metadata's "stepper" and grouping are not planned). Acknowledged, no change.
- **Contrast is acknowledged, no change for now.**
  - Light: the resting border is 1.51:1, the read-only border 1.29:1 and the placeholder 3.02:1.
  - Dark: the error hint is 3.09:1.

### Note

- **Sub label has no metadata.** No property row, anatomy entry or guidance yet.
- **Input Label defaults vs placement.** The assembly places its label at Type=optional with Show Information off; the set's own defaults are Type=default and Show Information on. When disabled, `(optional)` stays `foreground/secondary` and `*` stays `foreground/error` (the latter as intended).
- **Focus is drawn outside the edge.** It is the only state that changes stroke alignment: the 2px ring sits outside the field, so nothing inside shifts.
- **Two typing patterns.** On Text and Number, clear replaces the trailing icon. On Password, Date and Time it joins the type control (clear · Divider · control).
- **Size and shape are independent.** They never change colour, stroke or visibility, and the four other types match Text variant by variant apart from their type-specific parts.
- Both metadata frames are complete. Text content is not parameterised, by design. No motion is defined. None of the sets has a description.
