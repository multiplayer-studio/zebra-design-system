var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon-button.styles.js";
import "../icon/icon.js";
/**
 * Triggers an action from a single glyph, with no text label. Square at
 * every size, and it carries the same nine flavours, three shapes and four
 * states as Button so the two sit together consistently. Nothing on it is
 * readable, so every instance needs an accessible name in code. When the
 * action can carry a word, use Button instead.
 *
 * `label` is that accessible name and is required. The glyph is decorative.
 *
 * The glyph takes the flavour's label colour through Button's styles (spec:
 * "Background and glyph swap to the disabled tokens of their family"). Three
 * Figma bindings that contradict that are not copied (spec warns): subtle's
 * glyph on foreground/primary, and the disabled glyph of positive
 * (destructive token) and negative (primary token).
 *
 * @spec specs/icon-button/icon-button.spec.json
 */
let ZdsIconButton = class ZdsIconButton extends LitElement {
    constructor() {
        super(...arguments);
        /** How much weight the action carries. The same nine as Button. */
        this.flavour = "primary";
        /** small (36, under the 40 minimum target), medium or large. */
        this.size = "medium";
        /** sharp, rounded or full (a circle). Also picks the glyph family. */
        this.shape = "rounded";
        this.disabled = false;
        /**
         * The glyph. Defaults to more-horizontal, as in Figma — which reads as an
         * overflow menu, so set it deliberately (spec: How to use).
         */
        this.icon = "more-horizontal";
        /** The accessible name, e.g. "Dismiss". Required: there is no visible text. */
        this.label = "";
        this.type = "button";
    }
    render() {
        // As Button: the glyph family follows the shape, sharp only on sharp.
        const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
        // Figma pins Icon small at small and medium at medium and large (16/20/20).
        const iconSize = this.size === "small" ? "small" : "medium";
        return html `<button
      part="button"
      type=${this.type}
      ?disabled=${this.disabled}
      aria-label=${this.label || nothing}
      aria-expanded=${this.expanded === undefined ? nothing : String(this.expanded)}
    >
      ${this.icon ? html `<zds-icon class="icon" name=${this.icon} .iconStyle=${iconStyle} size=${iconSize}></zds-icon>` : nothing}
    </button>`;
    }
};
ZdsIconButton.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsIconButton.prototype, "flavour", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsIconButton.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsIconButton.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsIconButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], ZdsIconButton.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], ZdsIconButton.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsIconButton.prototype, "type", void 0);
__decorate([
    property({ attribute: false })
], ZdsIconButton.prototype, "expanded", void 0);
ZdsIconButton = __decorate([
    customElement("zds-icon-button")
], ZdsIconButton);
export { ZdsIconButton };
