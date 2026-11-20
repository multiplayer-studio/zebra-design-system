import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./caret-indicator.css";
const GLYPH = { vertical: "expand-more", horizontal: "chevron-right" };
/**
 * The caret that marks something as able to open, and turns when it does.
 *
 * Decorative (`aria-hidden`): the control it sits in carries `aria-expanded`.
 * Figma swaps glyphs per state (expand-more → expand-less, chevron-right →
 * expand-more); here it is ONE glyph rotated with Switch's motion — owner
 * decision. The colour is currentColor, so it follows the row's label.
 *
 * Shared by SubMenuItem, CollapsibleMenuItem and anything else with a
 * disclosure caret. Kept in step with `<zds-caret-indicator>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Caret Indicator)
 */
export const CaretIndicator = React.forwardRef(function CaretIndicator({ open = false, direction = "vertical", size = "small", className, ...rest }, ref) {
    return (_jsx("span", { ref: ref, "aria-hidden": "true", ...rest, className: ["zds-caret-indicator", className].filter(Boolean).join(" "), "data-direction": direction, "data-open": open ? "" : undefined, children: _jsx(Icon, { className: "zds-caret-indicator__glyph", name: GLYPH[direction], size: size }) }));
});
