import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon, type IconName } from "../icon/Icon.js";
import { textOf } from "../chip/chip.js";
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
  /** Show the discard control after the label. Defaults to whether `onDiscard` is set. */
  discardable?: boolean;
  /**
   * Called when the discard control is activated (click, Enter / Space, or
   * Backspace / Delete while focused). Removing the label is the caller's job.
   */
  onDiscard?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  /** Accessible name of the discard control. Defaults to "Remove <label>". */
  discardLabel?: string;
  className?: string;
}

/**
 * Reports a read-only state on an item, such as Active or Overdue. Status
 * sets the fill, the border and the leading element together while the
 * label text holds one colour throughout. Discardable adds the one control
 * in the badge family: a dismiss that removes the label, never a select.
 *
 * The label is a span; only the discard control is interactive, and it
 * wraps Base UI's Button for focus and keyboard. The children are the label
 * and the accessible name; the dot and icon are decorative.
 *
 * Kept in step with packages/web-components `<zds-status-label>`.
 *
 * @spec specs/badges/status-label.spec.md
 */
export const StatusLabel = React.forwardRef<HTMLSpanElement, StatusLabelProps>(function StatusLabel(
  { status = "neutral", leading = "indicator", shape = "rounded", discardable, onDiscard, discardLabel, className, children, ...rest },
  ref,
) {
  const text = textOf(children);
  const canDiscard = discardable ?? onDiscard !== undefined;
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      onDiscard?.(e);
    }
  };
  return (
    <span ref={ref} {...rest} className={["zds-status-label", className].filter(Boolean).join(" ")} data-status={status} data-leading={leading} data-shape={shape}>
      <span className="zds-status-label__root">
        {leading === "indicator" ? <span className="zds-status-label__lead"><span className="zds-status-label__dot" /></span> : null}
        {leading === "icon" ? <Icon className="zds-status-label__lead" name={GLYPH[status] ?? "info"} size="small" iconStyle="rounded" /> : null}
        <span className="zds-status-label__label">{children}</span>
        {canDiscard ? (
          <BaseButton
            className="zds-status-label__discard"
            aria-label={discardLabel ?? (text ? `Remove ${text}` : "Remove")}
            onClick={(e) => onDiscard?.(e)}
            onKeyDown={onKeyDown}
          >
            {/* Figma pins the close glyph to the rounded family at Icon small. */}
            <Icon name="close" size="small" iconStyle="rounded" />
          </BaseButton>
        ) : null}
      </span>
    </span>
  );
});
