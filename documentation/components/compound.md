# Component: Compound

**Figma ID:** `3955:1150`
**Source Page:** List Item

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `subText`: BOOLEAN (Default: `true`)
- `link`: BOOLEAN (Default: `true`)
- `Property 1`: Enum ["Default", "Variant2"] (Default: `Default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `Property 1=Default`
- **Node:** `Property 1=Default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
  - **Gap:** var(--spacing/small)
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
      - **Gap:** var(--spacing/small)
      - *Children:*
        - **Node:** `Frame 1` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Link` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `link to find the form` (TEXT)
              - **Fill:** `var(--color/foreground/brand)`

### Variant: `Property 1=Variant2`
- **Node:** `Property 1=Variant2` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/3xl)
  - **Gap:** var(--spacing/small)
  - *Children:*
    - **Node:** `Vertical` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
      - **Sizing:** W: FILL, H: FILL
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/small)
      - *Children:*
        - **Node:** `Frame 1` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
            - **Node:** `Label` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Link` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `link to find the form` (TEXT)
              - **Fill:** `var(--color/foreground/brand)`


---

