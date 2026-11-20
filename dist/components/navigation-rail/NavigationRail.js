import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { NavigationRailItem } from "../navigation-rail-item/NavigationRailItem.js";
import { NavigationRailContext } from "./context.js";
import "./navigation-rail.css";
/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion or before the rail is ready). */
function motionMs(el) {
    if (!el)
        return 0;
    const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
    const n = parseFloat(d);
    return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}
/** A width prop as CSS: a bare number (`180` or "180") is px, any other string passes through. */
const cssLength = (v) => v === undefined || v === "" ? undefined : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);
/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Locked to dark mode by default, whatever the page's mode; `inverse` locks
 * it to light (owner decision). The root carries the token layer's
 * `mode-dark` / `mode-light` class, so the whole subtree follows it. No part
 * of the rail family portals; a popup you slot in that does can read
 * `useNavigationRailModeClass()` to keep the rail's mode.
 *
 * Regions are slots (header, menu, footer, sub menu header, sub menu); the
 * rail hands its width form and shape down to the items through context. It owns the
 * toggle item and wires it to `expanded` (spec: "Behaviour code must own").
 *
 * No Base UI primitive: NavigationMenu models a menubar whose Triggers open
 * Content in a positioned Viewport popup — not a vertical list whose groups
 * expand in place. So the rail is a plain `<nav>` of links, and groups are
 * Base UI Collapsibles (CollapsibleMenuItem). Every destination stays in the
 * Tab order, as on NavigationBar.
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * given. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * `children`; Rail Item 1–3 / Footer Rail Item are sample content, not parts;
 * moreRailItems / moreFooterItems / showHeaderAction / showSubMenu become
 * "is the slot filled".
 *
 * Kept in step with `<zds-navigation-rail>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md
 */
export const NavigationRail = React.forwardRef(function NavigationRail({ expanded: expandedProp, defaultExpanded = false, onExpandedChange, showLabels = false, showToggleItem = true, expandLabel = "Open", collapseLabel = "Close", shape = "rounded", inverse = false, railWidth, railMaxWidth, subMenuMaxWidth, navLabel = "Main", header, actionLabel, actionIcon = "add-circle-outline", onAction, footer, subMenuHeader, subMenu, className, style, children, ...rest }, ref) {
    const [innerExpanded, setInnerExpanded] = React.useState(defaultExpanded);
    const expanded = expandedProp ?? innerExpanded;
    const railRef = React.useRef(null);
    // Motion (owner decision: animations/smooth). The rail's width animates on
    // [data-expanded]; its content keeps the wide layout until a collapse has
    // finished (`wide`), laid out at its final width and clipped by the
    // narrowing rail, so labels never reflow or wrap mid-animation. Expanding
    // switches the content at once and the widening rail reveals it. With no
    // transition (reduced motion, first render) the switch is immediate.
    const [wideLatch, setWideLatch] = React.useState(expanded);
    React.useEffect(() => {
        if (expanded) {
            setWideLatch(true);
            return;
        }
        const ms = motionMs(railRef.current);
        if (!ms) {
            setWideLatch(false);
            return;
        }
        const t = setTimeout(() => setWideLatch(false), ms);
        return () => clearTimeout(t);
    }, [expanded]);
    const wide = expanded || wideLatch;
    // Transitions only after the first paint, so nothing animates on mount.
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, []);
    // Locked colour mode (owner decision): the class is the token layer's own,
    // so the rail's subtree re-resolves every semantic token in that mode, and
    // an .ext-* ancestor still applies (.ext-companion .mode-dark …). Only the
    // root sets it — no part inside pins a mode of its own, so light and dark
    // rules never meet.
    const modeClass = inverse ? "mode-light" : "mode-dark";
    // Items take the content form (`wide`), not the target, so they hold the
    // wide layout through a collapse.
    const ctx = React.useMemo(() => ({ expanded: wide, showLabels, shape, modeClass }), [wide, showLabels, shape, modeClass]);
    const hasPanel = subMenu != null || subMenuHeader != null;
    const toggle = () => {
        if (expandedProp === undefined)
            setInnerExpanded(!expanded);
        onExpandedChange?.(!expanded);
    };
    return (_jsx("nav", { ref: ref, "aria-label": navLabel, ...rest, className: ["zds-navigation-rail", modeClass, className].filter(Boolean).join(" "), "data-expanded": expanded ? "" : undefined, "data-wide": wide ? "" : undefined, "data-ready": ready ? "" : undefined, "data-show-labels": showLabels ? "" : undefined, "data-shape": shape, "data-inverse": inverse ? "" : undefined, "data-fill": railWidth === "fill" ? "" : undefined, style: {
            ...style,
            // Unset, the variables stay undeclared and the CSS falls back to no cap.
            "--zds-navigation-rail-width": railWidth === "fill" ? undefined : cssLength(railWidth),
            "--zds-navigation-rail-max-width": cssLength(railMaxWidth),
            "--zds-navigation-rail-sub-menu-max-width": cssLength(subMenuMaxWidth),
        }, children: _jsxs(NavigationRailContext.Provider, { value: ctx, children: [_jsxs("div", { ref: railRef, className: "zds-navigation-rail__rail", children: [header != null || actionLabel ? (_jsxs("div", { className: "zds-navigation-rail__header", children: [header, actionLabel ? (
                                // Size=large, Flavour=primary in both forms (spec). Figma pins
                                // Shape=rounded; the rail's shape now sets it (owner decision:
                                // every nested component follows the rail).
                                wide ? (_jsx(Button, { className: "zds-navigation-rail__action", size: "large", shape: shape, flavour: "primary", leadingIcon: actionIcon, onClick: onAction, children: actionLabel })) : (_jsx(IconButton, { className: "zds-navigation-rail__action", size: "large", shape: shape, flavour: "primary", icon: actionIcon, label: actionLabel, onClick: onAction }))) : null] })) : null, _jsx("div", { className: "zds-navigation-rail__menu", children: children }), footer != null || showToggleItem ? (_jsxs("div", { className: "zds-navigation-rail__footer", children: [footer, showToggleItem ? (_jsx(NavigationRailItem, { className: "zds-navigation-rail__toggle", icon: expanded ? "left-panel-close" : "left-panel-open", label: expanded ? collapseLabel : expandLabel, "aria-expanded": expanded, onClick: toggle })) : null] })) : null] }), _jsxs("div", { className: "zds-navigation-rail__panel", "data-open": hasPanel ? "" : undefined, children: [subMenuHeader, subMenu != null ? _jsx("div", { className: "zds-navigation-rail__sub-menu", children: subMenu }) : null] })] }) }));
});
