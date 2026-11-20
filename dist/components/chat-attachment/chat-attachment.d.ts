import { LitElement } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
/**
 * A file tile with a download control, a video preview, or an audio
 * waveform, in a message's Attachment Slot. Playback is real when `src` is
 * set; a playing video keeps a pause control (spec issue, as intended).
 *
 * @fires zds-download - Download pressed on a file with no `src`.
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatAttachment extends LitElement {
    static styles: import("lit").CSSResult;
    type: "file" | "video" | "audio";
    fileName: string;
    fileMeta: string;
    duration: string;
    src: string;
    poster: string;
    showIcon: boolean;
    rounded: boolean;
    playing: boolean;
    private progress;
    private elapsed;
    private media?;
    private toggle;
    private get events();
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-attachment": ZdsChatAttachment;
    }
}
//# sourceMappingURL=chat-attachment.d.ts.map