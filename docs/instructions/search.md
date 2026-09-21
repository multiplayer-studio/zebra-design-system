# Search

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

## Trailing

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

### Layer structure

- Trailing (COMPONENT)
  - Trailing/Cancel-Icon (INSTANCE)
  - Trailing/Divider (INSTANCE)
  - Trailing/Trailing-Icon (INSTANCE)

### Resolved tokens (default variant: hasIcon=true, hasCancel=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Trailing | itemSpacing | 8 | space.sm |
| Trailing/Divider | cornerRadius | 0 | radius.none |

## Search

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

### Layer structure

- Search (COMPONENT)
  - Search/Search-Icon (INSTANCE)
  - Search/Input Text (FRAME)
    - Search/Input Text/Text (TEXT)
    - Search/Input Text/Cursor (TEXT)
  - Search/Trailing-Icon (INSTANCE)
  - Search/Trailing (INSTANCE)

### Resolved tokens (default variant: Shape=sharp, State=enabled, Size=large, Flavour=default)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Search | fill[0] | #ffffff | interactive.neutral.background.default |
| Search | stroke[0] | #ced2db | interactive.neutral.border.default |
| Search | cornerRadius | 0 | radius.none |
| Search | itemSpacing | 4 | space.xs |
| Search | padding.left | 12 | space.md |
| Search | padding.right | 12 | space.md |
| Search | padding.top | 8 | space.sm |
| Search | padding.bottom | 8 | space.sm |
| Search/Input Text | itemSpacing | 2 | space.2xs |
| Search/Input Text/Text | fill[0] | #8d95a3 | foreground.disabled |
| Search/Input Text/Text | fontSize | 16 | body.medium \| label.large |
| Search/Input Text/Text | lineHeight | 24 | body.medium \| label.large |
| Search/Input Text/Text | letterSpacing | 0 | body.medium \| label.large |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Shape | rounded | Search | cornerRadius | radius.sm |
| Shape | full | Search | cornerRadius | radius.pill |
| State | focus | Search | stroke[0] | border.focus |
| State | focus | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | focus | Search/Input Text/Cursor | fontSize | body.medium \| label.large |
| State | focus | Search/Input Text/Cursor | lineHeight | body.medium \| label.large |
| State | focus | Search/Input Text/Cursor | letterSpacing | body.medium \| label.large |
| State | hover | Search | stroke[0] | interactive.neutral.border.hover |
| State | selected | Search | stroke[0] | border.focus |
| State | selected | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | selected | Search/Input Text/Cursor | fontSize | body.medium \| label.large |
| State | selected | Search/Input Text/Cursor | lineHeight | body.medium \| label.large |
| State | selected | Search/Input Text/Cursor | letterSpacing | body.medium \| label.large |
| State | typing | Search | stroke[0] | border.focus |
| State | typing | Search/Input Text/Text | fill[0] | foreground.primary |
| State | typing | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | typing | Search/Input Text/Cursor | fontSize | body.medium \| label.large |
| State | typing | Search/Input Text/Cursor | lineHeight | body.medium \| label.large |
| State | typing | Search/Input Text/Cursor | letterSpacing | body.medium \| label.large |
| State | typing | Search/Trailing | itemSpacing | space.sm |
| State | filled | Search/Input Text/Text | fill[0] | foreground.primary |
| State | disabled | Search | fill[0] | interactive.neutral.background.disabled |
| State | disabled | Search | stroke[0] | interactive.neutral.border.disabled |
| Size | small | Search/Input Text/Text | fontSize | body.small |
| Size | small | Search/Input Text/Text | lineHeight | body.small |
| Size | small | Search/Input Text/Text | letterSpacing | body.small |
| Flavour | ghost | Search | fill[0] | interactive.ghost.background.default |
| Flavour | ghost | Search | stroke[0] | interactive.ghost.border.default |
