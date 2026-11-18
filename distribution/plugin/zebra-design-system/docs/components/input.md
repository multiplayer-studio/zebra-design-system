# Input

> The full field assembly, a label above, the field itself and a hint below, stacked and spaced as one unit. Type chooses which of the five field types sits in the middle, and the label and the hint can each be turned off. Use it wherever a field needs a name or supporting text, and use Input Field on its own where it needs neither.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-text-input>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `type` | slot | `Input / Text (medium, rounded, enabled, default)` |  |  |
| `showLabel` | boolean | `true` |  |  |
| `showHint` | boolean | `true` |  |  |
| `subLabel` | string | `` |  |  |
| `state` | enum | `default` | `default` `invalid` `disabled` |  |
| `block` | boolean | `false` |  |  |

## When and how to use

### Do

- Keep Show Label on. The field has no name of its own, and the placeholder that might stand in for one disappears the moment someone starts typing.
- Move the field to invalid and the hint to error together. One carries the signal and the other carries the reason, and either on its own is half a message.
- Pick the type that matches the value. The placeholder and the trailing control arrive with it, and together they tell a person what is expected before they type anything.

### Don't

- Don't turn Show Hint off on a field that can fail validation. The message has nowhere to land, and adding the line later pushes everything below it down.
- Don't leave the parts on different states. A full strength label over a disabled field reads as a mistake rather than a style, and nothing in the assembly prevents it.
- Don't use disabled where a person still needs to read the value. read-only keeps it legible and selectable, disabled puts it out of reach and out of the tab order.
- Don't lean on the placeholder as the label. It clears the moment typing starts, so whatever it was carrying disappears exactly when it is needed.

## Behaviour

- **Motion** — No transition is defined on the assembly or the field. Each part swaps its own tokens.
- **Composition** — Three parts stacked vertically, with the height hugging them. Turning off the label or the hint removes its height rather than leaving a gap, so the stack shortens and whatever sits below it moves up.
- **State coordination** — The assembly own general states which it's children inherits (Invalid, disabled). Anything that reads as one state across the label, the field and the hint is three independent settings held in agreement by the assembly.
- **Typing lifecycle** — The run is enabled, focus, selected, typing, filled. Only typing carries the clear control, so emptying the field from inside it is available while a value is being entered and not after it is committed.
- **Validation and lock** — invalid and read-only sit outside that run. The surrounding form sets them rather than the field reaching them by interaction, and invalid pairs with the Hint set to error, which carries the reason.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | Input Label, toggled by Show Label | The field's name, with an optional required or optional marker and an information icon. The assembly exposes only whether it shows, so the marker, the dimming and the icon are all set on the label. |
| Field | Input Field, chosen by Type | The control itself. An Input arrives with it at Size=medium and Shape=rounded, and everything it offers, Size, Shape, State and Flavour, is set on the field rather than surfaced by the assembly. A column of these does not share one size unless every field is set to match. |
| Hint | Input Hint, toggled by Show Hint | The supporting line under the field, carrying guidance at rest and the validation message when its Type is error. Its icon is a separate toggle on the hint. |
| Text content | not parameterised | The name, the hint and the message are not exposed as inputs on the assembly, so all three come from the implementation. On the field, the value and the placeholder likewise come from the implementation; the placeholder is what distinguishes the types. |
| Clear control | typing only | Appears at the trailing position while typing and is the only way to empty the field from within it. Where the type already carries its own control the two sit together in a 57 wide group rather than one replacing the other. |

## Accessibility

- The label is the field's name. Show Label controls only whether it is visible, so a field without a visible label still needs its name to reach assistive technology.
- The required marker is an asterisk and a colour, and neither is readable on its own. The requirement has to be carried in the field's semantics as well as shown.
- (optional) is a word rather than a symbol, so it reads where the asterisk does not. Mark whichever of required or optional is the exception in the form, not both.
- A validation message in the hint has to be associated with the field, or it is announced as loose text with nothing tying it to what failed.
- The information icon on the label has no text. Where it opens an explanation it is a control, so it needs a name and a target of its own.
- The three parts dim independently. Check the whole stack at one state, because a disabled field under a full strength label is a contrast mismatch that neither part shows on its own.
- A placeholder is not a label. It clears the moment a value is entered, so anything a reader has to keep is not safe there.
- read-only and disabled look alike and behave differently. read-only keeps the value reachable and selectable, disabled takes the control out of the tab order.
- The leading icon, the clear control and any type control are glyphs with no text. Each needs a name, and the clear control needs one that says what it clears.
- At small the text drops to body/small and the control to control/sm. Check the trailing control still offers a large enough target at that height.

---
*Generated from `specs/input` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
