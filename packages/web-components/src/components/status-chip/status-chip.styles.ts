import { css } from "lit";

/** StatusChip — every value is a semantic token. Shape comes from
   chip/chip-base.styles.ts; this file sets the chip's own size, type and fills.
   Sections follow the spec's anatomy and variant table. Kept rule-for-rule
   with packages/react-baseui status-chip.css.

   Spec: specs/status-chip/status-chip.spec.md */
export default css`

/* ---- root: hugs, space/xs x space/sm padding, radius/element-sm --------- */
.zds-status-chip {
  /* spec issue "default looks pressable": Figma fills status=default with
     interactive/neutral/background/hover, an interactive token on a chip
     that cannot be pressed. It uses the neutral feedback fill instead, the
     token Status Label uses for the same role. */
  --zds-chip-bg: var(--feedback-neutral-background-subtle);
  /* spec issue "Dead border": Figma binds interactive/neutral/border/default
     at stroke/base, which resolves to 0px, so no border ever renders. The
     intent (no visible border) is kept; --zds-chip-border stays transparent. */
  --zds-chip-border: transparent;
  --zds-chip-fg: var(--interactive-neutral-foreground-default);
  /* Figma's space/xs gap separates nothing (the label is the only child). */
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  /* This chip takes a gentler corner than the other three (spec). */
  border-radius: var(--radius-element-sm);
  cursor: default;
}

/* ---- label: body/xsmall ------------------------------------------------ */
.zds-status-chip .zds-chip__label {
  font-family: var(--body-xsmall-font-family), system-ui, sans-serif;
  font-size: var(--body-xsmall-font-size);
  font-weight: var(--body-xsmall-font-weight);
  line-height: var(--body-xsmall-line-height);
  letter-spacing: var(--body-xsmall-letter-spacing);
}

/* ---- status ------------------------------------------------------------ */
.zds-status-chip[data-status="success"] {
  --zds-chip-bg: var(--feedback-success-background-subtle);
}
.zds-status-chip[data-status="warning"] {
  --zds-chip-bg: var(--feedback-warning-background-subtle);
}
.zds-status-chip[data-status="negative"] {
  --zds-chip-bg: var(--feedback-error-background-subtle);
}
.zds-status-chip[data-status="info"] {
  --zds-chip-bg: var(--feedback-info-background-subtle);
}
`;
