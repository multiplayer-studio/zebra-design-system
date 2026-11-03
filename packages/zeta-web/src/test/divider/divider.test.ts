import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDivider } from "../../components/divider/divider.js";
import "../../components/divider/divider.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-divider", () => {
  describe("Accessibility", () => {
    it("is a separator, naming its orientation when vertical", async () => {
      const el = await fixture<ZetaDivider>(html`<zeta-divider></zeta-divider>`);
      await expect(el).to.be.accessible();
      el.orientation = "vertical";
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });

  describe("Dimensions", () => {
    it("fills the width of its container at stroke/thin thick", async () => {
      const box = await fixture<HTMLDivElement>(html`<div style="width: 240px"><zeta-divider></zeta-divider></div>`);
      const el = box.firstElementChild as ZetaDivider;
      const r = el.getBoundingClientRect();
      await expect(r.width).to.equal(240);
      await expect(`${r.height}px`).to.equal(v(el, "--stroke-thin"));
    });

    it("fills the height of its container when vertical", async () => {
      const box = await fixture<HTMLDivElement>(
        html`<div style="display: flex; height: 40px"><span>A</span><zeta-divider orientation="vertical"></zeta-divider><span>B</span></div>`
      );
      const el = box.querySelector("zeta-divider") as ZetaDivider;
      const r = el.getBoundingClientRect();
      await expect(r.height).to.equal(40);
      await expect(`${r.width}px`).to.equal(v(el, "--stroke-thin"));
    });
  });

  describe("Styling", () => {
    it("draws the line on border/default with square ends", async () => {
      const el = await fixture<ZetaDivider>(html`<zeta-divider></zeta-divider>`);
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--zebra-border-default"));
      await expect(getComputedStyle(el).borderTopLeftRadius).to.equal("0px");
    });
  });
});
