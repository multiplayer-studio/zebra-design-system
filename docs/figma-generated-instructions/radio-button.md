# Radio Button

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3843-2543&m=dev

## Radio Button

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4294-3121&m=dev

### Layer structure

- Radio Button (COMPONENT)
  - Radio Button/Radio Button (FRAME)
    - Radio Button/Radio Button/Radio Button (FRAME)
      - Radio Button/Radio Button/Radio Button/Check (ELLIPSE)
    - Radio Button/Radio Button/Focus (FRAME)
      - Radio Button/Radio Button/Focus/Radio Button (FRAME)
        - Radio Button/Radio Button/Focus/Radio Button/Check (ELLIPSE)
  - Radio Button/Label (TEXT)

### Resolved tokens (default variant: Checked=false, State=enabled, Size=large)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Radio Button | cornerRadius | 0 | radius.none |
| Radio Button/Radio Button | width | 40 | control.target-min |
| Radio Button/Radio Button | height | 40 | control.target-min |
| Radio Button/Radio Button/Radio Button | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Radio Button/Radio Button/Radio Button | stroke[0] | #7a8190 | interactive.selection.border.default |
| Radio Button/Radio Button/Radio Button | cornerRadius | 9999 | radius.pill |
| Radio Button/Radio Button/Radio Button | strokeWeight | 2 | stroke.thick |
| Radio Button/Radio Button/Radio Button | padding.left | 4 | space.xs |
| Radio Button/Radio Button/Radio Button | padding.right | 4 | space.xs |
| Radio Button/Radio Button/Radio Button | padding.top | 4 | space.xs |
| Radio Button/Radio Button/Radio Button | padding.bottom | 4 | space.xs |
| Radio Button/Radio Button/Radio Button/Check | fill[0] | #7a8190 | foreground.tertiary |
| Radio Button/Label | fill[0] | #0c0d0e | foreground.primary |
| Radio Button/Label | fontSize | 16 | body.medium.font size |
| Radio Button/Label | lineHeight | 24 | body.medium.line height |
| Radio Button/Label | letterSpacing | 0 | body.medium.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Checked | true | Radio Button/Radio Button/Radio Button | stroke[0] | interactive.selection.border.pressed |
| Checked | true | Radio Button/Radio Button/Radio Button/Check | fill[0] | interactive.selection.background.pressed |
| State | hover | Radio Button/Radio Button/Radio Button | stroke[0] | interactive.selection.border.hover |
| State | hover | Radio Button/Radio Button/Radio Button/Check | fill[0] | foreground.secondary |
| State | disabled | Radio Button/Radio Button/Radio Button | stroke[0] | interactive.selection.border.disabled |
| State | disabled | Radio Button/Radio Button/Radio Button/Check | fill[0] | interactive.selection.background.disabled |
| State | disabled | Radio Button/Label | fill[0] | foreground.disabled |
| State | focus | Radio Button/Radio Button/Focus | stroke[0] | border.focus |
| State | focus | Radio Button/Radio Button/Focus | cornerRadius | radius.pill |
| State | focus | Radio Button/Radio Button/Focus | strokeWeight | stroke.thick |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | fill[0] | interactive.ghost.background.default |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | stroke[0] | interactive.selection.border.default |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | cornerRadius | radius.pill |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | strokeWeight | stroke.thick |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | padding.left | space.xs |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | padding.right | space.xs |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | padding.top | space.xs |
| State | focus | Radio Button/Radio Button/Focus/Radio Button | padding.bottom | space.xs |
| State | focus | Radio Button/Radio Button/Focus/Radio Button/Check | fill[0] | foreground.tertiary |
| Size | medium | Radio Button/Radio Button/Radio Button | padding.left | space.2xs |
| Size | medium | Radio Button/Radio Button/Radio Button | padding.right | space.2xs |
| Size | medium | Radio Button/Radio Button/Radio Button | padding.top | space.2xs |
| Size | medium | Radio Button/Radio Button/Radio Button | padding.bottom | space.2xs |
