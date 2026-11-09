# Input Chip

> Represents a person, entity or value someone has entered or picked, such as a recipient on a message, so it can be reviewed and removed without retyping. It belongs inside input and selection fields. Reach for a filter chip to narrow content, or an assist chip to offer an action.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-input-chip>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `label` | string | `Label` |  |  |
| `showAvatar` | boolean | `true` |  |  |
| `state` | enum | `default` | `default` `hover` `focus` | Interaction state. In code it comes from pointer and focus, not from a prop. |
| `disabled` | boolean | `false` |  |  |
| `size` | enum | `medium` | `medium` | One value. Not described in the metadata. |
| `rounded` | boolean | `true` |  |  |

## When and how to use

### Do

- Use one chip per value, inside the field the value was entered in. A row of chips is how someone checks what they have picked.
- Turn Show Avatar off for values that are not people. A placeholder face on a tag is worse than no face at all.

### Don't

- Don't use an input chip to filter a list. That is a filter chip, and the remove icon here promises deletion rather than toggling.
- Don't leave a chip disabled without saying why nearby. The remove control stays visible, so it reads as broken rather than locked.

## States

| State | Trigger | What changes |
|---|---|---|
| default | — |  |
| hover | Pointer over the chip |  |
| focus | Keyboard focus |  |
| disabled | disabled set to true |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is authored. Every state change is a flat swap of fill, border or text colour.
- **Removal** — The remove control is always present and the set models no removed state. What activating it does, and whether the value can be restored, belongs to the implementation.
- **Coverage** — Eight of the twelve possible combinations are built. disabled appears only alongside State=default, so there is no disabled hover or disabled focus to point at.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. The only text the chip takes. |
| Avatar | nested instance, toggled by Show Avatar | An Avatar at Size=xxxsmall with its own Status, Ring and Close all switched off, so only the face or initials shows. Its visibility is the one child property the chip surfaces. |
| Remove control | fixed nested Icon | An Icon at Size=small swapped to Close. There is no property to hide it, so every input chip shows a remove affordance whether or not the value can be removed. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug width, fixed height | 40 tall across all eight variants. Width hugs the avatar, label and remove control. |
| Padding and gap | Fixed | space/xs top and bottom, space/sm left and right, with a space/sm gap between the three parts. |
| Radius | Per Rounded | radius/pill when true and radius/none when false, bound on all four corners. |
| Fill | Theming | interactive/ghost/background at default, hover and focused. disabled uses interactive/neutral/background/disabled. |
| Border | Per state | 1px inside interactive/neutral/border/default at rest and on hover. Focus replaces it with 2px focus/outline drawn outside. Disabled carries no border. |
| Label | Theming | label/medium, IBM Plex Sans Medium 14 over a 20px line, in interactive/neutral/foreground/default and dropping to the disabled token. |
| Child sizes | Fixed | Avatar 24 square, remove icon 16 square. |

## Accessibility

- The remove control is an icon with no text. It needs an accessible name that includes the value it removes, not just Remove.
- Focus is the only state with a visible outline and it is drawn outside the chip. Check it is not clipped by the field around it.
- Removing a chip changes what the field contains. That change has to be announced, or a keyboard user loses track of what is left.
- Disabled chips drop the border entirely and rely on fill and text colour alone. Check both against the field background.
- The label uses label/medium at 14px and carries the actual value, so it should not be reduced further.

---
*Generated from `specs/input-chip` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
