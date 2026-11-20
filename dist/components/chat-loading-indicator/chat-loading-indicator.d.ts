import { LitElement } from "lit";
/**
 * Stands in while the assistant or someone else produces a reply: three
 * pulsing dots and a short present-tense label (Thinking, Typing). Both stop
 * under reduced motion.
 *
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatLoadingIndicator extends LitElement {
    static styles: import("lit").CSSResult;
    label: string;
    rounded: boolean;
    connectedCallback(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-loading-indicator": ZdsChatLoadingIndicator;
    }
}
//# sourceMappingURL=chat-loading-indicator.d.ts.map