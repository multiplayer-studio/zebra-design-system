/**
 * Spec: specs/avatar-rail/avatar-rail.spec.json
 *
 * Every size is medium scaled by diameter / 48, the Avatar's own method, so
 * only medium binds tokens (space/neg/xl, control/lg, stroke/thick,
 * label/large) and every other step is the same ratio of the diameter:
 * overlap -1/4, cutout and counter ring 1/24, count text 1/3 with a 1/2
 * line height (spec note "bindingDrift"). The diameter ladder repeats
 * `<zds-avatar>`'s so the counter lines up with the avatars beside it.
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=avatar-rail.styles.d.ts.map