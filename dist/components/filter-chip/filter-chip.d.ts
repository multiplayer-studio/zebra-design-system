import { LitElement } from "lit";
import type { ChipShape } from "../chip/chip.js";
import "../icon/icon.js";
/**
 * Lets someone narrow a set of content by switching a criterion on and off,
 * such as a category in a list of results. Use them in groups where more
 * than one can be on at once. Name the filter, not the result.
 *
 * A toggle button: `aria-pressed` follows `active`, Enter / Space switch it
 * (native button), and switching fires `zds-active-change`. Figma's
 * separate State=selected (colour only, no check mark) is not modelled: it
 * overlaps `active`, and the metadata says prefer active (spec issue).
 *
 * @slot - The label: the criterion the chip switches.
 * @fires zds-active-change - The chip was switched by the user. `detail.active` is the new value.
 * @csspart chip - The button.
 *
 * @spec specs/filter-chip/filter-chip.spec.json
 */
export declare class ZdsFilterChip extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Whether the filter is on. Adds the check mark and flips to the inverse palette. */
    active: boolean;
    /** The criterion cannot be switched right now. Say why nearby. */
    disabled: boolean;
    /** Pill (rounded) or square (sharp) corners. Match the controls around the filter row. */
    shape: ChipShape;
    /** Form value, for a consumer collecting the active chips of a group. */
    value: string | null;
    private toggle;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-filter-chip": ZdsFilterChip;
    }
}
//# sourceMappingURL=filter-chip.d.ts.map