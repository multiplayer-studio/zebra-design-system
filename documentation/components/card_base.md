# Component: Card Base

**Figma ID:** `3676:41`
**Source Page:** Card

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Slot`: SLOT (Default: `[object Object]`)
- `type`: Enum ["outline", "filled"] (Default: `filled`)
- `padded`: Enum ["true", "false"] (Default: `true`)
- `state`: Enum ["Default", "hover", "selected"] (Default: `Default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=filled, padded=true, state=Default`
- **Node:** `type=filled, padded=true, state=Default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/subtle)`
  - *Children:*
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*

#### Variant: `type=outline, padded=true, state=Default`
- **Node:** `type=outline, padded=true, state=Default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/primary)`
  - *Children:*
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*

#### Variant: `type=filled, padded=false, state=Default`
- **Node:** `type=filled, padded=false, state=Default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/surface/subtle)`
  - *Children:*
    - **Node:** `Slot` (SLOT)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

