# Component: _Pointer

**Figma ID:** `4038:2273`
**Source Page:** Utitlities

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `direction`: Enum ["top", "left", "right", "bottom"] (Default: `top`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `direction=top`
- **Node:** `direction=top` (COMPONENT)
  - *Children:*
    - **Node:** `Line 102` (LINE)
    - **Node:** `Frame 1000007004` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** 10px
      - **Fill:** `var(--color/pure/black)`
      - *Children:*
        - **Node:** `1` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

### Variant: `direction=bottom`
- **Node:** `direction=bottom` (COMPONENT)
  - *Children:*
    - **Node:** `Line 102` (LINE)
    - **Node:** `Frame 1000007004` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** 10px
      - **Fill:** `var(--color/pure/black)`
      - *Children:*
        - **Node:** `1` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

### Variant: `direction=left`
- **Node:** `direction=left` (COMPONENT)
  - *Children:*
    - **Node:** `Line 102` (LINE)
    - **Node:** `Frame 1000007004` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** 10px
      - **Fill:** `var(--color/pure/black)`
      - *Children:*
        - **Node:** `1` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

