# Dropdown

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-5903&m=dev

## Template/Dropdown

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-5903&m=dev

### Layer structure

- Template/Dropdown (COMPONENT)
  - Template/Dropdown/Trigger Component (FRAME)
    - Template/Dropdown/Trigger Component/Button (INSTANCE)
  - Template/Dropdown/Dropdown Menu (INSTANCE)

### Resolved tokens (default variant: Open=false, Position=bottom, Align=left)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Template/Dropdown | itemSpacing | 10 | — |
| Template/Dropdown/Trigger Component | itemSpacing | 10 | — |
| Template/Dropdown/Trigger Component/Button | fill[0] | #1f69ff | interactive.primary.background.default |
| Template/Dropdown/Trigger Component/Button | stroke[0] | #1f69ff | interactive.primary.border.default |
| Template/Dropdown/Trigger Component/Button | cornerRadius | 4 | radius.element-sm |
| Template/Dropdown/Trigger Component/Button | padding.left | 12 | space.md |
| Template/Dropdown/Trigger Component/Button | padding.right | 12 | space.md |
| Template/Dropdown/Trigger Component/Button | padding.top | 4 | space.xs |
| Template/Dropdown/Trigger Component/Button | padding.bottom | 4 | space.xs |
| Template/Dropdown/Dropdown Menu | fill[0] | #ffffff | surface.menu |
| Template/Dropdown/Dropdown Menu | cornerRadius | 6 | radius.element-md |
| Template/Dropdown/Dropdown Menu | itemSpacing | 2 | space.2xs |
| Template/Dropdown/Dropdown Menu | padding.left | 12 | space.card |
| Template/Dropdown/Dropdown Menu | padding.right | 12 | space.card |
| Template/Dropdown/Dropdown Menu | padding.top | 12 | space.card |
| Template/Dropdown/Dropdown Menu | padding.bottom | 12 | space.card |

## Menu Item

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-5903&m=dev

### Layer structure

- Menu Item (COMPONENT)
  - Menu Item/Leading Icon (INSTANCE)
  - Menu Item/Label (FRAME)
    - Menu Item/Label/Label (TEXT)
  - Menu Item/Trailing Icon (INSTANCE)
  - Menu Item/Leading Slot (SLOT)

### Resolved tokens (default variant: State=Default, Type=Icon, Rounded=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Menu Item | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Menu Item | cornerRadius | 0 | radius.none |
| Menu Item | itemSpacing | 8 | space.sm |
| Menu Item | padding.left | 12 | space.md |
| Menu Item | padding.right | 12 | space.md |
| Menu Item | padding.top | 4 | space.xs |
| Menu Item | padding.bottom | 4 | space.xs |
| Menu Item/Label | padding.left | 4 | space.xs |
| Menu Item/Label | padding.right | 24 | space.xl |
| Menu Item/Label/Label | fill[0] | #0c0d0e | interactive.neutral.foreground.default |
| Menu Item/Label/Label | fontSize | 14 | label.medium |
| Menu Item/Label/Label | lineHeight | 20 | label.medium |
| Menu Item/Label/Label | letterSpacing | 0 | label.medium |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | Menu Item | fill[0] | interactive.ghost.background.hover |
| State | selected | Menu Item | fill[0] | interactive.ghost.background.selected |
| State | focus | Menu Item | fill[0] | interactive.ghost.background.focused |
| State | focus | Menu Item | stroke[0] | border.focus |
| State | selected focus | Menu Item | fill[0] | interactive.ghost.background.selected |
| State | selected focus | Menu Item | stroke[0] | border.focus |
| State | disabled | Menu Item | fill[0] | interactive.ghost.background.disabled |
| State | disabled | Menu Item/Label/Label | fill[0] | interactive.neutral.foreground.disabled |
| Rounded | true | Menu Item | cornerRadius | radius.sm |

## Dropdown Menu

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-5903&m=dev

### Layer structure

- Dropdown Menu (COMPONENT)
  - Dropdown Menu/Content (FRAME)
    - Dropdown Menu/Content/Menu Item (INSTANCE)
    - Dropdown Menu/Content/Slot Container (SLOT)

### Resolved tokens (default variant: Rounded=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Dropdown Menu | fill[0] | #ffffff | surface.menu |
| Dropdown Menu | cornerRadius | 0 | radius.none |
| Dropdown Menu | itemSpacing | 2 | space.2xs |
| Dropdown Menu | padding.left | 12 | space.card |
| Dropdown Menu | padding.right | 12 | space.card |
| Dropdown Menu | padding.top | 12 | space.card |
| Dropdown Menu | padding.bottom | 12 | space.card |
| Dropdown Menu/Content | itemSpacing | 4 | space.xs |
| Dropdown Menu/Content/Menu Item | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Dropdown Menu/Content/Menu Item | cornerRadius | 0 | radius.none |
| Dropdown Menu/Content/Menu Item | itemSpacing | 8 | space.sm |
| Dropdown Menu/Content/Menu Item | padding.left | 12 | space.md |
| Dropdown Menu/Content/Menu Item | padding.right | 12 | space.md |
| Dropdown Menu/Content/Menu Item | padding.top | 4 | space.xs |
| Dropdown Menu/Content/Menu Item | padding.bottom | 4 | space.xs |
| Dropdown Menu/Content/Slot Container | itemSpacing | 4 | space.xs |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Rounded | true | Dropdown Menu | cornerRadius | radius.element-md |
| Rounded | true | Dropdown Menu/Content/Menu Item | cornerRadius | radius.sm |
