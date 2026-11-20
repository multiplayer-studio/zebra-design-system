import { fixture, html, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import { emulateMedia, sendKeys, sendMouse, resetMouse } from "@web/test-runner-commands";
import type { ZetaNavigationRail } from "../../components/navigation-rail/navigation-rail.js";
import type { ZetaNavigationRailItem } from "../../components/navigation-rail/navigation-rail-item.js";
import type { ZetaSubMenuItem } from "../../components/navigation-rail/sub-menu-item.js";
import type { ZetaCollapsibleMenuItem } from "../../components/navigation-rail/collapsible-menu-item.js";
import type { ZetaSubMenuHeader } from "../../components/navigation-rail/sub-menu-header.js";
import type { ZetaNavigationHeader } from "../../components/navigation-rail/navigation-header.js";
import "../../components/navigation-rail/navigation-rail.js";
import "../../components/navigation-rail/navigation-rail-item.js";
import "../../components/navigation-rail/sub-menu-item.js";
import "../../components/navigation-rail/sub-menu-header.js";
import "../../components/navigation-rail/navigation-header.js";
import "../../components/navigation-rail/collapsible-menu-item.js";
import "../../components/avatar/avatar.js";
import "../../components/icon/icon.js";
import "../../index.css";

const v = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();
const inner = (el: Element, selector: string) => el.shadowRoot?.querySelector(selector) as HTMLElement;
const hover = async (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  await sendMouse({ type: "move", position: [Math.round(r.x + r.width / 2), Math.round(r.y + r.height / 2)] });
};

describe("zeta-navigation-rail (spec)", () => {
  beforeEach(async () => {
    await emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(async () => {
    await resetMouse();
  });

  describe("Accessibility", () => {
    it("marks the selected destination and keeps a hidden label as the name", async () => {
      const el = await fixture<ZetaNavigationRailItem>(
        html`<zeta-navigation-rail-item selected><zeta-icon slot="icon">star</zeta-icon>Home</zeta-navigation-rail-item>`
      );
      const item = inner(el, ".item");
      await expect(item.getAttribute("aria-current")).to.equal("page");
      expect(item.querySelector(".label")?.classList.contains("sr")).to.be.true;
      await expect(el).shadowDom.to.be.accessible();
    });

    it("lands the rail in a named nav landmark and follows the page's mode", async () => {
      const el = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail nav-label="Primary"></zeta-navigation-rail>`);
      await expect(inner(el, "nav").getAttribute("aria-label")).to.equal("Primary");
      await expect(el.hasAttribute("data-theme")).to.equal(false);
    });

    it("shows the opposite shade of the page with inverse, and follows the page when it changes", async () => {
      const page = await fixture<HTMLDivElement>(html`<div data-theme="light"><zeta-navigation-rail inverse></zeta-navigation-rail></div>`);
      const el = page.querySelector("zeta-navigation-rail") as ZetaNavigationRail;
      await elementUpdated(el);
      await expect(el.getAttribute("data-theme")).to.equal("dark");
      page.setAttribute("data-theme", "dark");
      await new Promise(r => setTimeout(r));
      await expect(el.getAttribute("data-theme")).to.equal("light");
      el.inverse = false;
      await elementUpdated(el);
      await expect(el.hasAttribute("data-theme")).to.equal(false);
    });

    it("keeps a locked rail dark whatever the page's mode, and light with inverse", async () => {
      const page = await fixture<HTMLDivElement>(html`<div data-theme="light"><zeta-navigation-rail locked></zeta-navigation-rail></div>`);
      const el = page.querySelector("zeta-navigation-rail") as ZetaNavigationRail;
      await elementUpdated(el);
      await expect(el.getAttribute("data-theme")).to.equal("dark");
      page.setAttribute("data-theme", "dark");
      await new Promise(r => setTimeout(r));
      await expect(el.getAttribute("data-theme")).to.equal("dark");
      el.inverse = true;
      await elementUpdated(el);
      await expect(el.getAttribute("data-theme")).to.equal("light");
    });

    it("draws the trailing divider only when show-divider is set", async () => {
      const plain = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail></zeta-navigation-rail>`);
      await expect(getComputedStyle(inner(plain, ".root")).borderInlineEndWidth).to.equal("0px");
      const divided = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail show-divider></zeta-navigation-rail>`);
      const style = getComputedStyle(inner(divided, ".root"));
      await expect(style.borderInlineEndWidth).to.equal("1px");
      await expect(style.borderInlineEndStyle).to.equal("solid");
    });

    it("exposes the toggle item and a collapsible group as disclosures", async () => {
      const rail = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail show-toggle-item></zeta-navigation-rail>`);
      const toggle = inner(rail, ".toggle") as ZetaNavigationRailItem;
      await toggle.updateComplete;
      await expect(inner(toggle, ".item").getAttribute("aria-expanded")).to.equal("false");
      const group = await fixture<ZetaCollapsibleMenuItem>(html`<zeta-collapsible-menu-item><span slot="heading">Group</span></zeta-collapsible-menu-item>`);
      await expect(inner(group, ".header").getAttribute("aria-expanded")).to.equal("false");
    });
  });

  describe("Content", () => {
    it("draws the rail item's badge only when showBadge, with its text equivalent", async () => {
      const el = await fixture<ZetaNavigationRailItem>(
        html`<zeta-navigation-rail-item show-badge badge-label="3 new"><zeta-icon slot="icon">star</zeta-icon>Inbox</zeta-navigation-rail-item>`
      );
      expect(inner(el, ".badge")).to.exist;
      expect(inner(el, ".item").textContent).to.contain("3 new");
      el.showIcon = false;
      await elementUpdated(el);
      expect(inner(el, ".badge")).to.not.exist;
    });

    it("shows the sub menu item's badge and caret on their own properties", async () => {
      const el = await fixture<ZetaSubMenuItem>(html`<zeta-sub-menu-item show-badge badge-value="4" sub-menu>Orders</zeta-sub-menu-item>`);
      expect(inner(el, ".badge")).to.exist;
      expect(inner(el, ".caret")).to.exist;
      el.showLeadingIcon = false;
      await elementUpdated(el);
      expect(inner(el, ".badge")).to.exist;
    });

    it("nests and shapes the rows a collapsible group holds", async () => {
      const group = await fixture<ZetaCollapsibleMenuItem>(
        html`<zeta-collapsible-menu-item .rounded=${false}
          ><span slot="heading">Group</span><zeta-sub-menu-item>Row</zeta-sub-menu-item></zeta-collapsible-menu-item
        >`
      );
      const row = group.querySelector("zeta-sub-menu-item")!;
      expect(row.nested).to.be.true;
      expect(row.rounded).to.be.false;
    });

    it("shows the panel only when its slots are filled", async () => {
      const rail = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail></zeta-navigation-rail>`);
      expect(inner(rail, ".panel").hidden).to.be.true;
      const header = document.createElement("zeta-sub-menu-header");
      header.slot = "sub-menu-header";
      rail.append(header);
      await new Promise(r => setTimeout(r));
      await elementUpdated(rail);
      expect(inner(rail, ".panel").hidden).to.be.false;
    });

    it("leads the sub page header with a back button and the header with title and action only when expanded", async () => {
      const sub = await fixture<ZetaSubMenuHeader>(html`<zeta-sub-menu-header type="sub-page" headline="Orders"></zeta-sub-menu-header>`);
      expect(inner(sub, ".back")).to.exist;
      await expect(inner(sub, ".title").textContent).to.equal("Orders");
      const header = await fixture<ZetaNavigationHeader>(html`<zeta-navigation-header headline="Zebra"></zeta-navigation-header>`);
      expect(inner(header, ".title")).to.not.exist;
      header.expanded = true;
      await elementUpdated(header);
      await expect(inner(header, ".title").textContent).to.equal("Zebra");
      expect(inner(header, "zeta-icon-button")).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("centres the action's glyph in the narrow rail and keeps its label as the name", async () => {
      const el = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail show-header-action action-label="Compose"></zeta-navigation-rail>`);
      const action = el.shadowRoot!.querySelector<ZetaNavigationHeader>(".action")!;
      await action.updateComplete;
      const button = action.shadowRoot!.querySelector("button")!.getBoundingClientRect();
      const glyph = action.shadowRoot!.querySelector("zeta-icon")!.getBoundingClientRect();
      expect(`${button.width}px`).to.equal(v(el, "--control-lg"));
      expect(Math.abs(glyph.left + glyph.width / 2 - (button.left + button.width / 2))).to.be.below(1);
      await expect(action.textContent?.trim()).to.equal("Compose");
    });

    it("keeps every glyph in place while the rail narrows, clipping the labels instead", async () => {
      await emulateMedia({ reducedMotion: "no-preference" });
      const el = await fixture<ZetaNavigationRail>(
        html`<zeta-navigation-rail expanded
          ><zeta-navigation-rail-item><zeta-icon slot="icon">star</zeta-icon>Home</zeta-navigation-rail-item></zeta-navigation-rail
        >`
      );
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const item = el.querySelector("zeta-navigation-rail-item")!;
      const x = () => item.querySelector("zeta-icon")!.getBoundingClientRect().left;
      const start = x();
      el.expanded = false;
      await elementUpdated(el);
      expect(item.expanded).to.be.true;
      await new Promise(r => setTimeout(r, 80));
      expect(x()).to.equal(start);
      await oneEvent(inner(el, ".rail"), "transitionend");
      await elementUpdated(el);
      expect(item.expanded).to.be.false;
      expect(x()).to.equal(start);
    });

    it("sizes the rail item to control/lg narrow and a full row wide", async () => {
      const el = await fixture<ZetaNavigationRailItem>(
        html`<zeta-navigation-rail-item><zeta-icon slot="icon">star</zeta-icon>Home</zeta-navigation-rail-item>`
      );
      const item = inner(el, ".item");
      await expect(`${item.getBoundingClientRect().height}px`).to.equal(v(el, "--control-lg"));
      await expect(getComputedStyle(item).paddingLeft).to.equal(v(el, "--space-2xs"));
      el.expanded = true;
      await elementUpdated(el);
      await expect(getComputedStyle(item).paddingLeft).to.equal(v(el, "--space-lg"));
      await expect(getComputedStyle(item).columnGap).to.equal(v(el, "--space-lg"));
    });

    it("holds the rail at 72px narrow and 200px wide, capped by railMaxWidth", async () => {
      const rail = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail></zeta-navigation-rail>`);
      await expect(inner(rail, ".rail").getBoundingClientRect().width).to.equal(72);
      rail.expanded = true;
      await elementUpdated(rail);
      await expect(inner(rail, ".rail").getBoundingClientRect().width).to.equal(200);
      rail.railMaxWidth = 160;
      await elementUpdated(rail);
      await expect(inner(rail, ".rail").getBoundingClientRect().width).to.equal(160);
    });

    it("hugs the sub menu from 240px, and lets subMenuMaxWidth lower that", async () => {
      const rail = await fixture<ZetaNavigationRail>(
        html`<zeta-navigation-rail><zeta-sub-menu-item slot="sub-menu">Row</zeta-sub-menu-item></zeta-navigation-rail>`
      );
      await elementUpdated(rail);
      await expect(inner(rail, ".panel").getBoundingClientRect().width).to.equal(240);
      rail.subMenuMaxWidth = "180px";
      await elementUpdated(rail);
      await expect(inner(rail, ".panel").getBoundingClientRect().width).to.equal(180);
    });
  });

  describe("Styling", () => {
    it("recolours a selected item instead of filling it, and drops the fill when disabled", async () => {
      const el = await fixture<ZetaNavigationRailItem>(html`<zeta-navigation-rail-item selected>Home</zeta-navigation-rail-item>`);
      const item = inner(el, ".item");
      await expect(v(item, "--_fg")).to.equal(v(item, "--interactive-subtle-foreground-default"));
      el.disabled = true;
      await elementUpdated(el);
      await expect(v(item, "--_fg")).to.equal(v(item, "--interactive-subtle-foreground-disabled"));
    });

    it("gives a selected sub menu row the selected ghost fill, and nested rows the quieter label", async () => {
      const el = await fixture<ZetaSubMenuItem>(html`<zeta-sub-menu-item selected>Row</zeta-sub-menu-item>`);
      const row = inner(el, ".row");
      await expect(v(row, "--_bg")).to.equal(v(row, "--interactive-ghost-background-selected"));
      el.selected = false;
      el.nested = true;
      await elementUpdated(el);
      await expect(v(row, "--_fg")).to.equal(v(row, "--foreground-secondary"));
      await expect(getComputedStyle(row).paddingLeft).to.equal(v(row, "--space-xl"));
    });

    it("sits the rail on surface/section with a stroke/thin border down the panel", async () => {
      const rail = await fixture<ZetaNavigationRail>(
        html`<zeta-navigation-rail><zeta-sub-menu-item slot="sub-menu">Row</zeta-sub-menu-item></zeta-navigation-rail>`
      );
      await elementUpdated(rail);
      const root = inner(rail, ".root");
      const probe = document.createElement("div");
      probe.style.backgroundColor = "var(--surface-section)";
      root.append(probe);
      await expect(getComputedStyle(root).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      await expect(getComputedStyle(inner(rail, ".panel")).borderInlineStartWidth).to.equal(v(root, "--stroke-thin"));
    });

    it("sits an open group's rows on surface/subtle", async () => {
      const group = await fixture<ZetaCollapsibleMenuItem>(
        html`<zeta-collapsible-menu-item open><span slot="heading">Group</span><zeta-sub-menu-item>Row</zeta-sub-menu-item></zeta-collapsible-menu-item>`
      );
      await elementUpdated(group);
      const children = inner(group, ".children");
      const probe = document.createElement("div");
      probe.style.backgroundColor = "var(--surface-subtle)";
      children.append(probe);
      await expect(getComputedStyle(children).backgroundColor).to.equal(getComputedStyle(probe).backgroundColor);
      probe.remove();
    });

    it("passes rounded, expanded and showLabels to the parts inside", async () => {
      const rail = await fixture<ZetaNavigationRail>(
        html`<zeta-navigation-rail expanded .rounded=${false}><zeta-navigation-rail-item>Home</zeta-navigation-rail-item></zeta-navigation-rail>`
      );
      const item = rail.querySelector("zeta-navigation-rail-item")!;
      expect(item.expanded).to.be.true;
      expect(item.rounded).to.be.false;
      rail.expanded = false;
      rail.showLabels = true;
      await elementUpdated(rail);
      expect(item.showLabel).to.be.true;
    });
  });

  describe("Interaction", () => {
    it("fills the hovered rail item on the ghost hover token", async () => {
      const el = await fixture<ZetaNavigationRailItem>(html`<zeta-navigation-rail-item>Home</zeta-navigation-rail-item>`);
      const item = inner(el, ".item");
      await hover(item);
      await expect(v(item, "--_bg")).to.equal(v(item, "--interactive-ghost-background-hover"));
    });

    it("widens the rail from the toggle item and fires expanded-change", async () => {
      const rail = await fixture<ZetaNavigationRail>(html`<zeta-navigation-rail show-toggle-item></zeta-navigation-rail>`);
      const toggle = inner(rail, ".toggle");
      setTimeout(() => toggle.click());
      const e = await oneEvent(rail, "expanded-change");
      expect(e.detail.expanded).to.be.true;
      expect(rail.expanded).to.be.true;
    });

    it("opens a collapsible group and turns its caret", async () => {
      const group = await fixture<ZetaCollapsibleMenuItem>(
        html`<zeta-collapsible-menu-item><span slot="heading">Group</span><zeta-sub-menu-item>Row</zeta-sub-menu-item></zeta-collapsible-menu-item>`
      );
      inner(group, ".header").click();
      await elementUpdated(group);
      expect(group.open).to.be.true;
      expect(inner(group, ".caret").hasAttribute("open")).to.be.true;
      await expect(getComputedStyle(inner(group, ".panel")).visibility).to.equal("visible");
    });

    it("shows a truncated sub menu label in full on keyboard focus, and not one that fits", async () => {
      const box = await fixture<HTMLDivElement>(
        html`<div style="width: 120px"><zeta-sub-menu-item>A very long destination name</zeta-sub-menu-item><zeta-sub-menu-item>Ok</zeta-sub-menu-item></div>`
      );
      const [long, short] = Array.from(box.children) as ZetaSubMenuItem[];
      await sendKeys({ press: "Tab" });
      await new Promise(r => setTimeout(r, 20));
      await elementUpdated(long);
      expect(inner(long, ".tip")).to.exist;
      await sendKeys({ press: "Tab" });
      await new Promise(r => setTimeout(r, 20));
      await elementUpdated(short);
      expect(inner(short, ".tip")).to.not.exist;
    });
  });
});
