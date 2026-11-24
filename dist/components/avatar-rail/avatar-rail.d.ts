import { LitElement } from "lit";
import type { AvatarSize } from "../avatar/avatar.js";
export type AvatarRailStacking = "start" | "end";
/**
 * Shows a group of people as overlapping avatars, with an optional counter
 * standing in for everyone who did not fit. Size moves the whole rail
 * together rather than any single avatar.
 *
 * The avatars are slotted `<zds-avatar>` elements. The rail owns their
 * presentation, as the spec's "parent owned" row says: it sets each one's
 * `size` and turns off its ring, dismiss badge and presence badge, so the
 * group stays uniform; the person shown is the only thing set per avatar.
 * `max` sets how many avatars show (2 to 4, the spec's four positions with
 * the first two always present); Figma does the same with Show Avatar 3/4.
 * Avatars past `max` are given `hidden` (and given back if they come into
 * range), and the counter is generated from them: "+" and the avatars
 * passed in less `max`, a remainder rather than a total (owner decision,
 * 2026-10-18). It shows while `show-overflow` is on and there is a
 * remainder, so a trimmed group never reads as complete.
 *
 * Static: no hover, focus or press, and no motion (spec).
 *
 * @slot - `<zds-avatar>` elements, in display order.
 * @csspart overflow - The counter circle.
 *
 * @spec specs/avatar-rail/avatar-rail.spec.json
 */
export declare class ZdsAvatarRail extends LitElement {
    static styles: import("lit").CSSResult;
    /** One diameter for every avatar in the rail, and for the counter. */
    size: AvatarSize;
    /** start: the first avatar sits above the ones after it. end: reversed. */
    stacking: AvatarRailStacking;
    /** How many avatars show, 2 to 4. The rest are counted in the overflow. */
    max: number;
    /** Shows the generated counter when there are more avatars than `max`. */
    showOverflow: boolean;
    /** Accessible name for the group, such as "Assignees". */
    label: string | null;
    /**
     * What the counter counts, for assistive tech; `{count}` is replaced with
     * the number in the counter. The spec: "+2 on its own does not say two
     * more people".
     */
    overflowLabel: string;
    private hiddenCount;
    private avatars;
    private internals;
    constructor();
    protected updated(): void;
    private onSlotChange;
    private arrange;
    /** `max` clamped to the spec's positions; anything unparseable falls back to four. */
    private get visibleMax();
    /** The remainder the counter shows, such as "+2", or "" when nothing is hidden. */
    get overflowCount(): string;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-avatar-rail": ZdsAvatarRail;
    }
}
//# sourceMappingURL=avatar-rail.d.ts.map