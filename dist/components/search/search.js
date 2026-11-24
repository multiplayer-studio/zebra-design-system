var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import styles from "./search.styles.js";
import "../icon/icon.js";
import "../divider/divider.js";
/**
 * A single-line input for typing a query, with a magnifier leading it and a
 * trailing control that takes whatever icon and function the implementation
 * passes.
 *
 * Built on a native `<input type="search">`, so the caret, selection, text
 * editing and form submission are the browser's. The spec's State axis is
 * not a property; it follows from the field:
 * - **hover**: pointer over the field.
 * - **focus**: keyboard focus on an empty field — the heaviest border.
 * - **selected**: focus by pointer, before any text — a lighter border.
 * - **typing**: focused with text in it. The clear control appears.
 * - **filled**: text in it, not focused.
 * - **disabled**: the `disabled` property.
 *
 * The clear control and the trailing control are real buttons, each with a
 * pressable area wider than its glyph (spec warn "the control targets aren't
 * modelled"). The trailing control does nothing by itself: listen for
 * `trailing-click` and give it a name with `trailing-label`.
 *
 * The field has no label of its own (spec accessibility): set `label`, or
 * point an `aria-labelledby` at a visible one.
 *
 * Not built: the spec's `Show Cancel` property, which Figma wires to nothing
 * (spec warn "Show Cancel is wired to nothing").
 *
 * @fires input - The value changed while typing.
 * @fires change - The value was committed (blur after an edit).
 * @fires search - Enter was pressed. `detail.value` is the query.
 * @fires clear - The clear control emptied the field.
 * @fires trailing-click - The trailing control was pressed.
 * @csspart field - The bordered field.
 * @csspart input - The native input.
 *
 * @spec specs/search/search.spec.json
 */
let ZdsSearch = class ZdsSearch extends LitElement {
    constructor() {
        super();
        /** Match the contour of the controls around the field. Changes only the corners. */
        this.shape = "sharp";
        /** Fits the field to its surface. Only `small` also reduces the text. */
        this.size = "large";
        /** How much the field asserts itself: `default` in a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion. */
        this.flavour = "default";
        /** The field cannot be used. */
        this.disabled = false;
        /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
        this.block = false;
        /**
         * Ghost only: suppress the focus outline, for a container that shows focus
         * itself (spec: "its focus outline is optional so the container can carry
         * focus instead"). The container must then show focus in its place.
         */
        this.hideFocusOutline = false;
        /** The query. */
        this.value = "";
        /** Shown while the field is empty. Not a label: set `label` as well. */
        this.placeholder = "Search";
        /** Accessible name of the field. */
        this.label = null;
        /** Field name submitted with a form. */
        this.name = null;
        /** Glyph leading the field: the spec's `hasLeading`. Set to an empty string to drop it. */
        this.leadingIcon = "search";
        /**
         * Glyph for the trailing control: the spec's `hasTrailing`. Unset means no
         * trailing control. Figma's sample ships `microphone` (voice input); it is
         * not a default here because the control is only meaningful once the
         * implementation gives it a function.
         */
        this.trailingIcon = null;
        /** Accessible name of the trailing control, e.g. "Search by voice". */
        this.trailingLabel = null;
        /** Accessible name of the clear control. */
        this.clearLabel = "Clear search";
        this.focused = false;
        this.focusVisible = false;
        /** Set by a pointer press inside the field, so the focus it causes reads as pointer focus. */
        this.pointerPressed = false;
        this.defaultValue = "";
        this.internals = this.attachInternals();
        // :focus-visible can't tell keyboard from pointer focus on a text input:
        // browsers match it for every focus there. Track the modality instead.
        this.addEventListener("pointerdown", () => { this.pointerPressed = true; });
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultValue = this.value;
    }
    updated(changed) {
        if (changed.has("value"))
            this.internals.setFormValue(this.value);
    }
    formResetCallback() {
        this.value = this.defaultValue;
    }
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    /** Moves focus to the input. */
    focus(options) {
        this.input?.focus(options);
    }
    onInput(e) {
        this.value = e.target.value;
    }
    onChange() {
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    onKeyDown(e) {
        if (e.key === "Enter") {
            this.dispatchEvent(new CustomEvent("search", { detail: { value: this.value }, bubbles: true, composed: true }));
        }
    }
    onFocus() {
        this.focused = true;
        // Keyboard focus is the spec's `focus` (heaviest border); pointer focus,
        // including the refocus after pressing clear, is `selected`.
        this.focusVisible = !this.pointerPressed;
        this.pointerPressed = false;
    }
    onBlur(e) {
        // Focus moving to the clear or trailing control stays inside the field.
        if (this.renderRoot.contains(e.relatedTarget))
            return;
        this.focused = false;
        this.focusVisible = false;
        this.pointerPressed = false;
    }
    clear() {
        this.value = "";
        this.input.focus();
        this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("clear", { bubbles: true, composed: true }));
    }
    onTrailing() {
        this.dispatchEvent(new Event("trailing-click", { bubbles: true, composed: true }));
    }
    /** The spec's State, derived from the field. */
    get uiState() {
        if (this.disabled)
            return "disabled";
        const hasValue = this.value.length > 0;
        if (this.focused)
            return hasValue ? "typing" : this.focusVisible ? "focus" : "selected";
        return hasValue ? "filled" : "enabled";
    }
    render() {
        const st = this.uiState;
        // Icon size is the nested Icon's own Size variant, pinned per field size;
        // every icon uses the Rounded family, as the spec pins. In the trailing
        // group at small, Figma renders 20 while the other small icons are 16
        // (spec warn "the small typing group's icons render 20"); all small icons
        // are 16 here.
        const iconSize = this.size === "small" ? "small" : "medium";
        const showClear = st === "typing";
        const showTrailing = !!this.trailingIcon;
        return html `
      <div part="field" class=${classMap({ field: true, ["state-" + st]: true })}>
        ${this.leadingIcon
            ? html `<zds-icon class="leading" name=${this.leadingIcon} size=${iconSize} .iconStyle=${"rounded"}></zds-icon>`
            : nothing}
        <input
          part="input"
          type="search"
          .value=${live(this.value)}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-label=${this.label ?? nothing}
          enterkeyhint="search"
          autocomplete="off"
          @input=${this.onInput}
          @change=${this.onChange}
          @keydown=${this.onKeyDown}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
        />
        ${showClear || showTrailing
            ? html `<span class="trailing">
              ${showClear
                ? html `<button class="control" type="button" aria-label=${this.clearLabel} @click=${this.clear} @blur=${this.onBlur}>
                    <zds-icon name="cancel" size=${iconSize} .iconStyle=${"rounded"}></zds-icon>
                  </button>`
                : nothing}
              ${showClear && showTrailing ? html `<zds-divider class="divider" orientation="vertical" aria-hidden="true"></zds-divider>` : nothing}
              ${showTrailing
                ? html `<button class="control" type="button" aria-label=${this.trailingLabel ?? nothing} ?disabled=${this.disabled} @click=${this.onTrailing} @blur=${this.onBlur}>
                    <zds-icon name=${this.trailingIcon} size=${iconSize} .iconStyle=${"rounded"}></zds-icon>
                  </button>`
                : nothing}
            </span>`
            : nothing}
      </div>
    `;
    }
};
ZdsSearch.styles = styles;
ZdsSearch.formAssociated = true;
ZdsSearch.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String, reflect: true })
], ZdsSearch.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSearch.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSearch.prototype, "flavour", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSearch.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSearch.prototype, "block", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "hide-focus-outline" })
], ZdsSearch.prototype, "hideFocusOutline", void 0);
__decorate([
    property({ type: String })
], ZdsSearch.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsSearch.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], ZdsSearch.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsSearch.prototype, "name", void 0);
__decorate([
    property({ type: String, attribute: "leading-icon" })
], ZdsSearch.prototype, "leadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "trailing-icon" })
], ZdsSearch.prototype, "trailingIcon", void 0);
__decorate([
    property({ type: String, attribute: "trailing-label" })
], ZdsSearch.prototype, "trailingLabel", void 0);
__decorate([
    property({ type: String, attribute: "clear-label" })
], ZdsSearch.prototype, "clearLabel", void 0);
__decorate([
    state()
], ZdsSearch.prototype, "focused", void 0);
__decorate([
    state()
], ZdsSearch.prototype, "focusVisible", void 0);
__decorate([
    query("input")
], ZdsSearch.prototype, "input", void 0);
ZdsSearch = __decorate([
    customElement("zds-search")
], ZdsSearch);
export { ZdsSearch };
