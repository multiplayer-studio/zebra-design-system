var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {} from "../../../mixins/contourable-three.js";
import { Flavored } from "../../../mixins/flavor.js";
import { BaseButton } from "./../base-button.js";
import styles from "./tile-button.styles.js";
import "../../icon/icon.js";
import { ifDefined } from "lit/directives/if-defined.js";
/** A large, tappable button with an icon stacked above a label.
 * Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook ?path=/story/components-buttons--tile-button
 */
let ZetaTileButton = class ZetaTileButton extends Flavored(BaseButton) {
    constructor() {
        super(...arguments);
        //There is only one supported value for the tile button: "outline-subtle".
        this.flavor = "outline-subtle";
        /**
         * Whether the component is sharp or rounded.
         * This will change the border radius and icon font.
         *
         * Possible values are:
         * - `sharp`: No border radius, uses "ZdsIcons-Sharp"
         * - `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
         *
         * @type {'sharp' | 'rounded'}
         * @defaultValue "rounded"
         */
        this.shape = "rounded";
    }
    /** @internal */
    static get styles() {
        return [super.styles ?? [], styles];
    }
    //Handles click events on the button.
    handleClick() {
        return (e) => {
            this._handleClick(e);
        };
    }
    render() {
        return html `
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(ifDefined(this.ariaLabel))}
        @click=${this.handleClick()}
        part="button"
        class="contourable-target"
      >
        <zeta-icon name="${this.icon || "star"}" .rounded=${this.shape != "sharp"}></zeta-icon>
        <span class="button-text"><slot></slot></span>
      </button>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaTileButton.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: false, state: true })
], ZetaTileButton.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTileButton.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZetaTileButton.prototype, "icon", void 0);
ZetaTileButton = __decorate([
    customElement("zeta-tile-button")
], ZetaTileButton);
export { ZetaTileButton };
//# sourceMappingURL=tile-button.js.map