import { LitElement, nothing } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../avatar/avatar.js";
import "../icon/icon.js";
export type NotificationLeadingFlavour = "avatar" | "image" | "icon";
/**
 * The private `_Leading Visual` part of `<zds-notification-item>`: a circular
 * control/sm slot holding an Avatar, an image or an Icon. Registered by the
 * item and not exported from the package — the flavour is chosen through the
 * item's `leading`.
 *
 * Decorative in all three flavours (spec accessibility: it carries no text),
 * so the item's heading has to name the source.
 *
 * Spec: specs/notification-item/notification-item.spec.json (subcomponents)
 */
export declare class ZdsNotificationLeadingVisual extends LitElement {
    static styles: import("lit").CSSResult;
    flavour: NotificationLeadingFlavour;
    /** avatar: the photo (initials are shown without one). image: the artwork. */
    src: string | null;
    /** avatar: shown when there is no `src`. */
    initials: string | null;
    /** icon: the glyph. */
    icon: IconName;
    protected updated(): void;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-notification-leading-visual": ZdsNotificationLeadingVisual;
    }
}
//# sourceMappingURL=notification-leading-visual.d.ts.map