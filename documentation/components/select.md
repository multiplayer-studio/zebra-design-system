# Component: Select

**Figma ID:** `2862:446`
**Source Page:** Select

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `label`: BOOLEAN (Default: `true`)
- `labelText`: TEXT (Default: `Label`)
- `showHelperText`: BOOLEAN (Default: `true`)
- `helperText`: TEXT (Default: `Helper text`)
- `errorText`: TEXT (Default: `Error message`)
- `error`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `error=false`
- **Node:** `error=false` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Field` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/medium)
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Select base` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
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
    - **Node:** `Frame 1` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:undefinedpx R:undefinedpx
      - **Gap:** 10px
      - *Children:*
        - **Node:** `Helper text container` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/small)
          - *Children:*
            - **Node:** `Helper text` (TEXT)
              - **Fill:** `var(--color/foreground/secondary)`

### Variant: `error=true`
- **Node:** `error=true` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Field` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/medium)
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Select base` (INSTANCE)
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
    - **Node:** `Helper text container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/small)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Alert` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/status/negative/bold)`
        - **Node:** `Error message` (TEXT)
          - **Fill:** `var(--color/status/negative/bold)`


---

