# Component: Companion Card

**Figma ID:** `3733:2973`
**Source Page:** Card

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Slot`: SLOT (Default: `[object Object]`)
- `label`: TEXT (Default: `Title`)
- `state`: Enum ["Default", "hover", "selected"] (Default: `Default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `state=Default`
- **Node:** `state=Default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/primary)`
  - *Children:*
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/xl) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `AI Companion` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
        - **Node:** `Title` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/status/info/subtle)`
      - *Children:*

### Variant: `state=hover`
- **Node:** `state=hover` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/primary)`
  - *Children:*
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/xl) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `AI Companion` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
        - **Node:** `Title` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/status/info/subtle)`
      - *Children:*

### Variant: `state=selected`
- **Node:** `state=selected` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/primary)`
  - *Children:*
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/xl) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `AI Companion` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
        - **Node:** `Title` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/status/info/subtle)`
      - *Children:*


---

