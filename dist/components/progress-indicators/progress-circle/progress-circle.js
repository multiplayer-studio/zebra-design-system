var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, state } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { html, LitElement, nothing, svg } from "lit";
import styles from "./progress-circle.styles.js";
import "../../icon/icon.js";
import "../../button/icon-button/icon-button.js";
import { ZetaCancelUploadEvent } from "../../../events.js";
/** Ring diameters by spec size, measured in Figma (spec warn "Sizes aren't tokens"). */
const DIAMETERS = { xxsmall: 24, xsmall: 36, small: 40, medium: 48, large: 64 };
/** Reads a pixel number as a number, and a size name as itself. */
const sizeConverter = { fromAttribute: (v) => (v !== null && /^\d+$/.test(v) ? Number(v) : v) };
/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A ring whose arc starts at twelve o'clock and runs clockwise. With `upload` (small and up) a readout sits in the
 * middle and swaps for a cancel button on hover or focus. The ring is a `progressbar`.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button is clicked.
 *
 * @cssproperty --progress-circle-color The color of the arc. Defaults to border/info.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-77
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-progress--docs
 */
let ZetaProgressCircle = class ZetaProgressCircle extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Size: xxsmall (24px), xsmall (36px), small (40px), medium (48px) or large (64px). Pixel numbers still work. */
        this.size = 64;
        /** The type of the progress circle. `upload` is the same as setting the upload property. */
        this.type = "default";
        /** Places the readout and cancel control at the centre. No effect at xsmall or xxsmall, where it is not built. */
        this.upload = false;
        /** Shows the unfilled track behind the arc. */
        this.showTrack = true;
        /** Accessible name of the cancel button. */
        this.cancelLabel = "Cancel upload";
        /** Accessible name of the progress ring. */
        this.label = "Progress";
        this.progressValue = 0;
        this.strokeWidth = 4;
    }
    static { this.styles = [super.styles || [], styles]; }
    /** Progress (0-100). */
    get progress() {
        return this.progressValue;
    }
    set progress(value) {
        if (value <= 0 || !value) {
            this.progressValue = 0;
            return;
        }
        if (value >= 100) {
            this.progressValue = 100;
            return;
        }
        this.progressValue = value;
    }
    get diameter() {
        return typeof this.size === "number" ? this.size : (DIAMETERS[this.size] ?? 64);
    }
    firstUpdated() {
        const stroke = parseFloat(getComputedStyle(this).getPropertyValue("--stroke-heavy"));
        if (stroke)
            this.strokeWidth = stroke;
    }
    renderUpload() {
        if (!(this.upload || this.type === "upload") || this.diameter < DIAMETERS.small)
            return nothing;
        return html `<div class="uploading">
      <span class="percentage" aria-hidden="true">${this.progress}%</span>
      <zeta-icon-button
        class="cancel"
        size="small"
        flavor="subtle"
        shape="full"
        aria-label=${this.cancelLabel}
        @click=${() => this.dispatchEvent(new ZetaCancelUploadEvent().toEvent())}
        >close</zeta-icon-button
      >
    </div>`;
    }
    render() {
        const d = this.diameter;
        const r = (d - this.strokeWidth) / 2;
        const sweep = this.indeterminate ? 25 : this.progress;
        return html `
      <div class="container" style="width:${d}px;height:${d}px">
        <svg
          width=${d}
          height=${d}
          viewBox="0 0 ${d} ${d}"
          role="progressbar"
          aria-label=${this.label}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this.indeterminate ? nothing : this.progress}
        >
          ${this.showTrack ? svg `<circle class="track" r=${r} cx=${d / 2} cy=${d / 2} stroke-width=${this.strokeWidth}></circle>` : nothing}
          <circle
            class="arc"
            r=${r}
            cx=${d / 2}
            cy=${d / 2}
            pathLength="100"
            stroke-width=${this.strokeWidth}
            stroke-linecap=${this.rounded ? "round" : "butt"}
            stroke-dasharray="${sweep} 100"
            visibility=${sweep === 0 ? "hidden" : "visible"}
          ></circle>
        </svg>
        ${this.renderUpload()}
      </div>
    `;
    }
};
__decorate([
    property({ reflect: true, converter: sizeConverter })
], ZetaProgressCircle.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], ZetaProgressCircle.prototype, "progress", null);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaProgressCircle.prototype, "indeterminate", void 0);
__decorate([
    property({ type: String })
], ZetaProgressCircle.prototype, "type", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaProgressCircle.prototype, "upload", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-track" })
], ZetaProgressCircle.prototype, "showTrack", void 0);
__decorate([
    property({ type: String, attribute: "cancel-label" })
], ZetaProgressCircle.prototype, "cancelLabel", void 0);
__decorate([
    property({ type: String })
], ZetaProgressCircle.prototype, "label", void 0);
__decorate([
    state()
], ZetaProgressCircle.prototype, "strokeWidth", void 0);
ZetaProgressCircle = __decorate([
    customElement("zeta-progress-circle")
], ZetaProgressCircle);
export { ZetaProgressCircle };
//# sourceMappingURL=progress-circle.js.map