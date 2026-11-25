/** Shared by the three chips: <zds-input-chip>, <zds-filter-chip>, <zds-assist-chip>. */
/** Pill (rounded, the default) or square (sharp) corners. Spec: the `rounded` boolean. */
export type ChipShape = "rounded" | "sharp";
/**
 * For a boolean that defaults to true: a bare attribute can only ever turn
 * one on, so `show-avatar="false"` is read as false (as Snackbar does).
 */
export declare const defaultTrue: {
    fromAttribute: (v: string | null) => boolean;
    toAttribute: (v: boolean) => "" | "false";
};
/** Up to two initials from a name: "Ada Lovelace" -> "AL". */
export declare function initialsOf(text: string): string;
//# sourceMappingURL=chip.d.ts.map