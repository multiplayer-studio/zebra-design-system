# Phone Input

> Takes a phone number, with a country picker joined to its start. The picker sets the flag and dial code, and the field groups digits as they are typed. The whole number is available in E.164.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-phone-input>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `state` | enum | `default` | `default` `invalid` `disabled` |  |
| `size` | enum | `medium` | `small` `medium` `large` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` `full` |  |
| `flavour` | enum | `default` | `default` `gradient` `ghost` |  |
| `open` | enum | `false` | `false` `true` |  |
| `flag` | enum | `emoji` | `emoji` `artwork` `icon` |  |
| `value` | string |  |  |  |
| `onValueChange` | function |  |  |  |
| `country` | string |  |  |  |
| `countries` | array |  |  |  |
| `countryLabel` | string |  |  |  |
| `name` | string |  |  |  |

## When and how to use

### Do

- Use real flag artwork in the product. Pass flag on each country, or swap the exposed Flag instance in a design.
- Pair it with validation, and set invalid with the reason in the hint. Grouping alone does not prove a number exists.

### Don't

- Don't ship the flag glyph as the real thing. It is a placeholder, and it says nothing about the country.
- Don't use the flag as the only sign of the country. The dial code and the country's name in the menu carry it too.

## States

| State | Trigger | What changes |
|---|---|---|
| default | — |  |
| hover, focus, typing | The number's own states |  |
| invalid | Set on the assembly |  |
| disabled | Set on the assembly |  |
| Country control | Pointer or keyboard |  |
| Open | Activating the country control |  |

## Behaviour

- **Motion** — No transition is defined.
- **Grouping** — Digits group by the country's format as they are typed, and the caret stays with its digit. Grouping is visual: it does not check that a number exists.
- **Length** — Digits stop at the format's length. Without a format they stop at the E.164 limit.
- **Country** — Picking a country changes the dial code and format, and keeps the digits. Extra digits are dropped.
- **Value** — value is the national digits. onValueChange also gives the E.164 number, and name submits it.
- **Dropdown** — The country control is the Template/Dropdown trigger. The menu opens below it, left aligned, space/sm away, with one row per country. It scrolls past eight rows.
- **Keyboard** — Enter or Space opens the menu. Arrow keys move through the rows. Escape closes it and returns focus to the control.
- **Flags** — Code uses the system's emoji flag unless a country passes flag. Pass artwork where flags must show everywhere, because Windows has no emoji flags. Artwork replaces the emoji in the control and every row.
- **Portal** — Figma only: the menu is drawn inside the component. In code it mounts in a portal and is positioned against the control, with collision handling.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | Input Label, parent owned | The field's name. It marks required or optional, like Input. |
| Country control | _Phone Country, parent owned | The flag and a chevron, joined to the number. It has no visible text, so countryLabel names it. |
| Flag | Flag instance, exposed | Takes real flag artwork. Figma only: the default is the flag glyph as a placeholder, so swap in a flag component wherever the real flag matters. In code, pass flag on a country. |
| Number | Input / Phone, parent owned | The dial code and digits. Dial Code is fixed text that reads with the value. |
| Hint | Input Hint, parent owned | The supporting line, and the reason when invalid. |
| Country menu | Dropdown Menu, parent owned | One Menu Item per country, with its flag and dial code. The selected country takes the selected row. |
| Sample digits | Figma only | The number, dial code and two menu rows are sample content, not API. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Start width, hug height | Starts 280 wide and narrows to fit its container, and block fills it. Height follows size through control/sm, control/md and control/lg. |
| Join | No gap | The country control and number sit edge to edge. The control has no end border, and only the outer corners take the radius. |
| Country control | Hug | space/sm at the sides, with space/2xs between flag and chevron. interactive/neutral backgrounds, as the number. |
| Flag | Set to medium | control/icon-md wide, emoji or artwork. Artwork keeps its own ratio. |
| Number | Fill | space/sm at the start, with space/2xs between the dial code and the digits. |
| Gradient | Theming | The control's border is foreground/gradient/start, so it runs into the number's. It goes neutral when invalid. |
| Ghost | Theming | No surface, and a stroke/base border. Hover, pressed and open use interactive/ghost backgrounds. |

## Accessibility

- The label names the number, and the hint is tied to it.
- The country control has no visible text, so countryLabel names it, with the selected country and dial code following.
- Flags are decorative and hidden from assistive tech, whether emoji or artwork.
- Opening the menu moves focus into it, and Escape returns it to the control.
- The number uses a tel input mode and tel-national autocomplete.
- Invalid is not colour alone, because the hint gives the reason.

---
*Generated from `specs/phone-input` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
