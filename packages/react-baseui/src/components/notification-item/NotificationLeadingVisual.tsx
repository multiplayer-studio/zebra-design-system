import { Avatar } from "../avatar/Avatar.js";
import { Icon, type IconName } from "../icon/Icon.js";

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
export function NotificationLeadingVisual({ flavour, src, initials, icon }: NotificationLeadingVisualProps) {
  return (
    <span
      className="zds-notification-leading-visual"
      data-flavour={flavour}
      aria-hidden="true"
      // The artwork is the slot's own background (spec: "a background rather
      // than a separate element"). A content URL, not a themed value.
      style={flavour === "image" && src ? { backgroundImage: `url("${src}")` } : undefined}
    >
      {flavour === "avatar" ? (
        <Avatar
          size="xxsmall"
          type={src ? "photo" : "initials"}
          src={src}
          initials={initials}
          alt=""
          showStatus={false}
          showRing={false}
          showClose={false}
        />
      ) : flavour === "icon" ? (
        // Family pinned to rounded: the `shape` token is a string no
        // component can read from CSS yet (same as IconIndicator).
        <Icon name={icon} size="medium" iconStyle="rounded" />
      ) : null}
    </span>
  );
}
