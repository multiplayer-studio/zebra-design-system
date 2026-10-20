import * as React from "react";
import { Icon, type IconName } from "../icon/Icon.js";
import "./status-label.css";

export type StatusLabelStatus = "neutral" | "info" | "positive" | "warning" | "negative";
export type StatusLabelLeading = "indicator" | "icon" | "none";
export type StatusLabelShape = "rounded" | "sharp";

const GLYPH: Record<StatusLabelStatus, IconName> = { neutral: "info", info: "info", positive: "check-circle", warning: "warning", negative: "error" };

export interface StatusLabelProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /** Sets the fill, the border and the leading element together. positive / negative draw the success / error tokens. */
  status?: StatusLabelStatus;
  /** A dot, a glyph fixed per status, or nothing. */
  leading?: StatusLabelLeading;
  /** Pill (rounded) or square corners (sharp). */
  shape?: StatusLabelShape;
  className?: string;
}

/**
 * Reports a read-only state on an item, such as Active, Overdue or Failed.
 * Status sets the fill, the border and the leading element together while
 * the label text holds one colour throughout.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap: a
 * span, with everything visual from the token layer via `status-label.css`.
 * The children are the label and the accessible name; the dot and icon are
 * decorative.
 *
 * Kept in step with packages/web-components `<zds-status-label>`.
 *
 * @spec specs/badges/status-label.spec.md
 */
export const StatusLabel = React.forwardRef<HTMLSpanElement, StatusLabelProps>(function StatusLabel(
  { status = "neutral", leading = "indicator", shape = "rounded", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} {...rest} className={["zds-status-label", className].filter(Boolean).join(" ")} data-status={status} data-leading={leading} data-shape={shape}>
      <span className="zds-status-label__root">
        {leading === "indicator" ? <span className="zds-status-label__lead"><span className="zds-status-label__dot" /></span> : null}
        {leading === "icon" ? <Icon className="zds-status-label__lead" name={GLYPH[status] ?? "info"} size="small" iconStyle="rounded" /> : null}
        <span className="zds-status-label__label">{children}</span>
      </span>
    </span>
  );
});
