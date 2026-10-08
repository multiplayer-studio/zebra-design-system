# Checkbox

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4294-3310&m=dev

## Checkbox

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4354-4171&m=dev

### Layer structure

- Checkbox (COMPONENT)
  - Checkbox/Checkbox (FRAME)
    - Checkbox/Checkbox/Checkbox (FRAME)
      - Checkbox/Checkbox/Checkbox/Icon (INSTANCE, icon: Check Mark)
  - Checkbox/Label (TEXT)

### Resolved tokens (default variant: Checked=false, Indeterminate=false, State=enabled, Shape=sharp, Size=large)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Checkbox/Checkbox | width | 40 | control.md |
| Checkbox/Checkbox | height | 40 | control.target-min |
| Checkbox/Checkbox/Checkbox | height | 24 | control.xs |
| Checkbox/Checkbox/Checkbox | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Checkbox/Checkbox/Checkbox | stroke[0] | #7a8190 | interactive.selection.border.default |
| Checkbox/Checkbox/Checkbox | cornerRadius | 0 | radius.none |
| Checkbox/Checkbox/Checkbox | strokeWeight | 2 | stroke.thick |
| Checkbox/Checkbox/Checkbox | padding.left | 2 | space.2xs |
| Checkbox/Checkbox/Checkbox | padding.right | 2 | space.2xs |
| Checkbox/Checkbox/Checkbox | padding.top | 2 | space.2xs |
| Checkbox/Checkbox/Checkbox | padding.bottom | 2 | space.2xs |
| Checkbox/Label | fill[0] | #0c0d0e | foreground.primary |
| Checkbox/Label | fontSize | 16 | body.medium.font size |
| Checkbox/Label | lineHeight | 24 | body.medium.line height |
| Checkbox/Label | letterSpacing | 0 | body.medium.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Checked | true | Checkbox/Checkbox/Checkbox | fill[0] | interactive.selection.background.pressed |
| Checked | true | Checkbox/Checkbox/Checkbox | stroke[0] | interactive.selection.border.pressed |
| Indeterminate | true | Checkbox/Checkbox/Checkbox | fill[0] | interactive.selection.background.pressed |
| Indeterminate | true | Checkbox/Checkbox/Checkbox | stroke[0] | interactive.selection.border.pressed |
| State | hover | Checkbox/Checkbox/Checkbox | stroke[0] | interactive.selection.border.hover |
| State | disabled | Checkbox/Checkbox/Checkbox | fill[0] | interactive.selection.background.disabled |
| State | disabled | Checkbox/Checkbox/Checkbox | stroke[0] | interactive.selection.border.disabled |
| State | disabled | Checkbox/Label | fill[0] | foreground.disabled |
| Shape | rounded | Checkbox/Checkbox/Checkbox | cornerRadius | radius.xs |
