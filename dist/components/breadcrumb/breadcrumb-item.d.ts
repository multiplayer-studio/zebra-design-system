import { LitElement } from "lit";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";
/**
 * One crumb in a `zds-breadcrumb`: an optional glyph, a label and the separator
 * after it. A link with `href`, otherwise a button for a click listener. The
 * breadcrumb sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @csspart crumb - The link, button or current page text.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.json (subcomponents._Breadcrumb Item)
 */
export declare class ZdsBreadcrumbItem extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** Where the crumb goes. Without one it is a button. */
    href: string | null;
    /** A glyph before the label. */
    icon: IconName | null;
    /** The page a person is on. It is text, not a link, even with an `href`. */
    current: boolean;
    /** Shows the chevron after the crumb. */
    separator: boolean;
    /** Activates the crumb, for the overflow menu's rows. */
    activate(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-breadcrumb-item": ZdsBreadcrumbItem;
    }
}
//# sourceMappingURL=breadcrumb-item.d.ts.map