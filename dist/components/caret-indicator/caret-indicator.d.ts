import { LitElement } from "lit";
import "../icon/icon.js";
import type { IconSize } from "../icon/icon.js";
export type CaretIndicatorDirection = "vertical" | "horizontal";
export type CaretIndicatorSize = IconSize;
/**
 * The caret that marks something as able to open, and turns when it does.
 *
 * Decorative (`aria-hidden`): the control it sits in carries `aria-expanded`.
 * Figma swaps glyphs per state (expand-more → expand-less, chevron-right →
 * expand-more); here it is ONE glyph rotated with Switch's motion — owner
 * decision. The colour is currentColor, so it follows the row's label.
 *
 * Shared by zds-sub-menu-item, zds-collapsible-menu-item and anything else
 * with a disclosure caret. Kept in step with React `<CaretIndicator>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Caret Indicator)
 */
export declare class ZdsCaretIndicator extends LitElement {
    static styles: import("lit").CSSResult;
    /** Whether the thing it marks is open. Turns the glyph; it never swaps it. */
    open: boolean;
    /**
     * vertical: `expand-more`, turned 180° when open (a list that drops down).
     * horizontal: `chevron-right`, turned 90° when open (a row that opens a level).
     */
    direction: CaretIndicatorDirection;
    /** The glyph's own box: 16 / 20 / 28px, the nested Icon's sizes. */
    size: CaretIndicatorSize;
    connectedCallback(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-caret-indicator": ZdsCaretIndicator;
    }
}
//# sourceMappingURL=caret-indicator.d.ts.map