import * as React from "react";
import { Avatar } from "../avatar/Avatar.js";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { NavigationRailContext, type NavigationRailShape } from "./context.js";
import "./navigation-rail.css";

export type NavigationHeaderType = "avatar" | "logo";

export interface NavigationHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "children"> {
  /** The mark: the user's Avatar, or the `zebra` logo glyph. */
  type?: NavigationHeaderType;
  /** The wide form, with title and action. Inside a NavigationRail the rail sets it. */
  expanded?: boolean;
  /** The product or user name beside the mark, in the wide form. */
  heading?: string;
  /** Shows the title (wide form only). */
  showTitle?: boolean;
  /** Shows the trailing Icon Button (wide form only). */
  showIconButton?: boolean;
  /** The trailing Icon Button's glyph. Settings by default; set any icon, with `actionLabel` and `onAction` to match. */
  actionIcon?: IconName;
  /** Accessible name of the action. */
  actionLabel?: string;
  /** Called when the action is pressed. */
  onAction?: () => void;
  /**
   * The settings Icon Button's shape. Inside a NavigationRail the rail's
   * `shape` sets it and this prop is ignored.
   */
  shape?: NavigationRailShape;
  /** Avatar initials (type=avatar). */
  avatarInitials?: string;
  /** Avatar photo (type=avatar). */
  avatarSrc?: string;
  className?: string;
}

/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Navigation Header)
 */
export const NavigationHeader = React.forwardRef<HTMLDivElement, NavigationHeaderProps>(function NavigationHeader(
  {
    type = "avatar",
    expanded: expandedProp = true,
    heading = "Title",
    showTitle = true,
    showIconButton = true,
    actionLabel = "Settings",
    actionIcon = "settings",
    onAction,
    shape: shapeProp = "rounded",
    avatarInitials = "ZB",
    avatarSrc,
    className,
    ...rest
  },
  ref,
) {
  const rail = React.useContext(NavigationRailContext);
  const expanded = rail ? rail.expanded : expandedProp;
  const shape = rail ? rail.shape : shapeProp;
  return (
    <div
      ref={ref}
      {...rest}
      className={["zds-navigation-header", className].filter(Boolean).join(" ")}
      data-type={type}
      data-expanded={expanded ? "" : undefined}
    >
      <div className="zds-navigation-header__brand">
        {type === "avatar" ? (
          // Avatar Size=small, status on, ring and close off (spec).
          <Avatar
            size="small"
            type={avatarSrc ? "photo" : "initials"}
            src={avatarSrc}
            initials={avatarInitials}
            alt={heading}
            showStatus
            showRing={false}
            showClose={false}
          />
        ) : (
          // Icon Size=large, Framed (spec: height control/target-min).
          <Icon className="zds-navigation-header__logo" name="zebra" size="large" framed label={expanded ? undefined : heading} />
        )}
        {expanded && showTitle ? <span className="zds-navigation-header__title">{heading}</span> : null}
      </div>
      {expanded && showIconButton ? (
        // Figma pins Shape=sharp; the rail's shape sets it (owner decision).
        <IconButton flavour="subtle" size="small" shape={shape} icon={actionIcon} label={actionLabel} onClick={onAction} />
      ) : null}
    </div>
  );
});
