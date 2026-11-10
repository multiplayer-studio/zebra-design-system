import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import "./snackbar.css";
/**
 * What each contextual flavour carries (spec: variants byFlavour): a leading
 * glyph, an action and its Button flavour, whether it has a close, and
 * whether the bar is a dark one (which carries its own colour mode).
 */
const FLAVOUR = {
    info: { icon: "info", close: true, actionFlavour: "subtle" },
    positive: { icon: "check-circle", close: true, actionFlavour: "subtle" },
    warning: { icon: "warning", close: true, actionFlavour: "subtle" },
    error: { icon: "error", close: true, actionFlavour: "subtle" },
    deletion: { icon: "delete", action: "Undo", close: true, actionFlavour: "subtle" },
    view: { icon: "open-in-new-window", action: "View", close: false, actionFlavour: "subtle" },
    action: { action: "Action", close: false, actionFlavour: "outline-subtle", dark: true },
    default: { close: true, actionFlavour: "subtle", dark: true },
};
const reducedMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
/** The page's mode at the element, from the nearest .mode-* ancestor. */
function pageIsDark(el) {
    for (let n = el; n; n = n.parentElement) {
        if (n.classList.contains("mode-dark"))
            return true;
        if (n.classList.contains("mode-light"))
            return false;
    }
    return false;
}
/**
 * A brief message about something the app just did, carrying at most one
 * action. Variant chooses between a contextual pill, where Flavour sets the
 * tint, the leading glyph and the controls together, and a plain standard
 * bar.
 *
 * Primitive: Base UI's Toast is built around a toast manager (a provider and
 * a viewport own queueing, placement and timers), which does not fit the
 * spec's single, controlled bar or parity with `<zds-snackbar>`; it is the
 * natural basis for the queue the spec says does not exist yet. This is a
 * controlled component: the accessibility it needs is a live region
 * (role=status, alert on error), and its controls are the Base UI-based
 * Button and IconButton.
 *
 * Follows specs/snackbar like `<zds-snackbar>`: the action is a subtle
 * Button (outline-subtle on action), the close a subtle IconButton, both
 * medium; the message stays on one line, ending in an ellipsis where the
 * space runs out. Dark bars (action, default, standard) carry their own
 * colour mode: .mode-dark on a light page, .mode-light on a dark one, read
 * from the nearest .mode-* ancestor each time the bar opens.
 *
 * Placement and motion (spec: Motion, Layering): a manual popover in the top
 * layer, centred space/xl above the bottom of the viewport; it slides in over
 * 300ms and leaves sliding up and fading over 200ms (fade only with reduced
 * motion), and stays mounted until the exit has played.
 *
 * Kept in step with packages/web-components `<zds-snackbar>`.
 *
 * @spec specs/snackbar/snackbar.spec.md
 */
export const Snackbar = React.forwardRef(function Snackbar({ variant = "contextual", flavour = "info", shape = "rounded", open, duration = 0, actionLabel, showClose, closeLabel = "Dismiss", icon, inline = false, onAction, onClose, className, children, ...rest }, ref) {
    const rootRef = React.useRef(null);
    const surfaceRef = React.useRef(null);
    const setRefs = (node) => {
        rootRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    };
    const contextual = variant !== "standard";
    const preset = FLAVOUR[flavour] ?? FLAVOUR.info;
    const dark = contextual ? !!preset.dark : true;
    const action = actionLabel ?? (contextual ? preset.action ?? "" : "");
    const close = showClose ?? (contextual ? preset.close : false);
    const actionFlavour = contextual ? preset.actionFlavour : "subtle";
    const buttonShape = shape === "sharp" ? "sharp" : contextual ? "full" : "rounded";
    const lead = contextual ? preset.icon : undefined;
    // Mounted while open, and through the exit after open turns false.
    const [leaving, setLeaving] = React.useState(false);
    const [mode, setMode] = React.useState(null);
    const wasOpen = React.useRef(false);
    if (wasOpen.current && !open && !leaving && !inline)
        setLeaving(true);
    // Reopened mid-exit: it is simply open again.
    if (open && leaving)
        setLeaving(false);
    const shown = open || leaving;
    React.useLayoutEffect(() => {
        if (open && rootRef.current)
            setMode(dark ? (pageIsDark(rootRef.current.parentElement) ? "mode-light" : "mode-dark") : null);
    }, [open, dark]);
    React.useEffect(() => {
        const root = rootRef.current, bar = surfaceRef.current;
        if (open && !wasOpen.current && root && bar) {
            if (!inline) {
                if (!root.matches(":popover-open"))
                    root.showPopover();
                // Reopened mid-exit: drop the exit, which holds its faded end state.
                bar.getAnimations().forEach((a) => a.cancel());
                const rm = reducedMotion();
                bar.animate(rm ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: "translateY(100%)" }, { opacity: 1, transform: "none" }], { duration: rm ? 150 : 300, easing: "cubic-bezier(0.2, 0, 0, 1)" });
            }
        }
        if (!open && leaving && root && bar) {
            const rm = reducedMotion();
            const anim = bar.animate(rm ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-50%)" }], { duration: rm ? 150 : 200, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" });
            let live = true;
            anim.finished.catch(() => undefined).then(() => {
                if (!live)
                    return;
                if (root.matches(":popover-open"))
                    root.hidePopover();
                setLeaving(false);
            });
            return () => { live = false; };
        }
        wasOpen.current = open;
    }, [open, leaving, inline]);
    React.useEffect(() => { wasOpen.current = open; });
    // The timer, paused while the pointer or focus is inside.
    const [paused, setPaused] = React.useState(false);
    React.useEffect(() => {
        if (!open || duration <= 0 || paused)
            return;
        const t = setTimeout(() => onClose?.("timeout"), duration);
        return () => clearTimeout(t);
    }, [open, duration, paused, onClose]);
    if (!shown)
        return null;
    const leadIcon = lead
        ? _jsx(Icon, { className: "zds-snackbar__lead", name: lead, size: "medium" })
        : icon
            ? _jsx("span", { className: "zds-snackbar__lead", children: React.isValidElement(icon) && icon.type === Icon ? React.cloneElement(icon, { size: "medium" }) : icon })
            : null;
    return (_jsx("div", { ref: setRefs, ...rest, popover: inline ? undefined : "manual", role: contextual && flavour === "error" ? "alert" : "status", className: ["zds-snackbar", mode, className].filter(Boolean).join(" "), "data-variant": variant, "data-flavour": flavour, "data-shape": shape, "data-inline": inline || undefined, children: _jsxs("div", { ref: surfaceRef, className: "zds-snackbar__surface", "data-end": action || close ? "control" : undefined, onPointerEnter: () => setPaused(true), onPointerLeave: () => setPaused(false), onFocus: () => setPaused(true), onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget))
                setPaused(false); }, children: [leadIcon, _jsx("span", { className: "zds-snackbar__message", children: children }), action || close ? (_jsxs("span", { className: "zds-snackbar__controls", children: [action ? (_jsx(Button, { className: "zds-snackbar__action", flavour: actionFlavour, size: "medium", shape: buttonShape, onClick: () => { onAction?.(); onClose?.("action"); }, children: action })) : null, close ? (_jsx(IconButton, { className: "zds-snackbar__close", flavour: "subtle", size: "medium", shape: buttonShape, icon: "close", label: closeLabel, onClick: () => onClose?.("dismiss") })) : null] })) : null] }) }));
});
