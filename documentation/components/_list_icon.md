# Component: _List Icon

**Figma ID:** `3945:842`
**Source Page:** List Item

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `type`: Enum ["default", "fill"] (Default: `default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `type=default`
- **Node:** `type=default` (COMPONENT)
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

### Variant: `type=fill`
- **Node:** `type=fill` (COMPONENT)
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
      - **Fill:** `var(--color/background/subtle)`
      - *Children:*
        - **Node:** `File Any` (INSTANCE)
          - *Children:*
            - **Node:** `File` (FRAME)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`


---

