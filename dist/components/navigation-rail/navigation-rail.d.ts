import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../navigation-rail-item/navigation-rail-item.js";
/**
 * The corner shape a rail hands to everything nested in it. Code-only: Figma
 * has no counterpart (spec: the rail's `shape`). rounded = `radius/sm`,
 * sharp = `radius/none`; a nested zds-button / zds-icon-button takes the
 * same-named `shape`.
 */
export type NavigationRailShape = "rounded" | "sharp";
/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Locked to dark mode by default, whatever the page's mode; `inverse` locks
 * it to light (owner decision). The host takes the token layer's `mode-dark`
 * / `mode-light` class (added with `classList`, so a consumer's own classes
 * stay), which re-resolves every token on the host; the shadow tree and the
 * slotted content inherit them from there, and an `.ext-*` ancestor still
 * applies. Nothing in the rail family leaves the tree, so popups stay in mode.
 *
 * Regions are slots; the rail sets `expanded` / `show-label` on the
 * zds-navigation-rail-item and zds-navigation-header elements inside it, and
 * `shape` on every rail part inside it (items, headers, sub menu rows and
 * groups). Slotted controls it did not render — a zds-sub-menu-header's
 * actions — read `el.closest("zds-navigation-rail")?.shape` to match, as
 * with zds-table. It
 * owns the toggle item and wires it to `expanded` (spec: "Behaviour code
 * must own"), firing `zds-expanded-change`.
 *
 * A plain `<nav>` of links, every destination in the Tab order; groups are
 * zds-collapsible-menu-item disclosures — the same structure as the React
 * build (which uses Base UI Collapsible, not NavigationMenu).
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * slotted. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * default slot; moreRailItems / moreFooterItems / showHeaderAction /
 * showSubMenu become "is the slot filled".
 *
 * @slot - The menu: zds-navigation-rail-item (and zds-divider). Absorbs the free height.
 * @slot header - Top of the rail: normally a zds-navigation-header.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - The panel's title bar: a zds-sub-menu-header.
 * @slot sub-menu - The panel's rows: zds-sub-menu-item and zds-collapsible-menu-item.
 *
 * @fires zds-expanded-change - The toggle item was pressed. `detail.expanded` is the new value (already applied).
 * @fires zds-action - The header action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json
 */
export declare class ZdsNavigationRail extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** The wide rail, labels beside glyphs. */
    expanded: boolean;
    /**
     * Captions under the glyphs in the narrow rail (Figma's `Label`). With
     * `expanded` the labels show beside the glyphs anyway, so the combination
     * Figma never built simply works.
     */
    showLabels: boolean;
    /** The last footer item, which moves between narrow and wide. */
    showToggleItem: boolean;
    /** Toggle label in the narrow rail. */
    expandLabel: string;
    /** Toggle label in the wide rail. */
    collapseLabel: string;
    /**
     * The corner shape of everything nested in the rail: slot items, groups,
     * the header action, and the buttons inside zds-navigation-header and
     * zds-sub-menu-header (including the back button). rounded = `radius/sm`,
     * sharp = `radius/none`. The rail itself has no corners and is unaffected.
     * Code-only — Figma has no counterpart.
     */
    shape: NavigationRailShape;
    /**
     * The rail is locked to dark mode (`mode-dark` on the host) whatever the
     * page's mode. `inverse` locks it to light (`mode-light`) instead. Either
     * way everything inside follows the rail, not the page. Code-only (owner
     * decision).
     */
    inverse: boolean;
    /**
     * The wide rail's width. 200px by default (Figma's measure); the project
     * sets its own as a CSS length or a number in px, or `fill` to take the
     * width of the rail's container. The narrow icon rail is unaffected.
     */
    railWidth: string | number | null;
    /**
     * Caps the wide rail's width; the narrow icon rail is unaffected. A CSS
     * length, or a number in px. Wide labels truncate.
     */
    railMaxWidth: string | number | null;
    /**
     * Caps the sub menu panel's width. The panel still hugs its list, up to
     * this width; longer rows truncate (full label in a tooltip after a 3s
     * hover). A cap below 240px also lowers the 240px minimum. A CSS length,
     * or a number in px.
     */
    subMenuMaxWidth: string | number | null;
    /** Accessible name of the `<nav>` landmark. */
    navLabel: string;
    /**
     * The header action's label — a create/compose entry point. Icon Button in
     * the narrow rail, Button in the wide one. Unset, there is no action.
     */
    actionLabel: string | null;
    /** The header action's glyph. */
    actionIcon: IconName;
    private hasHeader;
    private hasFooter;
    private hasSubMenuHeader;
    private hasSubMenu;
    /**
     * Motion (owner decision: animations/smooth). The rail's width animates on
     * `[expanded]`; its content keeps the wide layout until a collapse has
     * finished (`wideLatch`), laid out at its final width and clipped by the
     * narrowing rail, so labels never reflow or wrap mid-animation. Expanding
     * switches the content at once and the widening rail reveals it.
     */
    private wideLatch;
    /** Transitions only after the first paint, so nothing animates on mount. */
    private ready;
    /** The content's form: wide while expanded, and through a collapse. */
    private get wide();
    protected render(): import("lit").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-navigation-rail": ZdsNavigationRail;
    }
}
//# sourceMappingURL=navigation-rail.d.ts.map