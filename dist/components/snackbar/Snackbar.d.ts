import * as React from "react";
import "./snackbar.css";
export type SnackbarVariant = "contextual" | "standard";
export type SnackbarStatus = "info" | "positive" | "warning" | "negative" | "deletion" | "view" | "action" | "default";
/** @deprecated Use `SnackbarStatus`; Figma renamed Flavour to Status and error to negative. */
export type SnackbarFlavour = Exclude<SnackbarStatus, "negative"> | "error";
export type SnackbarShape = "rounded" | "sharp";
export type SnackbarCloseReason = "dismiss" | "timeout" | "action";
export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "role"> {
    variant?: SnackbarVariant;
    /** Contextual only: sets the glyph, the tint and the default controls. */
    status?: SnackbarStatus;
    /** @deprecated Use `status`; `error` maps to `negative`. */
    flavour?: SnackbarFlavour;
    shape?: SnackbarShape;
    /** Controlled: show the bar. Set it false from `onClose` to dismiss. */
    open: boolean;
    /** Asks to close itself after this many ms (calls `onClose("timeout")`). 0 never. Paused while hovered or focused. */
    duration?: number;
    /** The action's text. Defaults per status (Undo, View, Action); "" removes it. */
    actionLabel?: string;
    /** Forces the close on or off. Unset, it follows the status (off on standard). */
    showClose?: boolean;
    /** Accessible name for the close button. */
    closeLabel?: string;
    /** A leading icon for the statuses without one of their own (Figma's Icon Slot). */
    icon?: React.ReactNode;
    /** Renders in the page flow rather than floating in the top layer, without motion. For documentation. */
    inline?: boolean;
    /** The action was pressed. `onClose("action")` follows. */
    onAction?: () => void;
    /** The bar asks to close; set `open` to false. */
    onClose?: (reason: SnackbarCloseReason) => void;
    className?: string;
}
/**
 * A brief message about something the app just did, carrying at most one
 * action. Variant chooses between a contextual pill, where Status sets the
 * tint, the leading glyph and the controls together, and a plain standard
 * bar.
 *
 * Primitive: Base UI's Toast is built around a toast manager (a provider and
 * a viewport own queueing, placement and timers), which does not fit the
 * spec's single, controlled bar or parity with `<zds-snackbar>`; it is the
 * natural basis for the queue the spec says does not exist yet. This is a
 * controlled component: the accessibility it needs is a live region
 * (role=status, alert on negative), and its controls are the Base UI-based
 * Button and IconButton.
 *
 * Follows specs/snackbar like `<zds-snackbar>`: the action is a subtle
 * Button (outline-subtle on action), the close a subtle IconButton, both
 * medium; the message stays on one line, ending in an ellipsis where the
 * space runs out. Dark bars (action, default, standard) carry their own
 * colour mode: .mode-dark on a light page, .mode-light on a dark one, read
 * from the nearest .mode-* ancestor each time the bar opens.
 *
 * Placement and motion (spec: Motion, Layering): a manual popover in the top
 * layer, centred space/xl above the bottom of the viewport; it slides in over
 * 300ms and leaves sliding up and fading over 200ms (fade only with reduced
 * motion), and stays mounted until the exit has played.
 *
 * Kept in step with packages/web-components `<zds-snackbar>`.
 *
 * @spec specs/snackbar/snackbar.spec.md
 */
export declare const Snackbar: React.ForwardRefExoticComponent<SnackbarProps & React.RefAttributes<HTMLDivElement>>;
