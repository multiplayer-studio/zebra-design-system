import * as React from "react";
import "./card-body.css";
export interface CardBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    className?: string;
}
/**
 * A plain padded text block for Card's body slot.
 *
 * @spec specs/card/card.spec.md
 */
export declare const CardBody: React.ForwardRefExoticComponent<CardBodyProps & React.RefAttributes<HTMLDivElement>>;
