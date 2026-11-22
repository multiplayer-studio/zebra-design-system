import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./card-footer.css";
/**
 * A row of closing actions for Card's footer slot — one Button fills the
 * width, two sit side by side with a gap, or pass anything else entirely
 * (the spec's "custom" option). The count and arrangement are left to
 * whatever children are passed rather than a separate `actions` prop.
 *
 * @spec specs/card/card.spec.md
 */
export const CardFooter = React.forwardRef(function CardFooter({ children, className, ...rest }, ref) {
    return (_jsx("div", { ref: ref, ...rest, className: ["zds-card-footer", className].filter(Boolean).join(" "), children: children }));
});
