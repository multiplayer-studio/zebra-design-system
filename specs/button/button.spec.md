# Button

Triggers an action from a text label, with optional icons on either side. Nine flavours set how much weight the action carries, three sizes and three shapes fit it to the surface it sits on. The label is the only content a consumer writes, everything else is a variant choice. When an action has no text label, reach for Icon Button rather than hiding this one's label.

Source: [The Zebra Design System › Button](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729) (set `2060:15072`, 405 variants) · extracted 2026-09-22

> **Values are token names.** Every colour, space, radius, stroke and type value below is the Figma token name; the values themselves live in the project token export at [tokens/](../../tokens/) and are not duplicated here. The only literals are measurements (labelled as such) and the untokenised paint opacities called out in the issues.

> **How to read the variant tables.** 405 = 9 Flavour × 3 Size × 3 Shape × 5 State/Disabled. The axes are orthogonal: Size and Shape carry every geometric value, Flavour and State/Disabled carry every colour. Nothing couples them, so the three tables below describe all 405 variants between them.

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `flavour` | enum | primary, positive, negative, subtle, text, outline-subtle, outline, gradient, text-gradient | `primary` | container fill, border, label colour |
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
- **false** — The control accepts input.
- **true** — The action is unavailable. Say why somewhere nearby, because a disabled control with no explanation is indistinguishable from a broken one.

**label** — The action the user is about to perform, written as a verb. The button hugs whatever it is given, so a long label widens the control and can break a toolbar row.

**leadingIcon** — *false:* No icon before the label. *true:* Adds an icon before the label to reinforce the action at a glance. Choose the glyph deliberately, the slot arrives holding a default that suits almost nothing.

**trailingIcon** — *false:* No icon after the label. *true:* Turning both icons on at small leaves very little room for the label itself. Use a trailing icon for directional or disclosure actions.

## Internal variations & content inputs

The glyph shown in either icon slot is an `INSTANCE_SWAP` on the nested **Icon** component (`Name#2167:166`), not a Button property. Both slots arrive holding *Verified* → `Style=rounded`. Whether the glyph becomes a Button prop in code is the implementer's call.

Icon's own `Size` and `Framed` properties also stay reachable on the exposed instance. Button pins them (small → Icon `small`; medium and large → Icon `medium`; always `Framed=false`), so do not expose them.

There are no sample-content sets on this page.

## Anatomy

Numbering follows the metadata frame's anatomy diagram.

1. **Container** (`root`, auto-layout frame) — *"The button's own horizontal auto-layout frame. Carries the background, the border and the radius, and holds the height fixed for the chosen Size."*
   Horizontal, `gap: space/none`, padding `space/xs` top/bottom and `space/md` left/right at small, both axes centred. Width **hugs**, height **fixed** to `control/sm`. Clips content. Radius and paint come from `shape` and `flavour` below.
2. **Leading Icon** (`leadingIcon`, instance of Icon) — *"An Icon instance before the label, hidden until Leading Icon is turned on. Button sets its size and leaves the instance exposed."*
   Hidden by default; `visibleWhen: leadingIcon`. Sized by `control/icon-sm` at small (see the size table). Its glyph fill is bound to `foreground/primary` **inside Icon** — see Issues.
3. **Label wrapper** (`label`, frame) + **Label text** (`label/text`) — *"A wrapper frame around the text. Its own horizontal padding is what separates the text from the icons, the row itself has no gap."*
   Wrapper: horizontal, `gap: space/none`, padding-x `space/xs` at small. Text: style `label/medium` (family, weight, size, line height and letter spacing all token-bound), auto-resizes both axes, **no truncation, no wrapping**, fill from `flavour` below.
4. **Trailing Icon** (`trailingIcon`, instance of Icon) — *"An Icon instance after the label, hidden until Trailing Icon is turned on."*
   Same mechanics as the leading slot, after the label.

## Variants

### By size (geometry)

| size | height | padding-x | padding-y | label wrapper padding-x | type | icon | measured width @ "Button" |
|---|---|---|---|---|---|---|---|
| small | `control/sm` | `space/md` | `space/xs` | `space/xs` | `label/medium` | Icon `small` | 76 |
| medium | `control/md` | `space/md` | `space/xs` | `space/sm` | `label/large` | Icon `medium` | 90 |
| large | `control/lg` | `space/lg` | `space/xs` | `space/sm` | `label/large` | Icon `medium` | 98 |

The last column is a measurement of the rendered default label, not an authored value — every other cell is a token name. Resolve them in [tokens/](../../tokens/).

### By shape

| shape | radius |
|---|---|
| sharp | `radius/none` |
| rounded | `radius/element-sm` |
| full | `radius/pill` |

### By flavour × state (colour)

Identical at every size and shape. Border widths are token-bound: `stroke/base` **draws nothing** (read issue 2 before implementing a border for it), `stroke/thin` draws inside, `stroke/thick` draws outside. `focus` always replaces the resting border with `border/focus` at `stroke/thick`, drawn outside the bounds.

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
| subtle | default | `interactive/neutral/background/default` | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | hover | `interactive/neutral/background/hover` | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | pressed | `interactive/neutral/background/pressed` | `interactive/neutral/border/default` · base | `interactive/neutral/foreground/default` |
| subtle | focus | `interactive/neutral/background/focused` | `border/focus` · thick, outside | `interactive/neutral/foreground/default` |
| subtle | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` · base | `interactive/neutral/foreground/disabled` |
| text | default | `interactive/ghost/background/default` @ 0 | `interactive/ghost/border/default` · base | `interactive/ghost/foreground/default` |
| text | hover | `interactive/ghost/background/hover` @ 0.05 | `interactive/ghost/border/hover` · base | `interactive/ghost/foreground/default` |
| text | pressed | `interactive/ghost/background/pressed` @ 0.10 | `interactive/ghost/border/pressed` · base | `interactive/ghost/foreground/default` |
| text | focus | `interactive/ghost/background/focused` @ 0 | `border/focus` · thick, outside | `interactive/ghost/foreground/default` |
| text | disabled | `interactive/ghost/background/disabled` @ 0 | `interactive/ghost/border/disabled` · base | `interactive/ghost/foreground/disabled` |
| outline-subtle | default | `interactive/neutral/background/default` | `interactive/neutral/border/default` · **thin** | `interactive/neutral/foreground/default` |
| outline-subtle | hover | `interactive/neutral/background/hover` | `interactive/neutral/border/hover` · thin | `interactive/neutral/foreground/default` |
| outline-subtle | pressed | `interactive/neutral/background/pressed` | `interactive/neutral/border/pressed` · thin | `interactive/neutral/foreground/default` |
| outline-subtle | focus | `interactive/neutral/background/focused` | `border/focus` · thick, outside | `interactive/neutral/foreground/default` |
| outline-subtle | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` · thin | `interactive/neutral/foreground/disabled` |
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

Only `State=default` pairs with `Disabled=true`, so there is deliberately no disabled + hover/pressed/focus treatment.

## Subcomponents

**Icon** (`2046:15010`, key `a469ac1c…`) — local to the file but on the **Icon** page, not the Button page. 6 variants.

| Prop | Type | Values | Default |
|---|---|---|---|
| glyph | slot (`INSTANCE_SWAP`) | any glyph in the library | *Verified* → `Style=rounded` (page **Assets**) |
| size | enum | small, medium, large | small |
| framed | enum | false, true | false |

Its glyph vector binds `foreground/primary`. Button uses only `small` and `medium`, always `Framed=false`; Icon's `large` step never appears inside a Button. Spec Icon separately from its own page.

**Icon Button** (`2338:1763`) shares the Button page and has its own metadata frame, but it is a *sibling* public component, not a subcomponent. Out of scope here.

## Tokens & theming

**Colour** — the five `interactive/*` families (`primary`, `positive`, `destructive`, `neutral`, `ghost`), each with `background`, `border` and `foreground` sub-groups across `default` / `hover` / `pressed` / `focused` / `disabled`; plus `interactive/secondary/border/disabled`, `border/focus`, `surface/gradient/{start,end}`, `foreground/gradient/{start,end}` and `foreground/primary` (the icon glyph).

**Dimension** — `control/{sm,md,lg}`, `space/{none,xs,sm,md,lg}`, `radius/{none,element-sm,pill}`, `stroke/{base,thin,thick}`.

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
| hover | Pointer over the control | — | Filled flavours move their own background token one step. Outline flavours hold their border and shift a neutral background underneath instead. Text flavours raise a ghost scrim from fully transparent. The label colour does not change on any flavour. |
| pressed | Pointer held down | — | The same mechanism as hover carried one step further. Gradient is the exception, collapsing from a two-stop gradient to a single flat token. |
| focus | Keyboard focus | — | A focus ring is drawn outside the bounds, replacing the resting border rather than adding to it. Identical on all nine flavours, and the only state that changes the control's outer footprint. |
| disabled | Disabled set to true | — | Background and label swap to the disabled tokens of their family, and the icon follows the label. No flavour keeps its accent colour, so disabled buttons of different flavours look alike. |

| | |
|---|---|
| **Motion** | Figma stores no timing. Every state change is colour-only, with no scale, shadow or elevation shift on any flavour, so a transition should read as a tint change rather than movement. |
| **Focus ring** | The only change that alters the control's outer footprint, because the ring is drawn outside the bounds. Leave room around a button in a tight row so the ring is not clipped. |
| **Resize** | The control re-hugs its label whenever the text changes, so a label swapped at runtime shifts the position of everything beside it in a row. |

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
| Height | Fixed per Size | 36px at small (control/sm), 40px at medium (control/md), 48px at large (control/lg). Not resizable independently of Size. |
| Horizontal padding | Fixed per Size | 12px (space/md) at small and medium, 16px (space/lg) at large. |
| Vertical padding | Fixed | 4px (space/xs) at every size. The fixed height does the real work. |
| Gap | None on the row | Item spacing is space/none. The visible separation between an icon and the label comes from the Label wrapper's own horizontal padding, 4px (space/xs) at small and 8px (space/sm) at medium and large. |
| Radius | Fixed per Shape | 0 (radius/none) for sharp, 4px (radius/element-sm) for rounded, 9999 (radius/pill) for full. All three are token-bound, so match the container rather than overriding on the instance. |
| Border | Fixed per Flavour | 1px drawn inside on outline and outline-subtle, none on the other seven at rest. Focus replaces it with a 2px ring drawn outside the bounds. |
| Icon size | Fixed per Size | 16px at small, 20px at medium and large. Large reuses Icon's medium step, so Icon's own large (28px) never appears inside a Button. |
| Label type | Fixed per Size | label/medium (14/20) at small, label/large (16/24) at medium and large, IBM Plex Sans Medium. |
| Colour | Theming | Every fill, border and label colour is bound to an interactive/* token for the flavour. Gradient draws from surface/gradient/*, text-gradient from foreground/gradient/*, and focus from border/focus. No variant hardcodes a colour. |

## Visual reference

`screens/set-overview.png` is the whole 405-variant set. `screens/flavour-*.png` is one PNG per flavour at Size=small, Shape=rounded, State=default. Node ids for re-rendering: sizes `2109:6941` / `2109:6945` / `2109:6949`; primary states default `2109:6941`, hover `2111:7908`, pressed `2111:7981`, focus `2111:8127`, disabled `2111:8054`.

Every variant in the file hides both icon slots, so no screenshot shows an icon inside a Button.

## Issues

### Blocker

1. **The nested icon's colour contradicts the documented intent.** The Icon glyph is bound to `foreground/primary` (`ink/high`: `#0c0d0e` Light, `#f8fbff` Dark) inside the Icon component, and Button never overrides that fill per flavour or state. The metadata says the opposite twice — States & Triggers (disabled): *"the icon follows the label"*; Layout & Theming (Colour): *"Every fill, border and label colour is bound to an interactive/\* token for the flavour."* Taken literally, a leading icon on primary, positive, negative or gradient renders near-black on a saturated fill in Light mode. Because all 405 variants ship with both slots hidden, the file never shows this. Decide before building: implement icon colour = label colour (the documented intent) and raise the Figma binding as a fix, or reproduce Figma literally.

### Warn

2. **Paint-level opacity is the one untokenised value left.** `text` and `text-gradient` raise their scrim by setting a paint opacity of 0 / 0.05 / 0.10 on `interactive/ghost/background/*`. The fill itself is bound, so the extractor's gap check — which looks for untokenised *fills*, not untokenised paint *opacity* — does not flag it. These three numbers are the only literals this spec still carries.
3. **`stroke/base` resolves to 0px**, although its description reads *"= 1px, source: scale/0"*. It is the border width on the seven non-outline flavours, so those carry a fully bound but zero-width border. Visually that matches the metadata (*"none on the other seven at rest"*), but a rebuild that trusts the token name or description will draw a 1px border where Figma draws none.
4. **Seven dimension tokens have descriptions that state the wrong px value**: `control/sm` says 40 → resolves 36; `control/md` says 48 → 40; `control/lg` says 56 → 48; `space/none` says 32 → 0; `radius/element-sm` says 16 → 4; `radius/none` says 2 → 0; `stroke/base` says 1 → 0. The resolved values match the metadata's Layout & Theming table, so build from those.
5. **`positive` + disabled borrows another family's token.** It takes its border from `interactive/secondary/border/disabled` while all eight other flavours use their own family's disabled border. Everything resolves to `line/subtle`, so nothing looks wrong, but the binding is inconsistent and will read as a mistake in a generated theme map.
6. **Gradient collapses earlier than documented.** States & Triggers names pressed as the gradient exception; in the file gradient also collapses to a flat token at hover (`surface/gradient/end`) and focus (`surface/gradient/start`). Only the default state carries the actual gradient.

### Note

7. `Disabled` is a two-option VARIANT axis rather than a Figma boolean, and `State` is documentation-only. In code, disabled is a boolean and hover/pressed/focus are interaction states. Only `State=default` pairs with `Disabled=true`.
8. Figma returns VARIANT options in creation order — `Size` as `[medium, large, small]`, `Shape` as `[rounded, sharp, full]`. The metadata's order (small/medium/large, sharp/rounded/full) matches the rendered widths (76/90/98) and is the order to ship.
9. The icon glyph is an `INSTANCE_SWAP` on the nested Icon, not a Button property, and Icon's `Size`/`Framed` stay reachable on the exposed instance. Button pins them; do not expose `Size` or `Framed`.
10. Icon (`2046:15010`) is local but on the **Icon** page, and its default glyph (*Verified* → `Style=rounded`) is on the **Assets** page. Neither is remote; neither is on the Button page.
11. Icon Button (`2338:1763`) is a second public 405-variant set sharing the page, with its own metadata frame (`4732:1074`). Sibling, not subcomponent — out of scope.
12. Motion is intentionally not modelled (*"Figma stores no timing"*), there are no effect styles or shadows, and no variant hardcodes a colour: the extraction found **zero untokenised visual values and zero binding drift** across the sampled variants.
13. `palette` is the only theme axis that changes Button. Every dimension and typography token resolves identically across all four size and typography modes, so Button does not respond to density or breakpoint in Figma.
