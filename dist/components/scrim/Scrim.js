import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./scrim.css";
/**
 * The barrier between a raised surface and the page behind it. It fills its
 * nearest positioned ancestor edge to edge, with one fill and nothing else.
 *
 * Dialog, Lightbox and a modal Bottom Sheet render it as their backdrop, so
 * reach for it directly only under a custom overlay, one per open surface. It
 * is decorative (hidden from assistive technology, never focusable) and carries
 * no content. A click on it bubbles as usual, so the owner decides whether to
 * close.
 *
 * @spec specs/scrim/scrim.spec.md
 */
export const Scrim = React.forwardRef(function Scrim(
// Scrim has no content (spec), so children are dropped.
{ tone = "scrim", className, children: _children, ...rest }, ref) {
    return (_jsx("div", { ref: ref, "aria-hidden": "true", ...rest, "data-tone": tone, className: ["zds-scrim", className].filter(Boolean).join(" ") }));
});
