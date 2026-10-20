import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Icon, type IconName } from "../icon/Icon.js";
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
   * Naming convention only — per the spec's `internalVariations`, Icon,
   * checkbox and radio share the exact same exposed Icon instance with no
   * anatomy difference; Figma models no visual delta between them. This
   * package treats `type` as a real prop anyway (a documentation hook for
   * consumers and a hook for `data-type` in CSS) rather than dropping it,
   * but it draws no checkbox/radio control — set a checkmark/radio glyph on
   * `leadingIcon` yourself if you want one to read as chosen.
   */
  type?: MenuItemType;
  /** Glyph in the leading position. Undefined hides it (spec: `leadingElement`). Ignored when `type="custom"`. */
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
   * Marks the row as the currently-chosen option. Base UI's plain `Menu.Item`
   * carries no selection state of its own (that lives on `CheckboxItem` /
   * `RadioItem`, which the spec explicitly says not to use here since
   * `type=checkbox`/`radio` draw no real control) — so selection is tracked
   * as a plain prop and painted as the spec's faint background tint.
   */
  selected?: boolean;
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
export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  {
    type = "icon",
    leadingIcon,
    trailingIcon,
    leadingSlot,
    rounded,
    selected = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const inheritedRounded = React.useContext(MenuItemRoundedContext);
  const isRounded = rounded ?? inheritedRounded;

  const leading =
    type === "custom" ? leadingSlot ?? null : leadingIcon ? <Icon name={leadingIcon} /> : null;

  return (
    <Menu.Item
      ref={ref}
      {...rest}
      className={["zds-menu-item", className].filter(Boolean).join(" ")}
      data-type={type}
      data-rounded={isRounded}
      data-selected={selected || undefined}
    >
      {leading ? <span className="zds-menu-item__leading">{leading}</span> : null}
      <span className="zds-menu-item__label">{children}</span>
      {trailingIcon ? (
        <Icon className="zds-menu-item__trailing" name={trailingIcon} />
      ) : null}
    </Menu.Item>
  );
});
