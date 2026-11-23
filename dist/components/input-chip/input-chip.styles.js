import { css } from "lit";
/** InputChip — every value is a semantic token. Geometry, border, focus ring,
   shape and disabled come from chip/chip-base.styles.ts; this file sets the chip's own
   size, type and colours. Sections follow the spec's anatomy and variant
   table. Kept rule-for-rule with packages/react-baseui
   input-chip.css.

   Spec: specs/input-chip/input-chip.spec.md */
export default css `

/* ---- root: control/target-min tall, space/sm gap, space/xs x space/sm pad */
.zds-input-chip {
  --zds-chip-bg: var(--interactive-ghost-background-default);
  --zds-chip-border: var(--interactive-neutral-border-default);
  --zds-chip-fg: var(--interactive-neutral-foreground-default);
  gap: var(--space-sm);
  /* spec issue: control/target-min's description says 44px; it resolves to
     40px, which is what Figma draws. */
  height: var(--control-target-min);
  padding: var(--space-2xs) var(--space-sm);
}

/* ---- avatar: Avatar xxxsmall (24) with status, ring and close off ------- */
.zds-input-chip__avatar {
  flex: none;
}

/* ---- label: label/medium ---------------------------------------------- */
.zds-input-chip .zds-chip__label {
  font-family: var(--label-medium-font-family), system-ui, sans-serif;
  font-size: var(--label-medium-font-size);
  font-weight: var(--label-medium-font-weight);
  line-height: var(--label-medium-line-height);
  letter-spacing: var(--label-medium-letter-spacing);
}

/* ---- remove control: Icon close, small (16), currentColor -------------- */
.zds-input-chip__remove {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  /* The chip draws the focus ring around itself (:has(:focus-visible)). */
  outline: none;
}
/* The glyph is 16px; widen the hit area to 24px (WCAG 2.5.8) without
   changing layout — space/xs on each side. */
.zds-input-chip__remove::before {
  content: "";
  position: absolute;
  inset: calc(var(--space-2xs) * -1);
}

/* ---- state: hover ------------------------------------------------------ */
/* spec issue "Hover is effectively invisible": Figma multiplies a 5% paint
   opacity onto interactive/ghost/background/hover, which is already a 5%
   alpha colour. The token is used alone here. */
.zds-input-chip:hover:not([data-disabled]) {
  --zds-chip-bg: var(--interactive-ghost-background-hover);
}

/* ---- state: focus (ring and border swap in chip.css) ------------------- */
.zds-input-chip:has(:focus-visible):not([data-disabled]) {
  --zds-chip-bg: var(--interactive-ghost-background-focused);
}
`;
