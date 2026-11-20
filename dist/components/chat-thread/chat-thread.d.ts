import { LitElement } from "lit";
import "../divider/divider.js";
import "../caret-indicator/caret-indicator.js";
/**
 * "X replies", a divider and a caret; pressing it expands the replies in
 * place, pushing the messages below down. In code the thread sits in its own
 * container under the message, lined up with the text (spec behaviour).
 *
 * @slot - The Thread Slot: reply messages, each a zds-chat-message.
 * @fires zds-toggle - Opened or closed. `detail.open`.
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatThread extends LitElement {
    static styles: import("lit").CSSResult;
    replyCount: number;
    open: boolean;
    repliesLabel: string;
    /** The word after a count of one. */
    replyLabel: string;
    private get noun();
    private toggle;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-thread": ZdsChatThread;
    }
}
//# sourceMappingURL=chat-thread.d.ts.map