# Component: Task Card

**Figma ID:** `3826:2445`
**Source Page:** Card

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showAvatar`: BOOLEAN (Default: `true`)
- `status`: Enum ["default", "loading"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `status=default`
- **Node:** `status=default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/xl)
  - *Children:*
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/large)
      - *Children:*
        - **Node:** `Status` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: FIXED
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/positive/subtle)`
          - *Children:*
            - **Node:** `Tag Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Description` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** 59px
      - *Children:*
        - **Node:** `Frame 1` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** 8px
          - *Children:*
            - **Node:** `Avatar` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
              - **Gap:** var(--spacing/medium)
              - **Fill:** `var(--color/status/default/subtle)`
              - *Children:*
                - **Node:** `Tag Label` (TEXT)
                  - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Frame 1` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FIXED, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/medium)
              - *Children:*
                - **Node:** `Description` (TEXT)
                  - **Fill:** `var(--color/foreground/disabled)`
                - **Node:** `Description` (TEXT)
                  - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Button` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: FIXED
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
          - **Gap:** var(--spacing/small)
          - **Fill:** `var(--color/background/primary)`
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Love Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Label` (TEXT)
                  - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Love Outline` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `status=loading`
- **Node:** `status=loading` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/xl)
  - *Children:*
    - **Node:** `Content Loading` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/large)
      - *Children:*
        - **Node:** `Title` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FIXED, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - **Fill:** `var(--color/background/disabled)`
          - *Children:*
        - **Node:** `Paragraph` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Lazy Load Container` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** 10px
              - *Children:*
                - **Node:** `Lazy load 1` (FRAME)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FILL
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/subtle)`
                  - *Children:*
            - **Node:** `Lazy Load Container` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/2xl)
              - **Gap:** 10px
              - *Children:*
                - **Node:** `Lazy load 2` (FRAME)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FILL
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/subtle)`
                  - *Children:*
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** 59px
      - *Children:*
        - **Node:** `Frame 1` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** 8px
          - *Children:*
            - **Node:** `Title` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** var(--spacing/none)
              - **Fill:** `var(--color/background/disabled)`
              - *Children:*
            - **Node:** `Frame 1` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FIXED, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/medium)
              - *Children:*
                - **Node:** `Lazy Load Container` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** 10px
                  - *Children:*
                    - **Node:** `Lazy load 1` (FRAME)
                      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                      - **Sizing:** W: FILL, H: FILL
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/none)
                      - **Fill:** `var(--color/background/subtle)`
                      - *Children:*
                - **Node:** `Lazy Load Container` (FRAME)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** 10px
                  - *Children:*
                    - **Node:** `Lazy load 1` (FRAME)
                      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                      - **Sizing:** W: FILL, H: FILL
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/none)
                      - **Fill:** `var(--color/background/subtle)`
                      - *Children:*
        - **Node:** `Title` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - **Fill:** `var(--color/background/disabled)`
          - *Children:*


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Task card Task Card is a predefined content configuration for the Card component, not a standalone component. It provides a structured layout for representing an actionable work item or task. Task Card is designed for task management contexts within the Zebra Companion experience and inherits Card Base properties.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| status | default | true | The task card renders with all content, including the status badge, description, assignee, due date, and action button, at full visibility. |
| status | loading | true | A skeleton animation replaces all task content while data is being fetched. Maintains card dimensions to prevent layout shift. |
| statusBadge | Tag | true | A status tag displayed at the top of the card, indicating the current state of the task such as Complete, In Progress, or Overdue. |
| description | Text | false | The primary task label. Should be concise and clearly communicate the nature of the work item. |
| dueDate | Text | false | The task deadline displayed below the assignee avatar. |
| actions | Slot | false | A slot for the primary task action button, such as View Task. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Loading state | When status is loading, skeleton elements replace all card content, including the status badge, description, avatar, due date, and action button, while data is being retrieved. |
| Tap target | The full card surface is interactive and opens the task detail view. The View Task button within the card provides an additional explicit action entry point. |
| Status badge | The status badge inside the card is not interactive. It communicates the task state visually. Avoid repurposing it as an action trigger within the card layout. |
| Companion context | Task Card is designed for task management flows surfaced through the Companion experience. It should not be adapted as a general-purpose card layout. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| statusBadge | Tag | A status tag communicating the current state of the task. Displayed at the top of the card. |
| taskMeta | Text | Contains the task description, assignee avatar, and due date. These are fixed structural elements of the Task Card layout. |
| actions | Slot | A slot for the primary action button at the base of the card, used for task-specific interactions such as View Task. |



Anatomy

1. **Card surface The Card Base container hosting the Task Card content configuration.**
2. **Status badge A Tag component at the top of the card indicating the current task state, such as Complete, In Progress, or Overdue.**
3. **Task description The primary text describing the work item, displayed prominently below the status badge.**
4. **Assignee and due date A metadata row containing the assignee avatar and formatted due date, providing key task context at a glance.**
5. **Action button A primary action button at the base of the card, used for explicit task interactions such as opening the task detail.**
6. **Loading skeleton Skeleton elements covering all content areas when status is loading.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

Task Card inherits interactive card semantics from Card Base. Apply role="button" to the full card surface when it opens the task detail. 
The accessible name should reference the task description using aria-labelledby. 
The status badge communicates task state visually; ensure this information is also available programmatically via an aria-label or aria-describedby on the card container. 
When status is loading, apply aria-busy="true" to the card container. 
The action button within the card should carry its own accessible label.

Redlining & Specs

