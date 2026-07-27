# Component: Tag

**Figma ID:** `2920:457`
**Source Page:** Tag

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `status`: Enum ["positive", "negative", "neutral"] (Default: `positive`)
- `type`: Enum ["bold", "subtle"] (Default: `bold`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `status=positive, type=bold`
- **Node:** `status=positive, type=bold` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/medium)
  - **Fill:** `var(--color/status/positive/bold)`
  - *Children:*
    - **Node:** `Tag Label` (TEXT)
      - **Fill:** `var(--color/foreground/inverse)`

#### Variant: `status=negative, type=bold`
- **Node:** `status=negative, type=bold` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/medium)
  - **Fill:** `var(--color/status/negative/bold)`
  - *Children:*
    - **Node:** `Tag Label` (TEXT)
      - **Fill:** `var(--color/foreground/inverse)`

#### Variant: `status=neutral, type=bold`
- **Node:** `status=neutral, type=bold` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
  - **Sizing:** W: HUG, H: FIXED
  - **Padding:** T:var(--spacing/small) B:var(--spacing/small) L:var(--spacing/medium) R:var(--spacing/medium)
  - **Gap:** var(--spacing/medium)
  - **Fill:** `var(--color/status/default/bold)`
  - *Children:*
    - **Node:** `Tag Label` (TEXT)
      - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Tag A simple, non-interactive labelling element used to communicate status, categorize content, or display metadata within the companion system. Unlike Chip, Tag carries no click, focus, or toggle behavior. It appears on content cards, list items, and inside companion generated responses to communicate state at a glance.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| status | positive | true | The default status. Communicates a successful, healthy, or completed state. Use for items that are active, on-track, or passing. |
| status | negative | false | Communicates a failed, blocked, or error state. Use for items that require attention or have a critical issue. |
| status | neutral | false | A neutral, unweighted state. Use for items with no strong positive or negative signal, such as pending or inactive items. |
| type | bold | true | The default style. Renders the tag with a solid filled background for higher visual weight. Suited to primary status indicators. |
| type | subtle | false | A lower-emphasis style with a lighter background. Use when the tag must be present but not visually dominant. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Non-interactive | The tag carries no click, hover, or focus behaviour. It is a purely presentational element. Do not attach event handlers or interactive affordances to it. |
| Wrapping in groups | When multiple tags appear in a row, the container should use a flex layout that wraps. Each tag retains its fixed height; the row wraps to a new line when horizontal space is exhausted. |
| No truncation | Tag labels do not truncate. Keep labels concise so the full content is always visible. Avoid labels longer than two to three words. |
| Static sizing | The tag scales horizontally with its label content. Width is determined by text length plus fixed horizontal padding. Height is always fixed. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| label | Text | The visible text content of the tag. Keep labels to one to three words. The label does not wrap or truncate, so length directly affects tag width. |
| status | Variant | Controls the semantic status communicated by the tag. Accepted values: positive, negative, neutral. Drives the token applied to the background and text. |
| type | Variant | Controls the visual weight of the tag. Accepted values: bold (default, filled background) and subtle (lighter, lower-emphasis background). |



Anatomy

1. **Container Pill-shaped boundary that defines the tag size, background fill, and border-radius. Width scales with label length. Height is fixed.**
2. **Label Single-line text content. Does not wrap or truncate. Keep labels to one to three words to control tag width.**
3. **Status Fill Applied to the different available status, using high contrast fill for bold and an outline with softer fill for the subtle variant**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

ARIA roles: When rendering a list of tags, wrap them in a container with role="list" and give each tag role="listitem". For a purely presentational tag with no list context, use role="presentation" or omit the ARIA role and rely on surrounding context.
Screen reader behavior: Tag labels are read as plain text. The status is communicated through the label itself, so labels must be meaningful on their own. Avoid labels like "Yes", "No", or "Active" without surrounding context that clarifies what the status refers to.
Keyboard interaction: Tags have no keyboard interaction. They are not focusable. Do not add tabindex to a tag unless it becomes interactive, for example a dismissible variant.
Label copy: Use sentence case for status tags (examples: "Complete", "Failed", "Pending"). Use title case for category or type tags (examples: "AI Generated", "In Progress"). Keep labels to one to three words. Avoid punctuation. Do not use verbs; labels should be noun-based or adjective-based (example: "Complete" not "Completed").
Non-interactive affordance: The tag must never receive a pointer cursor, focus ring, or pressed state. If you need an interactive label element, use Chip instead.

Redlining & Specs

