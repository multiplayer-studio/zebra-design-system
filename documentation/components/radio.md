# Component: Radio

**Figma ID:** `2162:51`
**Source Page:** Radio

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `label`: Enum ["true", "false"] (Default: `false`)
- `checked`: Enum ["false", "true"] (Default: `false`)
- `state`: Enum ["default", "hover", "focus", "disabled", "error"] (Default: `default`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `label=false, checked=false, state=default`
- **Node:** `label=false, checked=false, state=default` (COMPONENT)
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
            - **Node:** `Ellipse 1` (VECTOR)
              - **Fill:** `var(--color/background/brand)`
            - **Node:** `Ellipse 2 (Stroke)` (VECTOR)
              - **Fill:** `var(--color/border/bold)`

### Variant: `label=true, checked=false, state=default`
- **Node:** `label=true, checked=false, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `Radio` (INSTANCE)
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
                - **Node:** `Ellipse 1` (VECTOR)
                  - **Fill:** `var(--color/background/brand)`
                - **Node:** `Ellipse 2 (Stroke)` (VECTOR)
                  - **Fill:** `var(--color/border/bold)`
    - **Node:** `Label` (TEXT)
      - **Fill:** `var(--color/foreground/primary)`

### Variant: `label=false, checked=true, state=default`
- **Node:** `label=false, checked=true, state=default` (COMPONENT)
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
              - **Fill:** `var(--color/foreground/brand)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Radio A single-select form control used within a group to present mutually exclusive options. Selecting one radio automatically deselects all others in the same group. Supports checked and unchecked states with an optional text label. Features a 48×48px invisible touch target for accessibility, independent of the visual element size.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| checked | false | true | Unselected. No option has been chosen. Default state. |
| checked | true | false | Selected. This option has been chosen; all other radio buttons in the group are automatically deselected. |
| state | default | false | Resting state. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual affordance that the radio is interactive. |
| state | focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |
| state | disabled | true | Prevents interaction. Communicates the option is unavailable in the current context — not an error state. |
| state | error | false | Indicates a validation error. Use when a required selection has not been made. |
| label | false | false | No visible text label. An aria-label must be provided for the radio to have an accessible name. |
| label | true | false | A visible text label is displayed alongside the radio control. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Touch Target | The radio button has a 48×48px invisible touch/click region overlaid on the visual element. The control may appear smaller visually, but the full 48×48px area is interactive — meeting WCAG 2.5.5 AAA touch target requirements. |
| Transition and Animation | State transitions apply 0.15s ease-in-out to color and border properties. |
| Focus Outline | Decorative and non structural, does not affect the radio's size, spacing, or layout. Applied on keyboard focus only. |
| Group Selection | Within a radio group, selecting one option automatically deselects all others. This mutual exclusivity is enforced at the group level never at the individual component level. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Variant | Controls whether a visible text label is rendered alongside the radio control. When false, an aria-label must be provided for the component to have an accessible name. |
| Selected indicator | Visual | The filled dot rendered inside the control when selected. Not configurable, appearance is determined by the checked property. |
| Touch target | Invisible overlay | A 48×48px interaction zone that extends beyond the visible radio boundary. Ensures touch target compliance without affecting the visual layout. |



### Anatomy

1. **Touch target The invisible 48×48px interaction region that extends beyond the visual radio control. Non-visual**
2. **Control The circular visual container (20×20px). Displays the selected or unselected state via fill and border.**
3. **Selected indicator The filled dot rendered inside the control when selected. Appearance is driven by the checked property.**
4. **Label Optional text rendered alongside the control. Toggled via the label property. Associates with the radio via <label for> or aria-labelledby.**
5. **Focus ring Decorative focus indicator: 2px border, 2px offset. Visible on keyboard focus; does not affect layout or spacing.**



### How to use

- **Do:** Use radio buttons when users must select exactly one option from a group. Always present at least two options — a single radio button is never correct.
- **Don't:** Use radio buttons for multi-select scenarios or when no selection is a valid default. If none is valid, consider pre-selecting a sensible default or using checkboxes instead.
- **Do:** Group radio buttons with a clear group label via <fieldset> and <legend> so users understand the options are related and mutually exclusive.



### Accessibility and content guidelines

Focus visibility: Focus ring must be clearly visible with a minimum 3:1 contrast ratio against adjacent colours and must not be obscured by other elements. (WCAG 2.4.11–2.4.12 AAA)
Keyboard: Tab to move between groups, arrow keys to navigate within a group and select an option.
Semantics: Use native <input type="radio"> with a shared name attribute for grouping. Custom elements must have role="radio", aria-checked, and full keyboard handling.
Checked state: Reflect state via aria-checked="true" (selected) or aria-checked="false" (unselected).
Disabled state: Use aria-disabled="true" rather than the HTML disabled attribute where possible to maintain the element in the tab order.

Sentence case: Write labels in sentence case: "Notify me daily" not "Notify Me Daily".
Mutually exclusive framing: Each option must be clearly distinct, options should not overlap in meaning or create ambiguity within the group.
Positive framing: Avoid negative options where possible: "No notifications" is preferable to "Don't notify me".
Concise: Keep labels to a single line. Use helper text below for additional context, not within the label itself.
Consistent structure: All radio labels in a group must follow the same grammatical pattern, either all noun phrases or all verb phrases. Do not mix.
No punctuation: Omit periods at the end of labels. Labels are not sentences.

Redlining & Specs

