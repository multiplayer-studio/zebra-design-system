import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement, nothing } from "lit";
import { Contourable, Interactive, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";

export type ZetaDropdownMenuItemType = "icon" | "checkbox" | "radio";

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
 * @storybook ?path=/docs/components-dropdown--docs
 */
@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends Contourable(Size(Interactive(LitElement))) {
  /** The row's option is currently chosen. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** What leads the row: the slotted icon, or a Checkbox or Radio Button that shows `selected`. */
  @property({ type: String, reflect: true }) type: ZetaDropdownMenuItemType = "icon";

  constructor() {
    super();
    this.addEventListener("click", this.activate);
  }

  /* The whole row is the control's click target: a checkbox row toggles, a radio row selects itself and clears the
     radio rows beside it. */
  private activate = () => {
    if (this.disabled || this.type === "icon") return;
    if (this.type === "checkbox") this.selected = !this.selected;
    else if (this.selected) return;
    else {
      for (const row of this.parentElement?.children ?? []) {
        if (row !== this && row instanceof ZetaDropdownMenuItem && row.type === "radio") row.selected = false;
      }
      this.selected = true;
    }
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  };

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "up") {
      if (e.key === " ") {
        this.click();
      }
    }
  }

  /* The control only shows the row's state. The row is the interactive element, so the control is inert and hidden from
     assistive technology. It follows selected and disabled, where Figma leaves it unchecked (spec warn). */
  private renderLeading() {
    const control = { checked: this.selected, disabled: this.disabled, rounded: this.rounded };
    if (this.type === "checkbox")
      return html`<zeta-checkbox
        class="control"
        inert
        aria-hidden="true"
        .checked=${control.checked}
        .disabled=${control.disabled}
        .rounded=${control.rounded}
      ></zeta-checkbox>`;
    if (this.type === "radio")
      return html`<zeta-radio-button
        class="control"
        inert
        aria-hidden="true"
        .checked=${control.checked}
        .disabled=${control.disabled}
        .rounded=${control.rounded}
      ></zeta-radio-button>`;
    return html`<slot name="icon"></slot>`;
  }

  protected render() {
    const choice = this.type !== "icon";
    return html`<div
      class="droppable-item"
      tabindex=${0}
      role=${choice ? (this.type === "checkbox" ? "menuitemcheckbox" : "menuitemradio") : nothing}
      aria-checked=${choice ? String(this.selected) : nothing}
      aria-disabled=${choice && this.disabled ? "true" : nothing}
      @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
      @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
    >
      ${this.renderLeading()}
      <span class="label"><slot></slot></span>
      <slot name="trailing"></slot>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-item": ZetaDropdownMenuItem;
  }
}
