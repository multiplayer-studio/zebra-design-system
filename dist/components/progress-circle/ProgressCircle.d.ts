import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import "./progress-circle.css";
export type ProgressCircleSize = "xxsmall" | "xsmall" | "small" | "medium" | "large";
type RootProps = React.ComponentPropsWithoutRef<typeof Progress.Root>;
export interface ProgressCircleProps extends Omit<RootProps, "className" | "value" | "children" | "render" | "min" | "max"> {
    /**
     * The current value, between `min` and `max`; drives the arc's sweep from
     * twelve o'clock. `null` makes the ring indeterminate: the arc spins.
     */
    value?: number | null;
    /** Lower bound of `value`. */
    min?: number;
    /** Upper bound of `value`. */
    max?: number;
    /** Ring diameter: xxsmall 24, xsmall 36, small 40, medium 48, large 64px. */
    size?: ProgressCircleSize;
    /** Round arc ends (a line cap). False squares them off, for sharp-shaped surroundings. */
    rounded?: boolean;
    /** Shows the unfilled remainder of the ring. */
    showTrack?: boolean;
    /**
     * Places the file-transfer control (percentage readout, or cancel) in the
     * centre. Only at small, medium and large: the 36px control does not fit
     * inside the xsmall or xxsmall ring, so it is ignored there (as in Figma).
     */
    upload?: boolean;
    /** With `upload`, swaps the readout for a cancel button (Figma's `_Upload` Stop). */
    showCancel?: boolean;
    /** Accessible name of the cancel button. */
    cancelLabel?: string;
    /** The cancel button was pressed. */
    onCancel?: (event: React.MouseEvent<HTMLElement>) => void;
    /**
     * Accessible name of the ring ("Uploading report.pdf"). The ring has no
     * visible text of its own, so give it one, or `aria-labelledby`.
     */
    label?: string;
    className?: string;
}
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
export declare const ProgressCircle: React.ForwardRefExoticComponent<ProgressCircleProps & React.RefAttributes<HTMLDivElement>>;
export {};
