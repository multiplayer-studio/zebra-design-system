import * as React from "react";
import "./chip.css";

/** Pill (rounded, the default) or square (sharp) corners. Spec: the `rounded` boolean. */
export type ChipShape = "rounded" | "sharp";

/** The plain text of a React node, for accessible names and initials. */
export function textOf(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/** Up to two initials from a name: "Ada Lovelace" -> "AL". */
export function initialsOf(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
