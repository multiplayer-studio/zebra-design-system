import { css } from "lit";

/**
 * Every value is a semantic token. Sections follow the spec's variant,
 * emphasis and shape tables.
 *
 * Height comes out of the tokens: 24 on outlined and plain (space/xs padding,
 * body/xsmall line height), 26 on bold, whose stroke sits inside the box and
 * counts toward layout. outlined's stroke is centred on the edge, so it is
 * an outline rather than a border and adds nothing.
 *
 * Spec: specs/badges/label.spec.json
 */
export default css`
  :host {
    /* ---- variant (neutral default) ------------------------------------ */
    --zds-badge-strong: var(--foreground-secondary);
    --zds-badge-on-strong: var(--foreground-inverse);
    --zds-badge-subtle: var(--surface-subtle);
    --zds-badge-edge: var(--border-strong);
    display: inline-flex;
    vertical-align: middle;
  }
  :host([hidden]) {
    display: none;
  }
  /* Text on a strong fill as Figma binds it: borrowed button tokens on info,
     positive and negative, foreground/inverse on neutral and warning (spec
     warn "bold text"). info's edge is its strong fill, not border/info (spec
     warn "outlined border"). */
  :host([variant="info"]) {
    --zds-badge-strong: var(--feedback-info-background-strong);
    --zds-badge-on-strong: var(--interactive-primary-foreground-default);
    --zds-badge-subtle: var(--feedback-info-background-subtle);
    --zds-badge-edge: var(--feedback-info-background-strong);
  }
  :host([variant="positive"]) {
    --zds-badge-strong: var(--feedback-success-background-strong);
    --zds-badge-on-strong: var(--interactive-primary-foreground-default);
    --zds-badge-subtle: var(--feedback-success-background-subtle);
    --zds-badge-edge: var(--border-success);
  }
  :host([variant="warning"]) {
    --zds-badge-strong: var(--feedback-warning-background-strong);
    --zds-badge-on-strong: var(--foreground-inverse);
    --zds-badge-subtle: var(--feedback-warning-background-subtle);
    --zds-badge-edge: var(--border-warning);
  }
  :host([variant="negative"]) {
    --zds-badge-strong: var(--feedback-error-background-strong);
    --zds-badge-on-strong: var(--interactive-destructive-foreground-default);
    --zds-badge-subtle: var(--feedback-error-background-subtle);
    --zds-badge-edge: var(--border-error);
  }

  /* ---- emphasis: plain (tint, zero-weight stroke held as a theming hook) */
  .root {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3xs);
    padding: var(--space-2xs);
    border: var(--stroke-base) solid var(--zds-badge-edge);
    border-radius: var(--radius-element-sm);
    background: var(--zds-badge-subtle);
    color: var(--foreground-primary);
    font-family: var(--body-xsmall-font-family), system-ui, sans-serif;
    font-size: var(--body-xsmall-font-size);
    font-weight: var(--body-xsmall-font-weight);
    line-height: var(--body-xsmall-line-height);
    letter-spacing: var(--body-xsmall-letter-spacing);
    white-space: nowrap;
  }

  /* ---- emphasis: outlined (1px stroke centred on the edge) ------------- */
  .root[data-emphasis="outlined"] {
    border-width: 0;
    outline: var(--stroke-thin) solid var(--zds-badge-edge);
    outline-offset: calc(var(--stroke-thin) / -2);
  }

  /* ---- emphasis: bold (solid fill, stroke on the same token, inside) ---- */
  .root[data-emphasis="bold"] {
    border: var(--stroke-thin) solid var(--zds-badge-strong);
    background: var(--zds-badge-strong);
    color: var(--zds-badge-on-strong);
  }

  /* ---- shape ----------------------------------------------------------- */
  :host([shape="sharp"]) .root {
    border-radius: var(--radius-none);
  }
`;
