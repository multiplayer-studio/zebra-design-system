import { css } from "lit";

/** FilterChip — every value is a semantic token. Geometry, border, focus
   ring, shape and the inactive disabled treatment come from chip/chip-base.styles.ts;
   this file sets the chip's own size, type and colours. Sections follow the
   spec's anatomy and variant table. Kept rule-for-rule with
   packages/react-baseui filter-chip.css.

   Spec: specs/filter-chip/filter-chip.spec.md */
export default css`

/* ---- root -------------------------------------------------------------- */
.zds-filter-chip {
  --zds-chip-bg: var(--interactive-neutral-background-default);
  --zds-chip-border: var(--interactive-neutral-border-default);
  --zds-chip-fg: var(--interactive-neutral-foreground-default);
  gap: var(--space-xs);
  /* spec issue "Height is raw": Figma fixes the chip at 32px with no token.
     The nearest control token is used — control/sm (36px); control/xs is
     24px. The 4px gap stays open until design adds a 32px control token.
     A fixed height also means the active variant's tighter vertical padding
     (space/xs vs space/sm) changes nothing, so only the inline padding is
     set. */
  height: var(--control-sm);
  padding: 0 var(--space-md);
  cursor: pointer;
}

/* ---- label: indicator/medium ------------------------------------------- */
.zds-filter-chip .zds-chip__label {
  font-family: var(--indicator-medium-font-family), system-ui, sans-serif;
  font-size: var(--indicator-medium-font-size);
  font-weight: var(--indicator-medium-font-weight);
  line-height: var(--indicator-medium-line-height);
  letter-spacing: var(--indicator-medium-letter-spacing);
}

/* ---- state (active=false) ---------------------------------------------- */
.zds-filter-chip:hover:not([data-disabled]) {
  --zds-chip-bg: var(--interactive-neutral-background-hover);
}
.zds-filter-chip:focus-visible:not([data-disabled]) {
  --zds-chip-bg: var(--interactive-neutral-background-focused);
}
/* State=selected is not built: it overlaps "active" (spec issue "selected
   overlaps active"; the metadata says prefer active). State=dragged belongs
   to a reorder interaction this chip does not own. */

/* ---- active=true: inverse palette, space/sm gap (the check mark is
   rendered only while active) ------------------------------------------ */
.zds-filter-chip[data-pressed] {
  --zds-chip-bg: var(--interactive-inverse-background-selected);
  --zds-chip-border: var(--interactive-inverse-border-pressed);
  --zds-chip-fg: var(--interactive-inverse-foreground-default);
  gap: var(--space-sm);
}
/* spec issue "Missing combinations": Figma draws an active chip only at
   default and focus. Hover and disabled follow the inverse family's own
   tokens so an active chip still answers the pointer and can be locked. */
.zds-filter-chip[data-pressed]:hover:not([data-disabled]) {
  --zds-chip-bg: var(--interactive-inverse-background-hover);
  --zds-chip-border: var(--interactive-inverse-border-hover);
}
.zds-filter-chip[data-pressed]:focus-visible:not([data-disabled]) {
  --zds-chip-bg: var(--interactive-inverse-background-selected);
}
.zds-filter-chip[data-pressed][data-disabled] {
  --zds-chip-bg: var(--interactive-inverse-background-disabled);
  --zds-chip-fg: var(--interactive-inverse-foreground-disabled);
}
`;
