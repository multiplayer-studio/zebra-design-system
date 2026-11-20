import { customElement, property } from "lit/decorators.js";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./checkbox.styles.js";
import "../icon/icon.js";
import { LitElement } from "lit";
import type { ZetaInputType } from "../../mixins/form-field.js";

/**
 * A square control for turning a single option on or off, with an optional label beside it. `indeterminate` says a
 * checkbox that summarises others is mixed; nothing cycles into it, so set it from code. Reach for it wherever options
 * are independent, and for Radio Button where exactly one of a set has to win.
 *
 * The box sits in a 40px target, and the label beside it extends what a person can aim at. Keep the label, or name
 * the checkbox from the surrounding structure.
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @cssproperty --checkbox-background - Background colour of the checkbox in its default/unchecked state
 * @cssproperty --checkbox-checked-background - Background colour when the checkbox is checked or indeterminate
 * @cssproperty --checkbox-hover-background - Background colour when hovering over a checked/indeterminate checkbox
 * @cssproperty --checkbox-border-color - Border colour of the checkbox container
 * @cssproperty --checkbox-icon-color - Colour of the checkmark or indeterminate icon inside the checkbox
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6382-52
 * @storybook ?path=/docs/components-checkbox--docs
 */
@customElement("zeta-checkbox")
export class ZetaCheckbox extends BaseToggleFormElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  constructor() {
    super();
    this.internals.role = "checkbox";
  }

  override type: Extract<ZetaInputType, "checkbox"> = "checkbox";

  override value = "on";

  /**
   * Whether the order of the checkbox and its label should be reversed.
   */
  @property({ type: Boolean, reflect: true }) reverse: boolean = false;

  static styles = [super.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-checkbox": ZetaCheckbox;
  }
}
