import { css, html, nothing } from "lit";
import "../icon/icon.js";
/**
 * Input Hint — the supporting line below a field, shared by `<zds-input>` and
 * `<zds-stepper-input>` so the two cannot drift (Stepper Input's spec: its
 * private `_Hint text` duplicates Input Hint; reuse it). Every value is a
 * semantic token.
 *
 * Spec: specs/input/input.spec.json (subcomponents.inputHint)
 */
export const inputHintStyles = css `
  /* ---- hint (Input Hint) ------------------------------------------------ */
  .hint {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    font-family: var(--body-xsmall-font-family), system-ui, sans-serif;
    font-size: var(--body-xsmall-font-size);
    font-weight: var(--body-xsmall-font-weight);
    line-height: var(--body-xsmall-line-height);
    letter-spacing: var(--body-xsmall-letter-spacing);
  }
  .hint-icon {
    flex: none;
  }
  /* default: message foreground/secondary, icon foreground/primary. */
  .hint.default .message {
    color: var(--foreground-secondary);
  }
  .hint.default .hint-icon {
    color: var(--foreground-primary);
  }
  .hint.error {
    color: var(--foreground-error);
  }
  .hint.disabled {
    color: var(--foreground-disabled);
  }

`;
/**
 * Renders Input Hint. The host must include `inputHintStyles`. An `error`
 * message is a polite live region so the reason is announced when it appears.
 */
export function renderInputHint(type, message, icon = true, id) {
    return html `<div part="hint" id=${id ?? nothing} class="hint ${type}">
    ${icon ? html `<zds-icon class="hint-icon" name=${type === "error" ? "error" : "info"} size="small" .iconStyle=${"rounded"} aria-hidden="true"></zds-icon>` : nothing}
    <span class="message" aria-live=${type === "error" ? "polite" : "off"}>${message}</span>
  </div>`;
}
