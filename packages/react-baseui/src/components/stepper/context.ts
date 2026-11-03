import * as React from "react";

export type StepCardShape = "rounded" | "sharp";

/** Vertical Stepper's `rounded`, read by the Step Cards inside it. */
export const StepCardShapeContext = React.createContext<StepCardShape>("sharp");

/** Horizontal Stepper's `showSubtitle`. Off, it hides every step's subtitle. */
export const StepShowSubtitleContext = React.createContext(true);
