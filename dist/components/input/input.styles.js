import { css } from "lit";
/**
 * The assembly: Input Label, the field, Input Hint, stacked. Every value is a
 * semantic token.
 *
 * Spec: specs/input/input.spec.json (anatomy, subcomponents.inputLabel, subcomponents.inputHint)
 */
export default css `
  :host {
    /* 280 is a tentative width, not a minimum or a fixed one (spec decision): the field never
       outgrows its container, and block fills it. */
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    inline-size: 280px;
    max-inline-size: 100%;
  }
  :host([block]) {
    inline-size: 100%;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- label (Input Label) --------------------------------------------- */
  .label {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
  }
  .name,
  .required {
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
  .name,
  .information {
    color: var(--foreground-primary);
  }
  /* The required marker holds foreground/error, also when disabled (spec). */
  .required {
    color: var(--foreground-error);
  }
  /* "(optional)" keeps foreground/secondary, also when disabled (as built). */
  .optional {
    color: var(--foreground-secondary);
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .label.disabled .name,
  .label.disabled .information {
    color: var(--foreground-disabled);
  }
  .label-contents {
    display: contents;
  }
  /* Input Label's root: the label row, then the sub label, space/xs apart. */
  .label-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }
  .sub-label {
    color: var(--foreground-secondary);
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }
  .sub-label.disabled {
    color: var(--foreground-disabled);
  }

  /* ---- hint (Input Hint): input-hint.ts, shared with Stepper Input --- */

  /* No transitions: the spec defines no motion. */
`;
