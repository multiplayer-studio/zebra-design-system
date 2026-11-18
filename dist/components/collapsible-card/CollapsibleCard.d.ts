import * as React from "react";
import "./collapsible-card.css";
export type CollapsibleCardShape = "sharp" | "rounded";
export type CollapsibleCardFlavor = "default" | "gradient";
export interface CollapsibleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    /** Corner treatment. */
    shape?: CollapsibleCardShape;
    /** Plain, or outlined with the brand gradient to draw the eye. Use gradient for at most one card in a group. */
    flavor?: CollapsibleCardFlavor;
    /** The title, always visible in the header. */
    heading: React.ReactNode;
    /** Marks the heading as required with a trailing asterisk. */
    required?: boolean;
    /**
     * Supporting text under the heading. Figma's header now has a real
     * `showDescription` toggle (default true) for this — this component
     * derives the same thing from whether `description` was passed, rather
     * than adding a second prop to keep in sync with it.
     */
    description?: React.ReactNode;
    /** Controlled expanded state. Omit to let the card manage its own state. */
    expanded?: boolean;
    /** Initial expanded state when uncontrolled. */
    defaultExpanded?: boolean;
    /** Called whenever the header is activated, controlled or not. */
    onExpandedChange?: (expanded: boolean) => void;
    /** The body, revealed only while expanded. */
    children?: React.ReactNode;
    className?: string;
}
/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this component implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * component's own responsibility (a native `button`), since Figma models
 * none of them.
 *
 * @spec specs/card/card.spec.md
 */
export declare const CollapsibleCard: React.ForwardRefExoticComponent<CollapsibleCardProps & React.RefAttributes<HTMLDivElement>>;
