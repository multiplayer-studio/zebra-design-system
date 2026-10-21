import * as React from "react";
import { Toggle } from "@base-ui/react/toggle";
import { Icon } from "../icon/Icon.js";
import { cx, type ChipShape } from "../chip/chip.js";
import "./filter-chip.css";

export interface FilterChipProps
  extends Omit<Toggle.Props, "className" | "pressed" | "defaultPressed" | "onPressedChange"> {
  /** Whether the filter is on (controlled). Adds the check mark and flips to the inverse palette. */
  active?: boolean;
  /** Whether the filter starts on (uncontrolled). */
  defaultActive?: boolean;
  /** Called when the chip is switched on or off. */
  onActiveChange?: (active: boolean, eventDetails: Toggle.ChangeEventDetails) => void;
  /** Pill (rounded) or square (sharp) corners. Match the controls around the filter row. */
  shape?: ChipShape;
  className?: string;
}

/**
 * Lets someone narrow a set of content by switching a criterion on and off,
 * such as a category in a list of results. Use them in groups where more than
 * one can be on at once. The children are the label: name the filter, not
 * the result.
 *
 * Behaviour comes from Base UI's Toggle — a button exposing `aria-pressed`,
 * keyboard activation, disabled semantics, and `value` so it can sit in a
 * ToggleGroup. `active` maps onto its pressed state. Figma's separate
 * State=selected (colour only, no check mark) is not modelled: it overlaps
 * `active`, and the metadata says prefer active (spec issue).
 *
 * Kept in step with packages/web-components `<zds-filter-chip>`.
 *
 * @spec specs/filter-chip/filter-chip.spec.md
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(function FilterChip(
  { active, defaultActive, onActiveChange, shape = "rounded", className, children, ...rest },
  ref,
) {
  // Controlled when `active` is set, otherwise tracks its own state, so the
  // check mark can be rendered only while on.
  const [own, setOwn] = React.useState(defaultActive ?? false);
  const on = active ?? own;
  return (
    <Toggle
      ref={ref}
      {...rest}
      pressed={on}
      onPressedChange={(next, details) => {
        if (active === undefined) setOwn(next);
        onActiveChange?.(next, details);
      }}
      className={cx("zds-chip", "zds-filter-chip", className)}
      data-interactive=""
      data-shape={shape}
    >
      {/* Only while on. Rounded family, Icon small (Figma). */}
      {on ? <Icon className="zds-chip__glyph" name="check-mark" size="small" iconStyle="rounded" /> : null}
      <span className="zds-chip__label">{children}</span>
    </Toggle>
  );
});
