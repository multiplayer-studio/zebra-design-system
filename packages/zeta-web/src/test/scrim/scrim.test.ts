import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaScrim } from "../../components/scrim/scrim.js";
import "../../components/scrim/scrim.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const covered = async (tone?: string) => {
  const box = await fixture<HTMLDivElement>(
    html`<div style="position: relative; width: 300px; height: 200px"><zeta-scrim tone=${tone ?? "scrim"}></zeta-scrim></div>`
  );
  return box.firstElementChild as ZetaScrim;
};

describe("zeta-scrim", () => {
  describe("Accessibility", () => {
    it("is hidden from assistive technology and never focusable", async () => {
      const el = await covered();
      await expect(el).to.be.accessible();
      await expect(el.tabIndex).to.equal(-1);
      await expect(el.shadowRoot?.childElementCount ?? 0).to.equal(0);
    });
  });

  describe("Content", () => {
    it("renders nothing of its own", async () => {
      const el = await covered();
      await expect(el.shadowRoot?.querySelector("slot")).to.equal(null);
    });
  });

  describe("Dimensions", () => {
    it("fills its positioned parent edge to edge", async () => {
      const el = await covered();
      const r = el.getBoundingClientRect();
      await expect(r.width).to.equal(300);
      await expect(r.height).to.equal(200);
    });
  });

  describe("Styling", () => {
    it("fills with overlay/scrim by default, with square corners", async () => {
      const el = await covered();
      await expect(el.tone).to.equal("scrim");
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--overlay-scrim"));
      await expect(getComputedStyle(el).borderTopLeftRadius).to.equal("0px");
      await expect(getComputedStyle(el).opacity).to.equal("1");
    });

    it("fills with overlay/modal when the tone is modal", async () => {
      const el = await covered();
      el.tone = "modal";
      await elementUpdated(el);
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--overlay-modal"));
    });
  });

  describe("Interaction", () => {
    it("lets a click bubble to the owner", async () => {
      const box = await fixture<HTMLDivElement>(html`<div style="position: relative; width: 100px; height: 100px"><zeta-scrim></zeta-scrim></div>`);
      let clicks = 0;
      box.addEventListener("click", () => clicks++);
      (box.firstElementChild as HTMLElement).click();
      await expect(clicks).to.equal(1);
    });
  });
});
