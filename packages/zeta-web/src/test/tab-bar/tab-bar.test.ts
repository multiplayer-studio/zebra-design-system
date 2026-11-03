import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import type { ZetaTabBar, ZetaTabItem } from "../../components/tab-bar/tab-bar.js";
import "../../components/tab-bar/tab-bar.js";
import "../../components/icon/icon.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const bar = () =>
  fixture<ZetaTabBar>(
    html`<zeta-tab-bar style="width: 600px">
      <zeta-tab-item selected><zeta-icon slot="icon">star</zeta-icon>One</zeta-tab-item>
      <zeta-tab-item><zeta-icon slot="icon">star</zeta-icon>Two</zeta-tab-item>
      <zeta-tab-item disabled>Three</zeta-tab-item>
      <zeta-tab-item show-badge badge-value="5" badge-label="5 new">Four</zeta-tab-item>
    </zeta-tab-bar>`
  );
const tabs = (el: ZetaTabBar) => Array.from(el.querySelectorAll("zeta-tab-item"));

describe("zeta-tab-bar", () => {
  describe("Accessibility", () => {
    it("is a tablist of tabs, with the selected tab as the only tab stop", async () => {
      const el = await bar();
      await expect(el).to.be.accessible();
      await expect(tabs(el).map(t => t.tabIndex)).to.deep.equal([0, -1, -1, -1]);
    });

    it("moves and selects with the arrow keys, skipping disabled tabs", async () => {
      const el = await bar();
      tabs(el)[0].focus();
      await sendKeys({ press: "ArrowRight" });
      await expect(tabs(el)[1].selected).to.equal(true);
      await sendKeys({ press: "ArrowRight" });
      await expect(tabs(el)[3].selected).to.equal(true);
      await expect(document.activeElement).to.equal(tabs(el)[3]);
      await sendKeys({ press: "Home" });
      await expect(tabs(el)[0].selected).to.equal(true);
    });
  });

  describe("Content", () => {
    it("selects a clicked tab, clears the rest and fires change", async () => {
      const el = await bar();
      setTimeout(() => tabs(el)[1].click());
      const e = await oneEvent<CustomEvent<{ index: number }>>(el, "change");
      await expect(e.detail.index).to.equal(1);
      await expect(tabs(el).map(t => t.selected)).to.deep.equal([false, true, false, false]);
    });

    it("ignores a click on a disabled tab", async () => {
      const el = await bar();
      tabs(el)[2].click();
      await expect(tabs(el)[2].selected).to.equal(false);
      await expect(tabs(el)[0].selected).to.equal(true);
    });
  });

  describe("Dimensions", () => {
    it("divides the row at full width and hugs when condensed", async () => {
      const el = await bar();
      const widths = tabs(el).map(t => t.getBoundingClientRect().width);
      await expect(widths.every(w => w === widths[0])).to.equal(true);
      await expect(`${tabs(el)[0].getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      el.style.width = "";
      el.flavor = "condensed";
      await elementUpdated(el);
      expect(el.getBoundingClientRect().width).to.be.below(600);
    });
  });

  describe("Styling", () => {
    it("underlines the selected tab and darkens its label", async () => {
      const el = await bar();
      const [one, two] = tabs(el);
      await expect(getComputedStyle(one).borderBottomColor).to.equal(getCssVarColorValue(one, "--interactive-primary-border-default"));
      await expect(getComputedStyle(one).color).to.equal(getCssVarColorValue(one, "--interactive-neutral-foreground-default"));
      await expect(getComputedStyle(two).color).to.equal(getCssVarColorValue(two, "--foreground-secondary"));
      await expect(getComputedStyle(two).borderBottomWidth).to.equal(v(two, "--stroke-thick"));
      await expect(getComputedStyle(el).backgroundColor).to.equal(getCssVarColorValue(el, "--surface-section"));
    });

    it("treats the legacy active as selected", async () => {
      const el = await fixture<ZetaTabItem>(html`<zeta-tab-item active>Legacy</zeta-tab-item>`);
      await expect(getComputedStyle(el).borderBottomColor).to.equal(getCssVarColorValue(el, "--interactive-primary-border-default"));
    });
  });
});
