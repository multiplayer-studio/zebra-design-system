import type { LitElement } from "lit";
import { type Constructor } from "./utils.js";
declare class PopupInterface {
    returnValue: string;
    open: boolean;
    hide: (returnValue?: string) => Promise<void>;
    show: () => Promise<void>;
    showModal: () => Promise<void>;
    onBarrierClicked: (e: Event) => void;
    closeOnBarrierClicked: boolean;
}
/**
 * Mixin to add make component pop up as a dialog.
 *
 * @param superClass - LitElement to add mixin to
 * @event {CustomEvent<ZetaPopupEventDetail>} open - Fired when the popup is opened.
 * @event {Event} close - Fired when the popup is closed.
 * @event {Event} cancel - Fired when the popup is cancelled.
 * @returns - component with mixin applied.
 */
export declare const Popup: <T extends Constructor<LitElement>>(superClass: T) => Constructor<PopupInterface & LitElement> & T;
export {};
//# sourceMappingURL=popup.d.ts.map