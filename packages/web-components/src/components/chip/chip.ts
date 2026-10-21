/** Shared by the four chips: <zds-input-chip>, <zds-filter-chip>, <zds-assist-chip>, <zds-status-chip>. */

/** Pill (rounded, the default) or square (sharp) corners. Spec: the `rounded` boolean. */
export type ChipShape = "rounded" | "sharp";

/**
 * For a boolean that defaults to true: a bare attribute can only ever turn
 * one on, so `show-avatar="false"` is read as false (as Snackbar does).
 */
export const defaultTrue = {
  fromAttribute: (v: string | null) => v === null || v !== "false",
  toAttribute: (v: boolean) => (v ? "" : "false"),
};

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
