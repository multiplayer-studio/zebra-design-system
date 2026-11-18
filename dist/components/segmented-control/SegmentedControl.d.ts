import * as React from "react";
import { RadioGroup } from "@base-ui/react/radio-group";
import { type IconName } from "../icon/Icon.js";
import "./segmented-control.css";
/** Square-cornered or rounded track and segments. Spec: the `shape` axis (metadata "Rounded" true/false). */
export type SegmentedControlShape = "rounded" | "sharp";
/**
 * What every segment shows, set once on the control (spec: "Pick one Flavour
 * and hold it across every segment"). `default` is icon + label, `text-only`
 * the label alone, `icon-only` the icon alone with the label as its
 * accessible name and tooltip.
 */
export type SegmentedControlFlavour = "default" | "text-only" | "icon-only";
/** One option in the control. */
export interface SegmentedControlOption {
    /** The value reported when this option is chosen. Unique within the control. */
    value: string;
    /**
     * The option's name. Shown as the label, and the segment's accessible name
     * (and `title`) when the control is `icon-only`. Keep it to one or two words.
     */
    label: string;
    /** Leading glyph. Replaces Figma's locked Star (spec issue "Icon locked to star"). */
    icon?: IconName;
    /** This one option cannot be chosen. */
    disabled?: boolean;
}
export interface SegmentedControlProps extends Omit<RadioGroup.Props<string>, "className" | "value" | "defaultValue" | "onValueChange" | "children"> {
    /** The options, in order. Each segment hugs its own content. */
    options?: readonly SegmentedControlOption[];
    /**
     * The chosen option's value (controlled). A value that matches no enabled
     * option shows the first enabled option instead: one is always chosen.
     */
    value?: string;
    /** The option chosen at first (uncontrolled). Falls back to the first enabled option, so exactly one is always chosen. */
    defaultValue?: string;
    /** Called when the user chooses another option. */
    onValueChange?: (value: string, eventDetails: RadioGroup.ChangeEventDetails) => void;
    /** Rounded or sharp corners on the track, every segment and the active indicator. Match the surrounding controls. */
    shape?: SegmentedControlShape;
    /**
     * What every segment shows. `default`: icon + label (an option without an
     * icon shows its label alone). `text-only`: labels only, icons hidden even
     * when options have them. `icon-only`: icons only, each label becomes the
     * segment's accessible name and `title`; an option without an icon still
     * shows its label, so nothing goes unnamed on screen.
     */
    flavour?: SegmentedControlFlavour;
    className?: string;
}
/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export declare function segmentFlavour(option: SegmentedControlOption, flavour: SegmentedControlFlavour): SegmentedControlFlavour;
/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export declare function resolveSegmentedValue(options: readonly SegmentedControlOption[], wanted: string | undefined): string | undefined;
/**
 * A row of mutually exclusive options sharing one track, where exactly one
 * is active at a time. Use it to switch a mode within one view; reach for
 * tabs when the choice moves between views.
 *
 * Behaviour comes from Base UI's RadioGroup + Radio, not ToggleGroup. A
 * single-mode ToggleGroup is a row of `aria-pressed` buttons that can be
 * un-pressed back to no value and whose arrow keys only move focus; the spec
 * asks for exactly one active option and a radiogroup role, which is what
 * RadioGroup is: `role="radiogroup"` / `role="radio"` + `aria-checked`, one
 * tab stop, arrow keys move and select, no way to deselect, plus a hidden
 * input for forms. The value is always passed down controlled, so a value
 * that names no enabled option can fall back to the first enabled one.
 *
 * The active background is one indicator bound to the track, not to a
 * segment, and slides between segments (spec Motion). RadioGroup has no
 * indicator part, so the chosen segment is measured (layout effect +
 * ResizeObserver) into custom properties the CSS positions it from.
 *
 * Name the control with `aria-label` or `aria-labelledby`.
 *
 * Kept in step with packages/web-components `<zds-segmented-control>`.
 *
 * @spec specs/segmented-control/segmented-control.spec.md
 */
export declare const SegmentedControl: React.ForwardRefExoticComponent<Omit<SegmentedControlProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
