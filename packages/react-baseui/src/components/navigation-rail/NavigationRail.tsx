import * as React from "react";
import type { IconName } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { NavigationRailItem } from "../navigation-rail-item/NavigationRailItem.js";
import { NavigationRailContext, type NavigationRailModeClass, type NavigationRailShape } from "./context.js";
import "./navigation-rail.css";

/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion or before the rail is ready). */
function motionMs(el: Element | null): number {
  if (!el) return 0;
  const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
  const n = parseFloat(d);
  return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}

export interface NavigationRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /** The wide rail (labels beside glyphs) — controlled. */
  expanded?: boolean;
  /** The wide rail at first — uncontrolled. */
  defaultExpanded?: boolean;
  /** Called when the toggle item is pressed, with the next `expanded`. */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * Captions under the glyphs in the narrow rail (Figma's `Label`). With
   * `expanded` the labels show beside the glyphs anyway, so the combination
   * Figma never built simply works.
   */
  showLabels?: boolean;
  /**
   * The last footer item, which moves between narrow and wide. Only hide it
   * when something outside the rail controls `expanded`.
   */
  showToggleItem?: boolean;
  /**
   * The divider down the rail's trailing edge, between the rail and the
   * page. Hide it when the rail's neighbour already draws that edge.
   */
  showDivider?: boolean;
  /** Toggle label in the narrow rail. */
  expandLabel?: string;
  /** Toggle label in the wide rail. */
  collapseLabel?: string;
  /**
   * The corner shape of everything nested in the rail: slot items, Collapsible
   * Menu Items, the header action, and the Buttons and Icon Buttons inside
   * Navigation Header and Sub Menu Header (including the back button).
   * rounded = `radius/sm`, sharp = `radius/none`. The rail itself has no
   * corners and is unaffected. Code-only — Figma has no counterpart.
   */
  shape?: NavigationRailShape;
  /**
   * The rail follows the page's mode. `inverse` shows it in the opposite
   * shade instead: dark on a light page, light on a dark one. The contrast
   * level (AA or AAA) still follows the page, and everything inside the rail
   * follows the rail. Code-only.
   */
  inverse?: boolean;
  /**
   * Keeps the rail in one mode whatever the page's mode: dark, or light with
   * `inverse`. The contrast level (AA or AAA) still follows the page.
   * Code-only.
   */
  locked?: boolean;
  /**
   * The wide rail's width. 200px by default (Figma's measure); the project
   * sets its own as a CSS length or a number in px, or `"fill"` to take the
   * width of the rail's container. The narrow icon rail is unaffected.
   */
  railWidth?: number | string;
  /**
   * Caps the wide rail's width; the narrow icon rail is unaffected. A CSS
   * length, or a number in px. Wide labels truncate.
   */
  railMaxWidth?: number | string;
  /**
   * Caps the sub menu panel's width. The panel still hugs its list, up to
   * this width; longer rows truncate (full label in a tooltip after a 3s
   * hover). A cap below 240px also lowers the 240px minimum. A CSS length,
   * or a number in px.
   */
  subMenuMaxWidth?: number | string;
  /** Accessible name of the `<nav>` landmark. */
  navLabel?: string;
  /** Top of the rail: normally a NavigationHeader (it follows `expanded`). */
  header?: React.ReactNode;
  /**
   * The header action's label — a create/compose entry point, not a
   * destination. Icon Button in the narrow rail, Button in the wide one.
   * Unset, there is no action (Figma's showHeaderAction).
   */
  actionLabel?: string;
  /** The header action's glyph. */
  actionIcon?: IconName;
  /** Called when the header action is pressed. */
  onAction?: () => void;
  /** The menu: NavigationRailItems (and Dividers). Absorbs the free height. */
  children?: React.ReactNode;
  /** Destinations pinned to the bottom, above the toggle item. */
  footer?: React.ReactNode;
  /** The sub menu panel's title bar: normally a SubMenuHeader. */
  subMenuHeader?: React.ReactNode;
  /**
   * The sub menu panel's rows: SubMenuItems and CollapsibleMenuItems. The
   * panel shows when this or `subMenuHeader` is set (Figma's showSubMenu).
   */
  subMenu?: React.ReactNode;
  className?: string;
}

/** A width prop as CSS: a bare number (`180` or "180") is px, any other string passes through. */
/** The page's mode around the rail: the nearest ancestor's `mode-*` class, light and AA when there is none. */
type PageMode = { dark: boolean; aaa: boolean };
const MODE_CLASS = /(?:^|\s)mode-(aaa-)?(light|dark)(?:\s|$)/;
const parentOf = (n: Element): Element | null => {
  if (n.parentElement) return n.parentElement;
  const root = n.getRootNode();
  return root instanceof ShadowRoot ? root.host : null;
};
const readPageMode = (el: Element): PageMode => {
  for (let n = parentOf(el); n; n = parentOf(n)) {
    const m = MODE_CLASS.exec(typeof n.className === "string" ? n.className : "");
    if (m) return { dark: m[2] === "dark", aaa: Boolean(m[1]) };
  }
  return { dark: false, aaa: false };
};
const useBrowserLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

const cssLength = (v: number | string | undefined) =>
  v === undefined || v === "" ? undefined : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);

/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Follows the page's mode by default. `inverse` shows the opposite shade,
 * and `locked` keeps the rail dark (light with `inverse`) whatever the page
 * does. For either, the root carries the token layer's `mode-*` class, so
 * the whole subtree follows it. No part of the rail family portals; a popup
 * you slot in that does can read `useNavigationRailModeClass()` to keep the
 * rail's mode.
 *
 * Regions are slots (header, menu, footer, sub menu header, sub menu); the
 * rail hands its width form and shape down to the items through context. It owns the
 * toggle item and wires it to `expanded` (spec: "Behaviour code must own").
 *
 * No Base UI primitive: NavigationMenu models a menubar whose Triggers open
 * Content in a positioned Viewport popup — not a vertical list whose groups
 * expand in place. So the rail is a plain `<nav>` of links, and groups are
 * Base UI Collapsibles (CollapsibleMenuItem). Every destination stays in the
 * Tab order, as on NavigationBar.
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * given. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * `children`; Rail Item 1–3 / Footer Rail Item are sample content, not parts;
 * moreRailItems / moreFooterItems / showHeaderAction / showSubMenu become
 * "is the slot filled".
 *
 * Kept in step with `<zds-navigation-rail>`.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md
 */
export const NavigationRail = React.forwardRef<HTMLElement, NavigationRailProps>(function NavigationRail(
  {
    expanded: expandedProp,
    defaultExpanded = false,
    onExpandedChange,
    showLabels = false,
    showToggleItem = true,
    showDivider = true,
    expandLabel = "Open",
    collapseLabel = "Close",
    shape = "rounded",
    inverse = false,
    locked = false,
    railWidth,
    railMaxWidth,
    subMenuMaxWidth,
    navLabel = "Main",
    header,
    actionLabel,
    actionIcon = "add-circle-outline",
    onAction,
    footer,
    subMenuHeader,
    subMenu,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [innerExpanded, setInnerExpanded] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? innerExpanded;
  const railRef = React.useRef<HTMLDivElement>(null);

  // Motion (owner decision: animations/smooth). The rail's width animates on
  // [data-expanded]; its content keeps the wide layout until a collapse has
  // finished (`wide`), laid out at its final width and clipped by the
  // narrowing rail, so labels never reflow or wrap mid-animation. Expanding
  // switches the content at once and the widening rail reveals it. With no
  // transition (reduced motion, first render) the switch is immediate.
  const [wideLatch, setWideLatch] = React.useState(expanded);
  React.useEffect(() => {
    if (expanded) {
      setWideLatch(true);
      return;
    }
    const ms = motionMs(railRef.current);
    if (!ms) {
      setWideLatch(false);
      return;
    }
    const t = setTimeout(() => setWideLatch(false), ms);
    return () => clearTimeout(t);
  }, [expanded]);
  const wide = expanded || wideLatch;

  // Transitions only after the first paint, so nothing animates on mount.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  // The rail's mode. By default it sets none and inherits the page's. With
  // `inverse` or `locked` it takes the token layer's own mode class, so its
  // subtree re-resolves every semantic token in that mode and an .ext-*
  // ancestor still applies. Only the root sets it. The page's mode is read
  // from the ancestors' classes and followed when they change: `inverse`
  // needs its shade, and both keep its contrast level (AA or AAA).
  const rootRef = React.useRef<HTMLElement | null>(null);
  const setRootRef = React.useCallback(
    (node: HTMLElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
  const [page, setPage] = React.useState<PageMode>({ dark: false, aaa: false });
  const ownsMode = locked || inverse;
  useBrowserLayoutEffect(() => {
    const el = rootRef.current;
    if (!ownsMode || !el) return;
    const read = () =>
      setPage((prev) => {
        const next = readPageMode(el);
        return prev.dark === next.dark && prev.aaa === next.aaa ? prev : next;
      });
    read();
    const observer = new MutationObserver(read);
    for (let n = parentOf(el); n; n = parentOf(n)) observer.observe(n, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [ownsMode]);
  const dark = locked ? !inverse : inverse ? !page.dark : null;
  const modeClass = dark === null ? null : (`mode-${page.aaa ? "aaa-" : ""}${dark ? "dark" : "light"}` as NavigationRailModeClass);
  // Items take the content form (`wide`), not the target, so they hold the
  // wide layout through a collapse.
  const ctx = React.useMemo(() => ({ expanded: wide, showLabels, shape, modeClass }), [wide, showLabels, shape, modeClass]);
  const hasPanel = subMenu != null || subMenuHeader != null;
  const toggle = () => {
    if (expandedProp === undefined) setInnerExpanded(!expanded);
    onExpandedChange?.(!expanded);
  };

  return (
    <nav
      ref={setRootRef}
      aria-label={navLabel}
      {...rest}
      className={["zds-navigation-rail", modeClass, className].filter(Boolean).join(" ")}
      data-expanded={expanded ? "" : undefined}
      data-wide={wide ? "" : undefined}
      data-ready={ready ? "" : undefined}
      data-show-labels={showLabels ? "" : undefined}
      data-shape={shape}
      data-inverse={inverse ? "" : undefined}
      data-locked={locked ? "" : undefined}
      data-mode={dark === null ? undefined : dark ? "dark" : "light"}
      data-divider={showDivider ? "" : undefined}
      data-fill={railWidth === "fill" ? "" : undefined}
      style={{
        ...style,
        // Unset, the variables stay undeclared and the CSS falls back to no cap.
        "--zds-navigation-rail-width": railWidth === "fill" ? undefined : cssLength(railWidth),
        "--zds-navigation-rail-max-width": cssLength(railMaxWidth),
        "--zds-navigation-rail-sub-menu-max-width": cssLength(subMenuMaxWidth),
      } as React.CSSProperties}
    >
      <NavigationRailContext.Provider value={ctx}>
        <div ref={railRef} className="zds-navigation-rail__rail">
          {header != null || actionLabel ? (
            <div className="zds-navigation-rail__header">
              {header}
              {actionLabel ? (
                // Size=large, Flavour=primary in both forms (spec). Figma pins
                // Shape=rounded; the rail's shape now sets it (owner decision:
                // every nested component follows the rail).
                wide ? (
                  <Button className="zds-navigation-rail__action" size="large" shape={shape} flavour="primary" leadingIcon={actionIcon} onClick={onAction}>
                    {actionLabel}
                  </Button>
                ) : (
                  <IconButton className="zds-navigation-rail__action" size="large" shape={shape} flavour="primary" icon={actionIcon} label={actionLabel} onClick={onAction} />
                )
              ) : null}
            </div>
          ) : null}
          <div className="zds-navigation-rail__menu">{children}</div>
          {footer != null || showToggleItem ? (
            <div className="zds-navigation-rail__footer">
              {footer}
              {showToggleItem ? (
                <NavigationRailItem
                  className="zds-navigation-rail__toggle"
                  icon={expanded ? "left-panel-close" : "left-panel-open"}
                  label={expanded ? collapseLabel : expandLabel}
                  aria-expanded={expanded}
                  onClick={toggle}
                />
              ) : null}
            </div>
          ) : null}
        </div>
        {/* Always rendered so it can animate open and closed (width, on
            [data-open]); closed it is zero-width and visibility: hidden. */}
        <div className="zds-navigation-rail__panel" data-open={hasPanel ? "" : undefined}>
          {subMenuHeader}
          {subMenu != null ? <div className="zds-navigation-rail__sub-menu">{subMenu}</div> : null}
        </div>
      </NavigationRailContext.Provider>
    </nav>
  );
});
