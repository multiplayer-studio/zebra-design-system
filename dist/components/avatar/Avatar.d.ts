import * as React from "react";
import type { IconName } from "@zebra-design-system/icons/names";
import "./avatar.css";
export type AvatarSize = "xxxsmall" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge";
export type AvatarContentType = "initials" | "photo" | "icon";
export type AvatarSwatchColor = "purple" | "blue" | "sea" | "yellow" | "orange" | "green" | "burgundy";
/**
 * A swatch that isn't one of the seven named ones: a token name
 * (`chart/series/2`), a custom property (`--brand-accent`) or any CSS colour.
 */
export declare const swatchFill: (color: string) => string;
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
    /**
     * Background behind initials or an icon. Not used behind a photo. One of
     * the seven swatches, or any other colour: a token name (`chart/series/2`),
     * a custom property (`--brand-accent`) or a CSS colour value.
     */
    swatchColor?: AvatarSwatchColor | (string & {});
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
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
