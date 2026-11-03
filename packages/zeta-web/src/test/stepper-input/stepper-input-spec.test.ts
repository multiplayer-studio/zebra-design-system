import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import "../../components/stepper-input/stepper-input.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;

describe("zeta-stepper-input (spec)", () => {
  describe("Accessibility", () => {
    it("names the value and both step buttons", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="1" hintText="Between 1 and 9"></zeta-stepper-input>`);
      await expect(one(el, "input").getAttribute("aria-label")).to.equal("Value");
      await expect(one(el, ".decrement").getAttribute("aria-label")).to.equal("Decrease");
      await expect(one(el, ".increment").getAttribute("aria-label")).to.equal("Increase");
      await expect(el).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("removes the hint while disabled", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input hintText="Hint text"></zeta-stepper-input>`);
      expect(one(el, ".hint-text")).to.exist;
      el.disabled = true;
      await elementUpdated(el);
      expect(one(el, ".hint-text")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("is control/md tall at medium and control/lg at large, with a 72 wide value", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="1"></zeta-stepper-input>`);
      const field = one(el, ".input-container");
      await expect(`${field.getBoundingClientRect().height}px`).to.equal(v(el, "--control-md"));
      await expect(field.getBoundingClientRect().width).to.equal(72);
      await expect(getComputedStyle(one(el, ".container")).columnGap).to.equal(v(el, "--space-sm"));
      el.size = "large";
      await elementUpdated(el);
      await expect(`${field.getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      await expect(`${one(el, ".increment").getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
    });
  });

  describe("Styling", () => {
    it("draws the value on Input's tokens, rounding with the buttons", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="1"></zeta-stepper-input>`);
      const field = one(el, ".input-container");
      await expect(getComputedStyle(field).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-background-default"));
      await expect(getComputedStyle(one(el, "input")).color).to.equal(getCssVarColorValue(el, "--foreground-primary"));
      el.rounded = false;
      await elementUpdated(el);
      await expect(getComputedStyle(field).borderTopLeftRadius).to.equal("0px");
      el.rounded = true;
      await elementUpdated(el);
      await expect(getComputedStyle(field).borderTopLeftRadius).to.equal(v(el, "--radius-sm"));
    });

    it("moves the buttons to the primary flavour and the value to the disabled tokens when disabled", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="1" disabled></zeta-stepper-input>`);
      await expect(one(el, ".decrement").getAttribute("flavor")).to.equal("primary");
      await expect(getComputedStyle(one(el, ".input-container")).backgroundColor).to.equal(
        getCssVarColorValue(el, "--interactive-neutral-background-disabled")
      );
      await expect(getComputedStyle(one(el, "input")).color).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
    });
  });
});
