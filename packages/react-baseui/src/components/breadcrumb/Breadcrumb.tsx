import * as React from "react";
import { Dropdown } from "../dropdown/Dropdown.js";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { MenuItem } from "../menu-item/MenuItem.js";
import "./breadcrumb.css";

export type BreadcrumbShape = "rounded" | "sharp";
/** `default` sets the current page in the primary foreground; `accent` sets it and its icon in blue. */
export type BreadcrumbFlavour = "default" | "accent";

export interface BreadcrumbItem {
  label: string;
  /** Where the crumb goes. Without one it is a button, for `onSelect`. */
  href?: string;
  /** A glyph before the label. */
  icon?: IconName;
  /** Called when the crumb is chosen, from the trail or from the overflow menu. */
  onSelect?: () => void;
}

export interface BreadcrumbProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "className" | "children" | "onSelect"> {
  /** The path, root first. The last item is the current page. */
  items: BreadcrumbItem[];
  /** How many crumbs show before the middle collapses into the overflow menu: the first, then the rest from the end. Unset shows them all. */
  maxItems?: number;
  /** How the current page stands out. */
  flavour?: BreadcrumbFlavour;
  /** Corners of the overflow control and its menu. */
  shape?: BreadcrumbShape;
  /** Accessible name of the trail. */
  label?: string;
  /** Accessible name of the overflow control. */
  overflowLabel?: string;
  /** Where the overflow menu mounts, for a theme scoped below `<body>`. */
  portalContainer?: React.ComponentProps<typeof Dropdown>["portalContainer"];
  className?: string;
}

const Separator = () => <Icon className="zds-breadcrumb__separator" name="chevron-right" size="small" iconStyle="rounded" />;

function Crumb({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  const content = (
    <>
      {item.icon ? <Icon className="zds-breadcrumb__icon" name={item.icon} size="small" iconStyle="rounded" /> : null}
      {item.label}
    </>
  );
  if (current) return <span className="zds-breadcrumb__crumb" aria-current="page">{content}</span>;
  if (item.href) return <a className="zds-breadcrumb__crumb" href={item.href} onClick={item.onSelect}>{content}</a>;
  return <button type="button" className="zds-breadcrumb__crumb" onClick={item.onSelect}>{content}</button>;
}

/**
 * Where a page sits in the hierarchy, as a trail of links back up to the root,
 * ending on the current page. `maxItems` collapses the middle of a long trail
 * into an overflow menu, which keeps every crumb reachable.
 *
 * A labelled `nav` holding an ordered list, with `aria-current="page"` on the
 * last item. Separators are decorative.
 *
 * Departures from Figma, each a spec issue:
 * - `collapsed` and `open` are derived, from `maxItems` and the menu, not props.
 * - `overflowLabel` names the overflow control, which Figma leaves unnamed.
 *
 * Kept in step with packages/web-components `<zds-breadcrumb>`.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.md
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, maxItems, flavour = "default", shape = "rounded", label = "Breadcrumb", overflowLabel = "Show hidden pages", portalContainer, className, ...rest },
  ref,
) {
  const kept = Math.max(maxItems ?? items.length, 2);
  const collapsed = items.length > kept;
  const hidden = collapsed ? items.slice(1, items.length - kept + 1) : [];
  const trailing = collapsed ? items.slice(items.length - kept + 1) : items.slice(1);
  const last = items.length - 1;

  const select = (item: BreadcrumbItem) => {
    item.onSelect?.();
    if (item.href) window.location.assign(item.href);
  };

  return (
    <nav ref={ref} aria-label={label} {...rest} className={["zds-breadcrumb", className].filter(Boolean).join(" ")} data-shape={shape} data-flavour={flavour}>
      <ol className="zds-breadcrumb__list">
        {items.length ? (
          <li className="zds-breadcrumb__item">
            <Crumb item={items[0]} current={last === 0} />
            {last > 0 ? <Separator /> : null}
          </li>
        ) : null}
        {collapsed ? (
          <li className="zds-breadcrumb__item">
            <Dropdown compact rounded={shape === "rounded"} portalContainer={portalContainer} trigger={<IconButton flavour="outline-subtle" size="small" shape={shape} icon="more-horizontal" label={overflowLabel} />}>
              {hidden.map((item) => (
                <MenuItem key={`${item.label}-${item.href ?? ""}`} leadingIcon={item.icon} onClick={() => select(item)}>{item.label}</MenuItem>
              ))}
            </Dropdown>
            <Separator />
          </li>
        ) : null}
        {trailing.map((item, index) => (
          <li key={`${item.label}-${item.href ?? ""}`} className="zds-breadcrumb__item">
            <Crumb item={item} current={index === trailing.length - 1} />
            {index < trailing.length - 1 ? <Separator /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
});
