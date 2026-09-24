# Pagination

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3853-1209&m=dev

## Pagination

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4489-1925&m=dev

### Layer structure

- Pagination (COMPONENT)
  - Pagination/_controls sharp no-outline (INSTANCE)
  - Pagination/Main Slot 1 (SLOT)
  - Pagination/_indicators sharp no-outline (INSTANCE)
  - Pagination/_controls sharp outline (INSTANCE)
  - Pagination/Main Slot2 (SLOT)
  - Pagination/_controls round no-outline (INSTANCE)
  - Pagination/Main Slot 3 (SLOT)
  - Pagination/_indicators round no-outline (INSTANCE)
  - Pagination/_controls round outline (INSTANCE)
  - Pagination/Main Slot 4 (SLOT)
  - Pagination/_indicators round outline (INSTANCE)

### Resolved tokens (default variant: Outline=false, Rounded=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Pagination | itemSpacing | 8 | space.sm |
| Pagination/_controls sharp no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| Pagination/_controls sharp no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| Pagination/_controls sharp no-outline | cornerRadius | 0 | radius.none |
| Pagination/_controls sharp no-outline | strokeWeight | 0 | stroke.base |
| Pagination/_controls sharp no-outline | itemSpacing | 10 | — |
| Pagination/_controls sharp no-outline | padding.left | 10 | — |
| Pagination/_controls sharp no-outline | padding.right | 10 | — |
| Pagination/_controls sharp no-outline | padding.top | 10 | — |
| Pagination/_controls sharp no-outline | padding.bottom | 10 | — |
| Pagination/Main Slot 1 | itemSpacing | 8 | — |
| Pagination/_indicators sharp no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| Pagination/_indicators sharp no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| Pagination/_indicators sharp no-outline | cornerRadius | 0 | radius.none |
| Pagination/_indicators sharp no-outline | strokeWeight | 0 | stroke.base |
| Pagination/_indicators sharp no-outline | itemSpacing | 10 | — |
| Pagination/_indicators sharp no-outline | padding.left | 10 | — |
| Pagination/_indicators sharp no-outline | padding.right | 10 | — |
| Pagination/_indicators sharp no-outline | padding.top | 10 | — |
| Pagination/_indicators sharp no-outline | padding.bottom | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Outline | true | Pagination/_controls sharp outline | fill[0] | interactive.neutral.background.default |
| Outline | true | Pagination/_controls sharp outline | stroke[0] | interactive.neutral.border.default |
| Outline | true | Pagination/_controls sharp outline | cornerRadius | radius.none |
| Outline | true | Pagination/_controls sharp outline | strokeWeight | stroke.thin |
| Outline | true | Pagination/Main Slot2 | itemSpacing | space.sm |
| Rounded | true | Pagination/_controls round no-outline | fill[0] | interactive.neutral.background.default |
| Rounded | true | Pagination/_controls round no-outline | stroke[0] | interactive.neutral.border.default |
| Rounded | true | Pagination/_controls round no-outline | cornerRadius | radius.sm |
| Rounded | true | Pagination/_controls round no-outline | strokeWeight | stroke.base |
| Rounded | true | Pagination/Main Slot 3 | itemSpacing | space.sm |
| Rounded | true | Pagination/_indicators round no-outline | fill[0] | interactive.neutral.background.default |
| Rounded | true | Pagination/_indicators round no-outline | stroke[0] | interactive.neutral.border.default |
| Rounded | true | Pagination/_indicators round no-outline | cornerRadius | radius.sm |
| Rounded | true | Pagination/_indicators round no-outline | strokeWeight | stroke.base |

## _indicators sharp no-outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4485-1775&m=dev

### Layer structure

- _indicators sharp no-outline (COMPONENT)
  - _indicators sharp no-outline/10 (TEXT)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _indicators sharp no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _indicators sharp no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _indicators sharp no-outline | cornerRadius | 0 | radius.none |
| _indicators sharp no-outline | strokeWeight | 0 | stroke.base |
| _indicators sharp no-outline | itemSpacing | 10 | — |
| _indicators sharp no-outline | padding.left | 10 | — |
| _indicators sharp no-outline | padding.right | 10 | — |
| _indicators sharp no-outline | padding.top | 10 | — |
| _indicators sharp no-outline | padding.bottom | 10 | — |
| _indicators sharp no-outline/10 | fill[0] | #0c0d0e | foreground.primary |
| _indicators sharp no-outline/10 | fontSize | 14 | body.small.font size |
| _indicators sharp no-outline/10 | lineHeight | 18 | body.small.line height |
| _indicators sharp no-outline/10 | letterSpacing | 0 | body.small.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | _indicators sharp no-outline | fill[0] | interactive.neutral.background.hover |
| State | selected | _indicators sharp no-outline | fill[0] | interactive.neutral.background.pressed |
| State | selected | _indicators sharp no-outline | fill[1] | interactive.inverse.background.selected |
| State | selected | _indicators sharp no-outline | stroke[0] | interactive.inverse.border.default |
| State | selected | _indicators sharp no-outline/10 | fill[0] | foreground.inverse |
| State | focused | _indicators sharp no-outline | stroke[0] | border.focus |
| State | focused | _indicators sharp no-outline | strokeWeight | stroke.thick |
| State | disabled | _indicators sharp no-outline | fill[0] | interactive.neutral.background.disabled |
| State | disabled | _indicators sharp no-outline | stroke[0] | interactive.neutral.border.disabled |
| State | disabled | _indicators sharp no-outline/10 | fill[0] | foreground.disabled |
| State | pressed | _indicators sharp no-outline | fill[0] | interactive.neutral.background.pressed |

## _indicators sharp outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4485-1801&m=dev

### Layer structure

- _indicators sharp outline (COMPONENT)
  - _indicators sharp outline/10 (TEXT)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _indicators sharp outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _indicators sharp outline | stroke[0] | #ced2db | border.default |
| _indicators sharp outline | cornerRadius | 0 | radius.none |
| _indicators sharp outline | strokeWeight | 1 | stroke.thin |
| _indicators sharp outline | itemSpacing | 10 | — |
| _indicators sharp outline | padding.left | 10 | — |
| _indicators sharp outline | padding.right | 10 | — |
| _indicators sharp outline | padding.top | 10 | — |
| _indicators sharp outline | padding.bottom | 10 | — |
| _indicators sharp outline/10 | fill[0] | #0c0d0e | foreground.primary |
| _indicators sharp outline/10 | fontSize | 14 | body.small.font size |
| _indicators sharp outline/10 | lineHeight | 18 | body.small.line height |
| _indicators sharp outline/10 | letterSpacing | 0 | body.small.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | _indicators sharp outline | fill[0] | interactive.neutral.background.hover |
| State | selected | _indicators sharp outline | fill[0] | interactive.neutral.background.pressed |
| State | selected | _indicators sharp outline | fill[1] | interactive.inverse.background.selected |
| State | selected | _indicators sharp outline/10 | fill[0] | foreground.inverse |
| State | focused | _indicators sharp outline | stroke[0] | border.focus |
| State | focused | _indicators sharp outline | strokeWeight | stroke.thick |
| State | disabled | _indicators sharp outline | fill[0] | interactive.neutral.background.disabled |
| State | disabled | _indicators sharp outline/10 | fill[0] | foreground.disabled |
| State | pressed | _indicators sharp outline | fill[0] | interactive.neutral.background.pressed |

## _indicators round no-outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4489-1815&m=dev

### Layer structure

- _indicators round no-outline (COMPONENT)
  - _indicators round no-outline/10 (TEXT)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _indicators round no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _indicators round no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _indicators round no-outline | cornerRadius | 4 | radius.sm |
| _indicators round no-outline | strokeWeight | 0 | stroke.base |
| _indicators round no-outline | itemSpacing | 10 | — |
| _indicators round no-outline | padding.left | 10 | — |
| _indicators round no-outline | padding.right | 10 | — |
| _indicators round no-outline | padding.top | 10 | — |
| _indicators round no-outline | padding.bottom | 10 | — |
| _indicators round no-outline/10 | fill[0] | #0c0d0e | foreground.primary |
| _indicators round no-outline/10 | fontSize | 14 | body.small.font size |
| _indicators round no-outline/10 | lineHeight | 18 | body.small.line height |
| _indicators round no-outline/10 | letterSpacing | 0 | body.small.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | _indicators round no-outline | fill[0] | interactive.neutral.background.hover |
| State | selected | _indicators round no-outline | fill[0] | interactive.neutral.background.pressed |
| State | selected | _indicators round no-outline | fill[1] | interactive.inverse.background.selected |
| State | selected | _indicators round no-outline | stroke[0] | interactive.inverse.border.default |
| State | selected | _indicators round no-outline/10 | fill[0] | foreground.inverse |
| State | focused | _indicators round no-outline | stroke[0] | border.focus |
| State | focused | _indicators round no-outline | strokeWeight | stroke.thick |
| State | disabled | _indicators round no-outline | fill[0] | interactive.neutral.background.disabled |
| State | disabled | _indicators round no-outline | stroke[0] | interactive.neutral.border.disabled |
| State | disabled | _indicators round no-outline/10 | fill[0] | foreground.disabled |
| State | pressed | _indicators round no-outline | fill[0] | interactive.neutral.background.pressed |

## _indicators round outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4489-1828&m=dev

### Layer structure

- _indicators round outline (COMPONENT)
  - _indicators round outline/10 (TEXT)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _indicators round outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _indicators round outline | stroke[0] | #ced2db | border.default |
| _indicators round outline | cornerRadius | 4 | radius.sm |
| _indicators round outline | strokeWeight | 1 | stroke.thin |
| _indicators round outline | itemSpacing | 10 | — |
| _indicators round outline | padding.left | 10 | — |
| _indicators round outline | padding.right | 10 | — |
| _indicators round outline | padding.top | 10 | — |
| _indicators round outline | padding.bottom | 10 | — |
| _indicators round outline/10 | fill[0] | #0c0d0e | foreground.primary |
| _indicators round outline/10 | fontSize | 14 | body.small.font size |
| _indicators round outline/10 | lineHeight | 18 | body.small.line height |
| _indicators round outline/10 | letterSpacing | 0 | body.small.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | hover | _indicators round outline | fill[0] | interactive.neutral.background.hover |
| State | selected | _indicators round outline | fill[0] | interactive.neutral.background.pressed |
| State | selected | _indicators round outline | fill[1] | interactive.inverse.background.selected |
| State | selected | _indicators round outline/10 | fill[0] | foreground.inverse |
| State | focused | _indicators round outline | stroke[0] | border.focus |
| State | focused | _indicators round outline | strokeWeight | stroke.thick |
| State | disabled | _indicators round outline | fill[0] | interactive.neutral.background.disabled |
| State | disabled | _indicators round outline/10 | fill[0] | foreground.disabled |
| State | pressed | _indicators round outline | fill[0] | interactive.neutral.background.pressed |

## _controls sharp no-outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4484-5928&m=dev

### Layer structure

- _controls sharp no-outline (COMPONENT)
  - _controls sharp no-outline/Icon (INSTANCE, icon: Chevron Left)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _controls sharp no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _controls sharp no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _controls sharp no-outline | cornerRadius | 0 | radius.none |
| _controls sharp no-outline | strokeWeight | 0 | stroke.base |
| _controls sharp no-outline | itemSpacing | 10 | — |
| _controls sharp no-outline | padding.left | 10 | — |
| _controls sharp no-outline | padding.right | 10 | — |
| _controls sharp no-outline | padding.top | 10 | — |
| _controls sharp no-outline | padding.bottom | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | pressed | _controls sharp no-outline | fill[0] | interactive.neutral.background.pressed |
| State | pressed | _controls sharp no-outline | stroke[0] | interactive.neutral.border.pressed |
| State | hover | _controls sharp no-outline | fill[0] | interactive.neutral.background.hover |
| State | focused | _controls sharp no-outline | stroke[0] | border.focus |
| State | focused | _controls sharp no-outline | strokeWeight | stroke.thick |
| State | disabled | _controls sharp no-outline | stroke[0] | interactive.neutral.border.disabled |

## _controls sharp outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4484-5969&m=dev

### Layer structure

- _controls sharp outline (COMPONENT)
  - _controls sharp outline/Icon (INSTANCE, icon: Chevron Left)

### Resolved tokens (default variant: State=enabled, Outline=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _controls sharp outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _controls sharp outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _controls sharp outline | cornerRadius | 0 | radius.none |
| _controls sharp outline | strokeWeight | 1 | stroke.thin |
| _controls sharp outline | itemSpacing | 10 | — |
| _controls sharp outline | padding.left | 10 | — |
| _controls sharp outline | padding.right | 10 | — |
| _controls sharp outline | padding.top | 10 | — |
| _controls sharp outline | padding.bottom | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | pressed | _controls sharp outline | fill[0] | interactive.neutral.background.pressed |
| State | pressed | _controls sharp outline | stroke[0] | interactive.neutral.border.pressed |
| State | hover | _controls sharp outline | fill[0] | interactive.neutral.background.hover |
| State | focused | _controls sharp outline | stroke[0] | border.focus |
| State | focused | _controls sharp outline | strokeWeight | stroke.thick |
| State | disabled | _controls sharp outline | stroke[0] | interactive.neutral.border.disabled |

## _controls round no-outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4485-1647&m=dev

### Layer structure

- _controls round no-outline (COMPONENT)
  - _controls round no-outline/Icon (INSTANCE, icon: Chevron Left)

### Resolved tokens (default variant: State=enabled, Outline=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _controls round no-outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _controls round no-outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _controls round no-outline | cornerRadius | 4 | radius.sm |
| _controls round no-outline | strokeWeight | 0 | stroke.base |
| _controls round no-outline | itemSpacing | 10 | — |
| _controls round no-outline | padding.left | 10 | — |
| _controls round no-outline | padding.right | 10 | — |
| _controls round no-outline | padding.top | 10 | — |
| _controls round no-outline | padding.bottom | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | pressed | _controls round no-outline | fill[0] | interactive.neutral.background.pressed |
| State | pressed | _controls round no-outline | stroke[0] | interactive.neutral.border.pressed |
| State | hover | _controls round no-outline | fill[0] | interactive.neutral.background.hover |
| State | focused | _controls round no-outline | stroke[0] | border.focus |
| State | focused | _controls round no-outline | strokeWeight | stroke.thick |
| State | disabled | _controls round no-outline | stroke[0] | interactive.neutral.border.disabled |

## _controls round outline

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4485-1658&m=dev

### Layer structure

- _controls round outline (COMPONENT)
  - _controls round outline/Icon (INSTANCE, icon: Chevron Left)

### Resolved tokens (default variant: State=enabled, Outline=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _controls round outline | fill[0] | #ffffff | interactive.neutral.background.default |
| _controls round outline | stroke[0] | #ced2db | interactive.neutral.border.default |
| _controls round outline | cornerRadius | 4 | radius.sm |
| _controls round outline | strokeWeight | 1 | stroke.thin |
| _controls round outline | itemSpacing | 10 | — |
| _controls round outline | padding.left | 10 | — |
| _controls round outline | padding.right | 10 | — |
| _controls round outline | padding.top | 10 | — |
| _controls round outline | padding.bottom | 10 | — |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| State | pressed | _controls round outline | fill[0] | interactive.neutral.background.pressed |
| State | pressed | _controls round outline | stroke[0] | interactive.neutral.border.pressed |
| State | hover | _controls round outline | fill[0] | interactive.neutral.background.hover |
| State | focused | _controls round outline | stroke[0] | border.focus |
| State | focused | _controls round outline | strokeWeight | stroke.thick |
| State | disabled | _controls round outline | stroke[0] | interactive.neutral.border.disabled |
