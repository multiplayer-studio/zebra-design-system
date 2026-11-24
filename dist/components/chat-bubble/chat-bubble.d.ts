import { LitElement } from "lit";
export type ChatBubbleStatus = "single" | "first" | "middle" | "last";
/**
 * The text of a message. fill: a tinted bubble; none: plain text on the page.
 * `role-name` stands for the spec's Role (sender, receiver), named so as not
 * to collide with the ARIA `role` attribute.
 *
 * @slot - The message text.
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatBubble extends LitElement {
    static styles: import("lit").CSSResult;
    bubbleStyle: "fill" | "none";
    /** Position in a run of one sender's bubbles. The corner toward the neighbour tightens. */
    status: ChatBubbleStatus;
    roleName: "sender" | "receiver";
    rounded: boolean;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-bubble": ZdsChatBubble;
    }
}
//# sourceMappingURL=chat-bubble.d.ts.map