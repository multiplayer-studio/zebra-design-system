import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

/** One rendered page-number item: a page, or the overflow ("…") control. */
export type PaginationItem = { type: "page"; page: number } | { type: "overflow"; page: number };

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
export function paginationItems(page: number, pageCount: number, visiblePages: number, showMore: boolean): PaginationItem[] {
  const count = Math.max(0, Math.floor(pageCount));
  if (count < 1) return [];
  const current = Math.min(Math.max(1, Math.floor(page)), count);
  const visible = Math.min(Math.max(1, Math.floor(visiblePages)), count);
  const start = Math.min(Math.max(current - Math.floor((visible - 1) / 2), 1), count - visible + 1);
  const end = start + visible - 1;
  const range = (a: number, b: number): PaginationItem[] =>
    Array.from({ length: b - a + 1 }, (_, i) => ({ type: "page", page: a + i }));

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
@customElement("zds-pagination")
export class ZdsPagination extends LitElement {
  static styles = styles;

  /** The current page, 1-based. */
  @property({ type: Number }) page = 1;

  /** Total pages. At 1 or less nothing renders. */
  @property({ type: Number, attribute: "page-count" }) pageCount = 1;

  /** Shows the four jump controls (first, previous, next, last) as one group. */
  @property({ type: Boolean, attribute: "show-controls", reflect: true }) showControls = true;

  /** Shows the overflow control and the trailing last-page indicator when the window doesn't reach the end. */
  @property({ type: Boolean, attribute: "show-more", reflect: true }) showMore = true;

  /** Gives every control and indicator a stroke/thin border. */
  @property({ type: Boolean, reflect: true }) outline = false;

  /** radius/sm corners on every control and indicator (sharp otherwise). */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** How many page numbers the window shows. */
  @property({ type: Number, attribute: "visible-pages" }) visiblePages = 3;

  /** The nav landmark's accessible name. */
  @property({ type: String }) label = "Pagination";

  private go(target: number) {
    const next = Math.min(Math.max(1, target), Math.max(1, this.pageCount));
    if (next === this.page) return;
    this.page = next;
    this.dispatchEvent(new CustomEvent("zds-page-change", { detail: { page: next }, bubbles: true, composed: true }));
  }

  private control(icon: IconName, label: string, target: number, disabled = false) {
    return html`<button part="control" class="control" type="button" aria-label=${label} ?disabled=${disabled} @click=${() => this.go(target)}>
      <zds-icon name=${icon} size="medium" .iconStyle=${"rounded"}></zds-icon>
    </button>`;
  }

  private indicator(n: number, current: number) {
    const selected = n === current;
    return html`<button
      part="indicator"
      class="indicator"
      type="button"
      aria-label=${`Page ${n}`}
      aria-current=${selected ? "page" : nothing}
      @click=${() => this.go(n)}
    >${n}</button>`;
  }

  protected render() {
    const count = Math.floor(this.pageCount);
    if (!(count > 1)) return nothing;
    const current = Math.min(Math.max(1, Math.floor(this.page) || 1), count);
    const atStart = current <= 1;
    const atEnd = current >= count;
    const items = paginationItems(current, count, this.visiblePages, this.showMore);
    return html`<nav part="nav" aria-label=${this.label}>
      ${this.showControls
        ? html`${this.control("first-page", "First page", 1, atStart)}${this.control("chevron-left", "Previous page", current - 1, atStart)}`
        : nothing}
      ${items.map((it) => (it.type === "overflow" ? this.control("more-horizontal", "More pages", it.page) : this.indicator(it.page, current)))}
      ${this.showControls
        ? html`${this.control("chevron-right", "Next page", current + 1, atEnd)}${this.control("last-page", "Last page", count, atEnd)}`
        : nothing}
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-pagination": ZdsPagination;
  }
}
