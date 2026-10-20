import * as React from "react";
import { iconGlyphs, iconFamily } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";
import "./avatar.css";

export type AvatarSize =
  | "xxxsmall" | "xxsmall" | "xsmall" | "small" | "medium"
  | "large" | "xlarge" | "xxlarge" | "xxxlarge";
export type AvatarContentType = "initials" | "photo" | "icon";
export type AvatarSwatchColor = "purple" | "blue" | "sea" | "yellow" | "orange" | "green" | "burgundy";
export type AvatarStatus = "available" | "away" | "busy" | "dnd" | "on-shift" | "offline" | "icon";

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** Fits the avatar to its context. Nine steps, xxxsmall to xxxlarge. */
  size?: AvatarSize;
  /**
   * What fills the circle. Figma models this as a swap on a nested instance
   * rather than an exposed property (spec issue); this component exposes it
   * because a consumer has to set the content somehow.
   */
  type?: AvatarContentType;
  /** Shown when `type="initials"`. Usually one or two characters. */
  initials?: string;
  /** Background behind initials or an icon. Not used behind a photo. */
  swatchColor?: AvatarSwatchColor;
  /** Shown when `type="photo"`. */
  src?: string;
  /** Accessible text for the photo. Also seeds the default Close accessible name ("Remove {alt}"). */
  alt?: string;
  /** Shown when `type="icon"`. */
  icon?: IconName;
  /** Shows a dismiss badge pinned to the top-right corner. */
  showClose?: boolean;
  /** Called when the dismiss badge is activated. Without a handler the badge is presentational only. */
  onClose?: () => void;
  /** Accessible name for the dismiss badge. Defaults to `Remove ${alt}`, or "Remove" with no `alt`. */
  closeLabel?: string;
  /** Shows a presence badge pinned to the bottom-right corner. */
  showStatus?: boolean;
  /**
   * Presence state. Each state (other than "icon") draws its own verified
   * glyph as well as its own fill colour.
   */
  status?: AvatarStatus;
  /** Shown when `status="icon"`. */
  statusIcon?: IconName;
  /** Accessible text for the presence badge. Presence is colour-only otherwise, so provide this whenever `showStatus` is true. */
  statusLabel?: string;
  /** Shows a border/default outline ring around the avatar. */
  showRing?: boolean;
  className?: string;
}

// Every state but "icon" has its own verified glyph in the icon font,
// confirmed by resolving each status's icon swap to its parent component set
// (not just the swap's own variant name — see the spec's extraction-method
// issue). Close's Figma swap currently points at Offline's glyph, which reads
// as an authoring bug there; the dismiss badge below uses "close" instead.
const STATUS_GLYPH: Record<Exclude<AvatarStatus, "icon">, IconName> = {
  available: "available",
  away: "away",
  busy: "busy",
  dnd: "dnd",
  "on-shift": "on-shift",
  offline: "offline",
};

function Glyph({ name, className }: { name: IconName; className?: string }) {
  const glyph = iconGlyphs[name];
  if (!glyph) {
    // A typo renders an invisible glyph, which is hard to spot; say so.
    console.warn(`<Avatar>: unknown icon "${name}"`);
  }
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ fontFamily: `"${iconFamily.rounded}", sans-serif`, lineHeight: 1 }}
    >
      {glyph ?? ""}
    </span>
  );
}

/**
 * A visual representation of a user or entity, shown as a photo, initials,
 * or icon, with an optional status indicator.
 *
 * Nine sizes step from xxxsmall to xxxlarge with medium as the base; only
 * medium's width, ring weight and initials font size are bound to real
 * tokens (`control-lg`, `stroke-thick`, `label-large/font-size`) — every
 * other step is an authored value carried over from Figma as-is (spec
 * issue). Badge size and initials font size are otherwise unbound and are
 * implemented here as exactly one third of the avatar's own size, matching
 * the ratio measured across all nine Figma variants. The ring is drawn
 * outside the avatar's content circle rather than inset over it.
 *
 * Content type, swatch colour, presence status and the custom status icon
 * are all swap-only in Figma, not exposed component properties there — this
 * component exposes them as real props because a consumer has to set them
 * somehow (see the spec's `internalVariations`).
 *
 * @spec specs/avatar/avatar.spec.md
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    size = "xxxsmall",
    type = "initials",
    initials,
    swatchColor = "purple",
    src,
    alt,
    icon,
    showClose = true,
    onClose,
    closeLabel,
    showStatus = true,
    status = "available",
    statusIcon,
    statusLabel,
    showRing = true,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={["zds-avatar", className].filter(Boolean).join(" ")}
      data-size={size}
    >
      <span className="zds-avatar__content" data-type={type}>
        {type === "photo" ? (
          <img className="zds-avatar__photo" src={src} alt={alt ?? ""} />
        ) : (
          <span className="zds-avatar__swatch" data-swatch-color={swatchColor}>
            {type === "initials" ? (
              <span className="zds-avatar__initials">{initials}</span>
            ) : icon ? (
              <Glyph className="zds-avatar__content-icon" name={icon} />
            ) : null}
          </span>
        )}
      </span>

      {showRing ? <span className="zds-avatar__ring" aria-hidden="true" /> : null}

      {showClose ? (
        <button
          type="button"
          className="zds-avatar__badge zds-avatar__badge--close"
          onClick={onClose}
          aria-label={closeLabel ?? (alt ? `Remove ${alt}` : "Remove")}
        >
          <Glyph className="zds-avatar__badge-icon" name="close" />
        </button>
      ) : null}

      {showStatus ? (
        <span
          className="zds-avatar__badge zds-avatar__badge--status"
          data-status={status}
          role={statusLabel ? "img" : undefined}
          aria-label={statusLabel}
          aria-hidden={statusLabel ? undefined : true}
        >
          {status === "icon"
            ? statusIcon
              ? <Glyph className="zds-avatar__badge-icon" name={statusIcon} />
              : null
            : <Glyph className="zds-avatar__badge-icon" name={STATUS_GLYPH[status]} />}
        </span>
      ) : null}
    </div>
  );
});
