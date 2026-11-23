import { LitElement } from "lit";
import "../icon/icon.js";
import "../checkbox/checkbox.js";
import "../radio/radio.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type MenuItemType = "icon" | "checkbox" | "radio" | "custom";
/**
 * A single selectable row inside a `zds-dropdown-menu` (or any menu-shaped
 * list built without one).
 *
 * `type` picks what leads the row. Icon rows take `leading-icon`; checkbox
 * and radio rows lead with a real `zds-checkbox` / `zds-radio` at size
 * medium, checked when the row is `selected` and disabled with it. Figma
 * leaves that control unchecked in every state (spec warn), so code follows
 * the row instead. The control only shows state: the row stays the one
 * interactive element, with the matching ARIA role (`menuitemcheckbox` /
 * `menuitemradio`), and the control is inert and hidden from assistive
 * technology. The whole row is the click target: activating a checkbox row
 * toggles `selected`, a radio row selects itself and clears the radio rows
 * beside it, and both fire `change`.
 *
 * `state` in the spec is mostly CSS: hover and focus are real `:hover` /
 * `:focus-visible`. `selected` is the one state Figma models that has no
 * native pseudo-class, so it is the one exposed as a property here (folding
 * in "selected focus" too, since that is just selected + real :focus-visible
 * together).
 *
 * The spec's `leadingElement` boolean and the implicit "which Icon instance"
 * choice are collapsed into one `leading-icon` property, the same way
 * `zds-button` already turns "is there a leading icon" + "which one" into a
 * single nullable prop rather than a separate visibility toggle.
 *
 * @slot - The label text.
 * @slot leading - Replaces the leading icon when `type="custom"`. Figma
 *   ships this empty (spec: "Nothing is provided by default"), and the exact
 *   node swap for Type=custom was not independently re-verified from Figma
 *   (spec issue, extraction-limit) — confirm visually if this ever looks off.
 * @part row - The row element.
 * @fires change - A checkbox or radio row's `selected` changed from the row being activated.
 *
 * @spec specs/dropdown/dropdown.spec.json
 */
export declare class ZdsMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** What leads the row: an icon, a real checkbox or radio that shows `selected`, or the `leading` slot. */
    type: MenuItemType;
    /** Corner treatment. Match the `zds-dropdown-menu` panel that holds it. */
    rounded: boolean;
    /** The option is unavailable. Only the label's colour changes, so say why nearby. */
    disabled: boolean;
    /** The option is currently chosen. Combined with real `:focus-visible`, this also covers Figma's "selected focus". */
    selected: boolean;
    /** Icon before the label, for `type="icon"`. `null` hides the leading position. */
    leadingIcon: IconName | null;
    /** Icon after the label, e.g. a submenu arrow or an external-link mark. */
    trailingIcon: IconName | null;
    private onKeydown;
    private onClick;
    private setSelected;
    private renderLeading;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-menu-item": ZdsMenuItem;
    }
}
//# sourceMappingURL=menu-item.d.ts.map