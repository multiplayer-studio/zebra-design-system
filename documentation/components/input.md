# Component: Input

**Figma ID:** `2797:6961`
**Source Page:** Input

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `label`: BOOLEAN (Default: `true`)
- `labelText`: TEXT (Default: `Label`)
- `showHelperText`: BOOLEAN (Default: `true`)
- `helperText`: TEXT (Default: `Helper text`)
- `errorText`: TEXT (Default: `Error message`)
- `error`: Enum ["false", "true"] (Default: `false`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `error=false`
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
        - **Node:** `Input base` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
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
              - **Gap:** var(--spacing/minimum)
              - *Children:*
                - **Node:** `Cursor` (VECTOR)
                - **Node:** `Placeholder text` (TEXT)
                  - **Fill:** `var(--color/foreground/disabled)`
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
    - **Node:** `Helper text container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/small)
      - *Children:*
        - **Node:** `Helper text` (TEXT)
          - **Fill:** `var(--color/foreground/secondary)`

#### Variant: `error=true`
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
        - **Node:** `Input base` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: FILL, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
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
              - **Gap:** var(--spacing/minimum)
              - *Children:*
                - **Node:** `User text` (TEXT)
                  - **Fill:** `var(--color/foreground/disabled)`
                - **Node:** `Cursor` (VECTOR)
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
    - **Node:** `Helper text container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
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

