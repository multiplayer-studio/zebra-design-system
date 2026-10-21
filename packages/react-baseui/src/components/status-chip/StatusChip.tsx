import * as React from "react";
import { cx, type ChipShape } from "../chip/chip.js";
import "./status-chip.css";

export type StatusChipStatus = "default" | "success" | "warning" | "negative" | "info";

export interface StatusChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
  /** The standing being reported. Sets the fill only; the label colour never changes. */
  status?: StatusChipStatus;
  /** radius/element-sm (rounded) or square (sharp) corners. */
  shape?: ChipShape;
  className?: string;
}

/**
 * Shows a read-only state or attribute of an item, such as its progress or
 * availability, so it can be scanned at a glance. The children are the
 * label and the only thing that names the state — the colour supports the
 * word, it does not replace it. Not interactive: no role, not focusable, no
 * hover. Use FilterChip or AssistChip when someone needs to act on it.
 *
 * Overlap: this is the same read-only state word as StatusLabel (five
 * standings, the same feedback fills). Built as specced by owner decision;
 * StatusLabel is the richer of the two (border, dot or icon). Prefer one per
 * product. status=default uses the neutral feedback fill, not Figma's
 * interactive hover token (spec issue).
 *
 * Static, so there is no Base UI primitive to wrap: a span.
 *
 * Kept in step with packages/web-components `<zds-status-chip>`.
 *
 * @spec specs/status-chip/status-chip.spec.md
 */
export const StatusChip = React.forwardRef<HTMLSpanElement, StatusChipProps>(function StatusChip(
  { status = "default", shape = "rounded", className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} {...rest} className={cx("zds-chip", "zds-status-chip", className)} data-status={status} data-shape={shape}>
      <span className="zds-chip__label">{children}</span>
    </span>
  );
});
