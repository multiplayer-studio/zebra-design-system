import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Button } from "../button/Button.js";
import { NavigationHeader } from "../navigation-rail/NavigationHeader.js";
import { Scrim } from "../scrim/Scrim.js";
import { NavigationRailContext } from "../navigation-rail/context.js";
import "./navigation-drawer.css";
const REASON = {
    "trigger-press": "trigger",
    "close-press": "close",
    "escape-key": "escape",
    "outside-press": "backdrop",
};
const cssLength = (v) => v === undefined || v === "" ? undefined : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);
/** A click on something that navigates: a link, or a button that is not a group header. */
function isDestination(target, root) {
    const el = target?.closest?.("a[href], button");
    if (!el || !root.contains(el))
        return false;
    if (el.hasAttribute("aria-expanded") || el.getAttribute("aria-disabled") === "true" || el.disabled)
        return false;
    return !el.closest("[data-zds-drawer-keep-open]");
}
/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family rather than new parts: put a
 * NavigationHeader at the top, then SubMenuItems for destinations,
 * CollapsibleMenuItems for groups and Dividers in the menu and footer. The
 * drawer has no collapsed form, so every row is a SubMenuItem (a group's
 * header is one too) and glyphs, labels and heights line up; use
 * NavigationRailItem in the rail, not here (owner decision). The drawer
 * hands its `shape` down through the rail's context. Unlike the rail, the
 * drawer follows the page's colour mode; it is not locked to dark.
 *
 * Modal (default): Base UI's Dialog provides the focus trap, initial focus,
 * focus return to the trigger, Escape and outside-click dismissal, scroll
 * lock and the portal. The backdrop is the Scrim component (tone scrim). The
 * drawer slides in from its edge with animations/smooth, and not at all
 * under reduced motion. Choosing a destination closes it.
 *
 * Standard (`modal={false}`): a plain `<nav>` in the layout. Closed, it
 * narrows to nothing and is inert, so the content beside it takes the space.
 *
 * Scrolling (owner decision): only the header is frozen, sticky at the top.
 * The menu never scrolls on its own and the footer is never pinned; it
 * follows the menu. A standard drawer grows with its content and the page
 * scrolls it; a modal drawer scrolls as one surface with no scrollbar.
 *
 * Surface: the modal drawer is raised like Dialog (surface/overlay,
 * shadow/large); the standard one sits on surface/section like the rail.
 * No width token exists, so the 320px default is a literal named once in
 * the CSS.
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.md
 */
export const NavigationDrawer = React.forwardRef(function NavigationDrawer({ modal = true, open: openProp, defaultOpen = false, onOpenChange, side = "start", dismissible = true, closeOnNavigate = true, 
// Spec: the header's close button shows by default (Figma Show Icon Button = true).
showClose = true, closeLabel = "Close navigation", trigger, navLabel = "Main", header, actionLabel, actionIcon = "add-circle-outline", onAction, children, footer, shape = "rounded", width, portalContainer, className, style, }, ref) {
    const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
    const open = openProp ?? innerOpen;
    const setOpen = (next, reason) => {
        if (openProp === undefined)
            setInnerOpen(next);
        onOpenChange?.(next, reason);
    };
    // Nothing animates on mount, so a drawer that starts open doesn't slide in.
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, []);
    // The rail's parts render wide and take this shape; modeClass null = follow the page.
    const ctx = React.useMemo(() => ({ expanded: true, showLabels: false, shape, modeClass: null }), [shape]);
    // The close button is the header's own Icon Button (owner decision): one
    // treatment, aligned with the title, never a separate control.
    const closable = showClose && React.isValidElement(header) && header.type === NavigationHeader;
    const headerNode = closable
        ? React.cloneElement(header, {
            showIconButton: true,
            actionIcon: "close",
            actionLabel: closeLabel,
            onAction: () => setOpen(false, "close"),
        })
        : header;
    // A click on a destination closes a modal drawer; the header's close button reports "close" itself.
    const onPanelClick = (e) => {
        if (closable && e.target.closest?.(".zds-navigation-header"))
            return;
        if (closeOnNavigate && isDestination(e.target, e.currentTarget))
            setOpen(false, "navigate");
    };
    const body = (_jsxs(NavigationRailContext.Provider, { value: ctx, children: [header != null || actionLabel ? (_jsxs("div", { className: "zds-navigation-drawer__header", children: [headerNode, actionLabel ? (_jsx(Button, { className: "zds-navigation-drawer__action", size: "large", shape: shape, flavour: "primary", leadingIcon: actionIcon, onClick: onAction, "data-zds-drawer-keep-open": "", children: actionLabel })) : null] })) : null, _jsx("div", { className: "zds-navigation-drawer__menu", children: children }), footer != null ? _jsx("div", { className: "zds-navigation-drawer__footer", children: footer }) : null] }));
    const shared = {
        className: ["zds-navigation-drawer", className].filter(Boolean).join(" "),
        "data-side": side,
        "data-shape": shape,
        "data-ready": ready ? "" : undefined,
        style: { ...style, "--zds-navigation-drawer-width": cssLength(width) },
    };
    if (!modal) {
        return (_jsx("nav", { ref: ref, "aria-label": navLabel, ...shared, "data-modal": undefined, "data-open": open ? "" : undefined, 
            // Closed, nothing inside is reachable by Tab or assistive tech.
            inert: !open || undefined, children: _jsx("div", { className: "zds-navigation-drawer__panel", children: body }) }));
    }
    return (_jsxs(BaseDialog.Root, { open: open, disablePointerDismissal: !dismissible, onOpenChange: (next, details) => {
            if (!dismissible && !next && (details.reason === "escape-key" || details.reason === "outside-press")) {
                details.cancel();
                return;
            }
            setOpen(next, REASON[details.reason] ?? "other");
        }, children: [trigger ? _jsx(BaseDialog.Trigger, { render: trigger }) : null, _jsxs(BaseDialog.Portal, { container: portalContainer, children: [_jsx(BaseDialog.Backdrop, { className: "zds-navigation-drawer__backdrop", render: _jsx(Scrim, { tone: "scrim" }) }), _jsx(BaseDialog.Popup, { ref: ref, ...shared, "data-modal": "", "aria-label": navLabel, onClick: onPanelClick, children: _jsx("nav", { "aria-label": navLabel, className: "zds-navigation-drawer__panel", children: body }) })] })] }));
});
