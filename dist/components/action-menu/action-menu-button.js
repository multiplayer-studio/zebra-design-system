var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query } from "lit/decorators.js";
import { html } from "lit";
import "../button/icon-button/icon-button.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../dropdown/droppable.js";
import { ZetaButton } from "../button/button.js";
/** Zeta Action Menu Button places a button that when clicked opens an action menu containing the items passed into it through the items prop.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-action-menu--docs
 */
let ZetaActionMenuButton = class ZetaActionMenuButton extends ZetaButton {
    constructor() {
        super(...arguments);
        /** Controls the state of the dropdown menu. */
        this.open = false;
        /** Array of action items */
        this.items = [
            {
                label: "Auto Item",
                icon: "star",
                onClick: () => {
                    console.log("Auto Item clicked");
                }
            }
        ];
        /** The icon to be displayed on the button */
        this.icon = "more_vertical";
        /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
        this.direction = "bottom";
    }
    firstUpdated() {
        this.droppable.anchor = this.anchor;
    }
    handleClick() {
        this.open = !this.open;
        if (this.open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
    }
    handleOutsideClick(e) {
        if (this.open && !this.contains(e.target)) {
            this.open = false;
            document.body.style.overflow = "auto";
        }
    }
    renderItems() {
        return this.items.map(item => {
            return html `<zeta-dropdown-menu-item @click=${item.onClick} ?rounded=${this.shape != "sharp"}>
        <zeta-icon slot="icon">${item.icon}</zeta-icon>${item.label}
      </zeta-dropdown-menu-item>`;
        });
    }
    render() {
        document.addEventListener("click", this.handleOutsideClick.bind(this));
        return html `
      <zeta-icon-button
        id="anchor"
        @click=${() => {
            this.handleClick();
        }}
        .size=${this.size}
        shape=${this.shape}
        .flavor=${this.flavor}
        >${this.icon}</zeta-icon-button
      >
      <zeta-droppable ?open=${this.open} ?rounded=${this.shape != "sharp"} .alignment=${this.alignment} .direction=${this.direction} .anchor=${this.anchor}>
        ${this.renderItems()}
      </zeta-droppable>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], ZetaActionMenuButton.prototype, "open", void 0);
__decorate([
    property({ type: Array })
], ZetaActionMenuButton.prototype, "items", void 0);
__decorate([
    property({ type: String })
], ZetaActionMenuButton.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], ZetaActionMenuButton.prototype, "alignment", void 0);
__decorate([
    property({ type: String })
], ZetaActionMenuButton.prototype, "direction", void 0);
__decorate([
    query("#anchor")
], ZetaActionMenuButton.prototype, "anchor", void 0);
__decorate([
    query("zeta-droppable")
], ZetaActionMenuButton.prototype, "droppable", void 0);
ZetaActionMenuButton = __decorate([
    customElement("zeta-action-menu-button")
], ZetaActionMenuButton);
export { ZetaActionMenuButton };
//# sourceMappingURL=action-menu-button.js.map