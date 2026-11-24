/** Chip base — the geometry, border, focus ring, shape and disabled treatment
   shared by InputChip, FilterChip and AssistChip. Each chip keeps
   its own stylesheet for its height, padding, gap, type ramp and colours, and
   only sets the local --zds-chip-* properties consumed here.

   Kept rule-for-rule identical to packages/react-baseui
   chip/chip.css (same class names, here inside each shadow root) so the
   two packages cannot drift.

   Specs: specs/input-chip, specs/filter-chip, specs/assist-chip */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=chip-base.styles.d.ts.map