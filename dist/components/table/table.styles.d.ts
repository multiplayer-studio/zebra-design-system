/**
 * Every value here is a semantic token from the generated CSS layer. No fixed
 * width: the spec's 979px is a Figma sample, so the table takes its
 * container's width and scrolls horizontally inside it when the columns need
 * more. Controls bar and footer hug their content (spec warn: the "fixed 60px"
 * in the metadata is a measurement, both hug in the file); data cells have no
 * fixed height for the same reason (the 60px there is untokened).
 *
 * The file follows the spec's subcomponents top to bottom: Table Controls,
 * Table Content (_Header Cell, _Label, _Sort, _Data Cell, _Avatar and text,
 * _Select Cell, _Actions Cell, _Empty Row, frozen columns, resizing, vertical
 * scroll), Table Footer, then the parts that float: _Table Menu and the
 * truncation tooltip.
 *
 * No transitions: the spec defines no motion.
 *
 * Spec: specs/table/table.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=table.styles.d.ts.map