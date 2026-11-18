import { LitElement } from "lit";
import "../icon-button/icon-button.js";
export type ProgressCircleSize = "xxsmall" | "xsmall" | "small" | "medium" | "large";
/**
 * A ring that reports an ongoing process where a bar will not fit, with an
 * optional file-transfer control (percentage readout, or cancel) at its
 * centre.
 *
 * `value` between `min` and `max` drives the arc from twelve o'clock,
 * clockwise; `value = null` (or removing the attribute) spins it. Figma has no
 * value property — its fixed three-quarter arc is a placeholder.
 *
 * Accessibility mirrors Base UI's Progress (the React package): the ring is a
 * `role="progressbar"` with `aria-valuemin/max/now` and the formatted
 * percentage as `aria-valuetext`, or "indeterminate progress" plus
 * `aria-busy`. Name it with `label`. The cancel button is the ring's sibling,
 * not its child (a progressbar's children are presentational), is an
 * `<zds-icon-button>` with its own states (not Figma's pinned hover) and is
 * named by `cancel-label`. The readout is aria-hidden: it repeats the value.
 *
 * `upload` is ignored at xsmall and xxsmall: the 36px control does not fit
 * inside those rings (Figma leaves it out there too).
 *
 * Kept in step with React `<ProgressCircle>`.
 *
 * @fires zds-cancel - The cancel button was pressed. Bubbles and is composed.
 * @csspart ring - The progressbar element.
 * @csspart cancel - The cancel icon button.
 *
 * @spec specs/progress-circle/progress-circle.spec.json
 */
export declare class ZdsProgressCircle extends LitElement {
    static styles: import("lit").CSSResult;
    /** The current value, between `min` and `max`. `null` is indeterminate. */
    value: number | null;
    /** Lower bound of `value`. */
    min: number;
    /** Upper bound of `value`. */
    max: number;
    /** Ring diameter: xxsmall 24, xsmall 36, small 40, medium 48, large 64px. */
    size: ProgressCircleSize;
    /** Round arc ends (a line cap). False squares them off. */
    rounded: boolean;
    /** Shows the unfilled remainder of the ring. */
    showTrack: boolean;
    /** Centred file-transfer control. Small, medium and large only. */
    upload: boolean;
    /** With `upload`, swaps the readout for a cancel button (Figma's `_Upload` Stop). */
    showCancel: boolean;
    /** Accessible name of the cancel button. */
    cancelLabel: string;
    /** Accessible name of the ring ("Uploading report.pdf"). */
    label: string;
    /** Overrides `aria-valuetext` (default: the formatted percentage). */
    valueText: string;
    private onCancel;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-progress-circle": ZdsProgressCircle;
    }
}
//# sourceMappingURL=progress-circle.d.ts.map