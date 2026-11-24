import * as React from "react";
import type { IconName } from "../icon/Icon.js";
import { type NotificationLeadingFlavour } from "./NotificationLeadingVisual.js";
import "./notification-item.css";
export type { NotificationLeadingFlavour };
export interface NotificationItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title"> {
    /** The entry has been seen: the card drops its surface, the unread dot goes and the title drops to body weight. */
    read?: boolean;
    /** The entry stands for several collapsed together. Draws a bar under the card; unread entries only. */
    group?: boolean;
    /** What happened. Spec `title`; named `heading` in both packages because `title` is a global HTML attribute (native tooltip). */
    heading?: string;
    /** When it happened, already formatted. */
    timestamp?: string;
    /** The detail. Clamped to two lines on screen; the full text stays in the DOM for assistive tech. `children` render after it, for rich content. */
    message?: React.ReactNode;
    /** Attached file's name. The attachment row shows only when this is set (spec `showAttachment` follows its presence). */
    attachment?: string;
    /** The action slot, usually one small outline rounded Button. The row shows only when given (spec `showActions`). */
    actions?: React.ReactNode;
    /** Flags the entry as needing attention first (spec `showUrgencyIndicator`). Reserve it. */
    urgent?: boolean;
    /** Accessible name of the urgency indicator. */
    urgentLabel?: string;
    /** The leading visual's flavour: avatar (a person), image (artwork), icon (fallback). */
    leading?: NotificationLeadingFlavour;
    /** avatar: the photo; image: the artwork. */
    src?: string;
    /** avatar: initials shown when there is no `src`. */
    initials?: string;
    /** icon: the glyph. */
    icon?: IconName;
    className?: string;
}
/**
 * A single entry in a notification list: who or what it came from, a heading
 * and message, an optional attachment and an action slot.
 *
 * Read (spec issue "Metadata vs extracted"): Figma's Read=true also switches
 * the title from label/large to body/medium and drops the group bar, against
 * the metadata's "nothing else changes". We follow Figma — the title weight is
 * the second, non-colour unread signal — identically in `<zds-notification-item>`.
 *
 * Not interactive itself (spec: "no hover, focus, pressed or disabled state");
 * the actions are the interactive parts. It is an `article` named by its
 * heading and read state, ready to sit in a `role="feed"` or list; pass
 * `tabIndex` if the feed needs entries focusable. No Base UI primitive fits a
 * static article, so none is wrapped.
 *
 * Reuses Avatar, NotificationIndicator (unread dot, recoloured to
 * interactive/primary through its className), IconIndicator (urgency, via its
 * own `icon`/`fill` props) and Icon.
 *
 * Kept in step with packages/web-components `<zds-notification-item>`.
 *
 * @spec specs/notification-item/notification-item.spec.md
 */
export declare const NotificationItem: React.ForwardRefExoticComponent<NotificationItemProps & React.RefAttributes<HTMLDivElement>>;
