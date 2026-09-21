# Icon

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15004&m=dev

## Icon

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2046-15004&m=dev

### Overview

A single glyph from the shared icon library. Size sets its pixel dimensions, Framed adds an invisible touch-target square, Name picks which glyph to show. Nested inside most other components in this file, from Button to Dropdown

### Property breakdown

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| Size | small | true | 16px, for dense UI like table cells or inline text icons |
| Size | medium | - | 20px, the general-purpose size used inside most components |
| Size | large | - | 28px, for standalone or emphasized icon use |
| Framed | false | true | Icon renders at its natural Size with no extra space around it |
| Framed | true | - | Centers the icon inside an invisible 40px square regardless of Size, useful for consistent touch targets or alignment |
| Name | instance swap | "Verified" (rounded) | The key property. Picks which glyph this Icon shows, swappable to any icon in the shared library. |

### Behavior & Motion Intent

| Type | Description |
| --- | --- |
| Motion | None on its own. Icon is a static graphic, any transition belongs to whatever component embeds it |
| Color changes | When nested inside an interactive component, icon color typically swaps instantly alongside the parent's foreground/text color. |
| Framed toggle | A static layout choice, not an animated transition |

### Content & Slot

| Property | Type | Description |
| --- | --- | --- |
| Name | instance swap, required | Every Icon instance must reference a glyph, there's no empty state. Swap it to any icon in the shared library |
| As a nested slot | rule | When embedded in another component, the parent usually locks Size to match its own scale and doesn't expose Name as a property, swapping the glyph directly on the instance instead |
| Framed | rule | Usually left false when nested inside a component that provides its own padding, true is more common for standalone or bare icon usage |
| Color | inherited | Icon has no exposed color property of its own, it inherits its fill from whatever context or token the embedding component applies |

### Anatomy

- Anatomy
- 1.
- 2.
- 4.
- 3.
- 5.
- Glyph
- The SVG shape itself, swapped via the Name property. Every glyph in the shared library fits the same square canvas
- Bounding box
- Square canvas sized by Size, 16px small, 20px medium, 28px large
- Frame
- An invisible 40px square padding area, added only when Framed is true. No visible background or border
- Color
- Inherited from context, not an exposed property on Icon itself. Confirmed by comparing the same glyph across different parent flavours
- Nested style
- Some individual glyphs, like the default Verified icon, expose their own further Style property. Icon doesn't promote it, editing it means swapping the instance directly

### How to use

**Do:**
- Use Framed when the icon needs a consistent touch target or alignment box, like inside a list row or toolbar
- Pick Size to match the text or component it sits next to, don't eyeball a custom size

**Don't:**
- Rely on Icon's own color, it always inherits from context. Set color where Icon is embedded, not here

### Accessibility and content guidelines

- Icon is purely decorative unless it's the only content in an interactive element, like Icon Button
- When Icon is the sole content of a button or link, the accessible name belongs on that parent, not on the Icon itself
- Don't rely on the glyph name, like Verified, to convey meaning to screen readers

### Layout, Theming Intents

| Property | Type | Description |
| --- | --- | --- |
| Size | Fixed per Size | 16px small, 20px medium, 28px large. No custom sizes |
| Framed box | Fixed | Always exactly 40px square when true, regardless of Size |
| Width and height | Fixed, no hug or fill | Icon never stretches or scales to fill a parent |
| Color | Inherited | No fill token of its own, always takes color from context |
| Responsive | Rule | No breakpoints, only Size changes the layout |

### Layer structure

- Icon (COMPONENT)
  - Icon/Verified (INSTANCE)

### Resolved tokens (default variant: Size=small, Framed=false)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
