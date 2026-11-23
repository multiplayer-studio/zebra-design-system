/**
 * Every value here is a semantic token from the generated CSS layer, except
 * the size ladder itself: only medium's width, ring weight and initials font
 * size are bound to real tokens in Figma (control-lg, stroke-thick,
 * label-large/font-size); every other size step is an authored pixel value
 * carried over as-is (spec issue). Badge size and initials font size are
 * otherwise never token-bound — both are exactly one third of the avatar's
 * own size (--zds-avatar-size / 3), the ratio measured across all nine Figma
 * variants. The ring is expanded outward by its own weight so it surrounds
 * the content circle rather than overlapping it (confirmed intent — Figma's
 * raw stroke is inside-aligned on a same-size ellipse). Every badge (Close
 * and every Status) has a foreground-inverse border (Figma's "void" layer) at
 * badgeSize / 16 — universal, not Offline-only; Offline is only the one
 * status whose border switches to foreground-secondary.
 *
 * Spec: specs/avatar/avatar.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=avatar.styles.d.ts.map