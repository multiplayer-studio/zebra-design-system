# Component: List Item

**Figma ID:** `3945:601`
**Source Page:** List Item

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `contentType`: INSTANCE_SWAP (Default: `3955:883`)
- `Slot Element`: SLOT (Default: `[object Object]`)
- `state`: Enum ["default", "selected", "disabled", "hover"] (Default: `default`)
- `interactionType`: Enum ["checkbox", "check", "fill"] (Default: `check`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `state=default, interactionType=check`
- **Node:** `state=default, interactionType=check` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/large)
  - *Children:*
    - **Node:** `Simple` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `File Any` (INSTANCE)
                  - *Children:*
                    - **Node:** `File` (FRAME)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Vertical` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
          - **Sizing:** W: FILL, H: FILL
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/small)
          - *Children:*
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Icon: false` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Check Mark` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/brand)`

### Variant: `state=default, interactionType=checkbox`
- **Node:** `state=default, interactionType=checkbox` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/large)
  - **Fill:** `var(--color/background/subtle)`
  - *Children:*
    - **Node:** `Simple` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `File Any` (INSTANCE)
                  - *Children:*
                    - **Node:** `File` (FRAME)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Vertical` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
          - **Sizing:** W: FILL, H: FILL
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/small)
          - *Children:*
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Checkbox` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/minimum) B:var(--spacing/minimum) L:var(--spacing/minimum) R:var(--spacing/minimum)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Container` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Icon: false` (FRAME)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/border/bold)`

### Variant: `state=hover, interactionType=check`
- **Node:** `state=hover, interactionType=check` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/large)
  - *Children:*
    - **Node:** `Simple` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `File Any` (INSTANCE)
                  - *Children:*
                    - **Node:** `File` (FRAME)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Vertical` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
          - **Sizing:** W: FILL, H: FILL
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/small)
          - *Children:*
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Icon: false` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Check Mark` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/brand)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

List Item The List Item is a flexible row-level component used to present structured content within a list. It supports three content types, Simple, File, and Compound, and can be configured with different interaction modes to suit single selection, menu navigation, and multi-select or to-do patterns.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| state | default | true | The resting state of the list item, with no active interaction. |
| state | hover | false | Applied on cursor hover or touch press, indicating the item is interactive. |
| state | selected | false | Applied when the item has been chosen, using a distinct visual treatment to communicate its active selection. |
| state | disabled | false | Renders the item as non-interactive. All interactive controls are suppressed and the item appears dimmed. |
| interactionType | check | false | Single-selection mode. A check mark appears in the trailing position when the item is in the selected state. |
| interactionType | fill | false | Menu-style selection mode. The selected item receives a prominent background fill with no trailing icon. |
| interactionType | checkbox | false | Multi-selection mode. A checkbox is placed in the trailing position, suited to multi-select lists and to-do status. |



Content types


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| contentType | simple | true | A single line of text with an optional leading icon. Suited to label-only list entries. |
| contentType | file | true | A file-type icon alongside a file name and file size. Used for document and attachment lists. |
| contentType | compound | true | A title, supporting description, and optional action link, with or without a leading icon. Use when list items require additional context. |
| leadingIcon | true | false | Adds a leading icon in the leading position of Simple and Compound content types. |
| leadingIcon | false | false | Renders Simple and Compound content without a leading icon. |
| fileType | any / document / sheet / image | false | Specifies the file-type icon displayed within the File content type. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Hover | The hover state activates on cursor hover or touch press. The row surface shifts visually to signal that the item is interactive and can be selected. |
| Check selection | In the check interaction type, selecting an item reveals a check mark in the trailing position. Only one item can be selected at a time within the list. |
| Fill selection | In the fill interaction type, the selected item receives a prominent background fill. This mode is suited to menu-like contexts where the selected item represents a current view or active route. |
| Checkbox selection | In the checkbox interaction type, each item carries a checkbox in the trailing position. Multiple items can be selected simultaneously, making this suitable for multi-select lists and to-do task states. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| content | Slot | The primary content area of the list item. Accepts Simple, File, or Compound content types to suit different information densities. |
| leadingIcon | _List Icon | An optional icon component placed at the leading edge of Simple and Compound content types to reinforce item identity. |
| trailingControl | Check Mark / Checkbox | The optional trailing control. Rendered as a check mark for the check interaction type, or as a checkbox for the checkbox interaction type. Not present in the fill interaction type. |



### Anatomy

1. **Row surface The full-width container that forms the interactive tap target of the list item.**
2. **Content area Holds the active content type: Simple (label), File (file name and size), or Compound (title, description, and action link).**
3. **Leading icon An optional icon placed at the leading edge of the row. Present in Simple and Compound content types when leadingIcon is true.**
4. **Label / title The primary text within the content area. In Simple, this is the sole text. In Compound, this is accompanied by a description and action link.**
5. **Trailing check A check mark icon displayed in the trailing position when interactionType is set to check and the item is in the selected state.**
6. **Trailing checkbox A checkbox control displayed in the trailing position when interactionType is set to checkbox, enabling multi-select and to-do status.**



### How to use

- **Do:** Use the check interaction type for single-selection lists where one item remains active at a time, such as selecting a default option or a preferred setting.
- **Don't:** Don't mix interaction types within the same list. Consistent interaction behaviour ensures users can predict how selection works across the interface.
- **Do:** Use the checkbox interaction type when multiple items need to be selected together, such as bulk actions, filters, or to-do lists.



### Accessibility and content guidelines

The list container should use role="listbox" when items are selectable, or role="list" for non-interactive lists. 
Each list item should use role="option" when interactionType is check or fill, and role="checkbox" when interactionType is checkbox. 
Apply aria-selected="true" to the active item in check and fill modes, and aria-checked="true" to checked items in checkbox mode. 
Use aria-disabled="true" on disabled items to preserve their presence in the accessibility tree while signalling non-interactivity. 
Ensure each item has a meaningful accessible label derived from its visible text content.

Redlining & Specs

