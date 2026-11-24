import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../divider/divider.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type SearchShape = "sharp" | "rounded" | "full";
export type SearchSize = "small" | "medium" | "large";
export type SearchFlavour = "default" | "gradient" | "ghost";
/**
 * A single-line input for typing a query, with a magnifier leading it and a
 * trailing control that takes whatever icon and function the implementation
 * passes.
 *
 * Built on a native `<input type="search">`, so the caret, selection, text
 * editing and form submission are the browser's. The spec's State axis is
 * not a property; it follows from the field:
 * - **hover**: pointer over the field.
 * - **focus**: keyboard focus on an empty field — the heaviest border.
 * - **selected**: focus by pointer, before any text — a lighter border.
 * - **typing**: focused with text in it. The clear control appears.
 * - **filled**: text in it, not focused.
 * - **disabled**: the `disabled` property.
 *
 * The clear control and the trailing control are real buttons, each with a
 * pressable area wider than its glyph (spec warn "the control targets aren't
 * modelled"). The trailing control does nothing by itself: listen for
 * `trailing-click` and give it a name with `trailing-label`.
 *
 * The field has no label of its own (spec accessibility): set `label`, or
 * point an `aria-labelledby` at a visible one.
 *
 * Not built: the spec's `Show Cancel` property, which Figma wires to nothing
 * (spec warn "Show Cancel is wired to nothing").
 *
 * @fires input - The value changed while typing.
 * @fires change - The value was committed (blur after an edit).
 * @fires search - Enter was pressed. `detail.value` is the query.
 * @fires clear - The clear control emptied the field.
 * @fires trailing-click - The trailing control was pressed.
 * @csspart field - The bordered field.
 * @csspart input - The native input.
 *
 * @spec specs/search/search.spec.json
 */
export declare class ZdsSearch extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    /** Match the contour of the controls around the field. Changes only the corners. */
    shape: SearchShape;
    /** Fits the field to its surface. Only `small` also reduces the text. */
    size: SearchSize;
    /** How much the field asserts itself: `default` in a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion. */
    flavour: SearchFlavour;
    /** The field cannot be used. */
    disabled: boolean;
    /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
    block: boolean;
    /**
     * Ghost only: suppress the focus outline, for a container that shows focus
     * itself (spec: "its focus outline is optional so the container can carry
     * focus instead"). The container must then show focus in its place.
     */
    hideFocusOutline: boolean;
    /** The query. */
    value: string;
    /** Shown while the field is empty. Not a label: set `label` as well. */
    placeholder: string;
    /** Accessible name of the field. */
    label: string | null;
    /** Field name submitted with a form. */
    name: string | null;
    /** Glyph leading the field: the spec's `hasLeading`. Set to an empty string to drop it. */
    leadingIcon: IconName | "";
    /**
     * Glyph for the trailing control: the spec's `hasTrailing`. Unset means no
     * trailing control. Figma's sample ships `microphone` (voice input); it is
     * not a default here because the control is only meaningful once the
     * implementation gives it a function.
     */
    trailingIcon: IconName | null;
    /** Accessible name of the trailing control, e.g. "Search by voice". */
    trailingLabel: string | null;
    /** Accessible name of the clear control. */
    clearLabel: string;
    private focused;
    private focusVisible;
    /** Set by a pointer press inside the field, so the focus it causes reads as pointer focus. */
    private pointerPressed;
    private input;
    private readonly internals;
    private defaultValue;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    /** Moves focus to the input. */
    focus(options?: FocusOptions): void;
    private onInput;
    private onChange;
    private onKeyDown;
    private onFocus;
    private onBlur;
    private clear;
    private onTrailing;
    /** The spec's State, derived from the field. */
    private get uiState();
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-search": ZdsSearch;
    }
}
//# sourceMappingURL=search.d.ts.map