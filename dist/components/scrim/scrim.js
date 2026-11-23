var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./scrim.styles.js";
/**
 * The barrier between a raised surface and the page behind it. It fills its
 * nearest positioned ancestor edge to edge, with one fill and nothing else.
 *
 * `<zds-dialog>`, `<zds-lightbox>` and a modal `<zds-bottom-sheet>` render it
 * as their backdrop. With the `popover` attribute it joins the top layer and
 * covers the viewport; the owner shows it just before its own modal. Use it
 * directly only under a custom overlay, one per open surface.
 * It is decorative (`aria-hidden`, never focusable) and renders no content.
 * A click on it bubbles as a normal `click`, so the owner decides whether to
 * close.
 *
 * @spec specs/scrim/scrim.spec.json
 */
let ZdsScrim = class ZdsScrim extends LitElement {
    constructor() {
        super(...arguments);
        /** scrim dims the page behind; modal hides it completely. */
        this.tone = "scrim";
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("aria-hidden", "true");
    }
    // Scrim has no content (spec): no shadow children, no slot.
    render() {
        return null;
    }
};
ZdsScrim.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsScrim.prototype, "tone", void 0);
ZdsScrim = __decorate([
    customElement("zds-scrim")
], ZdsScrim);
export { ZdsScrim };
/** Shows an owner's popover scrim in the top layer, if it isn't already. Call just before `showModal()`. */
export function raiseScrim(scrim) {
    if (scrim && !scrim.matches(":popover-open"))
        scrim.showPopover();
}
/** Hides an owner's popover scrim, if it is showing. */
export function lowerScrim(scrim) {
    if (scrim?.matches(":popover-open"))
        scrim.hidePopover();
}
