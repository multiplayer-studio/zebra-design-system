import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { type IconName } from "../icon/Icon.js";
import type { ButtonFlavour, ButtonSize, ButtonShape } from "../button/Button.js";
import "../button/button.css";
import "./icon-button.css";
export interface IconButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className" | "children"> {
    /** How much weight the action carries. The same nine as Button. */
    flavour?: ButtonFlavour;
    /** small (36, under the 40 minimum target), medium or large. */
    size?: ButtonSize;
    /** sharp, rounded or full (a circle). Also picks the glyph family. */
    shape?: ButtonShape;
    /** The glyph. Defaults to more-horizontal, as in Figma — set it deliberately. */
    icon?: IconName;
    /** The accessible name, e.g. "Dismiss". Required: there is no visible text. */
    label: string;
    className?: string;
}
/**
 * Triggers an action from a single glyph, with no text label. Square at
 * every size, and it carries the same nine flavours, three shapes and four
 * states as Button so the two sit together consistently. Nothing on it is
 * readable, so every instance needs an accessible name in code. When the
 * action can carry a word, use Button instead.
 *
 * Behaviour comes from Base UI's Button, as on Button. Colour, border, shape,
 * focus and disabled come from Button's own `button.css` through the same
 * `zds-button` class and data attributes, so the two cannot drift; only the
 * square geometry is in `icon-button.css`. The glyph takes the flavour's
 * label colour (spec: "Background and glyph swap to the disabled tokens of
 * their family"); three Figma bindings that contradict that are not copied
 * (spec warns).
 *
 * Kept in step with packages/web-components `<zds-icon-button>`.
 *
 * @spec specs/icon-button/icon-button.spec.md
 */
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLElement>>;
