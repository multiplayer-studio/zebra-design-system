import { customElement, property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { html, LitElement, nothing, type PropertyValues, type TemplateResult } from "lit";

import { FormField, type ZetaInputType } from "../../mixins/form-field.js";
import { Size } from "../../mixins/size.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";

import styles from "./select-input.styles.js";

import type { ZetaOption } from "./option.js";
import "./option.js";
import type { ZetaIconName } from "../../icons.js";
import "../icon/icon.js";
import type { ZetaOptionClickEventDetail } from "../../events.js";

/**
 * TODO:
 * Multi-select
 * Typing
 * Arrow keys to navigate options
 */

/** A text input field for selecting from a list of options.
 *
 * Currently no typing or multi-select support.
 *
 * Label, field and hint stack space/xs apart. The field reads the same tokens as Input: `flavor`, `shape` and `size`
 * pick its border, corners and height; `open`, `error`, `readOnly` and `disabled` its state. The options open 4px
 * below the field, as wide as it, on surface/overlay.
 *
 * @event {Event} change - Fired when the value of the select input changes.
 * @event {FocusEvent} focus - Fired when the select input receives focus.
 * @event {FocusEvent} blur - Fired when the select input loses focus.
 *
 * @part input-text - The text of the selected option or placeholder.
 * @cssproperty --select-input-min-width - The field's minimum width. Defaults to Input Field's minimum width.
 * @cssproperty --select-input-options-min-width - The options panel's minimum width; it is otherwise as wide as the field.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6602-712
 * @storybook ?path=/docs/components-select-input--docs
 */
@customElement("zeta-select-input")
export class ZetaSelectInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };
  static styles = [styles, super.styles ?? []];

  /** The type used in FormField mixin */
  override type: Extract<ZetaInputType, "select"> = "select";

  /** Whether field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** Whether an option is selected. */
  @property({ type: Boolean, reflect: true }) isSelected = false;

  /** Whether the dialog is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Leading icon name. */
  @property({ type: String }) icon?: ZetaIconName;

  /** Label shown above the field. */
  @property({ type: String }) label: string = "";

  /** Hint text shown below text field.
   *  if `error`, then `errorText` is shown instead. */
  @property({ type: String }) hintText: string = "";

  /** Error hint text
   *  Shown if `error`, replaces `hintText`. */
  @property({ type: String }) errorText: string = "";

  /** Height of options dropdown
   *  Default is 200px */
  @property({ type: Number }) optionsDialogHeight = 200;

  /** default: a bordered field for forms. gradient: a highlight such as an AI field. ghost: no border at rest. */
  @property({ type: String, reflect: true }) flavor: "default" | "gradient" | "ghost" = "default";

  /** The field's corners. Overrides rounded: sharp, rounded, or full (a pill). */
  @property({ type: String, reflect: true }) shape?: "sharp" | "rounded" | "full";

  /** Appends "(optional)" after the label. */
  @property({ type: Boolean, reflect: true }) optional = false;

  /** Opens the options on the compact menu (Dropdown Menu's compact): a tighter inset for a cramped spot. */
  @property({ type: Boolean, reflect: true }) compact = false;

  /** Adds an information icon after the label. */
  @property({ type: Boolean, attribute: "show-information" }) showInformation = false;

  /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
  @property({ type: String, attribute: "sub-label" }) subLabel = "";

  /** Keeps the icon ahead of the hint message. */
  @property({ type: Boolean, attribute: "show-hint-icon" }) showHintIcon = true;

  /** Whether to use fixed positioning for the options dropdown, so it escapes overflow:hidden ancestors. */
  @property({ type: Boolean }) fixedDropdown = false;

  @queryAssignedNodes() optionsNodeList: NodeListOf<HTMLOptionElement>;

  @state() private _selectedOption: HTMLOptionElement | undefined = undefined;

  @query("slot") slotElement!: HTMLSlotElement;

  @query("select") select!: HTMLSelectElement;

  handleChange = (event: Event): void => {
    this.dispatchEvent(new Event("change", event));
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.shadowRoot?.addEventListener("zeta-option-click", (event: Event) => {
      const newValue = ((event as CustomEvent).detail as ZetaOptionClickEventDetail).value;

      if (this.value === newValue) {
        // this.setValue("");
        // this.isSelected = false;
        // comment out below and uncomment above to enable deselect
        this.toggleOpen();
      } else {
        this.setValue(newValue);

        this.handleChange(event);

        this.optionsNodeList.forEach(option => {
          if (option.value === this.value) {
            option.selected = true;
            if (!this.disabled) this.isSelected = true;
          } else {
            option.selected = false;
          }
        });
        this.slotElement.dispatchEvent(new Event("slotchange"));

        this.toggleOpen();
      }
    });
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    // Options follow a value set from code too, so the selected one shows its check mark. The first render is skipped,
    // so an option marked selected in markup can still supply the initial value.
    if (changedProperties.has("value") && changedProperties.get("value") !== undefined) {
      this.optionsNodeList.forEach(option => (option.selected = option.value === this.value));
      this.updateSelectedOption();
    }
    if (this.fixedDropdown && changedProperties.has("open")) {
      // prettier-ignore
      const options = this.shadowRoot?.querySelector<HTMLElement>(".options");
      if (this.open) {
        // prettier-ignore
        const input = this.shadowRoot?.querySelector<HTMLElement>(".input");
        if (input && options) {
          const rect = input.getBoundingClientRect();
          options.style.position = "fixed";
          options.style.top = `${rect.bottom + 2}px`;
          options.style.left = `${rect.left}px`;
          options.style.width = `${rect.width}px`;
        }
      } else if (options) {
        options.style.position = "";
        options.style.top = "";
        options.style.left = "";
        options.style.width = "";
      }
    }
  }

  setValue(v: string): void {
    this.value = v;
    this.internals.setFormValue(v);
  }

  updateSelectedOption = () => (this._selectedOption = Array.from(this.optionsNodeList).find(option => option.selected || option.value === this.value));

  updateOptionsWidth = (): void => {
    const optionsDiv = this.shadowRoot?.querySelector(".options");
    (optionsDiv as HTMLElement).style.maxHeight = `${this.optionsDialogHeight}px`;
  };

  handleSlotChange = (e: Event): void => {
    this.updateSelectedOption();

    ((e.target as HTMLSlotElement).assignedElements() as ZetaOption[]).forEach(option => {
      switch (this.size) {
        case "small":
          option.size = "small";
          break;
        case "medium":
          option.size = "medium";
          break;
        case "large":
          option.size = "large";
          break;
      }
      option.rounded = this.rounded;
      if (option.selected && !this.value) {
        if (!this.disabled) this.isSelected = true;
        this.setValue(option.value);
      }
    });
  };

  renderLabel(): TemplateResult | void {
    const row = this.renderLabelRow();
    if (row && this.subLabel) {
      return html`<div class="label-group">${row}<span class="sub-label" id="sub-label">${this.subLabel}</span></div>`;
    }
    return row;
  }

  private renderLabelRow(): TemplateResult | void {
    if (this.label) {
      return html`<div class="label">
        <label for="select" id="label">${this.label}</label>
        ${this.required ? html`<span class="required">*</span>` : ""}
        ${this.optional && !this.required ? html`<span class="optional">(optional)</span>` : nothing}
        ${this.showInformation ? html`<zeta-icon class="information" aria-hidden="true">info</zeta-icon>` : nothing}
      </div>`;
    }
  }

  renderInputContent(): TemplateResult {
    return html`
      ${this.icon ? html`<zeta-icon class="contourable-target leading" aria-hidden="true">${this.icon}</zeta-icon>` : nothing}
      <span part="input-text">
        ${
          this._selectedOption
            ? this._selectedOption.innerText
            : this.placeholder === undefined
              ? "Select an option"
              : this.placeholder === ""
                ? ""
                : this.placeholder
        }
      </span>
      <zeta-icon class="contourable-target expand-more" aria-hidden="true">expand_more</zeta-icon>
    `;
  }

  renderHint(): TemplateResult | void {
    const text = this.errorText && this.error ? this.errorText : this.hintText;

    if (text) {
      return html`<div class="hint">
        ${this.showHintIcon ? html`<zeta-icon class="contourable-target hint-icon" aria-hidden="true">${this.error ? "error" : "info"}</zeta-icon>` : nothing}
        <span class="hint-text">${text}</span>
      </div>`;
    }
  }

  toggleOpen = (): void => {
    if (!this.disabled && !this.readOnly) {
      this.updateOptionsWidth();
      this.open = !this.open;
    }
  };

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "down") {
      if (e.key === " " || e.key === "Enter") {
        this.toggleOpen();
      }
    }
  }

  private handleOutsideClick = (e: Event) => {
    const { left, right, top, bottom } = this.getBoundingClientRect();
    const { clientX: x, clientY: y } = e as MouseEvent;
    const inside = x >= left && x <= right && y >= top && y <= bottom;

    if (!inside && this.open && this !== e.target) {
      this.open = false;
    }
  };

  connectedCallback(): void {
    // @ts-expect-error-next-line
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback(): void {
    // @ts-expect-error-next-line
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    document.removeEventListener("click", this.handleOutsideClick);
  }

  protected override render() {
    return html`
    <div class='wrapper'>
        <div class="hidden-select">${super.render()}</div>
        ${this.renderLabel()}
        <div class="input-options">
          <div
            class="input contourable-target ${this._selectedOption ? "has-value" : ""}"
            tabindex=${this.disabled ? -1 : 0}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded=${String(this.open)}
            aria-controls="options"
            aria-labelledby=${this.label ? "label" : nothing}
            aria-describedby=${this.label && this.subLabel ? "sub-label" : nothing}
            aria-label=${this.label ? nothing : (this.placeholder ?? "Select an option")}
            aria-disabled=${this.disabled ? "true" : nothing}
            aria-invalid=${this.error ? "true" : nothing}
            @click=${() => this.toggleOpen()}
            @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
            @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
          >
            ${this.renderInputContent()}
          </div>
          <div class="options" id="options" role="listbox">
            <slot class="contourable-target" @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
        ${this.renderHint()}
      </div>
    </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-select-input": ZetaSelectInput;
  }
}
