var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./filter-chip.styles.js";
import "../icon/icon.js";
/**
 * Lets someone narrow a set of content by switching a criterion on and off,
 * such as a category in a list of results. Use them in groups where more
 * than one can be on at once. Name the filter, not the result.
 *
 * A toggle button: `aria-pressed` follows `active`, Enter / Space switch it
 * (native button), and switching fires `zds-active-change`. Figma's
 * separate State=selected (colour only, no check mark) is not modelled: it
 * overlaps `active`, and the metadata says prefer active (spec issue).
 *
 * @slot - The label: the criterion the chip switches.
 * @fires zds-active-change - The chip was switched by the user. `detail.active` is the new value.
 * @csspart chip - The button.
 *
 * @spec specs/filter-chip/filter-chip.spec.json
 */
let ZdsFilterChip = class ZdsFilterChip extends LitElement {
    constructor() {
        super(...arguments);
        /** Whether the filter is on. Adds the check mark and flips to the inverse palette. */
        this.active = false;
        /** The criterion cannot be switched right now. Say why nearby. */
        this.disabled = false;
        /** Pill (rounded) or square (sharp) corners. Match the controls around the filter row. */
        this.shape = "rounded";
        /** Form value, for a consumer collecting the active chips of a group. */
        this.value = null;
    }
    toggle() {
        if (this.disabled)
            return;
        this.active = !this.active;
        this.dispatchEvent(new CustomEvent("zds-active-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    render() {
        return html `<button
      part="chip"
      type="button"
      class="zds-chip zds-filter-chip"
      data-interactive=""
      data-shape=${this.shape}
      data-pressed=${this.active ? "" : nothing}
      data-disabled=${this.disabled ? "" : nothing}
      aria-pressed=${this.active ? "true" : "false"}
      ?disabled=${this.disabled}
      @click=${this.toggle}
    >
      <!-- Only while on. Rounded family, Icon small (Figma). -->
      ${this.active ? html `<zds-icon class="zds-chip__glyph" name="check-mark" size="small" .iconStyle=${"rounded"}></zds-icon>` : nothing}
      <span class="zds-chip__label"><slot></slot></span>
    </button>`;
    }
};
ZdsFilterChip.styles = [chipBase, styles];
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsFilterChip.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsFilterChip.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsFilterChip.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZdsFilterChip.prototype, "value", void 0);
ZdsFilterChip = __decorate([
    customElement("zds-filter-chip")
], ZdsFilterChip);
export { ZdsFilterChip };
