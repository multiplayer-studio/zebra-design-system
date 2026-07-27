# Component: Message Bubble (Mobile)

**Figma ID:** `2813:258`
**Source Page:** Message

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showFooter`: BOOLEAN (Default: `true`)
- `showContent`: BOOLEAN (Default: `true`)
- `type`: Enum ["companion", "user"] (Default: `user`)
- `state`: Enum ["default", "pressed"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=user, state=default`
- **Node:** `type=user, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: MAX, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/7xl) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Bubble` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/subtle)`
      - *Children:*
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
          - **Gap:** 10px
          - *Children:*
            - **Node:** `I want to book some PTO` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`

#### Variant: `type=user, state=pressed`
- **Node:** `type=user, state=pressed` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: MAX, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/7xl) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Bubble` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/disabled)`
      - *Children:*
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/xl) R:var(--spacing/xl)
          - **Gap:** 10px
          - *Children:*
            - **Node:** `I want to book some PTO` (TEXT)
              - **Fill:** `var(--color/foreground/primary)`

#### Variant: `type=companion, state=default`
- **Node:** `type=companion, state=default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Bubble` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:var(--spacing/7xl)
      - **Gap:** undefinedpx
      - *Children:*
        - **Node:** `Message Status` (INSTANCE)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Icon: false` (INSTANCE)
              - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `AI Companion` (INSTANCE)
                  - *Children:*
                    - **Node:** `Icon: false` (VECTOR)
                      - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `I want to book some PTO` (TEXT)
              - **Fill:** `var(--color/foreground/secondary)`
    - **Node:** `Response Footer` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Line 1` (LINE)
        - **Node:** `Footer Content` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** 10px
          - *Children:*
            - **Node:** `Footer Actions` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** undefinedpx
              - *Children:*
                - **Node:** `Icon Button` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FIXED, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Icon: false` (INSTANCE)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Copy` (INSTANCE)
                          - *Children:*
                            - **Node:** `Icon: false` (VECTOR)
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
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FIXED, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Icon: false` (INSTANCE)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Replay` (INSTANCE)
                          - *Children:*
                            - **Node:** `Icon: false` (VECTOR)
                              - **Fill:** `var(--color/foreground/secondary)`
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FIXED, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Icon: false` (INSTANCE)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `More Horizontal` (INSTANCE)
                          - *Children:*
                            - **Node:** `Icon: false` (VECTOR)
                              - **Fill:** `var(--color/foreground/secondary)`
                - **Node:** `extendActions` (SLOT)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: HUG
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - *Children:*
            - **Node:** `Link` (INSTANCE)
              - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: HUG, H: HUG
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `link to find the form` (TEXT)
                  - **Fill:** `var(--color/foreground/brand)`


---

