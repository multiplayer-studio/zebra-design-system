import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../button/button.js";
import "../scrim/scrim.js";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
/** Which edge the drawer comes from. `start` is the left edge in a left-to-right page. */
export type NavigationDrawerSide = "start" | "end";
/** Why the drawer opened or closed. `navigate` is a destination being chosen. */
export type NavigationDrawerOpenChangeReason = "close" | "escape" | "backdrop" | "navigate";
/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family, with no new parts: a
 * `zds-navigation-header` in the `header` slot, then `zds-sub-menu-item`
 * rows, `zds-collapsible-menu-item` groups and `zds-divider` in the menu and
 * footer. The drawer hands them its `shape` and the header its wide form.
 * It follows the page's colour mode (unlike the rail, it is not locked).
 *
 * `modal` (default): a native `<dialog>` at the screen's edge over a
 * `<zds-scrim>` (tone scrim). Focus moves in and returns, page scroll is
 * locked, and Escape, a scrim click, the header's close button or a chosen
 * destination closes it. It slides in from its edge (animations/smooth;
 * none under reduced motion).
 * `modal="false"`: a standard drawer in the layout. Closed, it narrows to
 * nothing and is inert.
 *
 * Scrolling: only the header is frozen (sticky). The menu never scrolls on
 * its own and the footer is never pinned. The standard drawer grows with its
 * content and the page scrolls it; the modal drawer scrolls as one surface
 * with no scrollbar.
 *
 * With `show-close` (default) the header's icon button is the close button:
 * the drawer sets its glyph to `close` and its label to `close-label`.
 *
 * @slot header - A `zds-navigation-header`. Sticky.
 * @slot - The menu: `zds-sub-menu-item`, `zds-collapsible-menu-item`, `zds-divider`.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 * @csspart panel - The drawer surface.
 * @fires zds-open-change - `{ open, reason }` when the drawer closes itself. Not fired for a programmatic `open` change.
 * @fires zds-action - The header action button was pressed.
 * @cssprop --zds-navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.json
 */
export declare class ZdsNavigationDrawer extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** Slides over the page on a Scrim. `modal="false"` sits in the layout and pushes the content. */
    modal: boolean;
    /** Whether the drawer is shown. Reflected. */
    open: boolean;
    /** The edge it comes from. Code only. */
    side: NavigationDrawerSide;
    /** Corner shape of the rows, groups and buttons inside. The drawer itself is never rounded. Code only. */
    shape: NavigationRailShape;
    /** Escape and a scrim click close a modal drawer. Code only. */
    dismissible: boolean;
    /** Choosing a destination closes a modal drawer. Opening a group never does. Code only. */
    closeOnNavigate: boolean;
    /** The header's icon button becomes the close button (Figma's Show Icon Button on the exposed header). */
    showClose: boolean;
    /** Accessible name of the close button. */
    closeLabel: string;
    /** Accessible name of the `<nav>` landmark, and of the modal drawer. */
    navLabel: string;
    /** A full-width primary Button under the header (Figma's Show Action). Unset, there is none. */
    actionLabel: string | null;
    /** The action's glyph. */
    actionIcon: IconName;
    /** Whether the header region has anything in it; empty, it only keeps the top padding. */
    private hasHeader;
    private dialogEl?;
    private scrimEl?;
    private returnFocus;
    private locked;
    disconnectedCallback(): void;
    /** Opens the drawer (same as `open = true`). */
    show(): void;
    /** Closes the drawer (same as `open = false`). */
    close(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-drawer": ZdsNavigationDrawer;
    }
}
//# sourceMappingURL=navigation-drawer.d.ts.map