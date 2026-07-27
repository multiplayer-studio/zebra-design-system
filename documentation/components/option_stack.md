# Component: Option Stack

**Figma ID:** `3266:646`
**Source Page:** Option Stack

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Slot`: SLOT (Default: `[object Object]`)
- `carousel`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `carousel=false`
- **Node:** `carousel=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Slot` (SLOT)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`

### Variant: `carousel=true`
- **Node:** `carousel=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Icon Button` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Chevron Left` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Badge` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/negative/bold)`
          - *Children:*
            - **Node:** `99+` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Slot` (SLOT)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`
            - **Node:** `Chip` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: HUG, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/inverse)`
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Info` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/inverse)`
                - **Node:** `Content` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Suggested prompt/action` (TEXT)
                      - **Fill:** `var(--color/foreground/inverse)`
    - **Node:** `Icon Button` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Chevron Right` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Badge` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/negative/bold)`
          - *Children:*
            - **Node:** `99+` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`


---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Option Stack The Option Stack is a horizontally scrollable container that groups contextual Chip components into a single row, making them available as quick-access action triggers. Chips within the stack can submit companion prompts, execute long-press contextual commands, or surface utility actions. The carousel property adds leading and trailing navigation icon buttons when the chip set overflows the available width, allowing the user to scroll through additional options without leaving the current context.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| carousel | false | true | Chips are displayed in a static row with no navigation controls. Use when the number of options fits the available width without overflow. |
| carousel | true | true | Leading and trailing navigation icon buttons are added to the chip container, enabling the user to scroll through options that overflow the available width. |
| chips | Slot | false | The inner slot that holds all Chip instances. Accepts any number of chips arranged in a horizontal row. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Carousel | When carousel is true, navigation icon buttons appear on both sides of the container. Tapping a button scrolls the chip set to reveal hidden options in that direction. |
| Overflow | When carousel is false and chips exceed the container width, chips are clipped. Use carousel=true for any chip collection that may overflow the available space. |
| Chip tap | Tapping a chip within the stack fires the chip action, which may submit a companion prompt, execute a contextual command, or trigger a utility feature. |
| Dismissal | The Option Stack does not manage its own visibility. The parent surface, such as a companion overlay or long-press sheet, controls when the stack appears and disappears. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| chips | Slot | The primary content area. Holds any number of Chip instances arranged horizontally within the scrollable container. |
| leadingControl | Icon Button | A left-facing navigation icon button shown when carousel is true. Scrolls the chip set backward. |
| trailingControl | Icon Button | A right-facing navigation icon button shown when carousel is true. Scrolls the chip set forward. |



### Anatomy

1. **Container The horizontal wrapper that clips and positions the chip instances.**
2. **Chip slot The inner slot that holds all Chip components, arranged in a horizontal row within the container.**
3. **Chip An individual action trigger within the stack. Activating a chip fires a companion prompt, contextual command, or utility action.**
4. **Leading control A left-facing icon button that scrolls the chip set backward when carousel is true.**
6. **Trailing control A right-facing icon button that scrolls the chip set forward when carousel is true.**



### How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



### Accessibility and content guidelines

Each Chip within the Option Stack carries role="button" and must have a descriptive accessible label reflecting its action. 
The Option Stack container itself does not carry an interactive role. 
When carousel is true, the leading and trailing navigation icon buttons should carry aria-label values such as "Scroll left" and "Scroll right". 
The full set of chips should be reachable via keyboard navigation. 
Ensure that overflowed chips are accessible to keyboard and assistive technology users even when not currently visible.

Redlining & Specs

