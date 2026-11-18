import * as React from "react";
import "./chip.css";
/** The plain text of a React node, for accessible names and initials. */
export function textOf(node) {
    if (node === null || node === undefined || typeof node === "boolean")
        return "";
    if (typeof node === "string" || typeof node === "number")
        return String(node);
    if (Array.isArray(node))
        return node.map(textOf).join("");
    if (React.isValidElement(node))
        return textOf(node.props.children);
    return "";
}
/** Up to two initials from a name: "Ada Lovelace" -> "AL". */
export function initialsOf(text) {
    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
}
export const cx = (...c) => c.filter(Boolean).join(" ");
