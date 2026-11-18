import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./collapsible-card.css";
/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this component implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * component's own responsibility (a native `button`), since Figma models
 * none of them.
 *
 * @spec specs/card/card.spec.md
 */
export const CollapsibleCard = React.forwardRef(function CollapsibleCard({ shape = "sharp", flavor = "default", heading, required = true, description, expanded: expandedProp, defaultExpanded = false, onExpandedChange, children, className, ...rest }, ref) {
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);
    const expanded = expandedProp ?? uncontrolledExpanded;
    const toggle = () => {
        const next = !expanded;
        if (expandedProp === undefined)
            setUncontrolledExpanded(next);
        onExpandedChange?.(next);
    };
    // The icon follows the card's shape, matching Button's own convention.
    const iconStyle = shape === "sharp" ? "sharp" : "rounded";
    return (_jsxs("div", { ref: ref, ...rest, className: ["zds-collapsible-card", className].filter(Boolean).join(" "), "data-shape": shape, "data-flavour": flavor, children: [_jsxs("button", { type: "button", className: "zds-collapsible-card__header", "aria-expanded": expanded, onClick: toggle, children: [_jsx(Icon, { className: "zds-collapsible-card__chevron", 
                        // expand-more's own glyph sits high in its box with dead space
                        // below, which reads as top-aligned no matter how the box itself
                        // is centered; chevron-right is optically centered, so it's
                        // rotated instead of swapping glyphs on toggle.
                        name: "chevron-right", iconStyle: iconStyle, size: "large", "data-expanded": expanded || undefined }), _jsxs("span", { className: "zds-collapsible-card__text", children: [_jsxs("span", { className: "zds-collapsible-card__heading", children: [heading, required ? (_jsx("span", { className: "zds-collapsible-card__required", "aria-hidden": "true", children: " *" })) : null] }), description ? _jsx("span", { className: "zds-collapsible-card__description", children: description }) : null] })] }), expanded ? _jsx("div", { className: "zds-collapsible-card__body", children: children }) : null] }));
});
