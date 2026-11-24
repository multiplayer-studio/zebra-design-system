var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./divider.styles.js";
/**
 * A thin line used to visually separate content into distinct sections or
 * groups, such as list rows, cards, or menu items. Orientation sets whether
 * the line runs horizontal or vertical.
 *
 * Divider has no behaviour to delegate to a primitive, so it exposes the
 * platform's separator role and `aria-orientation` itself, on the inner
 * line rather than the host.
 *
 * Not a spacing or margin mechanism — it has no built-in padding. Use layout
 * gap for spacing between elements instead.
 *
 * @part line - The separator element.
 *
 * @spec specs/divider/divider.spec.json
 */
let ZdsDivider = class ZdsDivider extends LitElement {
    constructor() {
        super(...arguments);
        /** Horizontal separates stacked content; vertical separates side-by-side content. */
        this.orientation = "horizontal";
    }
    render() {
        return html `<div part="line" class="line" role="separator" aria-orientation=${this.orientation}></div>`;
    }
};
ZdsDivider.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsDivider.prototype, "orientation", void 0);
ZdsDivider = __decorate([
    customElement("zds-divider")
], ZdsDivider);
export { ZdsDivider };
