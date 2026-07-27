# Component: Link

**Figma ID:** `3829:966`
**Source Page:** Link

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `trailingIcon`: BOOLEAN (Default: `true`)
- `leadingIcon`: BOOLEAN (Default: `true`)
- `type`: Enum ["inline", "solid"] (Default: `inline`)
- `underline`: Enum ["true", "false"] (Default: `false`)
- `size`: Enum ["medium", "small"] (Default: `small`)
- `state`: Enum ["hover", "focus", "default"] (Default: `default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=inline, underline=false, size=small, state=default`
- **Node:** `type=inline, underline=false, size=small, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `link to find the form` (TEXT)
      - **Fill:** `var(--color/foreground/brand)`

#### Variant: `type=inline, underline=false, size=medium, state=default`
- **Node:** `type=inline, underline=false, size=medium, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `link to find the form` (TEXT)
      - **Fill:** `var(--color/foreground/brand)`

#### Variant: `type=inline, underline=true, size=small, state=default`
- **Node:** `type=inline, underline=true, size=small, state=default` (COMPONENT)
  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:var(--spacing/none) B:var(--spacing/none) L:var(--spacing/none) R:var(--spacing/none)
  - **Gap:** var(--spacing/none)
  - *Children:*
    - **Node:** `link to find the form` (TEXT)
      - **Fill:** `var(--color/foreground/brand)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Link The Link component is an inline navigational element used to direct users to related content, external resources, or page-level actions. It comes in two forms: inline links are embedded within body text and inherit the surrounding typographic scale, while solid links are stand-alone elements with a contained, button-like boundary. Both forms support optional underline decoration and two size variants.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | inline | true | Renders the link as flowing inline text use for contextual links embedded within sentences or paragraphs. |
| type | solid | false | Renders the link as a contained stand-alone element use when the link needs to appear independently from body text, such as in card footers or detail panels. |
| underline | false | true | No underline decoration. The link is distinguished by its color token. Use in contexts where an underline would create visual clutter. |
| underline | true | false | Applies underline decoration to the link label. Improves discoverability in dense text or on backgrounds where color contrast may be limited. |
| size | medium | false | Standard link size. Matches the default body text scale. Use in primary content areas. |
| size | small | true | Reduced size variant. Use in secondary content areas, captions, or vertically constrained layouts. |
| state | default | false | Resting state of the link. No interaction has occurred. |
| state | hover | false | Applied on cursor over. Provides visual feedback that the element is interactive. |
| state | Focus | false | Applied on keyboard or programmatic focus. Renders a visible focus ring for accessibility compliance. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Navigation | Links navigate to a destination or trigger a page-level action. Inline links open in the current context by default. External links should open in a new tab and include a visual indicator such as an external icon. |
| Visited state | Inline links may carry a browser-managed visited style to indicate previously accessed content. Do not suppress this unless the visited state would create confusion in the specific context. |
| Underline guidance | For inline links within body text, prefer underline=true to meet accessibility expectations for link discoverability. Solid links may omit the underline in contained UI contexts. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Text | The visible link text. Use clear, descriptive labels that communicate the destination or action. Avoid generic labels such as "click here" or "read more". Use sentence case. |
| leadingIcon | Icon Component | Optional icon slot rendered before the label. Use to reinforce the link type, such as an external link icon for out-of-app navigation. Accepts the Icon component only. |
| trailingIcon | Icon Component | Optional icon slot rendered after the label. Commonly used for directional arrows or external link indicators. Accepts the Icon component only. |



Anatomy

1. **Link container The outer boundary of the link. For inline links, this is the inline text box. For solid links, this includes background padding and corner radius.**
2. **Label The visible link text. Single-line for solid links. Inline links may wrap with the surrounding text flow.**
3. **Leading icon Optional icon rendered before the label. Fixed size; only the icon name is configurable. Use to signal the link type or destination.**
4. **Trailing icon Optional icon rendered after the label. Commonly used for directional arrows or external link indicators.**
5. **Underline decoration Optional bottom border applied when underline is true. Renders at the baseline of the label text and does not affect surrounding layout.**
6. **Focus ring Decorative focus indicator rendered on keyboard focus. Does not affect layout or surrounding text flow.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

ARIA: Links use the native anchor element or role="link". Do not use role="button" for links, even when styled as a solid link with a contained boundary. If an element triggers an action rather than navigation, use a button instead.
Keyboard interaction: Tab moves focus to the link. Enter activates it. Links should not be activated with Space, which is reserved for buttons.
Label quality: The link label must be descriptive on its own, without relying on surrounding context. Screen reader users frequently navigate by listing all links on a page. Avoid generic labels such as "click here", "here", or "read more". If surrounding context is required, supplement with aria-label or aria-describedby.
External links: Links that navigate outside the current application should communicate this to screen readers, either through visible text or an aria-label indicating a new tab will open.
Touch targets: The tap target must meet a minimum of 44x44px. For inline links, use invisible padding to extend the touch area without affecting text layout.

Redlining & Specs

