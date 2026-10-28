import { css } from "lit";

/**
 * The assembly: Input Label, the field, Input Hint, stacked. Every value is a
 * semantic token.
 *
 * Spec: specs/input/input.spec.json (anatomy, subcomponents.inputLabel, subcomponents.inputHint)
 */
export default css`
  :host {
    /* Width is the container's (spec decision: Figma's 280 is tentative). */
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- label (Input Label) --------------------------------------------- */
  .label {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
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

  /* ---- hint (Input Hint): input-hint.ts, shared with Stepper Input --- */

  /* No transitions: the spec defines no motion. */
`;
