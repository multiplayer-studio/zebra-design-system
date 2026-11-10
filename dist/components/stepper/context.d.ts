import * as React from "react";
export type StepCardShape = "rounded" | "sharp";
/** Vertical Stepper's `rounded`, read by the Step Cards inside it. */
export declare const StepCardShapeContext: React.Context<StepCardShape>;
/** Horizontal Stepper's `showSubtitle`. Off, it hides every step's subtitle. */
export declare const StepShowSubtitleContext: React.Context<boolean>;
