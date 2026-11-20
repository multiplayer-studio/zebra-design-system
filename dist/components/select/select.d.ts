import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../caret-indicator/caret-indicator.js";
import type { InputFieldSize, InputFieldShape, InputFieldFlavour } from "../input-field/input-field.js";
import type { InputState, InputLabelType } from "../input/input.js";
import type { IconName } from "@zebra-design-system/icons/names";
export interface SelectOption {
    value: string;
    /** What the row and the field show. Defaults to `value`. */
    label?: string;
    /** Glyph ahead of the label, in the row and in the field once chosen. */
    icon?: IconName;
    disabled?: boolean;
}
/** Input / Select's State axis. Interaction states are derived; `invalid`, `read-only` and `disabled` come from properties. */
export type SelectFieldState = "enabled" | "open" | "filled" | "invalid" | "read-only" | "disabled";
export type SelectSize = InputFieldSize;
export type SelectShape = InputFieldShape;
export type SelectFlavour = InputFieldFlavour;
export type SelectState = InputState;
export type SelectLabelType = InputLabelType;
/**
 * The full select assembly: a label above, a Select Field in the middle and a
 * hint below, stacked and spaced as one unit. Opening it reveals a Dropdown
 * Menu of the options, overlaid below the field.
 *
 * @cssprop --zds-select-field-min-inline-size - The field's minimum width; Input Field's by default.
 * @cssprop --zds-select-list-min-inline-size - The list's minimum width; it is otherwise as wide as the field.
 *
 * Built from the package's parts: the field reuses Input Field's styles
 * (size, shape, flavour, state), the label and hint Input's, and the list
 * draws Dropdown Menu's panel and Menu Item's rows from the same tokens.
 * The rows are not `<zds-menu-item>` elements: those carry `role="menuitem"`
 * and their own focus inside their own shadow roots, and a listbox needs
 * `role="option"` rows an `aria-activedescendant` can reach.
 *
 * Behaviour is the WAI-ARIA select-only combobox: a `<button
 * role="combobox">` with `aria-haspopup="listbox"`, `aria-expanded`,
 * `aria-controls` and `aria-activedescendant`, over a `role="listbox"` of
 * `role="option"` rows with `aria-selected`. Focus stays on the field, so it
 * is where it started when the list closes.
 * - Closed: Enter, Space, ArrowDown, ArrowUp, Alt+ArrowDown, Home, End or a
 *   typed character opens it.
 * - Open: arrows, Home, End, PageUp/PageDown and typeahead move; Enter,
 *   Space or Alt+ArrowUp choose and close; Escape and Tab close.
 * This satisfies both metadata keyboard descriptions (spec issue 7:
 * Select's "Space or Enter" and Select Field's "Alt+Down or Enter"), and
 * follows Select's, the fuller one — as Base UI does in the React sibling.
 *
 * The list is a manual popover in the top layer, clear of any `overflow:
 * hidden` ancestor and still inside the theme cascade (it stays in this
 * shadow tree). It is as wide as the field, sits `--space-2xs` below it and
 * flips above only when there is no room below (spec issue 13).
 *
 * Form-associated: submits `value` under `name`; a required label makes an
 * empty value invalid.
 *
 * Kept in step with React `<Select>`.
 *
 * @fires zds-value-change - An option was chosen. `detail: { value: string | null }`.
 * @fires zds-open-change - The list opened or closed. `detail: { open: boolean }`.
 * @csspart label - The label row.
 * @csspart field - The field (the combobox button).
 * @csspart list - The list panel.
 * @csspart hint - The hint row.
 *
 * @spec specs/select/select.spec.json
 */
export declare class ZdsSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    static formAssociated: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** The choices, in order. Each row is a Menu Item. As an attribute, JSON. */
    options: SelectOption[];
    /** The chosen option's `value`; `null` for none. */
    value: string | null;
    /** Whether the list is open — the spec's Open. */
    open: boolean;
    /** Shown in the field while nothing is chosen. Not a label. */
    placeholder: string;
    /** The field's name, shown above it. Empty hides the label (Show Label). */
    label: string;
    /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception. */
    labelType: SelectLabelType;
    /** Adds an information icon after the name (the label's Show Information). */
    information: boolean;
    /** Accessible name of the information icon. */
    informationLabel: string;
    /** Supporting line under the name, read as part of the field's description. Empty hides it; needs a `label` (Show Sub Label). */
    subLabel: string;
    /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
    hint: string;
    /** Icon ahead of the hint (the hint's Show Icon). */
    hintIcon: boolean;
    /** One state across label, field and hint (spec issue 8: code owns the assembly state, as on Input). */
    state: SelectState;
    /** The value is shown but cannot be changed. Stays legible and in the tab order. */
    readonly: boolean;
    /** Form field name. */
    name: string | null;
    /** Field height; only `small` also reduces the text. */
    size: SelectSize;
    /** Field corners, as Input Field. The list is always rounded (spec issue 14). */
    shape: SelectShape;
    /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
    flavour: SelectFlavour;
    /** Opens the list on the compact Dropdown Menu: a space/xs inset and no gap between rows, for a cramped spot. */
    compact: boolean;
    /** Fills the container's width. Without it the Select starts at 280px and narrows to fit, as Input. Input's `:host([block])` rule applies. */
    block: boolean;
    /** Glyph at the field's leading edge (hasLeading). A chosen option's own `icon` replaces it. */
    leadingIcon: IconName | null;
    /** Accessible name when there is no visible `label`. */
    accessibleLabel: string | null;
    /** Index of the highlighted row (the active descendant). */
    private active;
    /** How the highlight got there: keyboard draws Menu Item's focus, pointer its hover. */
    private activeByKeyboard;
    private fieldEl;
    private listEl;
    private readonly internals;
    private readonly idBase;
    private defaultValue;
    private typed;
    private typedTimer;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    formStateRestoreCallback(state: string | null): void;
    private get disabled();
    private get selectedIndex();
    private get chosen();
    /** Input / Select's State, as the spec names it. Open outranks invalid, as focus does on Input Field. */
    get fieldState(): SelectFieldState;
    private optionId;
    /** The next enabled row from `from` in direction `dir`, stopping at the ends. */
    private step;
    private first;
    private last;
    private setOpen;
    private choose;
    private highlight;
    /** Typeahead: rows whose label starts with what has been typed, searching on from the current row. */
    private typeahead;
    private onFieldClick;
    private onKeydown;
    private onFocusOut;
    private onDocumentPointerDown;
    private syncPopover;
    private tracking;
    private startTracking;
    private stopTracking;
    private place;
    private scrollActiveIntoView;
    private renderLabel;
    private renderOption;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-select": ZdsSelect;
    }
}
//# sourceMappingURL=select.d.ts.map