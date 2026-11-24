import { LitElement } from "lit";
import { type ChipShape } from "../chip/chip.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
/**
 * Represents a person, entity or value someone has entered or picked, such
 * as a recipient on a message, so it can be reviewed and removed without
 * retyping. Belongs inside input and selection fields; reach for
 * `<zds-filter-chip>` to narrow content or `<zds-assist-chip>` to offer an
 * action.
 *
 * The chip itself is not a control: its one interactive part is the remove
 * control, a native button named "Remove <label>". Figma gives that control
 * no API and shows it even when disabled (spec issue); here it renders only
 * when `removable` is set — the element's equivalent of passing a handler —
 * and never on a disabled chip. Activating it (click, Enter / Space, or
 * Backspace / Delete while focused) fires `zds-remove`; removing the chip,
 * announcing the change and moving focus belong to the field that owns it.
 * The chip shows its focus treatment while the remove control has keyboard
 * focus.
 *
 * @slot - The label: the value itself, usually a name or a term.
 * @fires zds-remove - The remove control was activated. `detail.label` is the chip's text.
 * @csspart chip - The chip.
 * @csspart remove - The remove control.
 *
 * @spec specs/input-chip/input-chip.spec.json
 */
export declare class ZdsInputChip extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Lead with the person's face or initials. Defaults to true; `show-avatar="false"` turns it off. */
    showAvatar: boolean;
    /** Photo for the avatar. Without it the avatar shows initials. */
    avatarSrc: string | null;
    /** Initials for the avatar. Defaults to the first letters of the label. */
    avatarInitials: string | null;
    /**
     * The avatar's swatch behind the initials: one of zds-avatar's seven
     * swatches, a token name (`chart/series/2`), a custom property or any CSS colour.
     */
    avatarColor: string | null;
    /** The value is fixed: the chip greys out and the remove control is hidden. Say why nearby. */
    disabled: boolean;
    /** Pill (rounded) or square (sharp) corners. Match the field the chips sit in. */
    shape: ChipShape;
    /** Show the remove control (fires `zds-remove`). Never shown while disabled. */
    removable: boolean;
    /** Accessible name of the remove control. Defaults to "Remove <label>". */
    removeLabel: string | null;
    private text;
    connectedCallback(): void;
    private onSlotChange;
    private remove_;
    private onKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-input-chip": ZdsInputChip;
    }
}
//# sourceMappingURL=input-chip.d.ts.map