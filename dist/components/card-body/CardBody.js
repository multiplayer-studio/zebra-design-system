import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./card-body.css";
/**
 * A plain padded text block for Card's body slot.
 *
 * @spec specs/card/card.spec.md
 */
export const CardBody = React.forwardRef(function CardBody({ children, className, ...rest }, ref) {
    return (_jsx("div", { ref: ref, ...rest, className: ["zds-card-body", className].filter(Boolean).join(" "), children: children }));
});
