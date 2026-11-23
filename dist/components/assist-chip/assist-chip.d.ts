import { LitElement } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import { type ChipShape } from "../chip/chip.js";
import "../icon/icon.js";
export type AssistChipColor = "neutral" | "green" | "orange" | "blue" | "red";
/**
 * Offers a contextual action, or stands for an item someone can discard,
 * such as an attached file. Five colours borrow the status tokens to mark a
 * state or a kind of item, and `foreground`, `background` and `border`
 * override any one paint beyond those five (override > color > state).
 * Reach for `<zds-button>` when the action is the primary next step, and
 * `<zds-filter-chip>` when the control narrows content.
 *
 * Without `discardable` the chip is one native button; listen for `click`.
 * With it, a button cannot hold another, so the chip becomes a group holding
 * the label (a button only when `clickable` is set) and a remove control
 * that fires `zds-discard`, as `<zds-input-chip>` does. Not modelled from
 * Figma (spec issues): the single-value `active` axis and State=selected.
 * 28px tall in every state (Figma's 30/28 jump is a layout artefact of its
 * inside border).
 *
 * @slot - The label.
 * @fires zds-discard - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
 *
 * @spec specs/assist-chip/assist-chip.spec.json
 */
export declare class ZdsAssistChip extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Show the glyph naming the action's domain. Defaults to true; `show-leading-icon="false"` turns it off. */
    showLeadingIcon: boolean;
    /** The leading glyph. Figma ships it swapped to `star`. */
    icon: IconName;
    /** The action is unavailable. Say why nearby. Hides the remove control. */
    disabled: boolean;
    /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
    shape: ChipShape;
    /** Status colour for the border, label and icons. Use one per kind of item, e.g. red for PDF. */
    color: AssistChipColor;
    /** Overrides the label, icon and remove colour. A token path (`feedback/info/foreground`) or any CSS colour. */
    foreground: string | null;
    /** Overrides the fill, which `color` leaves neutral. A token path or any CSS colour. */
    background: string | null;
    /** Overrides the border colour. A token path or any CSS colour. */
    border: string | null;
    /** Show the remove control after the label (fires `zds-discard`). Never shown while disabled. */
    discardable: boolean;
    /** With `discardable`, keep the label a button so it can still be clicked. */
    clickable: boolean;
    /** Accessible name of the remove control. Defaults to "Remove <label>". */
    discardLabel: string | null;
    type: "button" | "submit" | "reset";
    private text;
    connectedCallback(): void;
    private onSlotChange;
    private discard;
    private onKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-assist-chip": ZdsAssistChip;
    }
}
//# sourceMappingURL=assist-chip.d.ts.map