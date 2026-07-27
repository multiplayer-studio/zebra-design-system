# Component: Drawer

**Figma ID:** `3644:14`
**Source Page:** Drawer

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Slot Content`: SLOT (Default: `[object Object]`)
- `type`: Enum ["sideDrawer", "bottomSheet"] (Default: `sideDrawer`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=sideDrawer`
- **Node:** `type=sideDrawer` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:var(--spacing/9xl)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Scrim` (INSTANCE)
      - *Children:*
        - **Node:** `Scrim` (RECTANGLE)
          - **Fill:** `var(--color/background/scrim-cool-100)`
    - **Node:** `Overlay` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: FILL
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/surface/primary)`
      - *Children:*
        - **Node:** `Slot Content` (SLOT)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: HUG, H: FILL
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
        - **Node:** `Handle` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: FILL
          - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Bar` (RECTANGLE)
              - **Fill:** `var(--color/border/bold)`

#### Variant: `type=bottomSheet`
- **Node:** `type=bottomSheet` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: MAX)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/9xl) B:undefinedpx L:undefinedpx R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Scrim` (INSTANCE)
      - *Children:*
        - **Node:** `Scrim` (RECTANGLE)
          - **Fill:** `var(--color/background/scrim-cool-100)`
    - **Node:** `Overlay` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/surface/primary)`
      - *Children:*
        - **Node:** `Handle` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Bar` (RECTANGLE)
              - **Fill:** `var(--color/border/bold)`
        - **Node:** `Slot Content` (SLOT)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Drawer The Drawer is a panel overlay component that enters the screen from a directional edge to present supplementary content, navigation, or contextual actions. The type property determines whether the panel slides in from the left as a side drawer or rises from the bottom as a bottom sheet. Both variants include a Scrim to block background interaction, a draggable Handle for dismiss affordance, and an open content slot that accepts any component or layout.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | sideDrawer | true | The panel slides in from the left edge of the screen. Use for navigation menus, filters, or supplementary content anchored to the side of the viewport. |
| type | bottomSheet | true | The panel rises from the bottom edge of the screen. Use for contextual actions, pickers, or additional content surfaced from a bottom trigger. |
| scrim | Scrim | true | A full-screen overlay rendered behind the drawer panel to dim the background and prevent interaction with the content below. |
| handle | Bar | false | A visual indicator at the edge of the panel that communicates drag-to-dismiss affordance to the user. |
| content | Slot | false | The open content slot within the drawer panel. Accepts any layout or component arrangement. |
| animation | Slide | false | Both drawer types enter and exit via a directional slide animation aligned with their respective origin edge. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Open | The drawer slides into view from its origin edge, left for sideDrawer or bottom for bottomSheet, with a directional slide animation. The Scrim fades in simultaneously to block background interaction. |
| Dismiss | The drawer is dismissed by tapping the Scrim, dragging the panel back toward its origin edge, or activating an explicit close control within the content area. |
| Scrim | Tapping the Scrim dismisses the drawer. The Scrim is rendered behind the drawer panel and prevents all interaction with the background content while the drawer is open. |
| Handle | The Handle bar provides a visual drag affordance at the panel edge. Dragging the panel toward its origin edge dismisses it with the slide animation reversed. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| content | Slot | The primary content slot within the drawer panel. Fully open-ended and accepts any layout or component at implementation time. |
| handle | Bar | A fixed visual indicator at the leading edge of the panel indicating drag-to-dismiss affordance. |
| scrim | Scrim | The full-screen background overlay that dims content and prevents background interaction while the drawer is open. |



Anatomy

1. **Scrim The full-screen overlay rendered behind the drawer panel. Dims the background and blocks all interaction with the content below.**
2. **Drawer panel The surface container that slides into view. Hosts the handle and the open content slot.**
3. **Handle A bar at the edge of the panel providing a visual cue for drag-to-dismiss interaction.**
4. **Content slot The open slot within the drawer panel, populated at implementation time with any content or component.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

The drawer container should use role="dialog" with aria-modal="true" to communicate that it is a modal overlay. 
When the drawer opens, focus must move into the panel. 
When dismissed, focus must return to the element that triggered the drawer. 
The Escape key should dismiss the drawer. 
The Scrim is not reachable by keyboard; ensure a keyboard-accessible close control is available within the drawer content. 
The drag handle may be accompanied by a visible button alternative for users who cannot perform drag gestures.

Redlining & Specs

