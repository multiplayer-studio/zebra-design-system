# Component: Mobile Header

**Figma ID:** `3348:386`
**Source Page:** Mobile header

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Ttile text`: TEXT (Default: `Header `)
- `showTitle`: BOOLEAN (Default: `false`)
- `control`: Enum ["avatar", "settings"] (Default: `avatar`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `control=avatar`
- **Node:** `control=avatar` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/xl)
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
            - **Node:** `Hamburger Menu` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
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
    - **Node:** `Text container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Header` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Icon: false` (INSTANCE)
      - *Children:*
        - **Node:** `Container` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Avatar Photos` (INSTANCE)
              - *Children:*
                - **Node:** `Ellipse 157` (ELLIPSE)
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

#### Variant: `control=settings`
- **Node:** `control=settings` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
  - **Sizing:** W: FIXED, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/large) R:var(--spacing/large)
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
            - **Node:** `Hamburger Menu` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
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
    - **Node:** `Text container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Header` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
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
            - **Node:** `Settings` (INSTANCE)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
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


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Mobile Header The Mobile Header is the fixed top navigation bar for mobile screens within the Zebra Companion experience. It provides a persistent hamburger menu icon button on the leading edge for opening the side navigation, and a contextual control on the trailing edge determined by the control property. The control property switches the trailing slot between a user avatar, shown in authenticated contexts where the profile is accessible, and a settings icon button, shown when application settings are a primary entry point from the header.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| control | avatar | true | Displays the authenticated user avatar in the trailing slot. Use in contexts where the user profile is accessible from the header. |
| control | settings | true | Displays a settings icon button in the trailing slot. Use in contexts where application settings are a primary action from the header. |
| menuButton | Icon Button | true | The hamburger menu icon button on the leading edge. Always present and triggers the side navigation drawer. |
| avatar | Avatar | false | The user profile image displayed when control is set to avatar. |
| settingsBtn | Icon Button | false | The settings icon button displayed when control is set to settings. Navigates to the application settings view. |
| title | Text (optional) | false | An optional central label or brand element placed between the leading and trailing controls. |
| showTitle | Boolean | false | Enables or disables the title. When true, the title prop will be rendered in the center of the header. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Menu | Tapping the hamburger menu icon button opens the side navigation drawer. This button is always present regardless of the control variant. |
| Avatar | When control is set to avatar, tapping the avatar provides access to the user profile or account menu, depending on the implementation context. |
| Settings | When control is set to settings, tapping the settings icon button navigates to the application settings screen. |
| Sticky | The Mobile Header remains fixed at the top of the viewport as the user scrolls, keeping navigation controls persistently accessible. |
| Title Centering | If the header has a title, it should be centered in the middle of the screen, regardless of the space taken up by the side elements. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| menuControl | Icon Button | The hamburger menu icon button on the leading edge of the header. Always visible and opens the side navigation. |
| trailingControl | Avatar or Icon Button | The right-hand control slot. Displays a user avatar when control is set to avatar, or a settings icon button when control is set to settings. |
| title | Text (optional) | An optional central label or brand element placed between the leading and trailing controls. |



Anatomy


| 1. | Header bar The full-width fixed surface at the top of the mobile screen, anchored to the top of the viewport. |
| --- | --- |
| 2. | Menu button The hamburger icon button on the leading edge. Always present and used to open the side navigation drawer. |
|  | Trailing control The right-hand slot displaying either the user avatar or the settings icon button, determined by the control property. |
| 3. | User avatar The user profile image shown in the trailing slot when control is set to avatar. |
| 4. | Settings button The settings icon button shown in the trailing slot when control is set to settings. |
| 5. | Page Title The page title is centre aligned full width text, place it between the menu button and trailing control. |



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

The Mobile Header should use role="banner" at the page level. 
The hamburger menu button must carry aria-label="Open navigation menu" or equivalent. 
When control is set to avatar, the avatar element should carry an aria-label identifying the user, such as the user name or "Profile". 
When control is set to settings, the settings button must carry aria-label="Settings". 
All interactive controls within the header must be keyboard reachable with a clearly visible focus indicator.

Redlining & Specs

