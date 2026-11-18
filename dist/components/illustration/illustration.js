var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./illustration.styles.js";
export const ZetaIllustrationNamesList = [
    "addDevice",
    "emptyBox",
    "welcomeNav",
    "helpChat",
    "taskZebra",
    "sadZebra",
    "search",
    "boxEmpty",
    "calendar",
    "loadFailure",
    "serverDisconnect",
    "internet1",
    "internet2",
    "internet3",
    "zebraSad",
    "zebraHidden",
    "zebraRelaxed",
    "zebraHappy",
    "zebraNeutral",
    "zebraThumbsUp",
    "login",
    "warning",
    "welcome"
];
/**
 * Graphical illustrations are used for visual representation.
 *
 * We recommend using the provided illustrations for consistency, but if required, the src can be set to any image.
 */
let ZetaIllustration = class ZetaIllustration extends LitElement {
    constructor() {
        super(...arguments);
        /** The base path of zeta-web components. */
        this.basePath = "node_modules/@zebra-fed/zeta-web";
        this.getIllustrationPath = () => {
            if (!this.name) {
                return "";
            }
            const zdna = ["addDevice", "emptyBox", "helpChat", "welcomeNav"];
            let folder = "workcloud";
            if (zdna.includes(this.name ?? "")) {
                folder = "zdna";
            }
            return this.basePath + "/assets/illustrations/" + folder + "/" + this.name + ".svg";
        };
    }
    static { this.styles = styles; }
    render() {
        return html `<img src="${this.src ?? this.getIllustrationPath()}" alt="${this.alt ?? this.name ?? ""}" style="width: 100%; height: 100%;" />`;
    }
};
__decorate([
    property({ type: String })
], ZetaIllustration.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZetaIllustration.prototype, "alt", void 0);
__decorate([
    property({ type: String })
], ZetaIllustration.prototype, "basePath", void 0);
__decorate([
    property({ type: String })
], ZetaIllustration.prototype, "src", void 0);
ZetaIllustration = __decorate([
    customElement("zeta-illustration")
], ZetaIllustration);
export { ZetaIllustration };
//# sourceMappingURL=illustration.js.map