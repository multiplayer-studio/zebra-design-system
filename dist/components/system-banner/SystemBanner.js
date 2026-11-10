import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import "./system-banner.css";
/** Desktop's glyph follows Status (spec: variants byStatus); Mobile holds Verified on all four. */
const STATUS_ICON = {
    default: "check-circle",
    negative: "error",
    warning: "warning",
    info: "info",
};
/**
 * The motion (spec: Motion). In, the banner's height opens from nothing while
 * the row slides down from above, so everything below is pushed down rather
 * than covered; out plays it in reverse and pulls the content back up. Both
 * 400ms, easing out on the way in and in on the way out (no motion token
 * yet); reduced motion fades instead. Resolves true when the motion finished,
 * false when it was interrupted.
 */
function slide(banner, row, direction) {
    if (typeof banner.animate !== "function")
        return Promise.resolve(true);
    banner.getAnimations().forEach((a) => a.cancel());
    row.getAnimations().forEach((a) => a.cancel());
    const into = direction === "in";
    const settle = (a) => a.finished.then(() => true, () => false);
    if (typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const fade = [{ opacity: 0 }, { opacity: 1 }];
        return settle(banner.animate(into ? fade : fade.reverse(), { duration: 200, easing: "ease-out", fill: into ? "none" : "forwards" }));
    }
    const height = banner.getBoundingClientRect().height;
    // Out holds its collapsed end state until the banner is hidden.
    const timing = into
        ? { duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" }
        : { duration: 400, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" };
    const open = [{ height: "0px" }, { height: `${height}px` }];
    const drop = [{ transform: "translateY(-100%)" }, { transform: "none" }];
    banner.style.overflow = "hidden";
    const anim = banner.animate(into ? open : open.reverse(), timing);
    row.animate(into ? drop : drop.reverse(), timing);
    return settle(anim).then((done) => {
        if (done && into)
            banner.style.overflow = "";
        return done;
    });
}
const SHAPED = [Button, IconButton];
/** Pass the banner's shape to every Button / IconButton in `actions` (top level or inside a fragment). */
function shapeActions(node, shape) {
    return React.Children.map(node, (child) => {
        if (!React.isValidElement(child))
            return child;
        if (child.type === React.Fragment)
            return _jsx(_Fragment, { children: shapeActions(child.props.children, shape) });
        return SHAPED.includes(child.type) ? React.cloneElement(child, { shape }) : child;
    });
}
/**
 * A full-width message pinned to the top of a screen or view, carrying a
 * status colour, a title, an optional description and an optional action.
 * It spans its container and stays until something clears it.
 *
 * Locked to Dark (spec: modeLock): Figma pins palette=Dark on every variant,
 * so the root always carries .mode-dark and every element inside, the
 * dismiss IconButton and anything in `actions` included, resolves dark
 * tokens whatever mode the page is in. That is what keeps the
 * foreground/primary text and the outline-contrast action white on the
 * strong feedback colours.
 *
 * Mobile and Desktop are two Figma sets with different APIs (spec issue
 * "api (sibling sets)"); here they are one component with `layout`:
 * Desktop's Content Type is the presence of `description`, Mobile's Show
 * Description likewise, and Title is a prop on both. The banner has no
 * interaction states of its own; the dismiss is a subtle sharp IconButton,
 * medium on mobile and small on desktop.
 *
 * One shape (spec: shapeInheritance): `shape` comes from the container and
 * reaches the dismiss
 * and every Button / IconButton in `actions`; no control keeps its own.
 *
 * It reveals by sliding in from the top and pushing the content below down,
 * and removal plays that in reverse (spec: Motion): the dismiss, or `open`
 * turned false. `open` true again replays the reveal.
 *
 * Announced politely (role=status), negative interrupts (role=alert). The
 * metadata leaves announcement to the product; a live region does it for
 * free when the banner is inserted.
 *
 * Kept in step with packages/web-components `<zds-system-banner>`.
 *
 * @spec specs/system-banner-mobile/system-banner-mobile.spec.md
 * @spec specs/system-banner-desktop/system-banner-desktop.spec.md
 */
export const SystemBanner = React.forwardRef(function SystemBanner({ layout = "desktop", status = "default", shape = "sharp", title, description, showLeadingIcon = true, icon = "verified", actions, showClose = true, closeLabel = "Dismiss", open = true, onClose, className, ...rest }, ref) {
    const rootRef = React.useRef(null);
    const rowRef = React.useRef(null);
    const setRefs = (node) => {
        rootRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    };
    // Rendered while shown; hidden only after the reverse has played.
    const [visible, setVisible] = React.useState(open);
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (open === prevOpen.current)
            return;
        prevOpen.current = open;
        if (open)
            setVisible(true);
        else if (rootRef.current && rowRef.current)
            slide(rootRef.current, rowRef.current, "out").then((done) => { if (done)
                setVisible(false); });
        else
            setVisible(false);
    }, [open]);
    // Before paint, so the first frame is already the collapsed one.
    React.useLayoutEffect(() => {
        if (visible && rootRef.current && rowRef.current)
            slide(rootRef.current, rowRef.current, "in");
    }, [visible]);
    const dismiss = () => {
        const finish = () => { setVisible(false); onClose?.(); };
        if (rootRef.current && rowRef.current)
            slide(rootRef.current, rowRef.current, "out").then((done) => { if (done)
                finish(); });
        else
            finish();
    };
    const mobile = layout === "mobile";
    const glyph = mobile ? icon : STATUS_ICON[status];
    // negative removes the dismiss outright (spec: Show Close has no effect on negative).
    const close = showClose && status !== "negative";
    if (!visible)
        return null;
    return (_jsx("div", { ref: setRefs, ...rest, role: status === "negative" ? "alert" : "status", className: ["zds-system-banner", "mode-dark", className].filter(Boolean).join(" "), "data-layout": layout, "data-status": status, "data-shape": shape, "data-content": description ? "multiline" : "single", children: _jsxs("div", { ref: rowRef, className: "zds-system-banner__row", children: [showLeadingIcon ? (_jsx("span", { className: "zds-system-banner__glyph", children: _jsx(Icon, { name: glyph, size: "medium", framed: mobile }) })) : null, _jsxs("div", { className: "zds-system-banner__content", children: [_jsxs("div", { className: "zds-system-banner__text", children: [_jsx("span", { className: "zds-system-banner__title", children: title }), description ? _jsx("span", { className: "zds-system-banner__description", children: description }) : null] }), actions ? _jsx("div", { className: "zds-system-banner__actions", children: shapeActions(actions, shape) }) : null] }), close ? (_jsx(IconButton, { className: "zds-system-banner__dismiss", flavour: "subtle", shape: shape, size: mobile ? "medium" : "small", icon: "close", label: closeLabel, onClick: dismiss })) : null] }) }));
});
