import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import { IconButton } from "../icon-button/IconButton.js";
import "./progress-circle.css";
/** Sizes that can hold the 36px upload control. */
const UPLOAD_SIZES = new Set(["small", "medium", "large"]);
/**
 * A ring that reports an ongoing process where a bar will not fit, with an
 * optional file-transfer control (percentage or cancel) at its centre.
 *
 * Behaviour and ARIA (`role="progressbar"`, `aria-valuenow/min/max`,
 * `aria-valuetext`) come from Base UI's Progress; indeterminate also sets
 * `aria-busy`. The progressbar is the ring only, and the cancel button is its
 * sibling, so the button stays reachable (a progressbar's children are
 * presentational). The readout is aria-hidden: it repeats the value the
 * progressbar already exposes.
 *
 * Cancel is an IconButton (subtle, full, small, `close`) with its own states
 * and an accessible name, not Figma's pinned hover.
 *
 * Kept in step with packages/web-components `<zds-progress-circle>`.
 *
 * @spec specs/progress-circle/progress-circle.spec.md
 */
export const ProgressCircle = React.forwardRef(function ProgressCircle({ value = 0, min = 0, max = 100, size = "xxsmall", rounded = true, showTrack = true, upload = false, showCancel = false, cancelLabel = "Cancel upload", onCancel, label, className, ...rest }, ref) {
    const determinate = value != null && Number.isFinite(value);
    const percent = determinate
        ? max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0
        : null;
    const readout = percent != null ? new Intl.NumberFormat(undefined, { style: "percent" }).format(percent / 100) : "";
    const showUpload = upload && UPLOAD_SIZES.has(size);
    return (_jsxs("div", { ref: ref, className: ["zds-progress-circle", className].filter(Boolean).join(" "), "data-size": size, "data-rounded": rounded ? "" : undefined, children: [_jsx(Progress.Root, { "aria-label": label, "aria-busy": determinate ? undefined : true, ...rest, className: "zds-progress-circle__ring", value: determinate ? value : null, min: min, max: max, children: _jsxs("svg", { className: "zds-progress-circle__svg", "aria-hidden": "true", focusable: "false", children: [showTrack ? _jsx("circle", { className: "zds-progress-circle__track" }) : null, _jsx("circle", { className: "zds-progress-circle__arc", pathLength: 100, "data-empty": percent === 0 ? "" : undefined, style: percent != null ? { "--zds-progress-circle-value": percent } : undefined })] }) }), showUpload ? (_jsx("div", { className: "zds-progress-circle__upload", children: showCancel ? (_jsx(IconButton, { className: "zds-progress-circle__cancel", flavour: "subtle", shape: "full", size: "small", icon: "close", label: cancelLabel, onClick: onCancel })) : (_jsx("span", { className: "zds-progress-circle__readout", "aria-hidden": "true", children: readout })) })) : null] }));
});
