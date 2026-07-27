# Component: Input base

**Figma ID:** `3964:577`
**Source Page:** Text Area

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `placeholder`: TEXT (Default: `Placeholder`)
- `filledValue`: TEXT (Default: `This is a populated input field with a multi line prompt that can span multiple lines, the input field will expand. `)
- `activeFilled`: TEXT (Default: `This is a populated input field with a multi line prompt that can span multiple lines, the input field will expand |`)
- `state`: Enum ["default", "active", "disabled", "error"] (Default: `default`)
- `filled`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `state=default, filled=false`
- **Node:** `state=default, filled=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/minimum)
  - *Children:*
    - **Node:** `Content Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/minimum)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `AI Companion` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
        - **Node:** `Label state` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/minimum) R:var(--spacing/minimum)
          - **Gap:** var(--spacing/minimum)
          - *Children:*
            - **Node:** `Cursor` (VECTOR)
            - **Node:** `Placeholder text` (TEXT)
              - **Fill:** `var(--color/foreground/disabled)`

### Variant: `state=default, filled=true`
- **Node:** `state=default, filled=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Content Container` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Label state` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/minimum) R:var(--spacing/minimum)
          - **Gap:** var(--spacing/minimum)
          - *Children:*
            - **Node:** `User text` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Cursor` (VECTOR)

### Variant: `state=active, filled=false`
- **Node:** `state=active, filled=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/minimum)
  - *Children:*
    - **Node:** `Content Container` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: FIXED
      - **Padding:** T:var(--spacing/large) B:var(--spacing/large) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Label state` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Cursor (Stroke)` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Placeholder text` (TEXT)
              - **Fill:** `var(--color/foreground/disabled)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

