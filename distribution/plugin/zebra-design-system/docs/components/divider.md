# Divider

> A thin line used to visually separate content into distinct sections or groups, such as list rows, cards, or menu items. Orientation sets whether the line runs horizontal or vertical. It's a static, non-interactive element with no content of its own, choose the orientation that matches the layout direction it needs to divide.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-design-system/zeta-web` (`<zeta-divider>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `orientation` | enum | `horizontal` | `horizontal` `vertical` |  |

## When and how to use

### Do

- Choose Orientation to match the layout direction, horizontal to separate stacked content, vertical to separate side-by-side content.
- Resize the instance to fill its container rather than leaving it at the default 320×1 (or 1×40) size, the line stretches with the frame.

### Don't

- Don't use Divider as a spacing or margin mechanism, it's a visual line with no built-in padding, use layout gap for spacing between elements instead.

## Accessibility

- Non-interactive and not focusable, Divider carries no keyboard or focus behavior of its own
- In code, expose it with the platform's separator role (and an orientation attribute for the vertical variant) so assistive technology announces it correctly
- Uses the border/default semantic token for its color, which resolves separately for light and dark mode, don't override it with a hardcoded color

---
*Generated from `specs/divider` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
