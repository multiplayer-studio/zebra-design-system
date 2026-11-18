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
 * The barrier between a raised surface and the page behind it. It fills its nearest positioned ancestor edge to edge,
 * with one fill and nothing else.
 *
 * `zeta-dialog`, `zeta-lightbox` and a modal `zeta-bottom-sheet` render it as their backdrop. With the `popover`
 * attribute it joins the top layer and covers the viewport; the owner shows it just before its own modal. Use it
 * directly only under a custom overlay, one per open surface. It is hidden from assistive technology, never takes focus and holds no content. A click on it
 * bubbles as a normal `click`, so the owner decides whether to close.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8221-400
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-scrim--docs
 */
let ZetaScrim = class ZetaScrim extends LitElement {
    constructor() {
        super();
        /** `scrim` dims the page behind; `modal` hides it completely. */
        this.tone = "scrim";
        this.internals = this.attachInternals();
        this.internals.ariaHidden = "true";
    }
    static { this.styles = styles; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaScrim.prototype, "tone", void 0);
ZetaScrim = __decorate([
    customElement("zeta-scrim")
], ZetaScrim);
export { ZetaScrim };
//# sourceMappingURL=scrim.js.map