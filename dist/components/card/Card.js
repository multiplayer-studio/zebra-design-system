import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import "./card.css";
/**
 * The empty card shell: three stacked slots inside a bordered surface. It
 * decides the surface, the border, the corner treatment and clipping, and
 * nothing else — every inset comes from whatever fills the slots
 * (`CardHeading`, `CardBody`, `CardImage`, `CardFooter`, or anything else).
 *
 * Header and footer can each be switched off; the body has no toggle. Width
 * is not fixed here — the spec's own 330px is a Figma canvas artifact, not a
 * constraint ("whoever places it decides the width"), so this shell sizes to
 * its container.
 *
 * @spec specs/card/card.spec.md
 */
export const Card = React.forwardRef(function Card({ shape = "sharp", hasHeader = true, header, hasFooter = true, footer, children, className, ...rest }, ref) {
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-card", className].filter(Boolean).join(" "), "data-shape": shape, children: [hasHeader ? _jsx("div", { className: "zds-card__header", children: header }) : null, _jsx("div", { className: "zds-card__body", children: children }), hasFooter ? _jsx("div", { className: "zds-card__footer", children: footer }) : null] }));
});
