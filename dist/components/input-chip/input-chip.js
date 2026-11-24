var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import chipBase from "../chip/chip-base.styles.js";
import styles from "./input-chip.styles.js";
import { defaultTrue, initialsOf } from "../chip/chip.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
/**
 * Represents a person, entity or value someone has entered or picked, such
 * as a recipient on a message, so it can be reviewed and removed without
 * retyping. Belongs inside input and selection fields; reach for
 * `<zds-filter-chip>` to narrow content or `<zds-assist-chip>` to offer an
 * action.
 *
 * The chip itself is not a control: its one interactive part is the remove
 * control, a native button named "Remove <label>". Figma gives that control
 * no API and shows it even when disabled (spec issue); here it renders only
 * when `removable` is set — the element's equivalent of passing a handler —
 * and never on a disabled chip. Activating it (click, Enter / Space, or
 * Backspace / Delete while focused) fires `zds-remove`; removing the chip,
 * announcing the change and moving focus belong to the field that owns it.
 * The chip shows its focus treatment while the remove control has keyboard
 * focus.
 *
 * @slot - The label: the value itself, usually a name or a term.
 * @fires zds-remove - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
 *
 * @spec specs/input-chip/input-chip.spec.json
 */
let ZdsInputChip = class ZdsInputChip extends LitElement {
    constructor() {
        super(...arguments);
        /** Lead with the person's face or initials. Defaults to true; `show-avatar="false"` turns it off. */
        this.showAvatar = true;
        /** Photo for the avatar. Without it the avatar shows initials. */
        this.avatarSrc = null;
        /** Initials for the avatar. Defaults to the first letters of the label. */
        this.avatarInitials = null;
        /**
         * The avatar's swatch behind the initials: one of zds-avatar's seven
         * swatches, a token name (`chart/series/2`), a custom property or any CSS colour.
         */
        this.avatarColor = null;
        /** The value is fixed: the chip greys out and the remove control is hidden. Say why nearby. */
        this.disabled = false;
        /** Pill (rounded) or square (sharp) corners. Match the field the chips sit in. */
        this.shape = "rounded";
        /** Show the remove control (fires `zds-remove`). Never shown while disabled. */
        this.removable = false;
        /** Accessible name of the remove control. Defaults to "Remove <label>". */
        this.removeLabel = null;
        this.text = "";
    }
    connectedCallback() {
        super.connectedCallback();
        this.text = (this.textContent ?? "").trim();
    }
    onSlotChange() {
        this.text = (this.textContent ?? "").trim();
    }
    remove_() {
        this.dispatchEvent(new CustomEvent("zds-remove", { detail: { label: this.text }, bubbles: true, composed: true }));
    }
    onKeyDown(e) {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            this.remove_();
        }
    }
    render() {
        const canRemove = this.removable && !this.disabled;
        return html `<span
      part="chip"
      class="zds-chip zds-input-chip"
      data-interactive=""
      data-shape=${this.shape}
      data-disabled=${this.disabled ? "" : nothing}
      aria-disabled=${this.disabled ? "true" : nothing}
    >
      ${this.showAvatar
            ? html `<zds-avatar
            class="zds-input-chip__avatar"
            aria-hidden="true"
            size="xxxsmall"
            type=${this.avatarSrc ? "photo" : "initials"}
            src=${this.avatarSrc ?? nothing}
            initials=${this.avatarInitials ?? initialsOf(this.text)}
            swatch-color=${this.avatarColor ?? nothing}
            .showStatus=${false}
            .showRing=${false}
            .showClose=${false}
          ></zds-avatar>`
            : nothing}
      <span class="zds-chip__label"><slot @slotchange=${this.onSlotChange}></slot></span>
      ${canRemove
            ? html `<button
            part="remove"
            type="button"
            class="zds-input-chip__remove"
            aria-label=${this.removeLabel ?? (this.text ? `Remove ${this.text}` : "Remove")}
            @click=${this.remove_}
            @keydown=${this.onKeyDown}
          >
            <!-- Figma pins the close glyph to the rounded family at Icon small. -->
            <zds-icon class="zds-chip__glyph" name="close" size="small" .iconStyle=${"rounded"}></zds-icon>
          </button>`
            : nothing}
    </span>`;
    }
};
ZdsInputChip.styles = [chipBase, styles];
__decorate([
    property({ type: Boolean, attribute: "show-avatar", reflect: true, converter: defaultTrue })
], ZdsInputChip.prototype, "showAvatar", void 0);
__decorate([
    property({ type: String, attribute: "avatar-src" })
], ZdsInputChip.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String, attribute: "avatar-initials" })
], ZdsInputChip.prototype, "avatarInitials", void 0);
__decorate([
    property({ type: String, attribute: "avatar-color" })
], ZdsInputChip.prototype, "avatarColor", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsInputChip.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsInputChip.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsInputChip.prototype, "removable", void 0);
__decorate([
    property({ type: String, attribute: "remove-label" })
], ZdsInputChip.prototype, "removeLabel", void 0);
__decorate([
    state()
], ZdsInputChip.prototype, "text", void 0);
ZdsInputChip = __decorate([
    customElement("zds-input-chip")
], ZdsInputChip);
export { ZdsInputChip };
