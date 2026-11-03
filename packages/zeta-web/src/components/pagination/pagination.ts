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
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-pagination--docs
 */

@customElement("zeta-pagination")
export class ZetaPagination extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Total number of pages. */
  @property({ type: Number }) totalPages = 10;

  /** Number of pages on both sides of current active page. */
  @property({ type: Number }) siblingCount = 1;

  /** Shows first, previous, next and last, the four jump controls, as one group. */
  @property({ type: Boolean, reflect: true, attribute: "show-controls" }) showControls = true;

  /** Collapses distant pages behind an overflow marker, keeping the first and last page. Off, only the window of
   * pages around the current one shows. */
  @property({ type: Boolean, reflect: true, attribute: "show-more" }) showMore = true;

  /** Gives every control and page number a stroke/thin border. */
  @property({ type: Boolean, reflect: true }) outline = false;

  /** Accessible name of the navigation landmark. */
  @property({ type: String, attribute: "nav-label" }) navLabel = "Pagination";

  /** Current active page. */
  @property({ type: Number })
  get currentPage() {
    return this.page;
  }

  set currentPage(page: number) {
    if (page >= this.totalPages) {
      this.page = this.totalPages;
    } else if (page <= 1) {
      this.page = 1;
    } else {
      this.page = page;
    }
  }

  private range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  /**
   * @fires ZetaPageEvent:pageChange
   */
  private handlePageChange = (page: number) => {
    this.currentPage = page;
    this.dispatchEvent(new ZetaPageEvent({ page }).toEvent());
  };

  private page = 1;

  private result = () => {
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

  private static readonly CONTROL_LABELS = new Map([
    ["first_page", "First page"],
    ["chevron_left", "Previous page"],
    ["chevron_right", "Next page"],
    ["last_page", "Last page"]
  ]);

  getIconButton(iconName: string, pageNumber: number, disabled: boolean) {
    return html`<button
      class="control ${iconName}"
      type="button"
      ?disabled=${disabled}
      aria-label=${ZetaPagination.CONTROL_LABELS.get(iconName) ?? iconName}
      @click=${() => this.handlePageChange(pageNumber)}
    >
      <zeta-icon .rounded=${this.rounded}>${iconName}</zeta-icon>
    </button>`;
  }

  protected render() {
    const disabledLeftControl = this.currentPage === 1;
    const disabledRightControl = this.currentPage === this.totalPages;
    const result = this.result();

    return html`
      <nav class="pagination" aria-label=${this.navLabel}>
        ${
          this.showControls
            ? html`${this.getIconButton("first_page", 1, disabledLeftControl)} ${this.getIconButton("chevron_left", this.currentPage - 1, disabledLeftControl)}`
            : nothing
        }
        ${result.map(page => {
          if (typeof page === "string") {
            return html`<span class="control more" aria-hidden="true"><zeta-icon .rounded=${this.rounded}>more_horizontal</zeta-icon></span>`;
          }
          const selected = this.currentPage === page;
          return html`<button
            type="button"
            @click=${() => this.handlePageChange(page)}
            class="page ${classMap({ selected })}"
            aria-label="Page ${page}"
            aria-current=${selected ? "page" : nothing}
          >
            ${page}
          </button>`;
        })}
        ${
          this.showControls
            ? html`${this.getIconButton("chevron_right", this.currentPage + 1, disabledRightControl)}
              ${this.getIconButton("last_page", this.totalPages, disabledRightControl)}`
            : nothing
        }
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-pagination": ZetaPagination;
  }
}
