import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaScreenHeaderBar } from "../../components/screen-header-bar/screen-header-bar.js";
import "../../components/screen-header-bar/screen-header-bar.js";
import "../../components/button/button.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const one = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;

describe("zeta-screen-header-bar", () => {
  describe("Accessibility", () => {
    it("names the back button and gives the title a heading role", async () => {
      const el = await fixture<ZetaScreenHeaderBar>(html`<zeta-screen-header-bar headline="Add Subscribers"></zeta-screen-header-bar>`);
      await expect(one(el, ".back").getAttribute("aria-label")).to.equal("Back");
      await expect(one(el, ".heading").getAttribute("role")).to.equal("heading");
      await expect(el).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("drops the back button with showLeadingIcon off", async () => {
      const el = await fixture<ZetaScreenHeaderBar>(html`<zeta-screen-header-bar headline="Home"></zeta-screen-header-bar>`);
      el.showLeadingIcon = false;
      await elementUpdated(el);
      expect(one(el, ".back")).to.not.exist;
    });
  });

  describe("Dimensions", () => {
    it("pads space/md around with space/sm leading, and fills its container", async () => {
      const box = await fixture<HTMLDivElement>(html`<div style="width: 500px"><zeta-screen-header-bar headline="Home"></zeta-screen-header-bar></div>`);
      const el = box.firstElementChild as ZetaScreenHeaderBar;
      const s = getComputedStyle(el);
      await expect(s.paddingTop).to.equal(v(el, "--space-md"));
      await expect(s.paddingLeft).to.equal(v(el, "--space-sm"));
      await expect(s.columnGap).to.equal(v(el, "--space-xxs"));
      await expect(el.getBoundingClientRect().width).to.equal(500);
    });
  });

  describe("Styling", () => {
    it("sets the title in title/large and shapes the action from rounded", async () => {
      const el = await fixture<ZetaScreenHeaderBar>(
        html`<zeta-screen-header-bar headline="Home" .rounded=${false}><zeta-button slot="action">Save</zeta-button></zeta-screen-header-bar>`
      );
      await expect(getComputedStyle(one(el, ".heading")).fontSize).to.equal(v(el, "--title-large-font-size"));
      await expect(el.querySelector("zeta-button")?.getAttribute("shape")).to.equal("sharp");
      el.rounded = true;
      await elementUpdated(el);
      await expect(el.querySelector("zeta-button")?.getAttribute("shape")).to.equal("rounded");
    });
  });

  describe("Interaction", () => {
    it("fires back from the back button", async () => {
      const el = await fixture<ZetaScreenHeaderBar>(html`<zeta-screen-header-bar headline="Home"></zeta-screen-header-bar>`);
      setTimeout(() => one(el, ".back").click());
      const e = await oneEvent(el, "back");
      expect(e).to.exist;
    });
  });
});
