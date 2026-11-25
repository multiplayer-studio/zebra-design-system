/** Shared by the three chips: <zds-input-chip>, <zds-filter-chip>, <zds-assist-chip>. */
/**
 * For a boolean that defaults to true: a bare attribute can only ever turn
 * one on, so `show-avatar="false"` is read as false (as Snackbar does).
 */
export const defaultTrue = {
    fromAttribute: (v) => v === null || v !== "false",
    toAttribute: (v) => (v ? "" : "false"),
};
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
