import * as React from "react";
import { Icon } from "../icon/Icon.js";
import "./stepper.css";

/* EXPERIMENTAL — no spec yet. Built from the "Stepper Experimental" Figma page
   (Stepper + _Step, _Step Indicator, _Step Line): every value is the token
   that page binds. */

/** Where a step stands. `partial` is started but not finished; `error` needs attention. */
export type StepStatus = "upcoming" | "complete" | "partial" | "active" | "error" | "disabled";
export type StepperOrientation = "horizontal" | "vertical";
/** `desktop` lists every step; `mobile` shows only the current one with a segmented progress bar. */
export type StepperLayout = "desktop" | "mobile";

export interface StepperStep {
  label: string;
  /** A line under the label. Figma shows it on the active step. */
  subtitle?: string;
  status: StepStatus;
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  steps: StepperStep[];
  orientation?: StepperOrientation;
  layout?: StepperLayout;
  /** Called with a step's index when it is chosen. Steps already reached (complete, partial, error) become buttons; upcoming, active and disabled ones stay text. */
  onStepSelect?: (index: number) => void;
  /** Accessible name of the list. */
  label?: string;
  className?: string;
}

const STATUS_TEXT: Record<StepStatus, string> = {
  upcoming: "not started", complete: "complete", partial: "in progress", active: "current step", error: "needs attention", disabled: "unavailable",
};

/**
 * Progress through a fixed sequence: a numbered marker per step joined by a
 * line, the label beside or under it. Complete steps show a check and a green
 * line behind them; the active step is filled; an error shows the priority
 * glyph. On mobile it collapses to "Step n of m", the current step's name and
 * a segmented bar.
 *
 * An ordered list; the active step carries `aria-current="step"` and every
 * marker's meaning is also in words for assistive tech. With `onStepSelect`
 * the steps already reached become buttons, for going back to them.
 */
export const Stepper = React.forwardRef<HTMLElement, StepperProps>(function Stepper(
  { steps, orientation = "horizontal", layout = "desktop", onStepSelect, label = "Progress", className, ...rest },
  ref,
) {
  const current = Math.max(0, steps.findIndex((s) => s.status === "active"));
  const cls = ["zds-stepper", className].filter(Boolean).join(" ");

  if (layout === "mobile") {
    const step = steps[current];
    return (
      <nav ref={ref} {...rest} className={cls} data-layout="mobile" aria-label={label}>
        <div className="zds-stepper__summary">
          <span className="zds-stepper__count">{`Step ${current + 1} of ${steps.length}`}</span>
          <span className="zds-stepper__label" data-status="active">{step?.label}</span>
          {step?.subtitle ? <span className="zds-stepper__subtitle">{step.subtitle}</span> : null}
        </div>
        <ol className="zds-stepper__segments">
          {steps.map((s, i) => (
            <li key={i} className="zds-stepper__segment" data-status={s.status}>
              <span className="zds-stepper__sr">{`${s.label}, ${STATUS_TEXT[s.status]}`}</span>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav ref={ref} {...rest} className={cls} data-layout="desktop" data-orientation={orientation} aria-label={label}>
      <ol className="zds-stepper__list">
        {steps.map((s, i) => {
          const marker = (
            <span className="zds-stepper__indicator" aria-hidden="true">
              {s.status === "complete" ? <Icon name="check-mark" size="small" />
                : s.status === "error" ? <Icon name="priority" size="small" />
                : i + 1}
            </span>
          );
          const text = (
            <span className="zds-stepper__text">
              <span className="zds-stepper__label">{s.label}</span>
              {s.subtitle ? <span className="zds-stepper__subtitle">{s.subtitle}</span> : null}
              <span className="zds-stepper__sr">{`, ${STATUS_TEXT[s.status]}`}</span>
            </span>
          );
          const interactive = onStepSelect && (s.status === "complete" || s.status === "partial" || s.status === "error");
          return (
            <li key={i} className="zds-stepper__step" data-status={s.status} aria-current={s.status === "active" ? "step" : undefined}>
              <span className="zds-stepper__rail">
                {i > 0 ? <span className="zds-stepper__line" data-side="before" data-done={steps[i - 1].status === "complete" || steps[i - 1].status === "partial" ? "" : undefined} /> : null}
                {marker}
                {i < steps.length - 1 ? <span className="zds-stepper__line" data-side="after" data-done={s.status === "complete" || s.status === "partial" ? "" : undefined} /> : null}
              </span>
              {interactive ? (
                <button type="button" className="zds-stepper__button" onClick={() => onStepSelect(i)}>{text}</button>
              ) : text}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
