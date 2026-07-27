# Component: Image

**Figma ID:** `3676:18`
**Source Page:** Card

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showImage`: BOOLEAN (Default: `true`)
- `status`: Enum ["default", "loading"] (Default: `default`)
- `rounded`: Enum ["true", "false"] (Default: `true`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `status=default, rounded=true`
- **Node:** `status=default, rounded=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FILL, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/disabled)`
  - *Children:*
    - **Node:** `Place Image here` (RECTANGLE)
    - **Node:** `Loader` (INSTANCE)
      - *Children:*
        - **Node:** `Ellipse 175` (ELLIPSE)

### Variant: `status=loading, rounded=true`
- **Node:** `status=loading, rounded=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/disabled)`
  - *Children:*
    - **Node:** `Place Image here` (RECTANGLE)
    - **Node:** `Rectangle 2` (RECTANGLE)

### Variant: `status=default, rounded=false`
- **Node:** `status=default, rounded=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/disabled)`
  - *Children:*
    - **Node:** `Place Image here` (RECTANGLE)
    - **Node:** `Loader` (INSTANCE)
      - *Children:*
        - **Node:** `Ellipse 175` (ELLIPSE)

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

