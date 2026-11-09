import * as React from "react";
import "./status-label.css";
export type StatusLabelStatus = "neutral" | "info" | "positive" | "warning" | "negative";
export type StatusLabelLeading = "indicator" | "icon" | "none";
export type StatusLabelShape = "rounded" | "sharp";
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
export declare const StatusLabel: React.ForwardRefExoticComponent<StatusLabelProps & React.RefAttributes<HTMLSpanElement>>;
