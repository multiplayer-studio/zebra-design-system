var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZetaStatusLabel_1;
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-label.styles.js";
import {} from "@zebra-fed/zeta-icons";
import { Contourable } from "../../../mixins/mixins.js";
import { ZetaCloseEvent } from "../../../events.js";
import "../../icon/icon.js";
/** Reports a read-only state on an item, such as Active or Overdue. `status` sets the fill, the border and the leading
 * element together while the label text holds one colour throughout, and `leading` decides whether the status also
 * shows as a dot, an icon or nothing. `discardable` adds the one control anywhere in the badge family, a dismiss that
 * removes the label rather than selecting it.
 *
 * Use `leading="icon"` where the status has to survive greyscale: the dot and the fill are colour alone.
 *
 * @slot - Text displayed on label.
 *
 * @part container - The top level div making up the component.
 * @part icon-container - Wrapper around the leading dot or icon.
 * @part text - The div wrapping the text of either the label or the slot.
 * @part discard - The dismiss button.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the dismiss button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
let ZetaStatusLabel = class ZetaStatusLabel extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Type of status label.*/
        this.status = "neutral";
        /** Whether to show the leading element. Superseded by `leading`, which takes precedence when set. */
        this.showIcon = true;
        /** Adds a dismiss button after the label. It removes the label rather than selecting it. */
        this.discardable = false;
        /** Accessible name for the dismiss button, saying what it removes. */
        this.discardLabel = "Remove";
    }
    static { ZetaStatusLabel_1 = this; }
    static { this.styles = [super.styles ?? [], styles]; }
    static { this.GLYPH = { neutral: "info", info: "info", positive: "check_circle", warning: "warning", negative: "error" }; }
    render() {
        const leading = this.leading ?? (!this.showIcon ? "none" : this.icon ? "icon" : "indicator");
        const icon = leading === "icon"
            ? html `<zeta-icon .rounded=${this.rounded}>${this.icon ?? ZetaStatusLabel_1.GLYPH[this.status]}</zeta-icon>`
            : html `<span class="dot"></span>`;
        return html `
      <div part="container">
        ${leading !== "none" ? html `<div part="icon-container">${icon}</div>` : nothing}
        <div part="text">${this.label ? this.label : html `<slot></slot>`}</div>
        ${this.discardable
            ? html `<button part="discard" type="button" aria-label=${this.discardLabel} @click=${() => this.dispatchEvent(new ZetaCloseEvent().toEvent())}>
                <zeta-icon .rounded=${this.rounded}>close</zeta-icon>
              </button>`
            : nothing}
      </div>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaStatusLabel.prototype, "status", void 0);
__decorate([
    property({ type: String })
], ZetaStatusLabel.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaStatusLabel.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], ZetaStatusLabel.prototype, "showIcon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaStatusLabel.prototype, "leading", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaStatusLabel.prototype, "discardable", void 0);
__decorate([
    property({ type: String, attribute: "discard-label" })
], ZetaStatusLabel.prototype, "discardLabel", void 0);
ZetaStatusLabel = ZetaStatusLabel_1 = __decorate([
    customElement("zeta-status-label")
], ZetaStatusLabel);
export { ZetaStatusLabel };
//# sourceMappingURL=status-label.js.map