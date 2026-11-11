import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaSnackbar } from "../../components/snackbar/snackbar.js";
import "../../components/snackbar/snackbar.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const bar = (el: ZetaSnackbar) => one(el, ".snackbar-root");

describe("zeta-snackbar", () => {
  describe("Accessibility", () => {
    it("announces itself politely, and negative interrupts", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info">Saved</zeta-snackbar>`);
      await expect(el).to.be.accessible();
      el.status = "negative";
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });

    it("names the close", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info">Saved</zeta-snackbar>`);
      await expect(one(el, ".close").getAttribute("aria-label")).to.equal("Dismiss");
    });
  });

  describe("Content", () => {
    it("shows the message, and each flavour's glyph and controls", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="deletion">Item deleted</zeta-snackbar>`);
      const slot = el.shadowRoot!.querySelector("slot:not([name])") as HTMLSlotElement;
      await expect(slot.assignedNodes()[0].textContent).to.equal("Item deleted");
      await expect(one(el, ".lead").textContent?.trim()).to.equal("delete");
      await expect(one(el, ".action").textContent?.trim()).to.equal("Undo");
      expect(one(el, ".close")).to.exist;
      el.status = "view";
      await elementUpdated(el);
      await expect(one(el, ".action").textContent?.trim()).to.equal("View");
      expect(one(el, ".close")).to.not.exist;
    });

    it("takes the legacy flavor and close switch", async () => {
      const el = await fixture<ZetaSnackbar>(
        html`<zeta-snackbar flavor="error" actionLabel="Retry" hasCloseAction closeActionIcon="cancel">Failed</zeta-snackbar>`
      );
      await expect(el.status).to.equal("negative");
      await expect(el.getAttribute("status")).to.equal("negative");
      await expect(one(el, ".action").textContent?.trim()).to.equal("Retry");
      await expect(one(el, ".close").textContent?.trim()).to.equal("cancel");
    });

    it("opens the icon slot on the flavours without a glyph of their own", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar variant="standard"><zeta-icon slot="icon">star</zeta-icon>Saved</zeta-snackbar>`);
      await elementUpdated(el);
      const slot = el.shadowRoot!.querySelector("slot[name=icon]") as HTMLSlotElement;
      await expect(slot.assignedElements().length).to.equal(1);
      await expect(one(el, "span.lead").hidden).to.equal(false);
    });
  });

  describe("Dimensions", () => {
    it("is control/lg tall with space/lg leading padding and a pill radius", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info">Saved</zeta-snackbar>`);
      await expect(`${bar(el).getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      await expect(getComputedStyle(bar(el)).paddingLeft).to.equal(v(el, "--space-lg"));
      await expect(getComputedStyle(bar(el)).paddingRight).to.equal(v(el, "--space-2xs"));
      await expect(getComputedStyle(bar(el)).borderTopLeftRadius).to.equal(v(el, "--radius-pill"));
    });

    it("rounds standard to radius/md and squares both when sharp", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar variant="standard">Saved</zeta-snackbar>`);
      await expect(getComputedStyle(bar(el)).borderTopLeftRadius).to.equal(v(el, "--radius-md"));
      el.shape = "sharp";
      await elementUpdated(el);
      await expect(getComputedStyle(bar(el)).borderTopLeftRadius).to.equal("0px");
    });
  });

  describe("Styling", () => {
    it("tints each contextual flavour, and puts the dark bars on surface/overlay in their own mode", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="positive">Done</zeta-snackbar>`);
      await expect(getComputedStyle(bar(el)).backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-success-background-subtle"));
      el.status = "default";
      await elementUpdated(el);
      await expect(el.getAttribute("data-theme")).to.equal("dark");
      await expect(getComputedStyle(bar(el)).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-overlay"));
    });
  });

  describe("Interaction", () => {
    it("closes from the close, with reason dismiss", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info">Saved</zeta-snackbar>`);
      setTimeout(() => one(el, ".close").click());
      const e = await oneEvent<CustomEvent<{ reason: string }>>(el, "close");
      await expect(e.detail.reason).to.equal("dismiss");
      await expect(el.open).to.equal(false);
    });

    it("fires action and calls actionClick, then closes", async () => {
      let called = false;
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="deletion" .actionClick=${() => (called = true)}>Deleted</zeta-snackbar>`);
      setTimeout(() => one(el, ".action").click());
      await oneEvent(el, "action");
      await expect(called).to.equal(true);
      await expect(el.open).to.equal(false);
    });

    it("closes itself after duration", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info" duration="50">Saved</zeta-snackbar>`);
      const e = await oneEvent<CustomEvent<{ reason: string }>>(el, "close");
      await expect(e.detail.reason).to.equal("timeout");
    });

    it("floats in the top layer when floating", async () => {
      const el = await fixture<ZetaSnackbar>(html`<zeta-snackbar status="info" floating>Saved</zeta-snackbar>`);
      await elementUpdated(el);
      await expect(el.matches(":popover-open")).to.equal(true);
    });
  });
});
