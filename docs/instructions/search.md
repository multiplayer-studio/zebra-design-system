# Search

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

## Trailing

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

### Layer structure

- Trailing (COMPONENT)
  - Trailing/Cancel-Icon (INSTANCE, icon: Cancel)
  - Trailing/Divider (INSTANCE)
  - Trailing/Trailing-Icon (INSTANCE, icon: Microphone)

### Resolved tokens (default variant: hasIcon=true, hasCancel=true)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Trailing | itemSpacing | 8 | space.sm |
| Trailing/Divider | width | 1 | stroke.thin |
| Trailing/Divider | cornerRadius | 0 | radius.none |

## Search

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2114-8976&m=dev

### Layer structure

- Search (COMPONENT)
  - Search/Search-Icon (INSTANCE, icon: Search)
  - Search/Input Text (FRAME)
    - Search/Input Text/Text (TEXT)
    - Search/Input Text/Cursor (TEXT)
  - Search/Trailing-Icon (INSTANCE, icon: Microphone)
  - Search/Trailing (INSTANCE)

### Resolved tokens (default variant: Shape=sharp, State=enabled, Size=large, Flavour=default)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Search | fill[0] | #ffffff | interactive.neutral.background.default |
| Search | stroke[0] | #ced2db | interactive.neutral.border.default |
| Search | cornerRadius | 0 | radius.none |
| Search | strokeWeight | 1 | stroke.thin |
| Search | itemSpacing | 4 | space.xs |
| Search | padding.left | 12 | space.md |
| Search | padding.right | 12 | space.md |
| Search | padding.top | 8 | space.sm |
| Search | padding.bottom | 8 | space.sm |
| Search/Input Text | itemSpacing | 2 | space.2xs |
| Search/Input Text/Text | fill[0] | #8d95a3 | foreground.disabled |
| Search/Input Text/Text | fontSize | 16 | body.medium.font size |
| Search/Input Text/Text | lineHeight | 24 | body.medium.line height |
| Search/Input Text/Text | letterSpacing | 0 | body.medium.letter spacing |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Shape | rounded | Search | height | control.lg |
| Shape | rounded | Search | cornerRadius | radius.sm |
| Shape | full | Search | height | control.lg |
| Shape | full | Search | cornerRadius | radius.pill |
| State | focus | Search | height | control.lg |
| State | focus | Search | stroke[0] | border.focus |
| State | focus | Search | strokeWeight | stroke.thick |
| State | focus | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | focus | Search/Input Text/Cursor | fontSize | body.medium.font size |
| State | focus | Search/Input Text/Cursor | lineHeight | body.medium.line height |
| State | focus | Search/Input Text/Cursor | letterSpacing | body.medium.letter spacing |
| State | hover | Search | height | control.lg |
| State | hover | Search | stroke[0] | interactive.neutral.border.hover |
| State | selected | Search | height | control.lg |
| State | selected | Search | stroke[0] | border.focus |
| State | selected | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | selected | Search/Input Text/Cursor | fontSize | body.medium.font size |
| State | selected | Search/Input Text/Cursor | lineHeight | body.medium.line height |
| State | selected | Search/Input Text/Cursor | letterSpacing | body.medium.letter spacing |
| State | typing | Search | height | control.lg |
| State | typing | Search | stroke[0] | border.focus |
| State | typing | Search/Input Text/Text | fill[0] | foreground.primary |
| State | typing | Search/Input Text/Cursor | fill[0] | foreground.cursor |
| State | typing | Search/Input Text/Cursor | fontSize | body.medium.font size |
| State | typing | Search/Input Text/Cursor | lineHeight | body.medium.line height |
| State | typing | Search/Input Text/Cursor | letterSpacing | body.medium.letter spacing |
| State | typing | Search/Trailing | itemSpacing | space.sm |
| State | filled | Search | height | control.lg |
| State | filled | Search/Input Text/Text | fill[0] | foreground.primary |
| State | disabled | Search | height | control.lg |
| State | disabled | Search | fill[0] | interactive.neutral.background.disabled |
| State | disabled | Search | stroke[0] | interactive.neutral.border.disabled |
| Size | medium | Search | height | control.md |
| Size | small | Search | height | control.sm |
| Size | small | Search/Input Text/Text | fontSize | body.small.font size |
| Size | small | Search/Input Text/Text | lineHeight | body.small.line height |
| Size | small | Search/Input Text/Text | letterSpacing | body.small.letter spacing |
| Flavour | gradient | Search | height | control.lg |
| Flavour | gradient | Search | stroke[0] | linear-gradient(129deg, foreground.gradient.start 0%, foreground.gradient.end 100%) |
| Flavour | ghost | Search | height | control.lg |
| Flavour | ghost | Search | fill[0] | interactive.ghost.background.default |
| Flavour | ghost | Search | stroke[0] | interactive.ghost.border.default |
| Flavour | ghost | Search | strokeWeight | stroke.base |
