import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { type IconName } from "../icon/Icon.js";
import type { InputFieldSize, InputFieldShape, InputFieldFlavour } from "../input-field/InputField.js";
import type { InputState, InputLabelType } from "../input/Input.js";
import "../input-field/input-field.css";
import "../input/input.css";
import "../dropdown-menu/dropdown-menu.css";
import "../menu-item/menu-item.css";
import "./select.css";
export interface SelectOption {
    value: string;
    /** What the row and the field show. Defaults to `value`. */
    label?: string;
    /** Glyph ahead of the label, in the row and in the field once chosen. */
    icon?: IconName;
    disabled?: boolean;
}
/** Input / Select's State axis. Interaction states are derived; `invalid`, `read-only` and `disabled` come from props. */
export type SelectFieldState = "enabled" | "open" | "filled" | "invalid" | "read-only" | "disabled";
export type SelectSize = InputFieldSize;
export type SelectShape = InputFieldShape;
export type SelectFlavour = InputFieldFlavour;
export type SelectState = InputState;
export type SelectLabelType = InputLabelType;
export interface SelectProps {
    /** The choices, in order. Each row is a Menu Item. */
    options?: ReadonlyArray<SelectOption>;
    /** The chosen option's `value` (controlled). `null` for none. */
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    /** Whether the list is open (controlled) — the spec's Open. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Shown in the field while nothing is chosen. Not a label. */
    placeholder?: string;
    /** The field's name, shown above it. Empty hides the label (Show Label). */
    label?: React.ReactNode;
    /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception. */
    labelType?: SelectLabelType;
    /** Adds an information icon after the name (the label's Show Information). */
    information?: boolean;
    /** Accessible name of the information icon. */
    informationLabel?: string;
    /** Supporting line under the name, read as the field's description. Empty hides it; needs a `label` (Show Sub Label). */
    subLabel?: React.ReactNode;
    /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
    hint?: React.ReactNode;
    /** Icon ahead of the hint (the hint's Show Icon). */
    hintIcon?: boolean;
    /** One state across label, field and hint (spec issue 8: code owns the assembly state, as on Input). */
    state?: SelectState;
    /** The value is shown but cannot be changed. Stays legible and in the tab order. */
    readOnly?: boolean;
    /** Form field name. */
    name?: string;
    /** Glyph at the field's leading edge (hasLeading). A chosen option's own `icon` replaces it. */
    leadingIcon?: IconName | null;
    /** Field height; only `small` also reduces the text. */
    size?: SelectSize;
    /** Field corners, as Input Field. The list is always rounded (spec issue 14). */
    shape?: SelectShape;
    /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
    flavour?: SelectFlavour;
    /** Opens the list on the compact Dropdown Menu: a space/xs inset and no gap between rows, for a cramped spot. */
    compact?: boolean;
    /** Fills the container's width. Without it the Select starts at 280px and narrows to fit, as Input. */
    block?: boolean;
    /**
     * Where the list mounts. Defaults to the Select's own root, so the list
     * stays inside any `.ext-*` / `.mode-*` scope the Select sits in; it is
     * positioned `fixed`, so an `overflow: hidden` ancestor does not clip it.
     */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>["container"];
    /** Accessible name when there is no visible `label`. */
    "aria-label"?: string;
    className?: string;
}
/**
 * The full select assembly: a label above, a Select Field in the middle and a
 * hint below, stacked and spaced as one unit. Opening it reveals a Dropdown
 * Menu of the options, overlaid below the field.
 *
 * Built by composition: the field wears Input Field's classes and `data-*`
 * axes, the list Dropdown Menu's panel and Menu Item's rows, the label and
 * hint Input's. `select.css` holds only the deltas — the `open` state, the
 * placeholder colour, the list's width and scroll.
 *
 * Behaviour — the WAI-ARIA listbox select (a button with `aria-haspopup`
 * and `aria-expanded`, `role="listbox"` / `role="option"` with
 * `aria-selected`), typeahead, arrow / Home / End navigation, Enter or Space
 * to choose, Escape to close, focus return, collision flipping and form
 * participation — comes from Base UI's Select. That model opens on Enter,
 * Space and the arrow keys, so it satisfies both metadata keyboard
 * descriptions (spec issue 7: Select's "Space or Enter" and Select Field's
 * "Alt+Down or Enter"); it follows Select's, the fuller one.
 *
 * The field's State is derived and reflected as `data-state`, in Input /
 * Select's names: open → `open` (spec issue 11: not Input Field's
 * `selected`), a value at rest → `filled`, plus `invalid`, `read-only` and
 * `disabled` from props. Keyboard focus is `:focus-visible`. Open outranks
 * invalid, as focus does on Input Field.
 *
 * Kept in step with packages/web-components `<zds-select>`.
 *
 * @spec specs/select/select.spec.md
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;
