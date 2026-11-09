var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./switch.styles.js";
import "../icon/icon.js";
/**
 * A single on or off toggle, a track with a thumb slider that switches
 * between its two ends.
 *
 * The host element *is* the control: it carries `role="switch"` and
 * `aria-checked` through ElementInternals and is form-associated, so a native
 * `<label for>` names it ("[label], switch, on") and clicking that label
 * toggles it — exactly as it would a checkbox. Space and Enter toggle it from
 * the keyboard.
 *
 * Mapping from the spec's Figma API:
 * - `Switch` on/off → `checked`. A two-value enum is a boolean in code (spec
 *   note on `api`).
 * - `State` → not a property. `disabled` is `disabled`; `focus` comes from
 *   keyboard focus (`:focus-visible`), never from an attribute.
 * - `hasIcons` → whether any glyph is set. The icon slots are swap-only in
 *   Figma (spec `internalVariations`); here they are `onIcon` (the start
 *   slot, uncovered while checked) and `offIcon` (the end slot, uncovered
 *   while unchecked). Leave both unset for a plain track and thumb.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the switch with no JavaScript.
 *
 * @fires input - The user toggled the switch. Fires before `change`, as on a native checkbox.
 * @fires change - The user toggled the switch. Read `checked` for the new value.
 * @csspart track - The track behind the thumb.
 * @csspart thumb - The sliding thumb.
 *
 * @spec specs/switch/switch.spec.json
 */
let ZdsSwitch = class ZdsSwitch extends LitElement {
    constructor() {
        super();
        /** On or off. Reflects, so `:host([checked])` drives the styles. */
        this.checked = false;
        /** The switch can't be toggled. Say why nearby when it isn't obvious. */
        this.disabled = false;
        /** Glyph in the start slot, shown while the switch is on. Pair it with `offIcon` so the two communicate the state. */
        this.onIcon = null;
        /** Glyph in the end slot, shown while the switch is off. */
        this.offIcon = null;
        /** Field name submitted with a form. */
        this.name = null;
        /** Value submitted with a form while checked. Nothing is submitted while unchecked, as with a checkbox. */
        this.value = "on";
        /**
         * Accessible name, for when no `<label for>` or `aria-labelledby` points at
         * the switch. Switch has no visible label part of its own.
         */
        this.label = null;
        this.defaultChecked = false;
        /** Set on the first user toggle so the initial render never animates. */
        this.interacted = false;
        this.onClick = () => this.toggle();
        this.onKeyDown = (e) => {
            // Space toggles; Enter may also toggle (spec accessibility guidelines).
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                this.toggle();
            }
        };
        this.internals = this.attachInternals();
        this.internals.role = "switch";
        this.addEventListener("click", this.onClick);
        this.addEventListener("keydown", this.onKeyDown);
    }
    connectedCallback() {
        super.connectedCallback();
        this.defaultChecked = this.checked;
    }
    updated(changed) {
        if (changed.has("checked") || changed.has("value") || changed.has("name")) {
            this.internals.ariaChecked = String(this.checked);
            this.internals.setFormValue(this.checked ? this.value : null);
        }
        if (changed.has("disabled")) {
            this.internals.ariaDisabled = this.disabled ? "true" : null;
            if (this.disabled)
                this.removeAttribute("tabindex");
            else
                this.tabIndex = 0;
        }
        if (changed.has("label"))
            this.internals.ariaLabel = this.label;
    }
    /** Called by the browser when a containing `<form>` resets. */
    formResetCallback() {
        this.checked = this.defaultChecked;
    }
    /** Called by the browser when a containing `<fieldset disabled>` changes. */
    formDisabledCallback(disabled) {
        this.disabled = disabled;
    }
    toggle() {
        if (this.disabled)
            return;
        this.interacted = true;
        this.checked = !this.checked;
        this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }
    render() {
        // Rounded is the family the spec pins (Style=rounded on both slots). Size
        // is the nested Icon's own medium variant, also pinned — never a token on
        // Switch. Colour is inherited from .icons (currentColor).
        return html `
      <span part="track" class="track ${this.interacted ? "animated" : ""}">
        ${this.onIcon || this.offIcon
            ? html `<span class="icons">
              <span class="slot">${this.onIcon
                ? html `<zds-icon name=${this.onIcon} size="medium" .iconStyle=${"rounded"}></zds-icon>`
                : nothing}</span>
              <span class="slot">${this.offIcon
                ? html `<zds-icon name=${this.offIcon} size="medium" .iconStyle=${"rounded"}></zds-icon>`
                : nothing}</span>
            </span>`
            : nothing}
        <span part="thumb" class="thumb"></span>
        <span class="ring"></span>
      </span>
    `;
    }
};
ZdsSwitch.styles = styles;
ZdsSwitch.formAssociated = true;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSwitch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSwitch.prototype, "disabled", void 0);
__decorate([
    property({ type: String, attribute: "on-icon" })
], ZdsSwitch.prototype, "onIcon", void 0);
__decorate([
    property({ type: String, attribute: "off-icon" })
], ZdsSwitch.prototype, "offIcon", void 0);
__decorate([
    property({ type: String })
], ZdsSwitch.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZdsSwitch.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ZdsSwitch.prototype, "label", void 0);
ZdsSwitch = __decorate([
    customElement("zds-switch")
], ZdsSwitch);
export { ZdsSwitch };
