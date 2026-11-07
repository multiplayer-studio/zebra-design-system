import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia } from "@web/test-runner-commands";
import type { ZetaTooltip } from "../../components/tooltip/tooltip.js";
import "../../components/tooltip/tooltip.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;

describe("zeta-tooltip", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });

  describe("Accessibility", () => {
    it("is a tooltip whose label meets contrast", async () => {
      const el = await fixture<ZetaTooltip>(html`<zeta-tooltip>Copy link</zeta-tooltip>`);
      await expect(el).to.be.accessible();
      await expect(el).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("takes the slotted label, or the label property when nothing is slotted", async () => {
      const el = await fixture<ZetaTooltip>(html`<zeta-tooltip label="Fallback"></zeta-tooltip>`);
      await expect(one(el, "slot").textContent).to.equal("Fallback");
    });

    it("wraps a long label inside its max width", async () => {
      const el = await fixture<ZetaTooltip>(html`<zeta-tooltip>${"A very long tooltip label ".repeat(6)}</zeta-tooltip>`);
      expect(one(el, ".container").getBoundingClientRect().width).to.be.at.most(240);
    });
  });

  describe("Dimensions", () => {
    it("pads space/2xs by space/sm and puts the pointer outside the edge it names", async () => {
      const el = await fixture<ZetaTooltip>(html`<zeta-tooltip point="bottom">Label</zeta-tooltip>`);
      const bubble = one(el, ".container");
      await expect(getComputedStyle(bubble).paddingTop).to.equal(v(el, "--space-2xs"));
      await expect(getComputedStyle(bubble).paddingLeft).to.equal(v(el, "--space-sm"));
      const b = bubble.getBoundingClientRect();
      await expect(Math.round(one(el, ".point").getBoundingClientRect().top)).to.equal(Math.round(b.bottom));
      el.point = "left";
      await elementUpdated(el);
      await expect(Math.round(one(el, ".point").getBoundingClientRect().right)).to.equal(Math.round(b.left));
    });
  });

  describe("Styling", () => {
    it("draws surface/inverse with foreground/inverse label/small, radius/sm when rounded", async () => {
      const el = await fixture<ZetaTooltip>(html`<zeta-tooltip>Label</zeta-tooltip>`);
      const bubble = one(el, ".container");
      await expect(getComputedStyle(bubble).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-inverse"));
      await expect(getComputedStyle(one(el, "slot")).color).to.equal(getCssVarColorValue(el, "--foreground-inverse"));
      await expect(getComputedStyle(one(el, "slot")).fontSize).to.equal(v(el, "--label-small-font-size"));
      await expect(getComputedStyle(bubble).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
      await expect(getComputedStyle(bubble).boxShadow).to.not.equal("none");
      el.rounded = false;
      await elementUpdated(el);
      await expect(getComputedStyle(bubble).borderTopLeftRadius).to.equal("0px");
    });
  });
});
