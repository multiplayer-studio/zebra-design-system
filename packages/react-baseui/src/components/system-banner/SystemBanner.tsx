import * as React from "react";
import { Icon, type IconName } from "../icon/Icon.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import "./system-banner.css";

/** `mobile` is System Banner (Mobile), `desktop` is System Banner (Desktop): one component, two Figma sets. */
export type SystemBannerLayout = "desktop" | "mobile";
/** Figma's Status. `default` is the success colour, despite the name. */
export type SystemBannerStatus = "default" | "negative" | "warning" | "info";
/** The container's shape. Every control inside the banner takes it; the banner itself stays square (spec: shapeInheritance). */
export type SystemBannerShape = "rounded" | "sharp";

/** Desktop's glyph follows Status (spec: variants byStatus); Mobile holds Verified on all four. */
const STATUS_ICON: Record<SystemBannerStatus, IconName> = {
  default: "check-circle",
  negative: "error",
  warning: "warning",
  info: "info",
};

/**
 * The motion (spec: Motion). In, the banner's height opens from nothing while
 * the row slides down from above, so everything below is pushed down rather
 * than covered; out plays it in reverse and pulls the content back up. Both
 * 400ms, easing out on the way in and in on the way out (no motion token
 * yet); reduced motion fades instead. Resolves true when the motion finished,
 * false when it was interrupted.
 */
function slide(banner: HTMLElement, row: HTMLElement, direction: "in" | "out"): Promise<boolean> {
  if (typeof banner.animate !== "function") return Promise.resolve(true);
  banner.getAnimations().forEach((a) => a.cancel());
  row.getAnimations().forEach((a) => a.cancel());
  const into = direction === "in";
  const settle = (a: Animation) => a.finished.then(() => true, () => false);
  if (typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const fade = [{ opacity: 0 }, { opacity: 1 }];
    return settle(banner.animate(into ? fade : fade.reverse(), { duration: 200, easing: "ease-out", fill: into ? "none" : "forwards" }));
  }
  const height = banner.getBoundingClientRect().height;
  // Out holds its collapsed end state until the banner is hidden.
  const timing: KeyframeAnimationOptions = into
    ? { duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" }
    : { duration: 400, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" };
  const open = [{ height: "0px" }, { height: `${height}px` }];
  const drop = [{ transform: "translateY(-100%)" }, { transform: "none" }];
  banner.style.overflow = "hidden";
  const anim = banner.animate(into ? open : open.reverse(), timing);
  row.animate(into ? drop : drop.reverse(), timing);
  return settle(anim).then((done) => {
    if (done && into) banner.style.overflow = "";
    return done;
  });
}

const SHAPED: readonly unknown[] = [Button, IconButton];

/** Pass the banner's shape to every Button / IconButton in `actions` (top level or inside a fragment). */
function shapeActions(node: React.ReactNode, shape: SystemBannerShape): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement<{ shape?: string; children?: React.ReactNode }>(child)) return child;
    if (child.type === React.Fragment) return <>{shapeActions(child.props.children, shape)}</>;
    return SHAPED.includes(child.type) ? React.cloneElement(child, { shape }) : child;
  });
}

export interface SystemBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "role"> {
  /** Which Figma set it draws: the mobile screen banner or the desktop view banner. */
  layout?: SystemBannerLayout;
  /** Sets the background. negative carries no dismiss, so it stays until the condition clears. */
  status?: SystemBannerStatus;
  /** Rounded or sharp, from the container. The actions and the dismiss take it; the banner's own corners stay square. */
  shape?: SystemBannerShape;
  /** The headline: what happened. */
  title: React.ReactNode;
  /** The supporting line. On desktop it turns the banner multiline (Figma's Content Type). */
  description?: React.ReactNode;
  /** Keeps the status glyph so the banner survives greyscale. */
  showLeadingIcon?: boolean;
  /** Mobile only: the glyph is chosen per use (Figma holds Verified). Desktop's follows Status. */
  icon?: IconName;
  /** The controls the message needs, typically one small outline-contrast Button. The banner sets its shape. */
  actions?: React.ReactNode;
  /** Lets the person dismiss the banner. Ignored on negative. */
  showClose?: boolean;
  /** Accessible name for the dismiss control. */
  closeLabel?: string;
  /** Shows the banner. Turning it false plays the reveal in reverse and then hides it; true again replays the reveal. */
  open?: boolean;
  /** The dismiss was pressed. The banner plays the reverse and hides first, then calls this. What happens next is the product's decision. */
  onClose?: () => void;
  className?: string;
}

/**
 * A full-width message pinned to the top of a screen or view, carrying a
 * status colour, a title, an optional description and an optional action.
 * It spans its container and stays until something clears it.
 *
 * Locked to Dark (spec: modeLock): Figma pins palette=Dark on every variant,
 * so the root always carries .mode-dark and every element inside, the
 * dismiss IconButton and anything in `actions` included, resolves dark
 * tokens whatever mode the page is in. That is what keeps the
 * foreground/primary text and the outline-contrast action white on the
 * strong feedback colours.
 *
 * Mobile and Desktop are two Figma sets with different APIs (spec issue
 * "api (sibling sets)"); here they are one component with `layout`:
 * Desktop's Content Type is the presence of `description`, Mobile's Show
 * Description likewise, and Title is a prop on both. The banner has no
 * interaction states of its own; the dismiss is a subtle sharp IconButton,
 * medium on mobile and small on desktop.
 *
 * One shape (spec: shapeInheritance): `shape` comes from the container and
 * reaches the dismiss
 * and every Button / IconButton in `actions`; no control keeps its own.
 *
 * It reveals by sliding in from the top and pushing the content below down,
 * and removal plays that in reverse (spec: Motion): the dismiss, or `open`
 * turned false. `open` true again replays the reveal.
 *
 * Announced politely (role=status), negative interrupts (role=alert). The
 * metadata leaves announcement to the product; a live region does it for
 * free when the banner is inserted.
 *
 * Kept in step with packages/web-components `<zds-system-banner>`.
 *
 * @spec specs/system-banner-mobile/system-banner-mobile.spec.md
 * @spec specs/system-banner-desktop/system-banner-desktop.spec.md
 */
export const SystemBanner = React.forwardRef<HTMLDivElement, SystemBannerProps>(function SystemBanner(
  { layout = "desktop", status = "default", shape = "sharp", title, description, showLeadingIcon = true, icon = "verified", actions, showClose = true, closeLabel = "Dismiss", open = true, onClose, className, ...rest },
  ref,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  // Rendered while shown; hidden only after the reverse has played.
  const [visible, setVisible] = React.useState(open);
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (open === prevOpen.current) return;
    prevOpen.current = open;
    if (open) setVisible(true);
    else if (rootRef.current && rowRef.current) slide(rootRef.current, rowRef.current, "out").then((done) => { if (done) setVisible(false); });
    else setVisible(false);
  }, [open]);
  // Before paint, so the first frame is already the collapsed one.
  React.useLayoutEffect(() => {
    if (visible && rootRef.current && rowRef.current) slide(rootRef.current, rowRef.current, "in");
  }, [visible]);
  const dismiss = () => {
    const finish = () => { setVisible(false); onClose?.(); };
    if (rootRef.current && rowRef.current) slide(rootRef.current, rowRef.current, "out").then((done) => { if (done) finish(); });
    else finish();
  };
  const mobile = layout === "mobile";
  const glyph = mobile ? icon : STATUS_ICON[status];
  // negative removes the dismiss outright (spec: Show Close has no effect on negative).
  const close = showClose && status !== "negative";
  if (!visible) return null;
  return (
    <div
      ref={setRefs}
      {...rest}
      role={status === "negative" ? "alert" : "status"}
      className={["zds-system-banner", "mode-dark", className].filter(Boolean).join(" ")}
      data-layout={layout}
      data-status={status}
      data-shape={shape}
      data-content={description ? "multiline" : "single"}
    >
      <div ref={rowRef} className="zds-system-banner__row">
        {showLeadingIcon ? (
          <span className="zds-system-banner__glyph">
            <Icon name={glyph} size="medium" framed={mobile} />
          </span>
        ) : null}
        <div className="zds-system-banner__content">
          <div className="zds-system-banner__text">
            <span className="zds-system-banner__title">{title}</span>
            {description ? <span className="zds-system-banner__description">{description}</span> : null}
          </div>
          {actions ? <div className="zds-system-banner__actions">{shapeActions(actions, shape)}</div> : null}
        </div>
        {close ? (
          <IconButton
            className="zds-system-banner__dismiss"
            flavour="subtle"
            shape={shape}
            size={mobile ? "medium" : "small"}
            icon="close"
            label={closeLabel}
            onClick={dismiss}
          />
        ) : null}
      </div>
    </div>
  );
});
