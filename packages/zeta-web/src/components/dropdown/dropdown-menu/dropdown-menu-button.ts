import { customElement, eventOptions, property, query, state } from "lit/decorators.js";
import styles from "./dropdown-menu-button.styles.js";
import { html, LitElement } from "lit";
import { Contourable, Flavored, Size } from "../../../mixins/mixins.js";
import { FormField, type ZetaInputType } from "../../../mixins/form-field.js";
import type { ZetaDroppable } from "../droppable.js";
import "../../button/button.js";
import "../../radio-button/radio-button.js";
import "../../checkbox/checkbox.js";
import "../menu-item/dropdown-menu-item.js";
import "./../droppable.js";
import type { ZetaIconName } from "../../../icons.js";
import { ZetaDropdownEvent } from "../../../events.js";
import type { ButtonFlavor } from "../../button/button.js";

export type ZetaDropdownItem = { label: string; icon?: ZetaIconName; checked?: boolean; disabled?: boolean; onClick?: () => void };
export type ZetaDropdownType = Extract<ZetaInputType, "text-dropdown" | "checkbox-dropdown" | "radio-dropdown">;

//TODO check to see if this works with keyboard input
//     include check to see if input event is fired too

/** Dropdown menus allow users to select an option from a list that appears when the menu is clicked or tapped.
 *
 * Zeta Dropdown Menu Button places a button that when clicked opens a dropdown menu containing the items passed into it through the items prop.
 *
 * @property {boolean} matchParentWidth - Whether the dropdown menu should match the width of its parent. Enabled by default. If disabled, the dropdown menu will size to fit its content.
 * @property {string} defaultText - The default text to display when no item is selected. Defaults to an empty string if nothing is set.
 * @property {boolean} buttonTextMatchesSelected - Whether the button text should update to match the selected item. Default is true. Only applicable for the text-dropdown type.
 * @property {boolean} open - Controls the state of the dropdown menu. Default is false.
 * @property {Array<ZetaDropdownItem>} items - Array of items to populate the dropdown. Includes label, icon (optional), checked (optional), disabled (optional), and onClick (optional) properties.
 * @property {ButtonFlavor} flavor - The flavor of the dropdown button. Default is "primary".
 * @property {ZetaDropdownType} type - The type of dropdown. Options are "text-dropdown", "checkbox-dropdown", and "radio-dropdown". Default is "text-dropdown".
 * @property {string} name - The name of the dropdown menu button for form control. Default is "default".
 * @property {"left" | "right" | "bottom" | "top"} direction - The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.
 *
 * @event {CustomEvent<ZetaDropdownEventDetail>} open - Fired when the dropdown is opened.
 * @event {CustomEvent<ZetaDropdownEventDetail>} close - Fired when the dropdown is closed.
 * @event {InputEvent} input - Fired when the dropdown is closed.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook ?path=/docs/components-dropdown--docs
 */
@customElement("zeta-dropdown-menu-button")
export class ZetaDropdownMenuButton extends FormField(Contourable(Flavored(Size(LitElement)))) {
  /**
   * Whether the dropdown menu should match the width of its parent.
   * Enabled by default.
   * If disabled, the dropdown menu will size to fit its content.
   */
  @property({ type: Boolean }) matchParentWidth: boolean = true;

  /** Whether the button text should update to match the selected item. */
  @property({ type: Boolean }) buttonTextMatchesSelected: boolean = true;

  /** The default text to display when no item is selected. */
  @property({ type: String }) defaultText: string = "";

  /** Controls the state of the dropdown menu. */
  @property({ type: Boolean }) open: boolean = false;

  // TODO(UX-1024): Investigate moving items into the slot
  /** Array of items to populate the dropdown */
  @property({ type: Array }) items: Array<ZetaDropdownItem> = [
    {
      label: "Auto Item",
      icon: undefined,
      checked: false
    }
  ];

  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  /** The type of dropdown.
   * - "text-dropdown" - A dropdown with a default dropdown buttons.
   * - "checkbox-dropdown" - A dropdown with checkboxes.
   * - "radio-dropdown" - A dropdown with radio buttons.
   */
  @property({ type: String }) type: ZetaDropdownType = "text-dropdown";

  /** The name of the dropdown menu button for form control*/
  @property({ type: String }) name: string = "default";

  /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
  @property({ type: String }) direction?: "left" | "right" | "bottom" | "top" = "bottom";

  /** Which edges of the menu and trigger line up (spec: align). `start` is the spec's left (or top, when `direction`
   * is left or right), `end` its right (or bottom). Passed to the menu. */
  @property({ type: String }) alignment?: "start" | "end" | "center";

  /** Tightens the menu's inset for a cramped rail (spec: Dropdown Menu, Compact). Passed to the menu. */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;

  /** The text state which displays the currently selected item */
  @state() private displayText: string = "";

  @state() private checkedValues: string[] = [];

  @state() private radioValue = "";

  @query("#anchor") anchor!: HTMLElement;

  @query("zeta-droppable") droppable!: ZetaDroppable;

  /*
   * @internal
   */
  handleChange(_event: Event): void {
    //The input is disabled so we can ignore these
    //this.dispatchEvent(new Event(event.type, event)); TODO Is this the test fail source
    return;
  }

  /*
   * @internal
   */
  handleInput(_event: Event): void {
    //The input is disabled so we can ignore these
    return;
  }

  protected firstUpdated() {
    this.droppable.anchor = this.anchor;
    this.items.map(item => {
      if (item.checked) {
        if (this.type === "checkbox-dropdown") {
          this.checkedValues = [...this.checkedValues, item.label];
          this.input.value = this.checkedValues.toString();
          this.input.dispatchEvent(new InputEvent("input"));
        } else if (this.type === "radio-dropdown") {
          this.radioValue = item.label;
          this.input.value = item.label;
          this.input.dispatchEvent(new InputEvent("input"));
        }
        //this.input.dispatchEvent(new Event("input")); TODO here too
      }
    });
  }

  private handleItemClick(text: string) {
    if (this.type === "radio-dropdown" || this.type === "text-dropdown") {
      if (this.type === "radio-dropdown") this.radioValue = text;
      this.input.value = text;
      if (this.buttonTextMatchesSelected && this.type === "text-dropdown") {
        this.displayText = text;
      } else {
        this.displayText = "";
      }
      if (this.type === "text-dropdown") this.handleClick();
      this.input.dispatchEvent(new InputEvent("input"));
    } else if (this.type === "checkbox-dropdown") {
      if (this.checkedValues.includes(text)) {
        this.checkedValues = this.checkedValues.filter((item: string) => item !== text);
      } else {
        this.checkedValues = [...this.checkedValues, text];
      }
      this.input.value = this.checkedValues.toString();
      this.input.dispatchEvent(new InputEvent("input"));
    }
  }

  @eventOptions({ capture: true })
  private handleClick() {
    this.open = !this.open;
    if (this.open) {
      //TODO move this to CSS
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    this.dispatchEvent(new ZetaDropdownEvent(this.open).toEvent()); //TODO BK this was added on my branch
  }

  private handleOutsideClick = (e: Event) => {
    if (this.open && !this.contains(e.target as Node)) {
      this.handleClick();
    }
  };

  private renderItems() {
    // Checkbox and radio dropdowns are Menu Item rows that lead with the real control (spec: Menu Item type).
    if (this.type === "radio-dropdown" || this.type === "checkbox-dropdown") {
      const type = this.type === "radio-dropdown" ? "radio" : "checkbox";
      return this.items.map(item => {
        const selected = type === "radio" ? this.radioValue === item.label : this.checkedValues.includes(item.label);
        return html`<zeta-dropdown-menu-item
          type=${type}
          ?selected=${selected}
          ?disabled=${item.disabled}
          ?rounded=${this.rounded}
          @click=${() => {
            if (item.disabled) return;
            this.handleItemClick(item.label);
            if (item.onClick) {
              item.onClick();
            }
          }}
          >${item.label}</zeta-dropdown-menu-item
        >`;
      });
    } else {
      return this.items.map(item => {
        return html`<zeta-dropdown-menu-item
          @click=${() => {
            this.handleItemClick(item.label);
            if (item.onClick) {
              item.onClick();
            }
          }}
          ?rounded=${this.rounded}
          ><zeta-icon slot="icon" ?rounded=${this.rounded}>${item.icon}</zeta-icon> ${item.label}
        </zeta-dropdown-menu-item>`;
      });
    }
  }

  connectedCallback() {
    // @ts-expect-error-next-line
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick);
    // @ts-expect-error-next-line
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  protected render() {
    return html`
      <zeta-button id="anchor" @click=${() => this.handleClick()} .size=${this.size} shape=${this.rounded ? "rounded" : "sharp"} .flavor=${this.flavor}
        >${this.displayText === "" ? this.defaultText : this.displayText}<zeta-icon
          style="${this.open ? "rotate: -90deg;" : "rotate: 0deg;"}"
          .rounded=${this.rounded}
          >chevron_left</zeta-icon
        ></zeta-button
      >
      <zeta-droppable
        .anchor=${this.anchor}
        .direction=${this.direction}
        .alignment=${this.alignment}
        .matchParentWidth=${this.matchParentWidth}
        ?open=${this.open}
        ?rounded=${this.rounded}
        ?compact=${this.compact}
        >${this.renderItems()}</zeta-droppable
      >
      ${super.render()}
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-button": ZetaDropdownMenuButton;
  }
}
