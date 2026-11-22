/**
 * Every value here is a semantic token from the generated CSS layer, so an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes the bar with no
 * re-render. The metadata calls the gap, radius, stroke and size "not token
 * bound"; they are (spec warn), and are bound here.
 *
 * Sections follow the spec: root, then the shared square (_controls and
 * _indicators), the Outline × Rounded variant table, then the state table.
 * Colour is routed through three local custom properties, set per state and
 * consumed once on the button.
 *
 * Colour-only 120ms transitions match Button (the spec defines no motion of
 * its own, and the two sit side by side in tables and toolbars).
 *
 * Spec: specs/pagination/pagination.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=pagination.styles.d.ts.map