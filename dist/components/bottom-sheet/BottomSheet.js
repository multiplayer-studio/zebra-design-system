import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { CardFooter } from "../card-footer/CardFooter.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Scrim } from "../scrim/Scrim.js";
import "./bottom-sheet.css";
const REASON = { "escape-key": "escape", "outside-press": "backdrop" };
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions.
 *
 * By default it only draws the surface, and the screen presents it. With
 * `modal`, it presents itself through Base UI's Dialog: anchored to the bottom
 * of the viewport over a `Scrim` (tone scrim), focus trapped, Escape and a
 * scrim click closing it when `dismissible`. It rises from the bottom edge
 * (animations/smooth; none under reduced motion). Figma defines no motion,
 * so that is a code decision.
 *
 * Departures from Figma, each a spec issue:
 * - `heading`, `headerIcon`, `showLeadingIcon`, `headerAlignment` and
 *   `actions` are inputs, because Figma sets them on nested instances.
 * - The sheet fills its container (Figma ships a fixed 360).
 *
 * Kept in step with packages/web-components `<zds-bottom-sheet>`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.md
 */
export const BottomSheet = React.forwardRef(function BottomSheet({ contentType = "list", heading = "Sheet Title", headerIcon = "arrow-back", showLeadingIcon = true, leadingLabel = "Back", onLeadingClick, headerAlignment = "start", actions, modal = false, open = false, dismissible = true, onOpenChange, portalContainer, className, children, ...rest }, ref) {
    const titleId = React.useId();
    const [content, setContent] = React.useState(null);
    const sheet = (_jsxs("section", { ref: ref, "aria-labelledby": titleId, ...rest, className: ["zds-bottom-sheet", className].filter(Boolean).join(" "), "data-content-type": contentType, "data-header-alignment": headerAlignment, children: [_jsx("div", { className: "zds-bottom-sheet__handle", children: _jsx("span", { className: "zds-bottom-sheet__bar" }) }), _jsxs("div", { className: "zds-bottom-sheet__header", children: [showLeadingIcon ? _jsx(IconButton, { className: "zds-bottom-sheet__icon", flavour: "subtle", size: "small", shape: "rounded", icon: headerIcon, label: leadingLabel, onClick: onLeadingClick }) : null, _jsx("h2", { id: titleId, className: "zds-bottom-sheet__title", children: heading })] }), _jsx("div", { ref: setContent, className: "zds-bottom-sheet__content", children: contentType === "list" ? (
                // MenuItem needs Base UI's Menu around it. The sheet is always open, so the rows mount in place.
                _jsxs(Menu.Root, { open: true, modal: false, children: [_jsx(Menu.Trigger, { render: _jsx("button", { type: "button", hidden: true }) }), _jsx(Menu.Portal, { keepMounted: true, container: content, children: _jsx(Menu.Positioner, { style: { position: "static", transform: "none", visibility: "visible" }, children: _jsx(Menu.Popup, { className: "zds-bottom-sheet__list", finalFocus: false, children: children }) }) })] })) : children }), actions ? _jsx(CardFooter, { className: "zds-bottom-sheet__footer", children: actions }) : null] }));
    if (!modal)
        return sheet;
    return (_jsx(BaseDialog.Root, { open: open, disablePointerDismissal: !dismissible, onOpenChange: (next, details) => {
            if (!dismissible && !next && (details.reason === "escape-key" || details.reason === "outside-press")) {
                details.cancel();
                return;
            }
            onOpenChange?.(next, REASON[details.reason] ?? "other");
        }, children: _jsxs(BaseDialog.Portal, { container: portalContainer, children: [_jsx(BaseDialog.Backdrop, { className: "zds-bottom-sheet__backdrop", render: _jsx(Scrim, { tone: "scrim" }) }), _jsx(BaseDialog.Popup, { className: "zds-bottom-sheet__popup", "aria-labelledby": titleId, children: sheet })] }) }));
});
