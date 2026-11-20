var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZetaPagination_1;
import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaPageEvent } from "../../events.js";
import "../icon/icon.js";
/** Buttons for navigating between pages: four jump controls, the page numbers with the current one selected, and an
 * overflow marker where pages collapse. `outline` and `rounded` apply to every control at once.
 *
 *  @event {CustomEvent<ZetaPageEventDetail>} pageChange - Fired when page change. Contains a single value in details: `page: number`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4489-1925
 * @storybook ?path=/docs/components-pagination--docs
 */
let ZetaPagination = class ZetaPagination extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Total number of pages. */
        this.totalPages = 10;
        /** Number of pages on both sides of current active page. */
        this.siblingCount = 1;
        /** Shows first, previous, next and last, the four jump controls, as one group. */
        this.showControls = true;
        /** Collapses distant pages behind an overflow marker, keeping the first and last page. Off, only the window of
         * pages around the current one shows. */
        this.showMore = true;
        /** Gives every control and page number a stroke/thin border. */
        this.outline = false;
        /** Accessible name of the navigation landmark. */
        this.navLabel = "Pagination";
        this.range = (start, end) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, idx) => idx + start);
        };
        /**
         * @fires ZetaPageEvent:pageChange
         */
        this.handlePageChange = (page) => {
            this.currentPage = page;
            this.dispatchEvent(new ZetaPageEvent({ page }).toEvent());
        };
        this.page = 1;
        this.result = () => {
            const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
            const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;
            const firstPageIndex = 1;
            const lastPageIndex = this.totalPages;
            if (!this.showMore) {
                const width = Math.min(this.totalPages, 2 * this.siblingCount + 1);
                const start = Math.min(Math.max(this.currentPage - this.siblingCount, 1), this.totalPages - width + 1);
                return this.range(start, start + width - 1);
            }
            if (this.siblingCount + 5 >= this.totalPages) {
                return this.range(1, this.totalPages);
            }
            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * this.siblingCount;
                const leftRange = this.range(1, leftItemCount);
                return [...leftRange, "dots", this.totalPages];
            }
            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * this.siblingCount;
                const rightRange = this.range(this.totalPages - rightItemCount + 1, this.totalPages);
                return [firstPageIndex, "dots", ...rightRange];
            }
            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
                return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
            }
            return this.range(1, this.totalPages);
        };
    }
    static { ZetaPagination_1 = this; }
    static { this.styles = [super.styles || [], styles]; }
    /** Current active page. */
    get currentPage() {
        return this.page;
    }
    set currentPage(page) {
        if (page >= this.totalPages) {
            this.page = this.totalPages;
        }
        else if (page <= 1) {
            this.page = 1;
        }
        else {
            this.page = page;
        }
    }
    static { this.CONTROL_LABELS = new Map([
        ["first_page", "First page"],
        ["chevron_left", "Previous page"],
        ["chevron_right", "Next page"],
        ["last_page", "Last page"]
    ]); }
    getIconButton(iconName, pageNumber, disabled) {
        return html `<button
      class="control ${iconName}"
      type="button"
      ?disabled=${disabled}
      aria-label=${ZetaPagination_1.CONTROL_LABELS.get(iconName) ?? iconName}
      @click=${() => this.handlePageChange(pageNumber)}
    >
      <zeta-icon .rounded=${this.rounded}>${iconName}</zeta-icon>
    </button>`;
    }
    render() {
        const disabledLeftControl = this.currentPage === 1;
        const disabledRightControl = this.currentPage === this.totalPages;
        const result = this.result();
        return html `
      <nav class="pagination" aria-label=${this.navLabel}>
        ${this.showControls
            ? html `${this.getIconButton("first_page", 1, disabledLeftControl)} ${this.getIconButton("chevron_left", this.currentPage - 1, disabledLeftControl)}`
            : nothing}
        ${result.map(page => {
            if (typeof page === "string") {
                return html `<span class="control more" aria-hidden="true"><zeta-icon .rounded=${this.rounded}>more_horizontal</zeta-icon></span>`;
            }
            const selected = this.currentPage === page;
            return html `<button
            type="button"
            @click=${() => this.handlePageChange(page)}
            class="page ${classMap({ selected })}"
            aria-label="Page ${page}"
            aria-current=${selected ? "page" : nothing}
          >
            ${page}
          </button>`;
        })}
        ${this.showControls
            ? html `${this.getIconButton("chevron_right", this.currentPage + 1, disabledRightControl)}
              ${this.getIconButton("last_page", this.totalPages, disabledRightControl)}`
            : nothing}
      </nav>
    `;
    }
};
__decorate([
    property({ type: Number })
], ZetaPagination.prototype, "totalPages", void 0);
__decorate([
    property({ type: Number })
], ZetaPagination.prototype, "siblingCount", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-controls" })
], ZetaPagination.prototype, "showControls", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-more" })
], ZetaPagination.prototype, "showMore", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaPagination.prototype, "outline", void 0);
__decorate([
    property({ type: String, attribute: "nav-label" })
], ZetaPagination.prototype, "navLabel", void 0);
__decorate([
    property({ type: Number })
], ZetaPagination.prototype, "currentPage", null);
ZetaPagination = ZetaPagination_1 = __decorate([
    customElement("zeta-pagination")
], ZetaPagination);
export { ZetaPagination };
//# sourceMappingURL=pagination.js.map