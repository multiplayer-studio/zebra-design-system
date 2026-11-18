# Button Group

> A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading. The group owns the fill, the outline and the rules between items, and the items themselves are Figma-only wrappers around the subtle Button. Reach for a single Button when one action is clearly the primary one.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-button-group>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `size` | enum | `medium` | `small` `medium` `large` |  |
| `shape` | enum | `sharp` | `sharp` `rounded` |  |
| `items` | slot |  |  |  |

## When and how to use

### Do

- Use it where several actions are peers. If one is clearly the main action, a single Button says so more plainly.
- Set the last item's Position to end. That is what removes the trailing divider and leaves the group a clean edge.

### Don't

- Don't change Size after filling the slot. Each Size has its own slot, so the content does not travel with it.
- Don't expect Shape to round the buttons. It rounds the group's outline only, and every wrapper holds a square button.

## States

| State | Trigger | What changes |
|---|---|---|
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

- The group is a set of related actions. It needs a group role and a name saying what the actions have in common.
- No focus state exists on the group or on the wrappers, so focus order and a visible focus ring both have to come from code.
- Items are told apart by a 1px divider and nothing else. Where the group's fill is close to the surface behind it, the outline is doing all the work of bounding the group.
- The nested Button ships with a Verified leading icon and an Expand More trailing icon. Icons beside a label need to be decorative or separately named, not read out twice.
- Nothing marks an action as current or chosen. A group that needs that is not modelled here.

---
*Generated from `specs/button-group` — do not edit by hand. Theming: put `mode-dark`, `ext-companion` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
