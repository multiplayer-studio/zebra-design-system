import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaSystemBanner } from "../../components/system-banner/system-banner.js";
import "../../components/system-banner/system-banner.js";
import "../../components/button/button.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const banner = () =>
  fixture<ZetaSystemBanner>(
    html`<zeta-system-banner heading="Update available" status="info"
      ><zeta-button slot="actions" size="small" flavor="outline-contrast">Primary</zeta-button></zeta-system-banner
    >`
  );

describe("zeta-system-banner", () => {
  describe("Accessibility", () => {
    it("announces politely, negative interrupts, and names the dismiss", async () => {
      const el = await banner();
      await expect(one(el, ".system-banner").getAttribute("role")).to.equal("status");
      await expect(one(el, ".dismiss").getAttribute("aria-label")).to.equal("Dismiss");
      await expect(el).shadowDom.to.be.accessible();
      el.status = "negative";
      await elementUpdated(el);
      await expect(one(el, ".system-banner").getAttribute("role")).to.equal("alert");
    });
  });

  describe("Content", () => {
    it("follows status with its glyph, and drops the dismiss on negative", async () => {
      const el = await banner();
      await expect(one(el, ".glyph:not([hidden]) zeta-icon").textContent?.trim()).to.equal("info");
      el.status = "negative";
      await elementUpdated(el);
      await expect(one(el, ".glyph:not([hidden]) zeta-icon").textContent?.trim()).to.equal("error");
      expect(one(el, ".dismiss")).to.not.exist;
    });

    it("takes the legacy text and default slot for the title", async () => {
      const el = await fixture<ZetaSystemBanner>(html`<zeta-system-banner text="Legacy text"></zeta-system-banner>`);
      await expect(one(el, ".title").textContent?.trim()).to.equal("Legacy text");
      const slotted = await fixture<ZetaSystemBanner>(html`<zeta-system-banner>Slotted title</zeta-system-banner>`);
      const slot = slotted.shadowRoot!.querySelector(".title slot") as HTMLSlotElement;
      await expect(slot.assignedNodes()[0].textContent).to.equal("Slotted title");
    });

    it("gives the action and the dismiss the banner's shape", async () => {
      const el = await banner();
      el.rounded = false;
      await elementUpdated(el);
      await expect(el.querySelector("zeta-button")?.getAttribute("shape")).to.equal("sharp");
      await expect(one(el, ".dismiss").getAttribute("shape")).to.equal("sharp");
    });
  });

  describe("Dimensions", () => {
    it("pads space/lg on desktop and space/sm on mobile, and stays square", async () => {
      const el = await banner();
      await expect(getComputedStyle(one(el, ".system-banner")).paddingTop).to.equal(v(el, "--space-lg"));
      await expect(getComputedStyle(one(el, ".system-banner")).borderTopLeftRadius).to.equal("0px");
      el.layout = "mobile";
      await elementUpdated(el);
      await expect(getComputedStyle(one(el, ".system-banner")).paddingTop).to.equal(v(el, "--space-sm"));
    });
  });

  describe("Styling", () => {
    it("is locked to Dark on the strong status fill", async () => {
      const el = await banner();
      await expect(el.getAttribute("data-theme")).to.equal("dark");
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-info-background-strong"));
      el.status = "default";
      await elementUpdated(el);
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--feedback-success-background-strong"));
    });
  });

  describe("Interaction", () => {
    it("hides and fires close from the dismiss", async () => {
      const el = await banner();
      setTimeout(() => one(el, ".dismiss").click());
      await oneEvent(el, "close");
      await expect(el.hidden).to.equal(true);
    });
  });
});
