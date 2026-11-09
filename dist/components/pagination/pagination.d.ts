import { LitElement, nothing } from "lit";
import "../icon/icon.js";
/** One rendered page-number item: a page, or the overflow ("…") control. */
export type PaginationItem = {
    type: "page";
    page: number;
} | {
    type: "overflow";
    page: number;
};
/**
 * Which page numbers to show. The spec leaves this to code ("Paging
 * behaviour isn't modelled"); this is the shared contract the React package
 * implements too, so keep the two identical.
 *
 * visible = min(visiblePages, pageCount); the window is centred on the
 * current page and clamped to the range. With showMore the last page always
 * appears — in the window, as the next number, or after "…". The overflow's
 * `page` is the first hidden page, where activating it goes.
 */
export declare function paginationItems(page: number, pageCount: number, visiblePages: number, showMore: boolean): PaginationItem[];
/**
 * A horizontal bar of page controls: first/previous/next/last jump buttons,
 * a window of page number indicators, and an overflow marker with the last
 * page for a long range. Used inside Table Footer and anywhere else a result
 * set is split across pages.
 *
 * Renders nothing while `pageCount` is 1 or less: the spec says a single-page
 * bar shouldn't exist, so the element simply takes no space.
 *
 * Controlled like Table's sort: activating a control sets `page` and fires
 * `zds-page-change`, so it works with no listener; a listener that owns the
 * page can still overwrite it. The current page carries
 * `aria-current="page"`; jumps at the ends are natively `disabled`.
 *
 * `outline` and `rounded` are whole-bar styling (spec: no per-button
 * override). Glyphs are pinned to the rounded family, as Figma draws them.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*`
 * class on any ancestor re-themes the bar with no re-render.
 *
 * @fires zds-page-change - A control or indicator chose a page. `detail.page` (1-based). Bubbles and is composed.
 * @csspart nav - The nav landmark.
 * @csspart control - Each jump and overflow button.
 * @csspart indicator - Each page number button.
 *
 * @spec specs/pagination/pagination.spec.json
 */
export declare class ZdsPagination extends LitElement {
    static styles: import("lit").CSSResult;
    /** The current page, 1-based. */
    page: number;
    /** Total pages. At 1 or less nothing renders. */
    pageCount: number;
    /** Shows the four jump controls (first, previous, next, last) as one group. */
    showControls: boolean;
    /** Shows the overflow control and the trailing last-page indicator when the window doesn't reach the end. */
    showMore: boolean;
    /** Gives every control and indicator a stroke/thin border. */
    outline: boolean;
    /** radius/sm corners on every control and indicator (sharp otherwise). */
    rounded: boolean;
    /** How many page numbers the window shows. */
    visiblePages: number;
    /** The nav landmark's accessible name. */
    label: string;
    private go;
    private control;
    private indicator;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-pagination": ZdsPagination;
    }
}
//# sourceMappingURL=pagination.d.ts.map