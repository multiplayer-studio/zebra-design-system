# Accordion

> A vertically stacked list of disclosure rows sharing one container, for a page that has more sections than it has room to show at once. Selectable decides whether rows can be ticked as well as opened, and In Card decides whether the list reads as a bounded object. The rows themselves are separate components with their own frames.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-accordion>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `selectable` | enum | `true` | `true` `false` |  |
| `rounded` | enum | `false` | `false` `true` |  |
| `inCard` | enum | `true` | `true` `false` |  |
| `items` | slot |  |  | Figma holds two slot properties, one per Selectable value; preferred content is _Accordion Item Selectable and _Accordion Item respectively. The metadata states that in code this is a single content slot. |

---
*Generated from `specs/accordion` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
