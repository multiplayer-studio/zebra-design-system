var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./status-label.styles.js";
import "../icon/icon.js";
/** Fixed per status (spec): Info for neutral and info, then Check Circle, Warning and Error. */
const GLYPH = {
    neutral: "info",
    info: "info",
    positive: "check-circle",
    warning: "warning",
    negative: "error",
};
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
let ZdsStatusLabel = class ZdsStatusLabel extends LitElement {
    constructor() {
        super(...arguments);
        /** Sets the fill, the border and the leading element together. positive / negative draw the success / error tokens. */
        this.status = "neutral";
        /** A dot, a fixed status glyph, or nothing. */
        this.leading = "indicator";
        /** Pill (rounded) or square corners (sharp). */
        this.shape = "rounded";
        /** Show the discard control after the label (fires `zds-discard`). */
        this.discardable = false;
        /** Accessible name of the discard control. Defaults to "Remove <label>". */
        this.discardLabel = null;
        this.text = "";
    }
    connectedCallback() {
        super.connectedCallback();
        this.text = (this.textContent ?? "").trim();
    }
    onSlotChange() {
        this.text = (this.textContent ?? "").trim();
    }
    discard() {
        this.dispatchEvent(new CustomEvent("zds-discard", { detail: { label: this.text }, bubbles: true, composed: true }));
    }
    onKeyDown(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            this.discard();
        }
    }
    render() {
        const lead = this.leading === "indicator" ? html `<span class="lead"><span class="dot"></span></span>`
            : this.leading === "icon" ? html `<zds-icon class="lead" name=${GLYPH[this.status] ?? "info"} size="small" .iconStyle=${"rounded"}></zds-icon>`
                : nothing;
        const discard = this.discardable
            ? html `<button
          part="discard"
          type="button"
          class="discard"
          aria-label=${this.discardLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
          @click=${this.discard}
          @keydown=${this.onKeyDown}
        >
          <!-- Figma pins the close glyph to the rounded family at Icon small. -->
          <zds-icon name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
        </button>`
            : nothing;
        return html `<span part="root" class="root">${lead}<span class="label"><slot @slotchange=${this.onSlotChange}></slot></span>${discard}</span>`;
    }
};
ZdsStatusLabel.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsStatusLabel.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsStatusLabel.prototype, "leading", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsStatusLabel.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsStatusLabel.prototype, "discardable", void 0);
__decorate([
    property({ type: String, attribute: "discard-label" })
], ZdsStatusLabel.prototype, "discardLabel", void 0);
__decorate([
    state()
], ZdsStatusLabel.prototype, "text", void 0);
ZdsStatusLabel = __decorate([
    customElement("zds-status-label")
], ZdsStatusLabel);
export { ZdsStatusLabel };
