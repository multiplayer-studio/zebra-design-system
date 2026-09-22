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
    height: var(--control-sm);
    padding: var(--space-xs) var(--space-md);
    border-style: solid;
    border-width: var(--stroke-base);
    border-radius: var(--radius-none);

    /* --- type: size axis ----------------------------------------------- */
    font-family: var(--label-medium-font-family);
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
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
  }

  /* The label wrapper's own padding is what separates icon from text; the row
     itself has no gap. */
  .label {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-xs);
  }

  ::slotted(*),
  .icon {
    flex: none;
  }

  /* Button pins the icon size to the label rather than exposing it. */
  .icon {
    display: inline-flex;
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    color: currentColor;
  }

  /* ---- size ---------------------------------------------------------- */
  :host([size="medium"]) button {
    height: var(--control-md);
    padding: var(--space-xs) var(--space-md);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    font-family: var(--label-large-font-family);
  }
  :host([size="large"]) button {
    height: var(--control-lg);
    padding: var(--space-xs) var(--space-lg);
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    font-family: var(--label-large-font-family);
  }
  :host([size="medium"]) .label,
  :host([size="large"]) .label {
    padding-inline: var(--space-sm);
  }
  :host([size="medium"]) .icon,
  :host([size="large"]) .icon {
    width: var(--control-icon-md);
    height: var(--control-icon-md);
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
  :host([flavour="subtle"]) {
    --zds-button-bg: var(--interactive-neutral-background-default);
    --zds-button-border: var(--interactive-neutral-border-default);
    --zds-button-fg: var(--interactive-neutral-foreground-default);
  }
  :host([flavour="text"]) {
    --zds-button-bg: transparent;
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--interactive-ghost-foreground-default);
  }
  :host([flavour="outline-subtle"]) {
    --zds-button-bg: var(--interactive-neutral-background-default);
    --zds-button-border: var(--interactive-neutral-border-default);
    --zds-button-fg: var(--interactive-neutral-foreground-default);
  }
  :host([flavour="outline"]) {
    --zds-button-bg: var(--interactive-neutral-background-default);
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--interactive-ghost-foreground-default);
  }
  :host([flavour="gradient"]) {
    --zds-button-bg: linear-gradient(
      135deg,
      var(--surface-gradient-start) 0%,
      var(--surface-gradient-end) 87%
    );
    --zds-button-border: var(--interactive-primary-border-default);
    --zds-button-fg: var(--interactive-primary-foreground-default);
  }
  :host([flavour="text-gradient"]) {
    --zds-button-bg: transparent;
    --zds-button-border: var(--interactive-ghost-border-default);
    --zds-button-fg: var(--foreground-gradient-start);
  }
  :host([flavour="text-gradient"]) .label {
    background: linear-gradient(
      90deg,
      var(--foreground-gradient-start) 0%,
      var(--foreground-gradient-end) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* outline and outline-subtle are the only flavours with a resting border */
  :host([flavour="outline"]) button,
  :host([flavour="outline-subtle"]) button {
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
  :host([flavour="subtle"]) button:hover,
  :host([flavour="outline"]) button:hover {
    --zds-button-bg: var(--interactive-neutral-background-hover);
  }
  :host([flavour="outline-subtle"]) button:hover {
    --zds-button-bg: var(--interactive-neutral-background-hover);
    --zds-button-border: var(--interactive-neutral-border-hover);
  }
  /* Text flavours raise a ghost scrim from fully transparent. The 5% / 10%
     opacities are the component's only untokenised values — see the Button
     spec's issue 2. */
  :host([flavour="text"]) button:hover,
  :host([flavour="text-gradient"]) button:hover {
    --zds-button-bg: color-mix(in srgb, var(--interactive-neutral-foreground-default) 5%, transparent);
  }
  :host([flavour="gradient"]) button:hover {
    --zds-button-bg: var(--surface-gradient-end);
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
  :host([flavour="subtle"]) button:active,
  :host([flavour="outline"]) button:active {
    --zds-button-bg: var(--interactive-neutral-background-pressed);
  }
  :host([flavour="outline-subtle"]) button:active {
    --zds-button-bg: var(--interactive-neutral-background-pressed);
    --zds-button-border: var(--interactive-neutral-border-pressed);
  }
  :host([flavour="text"]) button:active,
  :host([flavour="text-gradient"]) button:active {
    --zds-button-bg: color-mix(in srgb, var(--interactive-neutral-foreground-default) 10%, transparent);
  }
  :host([flavour="gradient"]) button:active {
    --zds-button-bg: var(--surface-gradient-start);
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
    --zds-button-bg: transparent;
    --zds-button-fg: var(--interactive-ghost-foreground-disabled);
  }
  :host([flavour="text-gradient"]) button:disabled .label {
    background: none;
    color: var(--interactive-ghost-foreground-disabled);
  }
  :host([flavour="outline"]) button:disabled,
  :host([flavour="outline-subtle"]) button:disabled,
  :host([flavour="subtle"]) button:disabled {
    --zds-button-bg: var(--interactive-neutral-background-disabled);
    --zds-button-border: var(--interactive-neutral-border-disabled);
    --zds-button-fg: var(--interactive-neutral-foreground-disabled);
  }
`;
