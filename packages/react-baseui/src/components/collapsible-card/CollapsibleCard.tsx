import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./collapsible-card.css";

export type CollapsibleCardShape = "sharp" | "rounded";
export type CollapsibleCardFlavor = "default" | "gradient";

export interface CollapsibleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** Corner treatment. */
  shape?: CollapsibleCardShape;
  /** Plain, or outlined with the brand gradient to draw the eye. Use gradient for at most one card in a group. */
  flavor?: CollapsibleCardFlavor;
  /** The title, always visible in the header. */
  heading: React.ReactNode;
  /** Marks the heading as required with a trailing asterisk. */
  required?: boolean;
  /**
   * Supporting text under the heading. Figma's header now has a real
   * `showDescription` toggle (default true) for this — this component
   * derives the same thing from whether `description` was passed, rather
   * than adding a second prop to keep in sync with it.
   */
  description?: React.ReactNode;
  /** Controlled expanded state. Omit to let the card manage its own state. */
  expanded?: boolean;
  /** Initial expanded state when uncontrolled. */
  defaultExpanded?: boolean;
  /** Called whenever the header is activated, controlled or not. */
  onExpandedChange?: (expanded: boolean) => void;
  /** The body, revealed only while expanded. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this component implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * component's own responsibility (a native `button`), since Figma models
 * none of them.
 *
 * @spec specs/card/card.spec.md
 */
export const CollapsibleCard = React.forwardRef<HTMLDivElement, CollapsibleCardProps>(function CollapsibleCard(
  {
    shape = "sharp",
    flavor = "default",
    heading,
    required = true,
    description,
    expanded: expandedProp,
    defaultExpanded = false,
    onExpandedChange,
    children,
    className,
    ...rest
  },
  ref,
) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? uncontrolledExpanded;

  const toggle = () => {
    const next = !expanded;
    if (expandedProp === undefined) setUncontrolledExpanded(next);
    onExpandedChange?.(next);
  };

  // The icon follows the card's shape, matching Button's own convention.
  const iconStyle = shape === "sharp" ? "sharp" : "rounded";

  return (
    <div
      ref={ref}
      {...rest}
      className={["zds-collapsible-card", className].filter(Boolean).join(" ")}
      data-shape={shape}
      data-flavour={flavor}
    >
      <button
        type="button"
        className="zds-collapsible-card__header"
        aria-expanded={expanded}
        onClick={toggle}
      >
        <Icon
          className="zds-collapsible-card__chevron"
          // expand-more's own glyph sits high in its box with dead space
          // below, which reads as top-aligned no matter how the box itself
          // is centered; chevron-right is optically centered, so it's
          // rotated instead of swapping glyphs on toggle.
          name="chevron-right"
          iconStyle={iconStyle}
          size="large"
          data-expanded={expanded || undefined}
        />
        <span className="zds-collapsible-card__text">
          <span className="zds-collapsible-card__heading">
            {heading}
            {required ? (
              <span className="zds-collapsible-card__required" aria-hidden="true">
                {" *"}
              </span>
            ) : null}
          </span>
          {description ? <span className="zds-collapsible-card__description">{description}</span> : null}
        </span>
      </button>
      {expanded ? <div className="zds-collapsible-card__body">{children}</div> : null}
    </div>
  );
});
