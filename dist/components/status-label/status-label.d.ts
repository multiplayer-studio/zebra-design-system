import { LitElement } from "lit";
import "../icon/icon.js";
export type StatusLabelStatus = "neutral" | "info" | "positive" | "warning" | "negative";
export type StatusLabelLeading = "indicator" | "icon" | "none";
export type StatusLabelShape = "rounded" | "sharp";
/**
 * Reports a read-only state on an item, such as Active or Overdue. Status
 * sets the fill, the border and the leading element together while the
 * label text holds one colour throughout, and Leading decides whether the
 * status also shows as a dot, an icon or nothing. Reach for
 * `<zds-badge-label>` where the thing shown is a category rather than a state.
 *
 * `discardable` adds the one control in the badge family: a dismiss after
 * the label that fires `zds-discard` (click, Enter / Space, or Backspace /
 * Delete while focused). Removing the element is the caller's job. Nothing
 * else here is focusable. The label (default slot) is the accessible name;
 * the dot and icon are decorative. Use `leading="icon"` where the status has
 * to survive greyscale.
 *
 * @slot - The state being reported. Two words at most.
 * @fires zds-discard - The discard control was activated. `detail.label` is the label's text.
 * @csspart root - The surround.
 * @csspart discard - The discard control.
 *
 * @spec specs/badges/status-label.spec.json
 */
export declare class ZdsStatusLabel extends LitElement {
    static styles: import("lit").CSSResult;
    /** Sets the fill, the border and the leading element together. positive / negative draw the success / error tokens. */
    status: StatusLabelStatus;
    /** A dot, a fixed status glyph, or nothing. */
    leading: StatusLabelLeading;
    /** Pill (rounded) or square corners (sharp). */
    shape: StatusLabelShape;
    /** Show the discard control after the label (fires `zds-discard`). */
    discardable: boolean;
    /** Accessible name of the discard control. Defaults to "Remove <label>". */
    discardLabel: string | null;
    private text;
    connectedCallback(): void;
    private onSlotChange;
    private discard;
    private onKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-status-label": ZdsStatusLabel;
    }
}
//# sourceMappingURL=status-label.d.ts.map