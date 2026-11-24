import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { type IconName } from "../icon/Icon.js";
import "./search.css";
export type SearchShape = "sharp" | "rounded" | "full";
export type SearchSize = "small" | "medium" | "large";
export type SearchFlavour = "default" | "gradient" | "ghost";
export interface SearchProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "className" | "children" | "size" | "value" | "defaultValue" | "onValueChange"> {
    /** Match the contour of the controls around the field. Changes only the corners. */
    shape?: SearchShape;
    /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
    block?: boolean;
    /** Fits the field to its surface. Only `small` also reduces the text. */
    size?: SearchSize;
    /** `default` in a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion. */
    flavour?: SearchFlavour;
    /** Ghost only: suppress the focus outline for a container that shows focus itself. It must then show focus in its place. */
    hideFocusOutline?: boolean;
    /** The query (controlled). */
    value?: string;
    /** The initial query (uncontrolled). */
    defaultValue?: string;
    /** Called on every edit, and when the clear control empties the field. */
    onValueChange?: (value: string) => void;
    /** Enter was pressed. */
    onSearch?: (value: string) => void;
    /** The clear control emptied the field. */
    onClear?: () => void;
    /** Glyph leading the field: the spec's `hasLeading`. `null` drops it. */
    leadingIcon?: IconName | null;
    /**
     * Glyph for the trailing control: the spec's `hasTrailing`. Unset means no
     * trailing control. Figma's sample ships `microphone` (voice input); it is
     * not a default because the control is only meaningful with a function.
     */
    trailingIcon?: IconName;
    /** Accessible name of the trailing control, e.g. "Search by voice". */
    trailingLabel?: string;
    /** The trailing control was pressed. */
    onTrailingClick?: () => void;
    /** Accessible name of the clear control. */
    clearLabel?: string;
    className?: string;
}
/**
 * A single-line input for typing a query, with a magnifier leading it and a
 * trailing control that takes whatever icon and function the implementation
 * passes.
 *
 * Behaviour — the native input, disabled semantics, form participation —
 * comes from Base UI's Input. Everything visual comes from the token layer
 * via `search.css`, keyed off data attributes. The spec's State axis is not a
 * prop; it follows from the field and is reflected as `data-state`:
 * keyboard focus on an empty field is `focus` (the heaviest border), pointer
 * focus is `selected`, focus with text is `typing` (the clear control
 * appears), text without focus is `filled`.
 *
 * The field has no label of its own (spec accessibility): pass `aria-label`
 * or `aria-labelledby`. The spec's `Show Cancel` property is not built —
 * Figma wires it to nothing.
 *
 * Kept in step with packages/web-components `<zds-search>`.
 *
 * @spec specs/search/search.spec.md
 */
export declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<HTMLInputElement>>;
