import { css } from "lit";

/* Spec: specs/card (Collapsible Card, _Container header, _Leading Icon). The default flavour has no outline; the
   gradient flavour (ai) draws a stroke/thick gradient outline, so it measures 4px larger. The chevron turns rather
   than swapping chevron-right for expand-more, whose ink sits high in its box (spec issue). */
export default css`
  :host {
    display: block;
    -webkit-tap-highlight-color: transparent;
  }

  .border {
    border-radius: var(--zebra-radius-none);
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--surface-card);
    border-radius: inherit;
  }

  :host([rounded]) .border {
    border-radius: var(--radius-sm);
  }

  :host([ai]) .border {
    padding: var(--stroke-thick);
    background: linear-gradient(135deg, var(--foreground-gradient-start), var(--foreground-gradient-end));
  }

  :host([ai][rounded]) .card {
    border-radius: calc(var(--radius-sm) - var(--stroke-thick));
  }

  .card-header {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-lg) var(--space-xl);
    color: var(--foreground-primary);
    background: var(--interactive-ghost-background-default);
    text-align: start;
  }

  button.card-header {
    cursor: pointer;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    button.card-header:hover {
      background: var(--interactive-ghost-background-hover);
    }
  }

  button.card-header:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  .chevron {
    flex: none;
    --icon-size: var(--control-icon-lg);
    --icon-color: var(--foreground-primary);
    transition: rotate var(--animations-spring);
  }

  :host([expanded]) .chevron {
    rotate: 90deg;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
    min-width: 0;
  }

  .title-container {
    display: flex;
    align-items: baseline;
  }

  .card-title,
  .required {
    margin: 0;
    font: var(--text-title-large);
    letter-spacing: var(--title-large-letter-spacing);
  }

  .required {
    color: var(--foreground-error);
  }

  .card-description {
    margin: 0;
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-secondary);
  }

  .card-description:empty {
    display: none;
  }

  /* The body is inset space/xl on three sides while shown, nothing on top. */
  .card-content-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--animations-spring);
  }

  :host([collapsible][expanded]) .card-content-wrapper,
  :host(:not([collapsible])) .card.slot-populated .card-content-wrapper {
    grid-template-rows: 1fr;
  }

  .card-content {
    overflow: hidden;
    min-height: 0;
    padding: 0 var(--space-xl);
  }

  :host([collapsible][expanded]) .card-content,
  :host(:not([collapsible])) .card.slot-populated .card-content {
    padding-bottom: var(--space-xl);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron,
    .card-content-wrapper {
      transition: none;
    }
  }
`;
