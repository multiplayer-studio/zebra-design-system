var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./progress-bar.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";
/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A determinate bar reports `value` (a share of 1, or of `maxValue`). `indeterminate` slides a short segment along the
 * track. `buffering` adds a band for what has preloaded (`buffer`); the indicator never runs past it, and an
 * indeterminate bar never shows it. The bar is a `progressbar` named by its label.
 *
 * @slot trailing - Supporting detail at the trailing end of the label row (spec: Show More Details).
 * @cssproperty --progress-bar-color The color of the indicator. Defaults to foreground/link.
 * @cssproperty --progress-bar-buffer-color The color of the buffer band.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1997
 * @storybook ?path=/docs/components-progress--docs
 */
let ZetaProgressBar = class ZetaProgressBar extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The thickness: small (8px) for a bar beside other content, large (16px) when progress is the main thing. `thin`
         * and `medium` are the old names for small and large. */
        this.size = "large";
        /**
         * The % complete of the process indicator.
         * Input a floating point number to represent a percentage. Values must be between 0.0-1.0.
         * If maxValue is set, value can be any number between 0 and maxValue.
         */
        this.value = 0;
        /** How much has preloaded, on the same scale as value. The indicator never runs past it. */
        this.buffer = 0;
        /** Shows the unfilled track behind the indicator, and the buffer band with it. */
        this.showTrack = true;
        this.hasTrailing = false;
    }
    share(n) {
        return Math.max(0, Math.min(1, this.maxValue ? n / this.maxValue : n));
    }
    render() {
        const band = this.buffering && !this.indeterminate;
        const bufferShare = this.share(this.buffer);
        const valueShare = band ? Math.min(this.share(this.value), bufferShare) : this.share(this.value);
        const max = this.maxValue ?? 1;
        const showLabelRow = !!this.label || this.hasTrailing;
        return html `<div class="progress-bar">
      <div class="label-row" ?hidden=${!showLabelRow}>
        <span class="label" id="label">${this.label ?? nothing}</span>
        <span class="trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailing" @slotchange=${(e) => (this.hasTrailing = e.target.assignedNodes().length > 0)}></slot>
        </span>
      </div>
      <div
        class="track"
        role="progressbar"
        aria-labelledby=${this.label ? "label" : nothing}
        aria-label=${this.label ? nothing : "Progress"}
        aria-valuemin="0"
        aria-valuemax=${this.indeterminate ? nothing : max}
        aria-valuenow=${this.indeterminate ? nothing : valueShare * max}
      >
        ${band && this.showTrack ? html `<div class="buffer" style=${styleMap({ width: `${bufferShare * 100}%` })}></div>` : nothing}
        <div class="bar" style=${!this.indeterminate ? styleMap({ width: `${valueShare * 100}%` }) : nothing}></div>
      </div>
    </div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaProgressBar.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaProgressBar.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Number })
], ZetaProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZetaProgressBar.prototype, "maxValue", void 0);
__decorate([
    property({ type: String })
], ZetaProgressBar.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaProgressBar.prototype, "buffering", void 0);
__decorate([
    property({ type: Number })
], ZetaProgressBar.prototype, "buffer", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-track" })
], ZetaProgressBar.prototype, "showTrack", void 0);
__decorate([
    state()
], ZetaProgressBar.prototype, "hasTrailing", void 0);
ZetaProgressBar = __decorate([
    customElement("zeta-progress-bar")
], ZetaProgressBar);
export { ZetaProgressBar };
//# sourceMappingURL=progress-bar.js.map