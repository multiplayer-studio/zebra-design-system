import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { IconName } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { NavigationHeader, type NavigationHeaderProps } from "../navigation-rail/NavigationHeader.js";
import { Scrim } from "../scrim/Scrim.js";
import { NavigationRailContext, type NavigationRailShape } from "../navigation-rail/context.js";
import "./navigation-drawer.css";

/** Which edge the drawer comes from. `start` is the left edge in a left-to-right page. */
export type NavigationDrawerSide = "start" | "end";
/** Why the drawer opened or closed. `navigate` is a destination being chosen. */
export type NavigationDrawerOpenChangeReason = "trigger" | "close" | "escape" | "backdrop" | "navigate" | "other";

const REASON: Record<string, NavigationDrawerOpenChangeReason> = {
  "trigger-press": "trigger",
  "close-press": "close",
  "escape-key": "escape",
  "outside-press": "backdrop",
};

export interface NavigationDrawerProps {
  /**
   * `true` (default): the drawer slides over the page on a Scrim, traps
   * focus and closes on Escape, a scrim click or a chosen destination.
   * `false`: a standard drawer that sits in the layout beside the content
   * and pushes it, opening and closing in place.
   */
  modal?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called whenever the drawer opens or closes, with why. */
  onOpenChange?: (open: boolean, reason: NavigationDrawerOpenChangeReason) => void;
  /** The edge it comes from. */
  side?: NavigationDrawerSide;
  /** Escape and a scrim click close a modal drawer. */
  dismissible?: boolean;
  /** Choosing a destination (a link or button in the menu or footer) closes a modal drawer. */
  closeOnNavigate?: boolean;
  /**
   * Turns the NavigationHeader's trailing Icon Button into the close button
   * (the `close` glyph and `closeLabel`), replacing its usual action. There is
   * no separate close control: without a NavigationHeader in `header`, nothing
   * is added.
   */
  showClose?: boolean;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** The element that opens a modal drawer, usually the header's menu IconButton. Focus returns to it on close. */
  trigger?: React.ReactElement;
  /** Accessible name of the `<nav>` landmark, and of the modal drawer. */
  navLabel?: string;
  /** Top of the drawer: normally a NavigationHeader. */
  header?: React.ReactNode;
  /** A full-width primary Button under the header, for a create or compose entry point. Unset, there is none. */
  actionLabel?: string;
  /** The action's glyph. */
  actionIcon?: IconName;
  /** Called when the action is pressed. */
  onAction?: () => void;
  /** The menu: SubMenuItems, CollapsibleMenuItems and Dividers. Never scrolls on its own. */
  children?: React.ReactNode;
  /** SubMenuItems after the menu (settings, help, sign out). Not frozen: it scrolls with the menu, and sits at the bottom only when the content is short. */
  footer?: React.ReactNode;
  /** Corner shape of every item, group and button inside. The drawer itself is never rounded. */
  shape?: NavigationRailShape;
  /** The drawer's width: a CSS length or a number in px. 320px by default, never wider than the viewport less a strip of page. */
  width?: number | string;
  /** Where a modal drawer mounts. Defaults to `document.body`; pass the themed root when theme classes sit below `<body>`. */
  portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
  className?: string;
  style?: React.CSSProperties;
}

const cssLength = (v: number | string | undefined) =>
  v === undefined || v === "" ? undefined : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v);

/** A click on something that navigates: a link, or a button that is not a group header. */
function isDestination(target: EventTarget | null, root: Element): boolean {
  const el = (target as Element | null)?.closest?.("a[href], button");
  if (!el || !root.contains(el)) return false;
  if (el.hasAttribute("aria-expanded") || el.getAttribute("aria-disabled") === "true" || (el as HTMLButtonElement).disabled) return false;
  return !el.closest("[data-zds-drawer-keep-open]");
}

/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family rather than new parts: put a
 * NavigationHeader at the top, then SubMenuItems for destinations,
 * CollapsibleMenuItems for groups and Dividers in the menu and footer. The
 * drawer has no collapsed form, so every row is a SubMenuItem (a group's
 * header is one too) and glyphs, labels and heights line up; use
 * NavigationRailItem in the rail, not here (owner decision). The drawer
 * hands its `shape` down through the rail's context. Unlike the rail, the
 * drawer follows the page's colour mode; it is not locked to dark.
 *
 * Modal (default): Base UI's Dialog provides the focus trap, initial focus,
 * focus return to the trigger, Escape and outside-click dismissal, scroll
 * lock and the portal. The backdrop is the Scrim component (tone scrim). The
 * drawer slides in from its edge with animations/smooth, and not at all
 * under reduced motion. Choosing a destination closes it.
 *
 * Standard (`modal={false}`): a plain `<nav>` in the layout. Closed, it
 * narrows to nothing and is inert, so the content beside it takes the space.
 *
 * Scrolling (owner decision): only the header is frozen, sticky at the top.
 * The menu never scrolls on its own and the footer is never pinned; it
 * follows the menu. A standard drawer grows with its content and the page
 * scrolls it; a modal drawer scrolls as one surface with no scrollbar.
 *
 * Surface: the modal drawer is raised like Dialog (surface/overlay,
 * shadow/large); the standard one sits on surface/section like the rail.
 * No width token exists, so the 320px default is a literal named once in
 * the CSS.
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.md
 */
export const NavigationDrawer = React.forwardRef<HTMLElement, NavigationDrawerProps>(function NavigationDrawer(
  {
    modal = true,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    side = "start",
    dismissible = true,
    closeOnNavigate = true,
    // Spec: the header's close button shows by default (Figma Show Icon Button = true).
    showClose = true,
    closeLabel = "Close navigation",
    trigger,
    navLabel = "Main",
    header,
    actionLabel,
    actionIcon = "add-circle-outline",
    onAction,
    children,
    footer,
    shape = "rounded",
    width,
    portalContainer,
    className,
    style,
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const setOpen = (next: boolean, reason: NavigationDrawerOpenChangeReason) => {
    if (openProp === undefined) setInnerOpen(next);
    onOpenChange?.(next, reason);
  };

  // Nothing animates on mount, so a drawer that starts open doesn't slide in.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // The rail's parts render wide and take this shape; modeClass null = follow the page.
  const ctx = React.useMemo(() => ({ expanded: true, showLabels: false, shape, modeClass: null }), [shape]);

  // The close button is the header's own Icon Button (owner decision): one
  // treatment, aligned with the title, never a separate control.
  const closable = showClose && React.isValidElement<NavigationHeaderProps>(header) && header.type === NavigationHeader;
  const headerNode = closable
    ? React.cloneElement(header as React.ReactElement<NavigationHeaderProps>, {
        showIconButton: true,
        actionIcon: "close",
        actionLabel: closeLabel,
        onAction: () => setOpen(false, "close"),
      })
    : header;

  // A click on a destination closes a modal drawer; the header's close button reports "close" itself.
  const onPanelClick = (e: React.MouseEvent<HTMLElement>) => {
    if (closable && (e.target as Element).closest?.(".zds-navigation-header")) return;
    if (closeOnNavigate && isDestination(e.target, e.currentTarget)) setOpen(false, "navigate");
  };

  const body = (
    <NavigationRailContext.Provider value={ctx}>
      {header != null || actionLabel ? (
        <div className="zds-navigation-drawer__header">
          {headerNode}
          {actionLabel ? (
            <Button className="zds-navigation-drawer__action" size="large" shape={shape} flavour="primary" leadingIcon={actionIcon} onClick={onAction} data-zds-drawer-keep-open="">
              {actionLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className="zds-navigation-drawer__menu">{children}</div>
      {footer != null ? <div className="zds-navigation-drawer__footer">{footer}</div> : null}
    </NavigationRailContext.Provider>
  );

  const shared = {
    className: ["zds-navigation-drawer", className].filter(Boolean).join(" "),
    "data-side": side,
    "data-shape": shape,
    "data-ready": ready ? "" : undefined,
    style: { ...style, "--zds-navigation-drawer-width": cssLength(width) } as React.CSSProperties,
  };

  if (!modal) {
    return (
      <nav
        ref={ref}
        aria-label={navLabel}
        {...shared}
        data-modal={undefined}
        data-open={open ? "" : undefined}
        // Closed, nothing inside is reachable by Tab or assistive tech.
        inert={!open || undefined}
      >
        <div className="zds-navigation-drawer__panel">{body}</div>
      </nav>
    );
  }

  return (
    <BaseDialog.Root
      open={open}
      disablePointerDismissal={!dismissible}
      onOpenChange={(next, details) => {
        if (!dismissible && !next && (details.reason === "escape-key" || details.reason === "outside-press")) {
          details.cancel();
          return;
        }
        setOpen(next, REASON[details.reason] ?? "other");
      }}
    >
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={portalContainer}>
        <BaseDialog.Backdrop className="zds-navigation-drawer__backdrop" render={<Scrim tone="scrim" />} />
        <BaseDialog.Popup
          ref={ref as React.Ref<HTMLDivElement>}
          {...shared}
          data-modal=""
          aria-label={navLabel}
          onClick={onPanelClick}
        >
          <nav aria-label={navLabel} className="zds-navigation-drawer__panel">
            {body}
          </nav>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});
