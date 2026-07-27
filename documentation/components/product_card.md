# Component: Product Card

**Figma ID:** `3670:459`
**Source Page:** Card

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `state`: Enum ["default", "loading"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `state=default`
- **Node:** `state=default` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
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

#### Variant: `state=loading`
- **Node:** `state=loading` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: FIXED, H: HUG
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
        - **Node:** `Rectangle 2` (RECTANGLE)
    - **Node:** `Content Loading` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FILL, H: HUG
      - **Padding:** T:undefinedpx B:var(--spacing/medium) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/large)
      - *Children:*
        - **Node:** `Title` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FIXED, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - **Fill:** `var(--color/background/disabled)`
          - *Children:*
        - **Node:** `Paragraph` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/medium)
          - *Children:*
            - **Node:** `Lazy Load Container` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** 10px
              - *Children:*
                - **Node:** `Lazy load 1` (FRAME)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FILL
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/subtle)`
                  - *Children:*
            - **Node:** `Lazy Load Container` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/2xl)
              - **Gap:** 10px
              - *Children:*
                - **Node:** `Lazy load 2` (FRAME)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FILL, H: FILL
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/subtle)`
                  - *Children:*
            - **Node:** `Lazy Load Container` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: FIXED
              - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/none) R:var(--spacing/2xl)
              - **Gap:** 10px
              - *Children:*
                - **Node:** `Lazy load 2` (FRAME)
                  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: undefined)
                  - **Sizing:** W: FIXED, H: FILL
                  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
                  - **Gap:** var(--spacing/none)
                  - **Fill:** `var(--color/background/disabled)`
                  - *Children:*


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Product card Product Card is a predefined content configuration for the Card component, not a standalone component. It provides a ready to use layout for surfacing product information, combining a media element, product title, supporting description, and pricing in a consistent structure.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| state | default | true | The product card renders with all content, including the product image, title, description, and price, at full visibility. |
| state | loading | true | A skeleton animation replaces product content while data is being fetched. Maintains card dimensions to prevent layout shift. |
| media | Slot | true | The product image area at the top of the card. Uses the Media component internally. |
| title | Text | false | The product name displayed prominently below the media area. |
| description | Text | false | Supporting copy beneath the title, such as a brief product tagline or key specification. |
| cost | Text | false | The product price displayed at the base of the content area. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Loading state | When state is loading, skeleton elements replace the media area, title, description, and price simultaneously, keeping the card layout stable during data retrieval. |
| Tap target | The full card surface acts as the tap target and triggers the product detail view. Individual content elements such as the title and image are not separately interactive. |
| Media | The media area within the product card uses the Media component. It inherits rounded and type behavior from that component defaults. |
| Contextual use | Product Card is intended for use inside Companion conversations and product browsing flows. It should not be repurposed as a generic card layout when a simpler Card Base configuration would suffice. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| media | Slot | The product image slot at the head of the card. Populated via the embedded Media component. |
| content | Text + Slot | The body of the card. Contains the product title, description text, and price as fixed structural elements of the Product Card layout. |



Anatomy

1. **Card surface The Card Base container hosting the Product Card content configuration.**
2. **Product media The product image rendered via an embedded Media component at the top of the card.**
3. **Product title The primary text label identifying the product, placed directly below the media area.**
4. **Product description Supporting copy below the title. Used for a brief tagline, category label, or key specification.**
5. **Product price The cost label positioned at the base of the content area.**
6. **Loading skeleton Skeleton elements rendered across all content areas when state is loading.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

Product Card inherits interactive card semantics from Card Base. 
The full card surface is the tap target; apply role="button" or role="link" depending on the navigation pattern. 
The accessible name should reference the product title using aria-labelledby. 
Product images must carry a descriptive alt attribute. 
When state is loading, apply aria-busy="true" to the card container.

Redlining & Specs

