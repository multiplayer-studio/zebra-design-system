# Component: Button

**Figma ID:** `2004:111`
**Source Page:** Button

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `label`: TEXT (Default: `button`)
- `leadingIcon`: BOOLEAN (Default: `false`)
- `trailingIcon`: BOOLEAN (Default: `false`)
- `type`: Enum ["primary", "gradient", "outlined", "outlinedSubtle", "ghost"] (Default: `primary`)
- `state`: Enum ["default", "hover", "pressed", "focus", "disabled"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=primary, state=default`
- **Node:** `type=primary, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
  - **Gap:** var(--spacing/small)
  - **Fill:** `var(--color/background/brand)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/pure/white)`
    - **Node:** `Label` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/pure/white)`
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/pure/white)`

#### Variant: `type=outlinedSubtle, state=default`
- **Node:** `type=outlinedSubtle, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
  - **Gap:** var(--spacing/small)
  - **Fill:** `var(--color/background/primary)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Label` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/foreground/primary)`
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/primary)`

#### Variant: `type=gradient, state=default`
- **Node:** `type=gradient, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
  - **Gap:** var(--spacing/small)
  - **Fill:** `var(--color/background/gradient/start)`
  - *Children:*
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/pure/white)`
    - **Node:** `Label` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Label` (TEXT)
          - **Fill:** `var(--color/pure/white)`
    - **Node:** `Icon: false` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Love Outline` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/pure/white)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Buttons A clickable element that triggers user-initiated actions  like submitting forms, confirming dialogs, or initiating flows.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | primary | true | The default high-emphasis CTA. Use for the single most important action in a view. |
| type | gradient | false | Reserved for standalone Companion AI entry points. The singular high-emphasis CTA that initiates or surfaces Companion actions. |
| type | outined | false | Used within Companion AI content for contextual actions and triggers e.g. prompting Companion to do something or responding to a Companion suggested action. |
| type | outlinedSubtle | false | For secondary actions or when multiple actions share similar weight. |
| type | ghost | false | Low-emphasis option placed alongside a primary CTA. Suited for modals, dialogs and forms where a secondary choice should not compete visually. |
| state | default | true | The resting state of the button. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual affordance that the button is interactive. |
| state | pressed | false | Active during a click or tap. Confirms the action is being triggered. |
| state | focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |
| state | disabled | false | Prevents interaction. Communicates that the action is unavailable in the current context — not an error state. |
| leadingIcon | true | true | Icon slot is rendered before the label. Use to reinforce the action type or add visual clarity to the button's intent. |
| leadingIcon | false | false | Leading icon slot is hidden. Button renders as label-only. |
| trailingIcon | true | true | Icon slot is rendered after the label. Typically used for directional cues such as a chevron, arrow, or external link indicator. |
| trailingIcon | false | false | Trailing icon slot is hidden. Button renders as label-only. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Transition and Animation | State transitions apply 0.2s ease-in-out to color, background, and border properties. |
| Focus Outline | The focus outline is decorative and non-structural. It does not affect the button's size, spacing, or layout. |
| Full-Width Behavior | When set to full-width, avoid pairing with icons unless the action is a primary "North Star" e.g. Start Companion. |
| Full-width Button Stacking | In dense stacks of full-width buttons, omit icons. Multiple icons create visual noise and reduce label legibility. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Text | The button's text label. Does not wrap, truncates with an ellipsis when text exceeds the available horizontal space. |
| leadingIcon | Icon Component | Accepts only the Icon component only, not glyphs or SVGs. Only the icon name is configurable; size and framing are fixed. Icon color inherits from the button's text color across all states. Slot: 20×20px, no frame, small. |
| trailingIcon | Icon Component | Accepts only the Icon component only, not glyphs or SVGs. Positioned after the label; typically used for directional cues (chevron, arrow, external link). Slot: 20×20px, no frame, small. |



Anatomy

1. **Container Outer boundary defining the tap/click target, padding, background, border, and border-radius.**
2. **Leading icon 20×20px slot before the label.**
3. **Trailing icon 20×20px slot after the label.**
4. **Label Single-line text content. Non-wrapping, truncates with an ellipsis at container width.**
5. **Focus ring Decorative focus indicator: 2px border, 2px offset. Visible on keyboard focus; does not affect layout or spacing.**



Accessibility and content guidelines

Focus visibility: The focus ring must be clearly visible with a minimum 3:1 contrast ratio against adjacent colors and must not be obscured by other elements
Target size: The interactive area must be at least 48×48px to meet touch target requirements
Keyboard: All button actions must be reachable and activatable via keyboard. Tab to focus, Enter or Space to activate
Semantics: Always use a native <button> element or role="button". Never use a <div> or <a> tag without an explicit ARIA role and keyboard handler. 
State: Use default HTML state attribute where possible and use styling to override and maintain visual requirements 
Async / loading state: When a button triggers an asynchronous action, communicate the state change via aria-busy="true" or an aria-live region

Verb-led: Every label must open with a clear action verb: Save changes, Delete, Confirm, Submit, Start. Avoid vague or passive labels like "OK", "Yes", "No", or "Click here".
Concise: Aim for 1–3 words. 4 words is the absolute maximum.
Sentence case: Write in sentence case: "Save changes" not "Save Changes" or "SAVE CHANGES".
Specific: Describe the exact outcome of the action. "Delete account" not "Delete". "Save changes" not "Save". Specificity reduces cognitive load and prevents errors.
No punctuation: Omit periods, exclamation marks, and question marks. Labels are not sentences.
Icon pairing: Icons must reinforce the label's meaning: never contradict or duplicate it. A "Delete" label paired with a trash icon is correct; a "Delete" label paired with a checkmark is not.
Companion AI labels: For gradient and outlined button types (Companion specific), labels must be action oriented and clearly relate to the AI interaction — e.g. "Start Companion", "Ask Companion", "View suggestion", "Try this".
Avoid negative primary CTAs: Do not lead with negative or destructive framing on high-emphasis buttons. "Don't save" or "Cancel" should never occupy the primary CTA position.

