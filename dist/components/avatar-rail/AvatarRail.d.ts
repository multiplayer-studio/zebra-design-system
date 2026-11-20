import * as React from "react";
import { type AvatarSize } from "../avatar/Avatar.js";
import "./avatar-rail.css";
export type AvatarRailStacking = "start" | "end";
export interface AvatarRailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    /** One diameter for every avatar in the rail, and for the counter. */
    size?: AvatarSize;
    /** start: the first avatar sits above the ones after it. end: reversed. */
    stacking?: AvatarRailStacking;
    /** How many avatars show, 2 to 4. The rest are counted in the overflow. */
    max?: number;
    /** Shows the generated counter when there are more avatars than `max`. */
    showOverflow?: boolean;
    /** Accessible name for the group, such as "Assignees". */
    label?: string;
    /** What the counter counts, for assistive tech; `{count}` is replaced with its number. */
    overflowLabel?: string;
    className?: string;
}
/**
 * Shows a group of people as overlapping avatars, with an optional counter
 * standing in for everyone who did not fit. Size moves the whole rail
 * together rather than any single avatar.
 *
 * The children are `<Avatar>` elements. The rail owns their presentation
 * (spec: "parent owned"): it sets each one's `size` and turns off its ring,
 * dismiss badge and presence badge, so the person shown is the only thing
 * set per avatar. `max` sets how many show (2 to 4, the spec's four
 * positions with the first two always present); Figma does the same with
 * Show Avatar 3/4. Avatars past `max` are not rendered and the counter is
 * generated from them: "+" and the children passed in less `max`, a
 * remainder rather than a total (owner decision, 2026-10-18). It shows while
 * `showOverflow` is on and there is a remainder.
 *
 * Static and not interactive, so there is no Base UI primitive to wrap.
 * Kept in step with packages/web-components `<zds-avatar-rail>`.
 *
 * @spec specs/avatar-rail/avatar-rail.spec.md
 */
export declare const AvatarRail: React.ForwardRefExoticComponent<AvatarRailProps & React.RefAttributes<HTMLDivElement>>;
