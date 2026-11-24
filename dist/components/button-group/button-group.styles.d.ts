/**
 * Every value here is a semantic token from the generated CSS layer. The
 * items are `<zds-button>` / `<zds-icon-button>` and the rules between them
 * `<zds-divider>`; this file only draws the shared surface and rounds the
 * outer ends. Mirrors button-group.css in packages/react-baseui.
 *
 * Spec: specs/button-group/button-group.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
/**
 * Adopted into each item's own shadow root by the group (see `#adopt` in
 * button-group.ts). Only the outer ends round; inner edges stay square (spec
 * issues "small / sharp uses rounded wrappers" and "medium / rounded is
 * mis-assembled": a sharp group never rounds an item, a rounded one always
 * rounds the first item's start and the last item's end). Shows on hover,
 * press and the focus ring.
 */
export declare const itemStyles = "\n  :host([data-zds-group-start]) button {\n    border-start-start-radius: var(--zds-button-group-inner-radius, var(--radius-none));\n    border-end-start-radius: var(--zds-button-group-inner-radius, var(--radius-none));\n  }\n  :host([data-zds-group-end]) button {\n    border-start-end-radius: var(--zds-button-group-inner-radius, var(--radius-none));\n    border-end-end-radius: var(--zds-button-group-inner-radius, var(--radius-none));\n  }\n";
//# sourceMappingURL=button-group.styles.d.ts.map