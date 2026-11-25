import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { Icon } from "../icon/Icon.js";
import "./segmented-control.css";
// Hoisted: a fresh [] default would be a new identity every render.
const NO_OPTIONS = [];
/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export function segmentFlavour(option, flavour) {
    if (flavour === "text-only" || !option.icon)
        return "text-only";
    return flavour;
}
/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export function resolveSegmentedValue(options, wanted) {
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.some((o) => o.value === wanted))
        return wanted;
    if (enabled.length)
        return enabled[0].value;
    return options.some((o) => o.value === wanted) ? wanted : options[0]?.value;
}
/**
 * Places the track's one active indicator over the chosen segment by writing
 * its box into custom properties on the track. `data-indicator` turns the
 * indicator on (until then the chosen segment carries its own fill), and
 * `data-sliding` turns the transition on only when the chosen value changed —
 * so the first placement lands in place.
 */
function placeIndicator(track, index, slide) {
    const seg = track.querySelectorAll(".zds-segmented-control__segment")[index];
    if (!seg) {
        track.removeAttribute("data-indicator");
        return false;
    }
    // Read everything first, then write: a layout read between the writes
    // would commit the new position before [data-sliding] lands, and that
    // property would jump instead of sliding.
    const t = track.getBoundingClientRect();
    const s = seg.getBoundingClientRect();
    const x = s.left - t.left - track.clientLeft;
    const y = s.top - t.top - track.clientTop;
    // undefined (a re-measure) leaves the sliding state as it is, so a
    // re-measure mid-slide cannot cut the slide short.
    if (slide !== undefined)
        track.toggleAttribute("data-sliding", slide);
    const st = track.style;
    st.setProperty("--zds-seg-indicator-x", `${x}px`);
    st.setProperty("--zds-seg-indicator-y", `${y}px`);
    st.setProperty("--zds-seg-indicator-w", `${s.width}px`);
    st.setProperty("--zds-seg-indicator-h", `${s.height}px`);
    track.setAttribute("data-indicator", "");
    return true;
}
/**
 * A row of mutually exclusive options sharing one track, where exactly one
 * is active at a time. Use it to switch a mode within one view; reach for
 * tabs when the choice moves between views.
 *
 * Behaviour comes from Base UI's RadioGroup + Radio, not ToggleGroup. A
 * single-mode ToggleGroup is a row of `aria-pressed` buttons that can be
 * un-pressed back to no value and whose arrow keys only move focus; the spec
 * asks for exactly one active option and a radiogroup role, which is what
 * RadioGroup is: `role="radiogroup"` / `role="radio"` + `aria-checked`, one
 * tab stop, arrow keys move and select, no way to deselect, plus a hidden
 * input for forms. The value is always passed down controlled, so a value
 * that names no enabled option can fall back to the first enabled one.
 *
 * The active background is one indicator bound to the track, not to a
 * segment, and slides between segments (spec Motion). RadioGroup has no
 * indicator part, so the chosen segment is measured (layout effect +
 * ResizeObserver) into custom properties the CSS positions it from.
 *
 * Name the control with `aria-label` or `aria-labelledby`.
 *
 * Kept in step with packages/web-components `<zds-segmented-control>`.
 *
 * @spec specs/segmented-control/segmented-control.spec.md
 */
export const SegmentedControl = React.forwardRef(function SegmentedControl({ options = NO_OPTIONS, value, defaultValue, onValueChange, shape = "rounded", inverse = false, flavour = "default", className, ...rest }, ref) {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const current = resolveSegmentedValue(options, value !== undefined ? value : uncontrolled);
    const index = options.findIndex((o) => o.value === current);
    const trackRef = React.useRef(null);
    const setRefs = React.useCallback((node) => {
        trackRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    // Measure after every layout-affecting change, before paint. The first
    // placement lands in place, a change of value slides, anything else
    // re-measures and leaves the sliding state alone.
    const placed = React.useRef(undefined);
    const indexRef = React.useRef(index);
    indexRef.current = index;
    React.useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track)
            return;
        // Only a placement that landed counts (options can arrive after mount).
        if (placeIndicator(track, index, placed.current === undefined ? false : placed.current !== current || undefined))
            placed.current = current;
    }, [current, index, options, shape, flavour, inverse]);
    // Segment sizes change without a render (web fonts landing, the track
    // reflowing): re-measure, leaving the sliding state alone.
    React.useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track || typeof ResizeObserver === "undefined")
            return;
        const ro = new ResizeObserver(() => placeIndicator(track, indexRef.current));
        ro.observe(track);
        track.querySelectorAll(".zds-segmented-control__segment").forEach((s) => ro.observe(s));
        return () => ro.disconnect();
    }, [options, flavour]);
    // The icon family stays rounded in every shape: Figma pins the rounded
    // Star in all 54 _Segmented item variants (spec note "The icon family
    // stays rounded in every Shape"), unlike Button.
    return (_jsxs(RadioGroup, { ref: setRefs, ...rest, value: current, onValueChange: (v, details) => {
            setUncontrolled(v);
            onValueChange?.(v, details);
        }, className: ["zds-segmented-control", className].filter(Boolean).join(" "), "data-shape": shape, "data-inverse": inverse ? "" : undefined, "data-flavour": flavour, children: [_jsx("span", { className: "zds-segmented-control__indicator", "aria-hidden": "true" }), options.map((o) => {
                const f = segmentFlavour(o, flavour);
                return (_jsxs(Radio.Root, { value: o.value, disabled: o.disabled, className: "zds-segmented-control__segment", "data-flavour": f, "aria-label": f === "icon-only" ? o.label : undefined, title: f === "icon-only" ? o.label : undefined, children: [o.icon && f !== "text-only" ? (_jsx(Icon, { className: "zds-segmented-control__icon", name: o.icon, size: "small", iconStyle: "rounded" })) : null, f !== "icon-only" ? _jsx("span", { className: "zds-segmented-control__label", children: o.label }) : null] }, o.value));
            })] }));
});
