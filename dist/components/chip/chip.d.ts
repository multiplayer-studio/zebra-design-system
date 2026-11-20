import * as React from "react";
import "./chip.css";
/** Pill (rounded, the default) or square (sharp) corners. Spec: the `rounded` boolean. */
export type ChipShape = "rounded" | "sharp";
/** The plain text of a React node, for accessible names and initials. */
export declare function textOf(node: React.ReactNode): string;
/** Up to two initials from a name: "Ada Lovelace" -> "AL". */
export declare function initialsOf(text: string): string;
export declare const cx: (...c: (string | false | null | undefined)[]) => string;
