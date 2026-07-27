# Component: App Icon

**Figma ID:** `3252:2703`
**Source Page:** Logos

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `style`: Enum ["bold", "subtle"] (Default: `bold`)
- `shape`: Enum ["default", "round"] (Default: `default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `style=bold, shape=default`
- **Node:** `style=bold, shape=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/inverse)`
  - *Children:*
    - **Node:** `Companion Logomark` (INSTANCE)
      - *Children:*
        - **Node:** `Vector` (VECTOR)

### Variant: `style=bold, shape=round`
- **Node:** `style=bold, shape=round` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/inverse)`
  - *Children:*
    - **Node:** `Companion Logomark` (INSTANCE)
      - *Children:*
        - **Node:** `Vector` (VECTOR)

### Variant: `style=subtle, shape=default`
- **Node:** `style=subtle, shape=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/subtle)`
  - *Children:*
    - **Node:** `Companion Logomark` (INSTANCE)
      - *Children:*
        - **Node:** `Vector` (VECTOR)

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

