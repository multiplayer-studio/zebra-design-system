# Component: Carousel

**Figma ID:** `3819:69`
**Source Page:** Carousel

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `indicator`: BOOLEAN (Default: `true`)
- `type`: Enum ["media", "product", "task", "Video"] (Default: `product`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=product`
- **Node:** `type=product` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** 3px
  - *Children:*
    - **Node:** `Track` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/xl)
      - *Children:*
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Product Card` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/xl)
                  - *Children:*
                    - **Node:** `Image` (INSTANCE)
                      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/none)
                      - **Fill:** `var(--color/background/disabled)`
                      - *Children:*
                        - **Node:** `Place Image here` (RECTANGLE)
                        - **Node:** `Loader` (INSTANCE)
                          - *Children:*
                            - **Node:** `Ellipse 175` (ELLIPSE)
                    - **Node:** `Content` (FRAME)
                      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                      - **Sizing:** W: FILL, H: HUG
                      - **Padding:** T:undefinedpx B:var(--spacing/medium) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/medium)
                      - *Children:*
                        - **Node:** `Text Content` (FRAME)
                          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/small)
                          - *Children:*
                            - **Node:** `Title Container` (FRAME)
                              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                              - **Sizing:** W: FILL, H: HUG
                              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                              - **Gap:** 10px
                              - *Children:*
                                - **Node:** `Product title` (TEXT)
                                  - **Fill:** `var(--color/foreground/primary)`
                            - **Node:** `The Pegasus 40 is built for everyday road running with soft yet responsive cushioning.` (TEXT)
                              - **Fill:** `var(--color/foreground/secondary)`
                        - **Node:** `Cost` (TEXT)
                          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Product Card` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/xl)
                  - *Children:*
                    - **Node:** `Image` (INSTANCE)
                      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/none)
                      - **Fill:** `var(--color/background/disabled)`
                      - *Children:*
                        - **Node:** `Place Image here` (RECTANGLE)
                        - **Node:** `Loader` (INSTANCE)
                          - *Children:*
                            - **Node:** `Ellipse 175` (ELLIPSE)
                    - **Node:** `Content` (FRAME)
                      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                      - **Sizing:** W: FILL, H: HUG
                      - **Padding:** T:undefinedpx B:var(--spacing/medium) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/medium)
                      - *Children:*
                        - **Node:** `Text Content` (FRAME)
                          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/small)
                          - *Children:*
                            - **Node:** `Title Container` (FRAME)
                              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                              - **Sizing:** W: FILL, H: HUG
                              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                              - **Gap:** 10px
                              - *Children:*
                                - **Node:** `Product title` (TEXT)
                                  - **Fill:** `var(--color/foreground/primary)`
                            - **Node:** `The Pegasus 40 is built for everyday road running with soft yet responsive cushioning.` (TEXT)
                              - **Fill:** `var(--color/foreground/secondary)`
                        - **Node:** `Cost` (TEXT)
                          - **Fill:** `var(--color/foreground/primary)`
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Product Card` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: HUG
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/xl)
                  - *Children:*
                    - **Node:** `Image` (INSTANCE)
                      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/none)
                      - **Fill:** `var(--color/background/disabled)`
                      - *Children:*
                        - **Node:** `Place Image here` (RECTANGLE)
                        - **Node:** `Loader` (INSTANCE)
                          - *Children:*
                            - **Node:** `Ellipse 175` (ELLIPSE)
                    - **Node:** `Content` (FRAME)
                      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                      - **Sizing:** W: FILL, H: HUG
                      - **Padding:** T:undefinedpx B:var(--spacing/medium) L:var(--spacing/none) R:var(--spacing/none)
                      - **Gap:** var(--spacing/medium)
                      - *Children:*
                        - **Node:** `Text Content` (FRAME)
                          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/small)
                          - *Children:*
                            - **Node:** `Title Container` (FRAME)
                              - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                              - **Sizing:** W: FILL, H: HUG
                              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                              - **Gap:** 10px
                              - *Children:*
                                - **Node:** `Product title` (TEXT)
                                  - **Fill:** `var(--color/foreground/primary)`
                            - **Node:** `The Pegasus 40 is built for everyday road running with soft yet responsive cushioning.` (TEXT)
                              - **Fill:** `var(--color/foreground/secondary)`
                        - **Node:** `Cost` (TEXT)
                          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Dot Indicator` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** 4px
      - *Children:*
        - **Node:** `Slot Content` (SLOT)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** 4px
          - *Children:*
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/inverse)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`

#### Variant: `type=media`
- **Node:** `type=media` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** 3px
  - *Children:*
    - **Node:** `Track` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/xl)
      - *Children:*
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/disabled)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/disabled)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/disabled)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
    - **Node:** `Dot Indicator` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** 4px
      - *Children:*
        - **Node:** `Slot Content` (SLOT)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** 4px
          - *Children:*
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/inverse)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`

#### Variant: `type=Video`
- **Node:** `type=Video` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** 3px
  - *Children:*
    - **Node:** `Track` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:var(--spacing/xl) B:var(--spacing/xl) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/xl)
      - *Children:*
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/surface/inverse)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Frame 1` (FRAME)
                      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Play` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Pause` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Frame 1` (FRAME)
                          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** 10px
                          - **Fill:** `var(--color/background/subtle)`
                          - *Children:*
                            - **Node:** `Rectangle 1` (RECTANGLE)
                              - **Fill:** `var(--color/background/gradient/start)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Volume Up` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Open In Full` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/surface/inverse)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Frame 1` (FRAME)
                      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Play` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Pause` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Frame 1` (FRAME)
                          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** 10px
                          - **Fill:** `var(--color/background/subtle)`
                          - *Children:*
                            - **Node:** `Rectangle 1` (RECTANGLE)
                              - **Fill:** `var(--color/background/gradient/start)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Volume Up` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Open In Full` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
        - **Node:** `Card Base` (INSTANCE)
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
                - **Node:** `Image` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
                  - **Sizing:** W: FILL, H: FIXED
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/surface/inverse)`
                  - *Children:*
                    - **Node:** `Place Image here` (RECTANGLE)
                    - **Node:** `Frame 1` (FRAME)
                      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                      - **Sizing:** W: FILL, H: FIXED
                      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/small) R:var(--spacing/small)
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Play` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Pause` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Frame 1` (FRAME)
                          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
                          - **Sizing:** W: FILL, H: HUG
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** 10px
                          - **Fill:** `var(--color/background/subtle)`
                          - *Children:*
                            - **Node:** `Rectangle 1` (RECTANGLE)
                              - **Fill:** `var(--color/background/gradient/start)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Volume Up` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                        - **Node:** `Icon: false` (INSTANCE)
                          - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                          - **Sizing:** W: FIXED, H: FIXED
                          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                          - **Gap:** var(--spacing/none)
                          - *Children:*
                            - **Node:** `Open In Full` (INSTANCE)
                              - *Children:*
                                - **Node:** `Icon: false` (VECTOR)
                                  - **Fill:** `var(--color/foreground/inverse)`
                    - **Node:** `Loader` (INSTANCE)
                      - *Children:*
                        - **Node:** `Ellipse 175` (ELLIPSE)
    - **Node:** `Dot Indicator` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
      - **Gap:** 4px
      - *Children:*
        - **Node:** `Slot Content` (SLOT)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:undefinedpx R:undefinedpx
          - **Gap:** 4px
          - *Children:*
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/inverse)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`
            - **Node:** `Dot` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 1` (ELLIPSE)
                  - **Fill:** `var(--color/background/disabled)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Carousel The Carousel is a horizontally scrollable card track for presenting a collection of related content items as a browsable sequence. It uses Card Base as the card container and supports four predefined content types: product, media, video, and task. Each type pre-populates the card slots with the appropriate content configuration. A Dot Indicator below the track communicates the current scroll position and the total number of cards.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | product | true | The track is pre-populated with Product Card instances, each showing a product image, title, description, and price. |
| type | media | false | The track is pre-populated with Media Card instances displaying image content in a visual-led layout. |
| type | Video | false | The track is pre-populated with Media Card instances configured for video, with a play control overlay on each card. |
| type | task | false | The track is pre-populated with Task Card instances, surfacing status, description, assignee, and due date. |
| dots | Dot Indicator | false | A pagination dot row below the track. Each dot represents one card; the active dot reflects the currently visible card. |
| track | Slot | false | The scrollable horizontal container holding the card instances. Cards are arranged in a row and scroll into view on swipe. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Scroll | The user swipes horizontally to browse through the card set. The track scrolls to snap to each card boundary, keeping one card in focus at a time. |
| Dot sync | The Dot Indicator updates in sync with the scroll position. The active dot always corresponds to the currently visible card in the track. |
| Snap | The track snaps to card boundaries on scroll, preventing the view from resting between two cards and ensuring a card is always fully in focus. |
| Type | The type property determines the content inside each Card Base slot. All cards within a single carousel instance share the same content type. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| cards | Slot | The track slot populated with Card Base instances. Each card slot is pre-configured with content matching the carousel type. |
| dotIndicator | Dot Indicator | A pagination component below the track reflecting the number of cards and highlighting the active scroll position. |
| track | Frame | The horizontal scrollable container that arranges and clips the card instances within the carousel viewport. |



Anatomy

1. **Track The horizontally scrollable container holding the card row. Clips cards outside the visible area and snaps to card boundaries on swipe.**
2. **Card An individual Card Base instance within the track. Its slot is pre-populated with content matching the carousel type property.**
3. **Card content The type-specific content inside each card, which may be a Product Card, Media Card, Video Card, or Task Card.**
4. **Dot Indicator A row of pagination dots positioned below the track, communicating the total number of cards and the active scroll position.**
5. **Active dot The highlighted dot within the Dot Indicator corresponding to the currently visible card.**
6. **Peek A partially visible adjacent card at the edge of the viewport, signalling that more content is available by swiping.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

Each card within the carousel track should be individually focusable and carry a meaningful accessible name. 
The Dot Indicator should communicate pagination state to assistive technology, with each dot labelled with its position, for example "Card 2 of 4". 
Keyboard users should be able to navigate between cards using arrow keys. 
The active dot state should be communicated via aria-current or aria-selected. 
Avoid auto-advancing the carousel without user input, as this disrupts users relying on assistive technology and can cause disorientation.

Redlining & Specs

