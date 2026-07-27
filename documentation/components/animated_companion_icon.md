# Component: Animated Companion Icon

**Figma ID:** `4205:7014`
**Source Page:** Message

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Property 1`: Enum ["Default", "Variant3"] (Default: `Default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `Property 1=Default`
- **Node:** `Property 1=Default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:1px B:1px L:3px R:3px
  - **Gap:** 10px
  - *Children:*
    - **Node:** `Icon: false` (VECTOR)
      - **Fill:** `var(--color/background/gradient/start)`

#### Variant: `Property 1=Variant3`
- **Node:** `Property 1=Variant3` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:1px B:1px L:3px R:3px
  - **Gap:** 10px
  - *Children:*
    - **Node:** `Icon: false` (VECTOR)
      - **Fill:** `var(--color/background/gradient/start)`


---

