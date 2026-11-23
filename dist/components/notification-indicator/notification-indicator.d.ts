import { LitElement } from "lit";
export type NotificationIndicatorSize = "small" | "medium" | "large";
/**
 * A small badge that flags unread or pending activity on an icon or
 * navigation item.
 *
 * Marks that something is waiting on whatever it is pinned to, optionally
 * with a count; small is a plain dot. It carries one fixed colour, so it
 * reports how many and never what kind. The count is its only text, so what
 * it refers to has to be named by whatever it is pinned to.
 *
 * @part root - The badge itself: the filled, sized dot or pill.
 * @part label - The count/label text, absent entirely at size="small".
 *
 * @spec specs/notification-indicator/notification-indicator.spec.json
 */
export declare class ZdsNotificationIndicator extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * Fits the badge to its context. Defaults to large, as Figma does.
     */
    size: NotificationIndicatorSize;
    /**
     * The count or short label shown inside the badge. Only rendered at
     * medium and large — small is a plain dot with no label part at all.
     * It holds 3 characters at most, and anything above 99 reads 99+.
     */
    value: string;
    private get count();
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-notification-indicator": ZdsNotificationIndicator;
    }
}
//# sourceMappingURL=notification-indicator.d.ts.map