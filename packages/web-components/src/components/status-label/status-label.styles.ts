import { css } from "lit";

/**
 * Every value is a semantic token. Sections follow the spec's status,
 * leading and shape tables.
 *
 * Spec: specs/badges/status-label.spec.json
 */
export default css`
  :host {
    /* ---- status (neutral default) ------------------------------------- */
    --zds-status-fill: var(--feedback-neutral-background-subtle);
    --zds-status-border: var(--border-default);
    --zds-status-lead: var(--foreground-primary);
    display: inline-flex;
    vertical-align: middle;
  }
  :host([hidden]) {
    display: none;
  }
  :host([status="info"]) {
    --zds-status-fill: var(--feedback-info-background-subtle);
    --zds-status-border: var(--border-info);
    --zds-status-lead: var(--foreground-info);
  }
  :host([status="positive"]) {
    --zds-status-fill: var(--feedback-success-background-subtle);
    --zds-status-border: var(--border-success);
    --zds-status-lead: var(--foreground-success);
  }
  :host([status="warning"]) {
    --zds-status-fill: var(--feedback-warning-background-subtle);
    --zds-status-border: var(--border-warning);
    --zds-status-lead: var(--foreground-warning);
  }
  :host([status="negative"]) {
    --zds-status-fill: var(--feedback-error-background-subtle);
    --zds-status-border: var(--border-error);
    --zds-status-lead: var(--foreground-error);
  }

  /* ---- surround ------------------------------------------------------ */
  .root {
    display: inline-flex;
    align-items: center;
    gap: var(--space-none);
    padding: var(--space-xs);
    border: var(--stroke-thin) solid var(--zds-status-border);
    border-radius: var(--radius-pill);
    background: var(--zds-status-fill);
  }

  /* ---- leading: a control/icon-sm box with a control/icon-xs dot, or an
     Icon at Size=small, in the status colour --------------------------- */
  .lead {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    inline-size: var(--control-icon-sm);
    block-size: var(--control-icon-sm);
    color: var(--zds-status-lead);
  }
  .dot {
    inline-size: var(--control-icon-xs);
    block-size: var(--control-icon-xs);
    border-radius: var(--radius-pill);
    background: currentColor;
  }

  /* ---- label: body/small, foreground/primary at every status ----------- */
  .label {
    padding-inline: var(--space-xs);
    color: var(--foreground-primary);
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    white-space: nowrap;
  }

  /* ---- shape ----------------------------------------------------------- */
  :host([shape="sharp"]) .root {
    border-radius: var(--radius-none);
  }
`;
