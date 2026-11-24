import { LitElement } from "lit";
import "../avatar/avatar.js";
import "../icon/icon.js";
/**
 * The account control in a Global Header: a username, an avatar and a chevron
 * on a neutral ground. It is the header's dropdown trigger, so it reports
 * `aria-haspopup`, and `expanded` when the header passes it on.
 *
 * @slot avatar - A zds-avatar to show in place of the default, carrying any
 *   avatar property (type, icon, swatch-color, status…); its size stays xxsmall.
 *
 * Figma fixes the username and avatar as sample content; both are inputs here
 * (spec issue).
 *
 * @csspart control - The `<button>`.
 * @spec specs/global-header/global-header.spec.json
 */
export declare class ZdsUserProfile extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The person's name. */
    username: string;
    /** Avatar photo. Without it the avatar shows `initials`. */
    avatarSrc: string | null;
    /** Avatar initials, used when there is no photo. */
    initials: string | null;
    /** Softens the control's corners. */
    rounded: boolean;
    disabled: boolean;
    /** Whether the menu it opens is showing. */
    expanded: boolean;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-user-profile": ZdsUserProfile;
    }
}
//# sourceMappingURL=user-profile.d.ts.map