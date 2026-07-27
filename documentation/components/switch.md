# Component: Switch

**Figma ID:** `2595:163`
**Source Page:** Switch

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `state`: Enum ["default", "hover", "pressed", "focus", "disabled"] (Default: `default`)
- `selected`: Enum ["False", "True"] (Default: `False`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `state=default, selected=False`
- **Node:** `state=default, selected=False` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/secondary)`
  - *Children:*
    - **Node:** `Handle` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Touch target` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Handle shape` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Thumb` (ELLIPSE)
                  - **Fill:** `var(--color/background/primary)`

### Variant: `state=default, selected=True`
- **Node:** `state=default, selected=True` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: MAX, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/brand)`
  - *Children:*
    - **Node:** `Handle` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Touch target` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Handle shape` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Thumb` (ELLIPSE)
                  - **Fill:** `var(--color/background/primary)`

### Variant: `state=hover, selected=False`
- **Node:** `state=hover, selected=False` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: undefined, Align: CENTER)
  - **Sizing:** W: FIXED, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
  - **Gap:** var(--spacing/none)
  - **Fill:** `var(--color/background/secondary)`
  - *Children:*
    - **Node:** `Handle` (FRAME)
      - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: FIXED, H: FIXED
      - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
      - **Gap:** var(--spacing/none)
      - *Children:*
        - **Node:** `Touch target` (FRAME)
          - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
          - **Sizing:** W: FIXED, H: FIXED
          - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
          - **Gap:** var(--spacing/none)
          - *Children:*
            - **Node:** `Handle shape` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
              - **Sizing:** W: FIXED, H: FIXED
              - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Thumb` (ELLIPSE)
                  - **Fill:** `var(--color/background/hover)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

## Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Switch A binary toggle control for enabling or disabling a setting with immediate effect. Unlike checkboxes or radio buttons, the switch applies its change instantly, no form submission required. Supports selected and unselected states across state interactions.

### Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| selected | False | true | Switched off. The feature or setting is inactive. Default state. |
| selected | True | false | Switched on. The feature or setting is active and takes effect immediately. |
| state | default | false | Resting state. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual affordance that the switch is interactive. |
| state | pressed | false | Applied during active press. The handle compresses slightly to confirm contact before releasing to the toggled position. |
| state | focus | true | Applied on keyboard or programmatic focus. Renders a visible focus ring around the track for accessibility compliance. |
| state | disabled | false | Prevents interaction. Communicates the setting is unavailable in the current context, not an error state. |



### Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Touch Target | The full component area, track and handle together forms the touch target. The user does not need to hit the handle precisely. The entire switch is interactive, meeting WCAG 2.5.5 AAA touch target requirements. |
| Transition and Animation | The handle slides between positions with a 0.2s ease-in-out transition. Track changes color simultaneously to reinforce the state change. |
| Focus Outline | Decorative and non-structural, rendered around the track, not the handle. Does not affect the switch's size, spacing, or layout. Applied on keyboard focus only. |
| Immediate Effect | The switch takes effect the moment it is toggled, no form submission or confirmation step. Only use for settings that apply instantly and are easily reversible. |



### Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| Handle | Visual | The circular knob that moves between positions. Left = off (False), right = on (True). Position is driven by the selected property and animates on change. |
| Track | Visual | The pill shaped container. Color communicates state, neutral for off, brand color for on. Not configurable directly; driven by the selected property. |
| Touch target | Invisible overlay | The full component area (track + handle) forms the interactive zone and also an extra invisible touch region of 48px around the handle ensures touch target compliance without affecting the visual size of the component. |



### Anatomy

1. **Handle Touch target The entire switch is the interactive zone, but added to that is invisible area around the handle.**
2. **Track The pill-shaped container that holds the handle. Color shifts between neutral (off) and brand (on) to reinforce the selected state.**
3. **Handle The circular knob positioned inside the track. Slides left when off, right when on. Compresses slightly on press to confirm contact.**
4. **Focus ring Decorative focus indicator rendered around the track: 2px border, 2px offset. Visible on keyboard focus; does not affect layout or spacing.**



### How to use

- **Do:** Use a switch for binary settings that take effect immediately — enabling notifications, toggling dark mode, activating a feature. The change should be instant and easily reversible.
- **Don't:** Use a switch in place of a checkbox for form inputs that require submission. Switches are for immediate, persistent settings — not for selections confirmed by a submit action.
- **Do:** Place the switch to the right of its associated label. The label should describe the setting being controlled — not the on or off state.



### Accessibility and content guidelines

Touch target: The full component (track + handle) is the touch target. Do not restrict interaction to the handle alone in implementation.
Focus visibility: Focus ring must be clearly visible with a minimum 3:1 contrast ratio against adjacent colors. Rendered around the track not the handle. (WCAG 2.4.11–2.4.12 AAA)
Keyboard: Tab to focus, Space to toggle the selected state. (WCAG 2.1.1 A)
Semantics: Use role="switch" with aria-checked="true" (on) or aria-checked="false" (off). Never use role="checkbox" for a switch, the semantics are distinct.
Disabled state: Use aria-disabled="true" to keep the element reachable by screen readers while communicating unavailability.
Immediate effect: Communicate clearly that the switch applies changes instantly. Do not use a switch for destructive or irreversible actions that require confirmation.
Label describes the setting, not the state: Write the label as the name of the setting: "Dark mode" not "Turn on dark mode" or "Dark mode is on".
Sentence case: Write labels in sentence case "Email notifications" not "Email Notifications".
Positive framing: Frame the label so the "on" state represents the positive outcome: "Receive updates" not "Block updates".
Concise: Keep labels to a single line. Use helper text below for additional context, not within the label itself.
No on/off text: Do not embed "On" or "Off" text inside the switch. State is communicated through handle position and track color alone.
No punctuation: Omit periods at the end of labels. Labels are not sentences.

Redlining & Specs

