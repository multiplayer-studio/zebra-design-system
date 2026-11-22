import * as React from "react";
import "./card-heading.css";
export interface CardHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    /** The title. */
    heading: React.ReactNode;
    /** Supporting text under the heading. */
    subheading?: React.ReactNode;
    /** Leading slot — an Avatar in the spec's own default, but anything fits. */
    leadingContent?: React.ReactNode;
    /** Trailing slot — an icon button in the spec's own default, but anything fits. */
    trailingContent?: React.ReactNode;
    className?: string;
}
/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for Card's header slot (and reused inside the body
 * slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this component derives visibility from whether `leadingContent` /
 * `trailingContent` was passed, since a consumer would otherwise have to keep
 * two props in sync for one decision.
 *
 * @spec specs/card/card.spec.md
 */
export declare const CardHeading: React.ForwardRefExoticComponent<CardHeadingProps & React.RefAttributes<HTMLDivElement>>;
