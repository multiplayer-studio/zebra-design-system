import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Button } from "../button/Button.js";
import "./dialog.css";
// Flavour sets the header glyph and nothing else (spec: flavour.glyphByValue).
const GLYPH = {
    default: "block",
    error: "error",
    info: "info",
    success: "verified",
    warning: "warning",
};
const REASON = {
    "trigger-press": "trigger",
    "close-press": "close",
    "escape-key": "escape",
    "outside-press": "backdrop",
};
function classes(...c) {
    return c.filter(Boolean).join(" ");
}
/**
 * A modal message that interrupts the current task until the user responds or
 * dismisses it. A header carries the flavour glyph, the title and a close
 * button; the body holds the message; an optional footer offers one to three
 * preset buttons (primary; secondary + primary; tertiary | secondary +
 * primary) or two custom slots.
 *
 * Behaviour — the backdrop, the focus trap, initial focus (the first
 * focusable, which is the close button when shown), focus returning to the
 * trigger, Escape and outside-click dismissal, scroll lock and portalling
 * above the page — comes from Base UI's Dialog
 * (Root/Trigger/Portal/Backdrop/Popup/Title/Description/Close). Title and
 * Description label and describe the popup. Everything visual comes from the
 * token layer via `dialog.css`.
 *
 * Kept in step with packages/web-components `<zds-dialog>`.
 *
 * @spec specs/dialog/dialog.spec.md
 */
export const Dialog = React.forwardRef(function Dialog({ heading, children, flavour = "default", shape = "rounded", showFooter = true, showClose = true, closeLabel = "Close", primaryLabel, secondaryLabel, tertiaryLabel, footerStart, footerEnd, onAction, keepOpenOnAction = false, dismissible = true, open, defaultOpen, onOpenChange, trigger, inline = false, portalContainer, className, }, ref) {
    // Shape is one decision for the whole dialog (spec: "the two cannot be
    // mixed"): it picks the footer buttons' and close button's shape and the
    // glyph family. spec issue "Shape misses the close glyph": Figma leaves the
    // close glyph rounded in sharp dialogs; here it follows shape like the rest.
    const iconStyle = shape === "sharp" ? "sharp" : "rounded";
    const titleId = React.useId();
    // Plain elements when inline (no Root to give Base UI parts their context).
    const Title = inline ? "h2" : BaseDialog.Title;
    const close = (
    // spec issue "The close control is a bare Icon": an IconButton (subtle,
    // so it carries hover/pressed/focus states and a hit area) with an
    // accessible name, not a bare glyph.
    _jsx(IconButton, { className: "zds-dialog__close", flavour: "subtle", size: "medium", shape: shape, icon: "close", label: closeLabel }));
    const action = (which, label, flavour) => {
        const btn = (_jsx(Button, { flavour: flavour, size: "medium", shape: shape, onClick: () => onAction?.(which), children: label }));
        // A closing action goes through Dialog.Close so Base UI closes the dialog
        // and returns focus; its onOpenChange reason is reported as "action".
        return inline || keepOpenOnAction ? (_jsx(React.Fragment, { children: btn }, which)) : (_jsx(BaseDialog.Close, { render: btn, "data-zds-action": "" }, which));
    };
    // spec issue "Footer presets aren't exposed": the 1 / 2 / 3 layouts follow
    // from which labels are set; footerStart / footerEnd are the custom preset.
    const custom = footerStart != null || footerEnd != null;
    const end = custom
        ? footerEnd
        : [secondaryLabel ? action("secondary", secondaryLabel, "outline-subtle") : null,
            primaryLabel ? action("primary", primaryLabel, "primary") : null];
    const start = custom ? footerStart : tertiaryLabel ? action("tertiary", tertiaryLabel, "text") : null;
    const hasFooterContent = custom || Boolean(primaryLabel || secondaryLabel || tertiaryLabel);
    const split = custom || Boolean(tertiaryLabel);
    const panel = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "zds-dialog__header", children: [_jsxs("div", { className: "zds-dialog__title-group", children: [_jsx(Icon, { className: "zds-dialog__icon", name: GLYPH[flavour] ?? GLYPH.default, iconStyle: iconStyle, size: "medium" }), _jsx(Title, { className: "zds-dialog__title", id: inline ? titleId : undefined, children: heading })] }), showClose ? (inline ? close : _jsx(BaseDialog.Close, { render: close })) : null] }), inline ? (_jsx("div", { className: "zds-dialog__body", children: children })) : (_jsx(BaseDialog.Description, { render: _jsx("div", {}), className: "zds-dialog__body", children: children })), showFooter && hasFooterContent ? (_jsxs("div", { className: "zds-dialog__footer", "data-layout": split ? "split" : "end", children: [split ? _jsx("div", { className: "zds-dialog__footer-start", children: start }) : null, _jsx("div", { className: "zds-dialog__footer-end", children: end })] })) : null] }));
    const shared = {
        className: classes("zds-dialog", inline && "zds-dialog--inline", className),
        "data-flavour": flavour,
        "data-shape": shape,
    };
    if (inline) {
        return (_jsx("div", { ref: ref, role: "dialog", "aria-labelledby": titleId, ...shared, children: panel }));
    }
    return (_jsxs(BaseDialog.Root, { open: open, defaultOpen: defaultOpen, disablePointerDismissal: !dismissible, onOpenChange: (next, details) => {
            const target = details.event?.target;
            const fromAction = details.reason === "close-press" && !!target?.closest?.("[data-zds-action]");
            if (!dismissible && !next && (details.reason === "escape-key" || details.reason === "outside-press")) {
                details.cancel();
                return;
            }
            onOpenChange?.(next, fromAction ? "action" : REASON[details.reason] ?? "other");
        }, children: [trigger ? _jsx(BaseDialog.Trigger, { render: trigger }) : null, _jsxs(BaseDialog.Portal, { container: portalContainer, children: [_jsx(BaseDialog.Backdrop, { className: "zds-dialog__backdrop" }), _jsx(BaseDialog.Popup, { ref: ref, ...shared, children: panel })] })] }));
});
