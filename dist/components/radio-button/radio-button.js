var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from "lit/decorators.js";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./radio-button.styles.js";
import { RadioButtonController } from "./radio-button-controller.js";
/** Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
 *
 * The ring is 16px at medium and 24px at large, inside a 40px target. The label is the default slot; leave it empty
 * only when the option is named some other way, such as aria-label.
 *
 * @slot - The label.
 *
 * @event {Event} change - Fired when the radio button becomes checked (but not when unchecked)
 * @event {InputEvent} input - Fired when the radio button value changes
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4294-3121
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-radio-button--docs
 */
let ZetaRadioButton = class ZetaRadioButton extends BaseToggleFormElement {
    constructor() {
        super();
        this.radioButtonController = new RadioButtonController(this);
        this.type = "radio";
        this.internals.role = "radio";
        this.addController(this.radioButtonController);
    }
    handleChange(event) {
        if (this.checked)
            super.handleChange(event); //Fires change Event only if checked.
        this.radioButtonController.handleChange();
    }
    static { this.styles = [styles, super.styles]; }
};
ZetaRadioButton = __decorate([
    customElement("zeta-radio-button")
], ZetaRadioButton);
export { ZetaRadioButton };
//# sourceMappingURL=radio-button.js.map