import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import type { IconName } from "../icon/Icon.js";
import { SubMenuRowContent, TruncatedLabelTooltip, type SubMenuItemBadge } from "../sub-menu-item/SubMenuItem.js";
import { NavigationRailContext, NestedMenuContext, type NavigationRailShape } from "./context.js";
import "../sub-menu-item/sub-menu-item.css";
import "./navigation-rail.css";

export interface CollapsibleMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children" | "onChange"> {
  /** The group's name, on its header row. */
  label?: string;
  /** Header glyph. Figma ships a `verified` placeholder. */
  icon?: IconName;
  /** Shows the header glyph (Figma pins it on). */
  showLeadingIcon?: boolean;
  /** Counter badge on the header row, as on SubMenuItem. */
  badge?: SubMenuItemBadge;
  /** Text equivalent of the badge. */
  badgeLabel?: string;
  /** Whether the group is open (controlled). */
  open?: boolean;
  /** Whether the group starts open (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the header is pressed, with the next open state. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Corner shape of the group and its rows: rounded (`radius/sm`) or sharp
   * (`radius/none`). Inside a NavigationRail the rail's `shape` sets it and
   * this prop is ignored.
   */
  shape?: NavigationRailShape;
  /** The header cannot be pressed. */
  disabled?: boolean;
  /** SubMenuItem rows. They render nested (indented, quieter) automatically. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * Behaviour is Base UI's Collapsible: the header is the Trigger (`button`
 * with `aria-expanded` / `aria-controls`), the rows sit in its Panel, given
 * `role="region"` and named by the header. The header is a SubMenuItem row
 * with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active) — the token alone, without Figma's extra
 * paint opacity (spec warn "Double alpha") — and the rows sit on surface/menu.
 *
 * It never widens the sub menu (`contain: inline-size`): it fills the width
 * the panel's other content gives it, its labels truncate, and a truncated
 * label shows in full in a tooltip after a 3s hover (owner decision).
 *
 * Kept in step with `<zds-collapsible-menu-item>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Collapsible Menu Item)
 */
export const CollapsibleMenuItem = React.forwardRef<HTMLDivElement, CollapsibleMenuItemProps>(function CollapsibleMenuItem(
  {
    label = "Label",
    icon = "verified",
    showLeadingIcon = true,
    badge = null,
    badgeLabel,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    shape: shapeProp = "rounded",
    className,
    children,
    ...rest
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const headerId = React.useId();
  const rail = React.useContext(NavigationRailContext);
  const shape = rail ? rail.shape : shapeProp;
  const labelRef = React.useRef<HTMLSpanElement>(null);
  return (
    <Collapsible.Root
      ref={ref}
      {...rest}
      open={open}
      disabled={disabled}
      onOpenChange={(next) => {
        if (openProp === undefined) setInnerOpen(next);
        onOpenChange?.(next);
      }}
      className={["zds-collapsible-menu-item", className].filter(Boolean).join(" ")}
      data-open={open ? "" : undefined}
      data-shape={shape}
    >
      {/* A truncated header label shows in full after a 3s hover, as on the rows. */}
      <TruncatedLabelTooltip
        label={label}
        labelRef={labelRef}
        shape={shape}
        trigger={
          <Collapsible.Trigger
            id={headerId}
            className="zds-sub-menu-item zds-collapsible-menu-item__header"
            data-disabled={disabled ? "" : undefined}
            data-shape={shape}
          >
            <SubMenuRowContent
              label={label}
              icon={icon}
              showLeadingIcon={showLeadingIcon}
              badge={badge}
              badgeLabel={badgeLabel}
              caret="vertical"
              open={open}
              labelRef={labelRef}
            />
          </Collapsible.Trigger>
        }
      />
      <Collapsible.Panel className="zds-collapsible-menu-item__panel" role="region" aria-labelledby={headerId}>
        <div className="zds-collapsible-menu-item__children">
          <NestedMenuContext.Provider value={shape}>{children}</NestedMenuContext.Provider>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
