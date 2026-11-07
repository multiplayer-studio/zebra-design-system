import { css } from "lit";

/* Every value is a Zebra token (src/generated/zebra-tokens), from specs/button. Colour runs through --_button-bg,
   --_button-border and --_button-fg so one rule per flavour and state sets all three. The documented overrides
   (--flavor-background-color, --flavor-disabled-background-color, --icon-button-icon-color and
   --icon-button-icon-color-disabled) still win where they did when this used the Flavored mixin. */
export default css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
  }

  /* ---- geometry and type: size axis (small) ---- */
  :host > button {
    box-sizing: border-box;
    gap: var(--space-none);
    height: var(--control-sm);
    padding: var(--space-2xs) var(--space-md);
    border-style: solid;
    border-width: var(--stroke-base);
    border-radius: var(--zebra-radius-none);
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    --icon-size: var(--control-icon-sm);
    --icon-color: var(--icon-button-icon-color, var(--_button-fg));
    background: var(--flavor-background-color, var(--_button-bg));
    border-color: var(--_button-border);
    color: var(--_button-fg);
    /* Colour only: the spec records no scale, shadow or elevation change on any flavour. */
    transition:
      background-color 120ms ease,
      background-position 120ms ease,
      border-color 120ms ease,
      color 120ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    :host > button,
    :host .label,
    :host > button zeta-icon {
      transition: none;
    }
  }

  /* The label wrapper's own padding separates icon from text; the row has no gap. */
  .label {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-2xs);
  }

  /* :host([size]) so it outranks base-button.styles.js's per-size icon rules (Size always reflects a size). */
  :host([size]) > button zeta-icon {
    flex: none;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  :host([size="medium"]) > button,
  :host([size="large"]) > button {
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-size: var(--label-large-font-size);
    font-weight: var(--label-large-font-weight);
    line-height: var(--label-large-line-height);
    letter-spacing: var(--label-large-letter-spacing);
    --icon-size: var(--control-icon-md);
  }
  /* Restated for small so it outranks base-button.styles.js's own small rule. */
  :host([size="small"]) > button {
    height: var(--control-sm);
    padding: var(--space-2xs) var(--space-md);
    gap: var(--space-none);
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
  :host([size="medium"]) > button {
    height: var(--control-md);
    padding: var(--space-2xs) var(--space-md);
  }
  :host([size="large"]) > button {
    height: var(--control-lg);
    padding: var(--space-2xs) var(--space-lg);
  }
  :host([size="medium"]) .label,
  :host([size="large"]) .label {
    padding-inline: var(--space-sm);
  }

  /* ---- shape ---- */
  :host([shape="sharp"]) > button {
    border-radius: var(--zebra-radius-none);
  }
  :host([shape="rounded"]) > button {
    border-radius: var(--radius-element-sm);
  }
  :host([shape="full"]) > button {
    border-radius: var(--radius-pill);
  }

  /* ---- flavour: resting ---- */
  :host > button,
  :host([flavor="primary"]) > button {
    --_button-bg: var(--interactive-primary-background-default);
    --_button-border: var(--interactive-primary-border-default);
    --_button-fg: var(--interactive-primary-foreground-default);
  }
  :host([flavor="positive"]) > button {
    --_button-bg: var(--interactive-positive-background-default);
    --_button-border: var(--interactive-positive-border-default);
    --_button-fg: var(--interactive-positive-foreground-default);
  }
  :host([flavor="negative"]) > button {
    --_button-bg: var(--interactive-destructive-background-default);
    --_button-border: var(--interactive-destructive-border-default);
    --_button-fg: var(--interactive-destructive-foreground-default);
  }
  /* subtle, outline-subtle, text and text-gradient sit on the ghost scrim, whose own alpha is the scrim
     (spec issue "gaps": Figma also sets a paint opacity on top). */
  :host([flavor="subtle"]) > button,
  :host([flavor="outline-subtle"]) > button {
    --_button-bg: var(--interactive-ghost-background-default);
    --_button-border: var(--interactive-neutral-border-default);
    --_button-fg: var(--interactive-neutral-foreground-default);
  }
  :host([flavor="text"]) > button {
    --_button-bg: var(--interactive-ghost-background-default);
    --_button-border: var(--interactive-ghost-border-default);
    --_button-fg: var(--interactive-ghost-foreground-default);
  }
  :host([flavor="outline"]) > button {
    --_button-bg: var(--interactive-neutral-background-default);
    --_button-border: var(--interactive-ghost-border-default);
    --_button-fg: var(--interactive-ghost-foreground-default);
  }
  /* The gradient flavours never swap the gradient for a flat colour (spec: Gradient transition). One gradient three
     times the fill's size holds both stops in its middle third; hover slides to the end colour, press to the start. */
  :host([flavor="gradient"]) > button {
    --_button-bg: linear-gradient(
      135deg,
      var(--surface-gradient-start) 0%,
      var(--surface-gradient-start) 33.333%,
      var(--surface-gradient-end) 62.333%,
      var(--surface-gradient-end) 100%
    );
    --_button-border: var(--interactive-primary-border-default);
    --_button-fg: var(--interactive-primary-foreground-default);
    background-size: 300% 300%;
    background-position: 50% 50%;
  }
  :host([flavor="text-gradient"]) > button {
    --_button-bg: var(--interactive-ghost-background-default);
    --_button-border: var(--interactive-ghost-border-default);
    --_button-fg: var(--foreground-gradient-start);
  }
  /* text-gradient runs the same slide across the label's own text, and the icons take it too. */
  :host([flavor="text-gradient"]) .label,
  :host([flavor="text-gradient"]) > button zeta-icon {
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
    --icon-color: transparent;
    transition: background-position 120ms ease;
  }
  /* contrast is the strongest neutral against the page; outline-contrast is its outline
     sibling. Both follow the mode. */
  :host([flavor="contrast"]) > button {
    --_button-bg: var(--interactive-inverse-background-default);
    --_button-border: var(--interactive-inverse-border-default);
    --_button-fg: var(--interactive-inverse-foreground-default);
  }
  :host([flavor="outline-contrast"]) > button {
    --_button-bg: var(--interactive-ghost-background-default);
    --_button-border: var(--interactive-inverse-border-default);
    --_button-fg: var(--foreground-primary);
  }
  /* outline, outline-subtle and outline-contrast are the only flavours with a resting border. */
  :host([flavor="outline"]) > button,
  :host([flavor="outline-subtle"]) > button,
  :host([flavor="outline-contrast"]) > button {
    border-width: var(--stroke-thin);
  }

  /* ---- hover ---- */
  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host([flavor="primary"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-primary-background-hover);
      --_button-border: var(--interactive-primary-border-hover);
    }
    :host([flavor="positive"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-positive-background-hover);
      --_button-border: var(--interactive-positive-border-hover);
    }
    :host([flavor="negative"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-destructive-background-hover);
      --_button-border: var(--interactive-destructive-border-hover);
    }
    :host([flavor="contrast"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-inverse-background-hover);
      --_button-border: var(--interactive-inverse-border-hover);
    }
    :host([flavor="outline-contrast"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-ghost-background-hover);
      --_button-border: var(--interactive-inverse-border-hover);
    }
    /* outline keeps its border and shifts a neutral background underneath. */
    :host([flavor="outline"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-neutral-background-hover);
    }
    :host([flavor="subtle"]:not([disabled])) > button:hover,
    :host([flavor="text"]:not([disabled])) > button:hover,
    :host([flavor="text-gradient"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-ghost-background-hover);
    }
    :host([flavor="outline-subtle"]:not([disabled])) > button:hover {
      --_button-bg: var(--interactive-ghost-background-hover);
      --_button-border: var(--interactive-neutral-border-hover);
    }
    :host([flavor="gradient"]:not([disabled])) > button:hover {
      background-position: 100% 100%;
    }
    :host([flavor="text-gradient"]:not([disabled])) > button:hover .label,
    :host([flavor="text-gradient"]:not([disabled])) > button:hover zeta-icon {
      background-position: 100% 0;
    }
  }

  /* ---- pressed ---- */
  :host([flavor="primary"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-primary-background-pressed);
    --_button-border: var(--interactive-primary-border-pressed);
  }
  :host([flavor="positive"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-positive-background-pressed);
    --_button-border: var(--interactive-positive-border-pressed);
  }
  :host([flavor="negative"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-destructive-background-pressed);
    --_button-border: var(--interactive-destructive-border-pressed);
  }
  :host([flavor="contrast"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-inverse-background-pressed);
    --_button-border: var(--interactive-inverse-border-pressed);
  }
  :host([flavor="outline-contrast"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-ghost-background-pressed);
    --_button-border: var(--interactive-inverse-border-pressed);
  }
  :host([flavor="outline"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-neutral-background-pressed);
  }
  :host([flavor="subtle"]:not([disabled])) > button:active,
  :host([flavor="text"]:not([disabled])) > button:active,
  :host([flavor="text-gradient"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-ghost-background-pressed);
  }
  :host([flavor="outline-subtle"]:not([disabled])) > button:active {
    --_button-bg: var(--interactive-ghost-background-pressed);
    --_button-border: var(--interactive-neutral-border-pressed);
  }
  :host([flavor="gradient"]:not([disabled])) > button:active {
    background-position: 0% 0%;
  }
  :host([flavor="text-gradient"]:not([disabled])) > button:active .label,
  :host([flavor="text-gradient"]:not([disabled])) > button:active zeta-icon {
    background-position: 0% 0;
  }

  /* ---- focus: one ring on every flavour, outside the bounds, replacing the resting border ---- */
  :host > button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
    border-color: transparent;
  }

  /* ---- disabled ---- */
  :host([disabled]) > button {
    cursor: not-allowed;
    --_button-bg: var(--interactive-primary-background-disabled);
    --_button-border: var(--interactive-primary-border-disabled);
    --_button-fg: var(--interactive-primary-foreground-disabled);
    background: var(--flavor-disabled-background-color, var(--_button-bg));
    color: var(--_button-fg);
    --icon-color: var(--icon-button-icon-color-disabled, var(--_button-fg));
  }
  :host([disabled][flavor="text"]) > button,
  :host([disabled][flavor="text-gradient"]) > button {
    --_button-bg: var(--interactive-ghost-background-disabled);
    --_button-fg: var(--interactive-ghost-foreground-disabled);
  }
  :host([disabled][flavor="text-gradient"]) .label,
  :host([disabled][flavor="text-gradient"]) > button zeta-icon {
    background: none;
    color: var(--interactive-ghost-foreground-disabled);
    --icon-color: var(--interactive-ghost-foreground-disabled);
  }
  :host([disabled][flavor="outline"]) > button {
    --_button-bg: var(--interactive-neutral-background-disabled);
    --_button-border: var(--interactive-ghost-border-disabled);
    --_button-fg: var(--interactive-neutral-foreground-disabled);
  }
  :host([disabled][flavor="outline-subtle"]) > button,
  :host([disabled][flavor="subtle"]) > button {
    --_button-bg: var(--interactive-ghost-background-disabled);
    --_button-border: var(--interactive-neutral-border-disabled);
    --_button-fg: var(--interactive-neutral-foreground-disabled);
  }
  :host([disabled][flavor="contrast"]) > button {
    --_button-bg: var(--interactive-inverse-background-disabled);
    --_button-border: var(--interactive-inverse-border-disabled);
    --_button-fg: var(--interactive-inverse-foreground-disabled);
  }
  /* --border-disabled is one of the nine names the legacy tokens also define, so it resolves to the legacy value
     until that set is retired (see .claude/skills/zeta-web-components/references/tokens.md). */
  :host([disabled][flavor="outline-contrast"]) > button {
    --_button-bg: var(--interactive-ghost-background-disabled);
    --_button-border: var(--zebra-border-disabled);
    --_button-fg: var(--interactive-inverse-foreground-disabled);
  }
`;
