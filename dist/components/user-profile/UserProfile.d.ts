import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { type AvatarProps } from "../avatar/Avatar.js";
import "./user-profile.css";
export interface UserProfileProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className" | "children"> {
    /** The person's name. */
    username?: string;
    /** Avatar photo. Without it the avatar shows `initials`. */
    avatarSrc?: string;
    /** Avatar initials, used when there is no photo. */
    initials?: string;
    /**
     * Any other Avatar property (type, icon, swatchColor, status, ring…). The
     * account avatar is a full Avatar; only its size is fixed (xxsmall).
     * These win over `avatarSrc` and `initials`.
     */
    avatarProps?: Omit<AvatarProps, "size">;
    /** Softens the control's corners. */
    rounded?: boolean;
    disabled?: boolean;
    className?: string;
}
/**
 * The account control in a GlobalHeader: a username, an avatar and a chevron
 * on a neutral ground. It takes every prop `Dropdown` passes its trigger, so
 * the ARIA and the open state come from Base UI.
 *
 * Figma fixes the username and avatar as sample content; both are inputs here
 * (spec issue).
 *
 * Kept in step with packages/web-components `<zds-user-profile>`.
 *
 * @spec specs/global-header/global-header.spec.md
 */
export declare const UserProfile: React.ForwardRefExoticComponent<UserProfileProps & React.RefAttributes<HTMLElement>>;
