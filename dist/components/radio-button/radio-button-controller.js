import {} from "lit";
import {} from "./radio-button.js";
export class RadioButtonController {
    constructor(host) {
        this.host = host;
        this.rootNode = null;
    }
    hostConnected() {
        this.rootNode = this.host.getRootNode();
        this.handleChange();
    }
    hostDisconnected() {
        this.rootNode = null;
    }
    handleChange() {
        if (this.host.checked) {
            this.radios?.forEach(radio => {
                if (radio !== this.host) {
                    radio.checked = false;
                }
                radio.dispatchEvent(new InputEvent("input"));
            });
        }
    }
    get radios() {
        //TODO test with mixed <input type="radio"> and zeta-radio-buttons, we may need to extend the selector to include inputs
        return this.rootNode?.querySelectorAll(`zeta-radio-button[name="${this.host.name}"]`);
    }
}
//# sourceMappingURL=radio-button-controller.js.map