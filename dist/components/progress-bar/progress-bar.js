var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./progress-bar.styles.js";
const clampPercent = (v, min, max) => max > min ? Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100)) : 0;
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
let ZdsProgressBar = class ZdsProgressBar extends LitElement {
    constructor() {
        super(...arguments);
        /** The current value, between `min` and `max`. `null` is indeterminate. */
        this.value = 0;
        /** Lower bound of `value` and `buffer`. */
        this.min = 0;
        /** Upper bound of `value` and `buffer`. */
        this.max = 100;
        /**
         * Turns on Figma's Buffering: a band shows how much has preloaded
         * (`buffer`), and `value` never runs past it. Off, or with no `value`
         * (indeterminate), `buffer` is ignored.
         */
        this.buffering = false;
        /** How much has preloaded, in the units of `value`; the band's extent while `buffering`. */
        this.buffer = null;
        /**
         * Text naming the task. Without it the row reads the formatted value; when
         * `show-label` is off it still names the bar for assistive tech.
         */
        this.label = "";
        /** Overrides `aria-valuetext` (default: the formatted percentage). */
        this.valueText = "";
        /** Shows the label row above the bar. */
        this.showLabel = true;
        /**
         * Shows the unfilled track. Hides the track only: the buffer band stays, so
         * Buffering never reads as a stuck bar (spec issue "Show Track hides
         * Buffering too").
         */
        this.showTrack = true;
        /** Softened (rounded) or square (sharp) ends. */
        this.shape = "rounded";
        /** small (8px bar) or large (16px). */
        this.size = "small";
        this.hasTrailing = false;
        this.onTrailing = (e) => {
            this.hasTrailing = e.target.assignedNodes({ flatten: true })
                .some((n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "");
        };
    }
    render() {
        const determinate = this.value != null && Number.isFinite(this.value);
        // Indeterminate has no buffer (owner decision).
        const buffering = this.buffering && determinate && this.buffer != null && Number.isFinite(this.buffer);
        // The value never runs past what has preloaded (owner decision).
        const shown = determinate && buffering ? Math.min(this.value, this.buffer) : this.value;
        const percent = determinate ? clampPercent(shown, this.min, this.max) : null;
        const formatted = percent != null ? new Intl.NumberFormat(undefined, { style: "percent" }).format(percent / 100) : "";
        const text = this.label || formatted;
        const showText = this.showLabel && text !== "";
        const valueNow = determinate ? Math.min(this.max, Math.max(this.min, shown)) : null;
        return html `
      <div class="label-row" ?hidden=${!this.showLabel || (!showText && !this.hasTrailing)}>
        ${showText ? html `<span id="label" class="label" part="label">${text}</span>` : nothing}
        <span class="trailing" ?hidden=${!this.hasTrailing}><slot name="trailing" @slotchange=${this.onTrailing}></slot></span>
      </div>
      <div
        class="bar"
        part="bar"
        ?data-buffering=${buffering}
        role="progressbar"
        aria-labelledby=${showText ? "label" : nothing}
        aria-label=${!showText && this.label ? this.label : nothing}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${valueNow ?? nothing}
        aria-valuetext=${this.valueText || (determinate ? formatted : "indeterminate progress")}
        aria-busy=${determinate ? nothing : "true"}
      >
        ${this.showTrack ? html `<div class="track"></div>` : nothing}
        ${buffering
            ? html `<div class="buffer" style="inline-size:${clampPercent(this.buffer, this.min, this.max)}%"></div>`
            : nothing}
        <div
          class="indicator"
          part="indicator"
          ?data-indeterminate=${!determinate}
          style=${percent != null ? `inline-size:${percent}%` : nothing}
        ></div>
      </div>
    `;
    }
};
ZdsProgressBar.styles = styles;
__decorate([
    property({ type: Number })
], ZdsProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZdsProgressBar.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ZdsProgressBar.prototype, "max", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsProgressBar.prototype, "buffering", void 0);
__decorate([
    property({ type: Number })
], ZdsProgressBar.prototype, "buffer", void 0);
__decorate([
    property({ type: String })
], ZdsProgressBar.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: "value-text" })
], ZdsProgressBar.prototype, "valueText", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-label" })
], ZdsProgressBar.prototype, "showLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-track", reflect: true })
], ZdsProgressBar.prototype, "showTrack", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsProgressBar.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsProgressBar.prototype, "size", void 0);
__decorate([
    state()
], ZdsProgressBar.prototype, "hasTrailing", void 0);
ZdsProgressBar = __decorate([
    customElement("zds-progress-bar")
], ZdsProgressBar);
export { ZdsProgressBar };
