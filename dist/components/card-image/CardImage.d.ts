import * as React from "react";
import "./card-image.css";
export interface CardImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "className"> {
    src: string;
    alt: string;
    className?: string;
}
/**
 * A full-bleed image for Card's body slot. Fills the width and clips to
 * Card's own corner radius; height is left to the consumer (the spec's own
 * 259px is an unbound, authored canvas value, not a real constraint).
 *
 * @spec specs/card/card.spec.md
 */
export declare const CardImage: React.ForwardRefExoticComponent<CardImageProps & React.RefAttributes<HTMLImageElement>>;
