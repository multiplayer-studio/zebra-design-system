/**
 * Every value here is a semantic token. The gradient flavour's border uses
 * the double-background technique (padding-box fill, border-box gradient)
 * since a plain `border` can't paint a gradient without losing the
 * border-radius clip.
 *
 * The chevron flip is this element's own addition: Figma's file doesn't
 * actually wire the chevron to State (spec issue — the nested header
 * instance is identical between collapsed and expanded in every variant),
 * so there is nothing to carry over faithfully; this implements the
 * metadata's stated intent instead.
 *
 * Spec: specs/card/card.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=collapsible-card.styles.d.ts.map