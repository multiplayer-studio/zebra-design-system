import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import "../icon-indicator/icon-indicator.js";
import "./notification-leading-visual.js";
import type { NotificationLeadingFlavour } from "./notification-leading-visual.js";
export type { NotificationLeadingFlavour };
/**
 * A single entry in a notification list: who or what it came from, a heading
 * and message, an optional attachment and an action slot.
 *
 * Read (spec issue "Metadata vs extracted"): Figma's Read=true also switches
 * the title from label/large to body/medium and drops the group bar, against
 * the metadata's "nothing else changes". We follow Figma — the title weight is
 * the second, non-colour unread signal — identically in React's NotificationItem.
 *
 * Not interactive itself (spec: "no hover, focus, pressed or disabled state");
 * the slotted actions are the interactive parts. The host is an `article`
 * (ElementInternals) named by its heading and read state, ready to sit in a
 * `role="feed"` or list; set `tabindex` if the feed needs entries focusable.
 * An `aria-label` on the host overrides the computed name.
 *
 * Reuses zds-avatar, zds-notification-indicator (unread dot, recoloured to
 * interactive/primary through its `root` part), zds-icon-indicator (urgency,
 * via its own `icon`/`fill`) and zds-icon.
 *
 * @slot - The message body for rich content, after `message` when both are set. Whitespace-only content is ignored.
 * @slot actions - The action slot, usually one small outline rounded zds-button. The row shows only when filled (spec `showActions`).
 * @part card - The card.
 * @part title - The heading text.
 * @part body - The message body.
 *
 * @spec specs/notification-item/notification-item.spec.json
 */
export declare class ZdsNotificationItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** The entry has been seen: the card drops its surface, the unread dot goes and the title drops to body weight. */
    read: boolean;
    /** The entry stands for several collapsed together. Draws a bar under the card; unread entries only. */
    group: boolean;
    /** What happened. Spec `title`; named `heading` because `title` is a global HTML attribute (native tooltip). */
    heading: string;
    /** When it happened, already formatted. */
    timestamp: string;
    /** The detail. Clamped to two lines on screen; the full text stays in the DOM for assistive tech. */
    message: string | null;
    /** Attached file's name. The attachment row shows only when this is set (spec `showAttachment` follows its presence). */
    attachment: string | null;
    /** Flags the entry as needing attention first (spec `showUrgencyIndicator`). Reserve it. */
    urgent: boolean;
    /** Accessible name of the urgency indicator. */
    urgentLabel: string;
    /** The leading visual's flavour: avatar (a person), image (artwork), icon (fallback). */
    leading: NotificationLeadingFlavour;
    /** avatar: the photo; image: the artwork. */
    src: string | null;
    /** avatar: initials shown when there is no `src`. */
    initials: string | null;
    /** icon: the glyph. */
    icon: IconName;
    private hasBody;
    private hasActions;
    private readonly internals;
    constructor();
    protected willUpdate(changed: PropertyValues<this>): void;
    private onBodySlot;
    private onActionsSlot;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-notification-item": ZdsNotificationItem;
    }
}
//# sourceMappingURL=notification-item.d.ts.map