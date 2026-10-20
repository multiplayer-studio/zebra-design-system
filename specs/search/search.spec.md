# Search

A single-line input for typing a query, with a magnifier leading it and a trailing control that takes whatever icon and function the implementation passes. State covers the whole typing lifecycle from empty through focus to a committed query, and Flavour decides how much the field asserts itself against the surface behind it. Size and Shape match it to the controls around it.

Source: [Search page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2114-8976) · component set `2152:8811` · extracted 2026-10-14, updated 2026-10-15 (icon colours, text padding) · 189 variants (3 Shape × 7 State × 3 Size × 3 Flavour)

All 189 variants were walked. Colour depends only on Flavour × State. Geometry depends only on Size × Shape, apart from stroke weight and alignment (which follow Flavour × State) and the binding slips listed in [Issues](#issues). So the two tables below cover every variant.

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `shape` | enum | `sharp`, `rounded`, `full` | `sharp` |
| `state` | enum | `enabled`, `hover`, `focus`, `selected`, `typing`, `filled`, `disabled` | `enabled` |
| `size` | enum | `small`, `medium`, `large` | `large` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |
| `hasLeading` | boolean | | `true` |
| `hasTrailing` | boolean | | `true` |

Figma also has a boolean **`Show Cancel`** that is wired to nothing. Don't build it (see issues).

**shape**
- `sharp`: Match the contour of the controls around the field. It is the only property that changes nothing but the corners.
- `rounded`: The softened corner, for surfaces built from rounded controls.
- `full`: A pill, for a field that should read as its own object sitting on a surface rather than as part of a form.

**state**
- `enabled`: The resting empty field, showing its placeholder and waiting.
- `hover`: Pointer over the field. The border is the only thing that answers.
- `focus`: The field has keyboard focus and is ready for input. It carries the heaviest border in the set, which is what makes focus findable.
- `selected`: Focus has settled and the cursor is placed. Lighter than focus, for a field being worked in rather than just arrived at.
- `typing`: Text is being entered. This is the only state that offers a way to clear the field, so a flow that needs a clear control has to account for it arriving mid-typing.
- `filled`: A committed query. The field is at rest again but the text stays at full strength, which is what separates it from the empty state.
- `disabled`: The field cannot be used. Both the surface and the border drop away, so it reads as present but out of reach.

**size**
- `large`: The default, for a field that is the main thing on its surface.
- `medium`: For denser surfaces and toolbars where search sits alongside other controls.
- `small`: The tightest, and the only size that also reduces the text.

**flavour**
- `default`: A bordered field on a neutral surface, and the right choice inside a form.
- `gradient`: Used for a unique interaction highlight, such as an AI companion search input or a specific use-case callout.
- `ghost`: No visible border at rest, for a field sitting on a surface that already bounds it such as a header. The outline returns on focus as an optional implementation and can be turned off, giving the container the option to surface its own focus state, as in a message prompt input.

**hasLeading**
- `true`: Show the magnifier. It is the fastest signal that tells a search field apart from a bare input.
- `false`: Drop it where the surrounding context already says this is search and the width matters more.

**hasTrailing**
- `true`: Show the trailing control. It takes whatever icon and function the implementation passes. The example ships voice input, which suits search well without being required, and while typing it becomes the group that also offers a clear.
- `false`: No trailing control, with the input taking the width back.

In code, `disabled` is a prop. `hover` and `focus` are CSS. `typing` and `filled` follow from the field having a value and focus.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Internal variations & content inputs

**Glyphs.** The leading icon (`search`) and the trailing icon (`microphone`) are swappable through the nested Icon's own Name property, with no Search-level prop. Any glyph from `packages/icons` can be used.

**Text.** The text isn't parameterised in Figma. The placeholder (sample "Search") and the value (sample "Input") come from the implementation.

## Anatomy

The root is a horizontal row: `space/sm` block padding, `space/md` inline padding, a `space/xs` gap and centred items. It's fixed at `measuredWidthPx` 280, with the height per size.

1. **Leading icon**: "The magnifier, present unless hasLeading is off." The `search` glyph, Rounded family. Icon Size=medium at large and medium, small at small. Visible when `hasLeading`.
2. **Input**: "The query text, taking the width left between the two icons." Fills the width, with a `space/2xs` gap. Inline padding is `space/xs` on both sides, per the designer clarification below. Icon to text is `space/xs` + `space/xs`; border to text, with no icon on that side, is `space/md` + `space/xs`.
   - **text**: typography per size; colour per state.
   - **cursor**: `foreground/cursor`, shown at focus, selected and typing. In code this is the caret colour.
3. **Trailing area**: "The trailing control, defaulting to voice input and open to any icon and function. While typing it becomes a group with a clear control and a divider. Both are pressable, and each claims a target wider than its glyph so the surrounding space counts as part of the control."
   - **trailingIcon** (`microphone`): visible when `hasTrailing` and not typing.
   - **trailingGroup** (the `Trailing` subcomponent): visible when `hasTrailing` and typing.

## Variants

**Size**

| size | root.height | text | icon | icon (`Px`) | height (`Px`) |
|---|---|---|---|---|---|
| small | `control/sm` | `body/small` | Icon Size=small | 16 | 36 |
| medium | `control/md` | `body/medium` | Icon Size=medium | 20 | 40 |
| large | `control/lg` | `body/medium` | Icon Size=medium | 20 | 48 |

**Shape**

| shape | root.radius |
|---|---|
| sharp | `radius/none` |
| rounded | `radius/sm` |
| full | `radius/pill` |

**Flavour × State**: surface, border colour, and border weight with its alignment.

| flavour | state | fill | stroke | weight |
|---|---|---|---|---|
| default | enabled | `interactive/neutral/background/default` | `interactive/neutral/border/default` | `stroke/thin` inside |
| default | hover | ″ | `interactive/neutral/border/hover` | `stroke/thin` inside |
| default | focus | ″ | `border/focus` | `stroke/thick` **outside** |
| default | selected | ″ | `border/focus` | `stroke/thin` inside |
| default | typing | ″ | `border/focus` | `stroke/thin` inside |
| default | filled | ″ | `interactive/neutral/border/default` | `stroke/thin` inside |
| default | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` inside |
| gradient | enabled | `interactive/neutral/background/default` | gradient `foreground/gradient/start` → `/end` | `stroke/thin` inside |
| gradient | hover | ″ | `border/gradient/end` | `stroke/thin` inside |
| gradient | focus | ″ | `border/focus` | `stroke/thick` **outside** |
| gradient | selected | ″ | `border/gradient/start` | `stroke/thin` inside |
| gradient | typing | ″ | `border/gradient/start` | `stroke/thin` inside |
| gradient | filled | ″ | gradient `foreground/gradient/start` → `/end` | `stroke/thin` inside |
| gradient | disabled | `interactive/neutral/background/disabled` | `interactive/neutral/border/disabled` | `stroke/thin` inside |
| ghost | enabled | `interactive/ghost/background/default` at opacity 0 | `interactive/ghost/border/default` | `stroke/base` |
| ghost | hover | ″ | `interactive/neutral/border/hover` | `stroke/base` |
| ghost | focus | ″ | `border/focus` | `stroke/thick` **outside** (optional) |
| ghost | selected | ″ | `border/focus` | `stroke/base` |
| ghost | typing | ″ | `border/focus` | `stroke/base` |
| ghost | filled | ″ | `interactive/ghost/border/default` | `stroke/base` |
| ghost | disabled | `interactive/ghost/background/disabled` at opacity 0 | `interactive/ghost/border/disabled` | `stroke/base` |

Text colour depends on state only: `foreground/disabled` (the placeholder) at enabled, hover, focus, selected and disabled, and `foreground/primary` at typing and filled.

## Subcomponents

**Trailing** (public by name, used only here): `hasIcon` × `hasCancel`, both string variants. Three of the four combinations are built; "neither" is left out on purpose. Its parts:
- **clear**: the `cancel` glyph, visible when `hasCancel`.
- **divider**: a vertical [Divider](../divider/divider.spec.md) of width `stroke/thin`, visible when both are on.
- **trailingIcon**: the `microphone` glyph, visible when `hasIcon`.

It's a horizontal row that hugs its content, with a `space/sm` gap when both are shown.

**Dependencies.** [Icon](../icon/icon.spec.md) is delivered as glyphs from `@zebra-design-system/icons`. `search`, `microphone` and `cancel` are all verified in `codepoints.json`, not retired or rejected. Search pins the Rounded family. Glyphs take `currentColor`: `foreground/primary`, and `foreground/disabled` when disabled (the field-family rule; Figma has applied it to the resting icons only — see issues). Figma sets it as an override on each nested glyph.

## Tokens & theming

- **Color:**
  - `interactive/neutral/background/{default,disabled}`, `interactive/neutral/border/{default,hover,disabled}`
  - `interactive/ghost/background/{default,disabled}`, `interactive/ghost/border/{default,disabled}`
  - `border/focus`, `border/gradient/{start,end}`, `foreground/gradient/{start,end}`
  - `foreground/{primary,disabled,cursor}`
  - `interactive/neutral/foreground/{default,disabled}` (typing group and disabled icons as built; see issues)
- **Dimension:** `control/{sm,md,lg}`, `space/{none,2xs,xs,sm,md}`, `radius/{none,sm,pill}` (and `radius/element-sm` in 3 variants), `stroke/{base,thin,thick}`
- **Typography:** `body/medium`, `body/small`

Every token resolves in `tokens/`.

Theme axes, from `tokens/manifest.json`:
- **palette:** Light, Dark
- **size:** Desktop, Mobile, Tablet, Desktop Compact
- **typography:** Desktop, Tablet, Mobile, Desktop Compact
- **extensions:** companion, target, condensed

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| enabled | — | — | The resting field. Border interactive/neutral/border/default, with the placeholder in foreground/disabled. |
| hover | Pointer over the field | — | The border moves to interactive/neutral/border/hover. Surface and text hold. |
| focus | Keyboard focus | — | The border becomes border/focus at double weight and the text moves to foreground/cursor. This is the heaviest border in the set. |
| selected | Focus settled, cursor placed | — | The border stays border/focus but returns to single weight, and the text keeps foreground/cursor. |
| typing | Text being entered | — | The text moves to foreground/primary and the trailing area changes from the single trailing control to a group carrying a clear control, a divider and that same control. |
| filled | A committed query | — | The border returns to interactive/neutral/border/default while the text stays at foreground/primary. |
| disabled | — | — | Surface and border both move to their disabled tokens and the text returns to foreground/disabled. |

| Type | Description |
|---|---|
| Motion | No transition is defined. Each state is a swap of border, text colour and, at typing, the contents of the trailing area. |
| Typing lifecycle | The states run enabled, focus, selected, typing, filled. Only typing swaps the trailing area, so the clear control arrives once there is something to clear and is gone again once the query is committed. |
| Flavour and state | Flavour decides which border family a state draws from. Ghost holds its border at zero weight in every state, with the focus outline available but optional, so a container that surfaces its own focus can suppress it. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Input text | not parameterised | The query itself. It is not exposed as an input, so the placeholder and any value come from the implementation. |
| Leading icon | nested Icon, toggled by hasLeading | A magnifier at Size=medium. Its glyph is swappable through the Icon's own Name property. |
| Trailing area | nested, toggled by hasTrailing | Toggled by hasTrailing. It takes any icon and any function, defaulting to voice input because that suits search best without being a requirement. While typing it becomes a group holding a clear control, a divider and the trailing control. Both controls are real targets rather than decoration, so the pressable area runs past the glyph into the space around it. |
| Trailing group | nested set, three combinations | Carries hasIcon and hasCancel, giving icon only, clear only, or both. The combination with neither is not built, because hasTrailing already expresses an empty trailing area. The two controls are independently interactive, the clear control emptying the field and the trailing control running whatever function it was given, so each takes its own target rather than one target spanning the pair. |

## Usage

**Do**
- Keep hasLeading on unless the surrounding context already says this is search. The magnifier is the fastest signal the field gives.
- Use ghost on a surface that already bounds the field, such as a header, and default inside a form.

**Don't**
- Don't reach for gradient on an ordinary search field. It marks a distinct interaction such as an AI companion, and spreading it across a view drains the meaning it carries.
- Don't treat typing as a style. It is the only state carrying a clear control, so choosing it changes what the field offers.

## Accessibility

- The field carries no label of its own. A placeholder is not a label, so one has to be supplied alongside it.
- Focus is the heaviest border in the set and is what keyboard users depend on. On ghost the outline is optional, so wherever it is suppressed the container has to show focus in its place.
- The magnifier and the trailing control are icons with no text. Each needs a name, and whatever function the trailing control carries is a real action rather than decoration.
- The clear control appears only while typing. Its arrival and departure change what is reachable, so that change has to be announced.
- Placeholder text uses foreground/disabled, the lowest-contrast text in the field. Check it against the surface before relying on it to carry meaning.
- At small the text drops to 14px and the field to 36 tall. Check the target still works for touch.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed | 280 wide at every size. 48 tall at large, 40 at medium and 36 at small. |
| Padding and gap | Fixed | space/sm top and bottom, space/md left and right, with a space/xs gap between the icons and the input. These hold at every size. |
| Radius | Per Shape | radius/none when sharp, radius/sm when rounded and radius/pill when full. |
| Surface | Per Flavour | interactive/neutral/background/default on default and gradient, interactive/ghost/background/default on ghost. Disabled moves each to its own disabled token. |
| Border | Per Flavour | Default draws at 1px and focus at 2px. Gradient keeps those weights with foreground/gradient/start. Ghost holds every weight at zero, and its focus outline is optional so the container can carry focus instead. |
| Text | Theming | 16px at large and medium, 14px at small. The colour changes with state, which States and Triggers sets out. |
| Icons and trailing group | Fixed | Icons at Size=medium, 20 square. The trailing group hugs both controls or one, separated by a divider. Each control takes a target of roughly 36 square, the 20 glyph plus about 8 all round, which the 8 gap either side of the divider already leaves room for without the two targets meeting. |

## Designer clarifications

These were given directly and are recorded apart from the verbatim metadata above.

- **Text padding (2026-10-14):** "The text within the input should have a padding left right of 4px. such that the icon to text end up at 8px but when no icon that extra 4 is included in the gap between the outline and text." The input carries `space/xs` inline padding on both sides, on Search and Input alike.

## Visual reference

No images are stored. Pull a fresh shot from these links:
[component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8811) ·
[metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6268-963) ·
sizes: [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8810) ·
[medium](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2217-5178) ·
[small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2217-5649) ·
states: [hover](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2182-3794) ·
[focus](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2183-20485) ·
[selected](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2182-3802) ·
[typing](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2201-1601) ·
[filled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2201-1625) ·
[disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2201-1643) ·
flavours: [gradient](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2411-6798) ·
[ghost](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3160-1654) ·
[Trailing](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2183-20055)

## Issues

No blockers.

### Warn

- **`Show Cancel` is wired to nothing.** It's a boolean on Search, bound to no layer in any of the 189 variants and missing from the metadata. Clearing is driven by typing and the Trailing group's `hasCancel`. Remove it in Figma or wire it up; don't build it.
- **The placeholder fails text contrast in Light:** 3.02:1 on the field and 2.78:1 behind ghost, against 4.5:1. Dark is 4.97:1 and 4.25:1.
- **The resting border is close to invisible:** 1.40:1 against the page in Light and 2.37:1 in Dark, against 3:1 for an input boundary. The focus border passes at 3.22:1 and 3.58:1.
- **Height is unbound on the default variant.** Large + sharp + default + enabled has no height token; every other large variant binds `control/lg`.
- **Padding drift at medium + rounded.** It uses `space/2xs` block padding in two variants (default + enabled, gradient + enabled) and `space/sm` in the other 19. The metadata says `space/sm`.
- **Radius drift on rounded + typing + ghost.** These 3 variants bind `radius/element-sm` rather than `radius/sm`. The values are the same today, but the two will drift.
- **The small typing group's icons render 20.** At small, the resting icons are 16, but the typing group's icons are set to small and still render 20.
- **Ghost hover, selected and typing are invisible.** They set a border colour at zero weight, so hover on ghost shows no response at all.
- **The gradient border is more varied than the metadata says:**
  - enabled and filled draw a `foreground/gradient/*` linear gradient;
  - hover uses `border/gradient/end`;
  - selected and typing use `border/gradient/start`;
  - focus uses `border/focus`.
- **The cursor is not the text.** The metadata says the text moves to `foreground/cursor`. The placeholder stays `foreground/disabled`; a separate cursor glyph takes that colour.
- **Control targets aren't modelled.** The metadata asks for roughly 36-square targets, but the icons are bare 20 squares.
- **Icon colour is half-migrated.** The resting magnifier and trailing control now bind `foreground/primary` (changed in Figma since 2026-10-14). The clear and trailing control inside the typing group still bind `interactive/neutral/foreground/default`, and every disabled icon `interactive/neutral/foreground/disabled`. Build the owner's rule for the field family (set on Input, 2026-10-15): `foreground/primary`, and `foreground/disabled` when disabled, so an icon doesn't change colour between rest and typing. Figma's typing group and disabled icons should follow. The metadata doesn't mention icon colour.
- **Ghost's surface is its token at paint opacity 0.** A literal opacity overrides the token. Use a transparent token if transparent is intended.

### Note

- **Resolved since 2026-10-14:** Figma's Input Text frame now carries `space/xs` inline padding, as the designer clarification asked. The metadata's Layout row still describes only the gap.

- Focus draws `stroke/thick` outside the field; every other border is inside. Selected returns to `stroke/thin` inside.
- The fixed 280 width is the sample width; in use the field normally fills its container.
- State mixes interaction, content (filled) and settable (disabled) states. There's no read-only, error or loading state.
- Trailing's `hasIcon` and `hasCancel` are string variants. It's public by name but used only here.
- `control/md`'s description says 48px; it resolves to 40.
- No motion is defined, by the metadata's own statement. The set has no native Figma description.
