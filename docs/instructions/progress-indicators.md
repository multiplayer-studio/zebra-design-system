# Progress Indicators

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1344&m=dev

## Progress Bar

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1344&m=dev

### Layer structure

- Progress Bar (COMPONENT)
  - Progress Bar/Details (FRAME)
    - Progress Bar/Details/Label (TEXT)
    - Progress Bar/Details/Right Slot (SLOT)
  - Progress Bar/Indicator Group (FRAME)
    - Progress Bar/Indicator Group/Indicator (RECTANGLE)
    - Progress Bar/Indicator Group/Track (RECTANGLE)
    - Progress Bar/Indicator Group/Rail (RECTANGLE)

### Resolved tokens (default variant: Progress=0%, Shape=rounded, Size=small)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Progress Bar | cornerRadius | 0 | radius.none |
| Progress Bar | itemSpacing | 16 | space.lg |
| Progress Bar/Details | itemSpacing | 10 | — |
| Progress Bar/Details/Label | fill[0] | #545963 | foreground.secondary |
| Progress Bar/Details/Label | fontSize | 14 | label.medium.font size |
| Progress Bar/Details/Label | lineHeight | 20 | label.medium.line height |
| Progress Bar/Details/Label | letterSpacing | 0 | label.medium.letter spacing |
| Progress Bar/Details/Right Slot | itemSpacing | 4 | space.xs |
| Progress Bar/Indicator Group | cornerRadius | 4 | radius.sm |
| Progress Bar/Indicator Group | padding.right | 408 | — |
| Progress Bar/Indicator Group/Indicator | fill[0] | #1f69ff | foreground.link |
| Progress Bar/Indicator Group/Indicator | cornerRadius | 4 | radius.sm |
| Progress Bar/Indicator Group/Track | fill[0] | #e0e3e9 | border.subtle |
| Progress Bar/Indicator Group/Track | cornerRadius | 4 | radius.sm |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Progress | Buffering | Progress Bar/Indicator Group/Rail | fill[0] | surface.subtle |
| Progress | Buffering | Progress Bar/Indicator Group/Rail | cornerRadius | radius.sm |
| Shape | sharp | Progress Bar/Indicator Group/Track | cornerRadius | radius.none |
| Shape | sharp | Progress Bar/Indicator Group/Indicator | cornerRadius | radius.none |
| Size | medium | Progress Bar/Indicator Group | cornerRadius | radius.none |
| Size | medium | Progress Bar/Indicator Group/Indicator | cornerRadius | radius.md |
| Size | medium | Progress Bar/Indicator Group/Track | cornerRadius | radius.md |

## Progress Circle

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1344&m=dev

### Layer structure

- Progress Circle (COMPONENT)
  - Progress Circle/Track (ELLIPSE)
  - Progress Circle/Indicator (ELLIPSE)
  - Progress Circle/_Upload (INSTANCE)

### Resolved tokens (default variant: Size=xxsmall, Rounded=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Progress Circle/Track | stroke[0] | #e0e3e9 | border.subtle |
| Progress Circle/Track | cornerRadius | 0 | radius.none |
| Progress Circle/Track | strokeWeight | 4 | stroke.heavy |
| Progress Circle/Indicator | fill[0] | #1f69ff | foreground.link |
| Progress Circle/Indicator | stroke[0] | #0073e6 | border.info |
| Progress Circle/Indicator | strokeWeight | 4 | stroke.heavy |

## _Upload

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1344&m=dev

### Layer structure

- _Upload (COMPONENT)
  - _Upload/Icon Button (INSTANCE)
  - _Upload/75% (TEXT)

### Resolved tokens (default variant: Stop=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _Upload/Icon Button | width | 36 | control.sm |
| _Upload/Icon Button | height | 36 | control.sm |
| _Upload/Icon Button | fill[0] | #f3f6fa | interactive.neutral.background.hover |
| _Upload/Icon Button | stroke[0] | #ced2db | interactive.neutral.border.default |
| _Upload/Icon Button | cornerRadius | 9999 | radius.pill |
| _Upload/Icon Button | strokeWeight | 0 | stroke.base |
| _Upload/Icon Button | padding.left | 4 | space.xs |
| _Upload/Icon Button | padding.right | 4 | space.xs |
| _Upload/Icon Button | padding.top | 4 | space.xs |
| _Upload/Icon Button | padding.bottom | 4 | space.xs |
| _Upload/75% | fill[0] | #000000 | — |
| _Upload/75% | fontSize | 12 | indicator.medium.font size |
| _Upload/75% | lineHeight | 14 | indicator.medium.line height |
| _Upload/75% | letterSpacing | 0 | indicator.medium.letter spacing |
