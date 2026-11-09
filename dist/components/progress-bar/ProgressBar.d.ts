import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import "./progress-bar.css";
export type ProgressBarShape = "rounded" | "sharp";
export type ProgressBarSize = "small" | "large";
type RootProps = React.ComponentPropsWithoutRef<typeof Progress.Root>;
export interface ProgressBarProps extends Omit<RootProps, "className" | "value" | "children" | "render" | "min" | "max"> {
    /**
     * The current value, between `min` and `max`. `null` makes the bar
     * indeterminate: a short segment slides along the track. Figma's 0/25/50/100%
     * variants are samples of this one number.
     */
    value?: number | null;
    /** Lower bound of `value` and `buffer`. */
    min?: number;
    /** Upper bound of `value` and `buffer`. */
    max?: number;
    /**
     * Turns on Figma's Buffering: a band shows how much has preloaded
     * (`buffer`), and `value` never runs past it. Off, or with no `value`
     * (indeterminate), `buffer` is ignored.
     */
    buffering?: boolean;
    /** How much has preloaded, in the units of `value`; the band's extent while `buffering`. */
    buffer?: number | null;
    /**
     * Text in the row above the bar, naming the task ("Uploading report.pdf").
     * Without it the row reads the formatted value ("25%"), and is omitted when
     * there is nothing to say (indeterminate, no label). When `showLabel` is
     * false a string label still names the bar for assistive tech.
     */
    label?: React.ReactNode;
    /** Shows the label row above the bar. */
    showLabel?: boolean;
    /**
     * Shows the unfilled track behind the indicator. Hides the track only: the
     * buffer band stays, so Buffering never reads as a stuck bar (spec issue
     * "Show Track hides Buffering too").
     */
    showTrack?: boolean;
    /** Softened (rounded) or square (sharp) ends on the track, band and indicator. */
    shape?: ProgressBarShape;
    /** small (8px bar) for everyday use, large (16px) when progress is the main thing on the surface. */
    size?: ProgressBarSize;
    /**
     * Supporting content at the trailing end of the label row (Figma's Right
     * Slot). Figma's `showMoreDetails` toggle is not ported: the slot shows when
     * it has content.
     */
    trailing?: React.ReactNode;
    className?: string;
}
/**
 * A horizontal track that fills to show how far an ongoing process has got,
 * with an indeterminate mode and a buffered band for when the extent is not
 * known, and an optional label row above it.
 *
 * Behaviour and ARIA (`role="progressbar"`, `aria-valuenow/min/max`,
 * `aria-valuetext`, the indicator width) come from Base UI's Progress. The
 * progressbar element is the bar itself, not the whole component, so an
 * interactive control in `trailing` is not swallowed by the progressbar
 * role's presentational children; the label row names it through
 * `aria-labelledby`. Indeterminate also sets `aria-busy`.
 *
 * Everything visual is in `progress-bar.css`, keyed off data attributes.
 * Kept in step with packages/web-components `<zds-progress-bar>`.
 *
 * @spec specs/progress-bar/progress-bar.spec.md
 */
export declare const ProgressBar: React.ForwardRefExoticComponent<ProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export {};
