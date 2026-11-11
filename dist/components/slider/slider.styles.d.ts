/**
 * Every colour and dimension here is a semantic token from the generated CSS
 * layer. Because custom properties inherit through shadow roots, an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes this component with no
 * JavaScript and no re-render.
 *
 * The native inputs' thumbs are restyled through vendor pseudo-elements. A
 * selector list mixing -webkit- and -moz- pseudo-elements is dropped whole by
 * any engine that doesn't know one of them, so each thumb rule is written
 * twice; both read the same local custom properties.
 *
 * Spec: specs/slider/slider.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=slider.styles.d.ts.map