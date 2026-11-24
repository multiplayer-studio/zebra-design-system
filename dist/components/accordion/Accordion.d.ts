import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import "./accordion.css";
export interface AccordionProps extends Omit<BaseAccordion.Root.Props<string>, "className" | "value" | "defaultValue" | "onValueChange" | "orientation" | "loopFocus"> {
    /**
     * Rows carry a selection as well as disclosure: a leading control opens and
     * closes the row and the rest of the row toggles its selection. Off, the
     * whole row is one target that opens and closes it.
     */
    selectable?: boolean;
    /** radius/lg on the container's four corners, and rounded leading controls. */
    rounded?: boolean;
    /** Treat the list as one bounded object: an outline, and a divider under every row but the last. */
    inCard?: boolean;
    /**
     * Allow more than one row open at a time. Off by default: "only one item can
     * have the open state at a time" (spec metadata).
     */
    multiple?: boolean;
    /** The values of the open rows (controlled). */
    value?: string[];
    /** The values of the rows open at first (uncontrolled). */
    defaultValue?: string[];
    /** Called when a row opens or closes, with every open row's value. */
    onValueChange?: (value: string[], eventDetails: BaseAccordion.Root.ChangeEventDetails) => void;
    /** `<AccordionItem>` rows. */
    children?: React.ReactNode;
    className?: string;
}
/**
 * A vertically stacked list of disclosure rows sharing one container, for a
 * page that has more sections than it has room to show at once.
 *
 * Behaviour comes from Base UI's Accordion: the `button` + `aria-expanded` /
 * `aria-controls` trigger inside a heading, the `region` panel labelled by it,
 * single or `multiple` expansion, disabled rows, and the panel height exposed
 * as `--accordion-panel-height` so the open and close can animate. Base UI
 * 1.8 dropped arrow-key movement between headers (APG update); the owner asks
 * for it, so Up / Down / Home / End between this accordion's own triggers is
 * the one piece of keyboard handling added here, matching `<zds-accordion>`.
 *
 * Built apart from CollapsibleCard (spec analysis): that is one card that
 * folds, this is a list of rows with one shared outline.
 *
 * Kept in step with packages/web-components `<zds-accordion>`.
 *
 * @spec specs/accordion/accordion.spec.md
 */
export declare const Accordion: React.ForwardRefExoticComponent<Omit<AccordionProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface AccordionItemProps extends Omit<BaseAccordion.Item.Props, "className" | "value" | "title" | "children"> {
    /** Identifies the row in the accordion's `value`. Unique within the accordion; generated when omitted. */
    value?: string;
    /**
     * The row's label (the spec's Title). Name the section it opens — the caret
     * says a row opens, never what is inside. Called `heading`, as on
     * `<zds-accordion-item>`, where `title` would be the native tooltip.
     */
    heading: string;
    /** Whether the row is chosen (controlled). Only meaningful on a `selectable` accordion. */
    selected?: boolean;
    /** Whether the row is chosen at first (uncontrolled). */
    defaultSelected?: boolean;
    /** Called when the row body is pressed on a `selectable` accordion. */
    onSelectedChange?: (selected: boolean) => void;
    /** What the row reveals when open. Any content; it fills the row's width. */
    children?: React.ReactNode;
    className?: string;
}
/**
 * One row of an Accordion: a header holding the title and its disclosure
 * control, and the content it reveals. Use inside `<Accordion>`, which
 * decides whether the row is selectable, its divider and its control's shape.
 *
 * Kept in step with packages/web-components `<zds-accordion-item>`.
 *
 * @spec specs/accordion/accordion.spec.md (subcomponents › Accordion Item, Accordion Header)
 */
export declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionItemProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
