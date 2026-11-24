import { LitElement } from "lit";
export type DividerOrientation = "horizontal" | "vertical";
/**
 * A thin line used to visually separate content into distinct sections or
 * groups, such as list rows, cards, or menu items. Orientation sets whether
 * the line runs horizontal or vertical.
 *
 * Divider has no behaviour to delegate to a primitive, so it exposes the
 * platform's separator role and `aria-orientation` itself, on the inner
 * line rather than the host.
 *
 * Not a spacing or margin mechanism — it has no built-in padding. Use layout
 * gap for spacing between elements instead.
 *
 * @part line - The separator element.
 *
 * @spec specs/divider/divider.spec.json
 */
export declare class ZdsDivider extends LitElement {
    static styles: import("lit").CSSResult;
    /** Horizontal separates stacked content; vertical separates side-by-side content. */
    orientation: DividerOrientation;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-divider": ZdsDivider;
    }
}
//# sourceMappingURL=divider.d.ts.map