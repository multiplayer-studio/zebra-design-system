var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import styles from "./avatar.styles.js";
import "../icon/icon.js";
import "../badges/indicators/indicators.js";
import { ZetaCloseEvent } from "../../events.js";
import { iconGlyphs } from "@zebra-design-system/icons/codepoints.js";
const zebraIconGlyphs = iconGlyphs;
const SWATCHES = ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"];
/** A swatch that isn't one of the seven: a token name (`chart/series/2`), a custom property or any CSS colour. */
const swatchFill = (color) => color.startsWith("--") ? `var(${color})` : /^[a-z][\w-]*(\/[\w-]+)+$/i.test(color) ? `var(--${color.replace(/\//g, "-")})` : color;
/**
 * A visual representation of a user or entity, shown as a photo, initials or an icon, with an optional presence badge
 * and dismiss badge. Nine sizes step from xxxs to xxxl with m as the base; the badges, ring and initials all scale from
 * the avatar's own size. Each presence state carries its own glyph as well as its colour.
 *
 * The presence glyphs come from the Zebra icon set, `@zebra-design-system/icons`.
 *
 * @cssproperty --avatar-color - Overrides the swatch behind initials or an icon.
 * @cssproperty --avatar-initials-color - The colour of the initials.
 * @cssproperty --avatar-border-color - The colour of the ring.
 * @slot - The content of the avatar. Should be an img element, a zeta-icon, or text.
 * @slot status - A custom status badge, shown when `status` is not set.
 * @part ring - The outline ring.
 * @part close - The dismiss badge.
 * @part status - The presence badge.
 * @attr {boolean} show-ring - Shows the ring around the avatar.
 * @attr {boolean} show-close - Shows the dismiss badge.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the dismiss badge is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4906-1172
 * @storybook ?path=/docs/components-avatar--docs
 */
let ZetaAvatar = class ZetaAvatar extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The swatch behind initials or an icon. Not used behind a photo. One of the seven swatches, or any other colour: a
         * token name (`chart/series/2`), a custom property (`--brand-accent`) or a CSS colour value.
         */
        this.swatchColor = "purple";
        /** Shows the ring around the avatar. */
        this.showRing = false;
        /** Shows the dismiss badge. */
        this.showClose = false;
        /** Accessible name for the dismiss badge, such as "Remove Jane Doe". */
        this.closeLabel = "Remove";
    }
    willUpdate(changed) {
        // A named swatch is a host attribute selector; any other colour sets the swatch directly.
        if (changed.has("swatchColor")) {
            if (SWATCHES.includes(this.swatchColor))
                this.style.removeProperty("--_swatch");
            else
                this.style.setProperty("--_swatch", swatchFill(this.swatchColor));
        }
    }
    render() {
        return html `
      <div class="avatar">
        <slot id="CONTENT_SLOT"></slot>
      </div>
      ${this.showRing ? html `<span class="ring" part="ring" aria-hidden="true"></span>` : nothing}
      ${this.showClose
            ? html `<button
              class="badge close"
              part="close"
              type="button"
              aria-label=${this.closeLabel}
              @click=${() => {
                this.dispatchEvent(new ZetaCloseEvent().toEvent());
            }}
            >
              <zeta-icon>close</zeta-icon>
            </button>`
            : nothing}
      ${this.status
            ? html `<span
              class="badge status"
              part="status"
              role=${this.statusLabel ? "img" : nothing}
              aria-label=${this.statusLabel ?? nothing}
              aria-hidden=${this.statusLabel ? nothing : "true"}
              ><span class="glyph" aria-hidden="true">${zebraIconGlyphs[this.status]}</span></span
            >`
            : html `<div class="slotted-status"><slot name="status" id="STATUS_SLOT"></slot></div>`}
    `;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaAvatar.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "swatch-color" })
], ZetaAvatar.prototype, "swatchColor", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-ring" })
], ZetaAvatar.prototype, "showRing", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-close" })
], ZetaAvatar.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZetaAvatar.prototype, "closeLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaAvatar.prototype, "status", void 0);
__decorate([
    property({ type: String, attribute: "status-label" })
], ZetaAvatar.prototype, "statusLabel", void 0);
ZetaAvatar = __decorate([
    customElement("zeta-avatar")
], ZetaAvatar);
export { ZetaAvatar };
//# sourceMappingURL=avatar.js.map