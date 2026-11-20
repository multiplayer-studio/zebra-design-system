import * as React from "react";
/** Vertical Stepper's `rounded`, read by the Step Cards inside it. */
export const StepCardShapeContext = React.createContext("sharp");
/** Horizontal Stepper's `showSubtitle`. Off, it hides every step's subtitle. */
export const StepShowSubtitleContext = React.createContext(true);
