class ZetaEvent {
    constructor(detail, options) {
        this.detail = detail;
        this.bubbles = options && "bubbles" in options && typeof options.bubbles === "boolean" ? options.bubbles : false;
        this.composed = options && "composed" in options && typeof options.composed === "boolean" ? options.composed : false;
        this.cancelable = options && "cancelable" in options && typeof options.cancelable === "boolean" ? options.cancelable : false;
    }
    toEvent() {
        return new CustomEvent(this.name, {
            bubbles: this.bubbles,
            composed: this.composed,
            cancelable: this.cancelable,
            detail: this.detail
        });
    }
}
/** A CustomEvent factory that creates events when a standard slider is changed. */
export class ZetaSliderEvent extends ZetaEvent {
    constructor(detail) {
        super(detail);
        this.name = "change";
    }
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export class ZetaRangeSliderEvent extends ZetaEvent {
    constructor(detail) {
        super(detail);
        this.name = "change";
    }
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export class ZetaPageEvent extends ZetaEvent {
    constructor(detail) {
        super(detail, { bubbles: true, composed: true });
        this.name = "pageChange";
    }
}
/** A CustomEvent factory that creates events when a close button is clicked, e.g. on an avatar. */
export class ZetaCloseEvent extends ZetaEvent {
    constructor() {
        super({}, { bubbles: true, composed: true });
        this.name = "close";
    }
}
/** A CustomEvent factory that creates events when a standard slider is changed. */
export class ZetaPopupEvent extends ZetaEvent {
    constructor(type) {
        super({});
        this.name = "open";
        this.name = type;
    }
}
/** A CustomEvent factory that creates events when the cancel button on a progess circle is clicked. */
export class ZetaCancelUploadEvent extends ZetaEvent {
    constructor() {
        super({}, { bubbles: true, composed: true });
        this.name = "cancelUpload";
    }
}
export class ZetaDropdownEvent extends ZetaEvent {
    constructor(isOpen) {
        super({});
        this.name = "open";
        this.name = isOpen ? "open" : "close";
    }
}
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaChangeEvent extends ZetaEvent {
    constructor() {
        super({});
        this.name = "change";
    }
}
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaInputEvent extends ZetaEvent {
    constructor(detail) {
        super(detail);
        this.name = "input";
    }
}
/** A CustomEvent factory that creates events for when a option in a select is clicked. */
export class ZetaOptionClickEvent extends ZetaEvent {
    constructor(detail) {
        super(detail, { bubbles: true });
        this.name = "zeta-option-click";
    }
}
/** A CustomEvent factory that creates events for when an input value changes. */
export class ZetaStepperChangeEvent extends ZetaEvent {
    constructor(detail) {
        super(detail, { bubbles: true, composed: true });
        this.name = "change";
    }
}
//# sourceMappingURL=events.js.map