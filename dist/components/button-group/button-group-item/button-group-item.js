var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import styles from "./button-group-item.styles.js";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../icon/icon.js";
/**
 * One action in a Button Group: a subtle button whose size and outer corners come from the group, with Button's own
 * hover, pressed, focus and disabled states.
 *
 * @slot - Button label content.
 * @slot {zeta-icon} icon - Icon to display on leading side of button. Full list of icons can be found at https://design.zebra.com/icons
 * @part button - The button element.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-button-group--docs
 */
let ZetaButtonGroupItem = class ZetaButtonGroupItem extends Contourable(Interactive(LitElement)) {
    constructor() {
        super(...arguments);
        /** Size of button. Set by the group; setting it here is overridden. */
        this.size = "medium";
        /** Whether to show the dropdown icon. */
        this.showDropdown = false;
        this.flavor = "default";
        this.onclick = null;
        this.addGap = true;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: false
    }; }
    focus() {
        this.buttonElement?.focus();
    }
    blur() {
        this.buttonElement?.blur();
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} name=${ifDefined(this.name)} part="button">
        <slot name="icon"></slot>
        <label class="text ${this.addGap ? "pad" : ""}">
          <slot
            @slotchange=${() => {
            this.addGap = this.textContent?.trim() !== "";
            this.requestUpdate();
        }}
          >
          </slot>
        </label>
        ${this.showDropdown ? html `<zeta-icon .rounded=${this.rounded}>expand_more</zeta-icon>` : nothing}
      </button>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaButtonGroupItem.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaButtonGroupItem.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaButtonGroupItem.prototype, "showDropdown", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaButtonGroupItem.prototype, "flavor", void 0);
__decorate([
    property()
], ZetaButtonGroupItem.prototype, "onclick", void 0);
__decorate([
    query("button")
], ZetaButtonGroupItem.prototype, "buttonElement", void 0);
__decorate([
    queryAssignedElements({ slot: "icon", flatten: true })
], ZetaButtonGroupItem.prototype, "icon", void 0);
ZetaButtonGroupItem = __decorate([
    customElement("zeta-button-group-item")
], ZetaButtonGroupItem);
export { ZetaButtonGroupItem };
//# sourceMappingURL=button-group-item.js.map