# Radio Button

> A circular control for choosing exactly one option from a set, with an optional text label beside it. Every option in the set shares a group and exactly one carries Checked at a time. A short, fixed list of mutually exclusive options is what it fits, a long or growing list is better served by a dropdown.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-radio-button>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `checked` | enum | `false` | `false` `true` |  |
| `state` | enum | `enabled` | `enabled` `hover` `focus` `disabled` |  |
| `size` | enum | `large` | `medium` `large` |  |
| `hasLabel` | boolean | `true` |  |  |

## When and how to use

### Do

- Give every option in a set its own Radio Button sharing a group, with exactly one Checked at a time.
- Pair Checked with a label that states the option in full, the control alone does not say what is being chosen.

### Don't

- Don’t leave more than one Radio Button in the same group Checked at once, the control is built for a single choice.
- Don’t reach for Radio Button for a single standalone yes or no choice, Checkbox or Switch fits that better.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]
- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- Grouping, the relationship that makes exactly one option in a set selectable, is not something Figma represents, it is carried by whatever groups the instances in code. Focus here is the only visual record of keyboard interaction, pair it with a label so the option reads on its own.

---
*Generated from `specs/radio-button` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
