# Icon Button

Triggers an action from a single glyph, with no text label. Square at every size, and it carries the same nine flavours, three shapes and four states as Button so the two sit together consistently. Nothing on it is readable, so every instance needs an accessible name in code. When the action can carry a word, use Button instead.

Source: [The Zebra Design System › Button page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1763) (set `2338:1763`, 405 variants) · extracted 2026-10-18 · default `Size=small, Shape=sharp, Flavour=primary, State=default, Disabled=false` · also verified in the [Snackbar working copy](https://www.figma.com/design/a141EitftpzBk3asu3a315/Snackbar?node-id=2338-1680) (2026-10-18): identical

> **Values are token names.** Resolved values live in [tokens/](../../tokens/). The only literals are measurements (suffixed Px) and the untokenised paint opacities called out in Issues.

> **How to read the variant tables.** 405 = 9 Flavour × 3 Size × 3 Shape × 5 State/Disabled. Size and Shape carry all geometry, Flavour and State/Disabled all colour (checked across all 405), so the three tables below describe every variant.

> **No blockers, 8 warnings.** See [Issues](#issues). Sibling: [Button](../button/button.spec.md).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `flavour` | enum | `primary`, `positive`, `negative`, `subtle`, `text`, `outline-subtle`, `outline`, `gradient`, `text-gradient` | `primary` |
| `size` | enum | `small`, `medium`, `large` | `small` |
| `shape` | enum | `sharp`, `rounded`, `full` | `sharp` |
| `state` | enum | `default`, `hover`, `pressed`, `focus` | `default` |
| `disabled` | boolean |  | `false` |
| `label` | string |  | `null` |

### Per-value intent (verbatim)

**flavour**
- `primary`: The one action in a cluster that matters most, such as the confirm in a toolbar. More than one primary in a row of icon buttons removes the distinction it exists to make.
- `positive`: Confirms a constructive outcome. With no label the colour is doing all the work, so reserve it for cases where the glyph already reads as approval.
- `negative`: Destructive actions such as delete. Colour alone is a weak warning, so back it with a confirmation step rather than relying on the red to stop anyone.
- `subtle`: A quiet action that should not compete with its neighbours, the usual choice for secondary toolbar controls.
- `text`: A tertiary action inside dense content. Nothing sits behind it at rest, so on a busy surface the target becomes hard to find even though it is still there.
- `outline-subtle`: A secondary action that needs a visible edge without pulling attention, for toolbars that are already busy.
- `outline`: A secondary action that still needs to read as a control on its own, carrying the accent edge.
- `gradient`: One promotional moment. In a row of icon buttons it wins every time, which is only useful when that is the intent.
- `text-gradient`: The promotional treatment without the filled weight. The gradient runs across a single small glyph, so it reads as a colour shift more than a gradient.

**size**
- `small`: The default, for dense toolbars and table rows. At 36px square it sits below the 40px minimum target the system defines, so avoid it where the control will be tapped.
- `medium`: Meets the system's 40px minimum target, the safe default whenever the control can be tapped.
- `large`: For a prominent standalone action, or a primary target on a touch surface.

**shape**
- `sharp`: Match the container. Correct when the surrounding surface and inputs are square.
- `rounded`: Match the container. The general-purpose choice alongside the system's other rounded controls.
- `full`: A circular button, the usual choice for a floating or standalone action. It reads as clearly separate from a form control, which is why it looks wrong inside one.

**state**
- `default`: The resting state, and the only one to use when laying out a static screen.
- `hover`: Documents the pointer-over treatment. The implementation drives this, so choosing it in a layout freezes the button in a state it should not be in.
- `pressed`: Documents the pointer-down treatment, with the same caveat as hover.
- `focus`: Documents the keyboard focus treatment. The one state whose treatment is identical on every flavour.

**disabled**
- `false`: The control accepts input.
- `true`: The action is unavailable. With no label there is nothing on the control to explain why, so put the reason in a tooltip or adjacent text.

**label**: Not a Figma property. The metadata: 'every instance needs an accessible name in code.'

## Internal variations

- **`icon`** via Icon (nested, exposed): any glyph in packages/icons; default more-horizontal (Figma: More Horizontal / Style=rounded). The only content this component has. It arrives holding More Horizontal, which reads as an overflow menu, so leaving it unchanged will actively mislead. An instance swap on the nested Icon, not an Icon Button property. Icon's Size and Framed stay reachable on the exposed instance; Icon Button pins Size (small -> Icon small; medium and large -> Icon medium) and Framed=false.

## Anatomy

1. **root** (container) — *"The button's own frame, fixed square at every size. Carries the background, the border and the radius, and never hugs its content."*  
   layout: {"direction": "horizontal", "padding": "space/xs on all four sides", "primaryAlign": "center", "counterAlign": "center"} · sizing: {"h": "fixed", "v": "fixed", "widthToken": "control/sm (small) \u00b7 control/md (medium) \u00b7 control/lg (large)", "heightToken": "same as width"} · clips: true · radius: per shape · paint: {"fill": "per flavour \u00d7 state", "stroke": "per flavour \u00d7 state, inside; focus outside"}
2. **icon** (instance) — *"A single Icon instance, always visible and centred. Icon Button sets its size and leaves the instance exposed."*  
   ref: Icon · glyph: more-horizontal (default) · size: Icon Size=small at small (16), Size=medium at medium and large (20) · color: per flavour × state (overridden on the Icon's glyph) · exposed: true

## Variants

Cells are token names; …Px cells are measurements. Geometry depends only on Size and Shape, colour only on Flavour, State and Disabled (all 405 variants scanned).

### By size (geometry)

| size | root (both axes) | padding | icon | iconPx |
|---|---|---|---|---|
| small | `control/sm` | `space/xs` | Icon Size=small | 16 |
| medium | `control/md` | `space/xs` | Icon Size=medium | 20 |
| large | `control/lg` | `space/xs` | Icon Size=medium | 20 |

### By shape

| shape | radius |
|---|---|
| sharp | `radius/none` |
| rounded | `radius/element-sm` |
| full | `radius/pill` |

### By flavour × state (colour)

Colour only; identical at every Size and Shape. stroke/base draws nothing (see issues); stroke/thin draws inside; focus replaces the resting border with border/focus at stroke/thick outside the bounds. 'disabled' is Disabled=true, which exists only with State=default, except outline-subtle (see issues).

| flavour | state | background | border | glyph |
|---|---|---|---|---|
| primary | default | `interactive/primary/background/default` | `interactive/primary/border/default` · base | `interactive/primary/foreground/default` |
| primary | hover | `interactive/primary/background/hover` | `interactive/primary/border/hover` · base | `interactive/primary/foreground/default` |
| primary | pressed | `interactive/primary/background/pressed` | `interactive/primary/border/pressed` · base | `interactive/primary/foreground/default` |
| primary | focus | `interactive/primary/background/focused` | `border/focus` · thick, outside | `interactive/primary/foreground/default` |
| primary | disabled | `interactive/primary/background/disabled` | `interactive/primary/border/disabled` · base | `interactive/primary/foreground/disabled` |
| positive | default | `interactive/positive/background/default` | `interactive/positive/border/default` · base | `interactive/positive/foreground/default` |
| positive | hover | `interactive/positive/background/hover` | `interactive/positive/border/hover` · base | `interactive/positive/foreground/default` |
| positive | pressed | `interactive/positive/background/pressed` | `interactive/positive/border/pressed` · base | `interactive/positive/foreground/default` |
| positive | focus | `interactive/positive/background/focused` | `border/focus` · thick, outside | `interactive/positive/foreground/default` |
| positive | disabled | `interactive/positive/background/disabled` | `interactive/secondary/border/disabled` · base | `interactive/destructive/foreground/disabled` |
| negative | default | `interactive/destructive/background/default` | `interactive/destructive/border/default` · base | `interactive/destructive/foreground/default` |
| negative | hover | `interactive/destructive/background/hover` | `interactive/destructive/border/hover` · base | `interactive/destructive/foreground/default` |
| negative | pressed | `interactive/destructive/background/pressed` | `interactive/destructive/border/pressed` · base | `interactive/destructive/foreground/default` |
| negative | focus | `interactive/destructive/background/focused` | `border/focus` · thick, outside | `interactive/destructive/foreground/default` |
| negative | disabled | `interactive/destructive/background/disabled` | `interactive/destructive/border/disabled` · base | `interactive/primary/foreground/disabled` |
| subtle | default | `interactive/ghost/background/default` @ 0 | `interactive/neutral/border/default` · base | `foreground/primary` |
| subtle | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/neutral/border/default` · base | `foreground/primary` |
| subtle | pressed | `interactive/ghost/background/pressed` @ 0.1 | `interactive/neutral/border/default` · base | `foreground/primary` |
| subtle | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `foreground/primary` |
| subtle | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/neutral/border/disabled` · base | `interactive/neutral/foreground/disabled` |
| text | default | `interactive/ghost/background/default` @ 0 | `interactive/ghost/border/default` · base | `interactive/ghost/foreground/default` |
| text | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/ghost/border/hover` · base | `interactive/ghost/foreground/default` |
| text | pressed | `interactive/ghost/background/pressed` @ 0.1 | `interactive/ghost/border/pressed` · base | `interactive/ghost/foreground/default` |
| text | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/ghost/foreground/default` |
| text | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · base | `interactive/ghost/foreground/disabled` |
| outline-subtle | default | `interactive/ghost/background/default` @ 0 | `interactive/neutral/border/default` · **thin** | `interactive/neutral/foreground/default` |
| outline-subtle | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/neutral/border/hover` · **thin** | `interactive/neutral/foreground/default` |
| outline-subtle | pressed | `interactive/ghost/background/pressed` @ 0.1 | `interactive/neutral/border/pressed` · **thin** | `interactive/neutral/foreground/default` |
| outline-subtle | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/neutral/foreground/default` |
| outline-subtle | disabled (named State=focus) | `interactive/ghost/background/disabled` @ 0 | `interactive/neutral/border/disabled` · **thin** | `interactive/neutral/foreground/disabled` |
| outline | default | `interactive/neutral/background/default` | `interactive/ghost/border/default` · **thin** | `interactive/ghost/foreground/default` |
| outline | hover | `interactive/neutral/background/hover` | `interactive/ghost/border/default` · **thin** | `interactive/ghost/foreground/default` |
| outline | pressed | `interactive/neutral/background/pressed` | `interactive/ghost/border/default` · **thin** | `interactive/ghost/foreground/default` |
| outline | focus | `interactive/neutral/background/focused` | `border/focus` · thick, outside | `interactive/ghost/foreground/default` |
| outline | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · **thin** | `interactive/ghost/foreground/disabled` |
| gradient | default | gradient `surface/gradient/start` → `surface/gradient/end` | `interactive/primary/border/default` · base | `interactive/primary/foreground/default` |
| gradient | hover | `surface/gradient/end` | `interactive/primary/border/hover` · base | `interactive/primary/foreground/default` |
| gradient | pressed | `surface/gradient/start` | `interactive/primary/border/pressed` · base | `interactive/primary/foreground/default` |
| gradient | focus | `surface/gradient/start` | `border/focus` · thick, outside | `interactive/primary/foreground/default` |
| gradient | disabled | `interactive/primary/background/disabled` | `interactive/primary/border/disabled` · base | `interactive/primary/foreground/disabled` |
| text-gradient | default | `interactive/ghost/background/default` @ 0 | `interactive/ghost/border/default` · base | gradient `foreground/gradient/start` → `foreground/gradient/end` |
| text-gradient | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/ghost/border/hover` · base | `foreground/gradient/end` |
| text-gradient | pressed | `interactive/ghost/background/pressed` @ 0.1 | `interactive/ghost/border/pressed` · base | `foreground/gradient/start` |
| text-gradient | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `foreground/gradient/start` |
| text-gradient | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · base | `interactive/ghost/foreground/disabled` |

## Dependencies

- **Icon** (`2046:15010`): Font glyph, rounded family by default (sharp when the implementation pins shape=sharp, as Button does). Default glyph more-horizontal is in codepoints.json and not retired.

## Tokens & theming

- **color:** `interactive/{primary,positive,destructive}/background/{default,hover,pressed,focused,disabled}`, `interactive/{primary,positive,destructive}/border/{default,hover,pressed,disabled}`, `interactive/{primary,positive,destructive}/foreground/{default,disabled}`, `interactive/neutral/background/{default,hover,pressed,focused}`, `interactive/neutral/border/{default,hover,pressed,disabled}`, `interactive/neutral/foreground/{default,disabled}`, `interactive/ghost/background/{default,hover,pressed,focused,disabled}`, `interactive/ghost/border/{default,hover,pressed,disabled}`, `interactive/ghost/foreground/{default,disabled}`, `interactive/secondary/border/disabled`, `border/focus`, `surface/gradient/{start,end}`, `foreground/gradient/{start,end}`, `foreground/primary`
- **dimension:** `control/sm`, `control/md`, `control/lg`, `space/xs`, `radius/none`, `radius/element-sm`, `radius/pill`, `stroke/base`, `stroke/thin`, `stroke/thick`
- **Theme axes:** palette (Light, Dark) · size and typography modes (no effect on this component) · extensions in tokens/extensions/

## States, behavior & motion

| State | Trigger | What changes |
|---|---|---|
| default | Resting | Background, border and glyph sit on the default tokens of the chosen flavour. |
| hover | Pointer over the control | Filled flavours move their own background token one step. Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent. The gradient flavours keep their gradient and slide it toward the end colour rather than swapping it (see Gradient transition). Apart from text-gradient, the glyph colour does not change on any flavour. |
| pressed | Pointer held down | The same mechanism as hover carried one step further. The gradient flavours slide the other way, toward the start colour, rather than collapsing to a flat token (see Gradient transition). |
| focus | Keyboard focus | A focus ring is drawn outside the bounds, replacing the resting border rather than adding to it. Identical on all nine flavours, and the only state that changes the control's outer footprint. |
| disabled | Disabled set to true | Background and glyph swap to the disabled tokens of their family. No flavour keeps its accent colour, so a disabled destructive button is indistinguishable from any other disabled one. |

- **Motion:** Figma stores no timing. Every state change is colour-only, with no scale, shadow or elevation shift on any flavour, so a transition should read as a tint change rather than movement. The gradient flavours are the one exception to a plain tint: their gradient moves (see Gradient transition).
- **Gradient transition:** gradient and text-gradient keep their gradient through every state and move it rather than replace it. On hover the gradient slides until its end colour covers 100% of the fill (the glyph on text-gradient); on press it slides the other way until its start colour covers 100%. Leaving or releasing slides it back to the resting two-stop gradient. It must never jump from the gradient to a flat colour: a browser cannot interpolate between a gradient and a solid fill, so that swap shows as a flicker. The hover and pressed variants show where each slide ends, not a separate flat fill.
- **Focus ring:** The only change that alters the control's outer footprint, because the ring is drawn outside the bounds. Leave room around a button in a tight toolbar so the ring is not clipped.
- **Resize:** The control never resizes with its content. Both axes are fixed per Size, so swapping the glyph changes nothing about the footprint.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Icon glyph | instance swap on the nested Icon | The only content this component has. It arrives holding More Horizontal, which reads as an overflow menu, so leaving it unchanged will actively mislead. |
| Icon Size and Framed | exposed on the nested instance | Icon Button does not re-declare them, but the nested Icon stays exposed so both remain reachable in the properties panel. The button already pairs the glyph size to its own Size, and Framed would nest a 40px box inside an already-sized control. See the Icon Metadata frame for what Icon offers on its own terms. |

## Usage

**Do**
- Give every icon button an accessible name in code. Nothing on the control is readable, so without one it is announced only as a button.
- Use medium or large wherever the control will be tapped. Small is 36px, under the 40px minimum target the system sets for itself.

**Don't**
- Don't leave the default More Horizontal glyph in place. It reads as an overflow menu and will be understood as one.
- Don't use an icon button where the action needs explaining. If it takes a word to be clear, Button carries one and this component cannot.

## Accessibility

- Nothing in this component is readable, so every instance needs an accessible name in code. The glyph is decorative on its own.
- Small is 36px square, below the 40px minimum target the system defines as control/target-min. Prefer medium or large wherever the control is tapped.
- Focus is drawn as a ring outside the control and is identical on every flavour, so it stays visible whatever the button sits on.
- Disabled is visual only, and with no label there is nothing on the control to explain why. Put the reason in a tooltip or adjacent text.
- Colour is the only thing separating a destructive icon button from a neutral one, so back a destructive action with a confirmation step.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed square per Size | 36×36 at small (control/sm), 40×40 at medium (control/md), 48×48 at large (control/lg). Both axes bind to the same token, so it is always square and never hugs its content. |
| Padding | Fixed | 4px (space/xs) on all four sides at every size. |
| Radius | Fixed per Shape | 0 (radius/none) for sharp, 4px (radius/element-sm) for rounded, 9999 (radius/pill) for full, which gives a circle. All three are token-bound, so match the container rather than overriding on the instance. |
| Border | Fixed per Flavour | 1px drawn inside on outline and outline-subtle, none on the other seven at rest. Focus replaces it with a 2px ring drawn outside the bounds. |
| Glyph size | Fixed per Size | 16px at small, 20px at medium and large. Large reuses Icon's medium step, so the glyph does not grow between medium and large even though the button does. |
| Touch target | Fixed per Size | Small is 36px, under the 40px control/target-min the system defines. Medium meets it exactly and large exceeds it. |
| Colour | Theming | Every fill, border and glyph colour is bound to an interactive/* token for the flavour. Gradient draws from surface/gradient/*, text-gradient from foreground/gradient/*, and focus from border/focus. No variant hardcodes a colour. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1763) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4732-1074)
- [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1764)
- [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1779)
- [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1794)
- [rounded](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1769)
- [full](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-1774)
- [hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-2084)
- [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-2219)
- [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-2174)
- [outline-subtle disabled (named State=focus)](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2338-2939)

## Issues

### Warn


1. *structure (variant naming)*: outline-subtle has no State=default, Disabled=true variant. Its nine disabled variants are named State=focus, Disabled=true (e.g. 2338:2939), where every other flavour pairs Disabled=true with State=default. Picking Disabled=true at the resting state for outline-subtle in Figma has no exact match; treat the State=focus variants as outline-subtle's disabled treatment.
2. *structure vs metadata (disabled glyph)*: States & Triggers: 'Background and glyph swap to the disabled tokens of their family.' Two flavours take another family's glyph token when disabled: positive uses interactive/destructive/foreground/disabled and negative uses interactive/primary/foreground/disabled. positive's disabled border is also interactive/secondary/border/disabled, as on Button.
3. *structure vs Button (subtle glyph)*: subtle draws its glyph in foreground/primary at rest, where Button's subtle label (and Icon Button's own outline-subtle glyph) use interactive/neutral/foreground/default. Disabled returns to interactive/neutral/foreground/disabled.
4. *structure vs Button (outline disabled)*: outline at Disabled=true draws interactive/ghost/background/disabled @ 0 with an interactive/ghost/foreground/disabled glyph at every size; Button's outline disabled draws interactive/neutral/background/disabled with interactive/neutral/foreground/disabled at eight of nine sizes. The two components disagree.
5. *structure vs metadata (hover grouping)*: States & Triggers groups outline-subtle with outline ('hold their border and shift a neutral background underneath'); in the file outline-subtle and subtle raise the ghost scrim like text. Only outline shifts a neutral background.
6. *gaps*: The scrim flavours (text, text-gradient, subtle, outline-subtle) set a paint-level opacity of 0 / 0.05 / 0.10 on interactive/ghost/background/*. Those tokens already carry the scrim in their own alpha (default and disabled 0%, hover 5%, pressed 10%, in Light and Dark), so Figma applies it twice: the hover scrim renders at about 0.25% and pressed at 1%, practically invisible. Code binds the tokens directly with no paint opacity (the intended 5% / 10%); the Figma paints should drop their opacity to 1.
7. *tokens*: stroke/base resolves to 0px although its description reads '= 1px, source: scale/0', so seven flavours carry a bound but invisible border. control/sm, control/md, control/lg, space/xs and radius/element-sm also carry descriptions that state the wrong px value (see the Button spec's descriptionDrift issue); build from the resolved values, which match the metadata.

### Note

- *code (gradient transition)*: Built 2026-10-18 in <zds-button>, <zds-icon-button>, react-baseui Button and IconButton: the gradient flavours no longer swap to a flat colour. One gradient three times the size of the fill holds the two stops in its middle third (the resting look is unchanged: start at 0%, end at 87%); hover slides its position until the end colour covers 100%, press until the start colour covers 100%, and the position transitions with the other flavours' tints. text-gradient runs the same slide across the label's text and the icons. Web and React were compared in a browser: pixel-identical at rest, hover and pressed.
- *structure (gradient transition)*: The gradient variants agree with the intended transition (corrected 2026-10-18: hover slides to the end colour, press to the start). gradient hover binds surface/gradient/end and pressed surface/gradient/start; text-gradient hover foreground/gradient/end and pressed foreground/gradient/start. Each variant shows where its slide ends, as the metadata says. Focus also binds the start colour; the metadata gives focus only the ring, so code keeps the resting gradient at focus.

- *code (packages/web-components zds-icon-button, packages/react-baseui IconButton)*: Built 2026-10-18 in both packages: <zds-icon-button> (web components) and IconButton (react-baseui, on Base UI's Button). Both reuse Button's colour, border, shape, focus and disabled rules and add only the square geometry (control/sm|md|lg, space/xs), with the glyph at Icon small / medium / medium and more-horizontal as the default glyph; label is the required accessible name. They follow the label-colour rule rather than three bindings flagged above (subtle's glyph on foreground/primary; positive and negative disabled glyphs from another family), and text-gradient's glyph is the flat foreground/gradient/start, since a font glyph carries no label to run the gradient across. Web and React were compared in a browser: identical box, radius, glyph size and colours for every flavour at rest, hover, pressed and disabled.

9. *api*: Disabled is a two-option VARIANT axis and State is documentation-only; in code disabled is a boolean and hover/pressed/focus are interaction states. Figma returns options in creation order (Size: large, medium, small); the metadata's order is the order to ship.
10. *api (accessible name)*: There is no label property in Figma; the metadata requires an accessible name in code on every instance, recorded here as the code-only `label`.
12. *dependencies*: Icon (2046:15010) is local but on the Icon page; the default glyph more-horizontal (Figma: More Horizontal) is in packages/icons and not retired. The glyph colour is set by overriding the Icon's glyph fill per flavour, not by a token on Icon Button's root.
13. *coverage*: Motion is not modelled ('Figma stores no timing'); no effects or shadows; the full scan found no untokenised colours and no binding drift across the 405 variants, glyph colour included.
