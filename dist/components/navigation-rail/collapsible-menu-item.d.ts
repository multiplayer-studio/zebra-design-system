import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import { type SubMenuItemBadge } from "../sub-menu-item/sub-menu-item.js";
import type { NavigationRailShape } from "./navigation-rail.js";
/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * The header is a `<button>` with `aria-expanded` / `aria-controls`; the
 * rows sit in a `role="region"` named by it, `hidden` while closed — the
 * semantics React gets from Base UI's Collapsible. The header is a sub menu
 * row with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active), the token alone (spec warn "Double alpha"),
 * and the rows sit on surface/subtle. The group sets `nested` and its `shape`
 * on its rows. Opening and closing animate the rows' height on
 * animations/smooth (owner decision), with the same state attributes Base
 * UI's Collapsible gives the React build; not on first render, and not
 * under prefers-reduced-motion.
 *
 * @slot - zds-sub-menu-item rows.
 * @fires zds-open-change - The header was pressed. `detail.open` is the new value (already applied).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Collapsible Menu Item)
 */
export declare class ZdsCollapsibleMenuItem extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The group's name, on its header row. */
    label: string;
    /** Header glyph. Figma ships a `verified` placeholder. */
    icon: IconName;
    /** Shows the header glyph. */
    showLeadingIcon: boolean;
    /** Counter badge on the header row, as on zds-sub-menu-item. */
    badge: SubMenuItemBadge;
    /** Text equivalent of the badge. */
    badgeLabel: string | null;
    /** Whether the group is open. */
    open: boolean;
    /**
     * Corner shape of the group and its rows: rounded (`radius/sm`) or sharp
     * (`radius/none`). Inside a zds-navigation-rail the rail's `shape` sets it.
     */
    shape: NavigationRailShape;
    /** The header cannot be pressed. */
    disabled: boolean;
    protected render(): import("lit").TemplateResult<1>;
    private get panel();
    protected firstUpdated(): void;
    protected updated(changed: PropertyValues<this>): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-collapsible-menu-item": ZdsCollapsibleMenuItem;
    }
}
//# sourceMappingURL=collapsible-menu-item.d.ts.map