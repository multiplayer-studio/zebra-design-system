import * as React from "react";
import { Icon, type IconName } from "../icon/Icon.js";
import "./pagination.css";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "onChange"> {
  /** Current page, 1-based (controlled). */
  page?: number;
  /** Starting page when uncontrolled. */
  defaultPage?: number;
  /** Total pages. At one page or fewer nothing renders — a single-page bar signals an unfinished feature. */
  pageCount?: number;
  onPageChange?: (page: number) => void;
  /** First, previous, next and last, as one group. */
  showControls?: boolean;
  /** The "…" control and the last page's number after it, when the window doesn't reach the end. */
  showMore?: boolean;
  /** A border on every control and indicator. */
  outline?: boolean;
  /** Softened corners on every control and indicator. */
  rounded?: boolean;
  /** How many page numbers the window shows. */
  visiblePages?: number;
  /** Accessible name of the navigation landmark. */
  label?: string;
  className?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);

/**
 * The page numbers to show: a window around the current page, then — with
 * `showMore`, when the window stops short — an overflow and the last page.
 * The spec leaves this to code; packages/web-components uses the same rule.
 */
export function paginationWindow(page: number, pageCount: number, visiblePages: number, showMore: boolean) {
  const v = Math.min(visiblePages, pageCount);
  const start = clamp(page - Math.floor((v - 1) / 2), 1, pageCount - v + 1);
  let end = start + v - 1;
  if (showMore && end < pageCount - 1) return { numbers: range(start, end), overflowTo: end + 1, trailing: pageCount };
  if (end < pageCount && pageCount - start + 1 <= v + 1) end = pageCount;
  return { numbers: range(start, end), overflowTo: null as number | null, trailing: null as number | null };
}

/**
 * A horizontal bar of page controls — first/previous/next/last jumps, a
 * window of page numbers and an optional overflow for a long range.
 *
 * Plain buttons in a `nav` landmark (Base UI has no pagination primitive):
 * native `disabled` at the ends, `aria-current="page"` on the current
 * number. Figma's four Main Slots (one per Outline × Rounded) are a Figma
 * workaround; here the numbers are derived from `page` and `pageCount`.
 * Everything visual comes from the token layer via `pagination.css`.
 *
 * Kept in step with packages/web-components `<zds-pagination>`.
 *
 * @spec specs/pagination/pagination.spec.md
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page: pageProp, defaultPage = 1, pageCount = 1, onPageChange, showControls = true, showMore = true,
    outline = false, rounded = false, visiblePages = 3, label = "Pagination", className, ...rest
  },
  ref,
) {
  const [inner, setInner] = React.useState(defaultPage);
  const page = clamp(pageProp ?? inner, 1, Math.max(1, pageCount));
  if (pageCount <= 1) return null;

  const go = (p: number) => {
    const next = clamp(p, 1, pageCount);
    if (next === page) return;
    if (pageProp === undefined) setInner(next);
    onPageChange?.(next);
  };
  const { numbers, overflowTo, trailing } = paginationWindow(page, pageCount, visiblePages, showMore);

  const control = (icon: IconName, name: string, to: number, disabled: boolean) => (
    <button type="button" className="zds-pagination__control" aria-label={name} disabled={disabled} onClick={() => go(to)}>
      {/* Glyph colour follows the control's text colour (spec: unbound in Figma). */}
      <Icon name={icon} size="medium" iconStyle="rounded" />
    </button>
  );
  const indicator = (n: number) => (
    <button key={n} type="button" className="zds-pagination__indicator" aria-label={`Page ${n}`}
      aria-current={n === page ? "page" : undefined} onClick={() => go(n)}>
      {n}
    </button>
  );

  return (
    <nav ref={ref} aria-label={label} {...rest} className={["zds-pagination", className].filter(Boolean).join(" ")}
      data-outline={outline || undefined} data-rounded={rounded || undefined}>
      {showControls ? <>{control("first-page", "First page", 1, page === 1)}{control("chevron-left", "Previous page", page - 1, page === 1)}</> : null}
      {numbers.map(indicator)}
      {/* The trailing indicator appears in every Outline × Rounded combination
          (spec issue: Figma drops it in outline=true, rounded=false). */}
      {overflowTo !== null && trailing !== null ? <>{control("more-horizontal", "More pages", overflowTo, false)}{indicator(trailing)}</> : null}
      {showControls ? <>{control("chevron-right", "Next page", page + 1, page === pageCount)}{control("last-page", "Last page", pageCount, page === pageCount)}</> : null}
    </nav>
  );
});
