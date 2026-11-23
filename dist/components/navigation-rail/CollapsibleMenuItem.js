import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { SubMenuRowContent, TruncatedLabelTooltip } from "../sub-menu-item/SubMenuItem.js";
import { NavigationRailContext, NestedMenuContext } from "./context.js";
import "../sub-menu-item/sub-menu-item.css";
import "./navigation-rail.css";
/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * Behaviour is Base UI's Collapsible: the header is the Trigger (`button`
 * with `aria-expanded` / `aria-controls`), the rows sit in its Panel, given
 * `role="region"` and named by the header. The header is a SubMenuItem row
 * with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active) — the token alone, without Figma's extra
 * paint opacity (spec warn "Double alpha") — and the rows sit on surface/overlay.
 *
 * It never widens the sub menu (`contain: inline-size`): it fills the width
 * the panel's other content gives it, its labels truncate, and a truncated
 * label shows in full in a tooltip after a 3s hover (owner decision).
 *
 * Kept in step with `<zds-collapsible-menu-item>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Collapsible Menu Item)
 */
export const CollapsibleMenuItem = React.forwardRef(function CollapsibleMenuItem({ label = "Label", icon = "verified", showLeadingIcon = true, badge = null, badgeLabel, open: openProp, defaultOpen = false, onOpenChange, disabled = false, shape: shapeProp = "rounded", className, children, ...rest }, ref) {
    const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
    const open = openProp ?? innerOpen;
    const headerId = React.useId();
    const rail = React.useContext(NavigationRailContext);
    const shape = rail ? rail.shape : shapeProp;
    const labelRef = React.useRef(null);
    return (_jsxs(Collapsible.Root, { ref: ref, ...rest, open: open, disabled: disabled, onOpenChange: (next) => {
            if (openProp === undefined)
                setInnerOpen(next);
            onOpenChange?.(next);
        }, className: ["zds-collapsible-menu-item", className].filter(Boolean).join(" "), "data-open": open ? "" : undefined, "data-shape": shape, children: [_jsx(TruncatedLabelTooltip, { label: label, labelRef: labelRef, shape: shape, trigger: _jsx(Collapsible.Trigger, { id: headerId, className: "zds-sub-menu-item zds-collapsible-menu-item__header", "data-disabled": disabled ? "" : undefined, "data-shape": shape, children: _jsx(SubMenuRowContent, { label: label, icon: icon, showLeadingIcon: showLeadingIcon, badge: badge, badgeLabel: badgeLabel, caret: "vertical", open: open, labelRef: labelRef }) }) }), _jsx(Collapsible.Panel, { className: "zds-collapsible-menu-item__panel", role: "region", "aria-labelledby": headerId, children: _jsx("div", { className: "zds-collapsible-menu-item__children", children: _jsx(NestedMenuContext.Provider, { value: shape, children: children }) }) })] }));
});
