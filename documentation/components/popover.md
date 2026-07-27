# Component: Popover

**Figma ID:** `3248:366`
**Source Page:** Popover

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Slot Popover Content`: SLOT (Default: `[object Object]`)
- `Slot Popover Content2`: SLOT (Default: `[object Object]`)
- `type`: Enum ["default", "inverse"] (Default: `default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `type=default`
- **Node:** `type=default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** undefinedpx
  - **Fill:** `var(--color/background/overlay)`
  - *Children:*
    - **Node:** `Slot Popover Content` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** undefinedpx
      - *Children:*
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Microphone Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Attachment` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Help Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`

### Variant: `type=inverse`
- **Node:** `type=inverse` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** undefinedpx
  - **Fill:** `var(--color/surface/inverse)`
  - *Children:*
    - **Node:** `Slot Popover Content2` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** undefinedpx
      - *Children:*
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Microphone Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Attachment` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`
        - **Node:** `Menu Item` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Help Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`


---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Popover The Popover is a floating surface that appears contextually above the page, anchored to a trigger element. It acts as a container for Menu Items and other contextual actions. It comes in two visual variants: default for light contexts and inverse for dark overlays or Companion surfaces. The Popover is dismissed by selecting a Menu Item, clicking outside its boundary, or pressing Escape.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | default | true | Action overlay Standard Popover with a light surface is reserved for fundamental actions that support the core user journey. This surface is deployed when the user is in an active composition phase and requires expanded capabilities to supplement their input flow, ensuring high priority tools remain accessible without cluttering the interface. |
| type | inverse | false | Contextual overlay Dark surface variant is used for post-processing or meta actions that exist outside the main action flow. . Use this variant when providing Utilities that allow a user to manipulate or gain deeper insight into existing content or action. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Positioning | The Popover is anchored to its trigger element and repositions automatically to avoid viewport overflow. It opens adjacent to the trigger and adjusts placement when space is constrained. |
| Dismiss | The Popover closes when the user selects a Menu Item, clicks or taps outside the Popover boundary, or presses Escape. Focus returns to the trigger element on close. |
| Animation | The Popover fades in with a short (0.2s) scale-up transition on open and fades out on dismiss, providing a subtle positional cue that anchors the surface to its trigger. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| content | Slot | The primary content slot. Accepts one or more Menu Item instances. Items are stacked vertically and fill the available Popover width. |



### Anatomy

1. **Popover surface The floating container with background fill, corner radius, and drop shadow. Renders above the page content at the appropriate elevation level.**
2. **Content slot The internal area that houses Menu Items. Stacks items vertically and expands to fit the number of items placed inside.**
3. **Menu Item An individual interactive row within the Popover. Triggers an action or navigation when selected.**



### How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



### Accessibility and content guidelines

ARIA: When the Popover contains Menu Items, the container uses role="menu" and each item uses role="menuitem". The trigger element that opens the Popover must carry aria-haspopup="menu" and aria-expanded, updated to reflect the open or closed state.
Focus management: When the Popover opens, focus moves to the first Menu Item, reuse the hover effect as focus in this case. When it closes, focus returns to the trigger element that opened it. Do not leave focus stranded in the background.
Keyboard interaction: Escape closes the Popover and returns focus to the trigger. Arrow Down and Arrow Up navigate between Menu Items. Enter or Space activates the focused item. Tab moves focus outside the Popover without activating an item.
Touch: Tapping outside the Popover boundary dismisses it. Ensure the dismiss tap area covers the full screen behind the Popover, not just the immediate boundary edge.

Redlining & Specs

