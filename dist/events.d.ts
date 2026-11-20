declare abstract class ZetaEvent<T> {
    abstract name: string;
    detail: T;
    bubbles: boolean;
    composed: boolean;
    cancelable: boolean;
    constructor(detail: T, options?: {
        bubbles?: boolean;
        composed?: boolean;
        cancelable?: boolean;
    });
    toEvent(): CustomEvent<T>;
}
export interface ZetaSliderEventDetail {
    /** The value of the slider */
    value: number;
}
/** A CustomEvent factory that creates events when a standard slider is changed. */
export declare class ZetaSliderEvent<T extends ZetaSliderEventDetail> extends ZetaEvent<T> {
    name: string;
    constructor(detail: T);
}
/** The type of the CustomEvent fired when a ranged slider is changed. */
export interface ZetaRangeSliderEventDetail {
    /** The minimum value of the range slider. */
    min: number;
    /** The maximum value of the range slider. */
    max: number;
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export declare class ZetaRangeSliderEvent<T extends ZetaRangeSliderEventDetail> extends ZetaEvent<T> {
    name: string;
    constructor(detail: T);
}
/** The type of the CustomEvent fired when a page is changed. */
export interface ZetaPageEventDetail {
    /** The new page number. */
    page: number;
}
/** A CustomEvent factory that creates events when a ranged slider is changed. */
export declare class ZetaPageEvent<T extends ZetaPageEventDetail> extends ZetaEvent<T> {
    name: string;
    constructor(detail: T);
}
export type ZetaCloseEventDetail = object;
/** A CustomEvent factory that creates events when a close button is clicked, e.g. on an avatar. */
export declare class ZetaCloseEvent extends ZetaEvent<ZetaCloseEventDetail> {
    name: string;
    constructor();
}
export type ZetaPopupEventDetail = object;
/** A CustomEvent factory that creates events when a standard slider is changed. */
export declare class ZetaPopupEvent extends ZetaEvent<ZetaPopupEventDetail> {
    name: string;
    constructor(type: "open" | "close" | "cancel");
}
export type ZetaCancelUploadEventDetail = object;
/** A CustomEvent factory that creates events when the cancel button on a progess circle is clicked. */
export declare class ZetaCancelUploadEvent extends ZetaEvent<ZetaCancelUploadEventDetail> {
    name: string;
    constructor();
}
export type ZetaDropdownEventDetail = object;
export declare class ZetaDropdownEvent extends ZetaEvent<ZetaDropdownEventDetail> {
    name: string;
    constructor(isOpen: boolean);
}
export type ZetaChangeEventDetail = object;
/** A CustomEvent factory that creates events for when an input value changes. */
export declare class ZetaChangeEvent extends ZetaEvent<ZetaChangeEventDetail> {
    name: string;
    constructor();
}
export type ZetaInputEventDetail<S> = {
    value: S;
};
/** A CustomEvent factory that creates events for when an input value changes. */
export declare class ZetaInputEvent<S, T extends ZetaInputEventDetail<S>> extends ZetaEvent<T> {
    name: string;
    constructor(detail: T);
}
export type ZetaOptionClickEventDetail = {
    value: string;
};
/** A CustomEvent factory that creates events for when a option in a select is clicked. */
export declare class ZetaOptionClickEvent extends ZetaEvent<ZetaOptionClickEventDetail> {
    name: string;
    constructor(detail: {
        value: string;
    });
}
export type ZetaStepperChangeEventDetail = {
    value: string;
};
/** A CustomEvent factory that creates events for when an input value changes. */
export declare class ZetaStepperChangeEvent extends ZetaEvent<ZetaStepperChangeEventDetail> {
    name: string;
    constructor(detail: {
        value: string;
    });
}
export {};
//# sourceMappingURL=events.d.ts.map