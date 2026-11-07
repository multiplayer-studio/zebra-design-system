import { css } from "lit";

/** AssistChip — every value is a semantic token. Geometry, border, focus
   ring, shape and disabled come from chip/chip-base.styles.ts; this file sets the
   chip's own size, type and colours. Sections follow the spec's anatomy and
   variant tables. Kept rule-for-rule with packages/react-baseui
   assist-chip.css.

   Overrides: --zds-assist-fg / -bg / -border are set inline from the
   foreground / background / border props and win over color and state
   (spec "Colour overrides"). Focus outline and disabled never read them.

   Spec: specs/assist-chip/assist-chip.spec.md */
export default css`

/* ---- color (neutral default): border and label; fill follows state ----- */
.zds-assist-chip {
  --zds-assist-color-fg: var(--interactive-neutral-foreground-default);
  --zds-assist-color-border: var(--interactive-neutral-border-default);
  --zds-chip-bg: var(--zds-assist-bg, var(--interactive-neutral-background-default));
  --zds-chip-border: var(--zds-assist-border, var(--zds-assist-color-border));
  --zds-chip-fg: var(--zds-assist-fg, var(--zds-assist-color-fg));
}
.zds-assist-chip[data-color="green"] {
  --zds-assist-color-fg: var(--feedback-success-foreground);
  --zds-assist-color-border: var(--border-success);
}
.zds-assist-chip[data-color="orange"] {
  --zds-assist-color-fg: var(--feedback-warning-foreground);
  --zds-assist-color-border: var(--border-warning);
}
.zds-assist-chip[data-color="blue"] {
  --zds-assist-color-fg: var(--feedback-info-foreground);
  --zds-assist-color-border: var(--border-info);
}
.zds-assist-chip[data-color="red"] {
  --zds-assist-color-fg: var(--feedback-error-foreground);
  --zds-assist-color-border: var(--border-error);
}

/* ---- root: space/3xs gap; the label frame adds space/2xs either side ---- */
.zds-assist-chip {
  gap: var(--space-3xs);
  /* spec issue "Height jumps between states": Figma is 30px at rest and 28px
     at focus and disabled because its inside border counts in layout. Built
     28px throughout with the border out of layout (chip-base.styles.ts draws it as an
     inset shadow): space/xs above and below a control/icon-sm row. */
  height: calc(var(--space-xs) * 2 + var(--control-icon-sm));
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
}
.zds-assist-chip[data-discardable] {
  cursor: default;
}

/* ---- label: indicator/medium in a frame padded space/2xs either side ---- */
.zds-assist-chip .zds-chip__label {
  padding-inline: var(--space-2xs);
  font-family: var(--indicator-medium-font-family), system-ui, sans-serif;
  font-size: var(--indicator-medium-font-size);
  font-weight: var(--indicator-medium-font-weight);
  line-height: var(--indicator-medium-line-height);
  letter-spacing: var(--indicator-medium-letter-spacing);
}

/* ---- discardable: label (action button when clickable) + remove -------- */
.zds-assist-chip__action,
.zds-assist-chip__remove {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  /* The action wraps icon + label, so it repeats the root's space/3xs gap. */
  gap: var(--space-3xs);
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
/* The glyph is 16px; widen the hit area without changing layout. */
.zds-assist-chip__remove::before {
  content: "";
  position: absolute;
  inset: calc(var(--space-xs) * -1);
}

/* ---- state ------------------------------------------------------------- */
.zds-assist-chip:hover:not([data-disabled]) {
  --zds-chip-bg: var(--zds-assist-bg, var(--interactive-neutral-background-hover));
}
.zds-assist-chip:is(:focus-visible, :has(:focus-visible)):not([data-disabled]) {
  --zds-chip-bg: var(--zds-assist-bg, var(--interactive-neutral-background-focused));
}
/* Not built: State=selected (spec issue "selected on an action chip" — an
   action does not stay selected; a sticky chip is a FilterChip), the
   single-value "active" axis (unfinished copy from Filter Chip), and
   State=dragged (belongs to a reorder interaction this chip does not own). */
`;
