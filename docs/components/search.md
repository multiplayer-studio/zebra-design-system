# Search

> A single-line input for typing a query, with a magnifier leading it and a trailing control that takes whatever icon and function the implementation passes. State covers the whole typing lifecycle from empty through focus to a committed query, and Flavour decides how much the field asserts itself against the surface behind it. Size and Shape match it to the controls around it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-search>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `shape` | enum | `sharp` | `sharp` `rounded` `full` |  |
| `state` | enum | `enabled` | `enabled` `hover` `focus` `selected` `typing` `filled` `disabled` |  |
| `size` | enum | `large` | `small` `medium` `large` |  |
| `flavour` | enum | `default` | `default` `gradient` `ghost` |  |
| `hasLeading` | boolean | `true` |  |  |
| `hasTrailing` | boolean | `true` |  |  |

## When and how to use

### Do

- Keep hasLeading on unless the surrounding context already says this is search. The magnifier is the fastest signal the field gives.
- Use ghost on a surface that already bounds the field, such as a header, and default inside a form.

### Don't

- Don't reach for gradient on an ordinary search field. It marks a distinct interaction such as an AI companion, and spreading it across a view drains the meaning it carries.
- Don't treat typing as a style. It is the only state carrying a clear control, so choosing it changes what the field offers.

## States

| State | Trigger | What changes |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Behaviour

- [object Object]
- [object Object]
- [object Object]

## Content

| Part | Kind | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Accessibility

- The field carries no label of its own. A placeholder is not a label, so one has to be supplied alongside it.
- Focus is the heaviest border in the set and is what keyboard users depend on. On ghost the outline is optional, so wherever it is suppressed the container has to show focus in its place.
- The magnifier and the trailing control are icons with no text. Each needs a name, and whatever function the trailing control carries is a real action rather than decoration.
- The clear control appears only while typing. Its arrival and departure change what is reachable, so that change has to be announced.
- Placeholder text uses foreground/disabled, the lowest-contrast text in the field. Check it against the surface before relying on it to carry meaning.
- At small the text drops to 14px and the field to 36 tall. Check the target still works for touch.

---
*Generated from `specs/search` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
