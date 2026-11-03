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
@customElement("zeta-button-group-item")
export class ZetaButtonGroupItem extends Contourable(Interactive(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: false
  };

  /** Name for the button, used if the button is in a form.*/
  //TODO: Does this even work in a form?
  @property({ type: String }) name?: string;

  /** Size of button. Set by the group; setting it here is overridden. */
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";

  /** Whether to show the dropdown icon. */
  @property({ type: Boolean, reflect: true }) showDropdown?: boolean = false;

  @property({ type: String, reflect: true }) flavor?: "default" | "inverse" = "default";

  @property() override onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => unknown) | null = null;

  @query("button") private readonly buttonElement!: HTMLElement | null;

  @queryAssignedElements({ slot: "icon", flatten: true }) icon?: Array<Node>;
  private addGap = true;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  protected override render() {
    return html`
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
        ${this.showDropdown ? html`<zeta-icon .rounded=${this.rounded}>expand_more</zeta-icon>` : nothing}
      </button>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group-item": ZetaButtonGroupItem;
  }
}
