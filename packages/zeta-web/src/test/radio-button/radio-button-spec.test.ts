import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import { emulateMedia, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import "../../components/radio-button/radio-button.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const ring = (el: Element) => el.shadowRoot?.querySelector(".container") as HTMLElement;
const dot = (el: Element) => el.shadowRoot?.querySelector("[part=icon]") as HTMLElement;
const colorOf = (host: Element, token: string) => {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  host.shadowRoot!.append(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
};

describe("zeta-radio-button (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("is a named radio", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button name="g" value="a">Option</zeta-radio-button>`);
      await expect(el).to.be.accessible();
    });
  });

  describe("Dimensions", () => {
    it("draws a control/icon-sm ring with an 8px dot at medium, control/xs with 12px at large, in a 40px target", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button size="medium" checked>Option</zeta-radio-button>`);
      await expect(`${ring(el).getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-sm"));
      await expect(dot(el).getBoundingClientRect().width).to.equal(8);
      await expect(`${ring(el).getBoundingClientRect().width + parseFloat(getComputedStyle(ring(el)).marginLeft) * 2}px`).to.equal(
        v(el, "--control-target-min")
      );
      el.size = "large";
      await elementUpdated(el);
      await expect(`${ring(el).getBoundingClientRect().width}px`).to.equal(v(el, "--control-xs"));
      await expect(dot(el).getBoundingClientRect().width).to.equal(12);
    });
  });

  describe("Styling", () => {
    it("rings an unchecked radio in selection/border/default with no dot", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button>Option</zeta-radio-button>`);
      await expect(getComputedStyle(ring(el)).borderTopColor).to.equal(colorOf(el, "--interactive-selection-border-default"));
      await expect(getComputedStyle(ring(el)).borderTopWidth).to.equal(v(el, "--stroke-thick"));
      await expect(getComputedStyle(dot(el)).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });

    it("draws a checked radio on the selection pressed tokens", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button checked>Option</zeta-radio-button>`);
      await expect(getComputedStyle(ring(el)).borderTopColor).to.equal(colorOf(el, "--interactive-selection-border-pressed"));
      await expect(getComputedStyle(dot(el)).backgroundColor).to.equal(colorOf(el, "--interactive-selection-background-pressed"));
    });

    it("hides the dot on a disabled unchecked radio and keeps it, disabled, when checked", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button disabled>Option</zeta-radio-button>`);
      await expect(getComputedStyle(dot(el)).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
      await expect(getComputedStyle(ring(el)).borderTopColor).to.equal(colorOf(el, "--interactive-selection-border-disabled"));
      el.checked = true;
      await elementUpdated(el);
      await expect(getComputedStyle(dot(el)).backgroundColor).to.equal(colorOf(el, "--interactive-selection-background-disabled"));
    });
  });

  describe("Interaction", () => {
    it("steps the ring and dot to their hover tones", async () => {
      const el = await fixture<ZetaRadioButton>(html`<zeta-radio-button checked>Option</zeta-radio-button>`);
      const r = ring(el).getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(getComputedStyle(ring(el)).borderTopColor).to.equal(colorOf(el, "--interactive-selection-border-hover"));
      await expect(getComputedStyle(dot(el)).backgroundColor).to.equal(colorOf(el, "--interactive-selection-background-hover"));
    });
  });
});
