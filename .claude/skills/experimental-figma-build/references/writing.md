# Writing for the builder

Everything this skill writes — the details-card description, component
descriptions, metadata — is read by someone **building the component in
code**, not by someone placing it in a Figma file.

## Rules

- **Short.** One idea per sentence. Cut "This component allows users to…",
  "It is important to note…", "basically", "simply".
- **Intent over appearance.** Say what it's for, when to reach for it, what
  it does on interaction. Don't narrate what a screenshot already shows.
- **Tokens, never values.** `surface/track`, `space/xs`, `radius/container`
  — not `#E0E3E9`, `4px`, `16px`. A value with no token is a gap: name it
  as one ("no motion token; 250ms literal, matches Switch").
- **Call out Figma-only implementation.** Anything modelled a particular way
  because of Figma's limits is labelled so code doesn't copy it.
- **Name things as code does.** Prop names and values from the component's
  TypeScript, in `code` style.

## Figma-only: say so

| In Figma | Tell the builder |
|---|---|
| Hover / focus / pressed as variants | CSS states, not props |
| A state that's derived (`open`, `filled`, `typing`) | derived from behaviour or value, not set directly |
| Boolean that toggles a layer's visibility | conditional rendering |
| Absolutely positioned menu or popup inside the component | rendered in a portal and positioned against the trigger (collision, flip); the offset is `space/xs` |
| Exposed nested instance | a child component with its own props |
| Sample content (labels, rows, file names) | content input, not part of the API |
| Variant matrix cloned from a sibling family | shares that family's tokens; nothing to implement twice |
| Animation shown as static frames, or missing | the motion spec in code (duration, curve, reduced-motion behaviour) |
| A part cloned in and hidden/removed | doesn't exist in code |

## Examples

**Too long, describes looks:**
> The Select component is a versatile dropdown control that features a
> rounded rectangular field with a light grey border and a small chevron
> icon on the right side, which users can click on in order to open up a
> list of different options.

**Builder-ready:**
> Chooses one option from a list. The field shows the choice; opening it
> shows the options below as Menu Item rows. Reuses Input's field, label
> and hint, so it sits in a form beside one. `open` is derived from the
> list being open — not a prop.

**Property row, before:**
> State — Changes the visual appearance of the component to show different
> states like hover and focus.

**After:**
> `state` — enabled, hover, focus, open, filled, invalid, read-only,
> disabled. Hover and focus are CSS states; open and filled are derived;
> invalid, read-only and disabled are props.

**Theming, before:**
> Uses a blue colour for the selected item and a grey background.

**After:**
> Selected row: `interactive/ghost/background/selected`. The list surface
> is `surface/menu` at `shadow/medium`. Re-themes with any `ext-*` /
> `mode-*` scope.
