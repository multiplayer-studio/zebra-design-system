import * as React from "react";
import "./card-heading.css";

export interface CardHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  /** The title. */
  heading: React.ReactNode;
  /** Supporting text under the heading. */
  subheading?: React.ReactNode;
  /** Leading slot — an Avatar in the spec's own default, but anything fits. */
  leadingContent?: React.ReactNode;
  /** Trailing slot — an icon button in the spec's own default, but anything fits. */
  trailingContent?: React.ReactNode;
  className?: string;
}

/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for Card's header slot (and reused inside the body
 * slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this component derives visibility from whether `leadingContent` /
 * `trailingContent` was passed, since a consumer would otherwise have to keep
 * two props in sync for one decision.
 *
 * @spec specs/card/card.spec.md
 */
export const CardHeading = React.forwardRef<HTMLDivElement, CardHeadingProps>(function CardHeading(
  { heading, subheading, leadingContent, trailingContent, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={["zds-card-heading", className].filter(Boolean).join(" ")}>
      {leadingContent ? <div className="zds-card-heading__leading">{leadingContent}</div> : null}
      <div className="zds-card-heading__text">
        <div className="zds-card-heading__heading">{heading}</div>
        {subheading ? <div className="zds-card-heading__subheading">{subheading}</div> : null}
      </div>
      {trailingContent ? <div className="zds-card-heading__trailing">{trailingContent}</div> : null}
    </div>
  );
});
