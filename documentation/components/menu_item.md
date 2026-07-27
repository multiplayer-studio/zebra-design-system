# Component: Menu Item

**Figma ID:** `3248:24`
**Source Page:** Popover

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Label`: TEXT (Default: `Menu item label`)
- `leadingIcon`: BOOLEAN (Default: `true`)
- `state`: Enum ["hover", "default"] (Default: `default`)
- `type`: Enum ["default", "inverse"] (Default: `default`)
- `companion`: Enum ["false", "true"] (Default: `false`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `state=default, type=default, companion=false`
- **Node:** `state=default, type=default, companion=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Microphone Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label` (TEXT)
      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `state=hover, type=default, companion=false`
- **Node:** `state=hover, type=default, companion=false` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
  - **Gap:** var(--spacing/medium)
  - **Fill:** `var(--color/background/hover)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Microphone Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label` (TEXT)
      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `state=default, type=default, companion=true`
- **Node:** `state=default, type=default, companion=true` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FILL, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/large) R:var(--spacing/7xl)
  - **Gap:** var(--spacing/medium)
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `AI Companion` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
    - **Node:** `Label` (TEXT)
      - **Fill:** `var(--color/foreground/primary)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Menu Item The Menu Item is the individual interactive row used inside a Popover. Each item represents a single action or navigation destination. Menu Items come in two visual types to match their container surface, and a companion variant that visually connects the action to the AI context in the Companion interface.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| state | default | true | Resting state of the menu item. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual feedback that the item is interactive. |
| type | default | true | Standard Menu Item with a light background fill. Use inside default Popovers on light surfaces. |
| type | inverse | false | Dark surface Menu Item variant. Use inside inverse Popovers on dark backgrounds or overlays. |
| companion | false | false | Standard menu item without Companion-specific styling. The item is presented in the default or inverse treatment of its parent Popover. |
| companion | true | true | Companion-styled variant with a distinct visual treatment. Use for actions that are driven by or connected to the AI Companion context. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Activation | Clicking, tapping, or pressing Enter or Space activates the Menu Item and triggers its associated action. The Popover closes immediately after activation unless the action explicitly keeps it open. |
| Hover feedback | The hover state applies a background tint to the item on cursor over. On touch devices, hover is not applied; the pressed visual handles touch feedback instead. |
| Type pairing | A Menu Item must match the type of its parent Popover. Mixing a default item inside an inverse Popover, or vice versa, creates a visual inconsistency. Ensure type is consistent across the Popover and all its items. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Text | The action or destination label. Use concise, verb-led labels that clearly describe the outcome. Single-line; truncates with an ellipsis at the item boundary. |
| leadingIcon | Icon Component | Optional icon slot rendered before the label. Reinforces the action type at a glance. Accepts the Icon component only; size is fixed. |



Anatomy

1. **Item container The full-width interactive area of the Menu Item. Defines the tap target, background fill, padding, and height.**
2. **Leading icon Optional icon rendered before the label. Fixed size; only the icon name is configurable. Use to reinforce the action type or category.**
3. **Label The visible action or destination text. Single-line; truncates with an ellipsis when it reaches the item boundary.**
4. **Companion indicator The distinct visual treatment applied when companion is true. Connects the item to the AI Companion context and differentiates it from standard utility actions.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

ARIA: Each Menu Item uses role="menuitem" inside a role="menu" container. Do not use role="button" or role="option" for items inside a Popover.
Keyboard interaction: Arrow Down moves focus to the next item. Arrow Up moves focus to the previous item. Enter or Space activates the focused item. Tab exits the menu without activating an item. Escape closes the Popover and returns focus to the trigger.
Disabled items: A disabled Menu Item carries aria-disabled="true" and remains in the focus order. It must not respond to activation events. Removing it from the DOM hides it from all users, which may cause confusion if its absence is contextual.
Label copy: Use concise, verb-led labels of one to three words. The label should describe the action outcome clearly. Avoid ambiguous single-word nouns that require surrounding context to interpret.
Touch targets: Each Menu Item must meet a minimum touch target height of 44px. The default item height of 48px satisfies this requirement.

Redlining & Specs

