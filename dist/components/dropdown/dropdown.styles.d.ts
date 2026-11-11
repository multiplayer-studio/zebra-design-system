/**
 * The template paints nothing of its own — "Fill and elevation: None on the
 * template... both belong to the menu" (spec). Everything here is geometry:
 * hugging the trigger, and placing the panel outside those bounds.
 *
 * Positioning approach: `position: absolute` against `:host`, which is
 * `position: relative` and hugs only the trigger (spec: "a layout only
 * reserves the trigger's space"), plus one CSS rule per `position` value and
 * one per applicable `position`×`align` pair — no JavaScript measurement at
 * all. An earlier version used `position: fixed` plus JS-computed `top`/
 * `left` in viewport coordinates (`getBoundingClientRect`, recomputed on
 * open/resize/scroll); see dropdown.ts's class doc for why that broke
 * specifically inside Storybook's Docs page (a `position: fixed` descendant
 * resolves against whichever ancestor introduces a `transform`, not the
 * viewport, and Docs wraps stories in a scaled preview frame that does). This
 * version has no viewport coordinate to get wrong in the first place.
 *
 * Trade-off carried over unchanged from the `fixed` version: `position:
 * absolute` doesn't buy top-layer stacking either, so an ancestor's
 * `overflow: hidden` can still clip the panel. The Popover API (`popover`
 * attribute + `::backdrop`) or CSS anchor positioning would solve that, but
 * neither is used yet — no other component in this package uses `popover` or
 * `anchor-name` (checked: `grep -r "popover\|anchor-name" src/` turns up
 * nothing), so there's no existing browser-support baseline to match, and
 * anchor positioning still needs a fallback path in browsers without it.
 * Revisit if a future component needs top-layer stacking badly enough to
 * justify a feature-detected fallback.
 *
 * Spec: specs/dropdown/dropdown.spec.json
 */
declare const _default: import("lit").CSSResult;
export default _default;
//# sourceMappingURL=dropdown.styles.d.ts.map