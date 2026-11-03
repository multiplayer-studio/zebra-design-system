import { css } from "lit";

/* Spec: specs/accordion (Accordion Item, Accordion Header). The header is a ghost surface. */
export default css`
  :host {
    display: block;
    color: var(--foreground-primary);
    -webkit-tap-highlight-color: transparent;
  }

  .row {
    display: flex;
    align-items: stretch;
    margin: 0;
    font-family: var(--title-medium-font-family);
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
  }

  /* State fills belong to the header surface, edge to edge (spec: Accordion Header, hover). The row's own buttons
     are transparent targets. The leading Icon Button keeps its own states, layered on the lifted header. */
  .accordion-item-header {
    /* flow-root keeps the header actions' bottom margin inside the header, so the fill covers it. */
    display: flow-root;
    background-color: var(--interactive-ghost-background-default);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    .accordion-item-header:hover {
      background-color: var(--interactive-ghost-background-hover);
    }
  }

  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    color: inherit;
  }

  button:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }

  /* Plain trigger: one target across the row, the caret trailing the title. */
  .title-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: calc(var(--control-md) + 2 * var(--space-sm));
    padding: var(--space-sm) var(--space-lg);
  }

  /* Selectable header: the leading control sits in the row's padding, so the title starts after it. */
  :host([selectable]) .row {
    gap: var(--space-xxs);
    padding: var(--space-sm);
  }

  :host([selectable]) .title-wrapper {
    min-height: var(--control-md);
    padding: 0 var(--space-sm);
  }

  /* Leading control: a subtle, medium Icon Button, with its own fill and states. */
  .chevron-wrapper {
    flex: none;
  }

  .title {
    flex: 1;
    text-align: start;
  }

  zeta-icon {
    flex: none;
    --icon-color: currentColor;
  }

  .chevron-wrapper::part(icon),
  zeta-icon.expand {
    transition: rotate var(--animations-spring);
  }

  :host([expanded]) .chevron-wrapper::part(icon) {
    rotate: 90deg;
  }

  :host([expanded]) zeta-icon.expand {
    rotate: 180deg;
  }

  /* Content: grows from 0fr so the panel eases open without a measured height. */
  .body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--animations-spring);
  }

  .body:not([hidden]) {
    grid-template-rows: 1fr;
  }

  .body[hidden] {
    display: grid;
  }

  .body-content {
    overflow: hidden;
    min-height: 0;
    font-family: var(--body-medium-font-family);
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  .body:not([hidden]) .body-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }

  .body[hidden] .body-content {
    visibility: hidden;
  }

  :host([navigation]) .body {
    display: none;
  }

  ::slotted([slot="header"]) {
    margin: 0 var(--space-lg) var(--space-lg);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron-wrapper::part(icon),
    zeta-icon.expand,
    .body {
      transition: none;
    }
  }
`;
