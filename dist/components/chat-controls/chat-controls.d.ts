import { LitElement } from "lit";
import "../icon-button/icon-button.js";
/**
 * The bar of message actions: React, the Control Slot (Reply by default)
 * and More. React and More are toggles; only one of their panels is open at
 * a time. Every control follows `rounded` (spec issue: Figma mixes shapes).
 *
 * @slot - The Control Slot: extra actions (zds-icon-button, size small, flavour text). Reply when empty.
 * @slot more - Wraps the More control, e.g. a zds-dropdown holding it.
 * @fires zds-react - React pressed.
 * @fires zds-more - More pressed.
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatControls extends LitElement {
    static styles: import("lit").CSSResult;
    controlsStyle: "fill" | "none";
    rounded: boolean;
    showReact: boolean;
    showMore: boolean;
    reactOpen: boolean;
    moreOpen: boolean;
    reactLabel: string;
    replyLabel: string;
    moreLabel: string;
    private filled;
    connectedCallback(): void;
    private fire;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-controls": ZdsChatControls;
    }
}
//# sourceMappingURL=chat-controls.d.ts.map