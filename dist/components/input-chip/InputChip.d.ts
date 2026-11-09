import * as React from "react";
import { type AvatarProps } from "../avatar/Avatar.js";
import { type ChipShape } from "../chip/chip.js";
import "./input-chip.css";
export interface InputChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
    /** Lead with the person's face or initials. Leave it on only when every chip in the field can supply one. */
    showAvatar?: boolean;
    /** Photo for the avatar. Without it the avatar shows initials. */
    avatarSrc?: string;
    /** Initials for the avatar. Defaults to the first letters of the label. */
    avatarInitials?: string;
    /**
     * The avatar's swatch behind the initials: one of Avatar's seven swatches,
     * a token name (`chart/series/2`), a custom property or any CSS colour.
     */
    avatarColor?: AvatarProps["swatchColor"];
    /** The value is fixed: the chip greys out and the remove control is hidden. Say why nearby. */
    disabled?: boolean;
    /** Pill (rounded) or square (sharp) corners. Match the field the chips sit in. */
    shape?: ChipShape;
    /**
     * Called when the remove control is activated (click, Enter / Space, or
     * Backspace / Delete while it has focus). Announcing the change and moving
     * focus afterwards belong to the field that owns the chips.
     */
    onRemove?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    /** Show the remove control. Defaults to whether `onRemove` is set. Never shown while disabled. */
    removable?: boolean;
    /** Accessible name of the remove control. Defaults to "Remove <label>". */
    removeLabel?: string;
    className?: string;
}
/**
 * Represents a person, entity or value someone has entered or picked, such
 * as a recipient on a message, so it can be reviewed and removed without
 * retyping. Belongs inside input and selection fields; reach for FilterChip
 * to narrow content or AssistChip to offer an action. The children are the
 * label.
 *
 * The chip itself is not a control: its one interactive part is the remove
 * control, a Base UI Button named "Remove <label>". Figma gives that control
 * no API and shows it even when disabled (spec issue); here it renders only
 * when there is something to call (`onRemove`, or `removable`) and never on
 * a disabled chip. The chip shows its focus treatment while the remove
 * control has keyboard focus.
 *
 * Kept in step with packages/web-components `<zds-input-chip>`.
 *
 * @spec specs/input-chip/input-chip.spec.md
 */
export declare const InputChip: React.ForwardRefExoticComponent<InputChipProps & React.RefAttributes<HTMLSpanElement>>;
