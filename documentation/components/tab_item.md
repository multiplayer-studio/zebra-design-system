# Component: Tab Item

**Figma ID:** `2902:329`
**Source Page:** Tabs

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showBadge`: BOOLEAN (Default: `true`)
- `leadingIcon`: BOOLEAN (Default: `true`)
- `Label`: TEXT (Default: `Tab Item`)
- `state`: Enum ["default", "active", "hover", "disabled"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `state=default`
- **Node:** `state=default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Tab Content` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: FILL
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/medium)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Sticker` (INSTANCE)
              - *Children:*
                - **Node:** `Union` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Badge` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/negative/bold)`
          - *Children:*
            - **Node:** `99+` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`

#### Variant: `state=active`
- **Node:** `state=active` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Tab Content` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: FILL
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/medium)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Sticker` (INSTANCE)
              - *Children:*
                - **Node:** `Union` (VECTOR)
                  - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Badge` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/negative/bold)`
          - *Children:*
            - **Node:** `99+` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`

#### Variant: `state=hover`
- **Node:** `state=hover` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/medium)
  - **Fill:** `var(--color/background/subtle)`
  - *Children:*
    - **Node:** `Tab Content` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: FILL
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/medium)
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Sticker` (INSTANCE)
              - *Children:*
                - **Node:** `Union` (VECTOR)
                  - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/secondary)`
        - **Node:** `Badge` (INSTANCE)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
          - **Gap:** var(--spacing/medium)
          - **Fill:** `var(--color/status/negative/bold)`
          - *Children:*
            - **Node:** `99+` (TEXT)
              - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

