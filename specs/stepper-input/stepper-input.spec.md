# Stepper Input

A numeric value with a button on either side to decrease or increase it. The value itself is fixed text rather than a property, the two buttons are locked step controls with no properties of their own reachable from here, and an optional line of hint text can sit below the whole control.

Source: [Stepper Input page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5595-122) · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `size` | enum | medium, large | `medium` | variant |
| `rounded` | enum | false, true | `false` | variant |
| `disabled` | enum | false, true | `false` | variant |
| `showHint` | boolean | true, false | `false` | hint |

**size**: medium: "The default, for a step control sitting among other medium fields. The value and the gap around it stay the same at every size, only the two buttons grow." · large: "For a step control that needs to be easy to tap without precision."

**rounded**: false: "Square corners on the two step buttons, to match a square surrounding surface." · true: "Rounded corners on the two step buttons only, the value between them stays square either way." (The value field rounds as well in the file. See issues.)

**disabled**: false: "The control accepts input, and shows the hint text when Hint is on." · true: "The two step buttons switch to a primary fill, and the hint text is removed entirely rather than hidden. Turning Hint on has no effect while Disabled is on."

**showHint** (Figma `Hint`): false: "No hint text below the control." · true: "Adds a line of hint text below the control. Only ever shows the hint message, never the error one this part also offers, and has no effect while Disabled is on."

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues. Measurements end in Px.

## Internal variations & content inputs

**Hint message.** `_Hint text` has Message hint / error, but Stepper Input always pins it to hint. The error variant is never placed.

**Step buttons.** These are Icon Button instances, with all of their own props locked by the parent. The flavour is outline-subtle when enabled and primary + disabled when disabled. The state is always default. Shape and size follow `rounded` and `size`.

**Value.** This is static text (sample "1") on the nested Input / Text layer, not a property. In code it is the component's numeric value. The hint message (sample "Hint text") is likewise unparameterised.

## Anatomy

Root: vertical stack, gap `space/sm`, no padding, start-aligned. It is fixed width and hugs its height (168×40Px medium, 184×48Px large, measured).
Control row: horizontal, gap `space/sm`, no padding, centred, fills the root width.

1. **Decrement**: Icon Button, glyph `remove`, fixed square `control/md` / `control/lg`. "A fixed Icon Button at the Remove glyph. Locked to outline-subtle, none of its own properties reachable from here."
2. **Value**: Input / Text (type text, no leading or trailing icon). Height `control/md` / `control/lg`, fixed width (72Px, raw). Padding is `space/sm` block and `space/md` inline. The text is `body/medium`, centred, coloured `foreground/primary` (`foreground/disabled` when disabled). "A plain number on the layer, not an exposed text property."
3. **Increment**: Icon Button, glyph `add`, same treatment as decrement. "The same fixed treatment as Remove, with the Add glyph."
4. **Hint**: `_Hint text` Message=hint, below the control row. It renders when `showHint && !disabled`. "Shown as a whole by Hint, and only present when Disabled is off. Always the hint message, never the error one."

## Variants

The three axes are independent.

| size | step buttons | value height | width | height | with hint |
|---|---|---|---|---|---|
| medium | `control/md` | `control/md` | 168Px | 40Px | 64Px |
| large | `control/lg` | `control/lg` | 184Px | 48Px | 72Px |

Value width, text style, glyph size (Icon Size=medium) and gaps hold across sizes.

| rounded | step-button radius | value radius |
|---|---|---|
| false | `radius/none` | `radius/none` |
| true | `radius/element-sm` | `radius/sm` (contradicts metadata, see issues) |

| disabled | button fill | button border | value fill | value border | value text | hint |
|---|---|---|---|---|---|---|
| false | `interactive/ghost/background/default` | `interactive/neutral/border/default` @ `stroke/thin` | `interactive/neutral/background/default` | `interactive/neutral/border/default` @ `stroke/thin` | `foreground/primary` | present |
| true | `interactive/primary/background/disabled` | `interactive/primary/border/disabled` @ `stroke/base` (zero width) | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` @ `stroke/thin` | `foreground/disabled` | absent |

The glyph colour comes from Icon Button's own flavour styling (currentColor with the font).

## Subcomponents

### _Hint text (private)
Horizontal, gap `space/xxs`, hugs (16Px high). It holds an Icon (Size=small, rounded family) and a `body/xsmall` message.

| message | glyph | text colour |
|---|---|---|
| hint | `info` | `foreground/secondary` |
| error | `error` | `foreground/error` (never placed) |

The icon colour is unbound. It is a near-duplicate of Input Hint ([specs/input](../input/input.spec.md), `subcomponents.inputHint`).

### Dependencies
- **Icon Button** ([specs/icon-button](../icon-button/icon-button.spec.md)): decrement and increment.
- **Input / Text** ([specs/input](../input/input.spec.md), `subcomponents.inputField`, type text): the value.
- **Icon** ([specs/icon](../icon/icon.spec.md)): glyphs `remove`, `add`, `info`, `error` from the font, all present and not retired.
- **Button** ([specs/button](../button/button.spec.md)): *not used* by this component.

## Tokens & theming

- **Colour:** `interactive/ghost/background/default`, `interactive/neutral/background/{default, disabled}`, `interactive/neutral/border/{default, disabled}`, `interactive/primary/background/disabled`, `interactive/primary/border/disabled`, `foreground/{primary, disabled, secondary, error}`.
- **Dimension:** `control/{md, lg}`, `space/{none, xxs, sm, md}`, `radius/{none, sm, element-sm}`, `stroke/{thin, base}`.
- **Typography:** `body/medium` (value), `body/xsmall` (hint). **Glyphs:** `remove`, `add`, `info`, `error`.
- **Theme axes:** palette (Light, Dark). Size and typography each have Desktop, Mobile, Tablet and Desktop Compact.

All 24 names resolve in `tokens/`. All four glyphs are in the font.

## States, behavior & motion

There is no States & Triggers section. Disabled is the only state. Hover, pressed and focus belong to Icon Button and Input and aren't shown here.

- **Motion**: "No transition is defined for the hint text appearing or disappearing, or for Disabled or Rounded changing."

## Content & slots

- **Value** (Static text, not a property): "A plain number on the layer itself, not exposed as a text property. Changing it means editing the layer directly rather than through this component’s properties panel."
- **Remove button** (Fixed Icon Button, Remove glyph): "Locked to outline-subtle at rest, switching to primary when Disabled is on. None of Icon Button’s own properties are reachable from here."
- **Add button** (Fixed Icon Button, Add glyph): "The same fixed treatment as Remove, on the opposite side of the value."
- **Hint text** (Fixed instance, hint message only): "Shown or hidden as a whole by Hint, and only present at all when Disabled is off."

## Usage

**Do**
- Reach for Large on a touch surface where the buttons need to be easy to hit without precision.
- Turn Hint on to explain a constraint on the value, such as a minimum or a maximum.

**Don't**
- Don't expect Hint to show anything while Disabled is on, there is no hint text node to toggle on a disabled instance.
- Don't expect the error version of the hint text from this component, every instance uses the hint message, the error one is never placed.

## Accessibility

- Nothing in this file marks the value as a live region or states how it is announced when it changes. Whether screen readers hear the new value, and how the two buttons are labelled, needs confirming outside Figma.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Fixed per Size | "168px at medium, 184px at large. Grows by exactly the amount the two buttons grow, the value area stays the same width." |
| Height | Fixed per Size, hug for Hint | "40px at medium, 48px at large, plus 24px and an 8px gap when Hint is on." |
| Gap | Fixed | "8px between the step control and the hint text when both are present." |
| Value width | Fixed | "72px at both sizes, with 12px padding on the left and the top only." |
| Value type | Fixed | "16px IBM Plex Sans Regular, 24px line height. Unchanged between medium and large." |
| Button radius | Fixed per Rounded | "0 square for false, 4px for true. Set on the two step buttons only, not on the control’s outer edge." |

## Issues

**Warn**
- **The value rounds too.** The metadata says the value stays square and only the buttons round. In the file, at Rounded=true the value field is Shape=rounded (`radius/sm`).
- **Value padding is misdescribed.** The metadata says "12px padding on the left and the top only". The file has `space/sm` block and `space/md` inline on all sides, with the value centred.
- **Hint height is misdescribed.** The metadata says "plus 24px and an 8px gap". The hint line is 16Px plus a `space/sm` gap, so 24Px in total.
- **No value model.** There are no value, min, max or step props, and no behaviour at the bounds, no typing and no long-press repeat. Code has to decide these.
- **Raw value width.** The 72px width on the Input / Text instance has no token.

**Note**
- The gaps the metadata calls "Fixed 8px" are bound to `space/sm`.
- There is no invalid/error state. The `_Hint text` error variant is never placed, and the field's invalid state is unused.
- The hint is absent in disabled variants. In code, render it only when `showHint && !disabled`.
- Disabled step buttons switch to the primary flavour, while the value stays on the neutral disabled tokens.
- The value is built on Input / Text, not Input / Number.
- `_Hint text` duplicates Input Hint. Reuse the Input hint part in code.
- The hint icon colour is unbound. Input Hint uses `foreground/primary`.
- Hover, pressed and focus aren't shown. Use Icon Button's and Input's own states.
- The board's description wording differs from the metadata summary. This spec uses the metadata.
- There is no States section and Behavior has only Motion. Neither set has a description. All platforms are "Pending development".
