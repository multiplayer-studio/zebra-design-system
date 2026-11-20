import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Toggle } from "@base-ui/react/toggle";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Divider } from "../divider/Divider.js";
import "./accordion.css";
const AccordionContext = React.createContext({
    selectable: false,
    rounded: false,
    inCard: true,
});
// Disclosure controls of this accordion's own rows, never a nested one's.
const TRIGGER = ".zds-accordion__trigger, .zds-accordion__control";
const NAV_KEYS = new Set(["ArrowDown", "ArrowUp", "Home", "End"]);
/**
 * A vertically stacked list of disclosure rows sharing one container, for a
 * page that has more sections than it has room to show at once.
 *
 * Behaviour comes from Base UI's Accordion: the `button` + `aria-expanded` /
 * `aria-controls` trigger inside a heading, the `region` panel labelled by it,
 * single or `multiple` expansion, disabled rows, and the panel height exposed
 * as `--accordion-panel-height` so the open and close can animate. Base UI
 * 1.8 dropped arrow-key movement between headers (APG update); the owner asks
 * for it, so Up / Down / Home / End between this accordion's own triggers is
 * the one piece of keyboard handling added here, matching `<zds-accordion>`.
 *
 * Built apart from CollapsibleCard (spec analysis): that is one card that
 * folds, this is a list of rows with one shared outline.
 *
 * Kept in step with packages/web-components `<zds-accordion>`.
 *
 * @spec specs/accordion/accordion.spec.md
 */
export const Accordion = React.forwardRef(function Accordion({ selectable = true, rounded = false, inCard = true, multiple = false, value, defaultValue, onValueChange, onKeyDown, className, children, ...rest }, ref) {
    const ctx = React.useMemo(() => ({ selectable, rounded, inCard }), [selectable, rounded, inCard]);
    const handleKeyDown = (event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || !NAV_KEYS.has(event.key))
            return;
        const root = event.currentTarget;
        const target = event.target;
        if (!target.matches(TRIGGER) || target.closest(".zds-accordion") !== root)
            return;
        const triggers = [...root.querySelectorAll(TRIGGER)].filter((t) => t.closest(".zds-accordion") === root && !t.hasAttribute("disabled") && !t.hasAttribute("data-disabled"));
        const i = triggers.indexOf(target);
        const last = triggers.length - 1;
        const next = event.key === "Home" ? 0 : event.key === "End" ? last : event.key === "ArrowDown" ? (i + 1 > last ? 0 : i + 1) : i - 1 < 0 ? last : i - 1;
        event.preventDefault();
        triggers[next]?.focus();
    };
    return (_jsx(AccordionContext.Provider, { value: ctx, children: _jsx(BaseAccordion.Root, { ref: ref, ...rest, value: value, defaultValue: defaultValue, onValueChange: onValueChange, multiple: multiple, onKeyDown: handleKeyDown, className: ["zds-accordion", className].filter(Boolean).join(" "), "data-selectable": selectable ? "" : undefined, "data-rounded": rounded ? "" : undefined, "data-in-card": inCard ? "" : undefined, children: children }) }));
});
/**
 * One row of an Accordion: a header holding the title and its disclosure
 * control, and the content it reveals. Use inside `<Accordion>`, which
 * decides whether the row is selectable, its divider and its control's shape.
 *
 * Kept in step with packages/web-components `<zds-accordion-item>`.
 *
 * @spec specs/accordion/accordion.spec.md (subcomponents › Accordion Item, Accordion Header)
 */
export const AccordionItem = React.forwardRef(function AccordionItem({ value, heading, selected, defaultSelected = false, onSelectedChange, disabled, className, children, ...rest }, ref) {
    const { selectable, rounded, inCard } = React.useContext(AccordionContext);
    const [innerSelected, setInnerSelected] = React.useState(defaultSelected);
    const isSelected = selected ?? innerSelected;
    return (_jsxs(BaseAccordion.Item, { ref: ref, ...rest, value: value, disabled: disabled, className: ["zds-accordion__item", className].filter(Boolean).join(" "), "data-selected": selectable && isSelected ? "" : undefined, children: [_jsx(BaseAccordion.Header, { className: "zds-accordion__header", "data-selectable": selectable ? "" : undefined, children: selectable ? (_jsxs(_Fragment, { children: [_jsx(BaseAccordion.Trigger, { className: "zds-accordion__control", render: _jsx(IconButton, { flavour: "subtle", size: "medium", shape: rounded ? "rounded" : "sharp", icon: "chevron-right", label: `${heading} details` }) }), _jsxs(Toggle, { className: "zds-accordion__select", pressed: isSelected, disabled: disabled, onPressedChange: (next) => {
                                if (selected === undefined)
                                    setInnerSelected(next);
                                onSelectedChange?.(next);
                            }, children: [_jsx("span", { className: "zds-accordion__heading", children: _jsx("span", { className: "zds-accordion__title", children: heading }) }), isSelected ? (_jsx(Icon, { className: "zds-accordion__mark", name: "check-mark", size: "medium", framed: true })) : null] })] })) : (_jsxs(BaseAccordion.Trigger, { className: "zds-accordion__trigger", children: [_jsx("span", { className: "zds-accordion__heading", children: _jsx("span", { className: "zds-accordion__title", children: heading }) }), _jsx(Icon, { className: "zds-accordion__caret", name: "expand-more", size: "medium" })] })) }), _jsx(BaseAccordion.Panel, { className: "zds-accordion__panel", children: _jsx("div", { className: "zds-accordion__content", children: children }) }), inCard ? _jsx(Divider, { className: "zds-accordion__divider" }) : null] }));
});
