# Component: Simple

**Figma ID:** `3955:1114`
**Source Page:** List Item

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `leadingIcon`: Enum ["true", "false"] (Default: `true`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `leadingIcon=true`
- **Node:** `leadingIcon=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
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
      - **Gap:** 4px
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`

### Variant: `leadingIcon=false`
- **Node:** `leadingIcon=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/3xl)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Vertical` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
      - **Sizing:** W: FILL, H: FILL
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
      - **Gap:** 4px
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`


---

