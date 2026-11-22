var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./card-heading.styles.js";
/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for `zds-card`'s header slot (and reused inside the
 * body slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this element derives visibility from whether the `leading`/`trailing`
 * slots have assigned content, since a consumer would otherwise have to keep
 * a slot and a boolean in sync for one decision.
 *
 * @slot leading - Leading content, e.g. an avatar.
 * @slot trailing - Trailing content, e.g. an icon button.
 * @part heading - The heading text.
 * @part subheading - The subheading text.
 *
 * @spec specs/card/card.spec.json
 */
let ZdsCardHeading = class ZdsCardHeading extends LitElement {
    constructor() {
        super(...arguments);
        /** The title. */
        this.heading = null;
        /** Supporting text under the heading. */
        this.subheading = null;
        this.hasLeading = false;
        this.hasTrailing = false;
    }
    onLeadingSlotChange(e) {
        this.hasLeading = e.target.assignedNodes({ flatten: true }).length > 0;
    }
    onTrailingSlotChange(e) {
        this.hasTrailing = e.target.assignedNodes({ flatten: true }).length > 0;
    }
    render() {
        return html `
      <div class="leading" ?hidden=${!this.hasLeading}>
        <slot name="leading" @slotchange=${this.onLeadingSlotChange}></slot>
      </div>
      <div class="text">
        <div part="heading" class="heading">${this.heading}</div>
        ${this.subheading ? html `<div part="subheading" class="subheading">${this.subheading}</div>` : ""}
      </div>
      <div class="trailing" ?hidden=${!this.hasTrailing}>
        <slot name="trailing" @slotchange=${this.onTrailingSlotChange}></slot>
      </div>
    `;
    }
};
ZdsCardHeading.styles = styles;
__decorate([
    property({ type: String })
], ZdsCardHeading.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZdsCardHeading.prototype, "subheading", void 0);
__decorate([
    state()
], ZdsCardHeading.prototype, "hasLeading", void 0);
__decorate([
    state()
], ZdsCardHeading.prototype, "hasTrailing", void 0);
ZdsCardHeading = __decorate([
    customElement("zds-card-heading")
], ZdsCardHeading);
export { ZdsCardHeading };
