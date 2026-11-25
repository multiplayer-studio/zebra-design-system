import "../icon/icon.js";
/** Input Hint's message type: `default` (info), `error` (the reason a value is invalid), `disabled` (dimmed). */
export type InputHintType = "default" | "error" | "disabled";
/**
 * Input Hint — the supporting line below a field, shared by `<zds-input>` and
 * `<zds-stepper-input>` so the two cannot drift (Stepper Input's spec: its
 * private `_Hint text` duplicates Input Hint; reuse it). Every value is a
 * semantic token.
 *
 * Spec: specs/input/input.spec.json (subcomponents.inputHint)
 */
export declare const inputHintStyles: import("lit").CSSResult;
/**
 * Renders Input Hint. The host must include `inputHintStyles`. An `error`
 * message is a polite live region so the reason is announced when it appears.
 */
export declare function renderInputHint(type: InputHintType, message: string, icon?: boolean, id?: string): import("lit").TemplateResult<1>;
//# sourceMappingURL=input-hint.d.ts.map