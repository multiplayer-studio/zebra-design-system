import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaScrollbar } from "../../components/scrollbar/scrollbar.js";
import "../../components/scrollbar/scrollbar.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const handleOf = (el: ZetaScrollbar) => el.shadowRoot!.querySelector(".handle") as HTMLElement;

describe("zeta-scrollbar", () => {
  describe("Accessibility", () => {
    it("is presentational and hidden from assistive technology", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar></zeta-scrollbar>`);
      await expect(el.getAttribute("aria-hidden")).to.equal("true");
      await expect(el).to.be.accessible();
    });
  });

  describe("Content", () => {
    it("holds a track and a handle and nothing else", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar></zeta-scrollbar>`);
      expect(el.shadowRoot!.querySelector(".track")).to.exist;
      expect(el.shadowRoot!.querySelector(".handle")).to.exist;
      await expect(el.shadowRoot!.querySelectorAll("slot").length).to.equal(0);
    });
  });

  describe("Dimensions", () => {
    it("draws the 12 gutter at the sample length, the handle filling the padded cross axis", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar></zeta-scrollbar>`);
      const r = el.getBoundingClientRect();
      await expect(r.width).to.equal(12);
      await expect(r.height).to.equal(200);
      // space/2xs padding each side leaves the handle's 4px cross axis.
      await expect(handleOf(el).getBoundingClientRect().width).to.equal(4);
    });

    it("sizes to the region's edge through --scrollbar-length", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar style="--scrollbar-length: 120px"></zeta-scrollbar>`);
      await expect(el.getBoundingClientRect().height).to.equal(120);
    });

    it("swaps the axes when horizontal and nothing else", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar orientation="horizontal"></zeta-scrollbar>`);
      const r = el.getBoundingClientRect();
      await expect(r.height).to.equal(12);
      await expect(r.width).to.equal(200);
      await expect(handleOf(el).getBoundingClientRect().height).to.equal(4);
    });
  });

  describe("Interaction", () => {
    it("places the handle from value and sizes it from size", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar .size=${0.5}></zeta-scrollbar>`);
      const rail = 200 - 2 * 4; // content box after space/2xs padding
      await expect(handleOf(el).getBoundingClientRect().height).to.equal(rail / 2);
      await expect(handleOf(el).offsetTop).to.equal(0);
      el.value = 1;
      await elementUpdated(el);
      await expect(handleOf(el).offsetTop).to.equal(rail / 2);
    });

    it("clamps value and size into 0..1", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar .value=${4} .size=${-2}></zeta-scrollbar>`);
      await expect(el.style.getPropertyValue("--_value")).to.equal("1");
      await expect(el.style.getPropertyValue("--_size")).to.equal("0");
    });
  });

  describe("Styling", () => {
    it("rests the handle on foreground/disabled as a pill", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar></zeta-scrollbar>`);
      const handle = handleOf(el);
      await expect(getComputedStyle(handle).backgroundColor).to.equal(getCssVarColorValue(el, "--foreground-disabled"));
      await expect(getComputedStyle(handle).borderTopLeftRadius).to.equal(getComputedStyle(el).getPropertyValue("--radius-pill").trim());
    });

    it("binds the track to the ghost scrim token with no extra opacity", async () => {
      const el = await fixture<ZetaScrollbar>(html`<zeta-scrollbar></zeta-scrollbar>`);
      const track = el.shadowRoot!.querySelector(".track") as HTMLElement;
      await expect(getComputedStyle(track).backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-ghost-background-default"));
      await expect(getComputedStyle(track).opacity).to.equal("1");
    });
  });
});
