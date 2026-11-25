import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large
 * tile beside two stacked, the last counting what does not fit. `count` is
 * derived from `photos` and reflected.
 *
 * @fires zds-open - A photo was activated (when `clickable`). `detail.index`.
 * @spec specs/chat-message/chat-message.spec.json
 */
export declare class ZdsChatPhotos extends LitElement {
    static styles: import("lit").CSSResult;
    /** Image URLs. Up to three show; the rest are counted on the last tile. */
    photos: string[];
    showIcon: boolean;
    rounded: boolean;
    clickable: boolean;
    count: "1" | "2" | "3" | "more";
    protected willUpdate(changed: PropertyValues<this>): void;
    private tile;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-photos": ZdsChatPhotos;
    }
}
//# sourceMappingURL=chat-photos.d.ts.map