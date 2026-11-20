import type { LitElement } from "lit";
import { css } from "lit";
import { property } from "lit/decorators.js";
import { type Constructor } from "./utils.js";

export const ShapeList = ["sharp", "rounded", "full"] as const;
export type Shape = (typeof ShapeList)[number];

declare class ContourableThreeInterface {
  shape: Shape;
}

/**
 * Mixin to add Contourable to component with sharp, rounded and fully rounded shapes.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const ContourableThree = <T extends Constructor<LitElement>>(superClass: T) => {
  class ContourableThreeClass extends superClass {
    /**
     * Whether the component is sharp, rounded or fully rounded.
     * This will change the border radius and icon font.
     *
     * Possible values are:
     *  - `sharp`: No border radius, uses "ZdsIcons-Sharp"
     * - `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
     * - `full`: Full border radius, uses "ZdsIcons-Rounded"
     *
     * @type {'sharp' | 'rounded' | 'full'}
     * @defaultValue "rounded"
     */
    @property({ type: String, reflect: true }) shape: Shape = "rounded";

    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        :host([shape="full"]) {
          --contour: var(--radius-full);
          --computed-icon-font: "ZdsIcons-Rounded";
        }

        :host([shape="sharp"]) {
          --contour: var(--radius-none);
          --computed-icon-font: "ZdsIcons-Sharp";
        }

        :host([shape="rounded"]) {
          --contour: var(--radius-minimal);
          --computed-icon-font: "ZdsIcons-Rounded";
        }

        :host > *,
        :host .contourable-target {
          --icon-font: var(--computed-icon-font, "ZdsIcons-Rounded");
          border-radius: var(--contour, var(--radius-minimal));
        }
      `
    ];
  }
  return ContourableThreeClass as Constructor<ContourableThreeInterface & LitElement> & T;
};
