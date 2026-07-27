# Component: Chip

**Figma ID:** `3266:468`
**Source Page:** Chip

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `leadingIcon`: INSTANCE_SWAP (Default: `2655:1690`)
- `ShowLeadingIcon`: BOOLEAN (Default: `true`)
- `text`: TEXT (Default: `Suggested prompt/action`)
- `action`: Enum ["prompt", "companion", "utility"] (Default: `prompt`)
- `state`: Enum ["default", "pressed", "hover", "focus", "disabled"] (Default: `default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `action=prompt, state=default`
- **Node:** `action=prompt, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/subtle)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Info` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Content` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Suggested prompt/action` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`

### Variant: `action=companion, state=default`
- **Node:** `action=companion, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/inverse)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: undefined)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Info` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/inverse)`
    - **Node:** `Content` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Suggested prompt/action` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

### Variant: `action=utility, state=default`
- **Node:** `action=utility, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/xl) R:var(--spacing/4xl)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/inverse)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Info` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/inverse)`
    - **Node:** `Content` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Suggested prompt/action` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Chip Chips in the Zebra Companion system function as action triggers. Activating a chip fires an action, submits a suggested prompt to the Companion, or executing a contextual command. Chips appear in three usage contexts: as prompt suggestions in a Companion conversation, as Companion action picks for AI-driven interactions, and as utility triggers for quick access features. On mobile, a long press on an element can reveal an additional set of chips actions in an overlay.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| action | prompt | true | The default chip style. Used as prompt suggestions in a Companion conversation, presenting the user with contextual options to continue or direct the interaction. Renders with high visual emphasis. |
| action | companion | false | Used for chips tied to Companion AI interactions. Appears on dark overlays, visually connecting the action to the AI context. Revealed on mobile by a long press that surfaces a further set of chip options over a scrim. |
| action | utility | false | Used for quick-access utility actions, typically appearing on dark overlays. Has a lighter visual style suited to secondary or supporting tasks. Applies when an element triggered by a ling press on mobile reveals a set of utility chip actions. |
| state | default | true | The resting state of the chip. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual affordance that the chip is interactive. |
| state | pressed | false | Active during a click or tap. Confirms the interaction is being triggered. |
| state | focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |
| state | disabled | false | Prevents interaction. Communicates that the chip is unavailable in the current context, not an error state. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| State transitions | State changes apply a 0.2s ease-in-out transition to background and border properties, giving interactions a smooth, perceptible response. |
| Focus ring | A visible focus ring is rendered on keyboard or programmatic focus. It is decorative and non-structural: it does not affect the chip's size, spacing, or layout. |
| Action trigger | Chips act as button triggers, not toggles. Activating a chip via tap, click, or keyboard fires an immediate action. On mobile, a long press on an element can surface an overlay containing a secondary set of utility chip options for the user to choose from. |
| Group behavior | Chips are displayed in horizontal scrollable rows or wrap-enabled groups within a conversation or overlay context. In Companion conversations, prompt chips appear as a suggestion row. The wrapping container should communicate group semantics to assistive technologies using role="group" with a descriptive label. |
| Corner radius | Corner radius treatment varies by action type to visually communicate the origin of the chip. Prompt chips carry no radius on the top-right corner, signifying that the content decision comes from the user. Companion chips carry no radius on the bottom-left corner, connecting the chip visually to the Companion commands or actions. Utility chips have a uniform radius on all corners. |
| Text Style | You can customize the text style on the chip's label layer by applying different formatting options such as bold or italics to make the text stand out or convey emphasis. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Text | The chip's visible text. Single-line, does not wrap. Use concise, contextual phrases that clearly state the action or suggestion. Verb-led labels work well for utility and companion action chips; short noun phrases or natural-language questions suit prompt suggestion chips. |
| leadingIcon | Icon Component | Optional icon slot rendered before the label. Accepts only the Icon component, not glyphs or raw SVGs. Size is fixed; only the icon name is configurable. |



### Anatomy

1. **Container Pill-shaped outer boundary that defines the tap or click target, padding, background fill, border, and border-radius. Scales horizontally with label length.**
2. **Label Single-line text content. Non-wrapping; truncates with an ellipsis when it reaches the container width.**
3. **Leading icon Optional 20x20px icon slot positioned before the label. Reinforces chip category or type at a glance.**
4. **Focus ring Decorative focus indicator: 2px border, 2px offset. Visible on keyboard focus; does not affect layout or spacing.**
5. **Corner radius The location of or lack-of the zero radius edge depends on the context of the action (user intent top-right, companion action bottom-left, utility action none)**



### How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



### Accessibility and content guidelines

ARIA roles: All chips use role="button" because they function as triggers, not selection elements. Do not use role="option" or role="listbox" for chips in this system
Keyboard interaction: Space or Enter activates a chip. There is no toggle or selection state to manage with these chip types.
Long press: Long press is a mobile gesture-layer enhancement. 
Focus management: Chips within a row or group should be reachable by Tab. When focus leaves the group, it should move to the next logical focus target in the page order.
Touch targets: The chip container must meet a minimum touch target of 44x44px, inclusive of any invisible padding, even if the visual chip is smaller.
Label copy: Use concise, action-oriented labels. For prompt suggestion chips, favor short noun phrases or natural-language questions. For utility and Companion action chips, favor verb-led labels of one to three words. Avoid sentence punctuation and do not use all-caps in label copy, as capitalization is handled by the component token.

Redlining & Specs

