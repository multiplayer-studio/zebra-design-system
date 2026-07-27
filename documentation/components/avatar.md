# Component: Avatar

**Figma ID:** `3895:4119`
**Source Page:** Avatar

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showIcon`: BOOLEAN (Default: `true`)
- `showRing`: BOOLEAN (Default: `true`)
- `size`: Enum ["large", "medium", "small"] (Default: `large`)
- `color`: Enum ["purple", "orange", "green", "violet", "blue", "subtle"] (Default: `purple`)
- `showImage`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `size=large, color=purple, showImage=false`
- **Node:** `size=large, color=purple, showImage=false` (COMPONENT)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/brand)`
      - *Children:*
        - **Node:** `PS` (TEXT)
          - **Fill:** `var(--color/pure/white)`
        - **Node:** `Image` (ELLIPSE)
    - **Node:** `Ring` (FRAME)
      - *Children:*
    - **Node:** `Icon: false` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/primary)`
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - *Children:*
            - **Node:** `Check Circle` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/positive)`

### Variant: `size=medium, color=purple, showImage=false`
- **Node:** `size=medium, color=purple, showImage=false` (COMPONENT)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/brand)`
      - *Children:*
        - **Node:** `PS` (TEXT)
          - **Fill:** `var(--color/pure/white)`
        - **Node:** `Image` (ELLIPSE)
    - **Node:** `Ring` (FRAME)
      - *Children:*
    - **Node:** `Icon: false` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/primary)`
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - *Children:*
            - **Node:** `Check Circle` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/positive)`

### Variant: `size=small, color=purple, showImage=false`
- **Node:** `size=small, color=purple, showImage=false` (COMPONENT)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/brand)`
      - *Children:*
        - **Node:** `PS` (TEXT)
          - **Fill:** `var(--color/pure/white)`
        - **Node:** `Image` (ELLIPSE)
    - **Node:** `Ring` (FRAME)
      - *Children:*
    - **Node:** `Icon: false` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - **Fill:** `var(--color/background/primary)`
      - *Children:*
        - **Node:** `Icon: false` (INSTANCE)
          - *Children:*
            - **Node:** `Check Circle` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/foreground/positive)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Avatar The Avatar is a circular user identity element that represents a person or entity within the Zebra Companion interface. It displays either a profile photo or generated initials on a color-coded background, offering a consistent way to surface user presence across messages, lists, and headers. A status icon badge at the lower-right of the avatar communicates the user's current availability state.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| size | large | true | The largest avatar size. Use in profile headers, user cards, and prominent user identification contexts. |
| size | medium | true | The standard avatar size for most in-context uses, including message threads, list items, and comment rows. |
| size | small | true | The smallest avatar size for compact layouts such as dense lists and metadata rows. |
| showImage | false | false | The avatar displays the user's initials on a color-coded background. Used when no profile photo is available. |
| showImage | true | false | The avatar displays the user's profile photo, clipped to a circle matching the avatar size. |
| color | purple / blue / orange / green / violet / subtle | false | The background color applied when showImage is false. Colors are systematically assigned per user and remain consistent across sessions. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Initials | When showImage is false, the avatar renders the user's initials against a color-coded background. The color is assigned from the available palette and remains consistent for the same user across the interface. |
| Photo | When showImage is true, the user profile photo is rendered inside the circular container, cropped and scaled to fill the avatar bounds. |
| Status badge | The status icon in the lower-right corner communicates the user's presence state. Available values are available, away, busy, onShift, dnd, close, and edit. |
| Ring | An optional ring border is rendered around the avatar container. Use to communicate selection, active state, or emphasis in list and assignment contexts. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| initials | Text | The user initials rendered within the avatar container when showImage is false. Derived from the user's display name. |
| photo | Avatar Photos | The user profile image rendered when showImage is true. |
| statusIcon | Profilt Icons | An optional presence badge at the lower-right of the avatar. Displays the user's current availability or activity state. |



### Anatomy

1. **Container The circular surface that clips the avatar content. Applies the color-coded background for the initials variant.**
2. **Initials The user initials text displayed within the container when showImage is false.**
3. **Photo The user profile image clipped to a circle and scaled to fill the container when showImage is true.**
4. **Ring An optional border ring rendered around the container boundary, used to communicate selection or emphasis.**
5. **Status icon A small badge at the lower-right of the avatar communicating the user's current presence or availability state.**



### How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



### Accessibility and content guidelines

The avatar should carry an accessible name identifying the user it represents, provided via aria-label. 
When the avatar is interactive, such as navigating to a profile, apply role="button" or role="link". 
When the avatar is purely decorative and the user's name is already present in the surrounding context, aria-hidden="true" may be applied. 
The status icon should carry an aria-label describing the presence state, for example "Status: Available", so it is communicated to screen readers independently of the visual indicator.

Redlining & Specs

