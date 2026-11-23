var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
import { BaseChip } from "./base-chip.js";
import styles from "./interactive-chip.styles.js";
export class InteractiveChip extends BaseChip {
    constructor() {
        super(...arguments);
        this.disabled = false;
    }
    static { this.styles = [styles, super.styles || []]; }
}
__decorate([
    property({ type: Boolean })
], InteractiveChip.prototype, "disabled", void 0);
//# sourceMappingURL=interactive-chip.js.map