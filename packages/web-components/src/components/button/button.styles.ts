import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. Because
 * custom properties inherit through shadow roots, an `.ext-*` / `.mode-*`
 * class on any ancestor in the light DOM re-themes this component with no
 * JavaScript and no re-render.
 *
 * Spec: specs/button/button.spec.json
 */
export default css`
  :host {
    display: inline-flex;
    vertical-align: middle;
  }

  :host([hidden]) {
    display: none;
  }

  button {
    /* --- geometry: size axis ------------------------------------------- */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: var(--space-none);
    /* :host is the flex item a layout like zds-card-footer stretches
       (::slotted(*) { flex: 1 1 0 }) — this is what actually fills that
       width, since the host's own display (inline-flex) only governs how it
       lays out this button, not how the host itself is sized externally. */
    flex: 1 1 auto;
    height: var(--control-sm);
    padding: var(--space-2xs) var(--space-md);
    border-style: solid;
    border-width: var(--stroke-base);
    border-radius: var(--radius-none);

    /* --- type: size axis ----------------------------------------------- */
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: 500;
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);

    /* --- colour: flavour x state axis ---------------------------------- */
    background: var(--zds-button-bg);
    border-color: var(--zds-button-border);
    color: var(--zds-button-fg);

    cursor: pointer;
    /* Colour-only transitions: the spec records no scale, shadow or elevation
       shift on any flavour, so a transition must read as a tint change. */
    transition: background-color 120ms ease, background-position 120ms ease, border-color 120ms ease, color 120ms ease;
  }

  /* The label wrapper's own padding is what separates icon from text; the row
     itself has no gap. */
  .label {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-2xs);
  }

  ::slotted(*),
  .icon {
    flex: none;
  }

  /* ---- size ---------------------------------------------------------- */
  :host([size="medium"]) button {
    height: var(--control-md);
    padding: var(--space-2xs) var(--space-md);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    font-family: var(--label-large-font-family), system-ui, sans-serif;
  }
  :host([size="large"]) button {
    height: var(--control-lg);
    padding: var(--space-2xs) var(--space-lg);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    font-family: var(--label-large-font-family), system-ui, sans-serif;
  }
  :host([size="medium"]) .label,
  :host([size="large"]) .label {
    padding-inline: var(--space-sm);
  }

  /* ---- shape --------------------------------------------------------- */
  :host([shape="rounded"]) button { border-radius: var(--radius-element-sm); }
  :host([shape="full"]) button { border-radius: var(--radius-pill); }

  /* ---- flavour: resting ---------------------------------------------- */
  :host,
  :host([flavour="primary"]) {
    --zds-button-bg: var(--interactive-primary-background-default);
    --zds-button-border: var(--interactive-primary-border-default);
    --zds-button-fg: var(--interactive-primary-foreground-default);
  }
  :host([flavour="positive"]) {
    --zds-button-bg: var(--interactive-positive-background-default);
    --zds-button-border: var(--interactive-positive-border-default);
    --zds-button-fg: var(--interactive-positive-foreground-default);
  }
  :host([flavour="negative"]) {
    --zds-button-bg: var(--interactive-destructive-background-default);
    --zds-button-border: var(--interactive-destructive-border-default);
    --zds-button-fg: var(--interactive-destructive-foreground-default);
  }
  /* subtle, outline-subtle, text and text-gradient sit on the ghost scrim
     (spec 2026-10-18): interactive/ghost/background/*, whose own alpha is
     the scrim (0 at rest, 5% hover, 10% pressed). Figma also sets a paint
     opacity on top, which squares it away (spec issue "gaps"). */
  :host([flavour="subtle"]) {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-neutral-border-default);
    --zds-button-fg: var(--interactive-neutral-foreground-default);
  }
  :host([flavour="text"]) {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--interactive-ghost-foreground-default);
  }
  :host([flavour="outline-subtle"]) {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-neutral-border-default);
    --zds-button-fg: var(--interactive-neutral-foreground-default);
  }
  :host([flavour="outline"]) {
    --zds-button-bg: var(--interactive-neutral-background-default);
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--interactive-ghost-foreground-default);
  }
  /* The gradient flavours never swap their gradient for a flat colour on
     hover or press (spec: Gradient transition) — a gradient cannot be
     interpolated to a solid fill, so that swap flickers. Instead one
     gradient three times the size of the fill holds the two stops in its
     middle third: at rest the middle third shows (start at 0%, end at 87%
     of the fill, as before); hover slides to the last third, pure end;
     press to the first, pure start. The background position is what
     transitions. */
  :host([flavour="gradient"]) {
    --zds-button-bg: linear-gradient(
      135deg,
      var(--surface-gradient-start) 0%,
      var(--surface-gradient-start) 33.333%,
      var(--surface-gradient-end) 62.333%,
      var(--surface-gradient-end) 100%
    );
    --zds-button-border: var(--interactive-primary-border-default);
    --zds-button-fg: var(--interactive-primary-foreground-default);
  }
  :host([flavour="gradient"]) button {
    background-size: 300% 300%;
    background-position: 50% 50%;
  }
  :host([flavour="text-gradient"]) {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--foreground-gradient-start);
  }
  /* text-gradient runs the same slide across the label's own text, and the
     icons take it too, since the icon follows the label. */
  :host([flavour="text-gradient"]) .label,
  :host([flavour="text-gradient"]) .icon {
    background: linear-gradient(
      90deg,
      var(--foreground-gradient-start) 0%,
      var(--foreground-gradient-start) 33.333%,
      var(--foreground-gradient-end) 66.667%,
      var(--foreground-gradient-end) 100%
    );
    background-size: 300% 100%;
    background-position: 50% 0;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: background-position 120ms ease;
  }

  /* contrast is the strongest neutral against the page;
     outline-contrast is its outline sibling. Both follow the mode. */
  :host([flavour="contrast"]) {
    --zds-button-bg: var(--interactive-inverse-background-default);
    --zds-button-border: var(--interactive-inverse-border-default);
    --zds-button-fg: var(--interactive-inverse-foreground-default);
  }
  :host([flavour="outline-contrast"]) {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-inverse-border-default);
    --zds-button-fg: var(--foreground-primary);
  }

  /* outline, outline-subtle and outline-contrast are the only flavours with a resting border */
  :host([flavour="outline"]) button,
  :host([flavour="outline-subtle"]) button,
  :host([flavour="outline-contrast"]) button {
    border-width: var(--stroke-thin);
  }

  /* ---- hover --------------------------------------------------------- */
  :host([flavour="primary"]) button:hover {
    --zds-button-bg: var(--interactive-primary-background-hover);
    --zds-button-border: var(--interactive-primary-border-hover);
  }
  :host([flavour="positive"]) button:hover {
    --zds-button-bg: var(--interactive-positive-background-hover);
    --zds-button-border: var(--interactive-positive-border-hover);
  }
  :host([flavour="negative"]) button:hover {
    --zds-button-bg: var(--interactive-destructive-background-hover);
    --zds-button-border: var(--interactive-destructive-border-hover);
  }
  :host([flavour="contrast"]) button:hover {
    --zds-button-bg: var(--interactive-inverse-background-hover);
    --zds-button-border: var(--interactive-inverse-border-hover);
  }
  /* outline-contrast steps its border and raises the ghost scrim. The ghost
     tokens carry the scrim in their own alpha, so no extra opacity. */
  :host([flavour="outline-contrast"]) button:hover {
    --zds-button-bg: var(--interactive-ghost-background-hover);
    --zds-button-border: var(--interactive-inverse-border-hover);
  }
  /* outline keeps its border and shifts a neutral background underneath. */
  :host([flavour="outline"]) button:hover {
    --zds-button-bg: var(--interactive-neutral-background-hover);
  }
  /* The scrim flavours raise the ghost background from transparent. */
  :host([flavour="subtle"]) button:hover,
  :host([flavour="text"]) button:hover,
  :host([flavour="text-gradient"]) button:hover {
    --zds-button-bg: var(--interactive-ghost-background-hover);
  }
  :host([flavour="outline-subtle"]) button:hover {
    --zds-button-bg: var(--interactive-ghost-background-hover);
    --zds-button-border: var(--interactive-neutral-border-hover);
  }
  /* Gradient flavours: slide until the end colour covers 100%. */
  :host([flavour="gradient"]) button:hover {
    background-position: 100% 100%;
  }
  :host([flavour="text-gradient"]) button:hover .label,
  :host([flavour="text-gradient"]) button:hover .icon {
    background-position: 100% 0;
  }

  /* ---- pressed ------------------------------------------------------- */
  :host([flavour="primary"]) button:active {
    --zds-button-bg: var(--interactive-primary-background-pressed);
    --zds-button-border: var(--interactive-primary-border-pressed);
  }
  :host([flavour="positive"]) button:active {
    --zds-button-bg: var(--interactive-positive-background-pressed);
    --zds-button-border: var(--interactive-positive-border-pressed);
  }
  :host([flavour="negative"]) button:active {
    --zds-button-bg: var(--interactive-destructive-background-pressed);
    --zds-button-border: var(--interactive-destructive-border-pressed);
  }
  :host([flavour="contrast"]) button:active {
    --zds-button-bg: var(--interactive-inverse-background-pressed);
    --zds-button-border: var(--interactive-inverse-border-pressed);
  }
  :host([flavour="outline-contrast"]) button:active {
    --zds-button-bg: var(--interactive-ghost-background-pressed);
    --zds-button-border: var(--interactive-inverse-border-pressed);
  }
  :host([flavour="outline"]) button:active {
    --zds-button-bg: var(--interactive-neutral-background-pressed);
  }
  :host([flavour="subtle"]) button:active,
  :host([flavour="text"]) button:active,
  :host([flavour="text-gradient"]) button:active {
    --zds-button-bg: var(--interactive-ghost-background-pressed);
  }
  :host([flavour="outline-subtle"]) button:active {
    --zds-button-bg: var(--interactive-ghost-background-pressed);
    --zds-button-border: var(--interactive-neutral-border-pressed);
  }
  /* Gradient flavours: slide the other way, until the start colour covers 100%. */
  :host([flavour="gradient"]) button:active {
    background-position: 0% 0%;
  }
  :host([flavour="text-gradient"]) button:active .label,
  :host([flavour="text-gradient"]) button:active .icon {
    background-position: 0% 0;
  }

  /* ---- focus --------------------------------------------------------- */
  /* One ring, identical on every flavour, drawn OUTSIDE the bounds so it
     replaces the resting border rather than adding to it. */
  button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
    border-color: transparent;
  }

  /* ---- disabled ------------------------------------------------------ */
  button:disabled {
    cursor: not-allowed;
    --zds-button-bg: var(--interactive-primary-background-disabled);
    --zds-button-border: var(--interactive-primary-border-disabled);
    --zds-button-fg: var(--interactive-primary-foreground-disabled);
  }
  :host([flavour="text"]) button:disabled,
  :host([flavour="text-gradient"]) button:disabled {
    --zds-button-bg: var(--interactive-ghost-background-disabled);
    --zds-button-fg: var(--interactive-ghost-foreground-disabled);
  }
  :host([flavour="text-gradient"]) button:disabled .label,
  :host([flavour="text-gradient"]) button:disabled .icon {
    background: none;
    color: var(--interactive-ghost-foreground-disabled);
  }
  :host([flavour="outline"]) button:disabled {
    --zds-button-bg: var(--interactive-neutral-background-disabled);
    --zds-button-border: var(--interactive-ghost-border-disabled);
    --zds-button-fg: var(--interactive-neutral-foreground-disabled);
  }
  :host([flavour="outline-subtle"]) button:disabled,
  :host([flavour="subtle"]) button:disabled {
    --zds-button-bg: var(--interactive-ghost-background-disabled);
    --zds-button-border: var(--interactive-neutral-border-disabled);
    --zds-button-fg: var(--interactive-neutral-foreground-disabled);
  }
  :host([flavour="contrast"]) button:disabled {
    --zds-button-bg: var(--interactive-inverse-background-disabled);
    --zds-button-border: var(--interactive-inverse-border-disabled);
    --zds-button-fg: var(--interactive-inverse-foreground-disabled);
  }
  :host([flavour="outline-contrast"]) button:disabled {
    --zds-button-bg: var(--interactive-ghost-background-disabled);
    --zds-button-border: var(--border-disabled);
    --zds-button-fg: var(--interactive-inverse-foreground-disabled);
  }
`;
