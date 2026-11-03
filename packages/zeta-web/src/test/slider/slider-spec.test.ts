import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import { sendKeys, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaSlider } from "../../components/slider/slider.js";
import "../../components/slider/slider.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const thumbs = (el: ZetaSlider) => Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".handle"));

describe("zeta-slider (spec)", () => {
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("exposes each thumb as a named slider with its own value and limits", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider type="range" min="0" max="10" lowerValue="2" upperValue="7"></zeta-slider>`);
      const [lo, hi] = thumbs(el);
      await expect([lo.getAttribute("role"), lo.getAttribute("aria-label"), lo.getAttribute("aria-valuenow")]).to.deep.equal(["slider", "Minimum", "2"]);
      await expect([lo.getAttribute("aria-valuemin"), lo.getAttribute("aria-valuemax")]).to.deep.equal(["0", "7"]);
      await expect([hi.getAttribute("aria-label"), hi.getAttribute("aria-valuenow"), hi.getAttribute("aria-valuemin")]).to.deep.equal(["Maximum", "7", "2"]);
      await expect(el).shadowDom.to.be.accessible();
    });

    it("takes the keys: arrows step, Page moves a tenth, Home and End go to the ends", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider value="50"></zeta-slider>`);
      thumbs(el)[0].focus();
      await sendKeys({ press: "ArrowRight" });
      await expect(el.value).to.equal(51);
      await sendKeys({ press: "PageDown" });
      await expect(el.value).to.equal(41);
      await sendKeys({ press: "End" });
      await expect(el.value).to.equal(100);
      await sendKeys({ press: "Home" });
      await expect(el.value).to.equal(0);
    });

    it("fires change on a key press", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider value="50"></zeta-slider>`);
      thumbs(el)[0].focus();
      setTimeout(() => void sendKeys({ press: "ArrowLeft" }));
      const e = await oneEvent<CustomEvent<{ value: number }>>(el, "change");
      await expect(e.detail.value).to.equal(49);
    });
  });

  describe("Content", () => {
    it("snaps to stepIncrement and draws one dot per stop", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider stepIncrement="25" value="40"></zeta-slider>`);
      await expect(el.shadowRoot!.querySelectorAll(".step").length).to.equal(5);
      thumbs(el)[0].focus();
      await sendKeys({ press: "ArrowRight" });
      await expect(el.value).to.equal(75);
    });

    it("keeps a range's thumbs from crossing", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider type="range" lowerValue="40" upperValue="45"></zeta-slider>`);
      thumbs(el)[0].focus();
      await sendKeys({ press: "End" });
      await expect(el.lowerValue).to.equal(45);
      await expect(el.upperValue).to.equal(45);
    });

    it("runs a range's fill between the two thumbs", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider type="range" lowerValue="20" upperValue="60" style="width: 400px"></zeta-slider>`);
      const fill = el.shadowRoot!.querySelector(".selected-area") as HTMLElement;
      const [lo, hi] = thumbs(el).map(t => t.getBoundingClientRect());
      const f = fill.getBoundingClientRect();
      await expect(Math.round(f.left)).to.equal(Math.round(lo.left + lo.width / 2));
      await expect(Math.round(f.right)).to.equal(Math.round(hi.left + hi.width / 2));
    });
  });

  describe("Dimensions", () => {
    it("grows only the hovered thumb from control/icon-sm to control/icon-md", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider type="range" style="width: 400px"></zeta-slider>`);
      const [lo, hi] = thumbs(el);
      await expect(`${lo.getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-sm"));
      const r = lo.getBoundingClientRect();
      await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
      await expect(`${lo.getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-md"));
      await expect(`${hi.getBoundingClientRect().width}px`).to.equal(v(el, "--control-icon-sm"));
    });
  });

  describe("Styling", () => {
    it("drops the fill and thumb to the disabled colour and takes them out of the tab order", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider disabled></zeta-slider>`);
      const colour = getCssVarColorValue(el, "--interactive-neutral-foreground-disabled");
      await expect(getComputedStyle(el.shadowRoot!.querySelector(".selected-area")!).backgroundColor).to.equal(colour);
      await expect(getComputedStyle(thumbs(el)[0]).backgroundColor).to.equal(colour);
      await expect(thumbs(el)[0].tabIndex).to.equal(-1);
      await expect(thumbs(el)[0].getAttribute("aria-disabled")).to.equal("true");
    });

    it("colours the fill and both thumbs while a thumb has keyboard focus, and rings that thumb", async () => {
      const el = await fixture<ZetaSlider>(html`<zeta-slider type="range"></zeta-slider>`);
      const [lo, hi] = thumbs(el);
      lo.focus();
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);
      const colour = getCssVarColorValue(el, "--interactive-ghost-foreground-default");
      await expect(getComputedStyle(hi).backgroundColor).to.equal(colour);
      await expect(getComputedStyle(lo).boxShadow).to.not.equal("none");
    });
  });
});
