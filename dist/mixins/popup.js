var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css } from "lit";
import { property, query } from "lit/decorators.js";
import {} from "./utils.js";
import { ZetaPopupEvent } from "../events.js";
/**
 * Mixin to add make component pop up as a dialog.
 *
 * @param superClass - LitElement to add mixin to
 * @event {CustomEvent<ZetaPopupEventDetail>} open - Fired when the popup is opened.
 * @event {Event} close - Fired when the popup is closed.
 * @event {Event} cancel - Fired when the popup is cancelled.
 * @returns - component with mixin applied.
 */
export const Popup = (superClass) => {
    class PopupClass extends superClass {
        constructor() {
            super(...arguments);
            /** Return value of the dialog. */
            this.returnValue = "";
            /** Whether the modal should close when the background barrier is clicked.
             *
             * This is only relevant for modal dialogs, non-modal dialogs do not control their background barrier.
             */
            this.closeOnBarrierClicked = true;
        }
        /** Whether component is open or closed. */
        get open() {
            return this.dialog?.open ?? false;
        }
        async showModal() {
            return this._show(true);
        }
        async show() {
            return this._show(false);
        }
        /** @internal */
        async _show(isModal) {
            await this.updateComplete;
            if (isModal) {
                // The scrim joins the top layer first, so the dialog lands directly above it.
                if (this.scrim && !this.scrim.matches(":popover-open"))
                    this.scrim.showPopover();
                this.dialog.showModal();
            }
            else {
                this.dialog.show();
            }
            this.dispatchEvent(new ZetaPopupEvent("open").toEvent());
        }
        async hide(returnValue = this.returnValue) {
            await this.updateComplete;
            this.returnValue = returnValue;
            this.dialog.close(returnValue);
            if (this.scrim?.matches(":popover-open"))
                this.scrim.hidePopover();
        }
        async cancel() {
            await this.hide("cancel");
        }
        _onClose(_e) {
            if (this.scrim?.matches(":popover-open"))
                this.scrim.hidePopover();
            this.dispatchEvent(new Event("close"));
        }
        _onCancel() {
            this.dispatchEvent(new Event("cancel"));
        }
        onBarrierClicked(e) {
            if (!this.dialog) {
                return; // Exit early if the dialog element is not present
            }
            const { left, right, top, bottom } = this.dialog.getBoundingClientRect();
            if (e.target === this.dialog &&
                e instanceof MouseEvent &&
                (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) &&
                this.closeOnBarrierClicked) {
                e.preventDefault();
                void this.cancel();
            }
        }
        /** @internal adds all the eventListeners*/
        firstUpdated(_changedProperties) {
            super.firstUpdated(_changedProperties);
            if (this.dialog) {
                this.dialog.addEventListener("click", this.onBarrierClicked.bind(this));
                this.dialog.addEventListener("close", this._onClose.bind(this));
                this.dialog.addEventListener("cancel", this._onCancel.bind(this));
            }
        }
        /** @internal removes all the eventListeners*/
        disconnectedCallback() {
            super.disconnectedCallback();
            this.dialog.removeEventListener("click", this.onBarrierClicked);
            this.dialog.removeEventListener("close", this._onClose);
            this.dialog.removeEventListener("cancel", this._onCancel);
        }
        static { this.styles = [
            superClass.styles ?? [],
            css `
        dialog::backdrop {
          background-color: var(--overlay-scrim);
        }
        /* With a zeta-scrim before it, the scrim draws the backdrop and ::backdrop only catches the click. */
        zeta-scrim + dialog::backdrop {
          background-color: transparent;
        }
      `
        ]; }
    }
    __decorate([
        query("dialog")
    ], PopupClass.prototype, "dialog", void 0);
    __decorate([
        query("zeta-scrim")
    ], PopupClass.prototype, "scrim", void 0);
    __decorate([
        property({ type: String })
    ], PopupClass.prototype, "returnValue", void 0);
    __decorate([
        property({ type: Boolean })
    ], PopupClass.prototype, "closeOnBarrierClicked", void 0);
    __decorate([
        property({ type: Boolean, reflect: true, attribute: "open" })
    ], PopupClass.prototype, "open", null);
    return PopupClass;
};
//# sourceMappingURL=popup.js.map