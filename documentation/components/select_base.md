# Component: Select base

**Figma ID:** `2862:211`
**Source Page:** Select

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `leadingIcon`: BOOLEAN (Default: `true`)
- `placeholder`: TEXT (Default: `Select`)
- `filledValue`: TEXT (Default: `Option`)
- `style`: Enum ["subtle", "bold"] (Default: `subtle`)
- `state`: Enum ["default", "hover", "focus", "disabled", "error", "active"] (Default: `default`)
- `selected`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `style=subtle, state=default, selected=false`
- **Node:** `style=subtle, state=default, selected=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `World` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label state` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/minimum) R:var(--spacing/minimum)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Placeholder text` (TEXT)
          - **Fill:** `var(--color/foreground/disabled)`
    - **Node:** `Chevron` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Expand More` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`

### Variant: `style=bold, state=default, selected=false`
- **Node:** `style=bold, state=default, selected=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/small)
  - **Fill:** `var(--color/background/subtle)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `World` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label state` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/minimum) R:var(--spacing/minimum)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Placeholder text` (TEXT)
          - **Fill:** `var(--color/foreground/disabled)`
    - **Node:** `Chevron` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Expand More` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`

### Variant: `style=subtle, state=default, selected=true`
- **Node:** `style=subtle, state=default, selected=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/large) R:var(--spacing/large)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `World` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label state` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/minimum) R:var(--spacing/minimum)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `User text` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Chevron` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Expand More` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

