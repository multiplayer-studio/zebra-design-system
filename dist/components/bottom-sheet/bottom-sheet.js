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
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import { lockScroll, unlockScroll, deepActiveElement, firstFocusable } from "../dialog/dialog.js";
import { defaultTrue } from "../chip/chip.js";
/** A unique id for the title, so the sheet can name itself with it. */
const ID = () => `zds-bottom-sheet-${Math.random().toString(36).slice(2)}`;
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * By default it only draws the surface, and the screen presents it. With
 * `modal`, it presents itself: a native `<dialog>` anchored to the bottom of
 * the viewport over a `<zds-scrim>` (tone scrim), focus moved in and returned,
 * page scroll locked, and Escape or a scrim click closing it when
 * `dismissible`. It rises from the bottom edge (animations/smooth; none under
 * reduced motion). Figma defines no motion, so that is a code decision.
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
 * @fires zds-open-change - `{ open, reason }` when Escape or a scrim click closes a modal sheet. Not fired for a programmatic `open` change.
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
        /** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only. */
        this.modal = false;
        /** Whether a modal sheet is shown. Reflected. */
        this.open = false;
        /** Escape and a scrim click close a modal sheet. `dismissible="false"` when the sheet needs a decision. */
        this.dismissible = true;
        this.hasActions = false;
        this.returnFocus = null;
        this.locked = false;
        this.onKeydown = (e) => {
            if (e.key !== "Escape")
                return;
            e.preventDefault();
            e.stopPropagation();
            if (this.dismissible)
                this.setOpen(false, "escape");
        };
        this.onCancel = (e) => {
            e.preventDefault();
            if (this.dismissible)
                this.setOpen(false, "escape");
        };
        // The ::backdrop hit-tests as the <dialog>; the dialog box is the sheet, so
        // a click outside it is a click on the scrim.
        this.onDialogClick = (e) => {
            const dlg = this.dialogEl;
            if (!dlg || e.target !== dlg || !this.dismissible)
                return;
            const r = dlg.getBoundingClientRect();
            const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            if (!inside)
                this.setOpen(false, "backdrop");
        };
        _ZdsBottomSheet_titleId.set(this, ID());
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.locked) {
            unlockScroll();
            this.locked = false;
        }
    }
    /** Opens a modal sheet (same as `open = true`). */
    show() { this.open = true; }
    /** Closes a modal sheet (same as `open = false`). */
    close() { this.open = false; }
    setOpen(open, reason) {
        if (this.open === open)
            return;
        this.open = open;
        this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
    }
    updated(changed) {
        if (changed.has("open") || changed.has("modal"))
            this.syncDialog();
    }
    syncDialog() {
        const dlg = this.dialogEl;
        if (!this.modal || !dlg) {
            if (this.locked) {
                unlockScroll();
                this.locked = false;
            }
            return;
        }
        if (!this.open)
            lowerScrim(this.scrimEl);
        if (this.open && !dlg.open) {
            this.returnFocus = deepActiveElement();
            raiseScrim(this.scrimEl);
            dlg.showModal();
            if (!this.locked) {
                lockScroll();
                this.locked = true;
            }
            (firstFocusable(dlg.childNodes) ?? dlg).focus();
        }
        else if (!this.open && dlg.open) {
            dlg.close();
            if (this.locked) {
                unlockScroll();
                this.locked = false;
            }
            const back = this.returnFocus;
            this.returnFocus = null;
            if (back?.isConnected)
                back.focus();
        }
    }
    render() {
        const surface = html `
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
        if (!this.modal)
            return surface;
        return html `<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="sheet" aria-labelledby=${__classPrivateFieldGet(this, _ZdsBottomSheet_titleId, "f")}
      @keydown=${this.onKeydown} @cancel=${this.onCancel} @click=${this.onDialogClick}>${surface}</dialog>`;
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
    property({ type: Boolean, reflect: true })
], ZdsBottomSheet.prototype, "modal", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsBottomSheet.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZdsBottomSheet.prototype, "dismissible", void 0);
__decorate([
    state()
], ZdsBottomSheet.prototype, "hasActions", void 0);
__decorate([
    query("dialog")
], ZdsBottomSheet.prototype, "dialogEl", void 0);
__decorate([
    query("zds-scrim")
], ZdsBottomSheet.prototype, "scrimEl", void 0);
ZdsBottomSheet = __decorate([
    customElement("zds-bottom-sheet")
], ZdsBottomSheet);
export { ZdsBottomSheet };
