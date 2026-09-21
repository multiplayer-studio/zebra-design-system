# Navigation Rail

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

## Navigation Rail

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Navigation Rail (COMPONENT)
  - Navigation Rail/Main Rail (FRAME)
    - Navigation Rail/Main Rail/Navigation Header (INSTANCE)
    - Navigation Rail/Main Rail/Icon Button (INSTANCE)
    - Navigation Rail/Main Rail/Menu List (FRAME)
      - Navigation Rail/Main Rail/Menu List/Rail Item 1 (INSTANCE)
      - Navigation Rail/Main Rail/Menu List/Rail Item 2 (INSTANCE)
      - Navigation Rail/Main Rail/Menu List/Rail Item 3 (INSTANCE)
      - Navigation Rail/Main Rail/Menu List/Menu Slot (SLOT)
    - Navigation Rail/Main Rail/Footer (FRAME)
      - Navigation Rail/Main Rail/Footer/Footer Slot (SLOT)
      - Navigation Rail/Main Rail/Footer/Footer Rail Item (INSTANCE)
      - Navigation Rail/Main Rail/Footer/Navigation Rail Item (INSTANCE)
    - Navigation Rail/Main Rail/Button (INSTANCE)
  - Navigation Rail/Sub menu (FRAME)
    - Navigation Rail/Sub menu/Sub Menu Header (INSTANCE)
    - Navigation Rail/Sub menu/Sub Menu Slot (SLOT)

### Resolved tokens (default variant: Label=false, Expanded=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Navigation Rail | fill[0] | #0c0d0e | surface.section |
| Navigation Rail/Main Rail | itemSpacing | 12 | space.md |
| Navigation Rail/Main Rail | padding.left | 12 | space.md |
| Navigation Rail/Main Rail | padding.right | 12 | space.md |
| Navigation Rail/Main Rail | padding.top | 12 | space.card |
| Navigation Rail/Main Rail | padding.bottom | 12 | space.card |
| Navigation Rail/Main Rail/Navigation Header | itemSpacing | 10 | — |
| Navigation Rail/Main Rail/Icon Button | fill[0] | #1f69ff | interactive.primary.background.default |
| Navigation Rail/Main Rail/Icon Button | stroke[0] | #1f69ff | interactive.primary.border.default |
| Navigation Rail/Main Rail/Icon Button | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Icon Button | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Icon Button | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Icon Button | padding.top | 4 | space.xs |
| Navigation Rail/Main Rail/Icon Button | padding.bottom | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List | itemSpacing | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | fill[0] | #d6dce200 | interactive.ghost.background.default |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.top | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.bottom | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | fill[0] | #d6dce200 | interactive.ghost.background.default |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.top | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.bottom | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | fill[0] | #d6dce200 | interactive.ghost.background.default |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.top | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.bottom | 8 | space.sm |
| Navigation Rail/Main Rail/Menu List/Menu Slot | itemSpacing | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Menu Slot | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Menu List/Menu Slot | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Footer | itemSpacing | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Footer Slot | itemSpacing | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | fill[0] | #d6dce200 | interactive.ghost.background.default |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.top | 8 | space.sm |
| Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.bottom | 8 | space.sm |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | fill[0] | #d6dce200 | interactive.ghost.background.default |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | cornerRadius | 4 | radius.element-sm |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.left | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.right | 4 | space.xs |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.top | 8 | space.sm |
| Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.bottom | 8 | space.sm |
| Navigation Rail/Sub menu | stroke[0] | #545963 | border.default |
| Navigation Rail/Sub menu/Sub Menu Header | stroke[0] | #545963 | border.default |
| Navigation Rail/Sub menu/Sub Menu Header | itemSpacing | 10 | — |
| Navigation Rail/Sub menu/Sub Menu Header | padding.left | 16 | space.lg |
| Navigation Rail/Sub menu/Sub Menu Header | padding.right | 16 | space.lg |
| Navigation Rail/Sub menu/Sub Menu Slot | itemSpacing | 4 | space.xs |
| Navigation Rail/Sub menu/Sub Menu Slot | padding.left | 8 | space.sm |
| Navigation Rail/Sub menu/Sub Menu Slot | padding.right | 8 | space.sm |
| Navigation Rail/Sub menu/Sub Menu Slot | padding.top | 8 | space.sm |
| Navigation Rail/Sub menu/Sub Menu Slot | padding.bottom | 8 | space.sm |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Expanded | true | Navigation Rail/Main Rail/Button | fill[0] | interactive.primary.background.default |
| Expanded | true | Navigation Rail/Main Rail/Button | stroke[0] | interactive.primary.border.default |
| Expanded | true | Navigation Rail/Main Rail/Button | cornerRadius | radius.element-sm |
| Expanded | true | Navigation Rail/Main Rail/Button | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Button | padding.right | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Button | padding.top | space.xs |
| Expanded | true | Navigation Rail/Main Rail/Button | padding.bottom | space.xs |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 1 | itemSpacing | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 1 | padding.right | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 2 | itemSpacing | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 2 | padding.right | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 3 | itemSpacing | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Menu List/Rail Item 3 | padding.right | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Footer Rail Item | itemSpacing | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Footer Rail Item | padding.right | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Navigation Rail Item | itemSpacing | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.left | space.lg |
| Expanded | true | Navigation Rail/Main Rail/Footer/Navigation Rail Item | padding.right | space.lg |

## Navigation Rail Item

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Navigation Rail Item (COMPONENT)
  - Navigation Rail Item/Indicator (FRAME)
    - Navigation Rail Item/Indicator/Icon (INSTANCE)
    - Navigation Rail Item/Indicator/Notification Indicator (INSTANCE)
  - Navigation Rail Item/Label (TEXT)

### Resolved tokens (default variant: State=default, Disabled=false, Expanded=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Navigation Rail Item | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Navigation Rail Item | cornerRadius | 4 | radius.sm |
| Navigation Rail Item | padding.left | 4 | space.xs |
| Navigation Rail Item | padding.right | 4 | space.xs |
| Navigation Rail Item | padding.top | 8 | space.sm |
| Navigation Rail Item | padding.bottom | 8 | space.sm |
| Navigation Rail Item/Indicator | itemSpacing | 10 | — |
| Navigation Rail Item/Indicator/Notification Indicator | fill[0] | #d70015 | interactive.destructive.background.default |
| Navigation Rail Item/Indicator/Notification Indicator | stroke[0] | #ffffff | border.inverse |
| Navigation Rail Item/Indicator/Notification Indicator | cornerRadius | 9999 | radius.pill |
| Navigation Rail Item/Label | fill[0] | #0c0d0e | interactive.neutral.foreground.default |
| Navigation Rail Item/Label | fontSize | 10 | indicator.small |
| Navigation Rail Item/Label | lineHeight | 12 | indicator.small |
| Navigation Rail Item/Label | letterSpacing | 0 | indicator.small |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | Navigation Rail Item | fill[0] | interactive.ghost.background.hover |
| State | selected | Navigation Rail Item/Label | fill[0] | interactive.subtle.foreground.default |
| State | active | Navigation Rail Item | fill[0] | interactive.ghost.background.pressed |
| Disabled | true | Navigation Rail Item/Label | fill[0] | interactive.subtle.foreground.disabled |
| Expanded | true | Navigation Rail Item | itemSpacing | space.lg |
| Expanded | true | Navigation Rail Item | padding.left | space.lg |
| Expanded | true | Navigation Rail Item | padding.right | space.lg |
| Expanded | true | Navigation Rail Item/Label | fontSize | label.medium |
| Expanded | true | Navigation Rail Item/Label | lineHeight | label.medium |
| Expanded | true | Navigation Rail Item/Label | letterSpacing | label.medium |

## Sub Menu Item

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Sub Menu Item (COMPONENT)
  - Sub Menu Item/Icon and Title (FRAME)
    - Sub Menu Item/Icon and Title/Icon (INSTANCE)
    - Sub Menu Item/Icon and Title/Page Title (FRAME)
      - Sub Menu Item/Icon and Title/Page Title/Title (TEXT)
  - Sub Menu Item/Badge (FRAME)
    - Sub Menu Item/Badge/Notification Indicator (INSTANCE)
  - Sub Menu Item/Trailing Slot (FRAME)
    - Sub Menu Item/Trailing Slot/Caret Indicator (INSTANCE)

### Resolved tokens (default variant: State=hover, Disabled=false, Nested=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Sub Menu Item | fill[0] | #0c0d0e0d | interactive.ghost.background.hover |
| Sub Menu Item | cornerRadius | 4 | radius.sm |
| Sub Menu Item | itemSpacing | 8 | space.sm |
| Sub Menu Item | padding.left | 12 | space.md |
| Sub Menu Item | padding.right | 12 | space.md |
| Sub Menu Item | padding.top | 4 | space.xs |
| Sub Menu Item | padding.bottom | 4 | space.xs |
| Sub Menu Item/Icon and Title | itemSpacing | 12 | space.md |
| Sub Menu Item/Icon and Title/Page Title | itemSpacing | 8 | space.sm |
| Sub Menu Item/Icon and Title/Page Title/Title | fill[0] | #0c0d0e | foreground.primary |
| Sub Menu Item/Icon and Title/Page Title/Title | fontSize | 14 | label.medium |
| Sub Menu Item/Icon and Title/Page Title/Title | lineHeight | 20 | label.medium |
| Sub Menu Item/Icon and Title/Page Title/Title | letterSpacing | 0 | label.medium |
| Sub Menu Item/Badge | itemSpacing | 10 | — |
| Sub Menu Item/Badge/Notification Indicator | fill[0] | #d70015 | interactive.destructive.background.default |
| Sub Menu Item/Badge/Notification Indicator | stroke[0] | #ffffff | border.inverse |
| Sub Menu Item/Badge/Notification Indicator | cornerRadius | 9999 | radius.pill |
| Sub Menu Item/Trailing Slot | itemSpacing | 10 | — |
| Sub Menu Item/Trailing Slot/Caret Indicator | itemSpacing | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | selected | Sub Menu Item | fill[0] | interactive.ghost.background.selected |
| State | selected | Sub Menu Item/Icon and Title/Page Title/Title | fill[0] | interactive.ghost.foreground.default |
| State | active | Sub Menu Item | fill[0] | interactive.ghost.background.pressed |
| State | active | Sub Menu Item/Icon and Title/Page Title/Title | fill[0] | interactive.neutral.foreground.default |
| Nested | true | Sub Menu Item | padding.left | space.xl |
| Nested | true | Sub Menu Item/Icon and Title/Page Title/Title | fill[0] | foreground.secondary |
| Nested | true | Sub Menu Item/Icon and Title/Page Title/Title | fontSize | indicator.medium |
| Nested | true | Sub Menu Item/Icon and Title/Page Title/Title | lineHeight | indicator.medium |
| Nested | true | Sub Menu Item/Icon and Title/Page Title/Title | letterSpacing | indicator.medium |

## Navigation Header

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Navigation Header (COMPONENT)
  - Navigation Header/Avatar with Title (FRAME)
    - Navigation Header/Avatar with Title/Avatar (INSTANCE)
    - Navigation Header/Avatar with Title/Page Title (FRAME)
      - Navigation Header/Avatar with Title/Page Title/Title (TEXT)
  - Navigation Header/Icon Button (INSTANCE)
  - Navigation Header/Avatar (FRAME)
    - Navigation Header/Avatar/Avatar (INSTANCE)
    - Navigation Header/Avatar/Icon (INSTANCE)
  - Navigation Header/Logo with Title (FRAME)
    - Navigation Header/Logo with Title/Icon (INSTANCE)
    - Navigation Header/Logo with Title/Page Title (FRAME)
      - Navigation Header/Logo with Title/Page Title/Title (TEXT)

### Resolved tokens (default variant: Type=avatar, Expanded=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Navigation Header | itemSpacing | 10 | — |
| Navigation Header/Avatar with Title | itemSpacing | 8 | space.sm |
| Navigation Header/Avatar with Title | padding.left | 4 | space.xs |
| Navigation Header/Avatar with Title | padding.right | 4 | space.xs |
| Navigation Header/Avatar with Title/Page Title | itemSpacing | 8 | space.sm |
| Navigation Header/Avatar with Title/Page Title/Title | fill[0] | #0c0d0e | foreground.primary |
| Navigation Header/Avatar with Title/Page Title/Title | fontSize | 14 | label.medium |
| Navigation Header/Avatar with Title/Page Title/Title | lineHeight | 20 | label.medium |
| Navigation Header/Avatar with Title/Page Title/Title | letterSpacing | 0 | label.medium |
| Navigation Header/Icon Button | fill[0] | #ffffff | interactive.neutral.background.default |
| Navigation Header/Icon Button | stroke[0] | #ced2db | interactive.neutral.border.default |
| Navigation Header/Icon Button | cornerRadius | 0 | radius.none |
| Navigation Header/Icon Button | padding.left | 4 | space.xs |
| Navigation Header/Icon Button | padding.right | 4 | space.xs |
| Navigation Header/Icon Button | padding.top | 4 | space.xs |
| Navigation Header/Icon Button | padding.bottom | 4 | space.xs |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Type | logo | Navigation Header/Logo with Title | itemSpacing | space.sm |
| Type | logo | Navigation Header/Logo with Title | padding.left | space.xs |
| Type | logo | Navigation Header/Logo with Title | padding.right | space.xs |
| Type | logo | Navigation Header/Logo with Title/Page Title | itemSpacing | space.sm |
| Type | logo | Navigation Header/Logo with Title/Page Title/Title | fill[0] | foreground.primary |
| Type | logo | Navigation Header/Logo with Title/Page Title/Title | fontSize | label.medium |
| Type | logo | Navigation Header/Logo with Title/Page Title/Title | lineHeight | label.medium |
| Type | logo | Navigation Header/Logo with Title/Page Title/Title | letterSpacing | label.medium |
| Expanded | false | Navigation Header/Avatar | itemSpacing | space.xl |
| Expanded | false | Navigation Header/Avatar | padding.left | space.xs |
| Expanded | false | Navigation Header/Avatar | padding.right | space.xs |

## Sub Menu Header

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Sub Menu Header (COMPONENT)
  - Sub Menu Header/Icon and Title (FRAME)
    - Sub Menu Header/Icon and Title/Icon (INSTANCE)
    - Sub Menu Header/Icon and Title/Page Title (FRAME)
      - Sub Menu Header/Icon and Title/Page Title/Title (TEXT)
  - Sub Menu Header/Trailing Actions Slot (SLOT)

### Resolved tokens (default variant: Type=default)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Sub Menu Header | stroke[0] | #ced2db | border.default |
| Sub Menu Header | itemSpacing | 10 | — |
| Sub Menu Header | padding.left | 16 | space.lg |
| Sub Menu Header | padding.right | 16 | space.lg |
| Sub Menu Header/Icon and Title | itemSpacing | 12 | space.md |
| Sub Menu Header/Icon and Title/Page Title | itemSpacing | 8 | space.sm |
| Sub Menu Header/Icon and Title/Page Title/Title | fill[0] | #0c0d0e | foreground.primary |
| Sub Menu Header/Icon and Title/Page Title/Title | fontSize | 14 | label.medium |
| Sub Menu Header/Icon and Title/Page Title/Title | lineHeight | 20 | label.medium |
| Sub Menu Header/Icon and Title/Page Title/Title | letterSpacing | 0 | label.medium |
| Sub Menu Header/Trailing Actions Slot | itemSpacing | 4 | space.xs |

## Caret Indicator

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Caret Indicator (COMPONENT)
  - Caret Indicator/Icon (INSTANCE)

### Resolved tokens (default variant: Open=false, Direction=vertical)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Caret Indicator | itemSpacing | 10 | — |

## Collapsible Menu Item

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3182-237&m=dev

### Layer structure

- Collapsible Menu Item (COMPONENT)
  - Collapsible Menu Item/Sub Menu Item (INSTANCE)
  - Collapsible Menu Item/Sub Menu Slot (SLOT)

### Resolved tokens (default variant: Open=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Collapsible Menu Item/Sub Menu Item | cornerRadius | 4 | radius.sm |
| Collapsible Menu Item/Sub Menu Item | itemSpacing | 8 | space.sm |
| Collapsible Menu Item/Sub Menu Item | padding.left | 12 | space.md |
| Collapsible Menu Item/Sub Menu Item | padding.right | 12 | space.md |
| Collapsible Menu Item/Sub Menu Item | padding.top | 4 | space.xs |
| Collapsible Menu Item/Sub Menu Item | padding.bottom | 4 | space.xs |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Open | true | Collapsible Menu Item | cornerRadius | radius.sm |
| Open | true | Collapsible Menu Item/Sub Menu Item | fill[0] | interactive.ghost.background.pressed |
| Open | true | Collapsible Menu Item/Sub Menu Slot | fill[0] | surface.menu |
| Open | true | Collapsible Menu Item/Sub Menu Slot | itemSpacing | space.xs |
| Open | true | Collapsible Menu Item/Sub Menu Slot | padding.left | space.sm |
| Open | true | Collapsible Menu Item/Sub Menu Slot | padding.right | space.sm |
| Open | true | Collapsible Menu Item/Sub Menu Slot | padding.top | space.sm |
| Open | true | Collapsible Menu Item/Sub Menu Slot | padding.bottom | space.sm |
