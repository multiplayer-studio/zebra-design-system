import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { type IconName } from "../icon/Icon.js";
import { type ChipShape } from "../chip/chip.js";
import "./assist-chip.css";
export type AssistChipColor = "neutral" | "green" | "orange" | "blue" | "red";
export interface AssistChipProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className" | "color"> {
    /** Show the glyph naming the action's domain. Keep it consistent across a row. */
    showLeadingIcon?: boolean;
    /** The leading glyph. Figma ships it swapped to `star`. */
    icon?: IconName;
    /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
    shape?: ChipShape;
    /** Status colour for the border, label and icons. Use one per kind of item, e.g. red for PDF. */
    color?: AssistChipColor;
    /** Overrides the label, icon and remove colour. A token path (`feedback/info/foreground`) or any CSS colour. */
    foreground?: string;
    /** Overrides the fill, which `color` leaves neutral. A token path or any CSS colour. */
    background?: string;
    /** Overrides the border colour. A token path or any CSS colour. */
    border?: string;
    /** Show the remove control after the label. Defaults to whether `onDiscard` is set. Never shown while disabled. */
    discardable?: boolean;
    /**
     * Called when the remove control is activated (click, Enter / Space, or
     * Backspace / Delete while it has focus). Removing the chip is the caller's job.
     */
    onDiscard?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    /** Accessible name of the remove control. Defaults to "Remove <label>". */
    discardLabel?: string;
    className?: string;
}
/**
 * Offers a contextual action, or stands for an item someone can discard,
 * such as an attached file. Five colours borrow the status tokens to mark a
 * state or a kind of item, and `foreground`, `background` and `border`
 * override any one paint beyond those five (override > color > state). The
 * children are the label. Reach for Button when the action is the primary
 * next step, and FilterChip when the control narrows content.
 *
 * Without a remove control the chip is one Base UI Button. With one, a
 * button cannot hold another, so the root becomes a span carrying the label
 * (a Base UI Button only when `onClick` is set) and the remove control side
 * by side, as InputChip does. Not modelled from Figma (spec issues): the
 * single-value `active` axis and State=selected. 28px tall in every state
 * (Figma's 30/28 jump is a layout artefact of its inside border).
 *
 * Kept in step with packages/web-components `<zds-assist-chip>`.
 *
 * @spec specs/assist-chip/assist-chip.spec.md
 */
export declare const AssistChip: React.ForwardRefExoticComponent<AssistChipProps & React.RefAttributes<HTMLElement>>;
