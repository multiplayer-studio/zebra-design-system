import * as React from "react";
import "./card.css";
export type CardShape = "sharp" | "rounded";
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
    /** Corner treatment. Content clips to it, so a full-bleed image follows the curve. */
    shape?: CardShape;
    /** Shows the header slot above the body. */
    hasHeader?: boolean;
    /** Header content — a title row or a heading with actions. `CardHeading` is built for this slot. */
    header?: React.ReactNode;
    /** Shows the footer slot below the body. */
    hasFooter?: boolean;
    /** Footer content — the actions that close out the card. `CardFooter` is built for this slot. */
    footer?: React.ReactNode;
    /** The body slot. Always present — there is no visibility toggle for it. */
    children?: React.ReactNode;
    className?: string;
}
/**
 * The empty card shell: three stacked slots inside a bordered surface. It
 * decides the surface, the border, the corner treatment and clipping, and
 * nothing else — every inset comes from whatever fills the slots
 * (`CardHeading`, `CardBody`, `CardImage`, `CardFooter`, or anything else).
 *
 * Header and footer can each be switched off; the body has no toggle. Width
 * is not fixed here — the spec's own 330px is a Figma canvas artifact, not a
 * constraint ("whoever places it decides the width"), so this shell sizes to
 * its container.
 *
 * @spec specs/card/card.spec.md
 */
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
