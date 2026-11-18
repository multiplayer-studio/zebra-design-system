# Notification Indicator

> Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether that count is shown at all, with small reducing to a plain dot that says only that something is new. It carries one fixed colour, so it reports how many and never what kind.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-notification-indicator>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `value` | string | `2` |  |  |
| `size` | enum | `large` | `small` `medium` `large` |  |

## When and how to use

### Do

- Reach for small where the fact that something is new is the whole message. It is the only form that makes no claim about quantity.
- Keep the count short. Only large grows with its text, so a long number is clipped at the other two sizes rather than accommodated.

### Don't

- Don't reach for it to mean anything other than items waiting. It has one fixed colour, so it cannot carry a second meaning alongside the first.
- Don't put a count on small. It carries no text, so the number disappears with nothing to show it went.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Size | The Size value |  |

## Behaviour

- **Motion** — No transition is defined. A change in the count is a text swap.
- **Count and size** — small carries no count at all. Moving between small and the other two changes what is being said rather than only the scale, so the choice follows whether the number is worth reading.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Value | text property | Consumer owned, set through Value and shown at large and medium. Keep it short, because only large grows with its text. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed per Size | 28 by 20 at large, a 16 square at medium and an 8 dot at small. |
| Padding | Per Size | space/xxs left and right at large with 3 above and below. medium and small carry none, because their content is centred inside a fixed square. |
| Radius | Fixed | radius/pill at all three sizes, so every form is fully round whether or not it holds a number. |
| Fill | Fixed | interactive/destructive/background/default at every size. One colour throughout, which does not vary with the count. |
| Border | Theming | A stroke bound to border/inverse sits on all three sizes at zero weight. The weight is a theming hook rather than an omission, so a high contrast set can give the indicator a hard outline where it overlaps whatever it is pinned to. |
| Value | Theming | indicator/medium at 12px in interactive/destructive/foreground/default. Present at large and medium, absent at small. |

## Accessibility

- The indicator is colour and shape only. The count is its sole text and at small there is none, so what it refers to has to be named by whatever it is pinned to.
- A count of zero belongs with the indicator removed rather than shown as a zero. There is no empty form, so a visible zero reads as a notification about nothing.
- The zero weight border is a theming hook. A high contrast set raises it and separates the indicator from a busy background, which matters because it usually overlaps something.
- Nothing here is focusable and a change in the count does not announce itself. The structure around it has to report that the number moved.

---
*Generated from `specs/notification-indicator` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
