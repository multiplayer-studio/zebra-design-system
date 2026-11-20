import { type IconName } from "../icon/Icon.js";
export type NotificationLeadingFlavour = "avatar" | "image" | "icon";
export interface NotificationLeadingVisualProps {
    /** avatar for a person (default), image for something with artwork, icon as the fallback. */
    flavour: NotificationLeadingFlavour;
    /** avatar: the photo (initials are shown without one). image: the artwork. */
    src?: string;
    /** avatar: shown when there is no `src`. */
    initials?: string;
    /** icon: the glyph. */
    icon: IconName;
}
/**
 * The private `_Leading Visual` part of Notification Item: a circular
 * control/sm slot holding an Avatar, an image or an Icon. Not exported from
 * the package — the flavour is chosen through NotificationItem's `leading`.
 *
 * Decorative in all three flavours (spec accessibility: it carries no text),
 * so the item's heading has to name the source.
 *
 * @spec specs/notification-item/notification-item.spec.md (Subcomponents)
 */
export declare function NotificationLeadingVisual({ flavour, src, initials, icon }: NotificationLeadingVisualProps): import("react").JSX.Element;
