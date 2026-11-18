# Inline Banner

> A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its container's width. Status sets the colour and glyph; Appearance sets how loud it is. Solid interrupts, for the one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-in-page-banner>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `status` | enum | `info` | `negative` `warning` `neutral` `info` `positive` |  |
| `appearance` | enum | `subtle` | `subtle` `solid` |  |
| `shape` | enum | `rounded` | `rounded` `sharp` |  |
| `title` | string | `Inline banner title` |  |  |
| `description` | string | `Supporting line: why, and what to do next.` |  |  |
| `showDescription` | boolean | `true` |  |  |
| `showIcon` | boolean | `true` |  |  |
| `showActions` | boolean | `true` |  |  |
| `showClose` | boolean | `false` |  |  |
| `actions` | slot | `one small Button (sample content)` |  |  |

## When and how to use

### Do

- Use solid for the one message on a view that blocks or changes what the person can do. Make everything else subtle.
- Place it next to what it is about: above the form, inside the card, at the top of the panel.

### Don't

- Don't stack several solid banners. They compete, and the page reads as an alarm.
- Don't use it for page-wide or system news. That is System Banner, pinned to the top of the view.

## States

| State | Trigger | What changes |
|---|---|---|
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
|  |  |  |

## Accessibility

- Announced politely; negative is announced immediately.
- Keep the glyph on, or name the status in the text, so colour is never the only signal.
- The action and the dismiss carry their own focus states.
- Known gap: foreground/on-strong falls below 4.5:1 on solid neutral (both modes) and solid warning (dark mode).

---
*Generated from `specs/inline-banner` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
