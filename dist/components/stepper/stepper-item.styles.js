import { css } from "lit";
/* Step parts from the Stepper spec: Step / Horizontal, Step / Vertical, Step Card and Step Segment, picked by the
 * `kind` the parent zeta-stepper sets. Colour runs through one private property per role, set once per status.
 * border/default, border/subtle and radius/none are bound through their --zebra- aliases (tokens.md). */
export default css `
  :host {
    --_indicator-bg: var(--interactive-neutral-background-default);
    --_indicator-border: var(--zebra-border-default);
    --_indicator-fg: var(--foreground-primary);
    --_label: var(--foreground-tertiary);
    --_subtitle: var(--foreground-tertiary);
    --_line: var(--zebra-border-default);
    --_card-bg: var(--surface-card);
    --_card-border: var(--zebra-border-default);
    /* Partial draws dashed. No token exists for a dash pattern (spec issue). */
    --_dash: solid;
    display: flex;
    box-sizing: border-box;
    min-inline-size: 0;
    -webkit-tap-highlight-color: transparent;
  }
  :host([hidden]) {
    display: none;
  }

  /* Status. The glyph has no colour in Figma; it draws white on the solid fill, the on-primary foreground. */
  :host([status="complete"]) {
    --_indicator-bg: var(--feedback-success-background-strong);
    --_indicator-border: var(--feedback-success-background-strong);
    --_indicator-fg: var(--interactive-primary-foreground-default);
    --_line: var(--border-success);
    --_card-bg: var(--feedback-success-background-subtle);
    --_card-border: var(--border-success);
  }
  :host([status="active"]) {
    --_indicator-bg: var(--interactive-primary-background-default);
    --_indicator-border: var(--interactive-primary-background-default);
    --_indicator-fg: var(--interactive-primary-foreground-default);
    --_label: var(--foreground-primary);
    --_card-bg: var(--surface-brand);
    --_card-border: var(--interactive-primary-border-default);
  }
  :host([status="partial"]) {
    --_indicator-bg: var(--feedback-success-background-subtle);
    --_indicator-border: var(--border-success);
    --_line: var(--border-success);
    --_dash: dashed;
  }
  :host([status="error"]) {
    --_indicator-bg: var(--feedback-error-background-strong);
    --_indicator-border: var(--feedback-error-background-strong);
    --_indicator-fg: var(--interactive-primary-foreground-default);
    --_label: var(--foreground-error);
    --_card-border: var(--border-error);
  }
  :host([status="disabled"]) {
    --_indicator-bg: var(--zebra-border-subtle);
    --_indicator-border: var(--zebra-border-subtle);
    --_indicator-fg: var(--foreground-disabled);
    --_label: var(--foreground-disabled);
    --_subtitle: var(--foreground-disabled);
    --_card-border: var(--zebra-border-subtle);
  }

  /* Indicator */
  .indicator {
    position: relative;
    display: grid;
    flex: none;
    place-items: center;
    box-sizing: border-box;
    inline-size: var(--control-icon-lg);
    block-size: var(--control-icon-lg);
    border: var(--stroke-thick) var(--_dash) var(--_indicator-border);
    border-radius: var(--radius-pill);
    background: var(--_indicator-bg);
    color: var(--_indicator-fg);
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    --icon-color: var(--_indicator-fg);
  }
  /* Legacy editing marker, kept from the old item: not in the spec. */
  .edit {
    position: absolute;
    inset-block-end: calc(var(--space-2xs) * -1);
    inset-inline-end: calc(var(--space-2xs) * -1);
    border-radius: var(--radius-pill);
    background: var(--surface-card);
    --icon-color: var(--foreground-secondary);
  }

  /* Text: label, subtitle, and the status in words */
  .text {
    display: flex;
    flex-direction: column;
    min-inline-size: 0;
    padding: var(--space-3xs) 0 0;
    text-align: start;
  }
  .label {
    color: var(--_label);
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
  }
  .subtitle {
    color: var(--_subtitle);
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .sr {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  /* With selectable the text is a button. No hover is designed; focus gets the ring. */
  button.text {
    margin: 0;
    border: 0;
    border-radius: var(--radius-xs);
    background: none;
    font: inherit;
    cursor: pointer;
  }
  button.text:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--space-3xs);
  }
  .line {
    display: block;
    box-sizing: border-box;
  }

  /* Step / Horizontal: label centred under the indicator */
  :host([kind="horizontal"]) {
    flex: 1 1 0;
    padding-block: var(--space-2xs);
  }
  :host([kind="horizontal"]:not([has-line])) {
    flex: none;
  }
  :host([kind="horizontal"]) .head {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    inline-size: var(--control-icon-lg);
  }
  /* The text is centred on a head as wide as the indicator, and overflows it on both sides by design. */
  :host([kind="horizontal"]) .text {
    align-items: center;
    text-align: center;
    white-space: nowrap;
  }
  :host([kind="horizontal"]) .track {
    display: flex;
    flex: 1 1 0;
    align-items: center;
    min-inline-size: 0;
    block-size: var(--control-icon-lg);
  }
  :host([kind="horizontal"]) .line {
    inline-size: 100%;
    border-block-start: var(--stroke-thick) var(--_dash) var(--_line);
  }

  /* Step / Vertical: label beside the indicator, line dropping below */
  :host([kind="vertical"]) {
    gap: var(--space-xl);
  }
  :host([kind="vertical"]) .rail {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
  }
  /* Shortest line is space/xl: Figma draws it at a raw 22px with no token (spec issue). */
  :host([kind="vertical"]) .line {
    flex: 1 0 auto;
    min-block-size: var(--space-xl);
    border-inline-start: var(--stroke-thick) var(--_dash) var(--_line);
  }
  :host(:is([kind="vertical"], [kind="card"])) .text {
    flex: 1 1 0;
  }

  /* Step Card: a bordered surface. Cards take a stronger label than the rail steps. */
  :host([kind="card"]) {
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border: var(--stroke-thin) solid var(--_card-border);
    border-radius: var(--zebra-radius-none);
    background: var(--_card-bg);
  }
  :host([kind="card"]:is([status="default"], [status="complete"], [status="partial"])) {
    --_label: var(--foreground-secondary);
  }
  :host([kind="card"][shape="rounded"]) {
    border-radius: var(--radius-sm);
  }

  /* Step Segment: one division of the compact bar, the two halves as one background. */
  :host([kind="segment"]) {
    --_segment-start: var(--zebra-border-subtle);
    --_segment-end: var(--zebra-border-subtle);
    flex: 1 1 0;
    block-size: var(--space-2xs);
    border-radius: var(--radius-pill);
    background: linear-gradient(to right, var(--_segment-start) 50%, var(--_segment-end) 50%);
  }
  :host([kind="segment"]:dir(rtl)) {
    background: linear-gradient(to left, var(--_segment-start) 50%, var(--_segment-end) 50%);
  }
  :host([kind="segment"]:is([status="complete"], [status="active"])) {
    --_segment-start: var(--interactive-primary-background-default);
    --_segment-end: var(--interactive-primary-background-default);
  }
  :host([kind="segment"][status="partial"]) {
    --_segment-start: var(--interactive-primary-background-default);
  }
  :host([kind="segment"][status="error"]) {
    --_segment-start: var(--foreground-error);
    --_segment-end: var(--foreground-error);
  }
`;
//# sourceMappingURL=stepper-item.styles.js.map