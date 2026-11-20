import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import "./card-image.css";
/**
 * A full-bleed image for Card's body slot. Fills the width and clips to
 * Card's own corner radius; height is left to the consumer (the spec's own
 * 259px is an unbound, authored canvas value, not a real constraint).
 *
 * @spec specs/card/card.spec.md
 */
export const CardImage = React.forwardRef(function CardImage({ className, ...rest }, ref) {
    return _jsx("img", { ref: ref, ...rest, className: ["zds-card-image", className].filter(Boolean).join(" ") });
});
