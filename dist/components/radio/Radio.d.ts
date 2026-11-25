import * as React from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import "./radio.css";
export type RadioSize = "medium" | "large";
export interface RadioProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadio.Root>, "className" | "children"> {
    /** The ring's size. The touch target and the label's type stay the same. */
    size?: RadioSize;
    /** The option's text. Omit it (the spec's hasLabel=false) only when the option is named some other way nearby, e.g. aria-label. */
    label?: React.ReactNode;
    className?: string;
}
/**
 * One option in a set where exactly one can be chosen. Use inside a
 * `RadioGroup`, which owns the selected value, the shared name and the
 * keyboard model (one tab stop, arrow keys move the selection).
 *
 * Behaviour — the `radio` role, checked state, keyboard, disabled semantics,
 * the hidden form input — comes from Base UI's Radio and RadioGroup.
 * Everything visual comes from the token layer via `radio.css`, keyed off
 * Base UI's `[data-checked]` / `[data-unchecked]` / `[data-disabled]` and our
 * `data-size`.
 *
 * Built to the spec's intent where Figma can't express it: a disabled option
 * shows whether it is chosen (spec blocker "a disabled radio can't show
 * whether it's chosen"), and focus is one outline (spec warn "the focus ring
 * is built two ways").
 *
 * Kept in step with packages/web-components `<zds-radio>`.
 *
 * @spec specs/radio-button/radio-button.spec.md
 */
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLButtonElement>>;
export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseRadioGroup>, "className"> {
    className?: string;
}
/**
 * The group that makes exactly one Radio selectable: owns the value, the
 * form name and the keyboard model. Grouping is "carried by whatever groups
 * the instances in code" (spec accessibility) — this is that. Give it an
 * accessible name with `aria-label` or `aria-labelledby`.
 */
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
