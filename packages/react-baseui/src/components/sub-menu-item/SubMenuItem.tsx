import * as React from "react";
import { Icon, type IconName } from "../icon/Icon.js";
import {
  NotificationIndicator,
  type NotificationIndicatorSize,
} from "../notification-indicator/NotificationIndicator.js";
import { CaretIndicator, type CaretIndicatorDirection } from "../caret-indicator/CaretIndicator.js";
import { Tooltip } from "../tooltip/Tooltip.js";
import {
  NavigationRailContext,
  NestedMenuContext,
  useNavigationRailModeClass,
  type NavigationRailShape,
} from "../navigation-rail/context.js";
import "./sub-menu-item.css";

/** A count. `0`, `""`, `null` and `undefined` show nothing; above 99 reads "99+". */
export type SubMenuItemBadge = number | string | null;

export interface SubMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /** The row's name. One line; a long name is end-truncated. */
  label?: string;
  /** Leading glyph. Figma ships a `verified` placeholder — swap it. */
  icon?: IconName;
  /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
  showLeadingIcon?: boolean;
  /**
   * The row the user is on: `aria-current="page"`, the selected ghost fill
   * and label colour. Exactly one destination across rail and panel.
   */
  selected?: boolean;
  /** Unavailable. Disabled wins over `selected` (Figma has no selected+disabled). */
  disabled?: boolean;
  /**
   * A child row under a collapsible group: indented, quieter label, smaller
   * type. Inside a CollapsibleMenuItem it is set for you.
   */
  nested?: boolean;
  /**
   * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
   * NavigationRail the rail's `shape` sets it, inside a CollapsibleMenuItem
   * the group's; this prop applies only on a row standing alone.
   */
  shape?: NavigationRailShape;
  /**
   * The Badges-page Notification Indicator counter, in the row's layout
   * between label and caret. Its visibility depends on this alone (spec warn:
   * Figma also hides it with the leading icon). Medium for one character,
   * large for more. Not Figma's drifted copy (2837:1489).
   */
  badge?: SubMenuItemBadge;
  /** Text equivalent of the badge in the accessible name, e.g. "2 unread". Defaults to the count. */
  badgeLabel?: string;
  /**
   * Shows the trailing `chevron-right` caret: a row that opens a further
   * level. Figma defaults it on; here it defaults off, because the spec's own
   * usage says a caret on a row that opens nothing "promises a level that is
   * not there", and most rows navigate straight to a destination.
   */
  subMenu?: boolean;
  /** Turns the caret (90°) while the level it opens is showing. Set `aria-expanded` yourself if it controls one. */
  open?: boolean;
  /** Renders an `<a>`. Without it the row is a `<button type="button">`. */
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  className?: string;
}

function badgeParts(badge: SubMenuItemBadge | undefined): { size: NotificationIndicatorSize; value: string } | null {
  if (badge === null || badge === undefined || badge === "" || badge === 0) return null;
  const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
  return { size: value.length > 1 ? "large" : "medium", value };
}

/** @internal The row's inside, shared with CollapsibleMenuItem's header. */
export function SubMenuRowContent({
  label,
  icon,
  showLeadingIcon,
  badge,
  badgeLabel,
  caret,
  open,
  labelRef,
}: {
  labelRef?: React.Ref<HTMLSpanElement>;
  label: string;
  icon: IconName;
  showLeadingIcon: boolean;
  badge: SubMenuItemBadge | undefined;
  badgeLabel?: string;
  caret: CaretIndicatorDirection | null;
  open: boolean;
}) {
  const b = badgeParts(badge);
  const sr = b ? (badgeLabel ?? b.value) : undefined;
  return (
    <>
      {/* Icon and Title: their own group at space/md, inside the row's
          space/sm (spec warn "Gap": the bound tokens, not the metadata's
          single space/sm). */}
      <span className="zds-sub-menu-item__lead">
        {showLeadingIcon ? <Icon className="zds-sub-menu-item__icon" name={icon} size="small" /> : null}
        <span ref={labelRef} className="zds-sub-menu-item__label">{label}</span>
      </span>
      {b ? <NotificationIndicator className="zds-sub-menu-item__badge" size={b.size} value={b.value} aria-hidden="true" /> : null}
      {sr ? <span className="zds-sub-menu-item__sr">{`, ${sr}`}</span> : null}
      {caret ? <CaretIndicator className="zds-sub-menu-item__caret" direction={caret} open={open} size="small" /> : null}
    </>
  );
}

/** A label actually cut off by its ellipsis. Measured when asked, never observed. */
function isTruncated(el: HTMLElement | null) {
  return !!el && el.scrollWidth > el.clientWidth;
}

/**
 * @internal The full label of a row (or a Collapsible Menu Item header), in a
 * Tooltip after a 3s hover — only when the label is truncated (owner
 * decision). Controlled: Base UI asks to open after the delay (or at once on
 * keyboard focus) and the label is measured then, so a resize or a label
 * change is always current; the row is never remounted. `describe={false}`:
 * the bubble repeats the row's own accessible name. The popup portals to
 * `body`, so it carries the rail's mode class to stay in the rail's mode.
 */
export function TruncatedLabelTooltip({
  label,
  labelRef,
  shape,
  trigger,
}: {
  label: string;
  labelRef: React.RefObject<HTMLSpanElement | null>;
  shape: NavigationRailShape;
  trigger: React.ReactElement;
}) {
  const modeClass = useNavigationRailModeClass();
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      trigger={trigger}
      open={open}
      onOpenChange={(next) => setOpen(next && isTruncated(labelRef.current))}
      delay={3000}
      point="left"
      shape={shape}
      describe={false}
      className={modeClass ?? undefined}
    >
      {label}
    </Tooltip>
  );
}

/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * A plain `<a>` / `<button>`; inside a CollapsibleMenuItem it renders nested.
 * A truncated label shows in full in a tooltip after a 3s hover.
 * Hover, pressed and selected fills are the ghost tokens alone (spec warn
 * "Double alpha"). Kept in step with `<zds-sub-menu-item>`.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.md
 */
export const SubMenuItem = React.forwardRef<HTMLElement, SubMenuItemProps>(function SubMenuItem(
  {
    label = "Label",
    icon = "verified",
    showLeadingIcon = true,
    selected = false,
    disabled = false,
    nested: nestedProp = false,
    shape: shapeProp = "rounded",
    badge = null,
    badgeLabel,
    subMenu = false,
    open = false,
    href,
    target,
    rel,
    className,
    ...rest
  },
  ref,
) {
  const rail = React.useContext(NavigationRailContext);
  const groupShape = React.useContext(NestedMenuContext);
  const nested = groupShape !== null || nestedProp;
  const shape = rail ? rail.shape : (groupShape ?? shapeProp);
  const isSelected = selected && !disabled;
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const shared = {
    ...rest,
    className: ["zds-sub-menu-item", className].filter(Boolean).join(" "),
    "data-nested": nested ? "" : undefined,
    "data-shape": shape,
    "data-selected": isSelected ? "" : undefined,
    "data-disabled": disabled ? "" : undefined,
    "aria-current": isSelected ? ("page" as const) : undefined,
  };
  const content = (
    <SubMenuRowContent
      label={label}
      icon={icon}
      showLeadingIcon={showLeadingIcon}
      badge={badge}
      badgeLabel={badgeLabel}
      caret={subMenu ? "horizontal" : null}
      open={open}
      labelRef={labelRef}
    />
  );
  const row = href !== undefined ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      {...shared}
      href={disabled ? undefined : href}
      target={target}
      rel={rel}
      aria-disabled={disabled || undefined}
    >
      {content}
    </a>
  ) : (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" {...shared} disabled={disabled}>
      {content}
    </button>
  );
  // Every row gets the truncation tooltip: it opens only while the label is
  // actually cut off (a group's width, or the rail's subMenuMaxWidth).
  return <TruncatedLabelTooltip label={label} labelRef={labelRef} shape={shape} trigger={row} />;
});
