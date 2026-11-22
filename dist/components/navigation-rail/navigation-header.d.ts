import { LitElement } from "lit";
import type { NavigationRailShape } from "./navigation-rail.js";
import type { IconName } from "../icon/icon.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
export type NavigationHeaderType = "avatar" | "logo";
/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action. Inside zds-navigation-rail the rail sets
 * `expanded` and `shape`.
 *
 * @fires zds-action - The settings action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Navigation Header)
 */
export declare class ZdsNavigationHeader extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** The mark: the user's Avatar, or the `zebra` logo glyph. */
    type: NavigationHeaderType;
    /** The wide form, with title and action. */
    expanded: boolean;
    /** The product or user name beside the mark (called `heading`, since `title` is the native tooltip), in the wide form. */
    heading: string;
    /** Shows the title (wide form only). */
    showTitle: boolean;
    /** Shows the trailing Icon Button (wide form only). */
    showIconButton: boolean;
    /** The trailing Icon Button's glyph. Settings by default; set any icon, with `action-label` to match. */
    actionIcon: IconName;
    /** Accessible name of the action. */
    actionLabel: string;
    /** The settings Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
    shape: NavigationRailShape;
    /** Avatar initials (type=avatar). */
    avatarInitials: string;
    /** Avatar photo (type=avatar). */
    avatarSrc: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-header": ZdsNavigationHeader;
    }
}
//# sourceMappingURL=navigation-header.d.ts.map