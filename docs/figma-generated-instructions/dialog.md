# Dialog

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2526-316&m=dev

## Dialog

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2896-877&m=dev

### Layer structure

- Dialog (COMPONENT)
  - Dialog/Dialog Header (INSTANCE)
  - Dialog/Dialog Body (FRAME)
    - Dialog/Dialog Body/Content (FRAME)
      - Dialog/Dialog Body/Content/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. (TEXT)
  - Dialog/Dialog Footer (INSTANCE)

### Resolved tokens (default variant: Flavour=default, Shape=round)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Dialog | fill[0] | #ffffff | surface.dialog |
| Dialog | stroke[0] | #ced2db | border.default |
| Dialog | cornerRadius | 6 | radius.element-md |
| Dialog | strokeWeight | 1 | stroke.thin |
| Dialog | padding.left | 12 | space.md |
| Dialog | padding.right | 12 | space.md |
| Dialog | padding.top | 12 | space.md |
| Dialog | padding.bottom | 12 | space.md |
| Dialog/Dialog Header | height | 48 | control.lg |
| Dialog/Dialog Header | cornerRadius | 0 | radius.none |
| Dialog/Dialog Header | itemSpacing | 8 | space.sm |
| Dialog/Dialog Header | padding.left | 12 | space.md |
| Dialog/Dialog Header | padding.right | 12 | space.md |
| Dialog/Dialog Header | padding.top | 12 | space.md |
| Dialog/Dialog Header | padding.bottom | 12 | space.md |
| Dialog/Dialog Body | cornerRadius | 0 | radius.none |
| Dialog/Dialog Body | padding.left | 12 | space.md |
| Dialog/Dialog Body | padding.right | 12 | space.md |
| Dialog/Dialog Body | padding.top | 12 | space.md |
| Dialog/Dialog Body | padding.bottom | 24 | space.section |
| Dialog/Dialog Body/Content/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. | fill[0] | #0c0d0e | foreground.primary |
| Dialog/Dialog Body/Content/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. | fontSize | 16 | body.medium.font size |
| Dialog/Dialog Body/Content/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. | lineHeight | 24 | body.medium.line height |
| Dialog/Dialog Body/Content/Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. | letterSpacing | 0 | body.medium.letter spacing |
| Dialog/Dialog Footer | itemSpacing | 159 | — |
| Dialog/Dialog Footer | padding.left | 12 | space.md |
| Dialog/Dialog Footer | padding.right | 12 | space.md |
| Dialog/Dialog Footer | padding.top | 12 | space.md |
| Dialog/Dialog Footer | padding.bottom | 12 | space.md |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Shape | sharp | Dialog | cornerRadius | radius.none |

## Dialog Header

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2644-3298&m=dev

### Layer structure

- Dialog Header (COMPONENT)
  - Dialog Header/Title (FRAME)
    - Dialog Header/Title/Block (INSTANCE)
    - Dialog Header/Title/Dialog Title (TEXT)
  - Dialog Header/Icon (INSTANCE, icon: Close)

### Resolved tokens (default variant: Dialog Header)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Dialog Header | height | 48 | control.lg |
| Dialog Header | cornerRadius | 0 | radius.none |
| Dialog Header | itemSpacing | 8 | space.sm |
| Dialog Header | padding.left | 12 | space.md |
| Dialog Header | padding.right | 12 | space.md |
| Dialog Header | padding.top | 12 | space.md |
| Dialog Header | padding.bottom | 12 | space.md |
| Dialog Header/Title | itemSpacing | 8 | space.sm |
| Dialog Header/Title/Dialog Title | fill[0] | #0c0d0e | foreground.primary |
| Dialog Header/Title/Dialog Title | fontSize | 20 | title.large.font size |
| Dialog Header/Title/Dialog Title | lineHeight | 24 | title.large.line height |
| Dialog Header/Title/Dialog Title | letterSpacing | 0 | title.large.letter spacing |

## Dialog Footer

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2644-3185&m=dev

### Layer structure

- Dialog Footer (COMPONENT)
  - Dialog Footer/Tertiary (INSTANCE)
  - Dialog Footer/Right Button Group (FRAME)
    - Dialog Footer/Right Button Group/Secondary (INSTANCE)
    - Dialog Footer/Right Button Group/Primary (INSTANCE)
  - Dialog Footer/Secondary (INSTANCE)
  - Dialog Footer/Primary (INSTANCE)
  - Dialog Footer/Left Action (SLOT)
  - Dialog Footer/Right Action (SLOT)

### Resolved tokens (default variant: Actions=3)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Dialog Footer | itemSpacing | 159 | — |
| Dialog Footer | padding.left | 12 | space.md |
| Dialog Footer | padding.right | 12 | space.md |
| Dialog Footer | padding.top | 12 | space.md |
| Dialog Footer | padding.bottom | 12 | space.md |
| Dialog Footer/Tertiary | height | 40 | control.md |
| Dialog Footer/Tertiary | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Dialog Footer/Tertiary | stroke[0] | #1f69ff | interactive.ghost.border.default |
| Dialog Footer/Tertiary | cornerRadius | 4 | radius.element-sm |
| Dialog Footer/Tertiary | strokeWeight | 0 | stroke.base |
| Dialog Footer/Tertiary | padding.left | 12 | space.md |
| Dialog Footer/Tertiary | padding.right | 12 | space.md |
| Dialog Footer/Tertiary | padding.top | 4 | space.xs |
| Dialog Footer/Tertiary | padding.bottom | 4 | space.xs |
| Dialog Footer/Right Button Group | itemSpacing | 8 | space.sm |
| Dialog Footer/Right Button Group/Secondary | height | 40 | control.md |
| Dialog Footer/Right Button Group/Secondary | fill[0] | #0c0d0e00 | interactive.ghost.background.default |
| Dialog Footer/Right Button Group/Secondary | stroke[0] | #545963 | interactive.neutral.border.default |
| Dialog Footer/Right Button Group/Secondary | cornerRadius | 4 | radius.element-sm |
| Dialog Footer/Right Button Group/Secondary | strokeWeight | 1 | stroke.thin |
| Dialog Footer/Right Button Group/Secondary | padding.left | 12 | space.md |
| Dialog Footer/Right Button Group/Secondary | padding.right | 12 | space.md |
| Dialog Footer/Right Button Group/Secondary | padding.top | 4 | space.xs |
| Dialog Footer/Right Button Group/Secondary | padding.bottom | 4 | space.xs |
| Dialog Footer/Right Button Group/Primary | height | 40 | control.md |
| Dialog Footer/Right Button Group/Primary | fill[0] | #1f69ff | interactive.primary.background.default |
| Dialog Footer/Right Button Group/Primary | stroke[0] | #1f69ff | interactive.primary.border.default |
| Dialog Footer/Right Button Group/Primary | cornerRadius | 4 | radius.element-sm |
| Dialog Footer/Right Button Group/Primary | strokeWeight | 0 | stroke.base |
| Dialog Footer/Right Button Group/Primary | padding.left | 12 | space.md |
| Dialog Footer/Right Button Group/Primary | padding.right | 12 | space.md |
| Dialog Footer/Right Button Group/Primary | padding.top | 4 | space.xs |
| Dialog Footer/Right Button Group/Primary | padding.bottom | 4 | space.xs |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Actions | 2 | Dialog Footer | cornerRadius | radius.none |
| Actions | 2 | Dialog Footer | itemSpacing | space.sm |
| Actions | 2 | Dialog Footer/Secondary | height | control.md |
| Actions | 2 | Dialog Footer/Secondary | fill[0] | interactive.ghost.background.default |
| Actions | 2 | Dialog Footer/Secondary | stroke[0] | interactive.neutral.border.default |
| Actions | 2 | Dialog Footer/Secondary | cornerRadius | radius.element-sm |
| Actions | 2 | Dialog Footer/Secondary | strokeWeight | stroke.thin |
| Actions | 2 | Dialog Footer/Secondary | padding.left | space.md |
| Actions | 2 | Dialog Footer/Secondary | padding.right | space.md |
| Actions | 2 | Dialog Footer/Secondary | padding.top | space.xs |
| Actions | 2 | Dialog Footer/Secondary | padding.bottom | space.xs |
| Actions | 2 | Dialog Footer/Primary | height | control.md |
| Actions | 2 | Dialog Footer/Primary | fill[0] | interactive.primary.background.default |
| Actions | 2 | Dialog Footer/Primary | stroke[0] | interactive.primary.border.default |
| Actions | 2 | Dialog Footer/Primary | cornerRadius | radius.element-sm |
| Actions | 2 | Dialog Footer/Primary | strokeWeight | stroke.base |
| Actions | 2 | Dialog Footer/Primary | padding.left | space.md |
| Actions | 2 | Dialog Footer/Primary | padding.right | space.md |
| Actions | 2 | Dialog Footer/Primary | padding.top | space.xs |
| Actions | 2 | Dialog Footer/Primary | padding.bottom | space.xs |
| Actions | 1 | Dialog Footer | cornerRadius | radius.none |
| Actions | 1 | Dialog Footer | itemSpacing | space.sm |
| Actions | 1 | Dialog Footer/Primary | height | control.md |
| Actions | 1 | Dialog Footer/Primary | fill[0] | interactive.primary.background.default |
| Actions | 1 | Dialog Footer/Primary | stroke[0] | interactive.primary.border.default |
| Actions | 1 | Dialog Footer/Primary | cornerRadius | radius.element-sm |
| Actions | 1 | Dialog Footer/Primary | strokeWeight | stroke.base |
| Actions | 1 | Dialog Footer/Primary | padding.left | space.md |
| Actions | 1 | Dialog Footer/Primary | padding.right | space.md |
| Actions | 1 | Dialog Footer/Primary | padding.top | space.xs |
| Actions | 1 | Dialog Footer/Primary | padding.bottom | space.xs |
| Actions | custom | Dialog Footer | cornerRadius | radius.none |
| Actions | custom | Dialog Footer/Left Action | itemSpacing | space.sm |
| Actions | custom | Dialog Footer/Right Action | itemSpacing | space.sm |
