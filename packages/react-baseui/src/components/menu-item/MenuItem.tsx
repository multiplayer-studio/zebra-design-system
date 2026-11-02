import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Icon, type IconName } from "../icon/Icon.js";
import "../checkbox/checkbox.css";
import "../radio/radio.css";
import "./menu-item.css";

export type MenuItemType = "icon" | "checkbox" | "radio" | "custom";

/**
 * The nearest enclosing `DropdownMenu`'s own `rounded`, so a `MenuItem`
 * defaults to matching its panel without every row having to say so. Not
 * exported — it's plumbing between `DropdownMenu` and `MenuItem`, not a
 * public theming context (see the skill's "no React context" rule, which is
 * about theming; this carries a structural default, not a theme).
 *
 * @spec specs/dropdown/dropdown.spec.md — "Rounded propagation"
 */
export const MenuItemRoundedContext = React.createContext(false);

export interface MenuItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Menu.Item>, "className"> {
  /**
   * What leads the row. `icon` takes `leadingIcon`; `checkbox` and `radio`
   * lead with the real Checkbox / Radio at size medium, checked when the row
   * is `selected` and disabled with it; `custom` takes `leadingSlot`.
   */
  type?: MenuItemType;
  /** Glyph in the leading position for `type="icon"`. Undefined hides it (spec: `leadingElement`). */
  leadingIcon?: IconName;
  /** Glyph at the trailing edge — a submenu arrow or external-link mark. Undefined hides it (spec: `trailingIcon`). */
  trailingIcon?: IconName;
  /**
   * `type="custom"` only: replaces the leading Icon with an arbitrary node
   * (an avatar, a colour swatch) the icon font can't supply. Ships empty per
   * spec; ignored for every other `type`.
   */
  leadingSlot?: React.ReactNode;
  /**
   * Softens the row's corners. Defaults to the nearest enclosing
   * `DropdownMenu`'s own `rounded` when nested inside one — matching the
   * panel is enforced, not just a convention to remember. Pass this
   * explicitly to override, e.g. for a standalone row outside a DropdownMenu.
   */
  rounded?: boolean;
  /**
   * Marks the row as the currently-chosen option, painted as the spec's 10%
   * brand tint. For `checkbox` and `radio` it also checks the control and
   * sets `aria-checked`.
   */
  selected?: boolean;
  /** Uncontrolled starting value of `selected`. */
  defaultSelected?: boolean;
  /**
   * The whole row is the control's click target: a `checkbox` row toggles
   * and a `radio` row selects itself. Called with the new value; with a
   * controlled `selected`, update it from here. Radio rows clear each other
   * through their own `selected` props, as a group does.
   */
  onSelectedChange?: (selected: boolean) => void;
  className?: string;
}

/**
 * A single row inside a Dropdown Menu: a leading element, a label and an
 * optional trailing icon.
 *
 * Behaviour — roving highlight, keyboard navigation, `[data-disabled]` —
 * comes from Base UI's `Menu.Item`. Hover/keyboard-highlight is Base UI's own
 * `data-highlighted`; keyboard focus is real DOM focus, styled with
 * `:focus-visible` rather than a hand-rolled focus state. `selected` is the
 * one state this component adds itself (see the prop's doc). Everything
 * visual comes from the token layer via `menu-item.css`.
 *
 * @spec specs/dropdown/dropdown.spec.md
 */
/*
 * The leading Checkbox / Radio only shows the row's state. The row is the
 * interactive element, and Base UI's controls render a <button> (and Radio
 * needs a RadioGroup), so this draws the same markup their stylesheets key
 * off, inert and hidden from assistive technology. Figma leaves the control
 * unchecked in every state (spec warn); code follows the row.
 */
function MenuItemControl({ type, checked, disabled }: { type: "checkbox" | "radio"; checked: boolean; disabled: boolean }) {
  const state = { "data-checked": checked ? "" : undefined, "data-unchecked": checked ? undefined : "", "data-disabled": disabled ? "" : undefined };
  if (type === "checkbox") {
    const markStyle = { width: "var(--zds-checkbox-mark)", height: "var(--zds-checkbox-mark)", fontSize: "var(--zds-checkbox-mark)" };
    return (
      <span className="zds-checkbox zds-menu-item__control" data-size="medium" aria-hidden="true">
        <span className="zds-checkbox__target">
          <span className="zds-checkbox__box" {...state}>
            {checked ? (
              <span className="zds-checkbox__mark">
                <Icon name="check-mark" iconStyle="rounded" style={markStyle} />
              </span>
            ) : null}
          </span>
        </span>
      </span>
    );
  }
  return (
    <span className="zds-radio zds-menu-item__control" data-size="medium" aria-hidden="true">
      <span className="zds-radio__target">
        <span className="zds-radio__ring" {...state}>
          <span className="zds-radio__dot" {...state} />
        </span>
      </span>
    </span>
  );
}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  {
    type = "icon",
    leadingIcon,
    trailingIcon,
    leadingSlot,
    rounded,
    selected: selectedProp,
    defaultSelected = false,
    onSelectedChange,
    closeOnClick,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const inheritedRounded = React.useContext(MenuItemRoundedContext);
  const isRounded = rounded ?? inheritedRounded;

  const choice = type === "checkbox" || type === "radio";
  const [ownSelected, setOwnSelected] = React.useState(defaultSelected);
  const selected = selectedProp ?? ownSelected;
  const activate: MenuItemProps["onClick"] = (event) => {
    onClick?.(event);
    if (!choice || rest.disabled || event.defaultPrevented) return;
    const next = type === "checkbox" ? !selected : true;
    if (next === selected) return;
    if (selectedProp === undefined) setOwnSelected(next);
    onSelectedChange?.(next);
  };
  const leading =
    type === "custom" ? leadingSlot ?? null
    : choice ? <MenuItemControl type={type} checked={selected} disabled={Boolean(rest.disabled)} />
    : leadingIcon ? <Icon name={leadingIcon} /> : null;

  return (
    <Menu.Item
      ref={ref}
      {...rest}
      className={["zds-menu-item", className].filter(Boolean).join(" ")}
      data-type={type}
      data-rounded={isRounded}
      // A choice keeps the menu open, so several options can be set in one go.
      closeOnClick={closeOnClick ?? !choice}
      onClick={activate}
      data-selected={selected || undefined}
      role={choice ? (type === "checkbox" ? "menuitemcheckbox" : "menuitemradio") : undefined}
      aria-checked={choice ? selected : undefined}
    >
      {leading ? <span className="zds-menu-item__leading">{leading}</span> : null}
      <span className="zds-menu-item__label">{children}</span>
      {trailingIcon ? (
        <Icon className="zds-menu-item__trailing" name={trailingIcon} />
      ) : null}
    </Menu.Item>
  );
});
