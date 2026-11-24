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
const MODE_CLASS = /(?:^|\s)mode-(aaa-)?(light|dark)(?:\s|$)/;
const parentOf = (n) => {
    if (n.parentElement)
        return n.parentElement;
    const root = n.getRootNode();
    return root instanceof ShadowRoot ? root.host : null;
};
const readPageMode = (el) => {
    for (let n = parentOf(el); n; n = parentOf(n)) {
        const m = MODE_CLASS.exec(typeof n.className === "string" ? n.className : "");
        if (m)
            return { dark: m[2] === "dark", aaa: Boolean(m[1]) };
    }
    return { dark: false, aaa: false };
};
const useBrowserLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
const cssLength = (v) => v === undefined || v === "" ? undefined : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);
/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Follows the page's mode by default. `inverse` shows the opposite shade,
 * and `locked` keeps the rail dark (light with `inverse`) whatever the page
 * does. For either, the root carries the token layer's `mode-*` class, so
 * the whole subtree follows it. No part of the rail family portals; a popup
 * you slot in that does can read `useNavigationRailModeClass()` to keep the
 * rail's mode.
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
export const NavigationRail = React.forwardRef(function NavigationRail({ expanded: expandedProp, defaultExpanded = false, onExpandedChange, showLabels = false, showToggleItem = true, showDivider = true, expandLabel = "Open", collapseLabel = "Close", shape = "rounded", inverse = false, locked = false, railWidth, railMaxWidth, subMenuMaxWidth, navLabel = "Main", header, actionLabel, actionIcon = "add-circle-outline", onAction, footer, subMenuHeader, subMenu, className, style, children, ...rest }, ref) {
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
    // The rail's mode. By default it sets none and inherits the page's. With
    // `inverse` or `locked` it takes the token layer's own mode class, so its
    // subtree re-resolves every semantic token in that mode and an .ext-*
    // ancestor still applies. Only the root sets it. The page's mode is read
    // from the ancestors' classes and followed when they change: `inverse`
    // needs its shade, and both keep its contrast level (AA or AAA).
    const rootRef = React.useRef(null);
    const setRootRef = React.useCallback((node) => {
        rootRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    const [page, setPage] = React.useState({ dark: false, aaa: false });
    const ownsMode = locked || inverse;
    useBrowserLayoutEffect(() => {
        const el = rootRef.current;
        if (!ownsMode || !el)
            return;
        const read = () => setPage((prev) => {
            const next = readPageMode(el);
            return prev.dark === next.dark && prev.aaa === next.aaa ? prev : next;
        });
        read();
        const observer = new MutationObserver(read);
        for (let n = parentOf(el); n; n = parentOf(n))
            observer.observe(n, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, [ownsMode]);
    const dark = locked ? !inverse : inverse ? !page.dark : null;
    const modeClass = dark === null ? null : `mode-${page.aaa ? "aaa-" : ""}${dark ? "dark" : "light"}`;
    // Items take the content form (`wide`), not the target, so they hold the
    // wide layout through a collapse.
    const ctx = React.useMemo(() => ({ expanded: wide, showLabels, shape, modeClass }), [wide, showLabels, shape, modeClass]);
    const hasPanel = subMenu != null || subMenuHeader != null;
    const toggle = () => {
        if (expandedProp === undefined)
            setInnerExpanded(!expanded);
        onExpandedChange?.(!expanded);
    };
    return (_jsx("nav", { ref: setRootRef, "aria-label": navLabel, ...rest, className: ["zds-navigation-rail", modeClass, className].filter(Boolean).join(" "), "data-expanded": expanded ? "" : undefined, "data-wide": wide ? "" : undefined, "data-ready": ready ? "" : undefined, "data-show-labels": showLabels ? "" : undefined, "data-shape": shape, "data-inverse": inverse ? "" : undefined, "data-locked": locked ? "" : undefined, "data-mode": dark === null ? undefined : dark ? "dark" : "light", "data-divider": showDivider ? "" : undefined, "data-fill": railWidth === "fill" ? "" : undefined, style: {
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
