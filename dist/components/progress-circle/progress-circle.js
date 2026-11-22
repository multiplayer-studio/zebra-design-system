var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, svg, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./progress-circle.styles.js";
import "../icon-button/icon-button.js";
/** Sizes that can hold the 36px upload control. */
const UPLOAD_SIZES = new Set(["small", "medium", "large"]);
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
let ZdsProgressCircle = class ZdsProgressCircle extends LitElement {
    constructor() {
        super(...arguments);
        /** The current value, between `min` and `max`. `null` is indeterminate. */
        this.value = 0;
        /** Lower bound of `value`. */
        this.min = 0;
        /** Upper bound of `value`. */
        this.max = 100;
        /** Ring diameter: xxsmall 24, xsmall 36, small 40, medium 48, large 64px. */
        this.size = "xxsmall";
        /** Round arc ends (a line cap). False squares them off. */
        this.rounded = true;
        /** Shows the unfilled remainder of the ring. */
        this.showTrack = true;
        /** Centred file-transfer control. Small, medium and large only. */
        this.upload = false;
        /** With `upload`, swaps the readout for a cancel button (Figma's `_Upload` Stop). */
        this.showCancel = false;
        /** Accessible name of the cancel button. */
        this.cancelLabel = "Cancel upload";
        /** Accessible name of the ring ("Uploading report.pdf"). */
        this.label = "";
        /** Overrides `aria-valuetext` (default: the formatted percentage). */
        this.valueText = "";
    }
    onCancel() {
        this.dispatchEvent(new CustomEvent("zds-cancel", { bubbles: true, composed: true }));
    }
    render() {
        const determinate = this.value != null && Number.isFinite(this.value);
        const v = this.value;
        const percent = determinate
            ? this.max > this.min ? Math.min(100, Math.max(0, ((v - this.min) / (this.max - this.min)) * 100)) : 0
            : null;
        const formatted = percent != null ? new Intl.NumberFormat(undefined, { style: "percent" }).format(percent / 100) : "";
        const showUpload = this.upload && UPLOAD_SIZES.has(this.size);
        return html `
      <div
        class="ring"
        part="ring"
        role="progressbar"
        ?data-indeterminate=${!determinate}
        aria-label=${this.label || nothing}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${determinate ? Math.min(this.max, Math.max(this.min, v)) : nothing}
        aria-valuetext=${this.valueText || (determinate ? formatted : "indeterminate progress")}
        aria-busy=${determinate ? nothing : "true"}
      >
        <svg class="svg" aria-hidden="true" focusable="false">
          ${this.showTrack ? svg `<circle class="track"></circle>` : nothing}
          <circle
            class="arc"
            pathLength="100"
            ?data-empty=${percent === 0}
            style=${percent != null ? `--zds-progress-circle-value:${percent}` : nothing}
          ></circle>
        </svg>
      </div>
      ${showUpload
            ? html `<div class="upload">
            ${this.showCancel
                ? html `<zds-icon-button
                  part="cancel"
                  flavour="subtle"
                  shape="full"
                  size="small"
                  icon="close"
                  .label=${this.cancelLabel}
                  @click=${this.onCancel}
                ></zds-icon-button>`
                : html `<span class="readout" aria-hidden="true">${formatted}</span>`}
          </div>`
            : nothing}
    `;
    }
};
ZdsProgressCircle.styles = styles;
__decorate([
    property({ type: Number })
], ZdsProgressCircle.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZdsProgressCircle.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ZdsProgressCircle.prototype, "max", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsProgressCircle.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsProgressCircle.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-track" })
], ZdsProgressCircle.prototype, "showTrack", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsProgressCircle.prototype, "upload", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-cancel" })
], ZdsProgressCircle.prototype, "showCancel", void 0);
__decorate([
    property({ type: String, attribute: "cancel-label" })
], ZdsProgressCircle.prototype, "cancelLabel", void 0);
__decorate([
    property({ type: String })
], ZdsProgressCircle.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: "value-text" })
], ZdsProgressCircle.prototype, "valueText", void 0);
ZdsProgressCircle = __decorate([
    customElement("zds-progress-circle")
], ZdsProgressCircle);
export { ZdsProgressCircle };
