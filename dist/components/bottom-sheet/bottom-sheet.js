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
var _ZdsBottomSheet_instances, _ZdsBottomSheet_titleId, _ZdsBottomSheet_onActions;
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
/** A unique id for the title, so the sheet can name itself with it. */
const ID = () => `zds-bottom-sheet-${Math.random().toString(36).slice(2)}`;
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * It only draws the surface. Presenting it, the scrim, moving focus in and
 * dismissing it all belong to the screen, and Figma defines no motion, shadow
 * or height cap.
 *
 * Departures from Figma, each a spec issue:
 * - `heading`, `header-icon`, `show-leading-icon`, `header-alignment` and the
 *   `actions` slot are inputs, because Figma sets them on nested instances.
 * - The sheet fills its container (Figma ships a fixed 360).
 *
 * @slot - The items, laid out by `content-type`.
 * @slot actions - The footer actions, usually an outline and a primary `zds-button` at size small.
 * @csspart surface - The sheet.
 * @csspart handle - The drag affordance. It has no control behind it.
 * @fires zds-leading-click - The leading button was activated.
 * @csspart header - The title row.
 * @csspart content - The region holding the items.
 * @csspart footer - The `zds-card-footer`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
let ZdsBottomSheet = class ZdsBottomSheet extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsBottomSheet_instances.add(this);
        /** How the items are arranged. */
        this.contentType = "list";
        /** The sheet's title and accessible name. Use a short noun phrase. */
        this.heading = "Sheet Title";
        /** Glyph before the title. */
        this.headerIcon = "arrow-back";
        /** Show the glyph before the title. */
        this.showLeadingIcon = true;
        /** Accessible name of the leading button (spec issue: Figma has none). */
        this.leadingLabel = "Back";
        /** `center` centres the title and pins the icon to the leading edge. */
        this.headerAlignment = "start";
        this.hasActions = false;
        _ZdsBottomSheet_titleId.set(this, ID());
    }
    render() {
        return html `
      <section part="surface" class="surface" aria-labelledby=${__classPrivateFieldGet(this, _ZdsBottomSheet_titleId, "f")}>
        <div part="handle" class="handle"><span class="bar"></span></div>
        <div part="header" class="header">
          ${this.showLeadingIcon ? html `<zds-icon-button
                class="icon"
                flavour="subtle"
                size="small"
                shape="rounded"
                icon=${this.headerIcon}
                .label=${this.leadingLabel}
                @click=${() => this.dispatchEvent(new CustomEvent("zds-leading-click", { bubbles: true, composed: true }))}
              ></zds-icon-button>` : nothing}
          <h2 id=${__classPrivateFieldGet(this, _ZdsBottomSheet_titleId, "f")} class="title">${this.heading}</h2>
        </div>
        <div part="content" class="content"><slot></slot></div>
        <zds-card-footer part="footer" class="footer" ?hidden=${!this.hasActions}>
          <slot name="actions" @slotchange=${__classPrivateFieldGet(this, _ZdsBottomSheet_instances, "m", _ZdsBottomSheet_onActions)}></slot>
        </zds-card-footer>
      </section>
    `;
    }
};
_ZdsBottomSheet_titleId = new WeakMap();
_ZdsBottomSheet_instances = new WeakSet();
_ZdsBottomSheet_onActions = function _ZdsBottomSheet_onActions(event) {
    this.hasActions = event.target.assignedElements({ flatten: true }).length > 0;
};
ZdsBottomSheet.styles = styles;
__decorate([
    property({ type: String, reflect: true, attribute: "content-type" })
], ZdsBottomSheet.prototype, "contentType", void 0);
__decorate([
    property({ type: String })
], ZdsBottomSheet.prototype, "heading", void 0);
__decorate([
    property({ type: String, attribute: "header-icon" })
], ZdsBottomSheet.prototype, "headerIcon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZdsBottomSheet.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "leading-label" })
], ZdsBottomSheet.prototype, "leadingLabel", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "header-alignment" })
], ZdsBottomSheet.prototype, "headerAlignment", void 0);
__decorate([
    state()
], ZdsBottomSheet.prototype, "hasActions", void 0);
ZdsBottomSheet = __decorate([
    customElement("zds-bottom-sheet")
], ZdsBottomSheet);
export { ZdsBottomSheet };
