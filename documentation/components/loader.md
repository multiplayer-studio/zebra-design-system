# Component: Loader

**Figma ID:** `2925:2427`
**Source Page:** Loader

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `type`: Enum ["static", "animated"] (Default: `static`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=static`
- **Node:** `type=static` (COMPONENT)
  - *Children:*
    - **Node:** `Ellipse 175` (ELLIPSE)

#### Variant: `type=animated`
- **Node:** `type=animated` (COMPONENT)
  - *Children:*
    - **Node:** `_Animated Loader` (INSTANCE)
      - *Children:*
        - **Node:** `Ellipse 175` (ELLIPSE)


---

### Design Metadata & Intent
*The following rules and descriptions were extracted directly from the Figma design system specifications.*

COMPONENT METADATA

Loader A Loader communicates that a process is in progress and the system is working. It is a general-purpose indeterminate progress indicator used for operations like page loads, data fetching, and form submissions. Unlike the Activity Indicator, which signals companion AI state, the Loader has no interactive states and is purely informational.

Property breakdown


| PROPERTY | TYPE | DEFAULT | DESCRIPTION |
| --- | --- | --- | --- |
| type | static | true | The default variant. Renders as a stationary spinner ring with no animation. Used mainly within Figma for static demonstration purpose . |
| type | animated | false | Renders the loader with a continuous spinning arc animation. The animation loops indefinitely with no defined end point. Pauses automatically when prefers reduced motion is active. |



Behavior


| TYPE | DESCRIPTION |
| --- | --- |
| Animation loop | The animated variant loops continuously with no defined end point. It does not self-terminate; the consuming view is responsible for removing the loader when the operation completes. |
| Reduced motion | When prefers-reduced-motion is active, the animated variant falls back to a static, non-spinning state. The loader remains visible but does not animate. |
| Size behavior | The loader renders at a fixed size determined by its container. It does not respond to text size or density settings. Use the appropriate size variant for the context. |
| Color and theming | The loader inherits its color from the current theme token. An inverse variant is available for use on dark or filled backgrounds to maintain sufficient contrast. |



Content & Slot


| PROPERTY | TYPE | DESCRIPTION |
| --- | --- | --- |
| track | Visual | The background ring of the spinner. Color is controlled via gradient theme token, the track itself is not configurable as a slot. Do not replace it with custom shapes. |



Anatomy

1. **Container The outermost boundary of the loader. Sets the overall size, centers the spinner visually, and provides the layout anchor for positioning in a parent view.**
2. **Track The full circular ring forming the background of the spinner. Always fully visible; color is set via a angular gradient from color/status/info/bold to color/status/info/subtle.**



How to use

- **Do:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”
- **Don't:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”
- **Do:** Use short, verb led labels that describes the outcome: “Save changes”, “Continue”, “Add item”, “Skip step”



Accessibility and content guidelines

Role and live region: Use role="status" for indeterminate loaders. Pair with aria-live="polite" so that screen readers announce the loading state without interrupting the user's current context.
Accessible name: Always provide an aria-label or an associated visually-hidden element. Examples: "Loading", "Saving your changes", "Fetching results". 
Reduced motion: The animated variant must pause or display a static state when the user's operating system or browser has prefers-reduced-motion enabled. Never rely on animation alone to communicate that loading is occurring.
Completion: For page or functional actions do not rely on the loader disappearing as the only signal that a process has finished. Pair with a visible confirmation state, status message, or screen reader announcement when the operation completes.
Touch target: The Loader is non-interactive. Touch target requirements do not apply.
Pairing with text: Where possible, pair the loader with a visible status label such as "Loading your dashboard..." to give sighted users additional context beyond the animation alone.

Redlining & Specs

