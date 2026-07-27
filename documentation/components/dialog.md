# Component: Dialog

**Figma ID:** `3560:544`
**Source Page:** Dialog

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `body`: TEXT (Default: `Are you sure you want to delete this conversation?`)
- `title`: TEXT (Default: `Dialog title`)
- `showIcon`: BOOLEAN (Default: `true`)
- `showTitle`: BOOLEAN (Default: `true`)
- `purpose`: Enum ["information", "companion", "confirmation"] (Default: `information`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `purpose=information`
- **Node:** `purpose=information` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** undefinedpx
  - *Children:*
    - **Node:** `Frame` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:var(--spacing/5xl) B:var(--spacing/3xl) L:var(--spacing/3xl) R:var(--spacing/3xl)
      - **Gap:** undefinedpx
      - **Fill:** `var(--color/background/overlay)`
      - *Children:*
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/4xl)
          - *Children:*
            - **Node:** `Body` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/medium)
              - *Children:*
                - **Node:** `Dialog title` (TEXT)
                - **Node:** `Are you sure you want to delete this conversation?` (TEXT)
            - **Node:** `Footer` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: MAX, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/none)
              - *Children:*
                - **Node:** `Button` (INSTANCE)
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

#### Variant: `purpose=confirmation`
- **Node:** `purpose=confirmation` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** undefinedpx
  - *Children:*
    - **Node:** `Frame` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:var(--spacing/5xl) B:var(--spacing/3xl) L:var(--spacing/3xl) R:var(--spacing/3xl)
      - **Gap:** undefinedpx
      - **Fill:** `var(--color/background/overlay)`
      - *Children:*
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/4xl)
          - *Children:*
            - **Node:** `Body` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/medium)
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FIXED, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `Check Circle Outline` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/foreground/primary)`
                - **Node:** `Dialog title` (TEXT)
                - **Node:** `Are you sure you want to delete this conversation?` (TEXT)
            - **Node:** `Footer` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** 153px
              - *Children:*
                - **Node:** `Button` (INSTANCE)
                  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: FIXED
                  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
                  - **Gap:** var(--spacing/small)
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
                              - **Fill:** `var(--color/foreground/brand)`
                    - **Node:** `Label` (FRAME)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Label` (TEXT)
                          - **Fill:** `var(--color/foreground/brand)`
                    - **Node:** `Icon: false` (INSTANCE)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Love Outline` (INSTANCE)
                          - *Children:*
                            - **Node:** `Icon: false` (VECTOR)
                              - **Fill:** `var(--color/foreground/brand)`
                - **Node:** `Button` (INSTANCE)
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

#### Variant: `purpose=companion`
- **Node:** `purpose=companion` (COMPONENT)
  - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
  - **Sizing:** W: HUG, H: HUG
  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
  - **Gap:** undefinedpx
  - *Children:*
    - **Node:** `Frame` (FRAME)
      - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
      - **Sizing:** W: FIXED, H: HUG
      - **Padding:** T:var(--spacing/5xl) B:var(--spacing/3xl) L:var(--spacing/3xl) R:var(--spacing/3xl)
      - **Gap:** undefinedpx
      - **Fill:** `var(--color/background/overlay)`
      - *Children:*
        - **Node:** `Content` (FRAME)
          - **Layout:** Flex VERTICAL (Justify: undefined, Align: undefined)
          - **Sizing:** W: FILL, H: HUG
          - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
          - **Gap:** var(--spacing/4xl)
          - *Children:*
            - **Node:** `Body` (FRAME)
              - **Layout:** Flex VERTICAL (Justify: undefined, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** var(--spacing/medium)
              - *Children:*
                - **Node:** `Icon: false` (INSTANCE)
                  - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: FIXED, H: FIXED
                  - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                  - **Gap:** var(--spacing/none)
                  - *Children:*
                    - **Node:** `AI Companion` (INSTANCE)
                      - *Children:*
                        - **Node:** `Icon: false` (VECTOR)
                          - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Dialog title` (TEXT)
                - **Node:** `Are you sure you want to delete this conversation?` (TEXT)
            - **Node:** `Footer` (FRAME)
              - **Layout:** Flex HORIZONTAL (Justify: SPACE_BETWEEN, Align: CENTER)
              - **Sizing:** W: FILL, H: HUG
              - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
              - **Gap:** 153px
              - *Children:*
                - **Node:** `Button` (INSTANCE)
                  - **Layout:** Flex HORIZONTAL (Justify: CENTER, Align: CENTER)
                  - **Sizing:** W: HUG, H: FIXED
                  - **Padding:** T:var(--spacing/medium) B:var(--spacing/medium) L:var(--spacing/xl) R:var(--spacing/xl)
                  - **Gap:** var(--spacing/small)
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
                              - **Fill:** `var(--color/foreground/brand)`
                    - **Node:** `Label` (FRAME)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:var(--spacing/small) R:var(--spacing/small)
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Label` (TEXT)
                          - **Fill:** `var(--color/foreground/brand)`
                    - **Node:** `Icon: false` (INSTANCE)
                      - **Layout:** Flex VERTICAL (Justify: CENTER, Align: CENTER)
                      - **Sizing:** W: HUG, H: HUG
                      - **Padding:** T:undefinedpx B:undefinedpx L:undefinedpx R:undefinedpx
                      - **Gap:** var(--spacing/none)
                      - *Children:*
                        - **Node:** `Love Outline` (INSTANCE)
                          - *Children:*
                            - **Node:** `Icon: false` (VECTOR)
                              - **Fill:** `var(--color/foreground/brand)`
                - **Node:** `Button` (INSTANCE)
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


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Dialog The Dialog is a modal surface used to communicate important information or prompt a user decision that requires acknowledgement before continuing. It renders centered over a Scrim that blocks all background interaction. Three purpose variants cover distinct use cases: information, for non-blocking updates; confirmation, for decisions requiring an explicit response; and companion, for AI-driven prompts and contextual choices within the Companion interface.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| purpose | information | true | Communicates a fact or non-blocking update. Requires no decision from the user; a single dismiss action is sufficient. The dialog can be closed via the dismiss button, scrim, or Escape key. |
| purpose | confirmation | true | Presents a decision point requiring an explicit response. The user must select an action to proceed. The scrim is non-interactive and Escape does not dismiss, preventing accidental closure. |
| purpose | companion | true | Used within the Companion interface for AI-driven prompts, confirmations, or contextual choices. Carries Companion-specific styling to visually reinforce the AI context. |
| dismissible | Boolean | false | When true, a dismiss button is available in the footer and the dialog can be closed via the scrim or Escape key. Set to false for confirmation dialogs where an explicit choice is required. |
| title | Boolean | false | Controls the visibility of the dialog title. Should be true in most cases; omit only when the body content alone communicates the full message. |
| showIcon | Boolean | false | Controls the visibility of the dialog icon. Should be true in most confirmation cases; omit only when the body content alone communicates the full message. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Open | The dialog fades in with a short (0.3s) scale-up transition over a Scrim. On open, focus moves to the first focusable element inside the dialog, typically the primary action or the dismiss button. |
| Dismiss | An information dialog closes via the dismiss button, clicking the scrim, or Escape. A confirmation dialog requires an explicit button selection; the scrim and Escape are disabled to prevent accidental closure. |
| Scrim | Every dialog renders over a Scrim that blocks background interaction. The Scrim's interactive state is tied to the dismissible property: non-interactive for confirmation dialogs, interactive for information dialogs. |
| Stacking | Only one dialog should be active at a time. Avoid nesting dialogs. If a secondary confirmation is needed, use an inline confirmation pattern within the active dialog surface. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| heading | Text | The dialog title. Should be concise and clearly communicate the nature of the message or decision. Use sentence case. Avoid punctuation at the end of the title. |
| body | Text | Supporting copy providing context or explanation. Keep to two to three sentences. Do not restate the heading; the body should extend or clarify it. |
| actions | Slot | Footer slot for action buttons. Align the primary action to the right. Use clear, verb-led button labels that describe the outcome of each action. |



Anatomy

1. **Dialog surface The elevated container with background fill, corner radius, and drop shadow. Renders centered in the viewport above the Scrim.**
2. **Header Contains the dialog title and optional dismiss button. Anchored to the top of the surface.**
3. **Body The content area for supporting copy or embedded content. Scrollable when content exceeds the maximum dialog height.**
4. **Footer / actions The bottom slot housing action buttons for confirmation, companion dialogs , primary actions and secondary actions.**
5. **Dialog icon Contextual icon displayed above the title, used mostly for status driven confirmation dialogs.**
6. **Scrim The full screen overlay component rendered behind the dialog. Blocks all background interaction while the dialog is open.**



How to use

- **Do:** Use concise, noun-based labels for filter and choice chips. The label should describe the attribute or category being toggled. Examples: "Priority", "Unread", "In stock".
- **Don't:** Don't use a chip as the primary or sole action on a screen. When a single action needs prominence, use Button instead. Chips are suited to grouped, repeated, or selection-based interactions.
- **Do:** Use verb-led labels for action chips. The label should describe the outcome in one to two words. Examples: "Add filter", "Clear all", "Apply".



Accessibility and content guidelines

ARIA: The dialog uses role="dialog". Reference the heading with aria-labelledby and the body copy with aria-describedby where applicable. Set aria-modal="true" to signal that background content is inert.
Focus trap: While the dialog is open, keyboard focus must remain inside it. Tab and Shift+Tab must cycle only through focusable elements within the dialog. Focus must not reach background content.
Focus on open: When the dialog opens, focus moves to the first focusable element inside it, typically the primary action button or the dismiss button.
Focus on close: When the dialog closes, focus returns to the element that triggered it.
Keyboard: Escape closes an information dialog. For confirmation dialogs, Escape should not dismiss unless it clearly maps to a safe cancel action, to prevent accidental data loss or navigation.
Heading copy: Keep dialog headings short, specific, and in sentence case. The heading should communicate the nature of the message or decision clearly without relying on the body for context.
Body copy: Use plain, direct language. Two to three sentences is the target length. Avoid jargon, passive voice, and unnecessary qualifiers.

Redlining & Specs

