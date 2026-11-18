var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ZdsSubMenuHeader_onActions, _ZdsSubMenuHeader_onBack;
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { subMenuHeaderStyles } from "./navigation-rail.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
/**
 * The title bar of a Navigation Rail's sub menu panel.
 *
 * Type=sub-page leads with a back Icon Button and sits it `space/sm` from the
 * title; Type=default leads with a glyph at `space/md`. `show-leading-icon`
 * hides either (Figma wires it in default only — spec warn). Inside
 * zds-navigation-rail the rail sets `shape`; slotted actions are yours —
 * read `this.closest("zds-navigation-rail")?.shape` to match.
 *
 * @slot actions - Trailing actions — zds-button or zds-icon-button. Replaces Figma's showTrailingActions + slot.
 * @fires zds-back - The back button was pressed (type="sub-page").
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Sub Menu Header)
 */
let ZdsSubMenuHeader = class ZdsSubMenuHeader extends LitElement {
    constructor() {
        super(...arguments);
        /** default: a leading glyph. sub-page: a back Icon Button (`arrow-back`). */
        this.type = "default";
        /** The panel's title (called `heading`, since `title` is the native tooltip). */
        this.heading = "Sub Header";
        /** Leading glyph in type=default. Figma ships a `verified` placeholder. */
        this.icon = "verified";
        /**
         * Shows the leading glyph / back button. Figma wires it in type=default
         * only (spec warn); here it works in both.
         */
        this.showLeadingIcon = true;
        /** Accessible name of the back button. */
        this.backLabel = "Back";
        /** The back Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
        this.shape = "rounded";
        /** Heading level of the title. */
        this.headingLevel = 2;
        this.hasActions = false;
        _ZdsSubMenuHeader_onActions.set(this, (e) => {
            this.hasActions = e.target.assignedElements({ flatten: true }).length > 0;
        });
        _ZdsSubMenuHeader_onBack.set(this, () => {
            this.dispatchEvent(new CustomEvent("zds-back", { bubbles: true, composed: true }));
        });
    }
    render() {
        const lead = !this.showLeadingIcon
            ? nothing
            : this.type === "sub-page"
                ? // Icon Button Size=small, Flavour=subtle (spec, changed 2026-10-21);
                    // Figma pins Shape=sharp, the rail's shape sets it (owner decision).
                    html `<zds-icon-button
            part="back"
            class="back"
            size="small"
            flavour="subtle"
            shape=${this.shape}
            icon="arrow-back"
            label=${this.backLabel}
            @click=${__classPrivateFieldGet(this, _ZdsSubMenuHeader_onBack, "f")}
          ></zds-icon-button>`
                : html `<zds-icon class="icon" name=${this.icon} size="medium"></zds-icon>`;
        return html `
      <div class="lead">
        ${lead}
        <div part="title" class="title" role="heading" aria-level=${this.headingLevel}>${this.heading}</div>
      </div>
      <div class="actions" ?hidden=${!this.hasActions}>
        <slot name="actions" @slotchange=${__classPrivateFieldGet(this, _ZdsSubMenuHeader_onActions, "f")}></slot>
      </div>
    `;
    }
};
_ZdsSubMenuHeader_onActions = new WeakMap();
_ZdsSubMenuHeader_onBack = new WeakMap();
ZdsSubMenuHeader.styles = subMenuHeaderStyles;
__decorate([
    property({ type: String, reflect: true })
], ZdsSubMenuHeader.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuHeader.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZdsSubMenuHeader.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZdsSubMenuHeader.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "back-label" })
], ZdsSubMenuHeader.prototype, "backLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSubMenuHeader.prototype, "shape", void 0);
__decorate([
    property({ type: Number, attribute: "heading-level" })
], ZdsSubMenuHeader.prototype, "headingLevel", void 0);
__decorate([
    state()
], ZdsSubMenuHeader.prototype, "hasActions", void 0);
ZdsSubMenuHeader = __decorate([
    customElement("zds-sub-menu-header")
], ZdsSubMenuHeader);
export { ZdsSubMenuHeader };
