import { css } from "lit";

/* Spec: specs/badges/label. Colour runs through --_bg, --_border and --_fg so the three forms share one layout. */
export default css`
  :host {
    width: fit-content;
    display: inline-block;
  }

  .container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3xs);
    padding: var(--space-2xs);
    white-space: nowrap;
    width: fit-content;
    background: var(--_bg);
    color: var(--_fg);
    border-radius: var(--zebra-radius-none);
    font-family: var(--body-xsmall-font-family);
    font-size: var(--body-xsmall-font-size);
    font-weight: var(--body-xsmall-font-weight);
    line-height: var(--body-xsmall-line-height);
    letter-spacing: var(--body-xsmall-letter-spacing);
  }

  :host([rounded]) .container {
    border-radius: var(--radius-element-sm);
  }

  /* Bold: a solid fill, with a stroke of the same colour inside and in layout. */
  :host([bold]) .container {
    border: var(--stroke-thin) solid var(--_bg);
    --_bg: var(--foreground-secondary);
    --_fg: var(--foreground-inverse);
  }
  :host([bold][status="info"]) .container {
    --_bg: var(--feedback-info-background-strong);
    --_fg: var(--interactive-primary-foreground-default);
  }
  :host([bold][status="positive"]) .container {
    --_bg: var(--feedback-success-background-strong);
    --_fg: var(--interactive-primary-foreground-default);
  }
  :host([bold][status="warning"]) .container {
    --_bg: var(--feedback-warning-background-strong);
    --_fg: var(--foreground-inverse);
  }
  :host([bold][status="negative"]) .container {
    --_bg: var(--feedback-error-background-strong);
    --_fg: var(--interactive-destructive-foreground-default);
  }

  /* Outlined and plain: a tint with primary text. The stroke is centred on the edge, so it adds no height, and sits at
     stroke/base (zero) on the plain form as a theming hook. */
  :host(:not([bold])) .container {
    --_bg: var(--surface-subtle);
    --_border: var(--border-strong);
    --_fg: var(--foreground-primary);
    outline: var(--stroke-base) solid var(--_border);
    outline-offset: calc(var(--stroke-base) / -2);
  }
  :host(:not([bold])[outlined]) .container {
    outline-width: var(--stroke-thin);
    outline-offset: calc(var(--stroke-thin) / -2);
  }
  :host(:not([bold])[status="info"]) .container {
    --_bg: var(--feedback-info-background-subtle);
    --_border: var(--feedback-info-background-strong);
  }
  :host(:not([bold])[status="positive"]) .container {
    --_bg: var(--feedback-success-background-subtle);
    --_border: var(--border-success);
  }
  :host(:not([bold])[status="warning"]) .container {
    --_bg: var(--feedback-warning-background-subtle);
    --_border: var(--zebra-border-warning);
  }
  :host(:not([bold])[status="negative"]) .container {
    --_bg: var(--feedback-error-background-subtle);
    --_border: var(--border-error);
  }
`;
