var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import "../icon/icon.js";
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
export function paginationItems(page, pageCount, visiblePages, showMore) {
    const count = Math.max(0, Math.floor(pageCount));
    if (count < 1)
        return [];
    const current = Math.min(Math.max(1, Math.floor(page)), count);
    const visible = Math.min(Math.max(1, Math.floor(visiblePages)), count);
    const start = Math.min(Math.max(current - Math.floor((visible - 1) / 2), 1), count - visible + 1);
    const end = start + visible - 1;
    const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => ({ type: "page", page: a + i }));
    if (showMore && end < count - 1) {
        return [...range(start, end), { type: "overflow", page: Math.min(end + 1, count) }, { type: "page", page: count }];
    }
    if (end < count) {
        return count - start + 1 <= visible + 1 ? range(start, count) : range(start, end);
    }
    return range(start, end);
}
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
let ZdsPagination = class ZdsPagination extends LitElement {
    constructor() {
        super(...arguments);
        /** The current page, 1-based. */
        this.page = 1;
        /** Total pages. At 1 or less nothing renders. */
        this.pageCount = 1;
        /** Shows the four jump controls (first, previous, next, last) as one group. */
        this.showControls = true;
        /** Shows the overflow control and the trailing last-page indicator when the window doesn't reach the end. */
        this.showMore = true;
        /** Gives every control and indicator a stroke/thin border. */
        this.outline = false;
        /** radius/sm corners on every control and indicator (sharp otherwise). */
        this.rounded = false;
        /** How many page numbers the window shows. */
        this.visiblePages = 3;
        /** The nav landmark's accessible name. */
        this.label = "Pagination";
    }
    go(target) {
        const next = Math.min(Math.max(1, target), Math.max(1, this.pageCount));
        if (next === this.page)
            return;
        this.page = next;
        this.dispatchEvent(new CustomEvent("zds-page-change", { detail: { page: next }, bubbles: true, composed: true }));
    }
    control(icon, label, target, disabled = false) {
        return html `<button part="control" class="control" type="button" aria-label=${label} ?disabled=${disabled} @click=${() => this.go(target)}>
      <zds-icon name=${icon} size="medium" .iconStyle=${"rounded"}></zds-icon>
    </button>`;
    }
    indicator(n, current) {
        const selected = n === current;
        return html `<button
      part="indicator"
      class="indicator"
      type="button"
      aria-label=${`Page ${n}`}
      aria-current=${selected ? "page" : nothing}
      @click=${() => this.go(n)}
    >${n}</button>`;
    }
    render() {
        const count = Math.floor(this.pageCount);
        if (!(count > 1))
            return nothing;
        const current = Math.min(Math.max(1, Math.floor(this.page) || 1), count);
        const atStart = current <= 1;
        const atEnd = current >= count;
        const items = paginationItems(current, count, this.visiblePages, this.showMore);
        return html `<nav part="nav" aria-label=${this.label}>
      ${this.showControls
            ? html `${this.control("first-page", "First page", 1, atStart)}${this.control("chevron-left", "Previous page", current - 1, atStart)}`
            : nothing}
      ${items.map((it) => (it.type === "overflow" ? this.control("more-horizontal", "More pages", it.page) : this.indicator(it.page, current)))}
      ${this.showControls
            ? html `${this.control("chevron-right", "Next page", current + 1, atEnd)}${this.control("last-page", "Last page", count, atEnd)}`
            : nothing}
    </nav>`;
    }
};
ZdsPagination.styles = styles;
__decorate([
    property({ type: Number })
], ZdsPagination.prototype, "page", void 0);
__decorate([
    property({ type: Number, attribute: "page-count" })
], ZdsPagination.prototype, "pageCount", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-controls", reflect: true })
], ZdsPagination.prototype, "showControls", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-more", reflect: true })
], ZdsPagination.prototype, "showMore", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsPagination.prototype, "outline", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsPagination.prototype, "rounded", void 0);
__decorate([
    property({ type: Number, attribute: "visible-pages" })
], ZdsPagination.prototype, "visiblePages", void 0);
__decorate([
    property({ type: String })
], ZdsPagination.prototype, "label", void 0);
ZdsPagination = __decorate([
    customElement("zds-pagination")
], ZdsPagination);
export { ZdsPagination };
