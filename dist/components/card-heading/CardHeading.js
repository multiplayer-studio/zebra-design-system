import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import "./card-heading.css";
/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for Card's header slot (and reused inside the body
 * slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this component derives visibility from whether `leadingContent` /
 * `trailingContent` was passed, since a consumer would otherwise have to keep
 * two props in sync for one decision.
 *
 * @spec specs/card/card.spec.md
 */
export const CardHeading = React.forwardRef(function CardHeading({ heading, subheading, leadingContent, trailingContent, className, ...rest }, ref) {
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-card-heading", className].filter(Boolean).join(" "), children: [leadingContent ? _jsx("div", { className: "zds-card-heading__leading", children: leadingContent }) : null, _jsxs("div", { className: "zds-card-heading__text", children: [_jsx("div", { className: "zds-card-heading__heading", children: heading }), subheading ? _jsx("div", { className: "zds-card-heading__subheading", children: subheading }) : null] }), trailingContent ? _jsx("div", { className: "zds-card-heading__trailing", children: trailingContent }) : null] }));
});
