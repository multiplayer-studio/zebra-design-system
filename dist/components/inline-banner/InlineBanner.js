import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import "./inline-banner.css";
const STATUS_ICON = {
    neutral: "lightbulb",
    info: "info",
    positive: "check-circle",
    warning: "warning",
    negative: "error",
};
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
 * A status message placed inside the content it is about (a form, a card, a
 * panel), not pinned to the screen like SystemBanner. It sits in the flow at
 * the width of its container.
 *
 * Five statuses, each in two appearances:
 * - solid: the strong feedback fill with foreground/on-strong text. For the
 *   one message on a view that must be seen now.
 * - subtle: the faint feedback tint with a status border and the status
 *   colour on the glyph only. For context and guidance; several can share a
 *   page.
 *
 * On solid, the controls sit in a Dark scope (Figma pins palette=Dark on the
 * action slot and the dismiss) so outline-contrast actions and the dismiss
 * draw light on any fill; the fill itself follows the page's mode.
 *
 * The text keeps a 16rem minimum before the actions wrap beneath it (spec
 * gap: no size token). Description and actions render when they are set,
 * which is the spec's showDescription and showActions.
 *
 * Announced politely (role=status); negative interrupts (role=alert).
 *
 * Kept in step with packages/web-components `<zds-inline-banner>`.
 *
 * @spec specs/inline-banner/inline-banner.spec.json
 */
export const InlineBanner = React.forwardRef(function InlineBanner({ status = "info", appearance = "subtle", shape = "rounded", title, description, showIcon = true, icon, actions, showClose = false, closeLabel = "Dismiss", onClose, className, ...rest }, ref) {
    const solid = appearance === "solid";
    const controls = solid ? "mode-dark" : undefined;
    return (_jsxs("div", { ref: ref, ...rest, role: status === "negative" ? "alert" : "status", className: ["zds-inline-banner", className].filter(Boolean).join(" "), "data-status": status, "data-appearance": appearance, "data-shape": shape, children: [showIcon ? (_jsx("span", { className: "zds-inline-banner__glyph", children: _jsx(Icon, { name: icon ?? STATUS_ICON[status], size: "medium" }) })) : null, _jsxs("div", { className: "zds-inline-banner__content", children: [_jsxs("div", { className: "zds-inline-banner__text", children: [_jsx("span", { className: "zds-inline-banner__title", children: title }), description ? _jsx("span", { className: "zds-inline-banner__description", children: description }) : null] }), actions ? _jsx("div", { className: ["zds-inline-banner__actions", controls].filter(Boolean).join(" "), children: shapeActions(actions, shape) }) : null] }), showClose ? (_jsx("span", { className: ["zds-inline-banner__dismiss", controls].filter(Boolean).join(" "), children: _jsx(IconButton, { flavour: "subtle", shape: shape, size: "small", icon: "close", label: closeLabel, onClick: onClose }) })) : null] }));
});
