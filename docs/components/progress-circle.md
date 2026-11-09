# Progress Circle

> A ring that reports an ongoing process where a bar will not fit, beside an icon or inside a dense row. Five sizes cover inline through to prominent, and Upload turns it into a file-transfer control with a cancel action. Unlike Progress Bar it has no property for the amount of progress, so the arc is fixed here and the real value has to come from the implementation.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-progress-circle>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `size` | enum | `xxsmall` | `xxsmall` `xsmall` `small` `medium` `large` |  |
| `rounded` | enum | `true` | `true` `false` |  |
| `upload` | boolean | `false` |  |  |
| `showTrack` | boolean | `true` |  |  |

## When and how to use

### Do

- Use medium or large whenever Upload is on. The control is a fixed size, so the smaller rings leave it almost no margin.
- Pair the ring with nearby text. On its own it says that something is happening but never what.

### Don't

- Don't read the arc as a value. It is identical in every variant, so a screen with several rings will show them all at the same apparent progress.
- Don't use Upload at xsmall or xxsmall. The property is offered at those sizes but the control is not built, so turning it on does nothing.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — | The ring has no hover, pressed, focus or disabled states, and no progress states either. Every one of the ten variants draws the same arc. |
| Upload shown | Upload set to true | A control appears centred in the ring, reporting the percentage. Its own Stop property swaps that readout for a cancel button. |

## Behaviour

- **Motion** — Figma stores no timing and the ring models no transition. The arc is drawn in one fixed position in every variant, so both a determinate sweep and an indeterminate spin belong entirely to the implementation.
- **Progress** — There is no property for the amount. The arc sits at roughly three quarters in every variant, which is a placeholder rather than a value, so nothing here should be read as a real state.
- **Upload** — Showing or hiding the control does not resize the ring, because the control is centred inside it rather than stacked with it.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Upload control | nested instance, toggled by Upload | The file-transfer control at the centre, left exposed so its Stop state is reachable from the ring. It is a fixed 36px whatever the ring's size, so at small it nearly fills the ring, and at xsmall and xxsmall it is not present at all. |
| Percentage readout | inside the Upload control | Part of the nested control rather than a property of the ring. It ships reading 75% and has to be overridden on the instance to say anything else. |
| Track and arc | fixed parts | Neither is a slot. The arc's sweep is what would encode a value, and it is identical in every variant. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed square per Size | 24, 36, 40, 48 and 64px across the five steps. Always square, and never hugging its content. |
| Stroke weight | Fixed | stroke/heavy at every size. It does not scale, so the ring is roughly a sixth of the diameter at xxsmall and a sixteenth at large. |
| Arc | Fixed | The track covers the full circle. The arc begins at twelve o'clock and runs about three quarters of the way round, identically in all ten variants. |
| Line cap | Fixed per Rounded | The arc's ends are round when Rounded is true and square when it is false. The track's ends are always square, though a full circle hides them. |
| Upload control | Fixed | 36px regardless of the ring's size, centred, and present only at small, medium and large. |
| Colour | Theming | The arc is border/info and the track border/subtle. The arc also carries a foreground/link fill which does not render, because the shape is drawn with no inner area and the stroke does the visible work. |

## Accessibility

- The ring reports progress visually and nothing else. The value, its range and what it refers to all have to be exposed in code.
- The ring carries no label of its own, so on its own it signals that something is happening but not what. Pair it with nearby text.
- The stroke is the same weight at every size, so at xxsmall the ring is proportionally far heavier than at large. Check the smallest sizes still read as a ring.
- The arc and the track are separated by colour alone. Check border/info against border/subtle on the surface behind them.
- The Upload control's cancel action is a real control. It needs an accessible name and a keyboard path, neither of which is modelled here.

---
*Generated from `specs/progress-circle` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
