# Button

Triggers an action from a text label, with optional icons on either side. Eleven flavours set how much weight the action carries, three sizes and three shapes fit it to the surface it sits on. The label is the only content a consumer writes, everything else is a variant choice. When an action has no text label, use Icon Button rather than hiding this one's label.

Source: [The Zebra Design System › Button](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729) (set `2060:15072`, 495 variants) · extracted 2026-09-22, re-extracted 2026-10-18, updated 2026-10-29 for inverse and outline-inverse

> **Values are token names.** Every colour, space, radius, stroke and type value below is the Figma token name; the values themselves live in the project token export at [tokens/](../../tokens/) and are not duplicated here. The only literals are measurements (labelled as such) and the untokenised paint opacities called out in the issues.

> **How to read the variant tables.** 495 = 11 Flavour × 3 Size × 3 Shape × 5 State/Disabled. The axes are orthogonal: Size and Shape carry every geometric value, Flavour and State/Disabled carry every colour. Nothing couples them, so the three tables below describe all 495 variants between them.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `flavour` | enum | primary, positive, negative, subtle, text, outline-subtle, outline, gradient, text-gradient, contrast, outline-contrast | `primary` | container fill, border, label colour |
| `size` | enum | small, medium, large | `small` | height, horizontal padding, label wrapper padding, type ramp, icon size |
| `shape` | enum | sharp, rounded, full | `sharp` | corner radius |
| `state` | enum | default, hover, pressed, focus | `default` | colour only — documentation in Figma, driven by the implementation in code |
| `disabled` | boolean | false, true | `false` | colour only (modelled as a VARIANT axis in Figma) |
| `label` | string | — | `"Button"` | the text node |
| `leadingIcon` | boolean | false, true | `false` | visibility of the leading Icon instance |
| `trailingIcon` | boolean | false, true | `false` | visibility of the trailing Icon instance |

### Per-value intent (verbatim)

**flavour**
- **primary** — The single most important action in a view, one per group. If two buttons both read as primary, the view has two competing goals and that is a layout problem rather than a property one.
- **positive** — Confirms a constructive outcome such as approving or publishing. Reserve it for the confirmation itself, not for every agreeable action, or it stops signalling anything.
- **negative** — Destructive actions the user cannot undo, such as delete or revoke. If the cancel beside it is styled any stronger than subtle, the safe choice becomes the harder one to find.
- **subtle** — A neutral action meant to sit quietly beside a stronger one, typically the cancel next to a primary. It leans on that neighbour for contrast, so on its own it may not read as interactive.
- **text** — A tertiary action inside dense content. It has nothing behind it at rest, so on a coloured or busy surface it stops looking like a control.
- **outline-subtle** — A secondary action on a busy surface where an accent border would compete. It reads as neutral, so it is the wrong choice for the main action on that surface.
- **outline** — A secondary action that still needs to look clickable on its own. Two of them side by side read as equal weight, which is rarely what was intended.
- **gradient** — One promotional or high-emphasis moment, such as an upgrade prompt. It outranks primary, so a screen carrying two of them has no hierarchy left.
- **text-gradient** — The promotional treatment without the filled weight, for a high-emphasis action inside content. The gradient runs across the label itself, so a very short label barely shows it.
- **contrast** — The strongest neutral against the page, near-black in light mode and near-white in dark. Beside a primary it competes for weight, so pair it with outline or text instead.
- **outline-contrast** — A secondary action that pairs with contrast. Its border and label follow the page, near-black in light mode and near-white in dark.

**size**
- **small** — The default, for toolbars, table rows and dense forms where controls sit close together.
- **medium** — For standard forms and dialogs where the button is a deliberate step rather than a dense control.
- **large** — For a call to action that should be easy to hit without precision, typically the confirm on a touch surface.

**shape**
- **sharp** — Match the container. Correct when the surrounding surface and inputs are square.
- **rounded** — Match the container. The general-purpose choice alongside the system's other rounded controls.
- **full** — A deliberately soft treatment for standalone or promotional actions. Beside rounded controls in the same group it looks unintentional.

**state**
- **default** — The resting state, and the only one to use when laying out a static screen.
- **hover** — Documents the pointer-over treatment. The implementation drives this, so choosing it in a layout freezes the button in a state it should not be in.
- **pressed** — Documents the pointer-down treatment, with the same caveat as hover.
- **focus** — Documents the keyboard focus treatment. The one state whose treatment is identical on every flavour.

**disabled**
- **true** — The action is unavailable. Say why somewhere nearby, because a disabled control with no explanation is indistinguishable from a broken one.

**label** — The action the user is about to perform, written as a verb. The button hugs whatever it is given, so a long label widens the control and can break a toolbar row.

**leadingIcon** — *true:* Adds an icon before the label to reinforce the action at a glance. Choose the glyph deliberately, the slot arrives holding a default that suits almost nothing.

**trailingIcon** — *true:* Turning both icons on at small leaves very little room for the label itself. Use a trailing icon for directional or disclosure actions.

## Internal variations & content inputs

The glyph shown in either icon slot is an `INSTANCE_SWAP` on the nested **Icon** component (`Name#2167:166`), not a Button property. Both slots arrive holding *Verified* → `Style=rounded`. Whether the glyph becomes a Button prop in code is the implementer's call.

Icon's own `Size` and `Framed` properties also stay reachable on the exposed instance. Button pins them (small → Icon `small`; medium and large → Icon `medium`; always `Framed=false`), so do not expose them.

There are no sample-content sets on this page.

## Anatomy

Numbering follows the metadata frame's anatomy diagram.

1. **Container** (`root`, auto-layout frame) — *"The button's own horizontal auto-layout frame. Carries the background, the border and the radius, and holds the height fixed for the chosen Size."*
   Horizontal, `gap: space/none`, padding `space/2xs` top/bottom and `space/md` left/right at small, both axes centred. Width **hugs**, height **fixed** to `control/sm`. Clips content. Radius and paint come from `shape` and `flavour` below.
2. **Leading Icon** (`leadingIcon`, instance of Icon) — *"An Icon instance before the label, hidden until Leading Icon is turned on. Button sets its size and leaves the instance exposed."*
   Hidden by default; `visibleWhen: leadingIcon`. Sized by `control/icon-sm` at small (see the size table). Icon binds its glyph to `foreground/primary`; since 2026-10-18 Button overrides that fill in every flavour and in disabled, so the icon follows the label — see Issues for what could not be read.
3. **Label wrapper** (`label`, frame) + **Label text** (`label/text`) — *"A wrapper frame around the text. Its own horizontal padding is what separates the text from the icons, the row itself has no gap."*
   Wrapper: horizontal, `gap: space/none`, padding-x `space/2xs` at small. Text: style `label/medium` (family, weight, size, line height and letter spacing all token-bound), auto-resizes both axes, **no truncation, no wrapping**, fill from `flavour` below.
4. **Trailing Icon** (`trailingIcon`, instance of Icon) — *"An Icon instance after the label, hidden until Trailing Icon is turned on."*
   Same mechanics as the leading slot, after the label.

## Variants

### By size (geometry)

| size | height | padding-x | padding-y | label wrapper padding-x | type | icon | measured width @ "Button" |
|---|---|---|---|---|---|---|---|
| small | `control/sm` | `space/md` | `space/2xs` | `space/2xs` | `label/medium` | Icon `small` | 76 |
| medium | `control/md` | `space/md` | `space/2xs` | `space/sm` | `label/large` | Icon `medium` | 90 |
| large | `control/lg` | `space/lg` | `space/2xs` | `space/sm` | `label/large` | Icon `medium` | 98 |

The last column is a measurement of the rendered default label, not an authored value — every other cell is a token name. Resolve them in [tokens/](../../tokens/).

### By shape

| shape | radius |
|---|---|
| sharp | `radius/none` |
| rounded | `radius/element-sm` |
| full | `radius/pill` |

### By flavour × state (colour)

Identical at every size and shape, except two single variants listed under Issues. Since 2026-10-18 **subtle** and **outline-subtle** draw the transparent ghost scrim like `text`, rather than a solid neutral fill; their border and label are unchanged. Border widths are token-bound: `stroke/base` **draws nothing** (read issue 2 before implementing a border for it), `stroke/thin` draws inside, `stroke/thick` draws outside. `focus` always replaces the resting border with `border/focus` at `stroke/thick`, drawn outside the bounds. Since 2026-10-29 **contrast** is a filled flavour on `interactive/inverse/*`, and **outline-contrast** is its outline sibling: border `interactive/inverse/border/*`, label `foreground/primary`, both following the mode, with its states on `interactive/ghost/background/*`.

| flavour | state | background | border | label |
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
| positive | disabled | `interactive/positive/background/disabled` | **`interactive/secondary/border/disabled`** · base | `interactive/positive/foreground/disabled` |
| negative | default | `interactive/destructive/background/default` | `interactive/destructive/border/default` · base | `interactive/destructive/foreground/default` |
| negative | hover | `interactive/destructive/background/hover` | `interactive/destructive/border/hover` · base | `interactive/destructive/foreground/default` |
| negative | pressed | `interactive/destructive/background/pressed` | `interactive/destructive/border/pressed` · base | `interactive/destructive/foreground/default` |
| negative | focus | `interactive/destructive/background/focused` | `border/focus` · thick, outside | `interactive/destructive/foreground/default` |
| negative | disabled | `interactive/destructive/background/disabled` | `interactive/destructive/border/disabled` · base | `interactive/destructive/foreground/disabled` |
| subtle | default | `interactive/ghost/background/default` @ 0 | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | pressed | `interactive/ghost/background/pressed` @ 0.10 | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/neutral/foreground/default` |
| subtle | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/neutral/border/disabled` · base | `interactive/neutral/foreground/disabled` |
| text | default | `interactive/ghost/background/default` @ 0 | `interactive/ghost/border/default` · base | `interactive/ghost/foreground/default` |
| text | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/ghost/border/hover` · base | `interactive/ghost/foreground/default` |
| text | pressed | `interactive/ghost/background/pressed` @ 0.10 | `interactive/ghost/border/pressed` · base | `interactive/ghost/foreground/default` |
| text | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/ghost/foreground/default` |
| text | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · base | `interactive/ghost/foreground/disabled` |
| outline-subtle | default | `interactive/ghost/background/default` @ 0 | `interactive/neutral/border/default` · **thin** | `interactive/neutral/foreground/default` |
| outline-subtle | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/neutral/border/hover` · thin | `interactive/neutral/foreground/default` |
| outline-subtle | pressed | `interactive/ghost/background/pressed` @ 0.10 | `interactive/neutral/border/pressed` · thin | `interactive/neutral/foreground/default` |
| outline-subtle | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/neutral/foreground/default` |
| outline-subtle | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/neutral/border/disabled` · thin | `interactive/neutral/foreground/disabled` |
| outline | default | `interactive/neutral/background/default` | `interactive/ghost/border/default` · **thin** | `interactive/ghost/foreground/default` |
| outline | hover | `interactive/neutral/background/hover` | `interactive/ghost/border/default` · thin | `interactive/ghost/foreground/default` |
| outline | pressed | `interactive/neutral/background/pressed` | `interactive/ghost/border/default` · thin | `interactive/ghost/foreground/default` |
| outline | focus | `interactive/neutral/background/focused` | `border/focus` · thick, outside | `interactive/ghost/foreground/default` |
| outline | disabled | `interactive/neutral/background/disabled` | `interactive/ghost/border/disabled` · thin | `interactive/neutral/foreground/disabled` |
| gradient | default | linear `surface/gradient/start` 0% → `surface/gradient/end` 87% | `interactive/primary/border/default` · base | `interactive/primary/foreground/default` |
| gradient | hover | flat `surface/gradient/end` | `interactive/primary/border/hover` · base | `interactive/primary/foreground/default` |
| gradient | pressed | flat `surface/gradient/start` | `interactive/primary/border/pressed` · base | `interactive/primary/foreground/default` |
| gradient | focus | flat `surface/gradient/start` | `border/focus` · thick, outside | `interactive/primary/foreground/default` |
| gradient | disabled | `interactive/primary/background/disabled` | `interactive/primary/border/disabled` · base | `interactive/primary/foreground/disabled` |
| text-gradient | default | `interactive/ghost/background/default` @ 0 | `interactive/ghost/border/default` · base | linear `foreground/gradient/start` 0% → `foreground/gradient/end` 100% |
| text-gradient | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/ghost/border/hover` · base | flat `foreground/gradient/end` |
| text-gradient | pressed | `interactive/ghost/background/pressed` @ 0.10 | `interactive/ghost/border/pressed` · base | flat `foreground/gradient/start` |
| text-gradient | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | flat `foreground/gradient/start` |
| text-gradient | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · base | `interactive/ghost/foreground/disabled` |
| contrast | default | `interactive/inverse/background/default` | `interactive/inverse/border/default` · base | `interactive/inverse/foreground/default` |
| contrast | hover | `interactive/inverse/background/hover` | `interactive/inverse/border/hover` · base | `interactive/inverse/foreground/default` |
| contrast | pressed | `interactive/inverse/background/pressed` | `interactive/inverse/border/pressed` · base | `interactive/inverse/foreground/default` |
| contrast | focus | `interactive/inverse/background/focused` | `border/focus` · thick, outside | `interactive/inverse/foreground/default` |
| contrast | disabled | `interactive/inverse/background/disabled` | `interactive/inverse/border/disabled` · base | `interactive/inverse/foreground/disabled` |
| outline-contrast | default | `interactive/ghost/background/default` @ 0 | `interactive/inverse/border/default` · **thin** | `foreground/primary` |
| outline-contrast | hover | `interactive/ghost/background/hover` | `interactive/inverse/border/hover` · thin | `foreground/primary` |
| outline-contrast | pressed | `interactive/ghost/background/pressed` | `interactive/inverse/border/pressed` · thin | `foreground/primary` |
| outline-contrast | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `foreground/primary` |
| outline-contrast | disabled | `interactive/ghost/background/disabled` @ 0 | `border/disabled` · thin | `interactive/inverse/foreground/disabled` |

Only `State=default` pairs with `Disabled=true`, so there is deliberately no disabled + hover/pressed/focus treatment.

## Subcomponents

**Icon** (`2046:15010`, key `a469ac1c…`) — local to the file but on the **Icon** page, not the Button page. 6 variants.

| Prop | Type | Values | Default |
|---|---|---|---|
| glyph | slot (`INSTANCE_SWAP`) | any glyph in the library | *Verified* → `Style=rounded` (page **Assets**) |
| size | enum | small, medium, large | small |
| framed | enum | false, true | false |

Its glyph vector binds `foreground/primary`. Button uses only `small` and `medium`, always `Framed=false`; Icon's `large` step never appears inside a Button. Spec Icon separately from its own page.

**Icon Button** (`2338:1763`) shares the Button page and has its own metadata frame, but it is a *sibling* public component, not a subcomponent. It has its own spec: [icon-button.spec.md](../icon-button/icon-button.spec.md).

## Tokens & theming

**Colour** — the six `interactive/*` families (`primary`, `positive`, `destructive`, `neutral`, `ghost`, `inverse`), each with `background`, `border` and `foreground` sub-groups across `default` / `hover` / `pressed` / `focused` / `disabled`; plus `interactive/secondary/border/disabled`, `border/focus`, `border/disabled`, `surface/gradient/{start,end}`, `foreground/gradient/{start,end}` and `foreground/primary` (the icon glyph).

**Dimension** — `control/{sm,md,lg}`, `space/{none,xxs,sm,md,lg}`, `radius/{none,element-sm,pill}`, `stroke/{base,thin,thick}`.

**Typography** — `label/medium/*` and `label/large/*` (text styles `label/medium`, `label/large`).

**Effects** — none. No shadows, no elevation, anywhere in the component.

**Theme axes**

| Collection | Modes | Default | Affects Button? |
|---|---|---|---|
| palette | Light, Dark | Light | **Yes** — the only axis that changes anything |
| size | Desktop, Mobile, Tablet, Desktop Compact | Desktop | No — every dimension token resolves identically |
| typography | Desktop, Tablet, Mobile, Desktop Compact | Desktop | No — both label ramps resolve identically |
| semantics | Base | Base | — |
| primitives | Value | Value | — |

**Values are deliberately not repeated here.** Every name above resolves in the project token export at [tokens/](../../tokens/) — `base/<collection>/<mode>.json` for the value in each mode, `tokens/manifest.json` for the collections, modes and extension graph. Two brand extensions (`companion`, `target`) override part of `palette`, so a Button rebuilt against those inherits their colours with no change to this spec.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | Resting | — | Background, border and label sit on the default tokens of the chosen flavour. |
| hover | Pointer over the control | — | Filled flavours move their own background token one step. Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent. The gradient flavours keep their gradient and slide it toward the end colour rather than swapping it (see Gradient transition). outline-contrast steps its border and raises the ghost scrim. Apart from text-gradient, the label colour does not change on any flavour. |
| pressed | Pointer held down | — | The same mechanism as hover carried one step further. The gradient flavours slide the other way, toward the start colour, rather than collapsing to a flat token (see Gradient transition). |
| focus | Keyboard focus | — | A focus ring is drawn outside the bounds, replacing the resting border rather than adding to it. Identical on all eleven flavours, and the only state that changes the control's outer footprint. |
| disabled | Disabled set to true | — | Background and label swap to the disabled tokens of their family, and the icon follows the label. No flavour keeps its accent colour, so disabled buttons of different flavours look alike. |

| | |
|---|---|
| **Motion** | Figma stores no timing. Every state change is colour-only, with no scale, shadow or elevation shift on any flavour, so a transition should read as a tint change rather than movement. The gradient flavours are the one exception to a plain tint: their gradient moves (see Gradient transition). |
| **Gradient transition** | gradient and text-gradient keep their gradient through every state and move it rather than replace it. On hover the gradient slides until its end colour covers 100% of the fill (the label's own text on text-gradient); on press it slides the other way until its start colour covers 100%. Leaving or releasing slides it back to the resting two-stop gradient. It must never jump from the gradient to a flat colour: a browser cannot interpolate between a gradient and a solid fill, so that swap shows as a flicker. The hover and pressed variants show where each slide ends, not a separate flat fill. |
| **Focus ring** | The only change that alters the control's outer footprint, because the ring is drawn outside the bounds. Leave room around a button in a tight row so the ring is not clipped. |
| **Resize** | The control re-hugs its label whenever the text changes, so a label swapped at runtime shifts the position of everything beside it in a row. |
| **Outline contrast** | outline-contrast takes its border from interactive/inverse/border/* and its label from foreground/primary, so it follows the mode. Its states sit on interactive/ghost/background/*. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | text property | A verb phrase naming the action. The button hugs whatever length it is given, there is no truncation and no wrapping. |
| Leading Icon | boolean, toggles a nested Icon | Toggles visibility only. Button does not re-declare Icon's other properties, but the instance stays exposed, so Icon's glyph, Size and Framed are still reachable in the properties panel. See the Icon Metadata frame for what Icon itself offers, and leave its Size alone, Button pairs it to the label. |
| Trailing Icon | boolean, toggles a nested Icon | The same slot mechanics as Leading Icon, placed after the label instead. |
| Icon glyph | instance swap on the nested Icon | Any glyph from the icon library. Both slots arrive holding Verified, which suits almost no real action, so set it deliberately whenever a slot is turned on. |

## Usage

**Do**
- Use one primary per view or per group. Everything else steps down to outline, subtle or text so the single most important action stays findable.
- Write the label as the verb the user is about to perform, Save rather than OK, so the action still reads clearly on its own.

**Don't**
- Don't build an icon-only button by hiding this one's label. Icon Button is a separate square component made for that, and it keeps the touch target correct.
- Don't mix Shape values inside one button group. A pill beside a rounded button reads as a mistake rather than a deliberate distinction.

## Accessibility

- Focus is drawn as a ring outside the control and is identical on every flavour, so it stays visible whatever the button sits on.
- Disabled is a visual state only. Figma cannot carry the reason an action is unavailable, so put that in nearby text in the implementation.
- The icon repeats the label rather than adding to it. An action with no visible label belongs in Icon Button, which still needs an accessible name in code.
- Every state change is colour-only, so anything signalled by hover or pressed alone will not reach a keyboard or screen reader user.
- Write labels as the verb the user is about to carry out, Save rather than OK, so the action is understandable when read out of context.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Width | Hug | Always hugs the label and any visible icons, never fixed. Small grows by 16px for each icon shown, medium and large by 20px. |
| Height | Fixed per Size | control/sm at small, control/md at medium, control/lg at large. Not resizable independently of Size. |
| Horizontal padding | Fixed per Size | space/md at small and medium, space/lg at large. |
| Vertical padding | Fixed | space/2xs at every size. The fixed height does the real work. |
| Gap | None on the row | Item spacing is space/none. The visible separation between an icon and the label comes from the Label wrapper's own horizontal padding, space/2xs at small and space/sm at medium and large. |
| Radius | Fixed per Shape | radius/none for sharp, radius/element-sm for rounded, radius/pill for full. All three are token-bound, so match the container rather than overriding on the instance. |
| Border | Fixed per Flavour | 1px drawn inside on outline, outline-subtle and outline-contrast, none on the other eight at rest. Focus replaces it with a 2px ring drawn outside the bounds. |
| Icon size | Fixed per Size | 16px at small, 20px at medium and large. Large reuses Icon's medium step, so Icon's own large (28px) never appears inside a Button. |
| Label type | Fixed per Size | label/medium at small, label/large at medium and large. |
| Colour | Theming | Every fill, border and label colour is bound to an interactive/* token for the flavour. Gradient draws from surface/gradient/*, text-gradient from foreground/gradient/*, contrast from interactive/inverse/*, outline-contrast from interactive/inverse/border/* and foreground/primary, and focus from border/focus. No variant hardcodes a colour. |

## Visual reference

No images are stored with this spec. Colour and geometry are fully specified by
the token names above, so a screenshot is a sanity check rather than a source of
truth — and a stored PNG goes stale silently, where a link never does.

Pull one on demand:

| | |
|---|---|
| Page | [Button](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729) |
| Component set (all 495) | [2060:15072](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2060-15072) |
| Sizes | [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2109-6941) · [medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2109-6945) · [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2109-6949) |
| Primary states | [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2109-6941) · [hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2111-7908) · [pressed](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2111-7981) · [focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2111-8127) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2111-8054) |

Per-flavour node ids are in `button.spec.json` under `visualReference.variants.flavours`.

Every one of the 495 variants hides both icon slots, so no screenshot of this
component shows an icon inside a Button — which is why the icon-colour blocker
below was found by reading bindings rather than by looking.

## Issues

### Warn

1. **Icon colour: addressed in the file, but not verifiable read-only.** The September blocker (the nested Icon kept `foreground/primary` in every flavour) is addressed: since 2026-10-18 every flavour, at rest and disabled, carries a `fills` override on both icon instances, matching the metadata's *"the icon follows the label"*. The overridden token could not be read, because the icons are hidden by default and a hidden instance exposes no layers to a read-only extraction. Icon Button, whose glyph is visible, binds it to the flavour's foreground token (see its spec), so expect the same here and confirm by turning an icon on before relying on it.
2. **The scrim's paint opacity doubles the token's own alpha.** The scrim flavours (text, text-gradient, subtle, outline-subtle) set a paint-level opacity of 0 / 0.05 / 0.10 on interactive/ghost/background/*. Those tokens already carry the scrim in their own alpha (default and disabled 0%, hover 5%, pressed 10%, in Light and Dark), so Figma applies it twice: the hover scrim renders at about 0.25% and pressed at 1%, practically invisible. Code binds the tokens directly with no paint opacity (the intended 5% / 10%); the Figma paints should drop their opacity to 1.
3. **`stroke/base` resolves to 0px**, although its description reads *"= 1px, source: scale/0"*. It is the border width on the seven non-outline flavours, so those carry a fully bound but zero-width border. Visually that matches the metadata (*"none on the other seven at rest"*), but a rebuild that trusts the token name or description will draw a 1px border where Figma draws none.
4. **Seven dimension tokens have descriptions that state the wrong px value** (unchanged in the export): `control/sm` says 40 → resolves 36; `control/md` says 48 → 40; `control/lg` says 56 → 48; `space/none` says 32 → 0; `radius/element-sm` says 16 → 4; `radius/none` says 2 → 0; `stroke/base` says 1 → 0. The resolved values match the metadata's Layout & Theming table, so build from those.
5. **`positive` + disabled borrows another family's token.** It takes its border from `interactive/secondary/border/disabled` while all eight other flavours use their own family's disabled border. Everything resolves to `line/subtle`, so nothing looks wrong, but the binding is inconsistent.
7. **The metadata's hover grouping is out of date.** States & Triggers says *"Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent."* Since 2026-10-18 outline-subtle (and subtle) raise the ghost scrim like text; only `outline` still shifts a neutral background.
8. **Binding drift — gradient pressed.** At Size=small, Shape=sharp, `gradient` + `pressed` takes its border from `border/gradient/start`; the other eight size/shape variants use `interactive/primary/border/pressed`. Invisible today (`stroke/base`), but it is the only place `border/gradient/start` appears on Button.
9. **Binding drift — outline disabled.** At Size=large, Shape=full, `outline` + disabled draws `interactive/ghost/background/disabled` @ 0 with `interactive/ghost/foreground/disabled`; the other eight size/shape variants draw `interactive/neutral/background/disabled` with `interactive/neutral/foreground/disabled`.
10a. **Code: gradient transition built.** Built 2026-10-18 in <zds-button>, <zds-icon-button>, react-baseui Button and IconButton: the gradient flavours no longer swap to a flat colour. One gradient three times the size of the fill holds the two stops in its middle third (the resting look is unchanged: start at 0%, end at 87%); hover slides its position until the end colour covers 100%, press until the start colour covers 100%, and the position transitions with the other flavours' tints. text-gradient runs the same slide across the label's text and the icons. Web and React were compared in a browser: pixel-identical at rest, hover and pressed.
18. **outline-contrast states.** outline-contrast hover and pressed sit on `interactive/ghost/background/hover` and `pressed` at paint opacity 1, so the token's own alpha is the scrim. The older scrim flavours still add a paint opacity on top (see the paint-opacity issue).
19. **Icon colour on the contrast flavours.** contrast and outline-contrast (then inverse and outline-inverse) were cloned from primary and outline. Their icon instances are hidden and expose no layers, so the fills override could not be read or rebound; it likely still carries primary's and outline's icon colour. Code is unaffected: the glyph takes `currentColor`.
10. **Code: resolved 2026-10-18 (scrim).** `<zds-button>` and react-baseui `Button` now draw subtle and outline-subtle (and text, text-gradient) on `interactive/ghost/background/*` directly, and outline's disabled border is `interactive/ghost/border/disabled`. Web and React match on all nine flavours at rest, hover and pressed.

### Note

- **Gradient variants match the intent.** The gradient variants agree with the intended transition (corrected 2026-10-18: hover slides to the end colour, press to the start). gradient hover binds surface/gradient/end and pressed surface/gradient/start; text-gradient hover foreground/gradient/end and pressed foreground/gradient/start. Each variant shows where its slide ends, as the metadata says. Focus also binds the start colour; the metadata gives focus only the ring, so code keeps the resting gradient at focus.

11. `Disabled` is a two-option VARIANT axis rather than a Figma boolean, and `State` is documentation-only. In code, disabled is a boolean and hover/pressed/focus are interaction states. Only `State=default` pairs with `Disabled=true`.
12. Figma returns VARIANT options in creation order — `Size` as `[medium, large, small]`, `Shape` as `[rounded, sharp, full]`, and now `Flavour` as `[primary, positive, negative, outline, outline-subtle, text, subtle, gradient, text-gradient, contrast, outline-contrast]`. The metadata's order is unchanged and is the order to ship.
13. The icon glyph is an `INSTANCE_SWAP` on the nested Icon, not a Button property, and Icon's `Size`/`Framed` stay reachable on the exposed instance. Button pins them; do not expose `Size` or `Framed`.
14. Icon (`2046:15010`) is local but on the **Icon** page, and its default glyph (*Verified* → `Style=rounded`) is on the **Assets** page. Neither is remote; neither is on the Button page.
15. Icon Button (`2338:1763`) is a second public 495-variant set sharing the page, with its own metadata frame (`4732:1074`). Sibling, not subcomponent — specced in [icon-button.spec.md](../icon-button/icon-button.spec.md).
16. Motion is intentionally not modelled (*"Figma stores no timing"*), there are no effect styles or shadows, and no variant hardcodes a colour: the 2026-10-18 full scan found **zero untokenised visual values** across all 405 variants; binding drift is limited to the two variants above.
17. `palette` is the only theme axis that changes Button. Every dimension and typography token resolves identically across all four size and typography modes, so Button does not respond to density or breakpoint in Figma.
23. Resolved 2026-10-29: the Button flavours are renamed to `contrast` and `outline-contrast` in Figma, matching the metadata. Icon Button is renamed to match.
