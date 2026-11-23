var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./assist-chip.styles.js";
import { defaultTrue } from "../chip/chip.js";
import "../icon/icon.js";
/** `feedback/info/foreground` -> `var(--feedback-info-foreground)`; anything else passes through. */
const paint = (v) => (v && /^[a-z0-9-]+(\/[a-z0-9-]+)+$/.test(v) ? `var(--${v.replace(/\//g, "-")})` : v ?? undefined);
/**
 * Offers a contextual action, or stands for an item someone can discard,
 * such as an attached file. Five colours borrow the status tokens to mark a
 * state or a kind of item, and `foreground`, `background` and `border`
 * override any one paint beyond those five (override > color > state).
 * Reach for `<zds-button>` when the action is the primary next step, and
 * `<zds-filter-chip>` when the control narrows content.
 *
 * Without `discardable` the chip is one native button; listen for `click`.
 * With it, a button cannot hold another, so the chip becomes a group holding
 * the label (a button only when `clickable` is set) and a remove control
 * that fires `zds-discard`, as `<zds-input-chip>` does. Not modelled from
 * Figma (spec issues): the single-value `active` axis and State=selected.
 * 28px tall in every state (Figma's 30/28 jump is a layout artefact of its
 * inside border).
 *
 * @slot - The label.
 * @fires zds-discard - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
 *
 * @spec specs/assist-chip/assist-chip.spec.json
 */
let ZdsAssistChip = class ZdsAssistChip extends LitElement {
    constructor() {
        super(...arguments);
        /** Show the glyph naming the action's domain. Defaults to true; `show-leading-icon="false"` turns it off. */
        this.showLeadingIcon = true;
        /** The leading glyph. Figma ships it swapped to `star`. */
        this.icon = "star";
        /** The action is unavailable. Say why nearby. Hides the remove control. */
        this.disabled = false;
        /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
        this.shape = "rounded";
        /** Status colour for the border, label and icons. Use one per kind of item, e.g. red for PDF. */
        this.color = "neutral";
        /** Overrides the label, icon and remove colour. A token path (`feedback/info/foreground`) or any CSS colour. */
        this.foreground = null;
        /** Overrides the fill, which `color` leaves neutral. A token path or any CSS colour. */
        this.background = null;
        /** Overrides the border colour. A token path or any CSS colour. */
        this.border = null;
        /** Show the remove control after the label (fires `zds-discard`). Never shown while disabled. */
        this.discardable = false;
        /** With `discardable`, keep the label a button so it can still be clicked. */
        this.clickable = false;
        /** Accessible name of the remove control. Defaults to "Remove <label>". */
        this.discardLabel = null;
        this.type = "button";
        this.text = "";
    }
    connectedCallback() {
        super.connectedCallback();
        this.text = (this.textContent ?? "").trim();
    }
    onSlotChange() {
        this.text = (this.textContent ?? "").trim();
    }
    discard() {
        this.dispatchEvent(new CustomEvent("zds-discard", { detail: { label: this.text }, bubbles: true, composed: true }));
    }
    onKeyDown(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            this.discard();
        }
    }
    render() {
        const style = styleMap({
            "--zds-assist-fg": paint(this.foreground),
            "--zds-assist-bg": paint(this.background),
            "--zds-assist-border": paint(this.border),
        });
        const content = html `
      <!-- Decorative: the label names the action. Rounded family, Icon xsmall (control/icon-xs, Figma). -->
      ${this.showLeadingIcon && this.icon
            ? html `<zds-icon class="zds-chip__glyph" name=${this.icon} size="xsmall" .iconStyle=${"rounded"}></zds-icon>`
            : nothing}
      <span class="zds-chip__label"><slot @slotchange=${this.onSlotChange}></slot></span>`;
        if (!this.discardable || this.disabled) {
            return html `<button
        part="chip"
        type=${this.type}
        class="zds-chip zds-assist-chip"
        data-interactive=""
        data-shape=${this.shape}
        data-color=${this.color}
        data-disabled=${this.disabled ? "" : nothing}
        style=${style}
        ?disabled=${this.disabled}
      >${content}</button>`;
        }
        return html `<span
      part="chip"
      class="zds-chip zds-assist-chip"
      data-interactive=""
      data-discardable=""
      data-shape=${this.shape}
      data-color=${this.color}
      style=${style}
    >
      ${this.clickable ? html `<button type=${this.type} class="zds-assist-chip__action">${content}</button>` : content}
      <button
        part="remove"
        type="button"
        class="zds-assist-chip__remove"
        aria-label=${this.discardLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
        @click=${this.discard}
        @keydown=${this.onKeyDown}
      >
        <!-- Figma pins the close glyph to the rounded family at Icon small. -->
        <zds-icon class="zds-chip__glyph" name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
      </button>
    </span>`;
    }
};
ZdsAssistChip.styles = [chipBase, styles];
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon", reflect: true, converter: defaultTrue })
], ZdsAssistChip.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String })
], ZdsAssistChip.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsAssistChip.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsAssistChip.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsAssistChip.prototype, "color", void 0);
__decorate([
    property({ type: String })
], ZdsAssistChip.prototype, "foreground", void 0);
__decorate([
    property({ type: String })
], ZdsAssistChip.prototype, "background", void 0);
__decorate([
    property({ type: String })
], ZdsAssistChip.prototype, "border", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsAssistChip.prototype, "discardable", void 0);
__decorate([
    property({ type: Boolean })
], ZdsAssistChip.prototype, "clickable", void 0);
__decorate([
    property({ type: String, attribute: "discard-label" })
], ZdsAssistChip.prototype, "discardLabel", void 0);
__decorate([
    property({ type: String })
], ZdsAssistChip.prototype, "type", void 0);
__decorate([
    state()
], ZdsAssistChip.prototype, "text", void 0);
ZdsAssistChip = __decorate([
    customElement("zds-assist-chip")
], ZdsAssistChip);
export { ZdsAssistChip };
