/**
 * Spec: specs/snackbar/snackbar.spec.json. Contextual takes its ideas from the owner's
 * reference (2026-10-18) — a pill, control/lg tall, with a soft shadow; a
 * leading glyph per status; an attention bar with a plain View; a dark bar
 * with an outlined action — and draws every value from semantic tokens:
 *  - info / positive / warning / negative / deletion: feedback/<kind>/
 *    background/subtle with foreground/primary text and icons.
 *  - view (attention): feedback/neutral/background/subtle, so it reads
 *    apart from info.
 *  - default / action, and every standard bar: the dark bars. They carry
 *    their own colour mode (the host takes .mode-dark, or .mode-light on a
 *    dark page; see snackbar.ts), so surface/overlay and foreground/primary
 *    here, and every token in the buttons, resolve in that mode.
 * The controls are <zds-button> and <zds-icon-button>, styled by themselves.
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=snackbar.styles.d.ts.map