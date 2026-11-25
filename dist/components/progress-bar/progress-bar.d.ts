import { LitElement } from "lit";
export type ProgressBarShape = "rounded" | "sharp";
export type ProgressBarSize = "small" | "large";
/**
 * A horizontal track that fills to show how far an ongoing process has got,
 * with an indeterminate mode and a buffered band for when the extent is not
 * known, and an optional label row above it.
 *
 * `value` is a real number between `min` and `max` (Figma's 0/25/50/100%
 * variants are samples of it); `value = null` (or removing the attribute) is
 * indeterminate, a short segment sliding along the track. `buffering` turns
 * on Figma's Buffering band (determinate only), from the start of the track up to `buffer` (how
 * much has preloaded); `value` never runs past it.
 *
 * Accessibility mirrors Base UI's Progress (the React package): the bar is a
 * `role="progressbar"` with `aria-valuemin/max/now` and an `aria-valuetext`
 * of the formatted percentage, or "indeterminate progress" plus `aria-busy`
 * with no `aria-valuenow`. It is named by the label row, or by `label` when
 * the row is hidden. The progressbar is the bar only, so a control slotted
 * into `trailing` stays reachable.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes it. Kept in step with React `<ProgressBar>`.
 *
 * @slot trailing - Supporting detail at the end of the label row (Figma's Right Slot). Figma's Show More Details toggle is not ported: the slot shows when it has content.
 * @csspart label - The label text.
 * @csspart bar - The progressbar element (track, buffer and indicator).
 * @csspart indicator - The filled portion.
 *
 * @spec specs/progress-bar/progress-bar.spec.json
 */
export declare class ZdsProgressBar extends LitElement {
    static styles: import("lit").CSSResult;
    /** The current value, between `min` and `max`. `null` is indeterminate. */
    value: number | null;
    /** Lower bound of `value` and `buffer`. */
    min: number;
    /** Upper bound of `value` and `buffer`. */
    max: number;
    /**
     * Turns on Figma's Buffering: a band shows how much has preloaded
     * (`buffer`), and `value` never runs past it. Off, or with no `value`
     * (indeterminate), `buffer` is ignored.
     */
    buffering: boolean;
    /** How much has preloaded, in the units of `value`; the band's extent while `buffering`. */
    buffer: number | null;
    /**
     * Text naming the task. Without it the row reads the formatted value; when
     * `show-label` is off it still names the bar for assistive tech.
     */
    label: string;
    /** Overrides `aria-valuetext` (default: the formatted percentage). */
    valueText: string;
    /** Shows the label row above the bar. */
    showLabel: boolean;
    /**
     * Shows the unfilled track. Hides the track only: the buffer band stays, so
     * Buffering never reads as a stuck bar (spec issue "Show Track hides
     * Buffering too").
     */
    showTrack: boolean;
    /** Softened (rounded) or square (sharp) ends. */
    shape: ProgressBarShape;
    /** small (8px bar) or large (16px). */
    size: ProgressBarSize;
    private hasTrailing;
    private onTrailing;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-progress-bar": ZdsProgressBar;
    }
}
//# sourceMappingURL=progress-bar.d.ts.map