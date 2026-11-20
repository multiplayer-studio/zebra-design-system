var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./shimmer.styles.js";
/** Shimmer is a loading skeleton component that displays an animated shimmer effect to indicate content is loading.
 *
 * @cssproperty --shimmer-height - The height of the shimmer element. Default: 20px
 * @cssproperty --shimmer-width - The width of the shimmer element. Default: 100%
 * @cssproperty --shimmer-animation-duration - The duration of the shimmer animation. Default: 1.5s
 * @cssproperty --shimmer-border-radius - The border radius of the shimmer element. Default: 0px
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components
 * @storybook ?path=/docs/components-shimmer--docs
 */
let ZetaShimmer = class ZetaShimmer extends LitElement {
    render() {
        return html `<div class="shimmer"></div>`;
    }
    static { this.styles = [styles]; }
};
ZetaShimmer = __decorate([
    customElement("zeta-shimmer")
], ZetaShimmer);
export { ZetaShimmer };
//# sourceMappingURL=shimmer.js.map