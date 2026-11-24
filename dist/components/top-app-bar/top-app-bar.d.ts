import { LitElement } from "lit";
import "../avatar/avatar.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../search/search.js";
export type TopAppBarType = "default" | "centered" | "contextual" | "contextual alt" | "search" | "extended";
export type TopAppBarShape = "sharp" | "rounded";
export type TopAppBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
/**
 * The header at the top of a mobile screen. `type` switches between six
 * arrangements, each with its own leading control and content.
 *
 * Departures from Figma, each a spec issue:
 * - `count`, `avatar-src`, `avatar-initials`, `search-value` and the leading
 *   label are inputs, because Figma draws them as fixed sample content.
 * - The title and count use foreground/primary, because Figma's raw black
 *   would not follow dark mode.
 * - contextual keeps space/md after the leading control, as the metadata says.
 *   Figma binds none there.
 * - The search field opens empty, not in Figma's typing state.
 * - The bar fills its container (Figma ships a fixed 390).
 *
 * @slot trailing - Trailing actions on `default` and `extended`: `zds-icon-button` at size small, flavour subtle.
 * @slot contextual-controls - Actions on `contextual` and `contextual alt`.
 * @fires zds-leading-click - The leading control was activated.
 * @fires zds-trailing-click - The fixed `centered` control was activated.
 * @csspart bar - The bar.
 * @csspart title - The heading element.
 *
 * @spec specs/top-app-bar/top-app-bar.spec.json
 */
export declare class ZdsTopAppBar extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** The arrangement. Each value brings its own content. */
    type: TopAppBarType;
    /** The bar's own corner. Nested controls stay rounded either way. */
    shape: TopAppBarShape;
    /** Names the screen on `default`, `centered` and `extended`. */
    pageTitle: string;
    /** Heading level of the title. */
    headingLevel: TopAppBarHeadingLevel;
    /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
    count: string;
    /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
    avatarSrc: string | null;
    /** Avatar initials on `default`, used when there is no photo. */
    avatarInitials: string | null;
    /** Accessible name of the leading control. Defaults to one that follows `type`. */
    leadingLabel: string | null;
    /** Accessible name of the fixed trailing control on `centered`. */
    trailingLabel: string;
    /** The query on `search`. */
    searchValue: string;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-top-app-bar": ZdsTopAppBar;
    }
}
//# sourceMappingURL=top-app-bar.d.ts.map