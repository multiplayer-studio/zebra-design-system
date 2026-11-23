import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Dropdown } from "../dropdown/Dropdown.js";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import "./breadcrumb.css";
const Separator = () => _jsx(Icon, { className: "zds-breadcrumb__separator", name: "chevron-right", size: "small", iconStyle: "rounded" });
function Crumb({ item, current }) {
    const content = (_jsxs(_Fragment, { children: [item.icon ? _jsx(Icon, { className: "zds-breadcrumb__icon", name: item.icon, size: "small", iconStyle: "rounded" }) : null, item.label] }));
    if (current)
        return _jsx("span", { className: "zds-breadcrumb__crumb", "aria-current": "page", children: content });
    if (item.href)
        return _jsx("a", { className: "zds-breadcrumb__crumb", href: item.href, onClick: item.onSelect, children: content });
    return _jsx("button", { type: "button", className: "zds-breadcrumb__crumb", onClick: item.onSelect, children: content });
}
/**
 * Where a page sits in the hierarchy, as a trail of links back up to the root,
 * ending on the current page. `maxItems` collapses the middle of a long trail
 * into an overflow menu, which keeps every crumb reachable.
 *
 * A labelled `nav` holding an ordered list, with `aria-current="page"` on the
 * last item. Separators are decorative.
 *
 * Departures from Figma, each a spec issue:
 * - `collapsed` and `open` are derived, from `maxItems` and the menu, not props.
 * - `overflowLabel` names the overflow control, which Figma leaves unnamed.
 *
 * Kept in step with packages/web-components `<zds-breadcrumb>`.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.md
 */
export const Breadcrumb = React.forwardRef(function Breadcrumb({ items, maxItems, flavour = "default", shape = "rounded", label = "Breadcrumb", overflowLabel = "Show hidden pages", portalContainer, className, ...rest }, ref) {
    const kept = Math.max(maxItems ?? items.length, 2);
    const collapsed = items.length > kept;
    const hidden = collapsed ? items.slice(1, items.length - kept + 1) : [];
    const trailing = collapsed ? items.slice(items.length - kept + 1) : items.slice(1);
    const last = items.length - 1;
    const select = (item) => {
        item.onSelect?.();
        if (item.href)
            window.location.assign(item.href);
    };
    return (_jsx("nav", { ref: ref, "aria-label": label, ...rest, className: ["zds-breadcrumb", className].filter(Boolean).join(" "), "data-shape": shape, "data-flavour": flavour, children: _jsxs("ol", { className: "zds-breadcrumb__list", children: [items.length ? (_jsxs("li", { className: "zds-breadcrumb__item", children: [_jsx(Crumb, { item: items[0], current: last === 0 }), last > 0 ? _jsx(Separator, {}) : null] })) : null, collapsed ? (_jsxs("li", { className: "zds-breadcrumb__item", children: [_jsx(Dropdown, { compact: true, rounded: shape === "rounded", portalContainer: portalContainer, trigger: _jsx(IconButton, { flavour: "outline-subtle", size: "small", shape: shape, icon: "more-horizontal", label: overflowLabel }), children: hidden.map((item) => (_jsx(MenuItem, { leadingIcon: item.icon, onClick: () => select(item), children: item.label }, `${item.label}-${item.href ?? ""}`))) }), _jsx(Separator, {})] })) : null, trailing.map((item, index) => (_jsxs("li", { className: "zds-breadcrumb__item", children: [_jsx(Crumb, { item: item, current: index === trailing.length - 1 }), index < trailing.length - 1 ? _jsx(Separator, {}) : null] }, `${item.label}-${item.href ?? ""}`)))] }) }));
});
