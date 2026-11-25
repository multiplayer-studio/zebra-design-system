import { LitElement, type PropertyValues } from "lit";
import "./breadcrumb-item.js";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../menu-item/menu-item.js";
export type BreadcrumbFlavour = "default" | "accent";
export type BreadcrumbShape = "rounded" | "sharp";
/**
 * Shows where a page sits in the hierarchy, as a trail of links ending on the
 * current page. `max-items` collapses the middle into a compact overflow menu,
 * so every crumb stays reachable. The last item is the current page.
 *
 * A labelled `nav` holding a list: the host of each `<zds-breadcrumb-item>` is
 * its list item, because slotted children cannot sit inside an `<ol>`.
 *
 * Departures from Figma, each a spec issue:
 * - The first item moves to the `leading` slot, so the overflow control can
 *   follow it. `collapsed` and `open` are derived, not properties.
 * - `overflow-label` names the overflow control, which Figma leaves unnamed.
 * - The menu has no portal or collision handling: it is `zds-dropdown`, which
 *   documents that scope itself. So `portalContainer` has no property here.
 *
 * @slot - The crumbs: `<zds-breadcrumb-item>` elements, root first.
 * @slot leading - Set by the element. It holds the first crumb.
 * @csspart nav - The navigation landmark.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.json
 */
export declare class ZdsBreadcrumb extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** How the current page stands out. `accent` sets it and its icon in blue. */
    flavour: BreadcrumbFlavour;
    /** Corners of the overflow control and its menu. */
    shape: BreadcrumbShape;
    /** How many crumbs show before the middle collapses: the first, then the rest from the end. Unset shows them all. The minimum is 2. */
    maxItems: number | null;
    /** Accessible name of the trail. */
    label: string;
    /** Accessible name of the overflow control. */
    overflowLabel: string;
    /** The items moved to the overflow menu. */
    private hiddenItems;
    /** The overflow menu is showing. */
    private open;
    private dropdown?;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-breadcrumb": ZdsBreadcrumb;
    }
}
//# sourceMappingURL=breadcrumb.d.ts.map