var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, query, queryAssignedNodes, state } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import { FormField } from "../../mixins/form-field.js";
import { Size } from "../../mixins/size.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import styles from "./select-input.styles.js";
import "./option.js";
import "../icon/icon.js";
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
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-select-input--docs
 */
let ZetaSelectInput = class ZetaSelectInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
    constructor() {
        super(...arguments);
        /** The type used in FormField mixin */
        this.type = "select";
        /** Whether field is in error state. */
        this.error = false;
        /** Whether an option is selected. */
        this.isSelected = false;
        /** Whether the dialog is open. */
        this.open = false;
        /** Label shown above the field. */
        this.label = "";
        /** Hint text shown below text field.
         *  if `error`, then `errorText` is shown instead. */
        this.hintText = "";
        /** Error hint text
         *  Shown if `error`, replaces `hintText`. */
        this.errorText = "";
        /** Height of options dropdown
         *  Default is 200px */
        this.optionsDialogHeight = 200;
        /** default: a bordered field for forms. gradient: a highlight such as an AI field. ghost: no border at rest. */
        this.flavor = "default";
        /** Appends "(optional)" after the label. */
        this.optional = false;
        /** Opens the options on the compact menu (Dropdown Menu's compact): a tighter inset for a cramped spot. */
        this.compact = false;
        /** Adds an information icon after the label. */
        this.showInformation = false;
        /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
        this.subLabel = "";
        /** Keeps the icon ahead of the hint message. */
        this.showHintIcon = true;
        /** Whether to use fixed positioning for the options dropdown, so it escapes overflow:hidden ancestors. */
        this.fixedDropdown = false;
        this._selectedOption = undefined;
        this.handleChange = (event) => {
            this.dispatchEvent(new Event("change", event));
        };
        this.updateSelectedOption = () => (this._selectedOption = Array.from(this.optionsNodeList).find(option => option.selected || option.value === this.value));
        this.updateOptionsWidth = () => {
            const optionsDiv = this.shadowRoot?.querySelector(".options");
            optionsDiv.style.maxHeight = `${this.optionsDialogHeight}px`;
        };
        this.handleSlotChange = (e) => {
            this.updateSelectedOption();
            e.target.assignedElements().forEach(option => {
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
                    if (!this.disabled)
                        this.isSelected = true;
                    this.setValue(option.value);
                }
            });
        };
        this.toggleOpen = () => {
            if (!this.disabled && !this.readOnly) {
                this.updateOptionsWidth();
                this.open = !this.open;
            }
        };
        this.handleOutsideClick = (e) => {
            const { left, right, top, bottom } = this.getBoundingClientRect();
            const { clientX: x, clientY: y } = e;
            const inside = x >= left && x <= right && y >= top && y <= bottom;
            if (!inside && this.open && this !== e.target) {
                this.open = false;
            }
        };
    }
    /** @internal */
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    static { this.styles = [styles, super.styles ?? []]; }
    firstUpdated(_changedProperties) {
        this.shadowRoot?.addEventListener("zeta-option-click", (event) => {
            const newValue = event.detail.value;
            if (this.value === newValue) {
                // this.setValue("");
                // this.isSelected = false;
                // comment out below and uncomment above to enable deselect
                this.toggleOpen();
            }
            else {
                this.setValue(newValue);
                this.handleChange(event);
                this.optionsNodeList.forEach(option => {
                    if (option.value === this.value) {
                        option.selected = true;
                        if (!this.disabled)
                            this.isSelected = true;
                    }
                    else {
                        option.selected = false;
                    }
                });
                this.slotElement.dispatchEvent(new Event("slotchange"));
                this.toggleOpen();
            }
        });
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        // Options follow a value set from code too, so the selected one shows its check mark. The first render is skipped,
        // so an option marked selected in markup can still supply the initial value.
        if (changedProperties.has("value") && changedProperties.get("value") !== undefined) {
            this.optionsNodeList.forEach(option => (option.selected = option.value === this.value));
            this.updateSelectedOption();
        }
        if (this.fixedDropdown && changedProperties.has("open")) {
            // prettier-ignore
            const options = this.shadowRoot?.querySelector(".options");
            if (this.open) {
                // prettier-ignore
                const input = this.shadowRoot?.querySelector(".input");
                if (input && options) {
                    const rect = input.getBoundingClientRect();
                    options.style.position = "fixed";
                    options.style.top = `${rect.bottom + 2}px`;
                    options.style.left = `${rect.left}px`;
                    options.style.width = `${rect.width}px`;
                }
            }
            else if (options) {
                options.style.position = "";
                options.style.top = "";
                options.style.left = "";
                options.style.width = "";
            }
        }
    }
    setValue(v) {
        this.value = v;
        this.internals.setFormValue(v);
    }
    renderLabel() {
        const row = this.renderLabelRow();
        if (row && this.subLabel) {
            return html `<div class="label-group">${row}<span class="sub-label" id="sub-label">${this.subLabel}</span></div>`;
        }
        return row;
    }
    renderLabelRow() {
        if (this.label) {
            return html `<div class="label">
        <label for="select" id="label">${this.label}</label>
        ${this.required ? html `<span class="required">*</span>` : ""}
        ${this.optional && !this.required ? html `<span class="optional">(optional)</span>` : nothing}
        ${this.showInformation ? html `<zeta-icon class="information" aria-hidden="true">info</zeta-icon>` : nothing}
      </div>`;
        }
    }
    renderInputContent() {
        return html `
      ${this.icon ? html `<zeta-icon class="contourable-target leading" aria-hidden="true">${this.icon}</zeta-icon>` : nothing}
      <span part="input-text">
        ${this._selectedOption
            ? this._selectedOption.innerText
            : this.placeholder === undefined
                ? "Select an option"
                : this.placeholder === ""
                    ? ""
                    : this.placeholder}
      </span>
      <zeta-icon class="contourable-target expand-more" aria-hidden="true">expand_more</zeta-icon>
    `;
    }
    renderHint() {
        const text = this.errorText && this.error ? this.errorText : this.hintText;
        if (text) {
            return html `<div class="hint">
        ${this.showHintIcon ? html `<zeta-icon class="contourable-target hint-icon" aria-hidden="true">${this.error ? "error" : "info"}</zeta-icon>` : nothing}
        <span class="hint-text">${text}</span>
      </div>`;
        }
    }
    key(e, type) {
        if (type === "down") {
            if (e.key === " " || e.key === "Enter") {
                this.toggleOpen();
            }
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
        // @ts-expect-error-next-line
        if (super.disconnectedCallback) {
            super.disconnectedCallback();
        }
        document.removeEventListener("click", this.handleOutsideClick);
    }
    render() {
        return html `
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
            @keydown=${(e) => this.key(e, "down")}
            @keyup=${(e) => this.key(e, "up")}
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
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSelectInput.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSelectInput.prototype, "isSelected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSelectInput.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ZetaSelectInput.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], ZetaSelectInput.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaSelectInput.prototype, "hintText", void 0);
__decorate([
    property({ type: String })
], ZetaSelectInput.prototype, "errorText", void 0);
__decorate([
    property({ type: Number })
], ZetaSelectInput.prototype, "optionsDialogHeight", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSelectInput.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSelectInput.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSelectInput.prototype, "optional", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSelectInput.prototype, "compact", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-information" })
], ZetaSelectInput.prototype, "showInformation", void 0);
__decorate([
    property({ type: String, attribute: "sub-label" })
], ZetaSelectInput.prototype, "subLabel", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-hint-icon" })
], ZetaSelectInput.prototype, "showHintIcon", void 0);
__decorate([
    property({ type: Boolean })
], ZetaSelectInput.prototype, "fixedDropdown", void 0);
__decorate([
    queryAssignedNodes()
], ZetaSelectInput.prototype, "optionsNodeList", void 0);
__decorate([
    state()
], ZetaSelectInput.prototype, "_selectedOption", void 0);
__decorate([
    query("slot")
], ZetaSelectInput.prototype, "slotElement", void 0);
__decorate([
    query("select")
], ZetaSelectInput.prototype, "select", void 0);
ZetaSelectInput = __decorate([
    customElement("zeta-select-input")
], ZetaSelectInput);
export { ZetaSelectInput };
//# sourceMappingURL=select-input.js.map