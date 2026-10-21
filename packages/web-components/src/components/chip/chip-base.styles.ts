import { css } from "lit";

/** Chip base — the geometry, border, focus ring, shape and disabled treatment
   shared by InputChip, FilterChip, AssistChip and StatusChip. Each chip keeps
   its own stylesheet for its height, padding, gap, type ramp and colours, and
   only sets the local --zds-chip-* properties consumed here.

   Kept rule-for-rule identical to packages/react-baseui
   chip/chip.css (same class names, here inside each shadow root) so the
   two packages cannot drift.

   Specs: specs/input-chip, specs/filter-chip, specs/assist-chip,
          specs/status-chip */
export default css`
:host {
  display: inline-flex;
  vertical-align: middle;
}
:host([hidden]) {
  display: none;
}


.zds-chip {
  --zds-chip-bg: transparent;
  --zds-chip-border: transparent;
  --zds-chip-fg: inherit;

  display: inline-flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  vertical-align: middle;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--zds-chip-bg);
  /* Figma's 1px inside border counts in layout while its 2px outside focus
     border does not, so the chips narrow / shorten at focus and disabled
     (input-chip, filter-chip and assist-chip issues). The border is drawn as
     an inset shadow instead: never in layout, so no state reflows. */
  box-shadow: inset 0 0 0 var(--stroke-thin) var(--zds-chip-border);
  color: var(--zds-chip-fg);
  /* font-weight tokens currently resolve to words CSS rejects (pipeline
     bug). Inheriting here makes a <button> root (UA weight) and a <span>
     root render the same in both packages. */
  font: inherit;
  text-align: start;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.zds-chip[hidden] {
  display: none;
}

/* ---- rounded --------------------------------------------------------- */
.zds-chip[data-shape="sharp"] {
  border-radius: var(--radius-none);
}

/* ---- parts ------------------------------------------------------------ */
.zds-chip__label {
  white-space: nowrap;
}
.zds-chip__glyph {
  flex: none;
}

/* ---- focus: 2px focus/outline drawn outside, replacing the border ------ */
/* :has() covers Input Chip, where the focusable element is the remove
   control inside the chip rather than the chip itself. */
.zds-chip:is(:focus-visible, :has(:focus-visible)):not([data-disabled]) {
  --zds-chip-border: transparent;
  outline: var(--stroke-thick) solid var(--focus-outline);
  outline-offset: 0;
}

/* ---- disabled: neutral disabled fill and text, no border --------------- */
.zds-chip[data-interactive][data-disabled] {
  --zds-chip-bg: var(--interactive-neutral-background-disabled);
  --zds-chip-border: transparent;
  --zds-chip-fg: var(--interactive-neutral-foreground-disabled);
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .zds-chip {
    border: var(--stroke-thin) solid CanvasText;
  }
}
`;
