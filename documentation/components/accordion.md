# Component: Accordion

**Figma ID:** `3495:136`
**Source Page:** Accordion

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Content`: SLOT (Default: `[object Object]`)
- `label`: TEXT (Default: `Accordion label`)
- `open`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `open=false`
- **Node:** `open=false` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Content Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/xl)
      - *Children:*
        - **Node:** `Accordion label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Expand More` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`

### Variant: `open=true`
- **Node:** `open=true` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/xl) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Content Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/xl)
      - *Children:*
        - **Node:** `Accordion label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Expand Less` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`
    - **Node:** `Content` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/medium)
      - *Children:*


---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Accordion The Accordion is a vertically stacked, disclosure-based component used to organize and progressively reveal content within a limited space. It allows users to expand and collapse sections independently or in sequence, making it ideal for grouping related information without overwhelming the interface.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| open | false | true | The resting/collapsed state of the accordion item. |
| open | true | false | The open state, the item expands to reveal its associated content |
| label | single line text | false | Defines the primary heading or title of the accordion item. It provides a concise, context-specific summary of the content contained within the section. |
| content | any | false | The expandable section of the accordion item, hidden when collapsed and shown when open. It can hold text, media, or nested components. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Motion | When the accordion transitions between collapsed and expanded states, the content panel animates smoothly to indicate a change in visibility. This uses a vertical expand/collapse motion with 0.2s ease-out to maintain continuity and reduce abrupt layout shifts. |
| Caret Rotation | The caret (indicator icon) rotates to reflect the current state of the accordion item. It points downward when collapsed and rotates upward when expanded. |
| Cursor Feedback | The cursor changes to a pointer when hovering over interactive regions of the accordion item, signaling that the element is clickable and can be expanded or collapsed. |
| Trigger Region | The entire header area (including label and optional icon/caret) acts as the interactive trigger for toggling the accordion state. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| content | Slot | The primary content area of the accordion item. Accepts any content types to suit different information densities. |
| label | text | Header/title label, describing the associated content. |
| caret icon | icon | A visual state indicator that reflects whether the accordion item is expanded or collapsed. |



### Anatomy

1. **Wrapper The outer wrapper of the accordion item that defines layout, spacing, and boundaries. It contains both the header (trigger region) and the expandable content area.**
2. **Label The primary text element within the header that communicates the purpose of the accordion item. It forms part of the interactive trigger and should remain concise and scannable.**
3. **Caret A directional indicator that reflects the current state of the accordion item. It updates (through rotation) to signal whether the content is collapsed or expanded.**
4. **Slot Content The expandable region that holds the accordion’s content. It supports flexible composition, allowing for simple text, rich media, or nested components, and is revealed or hidden based on the item’s state.**
5. **Visual Divider A structural separator used to distinguish between accordion items in a list. It helps maintain visual hierarchy and rhythm.**



### How to use

- **Do:** Use the check interaction type for single-selection lists where one item remains active at a time, such as selecting a default option or a preferred setting.
- **Don't:** Don't mix interaction types within the same list. Consistent interaction behaviour ensures users can predict how selection works across the interface.
- **Do:** Use the checkbox interaction type when multiple items need to be selected together, such as bulk actions, filters, or to-do lists.



### Accessibility and content guidelines

The accordion container should use role="region" or a semantic container (<div>, <section>) when the structure is purely presentational. Do not assign an ARIA role unless the accordion is part of a composite widget pattern.
Each accordion trigger must reference its content panel using aria-controls="{panel-id}", and each panel must have a matching id attribute.
Each accordion content panel should use role="region" and be associated back to its trigger using aria-labelledby="{button-id}" to ensure proper screen reader context.
Use aria-hidden="true" only when panels are fully collapsed and removed from the accessibility tree, but prefer keeping them accessible and relying on aria-expanded for state management.
Use aria-disabled="true" on accordion headers that are not interactive to indicate non-expandable sections while preserving them in the accessibility tree.
Ensure each accordion header has a meaningful accessible label derived from its visible text content, and avoid redundant screen reader text that repeats panel content.
If multiple accordion items can be expanded simultaneously, ensure each item independently manages its own aria-expanded state without implying exclusivity.

Redlining & Specs

