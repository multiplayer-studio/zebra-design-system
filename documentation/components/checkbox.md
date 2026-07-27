# Component: Checkbox

**Figma ID:** `2175:530`
**Source Page:** Checkboxes

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `label`: Enum ["false", "true"] (Default: `false`)
- `checked`: Enum ["false", "true"] (Default: `false`)
- `indeterminate`: Enum ["false", "true"] (Default: `false`)
- `state`: Enum ["default", "hover", "focus", "disabled", "error"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `label=false, checked=false, indeterminate=false, state=default`
- **Node:** `label=false, checked=false, indeterminate=false, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/minimum) B:var(--spacing/minimum) L:var(--spacing/minimum) R:var(--spacing/minimum)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (FRAME)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/border/bold)`

#### Variant: `label=true, checked=false, indeterminate=false, state=default`
- **Node:** `label=true, checked=false, indeterminate=false, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Checkbox` (INSTANCE)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/minimum) B:var(--spacing/minimum) L:var(--spacing/minimum) R:var(--spacing/minimum)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Container` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
          - **Sizing:** W: HUG, H: HUG
          - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Icon: false` (FRAME)
              - *Children:*
                - **Node:** `Icon: false` (VECTOR)
                  - **Fill:** `var(--color/border/bold)`
    - **Node:** `Label` (TEXT)
      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `label=false, checked=true, indeterminate=false, state=default`
- **Node:** `label=false, checked=true, indeterminate=false, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/minimum) B:var(--spacing/minimum) L:var(--spacing/minimum) R:var(--spacing/minimum)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Container` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/medium) R:var(--spacing/medium)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Icon: false` (FRAME)
          - *Children:*
            - **Node:** `Container` (RECTANGLE)
              - **Fill:** `var(--color/background/brand)`
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Checkbox A binary form control for selecting one or more independent options. Each checkbox operates autonomously, toggling one does not affect others. Supports checked, unchecked, and indeterminate states with an optional text label.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| checked | false | true | Unchecked. The option has not been selected. Default state. |
| checked | true | false | Checked. The option has been explicitly selected by the user. |
| indeterminate | false | false | Parent binary state: No child item checkbox is selected |
| indeterminate | true | false | Partial selection. Used in parent checkboxes when only some child items are selected. Must be set programmatically. |
| state | default | false | Resting state. No interaction has occurred. |
| state | hover | true | Applied on cursor over. Provides visual affordance that the checkbox is interactive. |
| state | focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |
| state | disabled | false | Prevents interaction. Communicates the option is unavailable in the current context, not an error state. |
| state | error | false | Indicates a validation error. Use when a required selection has not been made or a constraint has been violated. |
| label | false | false | No visible text label. An aria-label must be provided for the checkbox to have an accessible name. |
| label | true | true | A visible text label is displayed alongside the checkbox control. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Touch Target | The checkbox has a 48×48px invisible touch/click region overlaid on the visual element. The control may appear smaller visually, but the full 48×48px area is interactive — meeting WCAG 2.5.5 AAA touch target requirements. |
| Transition and Animation | State transitions apply 0.15s ease-in-out to color and border properties. |
| Focus Outline | Decorative and non-structural — does not affect the checkbox's size, spacing, or layout. Applied on keyboard focus only. |
| Indeterminate State | Can only be set programmatically. Cannot be reached by direct user interaction alone — used when a parent checkbox has a subset of its children selected. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Variant | Controls whether a visible text label is rendered alongside the checkbox. When false, an aria-label must be provided for the component to have an accessible name. |
| Check indicator | Visual | The checkmark or dash rendered inside the control. Not directly configurable — appearance is determined by the checked and indeterminate properties. |
| Touch target | Invisible overlay | A 48×48px interaction zone that extends beyond the visible checkbox boundary. Ensures touch target compliance without affecting the visual layout. |



Anatomy

1. **Touch target The invisible 48×48px interaction region that extends beyond the visual checkbox. Non-visual; ensures the component meets WCAG 2.5.5 AAA touch target requirements.**
2. **Control The visual checkbox container (20×20px). Displays the checked, unchecked, or indeterminate state via fill, border, and icon.**
3. **Check indicator The checkmark or dash rendered inside the control when checked or indeterminate. Appearance is driven by the checked and indeterminate properties.**
4. **Label Optional text rendered alongside the control. Toggled via the label property. Associates with the checkbox via <label for> or aria-labelledby.**
5. **Focus ring Decorative focus indicator: 2px border, 2px offset. Visible on keyboard focus; does not affect layout or spacing.**



Accessibility and content guidelines

Touch target: The 48×48px invisible touch region must be preserved in implementation. Do not reduce the interactive area to match the visual size.
Focus visibility: Focus ring must be clearly visible with a minimum 3:1 contrast ratio against adjacent colors and must not be obscured by other elements. 
Keyboard: Tab to focus, Space to toggle the checked state. (WCAG 2.1.1 A)
Semantics: Use a native <input type="checkbox"> wherever possible. If a custom element is required, it must have role="checkbox", aria-checked, and full keyboard handling.
Checked state: Reflect state accurately via aria-checked="true" (checked), aria-checked="false" (unchecked), or aria-checked="mixed" (indeterminate).
Disabled state: Use aria-disabled="true" rather than the HTML disabled attribute where possible to maintain the element in the tab order and keep it reachable by screen readers.
Label association: Always associate the visible label with the checkbox via <label for=""> or aria-labelledby. When label=false, an aria-label is required.

Sentence case: Write labels in sentence case: "Receive notifications" not "Receive Notifications".
Positive framing: Use positive language: "Send me updates" not "Don't send me updates". Negative checkbox labels introduce cognitive load and increase error rates.
Concise: Keep labels to a single line where possible. If more context is needed, use a supporting helper text below the label not within it.
Specific: The label should describe exactly what the checked state means: "Save payment method" not "Payment".
No punctuation: Omit periods at the end of checkbox labels. Labels are not sentences.
Consistent voice: All checkboxes in a group should follow the same grammatical structure either all noun phrases or all verb phrases. Do not mix styles within a group.

