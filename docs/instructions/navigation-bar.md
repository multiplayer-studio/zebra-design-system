# Navigation Bar

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2835-796&m=dev

## Spacer

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2835-796&m=dev

### Layer structure

- Spacer (COMPONENT)
  - Spacer/Divider (INSTANCE)

### Resolved tokens (default variant: Spacer)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Spacer | itemSpacing | 10 | — |
| Spacer/Divider | cornerRadius | 0 | radius.none |

## Navigation Bar

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2835-796&m=dev

### Layer structure

- Navigation Bar (COMPONENT)
  - Navigation Bar/Slot (SLOT)
  - Navigation Bar/Action Slot (SLOT)
  - Navigation Bar/Right Slot (SLOT)
  - Navigation Bar/Divider Section (FRAME)
    - Navigation Bar/Divider Section/Divider (INSTANCE)

### Resolved tokens (default variant: Shrink Items=true, Spacer=false, Show Divider=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Navigation Bar | stroke[0] | #ced2db | border.default |
| Navigation Bar/Action Slot | itemSpacing | 8 | — |
| Navigation Bar/Action Slot | padding.left | 16 | space.lg |

## Navigation Item

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2835-796&m=dev

### Layer structure

- Navigation Item (COMPONENT)
  - Navigation Item/Indicator (FRAME)
    - Navigation Item/Indicator/Icon (INSTANCE)
    - Navigation Item/Indicator/Notification Indicator (INSTANCE)
  - Navigation Item/Label (TEXT)

### Resolved tokens (default variant: Active=false, Disabled=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Navigation Item | itemSpacing | 8 | space.sm |
| Navigation Item | padding.left | 16 | space.lg |
| Navigation Item | padding.right | 16 | space.lg |
| Navigation Item | padding.top | 8 | space.sm |
| Navigation Item | padding.bottom | 8 | space.sm |
| Navigation Item/Indicator | itemSpacing | 10 | — |
| Navigation Item/Indicator/Notification Indicator | fill[0] | #d70015 | interactive.destructive.background.default |
| Navigation Item/Indicator/Notification Indicator | stroke[0] | #ffffff | border.inverse |
| Navigation Item/Indicator/Notification Indicator | cornerRadius | 9999 | radius.pill |
| Navigation Item/Label | fill[0] | #0c0d0e | foreground.primary |
| Navigation Item/Label | fontSize | 14 | label.medium |
| Navigation Item/Label | lineHeight | 20 | label.medium |
| Navigation Item/Label | letterSpacing | 0 | label.medium |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Active | true | Navigation Item/Label | fill[0] | interactive.subtle.foreground.default |
| Disabled | true | Navigation Item/Label | fill[0] | interactive.subtle.foreground.disabled |
