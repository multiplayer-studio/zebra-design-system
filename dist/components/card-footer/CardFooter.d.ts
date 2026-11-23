import * as React from "react";
import "./card-footer.css";
export interface CardFooterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    className?: string;
}
/**
 * A row of closing actions for Card's footer slot — one Button fills the
 * width, two sit side by side with a gap, or pass anything else entirely
 * (the spec's "custom" option). The count and arrangement are left to
 * whatever children are passed rather than a separate `actions` prop.
 *
 * @spec specs/card/card.spec.md
 */
export declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;
