import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon, type IconName } from "../icon/Icon.js";
import { cx, type ChipShape } from "../chip/chip.js";
import "./assist-chip.css";

export interface AssistChipProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  /** Show the glyph naming the action's domain. Keep it consistent across a row. */
  showLeadingIcon?: boolean;
  /** The leading glyph. Figma ships it swapped to `star`. */
  icon?: IconName;
  /** Pill (rounded) or square (sharp) corners. Match the controls around the chip. */
  shape?: ChipShape;
  className?: string;
}

/**
 * Offers a contextual action related to nearby content, such as adding an
 * event to a calendar, when the action helps but is not the main task. The
 * children are the label, phrased as a verb. Reach for Button when the
 * action is the primary next step, and FilterChip when the control narrows
 * content.
 *
 * Behaviour — button role, focus, keyboard activation, disabled semantics —
 * comes from Base UI's Button. Not modelled from Figma (spec issues): the
 * single-value `active` axis, and State=selected — an action does not stay
 * selected, so a chip that should is a FilterChip. 32px tall in every state
 * (Figma's 34/32 jump is a layout artefact of its inside border).
 *
 * Kept in step with packages/web-components `<zds-assist-chip>`.
 *
 * @spec specs/assist-chip/assist-chip.spec.md
 */
export const AssistChip = React.forwardRef<HTMLElement, AssistChipProps>(function AssistChip(
  { showLeadingIcon = true, icon = "star", shape = "rounded", className, children, ...rest },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      {...rest}
      className={cx("zds-chip", "zds-assist-chip", className)}
      data-interactive=""
      data-shape={shape}
    >
      {/* Decorative: the label names the action. Rounded family, Icon small (Figma). */}
      {showLeadingIcon && icon ? <Icon className="zds-chip__glyph" name={icon} size="small" iconStyle="rounded" /> : null}
      <span className="zds-chip__label">{children}</span>
    </BaseButton>
  );
});
