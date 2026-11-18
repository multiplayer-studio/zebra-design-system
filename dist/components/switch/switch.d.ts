import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";
/**
 * A single on or off toggle, a track with a thumb slider that switches
 * between its two ends.
 *
 * The host element *is* the control: it carries `role="switch"` and
 * `aria-checked` through ElementInternals and is form-associated, so a native
 * `<label for>` names it ("[label], switch, on") and clicking that label
 * toggles it — exactly as it would a checkbox. Space and Enter toggle it from
 * the keyboard.
 *
 * Mapping from the spec's Figma API:
 * - `Switch` on/off → `checked`. A two-value enum is a boolean in code (spec
 *   note on `api`).
 * - `State` → not a property. `disabled` is `disabled`; `focus` comes from
 *   keyboard focus (`:focus-visible`), never from an attribute.
 * - `hasIcons` → whether any glyph is set. The icon slots are swap-only in
 *   Figma (spec `internalVariations`); here they are `onIcon` (the start
 *   slot, uncovered while checked) and `offIcon` (the end slot, uncovered
 *   while unchecked). Leave both unset for a plain track and thumb.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the switch with no JavaScript.
 *
 * @fires input - The user toggled the switch. Fires before `change`, as on a native checkbox.
 * @fires change - The user toggled the switch. Read `checked` for the new value.
 * @csspart track - The track behind the thumb.
 * @csspart thumb - The sliding thumb.
 *
 * @spec specs/switch/switch.spec.json
 */
export declare class ZdsSwitch extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    /** On or off. Reflects, so `:host([checked])` drives the styles. */
    checked: boolean;
    /** The switch can't be toggled. Say why nearby when it isn't obvious. */
    disabled: boolean;
    /** Glyph in the start slot, shown while the switch is on. Pair it with `offIcon` so the two communicate the state. */
    onIcon: IconName | null;
    /** Glyph in the end slot, shown while the switch is off. */
    offIcon: IconName | null;
    /** Field name submitted with a form. */
    name: string | null;
    /** Value submitted with a form while checked. Nothing is submitted while unchecked, as with a checkbox. */
    value: string;
    /**
     * Accessible name, for when no `<label for>` or `aria-labelledby` points at
     * the switch. Switch has no visible label part of its own.
     */
    label: string | null;
    private readonly internals;
    private defaultChecked;
    /** Set on the first user toggle so the initial render never animates. */
    private interacted;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    /** Called by the browser when a containing `<form>` resets. */
    formResetCallback(): void;
    /** Called by the browser when a containing `<fieldset disabled>` changes. */
    formDisabledCallback(disabled: boolean): void;
    private toggle;
    private readonly onClick;
    private readonly onKeyDown;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-switch": ZdsSwitch;
    }
}
//# sourceMappingURL=switch.d.ts.map