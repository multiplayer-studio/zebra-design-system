# Component: Icon Button

**Figma ID:** `2739:2567`
**Source Page:** Icon button

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `showBadge`: BOOLEAN (Default: `false`)
- `type`: Enum ["primary", "subtle", "outline", "gradient", "inverse"] (Default: `primary`)
- `state`: Enum ["default", "hover", "pressed", "focus", "disabled"] (Default: `default`)
- `size`: Enum ["small"] (Default: `small`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=primary, state=default, size=small`
- **Node:** `type=primary, state=default, size=small` (COMPONENT)
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
        - **Node:** `AI Companion` (INSTANCE)
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

#### Variant: `type=subtle, state=default, size=small`
- **Node:** `type=subtle, state=default, size=small` (COMPONENT)
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
        - **Node:** `AI Companion` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/secondary)`
    - **Node:** `Badge` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
      - **Gap:** var(--spacing/medium)
      - **Fill:** `var(--color/status/negative/bold)`
      - *Children:*
        - **Node:** `99+` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

#### Variant: `type=outline, state=default, size=small`
- **Node:** `type=outline, state=default, size=small` (COMPONENT)
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
        - **Node:** `AI Companion` (INSTANCE)
          - *Children:*
            - **Node:** `Icon: false` (VECTOR)
              - **Fill:** `var(--color/foreground/secondary)`
    - **Node:** `Badge` (INSTANCE)
      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
      - **Sizing:** W: HUG, H: HUG
      - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/small) R:var(--spacing/small)
      - **Gap:** var(--spacing/medium)
      - **Fill:** `var(--color/status/negative/bold)`
      - *Children:*
        - **Node:** `99+` (TEXT)
          - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Icon button A compact, icon only button that triggers a discrete action without a visible text label. Use it in toolbars, cards, or space constrained layouts where the icon alone clearly communicates the action. When the action needs a visible label, use the Button component instead.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | primary | true | The default high emphasis style. Use for high impact actions in a view. Rendered with a primary foreground color. |
| type | subtle | false | A lower emphasis style for secondary or supporting actions. Transparent background with a tinted icon. |
| type | outline | false | A bordered style with no fill. Use where a visual boundary aids distinction without adding weight. |
| type | gradient | false | Reserved for Companion AI entry points. Use only for the singular action that initiates or surfaces the Companion experience. |
| type | inverse | false | For use on dark or saturated backgrounds where standard styles would not meet contrast requirements. |
| state | default | true | The resting state. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual affordance that the button is interactive. |
| state | pressed | false | Active during a click or tap. Confirms the action is being triggered. |
| state | focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |
| state | disabled | false | Prevents interaction. Communicates that the action is unavailable in the current context, not an error state. |
| size | small | true | The only available size. The button measures 48x48px to meet the WCAG AAA 44x44px minimum touch target. The icon inside is 20x20px. |
| showBadge | false | true | Default before for icon buttons without a count indicator |
| showBadge | false | false | Count indicator drawing attention to an icon button trigger. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| State transitions | Color, background, and border changes animate with a 0.2s ease-in-out transition across all interactive states. |
| Focus ring | A 2px solid focus ring with a 2px offset appears on keyboard or programmatic focus. It is decorative and does not affect the button's dimensions, spacing, or layout. |
| Touch target | The component renders at 48x48px. The visible icon area is smaller; the surrounding padding absorbs pointer interactions. The Icon size can be changed from small to large when more emphasis is required for core action use. |
| Disabled state | Pointer events are removed and opacity is reduced. The button is excluded from keyboard tab order. Do not use a tooltip on disabled icon buttons; instead surface a contextual explanation elsewhere. |



Content & slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| icon | Icon Component | The sole visual slot. Accepts only the Icon component, not raw SVGs or glyphs. The icon name and size are the only configurable property; framing is fixed, the size can be adjusted when extra emphasis is needed. Choose an icon whose meaning is universally understood or well-established in the product. |
| aria-label | String | Required. Provides the accessible name since there is no visible text. Must describe the action, not the icon: use "Save document" rather than "floppy disk". Updated dynamically if the action context changes. |
| badge | Badge Component | Optional supplementary indicator attached to the icon button to communicate status, count, notification, or urgency. |



Anatomy

1. **Container 48x48px boundary that defines the touch target, padding, background fill, border, and border-radius. Absorbs pointer interactions across the full area.**
2. **Focus ring 2px solid ring with 2px offset. Visible on keyboard focus; does not affect layout or spacing.**
3. **Icon slot 20x20px centered slot. Accepts only the Icon component; size and framing are fixed.**
4. **Touch target Full 48x48px interactive area.**
5. **State layer Semi-transparent overlay applied on hover, pressed, and focus states. Inherits the container shape; does not expand beyond the boundary.**
6. **Badge Accepts only the Badge component. Use badges sparingly to avoid visual noise, and ensure the content is a number. Badge placement and alignment are system-defined and should not be manually adjusted.**



How to use

- **Do:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”
- **Don't:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”
- **Do:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”



Accessibility and content guidelines

ARIA role: Renders as a native <button> element with role="button". Do not use a <div> or <span> with a click handler.
Accessible name: aria-label is required on every icon button. Use a concise action phrase describing the outcome, not the icon shape. Example: use "Close dialog" not "X icon". Update aria-label dynamically if the action or context changes (e.g. toggling between "Mute" and "Unmute").
Keyboard interaction: Tab moves focus to the button. Enter and Space activate it. Shift+Tab moves focus to the previous interactive element.
Focus visibility: The focus ring must achieve at least 3:1 contrast against adjacent colors. The focus indicator must not be clipped, obscured by other elements, or removed from the tab order.
Touch target: The full 48x48px container is the interactive area. Do not reduce padding in a way that shrinks below tap target.
Disabled state: Set the disabled HTML attribute or aria-disabled="true". Disabled icon buttons are removed from tab order. Do not rely solely on reduced opacity to communicate unavailability; surface a reason for the disabled state elsewhere in context if the cause is not obvious.
Tooltip: Pair icon buttons with a tooltip showing the same string as aria-label. This improves discoverability for sighted users who may not recognize the icon. On touch only surfaces, omit the tooltip.
Icon selection: Choose icons with established, unambiguous meaning within the product context. Avoid icons that could be interpreted as multiple different actions. When in doubt, prefer a full Button with a visible label.
Sentence case: Write aria-label values in sentence case. Use active verb phrases: "Save changes", "Delete item", "Open menu". Avoid passive constructions or icon-centric naming like "Trash" or "Pencil icon".

Redlining & Specs

