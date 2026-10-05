# Zebra Design System — Global Rules

## 1. Core Architecture

### Token resolution

`tokens.json` resolves along two independent axes.

| Axis | Segments | Selected by |
|---|---|---|
| Theme | `color.light`, `color.dark` | User or system appearance preference |
| Device tier | `size.mobile`, `size.tablet`, `size.desktop`, `size.desktop compact` | Viewport width and input density |

- Color keys live under `color.{theme}.…` (for example `color.light.surface.card`).
- Dimension keys live under `size.{tier}.…` (`space`, `control`, `radius`, `stroke`, `shadow`, `container`).
- Typography keys live under `typography.{tier}.…` (`display`, `heading`, `title`, `body`, `label`, `indicator`).
- Component files omit the theme and tier segments. Resolve both at the point of use.
- Components always bind to **semantic** keys (`surface`, `foreground`, `border`, `interactive`), never to palette or primitive keys.
- `desktop compact` is the highest-density tier for pointer-driven, information-heavy screens. It must never be used where touch is the primary input.

### Icon lookup

- Icons are queried from `icons.json` by exact **name** or by **category**.
- Lookup by name returns one glyph. If the name is missing, fail loudly. Do not fall back to a similar icon.
- Lookup by category returns a list. Use it for pickers and galleries, not for fixed UI slots.
- Components cite icons by name (for example `error`, `info`, `close`). Each cited name must exist in `icons.json`.

### Component index

Every component has one file in `components/`. If a component is not listed here, it does not exist: propose it before building it. Keep this table in step with the folder.

| File | Category | Role |
|:---|:---|:---|
| `avatar.md` | Data Display | Person or entity as initials, photo or glyph, with optional presence status |
| `button.md` | Action | Triggers a single action; emphasis by Flavour, geometry by Size and Shape |
| `card.md` | Data Display | Bounded surface grouping heading, media, body and footer actions |
| `checkbox.md` | Data Entry | Independent on, off or partial option |
| `dialog.md` | Feedback | Interrupts the flow to deliver a message and request a decision |
| `divider.md` | Layout | Thin line separating groups of content |
| `dropdown.md` | Action | Trigger that reveals a floating menu of choices |
| `global-header.md` | Navigation | Persistent top bar: toggle, logo, search, actions, profile, app switcher |
| `icon-button.md` | Action | Single action using only a glyph |
| `icon.md` | Data Display | Single glyph from the icon library |
| `navigation-bar.md` | Navigation | Bottom bar of icon-and-label destinations |
| `navigation-rail.md` | Navigation | Vertical strip of top-level destinations, collapsible |
| `notification-indicator.md` | Feedback | Dot or count marking unread or pending items |
| `pagination.md` | Navigation | First, previous, next, last and numbered page controls |
| `progress-bar.md` | Feedback | Horizontal task progress, determinate or indeterminate |
| `progress-circle.md` | Feedback | Circular progress for compact spaces |
| `radio-button.md` | Data Entry | Exactly one choice from a mutually exclusive set |
| `search.md` | Data Entry | Single-line query field with optional clear and accessory glyphs |
| `tab-bar.md` | Navigation | Row of tabs switching sibling views, one selected |
| `top-app-bar.md` | Navigation | Screen-top bar with title, navigation or dismiss control and actions |

## 2. Form-Factor Scaling Matrix

| Form factor | Tier | Layout | Targets & density |
|---|---|---|---|
| Wearables / rings (micro-displays) | `mobile` | Single-column stack. One primary action per screen. No multi-level navigation. | Highest density per pixel; keep text to labels. Targets are never below 40px. |
| Rugged handhelds / mobile | `mobile` | Single column, bottom-anchored primary actions. | Touch targets 40px–48px. Place frequent actions in the thumb zone (lower third, reachable by one hand). Allow for gloved use and scanner triggers. |
| Tablets | `tablet` | Two-pane navigation and master-detail layouts. | Touch targets 40px or more. Medium informational density. |
| POS / fixed terminals | `tablet` or `desktop` | Multi-pane navigation, master-detail, persistent action rails. | High informational density. Touch targets 40px or more when a touchscreen is present. Keyboard and scanner navigation is first-class. |
| Desktop / pointer-first | `desktop` or `desktop compact` | Multi-pane, tables, side navigation. | Pointer targets may shrink to the `size.control.sm` token. Keep `size.control.target.min` as the hit area for any touch-capable display. |

Rules:

- Always take dimensions from the resolved tier. Never scale values by formula.
- Any element that is smaller than `size.control.target.min` visually must extend its hit area to that minimum.
- Collapse to a single column when the tier is `mobile`. Reflow instead of shrinking text.

## 3. Universal Accessibility Guardrails

### Contrast (WCAG 2.2 AA)

| Element | Minimum ratio |
|---|---|
| Body text and labels (under 18pt, or under 14pt bold) | 4.5:1 |
| Large text (18pt and above, or 14pt bold and above) | 3:1 |
| Graphical objects, icons that carry meaning, control borders, focus indicators | 3:1 |

Rules:

- Contrast applies in both themes. A pairing that passes in `color.light` must be checked again in `color.dark`.
- Disabled elements are exempt from contrast, but must stay distinguishable by more than color.

### Keyboard & scanner focus

- Every interactive element must be reachable and operable by keyboard or hardware scanner navigation.
- Focus order follows reading order.
- The focused element shows a ring in `color.border.focus` (also referred to as `color.focus.ring`), **2px** wide (`size.stroke.thick`), with an offset so it never touches the content.
- The focus ring must never be removed without an equal or stronger replacement.
- The focus ring must meet 3:1 contrast against every adjacent color.
- Modal surfaces trap focus and return it to the trigger on close.

### Non-color status feedback

- Error and warning states must use **an icon and text** in addition to color.
- Success and info states follow the same rule.
- Required fields carry an explicit text or symbol marker, not only a color change.
- Selected and checked states must differ by shape or glyph, not only by fill color.

### Touch targets

- Minimum interactive target is `size.control.target.min` (40px or more).
- Leave enough spacing between adjacent targets to prevent mis-taps.

---

## 4. Spec Vocabulary

Component files describe appearance and structure in these terms only, so any technology can map them.

### Allowed terms

| Term | Meaning |
|:---|:---|
| **Layer** | A visual part of a component, named by what it is (Container, Ring, Label), not how it is built. |
| **Slot** | A named layer whose content is supplied by the consumer. Fixed layers are not slots. Mark a slot in the anatomy table with "Slot" in Visual Nature. |
| **Leading / Trailing** | Start and end along the reading direction. Flips in right-to-left. Use for every horizontal position. |
| **Top / Bottom** | Vertical edges. |
| **Overlay** | A layer drawn above another and anchored to a corner or edge of it. |
| **Clip** | Content cut to a shape. |
| **Inset (padding)** | Space between a layer's edge and its content. Bind to a `size.space.*` token. |
| **Gap** | Space between sibling layers. Bind to a `size.space.*` token. |
| **Group** | Sibling layers arranged in a sequence, with an Axis of horizontal or vertical. |
| **Fill / Stroke / Elevation** | Surface color, outline, and depth. Bind to tokens. |

### Banned terms

- Technology names and constructs: CSS property names, DOM, element tags, flex, grid, z-index, absolute or relative positioning, widget, view, composable, component class names.
- Physical direction for layout (`left`, `right`) wherever `leading` or `trailing` is meant. Exception: a variant value that is physically fixed, such as a placement relative to a trigger.
- Design-tool references: "Figma", variable paths (`space/xl`), layer names, auto-layout. Put source observations under the **Token gaps** or notes section, never in Visual Anatomy, Token Bindings or State Matrix.
- Literal values (`24`, `4px`). Always a token key.

### Conditions

Write conditional requirements as `Required when <Axis> = <Value>`, using the exact axis and value names from Variant Axes.

---

## 5. Motion

Motion in this system explains a change of state or place. It is never decoration. The values below were derived from the device-onboarding prototype (`apps/device-onboarding/src/index.css`, `Loader.jsx`, `App.jsx`) and are the reference for new work.

> **Token gap.** `tokens.json` has no motion tokens, so the values in this section are provisional. Until they exist, use the named roles below and keep each value in one place. Proposed keys: `motion.duration.{fast,base,moderate,expressive,scene}`, `motion.easing.{standard,spring,spring-playful,emphasized}`, `motion.stagger.step`. Distances already come from existing tokens (`size.space.*`). Do not invent other values.

### Principles

1. **Continuity over cuts.** Things that persist (navigation, the identity mark) change size and position in place. They do not unmount and remount.
2. **Origin matters.** A reveal grows from the thing that triggered it. Items nearest the anchor move first.
3. **Animate cheap properties.** Opacity, translate, scale, and the size of a container. Never animate color of large surfaces, blur radius, or layout properties on many elements at once.
4. **Quiet by default.** Most motion is a short fade or rise. Overshoot is reserved for a few signature moments and stays subtle.
5. **Motion never carries meaning alone.** State must also be readable with all motion removed (see Reduced motion).
6. **Never block input.** Controls stay operable during a transition. A hidden control is made inert, not just invisible.

### Duration roles

| Role | Value | Used for |
|---|---|---|
| **fast** | 150ms | Hover and press color changes on buttons, rows, sort headers, menu items |
| **base** | 200–250ms | Opacity fades: route fade-in, title crossfade, backdrop, labels, small reveals |
| **moderate** | 300–350ms | Layout changes (sidebar resize, row collapse, disclosure) and content rising in |
| **expressive** | 450–600ms | Signature object moves: conveyor pieces (450ms), mark spin (600ms) |
| **scene** | 900ms | A hand-off between two screens or states, as one sequence (loader exit) |

### Easing roles

| Role | Curve | Used for |
|---|---|---|
| **standard** | `cubic-bezier(0.2, 0, 0, 1)` | Decelerating entry and layout change: rising content, row collapse, disclosure, dialog |
| **spring** | `cubic-bezier(0.2, 1.12, 0.4, 1)` (about 12% overshoot) | Persistent navigation changing width, and anything that scales in lockstep with it. Also tenant buttons rising (`0.2, 1.1, 0.4, 1`) |
| **spring-playful** | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Small standalone objects: the header mark spin, the avatar pop-in |
| **emphasized** | `cubic-bezier(0.4, 0, 0.2, 1)` | Scene hand-offs |
| **in-out** | `ease-in-out` | Looping or per-piece animation (spinner ripple, conveyor pieces) |

Exits use the same role as the entry they undo. Linear easing is used only for a progress fill.

### Patterns

| Pattern | Behavior |
|---|---|
| **Persistent resize** | The navigation rail changes width with **moderate** + **spring**. The identity mark inside it resizes on the same curve and duration so they move as one. Labels fade in after the width opens (about 120ms delay) and fade out immediately. |
| **Mode switch in place** | When navigation changes mode, no item unmounts. Items that leave collapse their height and margin to zero, fade, and drift up by `size.space.xl` (**moderate**, **standard**). They become inert. The selected item slides to its new position. A group that appears (a divider and sub-items) opens by growing from zero height, then fades in about 120ms later. The icon of a control that changes meaning (Home to Back) fades and scales in once (about 250ms, from 0.6 scale). The mode must look and behave the same whether the rail is collapsed or expanded. |
| **Route change** | The page area fades in (**base**). Its direct blocks rise by `size.space.md` with **moderate** + **standard**, staggered 50ms per block for the first four blocks. There is **no exit animation** and no browser view-transition snapshot, because a snapshot would freeze the sidebar mid-motion. |
| **Dialog** | The surface rises in (250ms, **standard**) while the scrim fades in (250ms). Each step of a multi-step flow rises in again (300ms) when it changes. |
| **Crossfade** | A changing title or label stacks the old and new content in the same position. The old fades out while the new fades in (250ms). The old layer is removed when its animation ends. |
| **Staggered reveal** | Items revealed from an anchor (tenant buttons above the avatar) rise by `size.space.xl` and fade in. Stagger is 60–70ms per item, nearest the anchor first, after a short lead-in (about 150ms). |
| **State-driven mark** | The header mark's rotation is a function of state, not of click count. Opening rotates half a turn one way, closing rotates it back. Pressing scales it to 0.88 while held. |
| **Conveyor** | The identity mark can hand over to an avatar. Its pieces slide off to the trailing side one after another (60ms stagger, 450ms each) while the replacement scales and fades in after about 200ms. Leaving reverses it: the pieces re-enter from the leading side. The animation box is the full width of its container (the rail), and the container's edge clips the pieces. No animation plays before the first interaction. |
| **Loading and hand-off** | The loader plays whole cycles only. The exit starts when the last piece of the last cycle ends, not on a timer. During the exit, one sequence of **scene** length runs: a translucent, blurred scrim fades away to reveal the app already rendered behind it, while the mark shrinks and travels to its docked position. The destination is measured from the real docked element, so the hand-off lands exactly. The loader is removed when the move's transition ends. Any artificial loading delay is demo-only and must be marked as such in code. |
| **Progress** | A progress fill grows with a short, linear width transition (200ms). It is the one place linear easing is correct, because the value updates continuously. |
| **Interactive states** | Hover, pressed and selected changes of color, background and border on every control (buttons, rows, headers, menu items, inputs, search, links, tenant buttons) fade over **fast**. Focus rings appear immediately and are never delayed. |
| **Appearing content** | Small content that appears because of state (validation messages, status lines, tooltips, clear buttons, badges) fades in over **base**. Popovers and menus rise in over 250ms with **standard**. A disclosure's content (a data table inside a fold-out) rises in over 300ms. Banners fade in over **base**. Small content is removed immediately. Surfaces that have an entrance also have an exit, see **Exits**. |
| **Exits** | A surface that animates in also animates out, by reversing its entrance: **a dialog** sinks by `size.space.md` and fades over 200ms while its scrim fades over the same time (focus returns to the trigger only after the exit ends); **a banner** fades and collapses its height to zero over 500ms (**standard**) so the content below slides up instead of jumping; **popovers and menus** fade and drop over 200ms. Exits run slightly faster than entrances, except the banner, which is deliberately slower so the layout shift is easy to follow. Tooltips, validation messages, status lines and clear buttons have no exit. |
| **Banner lifetime** | A banner stays until the user dismisses it or navigates away. It must never time out on its own, and it must not be dismissed by any animation other than its own exit. A feature that adds auto-dismiss must keep the banner visible long enough to read (at least 5 seconds) and pause that timer while the banner has hover or focus. |
| **Changing value in place** | A label whose text changes while visible (for example the current tenant name) uses the crossfade pattern, not a hard swap. |

### Reduced motion

Every animation and transition must have a `prefers-reduced-motion: reduce` fallback in the same place it is defined.

- Transitions and keyframe animations are removed. The end state appears immediately.
- Layout changes still happen, just without movement.
- A crossfade shows only the new content.
- A sequence that depends on animation events (the loader exit) must not wait for an event that will never fire. It uses a short pause (about 1s) and then cuts.
- A spinner may be replaced by static content.

### Accessibility and interaction

- Anything revealed on hover must also open on keyboard focus and on tap, and close on Escape (focus returns to the trigger).
- Hidden or collapsed items are inert, so they cannot be focused or clicked while invisible.
- Completion of an exit is driven by the end of that specific animation (match the animation name and the target), never by any animation event that bubbles up from a child or from an entrance. Under reduced motion no animation event fires, so the exit must complete directly.
- While a surface is exiting it ignores input (pointer events off) so it cannot be activated twice.
- Floating panels and popovers are clipped to their container where they could spill out of it, and their hover box must match their visible box.
- Looping motion longer than 5 seconds needs a pause, or must be limited to a fixed number of cycles (the loader plays exactly two).
- Do not trigger motion in response to scrolling, and do not use parallax.
