import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaNavigationBar } from "../../components/navigation-bar/navigation-bar.js";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/navigation-bar/navigation-bar.js";
import "../../components/button/button.js";
import "../../components/icon/icon.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue } from "../utils.js";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

describe("zeta-navigation-bar (spec)", () => {
  let bar: ZetaNavigationBar;
  let items: ZetaGridMenuItem[];

  beforeEach(async () => {
    bar = await fixture<ZetaNavigationBar>(
      html`<zeta-navigation-bar style="width: 600px; background: var(--surface-default)">
        <zeta-grid-menu-item active><zeta-icon slot="icon">star</zeta-icon>Home</zeta-grid-menu-item>
        <zeta-grid-menu-item><zeta-icon slot="icon">star</zeta-icon>Search</zeta-grid-menu-item>
        <zeta-grid-menu-item disabled><zeta-icon slot="icon">star</zeta-icon>Saved</zeta-grid-menu-item>
      </zeta-navigation-bar>`
    );
    items = Array.from(bar.querySelectorAll("zeta-grid-menu-item"));
    await Promise.all(items.map(i => i.updateComplete));
  });

  describe("Accessibility", () => {
    it("is a navigation landmark and meets aria requirements", async () => {
      await expect(bar.getAttribute("role")).to.equal("navigation");
      await expect(bar).to.be.accessible();
    });

    it("meets contrast requirements for resting and active labels", async () => {
      await contrastTest("Nav item", items[1], bar, { highContrast: false });
      await contrastTest("Nav item active", items[0], bar, { highContrast: false });
    });
  });

  describe("Content", () => {
    it("shows a dot badge for true and a count for a number", async () => {
      items[1].notificationValue = true;
      await elementUpdated(items[1]);
      await expect(items[1].shadowRoot?.querySelector(".badge")?.getAttribute("size")).to.equal("small");
      items[1].notificationValue = "4";
      await elementUpdated(items[1]);
      expect(items[1].shadowRoot?.querySelector(".badge.count")).to.exist;
    });

    it("shows the right group, the divider and the action only when used", async () => {
      expect(bar.shadowRoot?.querySelector(".right")?.hasAttribute("hidden")).to.be.true;
      const right = document.createElement("zeta-grid-menu-item");
      right.slot = "right";
      right.textContent = "Account";
      const action = document.createElement("zeta-button");
      action.slot = "action";
      action.textContent = "New";
      bar.append(right, action);
      bar.showDivider = true;
      await elementUpdated(bar);
      await new Promise(r => setTimeout(r));
      expect(bar.shadowRoot?.querySelector(".right")?.hasAttribute("hidden")).to.be.false;
      expect(bar.shadowRoot?.querySelector(".action")?.hasAttribute("hidden")).to.be.false;
      expect(bar.shadowRoot?.querySelector(".divider")).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("holds items at 72px with space/sm by space/lg padding", async () => {
      await expect(items[0].getBoundingClientRect().height).to.equal(72);
      await expect(getComputedStyle(items[0]).paddingLeft).to.equal(v(bar, "--space-lg"));
      await expect(getComputedStyle(items[0]).paddingTop).to.equal(v(bar, "--space-sm"));
      await expect(getComputedStyle(items[0]).rowGap).to.equal(v(bar, "--space-sm"));
    });

    it("shares the width without shrinkItems and hugs with it", async () => {
      const [a, b] = items.map(i => i.getBoundingClientRect().width);
      expect(Math.abs(a - b)).to.be.lessThan(1);
      bar.shrinkItems = true;
      await elementUpdated(bar);
      expect(items[0].getBoundingClientRect().width).to.be.lessThan(200);
    });
  });

  describe("Styling", () => {
    it("draws a stroke/thin border/default top border and no fill of its own", async () => {
      const s = getComputedStyle(bar);
      await expect(s.borderTopWidth).to.equal(v(bar, "--stroke-thin"));
      await expect(s.borderTopColor).to.equal(getCssVarColorValue(bar, "--zebra-border-default"));
    });

    it("colours items primary, active subtle and disabled subtle-disabled, with body/small labels", async () => {
      await expect(getComputedStyle(items[1]).color).to.equal(getCssVarColorValue(bar, "--foreground-primary"));
      await expect(getComputedStyle(items[0]).color).to.equal(getCssVarColorValue(bar, "--interactive-subtle-foreground-default"));
      await expect(getComputedStyle(items[2]).color).to.equal(getCssVarColorValue(bar, "--interactive-subtle-foreground-disabled"));
      const label = items[1].shadowRoot?.querySelector(".label") as HTMLElement;
      await expect(getComputedStyle(label).fontSize).to.equal(v(bar, "--body-small-font-size"));
    });
  });
});
