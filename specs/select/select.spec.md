# Select

The full select assembly: a label above, a Select Field in the middle and a hint below, stacked and spaced as one unit. The Open property switches the assembly between its closed state and its open state, which reveals the dropdown menu overlapping the region below. The label and hint can each be turned off. Reach for it wherever a dropdown needs a name or supporting text, and reach for Select Field on its own where it needs neither.

Source: [Input Select page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-3495) · Select `6602:712` (2 variants) · Input / Select `6601:110` (216 variants = Size 3 × Shape 3 × State 8 × Flavour 3, complete) · extracted 2026-10-20 · two metadata frames (Select, Select Field)

The label, hint and menu are reused from other specs and are only summarised here:
- Input Label and Input Hint are in [specs/input/](../input/input.spec.md).
- Dropdown Menu and Menu Item are in [specs/dropdown/](../dropdown/dropdown.spec.md).
- Input / Select is Input / Text's field with a chevron. See specs/input/ for everything it shares.

> **No blockers.** The warnings are mostly copied text: the Select details card carries Input's description, and several metadata rows still describe Input Field. Some metadata also contradicts the build: open shows the selected value, the selected row, the keyboard model and the assembly-level state. Where the experimental React code disagrees with Figma is listed under [Issues](#issues).

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Assembly — Select

### API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `open` | enum | false, true | `false` | variant: field State, chevron, menu visibility |
| `showLabel` | boolean | | `true` | label |
| `showHint` | boolean | | `true` | hint |

- **open** — false: "The closed state. The nested Select Field is set to State=enabled and the dropdown menu instance is hidden." · true: "The open state. The nested Select Field switches to State=open and the dropdown menu becomes visible. The menu is absolutely positioned at base . It overlaps the hint region and any content below the element."
- **showLabel** — true: "The label sits above the field and names it. Keep it on, because the placeholder text disappears the moment a value is selected." · false: "Drops the label from the stack. Only safe where something else nearby already names the field, and the name must still reach assistive technology through another means."
- **showHint** — true: "Keeps the supporting line below the field. Leaving it on reserves the space before validation is needed and prevents layout shift when an error message appears." · false: "Drops the hint and shortens the stack. A select that can fail validation then has nowhere to put the reason, and turning the line back on later moves everything below it."

**Part properties.** The Property Breakdown also documents these, but they are set on the nested instances, not on Select:
- **Label / Type** (placed `default`) — default: "The plain name with nothing after it." · optional: "Appends (optional) after the name. Use when most other selects in the form are required, so the exception is what is marked." · required: "Adds an asterisk after the name. Use only where submission genuinely fails without a chosen value."
- **Label / Show Information** (placed `false`) — false: "No information icon, which is the default state for Select." · true: "Adds an information icon after the label name, for context the label itself has no room for. The icon requires a label and target in the implementation."
- **Hint / Type** (placed `default`) — default: "The resting supporting line, for guidance about what to choose." · error: "The validation message that says what went wrong. The Select Field border carries the signal via State=invalid; this carries the reason. Neither works alone." · disabled: "Dims the hint line to sit with a disabled select field."
- **Hint / Show Icon** (placed `true`) — true: "Keeps an icon ahead of the hint message. Especially important at Type=error so the validation state is perceived before the words are read." · false: "Message only, no leading icon."
- **Field** — placed as Input / Select Size=medium, Shape=rounded, State=enabled (open when `open`), Flavour=default, hasLeading=false. Its display text is overridden to "Select an option".

### Internal variations & content inputs

- **Field axes:** Size, Shape, State and Flavour come from the nested Input / Select, not from Select. Code can surface them on the assembly, as specs/input/ decided for Input.
- **Label and hint:** their types and toggles are set on their own instances.
- **Options:** Menu Item rows in the Dropdown Menu, sampled as four labels (Option 1–4). In code this is a list of options; each row is a content input, not an enum.
- **Text:** the placeholder, value, label and hint text are not parameterised. The samples are "Select an option", "Value", "Field name" and "Default hint message".

### Anatomy

Root: vertical, gap `space/xxs`, no padding, start-aligned. It is fixed width and hugs its height (280 × 84 Px measured at the default).

1. **Label** — Input Label, `Type=default, Disabled=false, Show Information=false`; hugs; visible when `showLabel`. "The field's name, turned on by Show Label. Carries the required/optional marker and the information icon."
2. **Field** — Input / Select; fills the width, with height set by its Size. "The control. Size, Shape, State and Flavour are all set on this nested component, not on the assembly. Trailing chevron always present."
3. **Hint** — Input Hint, `Type=default, Show Icon=true` (glyph `info`); hugs; visible when `showHint`. "Supporting line, turned on by Show Hint. Guidance at rest; validation message when Type=error on the hint."
4. **Dropdown Menu** — visible when `open`. "Absolutely positioned 4px below the field's bottom edge. Overlaid and does not determine assembly height. Contains Menu Items via slot. Width is inherited from field width."
   - Instance: `Rounded=true, More Items=true`, absolutely positioned and anchored top-left. It sits 4 Px under the field and covers the hint (measured y 68 Px). That offset is a position, so no token is bound to it.
   - Size: width fixed to the assembly's (280 Px); height hugs.
   - Panel: fill `surface/menu`, effect style Shadow/medium. Gap `space/2xs`, padding `space/card`, radius `radius/element-md`.
   - Rows: Menu Item `Type=Icon, Rounded=true`, with Leading Element and Trailing Icon both off. Row 1 is at `State=hover`, rows 2–4 at `Default`. Two rows are built in and two sit in the Slot Container.
   - Row and panel tokens are in specs/dropdown/.

### Variants

| open | field State | field border (default flavour) | chevron | menu |
|---|---|---|---|---|
| false | enabled | `interactive/neutral/border/default` | `expand-more` | hidden |
| true | open | `border/focus` | `expand-less` | shown |

The assembly height does not change when open (84 Px measured both ways). The field still shows its placeholder when open.

## Input / Select (`6601:110`)

The set's own description: "The field a Select opens from: Input / Text's field with a chevron fixed at the trailing edge and no typing state. Open replaces Input Field's selected state, the list being open, and turns the chevron to expand-less. Size, Shape, Flavour and the remaining states read the same tokens as every other Input field. Used inside Select; on its own only where the label and hint come from elsewhere."

Metadata: "The select control on its own, without a label or hint around it. One model covers the select interaction pattern, with Size, Shape, State and Flavour that differ only in border, surface, text strength and chevron orientation. Reach for it directly when a field needs no label or supporting text, and reach for Select when it does."

### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `size` | enum | `small`, `medium`, `large` | `medium` |
| `shape` | enum | `sharp`, `rounded`, `full` | `rounded` |
| `state` | enum | `enabled`, `hover`, `focus`, `open`, `filled`, `invalid`, `read-only`, `disabled` | `enabled` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |
| `hasLeading` | boolean | | `false` |

**size**
- `medium`: The default, for surfaces and toolbars where the field sits alongside other controls.
- `large`: For a more prominent field or a roomier control density.
- `small`: The tightest, and the only size that also reduces the text.

**shape**
- `rounded`: The default softened corners, matching the surrounding rounded controls.
- `sharp`: Square corners, for surfaces built from sharp-edged controls.
- `full`: A pill, for a field that reads as its own object on a surface rather than one row of a form.

**state**
- `enabled`: The resting empty field, showing its placeholder and waiting.
- `hover`: Pointer over the field. The border is the only thing that answers.
- `focus`: The field has keyboard focus and is ready for input. It carries the heaviest border in the set, so it stays findable where several fields sit together.
- `open`: The field is expanded and the chevron points up. The border stays at focus weight and the popup is shown.
- `filled`: A committed value. The field is at rest again but the text stays at full strength, which is what separates it from enabled.
- `invalid`: The value failed validation. The border carries the signal and nothing else does, so pairing it with a Hint set to error is what makes the problem readable.
- `read-only`: The value is shown but cannot be changed. Reach for it where a person still needs to read or copy the value, and reach for disabled where they do not.
- `disabled`: The field cannot be used and is out of the tab order. Both the surface and the border drop away, so it reads as out of play rather than merely empty.

**flavour**
- `default`: A bordered field on a neutral surface, and the right choice inside a form.
- `gradient`: For a unique interaction highlight, such as an AI companion field. It marks the field as special, so using it on an ordinary field spends that signal for nothing.
- `ghost`: No visible border at rest, for a field sitting on a surface that already bounds it. On an unbounded surface it stops reading as a field at all.

**hasLeading** `false`: No leading icon, which is where the field starts. The text begins at the padding edge and takes the full width. (There is no `true` row in the metadata.)

### Anatomy

| Part | What it is |
|---|---|
| `root` | Horizontal, centred on the cross axis. Padding `space/sm` top and bottom, `space/md` at the sides; gap `space/xxs`. Height by size; width 280 Px in Figma and set by the container. Fill, stroke and radius follow the tables below. |
| 1 `leadingIcon` | Icon, shown by `hasLeading`; glyph `email` (rounded family) by default, swappable. "Off by default, and an Icon at Size=medium when hasLeading turns it on." Follows the text colour. |
| 2 `displayText` | Fills the width, padding `0 space/xxs`, clips. "The placeholder, and then the value once one is entered. It fills whatever width the icons leave." The `placeholder` is `foreground/disabled`; the `value` is `foreground/primary`, or `foreground/disabled` when disabled. Style `body/medium`, `body/small` at small. |
| 3 `chevron` | Icon, always present. `expand-more`, or `expand-less` at open; rounded family. Colour `foreground/primary`, `foreground/disabled` when disabled; in code it inherits the text colour. "Always present, pointing down in all states except open, where it points up." |

No clear control and no cursor: a select is never typed into.

### Variants

**Size**

| size | height | text | icons | measured |
|---|---|---|---|---|
| small | `control/sm` | `body/small` | Icon Size=small | 36 / 16 Px |
| medium | `control/md` | `body/medium` | Icon Size=medium | 40 / 20 Px |
| large | `control/lg` | `body/medium` | Icon Size=medium | 48 / 20 Px |

**Shape:** sharp `radius/none` · rounded `radius/sm` · full `radius/pill`, with the four corners bound individually.

Size and Shape never change colour, stroke, text or the chevron (checked across all 216 variants).

**State × Flavour** (root fill / stroke / weight; identical at every size and shape). These rows are Input / Text's from specs/input/, except that **open** replaces selected with the same tokens, and there is no typing row.

| flavour | state | fill | stroke | weight |
|---|---|---|---|---|
| default | enabled | `interactive/neutral/background/default` | `interactive/neutral/border/default` | `stroke/thin` |
| default | hover | ″ | `interactive/neutral/border/hover` | `stroke/thin` |
| default | focus | ″ | `border/focus` | `stroke/thick`, **outside** |
| default | **open** | ″ | `border/focus` | `stroke/thin` |
| default | filled | ″ | `interactive/neutral/border/default` | `stroke/thin` |
| default | invalid | ″ | `border/error` | `stroke/thin` |
| default | read-only | ″ | `border/subtle` | `stroke/thin` |
| default | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` |
| gradient | enabled | `interactive/neutral/background/default` | linear `foreground/gradient/start` → `foreground/gradient/end` | `stroke/thin` |
| gradient | hover | ″ | `border/gradient/end` | `stroke/thin` |
| gradient | focus | ″ | `border/focus` | `stroke/thick`, outside |
| gradient | **open** | ″ | `border/gradient/start` | `stroke/thin` |
| gradient | filled | ″ | linear `foreground/gradient/start` → `foreground/gradient/end` | `stroke/thin` |
| gradient | invalid | ″ | `border/error` | `stroke/thin` |
| gradient | read-only | ″ | `border/subtle` | `stroke/thin` |
| gradient | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` |
| ghost | enabled | none | `interactive/ghost/border/default` | `stroke/base` |
| ghost | hover | none | `interactive/neutral/border/hover` | `stroke/base` |
| ghost | focus | none | `border/focus` | `stroke/thick`, outside |
| ghost | **open** | none | `border/focus` | `stroke/base` |
| ghost | filled | none | `interactive/ghost/border/default` | `stroke/base` |
| ghost | invalid | none | `border/error` | `stroke/thin` |
| ghost | read-only | none | `border/subtle` | `stroke/base` |
| ghost | disabled | none | `interactive/ghost/border/disabled` | `stroke/base` |

What else changes with state:
- **Text:** the placeholder shows at enabled, hover, focus and open. The value shows at filled, invalid, read-only and disabled, in `foreground/disabled` when disabled.
- **Chevron:** `expand-less` at open and `expand-more` everywhere else. It is `foreground/disabled` when disabled.

## Dependencies

- **Input Label** (`6329:31743`) and **Input Hint** (`6329:31836`): see specs/input/.
- **Dropdown Menu** (`2666:6863`) and **Menu Item** (`2402:6508`): see specs/dropdown/.
- **Icon** (`2046:15010`), delivered as font glyphs in the rounded family: `expand-more`, `expand-less`, `email` and `info`. All four are in `codepoints.json`; none are retired or rejected.
- All of these are local to the file; nothing comes from a remote library.

## Tokens & theming

Names only; values live in `tokens/` (see `tokens/manifest.json`).

- **Colour:**
  - `interactive/neutral/background/{default,disabled}`
  - `interactive/neutral/border/{default,hover,disabled}`
  - `interactive/ghost/border/{default,disabled}`
  - `border/{focus,error,subtle}`, `border/gradient/{start,end}`, `foreground/gradient/{start,end}`
  - `foreground/{primary,disabled,secondary}`
  - menu: `surface/menu`, `shadow/soft`, `interactive/ghost/background/{default,hover}`, `interactive/neutral/foreground/default`
- **Dimension:** `control/{sm,md,lg}`, `space/{none,2xs,xxs,sm,md,card}`, `radius/{none,sm,pill,element-md}`, `stroke/{base,thin,thick}`, `shadow/{medium,small}/{blur,x,y}`
- **Typography:** `body/medium`, `body/small`. **Effect style:** Shadow/medium.
- **Glyphs:** `expand-more`, `expand-less`, `email`, `info`.
- **Theme axes:** palette Light/Dark · size and typography Desktop/Mobile/Tablet/Desktop Compact · extensions companion, target, condensed.

All 46 names resolve in `tokens/base/`. No gaps and no binding drift on either set.

## States, behavior & motion

### Select (assembly)

| State | Trigger | What changes |
|---|---|---|
| enabled | Default / resting | Placeholder text visible. Border at interactiveNeutralBorderDefault. Chevron pointing down. |
| hover | Set on the nested field | Only the nested field is affected and behavior is inherited from it |
| focus | Set on the nested field | Inherited from the nested field |
| open | Assembly Open=true + nested field State=open | Dropdown menu becomes visible, absolutely positioned at below the field. Assembly height does not grow. |
| filled | Set on the nested field | Text changes from foregroundDisabled (placeholder) to foregroundPrimary (selected value). |
| invalid | Set on the element | Border switches to borderError. The hint is set to Type=error independently. One supplies the visual signal, the other the reason text — neither implies the other. |
| disabled | Set on the element | Inherited by all nested component |
| read-only | Set on the nested field only | Only the field carries this state. The label stays at full strength, which is correct: the name of a value worth reading is still worth reading. |

- **Motion:** No transition is defined on the assembly. Each nested part swaps its own tokens on state change. There are no authored prototype interactions.
- **Composition:** Three parts stacked vertically with 4px gap, height hugging all visible parts. Turning off the label or the hint removes its height and the stack shortens. Whatever sits below moves up.
- **Dropdown overlap:** When Open=true the dropdown menu is absolutely positioned 4px below the field's bottom edge, inheriting the select width and clips content. The assembly height does not increase; the menu is overlaid and does not determine assembly height. Implementations must reserve z-order and spacing so the open menu does not obscure adjacent content.
- **Dropdown width:** The dropdown menu has a flexible width, matching the assembly.
- **State coordination:** These ae the assembly-level state that cascades to nested parts. Invalid, disabled and read-only.
- **Chevron direction:** Closed variants use ExpandMore (chevron down). Open variants use ExpandLess (chevron up). This swap is authored in the component variants.

### Input / Select

| State | Trigger | What changes |
|---|---|---|
| enabled | — | The resting empty field. interactive/neutral/border/default at 1px on an interactive/neutral/background/default surface, with the placeholder at foreground/disabled. |
| hover | Pointer over the field | The border moves to interactive/neutral/border/hover. Surface and text hold. |
| focus | Keyboard focus | The border becomes border/focus at 2px, double its resting weight. The field is ready for input but the placeholder still reads as a placeholder. |
| open | Keyboard open or click | The border stays at focus weight and the chevron points up. The popup is shown below the field. |
| filled | A committed value | The border returns to interactive/neutral/border/default while the text stays at foreground/primary. The chevron returns to down. |
| invalid | Validation failed | The border moves to border/error. The text stays at foreground/primary, so the border carries the whole signal and the Hint beneath it carries the reason. |
| read-only | Presented but not editable | The border drops to border/subtle and the value stays at foreground/primary. Still legible and still selectable, which is what separates it from disabled. |
| disabled | — | Surface and border move to interactive/neutral/background/disabled and interactive/neutral/border/disabled, and the text and every icon drop to foreground/disabled. The whole control recedes. |

- **Motion:** No transition is defined. Each state is a swap of border colour, border weight, text colour and, at open, chevron orientation.
- **Keyboard behavior:** Open on Alt+Down or Enter, navigate with Up/Down, commit with Enter and close with Escape. The field itself does not implement this behavior; the parent Select handles keyboard interaction.
- **Expanded semantics:** The field is the trigger, but the popup and options belong to the parent Select. The field itself has no option slots or menu.
- **Validation association:** invalid changes the border colour and nothing else. The reason belongs in the Hint set to error, and the field has to be associated with it for the message to be announced.

## Content & slots

**Select**
- **Label** (Input Label, toggled by Show Label): The field's name. Carries required/optional marker and information icon. The assembly exposes only its visibility; the marker, dimming and icon are all set on the label sub-component directly.
- **Field** (Input / Select): The control. Arrives at Size=medium, Shape=rounded, State=enabled, Flavour=default, hasLeading=false, placeholder "Select an option." All of its own properties (Size, Shape, State, Flavour, hasLeading) are set here.
- **Dropdown Menu** (Dropdown Menu, Rounded=true): Absolutely positioned 4px below the field's bottom edge. Visible only when Open=true. Contains slot containers for options. Option labels, values and slot content come from the implementation.
- **Hint** (Input Hint, toggled by Show Hint): Supporting line below the field. Guidance at rest; the validation reason when its Type is error. The icon toggle is on the hint sub-component, not the assembly.
- **Placeholder vs Value** (Text in field — not parameterised): Enabled/focus states show placeholder ("Select an option") in foregroundDisabled. Filled/open states show the selected value in foregroundPrimary. The actual label text, hint text, option labels, selected value and error message are all implementation concerns, not assembly inputs.

**Input / Select**
- **Display text** (not parameterised): The placeholder before selection and the chosen value afterward. Neither is exposed as an input on the field, so both come from the implementation.
- **Leading icon** (nested Icon, toggled by hasLeading): Off by default. When on it takes an Icon at Size=medium, 20 square, and the glyph is swappable through the Icon's own Name property.
- **Trailing chevron** (always present): Points down in all states except open, where it points up. It is decorative within a single trigger and does not expose a separate toggle.

## Usage

**Select — Do**
- Keep Show Label on. The placeholder disappears as soon as a value is selected, leaving nothing to name the field. Always pair Show Hint=true on fields that can be validated so space is reserved before a message is needed.
- Set the nested field to State=invalid and the hint to Type=error together. The field border carries the visual signal; the hint carries the reason. Either alone is an incomplete message.

**Select — Don't**
- Don't remove the label from a visible select. There is no built-in name for the field once the placeholder is gone, and assistive technology has nothing to announce.
- Don't leave the label at full strength while the field is disabled. Set Label Disabled=true and Hint Type=disabled together. There is no automatic coordination — mismatched states create contrast inconsistencies.

**Input / Select — Do**
- Pair invalid with a Hint set to error. The border colour is the only thing invalid changes, so on its own it says something is wrong without saying what.
- Use read-only when the value should remain legible and selectable, but not editable. Native select has no readonly attribute; use an appropriate non-editable presentation pattern instead.

**Input / Select — Don't**
- Don't reach for disabled where a person still needs to read the value. read-only keeps it legible and selectable, disabled puts it out of reach and out of the tab order.
- Don't lean on the placeholder as the label. It clears the moment typing starts, so whatever it was carrying disappears exactly when it is needed.

## Accessibility

**Select**
- The label is the select's accessible name. Show Label controls only visual presence. A select without a visible label still needs its name to reach assistive technology — use aria-label or aria-labelledby in the implementation.
- The placeholder "Select an option" is decorative until a value is chosen. Do not rely on it as an accessible name; it disappears from view once State=filled.
- Keyboard behavior is an implementation requirement: Space or Enter should open the dropdown, Arrow keys should move between options, Enter should confirm, Escape should close and return focus to the trigger.
- The dropdown menu must be associated with the trigger via aria-haspopup="listbox", aria-expanded, and aria-controls in the implementation. The Figma component does not produce these attributes.
- Each menu item requires a role="option" and the selected option aria-selected="true". Visual indication of the selected state is not authored in this component; the implementation must add it.
- The required marker is an asterisk and a color. Neither alone is accessible; the required constraint must be conveyed via aria-required="true" on the control in the implementation.
- A validation message in the hint must be associated with the select via aria-describedby or a live region, otherwise it is announced as loose text with nothing tying it to the field that failed.
- The information icon on the label has no text content. If it triggers a tooltip or disclosure, give it an accessible name and a keyboard-reachable target in the implementation.
- Check the full stack at a given state. A disabled field under a full-strength label is a contrast mismatch and the Figma assembly does not flag it automatically.
- Label text should be concise, noun-first, and sentence case. Avoid starting with a verb. Hint text should be short enough to fit on one line at the field's width; multi-line hints increase the stack height unexpectedly.

**Input / Select**
- The field carries no label of its own. Select pairs it with Select Label, and a field used on its own still needs a name from the implementation.
- A placeholder is not a label. It clears the moment a value is entered, so anything a reader has to keep is not safe there.
- invalid changes the border colour and nothing else. The reason belongs in the Hint set to error, and the field has to be associated with it for the message to be announced.
- read-only and disabled look alike and behave differently. read-only keeps the value reachable and selectable, disabled takes the control out of the tab order.
- The leading icon and the chevron are glyphs with no text. Each needs a name, and the chevron needs one that says it opens or closes the options.
- At small the text drops to 14px and the control to 36 tall. Check the trailing chevron still offers a large enough target at that height.

## Layout & theming intents

**Select**

| Property | Type | Description |
|---|---|---|
| Assembly size | Fill width × hug height | Assembly height is derived from the nested input/field Size variant plus visible label and hint content, plus the 4px gaps between them. The field fills the assembly width; the label and hint hug their content. The total stack height is relational and depends on which parts are visible. |
| Gap | space/xxs = 4 | 4px between all three parts. The same gap the field uses internally between its icons and its text, so the stack and its content share one rhythm. |
| Label | Hug width and height | Hugs its text. A space/xxs gap between name, any marker and the information icon. |
| Field | Fill width | Fills the assembly width. Height is determined by its Size property. Label and hint hug their content; only the field tracks the container width. |
| Hint | Hug width and height | Hugs its content. 4px gap between optional icon and message text. Smaller than the field text so the selected value is the loudest element in the stack. |
| Dropdown Menu | Overlaid / out of normal flow | The dropdown is absolutely positioned and overlaid. Its top edge is 4px below the field's bottom edge. It does not affect assembly height; the assembly height remains determined by the visible label, field, hint, and gaps. Height is determined by the number of visible menu items. |
| Colour | Semantic tokens | Label uses foregroundPrimary, drops to foregroundDisabled when Disabled=true. Field border uses interactiveNeutralBorderDefault at rest, interactiveNeutralBorderHover on hover, borderFocus on focus/open, borderError on invalid, and interactiveNeutralBorderDisabled on disabled. Placeholder text uses foregroundDisabled; selected value uses foregroundPrimary. The dropdown menu surface uses surfaceMenu with a medium shadow. |

**Input / Select**

| Property | Type | Description |
|---|---|---|
| Size | Fixed | 280 wide and fixed, so the container sets the width rather than the content. Height is bound per size, control/lg at large for 48, control/md at medium for 40 and control/sm at small for 36. |
| Padding and gap | Fixed | space/sm top and bottom, space/md left and right, with a space/xxs gap between the leading icon, the text and the trailing control. Padding holds across all three sizes, so height alone carries the density. |
| Radius | Per Shape | radius/none when sharp, radius/sm when rounded and radius/pill when full. The four corners are bound individually rather than as a single value. |
| Surface | Per Flavour | interactive/neutral/background/default on default and gradient, moving to interactive/neutral/background/disabled when disabled. Ghost carries no surface of its own, so whatever sits behind it shows through. |
| Border | Per Flavour | Default draws at 1px and rises to 2px on focus. Gradient keeps those weights and draws its border from the gradient tokens: a foreground/gradient/start to foreground/gradient/end gradient at rest and when filled, border/gradient/end on hover and border/gradient/start when selected or typing. Focus, invalid, read-only and disabled use the same tokens as default. Ghost holds a bound border at zero weight, which is a theming hook rather than an absent border, so a high contrast variable set can give it a hard outline. |
| Text | Theming | body/medium at 16px for large and medium, body/small at 14px for small. The colour changes with state, which States and Triggers sets out. |
| Icons and controls | Fixed | Every icon is Size=medium at 20 square at large and medium, and Size=small at 16 square at small, and the inner text frame fills whatever width they leave. At large one icon costs 24 including its gap, taking the text from 254 to 230, and two take it to 206. Every icon and control, leading, trailing, the type control and clear, draws foreground/primary like the value, and foreground/disabled when the field is disabled. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-3495) · [Select](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6602-712) · [closed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6602-542) · [open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6602-646) · [Input / Select](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-110)
- Field sizes: [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-116) · [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-131) · [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-146)
- Field states: [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-225) · [open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-279) · [filled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-383) · [invalid](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-428) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-518) · [gradient open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-711) · [ghost open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6601-1143)
- Metadata: [Select](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-6027) · [Select Field](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-6265) · Details cards: [Select Field](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-3497) · [Select](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6597-4877)

## Issues

### Warn — page text copied from Input

1. **The Select details card has Input's description.** The card's Description (`6597:4877`) is Input's card text, word for word: "A labelled text field, pairing a name above the control with a supporting line below it. Type selects which of five input types fills the middle, text, number, password, date or time, …". Select has no Type and no five input types. The set's own description on `6602:712` is correct and could replace it.
2. **The Select Metadata header says "INPUT · COMPONENT METADATA".**
3. **Select Field Metadata still describes Input Field in four places:**
   - Layout › Border says gradient uses `border/gradient/start` "when selected or typing". This field has neither state; it is open that uses that token.
   - Layout › Icons and controls describes "two" icons and "leading, trailing, the type control and clear". This field has a leading icon and the chevron only.
   - Don't: "It clears the moment typing starts". Nobody types into a select.
   - Accessibility: "Select pairs it with Select Label". The component is Input Label.
4. **There is no `hasLeading=true` row** in the Select Field Property Breakdown.

### Warn — metadata vs build

5. **Open shows the placeholder, not a value.** Content & Slot says "Filled/open states show the selected value". The open variant shows "Select an option" in `foreground/disabled`.
6. **The selected row is described three different ways.**
   - The set description says "Mark the chosen row with State=selected and a check-mark trailing icon".
   - Accessibility says "Visual indication of the selected state is not authored in this component".
   - The open sample has no selected row and no check mark: row 1 is at hover.
7. **The two metadata frames give different keyboard models.** Select says "Space or Enter should open the dropdown"; Select Field says "Open on Alt+Down or Enter".
8. **The metadata describes an assembly-level state that Select doesn't have.** It says invalid, disabled and read-only "cascade" from the assembly, and gives the trigger as "Set on the element". Select exposes no State; Figma sets each part on its own. Follow the specs/input/ decision: code owns a general state on the assembly.
9. **Truncated text.** Open=true reads "positioned at base ." and States › open reads "positioned at below the field". Both are missing a value; elsewhere the metadata says 4px below the field's bottom edge.
10. **Ghost hides the open state.** Ghost's border weight is `stroke/base` (zero) everywhere except focus and invalid; this is inherited from Input. Open on ghost therefore draws no border, and only the chevron flip shows that the list is open.

### Warn — experimental code vs Figma

`packages/react-baseui/src/components/select/Select.tsx` and `select.css`, story `Experimental/Select`. No code was changed. **packages/web-components has no Select.**

11. **The state name for an open list differs.** Figma's Input / Select has `State=open` and no selected or typing state. The code sets Input Field's `data-state="selected"` while open. The tokens are the same, but the name is not, and the `InputFieldState` type the code borrows also carries focus, selected and typing.
12. **Chevron:** Figma swaps the glyph, `expand-more` closed and `expand-less` open. The code always draws `expand-more` and rotates it 180 degrees on `[data-popup-open]`. Size and colour match: Icon medium (small at small), with currentColor taking `foreground/primary` and `foreground/disabled`.
13. **List positioning is different in four ways.** Figma has the menu as a child of the assembly, absolutely positioned 4 Px under the field. In code it is portalled to `document.body`, using Base UI's Positioner with `sideOffset` set to `--space-xxs` (the same 4 Px).
    - **Width:** in Figma it equals the field's. In code it is `min-inline-size: var(--anchor-width)`, so it can be wider.
    - **Height:** Figma has no cap. In code it is capped at `--available-height` and scrolls.
    - **Direction:** Figma always opens below. Code can flip above on collision.
    - **Stacking:** code adds `z-index: 1`.
14. **List shape:** in Figma the Dropdown Menu is always `Rounded=true`. The code makes a sharp field open a sharp list (`data-rounded = shape !== "sharp"`).
15. **Missing in code:** there is no label information icon (Show Information) and no way to hide the hint icon (Show Icon).
16. **Placeholder default:** Figma uses "Select an option"; the code defaults to "Select…".

### Note

- **Experimental code: the spec pointers are stale.** The `Select.tsx` docblock ("no Figma spec yet", `@spec none`), `select.css` ("Spec: none yet") and the story's docs ("no Figma spec") can now point at this spec.
- **Experimental code: precedence.** The code orders states disabled > open > invalid > read-only > filled > enabled, so an invalid field loses its error border while open. Figma has no combined state to compare against.
- **Experimental code: focus** comes from `:focus-visible`: an outline in `border/focus` at `stroke/thick`, with the inside border transparent. It never sets `data-state="focus"`. This matches Figma's focus visually.
- **Experimental code: the selected row** uses Base UI's ItemIndicator with a trailing `check-mark` (in the font, not retired) and the Menu Item `[data-selected]` tint `interactive/ghost/background/selected`. This follows the set description, not the sample.
- **Experimental code: the API.** Every prop lives on the assembly:
  - from Figma's nested parts: `size`, `shape`, `flavour`, `state` (default, invalid, disabled), `readOnly`, `labelType`, `leadingIcon`;
  - `label` and `hint`, where an empty value hides the part, standing in for showLabel and showHint;
  - `options`, controlled or uncontrolled `value` and `open`, `name`, `portalContainer` and `aria-label`.

  This is consistent with specs/input/. A chosen option's own icon replaces the leading icon, which Figma does not model.
- **Experimental code: hover** comes from `input-field.css :hover`, which applies only on enabled and filled. Figma doesn't model hover on invalid or read-only either.
- **Experimental code: what matches.** Default size, shape and flavour are medium, rounded and default in both. Width fills the container (Figma's 280 is a placeholder). Read-only matches. Keyboard handling is Base UI's listbox select, which settles the metadata contradiction in practice.
- **Details cards:**
  - The Select Field card no longer carries Search's description; it now describes a select. It lists "default, hover, focus, open, disabled, and error states": Figma names these enabled and invalid, and the card leaves out filled and read-only.
  - Both cards' change logs still show "Haashir · Aug 10, 26 · Created" and a Created date of Aug 10, 2026. These look carried over from a template.
- **Menu:**
  - Its width is a fixed 280 Px set by hand, not bound to the field (an absolute child cannot fill).
  - The 4 Px offset is a position, not a token. Its value equals `space/xxs`.
- **Assembly sizing:** the metadata says "Fill width". The variants are fixed 280 wide and hug their height, because a Figma root cannot fill.
- **Placeholder text:** Input / Select's own text is "Placeholder"; Select overrides it to "Select an option".
- **Label default:** Select places Input Label with Show Information off, where the label set's own default is on.
- **Typo:** "These ae the assembly-level state" (verbatim).
- Both metadata frames are complete. No motion is defined. There are no private subcomponents, and no gaps or binding drift.
