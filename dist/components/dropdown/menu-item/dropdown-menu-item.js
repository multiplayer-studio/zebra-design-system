var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ZetaDropdownMenuItem_1;
import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement, nothing } from "lit";
import { Contourable, Interactive, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";
/** A single row in a dropdown menu: a leading element, a label and an optional trailing icon. The row fills the menu's
 * width and keeps a fixed height; a long label widens the menu rather than wrapping. `selected` marks the chosen
 * option with a light brand tint. `type` checkbox or radio leads with the real control, checked when the row is
 * selected. The whole row is the click target: a checkbox row toggles and a radio row selects itself, clearing the
 * radio rows beside it. Inside a `zeta-droppable` the row takes the panel's `rounded`.
 *
 * @slot - Content of menu item; typically text.
 * @slot {zeta-icon} icon - A `zeta-icon` shown on the leading side. Not shown for `type` checkbox or radio.
 * @slot {zeta-icon} trailing - A `zeta-icon` at the trailing edge, such as a submenu arrow.
 * @event change - A checkbox or radio row's `selected` changed because the row was activated.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */
let ZetaDropdownMenuItem = class ZetaDropdownMenuItem extends Contourable(Size(Interactive(LitElement))) {
    static { ZetaDropdownMenuItem_1 = this; }
    constructor() {
        super();
        /** The row's option is currently chosen. */
        this.selected = false;
        /** What leads the row: the slotted icon, or a Checkbox or Radio Button that shows `selected`. */
        this.type = "icon";
        /* The whole row is the control's click target: a checkbox row toggles, a radio row selects itself and clears the
           radio rows beside it. */
        this.activate = () => {
            if (this.disabled || this.type === "icon")
                return;
            if (this.type === "checkbox")
                this.selected = !this.selected;
            else if (this.selected)
                return;
            else {
                for (const row of this.parentElement?.children ?? []) {
                    if (row !== this && row instanceof ZetaDropdownMenuItem_1 && row.type === "radio")
                        row.selected = false;
                }
                this.selected = true;
            }
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        };
        this.addEventListener("click", this.activate);
    }
    key(e, type) {
        if (type === "up") {
            if (e.key === " ") {
                this.click();
            }
        }
    }
    /* The control only shows the row's state. The row is the interactive element, so the control is inert and hidden from
       assistive technology. It follows selected and disabled, where Figma leaves it unchecked (spec warn). */
    renderLeading() {
        const control = { checked: this.selected, disabled: this.disabled, rounded: this.rounded };
        if (this.type === "checkbox")
            return html `<zeta-checkbox
        class="control"
        inert
        aria-hidden="true"
        .checked=${control.checked}
        .disabled=${control.disabled}
        .rounded=${control.rounded}
      ></zeta-checkbox>`;
        if (this.type === "radio")
            return html `<zeta-radio-button
        class="control"
        inert
        aria-hidden="true"
        .checked=${control.checked}
        .disabled=${control.disabled}
        .rounded=${control.rounded}
      ></zeta-radio-button>`;
        return html `<slot name="icon"></slot>`;
    }
    render() {
        const choice = this.type !== "icon";
        return html `<div
      class="droppable-item"
      tabindex=${0}
      role=${choice ? (this.type === "checkbox" ? "menuitemcheckbox" : "menuitemradio") : nothing}
      aria-checked=${choice ? String(this.selected) : nothing}
      aria-disabled=${choice && this.disabled ? "true" : nothing}
      @keydown=${(e) => this.key(e, "down")}
      @keyup=${(e) => this.key(e, "up")}
    >
      ${this.renderLeading()}
      <span class="label"><slot></slot></span>
      <slot name="trailing"></slot>
    </div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaDropdownMenuItem.prototype, "selected", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaDropdownMenuItem.prototype, "type", void 0);
ZetaDropdownMenuItem = ZetaDropdownMenuItem_1 = __decorate([
    customElement("zeta-dropdown-menu-item")
], ZetaDropdownMenuItem);
export { ZetaDropdownMenuItem };
//# sourceMappingURL=dropdown-menu-item.js.map