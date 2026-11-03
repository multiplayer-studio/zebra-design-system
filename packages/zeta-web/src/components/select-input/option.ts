import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { Size } from "../../mixins/size.js";
import styles from "./option.styles.js";
import { ZetaOptionClickEvent } from "../../events.js";
import "../icon/icon.js";

/** ZetaOption web component. A selected option shows a trailing check mark, as Select's selected row does in the spec.
 *
 * @slot - The default slot
 * @part option-text - The text of the option.
 * @part check - The trailing check mark on the selected option.
 * @cssproperty --option-max-lines - The maximum number of lines to display before truncating with an ellipsis. Default is 2.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-39&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */
@customElement("zeta-option")
export class ZetaOption extends Contourable(Interactive(Size(LitElement))) {
  @property({ type: String }) value: string = "";

  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  @property({ type: Boolean }) disabled: boolean = false;

  type = "option" as const;

  private _handleClick = () => {
    if (!this.disabled) {
      // uncomment this to enable deselection
      // this.selected = !this.selected;
      this.dispatchEvent(new ZetaOptionClickEvent({ value: this.value }).toEvent());
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      this._handleClick();
    }
  };

  override connectedCallback() {
    // @ts-expect-error-next-line
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener("keydown", this._handleKeyDown);
    // An option of a Select's listbox; on its own it is just a pressable row.
    if (this.closest("zeta-select-input")) this.setAttribute("role", "option");
  }

  protected override updated() {
    if (this.getAttribute("role") === "option") {
      this.setAttribute("aria-selected", String(this.selected));
      this.setAttribute("aria-disabled", String(this.disabled));
    }
  }

  override disconnectedCallback() {
    // @ts-expect-error-next-line
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  protected override render() {
    return html`
      <div tabindex=${this.disabled ? -1 : 0} class="option" @click=${this._handleClick}>
        <span part="option-text"><slot></slot></span>
        ${this.selected ? html`<zeta-icon part="check" class="check" aria-hidden="true" .rounded=${this.rounded}>check_mark</zeta-icon>` : nothing}
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-option": ZetaOption;
  }
}
