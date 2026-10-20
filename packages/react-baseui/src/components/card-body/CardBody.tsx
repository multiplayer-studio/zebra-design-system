import * as React from "react";
import "./card-body.css";

export interface CardBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  className?: string;
}

/**
 * A plain padded text block for Card's body slot.
 *
 * @spec specs/card/card.spec.md
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={["zds-card-body", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
});
