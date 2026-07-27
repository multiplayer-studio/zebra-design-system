# Component: Listen

**Figma ID:** `2890:42`
**Source Page:** Acitivity Indicator

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `type`: Enum ["static", "animated"] (Default: `static`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `type=static`
- **Node:** `type=static` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Line 96` (LINE)
    - **Node:** `Line 97` (LINE)
    - **Node:** `Line 98` (LINE)
    - **Node:** `Line 99` (LINE)
    - **Node:** `Line 100` (LINE)
    - **Node:** `Line 101` (LINE)
    - **Node:** `Line 102` (LINE)
    - **Node:** `Line 105` (LINE)
    - **Node:** `Line 103` (LINE)
    - **Node:** `Line 106` (LINE)
    - **Node:** `Line 104` (LINE)
    - **Node:** `Line 107` (LINE)

### Variant: `type=animated`
- **Node:** `type=animated` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `_Listen Animated` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/small)
      - *Children:*
        - **Node:** `Line 96` (LINE)
        - **Node:** `Line 97` (LINE)
        - **Node:** `Line 98` (LINE)
        - **Node:** `Line 99` (LINE)
        - **Node:** `Line 100` (LINE)
        - **Node:** `Line 101` (LINE)
        - **Node:** `Line 102` (LINE)
        - **Node:** `Line 105` (LINE)
        - **Node:** `Line 103` (LINE)
        - **Node:** `Line 106` (LINE)
        - **Node:** `Line 104` (LINE)
        - **Node:** `Line 107` (LINE)


---

