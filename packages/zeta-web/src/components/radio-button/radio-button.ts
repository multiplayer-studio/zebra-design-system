import { customElement } from "lit/decorators.js";

import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./radio-button.styles.js";
import { RadioButtonController } from "./radio-button-controller.js";
import type { ZetaInputType } from "../../mixins/form-field.js";

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
 * @storybook ?path=/docs/components-radio-button--docs
 */
@customElement("zeta-radio-button")
export class ZetaRadioButton extends BaseToggleFormElement {
  private readonly radioButtonController = new RadioButtonController(this);
  constructor() {
    super();
    this.internals.role = "radio";
    this.addController(this.radioButtonController);
  }
  override type: Extract<ZetaInputType, "radio"> = "radio";

  override handleChange(event: Event): void {
    if (this.checked) super.handleChange(event); //Fires change Event only if checked.
    this.radioButtonController.handleChange();
  }
  static styles = [styles, super.styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-radio-button": ZetaRadioButton;
  }
}
