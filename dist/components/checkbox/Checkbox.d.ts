import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import "./checkbox.css";
export type CheckboxSize = "medium" | "large";
export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "className" | "children"> {
    /** The box's size. The touch target and the label's type stay the same. */
    size?: CheckboxSize;
    /** The option's text (the spec's hasLabel / Label). Omit it only when the option is named some other way, e.g. aria-label. */
    label?: React.ReactNode;
    className?: string;
}
/**
 * A square control for turning a single option on or off, with an optional
 * label beside it. Checked carries three values rather than two, so a
 * checkbox that summarises a set of others can say indeterminate instead of
 * guessing between on and off. Reach for it wherever options are independent
 * of each other, and reach for Radio where exactly one of a set has to win.
 *
 * Behaviour — the `checkbox` role, checked and indeterminate state
 * (`aria-checked="mixed"`), keyboard, disabled semantics, the hidden form
 * input — comes from Base UI's Checkbox. The spec's one Checked axis maps to
 * `checked` + `indeterminate`; indeterminate wins and is set from the
 * children, never chosen. Everything visual comes from the token layer via
 * `checkbox.css`, keyed off Base UI's `[data-checked]` /
 * `[data-indeterminate]` / `[data-disabled]` and our `data-size`. The mark is
 * mounted only when checked or indeterminate.
 *
 * Kept in step with packages/web-components `<zds-checkbox>`.
 *
 * @spec specs/checkbox/checkbox.spec.md
 */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
