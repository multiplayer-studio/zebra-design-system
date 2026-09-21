# Button

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729&m=dev

## Button

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729&m=dev

### Layer structure

- Button (COMPONENT)
  - Button/Leading Icon (INSTANCE)
  - Button/Label (FRAME)
    - Button/Label/Label (TEXT)
  - Button/Trailing Icon (INSTANCE)

### Resolved tokens (default variant: Size=small, Shape=sharp, Flavour=primary, State=default, Disabled=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Button | fill[0] | #1f69ff | interactive.primary.background.default |
| Button | stroke[0] | #1f69ff | interactive.primary.border.default |
| Button | cornerRadius | 0 | radius.none |
| Button | padding.left | 12 | space.md |
| Button | padding.right | 12 | space.md |
| Button | padding.top | 4 | space.xs |
| Button | padding.bottom | 4 | space.xs |
| Button/Label | padding.left | 4 | space.xs |
| Button/Label | padding.right | 4 | space.xs |
| Button/Label/Label | fill[0] | #f8fbff | interactive.primary.foreground.default |
| Button/Label/Label | fontSize | 14 | label.medium |
| Button/Label/Label | lineHeight | 20 | label.medium |
| Button/Label/Label | letterSpacing | 0 | label.medium |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Size | medium | Button/Label | padding.left | space.sm |
| Size | medium | Button/Label | padding.right | space.sm |
| Size | medium | Button/Label/Label | fontSize | body.medium \| label.large |
| Size | medium | Button/Label/Label | lineHeight | body.medium \| label.large |
| Size | medium | Button/Label/Label | letterSpacing | body.medium \| label.large |
| Size | large | Button | padding.left | space.lg |
| Size | large | Button | padding.right | space.lg |
| Size | large | Button/Label | padding.left | space.sm |
| Size | large | Button/Label | padding.right | space.sm |
| Size | large | Button/Label/Label | fontSize | body.medium \| label.large |
| Size | large | Button/Label/Label | lineHeight | body.medium \| label.large |
| Size | large | Button/Label/Label | letterSpacing | body.medium \| label.large |
| Shape | rounded | Button | cornerRadius | radius.element-sm |
| Shape | full | Button | cornerRadius | radius.pill |
| Flavour | positive | Button | fill[0] | interactive.positive.background.default |
| Flavour | positive | Button | stroke[0] | interactive.positive.border.default |
| Flavour | positive | Button/Label/Label | fill[0] | interactive.positive.foreground.default |
| Flavour | negative | Button | fill[0] | interactive.destructive.background.default |
| Flavour | negative | Button | stroke[0] | interactive.destructive.border.default |
| Flavour | negative | Button/Label/Label | fill[0] | interactive.destructive.foreground.default |
| Flavour | subtle | Button | fill[0] | interactive.neutral.background.default |
| Flavour | subtle | Button | stroke[0] | interactive.neutral.border.default |
| Flavour | subtle | Button/Label/Label | fill[0] | interactive.neutral.foreground.default |
| Flavour | text | Button | fill[0] | interactive.ghost.background.default |
| Flavour | text | Button | stroke[0] | interactive.ghost.border.default |
| Flavour | text | Button/Label/Label | fill[0] | interactive.ghost.foreground.default |
| Flavour | outline-subtle | Button | fill[0] | interactive.neutral.background.default |
| Flavour | outline-subtle | Button | stroke[0] | interactive.neutral.border.default |
| Flavour | outline-subtle | Button/Label/Label | fill[0] | interactive.neutral.foreground.default |
| Flavour | outline | Button | fill[0] | interactive.neutral.background.default |
| Flavour | outline | Button | stroke[0] | interactive.ghost.border.default |
| Flavour | outline | Button/Label/Label | fill[0] | interactive.ghost.foreground.default |
| Flavour | text-gradient | Button | fill[0] | interactive.ghost.background.default |
| Flavour | text-gradient | Button | stroke[0] | interactive.ghost.border.default |
| State | hover | Button | fill[0] | interactive.primary.background.hover |
| State | hover | Button | stroke[0] | interactive.primary.border.hover |
| State | pressed | Button | fill[0] | interactive.primary.background.pressed |
| State | pressed | Button | stroke[0] | interactive.primary.border.pressed |
| State | focus | Button | fill[0] | interactive.primary.background.focused |
| State | focus | Button | stroke[0] | border.focus |
| Disabled | true | Button | fill[0] | interactive.primary.background.disabled |
| Disabled | true | Button | stroke[0] | interactive.primary.border.disabled |
| Disabled | true | Button/Label/Label | fill[0] | interactive.primary.foreground.disabled |

## Icon Button

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2024-6729&m=dev

### Layer structure

- Icon Button (COMPONENT)
  - Icon Button/Icon (INSTANCE)

### Resolved tokens (default variant: Size=small, Shape=sharp, Flavour=primary, State=default, Disabled=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Icon Button | fill[0] | #1f69ff | interactive.primary.background.default |
| Icon Button | stroke[0] | #1f69ff | interactive.primary.border.default |
| Icon Button | cornerRadius | 0 | radius.none |
| Icon Button | padding.left | 4 | space.xs |
| Icon Button | padding.right | 4 | space.xs |
| Icon Button | padding.top | 4 | space.xs |
| Icon Button | padding.bottom | 4 | space.xs |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Shape | rounded | Icon Button | cornerRadius | radius.element-sm |
| Shape | full | Icon Button | cornerRadius | radius.pill |
| Flavour | positive | Icon Button | fill[0] | interactive.positive.background.default |
| Flavour | positive | Icon Button | stroke[0] | interactive.positive.border.default |
| Flavour | negative | Icon Button | fill[0] | interactive.destructive.background.default |
| Flavour | negative | Icon Button | stroke[0] | interactive.destructive.border.default |
| Flavour | subtle | Icon Button | fill[0] | interactive.neutral.background.default |
| Flavour | subtle | Icon Button | stroke[0] | interactive.neutral.border.default |
| Flavour | text | Icon Button | fill[0] | interactive.ghost.background.default |
| Flavour | text | Icon Button | stroke[0] | interactive.ghost.border.default |
| Flavour | outline-subtle | Icon Button | fill[0] | interactive.neutral.background.default |
| Flavour | outline-subtle | Icon Button | stroke[0] | interactive.neutral.border.default |
| Flavour | outline | Icon Button | fill[0] | interactive.neutral.background.default |
| Flavour | outline | Icon Button | stroke[0] | interactive.ghost.border.default |
| Flavour | text-gradient | Icon Button | fill[0] | interactive.ghost.background.default |
| Flavour | text-gradient | Icon Button | stroke[0] | interactive.ghost.border.default |
| State | hover | Icon Button | fill[0] | interactive.primary.background.hover |
| State | hover | Icon Button | stroke[0] | interactive.primary.border.hover |
| State | pressed | Icon Button | fill[0] | interactive.primary.background.pressed |
| State | pressed | Icon Button | stroke[0] | interactive.primary.border.pressed |
| State | focus | Icon Button | fill[0] | interactive.primary.background.focused |
| State | focus | Icon Button | stroke[0] | border.focus |
| Disabled | true | Icon Button | fill[0] | interactive.primary.background.disabled |
| Disabled | true | Icon Button | stroke[0] | interactive.primary.border.disabled |
