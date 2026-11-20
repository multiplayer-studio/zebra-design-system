import * as React from "react";
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
/**
 * The page numbers to show: a window around the current page, then — with
 * `showMore`, when the window stops short — an overflow and the last page.
 * The spec leaves this to code; packages/web-components uses the same rule.
 */
export declare function paginationWindow(page: number, pageCount: number, visiblePages: number, showMore: boolean): {
    numbers: number[];
    overflowTo: number | null;
    trailing: number | null;
};
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
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
