import { css } from "lit";
/**
 * The private _Leading Visual part. Every value is a semantic token.
 *
 * Spec: specs/notification-item/notification-item.spec.json (subcomponents)
 */
export default css `
    :host {
      box-sizing: border-box;
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
      /* control/sm on all three flavours (spec issue "Binding drift": image
         was hug/unbound in Figma). */
      width: var(--control-sm);
      height: var(--control-sm);
      border-radius: var(--radius-pill);
      overflow: hidden;
    }
    :host([flavour="image"]) {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    /* Spec issue "Gaps": Figma's icon flavour carries a weight-1
       border/default stroke with no stroke token; bound to stroke/thin (1px). */
    :host([flavour="icon"]) {
      border: var(--stroke-thin) solid var(--border-default);
      color: var(--foreground-primary);
    }
`;
